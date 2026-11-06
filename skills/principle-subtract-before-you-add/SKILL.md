---
name: principle-subtract-before-you-add
description: "Apply when sequencing an addition, refactor, or rewrite. Remove dead code and redundant guards first, then build on the simpler base."
license: Apache-2.0
---

# Subtract Before You Add

When evolving a system, remove complexity first, then build. Default to subtraction.

**Why:** Building on a smaller base makes the addition smaller, the diff easier to review, and the new behavior easier to test.

**Pattern:**
- Sequence removal before construction.
- Cut before you polish. Reach the minimum, then invest in quality.
- Design for observed usage, not speculative edge cases.
- No speculative validators, parsers, or guards beyond what the spec demands.
- Delete a reference with no novel content instead of leaving a stub.
- Leave the design simpler and more capable behind the same or smaller surface.

Sources: none
