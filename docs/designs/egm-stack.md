# EGM Stack — design specification

* **Authors:** EGM Stack contributors
* **Status:** Current
* **Date:** 2026-11-06

---

## Overview

EGM Stack is a harness-neutral collection of Agent Skills for spec-first
engineering. An agent drafts with project context (the elephant), fresh-context
reviewers attack the draft (the goldfish), the human resolves trade-offs, and
delivery playbooks carry the approved design to a verified change.

## Goals

- One router (`egm-mode`) for every task, with playbooks for delivery.
- A review engine with fresh-context personas, fixed vocabulary, and explicit
  convergence.
- A read-only assistant (`egm-ask`) that reports where the user is and what to
  run next.
- One delegation contract (`delegate`) for subagents and durable teams.
- One `rules` skill that loads any of fourteen MIT-licensed book rule packs on
  demand, plus twenty-four principles that cite their sources.
- Installable as skills and as a plugin, with generated indexes that cannot
  drift.

## Non-goals

A general skill marketplace. A pstack fork or an EGM wrapper. Full book texts.
A website, IDE extensions, or a hosted service. More than fifty core skills.

## Architecture

Four layers. Dependencies flow downward only: Router -> Workflows -> Engines ->
Knowledge.

| Layer | Members | Contract |
| --- | --- | --- |
| Router | `egm-mode` | Classifies intent, selects a playbook, owns the only todo list, gates, model routing, harness mapping |
| Workflows | `egm-brainstorm`, `egm-draft`, `egm-review`, `egm-resolve`, `egm-drift`, playbooks | Named inputs, artifacts, exit condition |
| Engines | review engine inside `egm-review`; `delegate`; verification rules | Single implementation, profiles instead of forks |
| Knowledge | 24 principles, 14 rule packs in `rules`, writing standards, ask stage map | Reference only, loaded on demand, no behavior |

Knowledge never invokes workflows. Workflows call engines and knowledge, never
other workflows. Engines never spawn engines.

## Skill roster

Every skill lives at `skills/<name>/SKILL.md` with frontmatter:

```yaml
---
name: <directory name>
description: <imperative, names /command and the situation, <=1024 chars>
license: Apache-2.0
disable-model-invocation: true
---
```

### Core (8)

| Skill | Line budget | Responsibility |
| --- | --- | --- |
| `egm-mode` | 300 | Router, non-negotiables, autonomy, delegation pointer, harness mapping, generated indexes |
| `egm-ask` | 100 | Read-only contextual answers and next steps |
| `egm-setup` | 110 | 17-role model configuration |
| `egm-brainstorm` | 120 | Concept stress-test, brief artifact |
| `egm-draft` | 140 | Section-by-section spec drafting |
| `egm-review` | 190 | Review engine, stages, loop, profiles |
| `egm-resolve` | 110 | Triage and approved fixes |
| `egm-drift` | 80 | Spec-versus-code drift |

### Extended (13)

`delegate` 130, `rules` 100, `how` 55, `why` 120, `arena` 60, `swarm` 55,
`tdd` 50, `no-comments` 60, `reflect` 120, `unslop` 100, `technical-writing`
110, `ste100` 110, `statechart` 100 (experimental).

### Domain (1) and experimental (1)

`ddd` 130 reads the three DDD packs from `rules`. `egm-bootstrap` 140 is
experimental and requires approval above fifteen directories.

### Principles (24)

`skills/principle-<title>/SKILL.md`, 30 lines maximum each. Core: laziness
protocol, foundational thinking, redesign from first principles, attack the
premise, subtract before you add, minimize reader load, outcome-oriented
execution, experience first, exhaust the design space, build the lever.
Architecture: model the domain, boundary discipline, type system discipline,
make operations idempotent, migrate callers then delete legacy APIs, separate
before serializing shared state. Verification: prove it works, fix root causes,
sequence verifiable units, test behavior not implementation, explain the
number. Delegation: guard the context window, never block on the human. Meta:
encode lessons in structure.

Every principle names `Sources:` (a rule pack, or `none`) and a leaf carries one
rule, not a summary.

## Playbooks

`skills/egm-mode/playbooks/<kebab-title>.md`, 45 lines maximum. Shape: `###`
title, bold thesis, numbered steps naming skills, optional `Read first:` line,
and `**Reply:**`.

Twelve: investigation, feature, bug-fix, refactoring, prototype, review-only,
drift-maintenance, opening-a-pr, ddd-model, ddd-review, ddd-modernize,
orchestrate.

`Read first:` mapping:

| Playbook | Packs |
| --- | --- |
| investigation | working-effectively-with-legacy-code |
| feature | a-philosophy-of-software-design, clean-architecture |
| bug-fix | working-effectively-with-legacy-code, clean-code |
| refactoring | refactoring, refactoring-guru, working-effectively-with-legacy-code |
| prototype | the-pragmatic-programmer |
| review-only | clean-code, code-complete |
| drift-maintenance | working-effectively-with-legacy-code |
| opening-a-pr | release-it, the-pragmatic-programmer |
| ddd-model | domain-driven-design, domain-driven-design-distilled |
| ddd-review | implementing-domain-driven-design, domain-driven-design-distilled |
| ddd-modernize | implementing-domain-driven-design, working-effectively-with-legacy-code |
| orchestrate | the-pragmatic-programmer |

## Review engine

- Profiles: `concept`, `spec`, `plan`, `doc`, `code`, `ddd`, `comments`.
- Stages: Zoom-Out + Inventive Catalyst; Comprehension; Design Critic;
  Intermediate Zoom-Out; Implementation Readiness.
- Each stage writes its report before the next stage is dispatched.
- Loop semantics: settled findings never re-open; an applied fix does not settle;
  a clean round has no unsettled Blocker or Major; converged means two
  consecutive clean rounds; cap five; churn detection; a `not run` reviewer
  makes the round unclean.
- Gates: one question, the sole tool call in the turn, yield immediately, never
  a "(Recommended)" prefix.
- Fresh context is mandatory. No subagent tool means stop, never review in the
  same context.

## Delegation

`delegate` owns the brief contract: goal and why, exact scope, constraints,
success criteria, verification, report format, model and effort, read-only or
write scope. Fresh context by default. Resume only when the child holds costly
state. Parallel only with disjoint write scopes. Verify artifacts, not
summaries. Dropouts proceed with N-1 and are reported.

Durable teams: shared tasks with write scopes and `blocked_by` dependencies,
claim with revision, wait for changes rather than polling, Lead-owned final diff
and test run.

## Ask

`egm-ask` is read-only and advisory. It reads artifact names, the `Status:` and
`**Target:**` lines of the review report, skill frontmatter, the stage table,
and `docs/harness.md`. It classifies five question types, detects the stage,
applies the implementation gate, and replies in at most twenty lines with up to
three copyable next steps. It never answers or picks an option on another
skill's pending gate.

The stage table lives at `skills/egm-ask/references/stage-table.md` and is
generated into `docs/getting_started.md`.

## Rule packs

`skills/rules/references/<book>.md` holds fourteen condensed packs vendored
from `ciembor/agent-rules-books` (MIT, pinned commit): a philosophy of software
design, clean architecture, clean code, code complete, designing data-intensive
applications, domain-driven design, domain-driven design distilled,
implementing domain-driven design, patterns of enterprise application
architecture, refactoring, refactoring guru, release it, the pragmatic
programmer, working effectively with legacy code.

Each file carries a header with source URL, upstream commit, MIT notice, and
"condensed; verify against the book", and stays under eighty lines. No `full`
or `nano` files are vendored. `references/index.md` is generated.

## Writing standards

`technical-writing` owns structure and voice (Diátaxis, Google developer style,
Global English). `unslop` owns AI tells in a stable id space up to 33, with the upstream gaps preserved. `ste100` owns
controlled language with an original paraphrase and a heuristic linter. The
order is unslop, then ste100 for procedures and safety text. No rule text is
duplicated between them.

## Artifacts and model routing

Artifacts live under `.egm/<slug>/`: `concepts_brief.md`, `design_draft.md`,
`domain_model.md`, `review/01-zoom-out.md` through `05-readiness.md`,
`goldfish_review_report.md`, `drift_report.md`, `ddd_review.md`,
`ste100_report.md`, `arena/`, `statechart/`, `team/`. An approved spec is
promoted to `docs/designs/<slug>.md`.

Seventeen model roles are configured by `egm-setup` into
`~/.agents/egm-stack-models.md` (plus the Claude and Cursor rule paths).
Defaults are `inherit-parent`. Only detected slugs may be written.

The roles, in order: `egm drafting`, `egm reviewers`, `egm synthesizer`,
`egm delivery`, `egm judgment and prose`, `egm hardest tasks`,
`egm verification`, `delegate workers`, `how explorer`, `how explainer`,
`why investigators`, `why synthesizer`, `reflect reviewers`,
`reflect synthesizer`, `arena runners`, `arena cross-judge pool`,
`swarm workers`. The last three accept comma-separated lists, one subagent per
entry. `inherit-parent` and `auto` mean the parent model, so omitting the model
field is correct.

## Generated content

These regions are generated by `scripts/build.mjs`; never hand-edit them.

| Output | Markers |
| --- | --- |
| `skills/egm-mode/SKILL.md` principles and playbooks | `<!-- generated:principles:start -->` ... `end`; `<!-- generated:playbooks:start -->` ... `end` |
| `README.md` skill, playbook, principle tables | `<!-- generated:skills:start -->` ... `end` |
| `docs/skills.md` | whole file |
| `docs/getting_started.md` stage table | `<!-- stage-table:start -->` ... `end` |
| `skills/rules/references/index.md` | whole file |

`node scripts/build.mjs --check` fails when any generated region is stale.

## Harnesses

Claude Code, Codex, Cursor, OpenCode, and Agent Teams. Each adapter documents
tools, subagent fields, models, install, paths, and host-only features.
Unverified hosts are labeled unverified.

## Validation

`scripts/validate.mjs` enforces frontmatter and name parity, link integrity,
cross-reference parity, manifest identity, banned tokens, size budgets,
embedded asset hashes, generated freshness, ask read-only guarantees, vendored
attribution, LF and forward slashes, and the absence of `/bin/sh`.

Behavioral evals live in `evals/` and are checked for schema and coverage by
`scripts/eval.mjs --check`. Live runs follow `docs/evals.md`.

## Licensing

Apache-2.0 outbound. NOTICE attributes the Elephant-Goldfish Model
(Apache-2.0), pstack (MIT), agent-rules-books (MIT), and ASD-STE100 (not
redistributed). `UPSTREAM.md` pins commits and inventories vendored files.

## Alternatives considered

| Alternative | Why rejected |
| --- | --- |
| Union of every upstream skill (47+) | Uncurated surface, overlapping engines, no maintenance story |
| Separate plugin per tier | The Agent Skills spec fixes skills at `skills/`; separate install roots add path complexity for no user gain |
| Fourteen book skills | Fourteen more entries for knowledge that is loaded on demand; one `rules` skill with fourteen references keeps the surface honest |
| One skill per principle index entry | The index must be generated or it drifts; leaves stay as skills for direct citation |
| Formal verification in core | Java/TLC are heavy prerequisites; statechart stays experimental |
| Web documentation site | Out of scope for 0.1.0; markdown docs are the contract |

## Risks

Surface sprawl (tier budgets and a named gap per skill), rule-pack context
bloat (one pack per task), prose quality unverifiable by CI (evals and
dogfooding), name collisions (coexistence section), copy-of-copy licensing
(paraphrase and attribution), harness drift (capability matrix, unverified
labels), generated content forgotten (`build --check`).
