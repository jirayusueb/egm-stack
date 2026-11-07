# resolve/single-finding-mode

- Case: resolve / single-finding-mode
- Host: DeepSeek Harness subagent (fresh context)
- Model: deepseek-account/deepseek-flash
- Commit under test: 21959aa
- Date: 2026-11-07

## Observed

The agent described single-finding mode exactly: load only the named finding,
skip the full gate, one confirmation, touch nothing outside that scope, report
the rest as untouched. It also caught that the fixture ids (F1..F3) do not match
the requested id (design-1-1) and refused to guess the mapping, which is the
correct behavior.

## Verdict

pass
