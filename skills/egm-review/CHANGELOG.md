# Changelog

All changes to the `egm-review` skill are recorded here.

## 0.26.1 - 2026-11-11

- Added five views to the outline registry: import graph, state machine, data model, event flow, and test map. The structure-views doc gains the use cases for state, domain, and event-driven work, and names the registry as the extension point.

## 0.26.0 - 2026-11-11

- Added the structure views: scripts/outline.mjs renders the symbol outline, component tree with props, class hierarchy, and inferred api surface, all diff-marked and bounded to touched files. docs/structure-views.md maps every view to its use cases, and the code profile brief carries the outline next to the diff.

## 0.25.0 - 2026-11-11

- Added the annotated tree to every code review brief: `scripts/tree.mjs --base <point>` marks changed files, and the baseline gains tree reading with four structural checks before the diff is read.

## 0.24.1 - 2026-11-11

- Added the project-standards-first protocol: discovery order for the repository's own documents, agent instructions, machine-enforced rules, and neighborhood conventions. The project's linter output outranks the smell baseline, and a standard that endorses a smell suppresses it.

## 0.24.0 - 2026-11-11

- Added the code review baseline: the code severity rubric, the diff-scope rule, the test coverage check, the security vectors, the twelve-smell list, and the suggestion discipline. The code profile Standards axis loads it.

## 0.21.0 - 2026-11-08

- Added the parent-resident and child-resident rows to the plan preview, and the stage report cap: table, status, verdict, no narrative padding.

## 0.20.0 - 2026-11-07

- Added the two-axis code profile: Standards and Spec as parallel fresh reviewers, with fixed-point pinning, the spec-source discovery order, and the repo-rules-override rule.

## 0.19.0 - 2026-11-07

- Added the author map: severity-sorted findings with section, line, decision id, and a Fix, Decide, or Ignore next action.

## 0.15.0 - 2026-11-07

- Added the fast preset with parallel stages 1 and 2, the adaptive early-exit check after each stage, and the diff-scoped re-audit that reviews only changed ranges.

## 0.14.0 - 2026-11-07

- Added the stage-gate options with the pause-and-edit choice, the one-reaudit cap per stage, and the target link protocol with symlink and URL handling.

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
