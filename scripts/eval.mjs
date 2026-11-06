// Static checks for the eval suites. Live runs follow docs/evals.md.
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
} from './lib/contract.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

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

function checkRouting() {
  const cases = readEval('routing');
  const seen = new Set();
  const covered = new Set();
  const packs = new Set();
  for (const item of cases) {
    if (!item.id) errors.push('evals/routing.yaml: case without id');
    if (seen.has(item.id)) errors.push(`evals/routing.yaml: duplicate id ${item.id}`);
    seen.add(item.id);
    if (!item.prompt) errors.push(`evals/routing.yaml: ${item.id} has no prompt`);
    if (!item.expect) errors.push(`evals/routing.yaml: ${item.id} has no expect`);
    if (!['skill', 'playbook'].includes(item.kind)) errors.push(`evals/routing.yaml: ${item.id} kind must be skill or playbook`);
    if (item.kind === 'playbook' && !PLAYBOOKS.includes(item.expect)) {
      errors.push(`evals/routing.yaml: ${item.id} expects unknown playbook ${item.expect}`);
    }
    if (item.kind === 'skill' && ![...CORE_SKILLS, ...EXTENDED_SKILLS, ...DOMAIN_SKILLS, ...EXPERIMENTAL_SKILLS].includes(item.expect)) {
      errors.push(`evals/routing.yaml: ${item.id} expects unknown skill ${item.expect}`);
    }
    covered.add(item.expect);
    for (const pack of item.packs ?? []) {
      if (!RULE_PACKS.includes(pack)) errors.push(`evals/routing.yaml: ${item.id} names unknown pack ${pack}`);
      packs.add(pack);
    }
  }
  const required = [...CORE_SKILLS, ...EXTENDED_SKILLS, ...DOMAIN_SKILLS, ...EXPERIMENTAL_SKILLS]
    .filter((name) => name !== 'egm-mode');
  for (const name of required) {
    if (!covered.has(name)) errors.push(`evals/routing.yaml: no case covers skill ${name}`);
  }
  for (const name of PLAYBOOKS) {
    if (!covered.has(name)) errors.push(`evals/routing.yaml: no case covers playbook ${name}`);
  }
  for (const name of RULE_PACKS) {
    if (!packs.has(name)) errors.push(`evals/routing.yaml: no case covers rule pack ${name}`);
  }
  return cases.length;
}

function checkSuite(name, requiredKeys) {
  const cases = readEval(name);
  const seen = new Set();
  for (const item of cases) {
    if (!item.id) errors.push(`evals/${name}.yaml: case without id`);
    if (seen.has(item.id)) errors.push(`evals/${name}.yaml: duplicate id ${item.id}`);
    seen.add(item.id);
    for (const key of requiredKeys) {
      if (!item[key]) errors.push(`evals/${name}.yaml: ${item.id} has no ${key}`);
    }
  }
  return cases.length;
}

const routing = checkRouting();
const gates = checkSuite('gates', ['prompt', 'assert']);
const artifacts = checkSuite('artifacts', ['prompt', 'expect']);

if (errors.length) {
  console.error(`eval --check: ${errors.length} problem(s)`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`eval --check: ok (${routing} routing, ${gates} gate, ${artifacts} artifact cases)`);
