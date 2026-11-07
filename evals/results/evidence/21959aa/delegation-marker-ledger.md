# delegation/isolation-marker and delegation/batch-ledger

- Cases: delegation / isolation-marker, batch-ledger, concurrency-budget, spawn-cost-in-ledger
- Host: DeepSeek Harness subagent (fresh context)
- Model: deepseek-account/deepseek-flash
- Commit under test: 21959aa
- Date: 2026-11-07

## Observed

- Isolation marker: the agent distinguished the brief marker from the
  parent-held marker, named the leak condition, and stated that the verdict of
  a gated review is discarded and re-run when the child names the parent-held
  marker.
- Ledger and waves: blockers plus the first six dependents in wave one, the
  remaining four in wave two, rejects re-queued, one line per child updated on
  return, every spawn counted including retries, digest closing with the usage
  line, and spot-check of one in four plus every PASS without an artifact.

## Verdict

pass for all four cases.
