# Review report templates


## Author map

First table after the digest, before any stage detail. Every unsettled
finding, sorted Blocker first, one row each. The author reads this table and
stops.

| Finding | Severity | Section and line | Issue in one line | Next action |
| --- | --- | --- | --- | --- |
| critic-3-2 | Blocker | Proposed design L19, D1 | The key lifecycle is undecided. | Fix: name the mint point and store in D1. |
| style-3-5 | Nit | Alternatives L26 | Guidance cited and never shown. | Decide: link it or drop it. |

Next action is one of `Fix: <what>`, `Decide: <what>`, or `Ignore: <reason>`.
Cite the line at review time and the decision id when the finding attacks a
Decisions row.

## Digest

Top of the consolidated report, before any table. Three lines maximum.

- The three findings to fix first, one line each: id, severity, one-sentence issue. Prefer findings that more than one stage raised.
- If fewer than three Blockers exist, fill the remaining lines with Majors.
- One count line: `X Blocker, Y Major, Z Nit open. R reviewers completed, S not run.`

A reader who stops after the digest still knows what to do next.

Read this before writing the first report. Keep every heading and field.

## Stage report

```markdown
# Stage <n>, <name>

- **Target:** `<path>`
- **Scope:** `<range or header>`
- **Profile:** `<profile>`
- **Round:** `<n>`
- **Reviewers:** `<name> completed`, `<name> not run`

## Findings

### <id>, <Blocker | Major | Nit>

- **Scope:** `<path>#L<start>-L<end>` (<header>)
- **Reviewer:** `<name>`
- **Finding:** <What is wrong.>
- **Evidence:** <Quote or file reference.>
- **Outcome:** <CONTEST | ESCALATE | PROPOSE FIX | DECLINE>

## Paraphrase (stage 2 only)

<The reader's restatement of the design, before any finding.>

## Summary

<Counts by severity. One line per reviewer status.>
```

## Consolidated report

```markdown
# Consolidated review

- **Target:** `<path>`
- **Profile:** `<profile>`
- **Rounds:** `<n>`
- **State:** `<converged | stopped at cap | churned | halted>`

## Reviewers

| Reviewer | Status | Findings |
| --- | --- | --- |
| `<name>` | completed | `<n>` |

## Findings

| Id | Severity | Scope | Outcome | Report |
| --- | --- | --- | --- | --- |
| `<id>` | `<severity>` | `<scope>` | `<outcome>` | `<report>` |

## Open findings

<Unsettled Blocker and Major findings, then the decision the user must make.>

## Traceability

<Each stage finding id mapped to its consolidated id.>
```

## Rules

- Never delete a finding. A settled finding moves to a closed section with its
  outcome. A reopened finding links to the round that reopened it.
- A `not run` reviewer appears in every report.
- Do not copy a reviewer report verbatim. Inline the finding and keep the
  evidence.
- Write dates as YYYY-MM-DD.

## Usage line

The last line of the consolidated report, after the open findings:

`Used: X spawns, Y rounds, Z not run. Cap N.`

Count every reviewer spawn across all rounds, including retries. This is what
the next preset decision is made on.

## Stage report shape

A stage report is three parts only: the findings table, the reviewer status
line, and the verdict. No narrative padding between them. The synthesis reads
tables; padding spends the parent's context twice.