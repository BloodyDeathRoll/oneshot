#!/usr/bin/env bash
# Rebuild + deploy tenants now, without waiting for a save (same code path as the CMS hook).
#   ./scripts/publish.sh <tenant-slug> [<tenant-slug> …]      prints one JSON record per tenant
source "$(dirname "$0")/common.sh"
[[ $# -gt 0 ]] || { echo "usage: publish.sh <tenant-slug> …" >&2; exit 2; }
dc exec -T publisher node publisher/src/cli.mjs "$@"
