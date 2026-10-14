# Protected webhook setup

This replaces the unsafe copied bootstrap script tracked in #9. It changes no runtime form code and must not be run against production without an approved change.

## Validate

Use Node 22 and an existing trusted Wrangler installation. Load all four role-specific webhook values through the approved protected environment, not command arguments, source files or terminal history. The script deliberately does not source `.dev.vars` as shell code.

Run `bash scripts/set-webhook-secrets.sh true-damp-specialists --check`. The required `CLOUDFLARE_ACCOUNT_ID` must match the project's existing account. The command validates all four values using the runtime form-health validator and performs no network requests or writes. A missing or duplicate binding, unapproved target, other-client scope, malformed URL or placeholder fails closed. Same client scope does not prove correct workflow roles: verify each role separately in GHL.

## Approved application only

After verifying the four exact workflow roles, current bindings, production target and a recovery plan privately, explicitly approve the change. `--apply` additionally requires `TRUE_DAMP_WEBHOOK_CHANGE_APPROVED=yes` and the protected `CLOUDFLARE_API_TOKEN`. It first performs a read-only Cloudflare project lookup and requires the expected production domain before invoking Wrangler. Webhooks pass via stdin, not command arguments, and provider output is suppressed to avoid leaking them.

Each write is separate. A timeout or failure stops processing and reports how many earlier writes were acknowledged. The failing write may have reached the provider. Inspect state privately and restore or complete the change through the approved process; do not assume atomic rollback or blindly repeat the script. No automatic rollback occurs.

Provider acknowledgment is not deployment or owner-notification proof. After an approved release, verify production form health, exact workflow routing and an approved controlled enquiry reaching the owner. Never trigger review/customer campaigns during tests.

## Tests

`node --test scripts/set-webhook-secrets.test.mjs`

All endpoints in the tests use synthetic trigger identifiers; network and Wrangler calls are mocked. Do not substitute real webhooks in tests.

Historical exposed values still require a separate activity/rotation review. Removing them from current source does not revoke prior values or erase Git history. Deployment connection repair remains tracked separately in #8.
