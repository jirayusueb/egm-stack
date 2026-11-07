# Documentation

This folder explains EGM Stack. The skills define what agents do. The docs tell
a human how to drive them.

## Start here

| If you want to | Read |
| --- | --- |
| Install the stack and run one review | [../README.md](../README.md) |
| Understand the workflow in one page | [getting_started.md](getting_started.md) |
| Follow a chapter-by-chapter guide | [guide/README.md](guide/README.md) |
| Know what a run writes and where | [artifacts.md](artifacts.md) |
| Test a skill change | [evals.md](evals.md) |
| Test prompt injection defenses | [injection.md](injection.md) |
| See the skill dependency graph | [skill-graph.md](skill-graph.md) (generated) |
| Deprecate a skill | [deprecation.md](deprecation.md) |
| Map an action to a host | [harness.md](harness.md) |
| Look up a skill, playbook, or principle | [skills.md](skills.md) (generated) |
| Find the command form for each host | [commands.md](commands.md) (generated) |
| Copy a prompt and go | [recipes.md](recipes.md) |
| อ่านภาษาไทย | [th/README.md](th/README.md) |
| Read the architecture contract | [designs/egm-stack.md](designs/egm-stack.md) |
| Read the design index | [designs/README.md](designs/README.md) |
| Change the repository | [../AGENTS.md](../AGENTS.md) and [../CONTRIBUTING.md](../CONTRIBUTING.md) |
| Check provenance and licenses | [../UPSTREAM.md](../UPSTREAM.md) and [../NOTICE](../NOTICE) |
| See what changed | [../CHANGELOG.md](../CHANGELOG.md) |

## Layering rule

Docs explain and orient. Skills execute. The design spec is the architecture
contract. Generated files own reference data.

When two sources disagree, the owner wins in one order.

1. For install steps, [../README.md](../README.md) wins.
2. For behavior, the selected skill wins.
3. For architecture and scope, [designs/egm-stack.md](designs/egm-stack.md)
   wins.

Docs never restate a rule that a skill owns. They link to the skill and say
when to read it. A fact that can drift, such as a skill table or a stage list,
is generated. The markers in `README.md` and `getting_started.md` name the
generated regions. Run `npm run build` after a roster change, and never hand
edit a region.

## Reading order

Read [getting_started.md](getting_started.md) first. Then read the guide in
order. Each chapter stands alone after the first pass.

## What lives where

| Path | Purpose |
| --- | --- |
| `skills/` | The executable rules. One directory per skill. |
| `agents/` | Reviewer personas loaded by fresh contexts. |
| `resources/` | Document standards shared by skills. |
| `docs/guide/` | Human tutorial and operating notes. |
| `docs/designs/` | Architecture contracts and approvals. |
| `docs/adr/` | Accepted decision records. |
| `evals/` | Behavioral eval suites and recorded results. |
| `scripts/` | Build, validation, asset sync, and eval runners. |
| `tests/` | Static tests for repository invariants. |
