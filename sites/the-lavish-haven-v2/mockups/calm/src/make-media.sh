#!/usr/bin/env bash
# Every image of the calm mockup ("Prints"), cut from the hotel's own Booking.com photographs in
# dossier/the-lavish-haven-v2/assets (all 1024 x 768, business-owned; restore them first with
# bash dossier/the-lavish-haven-v2/make-fork-media.sh). Nothing is upscaled: every output is at or
# under the source's own pixels. Run from anywhere; rerun after changing a crop.
# media: sites/the-lavish-haven-v2/mockups/calm/dist/img/**
# media: sites/the-lavish-haven-v2/mockups/calm/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/the-lavish-haven-v2/assets
D=sites/the-lavish-haven-v2/mockups/calm/dist/img
mkdir -p "$D"
# out  source  ratio(w:h)  focus-x(0..1)  focus-y(0..1)  out-width  quality
python3 - "$A" "$D" <<'PY'
import sys
from PIL import Image
A, D = sys.argv[1], sys.argv[2]
SPEC = """
c-pool        078 4:3  .5  .5  1024 72
c-pool-768    078 4:3  .5  .5  768  70
c-pool-640    078 4:3  .5  .5  640  70
c-blind-1     077 1:1  1   .5  480  78
c-blind-2     075 1:1  .4  .5  480  78
c-balcony     071 1:1  .55 .5  768  80
c-rooms-pool  073 4:5  .62 .5  614  80
c-room-1      007 4:5  .5  .5  614  78
c-room-2      024 4:5  .45 .5  614  78
c-room-3      029 4:5  .5  .5  614  78
c-room-4      013 4:5  .4  .5  614  78
c-room-5      032 4:5  .55 .5  614  78
c-room-6      047 4:5  .45 .5  614  78
c-night       002 4:3  .5  .5  1024 82
c-g-pool-high 067 9:10 .6  .5  520  78
c-g-pool-rail 069 9:10 .2  .5  520  78
c-g-canopy    066 9:10 .65 .5  520  78
c-g-kitchen   011 9:10 .6  .5  520  78
c-g-garden    079 9:10 .55 .5  520  78
c-night-sq    001 1:1  .62 .5  768  80
c-door        045 3:4  .5  .5  576  80
c-stay        079 4:3  .5  .5  1024 80
c-rooms-2     069 4:3  .4  .5  640  80
"""
for line in SPEC.strip().splitlines():
    out, src, ratio, fx, fy, w, q = line.split()
    rw, rh = map(float, ratio.split(':'))
    im = Image.open(f"{A}/img-{src}.jpg").convert('RGB')
    W, H = im.size
    if W / H > rw / rh: ch, cw = H, round(H * rw / rh)
    else: cw, ch = W, round(W * rh / rw)
    x = min(max(round(float(fx) * W - cw / 2), 0), W - cw)
    y = min(max(round(float(fy) * H - ch / 2), 0), H - ch)
    im = im.crop((x, y, x + cw, y + ch))
    w = min(int(w), cw)                      # never upscale
    im = im.resize((w, round(w * ch / cw)), Image.LANCZOS)
    im.save(f"{D}/{out}.webp", 'WEBP', quality=int(q), method=6)
    print(out, im.size)
PY

# ---- fonts, self-hosted: the latin subsets Google Fonts serves (variable files cover every weight used)
mkdir -p sites/the-lavish-haven-v2/mockups/calm/dist/fonts
curl -sfL https://fonts.gstatic.com/s/pinyonscript/v24/6xKpdSJbL9-e9LuoeQiDRQR8WOXaOg.woff2 -o sites/the-lavish-haven-v2/mockups/calm/dist/fonts/pinyon-script-latin.woff2
curl -sfL https://fonts.gstatic.com/s/worksans/v24/QGYsz_wNahGAdqQ43Rh_fKDp.woff2 -o sites/the-lavish-haven-v2/mockups/calm/dist/fonts/work-sans-latin.woff2
