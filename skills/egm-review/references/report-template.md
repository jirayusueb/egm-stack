# Review report templates


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
