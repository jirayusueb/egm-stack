# Error and exception tracking

## What this source contains

- Issues grouped by exception or event.
- First seen and last seen timestamps for each issue.
- Event counts, affected releases, and tag distributions.
- Stack traces, breadcrumbs, and tags.
- Release records with dates and commit ranges.
- Resolution notes and author comments.

## How to search it

1. Orient. Find the organization, project, and environment names the connected MCP exposes. Read the tool schema first.
2. Search issues related to the target. Build queries from the exception class names the target handles, its function or class name, the error message strings it checks for, and its file path.
3. Narrow by release and time. For a suspected issue, read first seen, last seen, affected releases, and the frequency trend. Does the last seen line up with the target's ship date?
4. Pull the full event. Does the stack trace pass through the target code? Do the tags and breadcrumbs match the conditions the code defends against?
5. Check the releases near the target. Cross-reference release versions with the merge date of the change.
6. Treat automatic root cause suggestions as hypotheses. The events and stack traces are the primary evidence.

## What good evidence looks like

- A first seen that precedes the defensive change, and a last seen at the change.
- An error frequency that spikes, then drops, around the ship date.
- A stack trace that passes through the target code and matches the guard condition.
- A resolution note that names the fix.

## Common pitfalls

- Sampling. Event counts may be sampled. Check the sampling rate before quoting a count.
- Release boundaries. A release can include many changes. Check the commit range.
- Error grouping. One issue can bundle several causes. Read the event detail.
- Silent suppression. A guard may hide the error rather than fix it. The events can stop while the condition remains.

## What to return

For each relevant issue.

- Issue ID, title, project, and organization.
- First seen and last seen timestamps.
- Event count and sampling rate, if known.
- Affected releases.
- A representative stack trace or breadcrumb excerpt.
- Temporal correlation with the target's ship date.
- The link to the issue, plus author comments or resolution notes.
