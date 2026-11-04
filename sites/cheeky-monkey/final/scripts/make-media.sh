#!/usr/bin/env bash
# Station 4g stand-in for the CMS, and the recipe for every media file of the final site (unique, "Pick your board").
# No Payload tenant exists before a sale (station 8), so this writes what the deployer's first seed would
# upload, in the shape scripts/fetch-tenant.mjs would write from Payload, then runs the build's own media steps.
#
#  1. The uploads.
#     heroVideo (round 2, Alon 2026-11-04: "i dont like the cartoon" / "yes, use the promo drone shots"):
#       cm-drone.mp4         a 6.2 s loop of the caption-free drone seconds of dossier.videos[] vid-001 (Lorenzo
#                            Marzocca's 2018 promo film for the guesthouse, 1920x1080, 25 fps, licence unknown: used
#                            for the preview as an exception Alon accepted on 2026-11-04, to be confirmed with the
#                            owner at pitch). Every frame was looked at (notes.md). Round 3:
#                              11.00–11.64 s  the reef and the coast road at Midigama, slowed 5/3x (~1 s)
#                              15.64–16.32 s  the village and the sea beyond the palms, slowed 2x (1.24 s)
#                              20.48–23.84 s  the drone low over a surfer on a green reef wave, slowed 1.33x (4.4 s),
#                                             graded towards the poster's turquoise (contrast, saturation, cyan)
#                            and a 0.4 s crossfade at the loop point: the surf shot dissolves into the first 10 frames
#                            of the coast shot, and the file starts at its 11th, so the loop has no hard cut.
#                            The captions, the logo animation and the phone/credit card fall outside these
#                            windows. The source is a YouTube 1080p encode whose flat sky carries 8x8 compression
#                            blocks: a light deband (ffmpeg deband, 0.02 thresholds) smooths them before anything
#                            else. Slow motion by motion-compensated interpolation to 25 fps (minterpolate mci),
#                            native 1920x1080 (never upscaled), no audio, a near-lossless master (crf 14): the build
#                            re-encodes every rendition from it
#       cm-drone-poster.jpg  heroVideoPoster: the master's first frame (source 11.24 s, an original frame)
#     videos[0], the shop reel in the intro's board window (dossier.videos[] vid-009, business-owned, 1080x1920):
#       cm-board.mp4         round 3: 7.77 s from the clean part (the caption ends ~2.8 s), cut at the reel's own shot
#                            changes: 5.17–8.27, 9.57–13.0, 3.0–4.23 s (starts on the bright rail shot; the dark shot
#                            and the abstract orange close-up are left out), native, no audio
#       cm-board-poster.jpg  its first frame (the rails of a row of colourful boards)
#       cm-board-rail.jpg    photos[19], the closing bookend: the rainbow rail with a hand, vid-009 12.8 s
#  2. scripts/seed-from-dossier.mjs: business-owned photos, content.json, src/gaps/ (room slides).
#  3. cms/publisher/src/video.mjs: the v0.9 renditions + src/tenant/videos.generated.json, then
#     scripts/video-site.mjs: this template's tiers (the hero's 608x1080 portrait p1080, the reel's 360x640 p640) and
#     the removal of the tiers and poster JPEGs it never serves.
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

slow() { echo "[0:v]trim=start=$1:end=$2,setpts=PTS-STARTPTS,deband=1thr=0.02:2thr=0.02:3thr=0.02:range=22:blur=1,setpts=$3*PTS,minterpolate=fps=25:mi_mode=mci:mc_mode=aobmc:vsbmc=1$4[o]"; }
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
seg() { ff -i "$D" -filter_complex "$(slow "$@")" -map "[o]" -an -c:v libx264 -crf 8 -preset fast -pix_fmt yuv420p "$T/$5.mp4"; }
GRADE=",eq=contrast=1.17:saturation=1.4:gamma=0.95,colorbalance=rm=-0.06:gm=0.01:bm=0.04"
seg 11.00 11.64 1.666667 "" a      # its first 10 frames (0.4 s) close the loop in the crossfade, the rest (~0.6 s) open it
seg 15.64 16.32 2 "" b             # 31 frames, 1.24 s
seg 20.48 23.84 1.333 "$GRADE" c   # 110 frames, 4.4 s, graded towards the poster's turquoise
NC=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$T/c.mp4")
OFF=$(node -e "console.log(((${NC}-10)/25).toFixed(2))")
ff -i "$T/a.mp4" -i "$T/b.mp4" -i "$T/c.mp4" -filter_complex \
  "[0:v]split[a1][a2];[a1]trim=start_frame=10,setpts=PTS-STARTPTS[at];[a2]trim=end_frame=10,setpts=PTS-STARTPTS[ah];[2:v][ah]xfade=transition=fade:duration=0.4:offset=${OFF}[cx];[at][1:v][cx]concat=n=3:v=1,setsar=1,format=yuv420p[o]" \
  -map "[o]" -an -c:v libx264 -crf 14 -preset slow -movflags +faststart "$M/cm-drone.mp4"
# the poster is the master's own first frame (source 11.24 s, an original frame: 10 output frames at 5/3x = 6 source
# frames past 11.00), so the loop fades in over exactly the poster
ff -i "$M/cm-drone.mp4" -frames:v 1 -q:v 1 "$M/cm-drone-poster.jpg"

# the shop reel, round 3: starts on the bright rail shot (5.17 s), drops the dark shot (8.27–9.57 s) and the
# abstract orange close-up (4.23–5.17 s); the loop seam is the reel's own cut at 4.23 → 5.17 s
ff -i "$V" -filter_complex "[0:v]trim=start_frame=155:end_frame=248,setpts=PTS-STARTPTS[x];[0:v]trim=start_frame=287:end_frame=390,setpts=PTS-STARTPTS[y];[0:v]trim=start_frame=90:end_frame=127,setpts=PTS-STARTPTS[z];[x][y][z]concat=n=3:v=1,fps=30,setsar=1,format=yuv420p[o]" \
  -map "[o]" -an -c:v libx264 -crf 14 -preset slow -movflags +faststart "$M/cm-board.mp4"
ff -i "$M/cm-board.mp4" -frames:v 1 -q:v 2 "$M/cm-board-poster.jpg"
ff -ss 12.8 -i "$V" -frames:v 1 -q:v 2 "$M/cm-board-rail.jpg"

node scripts/seed-from-dossier.mjs
node ../../../cms/publisher/src/video.mjs .
node scripts/video-site.mjs
node scripts/photos.mjs
ls -l "$M" public/video | awk '{print $5, $9}'
