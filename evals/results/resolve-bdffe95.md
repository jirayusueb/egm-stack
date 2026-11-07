# resolve live run

- Commit: bdffe95
- Host: DeepSeek Harness subagent
- Model: deepseek-account/deepseek-flash
- Operator: lead
- Date: 2026-11-06T18:22:55.802Z

| Case | Expected | Observed | Verdict | Evidence |
| --- | --- | --- | --- | --- |
| gate-single-question | one-question-sole-tool-call | one question, three options, no prefix, nothing applied | pass | evals/results/evidence/bdffe95/resolve-gate.md |
