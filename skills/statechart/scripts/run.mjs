#!/usr/bin/env node
// Portable launcher for the vendored statechart TypeScript pipeline.
// Replaces the upstream /bin/sh wrapper.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const entry = join(here, 'statechart.ts');
const args = process.argv.slice(2);

function version(command) {
  const result = spawnSync(command, ['--version'], { encoding: 'utf8' });
  if (result.status !== 0 || !result.stdout) return null;
  const match = /(\d+)\.(\d+)\.(\d+)/.exec(result.stdout);
  if (!match) return null;
  return Number(match[1]) * 1_000_000 + Number(match[2]) * 1_000 + Number(match[3]);
}

const node = version('node');
if (node !== null && (node >= 23_006_000 || (node >= 22_018_000 && node < 23_000_000))) {
  const result = spawnSync('node', ['--disable-warning=ExperimentalWarning', entry, ...args], { stdio: 'inherit' });
  process.exit(result.status ?? 1);
}

const bun = version('bun');
if (bun !== null && bun >= 1_001_005) {
  const result = spawnSync('bun', [entry, ...args], { stdio: 'inherit' });
  process.exit(result.status ?? 1);
}

const deno = version('deno');
if (deno !== null && deno >= 2_000_000) {
  const result = spawnSync('deno', ['run', '--quiet', '--no-prompt', '--allow-read', '--allow-write', '--allow-run', '--allow-env', entry, ...args], { stdio: 'inherit' });
  process.exit(result.status ?? 1);
}

console.error('statechart needs Node 22.18 to 22.x, Node 23.6 or later, Bun 1.1.5 or later, or Deno 2.0 or later.');
console.error('Install a supported runtime, then rerun this command.');
process.exit(127);
