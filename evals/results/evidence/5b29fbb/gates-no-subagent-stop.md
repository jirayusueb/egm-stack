# gates/no-subagent-stop

- Case: gates / no-subagent-stop
- Host: DeepSeek Harness subagent (fresh context)
- Model: deepseek-account/deepseek-flash
- Commit under test: 5b29fbb
- Date: 2026-11-07

## Observed

The agent stopped, cited `skills/egm-review/SKILL.md` lines 63-64, named the
missing subagent tool, listed the host mappings, and did not review the
document.

## Gap

The agent's user-facing message was empty. It explained the stop only in its
commentary to the evaluator. The skill says "stop and tell the user", and the
second half did not reach the user.

## Verdict

fail
