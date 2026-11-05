#!/usr/bin/env bash
# Every image of the Sanjee Surf School interactive mockup ("Where you start", designer 0.7.1, station 4e),
# made from the business's own photographs in dossier/sanjee-surf-school/assets
# (tools/setup.sh / tools/link-assets.sh first). All six sources are license: business-owned; no credit
# line is required. No video (none on disk), no generated imagery, no stock.
# Needs ffmpeg and cwebp. Run from anywhere.
# Crops only, scaled down never up.
# media: sites/sanjee-surf-school/mockups/interactive/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/sanjee-surf-school/assets
D=sites/sanjee-surf-school/mockups/interactive/dist/img
mkdir -p "$D"; rm -f "$D"/*
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT

# img <source file> <out-name> <crop w:h:x:y or -> <max width> [quality]
img() {
  local src="$A/$1" out="$D/$2.webp" crop="$3" w="$4" q="${5:-74}" vf=""
  [ "$crop" != "-" ] && vf="crop=$crop,"
  vf="${vf}scale='min($w,iw)':-2:flags=lanczos"
  ffmpeg -v error -y -i "$src" -vf "$vf" "$T/x.png"
  cwebp -quiet -q "$q" -m 6 -sharp_yuv "$T/x.png" -o "$out"
}

# Hero: img-009, 1600x1067, whole frame. A mild grade only (the haze off the sky and the water, no hue
# shift). The WebGL swell samples the same file, so the still and the moving water are one picture.
ffmpeg -v error -y -i "$A/img-009.webp" -vf "eq=contrast=1.1:saturation=1.18:gamma=0.98" "$T/x.png"
cwebp -quiet -q 84 -m 6 -sharp_yuv "$T/x.png" -o "$D/hero-img-009-1600.webp"

# Feature band: img-018 (1440x1920). Landscape crop for wide screens, taller crop for phones.
img img-018.webp feature-img-018-wide-1440 1440:720:0:300 1440 72
img img-018.webp feature-img-018-tall-900  1440:1560:0:120 900 72

# Sanjee: img-007 (962x938), whole frame, a print never drawn wider than its source.
img img-007.webp print-img-007-962 - 962 76
img img-007.webp print-img-007-640 - 640 74

# Outside: img-006 (848x480, native) and img-014 (1280x960, 4:3).
img img-006.jpg  print-img-006-848 - 848 78
img img-014.webp print-img-014-1000 - 1000 72

# Back on the sand: img-002 (2000x1500). Wide crop keeps the bottom of the frame; the tall crop holds
# the headland and enough sky for the closing line.
img img-002.jpg back-img-002-wide-2000 2000:1250:0:250 2000 70
img img-002.jpg back-img-002-tall-900  800:1500:760:0 800 72
