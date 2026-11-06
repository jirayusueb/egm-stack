# Cursor

Verified against the official Cursor docs on 2026-11-06. A live review run was
not executed here, so isolation stays unverified.

## Tools

| Need | Tool |
| --- | --- |
| Spawn a subagent | `Task` tool. Several Task calls in one message run in parallel. |
| Built-in helpers | `Explore` for search, `Browser` for browser control |
| Ask one question | The agent question UI. A headless run has none, so ask in plain text. |
| Run a shell command | The terminal tool, under the run mode policy |
| Install a plugin | Customize, or a team marketplace |

## Subagent fields

A subagent is a markdown file in `.cursor/agents/` for project scope or
`~/.cursor/agents/` for user scope. Four documented fields.

- `name`. Lowercase kebab-case. It is the agent identifier.
- `description`. When to delegate. The parent reads it.
- `model`. `inherit` by default, or a specific model ID.
- `readonly`. `true` removes file edits and state-changing shell commands.
- `is_background`. `true` runs the child without blocking the parent.

Cursor's plugin format also documents `agents` as a path or array of paths in
`.cursor-plugin/plugin.json`. A manifest field replaces the default folder scan
for that component.

## Models

`model` is `inherit` or an explicit model ID. An explicit ID that the host does
not list is unverified, so prefer `inherit` for reviewers in the shared text.
`egm-setup` writes only detected IDs.

## Install

```sh
npx skills add <owner>/egm-stack -a cursor     # skills only
```

Install a plugin from a team marketplace in Customize, and pick project or user
scope. Test a local plugin by copying the folder into `~/.cursor/plugins/local/`
and reloading the window. Cursor reads both the Agent Plugins manifest and the
Cursor Plugins manifest, and the install flow is the same for both.

## Update

Refresh the marketplace in the `/plugin` UI, then install the newer version. A
team marketplace imports the repository and auto-refreshes within about ten
minutes. Cursor has no portable CLI update command in this release.

## Paths

| Item | Path |
| --- | --- |
| Project skills | `.agents/skills/<name>/SKILL.md` and `.cursor/skills/<name>/SKILL.md` |
| User skills | `~/.agents/skills/<name>/SKILL.md` and `~/.cursor/skills/<name>/SKILL.md` |
| Project and user agents | `.cursor/agents/`, `~/.cursor/agents/` |
| Cursor manifest | `.cursor-plugin/plugin.json` |
| Multi-plugin catalog | `.cursor-plugin/marketplace.json` |
| Portable manifest | `plugin.json` at the plugin root |
| Local test plugins | `~/.cursor/plugins/local/<name>/` |

A skill runs as `/skill-name` in chat. A plugin agent appears with its plugin
scope, marked unverified here. Cursor also loads `.claude/skills/`,
`.codex/skills/`, and their home-directory copies for compatibility.

## Host-only features

- Rules are `.mdc` files under `rules/`, with `description`, `alwaysApply`, and
  `globs`. They are always on or agent decided, unlike a skill.
- Automations, Bugbot, cloud agents, variables, and hooks exist here and not on
  every host. A skill names the capability, never the product feature.
- Cursor does not expand `${PLUGIN_ROOT}` in `mcp.json`. Use `${CURSOR_PLUGIN_ROOT}`.
- Auto refresh for an imported marketplace re-indexes at most once every ten
  minutes. A running agent keeps the version it started with.

A missing feature gets the skip line from [harness.md](../harness.md).

Sources. https://cursor.com/docs/subagents ,
https://cursor.com/docs/plugins ,
https://cursor.com/docs/reference/plugins ,
https://cursor.com/docs/skills
