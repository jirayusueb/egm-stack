### Small change

**You own the change. Skip the design loop, keep the verification.**

Read first: the `clean-code` rule pack.

Use this only when all three hold. One file changes, or fewer than fifty lines change, and no public API, schema, or behavior contract moves. Otherwise use the feature or refactoring playbook.

1. State the change and the check that proves it in one sentence.
2. Run **how** only when the code is unfamiliar. Skip it when the path is obvious.
3. Make the smallest change that satisfies the check. Run **tdd** first when the change fixes a defect and a cheap test path exists.
4. Verify on the real surface. Run **egm-verify** when a design names the criteria; otherwise run the project checks and exercise the behavior.
5. Run the **opening-a-pr** playbook.

**Reply:** what changed, the check that proves it, the evidence, and anything you deliberately left out.
