# Infrastructure observability

## What this source contains

- Metrics the team instrumented. A metric's presence is evidence that someone thought the number worth watching.
- Monitors and alerts. A threshold the team chose to act on is evidence of a concern.
- Dashboards. Curated views of what the team considers important.
- Traces and spans. Request-level runtime data for slow paths, timeouts, and retries.
- Logs. Event records that often hold the errors that motivated defensive code.
- Incidents. Formal records with timelines and linked postmortems.
- Notebooks. Exploratory investigations with hypotheses and analyses.

## How to search it

Start broad, then narrow. Tool names differ by MCP, so read the schema for the connected one.

1. Identify the owning services. Search services by name or team, then inspect their dependencies.
2. Search dashboards and monitors first. Query the feature name, the service name, and key symbols. When a dashboard or monitor covers the target, note its queries and watched thresholds. The threshold is often the answer to "why is this clamped at N".
3. Search the metrics around the target. Read metadata such as description, units, and tags. Then pull timeseries for the window around the change date.
4. Search logs narrowly. Use symbols, error strings, or feature names. Prefer a time bound. Aggregate rather than dumping raw logs.
5. Read traces and spans. Aggregate spans for failure rates, then inspect individual spans and specific traces for timeouts, retries, and slow paths.
6. Search incidents. When the target looks defensive, search for incidents around the date it was added. An incident whose timeline names the check is near-direct evidence.

## What good evidence looks like

- A monitor whose query and threshold match the constraint the code enforces.
- A dashboard created by the target's author, with widgets that match what the code guards.
- A metric spike immediately before the change merged, and stable values after.
- An incident record that references the target code, the same symbols, or the same error strings.
- Logs that show the error pattern the defensive code would prevent, timestamped before the change.

## Common pitfalls

- Correlation is not causation. A spike before the change and stability after is suggestive. Other changes may share the window. Check neighboring changes.
- Overfitting to one chart. A chart reflects its maker's framing. It shows what someone cared about, not why a specific line exists.
- Vanished telemetry. Metrics can be renamed or deleted, and retention is finite. Missing data from the window is a gap, not a null result.
- Noise at scale. Narrow log searches by service, tag, and time window. Aggregate.
- Instrumented is not caused. Pair a telemetry finding with a change and date citation before claiming causation.

## What to return

For each relevant item.

- Type. Dashboard, monitor, metric, log pattern, trace, incident, or notebook.
- Title or name, and the link or identifier.
- Owner or author, and the created or modified date.
- The exact condition, query, or quote that bears on the question.
- Relevance and strength. Direct, circumstantial, or weak.
