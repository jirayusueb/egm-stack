# 12 Ask

`egm-ask` answers where you are and what to run next. It is read-only and
advisory. It reads, it replies, and it stops.

## What it answers

It classifies a question into one of five types.

| Question type | Example | What it answers |
| --- | --- | --- |
| Position | Where am I | The current stage, from the artifacts and the stage table |
| Next step | What should I run | Up to three copyable commands, in order |
| Convergence | Is the review done | The round state, the open Blocker and Major count, and the round number |
| Staleness | What is out of date | Which report no longer matches the current artifact |
| Gate | Can I implement now | Whether the implementation gate is open, and what it waits on |

## What it reads

- Artifact names present under the run directory.
- The `Status:` and `**Target:**` lines of
  `consolidated_review_report.md`.
- Skill frontmatter.
- The stage table at `skills/egm-ask/references/stage-table.md`.
- The harness map at `docs/harness.md`.

It never reads reviewer transcripts. It never writes an artifact. It never
spawns a child.

## How it replies

At most twenty lines. Up to three next steps, each a copyable command or a
direct instruction. It names where each answer came from, so you can check it.

```text
/egm-ask where am I
```

```text
You are at review, round 2 of 5. The last round was not clean.
Open findings: 1 Blocker in review/03-design-critic.md, 2 Major.
Next:
  /egm-resolve
  /egm-review
  /egm-ask is the review converged
```

## The gate rule

`egm-ask` never answers another skill's pending gate. A gate belongs to the
skill that asked it and to the human who answers it. Ask can report that a gate
is open and name the skill that owns it. It never picks an option.

If you ask it to decide, it says which skill owns the decision and stops.

## When not to use it

- You want the work done. Use the router or the skill that does the work.
- You want a design decision. Use the gate the run is waiting on.
- You want a code review. Use the review engine.

Ask is a map, not a driver.

## Examples

```text
/egm-ask what should I run next
/egm-ask is the review converged
/egm-ask which report is stale
/egm-ask can I start implementing
/egm-ask where did the run stop
```

## End of the guide

That is the whole stack. Return to the [guide index](README.md) when you need a
chapter, or the [documentation index](../index.md) for everything else.
