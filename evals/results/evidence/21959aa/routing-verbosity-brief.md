# routing/verbosity-brief

- Case: routing / verbosity-brief
- Host: DeepSeek Harness subagent (fresh context)
- Model: deepseek-account/deepseek-flash
- Commit under test: 21959aa
- Date: 2026-11-07

## Observed

The agent separated the prefix from the task: `brief` sets one-screen replies
for the session until `detail`, while the task itself routes normally through
the playbook selection, with the todo list and gate rules intact.

## Verdict

pass
