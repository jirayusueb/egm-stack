# Stage 3 design critic

Target: /tmp/egm-live/review/design.md
Reviewers: egm-design (completed), egm-structural (not run), egm-style (not run)
Run: 1

| Id | Severity | Scope | Finding | Outcome |
| --- | --- | --- | --- | --- |
| critic-3-1 | Blocker | Whole document | No problem statement or evidence that the failures are transient. | PROPOSE FIX |
| critic-3-2 | Blocker | Proposed design, Risks | Idempotency key lifecycle is undefined. | PROPOSE FIX |
| critic-3-3 | Blocker | Risks | Risks named with no mitigation and no accepted rationale. | PROPOSE FIX |
| critic-3-4 | Major | Goals, Proposed design | No per-attempt timeout or total retry budget. | PROPOSE FIX |
| critic-3-5 | Major | Proposed design, Risks | No jitter, breaker, or retry budget; retry storm untreated. | PROPOSE FIX |
| critic-3-6 | Major | Overview, Proposed design | No retry ownership boundary; stacked retries multiply attempts. | PROPOSE FIX |
| critic-3-7 | Major | Overview, Proposed design | Attempt accounting is ambiguous. | PROPOSE FIX |
| critic-3-8 | Major | Whole document | No cost, quota, or capacity estimate. | PROPOSE FIX |
| critic-3-9 | Major | Alternatives | Alternatives rule not met; rejections unsupported and options missing. | PROPOSE FIX |
| critic-3-10 | Major | Goals | No success signals, metrics, or observation window. | PROPOSE FIX |
| critic-3-11 | Major | Non-goals, Risks | No reconciliation for a duplicate charge; refunds excluded. | PROPOSE FIX |
| critic-3-12 | Nit | Plan | Plan is three unordered verbs with no highest-risk test. | PROPOSE FIX |
| critic-3-13 | Nit | Plan | No kill switch or rollback. | PROPOSE FIX |
| critic-3-14 | Nit | Proposed design | No security treatment for key provenance or scoping. | PROPOSE FIX |

Reviewer status: egm-design completed, egm-structural not run, egm-style not run.

Verdict: OPEN. 3 Blocker, 8 Major.
