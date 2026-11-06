# Issue and ticket tracker

## What this source contains

- Issues that describe features, bugs, and their motivation.
- Project documents attached to issues, often product requirements or specs.
- Parent and sub-issue relationships, from a broad initiative to a tactical ticket.
- Comments that record clarifications, scope changes, and the reason for the work.
- Labels that signal the kind of motivation, such as compliance, customer request, performance, or incident follow-up.
- Status updates that explain a scope change.
- Attachments and linked PRs.

This is where the product and business forcing function usually lives.

## How to search it

1. Start with linked tickets. When the seed commits or PRs reference ticket IDs, fetch those first. Read the full issue, including comments.
2. List related issues by keyword. Search for the feature name, the key symbol, and the business term. Try several phrasings.
3. Walk the issue tree. When you land on a sub-issue, fetch its parent. Sub-issues are tactical. Parents often carry the why.
4. Read project documents. When the issue belongs to a project, check its attached docs. Project-level documents are where rationale is most often captured.
5. Check labels and milestones. Labels hint at the category of motivation. Milestones tie the work to deadlines, which can reveal the forcing function.

## What good evidence looks like

- An issue that states the business problem in specific terms.
- A comment that records a decision and its rejected alternative.
- A parent issue titled like an initiative, such as enterprise readiness or a payment failure reduction.
- An attached product requirement or spec.
- Labels that name a customer, an incident follow-up, a compliance program, or a performance regression.

## Common pitfalls

- Scope drift. The ticket the PR references may have changed scope after it was closed. Read the whole history.
- Mechanical templates. A required "why" field filled with generic text is not a real answer.
- Stale tickets. An old ticket may describe a plan that changed. Check dates against the ship date.
- Duplicate chains. Follow the duplicate-of links back to the canonical ticket.
- Private workspace content. When you cannot open an issue, record a gap instead of guessing.

## What to return

For each relevant ticket.

- Ticket ID and title.
- The problem or motivation, quoted from the description or comments.
- Labels, parent issue, project, and milestone.
- Author, created date, and closed date.
- The link to the ticket.
