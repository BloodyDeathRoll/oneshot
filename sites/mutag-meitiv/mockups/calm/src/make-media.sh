#!/usr/bin/env bash
# Every image, video and font of the series-2 calm mockup ("דף ההזמנה") of mutag-meitiv, from the
# business's own files in dossier/mutag-meitiv/{assets,client} (tools/link-assets.sh / tools/setup.sh first).
# Run from anywhere; rerun after changing a crop or a cut. Then: python3 src/build.py
# media: sites/mutag-meitiv/mockups/calm/dist/img/**
# media: sites/mutag-meitiv/mockups/calm/dist/video/**
# media: sites/mutag-meitiv/mockups/calm/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/mutag-meitiv/assets
C=dossier/mutag-meitiv/client/2026-10-18
D=sites/mutag-meitiv/mockups/calm/dist
mkdir -p "$D/img" "$D/video" "$D/fonts"
rm -f "$D"/img/*.webp "$D"/video/* "$D"/fonts/*
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# ---- vid-004 (client clip, 464x832): the dossier's cut 2-14 s, cropped to the method panels' 2:3
# at native pixels (464x696, centred), no audio, sized for a 360-580 CSS px panel (< 2 MB each)
ff -ss 2 -t 12 -i "$A/video/vid-004-source.mp4" -vf "crop=464:696:0:68,fps=30" -an \
   -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$D/video/table-464x696.webm"
ff -ss 2 -t 12 -i "$A/video/vid-004-source.mp4" -vf "crop=464:696:0:68,fps=30" -an \
   -c:v libx264 -crf 25 -preset slow -pix_fmt yuv420p -movflags +faststart "$D/video/table-464x696.mp4"
# poster = the first frame of the cut, so nothing jumps when the clip starts
ff -i "$D/video/table-464x696.mp4" -vf "select=eq(n\,0)" -frames:v 1 "$T/table-poster.png"

# ---- IBM Plex Sans Hebrew (OFL), 400 + 600, self-hosted: the woff2 subsets Google Fonts serves for
# Hebrew and Latin (unicode-range in page.css matches them); build.py inlines them into the page
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
curl -fsS -A "$UA" 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Hebrew:wght@400;600&display=swap' > "$T/plex.css"
python3 - "$T/plex.css" "$D/fonts" <<'PY'
import re, sys, urllib.request
css, out = open(sys.argv[1]).read(), sys.argv[2]
for sub, block in re.findall(r"/\* ([\w-]+) \*/\s*@font-face \{([^}]*)\}", css):
    if sub not in ('hebrew', 'latin'): continue
    w = re.search(r'font-weight: (\d+)', block).group(1)
    url = re.search(r'url\((https://[^)]+\.woff2)\)', block).group(1)
    urllib.request.urlretrieve(url, f'{out}/plex-{w}-{sub}.woff2')
PY

# ---- business media published on its own channels but not in the dossier's assets:
# the podcast artwork (dossier.podcast.cover_image_url) and the 2026-05-28 blog cover, the site
# account's own Wix media (5b80b1_…). Not fetched: the 2026-08-22 cover (a portrait of Marina
# Abramović, photographer not stated) and the 2026-04-22 cover (Wix's Unsplash library).
curl -fsS -o "$T/post-2026-05-28.png" 'https://static.wixstatic.com/media/5b80b1_f2a019ea5e1b4fbe9df254fdec3d95ff~mv2.png'
curl -fsS -o "$T/podcast.jpg" 'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/13431400/22ed40584498092f.jpeg'

# ---- photographs and marks: crop / resize with PIL, WebP
python3 - "$A" "$C" "$D/img" "$T" <<'PY'
import sys
from PIL import Image, ImageOps
A, C, O, T = sys.argv[1:5]
def load(p, mode='RGB'): return Image.open(p).convert(mode)
def crop(im, ratio, fx=.5, fy=.5):
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio); x = round((w - nw) * fx); return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio); y = round((h - nh) * fy); return im.crop((0, y, w, y + nh))
def out(im, name, width, q=78):
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=q, method=6)
    return im.size

# hero, desktop: img-033 (2000x1333), Hadas in the green dress at the Brand Manager Day 2024 wall,
# 2.6:1 from above her hair down to the lanyard, stopping above the badge; full-bleed, so the
# 2000 px source is kept whole in width
h = load(f'{A}/img-033.jpg').crop((0, 0, 2000, 770))
out(h, 'img-033-hero-2000', 2000, 72); out(h, 'img-033-hero-1280', 1280, 74)
# hero, phone: 4:5, closer (800x1000 of the source, hair to mid-thigh, centred on her)
p = load(f'{A}/img-033.jpg').crop((730, 0, 1530, 1000))
out(p, 'img-033-hero-p800', 800, 74); out(p, 'img-033-hero-p560', 560, 74)
# intro: img-ig-01 (1440x1800, already 4:5), Hadas on stage before the BRAND THE CHANGE slide
out(load(f'{A}/img-ig-01.jpg'), 'img-ig-01-intro', 900, 76)
# method panels, all 2:3: SENSING img-003, THINKING img-032, INFLUENCING img-011 (the stage screen)
for name, src, fx in (('img-003-panel', f'{A}/img-003.jpg', .55), ('img-032-panel', f'{A}/img-032.jpg', .47),
                      ('img-011-panel', f'{A}/img-011.jpg', .27)):
    out(crop(load(src), 2/3, fx=fx), name, 800, 76)
out(load(f'{T}/table-poster.png'), 'vid-004-poster', 464, 80)
# closing: img-c05 (client, 1600x1200), the eight women with their boards; 3:1 desktop, 4:3 phone
out(crop(load(f'{C}/photo-05.jpg'), 3/1, fy=.2), 'img-c05-close-1600', 1600, 76)
out(load(f'{C}/photo-05.jpg'), 'img-c05-close-p900', 900, 76)
# team, 4:5: the founder from img-034 (yellow jacket, never the img-013 / img-c06 selfies), then the others
out(crop(load(f'{A}/img-034.jpg'), 4/5, fx=.52), 'img-034-founder', 700)
for i, ext, fy in (('036', 'png', .15), ('037', 'jpg', .3), ('038', 'jpg', 1), ('039', 'png', .3)):
    out(crop(load(f'{A}/img-{i}.{ext}'), 4/5, fy=fy), f'img-{i}-team', 520)
# Instagram strip, squares: photo-led tiles, never img-ig-06
for i, fy in (('01', .35), ('08', .5), ('03', .5), ('02', .4), ('09', .55), ('11', .5)):
    out(crop(load(f'{A}/img-ig-{i}.jpg'), 1, fy=fy), f'img-ig-{i}', 520, 76)
# blog cover 3:2 and podcast artwork (fetched above)
out(crop(load(f'{T}/post-2026-05-28.png'), 3/2), 'post-2026-05-28', 800)
out(load(f'{T}/podcast.jpg'), 'podcast-art', 560, 82)

# brand marks: the white PNGs' own shapes, filled with the brand's greens (never redrawn)
def tint(src, hexc, width, name):
    im = load(src, 'RGBA'); im = im.crop(im.getbbox())
    r, g, b = (int(hexc[i:i + 2], 16) for i in (1, 3, 5))
    solid = Image.new('RGBA', im.size, (r, g, b, 255)); solid.putalpha(im.getchannel('A'))
    if solid.width > width: solid = solid.resize((width, round(solid.height * width / solid.width)), Image.LANCZOS)
    solid.save(f'{O}/{name}.webp', 'WEBP', quality=90, method=6, exact=True)
tint(f'{A}/logo-icon.png', '#00574C', 200, 'icon-green')
tint(f'{A}/logo-wordmark.png', '#0A5150', 420, 'wordmark-green')
tint(f'{A}/logo-icon.png', '#FFFFFF', 400, 'icon-white')
tint(f'{A}/logo-icon.png', '#4BD1A0', 400, 'icon-mint')
# third-party marks, shown as on the current site: the award seal as published
im = load(f'{A}/img-040.png', 'RGBA'); im.thumbnail((240, 240)); im.save(f'{O}/img-040-award.webp', 'WEBP', quality=90, method=6)
# the 15 logos under "מודה על הזכות להטיב ב:": one crisp deep-ink (#173B34) treatment on transparent,
# no boxes. Ink = the logo's darkness on white; a logo printed light-on-dark is inverted first, and a logo
# set inside its own dark box has the box knocked out so only its letters stay. Shapes never redrawn.
for n in range(44, 59):
    src = f'{A}/img-0{n}.' + ('png' if n in (45, 48, 49, 55, 56, 57, 58) else 'jpg')
    im = load(src, 'RGBA'); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im)
    g = bg.convert('L'); w, h = g.size
    edge = [g.getpixel((x, y)) for x in range(0, w, max(1, w // 40)) for y in (0, h - 1)] + \
           [g.getpixel((x, y)) for y in range(0, h, max(1, h // 40)) for x in (0, w - 1)]
    if sum(edge) / len(edge) < 110: g = ImageOps.invert(g)
    g = ImageOps.autocontrast(g, cutoff=1)
    mk = lambda gg, cut=235: gg.point(lambda v: 0 if v > cut else min(255, int((255 - v) * 1.6)))
    gd = sorted(g.getdata()); bgv = gd[len(gd) // 2] if gd[len(gd) // 2] > 150 else 255
    ink = mk(g, min(235, bgv - 20)); bb = ink.getbbox()
    if bb:
        g = g.crop(bb); ink = ink.crop(bb)
        if sum(ink.getdata()) / (ink.width * ink.height) > 120:
            m = max(2, round(min(g.size) * .04))      # drop the box's own anti-aliased edge first
            g = g.crop((m, m, g.width - m, g.height - m))
            g = ImageOps.autocontrast(ImageOps.invert(g), cutoff=2); ink = mk(g, 190)
            bb2 = ink.getbbox(); g, ink = (g.crop(bb2), ink.crop(bb2)) if bb2 else (g, ink)
    ink = ink.point(lambda a: min(255, int(255 * (a / 255) ** .6)))   # light greys read as ink, never washed out
    o = Image.new('RGBA', g.size, (23, 59, 52, 255)); o.putalpha(ink)
    o.thumbnail((360, 160), Image.LANCZOS)
    o.save(f'{O}/img-0{n}-logo.webp', 'WEBP', quality=90, method=6, exact=True)
PY
ls -la "$D/img" "$D/video" "$D/fonts"
