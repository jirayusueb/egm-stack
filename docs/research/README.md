# Research dossier

These documents record what we studied before writing the stack. They are not
specifications. The design spec at [../designs/egm-stack.md](../designs/egm-stack.md)
is the contract.

## Method

Each document answers one question. Each ends with a Sources section. A source
is a real URL that we read. A claim that we could not check against a primary
source carries the label unverified.

We read two reference repositories in a scratch clone. We did not copy their
text. Where we adopted an idea, the file name and the reason are in the
document. Where we rejected an idea, the reason is here too.

## Labels

- **Verified** means the project's own documentation, or a recorded run, states
  it.
- **Reported** means one upstream project states it and we did not reproduce it.
- **Unverified** means an inference, or a single secondary source.

## The documents

| Document | Question |
| --- | --- |
| [01-egm-anatomy.md](01-egm-anatomy.md) | What does the Elephant-Goldfish Model do, and what did not port? |
| [02-pstack-anatomy.md](02-pstack-anatomy.md) | What does pstack do with modes, playbooks, and principles? |
| [03-skills-spec-and-harnesses.md](03-skills-spec-and-harnesses.md) | What does the Agent Skills spec require, and how does each installer work? |
| [04-asd-ste100.md](04-asd-ste100.md) | What is ASD-STE100, and how do we support it without copying it? |
| [05-ddd-and-book-rules.md](05-ddd-and-book-rules.md) | Which book rules did we adopt, and in what shape? |
| [06-subagent-delegation.md](06-subagent-delegation.md) | What makes a fresh context, a good brief, and a safe team? |

`05-ddd-and-book-rules.md` is owned by the knowledge workstream. The other five
are owned by the harness workstream.

## How to use this

Read 03 before you touch a manifest or an install path. Read 06 before you touch
`delegate` or a review profile. Read 01 and 02 before you change the roster.
Read 04 before you change `ste100`.

When you add a document, add a row here and a row in
[../designs/README.md](../designs/README.md). Keep the summary to one sentence.

## Limits

We did not run a live model review on Codex, Cursor, or OpenCode. Harness claims
that need a live run stay unverified in [../harness.md](../harness.md). We did
not read the full text of any book we cite. We read public summaries and the
upstream rule packs.

## Sources

- Agent Skills specification, https://agentskills.io/specification
- skills CLI, https://github.com/vercel-labs/skills
- Elephant-Goldfish Model, https://github.com/google/elephant-goldfish-model
- pstack, https://github.com/backnotprop/pstack
- ASD-STE100, https://www.asd-ste100.org/
