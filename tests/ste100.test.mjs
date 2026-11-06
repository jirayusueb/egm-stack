import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const LINT = 'scripts/ste100-lint.mjs';

function run(text, args = []) {
  const dir = mkdtempSync(join(tmpdir(), 'ste100-'));
  const file = join(dir, 'doc.md');
  writeFileSync(file, text);
  const result = spawnSync(process.execPath, [LINT, file, ...args], { encoding: 'utf8' });
  rmSync(dir, { recursive: true, force: true });
  return result;
}

test('clean imperative text passes', () => {
  const result = run('Close the valve.\n', ['--type', 'procedure']);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /0 heuristic finding/);
});

test('flags modals, passive, semicolons, and parentheses', () => {
  const result = run('The valve should be closed by the operator; close it (now).\n');
  assert.equal(result.status, 1);
  assert.match(result.stdout, /S1/);
  assert.match(result.stdout, /S4/);
  assert.match(result.stdout, /S6/);
  assert.match(result.stdout, /S7/);
});

test('flags long sentences with the configured limit', () => {
  const words = Array.from({ length: 26 }, (_, index) => `word${index}`).join(' ');
  const result = run(`${words}.\n`, ['--type', 'description']);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /S8/);
  assert.match(result.stdout, /26 words, limit is 25/);
});

test('procedure limit is 20 words by default', () => {
  const words = Array.from({ length: 22 }, (_, index) => `word${index}`).join(' ');
  const result = run(`Install ${words}.\n`, ['--type', 'procedure']);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /limit is 20/);
});

test('json output has a findings array and count', () => {
  const result = run('You should check it.\n', ['--json']);
  assert.equal(result.status, 1);
  const data = JSON.parse(result.stdout);
  assert.equal(data.type, 'description');
  assert.equal(data.count, data.findings.length);
  assert.ok(data.findings.length >= 1);
});

test('procedure step starting with an article is flagged', () => {
  const result = run('1. The cover is removed.\n', ['--type', 'procedure']);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /S10/);
});

test('help exits zero', () => {
  const result = spawnSync(process.execPath, [LINT, '--help'], { encoding: 'utf8' });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
});
