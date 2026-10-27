#!/usr/bin/env bash
# Every image and video of the Cheeky Monkey unique mockup ("Pick your board"), from the
# business-owned dossier assets (dossier/cheeky-monkey/assets, index.json licence: business-owned).
# dist/video is a link into the media store (same as tools/link-assets.sh does), made below.
# Needs ffmpeg (libvpx-vp9, libx264), cwebp, python3 (arithmetic only).
# media: sites/cheeky-monkey/mockups/unique/dist/img/**
# media: sites/cheeky-monkey/mockups/unique/dist/video/**
# stock-003 (dist/img/stock-003.jpg) is the CC BY-SA original, copied unchanged from dossier/cheeky-monkey/stock/
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
SLUG=cheeky-monkey
A=dossier/$SLUG/assets
V=$A/video/vid-009-source.mp4          # vid-009, business-owned reel (7 Oct 2026), 1080x1920, 13.33 s
D=sites/$SLUG/mockups/unique/dist
STORE=${ONESHOT_ASSETS:-$HOME/.oneshot/assets}/$SLUG/mockups/unique/video
mkdir -p "$STORE" "$D"
[ -L "$D/video" ] || { [ -d "$D/video" ] && cp -an "$D/video/." "$STORE/" && rm -r "$D/video"; ln -s "$STORE" "$D/video"; }
rm -rf "$D/img"; mkdir -p "$D/img"
T=${TMPDIR:-/tmp}/cm-unique; rm -rf "$T"; mkdir -p "$T"
ff() { ffmpeg -v error -y "$@"; }

# img <id> <out> <ratio w:h | 0 = keep> <max width> <quality> [focus x 0..1] [focus y 0..1]
# Centre-weighted crop to one ratio, downscale only (never up), WebP.
img() {
  local src="$A/$1.jpg" out="$D/img/$2.webp" ratio=$3 maxw=$4 q=$5 fx=${6:-0.5} fy=${7:-0.5}
  local W H; read -r W H < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$src" | tr ',' ' ')
  local vf; vf=$(python3 - "$W" "$H" "$ratio" "$maxw" "$fx" "$fy" <<'PY'
import sys
W,H=int(sys.argv[1]),int(sys.argv[2]); ratio=sys.argv[3]; mw=int(sys.argv[4]); fx,fy=float(sys.argv[5]),float(sys.argv[6])
w,h=W,H
if ratio!='0':
    a,b=map(float,ratio.split(':')); r=a/b
    if W/H>r: w,h=round(H*r),H
    else: w,h=W,round(W/r)
x=min(max(round(fx*W-w/2),0),W-w); y=min(max(round(fy*H-h/2),0),H-h)
ow=min(mw,w); oh=round(h*ow/w); oh-=oh%2
print(f"crop={w}:{h}:{x}:{y},scale={ow}:{oh}:flags=lanczos")
PY
)
  ff -i "$src" -vf "$vf" "$T/$2.png"
  cwebp -quiet -q "$q" -m 6 "$T/$2.png" -o "$out"
}
frame() { # <time s> <out> <width> <quality>
  ff -ss "$1" -i "$V" -frames:v 1 -vf "scale=$3:-2:flags=lanczos" "$T/$2.png"
  cwebp -quiet -q "$4" -m 6 "$T/$2.png" -o "$D/img/$2.webp"
}

# ---------- the board window: vid-009, the dossier's clean cut 3.0-13.0 s (caption ends ~2.8 s)
# poster = the cut's first frame (white Rockwell beside the magenta board), so poster and loop match
frame 3.0 board-poster-720 720 74
frame 3.0 board-poster-1080 1080 72
# closing bookend: the rainbow rail with the hand, 12.8 s
frame 12.8 board-rail 600 76
# loops: phone/board 720x1280, desktop zoom 1080x1920 (never upscaled), no audio, faststart
cut() { # <width> <vp9 kbps> <h264 kbps>
  ff -ss 3.0 -t 10.0 -i "$V" -vf "scale=$1:-2:flags=lanczos,fps=30" -an -c:v libvpx-vp9 -b:v "$2k" -maxrate "$(( $2 * 3 / 2 ))k" -bufsize "$(( $2 * 2 ))k" -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p "$D/video/board-$1.webm"
  ff -ss 3.0 -t 10.0 -i "$V" -vf "scale=$1:-2:flags=lanczos,fps=30" -an -c:v libx264 -preset slow -b:v "$3k" -maxrate "$(( $3 * 3 / 2 ))k" -bufsize "$(( $3 * 2 ))k" -pix_fmt yuv420p -movflags +faststart "$D/video/board-$1.mp4"
}
[ -s "$D/video/board-1080.mp4" ] && [ -z "${REDO_VIDEO:-}" ] || { cut 720 1300 1450; cut 1080 2300 2800; }

# ---------- surf-week cards: board-shaped crops (mask in CSS), 3:5
img img-149 card-img-149 3:5 560 76 0.5 0.5    # surf lesson on the sand (round 7: img-100/103 moved to the beach section)
img img-135 card-img-135 3:5 560 76 0.5 0.5    # surfers heading out with their boards
img img-137 card-img-137 3:5 560 76 0.55 0.5   # rooftop yoga at sunset
img img-096 card-img-096 3:5 560 76 0.5 0.5    # lilac and mint fish on the stand

# ---------- rooms: one ratio for every slide (3:2), tagged per room in dossier images[].room
for i in 030 014 021 016 033 026 058 041 045 050 053 002 004 009 013 035 034 036 037 064 063 065 070; do
  img img-$i room-img-$i 3:2 1100 72 0.5 0.55
done

# ---------- round 7, the beach and surf section: the business's own water photographs
img img-100 beach-img-100 5:8 1000 76 0.47 0.6   # a surfer walking into the sea with his board
img img-103 beach-img-103 3:2 1400 76 0.55 0.5   # surfer with the yellow fish, facing the waves
img img-155 beach-img-155 0 1600 76              # surfers wading in, owner's alt "on the midigama beach" (kept whole, 1920x844)
# ---------- round 7, Midigama atmosphere: stock-003, CC BY-SA 3.0, modify:false. Copied byte for byte: no crop, no resize, no re-encode.
cp "dossier/$SLUG/stock/stock-003.jpg" "$D/img/stock-003.jpg"
cmp "dossier/$SLUG/stock/stock-003.jpg" "$D/img/stock-003.jpg"

# ---------- the shop: masonry, each picture keeps its own shape
img img-109 shop-img-109 0 900 74
img img-146 shop-img-146 0 700 74
img img-108 shop-img-108 0 900 74
img img-116 shop-img-116 0 640 74
img img-112 shop-img-112 1035:1180 640 74 0.5 0   # crops off the avatar badge in the bottom corner
img img-131 shop-img-131 0 700 74
img img-087 shop-img-087 0 700 74

# ---------- the roof: img-134 band (desktop 16:9 at its own 1500 px, phone 4:5), img-078 4:5
img img-134 roof-img-134-d 16:9 1500 74 0.5 0.62
img img-134 roof-img-134-m 4:5 900 74 0.5 0.6
img img-078 roof-img-078 4:5 800 76

# ---------- Baba (img-141 4:5) and the earlier shop front as a small print (img-121 3:2)
img img-141 baba-img-141 4:5 900 76 0.5 0.45
img img-121 baba-img-121 3:2 640 76 0.5 0.6

# ---------- back on the road: today's front with the red tuk-tuk
img img-082 road-img-082 4:5 900 76 0.5 0.6

# ---------- Instagram tiles, square
for i in 105 085 099 089 013; do img img-$i ig-img-$i 1:1 480 72; done

rm -rf "$T"
ls -la "$D/img" "$D/video/" | awk '{print $5, $9}'
