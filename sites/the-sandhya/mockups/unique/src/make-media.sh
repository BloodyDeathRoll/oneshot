#!/usr/bin/env bash
# Every image of The Sandhya's unique mockup ("The Hour"), from the business-owned dossier assets
# (dossier/the-sandhya/assets, licence notes in dossier.json). Baked stills and the mask come from
# src/bake.mjs, which runs the page's own shader (src/hour.js) over img-152 in headless Chromium.
# Needs ffmpeg, cwebp, node with playwright (repo dev dependency).
# media: sites/the-sandhya/mockups/unique/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
SLUG=the-sandhya
A=dossier/$SLUG/assets
M=sites/$SLUG/mockups/unique
D=$M/dist/img
T=${TMPDIR:-/tmp}/sandhya-hour; rm -rf "$T"; mkdir -p "$T"
rm -rf "$D"; mkdir -p "$D"

# The photograph as it is, q80: the first screen shows it and the set-piece's shader reads the same
# file. Whole frame, and the phone's crop (x 930..1821, full height), which ends on the building's own
# end wall, not across a bay.
ffmpeg -v error -y -i "$A/img-152.jpg" "$T/noon.png"
cwebp -quiet -q 80 -m 6 "$T/noon.png" -o "$D/hour-noon.webp"
ffmpeg -v error -y -i "$T/noon.png" -vf "crop=891:1080:930:0" "$T/noon-phone.png"
cwebp -quiet -q 72 -m 6 -sharp_yuv "$T/noon-phone.png" -o "$D/hour-noon-phone.webp"

# The shader's hand-cut mask and the curtains' fold texture, both derived from img-152.
# No graded still is written: graded pixels exist only live on the set-piece's canvas.
node "$M/src/bake.mjs" "$D/hour-noon.webp" "$T/bake"
cwebp -quiet -lossless -z 9 "$T/bake/hour-mask.png" -o "$D/hour-mask.webp"
cwebp -quiet -q 90 -m 6 "$T/bake/hour-folds.png" -o "$D/hour-folds.webp"

# The sea on the first screen: the real shallows in img-153, a separate photograph, shown as its own
# strip below the first, with a gap, so it never reads as one picture with img-152.
ffmpeg -v error -y -i "$A/img-153.jpg" -vf "crop=1500:290:0:563" "$T/sea.png"
cwebp -quiet -q 72 -m 6 -sharp_yuv "$T/sea.png" -o "$D/img-153-sea-1500.webp"
cwebp -quiet -q 70 -m 6 -sharp_yuv -resize 800 0 "$T/sea.png" -o "$D/img-153-sea-800.webp"

# Logo: resized, not retraced.
cwebp -quiet -q 90 -alpha_q 90 -resize 406 0 "$A/logo-white.png" -o "$D/logo-white.webp"

# pic <asset id> <quality> <width> [width ...]: downscale only, never up, keeping the whole frame.
pic() {
  local id=$1 q=$2; shift 2
  local W; W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$A/$id.jpg")
  for w in "$@"; do
    if [ "$w" -ge "$W" ]; then
      cwebp -quiet -q "$q" -m 6 -sharp_yuv "$A/$id.jpg" -o "$D/$id-$w.webp"
    else
      cwebp -quiet -q "$q" -m 6 -sharp_yuv -resize "$w" 0 "$A/$id.jpg" -o "$D/$id-$w.webp"
    fi
  done
}

# Room galleries: phone and desktop sizes.
for id in img-077 img-061 img-062 img-070 img-079 \
          img-043 img-080 img-165 img-167 img-083 \
          img-042 img-066 img-067 img-074 img-076 img-073 img-071 \
          img-087 img-171 img-172 img-058 img-059 img-055; do
  pic "$id" 74 800 1280
done

# The sections.
pic img-071 74 1600
pic img-038 76 1000 2000
pic img-032 78 1000 2000
pic img-113 76 800 1280
pic img-110 76 800 1280
pic img-118 76 800 1400
pic img-115 76 800 1280
pic img-117 76 1000 1920
pic img-138 76 800
pic img-126 76 800
pic img-153 76 800 1500
pic img-034 76 700 1100
pic img-013 80 900
pic img-039 76 800 1400
pic img-027 78 700 1200
pic img-154 78 700 1280
