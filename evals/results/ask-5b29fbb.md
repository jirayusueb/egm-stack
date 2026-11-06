# ask live run

- Commit: 5b29fbb
- Host: DeepSeek Harness subagent
- Model: deepseek-account/deepseek-flash
- Operator: lead
- Date: 2026-11-06T17:44:28.726Z

| Case | Expected | Observed | Verdict | Evidence |
| --- | --- | --- | --- | --- |
| first-run | names-setup-and-a-start-prompt |  | pass | evals/results/evidence/5b29fbb/ask-first-run.md |
| resume-summary | stage-files-open-findings-next | answer correct, but ran a no-op shell command | fail | evals/results/evidence/5b29fbb/ask-resume.md |
