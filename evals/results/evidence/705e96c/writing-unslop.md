# writing/unslop-rule-ids

- Case: writing / unslop-rule-ids
- Host: DeepSeek Harness subagent (fresh context)
- Model: deepseek-account/deepseek-flash
- Commit under test: 705e96c
- Date: 2026-11-07

## Observed

The agent rewrote the paragraph in plain prose, deleted the vague attribution
and the generic conclusion instead of inventing facts, and listed the rule ids
it applied. The ids preserve the upstream gaps.

## Verdict

pass
