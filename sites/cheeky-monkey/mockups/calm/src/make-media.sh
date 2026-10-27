#!/usr/bin/env bash
# Every image, video and font of the cheeky-monkey calm mockup ("The signboard", designer 0.7.0,
# station 4e), made from the business's own files in dossier/cheeky-monkey/assets
# (tools/setup.sh / tools/link-assets.sh first). Needs ffmpeg (libx264, libvpx-vp9) and cwebp.
# Run from anywhere; rerun after changing a crop or a cut. Nothing is ever shown wider than its source.
# media: sites/cheeky-monkey/mockups/calm/dist/img/**
# media: sites/cheeky-monkey/mockups/calm/dist/video/**
# media: sites/cheeky-monkey/mockups/calm/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/cheeky-monkey/assets
D=sites/cheeky-monkey/mockups/calm/dist
mkdir -p "$D/img" "$D/video" "$D/fonts"
rm -f "$D"/img/* "$D"/video/* "$D"/fonts/*
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# img <asset> <out-name> <crop w:h:x:y in source px, or "-"> <out width> [quality] [extra vf]
# Crop, scale down (never up), light shadow lift where asked, WebP via cwebp.
img() {
  local src="$A/$1.jpg" out="$D/img/$2.webp" crop="$3" w="$4" q="${5:-74}" extra="${6:-}"
  local vf=""
  [ "$crop" != "-" ] && vf="crop=$crop,"
  vf="${vf}scale='min($w,iw)':-2:flags=lanczos${extra:+,$extra}"
  ff -i "$src" -vf "$vf" "$T/x.png"
  cwebp -quiet -q "$q" -m 6 -sharp_yuv "$T/x.png" -o "$out"
}
# crop helpers: ratio crops from a source of W x H, positioned by fractions fx, fy (0..1)
rc() { # W H rw rh fx fy -> w:h:x:y (largest rw:rh box)
  python3 - "$@" <<'PY'
import sys
W,H,rw,rh,fx,fy=map(float,sys.argv[1:])
if W/H > rw/rh: h=H; w=round(H*rw/rh)
else: w=W; h=round(W*rh/rw)
w-=w%2; h-=h%2
print(f"{int(w)}:{int(h)}:{int((W-w)*fx)}:{int((H-h)*fy)}")
PY
}

# ---- hero: img-147 (2000x1868), the main road framed by board noses. 5% shadow lift, no tint.
LIFT="curves=all='0/0.05 0.5/0.52 1/1'"
img img-147 hero-wide-1920 "2000:1400:0:340" 1920 72 "$LIFT"   # desktop: wide band, object-fit picks the 16:10/16:9 window
img img-147 hero-wide-1280 "2000:1400:0:340" 1280 72 "$LIFT"
img img-147 hero-tall-828  "$(rc 2000 1868 4 5 .5 .5)" 828 72 "$LIFT"   # phone: 4:5 from the centre (#26)
img img-147 hero-tall-1200 "$(rc 2000 1868 4 5 .5 .5)" 1200 72 "$LIFT"

# ---- the counter has no photograph (inclusions need no pictures)

# ---- upstairs: five rooms, 3:2 crops that keep the bed and the mural (1440 / 720 wide)
room() { # asset W H fy
  local c; c=$(rc "$2" "$3" 3 2 .5 "$4")
  img "$1" "room-$1-1440" "$c" 1440 72; img "$1" "room-$1-720" "$c" 720 70; }
room img-030 1600 1200 .5;  room img-014 1200 1600 .30; room img-021 1200 1600 .45
room img-016 1600 1200 .5;  room img-033 1200 1600 .55; room img-026 1440 1920 .45
room img-058 1440 1920 .40; room img-041 1440 1920 .55; room img-045 1920 1440 .5
room img-050 1440 1920 .45; room img-053 1440 1920 .45
room img-002 1440 1920 .55; room img-004 1920 1440 .5;  room img-009 1440 1920 .55; room img-013 1920 1280 .5
room img-035 1920 1440 .5;  room img-034 1440 1920 .55; room img-036 1600 1200 .5;  room img-037 1440 1920 .6
room img-064 1920 1440 .5;  room img-063 1440 1920 .6;  room img-065 1440 1920 .55; room img-070 1200 1600 .5

# ---- the wall of boards: img-122 at 4:5 (the hand-painted list), three square shop crops
img img-122 sign-1200 "$(rc 1733 2000 4 5 .5 .5)" 1200 74
img img-122 sign-700  "$(rc 1733 2000 4 5 .5 .5)" 700 72
img img-108 sq-fins   "$(rc 1800 1200 1 1 .5 .5)" 720 74
img img-146 sq-rack   "$(rc 1326 2000 1 1 .5 .62)" 720 74
img img-096 sq-fish   "$(rc 1500 2000 1 1 .5 .62)" 720 74

# vid-009 (business-owned reel): the dossier's clean cut 3.0-13.0 s, 9:16, sized for a 320-360 CSS px card
ff -ss 3 -t 10 -i "$A/video/vid-009-source.mp4" -vf "scale=720:-2:flags=lanczos,fps=30" -an \
   -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$D/video/boards-720.webm"
ff -ss 3 -t 10 -i "$A/video/vid-009-source.mp4" -vf "scale=720:-2:flags=lanczos,fps=30" -an \
   -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart "$D/video/boards-720.mp4"
# poster = the first frame of the cut, so nothing jumps when the clip starts
ff -ss 3 -i "$A/video/vid-009-source.mp4" -frames:v 1 -vf "scale=720:-2:flags=lanczos" "$T/p.png"
cwebp -quiet -q 74 -m 6 "$T/p.png" -o "$D/video/boards-poster.webp"

# ---- the roof: img-137 (1864x2000), 21:9 band desktop / 4:5 phone
img img-137 roof-wide-1864 "$(rc 1864 2000 21 9 .5 0)" 1864 72
img img-137 roof-tall-828  "$(rc 1864 2000 4 5 .5 .5)" 828 72

# ---- Baba: img-141 at 4:5; img-121 (the earlier shop front) as a small 3:2 print
img img-141 baba-900  "$(rc 1500 2000 4 5 .5 .35)" 900 74
img img-121 oldfront-720 "$(rc 1937 2000 3 2 .5 .55)" 720 74

# ---- closing: img-103 (2000x1333), 21:9 desktop / 4:5 phone
img img-103 closing-wide-1920 "$(rc 2000 1333 21 9 .5 .55)" 1920 72
img img-103 closing-tall-828  "$(rc 2000 1333 4 5 .5 .5)" 828 72

# ---- Instagram: six 1:1 tiles
img img-146 ig-146 "$(rc 1326 2000 1 1 .5 .5)" 480 72
img img-134 ig-134 "$(rc 1500 2000 1 1 .5 .6)" 480 72
img img-108 ig-108 "$(rc 1800 1200 1 1 .5 .5)" 480 72
img img-099 ig-099 "$(rc 1500 2000 1 1 .5 .6)" 480 72
img img-085 ig-085 "$(rc 1920 1238 1 1 .45 .5)" 480 72
img img-105 ig-105 "$(rc 2000 1333 1 1 .5 .5)" 480 72

# ---- fonts (OFL), self-hosted Latin subsets: Albert Sans 400/600 (text), Yellowtail 400 (titles)
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
curl -fsS -A "$UA" 'https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;600&family=Yellowtail&display=swap' > "$T/f.css"
python3 - "$T/f.css" "$D/fonts" <<'PY'
import re, sys, urllib.request
css, out = open(sys.argv[1]).read(), sys.argv[2]
seen = set()
for sub, block in re.findall(r"/\* ([\w-]+) \*/\s*@font-face \{([^}]*)\}", css):
    if sub != 'latin': continue
    fam = re.search(r"font-family: '([^']+)'", block).group(1).lower().replace(' ', '-')
    w = re.search(r'font-weight: (\d+)', block).group(1)
    url = re.search(r'url\((https://[^)]+\.woff2)\)', block).group(1)
    if url in seen: continue   # Albert Sans is one variable file for both weights
    seen.add(url); urllib.request.urlretrieve(url, f'{out}/{fam}-{w}.woff2')
PY
ls -la "$D/img" "$D/video" "$D/fonts" | awk '{s+=$5} END {print "total bytes", s}'
