### Drift maintenance

**You own the gap between the spec and the code. Close it on the correct side.**

Read first: the `working-effectively-with-legacy-code` rule pack.

1. Run **egm-drift** over the spec and the code it claims to describe. Output is `drift_report.md`.
2. Triage each drift item. Decide whether the spec or the code is right, and record the reason.
3. Fix the wrong side. Patch the spec, or change the code. Do not do both for one item.
4. Verify the fix. Re-run **egm-drift** and confirm the item is gone.
5. Record the outcome in the drift report. When the spec changed, update `docs/designs/<slug>.md` and note the promotion.

**Reply:** the drift items, the side you changed for each, the evidence, and any item left open with a reason.
