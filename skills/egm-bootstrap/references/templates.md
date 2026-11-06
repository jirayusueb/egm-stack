<!--
Adapted from the Elephant-Goldfish Model bootstrap templates.
Source: https://github.com/google/elephant-goldfish-model/blob/6a8001ea31ccf72430ba0603a467ec6df9f69dd7/skills/egm-bootstrap/references/templates.md
Commit: 6a8001ea31ccf72430ba0603a467ec6df9f69dd7
License: Apache-2.0
Condensed and rewritten for harness-neutral use. Verify against the source.
-->

# Bootstrap templates

These are the files and shapes that `egm-bootstrap` writes. `${target}` is the contract filename, default `README.md`.

## Sentinel markers

The contract body lives between two markers. Keep the markers and everything outside them unchanged.

```markdown
<!-- egm:contract:start -->
... contract body ...
<!-- egm:contract:end -->
```

An upsert does three things. It replaces the block when the markers exist. It appends the block after the first heading when the markers are absent. It leaves the rest of the file byte for byte. Never move reader prose into the block and never delete a reader section.

## Component package contract

Use this template for a directory that holds source files. The directory is a leaf in the contract tree.

```markdown
# [Component name]

## Overview
[What this component does, in plain language]

## Interface
- [Public class, function, or symbol] [file:symbol]
- Child contract, linked with a relative path such as `./child/README.md`

## Invariants
- [Rule that must stay true] [file:symbol]

## Side Effects
- [Write, call, lock, or external effect] [file:symbol]

## Verification
- Run: [test command from the build manifest]
```

## Repository blueprint contract

Use this template for the root of the documented tree, and for any directory that only groups children.

```markdown
# [Repository or subsystem] Blueprint

## System Overview
[High level map of the parts and how they fit]

## Local Interface & Invariants
[Only when this directory holds source files directly]

## Subdirectories & Boundaries
- Child name, linked with a relative path such as `./child/README.md`, then one line role rolled up from the child contract

## Global Invariants
- [Rule that crosses component boundaries]

## Global Side Effects
- [Shared resource, store, or external dependency]

## System Verification
- Run: [test command from the build manifest]
```

## Intermediate blueprint contract

Use this template for a directory between the root and a package that only groups children.

```markdown
# [Directory name]

## Overview
[What this grouping contains]

## Subdirectories & Boundaries
- Child name, linked with a relative path such as `./child/README.md`, then one line role
```

## Worker brief

Give each worker this brief through `delegate`. Keep every value explicit. `docs/harness.md` maps the spawn to each host.

```text
Goal. Document the partition with contract files.
Scope. path=[root], partition=[partition root], target=[target], mode=worker.
Read. The egm-bootstrap skill, this templates file, and the return schema.
Steps. Run Step 5 of the skill over the partition.
Return. JSON for the worker return schema. No prose.
Never. Edit source. Commit. Write outside the partition. Invent symbols.
```

## Worker return

A worker returns one JSON object with a `subtree_index` array. The root collects the objects and compiles the tree. The schema is at `references/worker-return.schema.json`.

## Link policy

- Link a child contract with a relative path such as `./child/README.md`.
- Link a child skill with a relative path such as `./child/SKILL.md`.
- Link a file outside the package with a repository path or a URL, never with an absolute filesystem path.
- Link only a target that exists. A broken link is a defect. Remove it or fix it before termination.

## Verification command

Read the first manifest found at or above the directory. Use its test command. Do not invent one. A `package.json` gives its test script. A Rust, Go, Python, or Make project gives its own test command. A bazel project gives a test target with a valid pattern. When no manifest exists, write the placeholder `<test command>` and say so in the contract.
