// Verify the repo contract. Exits non-zero on any violation.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter, markdownLinks, countLines, firstHeading } from './lib/frontmatter.mjs';
import {
  CORE_SKILLS,
  EXTENDED_SKILLS,
  DOMAIN_SKILLS,
  EXPERIMENTAL_SKILLS,
  LINE_BUDGETS,
  PRINCIPLE_BUDGET,
  PLAYBOOK_BUDGET,
  AGENT_BUDGET,
  STANDARD_BUDGET,
  PLAYBOOKS,
  MODEL_ROLES,
  RULE_PACKS,
  ARTIFACTS,
} from './lib/contract.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];

function fail(file, message) {
  errors.push(`${file}: ${message}`);
}

function warn(file, message) {
  warnings.push(`${file}: ${message}`);
}

function read(rel) {
  return readFileSync(join(ROOT, rel), 'utf8');
}

function relFiles(dir) {
  if (!existsSync(join(ROOT, dir))) return [];
  const out = [];
  const walk = (current) => {
    for (const name of readdirSync(join(ROOT, current))) {
      const rel = `${current}/${name}`;
      const full = join(ROOT, rel);
      if (statSync(full).isDirectory()) walk(rel);
      else out.push(rel);
    }
  };
  walk(dir);
  return out;
}

function skillDirs() {
  if (!existsSync(join(ROOT, 'skills'))) return [];
  return readdirSync(join(ROOT, 'skills'))
    .filter((name) => statSync(join(ROOT, 'skills', name)).isDirectory())
    .sort();
}

const SPAWNING = new Set(['egm-brainstorm', 'egm-review', 'egm-resolve', 'delegate', 'how', 'why', 'arena', 'swarm', 'reflect', 'egm-bootstrap', 'no-comments']);

function checkSkills() {
  for (const dir of skillDirs()) {
    const file = `skills/${dir}/SKILL.md`;
    if (!existsSync(join(ROOT, file))) { fail(file, 'missing SKILL.md'); continue; }
    const text = read(file);
    const parsed = parseFrontmatter(text);
    if (!parsed.ok) { fail(file, parsed.reason); continue; }
    const data = parsed.data;
    if (data.name !== dir) fail(file, `frontmatter name "${data.name}" does not match directory "${dir}"`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(String(data.name ?? ''))) fail(file, 'name is not kebab-case');
    if (String(data.name ?? '').length > 64) fail(file, 'name exceeds 64 characters');
    const description = String(data.description ?? '');
    if (!description) fail(file, 'description is missing');
    if (description.length > 1024) fail(file, `description is ${description.length} characters, limit is 1024`);
    if (dir.startsWith('principle-')) {
      if (!/^Apply when/.test(description)) fail(file, 'principle description must start with "Apply when"');
    } else if (!description.includes('/')) {
      fail(file, 'description must name its command in /form');
    }
    if (data.license !== 'Apache-2.0') fail(file, 'license must be Apache-2.0');
    if (data['disable-model-invocation'] !== true) fail(file, 'disable-model-invocation must be true');
    for (const key of Object.keys(data)) {
      if (!['name', 'description', 'license', 'disable-model-invocation'].includes(key)) {
        fail(file, `unexpected frontmatter key "${key}"`);
      }
    }
    const lines = countLines(text);
    if (dir.startsWith('principle-')) {
      if (lines > PRINCIPLE_BUDGET) fail(file, `${lines} lines, principle budget is ${PRINCIPLE_BUDGET}`);
      if (!/\nSources:/.test(text)) fail(file, 'missing Sources: line');
    } else {
      const budget = LINE_BUDGETS[dir];
      if (!budget) fail(file, 'no line budget for this skill in the contract');
      else if (lines > budget) fail(file, `${lines} lines, budget is ${budget}`);
    }
    if (SPAWNING.has(dir)) {
      if (!text.includes('delegate')) fail(file, 'spawning skill must point at the delegate skill');
      if (!text.includes('docs/harness.md')) fail(file, 'spawning skill must point at docs/harness.md for tool mapping');
    }
  }
}

function checkPrinciples() {
  const expected = Object.values({
    core: ['laziness-protocol', 'foundational-thinking', 'redesign-from-first-principles', 'attack-the-premise', 'subtract-before-you-add', 'minimize-reader-load', 'outcome-oriented-execution', 'experience-first', 'exhaust-the-design-space', 'build-the-lever'],
    arch: ['model-the-domain', 'boundary-discipline', 'type-system-discipline', 'make-operations-idempotent', 'migrate-callers-then-delete-legacy-apis', 'separate-before-serializing-shared-state'],
    ver: ['prove-it-works', 'fix-root-causes', 'sequence-verifiable-units', 'test-behavior-not-implementation', 'explain-the-number'],
    del: ['guard-the-context-window', 'never-block-on-the-human'],
    meta: ['encode-lessons-in-structure'],
  }).flat().map((name) => `principle-${name}`);
  const actual = skillDirs().filter((name) => name.startsWith('principle-'));
  for (const name of expected) {
    if (!actual.includes(name)) fail('skills/', `missing principle ${name}`);
  }
  for (const name of actual) {
    if (!expected.includes(name)) fail(`skills/${name}/SKILL.md`, 'principle is not in the contract');
  }
  if (existsSync(join(ROOT, 'skills/egm-mode/SKILL.md'))) {
    const mode = read('skills/egm-mode/SKILL.md');
    for (const name of expected) {
      if (!mode.includes(`../${name}/SKILL.md`)) fail('skills/egm-mode/SKILL.md', `principle index is missing ${name}`);
    }
  }
}

function checkPlaybooks() {
  const dir = 'skills/egm-mode/playbooks';
  const actual = existsSync(join(ROOT, dir))
    ? readdirSync(join(ROOT, dir)).filter((name) => name.endsWith('.md')).map((name) => name.replace(/\.md$/, ''))
    : [];
  for (const name of PLAYBOOKS) {
    if (!actual.includes(name)) fail(dir, `missing playbook ${name}.md`);
  }
  for (const name of actual) {
    if (!PLAYBOOKS.includes(name)) fail(`${dir}/${name}.md`, 'playbook is not in the contract');
    const text = read(`${dir}/${name}.md`);
    if (countLines(text) > PLAYBOOK_BUDGET) fail(`${dir}/${name}.md`, `${countLines(text)} lines, budget is ${PLAYBOOK_BUDGET}`);
    if (!text.startsWith('### ')) fail(`${dir}/${name}.md`, 'playbook must start with an h3 title');
    if (!/Read first:/.test(text)) fail(`${dir}/${name}.md`, 'missing Read first: line');
    if (!/\*\*Reply:\*\*/.test(text)) fail(`${dir}/${name}.md`, 'missing **Reply:** line');
  }
  if (existsSync(join(ROOT, 'skills/egm-mode/SKILL.md'))) {
    const mode = read('skills/egm-mode/SKILL.md');
    for (const name of actual) {
      if (!mode.includes(`playbooks/${name}.md`)) fail('skills/egm-mode/SKILL.md', `playbook list is missing ${name}`);
    }
  }
}

function checkAgents() {
  const dir = 'agents';
  const nonReviewers = new Set(['egm-synthesizer.md', 'egm-bootstrap-orchestrator.md', 'comment-sicko.md']);
  for (const rel of relFiles(dir)) {
    if (extname(rel) !== '.md') continue;
    const text = read(rel);
    const parsed = parseFrontmatter(text);
    if (!parsed.ok) { fail(rel, parsed.reason); continue; }
    const stem = rel.split('/').pop().replace(/\.md$/, '');
    if (parsed.data.name !== stem) fail(rel, `frontmatter name "${parsed.data.name}" does not match filename "${stem}"`);
    if (!parsed.data.description) fail(rel, 'description is missing');
    if (parsed.data.license !== 'Apache-2.0') fail(rel, 'license must be Apache-2.0');
    if (countLines(text) > AGENT_BUDGET) fail(rel, `${countLines(text)} lines, budget is ${AGENT_BUDGET}`);
    if (!nonReviewers.has(`${stem}.md`) && !text.includes('Core Mandates')) {
      fail(rel, 'reviewer persona is missing the Core Mandates block');
    }
  }
  const expected = ['egm-zoom-out', 'egm-inventive-catalyst', 'egm-comprehension', 'egm-design', 'egm-structural', 'egm-style', 'egm-implementation-readiness', 'egm-codebase-details', 'egm-synthesizer', 'egm-bootstrap-orchestrator', 'comment-sicko'];
  for (const name of expected) {
    if (!existsSync(join(ROOT, `agents/${name}.md`))) fail('agents/', `missing persona ${name}.md`);
  }
}

function checkStandards() {
  const dir = 'resources/document_standards';
  const expected = ['feature-spec-standard', 'implementation-readiness-standard', 'zoom-out-standard', 'heilmeier-standard', 're-implementation-standard', 'domain-model-standard'];
  for (const name of expected) {
    const rel = `${dir}/${name}.md`;
    if (!existsSync(join(ROOT, rel))) { fail(dir, `missing standard ${name}.md`); continue; }
    if (countLines(read(rel)) > STANDARD_BUDGET) fail(rel, `${countLines(read(rel))} lines, budget is ${STANDARD_BUDGET}`);
  }
  if (existsSync(join(ROOT, 'skills/egm-review/SKILL.md'))) {
    const review = read('skills/egm-review/SKILL.md');
    if (!review.includes('domain-model-standard')) fail('skills/egm-review/SKILL.md', 'must reference domain-model-standard.md for the ddd profile');
  }
  for (const rel of ['resources/README.md', 'resources/execution_instructions.md']) {
    if (!existsSync(join(ROOT, rel))) fail(rel, 'missing');
  }
}

function checkLinks() {
  const roots = ['README.md', 'AGENTS.md', 'CONTRIBUTING.md', 'UPSTREAM.md', 'docs', 'skills', 'agents', 'resources'];
  const files = [];
  for (const root of roots) {
    if (!existsSync(join(ROOT, root))) continue;
    if (statSync(join(ROOT, root)).isDirectory()) files.push(...relFiles(root));
    else files.push(root);
  }
  for (const rel of files) {
    if (extname(rel) !== '.md') continue;
    const text = read(rel);
    for (const link of markdownLinks(text)) {
      let target = link.target;
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      target = target.split('#')[0];
      if (!target) continue;
      const resolved = resolve(join(ROOT, rel), '..', target);
      const relResolved = relative(ROOT, resolved);
      if (relResolved.startsWith('..')) {
        fail(rel, `link escapes the repository: ${link.target}`);
        continue;
      }
      if (!existsSync(resolved)) fail(rel, `broken link: ${link.target}`);
    }
  }
}

const BANNED = ['agent-transcripts', 'AskQuestion', 'generalPurpose', 'Bugbot', 'Task(', 'C:\\', '/Users/', '#!/bin/sh'];
function checkBannedTokens() {
  const roots = ['skills', 'agents', 'resources', 'docs/guide', 'docs/getting_started.md', 'docs/artifacts.md'];
  const files = [];
  for (const root of roots) {
    if (!existsSync(join(ROOT, root))) continue;
    const full = join(ROOT, root);
    if (statSync(full).isDirectory()) files.push(...relFiles(root));
    else files.push(root);
  }
  for (const rel of files) {
    if (!['.md', '.mjs'].includes(extname(rel))) continue;
    const text = read(rel);
    for (const token of BANNED) {
      if (text.includes(token)) fail(rel, `banned token "${token}"`);
    }
    if (text.includes('\r\n')) fail(rel, 'CRLF line endings');
  }
}

const MANIFESTS = ['plugin.json', '.claude-plugin/plugin.json', '.codex-plugin/plugin.json', '.cursor-plugin/plugin.json'];
function checkManifests() {
  const identity = [];
  for (const rel of MANIFESTS) {
    if (!existsSync(join(ROOT, rel))) { fail(rel, 'missing manifest'); continue; }
    let data;
    try { data = JSON.parse(read(rel)); } catch (error) { fail(rel, `invalid JSON: ${error.message}`); continue; }
    identity.push({ rel, name: data.name, version: data.version, description: data.description, license: data.license });
    if (!data.name) fail(rel, 'missing name');
    if (data.name && !/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/.test(data.name)) fail(rel, 'name does not satisfy the portable manifest rule');
    if (!data.description) fail(rel, 'missing description');
    if (!data.license) fail(rel, 'missing license');
  }
  const names = new Set(identity.map((item) => item.name));
  const versions = new Set(identity.map((item) => item.version));
  const descriptions = new Set(identity.map((item) => item.description));
  const licenses = new Set(identity.map((item) => item.license));
  if (names.size > 1) fail('manifests', `name mismatch: ${JSON.stringify(identity.map((i) => [i.rel, i.name]))}`);
  if (versions.size > 1) fail('manifests', 'version mismatch');
  if (descriptions.size > 1) fail('manifests', 'description mismatch');
  if (licenses.size > 1) fail('manifests', 'license mismatch');
  if (existsSync(join(ROOT, 'package.json'))) {
    try {
      const pkg = JSON.parse(read('package.json'));
      if (pkg.version !== [...versions][0]) fail('package.json', `version ${pkg.version} does not match manifests ${[...versions][0]}`);
      if (pkg.name !== [...names][0]) fail('package.json', `name ${pkg.name} does not match manifests ${[...names][0]}`);
    } catch (error) { fail('package.json', `invalid JSON: ${error.message}`); }
  }

  const marketplaceRel = '.claude-plugin/marketplace.json';
  if (existsSync(join(ROOT, marketplaceRel))) {
    try {
      const market = JSON.parse(read(marketplaceRel));
      if (!market.name) fail(marketplaceRel, 'missing name');
      if (!Array.isArray(market.plugins) || !market.plugins.length) fail(marketplaceRel, 'missing plugins array');
      else {
        const plugin = market.plugins[0];
        if (plugin.name !== identity[0]?.name) fail(marketplaceRel, 'entry name must equal the plugin name');
        if (typeof plugin.source !== 'string' || !plugin.source.startsWith('./')) fail(marketplaceRel, 'source must start with ./');
      }
    } catch (error) { fail(marketplaceRel, `invalid JSON: ${error.message}`); }
  }

  const codexRel = '.codex-plugin/plugin.json';
  if (existsSync(join(ROOT, codexRel))) {
    const codex = JSON.parse(read(codexRel));
    const rootPlugin = JSON.parse(read('plugin.json'));
    if (JSON.stringify(codex.interface) !== JSON.stringify(rootPlugin.extensions?.['com.openai']?.interface)) {
      fail(codexRel, 'interface must equal plugin.json extensions.com.openai.interface');
    }
  }

  const cursorRel = '.cursor-plugin/plugin.json';
  if (existsSync(join(ROOT, cursorRel))) {
    const cursor = JSON.parse(read(cursorRel));
    for (const key of ['skills', 'agents', 'rules']) {
      if (typeof cursor[key] !== 'string' || !cursor[key].startsWith('./')) fail(cursorRel, `${key} must be a ./ path`);
    }
  }

  const agentsMarket = '.agents/plugins/marketplace.json';
  if (existsSync(join(ROOT, agentsMarket))) {
    try {
      const market = JSON.parse(read(agentsMarket));
      if (!market.plugins?.[0]?.name) fail(agentsMarket, 'missing plugin entry');
    } catch (error) { fail(agentsMarket, `invalid JSON: ${error.message}`); }
  }
}

function checkAsk() {
  const file = 'skills/egm-ask/SKILL.md';
  if (!existsSync(join(ROOT, file))) return;
  const text = read(file);
  if (!/read-only/i.test(text)) fail(file, 'missing read-only guarantee');
  if (!/does not write|never writes/i.test(text)) fail(file, 'must state that it does not write files');
  const tableRel = 'skills/egm-ask/references/stage-table.md';
  if (!existsSync(join(ROOT, tableRel))) { fail(tableRel, 'missing stage table'); return; }
  const table = read(tableRel);
  for (const artifact of ARTIFACTS) {
    if (!table.includes(artifact)) fail(tableRel, `stage table is missing artifact ${artifact}`);
  }
  const artifactsDoc = 'docs/artifacts.md';
  if (existsSync(join(ROOT, artifactsDoc))) {
    const doc = read(artifactsDoc);
    for (const artifact of ARTIFACTS) {
      if (!doc.includes(artifact)) warn(artifactsDoc, `artifact list does not mention ${artifact}`);
    }
  }
}

function checkSte100() {
  const rules = 'skills/ste100/references/writing-rules.md';
  const dict = 'skills/ste100/references/dictionary-workflow.md';
  for (const rel of [rules, dict]) if (!existsSync(join(ROOT, rel))) fail(rel, 'missing');
  if (existsSync(join(ROOT, rules))) {
    const text = read(rules);
    if (!text.includes('asd-ste100.org')) fail(rules, 'missing the ASD-STE100 URL');
    if (!/not the standard/i.test(text)) fail(rules, 'missing the "not the standard" disclaimer');
    if (!/Issue 9/.test(text)) fail(rules, 'missing the Issue 9 note');
    if (countLines(text) > 170) fail(rules, 'writing rules reference is too long');
  }
  if (existsSync(join(ROOT, 'skills/ste100/SKILL.md'))) {
    const skill = read('skills/ste100/SKILL.md');
    if (!skill.includes('ste100-lint.mjs')) fail('skills/ste100/SKILL.md', 'must document the linter command');
  }
}

function checkRules() {
  const dir = 'skills/rules/references';
  const files = RULE_PACKS.map((name) => `${dir}/${name}.md`);
  for (const rel of files) {
    if (!existsSync(join(ROOT, rel))) { fail(rel, 'missing rule pack'); continue; }
    const text = read(rel);
    if (!text.includes('ciembor/agent-rules-books')) fail(rel, 'missing upstream source URL');
    if (!/MIT/i.test(text)) fail(rel, 'missing MIT notice');
    if (!/condensed/i.test(text)) fail(rel, 'missing the condensed disclaimer');
    if (countLines(text) > 80) fail(rel, `${countLines(text)} lines, pack budget is 80`);
  }
  if (existsSync(join(ROOT, 'skills/ddd/SKILL.md'))) {
    const ddd = read('skills/ddd/SKILL.md');
    if (!ddd.includes('../rules/references/')) fail('skills/ddd/SKILL.md', 'must load packs from ../rules/references/');
  }
  if (existsSync(join(ROOT, 'skills/rules/SKILL.md'))) {
    const skill = read('skills/rules/SKILL.md');
    for (const name of RULE_PACKS) {
      if (!skill.includes(name)) fail('skills/rules/SKILL.md', `pack selection is missing ${name}`);
    }
  }
}

function checkDelegation() {
  const dir = 'skills/delegate/references';
  for (const name of ['brief', 'harnesses', 'teams', 'report']) {
    if (!existsSync(join(ROOT, `${dir}/${name}.md`))) fail(`${dir}/${name}.md`, 'missing delegation reference');
  }
  const harness = 'docs/harness.md';
  if (!existsSync(join(ROOT, harness))) fail(harness, 'missing');
  else {
    const text = read(harness);
    for (const tool of ['Agent', 'spawn_agent', 'Task', 'task', 'spawn_teammate']) {
      if (!text.includes(tool)) fail(harness, `capability matrix does not mention ${tool}`);
    }
    for (const host of ['omp', 'OpenCode', 'Agent Teams', 'DeepSeek Harness']) {
      if (!text.includes(host)) fail(harness, `capability matrix does not mention ${host}`);
    }
  }
  for (const adapter of ['claude-code', 'codex', 'cursor', 'opencode', 'agent-teams', 'omp', 'deepseek-harness']) {
    const rel = `docs/harness/${adapter}.md`;
    if (!existsSync(join(ROOT, rel))) fail(rel, 'missing adapter');
  }
  const setup = 'skills/egm-setup/SKILL.md';
  if (existsSync(join(ROOT, setup))) {
    const text = read(setup);
    for (const role of MODEL_ROLES) {
      if (!text.includes(role)) fail(setup, `missing model role "${role}"`);
    }
    for (const phrase of ['provider/model', 'effort levels', 'split it at the first slash']) {
      if (!text.includes(phrase)) fail(setup, `setup is missing the harness model rule "${phrase}"`);
    }
  }
}

function checkStatechart() {
  const dir = 'skills/statechart';
  if (!existsSync(join(ROOT, dir))) { fail(dir, 'missing statechart skill'); return; }
  const runner = `${dir}/scripts/run.mjs`;
  if (!existsSync(join(ROOT, runner))) fail(runner, 'missing portable launcher');
  const skill = read(`${dir}/SKILL.md`);
  if (!skill.includes('run.mjs')) fail(`${dir}/SKILL.md`, 'must document scripts/run.mjs');
  if (skill.includes('scripts/statechart ')) fail(`${dir}/SKILL.md`, 'still references the removed shell wrapper');
  const scripts = relFiles(`${dir}/scripts`);
  if (scripts.length < 100) fail(dir, `vendored scripts look incomplete (${scripts.length} files)`);
}

function checkDocs() {
  const required = [
    'README.md',
    'docs/index.md',
    'docs/getting_started.md',
    'docs/artifacts.md',
    'docs/evals.md',
    'docs/harness.md',
    'docs/privacy.md',
    'docs/skills.md',
  ];
  for (const rel of required) if (!existsSync(join(ROOT, rel))) fail(rel, 'missing');
  if (existsSync(join(ROOT, 'README.md'))) {
    const readme = read('README.md');
    for (const phrase of ['/egm-stack:egm-setup', '/skill:egm-setup', 'Command form']) {
      if (!readme.includes(phrase)) fail('README.md', `install docs are missing "${phrase}"`);
    }
  }
  for (const rel of ['README.md', 'docs/getting_started.md']) {
    if (existsSync(join(ROOT, rel))) {
      if (!read(rel).includes('generated:') && !read(rel).includes('stage-table:start')) {
        warn(rel, 'no generated markers found');
      }
    }
  }
  const research = ['01-egm-anatomy', '02-pstack-anatomy', '03-skills-spec-and-harnesses', '04-asd-ste100', '05-ddd-and-book-rules', '06-subagent-delegation'];
  for (const name of research) {
    const rel = `docs/research/${name}.md`;
    if (!existsSync(join(ROOT, rel))) { fail(rel, 'missing'); continue; }
    if (!read(rel).includes('## Sources')) fail(rel, 'missing a Sources section');
  }
  const adrs = ['0001-adapt-and-extend', '0002-frontmatter-and-invocation', '0003-embedded-assets', '0004-artifact-directory', '0005-namespace-and-coexistence', '0006-asd-ste100-without-vendoring', '0007-statechart-vendoring', '0008-book-rules-adoption'];
  for (const name of adrs) {
    if (!existsSync(join(ROOT, `docs/adr/${name}.md`))) warn(`docs/adr/${name}.md`, 'missing ADR (name may differ)');
  }
}

function checkNoShellWrapper() {
  for (const rel of relFiles('skills')) {
    if (extname(rel) === '.sh') fail(rel, 'shell script found; use a Node launcher');
  }
}

checkSkills();
checkPrinciples();
checkPlaybooks();
checkAgents();
checkStandards();
checkLinks();
checkBannedTokens();
checkManifests();
checkAsk();
checkSte100();
checkRules();
checkDelegation();
checkStatechart();
checkDocs();
checkNoShellWrapper();

for (const message of warnings) console.warn(`warning: ${message}`);
if (errors.length) {
  console.error(`validate: ${errors.length} error(s)`);
  for (const message of errors) console.error(`- ${message}`);
  process.exit(1);
}
console.log(`validate: ok (${warnings.length} warning(s))`);
