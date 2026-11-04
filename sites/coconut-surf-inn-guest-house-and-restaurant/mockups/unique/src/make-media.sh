#!/usr/bin/env bash
# Every image of the Coconut Surf Inn unique mockup ("Round the clock", designer 0.7.1, station 4e), made from
# the business's own Booking.com / Airbnb uploads in dossier/coconut-surf-inn-guest-house-and-restaurant/assets
# (tools/setup.sh / tools/link-assets.sh first). Needs ffmpeg, cwebp and python3. Run from anywhere.
# Crops only, scaled down never up; no colour grading; nothing is shown wider than its source. No video (none usable).
# media: sites/coconut-surf-inn-guest-house-and-restaurant/mockups/unique/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/coconut-surf-inn-guest-house-and-restaurant/assets
D=sites/coconut-surf-inn-guest-house-and-restaurant/mockups/unique/dist
mkdir -p "$D/img"; rm -f "$D"/img/*
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# img <asset-number> <out-name> <crop w:h:x:y or -> <max width> [quality]
img() {
  local src="$A/img-$1.jpg" out="$D/img/$2.webp" crop="$3" w="$4" q="${5:-72}" vf=""
  [ "$crop" != "-" ] && vf="crop=$crop,"
  vf="${vf}scale='min($w,iw)':-2:flags=lanczos"
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

# ---- first screen: img-009, the view from the roof. Desktop 16:9 (1920x1080 native), phone 9:16 on the reef.
img 009 hero-img-009-1920 "1920:1080:0:160" 1920 70
img 009 hero-img-009-1280 "1920:1080:0:160" 1280 70
img 009 hero-img-009-phone "700:1244:520:0" 700 66

size() { ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$A/img-$1.jpg" | tr ',' ' '; }

# ---- the stay, round the clock: five frames, one crop ratio (14:15), at most native size
fr() { local c; c="$(rc $(size "$1") 14 15 "$2" .5)"; img "$1" "clock-img-$1" "$c" 1280 70; img "$1" "clock-img-$1-760" "$c" 760 68; }
fr 103 .30
fr 008 .50
fr 099 .40
fr 105 .62
fr 009 .45

# ---- rooms: every slide 3:2 (house rule 2: one ratio, no padded boxes)
r32() { img "$1" "room-img-$1" "$(rc $(size "$1") 3 2 .5 "${2:-.55}")" 1200 70; }
for n in 076 073 079 068 077 074 035 034 037 017 064 040 036 053 031 045 022 027 047 046 048 049 056 057 059 061; do r32 $n; done

# ---- inside the house: true masonry, each photograph keeps its own ratio
mas() { img "$1" "house-img-$1" - 720 72; }
for n in 006 007 011 030 019 016; do mas $n; done

# ---- getting here: the sign as a matted print, 4:3
img 002 sign-img-002 "840:630:322:252" 840 74

ls -la "$D/img" | awk '{s+=$5} END {print "total bytes", s}'
