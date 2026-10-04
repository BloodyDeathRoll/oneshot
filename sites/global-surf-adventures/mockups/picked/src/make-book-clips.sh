#!/usr/bin/env bash
# Booking desk level clips for the picked composite (book/, step 1, desktop media half only; phones get the poster).
# Cut straight from the business-owned 1920x1080 sources at native resolution: an 864x1080 crop, no
# scaling, real speed, one direction, hard cuts only (no crossfade, no interpolated frames), no audio.
# They replace the-sign's p45 cuts on the booking page, which were re-encodes of an upscaled rendition
# and looked soft in the 720 px half (visual-critic, 4f round 1).
#  level-1  vid-010-source 20.00-29.00 s        the golden-hour stand-up (same take as the home card)
#  level-2  vid-003-source 12.20-14.00 + 14.20-17.80 s   sunny ride, reef ride (vid-003e's takes)
#  level-3  vid-002-source 8.90-12.50 + 26.80-28.90 s    two barrels (vid-002e's takes)
# The vid-002/003 globe watermark and the vid-010 badge sit top-left (x < 200); the crops start at x >= 528.
# Posters are the first frame of each clip, so the video starts where the poster is.
# media: sites/global-surf-adventures/mockups/picked/dist/video/b/*
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/global-surf-adventures/assets/video
OUT=sites/global-surf-adventures/mockups/picked/dist/video/b
T=${TMPDIR:-/tmp}/picked-book; mkdir -p "$T" "$OUT"
ff() { ffmpeg -v error -y "$@"; }
master() { # name source filter_complex
  ff -i "$A/$2" -filter_complex "$3" -map "[v]" -an -c:v libx264 -crf 10 -preset slow -pix_fmt yuv420p "$T/$1.mp4"; }
C1="crop=864:1080:528:0"; C="crop=864:1080:631:0"
master level-1 vid-010-source.mp4  "[0:v]trim=20:29,setpts=PTS-STARTPTS,$C1,fps=25,setsar=1[v]"
master level-2 vid-003-source.mp4  "[0:v]trim=12.2:14.0,setpts=PTS-STARTPTS,$C,fps=25,setsar=1[a];[0:v]trim=14.2:17.8,setpts=PTS-STARTPTS,$C,fps=25,setsar=1[b];[a][b]concat=n=2:v=1:a=0[v]"
master level-3 vid-002-source.webm "[0:v]trim=8.9:12.5,setpts=PTS-STARTPTS,$C,fps=25,setsar=1[a];[0:v]trim=26.8:28.9,setpts=PTS-STARTPTS,$C,fps=25,setsar=1[b];[a][b]concat=n=2:v=1:a=0[v]"
for n in level-1 level-2 level-3; do
  ff -i "$T/$n.mp4" -an -c:v libvpx-vp9 -b:v 0 -crf "${WCRF:-30}" -row-mt 1 -deadline good -cpu-used 2 "$OUT/$n.webm"
  ff -i "$T/$n.mp4" -an -c:v libx264 -crf "${XCRF:-22}" -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart "$OUT/$n.mp4"
  ff -i "$T/$n.mp4" -frames:v 1 -q:v 2 "$OUT/$n-poster.jpg"
done
ls -l "$OUT"
