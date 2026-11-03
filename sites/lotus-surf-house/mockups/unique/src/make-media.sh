#!/usr/bin/env bash
# Every image of the Lotus Surf House unique mockup ("Under the net", designer 0.7.1, station 4e), made from
# the business's own Booking.com property uploads in dossier/lotus-surf-house/assets
# (tools/setup.sh / tools/link-assets.sh first). Needs ffmpeg and cwebp. Run from anywhere.
# Crops only, scaled down never up; nothing is shown wider than its source. No video (none usable).
# media: sites/lotus-surf-house/mockups/unique/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/lotus-surf-house/assets
D=sites/lotus-surf-house/mockups/unique/dist
mkdir -p "$D/img"; rm -f "$D"/img/*
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# img <asset> <out-name> <crop w:h:x:y or -> <max width> [quality] [extra vf]
img() {
  local src="$A/$1.jpg" out="$D/img/$2.webp" crop="$3" w="$4" q="${5:-74}" extra="${6:-}" vf=""
  [ "$crop" != "-" ] && vf="crop=$crop,"
  vf="${vf}scale='min($w,iw)':-2:flags=lanczos${extra:+,$extra}"
  ff -i "$src" -vf "$vf" "$T/x.png"
  cwebp -quiet -q "$q" -m 6 -sharp_yuv "$T/x.png" -o "$out"
}
rc() { # W H rw rh fx fy -> w:h:x:y, the largest rw:rh box positioned by fractions
  python3 -c '
import sys
W,H,rw,rh,fx,fy=map(float,sys.argv[1:])
if W/H>rw/rh: h=H; w=round(H*rw/rh)
else: w=W; h=round(W*rh/rw)
w-=w%2; h-=h%2
print(f"{int(w)}:{int(h)}:{int((W-w)*fx)}:{int((H-h)*fy)}")' "$@"
}

# ---- first screen: img-025 as a portrait print (1200x1600), at or under native size
img img-025 print-1200 "$(rc 1200 1600 3 4 .5 .5)" 1200 76
img img-025 print-840  "$(rc 1200 1600 3 4 .5 .5)" 840 74
img img-025 print-600  "$(rc 1200 1600 3 4 .5 .5)" 600 72

# ---- the house, top to bottom: roof 4:5, upstairs 3:2, garden 3:2
img img-021 row-roof   "$(rc 1200 1600 4 5 .5 .45)" 760 74
img img-002 row-up     "$(rc 1600 1200 3 2 .5 .5)" 1280 74
img img-020 row-garden "$(rc 1600 1200 3 2 .5 .6)" 1280 74

# ---- the King Rooms: bedrooms 3:2, balcony and bath 4:5
p32() { img "$1" "k32-$1" "$(rc "$2" "$3" 3 2 .5 .5)" 1200 72; }
p45() { img "$1" "k45-$1" "$(rc "$2" "$3" 4 5 .5 "${4:-.5}")" 760 74; }
p32 img-002 1600 1200; p32 img-010 1600 1200; p32 img-015 1280 960
p45 img-025 1200 1600 .6; p45 img-035 1200 1600; p45 img-008 1600 1200

# ---- the garden rooms: true masonry, each photo keeps its own ratio (fisheye edges trimmed 6%)
mas() { img "$1" "m-$1" "$2" 720 74; }
mas img-029 "1296:1290:72:72"; mas img-032 "1440:1250:80:69"; mas img-030 "972:724:54:40"
mas img-043 "1440:1080:80:60"; mas img-028 "943:900:53:50";  mas img-009 "-"

# ---- porch print: the Buddha and the offerings; roof pair; the gate print
img img-022 buddha-640 "$(rc 1199 1600 4 5 .5 .55)" 640 74
img img-021 roof-021 "$(rc 1200 1600 4 5 .5 .45)" 900 74
img img-004 roof-004 "$(rc 1199 1600 4 5 .5 .5)" 760 74
img img-019 gate-840 "$(rc 1200 1600 4 5 .3 .6)" 840 74

ls -la "$D/img" | awk '{s+=$5} END {print "total bytes", s}'
