---
name: principle-minimize-reader-load
description: "Apply when code is hard to trace. Count layers between question and answer and hidden state the reader must hold, then cut one of each."
license: Apache-2.0
disable-model-invocation: true
---

# Minimize Reader Load

Maintainability is the work a reader must do. Track two axes, layers to trace and state to hold.

**Why:** Lines of code, cyclomatic complexity, and layering are proxies. Reader load is the thing that decides whether the next change is safe.

**Pattern:**
- Collapse a wrapper with one caller, an adapter with no second implementation, and indirection that was never needed.
- Make each layer change the abstraction. A pass-through layer adds load without compression.
- Prefer pure functions, then locals, then fields, then module state, then globals.
- Name an invariant once at the boundary, not in every consumer.
- Before adding a layer or a piece of state, check that it removes at least as much load elsewhere.

**Test:** Can a new reader answer where this value comes from and what can change it in under 30 seconds?

**Distinct from** guard the context window, which applies the same limit to the machine.

Sources: none
