#!/usr/bin/env bash
# Every image of the Sanjee Surf School unique mockup ("The set", designer 0.7.1, station 4e), made from the
# business's own photographs in dossier/sanjee-surf-school/assets. Needs ffmpeg and cwebp. Run from anywhere.
# Crops only, scaled down never up, no colour grading. Nothing is drawn wider than its source.
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

# The set, first screen. img-002 keeps the bottom of the frame (2000x1100 of its 2000x1500), so the headland sits in the screen.
img img-002.jpg  set-img-002-1760 2000:1100:0:400 1760 70
img img-002.jpg  set-img-002-1100 2000:1100:0:400 1100 70
# Phone: the headland alone, because img-007 covers the lower half of whatever sits behind it.
img img-002.jpg  set-img-002-phone 1320:660:680:860 760 72
img img-007.webp set-img-007-962  -               962 78
img img-007.webp set-img-007-640  -               640 76
img img-009.webp set-img-009      1200:800:300:130 800 70
img img-018.webp set-img-018      1440:720:0:560  600 74
img img-006.jpg  set-img-006      -               760 76

# Below the first screen. Prints stay under their native width (concepts.md §2 limits).
img img-005.jpg  print-img-005    -                832 76
img img-008.webp print-img-008    -                960 76
img img-012.webp print-img-012    -                750 76
img img-014.webp print-img-014    -                880 72
img img-017.webp print-img-017    1200:1300:0:450  1120 72
# The silver band: desktop 1440x800 keeps the sun at the top and the pale band of sky across the middle; phone is a taller window on the same place.
img img-020.webp band-img-020       1440:800:0:440   1440 68
img img-020.webp band-img-020-phone 1080:1300:180:240 780 68
