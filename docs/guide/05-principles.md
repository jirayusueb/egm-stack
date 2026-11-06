# 05 Principles

Twenty-four rules. Each one is a skill, so a name is enough to steer an agent
mid-task.

## Steer by name

```text
/egm-mode stop. apply foundational thinking before you write any retry logic.
```

The router reads the principle leaf and cites the principle that changed its
decision. Two rules keep this honest.

- Name the principle that shaped a decision, and the choice it changed.
- Cite only a principle whose leaf was read in this session.

Every principle names its `Sources:` line. A source is a rule pack or `none`.
Vendored rules carry attribution, and the principle stays one rule, not a
summary.

## Core

| Principle | Rule |
| --- | --- |
| Laziness protocol | Bias to deletion and the smallest change that solves the problem |
| Foundational thinking | Get the data structures right so downstream code becomes obvious |
| Redesign from first principles | Redesign as if the new requirement had been foundational from day one |
| Attack the premise | Two failed fixes on one premise mean the premise is the suspect |
| Subtract before you add | Remove dead weight first, then build on the simpler base |
| Minimize reader load | Count layers to trace and state to hold, then cut both |
| Outcome-oriented execution | Converge on the target architecture, do not preserve throwaway states |
| Experience first | Choose user delight over implementation convenience |
| Exhaust the design space | Build competing prototypes before you commit |
| Build the lever | Build the tool that does or proves the work, then rerun it |

## Architecture

| Principle | Rule |
| --- | --- |
| Model the domain | Encode the domain in a structure instead of scattered conditionals |
| Boundary discipline | Guard at system boundaries, trust internal types, keep logic pure |
| Type system discipline | Make illegal states unrepresentable and parse external data at the edge |
| Make operations idempotent | Converge to the same end state under retries and crashes |
| Migrate callers then delete legacy APIs | Migrate and delete in one wave, no compatibility shims |
| Separate before serializing shared state | Eliminate the shared write target before adding a lock |

## Verification

| Principle | Rule |
| --- | --- |
| Prove it works | Check the real artifact, not a proxy or a self-report |
| Fix root causes | Fix the first place the system went wrong |
| Sequence verifiable units | Each unit ends in a check before the next begins |
| Test behavior not implementation | Assert what a user of the code can observe |
| Explain the number | Name the limiter and rule out what else the number measures |

## Delegation

| Principle | Rule |
| --- | --- |
| Guard the context window | Route bulk to subagents and keep summaries in the main thread |
| Never block on the human | Proceed on reversible work and let the human course-correct |

## Meta

| Principle | Rule |
| --- | --- |
| Encode lessons in structure | Turn a repeated instruction into a lint, flag, check, or script |

## Where the leaves live

Each rule is `skills/principle-<title>/SKILL.md`, thirty lines maximum. The
router carries a generated index of all twenty-four. The index gives the
trigger. The leaf gives the rule.

## Next

[06-harnesses.md](06-harnesses.md) maps actions to your host.
