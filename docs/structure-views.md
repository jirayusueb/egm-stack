# Structure views

Five cheap views over the touched code. Each answers one question without
reading whole files. All are heuristic navigation aids; a conclusion cites
real lines, never the view alone.

| View | Command | Question |
| --- | --- | --- |
| File tree | `node scripts/tree.mjs --base <ref>` | Where do files sit, and is the test counterpart present |
| Symbol outline | `node scripts/outline.mjs --base <ref>` | Which functions, methods, and classes did the diff touch |
| Components + props | `node scripts/outline.mjs --components --base <ref>` | Which components and props changed, and who renders whom |
| Class hierarchy | `node scripts/outline.mjs --classes --base <ref>` | Which overrides and contracts changed |
| API surface | `node scripts/outline.mjs --api --base <ref>` | Which endpoints and fields changed, breaking or not |

## When to run which view

- Code review: always the file tree; the outline when the diff spans more
  than one file or the plan carries decision ids; components for tsx and jsx;
  classes when the diff touches inheritance; api when handlers or a spec move.
- Diagnose: the outline narrows where to minimise. Components trace a UI
  symptom up the render chain. Classes expose overrides that skip super.
- How: the file tree is the skeleton of a subsystem explanation.
- Why: a hierarchy at the deciding commit is evidence of the decision.
- Drift: the inferred api surface against the written spec is the drift check.
- Readiness: the current outline sizes each plan step before coding starts.
- Verify: countable criteria, such as every response carrying a field, are
  answered from the api view.
- Refactoring: the biggest classes, deepest chains, and heaviest props are the
  candidate table, ranked by number.
- Onboarding and QA: one annotated page instead of the whole tree.
