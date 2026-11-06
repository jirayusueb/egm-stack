---
name: principle-foundational-thinking
description: "Apply when choosing core types, writing initial logic, or sequencing scaffold and feature work. Get the data shape right so downstream code becomes obvious."
license: Apache-2.0
---

# Foundational Thinking

Get the data shape right before writing logic. Land scaffold before features.

**Why:** Structural decisions protect option value. Code-level decisions protect simplicity. A shape chosen early makes whole categories of later code obvious or impossible.

**Pattern:**
- Define core types early. Trace each access pattern and choose the structure for the dominant path.
- DRY the structure, not every line. Prefer explicit over clever. Three similar statements beat a premature abstraction.
- Before sharing state between concurrent actors, ask what happens if another actor changes it. If the answer is not "nothing", isolate it.
- Do scaffold first when every later phase benefits. Continuous checks, linting, test infrastructure, and shared types qualify.

Subtraction comes first. Remove dead code, then lay foundations.

**Distinct from** subtract before you add, which covers the removal step before this one.

Sources: none
