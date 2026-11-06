---
name: principle-outcome-oriented-execution
description: "Apply when planning a rewrite or migration with explicit phase boundaries. Converge on the verifiable end state instead of preserving every intermediate state."
license: Apache-2.0
---

# Outcome-Oriented Execution

Optimize for the intended, verifiable end state, not for smooth intermediate states.

**Why:** Keeping every step fully stable creates temporary compatibility code that becomes long-lived debt. Converge on the target architecture and prove correctness at the declared checkpoints.

**Pattern:**
- Prioritize end-state integrity over transitional stability.
- Accept intermediate breakage only when it is planned, scoped, and reversible.
- Declare where temporary breakage is allowed.
- Keep high-signal checks on the areas being touched.
- Require full static and runtime verification at plan completion.

**Stop:** Do not use this for exploratory work with no target. Without a verifiable end state, stability wins.

Sources: none
