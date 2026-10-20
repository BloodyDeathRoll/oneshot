#!/usr/bin/env bash
# Every image of the unique mockup ("Name in plaster"), from the business-owned Booking.com listing
# photos in dossier/layday-surf-ahangama-v2/assets. Crops near the centre, never enlarged past native.
# media: sites/layday-surf-ahangama-v2/mockups/unique/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/layday-surf-ahangama-v2/assets
D=sites/layday-surf-ahangama-v2/mockups/unique/dist/img
rm -rf "$D"; mkdir -p "$D"
python3 - "$A" "$D" <<'PY'
import sys
from PIL import Image
A, O = sys.argv[1:3]
def crop(name, ratio, fx=.5, fy=.5):
    im = Image.open(f'{A}/{name}.jpg').convert('RGB'); w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio); x = round((w - nw) * fx); return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio); y = round((h - nh) * fy); return im.crop((0, y, w, y + nh))
def out(im, name, width=None, q=78):
    if width and im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=q, method=6)
# the band: upright 4:5 prints at native 576 x 720, set edge to edge
for n, fx, fy in [('img-002', .5, .55), ('img-013', .5, .5), ('img-011', .5, .5), ('img-008', .5, .5), ('img-005', .5, .5)]:
    out(crop(n, 4/5, fx, fy), f'{n}-band', 576, 80)
# the two minutes: a beach frame at native size
out(crop('img-020', 4/3), 'img-020', 1024)
# the square plate: one ratio for the whole slideshow
for n, fx in [('img-012', .5), ('img-005', .5), ('img-011', .5), ('img-002', .5), ('img-018', .45), ('img-008', .5), ('img-017', .3)]:
    out(crop(n, 1, fx), f'{n}-sq', 768)
# the wave, native 1024
for n in ['img-019', 'img-021']:
    out(crop(n, 4/3), n, 1024)
PY
