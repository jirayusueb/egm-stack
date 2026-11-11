#!/usr/bin/env node
// Structure views for review and navigation. Heuristic by design; the reader
// verifies against real lines before concluding anything.
// Usage:
//   node scripts/outline.mjs [--base <ref>] [--components|--classes|--api]
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(`--${n}`); return i === -1 ? undefined : args[i + 1]; };
const base = opt('base') ?? 'HEAD~1';
const mode = args.includes('--components') ? 'components' : args.includes('--classes') ? 'classes' : args.includes('--api') ? 'api' : 'symbols';
const git = (c) => { try { return execSync(c, { encoding: 'utf8', maxBuffer: 1 << 24 }); } catch { return ''; } };

// ---- shared: changed files + hunk ranges ----
const changed = git(`git diff --name-only ${JSON.stringify(base)}`).split('\n').filter(Boolean);
if (!changed.length) { console.error(`no diff against ${base}`); process.exit(1); }
const ranges = {};
for (const f of changed) {
  ranges[f] = [];
  for (const line of git(`git diff -U0 ${JSON.stringify(base)} -- ${JSON.stringify(f)}`).split('\n')) {
    const m = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/.exec(line);
    if (m) { const a = +m[1], n = (m[2] === undefined ? 1 : +m[2]); ranges[f].push([a, a + Math.max(n - 1, 0)]); }
  }
}
const read = (f, rev = 'HEAD') => rev === 'HEAD'
  ? (existsSync(f) ? readFileSync(f, 'utf8') : '')
  : git(`git show HEAD:${JSON.stringify(f)}`);
const touched = (s, r) => r.some(([a, b]) => b >= s.line && a <= s.end);

// ---- extractors ----
const DECL = /^(export\s+)?(default\s+)?(async\s+)?(function\s*\*?\s*([A-Za-z_$][\w$]*)|class\s+([A-Za-z_$][\w$]*)|const\s+([A-Za-z_$][\w$]*)\s*([:=]))/;
const METHOD = /^(\s*)(?:(async|get|set)\s+)?\*?\s*([A-Za-z_$][\w$]*)\s*\(/;
const kindOf = (name, file, arrow) => {
  const isTsx = /\.(tsx|jsx)$/.test(file);
  if (/^use[A-Z]/.test(name)) return 'hook';
  if (isTsx && /^[A-Z]/.test(name)) return 'cmp';
  return arrow ? 'fn' : 'const';
};
function symbols(text, file) {
  const lines = text.split('\n'); const syms = []; let inClass = -1;
  lines.forEach((l, i) => {
    if (!l.trim()) return;
    const indent = l.match(/^\s*/)[0].length;
    if (inClass >= 0 && indent <= inClass) inClass = -1;
    const m = DECL.exec(l);
    if (m) {
      let name, kind;
      if (m[5]) { name = m[5]; kind = kindOf(name, file, true); }
      else if (m[6]) { name = m[6]; kind = 'class'; }
      else { name = m[7]; kind = kindOf(name, file, /\)\s*=>/.test(l)); }
      if (name) { syms.push({ name, kind, line: i + 1, indent }); if (kind === 'class') inClass = indent; }
      return;
    }
    if (inClass >= 0 && indent > inClass) {
      const mm = METHOD.exec(l);
      const kw = new Set(['if','for','while','switch','catch','return','new','await','throw']);
      if (mm && !kw.has(mm[3])) syms.push({ name: mm[3], kind: 'mth', line: i + 1, indent });
    }
  });
  syms.forEach((s, i) => {
    let end = lines.length;
    for (let j = i + 1; j < syms.length; j++) if (syms[j].indent <= s.indent) { end = syms[j].line - 1; break; }
    s.end = end;
  });
  return syms;
}
const propsOf = (text, name) => {
  const sig = text.split('\n').find(l => new RegExp(`(function\\s+${name}\\s*\\(|=\\s*\\(|class\\s+${name})`).test(l));
  if (!sig) return null;
  const m = /\(\s*\{([^}]*)\}\s*\)/.exec(sig);
  return m ? m[1].split(',').map(s => s.trim().split(/[:?]/)[0].trim()).filter(Boolean) : null;
};

// ---- renderers ----
function renderSymbols() {
  const out = [];
  for (const f of changed) {
    const now = symbols(read(f) || git(`git show HEAD:${JSON.stringify(f)}`), f);
    let before = new Set();
    const prev = git(`git show ${JSON.stringify(base)}:${JSON.stringify(f)}`);
    if (prev) before = new Set(symbols(prev, f).map(s => s.name));
    out.push(`${f}*`);
    for (const s of now) {
      const t = touched(s, ranges[f]);
      const tag = !before.has(s.name) && prev ? ' <- new' : t ? '*' : '';
      out.push(`${' '.repeat(2 + Math.floor(s.indent / 2))}[${s.kind.padEnd(5)}] ${s.name}${tag}   L${s.line}`);
    }
  }
  return out.join('\n');
}
function renderComponents() {
  const defs = new Map(); // name -> {file, text}
  for (const f of changed) {
    const text = read(f) || git(`git show HEAD:${JSON.stringify(f)}`); if (!text) continue;
    for (const s of symbols(text, f)) if (s.kind === 'cmp' || s.kind === 'hook') defs.set(s.name, { file: f, text });
  }
  const edges = new Map(); // parent -> children[]
  const usedBy = new Map();
  for (const [name, { file, text }] of defs) {
    for (const [other, { text: ot }] of defs) {
      if (other === name) continue;
      if (new RegExp(`<${other}[\\s/>]`).test(ot) && !importMismatch(ot, other)) {
        edges.get(name)?.push(other) ?? edges.set(name, [other]);
        usedBy.set(other, (usedBy.get(other) ?? 0) + 1);
      }
    }
  }
  function importMismatch() { return false; } // heuristic pass; refine later
  const out = [];
  const seen = new Set();
  const walk = (name, depth) => {
    if (seen.has(name) || depth > 4) return;
    seen.add(name);
    const d = defs.get(name);
    const props = propsOf(d.text, name);
    const marks = marksFor(d.file, name);
    out.push(`${'  '.repeat(depth)}${name}${marks} (${props ? props.join(', ') : 'props: ?'})`);
    for (const c of edges.get(name) ?? []) walk(c, depth + 1);
  };
  function marksFor(file, name) {
    const text = read(file) || git(`git show HEAD:${JSON.stringify(file)}`);
    const s = symbols(text, file).find(x => x.name === name);
    return s && touched(s, ranges[file]) ? '*' : '';
  }
  for (const name of defs.keys()) if (!usedBy.has(name)) walk(name, 0);
  for (const name of defs.keys()) if (!seen.has(name)) walk(name, 0);
  return out.join('\n');
}
function renderClasses() {
  const out = [];
  for (const f of changed) {
    const text = read(f) || git(`git show HEAD:${JSON.stringify(f)}`); if (!text) continue;
    const lines = text.split('\n');
    lines.forEach((l, i) => {
      const m = /^(export\s+)?(?:abstract\s+)?class\s+([A-Za-z_$][\w$]*)(?:\s+extends\s+([A-Za-z_$][\w$<>., ]+?))?(?:\s+implements\s+([A-Za-z_$][\w$<>., ]+?))?\s*\{/.exec(l);
      if (!m) return;
      const touchedCls = ranges[f].some(([a, b]) => b >= i + 1);
      out.push(`${(m[1]?.includes('abstract') || /abstract/.test(l) ? 'abstract ' : '')}${m[2]}${touchedCls ? '*' : ''}${m[3] ? ` extends ${m[3]}` : ''}${m[4] ? ` implements ${m[4]}` : ''}   ${f}:${i + 1}`);
      const syms = symbols(text, f).filter(s => s.kind === 'mth' && s.line > i + 1);
      for (const s of syms.slice(0, 8)) out.push(`  ${s.name}${touched(s, ranges[f]) ? '*' : ''}`);
    });
  }
  return out.join('\n');
}
function renderApi() {
  const out = [];
  const specFile = ['openapi.yaml', 'openapi.json', 'docs/openapi.yaml'].find(existsSync);
  if (specFile) {
    const text = readFileSync(specFile, 'utf8');
    const paths = [...text.matchAll(/^\s{2}(\/[^\s:]+):\s*$/gm)].map(m => m[1]);
    for (const p of paths) out.push(p);
    return `${out.join('\n')}\n(spec: ${specFile}; field-level diff marking: compare with git diff of the spec)`;
  }
  // infer from handlers
  for (const f of changed) {
    const text = read(f) || git(`git show HEAD:${JSON.stringify(f)}`); if (!text) continue;
    for (const m of text.matchAll(/(?:router|app)\.(get|post|put|patch|delete)\(\s*['"]([^'"]+)['"]/g)) {
      out.push(`${m[2].toUpperCase().padEnd(6)} ${m[1] === 'del' ? 'DELETE' : m[1].toUpperCase()} ${m[1]}  (${f}) inferred`);
    }
    for (const m of text.matchAll(/@(app|router)\.(get|post|put|patch|delete)\(\s*['"]([^'"]+)['"]/g)) {
      out.push(`${m[3].toUpperCase().padEnd(6)} ${m[2].toUpperCase()} ${m[3]}  (${f}) inferred`);
    }
  }
  if (!out.length) return 'no api surface found in changed files';
  return out.join('\n') + '\n(inferred from handlers; no spec file. That absence is itself a finding.)';
}

console.log(mode === 'components' ? renderComponents() : mode === 'classes' ? renderClasses() : mode === 'api' ? renderApi() : renderSymbols());
