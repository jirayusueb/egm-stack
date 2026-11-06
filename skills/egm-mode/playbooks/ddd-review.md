### DDD review

**You own the domain verdict. Reviewers read and you score and report.**

Read first: the `implementing-domain-driven-design` and `domain-driven-design-distilled` rule packs.

1. Locate the bounded contexts and the language in use. List each context and the terms it owns.
2. Audit aggregates, repositories, and services. Look for invariants that cross an aggregate boundary.
3. Check cross-context translation. Each boundary needs a translation layer, not a shared model.
4. Score the model with `egm-review --profile ddd`. That command runs **egm-review** against the domain-model standard in `resources/document_standards/`.
5. Report findings. Every Blocker, Major, and Nit names its evidence.
6. Propose next moves. Rank them by cost and by domain impact.

**Reply:** the contexts, the language gaps, the aggregate and translation findings, and the ranked next moves.
