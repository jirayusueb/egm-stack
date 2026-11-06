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
