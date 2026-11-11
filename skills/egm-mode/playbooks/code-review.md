### Code review

**You own the verdict on the diff. Find hard findings, mark smells optional, and change nothing.**

Read first: the `clean-code`, `oop-design`, and `code-complete` rule packs.

1. Pin the fixed point. Confirm the ref resolves and the diff `git diff <point>...HEAD` is non-empty before anything else. A bad ref fails here, not inside a reviewer.
2. Find the spec source in order: issue refs in the commit messages, a path the user named, a spec under `docs/`, then ask. With none, record `no spec available` and continue.
3. Run **egm-review** with the `code` profile. The two axes run in parallel fresh reviewers: Standards against the repository's own rules and the smell baseline, Spec against the source from step 2. The intentional-conventions ledger drops findings that restate deliberate decisions.
4. Split the findings. A standards violation, a wrong or missing requirement, or a real bug is hard. Everything else is a judgement-call smell, reported as optional.
5. Present the author map: hard findings sorted Blocker first, each with section, line, and a next action of Fix, Decide, or Ignore. The human selects.
6. On request only, hand the hard findings to the implement loop from the **feature** playbook: the author fixes, a report-only reviewer re-attacks the new head, rounds repeat until clean. Do not start the loop unasked.

**Reply:** the fixed point and diff size, the spec source used, the hard findings with the next action, the optional smells in one line each, and the verdict. Link the report artifact.
