# Design document template

Use this shape. Delete a guidance line when you write the section. Keep the
heading text and the order.

```markdown
# <Feature name>

- **Author:** <name>
- **Status:** Draft
- **Date:** <YYYY-MM-DD>

## Overview

At most five sentences. What changes, for whom, and why now. A reader who
stops here still knows the shape of the change.

## Decisions

One row per decision, each with a stable id. Reviewers cite the id; findings
cite the id.

| Id | Decision | Options considered | Choice | Reason |
| --- | --- | --- | --- | --- |
| D1 | <what is being decided> | <the real alternatives> | <the choice> | <the concrete reason> |

## Goals and non-goals

**Goals**

- <A measurable outcome.>

**Non-goals**

- <Something this design excludes on purpose.>

## Problem

One paragraph. The failure today. Include evidence, a reproduction, or a
quote. State who feels it.

## Proposed design

The components and how they fit. Name the interfaces, the data that crosses
them, and the ownership. One mermaid diagram of the structure or the data
flow, and only one; needing two means the design splits in two. Each
subsection stays under ten lines. Split a longer one.

## Alternatives considered

### <Alternative>

- **What it does:** <mechanism>
- **Why it lost:** <trade-off>

## Risks and mitigations

| Risk | Severity | Mitigation |
| --- | --- | --- |
| <risk> | Blocker, Major, or Nit | <response> |

## Detailed Implementation Plan

### Files

- `<path>` (create, change, or delete). <What changes and why.>

### Order

1. <A step that leaves the tree working.>

### Verification

- <Command or check.>
- <Test that proves the behavior.>

### Rollout and rollback

- <Flag, migration, or revert path. Omit only when neither applies.>

## Open questions

- <Question. Name the owner or the trigger that resolves it.>
```

## Section notes

- **Overview** is for a reader who stops after one paragraph.
- **Goals and non-goals** use measurable words. Avoid "better".
- **Problem** carries evidence. A claim without evidence is an opinion.
- **Proposed design** names the seam. Keep implementation detail out.
- **Alternatives** include the do-nothing option when it is real.
- **Risks** pair every risk with an owner or a mitigation.
- **Detailed Implementation Plan** lists every file. A reader should be able to
  implement it without making a decision that changes behavior.
- **Open questions** can be empty. Write "None." then.
