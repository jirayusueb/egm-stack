# writing live run

- Commit: 705e96c
- Host: DeepSeek Harness subagent
- Model: deepseek-account/deepseek-flash
- Operator: lead
- Date: 2026-11-06T17:55:37.915Z

| Case | Expected | Observed | Verdict | Evidence |
| --- | --- | --- | --- | --- |
| unslop-rule-ids | stable-rule-ids-with-gaps | plain rewrite, rule ids with gaps, no invented facts | pass | evals/results/evidence/705e96c/writing-unslop.md |
| ste100-official-dictionary | no-invented-word-approvals | active voice, short sentences, lint 8 to 0, no conformance claim | pass | evals/results/evidence/705e96c/writing-ste100.md |
