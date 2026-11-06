# 06 Harnesses

The stack is harness-neutral. A skill describes the action. The harness map
turns the action into the tool call your host offers.

## Support

| Harness | Route | Status |
| --- | --- | --- |
| Claude Code | plugin or skills | Verified install path |
| Codex | plugin or skills | Documented, unverified |
| Cursor | skills or plugin manifest | Documented, unverified |
| OpenCode | skills | Documented, unverified |
| Agent Teams | skills | Documented, unverified |

An unverified label is honest, not a warning. The skills are the same
everywhere. Only the install choreography differs.

## The harness map

`docs/harness.md` documents five things per host.

1. Tools. The subagent tool, the question tool, and the todo tool.
2. Subagent fields. Which fields exist, and which the host rejects.
3. Models. How to name a model, and how to set the reasoning effort.
4. Install. The exact command and the paths that receive files.
5. Host-only features. What does not exist, and what to do instead.

Read the map once per session when the host is not Claude Code.

## The common mappings

These four cover most of the drift.

| Action | Claude Code | Codex | Cursor | OpenCode |
| --- | --- | --- | --- | --- |
| Spawn a subagent | Agent tool | subagent spawn | subagent tool | task tool |
| Ask a structured question | AskUserQuestion | plain text plus options | question tool | question tool |
| Open a todo list | TodoWrite when present | task list | todo tool | todo tool |
| Read and follow a skill | read the `SKILL.md` path | read the `SKILL.md` path | read the `SKILL.md` path | read the `SKILL.md` path |

The last row is the important one. A skill is a file. Every host can read it.
The installer only decides where it lands.

## Skill locations

| Host | Project scope | User scope |
| --- | --- | --- |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Codex | `.agents/skills/` | `~/.agents/skills/` |
| Cursor | `.cursor/skills/` | `~/.cursor/skills/` |
| OpenCode | `.agents/skills/` | `~/.agents/skills/` |

## Model names

Model names differ per host. A slug may encode the reasoning effort, for
example a trailing level or a fast flag. A host that has no slug for a role uses
its own effort option, or runs on the session model.

`egm-setup` writes the rule in the path the host reads, and only writes slugs
the host reports as available. If a slug stops resolving, rerun setup. Do not
guess a name.

## Host-only features

Each host has something the others lack. The general rule for a step that needs
a missing feature is the same everywhere.

1. Skip the step.
2. Put one line in the reply, `Skipped in <host>: <step>. <reason>.`
3. Continue with the next step. Do not stop, ask, or retry.

When a later step needs what the skipped step made, leave a placeholder and
name it in the skip line.

## Fresh context

The review engine needs isolated subagents. If the host has no subagent tool,
the review stops at the gate. It never reviews the draft in the author's
context. That is a hard rule, not a preference.

## Coexistence

Install one stack per scope. Prefer project scope for a team repository. A
first-wins collision at user scope is host-defined and should be treated as
unverified until you check it on that host.

## Next

[07-authoring.md](07-authoring.md) covers changing a skill safely.
