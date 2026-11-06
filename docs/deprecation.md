# Deprecation policy

A skill is a public interface. Users type its name and rely on its artifacts.
Deprecation is a scheduled removal, not a silent rename.

## When to deprecate

- The skill no longer has a distinct job, or another skill covers it.
- The harness or the Agent Skills spec makes it unsafe or impossible.
- The maintenance cost exceeds the value, and no owner will take it.

Do not deprecate a skill only to rename it. Rename is a deprecation plus a
replacement.

## Timeline

| Step | When | Artifact |
| --- | --- | --- |
| Announce | Next minor release | `skills/<name>/DEPRECATED.md` and a `CHANGELOG` entry |
| Keep working | Through the announced minor line | The skill loads and behaves as before, unless the reason is unsafe |
| Remove | Next major release | Delete the directory and record it in `CHANGELOG.md` |

Every announcement names a replacement, or states that there is none. A
replacement must exist in the same release that announces the deprecation.

## DEPRECATED.md format

```markdown
# Deprecated

- Replacement: <skill name, or none>
- Since: <version>
- Remove in: <version>
- Reason: <one sentence>
- Migration: <one sentence or a path to a migration note>
```

`scripts/validate.mjs` enforces the four required lines and checks that a named
replacement skill exists. A skill with `DEPRECATED.md` stays in the routing
table until it is removed.

## Communication

- `CHANGELOG.md` at the repository root gets a `Deprecated` entry.
- `docs/skills.md` marks the skill as deprecated.
- The deprecation ships in a minor release, never a patch.
- Users get one minor line to migrate.

## Current state

No skill is deprecated in 0.5.0.
