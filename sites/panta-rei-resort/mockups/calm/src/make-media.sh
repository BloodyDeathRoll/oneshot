#!/usr/bin/env bash
# Every image and video of the Panta Rei calm mockup ("Welcome to Panta Rei"), from the business's own
# assets in dossier/panta-rei-resort/assets/ (tools/link-assets.sh first; video renditions from
# tools/fetch-video.mjs). Crop and scale down only, never upscale. Needs ffmpeg + cwebp.
# media: sites/panta-rei-resort/mockups/calm/dist/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/panta-rei-resort/assets
D=sites/panta-rei-resort/mockups/calm/dist
T=${TMPDIR:-/tmp}/pr-calm; rm -rf "$D/img" "$D/video"; mkdir -p "$T" "$D/img" "$D/video"
src() { ls "$A"/img-"$1".* | head -1; }
dims() { ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$1"; }
q=74

# whole picture, scaled down to width W (never up)
fit() { # id W [out-suffix]
  local f; f=$(src "$1"); local w; w=$(dims "$f" | cut -d, -f1)
  local W=$2; [ "$W" -gt "$w" ] && W=$w
  cwebp -quiet -q $q -resize "$W" 0 "$f" -o "$D/img/img-$1-$W.webp"; }

# crop to 4:3 (horizontal centre, vertical position yf 0..1), then scale to each width given
c43() { # id yf W...
  local id=$1 yf=$2; shift 2; local f; f=$(src "$id")
  IFS=, read -r w h < <(dims "$f")
  local cw ch; if [ $((w*3)) -ge $((h*4)) ]; then ch=$h; cw=$((h*4/3)); else cw=$w; ch=$((w*3/4)); fi
  local x=$(((w-cw)/2)); local y; y=$(awk "BEGIN{printf \"%d\", ($h-$ch)*$yf}")
  for W in "$@"; do [ "$W" -gt "$cw" ] && W=$cw
    cwebp -quiet -q $q -crop $x $y $cw $ch -resize "$W" 0 "$f" -o "$D/img/img-$id-43-$W.webp"; done; }

# ---- hero film (round 6): vid-001 at pool level, 9.4 s, three shots of one source at real speed:
# 12.2–17.8 s the glide down the garden path to the long pool · 17.86–19.9 s two guests at the pool edge
# with a board (from behind) · 20.0–21.8 s straight down on the pool and the swimmer, cut before the ring
# of roofs appears (the ring is the unique variant's device). Poster = the long pool, 3.0 s into the cut.
M="$T/hero-master.mp4"
ffmpeg -v error -y -i "$A/video/vid-001-source.mp4" -filter_complex "[0:v]trim=12.2:17.8,setpts=PTS-STARTPTS,fps=25,format=yuv420p[a];[0:v]trim=17.86:19.9,setpts=PTS-STARTPTS,fps=25,format=yuv420p[b];[0:v]trim=20.0:21.8,setpts=PTS-STARTPTS,fps=25,format=yuv420p[c];[a][b][c]concat=n=3:v=1:a=0[v]" -map "[v]" -an -c:v libx264 -preset slow -crf 16 "$M"
x264() { ffmpeg -v error -y -i "$M" -vf "$1" -an -c:v libx264 -preset slow -crf "$2" -maxrate "$3" -bufsize 6M -profile:v high -pix_fmt yuv420p -movflags +faststart "$D/video/$4"; }
av1() { SVT_LOG=1 ffmpeg -v error -y -i "$M" -vf "$1" -an -c:v libsvtav1 -preset 8 -b:v "$2" "$D/video/$3"; }
x264 "scale=1920:-2" 22 3000k hero-d1920.mp4
av1  "scale=1920:-2" 2400k hero-d1920.webm
x264 "scale=1280:-2" 24 1400k hero-m1280.mp4
av1  "scale=1280:-2" 1200k hero-m1280.webm
x264 "crop=608:1080:656:0" 24 1400k hero-p608.mp4          # portrait phones: 9:16 centre crop, no upscale
ffmpeg -v error -y -ss 3.0 -i "$M" -frames:v 1 "$T/hero-poster.png"
for W in 1920 1280 800; do cwebp -quiet -q 74 -resize $W 0 "$T/hero-poster.png" -o "$D/img/hero-poster-$W.webp"; done
ffmpeg -v error -y -i "$T/hero-poster.png" -vf "crop=608:1080:656:0" "$T/hero-poster-p.png"
cwebp -quiet -q 74 "$T/hero-poster-p.png" -o "$D/img/hero-poster-p608.webp"

# ---- closing: img-001, the resort from a high angle at noon (2000 px wide, never upscaled)
fit 001 2000; fit 001 1280

# ---- logo (white on transparent)
cwebp -quiet -q 90 -alpha_q 100 -resize 240 0 "$(src 023)" -o "$D/img/img-023-240.webp"

# ---- full-bleed photographs
fit 030 1350; fit 030 800
fit 006 1844; fit 006 1000
fit 035 1350; fit 035 800

# ---- rooms, one ratio (4:3) per slideshow
for id in 028 031 007 013 034 036 037 010 011 038 012 014 015 043 046 047 002 016; do c43 $id 0.5 1200 720; done
c43 029 0.3 1200 720      # Double bathroom: keep the basin and window
c43 040 0.62 1200 720     # Family Villa outdoor bath (portrait): the tub, not the sky

# ---- restaurant masonry (own heights) and fitness
fit 003 2000; fit 003 1200; fit 005 700; fit 018 700; fit 019 700
fit 004 1334; fit 004 800
echo "calm media written to $D"
