#!/usr/bin/env bash
# sites/the-sandhya/final/scripts/make-media.sh — every media file of the final site (calm, "The Artwork"),
# and the station 4g stand-in for the CMS. No Payload tenant exists before a sale (station 8).
#   1. scripts/seed-from-dossier.mjs: the uploads (dossier photographs, business-owned) into src/tenant/media/
#      and src/gaps/media/, plus src/tenant/content.json and src/gaps/gaps.json from copy/en.json
#   2. the two logos (template assets; the schema has no logo field) into public/img/, as at 4e
#   3. scripts/fonts.mjs: the self-hosted fonts into public/fonts/
#   4. scripts/photos.mjs: every rendition into public/photos/ + src/tenant/photos.generated.json
# Needs: tools/link-assets.sh the-sandhya (the dossier assets), ffmpeg, node deps (npm install here).
# media: sites/the-sandhya/final/src/tenant/media/*
# media: sites/the-sandhya/final/src/gaps/media/*
# media: sites/the-sandhya/final/public/photos/*
# media: sites/the-sandhya/final/public/img/*
# media: sites/the-sandhya/final/public/fonts/*
set -euo pipefail
cd "$(dirname "$0")/.."
A=../../../dossier/the-sandhya/assets
node scripts/seed-from-dossier.mjs
mkdir -p public/img
ffmpeg -y -loglevel error -i "$A/logo-white.png" -vf scale=406:-1:flags=lanczos public/img/logo-white.png
ffmpeg -y -loglevel error -i "$A/logo-footer.png" -vf scale=284:-1:flags=lanczos public/img/logo-footer.png
node scripts/fonts.mjs
node scripts/photos.mjs
