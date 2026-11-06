---
name: no-comments
description: Remove comments and workaround code for /no-comments or when a diff adds narration, banners, or suppression comments. Spawn Comment Sicko read-only, reject scope escapes, fix accepted findings at the root, and report open items.
license: Apache-2.0
---

# No comments

Spawn Comment Sicko read-only. Act on the accepted findings. Defer to its fresh perspective.

## Scope

Use the files or diff that the caller named. Otherwise use the working tree against the base branch, default `main`.

## Steps

1. Spawn Comment Sicko read-only with `../delegate/SKILL.md`. Use the subagent tool that `docs/harness.md` maps for your host. Its persona is at `../agents/comment-sicko.md`. When that file is absent, use the embedded copy at `references/comment-sicko.md`. Pass the scope. Do not restate its rules. When the harness has no subagent tool, run the persona yourself in a fresh pass over the scope.
2. Inspect the report and the diff. Reject edits to application code, scope escapes, deletions of protected exceptions, misstated `MUST KILL` reasons, and flags that treat kept intentional code as guilty. A reshape flag on a surprise in our own code stays actionable. Do not restore those comments.
3. Restore a deleted comment only when it proves an exception. The exception names the exact reason and the exact scope. When a comment claims a rule of something outside our code, a dependency, a platform, a vendor, or a protocol, restore it only when the report shows the claim is true. If the claim is unverifiable, leave the comment deleted and report it open.
4. Audit missed suppressions in scope. A lint or type suppression that protects correctness or safety stays an actionable `MUST KILL`.
5. Fix trivial accepted flags directly. Delete a dead path, drop a parameter, or use the real interface. For a shape change, sketch the accepted set first and stop at the sketch. Implement only after the sketch is clear.
6. Implement the smallest root-cause fix in scope. Remove every workaround that the report names. When the root cause is out of scope, land the smallest in-scope fix and report the rest open. Never add a guard for the symptom.
7. Constraint comments say `do not remove`, `do not change wording`, or `talk to X before changing`. Offer the cheapest in-scope encoding, such as a type, a runtime check, a test, or a CI lint. Wait for approval. If approved, encode the constraint and delete the comment. Otherwise delete the comment, report the constraint open, and sketch the out-of-scope work.
8. Report the deletion count, the restored comments, the `REVIEW` keeps with the rule each claims, any reruns, the fixes, the encoding offers, the encodings applied, and the open items.
