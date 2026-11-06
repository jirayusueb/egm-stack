---
name: principle-separate-before-serializing-shared-state
description: "Apply when concurrent actors may write the same file, branch, key, or state object. Remove the sharing first and serialize structurally only for a real invariant."
license: Apache-2.0
disable-model-invocation: true
---

# Separate Before Serializing Shared State

When concurrent actors may share mutable state, ask whether they need the same mutable object. If not, remove the sharing.

**Why:** Concurrent writes create races that appear intermittently, resist reproduction, and cost far more to debug than the separation would have cost to design.

**Pattern:**
- Identify shared mutable state. This includes files both actors write and keys both actors update.
- Default to one owned file, key, branch, or state directory per actor. Merge at the read or reporting boundary.
- Only when one shared write target is a real invariant, serialize access structurally with a lock file, a sequential phase, a single writer, or a compare-and-swap.
- Treat "we need a lock" as a design question, not the default answer.

**Test:** Do these actors publish independent facts, or must there be one canonical object? Independent facts do not need shared mutation.

Sources: none
