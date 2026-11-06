# Stage table

Read this after stage detection. Rows are ordered by how far the work has
progressed. Artifacts live under `.egm/<slug>/` unless the row says otherwise.
Files are hints. The review `Status:` line and the newest artifact decide.

| Artifacts seen | Stage | Suggest |
| --- | --- | --- |
| No `.egm/`, no `docs/designs/*.md`, no model config | First run | `/egm-setup`, then `/egm-mode <task>` |
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
