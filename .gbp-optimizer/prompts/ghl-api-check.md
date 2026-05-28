# Prompt: GHL API Check

Use the `gohighlevel-api` skill.

Goal: determine whether this client repo can safely use authenticated GoHighLevel operations for GBP/social/review workflows.

Steps:

1. Check whether `HIGHLEVEL_TOKEN` and `HIGHLEVEL_LOCATION_ID` are present.
2. Run the GHL API connection test if available.
3. Pull location details as evidence.
4. Identify whether social planner, media, contacts, conversations, and workflows are available from scopes/actions.
5. Write findings to `.gbp-optimizer/logs/`.
6. Add tasks for missing credentials/scopes, but do not perform write actions without approval.
