# Evals

Behavioral evals check that a skill change changes agent behavior the way the
design says. Static checks run on every change. Live runs are triggered by a
human and recorded.

## Suites

| Suite | What it covers | Gate |
| --- | --- | --- |
| routing | `egm-mode` intent to workflow and playbook, ask stage detection | Blocks a release |
| review | profiles, the five stages, loop mode, convergence, report order | Blocks on regression, else triage |
| resolve | triage, approved fixes, no silent scope growth | Triage |
| ask | five question types, read-only behavior, twenty-line limit, gate handling | Blocks on regression, else triage |
| delegation | brief completeness, fresh context, disjoint write scopes, dropout | Triage |
| writing | `unslop` rule ids, `ste100` order, `technical-writing` structure | Triage |
| ddd | model, review profile, modernize | Triage |
| statechart | prerequisites, verdicts, opt-in only | Does not block |

The canonical case list and the case schema live in `evals/`. This page owns
the protocol, not the cases.

## Static check

Run the static check in CI and before a release candidate.

```sh
node scripts/eval.mjs --check
```

It never calls a model. It validates schema and coverage, and it fails when any
of these is true.

- A case is missing a required field.
- A skill that routes has no case.
- A playbook or review profile has no case.
- `egm-ask` has no case for one of its five question types.
- An expected artifact name disagrees with [artifacts.md](artifacts.md).

## Live-run protocol

Live runs follow these steps in order.

1. Work in a scratch repository, never in this repository.
2. Use a fresh session for every case. Paste the case prompt verbatim and edit
   nothing.
3. Hold the host and model fixed within a suite. Record both.
4. Do not coach the agent. Answer a question only in the way the case says.
5. Score against the expected behavior in the case file. Cite the artifact that
   shows the behavior.
6. Run routing cases twice. A disagreement is inconclusive. Run once more. A
   split after three runs is a fail.
7. Stop the suite on a harness failure. Record the case as not run.

A live run that skips the fresh session does not count. A run that reviews its
own draft in the same context is not evidence.

## Recording results

Record each live run under `evals/results/`. Use one file per suite and commit,
named `<suite>-<commit>.md`.

The header names the commit, host, model, operator, and date. The body is a
table with one row per case. Columns are case id, expected, observed, verdict,
and an evidence link. Verdict is `pass`, `fail`, or `not run`.

Never edit a recorded result. A rerun adds a new file. The newest file for a
suite is the current answer.

## Release gate

- A routing regression blocks the release. There is no waiver.
- A review or ask regression needs a recorded triage note before release.
- A writing, resolve, delegation, or ddd regression needs a fix or a
  `CHANGELOG` note.
- A statechart failure does not block. It is experimental and opt-in.
- A `not run` routing or review suite blocks the release candidate.

The gate is evidence, not a feeling. If the result file is missing, the release
is not ready.
