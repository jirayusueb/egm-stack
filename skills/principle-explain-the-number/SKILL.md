---
name: principle-explain-the-number
description: "Apply when you are about to trust, report, or act on a measured number. Find what limits it and rule out that it measured something other than the work."
license: Apache-2.0
---

# Explain the Number

A number you cannot explain is not evidence.

**Why:** A speedup, regression, latency, throughput, or eval result can measure the wrong thing. Without a named limiter you do not know what you measured.

**Pattern:**
- Write the decision before you run. Name the result that would change it and the noise floor.
- Ask why the number is not twice as good. Name the resource or code path that bounds it, from a profile or counters taken during the run.
- List what else the number could measure. Check errors, skipped work, cached work, code that never ran, an untuned side, noise, and a piece too small to matter.
- Keep the run count, the spread, and the limiter next to the number.

**Stop:** Stop when the run-to-run spread is larger than the effect. A number without a spread or a limiter is not evidence.

**Distinct from** prove it works, which checks that an output is real.

Sources: release-it
