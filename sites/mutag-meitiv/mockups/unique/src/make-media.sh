#!/usr/bin/env bash
# Every image, video and font of the series-2 unique mockup ("על הבמה", on stage) of mutag-meitiv,
# made from the business's own files in dossier/mutag-meitiv/{assets,client/2026-10-18}
# (tools/link-assets.sh / tools/setup.sh first). Run from anywhere; rerun after changing a crop or a cut.
# File names carry an "s2u-" prefix on video so they never collide with series-1 unique's clips if
# tools/link-assets.sh later links this dist/video into the shared store folder mockups/unique/video.
# media: sites/mutag-meitiv/mockups/unique/dist/img/**
# media: sites/mutag-meitiv/mockups/unique/dist/video/**
# media: sites/mutag-meitiv/mockups/unique/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/mutag-meitiv/assets
C=dossier/mutag-meitiv/client/2026-10-18
V=$A/video
D=sites/mutag-meitiv/mockups/unique/dist
mkdir -p "$D/img" "$D/video" "$D/fonts"
rm -f "$D"/img/*.webp
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# ---- vid-004 (client clip, 464x832, the workshop table from above): the MAKING slide.
# 3.4-14.4 s (from 2 s the first 1.4 s show a participant filming with her phone), 4:5 crop at native
# pixels (464x580), 30 fps, no audio. Played only while its slide / block is on screen.
ff -ss 3.4 -t 11 -i "$V/vid-004-source.mp4" -vf "crop=464:580:0:126,fps=30,format=yuv420p" -an -c:v libx264 -crf 12 -preset medium "$T/v4.mp4"
ff -i "$T/v4.mp4" -an -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -deadline good -cpu-used 2 "$D/video/s2u-table-464.webm"
ff -i "$T/v4.mp4" -an -c:v libx264 -preset slow -crf 25 -maxrate 1300k -bufsize 2600k -profile:v high -pix_fmt yuv420p -movflags +faststart "$D/video/s2u-table-464.mp4"
ff -i "$T/v4.mp4" -vf "select=eq(n\,0)" -frames:v 1 "$T/v4-poster.png"

# ---- vid-002 (own Instagram reel, 720x1280): the dossier's cut 44-56 s, hands, leaves and twine, no face.
# 4:5 crop at native width, shown as a <= 300 CSS px tile in the "also for owners" block.
ff -ss 44 -t 12 -i "$V/vid-002-source.mp4" -vf "crop=720:900:0:190,fps=30,format=yuv420p" -an -c:v libx264 -crf 12 -preset medium "$T/v2.mp4"
ff -i "$T/v2.mp4" -vf "scale=560:700" -an -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -deadline good -cpu-used 2 "$D/video/s2u-leaves-560.webm"
ff -i "$T/v2.mp4" -vf "scale=560:700" -an -c:v libx264 -preset slow -crf 26 -maxrate 1100k -bufsize 2200k -profile:v high -pix_fmt yuv420p -movflags +faststart "$D/video/s2u-leaves-560.mp4"
ff -i "$T/v2.mp4" -vf "select=eq(n\,0),scale=560:700" -frames:v 1 "$T/v2-poster.png"

# ---- business media published on its own channels but not in the dossier's assets: the podcast's own
# artwork (dossier.podcast.cover_image_url).
curl -fsS -o "$T/podcast.jpg" 'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/13431400/22ed40584498092f.jpeg'

python3 - "$A" "$C" "$D/img" "$T" <<'PY'
import sys
from PIL import Image, ImageOps
A, C, O, T = sys.argv[1:5]
def load(p, mode='RGB'): return Image.open(p).convert(mode)
def crop(im, ratio, fx=.5, fy=.5):
    """crop to a ratio (w/h) around a point of interest given as fractions of the frame"""
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio); x = max(0, min(w - nw, round(w * fx - nw / 2))); return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio); y = max(0, min(h - nh, round(h * fy - nh / 2))); return im.crop((0, y, w, y + nh))
def out(im, name, width, q=78):
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=q, method=6)
    print(f'{name}.webp {im.size}')

# hero / set-piece: img-011, the Brand Manager Day 2024 stage, full frame (never upscaled)
s = load(f'{A}/img-011.jpg')
out(s, 'hero-2000', 2000, 90); out(s, 'hero-1440', 1440, 88)
# phone: 4:5 of the stage's end (x 1182-2000): Hadas on the lit stage, no slide text cut (the slide's words end at x 1125)
out(s.crop((1182, 0, 2000, 1023)), 'hero-m-800', 800, 86)

# the four stage photos, all 4:5 (each fills the end half of the pinned viewport, full height)
for src, name, fx in [(f'{A}/img-003.jpg', 'st-sensing', .52), (f'{A}/img-012.jpg', 'st-thinking', .5),
                      (f'{C}/photo-03.jpg', 'st-making', .5), (f'{A}/img-ig-01.jpg', 'st-influencing', .5)]:
    im = crop(load(src), .8, fx); out(im, name + '-1000', 1000, 80); out(im, name + '-600', 600, 80)
out(load(f'{T}/v4-poster.png'), 's2u-table-poster', 464, 80)
out(load(f'{T}/v2-poster.png'), 's2u-leaves-poster', 560, 80)

# intro: img-034 (Hadas laughing beside the WHO ARE YOU? canvas), 3:4 around her
out(crop(load(f'{A}/img-034.jpg'), .75, .46), 'intro-hadas-900', 900)

# past programmes: the three Instagram posts' own images, 1:1
out(crop(load(f'{A}/img-033.jpg'), 1, .575), 'prog-2024', 720)   # Brand Manager Day 2024 itself (ig-01 is the INFLUENCING slide)
out(load(f'{A}/img-ig-04.jpg'), 'prog-kfarblum', 720)
out(load(f'{A}/img-ig-05.jpg'), 'prog-festival', 720)

# closing / proof marks, shown as on the client's site
def mark(p, name, w):
    im = Image.open(p).convert('RGBA'); im = im.crop(im.getbbox()); im.thumbnail((w, w), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=88, method=6); print(name, im.size)
mark(f'{A}/img-040.png', 'award-seal', 260)
mark(f'{A}/img-041.png', 'btc-seal', 200)
# brand icon and wordmark: the client's white PNGs, alpha kept, never redrawn
mark(f'{A}/logo-icon.png', 'icon-white', 720)
mark(f'{A}/logo-wordmark.png', 'wordmark-white', 640)

# client logos: one white ink on transparent, for the deep-green ground (same reading of each logo's
# ink as series 1 interactive's recipe; a logo printed inside its own dark box is knocked out to its letters)
import os
for i in range(44, 59):
    for ext in ('.jpg', '.png'):
        f = os.path.join(A, 'img-%03d%s' % (i, ext))
        if not os.path.exists(f): continue
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
            if sum(ink.getdata()) / (ink.width * ink.height) > 120:
                g = ImageOps.autocontrast(ImageOps.invert(g), cutoff=2); ink = mk(g, 190)
                bb2 = ink.getbbox(); g, ink = (g.crop(bb2), ink.crop(bb2)) if bb2 else (g, ink)
        o = Image.new('RGBA', g.size, (255, 255, 255, 255)); o.putalpha(ink)
        o.thumbnail((360, 160), Image.LANCZOS); o.save(f'{O}/logo-{i:03d}.webp', 'WEBP', quality=90, method=6)
        print('logo', i, o.size)

# team, 4:5 around the face (founder: img-010; img-013 and img-c06 are selfies and stay out)
def c45(im, cx=.5, top=0.):
    w, h = im.size
    if w / h > .8:
        nw = round(h * .8); x = max(0, min(w - nw, round(w * cx - nw / 2))); return im.crop((x, 0, x + nw, h))
    nh = round(w / .8); y = max(0, min(h - nh, round(h * top))); return im.crop((0, y, w, y + nh))
out(c45(load(f'{A}/img-010.jpg'), .5), 'team-hadas', 560)
out(c45(load(f'{A}/img-036.png')), 'team-tamar', 480)
out(c45(load(f'{A}/img-037.jpg'), .45), 'team-yael', 480)
out(c45(load(f'{A}/img-038.jpg')), 'team-dana', 480)
out(c45(load(f'{A}/img-039.png')), 'team-lior', 480)

# Instagram strip, square: photo-led posts first; never ig-06; ig-01/04/05 already sit by their talk lines,
# ig-09 is the cover of the vid-002 clip on the page, ig-07 prints an older workshop price
for t in ['ig-03', 'ig-08', 'ig-02', 'ig-11', 'ig-12', 'ig-10']:
    out(crop(load(f'{A}/img-{t}.jpg'), 1, .5, .5), t, 560)

out(load(f'{T}/podcast.jpg'), 'podcast', 560)
PY

# ---- fonts (OFL, Google Fonts): Secular One (display) and Heebo 400-600 (text), Hebrew + Latin subsets,
# self-hosted (build.py inlines them), so the page makes no third-party request
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
curl -fsS -A "$UA" 'https://fonts.googleapis.com/css2?family=Secular+One&family=Heebo:wght@400..600&display=swap' > "$T/f.css"
python3 - "$D/fonts" "$T/f.css" <<'PY2'
import re, sys, urllib.request
out, css = sys.argv[1], open(sys.argv[2]).read()
for sub, fam, url in re.findall(r"/\* (\w[\w-]*) \*/\s*@font-face \{[^}]*?font-family: '([^']+)';[^}]*?url\((https://[^)]+\.woff2)\)", css):
    if sub not in ('hebrew', 'latin'): continue
    name = ('secular' if fam == 'Secular One' else 'heebo') + '-' + sub + '.woff2'
    urllib.request.urlretrieve(url, out + '/' + name); print('font', name)
PY2
ls -la "$D/img" "$D/video" "$D/fonts" | awk '{print $5, $9}'
