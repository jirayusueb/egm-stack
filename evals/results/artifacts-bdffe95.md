# artifacts live run

- Commit: bdffe95
- Host: DeepSeek Harness subagent
- Model: deepseek-account/deepseek-flash
- Operator: lead
- Date: 2026-11-06T17:58:21.901Z

| Case | Expected | Observed | Verdict | Evidence |
| --- | --- | --- | --- | --- |
| drift-report-artifact | drift_report.md | drift report written with evidence, no code edits | pass | evals/results/evidence/bdffe95/artifact-drift.md |
| brief-to-draft | design_draft.md | design_draft.md written with all eight sections | pass | evals/results/evidence/bdffe95/artifact-brief-to-draft.md |
| resolve-to-promote | docs/designs/ | gates verified, header applied, body unchanged | pass | evals/results/evidence/bdffe95/artifacts-promote.md |
| ddd-model-artifact | domain_model.md | domain_model.md written with the full playbook shape | pass | evals/results/evidence/bdffe95/artifact-dds-model.md |
