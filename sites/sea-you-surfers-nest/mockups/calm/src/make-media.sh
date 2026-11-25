#!/usr/bin/env bash
# Every image of the Sea You Surfers Nest calm mockup ("The board rack", designer 0.7.1, station 4e),
# made from the business's own Booking.com property uploads in dossier/sea-you-surfers-nest/assets
# (tools/setup.sh / tools/link-assets.sh first). Needs ffmpeg and cwebp. Run from anywhere.
# Crops only, scaled down never up; nothing is drawn wider than its source. No video (none exists).
# media: sites/sea-you-surfers-nest/mockups/calm/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/sea-you-surfers-nest/assets
D=sites/sea-you-surfers-nest/mockups/calm/dist
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
rc() { # W H rw rh fx fy -> w:h:x:y, the largest rw:rh box placed by fractions of the slack
  python3 -c '
import sys
W,H,rw,rh,fx,fy=map(float,sys.argv[1:])
if W/H>rw/rh: h=H; w=round(H*rw/rh)
else: w=W; h=round(W*rh/rw)
w-=w%2; h-=h%2
print(f"{int(w)}:{int(h)}:{int((W-w)*fx)}:{int((H-h)*fy)}")' "$@"
}

LIFT="curves=all='0/0.03 0.5/0.51 1/1'"   # the concept's 3 % lift in the shadows, no tint

# ---- first screen, desktop: img-004, the veranda lounge with the three boards (2000x1333), 16:9 from y 104.
# 4f round 1 (visual critic): the two red fire extinguishers by the pillar (x 1155-1245, y 500-920) were the loudest
# thing on the screen. They sit behind the plant, so they cannot be cropped out without losing the boards, and they
# are not removed: only their red is taken down to grey in that box (a local colour grade; nothing is painted out).
EXT="[0]split[a][b];[b]crop=90:420:1155:500,huesaturation=saturation=-1:colors=r+m:strength=4,eq=brightness=0.03[r];[a][r]overlay=1155:500"
imgx() { # img with a filter-complex pre-step on the source: <asset> <out> <crop> <w> <q>
  ff -i "$A/$1.jpg" -filter_complex "$EXT,crop=$3,scale='min($4,iw)':-2:flags=lanczos,$LIFT" "$T/x.png"
  cwebp -quiet -q "$5" -m 6 -sharp_yuv "$T/x.png" -o "$D/img/$2.webp"
}
imgx img-004 hero-img-004-1920 "2000:1125:0:104" 1920 70
imgx img-004 hero-img-004-1280 "2000:1125:0:104" 1280 70
# ---- first screen, phone: img-034, the rack close up (1333x2000), 1:2 from x 220 (the extinguishers fall out)
img img-034 hero-img-034-900 "1000:2000:220:0" 900 68 "$LIFT"
img img-034 hero-img-034-600 "1000:2000:220:0" 600 68 "$LIFT"

# ---- the rooms: 3:2 dot slideshows at full container width (4f round 1), portraits centre-cropped (#26):
# 1600 wide (a portrait's 3:2 crop stops at its native 1333), 1080 and 720 for phones
s32() { local c; c=$(rc "$2" "$3" 3 2 .5 "${4:-.5}")
  img "$1" "room-$1-1600" "$c" 1600 68; img "$1" "room-$1-1080" "$c" 1080 68; img "$1" "room-$1-720" "$c" 720 66; }
# Deluxe Double Room (Booking.com's tags): img-002, 015, 012, 022, 033, 032
s32 img-002 2000 1333; s32 img-015 2000 1333; s32 img-012 2000 1333; s32 img-022 2000 1333
s32 img-033 1333 2000 .62; s32 img-032 1333 2000 .5
# Standard Double Room (Booking.com's tags, minus its two bathroom pictures: see notes.md conflicts)
s32 img-009 2000 1127; s32 img-026 1333 2000 .62; s32 img-005 1333 2000 .6; s32 img-025 1333 2000 .58

# ---- around the courtyard: img-071 (1920x1081) as a low strip (4f round 1: the 2:1 band was a screen of grey
# wall), 1600x560 from x 40 (the red extinguishers at the right edge stay out), y 440 (bench, cushion, plants);
# img-003 and img-045 at 4:5, centre
img img-071 court-img-071-1600 "1600:560:40:440" 1600 70
img img-071 court-img-071-800  "1600:560:40:440" 800 68
img img-003 balc-img-003-800 "1066:1333:467:0" 800 70
img img-045 balc-img-045-800 "1066:1333:467:0" 800 70

# ---- carved doors and the surfboard shower: three 2:3 prints, native frame
for a in img-027 img-035 img-036; do img "$a" "print-$a-640" - 640 72; done
# ---- finding the house: the sign, 2:3 native
img img-001 sign-img-001-720 - 720 74

# ---- closing: img-002 at 21:9 (2000x857 from y 120, the white wall and the pillows); on phones a 4:3
img img-002 close-img-002-1600 "2000:857:0:120" 1600 70
img img-002 close-img-002-800  "1778:1333:222:0" 800 68

ls -la "$D/img" | awk '{s+=$5} END {print "total bytes", s}'
