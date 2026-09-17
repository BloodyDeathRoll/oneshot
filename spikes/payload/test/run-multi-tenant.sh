#!/usr/bin/env bash
# From clean: wipe this spike's multi-tenant stack (containers + volumes), regenerate secrets,
# build, start, seed two tenants, run the end-to-end suite, record the footprint.
#   ./test/run-multi-tenant.sh            leaves the stack running
#   ./test/run-multi-tenant.sh --down     stops it and removes its volumes afterwards
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p test/output

docker compose down -v --remove-orphans 2>/dev/null || true
rm -f .env seed/credentials.json
./scripts/init-env.sh
docker compose build
t0=$(date +%s)
docker compose up -d --wait
echo "stack healthy after $(( $(date +%s) - t0 )) s"
node --env-file=.env seed/seed.mjs

status=0
node --env-file=.env test/e2e-multi-tenant.mjs | tee test/output/e2e-multi-tenant.log || status=$?
./scripts/footprint.sh docker-compose.yml .env | tee test/output/footprint-multi-tenant.txt

if [[ "${1:-}" == "--down" ]]; then docker compose down -v; fi
exit $status
