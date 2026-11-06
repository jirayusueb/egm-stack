---
name: principle-test-behavior-not-implementation
description: "Apply when writing, changing, or keeping a test. Assert what the code's users can observe so the test fails on a broken contract and survives a refactor."
license: Apache-2.0
---

# Test Behavior, Not Implementation

A test is a claim about what the code does for its users. Assert what they can observe through the interface they use.

**Why:** A behavior test fails when the contract breaks and keeps passing when only internals change. An implementation test needs a rewrite on every refactor and catches no bug.

**Pattern:**
- Break the behavior. Return a wrong value, skip an effect, or do the effect twice. The test must fail.
- Change the internals and keep every observable result the same. The test must pass.
- Drive the code through the user interface with a concrete input.
- Derive the expected value from the requirement, not from running the code.
- Assert the contract, no less and no more.

**Edge:** An invariant, such as a key that must exist in two tables or a compile-time type check, is behavior.

Sources: working-effectively-with-legacy-code
