#!/usr/bin/env bash
# Every image and video of the unique mockup ("מפת חזון", the vision-map board), made from the
# business-owned sources in dossier/mutag-meitiv/assets and dossier/mutag-meitiv/client/2026-10-18
# (tools/link-assets.sh / dossier/mutag-meitiv/make-media.sh + make-client-media.sh first).
# Run from anywhere; rerun after changing a cut or a crop.
# media: sites/mutag-meitiv/mockups/unique/dist/img/**
# media: sites/mutag-meitiv/mockups/unique/dist/video/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/mutag-meitiv/assets
C=dossier/mutag-meitiv/client/2026-10-18
V=$A/video
D=sites/mutag-meitiv/mockups/unique/dist
mkdir -p "$D/img" "$D/video"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# ---- vid-004 (hero, the workshop table from above): 3.4-14.4 s (the dossier's cut 2-14 s, minus the first
# 1.4 s where a participant films with her phone; the loop opens on the heart drawn on the white board), native 464x832
# (never upscaled), 30 fps, no audio. WebM first (phone source), MP4 fallback kept under 2 MB.
ff -ss 3.4 -t 11 -i "$V/vid-004-source.mp4" -vf "fps=30,format=yuv420p" -an -c:v libx264 -crf 12 -preset medium "$T/v4.mp4"
ff -i "$T/v4.mp4" -an -c:v libvpx-vp9 -b:v 0 -crf 37 -row-mt 1 -deadline good -cpu-used 2 "$D/video/table-464.webm"
ff -i "$T/v4.mp4" -an -c:v libx264 -preset slow -b:v 1100k -maxrate 1300k -bufsize 2600k -profile:v high -pix_fmt yuv420p -movflags +faststart "$D/video/table-464.mp4"
ff -i "$T/v4.mp4" -vf "select=eq(n\,0)" -frames:v 1 "$T/v4-poster.png"

# ---- vid-002 (set-piece MAKING): the dossier's cut 44-56 s, hands, leaves, twine, no face.
# 4:5 crop at native width (720x900), the same ratio as every other piece on the board.
ff -ss 44 -t 12 -i "$V/vid-002-source.mp4" -vf "crop=720:900:0:190,fps=30,format=yuv420p" -an -c:v libx264 -crf 12 -preset medium "$T/v2.mp4"
ff -i "$T/v2.mp4" -vf "scale=560:700" -an -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -deadline good -cpu-used 2 "$D/video/leaves-560.webm"
ff -i "$T/v2.mp4" -vf "scale=560:700" -an -c:v libx264 -preset slow -b:v 900k -maxrate 1100k -bufsize 2200k -profile:v high -pix_fmt yuv420p -movflags +faststart "$D/video/leaves-560.mp4"
ff -i "$T/v2.mp4" -vf "select=eq(n\,0),scale=560:700" -frames:v 1 "$T/v2-poster.png"

python3 - "$A" "$C" "$D/img" "$T" <<'PY'
import sys
from PIL import Image
A, C, O, T = sys.argv[1:5]
def load(p): return Image.open(p)
def crop(im, ratio, fx=.5, fy=.5):
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio); x = round((w - nw) * fx); return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio); y = round((h - nh) * fy); return im.crop((0, y, w, y + nh))
def out(im, name, width, q=78, alpha=False):
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im = im.convert('RGBA' if alpha else 'RGB')
    im.save(f'{O}/{name}.webp', 'WEBP', quality=q, method=6)
def rgb(p): return load(p).convert('RGB')

# video posters (frame 0 of each cut, so nothing jumps when the clip starts)
out(rgb(f'{T}/v4-poster.png'), 'table-poster', 464, 80)
out(rgb(f'{T}/v2-poster.png'), 'leaves-poster', 560, 80)

# hero: Hadas in the pine forest, green shirt (img-013, 1728x2000) at 4:5, face in the upper third
h = crop(rgb(f'{A}/img-013.jpg'), 4/5, .5, .15)
out(h, 'hadas-forest-720', 720, 80); out(h, 'hadas-forest-480', 480, 80)

# the two lead services, 4:3 (photo on top of each card)
out(crop(rgb(f'{A}/img-034.jpg'), 4/3, .55, .5), 'svc-personal-960', 960)
out(crop(rgb(f'{A}/img-012.jpg'), 4/3, .5, .45), 'svc-strategic-960', 960)

# set-piece pieces, 4:5 (SENSING, THINKING, INFLUENCING; MAKING is the vid-002 clip)
out(crop(rgb(f'{A}/img-003.jpg'), 4/5, .62, .5), 'stage-sensing-560', 560)
out(crop(rgb(f'{A}/img-032.jpg'), 4/5, .62, .5), 'stage-thinking-560', 560)
out(crop(rgb(f'{A}/img-ig-01.jpg'), 4/5, .5, .5), 'stage-influencing-560', 560)

# mid-page full-width moment that opens the workshops: Hadas presenting a collage on an easel (img-c02,
# 1600 px, so never upscaled at 1440); a 4:3 crop for phones. Closing: eight women with boards (img-c05) wide
mo = rgb(f'{C}/photo-02.jpg')
out(crop(mo, 5/2, .5, .42), 'moment-easel-1600', 1600, 76)
out(crop(mo, 4/3, .62, .5), 'moment-easel-800', 800, 76)
cl = crop(rgb(f'{C}/photo-05.jpg'), 16/7, .5, .42)
out(cl, 'closing-boards-1600', 1600, 76); out(cl, 'closing-boards-800', 800, 76)

# team, all 4:5 around the face
# founder: img-010 (img-001 has a dark band across its lower third)
for name, src, fx, fy in [('team-hadas-010', 'img-010.jpg', .64, .3), ('team-tamar', 'img-036.png', .5, .2),
                          ('team-yael', 'img-037.jpg', .5, .3), ('team-dana', 'img-038.jpg', .5, .25),
                          ('team-lior', 'img-039.png', .5, .3)]:
    out(crop(rgb(f'{A}/{src}'), 4/5, fx, fy), name, 560)

# proof: the award seal and the BTC credential, keep transparency
out(load(f'{A}/img-040.png'), 'award-seal', 240, 88, alpha=True)
out(load(f'{A}/img-041.png'), 'btc-trainer', 240, 88, alpha=True)

# client logos (15), as on the current site, max 360 px wide
for n in range(44, 59):
    for ext in ('png', 'jpg'):
        try: im = load(f'{A}/img-0{n}.{ext}'); break
        except FileNotFoundError: continue
    out(im, f'logo-{n}', 360, 86, alpha=True)

# Instagram strip: six squares (never ig-06; ig-01 is on the board, ig-09 is the vid-002 clip)
for i in ['03', '02', '08', '11', '04', '12']:
    out(crop(rgb(f'{A}/img-ig-{i}.jpg'), 1, .5, .4), f'ig-{i}', 480, 76)

# brand marks (white PNGs, used as CSS masks so they can take the brand green)
out(load(f'{A}/logo-icon.png'), 'logo-icon', 400, 90, alpha=True)
out(load(f'{A}/logo-wordmark.png'), 'logo-wordmark', 600, 90, alpha=True)
PY
ls -la "$D/img" "$D/video"
