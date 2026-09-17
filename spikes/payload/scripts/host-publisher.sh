#!/usr/bin/env bash
# Run the publisher ON THE HOST instead of in compose, so wrangler can use the host's existing
# `wrangler login` OAuth session (no API token in any container). The CMS hook is re-pointed at
# the host through Docker's host-gateway.
#   ./scripts/host-publisher.sh            dry-run (default)
#   ./scripts/host-publisher.sh live       REAL `wrangler deploy` on every save
# Needs `npm ci` in site/ and publisher/. Ctrl-C stops it; `docker compose up -d` restores the
# in-compose publisher.
set -euo pipefail
cd "$(dirname "$0")/.."
mode="${1:-dry-run}"

docker compose stop publisher
PUBLISHER_URL="http://host.docker.internal:${PUBLISHER_PORT:-4100}/publish" docker compose up -d --no-deps cms
# the address containers reach the host on (docker bridge gateway) — not a LAN-facing interface
gateway="$(docker compose exec -T cms getent hosts host.docker.internal | awk '{print $1; exit}')"
echo "publisher will listen on ${gateway}:${PUBLISHER_PORT:-4100} (mode: ${mode})"

cd publisher
DEPLOY_MODE="$mode" DEPLOY_ADAPTER=cloudflare PUBLISHER_HOST="$gateway" \
  exec node --env-file=../.env src/server.mjs
