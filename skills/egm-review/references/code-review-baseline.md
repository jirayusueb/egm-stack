# Code review baseline

The Standards axis of the `code` profile. A repository's own documented rules
always override this baseline. The intentional-conventions ledger drops
findings that restate deliberate decisions.

## Severity rubric for code

| Severity | Means |
| --- | --- |
| Blocker | Correctness, security, data loss, a race, or a wrong result the user can reach |
| Major | A missing or wrong requirement, a maintainability hazard the next change pays for, a test gap on changed behavior |
| Nit | Naming, style, and local clarity with no behavioral consequence |

## Diff-scope rule

Findings land on changed lines and the blast radius the change touches. A
defect on an untouched line is in scope only when the change makes it reachable
or worse. Style findings on untouched lines are always out of scope.

## Test coverage check

Tests are part of the diff. Changed behavior without a covering test is a
Major finding. A weakened or deleted assertion needs the reason in the diff.
A test that sleeps or depends on wall-clock time is a finding.

## Security vectors

One pass over the diff for: injection into a shell, query, or template;
authorization on a new route or command; secrets or tokens in code or logs;
unvalidated input crossing a boundary; a new outbound request with no timeout.

## Smell baseline

One line each. A smell is a finding only when the change pays for it, per the
diff-scope rule.

- Long method: a method doing two jobs the caller names separately.
- Large class: two reasons to change.
- Duplicated code: the same logic in two places the diff touches.
- Primitive obsession: a domain concept living as a bare string or number.
- Data clump: the same three parameters traveling together.
- Feature envy: the method more interested in another object's data.
- Message chains: train wrecks of getters.
- Middle man: a class that only forwards.
- Divergent change: one class changed for two different reasons in this diff.
- Shotgun surgery: one change touching many files because a concept is split.
- Speculative generality: an abstraction with one use and no second planned.
- Inappropriate intimacy: two objects digging into each other's privates.

## Suggestion discipline

A suggested fix appears only when committing it resolves the finding
completely. Partial suggestions stay as findings with the reason, so the
author is never left merging half a fix.
