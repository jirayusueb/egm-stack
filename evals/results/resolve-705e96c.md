# resolve live run

- Commit: 705e96c
- Host: DeepSeek Harness subagent
- Model: deepseek-account/deepseek-flash
- Operator: lead
- Date: 2026-11-06T17:55:18.124Z

| Case | Expected | Observed | Verdict | Evidence |
| --- | --- | --- | --- | --- |
| triage-propose-fix | propose-fix-with-scope | F1 applied, F2 contested with reason, F3 declined, scope kept | pass | evals/results/evidence/705e96c/resolve-triage.md |
| triage-contest-checkable | contest-requires-checkable-reason | F1 applied, F2 contested with reason, F3 declined, scope kept | pass | evals/results/evidence/705e96c/resolve-triage.md |
| triage-decline | decline-with-risk-note | F1 applied, F2 contested with reason, F3 declined, scope kept | pass | evals/results/evidence/705e96c/resolve-triage.md |
| scope-guard | no-edits-outside-target | F1 applied, F2 contested with reason, F3 declined, scope kept | pass | evals/results/evidence/705e96c/resolve-triage.md |
