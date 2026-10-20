#!/usr/bin/env bash
# Every image of the calm mockup ("Samples"), from the business-owned Booking.com listing photos in
# dossier/layday-surf-ahangama-v2/assets (tools/link-assets.sh / restore first). Crops are taken
# near the centre; nothing is ever enlarged past its native pixels. Run from anywhere.
# media: sites/layday-surf-ahangama-v2/mockups/calm/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/layday-surf-ahangama-v2/assets
D=sites/layday-surf-ahangama-v2/mockups/calm/dist/img
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
# first-screen specimen tiles, 3:4 at native 576 x 768
for n, fx in [('img-002', .5), ('img-008', .5), ('img-013', .5), ('img-003', .5), ('img-005', .5)]:
    out(crop(n, 3/4, fx), f'{n}-34', 576)
out(crop('img-018', 3/4, .42), 'img-018-34', 576)          # the niche and the lamp
# the room stage: the three landscape views of the dormitory, 4:3 at native 1024
for n in ['img-012', 'img-018', 'img-017']:
    out(crop(n, 4/3), f'{n}-43', 1024, 80)
# phone first screen: the berth, 4:5 at native width
out(crop('img-002', 4/5, .5, .6), 'img-002-45h', 576, 80)
# inline thumbnails in the statement
out(crop('img-012', 1, .5), 'img-012-sq', 240); out(crop('img-013', 1, .5, .35), 'img-013-sq', 240)
# the room gallery: one ratio (4:5) for all seven
for n, fx in [('img-012', .5), ('img-005', .5), ('img-011', .5), ('img-002', .5), ('img-018', .45), ('img-008', .5), ('img-017', .35)]:
    out(crop(n, 4/5, fx), f'{n}-45', 576)
# the disc: square crops of the five items
for n, fx, fy in [('img-002', .5, .55), ('img-013', .5, .5), ('img-003', .5, .3), ('img-017', .3, .55), ('img-001', .5, .5)]:
    out(crop(n, 1, fx, fy), f'{n}-disc', 576)
# guests portrait + amenity bullets
out(crop('img-017', 3/4, .3), 'img-017-34', 576)
for n in ['img-013', 'img-017', 'img-005', 'img-007', 'img-003']:
    out(crop(n, 1), f'{n}-dot', 120)
# the wave, native 1024
for n in ['img-019', 'img-021', 'img-020']:
    out(crop(n, 4/3), f'{n}', 1024)
# the booking strip: ten small prints, 150 px tall at 2x = 300
for n, r in [('img-002', 3/4), ('img-012', 1), ('img-013', 3/4), ('img-017', 3/2), ('img-003', 3/4), ('img-005', 1), ('img-008', 3/4), ('img-001', 3/4), ('img-018', 3/2), ('img-011', 1), ('img-007', 3/4)]:
    im = crop(n, r); im = im.resize((round(300 * r), 300), Image.LANCZOS); out(im, f'{n}-strip', None, 72)
PY
