# 0007. Statechart vendoring and a portable launcher

- Status: Accepted
- Date: 2026-11-06

## Context

`statechart` is the only skill in the roster that ships executable code. It
checks a TLA+ model with TLC and draws the result as a Mermaid chart. pstack
ships the TypeScript pipeline under MIT, and writing it again would be a week of
work with no user-visible gain.

The upstream launcher is a shell script. Windows has no POSIX shell by default,
and our own validation forbids a shell dependency in a shipped path. The first
run also downloads Java and TLC, so the skill cannot be pure.

## Decision

We vendor the scripts under `skills/statechart/scripts/`, keep the MIT notice,
and record the upstream commit. We replace the shell wrapper with a Node
launcher, because Node is already a repository prerequisite. The skill stays
experimental until its first run is measured on a clean machine.

## Consequences

A user gets a working model checker without a shell. The vendored tree is listed
in `UPSTREAM.md`, and `NOTICE` carries the MIT notice, so attribution survives a
copy of the repository.

The cost is a vendored tree that must be refreshed by hand. The refresh is a
deliberate act with a commit change, not a merge. A future upstream change can
break our launcher, so the skill has its own test command and its own label.

The network call is a real dependency. The skill says so in its first lines, and
`docs/privacy.md` records it.
