# 02 First design

One idea, four steps, one reviewed spec. This chapter follows a single design
from a sentence to a converged report.

## Start with the outcome

```text
/egm-mode add a retry policy to the payments client. it must not double-charge.
```

The router reads the request and picks the workflow. For a design change that
workflow is the design loop. The router opens one todo list and owns it for the
whole run. Every later skill writes into that list, and none of them starts a
second one.

Three things happen before any drafting.

1. The router restates your goal in its own words. Correct it if it is wrong.
2. It names the smallest change that would meet the goal.
3. It names the data shape the change will touch.

If the evidence rules out the change you asked for, the router shows that and
stops. That is a successful run, not a failed one.

## Step 1. Stress-test the concept

```text
/egm-brainstorm
```

Brainstorm writes `concepts_brief.md`. The brief holds four things.

- What must be true for this to work.
- The real constraints, with the source for each.
- The alternatives considered and why each lost.
- Open questions the draft must settle.

This step is cheap. A wrong concept caught here costs a paragraph. A wrong
concept caught in review costs a rewrite.

If a question is a behavior or timing question, build a throwaway prototype
instead of debating it.

```text
/egm-mode prototype the two retry curves so we can pick.
```

The prototype playbook builds the sketch and reports the evidence. The answer
comes from the run, not from an opinion.

## Step 2. Draft the spec

```text
/egm-draft
```

Draft writes `design_draft.md`, section by section. Each section answers one
question and marks what is assumed. The draft never hides a guess. An
assumption is labeled as one.

Draft order matters.

1. The problem.
2. The data shape and the domain terms.
3. The behavior.
4. The failure modes.
5. The acceptance check.

A draft that starts with code has already skipped the decision. Stop it and go
back to the shape.

## Step 3. Review it

```text
/egm-review
```

Review sends fresh-context reviewers at the draft. Chapter
[03-review-and-resolve.md](03-review-and-resolve.md) covers the engine. The
short version is that the reviewers do not share your history. They read the
draft and the standard, and that is all.

## Step 4. Resolve the findings

```text
/egm-resolve
```

Resolve triages each finding. You approve the fixes. The loop ends when two
consecutive rounds are clean, or at the cap of five rounds.

The output is `consolidated_review_report.md`. It carries two lines that every
downstream skill reads, `Status:` and `**Target:**`.

## What good looks like

- The brief names a constraint you did not write, with its source.
- The draft has no unlabeled assumption.
- Every reviewer finding has a severity and a location.
- Resolve applied the approved fixes and nothing else.
- The report status is clean, or the open findings are named with owners.

## Next

[03-review-and-resolve.md](03-review-and-resolve.md) opens the review engine.
