// Generate every derived index in the repo. `--check` compares instead of writing.
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseFrontmatter,
  firstHeading,
  firstSentence,
  replaceRegion,
  countLines,
} from './lib/frontmatter.mjs';
import {
  CORE_SKILLS,
  EXTENDED_SKILLS,
  DOMAIN_SKILLS,
  EXPERIMENTAL_SKILLS,
  PRINCIPLE_GROUPS,
  PRINCIPLE_TITLES,
  RULE_PACKS,
} from './lib/contract.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

function read(rel) {
  return readFileSync(join(ROOT, rel), 'utf8');
}

function readJson(rel) {
  return JSON.parse(read(rel));
}

function listDirs(rel) {
  if (!existsSync(join(ROOT, rel))) return [];
  return readdirSync(join(ROOT, rel)).filter((name) => {
    const full = join(ROOT, rel, name);
    return statSync(full).isDirectory();
  });
}

function skills() {
  return listDirs('skills').map((dir) => {
    const file = `skills/${dir}/SKILL.md`;
    if (!existsSync(join(ROOT, file))) return null;
    const parsed = parseFrontmatter(read(file));
    if (!parsed.ok) return null;
    return {
      dir,
      file,
      name: parsed.data.name ?? dir,
      description: String(parsed.data.description ?? ''),
      lines: countLines(read(file)),
    };
  }).filter(Boolean);
}

function tierOf(name) {
  if (CORE_SKILLS.includes(name)) return 'Core';
  if (EXTENDED_SKILLS.includes(name)) return 'Extended';
  if (DOMAIN_SKILLS.includes(name)) return 'Domain';
  if (EXPERIMENTAL_SKILLS.includes(name)) return 'Experimental';
  if (name.startsWith('principle-')) return 'Principle';
  return 'Unknown';
}

function principles(all) {
  return all
    .filter((skill) => skill.name.startsWith('principle-'))
    .map((skill) => {
      const suffix = skill.name.slice('principle-'.length);
      const group = Object.entries(PRINCIPLE_GROUPS).find(([, names]) => names.includes(suffix));
      return {
        ...skill,
        suffix,
        title: PRINCIPLE_TITLES[suffix] ?? firstHeading(read(skill.file)) ?? suffix,
        group: group ? group[0] : 'Meta',
      };
    });
}

function playbooks() {
  const dir = 'skills/egm-mode/playbooks';
  if (!existsSync(join(ROOT, dir))) return [];
  return readdirSync(join(ROOT, dir))
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map((name) => {
      const text = read(`${dir}/${name}`);
      const lines = text.split(/\r?\n/);
      const titleLine = lines.find((line) => line.startsWith('### ')) ?? '';
      const title = titleLine.replace(/^###\s+/, '').trim();
      const titleIndex = lines.indexOf(titleLine);
      let thesis = '';
      for (let i = titleIndex + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        thesis = line.replace(/\*\*/g, '').replace(/^[-*]\s*/, '').trim();
        break;
      }
      return { name, file: `${dir}/${name}`, title, thesis };
    });
}

function modeIndex(skillList) {
  const leaves = principles(skillList);
  const order = Object.keys(PRINCIPLE_GROUPS);
  const out = [];
  for (const group of order) {
    const groupLeaves = leaves.filter((leaf) => leaf.group === group);
    if (!groupLeaves.length) continue;
    out.push(`**${group}**`, '');
    for (const leaf of groupLeaves) {
      out.push(`- **${leaf.title}.** ${leaf.description.trim()} ([rule](../${leaf.dir}/SKILL.md))`);
    }
    out.push('');
  }
  return out.join('\n').trim();
}

function modePlaybooks(list) {
  return list
    .map((book) => `- **${book.title}.** ${book.thesis} ([steps](playbooks/${book.name}))`)
    .join('\n');
}

function skillsTable(skillList) {
  const rows = ['| Skill | Tier | What it does |', '| --- | --- | --- |'];
  const order = ['Core', 'Extended', 'Domain', 'Experimental'];
  const nonPrinciples = skillList
    .filter((skill) => !skill.name.startsWith('principle-'))
    .sort((a, b) => {
      const ai = order.indexOf(tierOf(a.name));
      const bi = order.indexOf(tierOf(b.name));
      if (ai !== bi) return ai - bi;
      return a.name.localeCompare(b.name);
    });
  for (const skill of nonPrinciples) {
    rows.push(`| \`${skill.name}\` | ${tierOf(skill.name)} | ${firstSentence(skill.description)} |`);
  }
  return rows.join('\n');
}

function playbookTable(list) {
  const rows = ['| Playbook | Use it when |', '| --- | --- |'];
  for (const book of list) {
    rows.push(`| \`${book.title}\` | ${book.thesis} |`);
  }
  return rows.join('\n');
}

function principleTable(skillList) {
  const leaves = principles(skillList);
  const rows = ['| Principle | Rule |', '| --- | --- |'];
  for (const leaf of leaves) {
    rows.push(`| \`${leaf.name}\` | ${firstSentence(leaf.description)} |`);
  }
  return rows.join('\n');
}

function skillsDoc(skillList) {
  const groups = ['Core', 'Extended', 'Domain', 'Experimental', 'Principle'];
  const out = ['# Skills', '', 'Generated by `scripts/build.mjs`. Do not edit by hand.', ''];
  for (const group of groups) {
    const items = skillList
      .filter((skill) => tierOf(skill.name) === group)
      .sort((a, b) => a.name.localeCompare(b.name));
    if (!items.length) continue;
    out.push(`## ${group}`, '');
    for (const item of items) {
      out.push(`- **\`${item.name}\`** (${item.lines} lines): ${firstSentence(item.description)}`);
    }
    out.push('');
  }
  return out.join('\n');
}

function stageTable() {
  const rel = 'skills/egm-ask/references/stage-table.md';
  if (!existsSync(join(ROOT, rel))) return '';
  return read(rel)
    .replace(/^---[\s\S]*?---\s*/, '')
    .trim();
}

function rulesIndex() {
  const rows = ['# Rule packs', '', 'Generated by `scripts/build.mjs`. Do not edit by hand.', '',
    '| Pack | Use for |', '| --- | --- |'];
  for (const name of RULE_PACKS) {
    const rel = `skills/rules/references/${name}.md`;
    if (!existsSync(join(ROOT, rel))) continue;
    const text = read(rel);
    const title = firstHeading(text) || name;
    const whenMatch = /##\s+When to use\s*\n+([\s\S]*?)(\n##|$)/i.exec(text);
    let when = whenMatch ? firstSentence(whenMatch[1].replace(/\s+/g, ' ').trim()) : '';
    if (!when) {
      const decision = /##\s+Decision rules\s*\n+([\s\S]*?)(\n##|$)/i.exec(text);
      if (decision) {
        const bullet = decision[1].split(/\r?\n/).map((line) => line.trim()).find((line) => line.startsWith('- '));
        if (bullet) when = firstSentence(bullet.replace(/^-\s+/, ''));
      }
    }
    rows.push(`| [${title.replace(/\|/g, '/')}](${name}.md) | ${when.replace(/\|/g, '/')} |`);
  }
  return rows.join('\n');
}

function apply(text, start, end, replacement, problems, label) {
  const result = replaceRegion(text, start, end, replacement);
  if (!result.ok) {
    problems.push(`${label}: ${result.reason}`);
    return text;
  }
  return result.text;
}

function main() {
  const problems = [];
  const all = skills();
  const books = playbooks();
  const outputs = new Map();

  const modeRel = 'skills/egm-mode/SKILL.md';
  if (existsSync(join(ROOT, modeRel))) {
    let text = read(modeRel);
    text = apply(
      text,
      '<!-- generated:principles:start -->',
      '<!-- generated:principles:end -->',
      modeIndex(all),
      problems,
      modeRel,
    );
    text = apply(
      text,
      '<!-- generated:playbooks:start -->',
      '<!-- generated:playbooks:end -->',
      modePlaybooks(books),
      problems,
      modeRel,
    );
    outputs.set(modeRel, text);
  }

  if (existsSync(join(ROOT, 'README.md'))) {
    let text = read('README.md');
    text = apply(text, '<!-- generated:skills:start -->', '<!-- generated:skills:end -->', skillsTable(all), problems, 'README.md');
    text = apply(text, '<!-- generated:playbooks:start -->', '<!-- generated:playbooks:end -->', playbookTable(books), problems, 'README.md');
    text = apply(text, '<!-- generated:principles:start -->', '<!-- generated:principles:end -->', principleTable(all), problems, 'README.md');
    outputs.set('README.md', text);
  }

  if (existsSync(join(ROOT, 'docs/getting_started.md'))) {
    let text = read('docs/getting_started.md');
    text = apply(text, '<!-- stage-table:start -->', '<!-- stage-table:end -->', stageTable(), problems, 'docs/getting_started.md');
    outputs.set('docs/getting_started.md', text);
  }

  outputs.set('docs/skills.md', skillsDoc(all));
  outputs.set('skills/rules/references/index.md', rulesIndex());

  if (CHECK) {
    const stale = [];
    for (const [rel, expected] of outputs) {
      const full = join(ROOT, rel);
      if (!existsSync(full)) { stale.push(`${rel} (missing)`); continue; }
      if (read(rel) !== expected) stale.push(rel);
    }
    if (problems.length) {
      console.error(problems.join('\n'));
      process.exitCode = 1;
    }
    if (stale.length) {
      console.error(`Generated content is stale:\n${stale.map((s) => `- ${s}`).join('\n')}\nRun: npm run build`);
      process.exitCode = 1;
    }
    if (!problems.length && !stale.length) console.log(`build --check: ${outputs.size} generated regions up to date`);
    return;
  }

  if (problems.length) {
    console.error(problems.join('\n'));
    process.exitCode = 1;
    return;
  }
  for (const [rel, content] of outputs) {
    writeFileSync(join(ROOT, rel), content, 'utf8');
  }
  console.log(`build: wrote ${outputs.size} generated regions`);
}

main();
