---
name: principle-encode-lessons-in-structure
description: "Apply when the same instruction appears twice or a correction repeats. Encode the rule as a lint, metadata flag, runtime check, or script instead of more prose."
license: Apache-2.0
---

# Encode Lessons in Structure

If the same instruction appears twice, encode it in structure instead of writing it again.

**Why:** A structural guard runs every time. Prose is remembered sometimes. Prose that restates a rule is a symptom of a missing guard.

**Pattern:**
- Make the fix structural when a structure can carry it. Use a lint, a metadata flag, a runtime check, a generated index, or a script.
- Keep the check where the work happens so the failure is immediate.
- Remove the prose the guard replaces. Two sources of truth drift.
- If the lesson needs judgment and cannot be encoded, make the instruction prominent and add an example of the failure.

**Stop:** If a structural fix exists, use only the structural fix. Do not add the instruction as well.

Sources: the-pragmatic-programmer
