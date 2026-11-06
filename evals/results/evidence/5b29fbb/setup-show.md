# setup/show

- Case: setup / show
- Host: DeepSeek Harness subagent (fresh context)
- Model: deepseek-account/deepseek-flash
- Commit under test: 5b29fbb
- Date: 2026-11-07

## Observed

The reply printed all 17 roles with value, source, and status, stated the
budget line, and marked the configured `zai/glm-5.3` values as needing a choice
because only `deepseek-account/deepseek-flash` resolves in this session. It
wrote nothing.

## Note

The configured file had been replaced with `zai/glm-5.3` values between runs.
The mismatch is a config state issue, not a show-mode defect.

## Verdict

pass
