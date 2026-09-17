# shellcheck shell=bash
# Shared by the selfhosted-*.sh one-command scripts.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
ENV_FILE="${ENV_FILE:-.env.self-hosted}"
[[ -f "$ENV_FILE" ]] || { echo "missing $ENV_FILE — run ./scripts/init-env.sh self-hosted" >&2; exit 1; }
dc() { docker compose -f docker-compose.self-hosted.yml --env-file "$ENV_FILE" "$@"; }

wait_healthy() { # service
  local id status
  for _ in $(seq 1 60); do
    id="$(dc ps -q "$1")"
    status="$(docker inspect -f '{{.State.Health.Status}}' "$id" 2>/dev/null || true)"
    [[ "$status" == "healthy" ]] && return 0
    sleep 2
  done
  echo "$1 did not become healthy" >&2; return 1
}

# Ask the publisher (from inside its own container — it is not published) to rebuild the site.
trigger_rebuild() { # trigger-name
  dc exec -T publisher node -e "
    fetch('http://127.0.0.1:4100/publish', { method: 'POST',
      headers: { authorization: 'Bearer ' + process.env.PUBLISH_SECRET, 'content-type': 'application/json' },
      body: JSON.stringify({ tenant: process.env.SITE_SLUG || 'site', trigger: '$1' }) })
      .then(async (r) => { console.log('rebuild requested:', r.status, await r.text()); process.exit(r.ok ? 0 : 1) })"
}
