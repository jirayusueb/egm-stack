---
name: principle-exhaust-the-design-space
description: "Apply when a novel interaction or architecture decision has no precedent. Build 2 or 3 competing prototypes and compare them side by side before committing."
license: Apache-2.0
---

# Exhaust the Design Space

When no precedent answers the question, build 2 or 3 competing prototypes and compare them side by side before committing.

**Why:** Feel and fit are cheap to compare in throwaway work and expensive to discover after production code exists.

**Pattern:**
- Make each prototype minimal. Each answers one design question.
- Make the prototypes genuinely different, not three shades of the same idea.
- Compare on the user experience and on maintenance cost.
- Choose one, record why the others lost, and delete the losers.
- Stop exploring when the next variant cannot change the decision.

Sources: none
