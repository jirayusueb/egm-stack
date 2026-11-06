# pstack anatomy

pstack is Lauren Tan's workflow stack, published as `cursor/plugins/pstack` and
mirrored at https://github.com/backnotprop/pstack under MIT. It is the reference
for three ideas in this repository, the router, the playbook, and the principle.
We read the mirror at version `0.15.36` on 2026-11-05.

## The shape

pstack is a folder of plain Agent Skills. One skill is the router,
`poteto-mode`. It classifies the task, picks a playbook, and owns the todo list.
A playbook is a short markdown file that names the skills to run in order.
Principles are small leaves, one rule per skill, cited to a source.

The router never does the work. It dispatches. That single rule keeps the router
short enough to stay in context for a whole session.

## Why the router matters

A model that sees forty skills picks badly. A model that sees one router and a
short playbook list picks a path. pstack solves skill sprawl with a routing
layer, not with better descriptions on forty skills. We copied that decision.

pstack also sets `disable-model-invocation` on the router, so the model cannot
start the playbook on its own. The user types the command. That keeps a long
workflow from starting by accident, and it is why our frontmatter rule exists.

## The skills we studied

| Skill | What we took |
| --- | --- |
| `poteto-mode` | Router owns the todo list and dispatches work. Playbooks name skills in order. |
| `tdd` | Red, green, refactor with an explicit stop at each step. |
| `no-comments` | A read-only reviewer that removes narration comments. It is a reviewer, not a linter. |
| `reflect` | Reads a session transcript and extracts lessons. It is why we document transcript locations. |
| `unslop` | Stable rule ids for AI tells. The ids let a review cite a rule. |
| `technical-writing` | Structure and voice, drawn from public style guides. |
| `arena` | Two agents argue a question, the parent decides. |
| `swarm` | Parallel workers with disjoint scope. |
| `how` and `why` | Short answer skills. They are cheap and often used. |
| `statechart` | The only skill that ships executable code. See below. |

We did not copy text. We took the shape and wrote our own bodies, because
pstack's text names Cursor tools throughout.

## The three-level principle tree

pstack splits principles into tiers, core, architecture, verification,
delegation, and meta. Each leaf is one rule, not a summary. A leaf names the
source it came from, or says none.

We kept that. Twenty-four principles, a fixed tier per leaf, and a `Sources:`
line. The value is not the prose. The value is that a review can cite a leaf by
name and the rule stays stable.

## Statechart

`statechart` is a TypeScript pipeline that checks a TLA+ model with TLC and draws
a Mermaid chart. pstack ships it with its scripts. We vendored the scripts under
`skills/statechart/scripts/` and replaced the shell wrapper with a Node launcher,
so the skill does not need a POSIX shell.

This is the one file tree where we vendor code, and it is the reason
[UPSTREAM.md](../../UPSTREAM.md) exists. The skill stays experimental because the
first run downloads Java and TLC.

## What we changed

- Names. pstack names Cursor tools in skill bodies. Ours name actions.
- Harness files. pstack ships one adapter, for Claude Code. We ship five
  adapters and a shared capability matrix.
- The model rules file. pstack writes Cursor rules. We write to three host
  paths, and only with model slugs a host reports.
- The mirror problem. pstack keeps a mirror with two branches. We do not mirror.
  We cite the idea and write our own text.

## What we rejected

- The `poteto-agent` wrapper as the default subagent. A wrapper that reads the
  router first is a second copy of the router in context.
- Cursor-only features in shared text. Automations, Bugbot, and cloud agents are
  host-only features in our adapters.
- A second install root per tier. The spec fixes skills at `skills/`, and a
  second root adds path work for no user gain.

## The lesson we kept

pstack writes for a tired engineer. Short sentences, no decoration, no hedging.
We adopted that voice in the authoring rules in
[../../AGENTS.md](../../AGENTS.md), because it is also the cheapest voice for a
model to read.

## Sources

- https://github.com/backnotprop/pstack
- https://github.com/cursor/plugins/tree/main/pstack
- https://github.com/backnotprop/pstack/blob/main/docs/harness/claude-code.md
- https://agentskills.io/specification
