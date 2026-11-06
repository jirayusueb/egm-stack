# 0002. Four frontmatter keys and disable-model-invocation

- Status: Accepted
- Date: 2026-11-06

## Context

The Agent Skills spec defines two required fields and four optional ones. Hosts
add their own. `disable-model-invocation` is a Claude Code extension, not part of
the spec. Claude's upload path rejects unknown keys with a hard error.

Our skills must not start on their own. `egm-mode` owns a todo list and a gate
sequence, and a model that starts it from a stray match runs a long workflow
without consent.

## Decision

Every skill carries exactly four keys. `name` equals the directory. `description`
is imperative and names the command. `license` is Apache-2.0. And
`disable-model-invocation: true`.

## Consequences

The router and the workflows cannot self-start. That is the behavior we want.
The cost is that Claude Code hides the skill from automatic discovery, so a user
types the command or reads the skill file. Our host doc says so in plain words.

The key is not spec. A host that does not know it ignores it, and a strict
consumer may reject it. We accept that, because a skill that self-starts mid-task
is a worse failure than a skill that needs a typed command. A future host that
rejects the key gets a generated adapter, not a change to the shared text.
