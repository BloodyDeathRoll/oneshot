#!/usr/bin/env bash
# Station 4g stand-in for the CMS, and the recipe for every media file of the final site (unique, "Round the clock").
# No Payload tenant exists before a sale (station 8), so this writes what the deployer's first seed would upload,
# in the shape scripts/fetch-tenant.mjs would write from Payload, then runs the build's own photo step.
#
#  1. scripts/seed-from-dossier.mjs: the business-owned originals (Booking.com / Airbnb property uploads) copied
#     unchanged from dossier/coconut-surf-inn-guest-house-and-restaurant/assets into src/tenant/media/ (photos[] and
#     rooms[].photo) and src/gaps/media/ (the room slides the schema has no field for), content.json, gaps.json.
#  2. scripts/photos.mjs: the slot crops (src/lib/slots.mjs, the mockup's crops, the hero graded as calm's) →
#     public/photos/*.webp and src/tenant/photos.generated.json. `npm run build` runs this step again.
# No video: the dossier has none usable (vid-001 third-party, vid-002 the pre-renovation building, vid-003 another
# business's film).
# Needs: tools/link-assets.sh coconut-surf-inn-guest-house-and-restaurant (the dossier assets), node deps (npm install).
# media: sites/coconut-surf-inn-guest-house-and-restaurant/final/src/tenant/media/*
# media: sites/coconut-surf-inn-guest-house-and-restaurant/final/src/gaps/media/*
# media: sites/coconut-surf-inn-guest-house-and-restaurant/final/public/photos/*
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/seed-from-dossier.mjs
node scripts/photos.mjs
ls -l src/tenant/media src/gaps/media public/photos | awk '{s+=$5} END {print "total bytes", s}'
