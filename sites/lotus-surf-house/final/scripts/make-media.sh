#!/usr/bin/env bash
# Station 4g stand-in for the CMS, and the recipe for every media file of the final site (calm, "The gate").
# No Payload tenant exists before a sale (station 8), so this writes what the deployer's first seed would
# upload, in the shape scripts/fetch-tenant.mjs would write from Payload, then runs the build's own photo step.
#
#  1. scripts/seed-from-dossier.mjs: the 18 business-owned originals (Booking.com property uploads) copied
#     unchanged from dossier/lotus-surf-house/assets into src/tenant/media/, content.json, src/gaps/gaps.json.
#  2. scripts/photos.mjs: the slot crops (src/lib/slots.mjs, the mockup's crops) → public/photos/*.webp and
#     src/tenant/photos.generated.json. `npm run build` runs this step again before `astro build`.
# No video: the dossier has none usable (all three clips are third-party, licence unknown).
# Needs: tools/link-assets.sh lotus-surf-house (the dossier assets), node deps (npm install in this folder).
# media: sites/lotus-surf-house/final/src/tenant/media/*
# media: sites/lotus-surf-house/final/public/photos/*
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/seed-from-dossier.mjs
node scripts/photos.mjs
ls -l src/tenant/media public/photos | awk '{s+=$5} END {print "total bytes", s}'
