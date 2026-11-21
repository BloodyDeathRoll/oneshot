#!/usr/bin/env bash
# sites/the-sandhya/mockups/calm/src/make-media.sh — every image of the calm mockup ("The Artwork"),
# resized and cropped from the dossier's own photographs. Needs cwebp and ffmpeg. Run from anywhere.
# media: sites/the-sandhya/mockups/calm/dist/img/*
#
# Sources are dossier/the-sandhya/assets/, capped at 2000 px wide. The larger originals on
# thesandhya.com were not re-fetched (a plain request answered 406), so the phone hero is a crop of
# the 2000 px file: 616 source px across a 390 px screen. Nothing here invents a pixel.
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/the-sandhya/assets
O=sites/the-sandhya/mockups/calm/dist/img
mkdir -p "$O"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# web <asset> <out-name> <width> [quality] [crop: x y w h]
web() {
  local id=$1 name=$2 w=$3 q=${4:-82}
  shift 3; [ $# -gt 0 ] && shift
  local crop=()
  if [ $# -eq 4 ]; then crop=(-crop "$1" "$2" "$3" "$4"); fi
  cwebp -quiet -mt -m 6 -sharp_yuv -q "$q" ${crop[@]+"${crop[@]}"} -resize "$w" 0 "$A/$id.jpg" -o "$O/$name.webp"
}

# First screen. Desktop: the whole frame, square-on. Phone: the window on the palm's axis, full
# height, scaled 1.5x with Lanczos and a light unsharp, so the phone's own bilinear scale does not
# soften it further. It stays a 616 px crop; see notes.md.
web img-071 img-071-2000 2000 88
ffmpeg -y -loglevel error -i "$A/img-071.jpg" -vf "crop=616:1334:708:0,scale=924:2001:flags=lanczos,unsharp=5:5:0.45:5:5:0" "$TMP/hero-phone.png"
cwebp -quiet -mt -m 6 -sharp_yuv -q 84 "$TMP/hero-phone.png" -o "$O/img-071-phone.webp"

# Full-bleed moments: 2000 and 1200 wide, and a 4:5 phone crop from the middle of the frame.
web img-068 img-068-2000 2000 84
web img-068 img-068-1200 1200 82
web img-068 img-068-phone 900 82 880 0 1067 1334
web img-032 img-032-2000 2000 84
web img-032 img-032-1200 1200 82
web img-032 img-032-phone 900 82 640 0 1066 1333

# Arrival: the teak doors, cropped 4:5 from the right of the frame.
web img-038 img-038-door 1000 84 934 0 1066 1333

# The rooms, one ratio (3:2). Never wider than the source.
for id in img-077 img-061 img-062 img-070 img-079 img-043 img-080 img-042 img-066 img-067 img-074 img-076 img-073 img-087 img-058 img-059 img-055; do
  web "$id" "$id-1400" 1400
  web "$id" "$id-1000" 1000
done
for id in img-165 img-167 img-171 img-172; do
  web "$id" "$id-1400" 1400
  web "$id" "$id-1000" 1000
done
web img-083 img-083-1280 1280
web img-083 img-083-1000 1000

# Dining: real masonry, two heights. img-118 and img-113 cropped towards the plate and the table.
web img-118 img-118-tall 900 82 380 0 1067 1334
web img-112 img-112-900 900
web img-115 img-115-900 900
web img-113 img-113-sq 850 82 214 0 853 853

# Details, one ratio (4:5), from the 853x1280 originals.
for id in img-131 img-125 img-139 img-140 img-130 img-135; do
  web "$id" "$id-45" 680 82 0 107 853 1066
done

# Staff prints, shown small; twilight prints at or under native size; the map as a print.
for id in img-141 img-142 img-143; do web "$id" "$id-480" 480; done
web img-027 img-027-1200 1200 86
web img-022 img-022-1200 1200 86
web img-013 img-013-map 730 86 100 230 730 630
web img-034 img-034-1100 1100
web img-039 img-039-1800 1800
web img-039 img-039-1000 1000

# Logos, white on transparent; the page turns them to ink in CSS.
ffmpeg -y -loglevel error -i "$A/logo-white.png" -vf scale=406:-1:flags=lanczos "$O/logo-white.png"
ffmpeg -y -loglevel error -i "$A/logo-footer.png" -vf scale=284:-1:flags=lanczos "$O/logo-footer.png"
