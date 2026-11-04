#!/usr/bin/env bash
# Every image of the Coconut Surf Inn interactive mockup ("Under the thatch", designer 0.7.1, station 4e),
# made from the business's own Booking.com property uploads in
# dossier/coconut-surf-inn-guest-house-and-restaurant/assets (tools/setup.sh / tools/link-assets.sh first),
# plus the hero's hand-painted depth map, drawn from shapes by src/paint-depth.py.
# Needs ffmpeg, cwebp and python3. Run from anywhere.
# Crops only, scaled down never up; nothing is shown wider than its source. No video (none usable).
# media: sites/coconut-surf-inn-guest-house-and-restaurant/mockups/interactive/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/coconut-surf-inn-guest-house-and-restaurant/assets
M=sites/coconut-surf-inn-guest-house-and-restaurant/mockups/interactive
D=$M/dist
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
dims() { ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$A/$1.jpg" | tr , ' '; }
rc() { # <asset> rw rh fx fy -> w:h:x:y, the largest rw:rh box positioned by fractions
  python3 -c '
import sys
W,H=map(float,sys.argv[1].split()); rw,rh,fx,fy=map(float,sys.argv[2:])
if W/H>rw/rh: h=H; w=round(H*rw/rh)
else: w=W; h=round(W*rh/rw)
w-=w%2; h-=h%2
print(f"{int(w)}:{int(h)}:{int((W-w)*fx)}:{int((H-h)*fy)}")' "$(dims "$1")" "$2" "$3" "$4" "$5"
}
cut() { # cut <asset> <ratio-tag> rw rh fx fy <width...>: one crop, several widths
  local a=$1 tag=$2 rw=$3 rh=$4 fx=$5 fy=$6; shift 6; local c; c=$(rc "$a" "$rw" "$rh" "$fx" "$fy")
  for w in "$@"; do img "$a" "$tag-$a-$w" "$c" "$w"; done
}

# ---- first screen: img-102, under the thatch (1920x1440). The shader reads the same files.
HW=1920:1080:0:120     # desktop 16:9: the whole thatch fringe, both pillars, the swing, the sea
HT=1152:1440:40:0      # phone 4:5: the left pillar, the palms and the sea, the fringe across the top
img img-102 hero-wide-1920 "$HW" 1920 70
img img-102 hero-wide-1440 "$HW" 1440 70
img img-102 hero-tall-1152 "$HT" 1152 68
img img-102 hero-tall-864  "$HT" 864 68
# the depth map, painted at a quarter of the original and cropped exactly as the photographs
python3 "$M/src/paint-depth.py" "$T/depth.pgm"
ff -i "$T/depth.pgm" -vf "crop=480:270:0:30" -pix_fmt gray "$D/img/depth-wide.png"
ff -i "$T/depth.pgm" -vf "crop=288:360:10:0" -pix_fmt gray "$D/img/depth-tall.png"

# ---- rooms: every gallery at 4:3 (one ratio for the stage), last slide the bathroom
r43() { cut "$1" r43 4 3 .5 "${2:-.5}" 1200 720; }
for a in img-076:.55 img-073:.6 img-079:.55 img-068:.6 img-077:.55 img-074:.5 \
         img-035:.5 img-034:.5 img-037:.5 img-030:.5 img-017:.55 img-064:.6 \
         img-040:.5 img-036:.5 img-038:.5 img-053:.7 \
         img-031:.6 img-045:.6 img-022:.55 img-027:.5 img-089:.7 \
         img-047:.5 img-046:.5 img-048:.55 img-049:.5 \
         img-056:.5 img-057:.5 img-059:.5 img-061:.6; do r43 "${a%%:*}" "${a##*:}"; done

# ---- inside the house: the light-well at 3:2; the verandas at 4:5 for the swipe row
cut img-007 r32 3 2 .5 .5 1440 900
for a in img-030 img-017 img-024 img-020 img-005 img-016; do cut "$a" r45 4 5 .5 .5 720; done

# ---- on the roof: img-104 at 16:9; the slideshow at 3:2
cut img-104 r169 16 9 .5 .45 1440 900
cut img-100 r32 3 2 .5 .5 1200 800
cut img-101 r32 3 2 .5 .5 1200 800
cut img-015 r32 3 2 .5 .55 1200 800

# ---- sunset: img-008 as a full-bleed band (16:9 desktop, 4:5 phone); img-095 as a 3:2 print
cut img-008 r169 16 9 .5 .55 1920 1280
cut img-008 r45 4 5 .5 .5 900
cut img-095 r32 3 2 .5 .5 1200 800

# ---- the restaurant: img-106 at 4:5; img-099, the house at night, at 21:9
cut img-106 r45 4 5 .45 .5 1152 720
cut img-099 r219 21 9 .5 .5 1920 1280

ls -la "$D/img" | awk '{s+=$5} END {print "total bytes", s}'
