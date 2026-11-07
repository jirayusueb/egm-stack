### Bug fix

**You own the fix. Every shipped line traces to runtime evidence.**

Read first: the `working-effectively-with-legacy-code` rule pack.

1. Reproduce the defect on the surface the user reported. Write the exact steps and the observed result.
2. Run **diagnose** end to end. Reproduce, minimise, hypothesise with separating tests, instrument, and bisect when the table runs dry. A flaky test gets the triage loop, never a rerun until green. Confirm the mechanism, not the symptom.
3. Write the failing test first with **tdd** when a cheap local test path exists. The failing test is the repro in history.
4. Fix the root cause. Ship the smallest change the evidence justifies, and revert anything that only "might help".
5. Verify on the same surface. The original repro now passes and the new test stays green.
6. Check the scope. Re-read the diff and revert every change the defect did not require.
7. Run the **opening-a-pr** playbook.

**Reply:** what was broken, the root cause, the fix, and how you verified. Paste the failing-then-passing output.
