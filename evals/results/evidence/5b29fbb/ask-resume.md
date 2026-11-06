# ask/resume-summary

- Case: ask / resume-summary
- Host: DeepSeek Harness subagent (fresh context)
- Model: deepseek-account/deepseek-flash
- Commit under test: 5b29fbb
- Date: 2026-11-07

## Observed

The reply named slug `checkout` and the resolve stage, listed the three
artifacts, counted 1 Major and 1 Nit with zero settled, and gave the next
command while refusing to act on the pending gate.

## Gap

The agent ran a no-op shell command (`true`). The skill says "Run no shell
command." The read-only guarantee was violated even though nothing changed.

## Verdict

fail
