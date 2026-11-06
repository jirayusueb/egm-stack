# Implementation Readiness Standard

A plan passes when an engineer who does not know the codebase can execute it and produce the intended change on the first attempt, without guessing, asking, or making a design choice.

## The zero-decision rule

Leave zero design or architectural choices to the implementer. A plan that says "choose a schema", "define the API path", "pick a dependency", or "decide error handling" fails. Pre-determine each choice and write it down.

## Phasing and checkpoints

Partition the work into incremental phases. Each phase ends in a stable, buildable, testable state. State the check for each phase and the point where the change can roll back. A phase that cannot be checked is not a phase.

## Target scope and file boundary

List exact repository-relative paths to create, modify, or delete. Mark each path as Create, Modify, or Delete. Use a directory glob only for generated output whose file names cannot be known in advance. The list is the write boundary. Adjacent refactors and opportunistic dependency additions are out of scope.

## Required sections

- **Scope.** The behavior that changes and the boundary that stays.
- **File plan.** Exact paths, each marked Create, Modify, or Delete.
- **Steps.** The logic change, data change, and interface change for each file.
- **Test plan.** Named cases for the happy path and each edge.
- **Rollout.** Migration order, compatibility window, and rollback.
- **Verification.** The checks that prove each phase.
- **Open questions.** None is the expected answer.
