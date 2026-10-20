#!/usr/bin/env bash
# Every picture of the three KA Surf Hostel v2 mockups (station 4e, run 2026-10-lk-surf-01), made from
# the business's own dossier assets: upright 3:4 crops at or below native size, WebP. The six Instagram
# beach frames stored on their side (img-018/019/021/022/023/024) are turned upright first.
# Before it: node tools/media.mjs restore ka-surf-hostel-and-restaurant, then
# dossier/ka-surf-hostel-and-restaurant-v2/make-fork-media.sh.
# media: sites/ka-surf-hostel-and-restaurant-v2/mockups/calm/dist/img/**
# media: sites/ka-surf-hostel-and-restaurant-v2/mockups/interactive/dist/img/**
# media: sites/ka-surf-hostel-and-restaurant-v2/mockups/unique/dist/img/**
# media: sites/ka-surf-hostel-and-restaurant-v2/mockups/calm/dist/fonts/**
# media: sites/ka-surf-hostel-and-restaurant-v2/mockups/interactive/dist/fonts/**
# media: sites/ka-surf-hostel-and-restaurant-v2/mockups/unique/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../.."
python3 - <<'PY'
from PIL import Image
import os
A = 'dossier/ka-surf-hostel-and-restaurant-v2/assets'
M = 'sites/ka-surf-hostel-and-restaurant-v2/mockups'
USE = ['001','002','003','004','005','006','007','008','009','012','013','016',
       '018','019','020','021','022','023','024']
ROT = {'018','019','021','022','023','024'}       # stored on their side: rotate 90° counter-clockwise
def src(n):
    for ext in ('jpg', 'webp'):
        p = f'{A}/img-{n}.{ext}'
        if os.path.exists(p): return p
def upright(im, ratio=3/4):
    w, h = im.size
    if w / h > ratio:                               # too wide: centre-crop the width
        nw = round(h * ratio); x = (w - nw) // 2; return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio); y = (h - nh) // 2; return im.crop((0, y, w, y + nh))
for v in ('calm', 'interactive', 'unique'):
    os.makedirs(f'{M}/{v}/dist/img', exist_ok=True)
for n in USE:
    im = Image.open(src(n)).convert('RGB')
    if n in ROT: im = im.rotate(90, expand=True)
    up = upright(im)
    full = up                                       # never upscaled: native width at most 576
    if full.width > 576: full = full.resize((576, 768), Image.LANCZOS)
    small = up.resize((360, 480), Image.LANCZOS) if up.width > 360 else up
    sq = None
    lean = up.resize((456, 608), Image.LANCZOS) if up.width >= 456 else None   # first-screen prints on a phone (228-300 CSS px at 2x)
    lqip = up.resize((12, 16), Image.LANCZOS)        # a 12 x 16 blur placeholder painted before the print arrives
    if n == '003':                                  # the fruit plate, square for calm's breakfast
        w, h = im.size; s = min(w, h); y = (h - s) // 2
        sq = im.crop((0, y, s, y + s))
    for v in ('calm', 'interactive', 'unique'):
        d = f'{M}/{v}/dist/img'
        full.save(f'{d}/img-{n}.webp', 'WEBP', quality=80, method=6)
        small.save(f'{d}/img-{n}-s.webp', 'WEBP', quality=78, method=6)
        if sq is not None: sq.save(f'{d}/img-{n}-sq.webp', 'WEBP', quality=80, method=6)
        if lean is not None: lean.save(f'{d}/img-{n}-m.webp', 'WEBP', quality=70, method=6)
        lqip.save(f'{d}/img-{n}-q.webp', 'WEBP', quality=50, method=6)
        if n in ('009', '012'):                     # the night landscapes also give a second, different 3:4 view: their left side
            w, h = im.size; nw = round(h * 3 / 4)
            im.crop((0, 0, nw, h)).resize((360, 480), Image.LANCZOS).save(f'{d}/img-{n}-l-s.webp', 'WEBP', quality=78, method=6)
print('ok')
PY

# Self-hosted fonts (latin subsets, woff2), per variant. Google Fonts are OFL; Switzer is under the
# Fontshare free licence (self-hosting allowed).
G=https://fonts.gstatic.com/s
F=https://cdn.fontshare.com/wf
get() { mkdir -p "$(dirname "$2")"; [ -s "$2" ] || curl -sfL "$1" -o "$2"; }
M=sites/ka-surf-hostel-and-restaurant-v2/mockups
get $G/albertsans/v4/i7dOIFdwYjGaAMFtZd_QA1ZbYFc.woff2 $M/calm/dist/fonts/albert-sans.woff2
get $G/kalam/v18/YA9dr0Wd4kDdMthROCc.woff2 $M/calm/dist/fonts/kalam.woff2
get $G/publicsans/v21/ijwRs572Xtc6ZYQws9YVwnNGfJ4.woff2 $M/interactive/dist/fonts/public-sans.woff2
get $G/caveat/v23/Wnz6HAc5bAfYB2Q7ZjYY.woff2 $M/interactive/dist/fonts/caveat.woff2
get $F/BLNB4FAQFNK56DWWNF7PMGTCOTZHOEII/ST3WKSSDMBK2MIQQO3MAVYWLF4FTOLFV/6IN5WOLRCYP4G4MOCOHOMXNON6Q7MDAR.woff2 $M/unique/dist/fonts/switzer-400.woff2
get $F/OYB4CXKJQXKTNSLJMTDQOIVUL2V5EL7S/WYO2P7DQVV5RNXGMCUO2HL4RJP4VFUAS/6XPIMU23OJVRY676OG5YVJMWEHWICATX.woff2 $M/unique/dist/fonts/switzer-500.woff2
get $G/nanumpenscript/v25/daaDSSYiLGqEal3MvdA_FOL_3FkN6zn0aQ.woff2 $M/unique/dist/fonts/nanum-pen-script.woff2
echo fonts ok

# A static map for the "Getting here" box while the live map loads (interactive, unique): OpenStreetMap
# tiles (© OpenStreetMap contributors, ODbL; the credit is printed on the box), zoom 16, centred on the
# dossier's Google pin (location.lat_lng 5.9818405, 80.3520113), cropped 4:3 and marked with a pin.
python3 - <<'PY'
import math, io, os, urllib.request
from PIL import Image, ImageDraw
lat, lon, z = 5.9818405, 80.3520113, 16
n = 2 ** z
fx = (lon + 180) / 360 * n
fy = (1 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2 * n
x0, y0 = int(fx) - 2, int(fy) - 2
canvas = Image.new('RGB', (256 * 5, 256 * 5))
for dx in range(5):
    for dy in range(5):
        req = urllib.request.Request(f'https://tile.openstreetmap.org/{z}/{x0+dx}/{y0+dy}.png', headers={'User-Agent': 'oneshot-mockup-recipe/1.0'})
        canvas.paste(Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=20).read())).convert('RGB'), (dx * 256, dy * 256))
px, py = (fx - x0) * 256, (fy - y0) * 256
W, H = 960, 720
crop = canvas.crop((int(px - W / 2), int(py - H / 2), int(px + W / 2), int(py + H / 2)))
d = ImageDraw.Draw(crop)
cx, cy = W // 2, H // 2
d.ellipse((cx - 13, cy - 13, cx + 13, cy + 13), fill=(210, 60, 6), outline=(255, 255, 255), width=4)
for v in ('interactive', 'unique'):
    crop.save(f'sites/ka-surf-hostel-and-restaurant-v2/mockups/{v}/dist/img/map-osm.webp', 'WEBP', quality=78, method=6)
print('map ok')
PY

# Subset every font to the characters the pages use (Latin, punctuation, arrows, degree), so the faces
# arrive before the photographs on a slow phone. Needs fonttools + brotli (pyftsubset on PATH, or
# PYFTSUBSET=/path/to/pyftsubset). The full files are kept outside dist/ (in $TMPDIR/ka-v2-fonts) while subsetting.
PYFT=${PYFTSUBSET:-$(command -v pyftsubset || true)}
if [ -n "$PYFT" ]; then
  for f in $M/*/dist/fonts/*.woff2; do
    full=${TMPDIR:-/tmp}/ka-v2-fonts/${f#$M/}; mkdir -p "$(dirname "$full")"
    [ -s "$full" ] || cp "$f" "$full"
    "$PYFT" "$full" --output-file="$f" --flavor=woff2 --layout-features='kern,liga,calt' \
      --unicodes='U+0020-007E,U+00A0-00FF,U+2010-2015,U+2018-201F,U+2026,U+2032,U+2190-2193,U+00B0,U+2022'
  done
  echo "fonts subset"
fi
# Caveat is a variable font: pin it to the one weight the titles use (600), then subset again.
FTPY=${FONTTOOLS_PYTHON:-}
if [ -n "$FTPY" ] && [ -n "$PYFT" ]; then
  "$FTPY" -m fontTools.varLib.instancer ${TMPDIR:-/tmp}/ka-v2-fonts/interactive/dist/fonts/caveat.woff2 wght=600 -o /tmp/caveat-600.ttf -q
  "$PYFT" /tmp/caveat-600.ttf --output-file=$M/interactive/dist/fonts/caveat.woff2 --flavor=woff2 --layout-features='kern,liga,calt' \
    --unicodes='U+0020-007E,U+00A0-00FF,U+2010-2015,U+2018-201F,U+2026,U+2032,U+2190-2193,U+00B0,U+2022'
  echo "caveat 600"
fi
