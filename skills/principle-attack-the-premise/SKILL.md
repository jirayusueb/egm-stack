---
name: principle-attack-the-premise
description: "Apply when two or more fixes that share one premise fail the same gate. Write the premise down and test it before writing another fix."
license: Apache-2.0
disable-model-invocation: true
---

# Attack the Premise

When two or more fixes that share one premise fail the same gate, suspect the premise, not the fixes.

**Why:** Each failed fix is evidence against the belief it assumed. A third fix on the same premise spends effort where the evidence already says the cause is not.

**Pattern:**
- Write the premise down as the one sentence every failed fix assumed.
- Find an observation that would differ if the premise were false. Make it.
- Read the shape of the failures, not only their size. Rerun the check.
- If the evidence contradicts the premise, look for what the failures share that the premise did not predict.
- If the evidence confirms the premise, ask the next "why" with fix root causes.

**Stop:** Do not start the next fix before the premise is written and tested.

**Distinct from** redesign from first principles, which rebuilds a design around a new requirement. This questions a fact the current design assumes.

Sources: none
