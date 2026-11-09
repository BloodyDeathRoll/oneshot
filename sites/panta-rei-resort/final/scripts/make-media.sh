#!/usr/bin/env bash
# Station 4g stand-in for the CMS, and the recipe for every media file of the final site (interactive, "Morning swim",
# picked at gate b). No Payload tenant exists before a sale (station 8), so this writes what the deployer's first seed
# would upload, in the shape scripts/fetch-tenant.mjs would write from Payload, then runs the build's own media steps.
#
#  1. scripts/seed-from-dossier.mjs: the uploads, content.json and src/gaps/ (room galleries, logo):
#       photos[], rooms[].photo, heroVideoPoster, the room gallery photos and the logo are business-owned originals
#       copied unchanged from dossier/panta-rei-resort/assets (Wix site and booking-engine uploads, the film posters);
#       heroVideo is the dossier's vid-002 cut (3–17 s, its hero-desktop rendition, tools/fetch-video.mjs);
#       videos[0] (vid-001 4.75–12.1 s, the lounge) and videos[1] (vid-003 4–14 s, the mat class) are cut here from
#       the business's own films, no audio, crf 14 masters; their posters are frames of those cuts.
#  2. cms/publisher/src/video.mjs: the v0.9 renditions + src/tenant/videos.generated.json, then
#     scripts/video-site.mjs: this template's tiers (the hero's 608x1080 portrait p1080, the Welcome frame's 720x900
#     p900) and the removal of the tiers and poster JPEGs it never serves.
#  3. scripts/photos.mjs: photo and poster crops + src/tenant/photos.generated.json. `npm run build` runs it again.
# Needs: tools/link-assets.sh panta-rei-resort (the dossier assets), ffmpeg with libx264 + libsvtav1, node deps
# (npm install in this folder).
# media: sites/panta-rei-resort/final/src/tenant/media/*
# media: sites/panta-rei-resort/final/src/gaps/media/*
# media: sites/panta-rei-resort/final/public/photos/*
# media: sites/panta-rei-resort/final/public/video/*
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/seed-from-dossier.mjs
rm -rf public/video
node ../../../cms/publisher/src/video.mjs .
node scripts/video-site.mjs
node scripts/photos.mjs
ls -l src/tenant/media src/gaps/media public/photos public/video | awk '{s+=$5} END {print "total bytes", s}'
