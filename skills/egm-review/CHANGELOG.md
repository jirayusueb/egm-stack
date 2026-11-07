# Changelog

All changes to the `egm-review` skill are recorded here.

## 0.13.0 - 2026-11-07

- Reviewers carry the stress-test mandates, and every run loads the intentional-conventions ledger as context.

## 0.12.0 - 2026-11-07

- Added the settled registry and the specs profile for multi-document consistency.

## 0.10.0 - 2026-11-07

- Added the parent-held isolation marker check for reviews whose verdict gates a release.

## 0.8.0 - 2026-11-07

- Added the stage-dispatch ticker and the usage line with spawn, round, and not-run counts.

## 0.7.0 - 2026-11-07

- Added the `quick` preset for short documents: one reviewer, one round.
- Added resume from existing stage reports, with a one-question gate.
- Added the findings digest at the top of the consolidated report.
- Added the panel warning to the plan preview.
- The `doc` profile now reviews against `doc-standard`.

## 0.6.1 - 2026-11-06

- Tightened the no-subagent stop message after a live case returned an empty user-facing reply.

## 0.6.0 - 2026-11-06

- Added the plan preview with stages, reviewers, spawns, and the round cap.

## 0.5.0 - 2026-11-06

- Initial per-skill changelog.
- Added the untrusted-content guardrail.
