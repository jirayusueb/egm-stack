---
name: principle-boundary-discipline
description: "Apply when wiring validation, error handling, or framework adapters. Validate at system boundaries, trust internal types, and keep business logic in pure functions."
license: Apache-2.0
disable-model-invocation: true
---

# Boundary Discipline

Place validation, type narrowing, and error handling at system boundaries. Trust internal code. Keep business logic in pure functions.

**Why:** Scattered validation is noisy and gives false safety. Logic outside framework wiring can be tested without the framework.

**Pattern:**
- At a boundary, such as a command line, config file, network call, or external API, validate and return errors.
- Inside the system, use typed data and propagate errors. Do not re-validate.
- Expose domain concepts, not the boundary's private representation.
- Keep general mechanism inside. Keep special policy at the edge.

**Test:** Is this data crossing a system boundary right now? If not, revalidation is redundant. Can this logic be a pure function the shell calls? If yes, extract it.

Sources: clean-architecture
