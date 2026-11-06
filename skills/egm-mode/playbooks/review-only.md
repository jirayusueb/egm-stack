### Review-only

**You own the review. Reviewers read and you write the report.**

Read first: the `clean-code` and `code-complete` rule packs.

1. Name the target and the profile. A design doc takes `spec`, a concept takes `concept`, code takes `code`, a domain change takes `ddd`, and comments take `comments`.
2. Run **egm-review** with that profile. Fresh context is mandatory. If your harness has no subagent tool, stop and say the review cannot run.
3. Wait for every stage report before the next stage starts. A reviewer that did not run makes the round unclean.
4. Present the findings to the human. The human selects what to act on. Do not apply fixes in a review-only task.
5. Write `goldfish_review_report.md` yourself and give the verdict with the next moves.

**Reply:** the verdict, the unsettled Blocker and Major findings, and the human selection.
