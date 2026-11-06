# Getting started

One page for the first run. Install, start a design, review it, resolve the
findings, then deliver.

## 1. Install and set models

Install through the route that fits your host. The [README](../README.md) has
every route. Then run `/egm-setup` once. Pick a reasoning budget and confirm
the model for each role. Defaults use the parent model, and only detected slugs
are written.

## 2. Start a design

```text
/egm-mode add a retry policy to the payments client
```

The router classifies the request and runs a workflow. A design run has four
steps.

1. `/egm-brainstorm` stress-tests the concept. It asks what must be true, what
   the constraints are, and what the alternatives are. It writes
   `concepts_brief.md`.
2. `/egm-draft` writes `design_draft.md`, section by section. It names the data
   shape before the behavior and marks every open question.
3. `/egm-review` sends fresh-context reviewers at the draft. It writes stage
   reports and `consolidated_review_report.md`.
4. `/egm-resolve` triages the findings. You approve the fixes. The loop ends
   when two consecutive rounds are clean.

## 3. Know the stage

The stage table is the shared map of the review. It names each stage, the
profile that runs it, the report it writes, and the gate before the next stage.

<!-- stage-table:start -->
# Stage table

Read this after stage detection. Rows are ordered by how far the work has
progressed. Artifacts live under `.egm/<slug>/` unless the row says otherwise.
Files are hints. The review `Status:` line and the newest artifact decide.

| Artifacts seen | Stage | Suggest |
| --- | --- | --- |
| `concepts_brief.md`, no draft | Concept | `/egm-draft .egm/<slug>/concepts_brief.md` |
| `design_draft.md`, no `review/` directory | Draft | `/egm-review .egm/<slug>/design_draft.md` |
| `review/01-zoom-out.md` to `review/05-readiness.md`, no consolidated report | Review in progress | Resume `/egm-review` on the draft |
| `review/consolidated_review_report.md`, no goldfish report | Review consolidated | `/egm-resolve` the draft with the reported findings |
| `goldfish_review_report.md` with no `Status:` line | Findings pending | Answer the pending review gate in the session that asked it |
| `goldfish_review_report.md` with `Status: resolved` | Review settled | Promote the draft to `docs/designs/<slug>.md`, then implement |
| `docs/designs/<slug>.md`, no other artifact | Approved spec | Run the implementation playbook through `/egm-mode` |
| `domain_model.md` | Domain model | Review with `/egm-review` and the `ddd` profile |
| `ddd_review.md` | DDD review | Resolve findings, then continue drafting |
| `drift_report.md` | Drift | Run the drift-maintenance playbook through `/egm-mode` |
| `ste100_report.md` | Controlled language | Apply the fixes, then review again |
| `arena/` | Explored options | Pick a candidate, then `/egm-draft` |
| `statechart/` | Behavior model | Review the model, then implement from it |
| Several rows apply, no goldfish report | Unclear | List the artifacts and ask which slug and stage |

## Notes

- A promoted spec under `docs/designs/` can coexist with `.egm/<slug>/`. The
  promoted file is the contract. The `.egm/` copy is working material.
- An artifact from an old run can be stale. Compare its date to the code and to
  the newest artifact.
- `review/01-zoom-out.md` through `review/05-readiness.md` are stage reports.
  One missing report means that stage did not finish.
- `team/` is coordination state, not a stage. Ignore it for routing.
- A report with `Status: resolved` settles the review, not the design. The
  implementation gate still requires approval.
<!-- stage-table:end -->

If you lose the thread, ask `/egm-ask`. It reads the artifacts and the stage
table, then names your position and up to three copyable next steps. It never
acts on a pending gate. [More about ask](guide/12-ask.md).

## 4. Deliver

After the design is approved, run a delivery playbook through `/egm-mode`.

| Intent | Playbook |
| --- | --- |
| Add or change behavior | `feature` |
| Fix a reported defect | `bug-fix` |
| Reshape without changing behavior | `refactoring` |
| Answer a read-only question | `investigation` |
| Settle a design fork cheaply | `prototype` |
| Review only, no code | `review-only` |
| Keep a spec true to shipped code | `drift-maintenance` |
| Land the work | `opening-a-pr` |

The delivery playbooks use the same verification rule. Prove the change on the
real artifact, not a proxy. A summary is not evidence.

## 5. Where things go

A run writes under `.egm/<slug>/`. That directory is ignored by default. An
approved spec is promoted to `docs/designs/<slug>.md`. The full list of
artifacts and the naming rules are in [artifacts.md](artifacts.md).

## Project layout

```text
skills/<name>/SKILL.md        one skill, four frontmatter keys
skills/<name>/references/     detail loaded on demand
skills/egm-mode/playbooks/    the twelve delivery and design playbooks
agents/<persona>.md           fresh-context reviewer prompts
resources/document_standards/ shared standards
docs/                         human documentation
docs/designs/                 approved design specs
evals/                        behavioral suites and recorded results
scripts/                      build, validate, sync, eval
tests/                        repository invariant tests
.egm/<slug>/                  run artifacts, ignored by default
```

## The review loop

Five stages. Seven profiles. Each stage writes its report before the next
stage starts. Loop mode ends after two consecutive clean rounds, or at the cap
of five rounds. Settled findings never re-open. An applied fix does not settle.
A reviewer that did not run makes the round unclean.

Fresh context is mandatory. A reviewer never sees the drafting history. On a
host with no subagent tool, the run stops. It never reviews its own draft in
the same context. [The review chapter](guide/03-review-and-resolve.md) has the
details.

## Next

Read the [guide](guide/README.md) in order. Then keep these three handy.

- [artifacts.md](artifacts.md) for the artifact contract.
- [evals.md](evals.md) before you change a skill.
- [designs/egm-stack.md](designs/egm-stack.md) before you change architecture.
