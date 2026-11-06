import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, splitFrontmatter, firstSentence, markdownLinks, replaceRegion, countLines } from '../scripts/lib/frontmatter.mjs';
import { parseYamlList } from '../scripts/lib/yaml.mjs';

test('parses plain and boolean frontmatter', () => {
  const parsed = parseFrontmatter('---\nname: demo\ndescription: Does a thing.\nlicense: Apache-2.0\ndisable-model-invocation: true\n---\n\n# Demo\n');
  assert.equal(parsed.ok, true);
  assert.equal(parsed.data.name, 'demo');
  assert.equal(parsed.data['disable-model-invocation'], true);
  assert.match(parsed.body, /# Demo/);
});

test('parses folded descriptions', () => {
  const parsed = parseFrontmatter('---\nname: demo\ndescription: >-\n  First line\n  second line.\n---\nbody\n');
  assert.equal(parsed.ok, true);
  assert.equal(parsed.data.description, 'First line second line.');
});

test('parses quoted values', () => {
  const parsed = parseFrontmatter('---\nname: "demo"\ndescription: "Use for /demo."\n---\n');
  assert.equal(parsed.data.name, 'demo');
  assert.equal(parsed.data.description, 'Use for /demo.');
});

test('rejects a missing or unclosed block', () => {
  assert.equal(parseFrontmatter('# no frontmatter\n').ok, false);
  assert.equal(splitFrontmatter('---\nname: demo\n').ok, false);
});

test('rejects an unparseable line', () => {
  assert.equal(parseFrontmatter('---\nname demo\n---\n').ok, false);
});

test('firstSentence stops at the first period', () => {
  assert.equal(firstSentence('Apply when x. Then do y.'), 'Apply when x.');
  assert.equal(firstSentence('No terminator'), 'No terminator');
});

test('markdownLinks finds links and skips images', () => {
  const links = markdownLinks('See [a](x.md) and ![i](y.png).');
  assert.deepEqual(links, [
    { image: false, target: 'x.md' },
    { image: true, target: 'y.png' },
  ]);
});

test('replaceRegion replaces between markers', () => {
  const text = 'before\n<!-- s -->\nold\n<!-- e -->\nafter\n';
  const result = replaceRegion(text, '<!-- s -->', '<!-- e -->', 'new');
  assert.equal(result.ok, true);
  assert.match(result.text, /<!-- s -->\nnew\n<!-- e -->/);
  assert.doesNotMatch(result.text, /old/);
});

test('replaceRegion fails on missing markers', () => {
  assert.equal(replaceRegion('x', '<!-- a -->', '<!-- b -->', 'y').ok, false);
});

test('countLines counts the final line', () => {
  assert.equal(countLines('a\nb\n'), 3);
});

test('yaml list parser reads flat maps and comma lists', () => {
  const items = parseYamlList('# comment\n- id: one\n  prompt: "Do a thing."\n  packs: a, b\n- id: two\n  prompt: Do another.\n');
  assert.equal(items.length, 2);
  assert.equal(items[0].id, 'one');
  assert.equal(items[0].prompt, 'Do a thing.');
  assert.deepEqual(items[0].packs, ['a', 'b']);
  assert.equal(items[1].id, 'two');
});

test('yaml list parser rejects junk', () => {
  assert.throws(() => parseYamlList('id: one\n'));
});
