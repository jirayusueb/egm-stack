---
name: principle-redesign-from-first-principles
description: "Apply when integrating a new requirement into an existing design. Redesign as if the requirement was foundational, then deliver in verifiable increments."
license: Apache-2.0
---

# Redesign From First Principles

Do not bolt the change onto the existing design. Redesign as if the new requirement had been a foundational assumption from the start.

**Why:** An integrated design keeps one coherent shape. A bolted-on change accumulates local compromises that later work must preserve.

**Pattern:**
- Read every affected file and state the current design in one paragraph.
- Ask what you would build from scratch with this requirement in place.
- Propagate the change through types, documentation, examples, and rationale.
- Think through the whole redesign, then deliver it in verifiable increments.

**Stop:** Do not use this as permission for an unbounded rewrite. The new requirement sets the scope.

Sources: none
