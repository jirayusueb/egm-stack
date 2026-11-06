---
name: principle-type-system-discipline
description: "Apply when designing types or reviewing a signature in a statically typed language. Make impossible states, mismatched primitives, and unhandled variants compile errors."
license: Apache-2.0
disable-model-invocation: true
---

# Type System Discipline

Make the compiler reject impossible states, mismatched primitives, and unhandled variants.

**Why:** A compile error costs seconds. The same mistake at runtime costs an incident. Types are the cheapest place to remove a whole category of handler code.

**Pattern:**
- Brand semantic primitives. A user identifier and an order identifier are both strings and must not be interchangeable. Validate once at creation, then trust the type.
- External data is untyped until parsed. Parse payloads, messages, arguments, config, environment values, and rows at the boundary.
- Derive types from an authoritative schema. Do not hand-roll a parallel type that drifts.
- Exhaust every variant. Prefer defining an error out of existence over adding a handler.

**Distinct from** boundary discipline, which says where validation lives. This says what a type can express.

Sources: none
