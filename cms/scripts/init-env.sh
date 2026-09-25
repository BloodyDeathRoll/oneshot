#!/usr/bin/env bash
# Creates cms/.env with freshly generated secrets. Refuses to overwrite. Run on the CMS server.
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ -f .env ]]; then
  echo ".env already exists — leaving it alone (delete it first to regenerate)." >&2
  exit 0
fi
rand() { node -e "process.stdout.write(require('crypto').randomBytes($1).toString('base64url'))"; }
umask 077
sed \
  -e "s|^POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$(rand 24)|" \
  -e "s|^PAYLOAD_SECRET=.*|PAYLOAD_SECRET=$(rand 48)|" \
  -e "s|^SUPERADMIN_PASSWORD=.*|SUPERADMIN_PASSWORD=$(rand 18)|" \
  -e "s|^BUILDER_API_KEY=.*|BUILDER_API_KEY=$(rand 32)|" \
  -e "s|^PUBLISH_SECRET=.*|PUBLISH_SECRET=$(rand 32)|" \
  -e 's|[[:space:]]*#.*$||' \
  .env.example | grep -v '^$' > .env
echo "wrote $(pwd)/.env (mode 600)"
