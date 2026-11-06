# Long-form documents

## What this source contains

- Product requirements and specs.
- Technical specs and requests for comment.
- Architecture decision records.
- Meeting notes from design reviews.
- Team pages with domain context.
- Postmortems from incidents.
- Runbooks that explain defensive code.
- Strategy documents that set priority.

This is where the why often lives in long form before it becomes code. A significant feature usually has a document.

## How to search it

1. Keyword search. Try the feature name, the key symbols from the target code, the author handles, the error strings, and the user-facing terms. Add a time bound when you know when the code shipped.
2. Fetch candidate pages. Read the full content, not the preview. Rationale is often in the middle of a document.
3. Follow backlinks and child pages. Design docs often have sub-pages for alternatives, appendices, or implementation notes.
4. Check related databases. Meeting note and project databases can surface the discussion behind a decision.
5. Search an author's space. Some people keep exploratory notes there before the code lands.

## What good evidence looks like

- A problem statement or motivation section that matches the target's purpose.
- An alternatives considered section that names the rejected option.
- A postmortem that names the target code as the fix for a specific incident.
- Meeting notes that record a decision and tie to the same author and date range as the PR.
- A decision record filled out with status, context, decision, and consequences.

## Common pitfalls

- Outdated documents. A spec is often written before the implementation and not updated. Cross-check against the PR.
- Document and reality drift. A spec may say one thing while the code does another. Flag the divergence. The synthesizer surfaces it.
- Boilerplate templates. A required why section filled with fluff is not evidence.
- Unlinked documents. The most relevant document may link from nowhere. Broad keyword searches help.
- Multiple drafts. Find the finalized or most recently updated version and check its date.
- Access restrictions. When you cannot open a page, record a gap.

## What to return

For each relevant document.

- Title, URL, authors, and last updated date.
- The motivation text as a verbatim quote, with the section or page location.
- Linked pages that bear on the question.
- Whether the document is final or a draft.
