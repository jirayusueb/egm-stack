### Feature

**You own the design and the delivery. Build with evidence.**

Read first: the `a-philosophy-of-software-design` and `clean-architecture` rule packs.

1. Run **how** over the affected subsystem. Learn the current shape before you propose a new one.
2. Run the **ddd-model** playbook when the change moves domain semantics, terms, or boundaries.
3. Run **egm-brainstorm** to stress-test the concept. Output is `concepts_brief.md`.
4. Run **egm-draft** to write `design_draft.md`, one section at a time.
5. Run **egm-review** on the draft with the `spec` profile. Fresh context only.
6. Run **egm-resolve** to triage findings and apply the approved fixes.
7. After the human approves the design, delegate implementation with **delegate** and your subagent tool per `../../../docs/harness.md`. Name the data shape before any code, and keep one owner per artifact.
8. Implement with **tdd** where a cheap test path exists. Otherwise build the smallest change the evidence supports.
9. Verify on the real surface. Run the project's checks and exercise the change. A type check alone is not a pass.
10. Run the **opening-a-pr** playbook.

**Reply:** what you built, the design choice and why, the review verdict, the verification evidence, and open decisions. Link the design doc and the pull request you opened.
