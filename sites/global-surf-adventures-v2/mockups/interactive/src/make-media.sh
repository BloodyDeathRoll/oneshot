#!/usr/bin/env bash
# Every image and video of the interactive mockup ("The ride"), from the business-owned dossier assets.
# Before it: tools/link-assets.sh global-surf-adventures-v2 (dist/video then lives in ~/.oneshot/assets).
# Usage: bash sites/global-surf-adventures-v2/mockups/interactive/src/make-media.sh
# media: sites/global-surf-adventures-v2/mockups/interactive/dist/video/**
# media: sites/global-surf-adventures-v2/mockups/interactive/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/global-surf-adventures-v2/assets
V=$A/video
D=sites/global-surf-adventures-v2/mockups/interactive/dist
mkdir -p "$D/video" "$D/img"
T=${TMPDIR:-/tmp}/gs-v2-interactive; mkdir -p "$T"
ff() { ffmpeg -v error -y "$@"; }
BADGE="crop=1728:972:192:108"   # removes the faint globe badge, top-left (0.9x of 1920, never upscaled)

# ---- the hero: "the ride", vid-003, three real-speed shots, hard cuts, one direction
#   2.52-5.20 tuk-tuk with boards on the coast road | 24.92-27.12 turquoise reef from the air | 27.16-29.68 pool with the palm, top-down
SEG="[0:v]trim=2.52:5.20,setpts=PTS-STARTPTS[a];[0:v]trim=24.92:27.12,setpts=PTS-STARTPTS[b];[0:v]trim=27.16:29.68,setpts=PTS-STARTPTS[c]"
ff -i "$V/vid-003-source.mp4" -filter_complex "$SEG;[a][b][c]concat=n=3:v=1:a=0,fps=25,format=yuv420p,$BADGE[o]" -map "[o]" -an -c:v libx264 -preset slow -crf 14 "$T/ride.mp4"
# phone: 3:4 portrait, cropped per shot so the tuk-tuk and the palm stay in frame
ff -i "$V/vid-003-source.mp4" -filter_complex "$SEG;[a]crop=810:1080:'245+t*130':0[a2];[b]crop=810:1080:555:0[b2];[c]crop=810:1080:520:0[c2];[a2][b2][c2]concat=n=3:v=1:a=0,fps=25,format=yuv420p[o]" -map "[o]" -an -c:v libx264 -preset slow -crf 14 "$T/ride-p.mp4"
ff -i "$T/ride.mp4" -an -c:v libx264 -preset slow -b:v 3400k -maxrate 3800k -bufsize 7M -pix_fmt yuv420p -movflags +faststart "$D/video/ride-d1728.mp4"
ff -i "$T/ride.mp4" -an -c:v libvpx-vp9 -b:v 2800k -maxrate 3400k -row-mt 1 -deadline good -cpu-used 2 "$D/video/ride-d1728.webm"
ff -i "$T/ride.mp4" -vf scale=1280:-2 -an -c:v libx264 -preset slow -b:v 1700k -maxrate 1900k -bufsize 4M -pix_fmt yuv420p -movflags +faststart "$D/video/ride-m1280.mp4"
ff -i "$T/ride-p.mp4" -an -c:v libx264 -preset slow -b:v 1700k -maxrate 2000k -bufsize 4M -pix_fmt yuv420p -movflags +faststart "$D/video/ride-p810.mp4"
ff -i "$T/ride-p.mp4" -an -c:v libvpx-vp9 -b:v 1500k -maxrate 1800k -row-mt 1 -deadline good -cpu-used 2 "$D/video/ride-p810.webm"
# posters: the tuk-tuk with its boards, whole in frame, about 4.6 s into the source (2.1 s into the edit)
ff -ss 2.1 -i "$T/ride.mp4" -frames:v 1 "$T/ride-poster.png"
ff -ss 2.1 -i "$T/ride-p.mp4" -frames:v 1 "$T/ride-poster-p.png"

# ---- the level reel: 4:5 centre crops (864x1080 of 1920x1080, no upscaling), shown at <= 640x800
clip() { # id source start end
  ff -ss "$3" -to "$4" -i "$V/$2" -vf "fps=25,crop=864:1080:528:0,scale=640:800" -an -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -movflags +faststart "$D/video/$1.mp4"
  ff -ss "$3" -to "$4" -i "$V/$2" -vf "fps=25,crop=864:1080:528:0,scale=640:800" -an -c:v libvpx-vp9 -crf 35 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$D/video/$1.webm"
  ff -i "$D/video/$1.mp4" -frames:v 1 "$T/$1-poster.png"
}
clip level-1 vid-010-source.mp4 19.72 24.16    # Level 1: golden-hour stand-ups on soft-tops
clip level-2 vid-003-source.mp4 21.56 24.88    # Level 2: a woman riding a reef wave
clip level-3 vid-002-source.webm 8.86 12.50    # Level 3: the barrel

# ---- photographs: crops and sizes, WebP
python3 - "$A" "$D/img" "$T" <<'PY'
import sys
from PIL import Image
A, O, T = sys.argv[1:4]
def crop(im, ratio, cx=0.5, cy=0.5):
    w, h = im.size
    if w / h > ratio: nw, nh = round(h * ratio), h
    else: nw, nh = w, round(w / ratio)
    x = min(max(round(cx * w - nw / 2), 0), w - nw); y = min(max(round(cy * h - nh / 2), 0), h - nh)
    return im.crop((x, y, x + nw, y + nh))
def out(im, name, width, q=74):
    im = im.copy()
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=q, method=6)
def src(i): return Image.open(f'{A}/img-{i}.jpg').convert('RGB')
def png(p): return Image.open(p).convert('RGB')
# hero posters (the LCP image)
out(png(f'{T}/ride-poster.png'), 'ride-poster-1728', 1728, 70)
out(png(f'{T}/ride-poster.png'), 'ride-poster-960', 960, 70)
out(png(f'{T}/ride-poster-p.png'), 'ride-poster-p810', 810, 70)
for n in (1, 2, 3): out(png(f'{T}/level-{n}-poster.png'), f'level-{n}', 640, 72)
# midday: the pool, two ways (same 16:9 frame so the wipe lines up)
for i, name, cx in (('026', 'pool-top', 0.5), ('060', 'pool-garden', 0.5)):
    im = crop(src(i), 16 / 9); out(im, f'{name}-1920', 1920, 72); out(im, f'{name}-960', 960, 72)
    out(crop(src(i), 4 / 5, cx), f'{name}-p', 900, 72)
# bands
for i, name, cy in (('138', 'waves', 0.3), ('023', 'dinner', 0.5)):
    im = crop(src(i), 21 / 9, 0.5, cy); out(im, f'{name}-1920', 1920, 72); out(im, f'{name}-960', 960, 72)
    out(crop(src(i), 4 / 5, 0.62 if i == '138' else 0.5), f'{name}-p', 900, 72)
# portraits 4:5
out(crop(src('140'), 4 / 5, 0.55), 'sunset', 960, 74)
out(crop(src('011'), 4 / 5), 'breakfast', 900, 74)
out(crop(src('037'), 4 / 5, 0.5, 0.55), 'tuktuk', 640, 76)
out(crop(src('001'), 4 / 5, 0.55), 'freestylers', 640, 74)
# rooms: 3:2, mosaic tile and gallery size
for i in '063 078 095 042 050 064 080 084 083 069 079 081 082 041 043 044 071'.split():
    im = crop(src(i), 3 / 2); out(im, f'room-{i}-600', 600, 72); out(im, f'room-{i}-1400', 1400, 74)
# instagram tiles, square
for i in '024 090 055 087 118 016 104 168'.split():
    out(crop(src(i), 1), f'ig-{i}', 480, 72)
PY
du -sh "$D/video" "$D/img"
