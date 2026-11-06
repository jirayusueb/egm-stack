---
name: principle-prove-it-works
description: "Apply when completing a task and before declaring it done. Check the real artifact, not a proxy, a self-report, or a successful compile."
license: Apache-2.0
disable-model-invocation: true
---

# Prove It Works

Verify every output by checking the real thing. Do not infer from a proxy, a self-report, or a successful compile.

**Why:** Unverified work has unknown correctness. Indirect checks feel cheaper than direct observation, and a wrong inference costs far more than the check.

**Pattern:**
- Run the feature, read the actual value, inspect the diff.
- Check liveness directly, not through derived state.
- When verification fails, suspect the observation method before the system.
- Script the check when you can. Keep its output as an artifact a reviewer can rerun.

**Stop:** Do not report a task as done on the strength of "it compiles" or a file's timestamp.

**Distinct from** explain the number, which checks that a measurement means what it claims.

Sources: none
