# artifacts/draft-interview

- Case: artifacts / draft-interview
- Host: DeepSeek Harness subagent (fresh context)
- Model: deepseek-account/deepseek-flash
- Commit under test: 21959aa
- Date: 2026-11-07

## Observed

The agent listed the four interview questions in the skill's exact order and
wording, stated it never invents answers, records a skip as `not answered`,
writes the brief itself, then drafts section by section with one gate question
per section in the correct form.

## Verdict

pass
