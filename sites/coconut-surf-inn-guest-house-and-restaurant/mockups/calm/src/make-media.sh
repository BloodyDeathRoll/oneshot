#!/usr/bin/env bash
# Every image of the Coconut Surf Inn calm mockup ("The view from the roof", designer 0.7.1, station 4e),
# made from the business's own Booking.com / Airbnb uploads in
# dossier/coconut-surf-inn-guest-house-and-restaurant/assets (tools/setup.sh / tools/link-assets.sh first).
# Needs ffmpeg and cwebp. Run from anywhere. Crops only, scaled down never up: nothing is drawn wider
# than its source. No video (none of the three dossier clips is usable, concepts §2).
# media: sites/coconut-surf-inn-guest-house-and-restaurant/mockups/calm/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/coconut-surf-inn-guest-house-and-restaurant/assets
D=sites/coconut-surf-inn-guest-house-and-restaurant/mockups/calm/dist
mkdir -p "$D/img"; rm -f "$D"/img/*
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# img <asset> <out-name> <crop w:h:x:y or -> <max width> [quality] [extra vf]
img() {
  local src="$A/$1.jpg" out="$D/img/$2.webp" crop="$3" w="$4" q="${5:-72}" extra="${6:-}" vf=""
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

# ---- first screen: img-009, the view from the roof (1920x1440).
# Desktop 16:9, y 120-1200: the horizon on the lower third, cut above the shack's tin roof (concepts §4.1).
# Phone: 1600x1280 from the top-left (just above the tin roof), wide enough for the one-time pan from the left palms to the reef.
LIFT="curves=all='0/0.02 0.35/0.37 1/1'"     # a light lift of the shade under the palms, no tint
img img-009 hero-1920 "1920:1080:0:120" 1920 70 "$LIFT"
img img-009 hero-1280 "1920:1080:0:120" 1280 70 "$LIFT"
img img-009 hero-m    "1600:1280:0:0"   1600 76 "$LIFT"

# ---- rooms: 4:5 centre crops (references #26), at most 960 wide, never above native
p45() { img "$1" "r-$1" "$(rc "$2" "$3" 4 5 "${4:-.5}" "${5:-.5}")" 960 70; }
for a in img-076 img-073 img-079 img-068 img-077 img-074; do p45 $a 1440 1920; done   # Deluxe with Balcony
p45 img-035 1920 1440; p45 img-034 1920 1440 .6; p45 img-037 1920 1440 .4; p45 img-030 1600 1066 .35
p45 img-017 1066 1600; p45 img-064 1440 1920                                          # Superior
p45 img-040 1920 1440 .55; p45 img-036 1600 1067 .45; p45 img-038 1600 1066; p45 img-053 1066 1600   # Deluxe 2 + 1
for a in img-031 img-045 img-022 img-027 img-089; do p45 $a 1440 1920; done           # Deluxe Family
p45 img-047 1920 1440 .3; p45 img-046 1920 1440; p45 img-048 1440 1920; p45 img-049 1920 1440   # Budget Double
p45 img-056 1920 1440 .3; p45 img-057 1920 1440 .45; p45 img-059 1920 1440 .45; p45 img-061 1440 1920  # Budget Single

# ---- inside the house: img-007 at 3:2 (1600 native), then a 3-up row of 4:5 crops
img img-007 court-1400 - 1400 72
img img-007 court-800  - 800 72
q45() { img "$1" "q-$1" "$(rc "$2" "$3" 4 5 "${4:-.5}" "${5:-.5}")" 640 72; }
q45 img-006 1066 1600 .5 .6; q45 img-030 1600 1066 .3; q45 img-003 1066 1600

# ---- the afternoon: img-103 full-bleed 21:9 (1920x823 from y 300), 4:5 on the phone; img-015 4:5, img-101 3:2
img img-103 roof-1920 "1920:822:0:300" 1920 70
img img-103 roof-1280 "1920:822:0:300" 1280 70
img img-103 roof-m    "$(rc 1920 1440 4 5 .42 .5)" 900 68
img img-015 reader-720 "$(rc 1440 1920 4 5 .5 .45)" 720 72
img img-101 swing-1000 "$(rc 1920 1440 3 2 .5 .45)" 1000 72

# ---- sunset: img-008 at 4:5, img-095 at 3:2
img img-008 sunset-840 "$(rc 1920 1434 4 5 .55 .5)" 840 72
img img-095 turtles-1280 "$(rc 1920 1434 3 2 .5 .5)" 1280 70

# ---- until 22:00: the restaurant, 3:2 slideshow
for a in img-105 img-106 img-107 img-104; do img $a "eat-$a" "$(rc 1920 1440 3 2 .5 .55)" 1400 70; done

ls -la "$D/img" | awk '{s+=$5} END {print "total bytes", s}'
