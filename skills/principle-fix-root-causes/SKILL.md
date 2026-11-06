---
name: principle-fix-root-causes
description: "Apply when debugging. Trace each symptom to the first place the system did something wrong and fix it there."
license: Apache-2.0
---

# Fix Root Causes

Fix the fault, not the place where it surfaced. The symptom is where a wrong state became visible. The root cause is the first place the system did something it should not do, or failed to handle a state it should handle.

**Why:** A symptom fix hides the evidence and leaves the fault free to surface elsewhere. The code then carries a workaround for a bug nobody named.

**Pattern:**
- Reproduce the failure first.
- Ask "why" at each step until the answer is a wrong decision in the code, not a consequence of one.
- When stuck, instrument. Read the actual error and the actual state.
- Ask whether the triggering state is legitimate. If it is, handle it where it broke. If it is not, find what produced it.
- Check for the pattern, not just the instance. Fix every place with the same fault.

**Stop:** A guard is a fix only when the state it handles is legitimate. Otherwise the guard hides the bug.

**Distinct from** attack the premise, which tests a belief the fixes share, not a fault the code contains.

Sources: working-effectively-with-legacy-code
