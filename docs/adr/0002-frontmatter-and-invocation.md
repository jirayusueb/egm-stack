# 0002. Three spec keys and no invocation extension

- Status: Accepted
- Date: 2026-11-06

## Context

The Agent Skills spec defines required `name` and `description`, optional
`license`, `compatibility`, `metadata`, and `allowed-tools`. Hosts add their own
fields. `disable-model-invocation` is a Claude Code extension, not part of the
spec.

An early version of this stack set that field on all 47 skills. omp's Agent
Plugins loader rejected each skill with "unexpected frontmatter field" and
skipped it. A portability decision that hides skills from a supported host is a
bug, not a preference.

## Decision

Every skill carries exactly three keys: `name`, `description`, and `license`.
`name` equals the directory. `description` is imperative and names the command.
No extension fields, including `disable-model-invocation`.

Skills are model-invocable. Routing is controlled by descriptions and by
`egm-mode`, which owns the todo list and the gates.

## Consequences

Every host that implements the spec can load the skills. omp, Claude Code,
Codex, Cursor, OpenCode, and the DeepSeek Harness register them without
warning.

A model may start a workflow from a matching description. The mitigation is the
description wording and the router, not a hidden field. A host that needs
stricter control can use its own permission or skill overrides.

If a future spec revision adds an invocation policy, adopt it and record the
change here. Do not reintroduce a vendor field that a strict consumer rejects.
