# 13 Update

Move an installed stack to a newer release without mixing routes.

## Which route am I on

A host has one route, or it has two and they fight. Check before updating.

- Plugin route. omp keeps a cache under `~/.omp/plugins/cache/plugins/`.
  Claude Code tracks plugins itself, so `claude plugin list` is the source.
- Skills route. Look for `egm-mode/SKILL.md` under `.agents/skills`,
  `.claude/skills`, or `.cursor/skills`, project scope first, then user scope.
- Both routes. Update the plugin first, then remove the skills copy. Two copies
  of the same name shadow each other.

`/egm-update` does this detection for you and asks before it changes anything.

## Update with omp

```sh
omp plugin upgrade egm-stack@egm-stack
```

If the upgrade command is missing or the version does not move, refresh the
marketplace checkout and reinstall.

```sh
git -C ~/.omp/plugins/cache/marketplaces/egm-stack pull --ff-only
omp plugin install egm-stack@egm-stack --force
```

Restart omp, or run `/reload-plugins`, so the skill catalog is rebuilt.

## Update with Claude Code

```sh
claude plugin update egm-stack@egm-stack
```

Restart the session. Claude Code leaves auto-update off for third-party
marketplaces, so this command is the reliable path.

## Update on the skills route

```sh
npx skills update
```

To reinstall everything from the source, run the add command again and answer
the prompts. Do not run both routes for the same host.

## What a good update looks like

- The installed version moves forward, or the command says it is current.
- The skill count is unchanged or explained.
- The host reports no name collision, or the collision is listed with the
  `egm-stack/<name>` alternative.
- A restart or reload makes the new skills visible.

## When it fails

- Network failure. Report it and stop. Do not retry another route silently.
- Dirty local clone. Commit or stash before updating.
- Version does not move. The marketplace checkout is stale. Pull it, then force
  the install.
- Skills still missing. Confirm the route the host reads. A plugin install does
  not write project skills, and a skills install does not register a plugin.
