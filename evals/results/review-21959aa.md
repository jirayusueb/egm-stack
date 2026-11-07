# review live run

- Commit: 21959aa
- Host: DeepSeek Harness subagent
- Model: deepseek-account/deepseek-flash
- Operator: lead
- Date: 2026-11-07T09:58:41.911Z

| Case | Expected | Observed | Verdict | Evidence |
| --- | --- | --- | --- | --- |
| quick-preset-short-doc | offers-quick-before-full-panel | quick offered first with skips stated | pass | evals/results/evidence/21959aa/review-quick-preset.md |
| digest-in-report | three-line-digest-and-count-line-first | digest lines, count line, and usage line correct | pass | evals/results/evidence/21959aa/review-digest.md |
| resume-mid-review | offers-resume-from-stage-3 | resume gate offered, stages 1-2 not re-run, not-run kept | pass | evals/results/evidence/21959aa/review-resume.md |
