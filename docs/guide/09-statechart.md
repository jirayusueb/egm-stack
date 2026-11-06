# 09 Statechart

`statechart` is experimental. It checks a TLA+ model of a system that moves
between states, then draws the user-visible behavior as a Mermaid statechart.
The report gives the shortest path to each state that breaks a rule.

Use it when a diagram is the only way a reader will see the bug. A retry loop,
a protocol handshake, a checkout flow, or a lifecycle are good fits.

## Prerequisites

This skill is heavier than the rest of the stack. It needs three things.

1. Node 22.18 or later.
2. A Java runtime on the path.
3. The TLA+ tools, including the TLC model checker.

The core stack does not need any of this. Skip the skill if the prerequisites
are missing, and mark the step as not run in the report.

## Run

```text
/statechart model the retry flow and show the state that double-charges
```

The skill writes a TLA+ model, runs TLC, and renders the chart. It then maps
every violation back to a path a user can walk.

Its tests are opt-in, because they need the same prerequisites.

```sh
npm run test:statechart
```

## Artifacts

A run writes under `statechart/` in the run directory.

| Artifact | Purpose |
| --- | --- |
| The model file | The TLA+ specification of the system and its rules |
| The config file | The constants and the properties to check |
| The chart file | The Mermaid statechart a human reads |
| The report | Each verdict, each violating state, and the shortest path to it |

## Read the report

Each row answers three questions.

- Which rule was checked.
- Whether the model satisfies it.
- If it does not, the shortest path from the initial state to the violation.

A deadlock is a terminal state where a person waits forever. A violation is a
state the design says must never happen. Both are findings, and both come with
a path.

## Limits

- The model is an abstraction. A clean verdict only covers what the model says.
- State explosion is real. Keep the model small and the constants tight.
- The chart is communication, not proof. The proof is the TLC run.

## If it cannot run

Record the missing prerequisite. Do not fake a verdict. The review marks the
step not run, and that makes the round unclean by the normal rules. A plain
prose review of the state machine is still possible, but it is not a statechart
result.

## Next

[10-ddd.md](10-ddd.md) covers domain-driven design.
