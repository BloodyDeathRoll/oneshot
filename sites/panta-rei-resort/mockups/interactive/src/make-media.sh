#!/usr/bin/env bash
# Every image and video of the Panta Rei interactive mockup ("Morning swim", concept 2), made from the
# business-owned assets in dossier/panta-rei-resort/assets (tools/link-assets.sh / tools/setup.sh first in
# a new checkout). Crop and scale DOWN only: the script refuses any target larger than its crop.
# Needs ffmpeg (libx264, libvpx-vp9), ffprobe and cwebp. Run from anywhere; rerun after a change.
# media: sites/panta-rei-resort/mockups/interactive/dist/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/panta-rei-resort/assets
V=$A/video
D=sites/panta-rei-resort/mockups/interactive/dist
mkdir -p "$D/img" "$D/video"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }
dims() { ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$1"; }

# pic <src> <name> <W> <H> [xbias 0..1] [ybias 0..1]
# Crops the largest W:H window from the source (centre, or shifted by the biases), scales it to W x H,
# and writes <name>-W.jpg, <name>-W.webp and a half-width <name>-W/2.webp.
pic() {
  local src=$1 name=$2 W=$3 H=$4 xb=${5:-0.5} yb=${6:-0.5}
  IFS=, read -r sw sh < <(dims "$src")
  local cw ch
  if (( sw * H > sh * W )); then ch=$sh; cw=$(( sh * W / H )); else cw=$sw; ch=$(( sw * H / W )); fi
  if (( cw < W || ch < H )); then echo "refusing to upscale $src ($cw x $ch -> $W x $H)" >&2; exit 1; fi
  local x y; x=$(awk "BEGIN{printf \"%d\", ($sw-$cw)*$xb}"); y=$(awk "BEGIN{printf \"%d\", ($sh-$ch)*$yb}")
  ff -i "$src" -vf "crop=$cw:$ch:$x:$y,scale=$W:$H:flags=lanczos" "$T/$name.png"
  ff -i "$T/$name.png" -q:v 3 "$D/img/$name-$W.jpg"
  cwebp -quiet -q 78 -m 6 "$T/$name.png" -o "$D/img/$name-$W.webp"
  local h=$(( W / 2 )) hh=$(( H / 2 ))
  cwebp -quiet -q 78 -m 6 -resize $h $hh "$T/$name.png" -o "$D/img/$name-$h.webp"
}

# ---- logo (img-023, white on transparent, 591 px): scaled down, alpha kept
ff -i "$A/img-023.png" -vf "scale=180:180:flags=lanczos" "$D/img/logo.png"

# ---- hero poster: vid-002 frame at 5 s (dossier poster), the ring of roofs and the pool from straight above
pic "$V/vid-002-poster.jpg" hero 1920 1080
# ---- the ring of roofs, img-001 (2000 px)
pic "$A/img-001.jpg" ring 2000 1124
# ---- closing still: a room with its glass doors open to the lawn and the pool, a surfboard outside (img-012, 2000 px)
pic "$A/img-012.jpg" closing 1920 1080

# ---- room cards, one 4:5 cover per room
pic "$A/img-028.jpg" card-double 720 900
pic "$A/img-037.jpg" card-triple 720 900
pic "$A/img-038.jpg" card-family 720 900
pic "$A/img-043.jpg" card-suite 720 900

# ---- room galleries, all cropped to 3:2 (one ratio, no padded boxes)
for x in "double 028 031 029 007 013" "triple 037 034 036 010 011" "family 038 040 012 014 015" "suite 043 046 047 044 002 016"; do
  set -- $x; room=$1; shift; n=1
  for id in "$@"; do
    f=$(ls "$A"/img-$id.* | head -1)
    yb=0.5; [ "$id" = 040 ] && yb=0.62; [ "$id" = 044 ] && yb=0.45
    pic "$f" "room-$room-$n" 1200 800 0.5 $yb; n=$((n+1))
  done
done

# ---- the pool: guest wading in (img-006, 1844 px) and the suite's plunge pool (img-046)
pic "$A/img-006.png" pool 1800 1000
# ---- the restaurant: three dishes, one 4:5 frame
pic "$A/img-003.jpg" menu-breakfast 960 1200
pic "$A/img-005.jpg" menu-later 960 1200 0.5 0.55
# ---- after the surf: guests with boards on the lawn (img-035, 1350 px)
pic "$A/img-035.jpg" surf 1350 900

# ---- groups: a class from behind on the open upper floor (img-021, portrait 1334 px), 3:2 crop
pic "$A/img-021.jpg" group 1200 800 0.5 0.45

# ---- hero video: vid-002 cut 3-17 s (restaurant building -> top-down pool -> rise to the sea at dusk), the dossier's renditions as they are
cp "$V/vid-002-d1920.mp4" "$D/video/hero-d1920.mp4"
cp "$V/vid-002-d1920.webm" "$D/video/hero-d1920.webm"
cp "$V/vid-002-m1280.mp4" "$D/video/hero-m1280.mp4"
cp "$V/vid-002-m1280.webm" "$D/video/hero-m1280.webm"
# phone: a native 9:16 column of the same cut (608x1080 from x=840, the pool side), so a portrait screen is not
# an upscaled 720p frame; crop only, no scaling
ff -ss 3 -t 14 -i "$V/vid-002-source.mp4" -vf "crop=608:1080:840:0,fps=30,format=yuv420p" -an -c:v libx264 -preset slow -b:v 950k -maxrate 1200k -bufsize 2M -profile:v high -movflags +faststart "$D/video/hero-p1080.mp4"
ff -ss 3 -t 14 -i "$V/vid-002-source.mp4" -vf "crop=608:1080:840:0,fps=30" -an -c:v libvpx-vp9 -b:v 850k -maxrate 1100k -row-mt 1 -deadline good -cpu-used 2 "$D/video/hero-p1080.webm"
ff -ss 2 -i "$D/video/hero-p1080.mp4" -frames:v 1 "$T/hero-p-frame.png"
pic "$T/hero-p-frame.png" hero-p 608 1080

# ---- welcome clip: vid-001 4.75-12.1 s (the open-air lounge: the orange rattan chairs, the lounge wide, sun through the
# rattan lamps; three shots, cut points 7.3 / 9.6 s; the dark lamps-from-below shot before 4.7 s is left out),
# 4:5 centre crop 864x1080 -> 720x900, no audio
WSRC=$V/vid-001-source.mp4
ff -ss 4.75 -t 7.35 -i "$WSRC" -vf "crop=864:1080:528:0,scale=720:900:flags=lanczos,fps=30,format=yuv420p" -an -c:v libx264 -preset slow -b:v 1000k -maxrate 1300k -bufsize 2M -profile:v high -movflags +faststart "$D/video/welcome-720.mp4"
ff -ss 4.75 -t 7.35 -i "$WSRC" -vf "crop=864:1080:528:0,scale=720:900:flags=lanczos,fps=30" -an -c:v libvpx-vp9 -b:v 900k -maxrate 1150k -row-mt 1 -deadline good -cpu-used 2 "$D/video/welcome-720.webm"
ff -ss 3.4 -i "$D/video/welcome-720.mp4" -frames:v 1 "$T/welcome-frame.png"
pic "$T/welcome-frame.png" welcome-poster 720 900

# ---- fitness clip: vid-003 (vertical mat class) 4-14 s, 1080x1920 -> 540x960, no audio, <= 2 MB
ff -ss 4 -t 10 -i "$V/vid-003-source.mp4" -vf "scale=540:960:flags=lanczos,fps=30,format=yuv420p" -an -c:v libx264 -preset slow -b:v 1100k -maxrate 1400k -bufsize 2M -profile:v high -movflags +faststart "$D/video/fitness-540.mp4"
ff -ss 4 -t 10 -i "$V/vid-003-source.mp4" -vf "scale=540:960:flags=lanczos,fps=30" -an -c:v libvpx-vp9 -b:v 950k -maxrate 1200k -row-mt 1 -deadline good -cpu-used 2 "$D/video/fitness-540.webm"
ff -i "$D/video/fitness-540.mp4" -frames:v 1 "$T/fitness-frame.png"
pic "$T/fitness-frame.png" fitness-poster 540 960

ls -la "$D/img" "$D/video" | awk '{s+=$5} END {print "total bytes", s}'
