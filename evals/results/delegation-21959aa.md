# delegation live run

- Commit: 21959aa
- Host: DeepSeek Harness subagent
- Model: deepseek-account/deepseek-flash
- Operator: lead
- Date: 2026-11-07T10:00:15.694Z

| Case | Expected | Observed | Verdict | Evidence |
| --- | --- | --- | --- | --- |
| isolation-marker | parent-held-marker-verified-before-trust | marker or wave, ledger, and digest behaviors correct | pass | evals/results/evidence/21959aa/delegation-marker-ledger.md |
| batch-ledger | ledger-kept-and-updated-per-return | marker or wave, ledger, and digest behaviors correct | pass | evals/results/evidence/21959aa/delegation-marker-ledger.md |
| concurrency-budget | spawns-in-waves-and-queues-rejects | marker or wave, ledger, and digest behaviors correct | pass | evals/results/evidence/21959aa/delegation-marker-ledger.md |
| spawn-cost-in-ledger | digest-ends-with-used-x-spawns | marker or wave, ledger, and digest behaviors correct | pass | evals/results/evidence/21959aa/delegation-marker-ledger.md |
