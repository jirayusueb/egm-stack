# Product analytics warehouse

## What this source contains

- Product analytics events, raw and modeled. Feature invocations, clicks, accepts, rejects, submissions, and client-reported errors.
- Usage and billing events. Work that is cost driven or volume driven.
- Experiment and feature-flag exposure tables.
- System tables for query history, compute, billing, and audit.
- dbt or warehouse models that reveal what depends on a table or field.
- Exploratory notebooks, which are usually not queryable through SQL.

This source is the product and data view. It complements the infrastructure view.

## How to search it

Read the MCP schema first. Orient before querying. Schemas are company specific.

1. Probe table names with a catalog query before trusting them. List tables that match a keyword, then describe the candidate.
2. Time bound every query. Filter on the event timestamp or the query start time with a window around the change date. Typically thirty days before and after. Wider only for a reason.
3. Prefer the modeled, deduplicated table over the raw event table. Drop to raw only when no model exists or when you need the newest events ahead of the refresh lag.
4. Confirm column conventions from the model description. Common shapes are an event timestamp, an event name, typed property columns, and extracted client context.
5. Never write. Use the read-only query path. When a query returns an identifier for a pending result, poll it instead of re-running the query.

## Investigation patterns that pay off

- Usage trajectory. Daily counts around the change date. A step from zero to steady volume within a day or two of the merge is strong circumstantial evidence that the change launched the feature. A decay to zero suggests a deprecation.
- Threshold origin. The distribution of the relevant property in the days before the change. A percentile that matches a constant in the code suggests the number came from data.
- Experiment lookup. Find the exposure table and pull counts by variant for the relevant flag near the change date.
- Migration or performance evidence. Query history filtered by the table or symbol in a tight time window, sorted by duration or bytes read, surfaces the expensive queries that likely motivated a rewrite.
- Lineage. When the target reads or writes a modeled table, the model's own history often holds the rationale. Hand that lead to the source control investigator.

## Common pitfalls

- Instrumented is not caused. An event means someone chose to log it, not that the code exists because of it. Pair with a change citation.
- Silent instrumentation change. A step in volume can be a new event, not a change in user behavior. Check for instrumentation changes in the same window.
- Schema drift. A typed column today may not have existed when the target was written. Older data may carry the value only inside a raw properties field.
- Refresh lag. Modeled tables rebuild on a schedule. For the last few hours, use the raw table and deduplicate.
- Company-specific names. Never report a result from a table you did not confirm exists.
- Retention. When the window predates the table or the model's creation, that is a gap, not a null result.
- Notebooks are not queryable. Name the gap when you suspect the rationale lives there.

## What to return

For each relevant finding.

- Type. Product event, experiment exposure, usage or billing event, system table row, or model.
- Fully qualified table name and the exact query.
- Time window queried.
- A compact numeric summary. Counts, percentiles, and first and last seen timestamps. Do not dump raw rows.
- Temporal correlation with the change date.
- Relevance and strength. Direct, circumstantial, or weak.
