#!/usr/bin/env bash
# New workspace: copy env files from the main checkout, reserve a free CMS port, install host-side deps.
source "$(dirname "$0")/lib.sh"

# 1. Env files (git-ignored) from the main checkout; generate fresh secrets if the root has none.
for f in .env .env.self-hosted; do
  if [[ -f "$ROOT/spikes/payload/$f" && ! -f "$SPIKE/$f" ]]; then
    install -m 600 "$ROOT/spikes/payload/$f" "$SPIKE/$f"
    echo "copied spikes/payload/$f"
  fi
done
[[ -f "$SPIKE/.env" ]] || "$SPIKE/scripts/init-env.sh"

# 2. Reserve a CMS port: 3100 stays with the main checkout; take the first port >=3101 that is
#    neither reserved by another workspace nor listening.
mkdir -p "$(dirname "$PORTS_FILE")"; touch "$PORTS_FILE"
port=$(awk -v ws="$WS" '$2==ws {print $1}' "$PORTS_FILE")
if [[ -z "$port" ]]; then
  port=3101
  while awk -v p="$port" '$1==p {f=1} END {exit !f}' "$PORTS_FILE" || ss -Htln "sport = :$port" | grep -q .; do
    port=$((port + 1))
  done
  echo "$port $WS" >> "$PORTS_FILE"
fi

# 3. Point this workspace's .env at its own port and compose project.
set_env() { if grep -q "^$1=" "$SPIKE/.env"; then sed -i "s|^$1=.*|$1=$2|" "$SPIKE/.env"; else echo "$1=$2" >> "$SPIKE/.env"; fi; }
set_env CMS_PORT "$port"
set_env SERVER_URL "http://localhost:$port"
set_env COMPOSE_PROJECT_NAME "$COMPOSE_NAME"
echo "CMS port $port, compose project $COMPOSE_NAME"

# 4. Host-side deps (seed/tests/publisher CLI). The CMS itself builds inside Docker.
for d in site publisher; do (cd "$SPIKE/$d" && npm ci --no-audit --no-fund); done
