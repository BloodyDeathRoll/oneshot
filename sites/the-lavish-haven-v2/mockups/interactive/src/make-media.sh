#!/usr/bin/env bash
# Every image of the interactive mockup ("Pick your view"), cut from the hotel's own Booking.com photographs in
# dossier/the-lavish-haven-v2/assets (all 1024 x 768, business-owned; restore them first with
# bash dossier/the-lavish-haven-v2/make-fork-media.sh). Nothing is upscaled: every output is at or
# under the source's own pixels. Run from anywhere; rerun after changing a crop.
# media: sites/the-lavish-haven-v2/mockups/interactive/dist/img/**
# media: sites/the-lavish-haven-v2/mockups/interactive/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/the-lavish-haven-v2/assets
D=sites/the-lavish-haven-v2/mockups/interactive/dist/img
mkdir -p "$D"
# out  source  ratio(w:h)  focus-x(0..1)  focus-y(0..1)  out-width  quality
python3 - "$A" "$D" <<'PY'
import sys
from PIL import Image
A, D = sys.argv[1], sys.argv[2]
SPEC = """
i-view-hero        079 18:25 .55 .5  553 72
i-view-pool        067 18:25 .62 .5  553 82
i-view-intro       071 18:25 .55 .5  553 82
i-view-bed         024 18:25 .45 .5  553 82
i-view-stay        077 18:25 .78 .5  553 82
i-view-prac        045 18:25 .5  .5  553 82
i-view-garden      066 18:25 .62 .5  553 82
i-view-both        072 18:25 .72 .5  553 82
i-view-kitchen     011 18:25 .62 .5  553 82
i-view-family      029 18:25 .55 .5  553 82
i-view-all         078 18:25 .45 .5  553 82
i-view-night       002 18:25 .62 .5  553 82
i-view-kabalana    078 18:25 .7  .5  553 82
i-room-1           007 4:5   .5  .5  614 78
i-room-2           024 4:5   .45 .5  614 78
i-room-3           013 4:5   .4  .5  614 78
i-room-4           047 4:5   .45 .5  614 78
i-room-5           055 4:5   .5  .5  614 78
i-room-6           032 4:5   .55 .5  614 78
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
mkdir -p sites/the-lavish-haven-v2/mockups/interactive/dist/fonts
curl -sfL https://fonts.gstatic.com/s/bodonimoda/v28/aFTH7PxzY382XsXX63LUYL6GYFksw-NIrKp-nvr1KOxQ.woff2 -o sites/the-lavish-haven-v2/mockups/interactive/dist/fonts/bodoni-moda-latin.woff2
curl -sfL https://fonts.gstatic.com/s/hankengrotesk/v12/ieVn2YZDLWuGJpnzaiwFXS9tYtpd59A.woff2 -o sites/the-lavish-haven-v2/mockups/interactive/dist/fonts/hanken-grotesk-latin.woff2
