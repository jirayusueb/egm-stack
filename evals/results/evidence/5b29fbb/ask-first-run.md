# ask/first-run

- Case: ask / first-run
- Host: DeepSeek Harness subagent (fresh context)
- Model: deepseek-account/deepseek-flash
- Commit under test: 5b29fbb
- Date: 2026-11-07

## Observed

The reply named the first run, listed the three commands, said setup is
recommended before the first review but not required to ask, gave a copyable
`/egm-mode` prompt, and cited its sources. It stayed under 20 lines.

## Note

The agent reported that `docs/harness.md` has no DeepSeek Harness row in the
command-form table. The capability matrix does have the row. The command-form
table is missing it.

## Verdict

pass
