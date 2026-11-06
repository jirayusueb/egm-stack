---
name: principle-sequence-verifiable-units
description: "Apply when breaking multi-step work into units or stacking commits. Give each unit a checkable end state and check each before the next."
license: Apache-2.0
---

# Sequence Verifiable Units

Order work as small units that each end in a checkable state. Do not advance until the current unit is green.

**Why:** A break caught at the unit that caused it is cheap to localize. A break caught after a batch is buried, and later work already sits on a broken base.

**Pattern:**
- For each unit, start from a known-good state, make one change, run the check, then proceed.
- Rebase onto a clean trunk first so every check measures the real baseline.
- Stack commits in the order that proves the work. The canonical shape is a failing test first, then the fix.
- Other useful orders are subtraction before reshape, a baseline capture before the treatment, and scaffold before feature.

**Distinct from** prove it works, which keeps each check real, and build the lever, which makes the per-unit check cheap.

Sources: refactoring
