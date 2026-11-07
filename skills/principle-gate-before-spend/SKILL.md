---
name: principle-gate-before-spend
description: "Apply when paying for the rest of a plan: a review's later stages, a fan-out's next wave, or a whole-file re-run. Decide with the evidence in hand and spend only what the decision needs."
license: Apache-2.0
---

# Gate Before Spend

A plan is an estimate, not a contract to pay. At each natural boundary, decide
with what the run has already produced before buying the rest.

**Why:** The second half of a plan is often worthless once the first half
reports. A clean early stage on a capped run does not need the other four; a
premise-breaking blocker makes them worthless. Running them anyway spends
without signal.

**Pattern:**
- Before dispatch, state the worst case. During the run, one check per
  boundary: continue, stop, or change shape.
- A zero-finding early pass on a budget offers to stop. A premise-breaking
  early failure offers to return to drafting.
- Re-work pays only for what changed, plus context. A declined stop is never
  re-offered.

**Stop:** When the next unit of spend changes no decision, do not spend it.

Distinct from [Laziness Protocol](../principle-laziness-protocol/SKILL.md), which sizes the change you make. This one sizes the work you buy.

Sources: none
