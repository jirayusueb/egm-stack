# Self-review with the new engine (quality round)

- Cases: dogfood round on docs/designs/egm-stack.md
- Host: DeepSeek Harness, fresh-context subagents with stress-test mandates and the intentional ledger
- Model: deepseek-account/deepseek-flash
- Commits: findings against c600b8a, fixes in b39efe8..5319f91
- Date: 2026-11-08

## Reviewers and verdicts

- egm-design: OPEN, 0 Blocker, 3 Major, 5 Nit
- egm-implementation-readiness: OPEN, 3 Blocker, 4 Major, 1 Nit
- egm-zoom-out: OPEN, 1 Blocker, 1 Major, 2 Nit

Three independent fresh contexts converged on the same root defect: the roster
arithmetic contradicted itself in six places.

## Fixed

- Roster reconciled: 9 core, 14 extended with diagnose named, 25 principles,
  13 playbooks, everywhere including the architecture table and the ledger.
- Extended roster gained a responsibility column (diagnose, tdd, no-comments
  were names without behavior).
- Presets versus profiles defined; ask taxonomy enumerated.
- Loop gained the cap-exhausted terminal state.
- Write-scoped delegates carry the injection guardrail with scope confinement.
- Why cost row names the synthesizer; config writes inventoried; validation
  counts its ten commands; the review cost row arithmetic corrected.

## Trigger results

Six live cases, all pass: egm-mode x2, egm-review, diagnose, how, egm-verify,
and two negatives correctly firing none.

## Verdict

pass for the round. The reviewers found real defects; every finding is fixed
or recorded in this evidence file.
