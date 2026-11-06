# Stage 2 comprehension

Target: /tmp/egm-live/review/design.md
Reviewers: egm-comprehension (completed)
Run: 1

## What this proposes

Retry the payment call up to three times with exponential backoff of 100, 200,
and 400 ms. The goals are no duplicate charge and p95 checkout latency under two
seconds. Refunds and partial captures are out of scope. The plan adds a retry
wrapper, an idempotency key, and tests.

## How the existing system works, per this document

The document does not describe the current system. It states only that checkout
makes a payment call and that the provider accepts an idempotency key. It does
not say whether retries exist today, whether a key is sent, or what happens on a
provider failure.

## Findings

| Id | Severity | Scope | Finding | Outcome |
| --- | --- | --- | --- | --- |
| comp-2-1 | Blocker | Proposed design | The only mechanism for the top goal is explicitly unspecified. | PROPOSE FIX |
| comp-2-2 | Major | Overview, Plan | Present tense retries conflict with the plan to add a retry wrapper. | PROPOSE FIX |
| comp-2-3 | Major | Proposed design, Alternatives | The retryable error class is never defined. | PROPOSE FIX |
| comp-2-4 | Major | Goals, Proposed design | No per-attempt timeout, budget, baseline, or p95 definition. | PROPOSE FIX |
| comp-2-5 | Major | Risks | Retry storm is named and not mitigated. | PROPOSE FIX |
| comp-2-6 | Major | Whole document | No existing-system section. | PROPOSE FIX |
| comp-2-7 | Major | Detailed Implementation Plan | No mechanism, location, interface, or acceptance criteria. | PROPOSE FIX |
| comp-2-8 | Nit | Alternatives | Provider guidance is cited and never shown. | PROPOSE FIX |

Reviewer status: egm-comprehension completed.

Verdict: OPEN. 1 Blocker, 6 Major.
