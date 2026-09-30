#!/usr/bin/env bash
# The three 4:5 level clips (864x1080) of the-sign, which the picked composite copies to dist/video/s/.
# Same commands as the first time (2026-09-28/29), recovered from the session log:
#  vid-002e  Level 3 edit: vid-002 8.9–12.5 s + 26.8–28.9 s, 0.5 s fade between, cropped 1/1.12 from
#            bottom-right (removes the globe watermark)                 -> vid-002e-p45
#  vid-003e  Level 2 edit: vid-003 10.8–14.0 s + 14.2–17.8 s, same fade and crop; the p45 cut starts
#            at 1.4 s (drops the opening frames with the dark rock)     -> vid-003e-p45
#  vid-010   Level 1: vid-010 20–29 s, the golden-hour stand-up         -> vid-010-p45
# Sources are fetched with tools/fetch-video.mjs; run tools/link-assets.sh first so nothing lands in the checkout.
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/global-surf-adventures/assets/video
SIGN=sites/global-surf-adventures/mockups/the-sign/dist/video
OUT=sites/global-surf-adventures/mockups/picked/dist/video/s
T=${TMPDIR:-/tmp}/picked-levels; mkdir -p "$T" "$SIGN" "$OUT"
CROP="crop=iw/1.12:ih/1.12:iw-iw/1.12:ih-ih/1.12,scale=1920:1080"

edit() { # id source a_start a_end b_start b_end -> $A/<id>-d1920.webm
  local id=$1 src=$2 off; off=$(echo "$4-$3-0.5" | bc)
  ffmpeg -v error -y -i "$A/$src" -filter_complex "[0:v]trim=$3:$4,setpts=PTS-STARTPTS,fps=25,format=yuv420p,$CROP[a];[0:v]trim=$5:$6,setpts=PTS-STARTPTS,fps=25,format=yuv420p,$CROP[b];[a][b]xfade=transition=fade:duration=0.5:offset=$off[v]" -map "[v]" -an -c:v libx264 -preset slow -crf 16 "$T/$id-master.mp4"
  SVT_LOG=1 ffmpeg -v error -y -i "$T/$id-master.mp4" -vf "scale=1920:-2" -an -c:v libsvtav1 -preset 8 -b:v 3000k "$A/$id-d1920.webm"
}
p45() { # id webm_crf mp4_crf <ffmpeg input args…>
  local id=$1 wc=$2 mc=$3; shift 3
  ffmpeg -v error -y "$@" -vf "crop=864:1080:528:0" -an -c:v libvpx-vp9 -crf "$wc" -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$SIGN/$id-p45.webm"
  ffmpeg -v error -y "$@" -vf "crop=864:1080:528:0" -an -c:v libx264 -crf "$mc" -preset slow -pix_fmt yuv420p -movflags +faststart "$SIGN/$id-p45.mp4"
}

edit vid-002e vid-002-source.webm 8.9 12.5 26.8 28.9
edit vid-003e vid-003-source.mp4 10.8 14.0 14.2 17.8
p45 vid-002e 33 24 -i "$A/vid-002e-d1920.webm"
p45 vid-003e 33 24 -ss 1.4 -i "$A/vid-003e-d1920.webm"
p45 vid-010 35 28 -ss 20 -t 9 -i "$A/vid-010-source.mp4"
for id in vid-002e vid-003e; do ffmpeg -v error -y -i "$SIGN/$id-p45.mp4" -frames:v 1 -q:v 3 "$SIGN/$id-p45-poster.jpg"; done
ffmpeg -v error -y -ss 20.4 -i "$A/vid-010-source.mp4" -frames:v 1 -vf "crop=864:1080:528:0" -q:v 3 "$SIGN/vid-010-p45-poster.jpg"
cp "$SIGN"/vid-*-p45* "$OUT/"
ls -l "$OUT"
