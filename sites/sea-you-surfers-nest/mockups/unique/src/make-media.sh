#!/usr/bin/env bash
# Every image of the Sea You Surfers Nest unique mockup ("Every side of the four-poster", designer 0.7.1,
# station 4e), made from the business's own Booking.com property uploads in
# dossier/sea-you-surfers-nest/assets (tools/setup.sh / tools/link-assets.sh first). Needs ffmpeg and cwebp.
# Crops only, scaled down never up; nothing is drawn wider than its source. No video (none exists).
# media: sites/sea-you-surfers-nest/mockups/unique/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/sea-you-surfers-nest/assets
D=sites/sea-you-surfers-nest/mockups/unique/dist
mkdir -p "$D/img"; rm -f "$D"/img/*
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# img <asset> <out-name> <crop w:h:x:y or -> <max width> [quality]
img() {
  local src="$A/$1.jpg" out="$D/img/$2.webp" crop="$3" w="$4" q="${5:-74}" vf=""
  [ "$crop" != "-" ] && vf="crop=$crop,"
  vf="${vf}scale='min($w,iw)':-2:flags=lanczos"
  ff -i "$src" -vf "$vf" "$T/x.png"
  cwebp -quiet -q "$q" -m 6 -sharp_yuv "$T/x.png" -o "$out"
}
rc() { # W H rw rh fx fy -> w:h:x:y, the largest rw:rh box, placed by fractions of the spare room
  python3 -c '
import sys
W,H,rw,rh,fx,fy=map(float,sys.argv[1:])
if W/H>rw/rh: h=H; w=round(H*rw/rh)
else: w=W; h=round(W*rh/rw)
w-=w%2; h-=h%2
print(f"{int(w)}:{int(h)}:{int((W-w)*fx)}:{int((H-h)*fy)}")' "$@"
}

# ---- first screen, desktop: img-015 (the gabled four-poster) 16:9, 2000x1125 from y 0 (concept 3)
img img-015 h015-1920 "2000:1125:0:0" 1920 72
img img-015 h015-1280 "2000:1125:0:0" 1280 72
# ---- first screen, phone: img-005 (four-poster with the teal throw), 1000x2000 from x 333
img img-005 h005-1000 "1000:2000:333:0" 1000 70
img img-005 h005-720  "1000:2000:333:0" 720 70

# ---- the turn: the four sides, whole landscape frames (the drawn bed's opening crops them by cover-fit)
img img-015 side-015 - 1400 72
img img-002 side-002 - 1400 72
img img-017 side-017 - 1400 72
img img-053 side-053 - 1400 72
# ---- the closing: img-002 full-bleed behind the gabled panel
img img-002 close-002 - 1920 70

# ---- the two room types, 4:5 slideshows (Booking.com's own room tags decide the photographs)
g() { img "$1" "r-$1" "$(rc "$2" "$3" 4 5 "${4:-.5}" .5)" 820 73; }
g img-012 2000 1333 .55; g img-002 2000 1333 .62; g img-022 2000 1333 .35; g img-033 1333 2000; g img-013 1333 2000; g img-032 1333 2000
# Standard: no bathroom or WC photograph (Booking.com lists 0 bathrooms in the unit; concepts §2)
g img-026 1333 2000;     g img-009 2000 1127 .55; g img-005 1333 2000;     g img-025 1333 2000

# ---- around the courtyard: true masonry, each photograph keeps its own ratio
m() { img "$1" "m-$1" "$2" 820 73; }
m img-071 "1600:1081:0:0"     # the two extinguishers at the right edge cropped out
m img-003 -; m img-045 -; m img-041 -; m img-004 -; m img-007 -; m img-076 -; m img-038 -; m img-042 -

# ---- prints: the carved door, the surfboard shower, the sign (2:3, native ratio)
img img-027 print-027 - 820 74
img img-036 print-036 - 820 74
img img-001 print-001 - 760 74

ls -la "$D/img" | awk '{s+=$5} END {print "total bytes", s}'
