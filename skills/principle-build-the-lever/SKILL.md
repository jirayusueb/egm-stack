---
name: principle-build-the-lever
description: "Apply when work is non-trivial. Build the tool that does it or proves it, so a reviewer can read and rerun the work instead of trusting it."
license: Apache-2.0
---

# Build the Lever

When the work is not trivial, build the tool that does it instead of doing it by hand.

**Why:** A codemod, generator, or script does the work the same way every time and reruns for free. It is one artifact a reviewer can read and rerun. Hand-done work can only be verified by redoing it.

**Pattern:**
- Do the first unit by hand to learn the recipe, then build the tool.
- Prove the tool by rerunning it on that unit and diffing against the hand-done version.
- Make the tool safe to rerun.
- Choose a codemod for edits, a generator for repetitive files, and a rerunnable check for verification.
- When work goes to several workers, write the recipe, the verification, and the do-not-touch boundaries as one shared artifact outside their write scope.

**Stop:** Skip the tool only when the task is trivial, a couple of edits visible at a glance.

Sources: none
