#!/usr/bin/env bash
# Rebuild + deploy tenants now, without waiting for a save. Goes through the running publisher's
# queue (the same one the CMS hook uses), so it never builds a tenant at the same time as a hook build.
#   ./scripts/publish.sh <tenant-slug> [<tenant-slug> …]      prints one JSON record per tenant
source "$(dirname "$0")/common.sh"
[[ $# -gt 0 ]] || { echo "usage: publish.sh <tenant-slug> …" >&2; exit 2; }
rc=0
for tenant in "$@"; do
  dc exec -T -e TENANT="$tenant" publisher node -e "
    fetch('http://127.0.0.1:4100/publish', { method: 'POST',
      headers: { authorization: 'Bearer ' + process.env.PUBLISH_SECRET, 'content-type': 'application/json' },
      body: JSON.stringify({ tenant: process.env.TENANT, trigger: 'operator', wait: true }) })
      .then(async (r) => { const rec = await r.json(); console.log(JSON.stringify({ event: 'publish', ...rec })); process.exit(r.ok && rec.ok ? 0 : 1) })
      .catch((e) => { console.error(e.message); process.exit(1) })" || rc=1
done
exit $rc
