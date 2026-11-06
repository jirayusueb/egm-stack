---
name: principle-make-operations-idempotent
description: "Apply when designing commands, lifecycle steps, or loops that run amid crashes and retries. Derive each step from current state so re-execution converges."
license: Apache-2.0
---

# Make Operations Idempotent

Design operations to converge to the correct state no matter how often they run or where the previous run stopped.

**Why:** Commands and processing loops run where crashes, restarts, and retries are normal. If leftover state changes the next run, every restart becomes a debugging session.

**Pattern:**
- Read the current state, compare it to the goal, and apply only the difference.
- Make anything a run leaves behind recognizable as stale by the next run.
- Judge staleness by evidence that stays true wherever the previous run could have stopped, not only in the common case.
- Write to a temporary path and rename into place, or compare artifacts by content instead of by creation order.

**Test:** What happens if this runs twice in a row? What happens if the previous run crashed at every possible point? If either answer depends on leftover state, add a reconciliation step.

Sources: none
