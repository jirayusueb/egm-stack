---
name: tdd
description: Drive a fix with /tdd when the user asks for a failing test or a regression test, or when a cheap local test path exists. Write the failing test, confirm the intended failure, apply the smallest fix, and rerun.
license: Apache-2.0
disable-model-invocation: true
---

# TDD

Use this skill only when the user asks for TDD or a regression test, or when the bug has an obvious cheap local test target. Skip it when the test path is unclear, expensive, integration-heavy, or not requested.

Make the broken behavior executable before you change production code. The goal is one focused regression test that fails before the fix and passes after it.

## Workflow

1. **Understand the bug.** State the intended behavior, the current behavior, the affected path, and the smallest observable reproduction.
2. **Choose the narrowest executable check.** Prefer the closest unit, component, or regression test that already covers the path. Do not create a new harness to satisfy the workflow.
3. **Write the failing test first.** Add the smallest test that would have caught the bug. The test states the intended behavior. It does not copy the current implementation.
4. **Run the test before the fix.** Confirm that it fails for the intended reason. When it passes, or fails for an unrelated reason, correct the test or the reproduction before you edit the implementation.
5. **Fix the bug.** Make the smallest production change that satisfies the intended behavior and keeps nearby contracts.
6. **Rerun the test and the nearby checks.** Confirm that the test passes and that the change did not break the path around it.

## When a test is impractical

Use the closest executable regression check instead. A targeted script, a manual reproduction, a snapshot, a log assertion, or a focused integration check all count.

Prefer no new test over a bad test. A bad test mostly tests mocks, encodes implementation details, depends on timing or global state, needs expensive infrastructure for a small fix, or would be deleted after it proves the fix.

## Guardrails

- Do not change a test to match a wrong implementation.
- Do not weaken an existing assertion unless the expected behavior really changed and the reason is clear.
- Keep the regression test on the bug. Avoid broad fixture churn and unrelated coverage.
- Make a flaky test deterministic where you can. Document the signal that the test locks down.
- When the bug exposes a wider class of failures, land the focused regression first and then consider sibling coverage.

## Report

Report the evidence, not just the outcome.

- Name the failing-before test or check and the failure it produced.
- Name the passing-after run and the nearby validation.
- When you cannot show the failing-before evidence, say why and name the closest regression check you used.
