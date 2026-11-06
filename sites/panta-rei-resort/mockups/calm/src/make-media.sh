#!/usr/bin/env bash
# Every image and video of the Panta Rei calm mockup ("Welcome to Panta Rei"), from the business's own
# assets in dossier/panta-rei-resort/assets/ (tools/link-assets.sh first; video renditions from
# tools/fetch-video.mjs). Crop and scale down only, never upscale. Needs ffmpeg + cwebp.
# media: sites/panta-rei-resort/mockups/calm/dist/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/panta-rei-resort/assets
D=sites/panta-rei-resort/mockups/calm/dist
T=${TMPDIR:-/tmp}/pr-calm; mkdir -p "$T" "$D/img" "$D/video"
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

# ---- hero film: vid-001 cut 55–70 s (ring of roofs → coast), renditions as made by fetch-video
cp "$A"/video/vid-001-d1920.mp4 "$A"/video/vid-001-d1920.webm "$A"/video/vid-001-m1280.mp4 "$A"/video/vid-001-m1280.webm "$D/video/"
# phone: a 9:16 centre crop of the same cut from the 1080 p source (608x1080, no upscale), so a
# portrait screen is not a 2.3x blow-up of the 1280x720 rendition
ffmpeg -v error -y -ss 55 -t 15 -i "$A/video/vid-001-source.mp4" -vf "crop=608:1080:656:0,fps=25,format=yuv420p" -an -c:v libx264 -preset slow -crf 25 -maxrate 1000k -bufsize 2M -profile:v high -movflags +faststart "$D/video/vid-001-p608.mp4"
ffmpeg -v error -y -i "$A/video/vid-001-poster.jpg" -vf "crop=608:1080:656:0" -q:v 2 "$T/vid-001-poster-p.png"
cwebp -quiet -q 74 "$T/vid-001-poster-p.png" -o "$D/img/vid-001-poster-p608.webp"
for W in 1920 1280 800; do cwebp -quiet -q 72 -resize $W 0 "$A/video/vid-001-poster.jpg" -o "$D/img/vid-001-poster-$W.webp"; done

# ---- closing still: vid-002 at 16 s (the ring among the palms, the sea behind)
ffmpeg -v error -y -ss 16.0 -i "$A/video/vid-002-source.mp4" -frames:v 1 -vf "eq=gamma=1.18:saturation=1.08" "$T/vid-002-16s.png"   # lifted out of the dusk shadows
for W in 1920 1280; do cwebp -quiet -q 72 -resize $W 0 "$T/vid-002-16s.png" -o "$D/img/vid-002-still-$W.webp"; done

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
fit 003 900; fit 005 700; fit 018 700; fit 019 700
fit 004 800
echo "calm media written to $D"
