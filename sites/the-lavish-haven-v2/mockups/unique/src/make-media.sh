#!/usr/bin/env bash
# Every image of the unique mockup ("Do not disturb", the hang tag), cut from the hotel's own Booking.com photographs in
# dossier/the-lavish-haven-v2/assets (all 1024 x 768, business-owned; restore them first with
# bash dossier/the-lavish-haven-v2/make-fork-media.sh). Nothing is upscaled: every output is at or
# under the source's own pixels. Run from anywhere; rerun after changing a crop.
# media: sites/the-lavish-haven-v2/mockups/unique/dist/img/**
# media: sites/the-lavish-haven-v2/mockups/unique/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/the-lavish-haven-v2/assets
D=sites/the-lavish-haven-v2/mockups/unique/dist/img
mkdir -p "$D"
# out  source  ratio(w:h)  focus-x(0..1)  focus-y(0..1)  out-width  quality
python3 - "$A" "$D" <<'PY'
import sys
from PIL import Image
A, D = sys.argv[1], sys.argv[2]
SPEC = """
u-night        002 4:3  .5  .5  1024 74
u-night-640    002 4:3  .5  .5  640  74
u-room-1       007 4:5  .5  .5  614  78
u-room-2       024 4:5  .45 .5  614  78
u-room-3       029 4:5  .5  .5  614  78
u-room-4       013 4:5  .4  .5  614  78
u-room-5       032 4:5  .55 .5  614  78
u-room-6       047 4:5  .45 .5  614  78
u-balcony-tall 071 3:4  .55 .5  576  80
u-blind-sq     077 1:1  1   .5  480  78
u-noon         078 4:3  .5  .5  1024 80
u-kab          079 4:3  .5  .5  1024 80
u-stay         069 4:3  .5  .5  1024 80
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
mkdir -p sites/the-lavish-haven-v2/mockups/unique/dist/fonts
curl -sfL https://fonts.gstatic.com/s/ebgaramond/v33/SlGUmQSNjdsmc35JDF1K5GR1SDk.woff2 -o sites/the-lavish-haven-v2/mockups/unique/dist/fonts/eb-garamond-latin.woff2
curl -sfL https://fonts.gstatic.com/s/ebgaramond/v33/SlGWmQSNjdsmc35JDF1K5GRweDs1Zw.woff2 -o sites/the-lavish-haven-v2/mockups/unique/dist/fonts/eb-garamond-italic-latin.woff2
