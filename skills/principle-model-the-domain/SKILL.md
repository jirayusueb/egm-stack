---
name: principle-model-the-domain
description: "Apply when stateful logic branches heavily or repeats a shape assumption. Encode the domain in a structure so invalid states cannot be represented."
license: Apache-2.0
disable-model-invocation: true
---

# Model the Domain

Encode the real domain in a data structure instead of scattering it across conditionals.

**Why:** A structure that matches the domain makes invalid states unrepresentable and deletes branches. Choosing it at write time is cheap. Recovering it later reads as a rewrite and gets deferred.

**Pattern:**
- Use a state machine instead of scattered booleans, phases, or lifecycle checks.
- Use a typed model instead of loose parameters and repeated shape assumptions.
- Use a map, registry, or discriminated union instead of branching spread across files.
- Use a reducer or command and event model instead of ad hoc mutation.
- Group a module around one body of domain knowledge, not a load-validate-transform-save sequence.

**Stop:** Do not force an abstraction. Prefer boring code when the current shape is already clear, local, and unlikely to grow.

**Stop signal:** A new feature grows an existing if/else chain by one branch, or adds a second boolean that must stay in sync with the first.

Sources: domain-driven-design
