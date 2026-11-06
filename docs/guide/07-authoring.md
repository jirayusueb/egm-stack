# 07 Authoring

A skill is a rule an agent follows. Change it the way you would change code.
Keep it small, prove it, and let the generated indexes do the bookkeeping.

## The skill format

Every skill is `skills/<name>/SKILL.md` with exactly four frontmatter keys.

```yaml
---
name: <directory name>
description: <imperative, names /command and the situation, <=1024 chars>
license: Apache-2.0
disable-model-invocation: true
---
```

The name equals the directory. Validation fails when they disagree. The
description is the trigger surface, so it names the command and the situation.
`disable-model-invocation` keeps the skill out of the model's own catalog. The
user types the command, or another skill reads the path.

## Line budgets

A budget is a promise that the skill stays readable. Put detail in
`references/` and say when to read it.

| Tier | Example skills | Budget |
| --- | --- | --- |
| Router | `egm-mode` | 300 |
| Core workflow | `egm-review` 190, `egm-draft` 140, `egm-brainstorm` 120 | 80 to 190 |
| Extended | `delegate` 130, `why` 120, `unslop` 100 | 50 to 130 |
| Domain and experimental | `ddd` 130, `statechart` 90 | 90 to 140 |
| Principle | `skills/principle-*` | 30 |
| Playbook | `skills/egm-mode/playbooks/*.md` | 45 |

A reference file has no frontmatter and no line budget of its own. It is loaded
on purpose, so it can be longer. It still follows the same writing rules.

## Playbook shape

```markdown
### <Title>

**<Bold thesis. You own X.>**

<Optional Read first: pack.>

1. <Step naming the skill to call.>
2. <Step.>

**Reply:** <the fields unique to this playbook.>
```

A playbook is one file, one task. It never restates a rule another skill owns.
It links to the skill and says when to read it.

## Writing rules

- Short declarative sentences. One thought per sentence.
- No long dashes. No mid-sentence colons.
- No harness-specific tool names, absolute paths, or shell commands in a skill
  body. Describe the action. The harness map names the tool.
- Every claim carries its evidence or its label.

## Generated regions

Never hand edit a generated region. Run `npm run build`.

| Output | Markers |
| --- | --- |
| `skills/egm-mode/SKILL.md` principles and playbooks | `generated:principles`, `generated:playbooks` |
| `README.md` tables | `generated:skills`, `generated:playbooks`, `generated:principles` |
| `docs/getting_started.md` stage table | `stage-table` |
| `docs/skills.md` | the whole file |
| `skills/rules/references/index.md` | the whole file |

`node scripts/build.mjs --check` fails when a region is stale.

## Changing a skill

1. Edit the `SKILL.md` or its `references/`.
2. Stay inside the budget.
3. Keep the frontmatter at four keys.
4. Add or update an eval case when routing or behavior changes.
5. Run the checks in [AGENTS.md](../../AGENTS.md).

`npm run validate` enforces frontmatter and name parity, link integrity, size
budgets, generated freshness, and banned tokens. It is not a style preference.
It is the contract.

## Adding a skill

A new skill needs five things.

- A tier in the design spec.
- A named gap it fills.
- A line budget.
- A row in the generated skill index.
- At least one eval case.

Surface growth without a gap is rejected. More skills is not the goal. Fewer
skills that always work is the goal.

## Attribution

Vendored content carries the source URL, the pinned commit, the license, and a
line that says it is condensed. Update `NOTICE` and `UPSTREAM.md` when you add
a vendored file.

## Next

[08-ste100.md](08-ste100.md) covers controlled language.
