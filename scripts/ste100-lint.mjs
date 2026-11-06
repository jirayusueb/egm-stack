#!/usr/bin/env node
// Heuristic ASD-STE100 checker. Findings are approximations, not conformance.
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
if (args.includes('--help') || args.length === 0) {
  console.log(`Usage: node scripts/ste100-lint.mjs <file> [options]

Options:
  --type procedure|description  Text type. Default description.
  --max-words <n>               Override the sentence word limit.
  --json                        Print JSON instead of text.
  --help                        Show this help.

Heuristics only. Conformance requires the official ASD-STE100 dictionary.`);
  process.exit(0);
}

const file = args[0];
const typeIndex = args.indexOf('--type');
const type = typeIndex === -1 ? 'description' : args[typeIndex + 1];
if (!['procedure', 'description'].includes(type)) {
  console.error('--type must be procedure or description');
  process.exit(2);
}
const maxIndex = args.indexOf('--max-words');
const limit = maxIndex === -1 ? (type === 'procedure' ? 20 : 25) : Number(args[maxIndex + 1]);
const asJson = args.includes('--json');

let text;
try {
  text = readFileSync(file, 'utf8');
} catch (error) {
  console.error(`cannot read ${file}: ${error.message}`);
  process.exit(2);
}

const lines = text.split(/\r?\n/);
const findings = [];

function add(line, rule, message, severity = 'warning') {
  findings.push({ line, rule, message, severity });
}

const MODALS = /\b(should|may|might|could|would)\b/i;
const CONTRACTION = /\b\w+'(t|s|re|ve|ll|d|m)\b/i;
const LATIN = /\b(etc\.|i\.e\.|e\.g\.|vs\.)\b/i;
const PASSIVE = /\b(is|are|was|were|be|been|being)\s+\w+(ed|en)\b/i;
const ING = /\b\w{4,}ing\b/i;
const ALLOWED_ING = new Set(['during', 'thing', 'something', 'nothing', 'anything', 'everything', 'ceiling', 'string', 'ring', 'bring']);
const MAX_PARAGRAPH_SENTENCES = 6;

let inFence = false;
let paragraphSentences = 0;

for (let index = 0; index < lines.length; index++) {
  const raw = lines[index];
  const lineNumber = index + 1;
  if (/^\s*(```|~~~)/.test(raw)) { inFence = !inFence; continue; }
  if (inFence) continue;
  const line = raw.trim();
  if (!line) { paragraphSentences = 0; continue; }
  if (/^#{1,6}\s/.test(line)) continue;
  if (/^\|/.test(line)) continue;

  const prose = line
    .replace(/^[-*+]\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ');

  if (MODALS.test(prose)) add(lineNumber, 'S1', 'modal verb found; prefer must, can, or a direct command');
  if (CONTRACTION.test(prose)) add(lineNumber, 'S2', 'contraction found; write the full form');
  if (LATIN.test(prose)) add(lineNumber, 'S3', 'Latin abbreviation found; write it out or drop it');
  if (PASSIVE.test(prose)) add(lineNumber, 'S4', 'possible passive voice; name the actor');
  for (const word of prose.match(/\b\w{4,}ing\b/g) ?? []) {
    if (!ALLOWED_ING.has(word.toLowerCase())) {
      add(lineNumber, 'S5', `possible -ing verb "${word}"; use an approved verb form`);
    }
  }
  if (prose.includes(';')) add(lineNumber, 'S6', 'semicolon found; split into sentences');
  if (prose.includes('(') || prose.includes(')')) add(lineNumber, 'S7', 'parenthetical aside found; make it its own sentence');

  const sentences = prose
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  for (const sentence of sentences) {
    const words = sentence.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word));
    if (words.length > limit) {
      add(lineNumber, 'S8', `sentence has ${words.length} words, limit is ${limit}`);
    }
  }
  paragraphSentences += sentences.length;
  if (paragraphSentences > MAX_PARAGRAPH_SENTENCES) {
    add(lineNumber, 'S9', `paragraph has more than ${MAX_PARAGRAPH_SENTENCES} sentences`);
    paragraphSentences = 0;
  }

  if (type === 'procedure' && /^\d+\.\s+/.test(line)) {
    const first = prose.split(/\s+/)[0] ?? '';
    if (/^(the|a|an|this|that|it|there|is|are|was|were)$/i.test(first) || ING.test(first)) {
      add(lineNumber, 'S10', 'procedure step does not start with an imperative verb');
    }
  }
}

if (asJson) {
  console.log(JSON.stringify({ file, type, limit, findings, count: findings.length }, null, 2));
} else {
  for (const finding of findings) {
    console.log(`${file}:${finding.line}: ${finding.rule} ${finding.message}`);
  }
  console.log(`${file}: ${findings.length} heuristic finding(s) (${type}, ${limit} word limit)`);
}
process.exit(findings.length ? 1 : 0);
