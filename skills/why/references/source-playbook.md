# Source playbooks

The `why` skill spawns one investigator per available evidence category. Each investigator reads one source playbook below. The playbook is a concrete example for a common MCP. Adapt it for a different MCP in the same category.

| Category | Playbook | Example source it documents |
| --- | --- | --- |
| Source control history | `sources/code-archaeology.md` | git and the PR host |
| Issue and ticket tracker | `sources/linear.md` | Linear, adaptable to Jira, GitHub Issues, Plane, Shortcut |
| Long-form documents | `sources/notion.md` | Notion, adaptable to Confluence, Google Docs, Coda |
| Real-time team chat | `sources/slack.md` | Slack, adaptable to Discord, Microsoft Teams, Mattermost |
| Infrastructure observability | `sources/datadog.md` | Datadog, adaptable to New Relic, Honeycomb, Grafana, Splunk |
| Error and exception tracking | `sources/sentry.md` | Sentry, adaptable to Rollbar, Bugsnag, Airbrake |
| Product analytics warehouse | `sources/databricks.md` | Databricks SQL, adaptable to Snowflake, BigQuery, ClickHouse, dbt |

## Cross-cutting playbook

- `sources/incident-postmortem.md`. Add it when the target code looks defensive. Null checks, retry, timeout, rate limit, feature flag, egress guard, and OOM handler are defensive.

## Adapting for another MCP

Keep the category, the investigation loop, and the output shape. Replace the tool names, the query syntax, and the example objects with the ones the connected MCP exposes. When the MCP has a schema or help resource, read it first. When authentication fails, stop and report the gap. Do not guess at data.
