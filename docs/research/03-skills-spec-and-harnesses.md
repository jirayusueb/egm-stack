# Agent Skills spec and installers

This document condenses the packaging rules that the repository must satisfy.
It is the evidence behind [../harness.md](../harness.md) and the manifests at the
repository root. Everything here was verified against the sources listed at the
end on 2026-11-06.

## The spec

A skill is a directory with a `SKILL.md` file. Nothing else is required. A
directory may also hold `scripts/`, `references/`, and `assets/`.

The frontmatter has two required keys and four optional ones.

| Key | Required | Rule |
| --- | --- | --- |
| `name` | Yes | 1 to 64 characters, lowercase letters, digits, and hyphens. No leading or trailing hyphen. No double hyphen. Must equal the parent directory name. |
| `description` | Yes | 1 to 1024 characters. Says what the skill does and when to use it. |
| `license` | No | A license name or a bundled license file. |
| `compatibility` | No | Up to 500 characters of environment requirements. |
| `metadata` | No | A map of string keys to string values. |
| `allowed-tools` | No | A space-separated list. The spec calls it experimental. |

Fields that are not in the spec include `icon`, `color`, and
`disable-model-invocation`. They are host extensions. A strict consumer rejects
them, and Claude's upload path does reject them with an unexpected-key error.

## Progressive disclosure

The spec defines three load levels. Metadata, about 100 tokens, loads for every
skill at startup. The whole `SKILL.md` body loads when a skill activates, and
the spec recommends under 5000 tokens and under 500 lines. Files under
`references/`, `scripts/`, and `assets/` load only when the agent asks for them.

References use relative paths and stay one level deep. The spec tells authors to
name the condition for reading a reference, not just the file.

## The skills CLI

`npx skills add <owner>/<repo>` installs skills into a chosen host. It needs
Node 22.20 or newer and it needs no manifest. It finds skills in the repository
root, in `skills/`, in `.agents/skills/`, in `.claude/skills/`, and in about
forty other harness folders. It walks each container up to three levels deep. A
`SKILL.md` at a shallower level shadows anything nested below it.

Optional extras exist. A `skills.sh.json` file at the root adds custom paths. A
`.claude-plugin` manifest is also scanned for declared skill paths.

Install targets differ per host. Claude Code uses `.claude/skills/` and
`~/.claude/skills/`. Cursor, Codex, Pi, OpenCode, Gemini CLI, and Copilot use
`.agents/skills/` in a project, with host-specific global folders.

Two limits matter for us. The installer copies skills only. It installs no
agents, rules, commands, or hooks. And it records a lock file but runs no
auto-update daemon.

## Claude Code plugins

`claude plugin marketplace add <owner>/<repo>` then
`claude plugin install <plugin>@<marketplace>`. The marketplace file is
`.claude-plugin/marketplace.json` and needs `name`, `owner`, and `plugins`. The
manifest is `.claude-plugin/plugin.json`, and `name` is its only required key.

A plugin skill runs as `/plugin-name:skill-name`. Component paths are relative
to the plugin root and must start with `./`. Agents are listed as `.md` files,
not as directories. Auto-update is off by default for a third-party marketplace.

## Codex plugins

`codex plugin marketplace add <owner>/<repo>` then
`codex plugin add <plugin>@<marketplace>`. The catalog is
`.agents/plugins/marketplace.json` in a repo, or the same path under the home
directory for a personal list. Each entry needs `name`, `source`, `policy`, and
`category`.

The portable manifest is `plugin.json` with the Agent Plugins schema. Skills
come from `skills/`. OpenAI-specific data lives under `extensions.com.openai`.
`.codex-plugin/plugin.json` is still accepted as a compatibility fallback, and
an `extensions.com.openai` object replaces that fallback rather than merging with
it. A public directory plugin is skills only, or skills plus MCP.

## Cursor plugins

`.cursor-plugin/plugin.json` needs only `name`. It accepts `logo`, `skills`,
`agents`, `rules`, `commands`, `hooks`, `mcpServers`, and `variables`. Default
folders are `skills/`, `rules/`, `agents/`, and `commands/`. A manifest field
replaces the default folder scan for that component. That is the opposite of
Claude Code, where `skills` adds to the default scan.

Cursor also loads Agent Plugins, so the portable root manifest works there.
Official listing goes through a manual review. A team marketplace imports a repo
and can auto-refresh.

## Agent Plugins 1.0.0

`plugin.json` at the plugin root needs `$schema` and `name`. The schema is
closed. The name rules are 1 to 64 characters of lowercase letters, digits,
hyphens, and periods, starting and ending with an alphanumeric character, with no
double hyphen and no two dots. Components live in fixed locations, `skills/` and
`mcp.json`, and discovery never recurses. An unknown top-level field is reported
and ignored. Any other schema violation rejects the whole plugin.

A reported quirk is worth knowing. One host routes a manifest that declares
`$schema` to a strict validator that rejects `disable-model-invocation`. That
report is unverified elsewhere, and it is why our skills carry the same four keys
everywhere.

## What this forces on us

- One source of truth for skill text, at `skills/`, referenced by every manifest.
- No host tool names in a skill body, because four of five hosts would reject or
  ignore them.
- `agents/` is a host feature, not a package feature. A skills-only install
  cannot rely on it.
- Every manifest identity string matches. A drift test enforces it.

## Sources

- https://agentskills.io/specification
- https://agentskills.io/skill-creation/best-practices
- https://github.com/vercel-labs/skills
- https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md
- https://github.com/vercel-labs/skills/blob/main/docs/agents.md
- https://code.claude.com/docs/en/plugins/manifest-reference
- https://code.claude.com/docs/en/plugins/marketplace-reference
- https://code.claude.com/docs/en/plugins/install
- https://developers.openai.com/plugins/build/plugins
- https://cursor.com/docs/plugins
- https://cursor.com/docs/reference/plugins
- https://agent-plugins.org/plugin-authors/manifest
