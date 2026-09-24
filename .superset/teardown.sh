#!/usr/bin/env bash
# Workspace deleted: stop this workspace's stack, drop its volumes, release its port.
source "$(dirname "$0")/lib.sh"
if [[ -f "$SPIKE/.env" ]]; then
  (cd "$SPIKE" && docker compose down -v --remove-orphans) || true
fi
if [[ -f "$PORTS_FILE" ]]; then
  awk -v ws="$WS" '$2!=ws' "$PORTS_FILE" > "$PORTS_FILE.tmp" && mv "$PORTS_FILE.tmp" "$PORTS_FILE"
fi
