# 0008. Book rule adoption

- Status: Accepted
- Date: 2026-11-06

## Context

Fourteen engineering books carry rules that a review can cite. `ciembor/agent-rules-books`
publishes condensed packs for them under MIT. Fourteen separate skills would add
fourteen rows to a skill list for knowledge that is loaded on demand and used
rarely.

Full packs are also large. A full pack for one book can cost more context than
the task it serves.

## Decision

One `rules` skill reads any of fourteen reference files on demand. We adopt the
`mini` packs only. Each file keeps a header with the source URL, the upstream
commit, the MIT notice, and a line that says it is condensed and must be checked
against the book. Each file stays under eighty lines. `references/index.md` is
generated. No `full` or `nano` pack is vendored.

## Consequences

A user gets one skill entry and fourteen small files. Context cost stays bounded,
because a task loads one pack at most.

The cost is that our packs are a summary of a summary. A rule that matters for a
hard decision may be missing a nuance from the book, and the header says so.
`UPSTREAM.md` pins the commit for each file, so a reader can see what changed.

Fourteen packs are also fourteen chances to drift. The generated index and the
attribution check in `npm run validate` make a missing header or a stale index a
build failure.
