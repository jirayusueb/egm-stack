#!/usr/bin/env node
// Security scan over skill content. Catches patterns that turn a skill into
// an attack surface: shell pipelines from the network, eval, credential
// collection, exfiltration instructions, and instruction-following language
// aimed at injected content.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const RULES = [
  [/curl[^|]*\|\s*(ba)?sh|wget[^|]*\|\s*(ba)?sh/i, 'pipe-from-network-to-shell'],
  [/\beval\s*\(/, 'eval in code'],
  [/child_process|execSync|spawnSync/, 'process execution named in a skill body'],
  [/(api[_ -]?key|secret|password|token)\s*[:=]\s*['"][^'"]{8,}/i, 'literal credential'],
  [/(send|post|upload|exfiltrate)[^.\n]{0,40}(to|https?:\/\/)[^.\n]{0,30}(webhook|pastebin|external)/i, 'exfiltration instruction'],
  [/ignore (all|previous|these) instructions/i, 'injection phrase'],
  [/disregard (the )?(above|previous)/i, 'injection phrase'],
];

for (const group of ['skills', 'agents', 'resources']) {
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) { walk(full); continue; }
      if (!name.endsWith('.md')) continue;
      const rel = join(group, join(dir, name).replace(join(ROOT, group), '').replace(/^\//, ''));
      const text = readFileSync(full, 'utf8');
      if (/rules\/references\//.test(full)) continue; // vendored packs are data
      const lines = text.split('\n');
      lines.forEach((l, i) => {
        // code blocks may legitimately demonstrate; flag prose only outside fences
        for (const [re, why] of RULES) {
          if (re.test(l)) errors.push(`${rel}: L${i + 1} ${why}`);
        }
      });
    }
  };
  walk(join(ROOT, group));
}

if (errors.length) { console.error(`skill-security: ${errors.length} problem(s)`); errors.forEach(e => console.error('- ' + e)); process.exit(1); }
console.log('skill-security: ok');
