# Code archaeology (git and in-repo)

## What this source contains

- Commit history with messages, dates, authors, and diffs.
- PR descriptions, review comments, and discussion threads through the PR host.
- Inline code comments, TODOs, FIXMEs, and deprecation notes.
- Architecture decision records, when the repo keeps them.
- Tests, whose names and assertions often encode the edge cases that motivated a change.
- Files changed in the same commits, as a co-change signal.
- Changelog entries and release notes.
- Ticket IDs in commit messages and PR bodies.

This source is the most trustworthy and the most complete for work that went through the repo.

## How to search it

Expand the seed commit list.

```sh
git log --follow --oneline -- <file>
git log -S '<exact string from the code>' -- <file>
git log -G '<regex>' -- <file>
git blame -L <start>,<end> <file>
git show <hash>
git log <old>..<new> -p -- <file>
git log -1 --format=%B <commit>
```

Look for decisions kept outside the code.

```sh
rg -l -i 'architecture decision' --glob '*.md'
rg -n -C2 '(TODO|FIXME|HACK|XXX|NOTE)' <file>
rg -l '<symbol>' --glob '*test*'
```

Read the PR for every substantive commit. Pull the title, body, author, dates, labels, linked issues, comments, and reviews.

## What good evidence looks like

- A PR description that names the problem and the fix in the author's words.
- A review comment that records a decision, such as "we keep the old path until the migration lands".
- A commit that reverts another commit, which points at a failed assumption.
- A test added with the change that exercises one specific large input.
- An ADR that names the options and the rejected one.

## Common pitfalls

- Squash merges erase intermediate reasoning. The PR is then the record.
- Renames break a plain log. Use the follow flag.
- The author is not the decider. Read reviews and linked tickets.
- A comment can be stale. Check the commit that added it and the code since.

## What to return

For each relevant item.

- Commit hash, date, author, and subject.
- PR number, title, and the motivation quoted from the body.
- Review comments that record a decision.
- Files changed in the same commit, as a co-change signal.
- Ticket IDs that the commit or PR mentions.
- Links that point to another source, under Additional Leads.
