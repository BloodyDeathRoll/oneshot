#!/usr/bin/env bash
# Every image of the Sanjee Surf School interactive mockup ("Where you start", designer 0.7.1, station 4e),
# made from the business's own photographs in dossier/sanjee-surf-school/assets
# (tools/setup.sh / tools/link-assets.sh first). All sources are license: business-owned; no credit line is
# required. img-007 and img-010 carry the concept's open rights flag. No video (none on disk), no generated
# imagery, no stock. Needs ffmpeg and cwebp. Run from anywhere. Crops only, scaled down never up.
# media: sites/sanjee-surf-school/mockups/interactive/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/sanjee-surf-school/assets
D=sites/sanjee-surf-school/mockups/interactive/dist/img
mkdir -p "$D"; rm -f "$D"/*
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT

# img <source file> <out-name> <crop w:h:x:y or -> <max width> [quality] [extra filter]
img() {
  local src="$A/$1" out="$D/$2.webp" crop="$3" w="$4" q="${5:-74}" extra="${6:-}" vf=""
  [ "$crop" != "-" ] && vf="crop=$crop,"
  vf="${vf}scale='min($w,iw)':-2:flags=lanczos"
  [ -n "$extra" ] && vf="$vf,$extra"
  ffmpeg -v error -y -i "$src" -vf "$vf" "$T/x.png"
  cwebp -quiet -q "$q" -m 6 -sharp_yuv "$T/x.png" -o "$out"
}

# Hero: img-018, 1440x1920 measured. The shader's crop numbers in build.py must match these two crops.
img img-018.webp hero-img-018-wide-1440 1440:1100:0:400 1440 76
img img-018.webp hero-img-018-tall-1000 1040:1920:110:0 1000 74
ffmpeg -v error -y -i "$A/img-018.webp" -vf "crop=1440:756:0:500,scale=1200:-2" -q:v 4 "$D/og-img-018-1200.jpg"

# Level tiles, 4:5, each at or under its source size.
img img-005.jpg  tile-img-005-380 380:464:230:0 380 80
img img-006.jpg  tile-img-006-384 384:480:280:0 384 80
img img-009.webp tile-img-009-520 640:800:450:160 520 76 "eq=contrast=1.1:saturation=1.18:gamma=0.98"
img img-010.webp tile-img-010-520 640:800:400:180 520 76
img img-012.webp tile-img-012-750 - 750 76

# Feature band: img-009, graded, the haze off. Wide for screens, a closer crop for phones.
img img-009.webp feature-img-009-wide-1600 1600:860:0:0 1600 80 "eq=contrast=1.1:saturation=1.18:gamma=0.98"
img img-009.webp feature-img-009-near-1040 1040:800:250:130 1040 80 "eq=contrast=1.1:saturation=1.18:gamma=0.98"

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
