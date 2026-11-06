---
name: principle-laziness-protocol
description: "Apply when refactoring, judging diff size, or tempted to add abstractions. Bias toward deletion and the smallest change that solves the problem."
license: Apache-2.0
disable-model-invocation: true
---

# Laziness Protocol

Delete more than you add. Make the smallest change that solves the problem.

**Why:** Every added line is a line the next reader must trace and the next editor must preserve. Deletion removes work forever.

**Pattern:**
- Consolidate one decision into one place and pass the result as a simple value.
- Replace a special case with a smaller rule when the smaller rule covers it.
- Cut a layer with one caller. Cut a feature with no current user.
- Stop when the next abstraction has no second use in sight.

**Stop:** Do not add a flag, interface, or helper for a future you cannot name.

**Distinct from** subtract before you add, which sequences removal ahead of construction in a larger change.

Sources: a-philosophy-of-software-design
