#!/usr/bin/env bash
# Station 4g stand-in for the CMS, and the recipe for every media file of the final site (interactive, "Where you start").
# No Payload tenant exists before a sale (station 8), so this writes what the deployer's first seed would upload, in
# the shape scripts/fetch-tenant.mjs would write from Payload, then runs the build's own photo step.
#
#  1. scripts/seed-from-copy.mjs: the 8 business-owned originals copied unchanged from dossier/sanjee-surf-school/assets
#     into src/tenant/media/, and src/tenant/content.json from copy/en.json.
#  2. scripts/photos.mjs: the slot crops (src/lib/slots.mjs, the mockup's crops) -> public/photos/*
#     and src/tenant/photos.generated.json. `npm run build` runs this step again before `astro build`.
# No video and no forecast, as decided (concepts.md; Alon, gate b).
# Needs the dossier assets (tools/link-assets.sh sanjee-surf-school) and node deps (npm install in this folder).
# media: sites/sanjee-surf-school/final/src/tenant/media/*
# media: sites/sanjee-surf-school/final/public/photos/*
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/seed-from-copy.mjs
node scripts/photos.mjs
