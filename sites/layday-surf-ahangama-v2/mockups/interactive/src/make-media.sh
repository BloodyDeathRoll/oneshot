#!/usr/bin/env bash
# Every image of the interactive mockup ("One room"), from the business-owned Booking.com listing
# photos in dossier/layday-surf-ahangama-v2/assets. Crops near the centre, never enlarged past native.
# media: sites/layday-surf-ahangama-v2/mockups/interactive/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/layday-surf-ahangama-v2/assets
D=sites/layday-surf-ahangama-v2/mockups/interactive/dist/img
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
# the pinned run: four 2:3 portraits at native 512 x 768
for n, fx in [('img-002', .5), ('img-005', .5), ('img-003', .5), ('img-018', .40)]:
    out(crop(n, 2/3, fx), f'{n}-23', 512, 80)
# the room gallery, 4:5 for all seven
for n, fx in [('img-012', .5), ('img-005', .5), ('img-011', .5), ('img-002', .5), ('img-018', .45), ('img-008', .5), ('img-017', .35)]:
    out(crop(n, 4/5, fx), f'{n}-45', 576)
# newly built: three material prints edge to edge, 4:5
for n, fx in [('img-013', .5), ('img-003', .5), ('img-001', .5)]:
    out(crop(n, 4/5, fx), f'{n}-45', 576)
# guests' prints, 3:4
for n, fx in [('img-017', .3), ('img-013', .5), ('img-001', .5)]:
    out(crop(n, 3/4, fx), f'{n}-34', 576)
# the wave and the contact photograph, native 1024
for n in ['img-019', 'img-021', 'img-012']:
    out(crop(n, 4/3), n, 1024)
PY
