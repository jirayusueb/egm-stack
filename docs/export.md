# Export findings

The review reports are files. A reviewer may want them on the pull request.

## Comment on a pull request

```sh
gh pr comment <number> --body-file .egm/<slug>/review/consolidated_review_report.md
gh pr comment <number> --body-file .egm/<slug>/goldfish_review_report.md
```

Post the consolidated report when the reviewer wants one summary. Post the
annotated report when the reviewer wants the per-finding disposition.

## Paste into a review thread

Copy the finding rows. Keep the id, severity, scope, rationale, and outcome.
Drop the local artifact paths, which mean nothing to the reader.

## Rules

- Ask before posting. A review report is an external message.
- Redact secrets, tokens, customer data, and absolute local paths.
- Do not post a report that is still running or has a `not run` reviewer
  without saying so.
- Do not edit the report to make it look cleaner. If a finding was settled,
  the report says how.
- The report is evidence, not a verdict on the author. Keep the tone factual.

## When not to export

A local-only review does not need a comment. The artifact path is enough.
