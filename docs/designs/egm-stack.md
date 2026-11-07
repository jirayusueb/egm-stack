# EGM Stack design specification

* **Authors:** EGM Stack contributors (maintainer: the Lead role named in `AGENTS.md`)
* **Status:** Current
* **Date:** 2026-11-06

---

## Problem and users

**The problem.** Agents produce working-looking changes faster than a team can
judge the design behind them. The failure modes are observable in the two
upstream projects this stack learns from. EGM's own guide exists because
unreviewed specs hide assumptions until implementation ([EGM README](https://github.com/google/elephant-goldfish-model)).
pstack exists because agents write too much code without verification discipline
([pstack README](https://github.com/backnotprop/pstack)). Neither tool ships the
other half, so a team that adopts one still pays for the gap.

The third failure mode is specific to this design. Book-derived rule packs are
read once and then disconnected from the work that needs them. A rule that is
not loaded at decision time changes nothing.

**Users.** A developer starting a feature that needs design decisions. A
maintainer of a legacy codebase who needs drift and refactoring discipline. A
reviewer or team lead who needs a reviewable decision trail.

**Evidence status.** The first two claims cite the upstream projects' published
motivation, not a controlled study. The third is an inference from how the
upstream packs are packaged. We mark it as an inference, not a measurement.

## Success criteria

Each criterion names how it is checked. The first four are release gates.

| Criterion | Target | Checked by |
| --- | --- | --- |
| Install | Skills CLI lists every skill, and Claude Code validates the plugin | `npx skills add . --list`, `claude plugin validate .` |
| Routing | At least 18 of 20 labeled prompts reach the expected skill or playbook | live run per `docs/evals.md` |
| Coverage | Every non-principle skill, playbook, and rule pack has at least one eval case | `node scripts/eval.mjs --check` |
| Self-review | The design doc of a feature converges in five rounds or fewer with zero open Blockers | review run on this document |
| Time to approved spec | A new user reaches an approved spec in one session with three commands | first-run walkthrough in `docs/guide/02-first-design.md` |
| Decision trail | Every finding has an id, a severity, and one of four dispositions | review report template |
| Ask | `egm-ask` answers all five question types read-only in twenty lines or fewer | gate evals and manual run |
| Rule loading | Each playbook names its packs, and `rules` loads exactly one per task | `validate.mjs` and routing evals |

## Non-goals

A general skill marketplace. A runtime dependency on EGM or pstack. Full book
texts. A website, IDE extensions, or a hosted service. More than fifty core
skills. Guaranteed model quality. Formal verification in the core.

## Architecture

The layers name **responsibilities and access rules**. They are not a claim that
one file can hold only one role. Three units deliberately hold two roles, and
the table says so.

| Responsibility | Holders | Access rule |
| --- | --- | --- |
| Router | `egm-mode` | Classifies intent, selects a playbook, owns routing gates and the only todo list, reads model config and harness map |
| Workflows | `egm-brainstorm`, `egm-draft`, `egm-review`, `egm-resolve`, `egm-drift`, the 12 playbooks, and the 13 Extended skills (`delegate`, `rules`, `how`, `why`, `arena`, `swarm`, `tdd`, `no-comments`, `reflect`, `unslop`, `technical-writing`, `ste100`, `statechart`) | Own named inputs, artifacts, exit condition. May read contracts and knowledge |
| Contracts | Review protocol inside `egm-review`; delegation contract inside `delegate`; verification rules | One implementation each. Other skills reference the contract by path instead of redefining it |
| Knowledge | 24 principles, 14 rule packs, 6 standards, the ask stage map | Read-only. Nothing in this layer invokes anything |

Every skill and its reference files have one owner, the maintainer named in
[AGENTS.md](../../AGENTS.md). A skill with no owner is a defect.

**Dual-role units, stated once.** `egm-review` is a workflow that also
implements the review contract. `delegate` is an Extended skill that defines the
delegation contract. `rules` is a workflow that serves knowledge. This is
intentional. The alternative, a hidden engine module, would add a layer with no
user-visible command.

**Access rules, enforced where a validator can.**

1. Knowledge files are read, never executed and never written by another skill.
2. A skill writes only its own artifacts. Only the parent writes review reports.
3. Workflows may hand off sequentially when a playbook or the caller names the
   next skill. A workflow does not run another workflow internally as a hidden
   step.
4. Gates belong to the skill that presents them. `egm-mode` owns routing gates.
   `egm-review` owns stage and loop gates. `egm-resolve` owns resolution gates.
   `egm-ask` never answers or picks an option on any gate it did not raise.
5. A tool that ships with knowledge, such as the `ste100` linter, is invoked by
   its workflow. It is not autonomous behavior.

## Skill roster

Every skill lives at `skills/<name>/SKILL.md` with frontmatter:

```yaml
---
name: <directory name>
description: <imperative, names /command and the situation, <=1024 chars>
license: Apache-2.0
---
```

Skills are model-invocable. Do not add extension fields such as
`disable-model-invocation`. A strict Agent Plugins consumer skips a skill that
carries one, which is how omp silently dropped all 47 skills in testing.

Exception: the 24 `principle-*` leaves carry a trigger, start their
description with `Apply when`, and are cited rather than invoked.

Line budgets are ceilings checked by `validate.mjs`. Depth that does not fit
belongs in `references/`, and the skill says when to read it. A budget is not a
quality target.

### Core (10)

| Skill | Budget | Responsibility |
| --- | --- | --- |
| `egm-mode` | 320 | Router, non-negotiables, autonomy, delegation pointer, harness mapping, generated indexes |
| `egm-ask` | 170 | Read-only answers, first-run guidance, resume and catch-up summaries, review quality, and one hint line |
| `egm-setup` | 175 | Role configuration, show/reset/role/profile modes, provider/model values, host effort levels |
| `egm-verify` | 100 | Prove a change against the approved design's success criteria |
| `egm-brainstorm` | 120 | Concept stress-test, brief artifact |
| `egm-draft` | 140 | Section-by-section spec drafting |
| `egm-review` | 240 | Review engine, stages, presets including quick, resume, loop, profiles, gates, digest |
| `egm-resolve` | 130 | Triage, approved fixes, and the settled registry |
| `egm-drift` | 80 | Spec-versus-code drift |

### Extended (13)

`delegate` 130, `rules` 100, `how` 55, `why` 120, `arena` 60, `swarm` 55,
`tdd` 50, `no-comments` 60, `reflect` 120, `unslop` 100, `technical-writing`
110, `ste100` 110, `statechart` 100 (experimental).

### Domain (1) and experimental (1)

`ddd` 130 reads the three DDD packs from `rules`. `egm-bootstrap` 140 is
experimental and requires approval above fifteen directories. `statechart` is
experimental too, vendors 407 files (3.8 MB), and needs Node 22.18 or later,
Java, and TLC. The core never depends on it.

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

## Ownership and approval

- **Maintainer.** The Lead role defined in [AGENTS.md](../../AGENTS.md). It owns
  integration, runs the checks, and reviews every diff.
- **Approver.** The human operator of the session. No other actor can approve a
  design, a plan review, or a resolution.
- **Promotion gate.** A draft becomes `docs/designs/<slug>.md` only when all
  hold: the target slug is confirmed, the review report is settled with zero
  open Blockers, the human says the design is approved, and the file passes the
  document standard checks. `egm-ask` reports which of these is missing and
  never claims approval on its own.
- **Change authority.** An agent may edit skills only inside its assigned write
  scope, and the maintainer reviews the final diff. Vendored files follow
  [UPSTREAM.md](../../UPSTREAM.md).

## Playbooks

`skills/egm-mode/playbooks/<kebab-title>.md`, 45 lines maximum. Shape: `###`
title, bold thesis, numbered steps naming skills, a `Read first:` line naming
rule packs, and a `**Reply:**`.

Thirteen: investigation, feature, small-change, bug-fix, refactoring,
prototype, review-only, drift-maintenance, opening-a-pr, ddd-model, ddd-review,
ddd-modernize, orchestrate.

| Playbook | Read first |
| --- | --- |
| investigation | working-effectively-with-legacy-code |
| feature | a-philosophy-of-software-design, clean-architecture |
| bug-fix | working-effectively-with-legacy-code, clean-code |
| refactoring | refactoring, refactoring-guru, working-effectively-with-legacy-code |
| prototype | the-pragmatic-programmer |
| review-only | clean-code, code-complete |
| small-change | clean-code |
| drift-maintenance | working-effectively-with-legacy-code |
| opening-a-pr | release-it, the-pragmatic-programmer |
| ddd-model | domain-driven-design, domain-driven-design-distilled |
| ddd-review | implementing-domain-driven-design, domain-driven-design-distilled |
| ddd-modernize | implementing-domain-driven-design, working-effectively-with-legacy-code |
| orchestrate | the-pragmatic-programmer |

## Review engine

**Profiles.** `concept`, `spec`, `plan`, `doc`, `code`, `ddd`, `comments`.
A profile fixes default reviewers, the target range, and the standard mapping.
Explicit reviewers override it.

**Stages and reports.** Each stage writes its report before the next dispatch.

| Stage | Reviewers | Report |
| --- | --- | --- |
| 1 Zoom-out and inventive catalyst | zoom-out, inventive-catalyst | `review/01-zoom-out.md` |
| 2 Comprehension | comprehension | `review/02-comprehension.md` |
| 3 Design critic | design, structural, style | `review/03-design.md` |
| 4 Intermediate zoom-out | zoom-out, with report 1 | `review/04-intermediate-zoom-out.md` |
| 5 Implementation readiness | implementation-readiness, codebase-details, style | `review/05-readiness.md` |

The stage 1 file records both reviewers and their combined findings. Stage 2
never receives conversation context. Stage 4 receives the stage 1 report by
path.

**Loop semantics, made executable.**

- **Settled** means one of two recorded states: `CONTEST` with a checkable
  reason, or `DECLINE` with an accepted-risk note. Settled findings never
  reopen.
- **Applied fix** means an edit to the target recorded in the resolution report
  with the finding id. A fix becomes **settled** only when a later round's
  reviewers do not raise the same issue at the same scope.
- **Raised again** means a reviewer reports the same scope and issue as a fixed
  finding. The fix failed or a later edit reintroduced it. The finding reopens.
- **Clean round** means no open Blocker or Major remains and no reviewer was
  `not run`. Nits never block.
- **Converged** means two consecutive clean rounds.
- **Churn** means a new finding whose scope overlaps an applied fix and whose
  proposed resolution would revert that fix. On churn, stop and ask one
  question. Offer accept, continue past the cap, or return to drafting.
- **Cap** is five rounds. A failed reviewer is retried once, then recorded
  `not run`, which makes the round unclean.

**Gates.** One question, the sole tool call in the turn, yield immediately, no
"(Recommended)" prefix. The presenting skill owns the gate. The router does not
run a stage gate. `egm-ask` never answers another skill's gate.

**Fresh context.** Mandatory. No subagent tool means stop. A review in the
author's context is not a review.

## Delegation

`delegate` owns the brief contract: goal and why, exact scope, constraints,
success criteria, verification, report format, model and effort, read-only or
write scope. Fresh context by default. Resume only when the child holds costly
state. Parallel only with disjoint write scopes. Verify artifacts, not
summaries. Dropouts proceed with N-1 and are reported. Durable teams use shared
tasks with write scopes and `blocked_by` dependencies, claim with revision, wait
for changes rather than polling, and leave the final diff and test run to the
Lead.

## Ask

`egm-ask` is read-only and advisory. It reads artifact names, the `Status:` and
`**Target:**` lines of the review report, skill frontmatter, the stage table,
and `docs/harness.md`. It classifies five question types, detects the stage,
applies the implementation gate, and replies in at most twenty lines with up to
three copyable next steps. It never answers or picks an option on another
skill's pending gate. The stage table lives at
`skills/egm-ask/references/stage-table.md` and is generated into
`docs/getting_started.md`.

## Rule packs

`skills/rules/references/<book>.md` holds fourteen condensed packs, licensed MIT
by the compiler and vendored from
[agent-rules-books](https://github.com/ciembor/agent-rules-books) (MIT, commit
`893a88a`): a philosophy of software design, clean architecture, clean code,
code complete, designing data-intensive applications, domain-driven design,
domain-driven design distilled, implementing domain-driven design, patterns of
enterprise application architecture, refactoring, refactoring guru, release it,
the pragmatic programmer, working effectively with legacy code.

Each file carries a header with source URL, upstream commit, MIT notice, and
"condensed; verify against the book", and stays under eighty lines. No `full`
or `nano` files are vendored. `references/index.md` is generated. The MIT
license covers the condensation, not the underlying books. Load one pack at a
time. A playbook may name up to three packs. Load the one that owns the current
decision, and start a new load for another. Loading the whole library is a
defect, not thoroughness.

## Writing standards

`technical-writing` owns structure and voice (Diátaxis, Google developer style,
Global English). `unslop` owns AI tells in a stable id space up to 33, with the
upstream gaps preserved. `ste100` owns controlled language with an original
paraphrase and a heuristic linter. The order is unslop, then ste100 for
procedures and safety text. No rule text is duplicated between them. The linter
is a tool invoked by the `ste100` workflow, not knowledge-layer behavior.

## Artifacts and model routing

Artifacts live under `.egm/<slug>/`:

- `concepts_brief.md`, `design_draft.md`, `domain_model.md`
- `review/01-zoom-out.md`, `review/02-comprehension.md`, `review/03-design.md`,
  `review/04-intermediate-zoom-out.md`, `review/05-readiness.md`,
  `review/consolidated_review_report.md`
- `goldfish_review_report.md`, `drift_report.md`, `ddd_review.md`,
  `ste100_report.md`
- `arena/`, `statechart/`, `team/`

An approved spec is promoted to `docs/designs/<slug>.md` through the gate in
"Ownership and approval".

Seventeen model roles are configured by `egm-setup` into
`~/.agents/egm-stack-models.md`, `~/.claude/rules/egm-stack-models.md`, and
`~/.cursor/rules/egm-stack-models.mdc`. Defaults are `inherit-parent`.

`egm-setup` detects models by enumerating the values the subagent tool accepts in
the current session, plus a host command when one exists. Values may be plain
slugs or `provider/model` pairs. It also records the effort levels the host
exposes and maps the chosen budget to the nearest available level. It never
writes a value it did not detect. It always writes the shared file, and writes
the Claude or Cursor rule file only when that host is in use. The roles are `egm drafting`, `egm reviewers`,
`egm synthesizer`, `egm delivery`, `egm judgment and prose`, `egm hardest
tasks`, `egm verification`, `delegate workers`, `how explorer`, `how
explainer`, `why investigators`, `why synthesizer`, `reflect reviewers`,
`reflect synthesizer`, `arena runners`, `arena cross-judge pool`,
`swarm workers`.

Panels are exactly three: `arena runners`, `arena cross-judge pool`, and
`swarm workers` accept comma-separated lists, one subagent per entry. Every
other role is a single value, including the plural-named `egm reviewers`,
`why investigators`, and `reflect reviewers`, which fan out over the same
model. `inherit-parent` and `auto` mean the parent model, so omitting the model
field is correct.

## Generated content

These regions are generated by `scripts/build.mjs`; never hand-edit them.

| Output | Markers |
| --- | --- |
| `skills/egm-mode/SKILL.md` principles and playbooks | `<!-- generated:principles:start -->` ... `end`; `<!-- generated:playbooks:start -->` ... `end` |
| `README.md` skill, playbook, and principle tables (three pairs) | `<!-- generated:skills:start -->` ... `end`; `<!-- generated:playbooks:start -->` ... `end`; `<!-- generated:principles:start -->` ... `end` |
| `docs/skills.md` | whole file |
| `docs/getting_started.md` stage table | `<!-- stage-table:start -->` ... `end` |
| `skills/rules/references/index.md` | whole file |

Embedded copies are a second generated set, owned by `scripts/sync-assets.mjs`:
17 canonical personas and standards copied to 26 targets under
`skills/*/references/`. Edit the canonical file under `agents/` or `resources/`,
never the copy. `UPSTREAM.md` documents the rule.

A merged change cannot drift because `.github/workflows/ci.yml` runs
`node scripts/build.mjs --check` on every push and pull request, alongside
`validate`, `test`, `sync-assets --check`, and `eval --check`. A local edit can
drift until the check runs. That is the limit of the guarantee, and the risk
table says so.

## Harnesses

Seven adapters under `docs/harness/`, each with the same six sections: tools,
subagent fields, models, install, paths, host-only features. The capability
matrix is in [docs/harness.md](../harness.md).

| Host | Subagent tool | Status of this release |
| --- | --- | --- |
| Claude Code | `Agent`, also called Task | Tools and fields verified, plugin validation passed; live review isolation unverified |
| Codex | `spawn_agent`, schema varies by version | Partial; live run unverified |
| Cursor | `Task` | Fields verified; live run unverified |
| OpenCode | `task` in V1 | Unverified |
| omp (Oh My Pi) | `task` | Install path documented, unverified; uses the Claude-compatible manifest |
| DeepSeek Harness | `subagent`, `spawn_teammate` | Verified in this build |
| Agent Teams | `spawn_teammate` | Verified in this build (the build used it); host documentation unverified |

Unverified means one secondary source or an inference. The adapter says so in
place. A host without a subagent tool runs delegation inline and stops reviews.

## Validation

Five commands, each with one job.

- `node scripts/validate.mjs` checks frontmatter and name parity, link
  integrity, cross-reference parity, manifest identity, banned tokens including
  `#!/bin/sh`, size budgets, ask read-only guarantees, vendored attribution, LF
  and forward slashes, the absence of `.sh` files and shell wrappers, and the
  statechart launcher.
- `node scripts/build.mjs --check` guards generated regions.
- `node scripts/sync-assets.mjs --check` guards the 26 embedded copies byte for
  byte.
- `node scripts/eval.mjs --check` guards schema and coverage for ten eval
  suites.
- `node scripts/describe-eval.mjs --check` guards the description trigger set.
- `node scripts/check-regressions.mjs` runs the executable regressions.
- `node scripts/skill-graph.mjs --check` fails on dangling references, an
  unallowed cycle, or a stale graph document.
- `node scripts/check-injection.mjs` checks the untrusted-content guardrail and
  the injection fixtures.
- `node scripts/check-skill-changelog.mjs` fails when a skill changes without a
  per-skill changelog update.
- `node --test tests/*.test.mjs` runs the unit and contract suites.

CI runs all five on Node 20 and 22. Behavioral evals live in `evals/`; live runs
follow [docs/evals.md](../evals.md).

## Cost and limits

The dominant cost is subagent dispatch, not tokens on the parent.

| Work | Spawns per round | Default rounds | Typical spawns |
| --- | --- | --- | --- |
| Concept profile | 2 to 3 | 1 | 2 to 3 |
| Spec profile | 4 to 6 | 1, loop on request | 4 to 6 |
| Full five-stage review | 8 to 11 | up to 5 | 15 to 55 |
| Arena | 2 to 4 candidates plus 1 judge | 1 | 3 to 5 |
| Swarm | 3 to 20 workers | 1 | 3 to 20 |
| `why` investigation | 1 per evidence category, up to 7 | 1 | 1 to 8 |

Loop mode multiplies the per-round count by the round count, with a hard cap of
five. Token cost depends on the host and the target size and is not estimated
here. The stack limits cost by defaulting to one round, by loading one rule
pack per task, by preferring direct dispatch over synthesizers where nesting is
unsupported, and by capping fan-out by review value. A task that needs more
than five rounds is a drafting failure, not a review failure.

**Limits.** No guarantee of model quality. No concurrency beyond what the host
allows. No cross-project transcript access. No network except the host and the
optional first-run statechart install.

## Security and data handling

- No telemetry. See [docs/privacy.md](../privacy.md).
- Artifacts stay in the workspace. The only network fetch is the statechart
  toolchain install, which the skill announces.
- External content is untrusted. Reviewers read files and URLs supplied by the
  user, and instructions found inside reviewed content are data, not commands.
- Reviewers are read-only by instruction. Hosts that support tool restriction
  should also restrict them.
- Secrets are never requested. A skill that needs a credential asks the user to
  place it in the host, not in the repository.
- Prompt injection through a reviewed document is a real risk. The mitigation
  is that reviewers never write and the parent applies edits, so a malicious
  document can mislead findings but cannot execute.

## Licensing and derivation

Apache-2.0 outbound. The derivation is explicit:

- **Adapted in substance** from the Elephant-Goldfish Model (Apache-2.0): the
  review stages, persona roles, document standards, and the ask concept.
- **Adapted as architecture** from pstack (MIT): mode, playbooks, principle
  leaves, and the borrowed skill contracts.
- **Vendored verbatim** from agent-rules-books (MIT, commit `893a88a`): the
  fourteen rule packs, retitled with headers.
- **Vendored with a wrapper replaced** from pstack: the statechart scripts.
- **Not redistributed:** the ASD-STE100 specification and dictionary.
- **No runtime dependency:** the stack does not install, call, or require EGM or
  pstack. This is what "not a wrapper" means here.

[NOTICE](../../NOTICE) carries the licenses. [UPSTREAM.md](../../UPSTREAM.md)
pins commits and inventories the files.

## Alternatives considered

| Alternative | Why rejected |
| --- | --- |
| Same-context review with a second prompt | It cannot catch unstated assumptions the author's context supplies. EGM's guide treats fresh context as load-bearing. |
| Three-stage review instead of five | Loses the zero-context comprehension test and the implementation-readiness pass, which are the two stages that caught the most issues in this repo's dogfood run. |
| Single-stage review | Cheaper, but one pass cannot both detect a missing assumption and prove the plan is implementable. It also removes the convergence rule that the loop depends on. |
| Link to the upstream rule packs instead of vendoring | Removes the licensing and drift risks but breaks skills-only installs, adds a network dependency at task time, and couples decisions to a moving repository. Vendoring with headers and pins was chosen, and the licensing risk stays in the table. |
| One review skill per target type | Seven engines drift. Profiles share one loop and one vocabulary. |
| Separate plugin per tier | The Agent Skills specification fixes skills at `skills/` ([spec](https://agentskills.io/specification)); separate roots add install complexity without changing behavior. |
| Fourteen book skills | Fourteen more entries for knowledge loaded on demand. One `rules` skill keeps the surface smaller and makes the one-pack rule explicit. |
| One skill per principle index entry | The index is generated from the leaves, so there is no drift. Leaves stay as skills for direct citation. |
| Wrapper that requires EGM installed | Couples releases to an upstream we do not control and breaks skills-only installs. |
| No rule packs at all | The principles already cover some ground, but the packs carry concrete decision rules that principles do not. The cost is one skill and fourteen references. |
| Formal verification in core | Java and TLC are heavy prerequisites. Statechart stays experimental and optional. |
| Web documentation site | Out of scope for the 0.x line. Markdown docs are the contract. |

## Risks

| Risk | Likelihood | Impact | Mitigation | Trigger to revisit |
| --- | --- | --- | --- | --- |
| Surface sprawl | Medium | Medium | Tier budgets, a named gap per skill, one `rules` entry for book knowledge | More than 50 skills, or a skill with no eval case |
| Rule-pack context bloat | Medium | Low | One pack at a time, at most three named by a playbook, 80-line caps, generated index | A task loads a pack its playbook did not name |
| Prose quality not verifiable in CI | High | Medium | Behavioral evals, dogfood review, release checklist | Two consecutive releases with no live eval run |
| Name collisions with pstack or Google EGM | Medium | High | Coexistence section, install one stack, `egm-` workflows | A user reports an overwritten skill |
| Licensing drift | Low | High | Per-file headers, NOTICE, UPSTREAM pins, validator checks | Any vendored file without a header |
| Harness drift | High | Medium | Capability matrix, six-section adapters, unverified labels | A host changes its subagent API |
| Generated content drift | Low | Low | CI runs `build --check` on every change | A merged change edits a generated region |
| Prompt injection through reviewed content | Medium | Medium | Reviewers read-only, parent applies edits, artifacts local | A reviewer is given write tools |
| Cost overrun from loop mode | Medium | Medium | One round by default, cap five, one pack per task | Median review exceeds two rounds |
| Stale artifacts mislead `egm-ask` | Medium | Low | Files are hints, unknown stage asks, approval never assumed | Ask suggests a step that does not apply |
| Copyright status of condensed book text | Medium | High | Distillation with attribution and per-file headers, MIT claim recorded, no full text or dictionary; revisit with counsel before any commercial distribution | Publication or a takedown request |
| Large vendored statechart tree | Medium | Medium | Experimental and optional, 3.8 MB and 407 files, Java/TLC and Node 22.18+ stated, no core dependency, opt-in tests | Install-size complaints, or a lighter TLC path |

**Not handled by this release:** model quality, multi-tenant isolation,
cross-machine team coordination, automatic dependency updates, a hosted review
service, and conformance with any formal verification standard.
