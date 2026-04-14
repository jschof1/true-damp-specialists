#!/usr/bin/env bash
# Set Cloudflare Pages webhook secrets via wrangler CLI.
# Run from project root. Requires: wrangler login (or CLOUDFLARE_API_TOKEN).
# If you have multiple accounts: CLOUDFLARE_ACCOUNT_ID=1d7541992ccacf0931ee0e385daa5e08 ./scripts/set-webhook-secrets.sh

set -euo pipefail
cd "$(dirname "$0")/.."
PROJECT="${1:-total-wraps-and-tints-ltd}"

echo "Setting webhook secrets for project: $PROJECT"
echo ""

echo "https://services.leadconnectorhq.com/hooks/e1Jc4KgwiSkDhvH5fwfH/webhook-trigger/fJBkV60oEidpLQK6gsGP" | wrangler pages secret put FORM_WEBHOOK_URL --project-name="$PROJECT"
echo "https://services.leadconnectorhq.com/hooks/e1Jc4KgwiSkDhvH5fwfH/webhook-trigger/UNBSZRTzZZtN3qIUAEFI" | wrangler pages secret put QUOTE_WEBHOOK_URL --project-name="$PROJECT"
echo "https://services.leadconnectorhq.com/hooks/e1Jc4KgwiSkDhvH5fwfH/webhook-trigger/LNI7myrFYlBONwi8aHyr" | wrangler pages secret put FEEDBACK_WEBHOOK_URL --project-name="$PROJECT"
echo "https://services.leadconnectorhq.com/hooks/e1Jc4KgwiSkDhvH5fwfH/webhook-trigger/vb4OGGaiLPaoBVU6sO26" | wrangler pages secret put DISCOUNT_WEBHOOK_URL --project-name="$PROJECT"

echo ""
echo "Done. All 4 webhook secrets set."
