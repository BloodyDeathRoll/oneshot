#!/usr/bin/env bash
# Every image of the Lotus Surf House interactive mockup ("Dappled", designer 0.7.1, station 4e), made from
# the business's own Booking.com property uploads in dossier/lotus-surf-house/assets
# (tools/setup.sh / tools/link-assets.sh first). Needs ffmpeg and cwebp. Run from anywhere.
# Crops only, scaled down never up; nothing is shown wider than its source. No video (none usable).
# media: sites/lotus-surf-house/mockups/interactive/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/lotus-surf-house/assets
D=sites/lotus-surf-house/mockups/interactive/dist
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

# ---- first screen: img-020, the garden under the shade tree (1600x1200). The shader reads the same file.
img img-020 hero-wide-1600 "$(rc 1600 1200 16 9 .5 .62)" 1600 74
img img-020 hero-wide-1120 "$(rc 1600 1200 16 9 .5 .62)" 1120 72
img img-020 hero-tall-960  "$(rc 1600 1200 4 5 .1 .5)" 960 74     # phone: the hammock, the trunk and the lawn
img img-020 hero-tall-720  "$(rc 1600 1200 4 5 .1 .5)" 720 72

# ---- garden floor: ground-floor rooms at 4:5 (#26), never above native
p45() { img "$1" "r45-$1" "$(rc "$2" "$3" 4 5 "${4:-.5}" .5)" 900 72; }
p45 img-029 1440 1434; p45 img-032 1600 1388 .55; p45 img-030 1080 804; p45 img-043 1600 1200; p45 img-028 1049 1000

# ---- upstairs: the King Room, 3:2
p32() { local c; c=$(rc "$2" "$3" 3 2 .5 "${4:-.5}"); img "$1" "k32-$1-1440" "$c" 1440 72; img "$1" "k32-$1-900" "$c" 900 70; }
p32 img-002 1600 1200; p32 img-010 1600 1200; p32 img-015 1280 960; p32 img-025 1200 1600 .62
p32 img-034 1600 1200; p32 img-008 1600 1200

# ---- roof: 4:5
img img-021 roof-021 "$(rc 1200 1600 4 5 .5 .45)" 640 74
img img-022 roof-022 "$(rc 1199 1600 4 5 .5 .55)" 640 74
img img-004 roof-004 "$(rc 1199 1600 4 5 .5 .5)" 640 74

# ---- in the garden: img-001 (the blue table) at 3:2; the porch print img-032 at 4:5
img img-001 table-1280 "$(rc 1280 960 3 2 .5 .6)" 1280 74
img img-001 table-800  "$(rc 1280 960 3 2 .5 .6)" 800 72
img img-032 porch-720 "1040:1300:470:88" 720 74

ls -la "$D/img" | awk '{s+=$5} END {print "total bytes", s}'
