#!/usr/bin/env node
// Annotated file tree for review context. Marks diff-changed files with *.
// Usage: node scripts/tree.mjs [--base <ref>] [--depth N] [--subtree <path>]...
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(`--${name}`); return i === -1 ? undefined : args[i + 1]; };
const base = opt('base');
const depth = Number(opt('depth') ?? 3);
const subtrees = args.filter((_, i) => args[i - 1]?.startsWith('--') === false && !args[i]?.startsWith('--'));
const git = (cmd) => { try { return execSync(cmd, { encoding: 'utf8', maxBuffer: 1 << 24 }); } catch { return ''; } };

let files = git('git ls-files').split('\n').filter(Boolean);
let changed = new Set();
if (base) {
  changed = new Set(git(`git diff --name-only ${JSON.stringify(base)}...HEAD`).split('\n').filter(Boolean).concat(
    git(`git diff --name-only ${JSON.stringify(base)}`).split('\n').filter(Boolean)));
  if (!changed.size) { console.error(`no diff against ${base}`); process.exit(1); }
  const dirs = new Set([...changed].map((f) => f.split('/').slice(0, -1).join('/')).filter(Boolean));
  files = files.filter((f) => [...dirs].some((d) => f.startsWith(d + '/')) || changed.has(f));
} else if (subtrees.length) {
  files = files.filter((f) => subtrees.some((t) => f.startsWith(t)));
}
const SKIP = /\.(png|jpg|jpeg|gif|svg|ico|lock|pdf|zip|woff2?)$|node_modules|^\.git\//;
files = files.filter((f) => !SKIP.test(f));

const tree = {};
for (const f of files) {
  const parts = f.split('/');
  let node = tree;
  parts.forEach((part, i) => {
    const last = i === parts.length - 1;
    node[part] = last ? (changed.has(f) ? '*' : '') : (node[part] ?? {});
    node = last ? node : node[part];
  });
}
const lines = [];
const walk = (node, prefix, level) => {
  const entries = Object.entries(node).sort(([a], [b]) => (typeof node[a] === 'object' ? 0 : 1) - (typeof node[b] === 'object' ? 0 : 1) || a.localeCompare(b));
  for (const [name, child] of entries) {
    if (typeof child === 'object') {
      lines.push(`${prefix}${name}/`);
      if (level < depth - 1) walk(child, `${prefix}  `, level + 1);
      else if (Object.keys(child).length) lines.push(`${prefix}  ...`);
    } else {
      lines.push(`${prefix}${name}${child}`);
    }
  }
};
walk(tree, '', 0);
console.log(lines.slice(0, 400).join('\n'));
if (lines.length > 400) console.log(`... ${lines.length - 400} more lines`);
