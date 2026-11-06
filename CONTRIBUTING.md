# Contributing

Read [AGENTS.md](AGENTS.md) and [docs/designs/egm-stack.md](docs/designs/egm-stack.md)
first. This repository is maintained by agents and humans under the same rules.

## Setup

Node 20 or later. No dependencies.

```sh
npm run validate
npm test
npm run build:check
node scripts/sync-assets.mjs --check
node scripts/eval.mjs --check
node scripts/describe-eval.mjs --check
node scripts/check-regressions.mjs
```

`npm run check` runs all four.

## Changing a skill

1. Edit `skills/<name>/SKILL.md` or its `references/`.
2. Stay inside the line budget.
3. Do not edit generated regions; run `npm run build`.
4. Add or update an eval case in `evals/` when routing or behavior changes.
5. Run the checks above.

## Adding a skill

A new skill needs a tier in the design spec, a named gap it fills, a line
budget, a reference in `docs/skills.md` generation, and at least one eval case.
Surface growth without a gap is rejected.

## Vendored content

Add the source URL, pinned commit, license, and a "condensed; verify against the
source" line to the file header. Update [UPSTREAM.md](UPSTREAM.md) and
[NOTICE](NOTICE).

## Pull requests

One cohesive change per pull request. Describe what changed, why, and the checks
you ran. Do not open a pull request without human review.
