# Evals

Behavioral evals check that a skill change changes agent behavior the way the
design says. Static checks run on every change. Live runs are triggered by a
human and recorded.

## Suites

| Suite | What it covers | Gate |
| --- | --- | --- |
| routing | `egm-mode` intent to workflow and playbook, ask stage detection | Blocks a release |
| gates | one-question gates, read-only reviewers, no edits on capability requests | Blocks on regression, else triage |
| artifacts | the brief to draft to review to resolve to promote chain | Triage |
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

- A suite is missing, empty, or below its minimum case count.
- A case is missing a required field, or its id repeats.
- A skill that routes has no case.
- A playbook, rule pack, or review profile has no case.
- `egm-ask` has no case for one of its five question types.
- An expected artifact name disagrees with [artifacts.md](artifacts.md).

Three more static checks run with it.

- `node scripts/describe-eval.mjs --check` validates the description trigger
  cases. Every core skill needs two positive cases, and the suite needs eight
  negatives.
- `node scripts/check-regressions.mjs` runs the executable regressions in
  `evals/regressions.yaml`. Each one comes from a real failure.
- The CI install job runs `npx skills add . --list` and asserts the roster
  count.

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

## Tools

`node scripts/run-evals.mjs` is the live-run helper. It lists cases, prints one
case brief, records a verdict, and summarizes.

```sh
node scripts/run-evals.mjs --list review
node scripts/run-evals.mjs --suite review --case stage-order
node scripts/run-evals.mjs --suite review --case stage-order --record \
  --verdict pass --evidence .egm/checkout/review/01-zoom-out.md \
  --host omp --model deepseek-account/deepseek-flash --operator jirayu
node scripts/run-evals.mjs --summary
```

`node scripts/describe-eval.mjs` does the same for descriptions.

```sh
node scripts/describe-eval.mjs --list
node scripts/describe-eval.mjs --id mode-design --triggered egm-mode
node scripts/describe-eval.mjs --summary
```

Neither tool calls a model. A human runs the case in a fresh session and
records what happened.

## Recording results

Record each live run under `evals/results/`. Use one file per suite and commit,
named `<suite>-<commit>.md`. The runner creates it.

The header names the commit, host, model, operator, and date. The body is a
table with one row per case. Columns are case id, expected, observed, verdict,
and an evidence link. Verdict is `pass`, `fail`, or `not run`.

```markdown
# review live run

- Commit: abc1234
- Host: omp 18.11.0
- Model: deepseek-account/deepseek-flash
- Operator: jirayu
- Date: 2026-11-07T00:40:00Z

| Case | Expected | Observed | Verdict | Evidence |
| --- | --- | --- | --- | --- |
| stage-order | reports-written-in-stage-order | 01..05 in order | pass | .egm/checkout/review/ |
```

Never edit a recorded result. A rerun adds a new file. The newest file for a
suite is the current answer.

## Release gate

- A routing or description-trigger regression blocks the release. There is no
  waiver.
- A review or ask regression needs a recorded triage note before release.
- A writing, resolve, delegation, or ddd regression needs a fix or a
  `CHANGELOG` note.
- A statechart failure does not block. It is experimental and opt-in.
- A `not run` routing or review suite blocks the release candidate.

The gate is evidence, not a feeling. If the result file is missing, the release
is not ready.
