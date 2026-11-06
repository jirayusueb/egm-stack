# Recorded results

Live runs live here, one file per suite and commit, named `<suite>-<commit>.md`.
`scripts/run-evals.mjs --summary` reads them.

The header names the commit, host, model, operator, and date. The body is a
table of case, expected, observed, verdict, and evidence.

Never edit a recorded result. A rerun writes a new file.

Descriptions runs use `descriptions-<commit>.md` and are written by
`scripts/describe-eval.mjs`.
