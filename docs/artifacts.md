# Artifacts

A run writes every artifact under one directory. The default root is
`.egm/<slug>/`, where `<slug>` is a short kebab-case name for the task. The
root is ignored by default in `.gitignore`. Remove that line in a project that
wants to commit its trails.

## Canonical artifacts

| Artifact | Written by | Purpose |
| --- | --- | --- |
| `concepts_brief.md` | `egm-brainstorm` | Concepts, constraints, alternatives, and the open questions the draft must settle |
| `design_draft.md` | `egm-draft` | The spec, section by section, with labeled assumptions |
| `domain_model.md` | `egm-draft` or `ddd` | Aggregates, invariants, commands, events, and boundaries |
| `review/01-zoom-out.md` through `review/05-readiness.md` | `egm-review` | One report per stage, in stage order |
| `goldfish_review_report.md` | `egm-review` | The round report. Every reviewer finding, its severity, and the round state |
| `review/consolidated_review_report.md` | `egm-review` synthesizer | The single report a human and downstream skills read. Carries `Status:` and `**Target:**` |
| `drift_report.md` | `egm-drift` | Each place the spec and shipped code disagree, with evidence |
| `ddd_review.md` | `egm-review` with the `ddd` profile | Model language, aggregate boundaries, invariants, and context map findings |
| `ste100_report.md` | `ste100` | The controlled-language linter result, with rule ids and line numbers |
| `arena/` | `arena` | One subdirectory per candidate attempt, plus the comparison |
| `statechart/` | `statechart` | The TLA+ model, the rendered Mermaid chart, and the report |
| `team/` | `delegate` durable teams | Briefs, task ids, write scopes, and child reports |

The five stage reports follow the five stages in order. Zoom-Out plus Inventive
Catalyst, Comprehension, Design Critic, Intermediate Zoom-Out, Implementation
Readiness. Never reorder the reports and never write a later stage before an
earlier one exists.

## Naming rules

- Keep the canonical file names exactly. Downstream skills match on them.
- Write one file per unit of work. One reviewer finding, one row. One
  candidate, one subdirectory.
- Use lowercase names. Do not add dates to a canonical file. A date lives in
  the file header instead.
- Write one slug per task. A retry of the same task reuses the slug and
  overwrites its own outputs.
- Keep reviewer drafts out of the canonical paths. Only the parent or the
  synthesizer writes reports.

## Directory override

The default root is `.egm/`. Override it by naming the root when the run
starts, for example to keep a run beside an unrelated workspace or on a shared
drive. The router records the chosen root for the whole run and passes absolute
paths to every child.

Rules for an override.

- Use one root per run. Do not split artifacts across two roots.
- Keep the `<slug>` directory layout inside the chosen root.
- State the override in the run report and in the PR body.
- A run that finds an existing `.egm/<slug>/` continues it. It does not start a
  second directory.

## Promotion to docs/designs

An approved spec is promoted. The artifact trail is not.

1. Confirm the review converged. Two consecutive clean rounds, or a human
   waiver recorded in the report.
2. Copy `design_draft.md` to `docs/designs/<slug>.md`.
3. Set the document header. Authors, `Status: Current`, and the date.
4. Add a row to `docs/designs/README.md` with a one-sentence summary.
5. Leave `.egm/<slug>/` in place. It stays the evidence trail for the review.

A rejected or abandoned design does not get promoted. Keep its trail until the
task is closed.

## What ask reads

`egm-ask` is read-only. It reads only these things.

- Artifact names present under the run root, not their full contents.
- The `Status:` line and the `**Target:**` line of
  `consolidated_review_report.md`.
- Skill frontmatter from `skills/<name>/SKILL.md`.
- The stage table at `skills/egm-ask/references/stage-table.md`.
- The harness map at `docs/harness.md`.

It never reads reviewer transcripts, and it never writes an artifact. That is
what keeps its answer cheap and its advice safe.
