#!/usr/bin/env bash
# Station 4g stand-in for the CMS, and the recipe for every media file of the final site (unique, "Pick your board").
# No Payload tenant exists before a sale (station 8), so this writes what the deployer's first seed would
# upload, in the shape scripts/fetch-tenant.mjs would write from Payload, then runs the build's own media steps.
#
#  1. The uploads cut from the business-owned reel (dossier.videos[] vid-009, 1080x1920, 30 fps):
#       cm-board.mp4         heroVideo: the dossier's clean cut 3.0–13.0 s (the caption ends ~2.8 s), native
#                            1080x1920, no audio, a near-lossless master (the build re-encodes every rendition)
#       cm-board-poster.jpg  heroVideoPoster: the master's first frame (white Rockwell beside the magenta board),
#                            so the poster and the loop match, as in the mockup
#       cm-board-rail.jpg    photos[19], the closing bookend: the rainbow rail with a hand, vid-009 12.8 s
#  2. scripts/seed-from-dossier.mjs: business-owned photos, content.json, src/gaps/ (room slides, stock-003).
#  3. cms/publisher/src/video.mjs: the v0.9 renditions + src/tenant/videos.generated.json
#     (a 1080-wide source: d1920 and m1280 are one 1080 encode, m720 the phone tier).
#  4. scripts/photos.mjs: photo and poster crops + src/tenant/photos.generated.json; stock-003 copied unchanged.
# Needs: tools/link-assets.sh cheeky-monkey (the dossier assets), ffmpeg with libx264 + libsvtav1, node deps
# (npm install in this folder).
# media: sites/cheeky-monkey/final/src/tenant/media/*
# media: sites/cheeky-monkey/final/src/gaps/media/*
# media: sites/cheeky-monkey/final/public/photos/*
# media: sites/cheeky-monkey/final/public/video/*
# media: sites/cheeky-monkey/final/public/atmo/*
# stock-003 (src/gaps/media/stock-003.jpg, public/atmo/stock-003.jpg) is the CC BY-SA original, copied unchanged.
set -euo pipefail
cd "$(dirname "$0")/.."
V=../../../dossier/cheeky-monkey/assets/video/vid-009-source.mp4
M=src/tenant/media
rm -rf "$M"; mkdir -p "$M"
ff() { ffmpeg -v error -y "$@"; }

ff -ss 3.0 -t 10.0 -i "$V" -vf "fps=30,setsar=1" -an -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p -movflags +faststart "$M/cm-board.mp4"
ff -i "$M/cm-board.mp4" -frames:v 1 -q:v 2 "$M/cm-board-poster.jpg"
ff -ss 12.8 -i "$V" -frames:v 1 -q:v 2 "$M/cm-board-rail.jpg"

node scripts/seed-from-dossier.mjs
node ../../../cms/publisher/src/video.mjs .
node scripts/photos.mjs
ls -l "$M" public/video | awk '{print $5, $9}'
