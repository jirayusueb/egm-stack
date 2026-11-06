# Agent guidelines

This repository is an agent-first skill stack. Read
[docs/designs/egm-stack.md](docs/designs/egm-stack.md) before changing anything.

## Authoring rules

- Every skill is `skills/<name>/SKILL.md` with exactly four frontmatter keys:
  `name` (equal to the directory), `description` (imperative, names the
  command and the situation, at most 1024 characters), `license: Apache-2.0`,
  `disable-model-invocation: true`.
- Stay within the line budget for the skill. Move detail into `references/`
  and say when to read it.
- Do not use harness-specific tool names, absolute paths, or shell commands in
  a skill body. Describe the action; `docs/harness.md` maps it to each host.
- Write for a tired engineer. Short declarative sentences. No long dashes. No
  mid-sentence colons. Every claim carries its evidence or its label.
- Never edit a generated region. Run `npm run build` instead. The regions are
  listed in the design spec.
- Reviewers are read-only. Only the parent or the synthesizer writes reports.
- `egm-ask` is read-only and advisory. It never writes, spawns, or acts on a
  pending gate.

## Delegation

- Use `delegate` for any subagent spawn: a self-contained brief, exact write
  scope, success criteria, verification, and report format.
- One writer per file. Disjoint scopes only. The Lead reviews the final diff and
  runs every check.
- Do not trust a summary without its artifact.

## Checks before you hand off

```sh
node scripts/build.mjs --check
node scripts/validate.mjs
node --test tests/
node scripts/sync-assets.mjs --check
```

## Attribution

Vendored content must carry its source URL, pinned commit, license, and a
"condensed; verify against the source" line. Update `NOTICE` and `UPSTREAM.md`
when you add a vendored file.

## Contribution boundaries

- No autonomous pull requests without human approval.
- No design doc under `docs/designs/` for a small patch; patch the existing doc.
- No splitting one cohesive change to dodge a review.
