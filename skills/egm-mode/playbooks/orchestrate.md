### Orchestrate

**You own the program. Delegate the work and verify every unit.**

Read first: the `the-pragmatic-programmer` rule pack.

1. Write the done predicate. Name the artifact and the check that proves the program is done.
2. Build the task graph. Each task names its write scope, and no two parallel tasks share a file.
3. Order by dependencies. A task starts only when every task it needs is complete.
4. Write one **delegate** brief per task. Self-contained, with the goal, scope, constraints, success criteria, verification, and report format.
5. Wait for changes, do not poll. Use your team wait tool, or the harness equivalent named in `../../../docs/harness.md`.
6. Integrate and verify each unit before the next one starts. Rerun the check at each integration point.
7. Run a final review with **egm-review** over the integrated diff. The Lead owns the final diff and the test run.

**Reply:** what landed against the done predicate, each task's state, the final review verdict, and every open decision.
