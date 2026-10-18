#!/usr/bin/env bash
# Every image and video of the calm mockup ("ירוק בית") of mutag-meitiv, from the business's own
# files in dossier/mutag-meitiv/{assets,client} (tools/link-assets.sh / tools/setup.sh first).
# Run from anywhere; rerun after changing a crop or a cut.
# media: sites/mutag-meitiv/mockups/calm/dist/img/**
# media: sites/mutag-meitiv/mockups/calm/dist/video/**
# media: sites/mutag-meitiv/mockups/calm/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/mutag-meitiv/assets
C=dossier/mutag-meitiv/client/2026-10-18
D=sites/mutag-meitiv/mockups/calm/dist
mkdir -p "$D/img" "$D/video" "$D/fonts"
rm -f "$D"/img/*.webp
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# ---- vid-004 (client clip, 464x832): the dossier's cut 2-14 s, 4:5 crop at native pixels
# (464x580, centred), no audio. The d1920 mp4 is 2.39 MB, over the 2 MB phone cap, so both
# renditions are re-made here from the source at a size fit for a 232-300 CSS px tile.
ff -ss 2 -t 12 -i "$A/video/vid-004-source.mp4" -vf "crop=464:580:0:126,fps=30" -an \
   -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$D/video/table-464.webm"
ff -ss 2 -t 12 -i "$A/video/vid-004-source.mp4" -vf "crop=464:580:0:126,fps=30" -an \
   -c:v libx264 -crf 25 -preset slow -pix_fmt yuv420p -movflags +faststart "$D/video/table-464.mp4"
# poster = the first frame of the cut, so nothing jumps when the clip starts
ff -i "$D/video/table-464.mp4" -vf "select=eq(n\,0)" -frames:v 1 "$T/table-poster.png"


# ---- Heebo (OFL), self-hosted: the variable woff2 subsets Google Fonts serves for Hebrew and
# Latin, weights 300-600 in one file each (unicode-range in page.css matches these subsets)
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
curl -fsS -A "$UA" 'https://fonts.googleapis.com/css2?family=Heebo:wght@300..600&display=swap' > "$T/heebo.css"
pick() { awk -v s="/* $1 */" '$0==s{f=1} f&&/src: url/{match($0,/https:[^)]*/);print substr($0,RSTART,RLENGTH);exit}' "$T/heebo.css"; }
curl -fsS -o "$D/fonts/heebo-hebrew.woff2" "$(pick hebrew)"
curl -fsS -o "$D/fonts/heebo-latin.woff2" "$(pick latin)"

# ---- business media published on its own channels but not in the dossier's assets: the covers of
# the 3 newest blog posts (dossier.blog.posts[].cover_image_url) where the file is the site
# account's own Wix media (5b80b1_…), and the podcast artwork (dossier.podcast.cover_image_url).
# Not fetched (the page shows a branded tile instead): the 2026-04-22 cover is Wix's Unsplash library
# (nsplsh_…), and the 2026-08-22 cover is a portrait of Marina Abramović whose photographer is not stated.
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

# hero: img-013 (1728x2000), Hadas looking into the lens, green shirt; 4:5 around her face
h = crop(load(f'{A}/img-013.jpg'), 4/5, fy=.35)
out(h, 'img-013-hero-1000', 1000, 80); out(h, 'img-013-hero-720', 720, 78)
# lead services, 4:3
s = crop(load(f'{A}/img-003.jpg'), 4/3, fy=.42); out(s, 'img-003-1200', 1200); out(s, 'img-003-720', 720)
s = crop(load(f'{A}/img-012.jpg'), 4/3, fy=.55); out(s, 'img-012-1200', 1200); out(s, 'img-012-720', 720)
# method set-piece: one photo per stage, all 4:5
for i, src, fx, fy in (('006', f'{A}/img-006.jpg', .3, .5), ('032', f'{A}/img-032.jpg', .55, .5),
                       ('c03', f'{C}/photo-03.jpg', .5, .6), ('ig-01', f'{A}/img-ig-01.jpg', .5, .5)):
    out(crop(load(src), 4/5, fx, fy), f'img-{i}-stage', 900)
# full-bleed band: img-007 (1600x756), overhead vision-map table, 3:1
b = crop(load(f'{A}/img-007.jpg'), 3/1, fy=.5); out(b, 'img-007-band-1600', 1600, 78); out(b, 'img-007-band-900', 900)
# workshops pair: img-030 (1200x1600), overhead round tables, 4:5
out(crop(load(f'{A}/img-030.jpg'), 4/5, fy=.5), 'img-030-pair', 1000)
# closing: img-c05 (1600x1200), the eight women with their boards, wide 2:1
s = crop(load(f'{C}/photo-05.jpg'), 2/1, fy=.45); out(s, 'img-c05-1600', 1600); out(s, 'img-c05-800', 800)
# team, 4:5: founder from img-034 (no baked-in band, unlike img-001), the others as on the site
out(crop(load(f'{A}/img-034.jpg'), 4/5, fx=.52), 'img-034-founder', 700)
for i, fy in (('036', .15), ('037', .3), ('038', 1), ('039', .3)):
    ext = 'png' if i in ('036', '039') else 'jpg'
    out(crop(load(f'{A}/img-{i}.{ext}'), 4/5, fy=fy), f'img-{i}-team', 600)
# vid-004 poster
out(load(f'{T}/table-poster.png'), 'vid-004-poster', 464, 80)
# Instagram strip, squares: photo-led tiles only, never img-ig-06
for i, fy in (('03', .5), ('01', .35), ('02', .4), ('09', .55), ('08', .5), ('11', .5)):
    out(crop(load(f'{A}/img-ig-{i}.jpg'), 1, fy=fy), f'img-ig-{i}', 600, 76)
# blog covers 3:2 and podcast artwork (fetched above)
out(crop(load(f'{T}/post-2026-05-28.png'), 3/2), 'post-2026-05-28', 800)
out(load(f'{T}/podcast.jpg'), 'podcast-art', 560, 82)
# brand marks (white PNGs, alpha kept)
def mark(src, name, width):
    im = load(src, 'RGBA'); im = im.crop(im.getbbox())
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=90, method=6, exact=True)
mark(f'{A}/logo-icon.png', 'logo-icon', 1000)
# the icon as a CSS mask, small enough to inline (masks need http, not file://)
im = load(f'{A}/logo-icon.png', 'RGBA'); im = im.crop(im.getbbox()).resize((600, 397), Image.LANCZOS)
im.save(f'{O}/logo-icon-mask.webp', 'WEBP', quality=70, method=6)
mark(f'{A}/logo-wordmark.png', 'logo-wordmark', 640)
# third-party marks, shown as on the current site
mark(f'{A}/img-040.png', 'img-040-award', 240)
mark(f'{A}/img-041.png', 'img-041-btc', 240)
for n in range(44, 59):
    src = f'{A}/img-0{n}.' + ('png' if n in (45, 48, 49, 55, 56, 57, 58) else 'jpg')
    im = load(src, 'RGBA')
    if im.width > 360: im = im.resize((360, round(im.height * 360 / im.width)), Image.LANCZOS)
    im.save(f'{O}/img-0{n}-logo.webp', 'WEBP', quality=86, method=6)
PY
ls -la "$D/img" "$D/video"
