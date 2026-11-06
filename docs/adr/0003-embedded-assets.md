# 0003. Embedded assets for skills-only installs

- Status: Accepted
- Date: 2026-11-06

## Context

The `skills` CLI installs skills only. It copies no agents, rules, commands, or
hooks. A reviewer persona at `agents/zoom-out.md` is therefore absent after
`npx skills add`, and any skill that reads it breaks.

A plugin install does ship agents, but only on three of our five hosts. Codex
ships no plugin subagents, and a skills-only install is the lowest common
denominator that we promise.

## Decision

A skill that needs an asset carries it under `skills/<name>/references/`. The
canonical persona and standard files stay in `agents/` and `resources/`, and
`scripts/sync-assets.mjs` generates the embedded copies. Each copy must match its
source byte for byte, and `npm run validate` fails when a copy drifts.

## Consequences

A skills-only install works, and a plugin install works, with no second file
tree to maintain. The cost is duplication on disk and a generated region that a
human must not edit.

Duplicate files invite drift, so the build check is mandatory rather than
advisory. A contributor who edits an embedded copy by hand sees a failing check
with the source path in the message.

The same pattern covers the standards files under `resources/document_standards/`
and the stage table that `egm-ask` reads.
