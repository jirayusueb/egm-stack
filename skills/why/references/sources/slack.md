# Real-time team chat

## What this source contains

- Decisions and tradeoffs discussed in channels.
- Incident threads with a timeline.
- PR links posted for review or discussion.
- Error strings and customer reports pasted during debugging.
- Author messages around the merge date of the target change.

## How to search it

1. Check the connected chat MCP and read its tool schema first. Query syntax differs by tool. Authenticate before searching. When authentication fails, stop and report the gap.
2. Search by author and date. Messages from the PR author around the merge date limit the scope and often hit the reason.
3. Search for the PR link or its number. Teams post a PR when it needs review or when it caused a problem.
4. Search for the error string. When the code handles a specific error, the incident thread that names it often appears.
5. Open the thread. A single message read alone often says something different from the thread.

## What good evidence looks like

- A message from the author that states why an approach changed.
- An incident thread that names the target change and its symptom.
- A review request that names the risk the change was meant to address.
- A decision announced after a discussion, with the alternative it replaced.

## Common pitfalls

- Retention limits. Very old messages may be gone. When you cannot find anything before a date, note the retention cliff.
- Unsearchable direct messages. Many decisions happen there. This is a known gap.
- Jokes read as decisions. A casual line is not a decision, even when it precedes the commit. Look for considered discussion.
- Context collapse. A reply without the thread reads differently. Always fetch the thread.
- Failed authentication. Report that the source was not searchable. Do not invent findings.

## What to return

For each relevant thread or message.

- Channel, permalink, author, and timestamp.
- The verbatim quote that bears on the question.
- The thread context that changes its meaning.
- Any linked PR, ticket, or incident.
- Relevance and strength. Direct quote of intent, or circumstantial.
