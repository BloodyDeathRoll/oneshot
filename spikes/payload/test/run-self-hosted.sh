#!/usr/bin/env bash
# From clean: wipe this spike's self-hosted stack, regenerate secrets, build, start, import the
# tenant exported from the multi-tenant stack (exports/wobbly-pelican — falls back to the seed
# fixture when no export exists), run the end-to-end suite, record the footprint.
#   ./test/run-self-hosted.sh [--down]
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p test/output
dc() { docker compose -f docker-compose.self-hosted.yml --env-file .env.self-hosted "$@"; }

[[ -f .env.self-hosted ]] && dc down -v --remove-orphans 2>/dev/null || true
rm -f .env.self-hosted
./scripts/init-env.sh self-hosted
dc build
t0=$(date +%s)
dc up -d --wait
echo "stack healthy after $(( $(date +%s) - t0 )) s"

source_dir=exports/wobbly-pelican
if [[ ! -d "$source_dir" ]]; then
  echo "no export found — copying the seed fixture to $source_dir instead"
  mkdir -p exports && cp -r seed/fixtures/wobbly-pelican "$source_dir"
fi
set -a; . ./.env.self-hosted; set +a
IMPORT_PASSWORD="$OWNER_PASSWORD" node scripts/import-tenant.mjs "$source_dir" --cms "$SERVER_URL" --email "$OWNER_EMAIL"

status=0
node --env-file=.env.self-hosted test/e2e-self-hosted.mjs | tee test/output/e2e-self-hosted.log || status=$?
./scripts/footprint.sh docker-compose.self-hosted.yml .env.self-hosted | tee test/output/footprint-self-hosted.txt

if [[ "${1:-}" == "--down" ]]; then dc down -v; fi
exit $status
