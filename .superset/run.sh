#!/usr/bin/env bash
# Dev stack for this workspace: postgres + cms + publisher, in the foreground (Ctrl-C / restart stops it).
source "$(dirname "$0")/lib.sh"
cd "$SPIKE"
port=$(sed -n 's/^CMS_PORT=//p' .env)
echo "admin: http://localhost:$port/admin  (seed: node --env-file=.env seed/seed.mjs)"
exec docker compose up --build
