#!/usr/bin/env bash
# Station 4g stand-in for the CMS, and the recipe for every media file of the final site (unique, "Pick your board").
# No Payload tenant exists before a sale (station 8), so this writes what the deployer's first seed would
# upload, in the shape scripts/fetch-tenant.mjs would write from Payload, then runs the build's own media steps.
#
#  1. The uploads.
#     heroVideo (round 2, Alon 2026-11-04: "i dont like the cartoon" / "yes, use the promo drone shots"):
#       cm-drone.mp4         a 6.72 s cut of the caption-free drone seconds of dossier.videos[] vid-001 (Lorenzo
#                            Marzocca's 2018 promo film for the guesthouse, 1920x1080, 25 fps, licence unknown:
#                            to be confirmed with the owner at pitch). Every frame was looked at (notes.md):
#                              11.00–11.60 s  the reef and the coast road at Midigama, slowed 2x   (1.2 s)
#                              15.64–16.32 s  the village and the sea beyond the palms, slowed 2x (1.36 s)
#                              20.48–23.84 s  the drone low over a surfer on a green reef wave, slowed 1.33x (4.48 s)
#                            The captions, the logo animation and the phone/credit card fall outside these
#                            windows. The source is a YouTube 1080p encode whose flat sky carries 8x8 compression
#                            blocks: a light deband (ffmpeg deband, 0.02 thresholds) smooths them before anything
#                            else. Slow motion by motion-compensated interpolation to 25 fps (minterpolate mci),
#                            native 1920x1080 (never upscaled), no audio, a near-lossless master (crf 14): the build
#                            re-encodes every rendition from it
#       cm-drone-poster.jpg  heroVideoPoster: the source's I-frame at 11.00 s (the cut's first frame), so the poster
#                            is the sharpest frame in the cut and the loop starts on it
#     videos[0], the shop reel in the intro's board window (dossier.videos[] vid-009, business-owned, 1080x1920):
#       cm-board.mp4         the dossier's clean cut 3.0–13.0 s (the caption ends ~2.8 s), native, no audio
#       cm-board-poster.jpg  its first frame (white Rockwell beside the magenta board)
#       cm-board-rail.jpg    photos[19], the closing bookend: the rainbow rail with a hand, vid-009 12.8 s
#  2. scripts/seed-from-dossier.mjs: business-owned photos, content.json, src/gaps/ (room slides).
#  3. cms/publisher/src/video.mjs: the v0.9 renditions + src/tenant/videos.generated.json
#     (the drone cut: d1920, m1280, m720; the 1080-wide reel: d1920 = m1280 one 1080 encode, m720).
#  4. scripts/photos.mjs: photo and poster crops + src/tenant/photos.generated.json.
# Needs: tools/link-assets.sh cheeky-monkey (the dossier assets), ffmpeg with libx264 + libsvtav1, node deps
# (npm install in this folder).
# media: sites/cheeky-monkey/final/src/tenant/media/*
# media: sites/cheeky-monkey/final/src/gaps/media/*
# media: sites/cheeky-monkey/final/public/photos/*
# media: sites/cheeky-monkey/final/public/video/*
set -euo pipefail
cd "$(dirname "$0")/.."
V=../../../dossier/cheeky-monkey/assets/video/vid-009-source.mp4
D=../../../dossier/cheeky-monkey/assets/video/vid-001-source.mp4
M=src/tenant/media
rm -rf "$M"; mkdir -p "$M"
ff() { ffmpeg -v error -y "$@"; }

slow() { echo "[0:v]trim=start=$1:end=$2,setpts=PTS-STARTPTS,deband=1thr=0.02:2thr=0.02:3thr=0.02:range=22:blur=1,setpts=$3*PTS,minterpolate=fps=25:mi_mode=mci:mc_mode=aobmc:vsbmc=1[$4]"; }
ff -i "$D" -filter_complex "$(slow 11.00 11.60 2 a);$(slow 15.64 16.32 2 b);$(slow 20.48 23.84 1.333 c);[a][b][c]concat=n=3:v=1,setsar=1,format=yuv420p[o]" \
  -map "[o]" -an -c:v libx264 -crf 14 -preset slow -movflags +faststart "$M/cm-drone.mp4"
ff -ss 11.00 -i "$D" -frames:v 1 -vf "deband=1thr=0.02:2thr=0.02:3thr=0.02:range=22:blur=1" -q:v 1 "$M/cm-drone-poster.jpg"

ff -ss 3.0 -t 10.0 -i "$V" -vf "fps=30,setsar=1" -an -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p -movflags +faststart "$M/cm-board.mp4"
ff -i "$M/cm-board.mp4" -frames:v 1 -q:v 2 "$M/cm-board-poster.jpg"
ff -ss 12.8 -i "$V" -frames:v 1 -q:v 2 "$M/cm-board-rail.jpg"

node scripts/seed-from-dossier.mjs
node ../../../cms/publisher/src/video.mjs .
node scripts/photos.mjs
ls -l "$M" public/video | awk '{print $5, $9}'
