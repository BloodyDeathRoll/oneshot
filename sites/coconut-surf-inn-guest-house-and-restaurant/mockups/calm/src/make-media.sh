#!/usr/bin/env bash
# Every image of the Coconut Surf Inn calm mockup ("The view from the roof", designer 0.7.1, station 4e, round 2),
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

# ---- first screen: img-009, the view from the roof (1920x1440). Round 2 (4f round 1):
# Desktop is the SKY composition: 1810x1018 from the very top, so the bottom edge sits on the sea and the reef
# whitewater, above the blue tarp, the tin roof, the wires and the poles (all below y 1025). The open blue sky
# carries the title; this is what makes calm's first screen differ from unique's (white top, palms-to-green).
# Phone: 1400x1090 from the top-left, the same cut line, wide enough for the one-time pan that ends on the reef.
# A light shadow lift and +6% contrast / +10% saturation on the flat sky (a grade, not a tint).
GRADE="eq=contrast=1.06:saturation=1.10,curves=all='0/0.02 0.35/0.37 1/1'"
img img-009 hero-d    "1810:1018:40:0" 1810 72 "$GRADE"
img img-009 hero-1280 "1810:1018:40:0" 1280 70 "$GRADE"
img img-009 hero-m    "1400:1090:0:0"  1400 70 "$GRADE"
# tiny placeholders of the same crops, inlined by build.py as the hero's own background (never a flat box on a slow load)
img img-009 hero-d-lq "1810:1018:40:0" 40 40 "$GRADE,gblur=sigma=1"
img img-009 hero-m-lq "1400:1090:0:0"  40 40 "$GRADE,gblur=sigma=1"

# ---- rooms: each photo scaled so its short side is <= 720 (never up); CSS crops 4:5 (desktop, fan rooms) or 3:2
# (A/C rooms on the phone). The lead of each room is its best wide frame, not a bed close-up (4f round 1).
rimg() { local w h; read w h < <(python3 -c "import sys;W,H=map(int,sys.argv[1:]);s=min(1,720/min(W,H));print(round(W*s)//2*2,round(H*s)//2*2)" "$2" "$3")
       img "$1" "r-$1" - "$w" 68; }
for a in img-068 img-076 img-073 img-079 img-077 img-074; do rimg $a 1440 1920; done          # Deluxe with Balcony
rimg img-030 1600 1066; rimg img-035 1920 1440; rimg img-034 1920 1440; rimg img-037 1920 1440
rimg img-017 1066 1600; rimg img-064 1440 1920                                                  # Superior
rimg img-040 1920 1440; rimg img-036 1600 1067; rimg img-038 1600 1066; rimg img-053 1066 1600      # Deluxe 2 + 1
for a in img-045 img-031 img-022 img-027; do rimg $a 1440 1920; done                          # Deluxe Family (img-089 dropped: no room in the dossier)
rimg img-046 1920 1440; rimg img-048 1440 1920; rimg img-049 1920 1440; rimg img-047 1920 1440      # Budget Double
rimg img-056 1920 1440; rimg img-057 1920 1440; rimg img-059 1920 1440; rimg img-061 1440 1920      # Budget Single

# ---- inside the house: img-007 at 3:2 (1600 native), then a 3-up row of 4:5 crops
img img-007 court-1400 - 1400 72
img img-007 court-800  - 800 72
q45() { img "$1" "q-$1" "$(rc "$2" "$3" 4 5 "${4:-.5}" "${5:-.5}")" 640 72; }
q45 img-006 1066 1600 .5 .6; q45 img-016 1440 1920 .5 .6; q45 img-003 1066 1600

# ---- the afternoon: img-103 full-bleed 21:9 (1920x822 from y 340: the whole hammock, the thatch fringe, the sea);
# 4:5 on the phone; img-015 4:5, img-101 3:2
img img-103 roof-1920 "1920:822:0:340" 1920 70
img img-103 roof-1280 "1920:822:0:340" 1280 70
img img-103 roof-m    "$(rc 1920 1440 4 5 .42 .5)" 900 68
img img-015 reader-720 "$(rc 1440 1920 4 5 .5 .45)" 720 72
img img-101 swing-1000 "$(rc 1920 1440 3 2 .5 .45)" 1000 72

# ---- sunset: img-008 full-bleed (the whole 1920x1434 frame; CSS covers the band, palms kept), 4:5 on the phone;
# img-095 at 3:2
img img-008 sunset-1920 - 1920 70
img img-008 sunset-1280 - 1280 70
img img-008 sunset-m "$(rc 1920 1434 4 5 .5 .5)" 900 70
img img-095 turtles-1280 "$(rc 1920 1434 3 2 .5 .5)" 1280 70

# ---- until 22:00: img-099, the house lit at night, full-bleed 2:1 (1920x960 from the top: the title sits on the black sky) and 4:5 on the phone;
# then the restaurant, a 3:2 slideshow
img img-099 night-1920 "1920:960:0:0" 1920 72
img img-099 night-1280 "1920:960:0:0" 1280 72
img img-099 night-m    "$(rc 1920 1440 4 5 .35 .5)" 900 72
for a in img-105 img-106 img-107 img-104; do img $a "eat-$a" "$(rc 1920 1440 3 2 .5 .55)" 1400 70; done

ls -la "$D/img" | awk '{s+=$5} END {print "total bytes", s}'
