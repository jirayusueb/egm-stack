// Static validation and coverage for every eval suite. Never calls a model.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseYamlList } from './lib/yaml.mjs';
import {
  CORE_SKILLS,
  EXTENDED_SKILLS,
  DOMAIN_SKILLS,
  EXPERIMENTAL_SKILLS,
  PLAYBOOKS,
  RULE_PACKS,
  ARTIFACTS,
} from './lib/contract.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

const SUITES = {
  routing: { min: 20, keys: ['expect', 'kind'], coverage: true },
  review: { min: 12 },
  resolve: { min: 6 },
  ask: { min: 8, askTypes: ['next-step', 'skill-choice', 'capability', 'troubleshooting', 'out-of-scope'] },
  delegation: { min: 7 },
  writing: { min: 6 },
  ddd: { min: 6 },
  statechart: { min: 4 },
  gates: { min: 6 },
  artifacts: { min: 4 },
};

function readEval(name) {
  const rel = `evals/${name}.yaml`;
  if (!existsSync(join(ROOT, rel))) {
    errors.push(`${rel}: missing eval suite`);
    return [];
  }
  try {
    return parseYamlList(readFileSync(join(ROOT, rel), 'utf8'));
  } catch (error) {
    errors.push(`${rel}: ${error.message}`);
    return [];
  }
}

const counts = {};
const routingCases = [];

for (const [name, rules] of Object.entries(SUITES)) {
  const cases = readEval(name);
  counts[name] = cases.length;
  if (cases.length < rules.min) errors.push(`evals/${name}.yaml: ${cases.length} cases, minimum is ${rules.min}`);
  const ids = new Set();
  const askTypes = new Set();
  for (const item of cases) {
    if (!item.id) errors.push(`evals/${name}.yaml: case without id`);
    if (ids.has(item.id)) errors.push(`evals/${name}.yaml: duplicate id ${item.id}`);
    ids.add(item.id);
    if (!item.prompt) errors.push(`evals/${name}.yaml: ${item.id} has no prompt`);
    if (!item.expect && !item.assert) errors.push(`evals/${name}.yaml: ${item.id} has neither expect nor assert`);
    if (item.expect && name === 'artifacts') {
      const ok = ARTIFACTS.includes(item.expect) || item.expect === 'docs/designs/';
      if (!ok) errors.push(`evals/artifacts.yaml: ${item.id} expects unknown artifact ${item.expect}`);
    }
    if (item.ask_type) askTypes.add(item.ask_type);
    if (name === 'routing') routingCases.push({ item, rules });
  }
  if (rules.askTypes) {
    for (const type of rules.askTypes) {
      if (!askTypes.has(type)) errors.push(`evals/ask.yaml: no case covers ask_type ${type}`);
    }
  }
}

// Routing coverage: every skill except the router, every playbook, every pack.
const routingCovered = new Set();
const routingPacks = new Set();
for (const { item } of routingCases) {
  if (!item.id) continue;
  if (!['skill', 'playbook'].includes(item.kind)) errors.push(`evals/routing.yaml: ${item.id} kind must be skill or playbook`);
  const known = [...CORE_SKILLS, ...EXTENDED_SKILLS, ...DOMAIN_SKILLS, ...EXPERIMENTAL_SKILLS];
  if (item.kind === 'skill' && !known.includes(item.expect)) errors.push(`evals/routing.yaml: ${item.id} expects unknown skill ${item.expect}`);
  if (item.kind === 'playbook' && !PLAYBOOKS.includes(item.expect)) errors.push(`evals/routing.yaml: ${item.id} expects unknown playbook ${item.expect}`);
  routingCovered.add(item.expect);
  for (const pack of item.packs ?? []) {
    if (!RULE_PACKS.includes(pack)) errors.push(`evals/routing.yaml: ${item.id} names unknown pack ${pack}`);
    routingPacks.add(pack);
  }
}
const requiredRouting = [...CORE_SKILLS, ...EXTENDED_SKILLS, ...DOMAIN_SKILLS, ...EXPERIMENTAL_SKILLS].filter((name) => name !== 'egm-mode');
for (const name of requiredRouting) {
  if (!routingCovered.has(name)) errors.push(`evals/routing.yaml: no case covers skill ${name}`);
}
for (const name of PLAYBOOKS) {
  if (!routingCovered.has(name)) errors.push(`evals/routing.yaml: no case covers playbook ${name}`);
}
for (const name of RULE_PACKS) {
  if (!routingPacks.has(name)) errors.push(`evals/routing.yaml: no case covers rule pack ${name}`);
}

// Notes on a suite are allowed; a suite may not be empty.
for (const [name, count] of Object.entries(counts)) {
  if (count === 0) errors.push(`evals/${name}.yaml: suite is empty`);
}

if (errors.length) {
  console.error(`eval --check: ${errors.length} problem(s)`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
const summary = Object.entries(counts).map(([name, count]) => `${name} ${count}`).join(', ');
console.log(`eval --check: ok (${summary})`);
