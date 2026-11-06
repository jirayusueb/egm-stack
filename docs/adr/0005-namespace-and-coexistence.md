# 0005. Namespace and coexistence

- Status: Accepted
- Date: 2026-11-06

## Context

Skill names are a flat namespace inside a host. A skill called `mode`, `review`,
or `tdd` collides with a host built-in, with another plugin, or with a user's own
skill. The Agent Skills spec also requires a skill name to equal its directory
name, so a namespace must show up in the folder name itself.

Three hosts add their own prefix. Claude Code makes a plugin skill
`plugin:skill`. Codex and Cursor keep the bare name. A name that is already
prefixed can end up doubled.

## Decision

Every core skill starts with `egm-`, except the extended skills that read as
verbs and are unique enough on their own. The plugin and marketplace name is
`egm-stack`. Directory names equal frontmatter names, always. We never name a
skill after a host built-in.

## Consequences

A user can see which skill is ours in a list of forty. A host prefix on top of
ours reads as `egm-stack:egm-mode`, which is ugly and unambiguous. We accept the
ugly form, because the alternative is two names for one skill.

Bare names still resolve where no other command owns them, and we do not promise
that. Our host doc says the prefixed form is the reliable one.

The check is cheap. `npm run validate` fails when a directory name and its
frontmatter name disagree, and it fails on a duplicate name across the roster.
