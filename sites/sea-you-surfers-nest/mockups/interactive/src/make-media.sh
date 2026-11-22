#!/usr/bin/env bash
# Every image of the Sea You Surfers Nest interactive mockup ("In the palms", designer 0.7.1, station 4e),
# made from the business's own Booking.com / Airbnb property uploads in dossier/sea-you-surfers-nest/assets
# (tools/setup.sh / tools/link-assets.sh first). Needs ffmpeg and cwebp. Run from anywhere.
# Crops only, scaled down never up; nothing is shown wider than its source. No video exists.
# The palm mask is painted here by rule, not by hand in an editor: the parapet line and the pot plant
# were read off img-003 at full size (2000x1333), and the mask ramps from 0 just above the parapet to 1
# 220 px higher, so only the fronds move and the table, chairs, pot and parapet never do.
# media: sites/sea-you-surfers-nest/mockups/interactive/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/sea-you-surfers-nest/assets
D=sites/sea-you-surfers-nest/mockups/interactive/dist
mkdir -p "$D/img"; rm -f "$D"/img/*
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# img <asset> <out-name> <crop w:h:x:y or -> <max width> [quality]
img() {
  local src="$A/$1.jpg" out="$D/img/$2.webp" crop="$3" w="$4" q="${5:-72}" vf=""
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

# ---- first screen: img-003, the mint table on the upstairs balcony in the palms (2000x1333).
# Round 2 (4f): tighter, so the table, the pothos and a deep band of fronds fill the frame and the plastic
# chairs fall mostly out. Desktop 16:9 from x 300 (1400x788): the pothos tops out at 58 % of the height,
# so a title centred both ways sits in the palms. Phone 600x860 from x 650: the palm band is the top half.
# Never upscaled: the outputs stop at the crop's own width.
WIDE=1400:788:300:0; TALL=600:860:650:0

# The palm mask, in img-003's own pixels. Parapet top edge: y = 550 + 0.014 x. The pot plant rises over
# it at x 765-1135, y 460-550: an ellipse kept black. Feathered with a blur. It gates both the grade
# below and the WebGL displacement, so only the fronds change.
ff -f lavfi -i "color=black:s=2000x1333,format=gray" -frames:v 1 \
  -vf "geq=lum='255*clip((550+0.014*X-34-Y)/220,0,1)*clip((pow((X-950)/250,2)+pow((Y-515)/120,2)-1)*1.6,0,1)',gblur=sigma=10" \
  "$T/mask.png"
# The fronds are blown out to near white, so motion in them could not be seen (visual + experience, 4f r1),
# and the round-2 grade was too mild to show on the still (visual, 4f r2). The grade is baked into every
# still made from img-003 here (hero, LCP image, no-WebGL and reduced-motion frame, closing band), and
# the shader samples these same stills, so nothing about the look lives only in WebGL. Inside the fronds:
# a tone curve pulling the highlights down (about -0.7 EV in the mid-tones), more saturation, greener
# mid-tones, local contrast. Its own mask has a short 40 px ramp at the parapet so the grade reaches the
# lower fronds; the shader's mask (above) keeps the long ramp so the parapet never moves.
ff -f lavfi -i "color=black:s=2000x1333,format=gray" -frames:v 1 \
  -vf "geq=lum='255*clip((550+0.014*X-6-Y)/40,0,1)*clip((pow((X-950)/240,2)+pow((Y-515)/112,2)-1)*3,0,1)',gblur=sigma=4" \
  "$T/gmask.png"
ff -i "$A/img-003.jpg" -i "$T/gmask.png" -filter_complex \
  "[0:v]format=gbrp,split[a][b];[b]curves=all='0/0 0.35/0.2 0.7/0.48 1/0.82',eq=contrast=1.2:saturation=1.7,colorbalance=rm=-0.08:gm=0.05:bm=-0.06,unsharp=11:11:1.0[d];[1:v]format=gbrp[m];[a][d][m]maskedmerge,format=rgb24" \
  "$T/g003.png"
G="$T/g003.png"
imgg() { # imgg <out> <crop> <width> [q]: crops of the graded img-003
  ff -i "$G" -vf "crop=$2,scale='min($3,iw)':-2:flags=lanczos" "$T/x.png"
  cwebp -quiet -q "${4:-72}" -m 6 -sharp_yuv "$T/x.png" -o "$D/img/$1.webp"
}
imgg hero-wide-1400 $WIDE 1400 72
imgg hero-wide-1000 $WIDE 1000 70
imgg hero-tall-600  $TALL 600 74
ff -i "$T/mask.png" -vf "crop=$WIDE,scale=700:-2:flags=area,format=gray" "$T/mw.png"
ff -i "$T/mask.png" -vf "crop=$TALL,scale=300:-2:flags=area,format=gray" "$T/mt.png"
cwebp -quiet -q 80 "$T/mw.png" -o "$D/img/mask-wide.webp"
cwebp -quiet -q 80 "$T/mt.png" -o "$D/img/mask-tall.webp"

# ---- around the courtyard opener (round 2's full-bleed change of pace): img-051 (1920x1280), the room
# door under its carved fanlight, the four-poster inside, the masks and the carved shutter. 2:1 from y 80.
img img-051 court-1920 1920:960:0:80 1920 70
img img-051 court-1280 1920:960:0:80 1280 70
img img-051 court-tall-800 1000:1250:120:30 800 72

# ---- seven rooms: the stage, 4:5, photos Booking.com tags to each room type (dossier room_types[].note)
r45() { img "$1" "room-$1" "$(rc "$2" "$3" 4 5 "${4:-.5}" "${5:-.5}")" 880 70; }
# Deluxe Double Room
r45 img-002 2000 1333 .62; r45 img-015 2000 1333 .45; r45 img-012 2000 1333 .5; r45 img-022 2000 1333 .6
r45 img-013 1333 2000 .5 .5; r45 img-033 1333 2000 .5 .6
# Standard Double Room
r45 img-005 1333 2000 .5 .6; r45 img-026 1333 2000 .5 .6; r45 img-009 2000 1127 .5
r45 img-025 1333 2000 .5 .55; r45 img-010 1125 2000 .5 .55

# ---- around the courtyard: the shelf of close-ups, 4:5, 640 w (cards are 320 css px)
s45() { img "$1" "shelf-$1" "$(rc "$2" "$3" 4 5 "${4:-.5}" "${5:-.5}")" 640 70; }
s45 img-071 1920 1081 .42; s45 img-006 2000 1333 0; s45 img-007 2000 1333 .5; s45 img-039 2000 1333 .45
s45 img-041 2000 1333 .25; s45 img-045 2000 1333 .2; s45 img-037 1333 2000 .5 .62; s45 img-038 1333 2000 .5 .55
s45 img-077 1920 1082 .3

# ---- carved doors and a surfboard shower: the board shower as a 2:3 print, the masks 4:5
img img-036 shower-1000 - 1000 72
img img-069 masks-600 1136:1420:0:290 600 72

# ---- finding the house: the sign, 4:5 from y 160
img img-001 sign-840 1333:1666:0:160 840 72

# ---- closing band: the graded img-003 at 21:9 from the top, the palms still here
imgg band-1920 2000:856:0:0 1920 68
imgg band-1280 2000:856:0:0 1280 68

ls -la "$D/img" | awk '{s+=$5} END {print "total bytes", s}'
