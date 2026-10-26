#!/usr/bin/env bash
# Every image and video of the interactive mockup ("The wall of boards", concept 2), from the
# business-owned assets in dossier/cheeky-monkey/assets (tools/link-assets.sh first in a new
# checkout). Needs ffmpeg (libx264, libvpx-vp9) and cwebp. Run from anywhere; rerun after a change.
# media: sites/cheeky-monkey/mockups/interactive/dist/img/**
# media: sites/cheeky-monkey/mockups/interactive/dist/video/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/cheeky-monkey/assets
V=$A/video
D=sites/cheeky-monkey/mockups/interactive/dist
mkdir -p "$D/img" "$D/video"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }
SRC=$V/vid-009-source.mp4          # business-owned reel, 1080x1920, 13.33 s; caption only in the first ~2.8 s
GRADE="eq=contrast=1.04"            # concept: no grade beyond +4% contrast; the shop light is already bright

# ---- loop(offset): the dossier's clean cut (3.0-13.0 s), rotated to start at <offset>, so the loop
# closes without a jump at its own end and the only cut is where 13.0 joins 3.0 again.
loop() { # offset out
  ff -i "$SRC" -filter_complex "[0:v]trim=$1:13,setpts=PTS-STARTPTS[a];[0:v]trim=3:$1,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0,fps=30,$GRADE,format=yuv420p[o]" -map "[o]" -an -c:v libx264 -preset slow -crf 12 "$2"
}

# ---- phone hero: native 9:16, starting on the poster frame (4.0 s: the white Rockwell beside the magenta board)
loop 4.0 "$T/phone.mp4"
ff -i "$T/phone.mp4" -vf scale=720:1280 -an -c:v libx264 -preset slow -b:v 1350k -maxrate 1600k -bufsize 3M -profile:v high -pix_fmt yuv420p -movflags +faststart "$D/video/hero-p720.mp4"
ff -i "$T/phone.mp4" -an -c:v libvpx-vp9 -b:v 1300k -maxrate 1600k -row-mt 1 -deadline good -cpu-used 2 "$D/video/hero-p1080.webm"
ff -i "$T/phone.mp4" -frames:v 1 "$T/poster-p.png"

# ---- desktop hero: the triptych. Three portrait columns of the same reel, started at the three best
# moments (3.3 s rack bar, 6.1 s the hand pulls the orange board, 10.0 s the aisle and the rainbow rails),
# each scaled DOWN from 1080 to 608 wide and cropped to 576x1080, side by side in one 1728x1080 (16:10) file,
# so at 16:10 and 16:9 the columns are exact thirds of the screen (cover crops top and bottom, never the sides):
# one download, one decode, the three columns always in step.
loop 3.3 "$T/c1.mp4"; loop 6.1 "$T/c2.mp4"; loop 10.0 "$T/c3.mp4"
COL="scale=608:1080,crop=576:1080:16:0"
ff -i "$T/c1.mp4" -i "$T/c2.mp4" -i "$T/c3.mp4" -filter_complex "[0:v]$COL[a];[1:v]$COL[b];[2:v]$COL[c];[a][b][c]hstack=inputs=3,format=yuv420p[o]" -map "[o]" -an -c:v libx264 -preset slow -crf 12 "$T/tri.mp4"
ff -i "$T/tri.mp4" -an -c:v libx264 -preset slow -b:v 2900k -maxrate 3300k -bufsize 6M -profile:v high -pix_fmt yuv420p -movflags +faststart "$D/video/hero-tri1728.mp4"
ff -i "$T/tri.mp4" -an -c:v libvpx-vp9 -b:v 2500k -maxrate 3000k -row-mt 1 -deadline good -cpu-used 2 "$D/video/hero-tri1728.webm"
ff -i "$T/tri.mp4" -frames:v 1 "$T/poster-tri.png"

# ---- stills: crop to a ratio around a centre (cx, cy are 0..1 of the slack), never upscale, WebP
crop() { # in out ratio cx cy width quality
  ff -i "$1" -vf "crop=w='min(iw,ih*$3)':h='min(ih,iw/($3))':x='(iw-ow)*$4':y='(ih-oh)*$5',scale='min($6,iw)':-2:flags=lanczos" "$T/c.png"
  cwebp -quiet -q "$7" -m 6 "$T/c.png" -o "$D/img/$2.webp"
}
img() { echo "$A/img-$1.jpg"; }

# hero posters (the LCP images)
cwebp -quiet -q 74 -m 6 -resize 828 0 "$T/poster-p.png" -o "$D/img/poster-p828.webp"
cwebp -quiet -q 74 -m 6 "$T/poster-tri.png" -o "$D/img/poster-tri1728.webp"
cwebp -quiet -q 72 -m 6 -resize 1280 0 "$T/poster-tri.png" -o "$D/img/poster-tri1280.webp"

# the wall of boards: the drag strip, 3:4 portrait crops at one height
for s in "146 0.5 0.5" "096 0.5 0.6" "087 0.5 0.55" "116 0.5 0.5" "131 0.5 0.5" "114 0.5 0.5" "163 0.5 0.5" "109 0.62 0.5"; do set -- $s
  crop "$(img $1)" "strip-$1" 3/4 $2 $3 900 74; done
# the fin wall, a 3:1 band on the row of resin fins (y 530-740 of 1200)
crop "$(img 108)" band-108-1800 3/1 0.5 0.56 1800 74
crop "$(img 108)" band-108-900 3/1 0.5 0.56 900 72
crop "$(img 108)" band-108-p 4/3 0.42 0.5 900 72

# the roof: the golden rooftop bar 4:5, and the yoga slideshow 4:3
crop "$(img 078)" roof-078 4/5 0.5 0.5 1000 74
for s in "137 0.5 0.5" "136 0.5 0.7" "140 0.5 0.92"; do set -- $s
  crop "$(img $1)" "yoga-$1" 4/3 $2 $3 1100 74; done

# Baba, 1:1
crop "$(img 141)" baba-141 1/1 0.5 0.12 900 76

# guests: the beach selfie, 16:9 band (desktop) and 4:5 (phone)
crop "$(img 085)" guests-085-1920 16/9 0.5 0.5 1920 74
crop "$(img 085)" guests-085-960 16/9 0.5 0.5 960 72
crop "$(img 085)" guests-085-p 4/5 0.45 0.5 900 72

# rooms: 4:3 galleries, the mural photo first
for s in "030 0.5 0.5" "014 0.5 0.6" "021 0.5 0.6" "016 0.5 0.5" "033 0.5 0.55" "026 0.5 0.55" \
         "058 0.5 0.5" "041 0.5 0.6" "045 0.5 0.5" "050 0.5 0.5" "053 0.5 0.5" \
         "002 0.5 0.6" "004 0.5 0.5" "009 0.5 0.6" "013 0.5 0.5" \
         "035 0.5 0.5" "034 0.5 0.6" "036 0.5 0.5" "037 0.5 0.6" \
         "064 0.5 0.5" "063 0.5 0.6" "065 0.5 0.6" "070 0.5 0.5"; do set -- $s
  crop "$(img $1)" "room-$1-1200" 4/3 $2 $3 1200 74
  crop "$(img $1)" "room-$1-720" 4/3 $2 $3 720 72; done
# room tiles in the plan panel: the first photo of each room as a small thumb
for s in "030 0.5 0.5" "058 0.5 0.5" "002 0.5 0.6" "035 0.5 0.5" "064 0.5 0.5"; do set -- $s
  crop "$(img $1)" "thumb-$1" 4/3 $2 $3 192 70; done

# Instagram tiles, square
for i in 096 134 146 137 089 107; do crop "$(img $i)" "ig-$i" 1/1 0.5 0.5 480 72; done

du -sh "$D/video" "$D/img"
