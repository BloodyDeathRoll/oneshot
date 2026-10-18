#!/usr/bin/env bash
# Every image and video of the interactive mockup ("ארבע הטבעות", Four rings), made from the
# business-owned dossier assets. Nothing is upscaled; every run of pictures is one ratio.
# Before it: tools/link-assets.sh mutag-meitiv (dist/video then lives in ~/.oneshot/assets).
# Usage: bash sites/mutag-meitiv/mockups/interactive/src/make-media.sh
# media: sites/mutag-meitiv/mockups/interactive/dist/img/**
# media: sites/mutag-meitiv/mockups/interactive/dist/video/**
# media: sites/mutag-meitiv/mockups/interactive/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/mutag-meitiv/assets
D=sites/mutag-meitiv/mockups/interactive/dist
mkdir -p "$D/img" "$D/video"
ff() { ffmpeg -v error -y "$@"; }

# ---- vid-004 (client clip, overhead workshop table): the dossier's cut 2-14 s, cropped to a
# 464x464 square around the table (no upscaling), for the round "satellite" frames. Muted.
SQ="crop=464:464:0:200,fps=25,format=yuv420p"
ff -ss 2 -t 12 -i "$A/video/vid-004-source.mp4" -vf "$SQ" -an -c:v libvpx-vp9 -b:v 520k -maxrate 700k -row-mt 1 -deadline good -cpu-used 2 "$D/video/table-464.webm"
ff -ss 2 -t 12 -i "$A/video/vid-004-source.mp4" -vf "$SQ" -an -c:v libx264 -preset slow -b:v 700k -maxrate 900k -bufsize 2M -pix_fmt yuv420p -movflags +faststart "$D/video/table-464.mp4"
# poster = the clip's own frame at 3 s of the source (1 s into the cut), the dossier's poster time
ff -ss 3 -i "$A/video/vid-004-source.mp4" -frames:v 1 -vf "crop=464:464:0:200" "$D/img/table-poster.png"

python3 - "$A" "$D/img" <<'PY'
import sys, os
from PIL import Image, ImageOps
A, OUT = sys.argv[1], sys.argv[2]
def load(name):
    p = os.path.join(A, name) if not name.startswith('/') else name
    return ImageOps.exif_transpose(Image.open(p))
def save(im, name, w=None, q=80):
    if w and im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
    else:
        im = im.convert('RGB')
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=q, method=6)
def crop(im, box):
    return im.crop(box)
C = os.path.abspath(os.path.join(os.path.dirname(A.rstrip('/')), 'client', '2026-10-18'))

# poster of the clip -> webp
p = Image.open(os.path.join(OUT, 'table-poster.png')); save(p, 'table-poster', q=78); os.remove(os.path.join(OUT, 'table-poster.png'))

# hero disc: img-001 (713x672), square around Hadas's face, above the band at the bottom of the frame
save(crop(load('img-001.jpg'), (30, 0, 570, 540)), 'hadas-disc', 540)
# the two lead services, 1:1
save(crop(load('img-003.jpg'), (0, 0, 2000, 2000)), 'svc-personal', 960)
save(crop(load('img-012.jpg'), (0, 30, 1512, 1542)), 'svc-strategic', 960)
# the four stages, 1:1 circles
save(crop(load('img-006.jpg'), (180, 0, 1278, 1098)), 'st-sensing', 640)
save(crop(load('img-032.jpg'), (500, 0, 1833, 1333)), 'st-thinking', 640)
save(crop(load(os.path.join(C, 'photo-03.jpg')), (0, 250, 1200, 1450)), 'st-making', 640)
save(crop(load('img-033.jpg'), (420, 0, 1753, 1333)), 'st-influencing', 640)
# offers: the eight women with their finished boards (img-c05), 4:3 as shot
save(load(os.path.join(C, 'photo-05.jpg')), 'women-boards', 1200)
# team, 4:5 around the face
def c45(im, cx=0.5, top=0.0):
    w, h = im.size
    if w / h > 0.8:
        nw = round(h * 0.8); x = max(0, min(w - nw, round(w * cx - nw / 2))); return im.crop((x, 0, x + nw, h))
    nh = round(w / 0.8); y = max(0, min(h - nh, round(h * top))); return im.crop((0, y, w, y + nh))
save(c45(load('img-013.jpg'), 0.47), 'team-hadas', 600)
# the one full-bleed moment: img-034 (2000x1190, the best photograph), two widths
save(load('img-034.jpg'), 'wide-hadas-2000', 2000, q=74)
save(load('img-034.jpg'), 'wide-hadas-1200', 1200, q=74)
save(c45(load('img-036.png')), 'team-tamar', 600)
save(c45(load('img-037.jpg'), 0.45), 'team-yael', 600)
save(c45(load('img-038.jpg'), top=0.0), 'team-dana', 600)
save(c45(load('img-039.png')), 'team-lior', 600)
# proof marks, as on the client's site
save(load('img-040.png'), 'award-seal', 240)
save(load('img-041.png'), 'btc-seal', 240)
for i in range(44, 59):
    for ext in ('.jpg', '.png'):
        f = os.path.join(A, 'img-%03d%s' % (i, ext))
        if os.path.exists(f):
            # one treatment for every client logo: a single deep-green ink on transparent, no boxes.
            # Ink = darkness of the logo on white; a logo printed light-on-dark (a dark frame) is inverted first.
            im = Image.open(f).convert('RGBA'); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im)
            g = bg.convert('L'); w, h = g.size
            edge = [g.getpixel((x, y)) for x in range(0, w, max(1, w // 40)) for y in (0, h - 1)] + [g.getpixel((x, y)) for y in range(0, h, max(1, h // 40)) for x in (0, w - 1)]
            if sum(edge) / len(edge) < 110: g = ImageOps.invert(g)
            g = ImageOps.autocontrast(g, cutoff=1)
            mk = lambda gg, cut=235: gg.point(lambda v: 0 if v > cut else min(255, int((255 - v) * 1.25)))
            gd = sorted(g.getdata()); bgv = gd[len(gd) // 2] if gd[len(gd) // 2] > 150 else 255
            ink = mk(g, min(235, bgv - 20)); bb = ink.getbbox()
            if bb:
                g = g.crop(bb); ink = ink.crop(bb)
                # a logo set inside its own dark box: knock the box out, keep the letters
                if sum(ink.getdata()) / (ink.width * ink.height) > 120:
                    g = ImageOps.autocontrast(ImageOps.invert(g), cutoff=2); ink = mk(g, 190)
                    bb2 = ink.getbbox(); g, ink = (g.crop(bb2), ink.crop(bb2)) if bb2 else (g, ink)
            out = Image.new('RGBA', g.size, (10, 81, 80, 255)); out.putalpha(ink)
            out.thumbnail((360, 180)); save(out, 'logo-%03d' % i, q=90)
# Instagram strip: photo-led posts first (never ig-06), square
for t in ['ig-03', 'ig-01', 'ig-02', 'ig-09', 'ig-08', 'ig-11']:
    im = load('img-%s.jpg' % t); w, h = im.size; s = min(w, h)
    y = 0 if h > w and t in ('ig-09', 'ig-11') else (h - s) // 2
    if t in ('ig-09', 'ig-11'): y = (h - s) // 2
    save(im.crop(((w - s) // 2, y, (w - s) // 2 + s, y + s)), t, 600)
# brand icon and wordmark: the white PNGs' shapes filled with the
# brand's own greens (header), alpha kept: never redrawn or re-proportioned
def tint(im, hexc):
    im = im.convert('RGBA'); r, g, b = int(hexc[1:3], 16), int(hexc[3:5], 16), int(hexc[5:7], 16)
    solid = Image.new('RGBA', im.size, (r, g, b, 255)); solid.putalpha(im.getchannel('A')); return solid
save(tint(load('logo-icon.png'), '#00574C'), 'icon-green', 400, q=90)
save(load('logo-icon.png'), 'icon-white', 400, q=90)
save(tint(load('logo-wordmark.png'), '#0A5150'), 'wordmark-green', 600, q=90)
PY
# ---- fonts (OFL, Google Fonts): Assistant (variable, 400-700) and Playpen Sans Hebrew 600, Hebrew + Latin subsets,
# self-hosted so the page never waits on a third party and font-display: optional never swaps late
mkdir -p "$D/fonts"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
CSS=$(curl -fsS -A "$UA" "https://fonts.googleapis.com/css2?family=Assistant:wght@400..700&family=Playpen+Sans+Hebrew:wght@600&display=swap")
python3 - "$D/fonts" "$CSS" <<'PY2'
import re, sys, urllib.request
out, css = sys.argv[1], sys.argv[2]
for sub, fam, url in re.findall(r"/\* (\w[\w-]*) \*/\s*@font-face \{[^}]*?font-family: '([^']+)';[^}]*?url\((https://[^)]+\.woff2)\)", css):
    if sub not in ('hebrew', 'latin'): continue
    name = ('assistant' if fam == 'Assistant' else 'playpen') + '-' + sub + '.woff2'
    urllib.request.urlretrieve(url, out + '/' + name)
    print('font', name)
PY2
ls -la "$D/img" "$D/video" "$D/fonts"
