# Report format

Three statuses. Pick one. The first line is the status word alone.

## PASS
The acceptance criteria hold. Give the evidence, the changes, what remains, and the artifact links.
```
PASS
Evidence: <command output, test count, file paths>
Changed: <paths, one line each>
Remains: none
Artifacts: <paths or links>
```

## ISSUES
The work is usable but not done. List each issue with severity, location, and evidence. Say what remains.
```
ISSUES
- <Blocker|Major|Nit> <location> <what is wrong> <evidence>
Remains: <the next action>
Artifacts: <paths>
```

## BLOCKED
The child could not proceed. Name the blocker, what it tried, and the decision the parent must make.
```
BLOCKED
Why: <the concrete condition>
Tried: <what was attempted>
Need: <the input or decision>
Artifacts: <paths, or none>
```

Rules. No artifact, no PASS. A summary is not evidence, so quote the check or point to the file. Keep it short, the parent checks the artifact.

## Reply cap

A child's reply is at most 40 lines. When the result is longer, write the full
result to an artifact under the slug and return the path plus a 10-line digest.
The parent reads the artifact when it needs the detail. A reply that dumps a
file into chat has already failed the cap.

## Result digest

When a batch finishes, append one digest block to the ledger:

`Spawned X, returned Y, failed Z, not run N.` Then one line per child with its
verdict. The digest is what the parent's summary quotes; the lines above are
the evidence.