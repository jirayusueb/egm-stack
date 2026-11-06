# 0004. Artifact directory and promotion

- Status: Accepted
- Date: 2026-11-06

## Context

Drafts, per-stage reports, and review summaries are working material. A permanent
design document is a decision record. Mixing the two fills a repository with
half-finished drafts that look authoritative, and it puts generated text where a
reviewer expects a source of truth.

Every host also offers a different scratch location, and some of them are
session-scoped. A session scratchpad dies with the session, and the user's
deliverable must outlive it.

## Decision

Working artifacts live under `.egm/<slug>/` in the user's workspace. A project
can name another folder with a line in its instruction files, `EGM artifact
directory: <path>`. A relative path resolves against the working directory. An
approved spec is promoted to `docs/designs/<slug>.md` by the parent, as a
deliberate act.

## Consequences

Artifacts are reviewable, diffable, and survive the session. The user controls
where they land, and a path that escapes the working directory needs a
confirmation when it came from an instruction file.

The cost is repository noise unless the folder is ignored. Our docs tell the user
to add `.egm/` to `.gitignore` when they do not want to commit it. A team that
does want these files tracks them, and that is also fine.

Promotion stays manual. An agent never promotes its own draft.
