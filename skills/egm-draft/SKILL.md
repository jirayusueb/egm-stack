---
name: egm-draft
description: "Draft a design document one section at a time, with an approval gate after each section, from a concepts brief or the user's notes. Use for /egm-draft, or when a concept is ready to become a spec with goals, alternatives, risks, and an implementation plan."
license: Apache-2.0
disable-model-invocation: true
---

# Draft

`/egm-draft` writes a design document section by section. The author approves
each section before the next one starts. The output is
`.egm/<slug>/design_draft.md`.

Read `references/design-doc-template.md` before the first section.

## Inputs

Take the first that exists.

1. The file the user names.
2. `.egm/<slug>/concepts_brief.md`.
3. The user's notes, asked for in chat.

If nothing exists, ask for the problem, the users, and the constraints. Do not
invent them.

Derive the slug from the feature name in kebab case. Confirm it once.

## Rules

- One section per turn. Write it, then ask for approval.
- Write to the draft file. Do not paste a whole section in chat.
- Do not code. Pseudocode and schemas are allowed.
- Ask the author to choose when two designs are defensible. Give up to three
  options with trade-offs. Do not pick for them.
- Mechanical choices with one right answer are yours.
- No empty gate. State what changed and link the file before the question.

## Sections

Write these headings, in this order.

1. `## Overview`
2. `## Goals and non-goals`
3. `## Problem`
4. `## Proposed design`
5. `## Alternatives considered`
6. `## Risks and mitigations`
7. `## Detailed Implementation Plan`
8. `## Open questions`

The seventh heading is exact. It is the semantic split contract. The review
engine splits the document there and reviews the parts with different stages.
The synonyms `## Implementation Plan`, `## Work Breakdown`, and
`## Implementation Steps` are recognized, but write the exact heading.

Each section has a job.

- Overview explains the change in a short paragraph.
- Goals and non-goals state what is measured and what is excluded.
- Problem states the failure today and the evidence.
- Proposed design gives the components, data flow, and interfaces.
- Alternatives considered gives each rejected option and the reason.
- Risks and mitigations pair each risk with a response.
- Detailed Implementation Plan lists every file to create, change, or delete,
  with the change and why. Add a verification plan and tests.
- Open questions carries unresolved questions to the next session.

## Approval gate

After each section, write a visible line that names the section and the file.
Then ask one question.

- `Approve and continue`
- `Revise this section`

The question is the sole tool call in the turn. Yield immediately. Never use a
recommended label. When the answer is revise with no detail, ask for the detail
in chat and yield.

On approval, write the next section. On revise, apply the change and repeat the
gate for the same section. Inline comments on the draft count as revision
detail.

## Final pass

After the last section, reconcile the draft against the input.

- Report each contradiction between the brief and the draft, quoting both.
- Report each addition that changes the architecture, an interface, or a
  dependency.
- Ask the author to decide each one. Do not silently change the draft to match
  the brief. Drafting reads code that the brief did not.

If nothing diverges, say so in one line.

Then tell the user the draft path and name the next command, which is
`/egm-review` with the draft path. Mention the optional promotion to
`docs/designs/<slug>.md` after the review settles. Do not promote without
approval.
