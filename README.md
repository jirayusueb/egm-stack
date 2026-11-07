# EGM Stack

Spec-first engineering for coding agents. Draft with project context, review
without it, then build with evidence.

EGM Stack is a harness-neutral collection of Agent Skills. One router,
`/egm-mode`, classifies a task and runs a playbook. Fresh-context reviewers
attack the draft. You resolve the trade-offs. Delivery playbooks carry the
approved design to a verified change.

The drafting agent is the elephant. It holds the project context and never
forgets. The reviewers are goldfish. Each starts with no history, reads only the
artifact and the standard, and notices what the elephant stopped seeing. Fresh
context is the trick.

## Install

The skills route works everywhere. The plugin route adds agents, rules, and
update management on hosts that support plugins.

The command form depends on the route. A plugin namespaces its skills.

| Route | Command form |
| --- | --- |
| Claude Code plugin | `/egm-stack:egm-setup` |
| Claude Code skills route | `/egm-setup` |
| omp | `/skill:egm-setup` |
| Codex, Cursor, OpenCode | the skill picker, or the skill name |

```sh
npx skills add jirayusueb/egm-stack
```

Select the core skills and the twenty-four principles. The router routes to
what is installed.

Reply length and language are set once. Prefix a task with `brief` for
one-screen replies, and `/egm-setup` records your reply language (`en`, `th`,
or `match`).

### Claude Code

```sh
claude plugin marketplace add jirayusueb/egm-stack
claude plugin install egm-stack@egm-stack
```

Restart the session after install. Plugin commands may carry a host namespace.

### Codex

```sh
codex plugin marketplace add jirayusueb/egm-stack
codex plugin add egm-stack@egm-stack
```

Codex support is documented but unverified in this release. The skills route is
the fallback.

### omp (Oh My Pi)

omp installs Claude Code marketplace plugins, so it reads `.claude-plugin/` and
the root `skills/` directory.

```sh
omp plugin marketplace add jirayusueb/egm-stack
omp plugin install egm-stack@egm-stack
```

Restart omp, or run `/reload-plugins`. Skills are invoked as `/skill:egm-mode`
or read through `skill://egm-mode`. Personas in `agents/` register as `task`
agents. Restart omp after install. Do not also run `npx skills add` for this
project, because the plugin already provides the same skills and the duplicate
names shadow each other. This install path is documented but unverified in this
release.

### Manual copy

Copy `skills/<name>/` into a host skill directory, project scope or user scope.

| Host | Project scope | User scope |
| --- | --- | --- |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Codex, OpenCode | `.agents/skills/` | `~/.agents/skills/` |
| Cursor | `.cursor/skills/` | `~/.cursor/skills/` |

## Quickstart

The commands below use the bare skill form. On a Claude Code plugin install,
prefix them, for example `/egm-stack:egm-mode`.

```text
/egm-setup
```

Pick a reasoning budget and set the model per role. Defaults use the parent model.

```text
/egm-mode add a retry policy to the payments client
```

1. `/egm-brainstorm` writes `concepts_brief.md` after a concept stress test.
2. `/egm-draft` writes `design_draft.md`, section by section.
3. `/egm-review` dispatches fresh-context reviewers and writes the stage
   reports plus `consolidated_review_report.md`.
4. `/egm-resolve` triages findings. You approve the fixes.

Then run a delivery playbook such as `feature` through `/egm-mode`. Ask `/egm-ask`
for the next step at any point.

## How it works

Four layers. Dependencies flow downward only.

| Layer | Members | Contract |
| --- | --- | --- |
| Router | `egm-mode` | Classifies intent, selects a playbook, owns the todo list, gates, model routing, harness mapping |
| Workflows | `egm-brainstorm`, `egm-draft`, `egm-review`, `egm-resolve`, `egm-drift`, playbooks | Named inputs, artifacts, exit condition |
| Engines | review engine inside `egm-review`, `delegate`, verification rules | Single implementation, profiles instead of forks |
| Knowledge | 24 principles, 14 rule packs in `rules`, writing standards, ask stage map | Reference only, loaded on demand, no behavior |

Each stage writes its report before the next starts. Loop mode ends after two
consecutive clean rounds, or at the cap of five. Settled findings never re-open,
and an applied fix does not settle. Read [the guide](docs/guide/README.md).

## Skills

<!-- generated:skills:start -->
| Skill | Tier | What it does |
| --- | --- | --- |
| `egm-ask` | Core | Answer a question about where the user is in the EGM flow, which skill to run next, or whether the stack has a capability, without changing anything. |
| `egm-brainstorm` | Core | Stress-test a half-formed idea with eight adversarial lenses, then write a concepts brief that drafting can use. |
| `egm-draft` | Core | Draft a design document one section at a time, with an approval gate after each section, from a concepts brief or the user's notes. |
| `egm-drift` | Core | Compare design documents and READMEs against the code, then report where the implementation diverged from the written contract without editing code. |
| `egm-mode` | Core | Run /egm-mode to route any engineering task through the EGM spec-first stack. |
| `egm-resolve` | Core | Triage reviewer findings against the target, write an annotated report, and apply only the fixes the author approves. |
| `egm-review` | Core | Audit a design, spec, plan, document, code change, or domain model with fresh-context reviewers, resolve the findings, and report what remains. |
| `egm-setup` | Core | Configure which model each EGM role uses, set one reasoning budget, and write the result to the rule files that harnesses load. |
| `egm-verify` | Core | Prove a change against the approved design's success criteria. |
| `arena` | Extended | Run a controlled arena for /arena or when one attempt at a non-trivial artifact would lock in the wrong shape. |
| `delegate` | Extended | Delegate a bounded task with /delegate and a self-contained brief. |
| `how` | Extended | Explain how a subsystem works with /how. |
| `no-comments` | Extended | Remove comments and workaround code for /no-comments or when a diff adds narration, banners, or suppression comments. |
| `reflect` | Extended | Mine the current conversation for durable learnings with /reflect. |
| `rules` | Extended | Load one condensed book rule pack with /rules and apply its decision rules, trigger rules, and checklist as constraints for the current task. |
| `statechart` | Extended | Check a TLA+ model of a system that moves between states, such as a product flow, a protocol, or a service, and draw it as a Mermaid statechart. |
| `ste100` | Extended | Apply ASD-STE100 Simplified Technical English constraints for /ste100 or when a procedure, warning, or maintenance instruction must read the same way to every reader. |
| `swarm` | Extended | Fan out parallel workers for /swarm or for coverage, races, and exploration. |
| `tdd` | Extended | Drive a fix with /tdd when the user asks for a failing test or a regression test, or when a cheap local test path exists. |
| `technical-writing` | Extended | Apply the layered technical-writing standard for /technical-writing or when writing or reviewing docs, RFCs, READMEs, PR descriptions, or commit messages. |
| `unslop` | Extended | Cut AI tells from any writing. |
| `why` | Extended | Investigate why code has its current shape with /why. |
| `ddd` | Domain | Coach strategic and tactical domain-driven design for a model, a spec, or a legacy system. |
| `egm-bootstrap` | Experimental | Document an existing codebase subtree with README contracts for interfaces, invariants, and side effects. |
<!-- generated:skills:end -->

## Playbooks

<!-- generated:playbooks:start -->
| Playbook | Use it when |
| --- | --- |
| `Bug fix` | You own the fix. Every shipped line traces to runtime evidence. |
| `DDD model` | You own the model. Terms, boundaries, and invariants, in that order. |
| `DDD modernize` | You own the path from the legacy model to a modeled core. |
| `DDD review` | You own the domain verdict. Reviewers read and you score and report. |
| `Drift maintenance` | You own the gap between the spec and the code. Close it on the correct side. |
| `Feature` | You own the design and the delivery. Build with evidence. |
| `Investigation` | You own the answer. Read only, cite everything. |
| `Opening a PR` | You own the change until it has a reviewable pull request. |
| `Orchestrate` | You own the program. Delegate the work and verify every unit. |
| `Prototype` | You own the decision, not the code. The prototype is throwaway. |
| `Refactoring` | You own the contract. The structure moves and the behavior does not. |
| `Review-only` | You own the review. Reviewers read and you write the report. |
| `Small change` | You own the change. Skip the design loop, keep the verification. |
<!-- generated:playbooks:end -->

## Principles

<!-- generated:principles:start -->
| Principle | Rule |
| --- | --- |
| `principle-attack-the-premise` | Apply when two or more fixes that share one premise fail the same gate. |
| `principle-boundary-discipline` | Apply when wiring validation, error handling, or framework adapters. |
| `principle-build-the-lever` | Apply when work is non-trivial. |
| `principle-encode-lessons-in-structure` | Apply when the same instruction appears twice or a correction repeats. |
| `principle-exhaust-the-design-space` | Apply when a novel interaction or architecture decision has no precedent. |
| `principle-experience-first` | Apply when product, UX, or feature-scope trade-offs appear. |
| `principle-explain-the-number` | Apply when you are about to trust, report, or act on a measured number. |
| `principle-fix-root-causes` | Apply when debugging. |
| `principle-foundational-thinking` | Apply when choosing core types, writing initial logic, or sequencing scaffold and feature work. |
| `principle-guard-the-context-window` | Apply when context fills with large outputs, long files, or repeated reads. |
| `principle-laziness-protocol` | Apply when refactoring, judging diff size, or tempted to add abstractions. |
| `principle-make-operations-idempotent` | Apply when designing commands, lifecycle steps, or loops that run amid crashes and retries. |
| `principle-migrate-callers-then-delete-legacy-apis` | Apply when introducing a new internal API while old callers exist. |
| `principle-minimize-reader-load` | Apply when code is hard to trace. |
| `principle-model-the-domain` | Apply when stateful logic branches heavily or repeats a shape assumption. |
| `principle-never-block-on-the-human` | Apply when tempted to ask whether to do reversible work. |
| `principle-outcome-oriented-execution` | Apply when planning a rewrite or migration with explicit phase boundaries. |
| `principle-prove-it-works` | Apply when completing a task and before declaring it done. |
| `principle-redesign-from-first-principles` | Apply when integrating a new requirement into an existing design. |
| `principle-separate-before-serializing-shared-state` | Apply when concurrent actors may write the same file, branch, key, or state object. |
| `principle-sequence-verifiable-units` | Apply when breaking multi-step work into units or stacking commits. |
| `principle-subtract-before-you-add` | Apply when sequencing an addition, refactor, or rewrite. |
| `principle-test-behavior-not-implementation` | Apply when writing, changing, or keeping a test. |
| `principle-type-system-discipline` | Apply when designing types or reviewing a signature in a statically typed language. |
<!-- generated:principles:end -->

## Writing standards

`technical-writing` owns structure and voice (Diátaxis, Google developer style,
Global English). `unslop` owns AI tells in a stable id space up to 33, with the upstream gaps preserved. `ste100` owns
controlled language and paraphrases public ASD-STE100 constraints with a
heuristic linter. Use `unslop` first, then `ste100` for procedures and safety
text. Read [the STE100 chapter](docs/guide/08-ste100.md).

## Domain-driven design

`ddd` reads three rule packs on demand and ships three playbooks and one review
profile.

```text
/egm-mode model the payments domain with ddd
```

The run writes `domain_model.md` and checks it with the `ddd-review` profile.
Read [the DDD chapter](docs/guide/10-ddd.md).

## Delegation

`delegate` owns the brief contract. Every spawn names the goal and why, exact
scope, constraints, success criteria, verification, report format, model and
effort, and write scope. Fresh context is the default. Parallel spawns need
disjoint write scopes. Verify the artifact, not the summary. Durable teams use
shared tasks with write scopes and `blocked_by` dependencies. Read
[the subagents chapter](docs/guide/11-subagents.md).

## Ask

`egm-ask` is read-only and advisory. It reads artifact names, the `Status:` and
`**Target:**` lines of the review report, skill frontmatter, the stage table,
and the harness map. It replies in at most twenty lines with up to three
copyable next steps, and it never answers another skill's pending gate.

```text
/egm-ask where am I
/egm-ask is the review converged
/egm-ask can I start implementing
```

## Artifacts

Runs write under `.egm/<slug>/`, which is ignored by default. Promote an
approved spec to `docs/designs/<slug>.md`. See [docs/artifacts.md](docs/artifacts.md).

## Cost and control

The plan preview states spawns and the cap before a review starts. The
consolidated report closes with the actual usage line. A short document can
take the `quick` preset: one reviewer, one round. Fan-outs keep a ledger under
`.egm/<slug>/team/` that survives a crash and resumes only the missing
children. Reviews whose verdict gates a release verify isolation with a
parent-held marker.

## Commands

Every skill, with its form on each host, is in [docs/commands.md](docs/commands.md).

## Harnesses

`docs/harness.md` maps every action to each host. Unverified hosts are labeled.

| Harness | Route | Status |
| --- | --- | --- |
| Claude Code | plugin or skills | Verified install path |
| Codex | plugin or skills | Documented, unverified |
| Cursor | skills or plugin manifest | Documented, unverified |
| OpenCode | skills | Documented, unverified |
| omp (Oh My Pi) | plugin or skills | Documented, unverified |
| DeepSeek Harness | skills | Verified in this build |
| Agent Teams | skills | Verified in this build; host docs unverified |

### Why `/egm-` does not list every skill

Ten skills start with `egm-`: `egm-mode`, `egm-ask`, `egm-setup`,
`egm-brainstorm`, `egm-draft`, `egm-review`, `egm-resolve`, `egm-drift`, and
`egm-bootstrap`. The other 38 keep their own names, such as `delegate`, `how`,
`why`, `ddd`, `rules`, `tdd`, and the 24 `principle-*` leaves.

`/egm-` filters by name prefix. It is not a package filter. Use
[docs/skills.md](docs/skills.md) to see all 48.

A slash menu can also rename skills. A Claude Code plugin prefixes its name, so
the form is `/egm-stack:egm-mode`. omp uses `/skill:egm-mode`. Codex, Cursor, and
OpenCode use a skill picker. If fewer than ten `egm-*` entries appear on the
Claude Code skills route, the interactive install selected a subset. Install all
with `npx skills add jirayusueb/egm-stack -y`, then restart the session.

## Statechart prerequisites

`statechart` is experimental. It needs Node 22.18 or later, Java, and the TLA+
tools. Its tests are opt-in. The core workflow does not need it.

```sh
npm run test:statechart
```

## Two cautions

### Claude Code auto-update

Claude Code leaves auto-update off for third-party marketplaces. To turn it on,
run `/plugin`, open the Marketplaces tab, select `egm-stack`, and choose Enable
auto-update. To update by hand, run `claude plugin update egm-stack@egm-stack`.

### Coexistence

Several names here also exist in other stacks, for example `how`, `why`,
`arena`, `swarm`, `tdd`, `no-comments`, `reflect`, `unslop`,
`technical-writing`, and `statechart`. Install one stack per scope. First-wins
order at user scope is host-defined and unverified. Prefer project scope for a
team repo, and never install both routes for one host.

## Credits

EGM Stack adapts the Elephant-Goldfish Model (Apache-2.0) for review stages,
personas, document standards, and the ask and bootstrap designs. It borrows the
mode, playbook, and principle architecture from pstack (MIT), and vendors
fourteen condensed rule packs from agent-rules-books (MIT). ASD-STE100 is not
redistributed. See [NOTICE](NOTICE) and [UPSTREAM.md](UPSTREAM.md).

## License

Apache-2.0. See [LICENSE](LICENSE). Vendored MIT material keeps its own notice.

## Publish checklist

- Confirm the repository URL is `https://github.com/jirayusueb/egm-stack` in the manifests and docs.
- Keep one version string across `package.json`, `plugin.json`, and the four
  host manifests. Validation fails on drift.
- Confirm `docs/privacy.md` still matches the manifests' `privacyPolicyURL`
  fields.
- Run `npm run build`, then `npm run check`.
- Confirm no generated region was hand-edited, and `LICENSE`, `NOTICE`, and the
  `UPSTREAM.md` pins are current.
- Add a row to `docs/designs/README.md` for each new design document.
- Tag `v0.12.0`.
- Test each documented install route on a clean machine, and confirm the tree
  has no secrets and no absolute local paths.
