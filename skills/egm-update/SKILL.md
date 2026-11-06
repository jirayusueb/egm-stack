---
name: egm-update
description: "Check for a newer egm-stack release and update the installed copy on this host. Use for /egm-update, or when installed skills look stale or a new release is mentioned."
license: Apache-2.0
---

# Update

Check the installed route and version, compare with the latest release, and
update only with approval. Nothing here runs before the gate.

## 1. Find the installed route

A host can have one route or both. Report both when both exist. Two copies
shadow each other, so update the plugin first and remove the other.

**Plugin route.** Look for a cache directory named `egm-stack___*`.

- omp: `~/.omp/plugins/cache/plugins/egm-stack___*`
- Claude Code: use `claude plugin list` and read its version.
- Read `.plugin/plugin.json` or `plugin.json` in the cache and take `version`.

**Skills route.** Look for `egm-mode/SKILL.md` in the first directory that
exists.

- Project: `.agents/skills`, `.claude/skills`, `.cursor/skills`
- User: `~/.agents/skills`, `~/.claude/skills`, `~/.cursor/skills`

The skills route has no version file. Treat its version as unknown and report
the commit or install date instead.

If neither route exists, say so and point at the README install section. Do not
install.

## 2. Find the latest release

Use the first source that works.

- `gh release view --repo jirayusueb/egm-stack --json tagName --jq .tagName`
- `https://raw.githubusercontent.com/jirayusueb/egm-stack/main/package.json`
- `git ls-remote --tags https://github.com/jirayusueb/egm-stack`

Strip a leading `v`. If the network fails, report it and stop. Do not guess.

Compare versions semantically. If the latest is not newer than the installed
one, say the install is current and stop.

## 3. Ask before updating

Ask one question with your structured question tool. Make it the sole tool call
in the turn. Yield after it.

- Update now.
- Report only.

Never update without an explicit answer.

## 4. Update the route you found

**Plugin route.**

- omp: `omp plugin upgrade egm-stack@egm-stack`
- Claude Code: `claude plugin update egm-stack@egm-stack`

When the host has no upgrade command, refresh the marketplace checkout and
reinstall.

- omp: pull `~/.omp/plugins/cache/marketplaces/egm-stack`, then
  `omp plugin install egm-stack@egm-stack --force`

**Skills route.** Update in place, or reinstall all skills from the same source.

- `npx skills update`
- `npx skills add jirayusueb/egm-stack -y`

Do not mix routes. Do not update a dirty local clone. Tell the user to commit or
stash first.

## 5. Verify and tell the user

- Re-read the installed version and the skill count.
- Ask the user to restart the host or reload plugins, because the skill catalog
  is built when a session starts.
- Report the route, the old version, the new version, the skill count, and any
  name collision the host reported. Collided names are available under
  `egm-stack/<name>`.
- If the update failed, report the error and the command that failed. Do not
  retry another route without asking.
