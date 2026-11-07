# Durable teams

Use a durable team when work spans turns or needs more than one writer. A durable teammate keeps its identity and inbox between turns. The Lead owns the plan, the final diff, and every check.

## When to use a team

- Two or more writers with disjoint scopes.
- Work that must survive a long build, a review round, or a human gate.
- A dependency chain where one task needs another task's artifact.
- A child that must be steered while it runs.

## Shared tasks

- Create one task per unit of work. Put the acceptance criteria in the description.
- Record write scopes on the task. Scopes are advisory, not a lock.
- Put dependencies in `blocked_by`. A task is ready when every blocker is complete.
- Claim a task with its current revision. A stale revision fails the claim.
- Complete a task only when the acceptance criteria hold and the artifact exists.
- Re-list after a wakeup. The board is the truth, not memory.

## Ownership

- One writer per file. Split by path, not by intent.
- The Lead reviews the final diff and runs the full verification.
- A teammate never approves its own work. A reviewer is read-only.
- A teammate never reassigns a task owned by another member.

## Wait, do not poll

- Wait for a change, a status, or a message. The wait returns on the next event.
- Polling burns tokens and hides a stuck child. When a wait times out, re-list and inspect before waiting again.
- A teammate with no turn running did not necessarily finish its task.
- A wait that returns no progress means no other member can produce a change. Re-list before concluding.

## Steering and interruption

- Send a message to steer at the next step boundary. Make the message self-contained.
- Interrupt a teammate only to stop wasted work. Its pending inbox survives.
- Do not repeat a message. Batch the steering into one send.
- Tell the teammate what changed and what to do next, not what to feel about it.

## File safety

- The file guard protects editor writes. A shell command, formatter, or code generator bypasses it.
- Coordinate any run that writes many files. Name the files in the task and tell the other writers to stay out.
- On a stale-version failure, read the current file, rebase the change, and retry. Do not force a write.
- Never let two teammates run a formatter or generator over the same tree at once.

## Closing a team

- Collect every teammate before the final answer.
- Stop teammates that no longer matter.
- Report dropouts with the work they owed.
- Retire the tasks. Leave no ready task unowned.

## Wait discipline

After a wait times out, re-list the members once before deciding. A member
still running waits again. A second timeout on the same member is treated as
hung: mark its task `not run`, report the gap, and move on. Never poll in a
loop and never assume a timeout means failure without the re-list.

## Subagent or teammate

| Situation | Use |
| --- | --- |
| One bounded task, result in one reply | a subagent |
| Work the parent will steer mid-flight | a teammate |
| State that must survive the turn, like a dev server | a teammate |
| A fan-out of three or more identical briefs | subagents, in waves |
| A program of tasks with dependencies | teammates plus the shared board |

When both would work, use the subagent. It is cheaper to collect.