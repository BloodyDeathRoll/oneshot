#!/usr/bin/env bash
# Every image and video of the calm mockup ("Walk to the water"), from the business-owned
# sources in dossier/global-surf-adventures-v2/assets (tools/link-assets.sh first; the video
# sources come from tools/fetch-video.mjs). Run from anywhere; rerun after changing a cut.
# media: sites/global-surf-adventures-v2/mockups/calm/dist/img/**
# media: sites/global-surf-adventures-v2/mockups/calm/dist/video/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/global-surf-adventures-v2/assets
V=$A/video
D=sites/global-surf-adventures-v2/mockups/calm/dist
mkdir -p "$D/img" "$D/video"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# ---- hero: the vid-010 morning edit, five real-speed takes, hard cuts, one direction.
# Shot boundaries measured with scdet: 8.28 | 10.72 | 12.24 | 13.56 | 15.92 | 17.04.
# Order: two women walking to the water with mint soft-tops (starts on the poster frame, 14.0)
# -> the group walks into the sea -> boards carried under the tree -> pop-up practice lying on
# the boards -> the pop-up itself; it loops back to the walk. 8.0 s.
CUTS="[0:v]trim=14.00:15.88,setpts=PTS-STARTPTS[a];[0:v]trim=15.96:17.00,setpts=PTS-STARTPTS[b];[0:v]trim=8.32:10.68,setpts=PTS-STARTPTS[c];[0:v]trim=10.76:12.20,setpts=PTS-STARTPTS[d];[0:v]trim=12.28:13.52,setpts=PTS-STARTPTS[e];[a][b][c][d][e]concat=n=5:v=1,fps=25,format=yuv420p"
ff -i "$V/vid-010-source.mp4" -filter_complex "$CUTS[o]" -map "[o]" -an -c:v libx264 -crf 12 -preset medium "$T/master.mp4"
# desktop: crop=1728:972:192:108 removes the faint badge top-left (never upscaled)
ff -i "$T/master.mp4" -vf "crop=1728:972:192:108" -an -c:v libx264 -preset slow -b:v 3400k -maxrate 3800k -bufsize 7600k -profile:v high -pix_fmt yuv420p -movflags +faststart "$D/video/hero-d1728.mp4"
ff -i "$T/master.mp4" -vf "crop=1728:972:192:108" -an -c:v libvpx-vp9 -b:v 2600k -maxrate 3200k -row-mt 1 -deadline good -cpu-used 2 "$D/video/hero-d1728.webm"
# phone: a 9:16 centre crop at native pixels (608x1080), so a portrait screen is never filled by an upscaled band
ff -i "$T/master.mp4" -vf "crop=608:1080:656:0" -an -c:v libx264 -preset slow -b:v 1700k -maxrate 1900k -bufsize 3800k -profile:v high -pix_fmt yuv420p -movflags +faststart "$D/video/hero-m608.mp4"
ff -i "$T/master.mp4" -vf "crop=608:1080:656:0" -an -c:v libvpx-vp9 -b:v 1400k -maxrate 1700k -row-mt 1 -deadline good -cpu-used 2 "$D/video/hero-m608.webm"
# posters = frame 0 of the edit, so nothing jumps when the video starts
ff -i "$T/master.mp4" -vf "select=eq(n\,0),crop=1728:972:192:108" -frames:v 1 "$T/pd.png"
ff -i "$T/master.mp4" -vf "select=eq(n\,0),crop=608:1080:656:0" -frames:v 1 "$T/pm.png"

# ---- level clips (played only on "Play"): 4:5 centre crops, real speed
clip() { # name source start end crop
  ff -ss "$3" -to "$4" -i "$V/$2" -vf "$5,scale=720:900,fps=25" -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart "$D/video/$1.mp4"
  ff -ss "$3" -to "$4" -i "$V/$2" -vf "$5,scale=720:900,fps=25" -an -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$D/video/$1.webm"; }
clip level-1 vid-010-source.mp4 19.72 24.16 "crop=864:1080:528:0"
clip level-2 vid-003-source.mp4 21.56 24.88 "crop=864:1080:528:0"
clip level-3 vid-002-source.webm 8.86 12.50 "crop=864:1080:528:0"
# the Level 1 still: the pop-up practice on the mint soft-tops (vid-010 12.9 s), 3:4
ff -ss 12.9 -i "$V/vid-010-source.mp4" -frames:v 1 -vf "crop=810:1080:540:0" "$T/l1.png"

# ---- photographs: crop / resize with PIL, WebP
python3 - "$A" "$D/img" "$T" <<'PY'
import sys
from PIL import Image
A, O, T = sys.argv[1:4]
def load(src):
    return Image.open(src if '/' in src else f'{A}/{src}.jpg').convert('RGB')
def crop(im, ratio, fx=.5, fy=.5):
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio); x = round((w - nw) * fx); return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio); y = round((h - nh) * fy); return im.crop((0, y, w, y + nh))
def out(im, name, width, q=74):
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=q, method=6)
# hero posters
pd = load(f'{T}/pd.png'); out(pd, 'hero-poster-1728', 1728, 70); out(pd, 'hero-poster-1000', 1000, 70)
out(load(f'{T}/pm.png'), 'hero-poster-m608', 608, 72)
# levels, 3:4 portrait stills
out(crop(load(f'{T}/l1.png'), 3/4), 'level-1', 720)
out(crop(load('img-133'), 3/4, .5), 'level-2', 720)
out(crop(load('img-099'), 3/4, .62), 'level-3', 720)
out(crop(load('img-001'), 3/2), 'freestylers', 640)
# breakfast slideshow, 3:2
for i, fy in (('011', .5), ('021', .5), ('033', .62), ('057', .66)):
    im = crop(load(f'img-{i}'), 3/2, .5, fy); out(im, f'breakfast-{i}', 1200); out(im, f'breakfast-{i}-720', 720)
# full-bleed moments
im = load('img-005'); out(crop(im, 16/9, .5, .6), 'pool-2000', 2000); out(crop(im, 4/5, .42), 'pool-m', 900)
im = load('img-111'); out(crop(im, 21/9, .5, .55), 'sunset-2000', 2000); out(crop(im, 4/5, .5), 'sunset-m', 900)
im = load('img-112'); out(crop(im, 21/9, .5, .45), 'waves-2000', 2000); out(crop(im, 4/3, .55), 'waves-m', 900)
out(crop(load('img-065'), 4/5, .5), 'dinner', 900)
# rooms, 3:2 at full container width
for i in '063 078 095 042 050 064 080 084 083 069 079 081 082 041 043 044 071'.split():
    im = crop(load(f'img-{i}'), 3/2); out(im, f'room-{i}', 1200); out(im, f'room-{i}-720', 720)
# instagram tiles, square
for i, fy in (('024', .55), ('090', .5), ('055', .45), ('087', .5), ('118', .3), ('016', .5)):
    out(crop(load(f'img-{i}'), 1, .5, fy), f'ig-{i}', 480)
PY
ls -la "$D/img" | wc -l; du -sh "$D/video" "$D/img"
