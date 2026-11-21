#!/usr/bin/env bash
# Every image of the Coconut Surf Inn unique mockup ("Round the clock", designer 0.7.1, station 4e), made from
# the business's own Booking.com / Airbnb uploads in dossier/coconut-surf-inn-guest-house-and-restaurant/assets
# (tools/setup.sh / tools/link-assets.sh first). Needs ffmpeg, cwebp and python3. Run from anywhere.
# Crops only, scaled down never up; nothing is shown wider than its source. No video (none usable).
# One adaptation: the first screen uses calm's view-from-the-roof frame and grade (Alon, 2026-11-05: "take the one
# from Calm and put it as the top image for Unique"); every other photo is ungraded.
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

# ---- first screen: img-009, the view from the roof, as calm cuts and grades it (calm/src/make-media.sh, round 3).
# Desktop 1440x810 from (380, 290): the bottom edge stops at y 1100, on the beach under the reef, above the wires
# (y 1110+), the tin roofs and the tarp roof; the horizon sits at ~80%, sea, reef whitewater and green below it.
# Phone 560x1100 from (800, 0): blue sky over the centre palms, down to the reef whitewater at x ~1160, left of the
# poles in the dark trees (x 1373+), bottom edge above the wires. +6% contrast / +10% saturation, as calm.
GRADE="eq=contrast=1.06:saturation=1.10,curves=all='0/0.02 0.35/0.37 1/1'"
hero() { # <crop> <out-name> <width> <quality> [extra vf]
  ff -i "$A/img-009.jpg" -vf "crop=$1,scale='min($3,iw)':-2:flags=lanczos,$GRADE${5:+,$5}" "$T/x.png"
  cwebp -quiet -q "$4" -m 6 -sharp_yuv "$T/x.png" -o "$D/img/$2.webp"
}
hero 1440:810:380:290 hero-img-009-1440 1440 74
hero 1440:810:380:290 hero-img-009-1280 1280 72
hero 560:1100:800:0   hero-img-009-phone-560 560 74
# tiny placeholders of the same crops, inlined by build.py under the photo (never a flat box on a slow load)
hero 1440:810:380:290 hero-img-009-lq 40 40 gblur=sigma=1
hero 560:1100:800:0   hero-img-009-phone-lq 40 40 gblur=sigma=1

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
