# shellcheck shell=bash
# Shared by the cms/scripts/*.sh one-command scripts. Run on the CMS server, from anywhere.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
[[ -f .env ]] || { echo "missing cms/.env — run ./scripts/init-env.sh" >&2; exit 1; }
dc() { docker compose --env-file .env "$@"; }
envval() { grep -E "^$1=" .env | head -1 | cut -d= -f2-; }

wait_healthy() { # service
  local id status
  for _ in $(seq 1 90); do
    id="$(dc ps -q "$1")"
    status="$(docker inspect -f '{{.State.Health.Status}}' "$id" 2>/dev/null || true)"
    [[ "$status" == "healthy" ]] && return 0
    sleep 2
  done
  echo "$1 did not become healthy" >&2; return 1
}
