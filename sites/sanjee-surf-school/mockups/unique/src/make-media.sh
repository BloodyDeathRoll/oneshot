#!/usr/bin/env bash
# Every image of the Sanjee Surf School unique mockup ("The set", designer 0.7.1, station 4e), made from the
# business's own photographs in dossier/sanjee-surf-school/assets. Needs ffmpeg and cwebp. Run from anywhere.
# Crops only, scaled down never up, no colour grading. Prints are drawn under their native width; the img-002 ground is 2000 px, so a screen wider than that stretches it a little.
# Not used, on purpose: img-036 (usable: false), img-015, img-021 to img-032, img-033 to img-035, img-041 (concepts.md §2).
# media: sites/sanjee-surf-school/mockups/unique/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/sanjee-surf-school/assets
D=sites/sanjee-surf-school/mockups/unique/dist/img
mkdir -p "$D"; rm -f "$D"/*
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT

# img <source file> <out name> <crop w:h:x:y or -> <width> [quality]
img() {
  local src="$A/$1" out="$D/$2.webp" crop="$3" w="$4" q="${5:-74}" vf=""
  [ "$crop" != "-" ] && vf="crop=$crop,"
  vf="${vf}scale='min($w,iw)':-2:flags=lanczos"
  ffmpeg -v error -y -i "$src" -vf "$vf" "$T/x.png"
  cwebp -quiet -q "$q" -m 6 -sharp_yuv "$T/x.png" -o "$out"
}

# The ground, full-bleed: 2000x1250 keeping the bottom of the frame. Native width, never scaled up.
img img-002.jpg  ground-img-002-2000 2000:1250:0:250 2000 66
img img-002.jpg  ground-img-002-1440 2000:1250:0:250 1440 66
# Phone: a tall window with the sky for the title and the headland above the front print.
img img-002.jpg  ground-img-002-phone 1114:1337:800:63 900 66
# The two prints that float on it.
img img-007.webp set-img-007-962  -               962 78
img img-007.webp set-img-007-640  -               640 76
img img-006.jpg  set-img-006      -               760 76

# Below the first screen. Prints stay under their native width (concepts.md §2 limits).
img img-005.jpg  print-img-005    -                832 76
img img-008.webp print-img-008    -                960 76
img img-012.webp print-img-012    -                750 76
img img-014.webp print-img-014    -                880 72
img img-017.webp print-img-017    1200:1300:0:450  1120 72
img img-009.webp print-img-009    1200:800:300:130 680 70
# The band: img-018, the sunset. Desktop keeps the peach sky for the line and the first waves; phone is a taller window on the same place.
img img-018.webp band-img-018       1440:800:0:300    1440 70
img img-018.webp band-img-018-phone 1080:1300:180:200 780 70
# The link preview. Deliberately not img-007, which carries the open rights flag.
ffmpeg -v error -y -i "$A/img-002.jpg" -vf "crop=2000:1050:0:450,scale=1200:630:flags=lanczos" -q:v 4 "$D/og-img-002.jpg"
