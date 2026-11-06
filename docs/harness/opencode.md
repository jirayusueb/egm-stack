# OpenCode

Unverified here. The EGM adapter tested OpenCode 1.18.29 on 2026-10-24 with a
scripted local model. No live model run was recorded, so this file records the
interface and labels the gaps.

## Tools

| Need | Tool |
| --- | --- |
| Spawn a subagent | `task` in V1. V2 renames the interface to `subagent`. |
| Load a skill | The native `skill` tool |
| Shell and edits | `bash`, `edit`, `write`, plus `read`, `glob`, `grep` |
| Track work | `todowrite` |
| Install a plugin | `opencode.json`, or `npx skills add` |

V1 `task` takes `description` and `prompt`. Omit `task_id` to open a fresh
session. Use foreground tasks. Do not enable background dispatch for a reviewer.

## Subagent fields

An agent is a markdown file in `.opencode/agents/` for a project or
`~/.config/opencode/agents/` for a user. The file name becomes the agent name.
An agent can also be declared in the `agent` map of `opencode.json`.

- `description`. When the parent should delegate.
- `mode`. `primary`, `subagent`, or `all`.
- `model`. A provider and model slug, such as `anthropic/claude-sonnet-5-5`.
- `temperature`, `prompt`.
- `permission`. Keys such as `edit`, `bash`, and `read` take `allow`, `ask`, or
  `deny`. This is the read-only lever for a reviewer.

## Models

The value is a provider and model slug. A child defaults to its parent when the
agent sets no model, marked unverified. `egm-setup` writes only slugs the host
reports. Model names in the docs are examples and change with releases.

## Install

```sh
npx skills add <owner>/egm-stack -a opencode
```

For a pinned local bundle, write an `opencode.json` that declares each agent and
run OpenCode with `OPENCODE_CONFIG=<path>`. OpenCode merges custom, global,
project, and managed configuration. Inspect the effective config before a run,
because a later layer can override a permission.

## Update

Use the skills route, then restart the session.

```sh
npx skills update
npx skills list
```

For a user-scope install, add `-g` to the update command.

## Paths

| Item | Path |
| --- | --- |
| Project skills | `.opencode/skills/<name>/SKILL.md`, `.agents/skills/`, `.claude/skills/` |
| User skills | `~/.config/opencode/skills/`, `~/.agents/skills/`, `~/.claude/skills/` |
| Agents | `.opencode/agents/<name>.md`, `~/.config/opencode/agents/` |
| Config | `opencode.json` |
| Child sessions | Reached with the child session keybind |

Project discovery walks up from the working directory to the git worktree and
loads matching folders on the way.

## Host-only features

- Primary agents are switched with Tab. A subagent can also be invoked with an
  at-mention. Child sessions are separate sessions, not transcript files.
- A slash command can carry a shell marker, and the host evaluates it before the
  tool permission check. Never paste untrusted material into command arguments.
- A reviewer profile should deny every tool except `read` and `glob`. EGM denies
  `grep` as well, because it can bypass per-file read rules.

## Known limits

No transcript path is documented here. For V1, `opencode export <session-id>`
prints a session as JSON, reported by the EGM adapter. A fresh child session
alone does not prove isolation. Read-only tool configuration is not a filesystem
sandbox.

Sources. https://opencode.ai/docs/agents/ ,
https://opencode.ai/docs/skills/ ,
https://github.com/anomalyco/opencode/tree/v1.18.29/packages/web/src/content/docs
