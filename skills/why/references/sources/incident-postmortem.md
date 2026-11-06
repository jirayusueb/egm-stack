# Incident and postmortem context

Add this playbook when the target looks defensive. Null checks, retries, timeouts, rate limits, feature flags, egress guards, and OOM handlers qualify.

- Issue tracker. Look for tickets labeled incident, severity, postmortem action item, or reliability.
- Team chat. Search the incident and severity channels around the dates when the target code was added.
- Source control. Commits with messages like "fix for incident", "add defensive check", and "revert" followed later by "re-apply" are strong signals.
- Observability. Find incidents whose timeline overlaps the change date, and note the symptom.
- Long-form documents. Read the postmortem and its action items. A named action item that matches the target is near-direct evidence.
