#!/usr/bin/env bash
# Never trace commands that handle protected environment values.
set +x
set -euo pipefail
cd "$(dirname "$0")/.."
exec node scripts/set-webhook-secrets.mjs "$@"
