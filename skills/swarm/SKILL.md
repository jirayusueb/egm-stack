---
name: swarm
description: Fan out parallel workers for /swarm or for coverage, races, and exploration. Declare the shape and the done predicate, drain the workers, and return one consolidated report.
license: Apache-2.0
---

# Swarm

Open a todo list with one entry per phase before you launch anything.

## Frame

1. State the done predicate. The swarm is finished when this condition holds.
2. State the artifact or report that the swarm returns.
3. Choose the shape and declare it. A slice shape divides the work into partitions. A race shape runs all workers on the same brief. A mixed shape does both. For a race or a mixed shape, also declare `first pass`, `rank all`, or `best-of` before you spawn.
4. Read the `swarm workers` role from the model configuration that `egm-setup` writes. If the role is missing, ask the user for the model to use. For a model race, name each arm's model up front.
5. Give each worker its own writable output when it writes. Name exact commits when a worker verifies or measures commits. A measurement brief names the method, the sample count, what one sample is, and the order. The worker records both in its result.
6. Write every brief with `../delegate/SKILL.md`. Every brief stands alone. It names the goal, the scope, the exact slice or race arm, how to verify, and what to report.

## Fan out

Spawn all workers at once with the spawn mode that `docs/harness.md` maps for your host. Run a worker in the parent workspace only when the work needs local state. Otherwise give it its own copy. If a worker drops out, continue with N-1 and note the dropout.

## Aggregate

Read the results. Drop a result that does not record the commits and method its brief names, and respawn that worker once. After a second miss, record a gap. A gap does not count as a pass. For coverage, every declared slice needs a result. For a race, apply the selection rule declared up front. Do not paste raw worker dumps.

## Report

Return one consolidated report in the conversation. Include a result table, one line per issue, the gaps and dropouts, and the race rule when you used one. Each worker report is `PASS`, `ISSUES`, or `BLOCKED` and carries its evidence. A worker that can prove a defect reports `ISSUES` and lists every issue it can prove, not only the first. A report without evidence is a gap.
