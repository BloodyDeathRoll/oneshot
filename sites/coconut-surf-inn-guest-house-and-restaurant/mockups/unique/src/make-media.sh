#!/usr/bin/env bash
# Every image of the Coconut Surf Inn unique mockup ("Round the clock", designer 0.7.1, station 4e), made from
# the business's own Booking.com / Airbnb uploads in dossier/coconut-surf-inn-guest-house-and-restaurant/assets
# (tools/setup.sh / tools/link-assets.sh first). Needs ffmpeg, cwebp and python3. Run from anywhere.
# Crops only, scaled down never up; no colour grading; nothing is shown wider than its source. No video (none usable).
# One adaptation (round 2, the concept's dissolve baked in): the hero's sky fades to the page's white through a
# brightness key, so the palm crowns stay crisp against white; nothing else in the photograph changes.
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

# ---- first screen: img-009, the view from the roof. Desktop 16:9 from y 20 (bottom above the tin roofs, wires and
# tuk-tuks); phone 560x712 on the reef and the sea. sky(): white = max(top ramp, lower ramp x brightness key), so
# the bright sky goes to the page white and the dark palm fronds keep every pixel. Args: crop, top ramp 1->0
# between two rows, lower ramp 1->0 between two rows, key from V lo to V hi (V = max channel), out name, widths.
sky() {
  local E="st(0,max(r(X,Y),max(g(X,Y),b(X,Y))));st(1,clip((ld(0)-$6)/($7-$6),0,1));st(1,ld(1)*ld(1)*(3-2*ld(1)));st(2,clip(($3-Y)/($3-$2),0,1));st(3,clip(($5-Y)/($5-$4),0,1));st(3,ld(3)*ld(3)*(3-2*ld(3)));st(4,max(ld(2),ld(3)*ld(1)))"
  ff -i "$A/img-009.jpg" -vf "crop=$1,format=rgb24,geq=r='$E;r(X,Y)+(255-r(X,Y))*ld(4)':g='$E;g(X,Y)+(255-g(X,Y))*ld(4)':b='$E;b(X,Y)+(255-b(X,Y))*ld(4)'" "$T/sky.png"
  shift 7; local out="$1"; shift
  for w in "$@"; do ff -i "$T/sky.png" -vf "scale='min($w,iw)':-2:flags=lanczos" "$T/x.png"; cwebp -quiet -q 72 -m 6 -sharp_yuv "$T/x.png" -o "$D/img/$out-$w.webp"; done
}
sky 1920:1080:0:20 190 380 690 920 135 185 hero-img-009 1920 1280
sky 560:712:560:430 0 8 290 470 135 185 hero-img-009-phone 560

size() { ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$A/img-$1.jpg" | tr ',' ' '; }

# ---- the stay, round the clock: five frames, one crop ratio (14:15), at most native size
fr() { local c; c="$(rc $(size "$1") 14 15 "$2" .5)"; img "$1" "clock-img-$1" "$c" 1280 70; img "$1" "clock-img-$1-760" "$c" 760 68; }
fr 103 .30
fr 008 .50
fr 099 .40
fr 105 .62
# the break: 14:15 from the top 1150 rows only, so the frame ends above the tin roofs and the tuk-tuks
c=1072:1150:520:0; img 009 clock-img-009 "$c" 1280 70; img 009 clock-img-009-760 "$c" 760 68

# ---- rooms: every slide 3:2 (house rule 2: one ratio, no padded boxes)
r32() { img "$1" "room-img-$1" "$(rc $(size "$1") 3 2 .5 "${2:-.55}")" 1200 70; }
for n in 076 073 079 068 077 074 035 034 037 017 064 040 036 053 031 045 022 027 047 046 048 049 056 057 059 061; do r32 $n; done

# ---- inside the house: true masonry, each photograph keeps its own ratio
mas() { img "$1" "house-img-$1" - 720 72; }
for n in 006 007 011 030 019; do mas $n; done
# img-016 cropped to 2:3 so the three masonry columns end flush (006+007 | 019+011 | 016+030)
img 016 house-img-016 "1280:1920:80:0" 720 72

# ---- getting here: the sign, 4:3
img 002 sign-img-002 "840:630:322:252" 840 74

ls -la "$D/img" | awk '{s+=$5} END {print "total bytes", s}'
