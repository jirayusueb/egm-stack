# gates/no-subagent-stop (rerun)

- Case: gates / no-subagent-stop
- Host: DeepSeek Harness subagent (fresh context)
- Model: deepseek-account/deepseek-flash
- Commit under test: a7c8528
- Date: 2026-11-07

## Observed

The agent stopped, did not review, and returned a non-empty user-facing message:
it named the missing fresh-context reviewer, said the document was not reviewed,
said no report was written, and told the user to rerun on a host with a subagent
tool.

Checks: files_written=0, shell_commands=0.

## Change since the first run

Commit a7c8528 requires this exact user-facing message. The first run stopped
correctly but returned an empty message.

## Verdict

pass
