# 04 Deliver

A reviewed design is not shipped code. A delivery playbook closes the gap and
proves the change on the real artifact.

## Choose the playbook

The router picks one. You can also name it.

| Playbook | Use it when |
| --- | --- |
| `investigation` | The question is read-only. How does this work, why was it built this way, are we sure |
| `feature` | New or changed behavior, built from a named data shape |
| `bug-fix` | A reported defect to reproduce, root-cause, and fix with runtime evidence |
| `refactoring` | The behavior stays and the structure changes |
| `prototype` | One cheap sketch settles a design fork |
| `review-only` | A review with no code change |
| `drift-maintenance` | The spec and the shipped code disagree |
| `opening-a-pr` | Turn the work into small ordered commits and a ready pull request |
| `orchestrate` | A standing program with many stacked changes under one coordinator |

Design playbooks come first. Delivery playbooks assume a reviewed design or a
clear defect.

## The verification rule

Every delivery playbook uses the same rule. Prove the change on the real
artifact. A proxy, a self-report, or "it compiles" does not count.

- A feature is proven by running it.
- A bug fix is proven by the original repro passing.
- A refactor is proven by a pinned behavior check that stays green.
- A review is proven by the report existing at the exact commit it reviewed.

Verification happens on the surface the change lives on. A web change gets a
browser run. A CLI change gets a terminal run. A bug fix that was reported on a
phone is not verified on a desktop.

## Small verified units

Break work into units that each end in a check. Verify one unit before you
start the next. Order the commits so the sequence proves itself.

The canonical order is a failing test first, then the fix on top. Other honest
orders are a subtraction before a reshape, a baseline capture before the
treatment, and a scaffold before the feature.

## Opening the pull request

```text
/egm-mode open a pr for this change
```

The playbook does four things.

1. Commits in small ordered steps with conventional commit titles.
2. Writes the PR body as a one-minute briefing. Why, what changed, scope,
   tradeoffs, blast radius, verification.
3. Opens the PR ready, never as a draft.
4. Hands back the URL. It does not babysit unless you ask.

## Drift

Code moves after a spec is promoted. `drift-maintenance` compares the spec and
the code and writes `drift_report.md`. Each row is one disagreement, with
evidence and a proposed resolution.

```text
/egm-mode check the payments spec against the current code
```

An approved drift fix is a normal change. It goes through the same delivery
playbook as any other.

## Orchestrate

For a program that spans days or many stacked changes, use the `orchestrate`
playbook through `egm-mode`. It keeps one owner per unit, verifies with a
reviewer that did not write the code, and reports live state per pull request.
It is a program, not a task.

## Next

[05-principles.md](05-principles.md) explains how to steer an agent by naming a
principle.
