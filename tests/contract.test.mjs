import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parseFrontmatter, countLines } from '../scripts/lib/frontmatter.mjs';
import {
  CORE_SKILLS,
  EXTENDED_SKILLS,
  DOMAIN_SKILLS,
  EXPERIMENTAL_SKILLS,
  LINE_BUDGETS,
  PRINCIPLE_BUDGET,
  PLAYBOOK_BUDGET,
  PLAYBOOKS,
  MODEL_ROLES,
  RULE_PACKS,
  ARTIFACTS,
} from '../scripts/lib/contract.mjs';

const ROOT = process.cwd();
const skillDirs = readdirSync(join(ROOT, 'skills')).filter((name) => statSync(join(ROOT, 'skills', name)).isDirectory());

test('every skill has valid frontmatter and a budget', () => {
  for (const dir of skillDirs) {
    const file = join(ROOT, 'skills', dir, 'SKILL.md');
    assert.ok(existsSync(file), `${dir} has no SKILL.md`);
    const text = readFileSync(file, 'utf8');
    const parsed = parseFrontmatter(text);
    assert.ok(parsed.ok, `${dir}: ${parsed.reason}`);
    assert.equal(parsed.data.name, dir, `${dir}: name mismatch`);
    assert.equal(parsed.data.license, 'Apache-2.0', `${dir}: license`);
    assert.ok(!Object.hasOwn(parsed.data, 'disable-model-invocation'), `${dir}: extension field present`);
    assert.ok(String(parsed.data.description).length <= 1024, `${dir}: description too long`);
    const budget = dir.startsWith('principle-') ? PRINCIPLE_BUDGET : LINE_BUDGETS[dir];
    assert.ok(budget, `${dir}: no budget`);
    assert.ok(countLines(text) <= budget, `${dir}: ${countLines(text)} lines over budget ${budget}`);
  }
});

test('the roster is complete', () => {
  const expected = [...CORE_SKILLS, ...EXTENDED_SKILLS, ...DOMAIN_SKILLS, ...EXPERIMENTAL_SKILLS];
  for (const name of expected) assert.ok(skillDirs.includes(name), `missing skill ${name}`);
});

test('every principle carries a Sources line', () => {
  for (const dir of skillDirs.filter((name) => name.startsWith('principle-'))) {
    const text = readFileSync(join(ROOT, 'skills', dir, 'SKILL.md'), 'utf8');
    assert.match(text, /\nSources:/, `${dir} has no Sources line`);
  }
});

test('spawning skills point at delegate and the harness doc', () => {
  const spawning = ['egm-brainstorm', 'egm-review', 'egm-resolve', 'delegate', 'how', 'why', 'arena', 'swarm', 'reflect', 'egm-bootstrap', 'no-comments'];
  for (const name of spawning) {
    const text = readFileSync(join(ROOT, 'skills', name, 'SKILL.md'), 'utf8');
    assert.match(text, /delegate/, `${name} does not point at delegate`);
    assert.match(text, /docs\/harness\.md/, `${name} does not point at docs/harness.md`);
  }
});

test('playbooks are complete and respect the budget', () => {
  const dir = join(ROOT, 'skills/egm-mode/playbooks');
  for (const name of PLAYBOOKS) {
    const file = join(dir, `${name}.md`);
    assert.ok(existsSync(file), `missing playbook ${name}`);
    const text = readFileSync(file, 'utf8');
    assert.ok(countLines(text) <= PLAYBOOK_BUDGET, `${name} over budget`);
    assert.match(text, /^### /);
    assert.match(text, /Read first:/);
    assert.match(text, /\*\*Reply:\*\*/);
  }
});

test('ask stage table covers every artifact', () => {
  const table = readFileSync(join(ROOT, 'skills/egm-ask/references/stage-table.md'), 'utf8');
  for (const artifact of ARTIFACTS) assert.ok(table.includes(artifact), `stage table misses ${artifact}`);
});

test('egm-setup lists every model role', () => {
  const text = readFileSync(join(ROOT, 'skills/egm-setup/SKILL.md'), 'utf8');
  for (const role of MODEL_ROLES) assert.ok(text.includes(role), `missing role ${role}`);
});

test('rule packs are present with attribution', () => {
  for (const name of RULE_PACKS) {
    const file = join(ROOT, 'skills/rules/references', `${name}.md`);
    assert.ok(existsSync(file), `missing pack ${name}`);
    const text = readFileSync(file, 'utf8');
    if (name === 'oop-design') {
      assert.match(text, /Original work of egm-stack/, `${name} lacks the original notice`);
    } else {
      assert.match(text, /ciembor\/agent-rules-books/, `${name} lacks source`);
    }
    if (name !== 'oop-design') assert.match(text, /MIT/, `${name} lacks license`);
    assert.match(text, /condensed/i, `${name} lacks disclaimer`);
    assert.ok(countLines(text) <= 80, `${name} over 80 lines`);
  }
});

test('manifests agree on identity', () => {
  const files = ['plugin.json', '.claude-plugin/plugin.json', '.codex-plugin/plugin.json', '.cursor-plugin/plugin.json'];
  const parsed = files.map((file) => JSON.parse(readFileSync(join(ROOT, file), 'utf8')));
  assert.equal(new Set(parsed.map((item) => item.name)).size, 1);
  assert.equal(new Set(parsed.map((item) => item.version)).size, 1);
  assert.equal(new Set(parsed.map((item) => item.description)).size, 1);
  assert.equal(new Set(parsed.map((item) => item.license)).size, 1);
});

test('no CRLF in authored markdown', () => {
  const roots = ['skills', 'agents', 'resources', 'docs'];
  const walk = (rel) => {
    for (const name of readdirSync(join(ROOT, rel))) {
      const child = `${rel}/${name}`;
      if (statSync(join(ROOT, child)).isDirectory()) walk(child);
      else if (name.endsWith('.md')) {
        assert.ok(!readFileSync(join(ROOT, child), 'utf8').includes('\r\n'), `${child} has CRLF`);
      }
    }
  };
  for (const root of roots) walk(root);
});

test('statechart uses the portable launcher', () => {
  assert.ok(existsSync(join(ROOT, 'skills/statechart/scripts/run.mjs')));
  const text = readFileSync(join(ROOT, 'skills/statechart/SKILL.md'), 'utf8');
  assert.match(text, /scripts\/run\.mjs/);
  assert.ok(!existsSync(join(ROOT, 'skills/statechart/scripts/statechart')));
});
