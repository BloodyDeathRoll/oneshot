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

# ---- hero poster: vid-004 frame at 6 s (dossier poster), the surf beach from the air
pic "$V/vid-004-poster.jpg" hero 1920 1080
# ---- the ring of roofs, img-001 (2000 px)
pic "$A/img-001.jpg" ring 2000 1124
# ---- closing still: vid-001 poster (57 s, top-down ring)
pic "$V/vid-001-poster.jpg" closing 1920 1080

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
pic "$A/img-006.png" pool 1500 1000
pic "$A/img-046.jpg" plunge 720 900
# ---- the restaurant: three dishes, one 4:5 frame
pic "$A/img-003.jpg" menu-breakfast 960 1200
pic "$A/img-005.jpg" menu-later 960 1200 0.5 0.55
pic "$A/img-025.png" menu-dinner 960 1200 0.5 0.6
# ---- after the surf: guests with boards on the lawn (img-035, 1350 px)
pic "$A/img-035.jpg" surf 1350 900

# ---- groups: the open-air lounge under the main building, rattan lamps and chairs (img-030, 1350 px)
pic "$A/img-030.jpg" lounge 1350 900

# ---- hero video: vid-004 cut 0.5-14.5 s, the dossier's renditions as they are
cp "$V/vid-004-d1920.mp4" "$D/video/hero-d1920.mp4"
cp "$V/vid-004-d1920.webm" "$D/video/hero-d1920.webm"
cp "$V/vid-004-m1280.mp4" "$D/video/hero-m1280.mp4"
cp "$V/vid-004-m1280.webm" "$D/video/hero-m1280.webm"

# ---- welcome clip: vid-002 3-17 s (the dossier's cut), 4:5 centre crop 864x1080 -> 720x900, no audio
ff -ss 3 -t 14 -i "$V/vid-002-source.mp4" -vf "crop=864:1080:528:0,scale=720:900:flags=lanczos,fps=30,format=yuv420p" -an -c:v libx264 -preset slow -b:v 950k -maxrate 1200k -bufsize 2M -profile:v high -movflags +faststart "$D/video/welcome-720.mp4"
ff -ss 3 -t 14 -i "$V/vid-002-source.mp4" -vf "crop=864:1080:528:0,scale=720:900:flags=lanczos,fps=30" -an -c:v libvpx-vp9 -b:v 850k -maxrate 1100k -row-mt 1 -deadline good -cpu-used 2 "$D/video/welcome-720.webm"
ff -i "$D/video/welcome-720.mp4" -frames:v 1 "$T/welcome.png"
pic "$T/welcome.png" welcome-poster 720 900

# ---- fitness clip: vid-003 (vertical mat class) 4-14 s, 1080x1920 -> 540x960, no audio, <= 2 MB
ff -ss 4 -t 10 -i "$V/vid-003-source.mp4" -vf "scale=540:960:flags=lanczos,fps=30,format=yuv420p" -an -c:v libx264 -preset slow -b:v 1100k -maxrate 1400k -bufsize 2M -profile:v high -movflags +faststart "$D/video/fitness-540.mp4"
ff -ss 4 -t 10 -i "$V/vid-003-source.mp4" -vf "scale=540:960:flags=lanczos,fps=30" -an -c:v libvpx-vp9 -b:v 950k -maxrate 1200k -row-mt 1 -deadline good -cpu-used 2 "$D/video/fitness-540.webm"
ff -i "$D/video/fitness-540.mp4" -frames:v 1 "$T/fitness.png"
pic "$T/fitness.png" fitness-poster 540 960

ls -la "$D/img" "$D/video" | awk '{s+=$5} END {print "total bytes", s}'
