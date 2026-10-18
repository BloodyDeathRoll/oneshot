#!/usr/bin/env bash
# Every image, video and font of the series-2 interactive mockup ("בחרו פורמט", Pick a format),
# made from the business-owned dossier assets (and two files from the business's own channels,
# see "remote" below). Nothing is upscaled; every run of pictures is cropped to one ratio.
# Video lives in the media store (~/.oneshot/assets, docs/team.md): dist/video is linked to
# <store>/mutag-meitiv/mockups/interactive/video, the folder tools/link-assets.sh uses for this path.
# Files there carry an "s2i-" prefix so they never clash with series 1's clips in the same folder.
# Usage: bash sites/mutag-meitiv/mockups/interactive/src/make-media.sh
# media: sites/mutag-meitiv/mockups/interactive/dist/img/**
# media: sites/mutag-meitiv/mockups/interactive/dist/video/**
# media: sites/mutag-meitiv/mockups/interactive/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/mutag-meitiv/assets
C=dossier/mutag-meitiv/client/2026-10-18
D=sites/mutag-meitiv/mockups/interactive/dist
STORE=${ONESHOT_ASSETS:-$HOME/.oneshot/assets}/mutag-meitiv/mockups/interactive/video
mkdir -p "$D/img" "$D/fonts" "$STORE"
[ -e "$D/video" ] || ln -s "$STORE" "$D/video"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# ---- vid-004 (client clip, 464x832, the workshop table from above): the dossier's cut 2-14 s,
# cropped 4:5 (464x580) around the collage, muted. For the MAKING card of the method deck.
V="crop=464:580:0:120,fps=25,format=yuv420p"
ff -ss 2 -t 12 -i "$A/video/vid-004-source.mp4" -vf "$V" -an -c:v libvpx-vp9 -b:v 560k -maxrate 760k -row-mt 1 -deadline good -cpu-used 2 "$D/video/s2i-making.webm"
ff -ss 2 -t 12 -i "$A/video/vid-004-source.mp4" -vf "$V" -an -c:v libx264 -preset slow -b:v 760k -maxrate 950k -bufsize 2M -pix_fmt yuv420p -movflags +faststart "$D/video/s2i-making.mp4"
ff -ss 3 -i "$A/video/vid-004-source.mp4" -frames:v 1 -vf "crop=464:580:0:120" "$T/making-poster.png"

# ---- remote: business media on its own channels, not in the dossier assets (as series-1 calm):
# the podcast artwork (dossier.podcast.cover_image_url) and the one blog cover among the newest posts
# that is the site account's own Wix media (5b80b1_..., post 2026-05-28).
curl -fsS -o "$T/podcast.jpg" 'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/13431400/22ed40584498092f.jpeg'
curl -fsS -o "$T/post-2026-05-28.png" 'https://static.wixstatic.com/media/5b80b1_f2a019ea5e1b4fbe9df254fdec3d95ff~mv2.png'

python3 - "$A" "$C" "$D/img" "$T" <<'PY'
import sys, os
from PIL import Image, ImageOps
A, C, O, T = sys.argv[1:5]
def load(p, mode='RGB'): return ImageOps.exif_transpose(Image.open(p)).convert(mode)
def crop(im, ratio, fx=.5, fy=.5):
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio); x = round((w - nw) * fx); return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio); y = round((h - nh) * fy); return im.crop((0, y, w, y + nh))
def out(im, name, width, q=78):
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=q, method=6)
    print(name, im.size, os.path.getsize(f'{O}/{name}.webp') // 1024, 'KB')

# hero, one photo per format. Desktop 3:2 (object-fit: cover fills the viewport), phone 4:5.
HERO = {  # name: (file, desktop fx, fy, phone fx, fy)
    'talk':  (f'{A}/img-ig-01.jpg',     .5, .40, .5, .5),   # Hadas on stage, green dress (1440x1800)
    'team':  (f'{C}/photo-05.jpg',      .5, .45, .5, .5),   # the eight women with their boards (1600x1200)
    'brand': (f'{A}/img-003.jpg',       .5, .40, .62, .5),  # the WHO ARE YOU? canvas (2000x2000)
    'pro':   (f'{A}/img-032.jpg',       .5, .50, .78, .5),  # the Brand the Change card deck (2000x1333)
}
for k, (f, dx, dy, px, py) in HERO.items():
    im = load(f)
    out(crop(im, 3/2, dx, dy), f'hero-{k}-d', 1600, 86)
    out(crop(im, 4/5, px, py), f'hero-{k}-m', 800, 84)
    out(crop(im, 4/3, px if k != 'talk' else .5, .45 if k != 'talk' else .55), f'fmt-{k}', 900, 76)
# the method deck, 4:5
for name, f, fx, fy in (('st-sensing', f'{A}/img-006.jpg', .25, .5), ('st-thinking', f'{A}/img-012.jpg', .5, .55),
                        ('st-influencing', f'{A}/img-ig-08.jpg', .45, .5)):
    out(crop(load(f), 4/5, fx, fy), name, 800, 76)
out(load(f'{T}/making-poster.png'), 'st-making-poster', 464, 80)
# proof: the three talk posts, square thumbnails; the award seal as on the client's site
for i in ('01', '04', '05'):
    out(crop(load(f'{A}/img-ig-{i}.jpg'), 1, fy=.3 if i == '01' else .5), f'talk-{i}', 240, 80)
out(load(f'{A}/img-040.png', 'RGBA'), 'award-seal', 220, 90)
# closing: img-c05 3:1 (desktop) and 4:3 (phone)
c5 = load(f'{C}/photo-05.jpg')
out(crop(c5, 3/1, fy=.36), 'closing-d', 1600, 76); out(crop(c5, 4/3), 'closing-m', 800, 76)
# team, 4:5: founder from img-034 (concept), then the others as on the site
out(crop(load(f'{A}/img-034.jpg'), 4/5, fx=.45), 'team-hadas', 700)
for i, fy in (('036', .15), ('037', .3), ('038', 0), ('039', .3)):
    ext = 'png' if i in ('036', '039') else 'jpg'
    out(crop(load(f'{A}/img-{i}.{ext}'), 4/5, fy=fy), f'team-{i}', 500)
# Instagram strip: squares, never img-ig-06
for i, fy in (('01', .3), ('08', .5), ('03', .5), ('02', .35), ('09', .55), ('11', .5)):
    out(crop(load(f'{A}/img-ig-{i}.jpg'), 1, fy=fy), f'ig-{i}', 500, 76)
# content row
out(load(f'{T}/podcast.jpg'), 'podcast-art', 560, 82)
out(crop(load(f'{T}/post-2026-05-28.png'), 3/2), 'post-2026-05-28', 800)
# client logos, shown as on the client's site: one crisp deep-ink (#173B34) treatment on transparent,
# no boxes, never redrawn. Ink = darkness on white; a logo printed light-on-dark is inverted first.
for i in range(44, 59):
    for ext in ('.jpg', '.png'):
        f = f'{A}/img-{i:03d}{ext}'
        if not os.path.exists(f): continue
        im = Image.open(f).convert('RGBA'); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im)
        g = bg.convert('L'); w, h = g.size
        edge = [g.getpixel((x, y)) for x in range(0, w, max(1, w // 40)) for y in (0, h - 1)] + \
               [g.getpixel((x, y)) for y in range(0, h, max(1, h // 40)) for x in (0, w - 1)]
        neg = sum(edge) / len(edge) < 110
        hh = g.histogram(); med0 = next(i for i in range(256) if sum(hh[:i + 1]) >= sum(hh) / 2)
        if neg and 20 <= med0 <= 70 and sum(hh[:12]) > sum(hh) * 0.03:
            # black letters on a flattened dark-grey ground (a transparent logo saved without its alpha)
            ink = g.point(lambda v, m=med0: 0 if v >= m - 6 else min(255, int((m - 6 - v) * 255 / (m - 6))))
            bb = ink.getbbox(); ink = ink.crop(bb)
            o = Image.new('RGBA', ink.size, (23, 59, 52, 255)); o.putalpha(ink); o.thumbnail((440, 200), Image.LANCZOS)
            o.save(f'{O}/logo-{i:03d}.webp', 'WEBP', quality=92, method=6); continue
        if neg: g = ImageOps.invert(g)
        g = ImageOps.autocontrast(g, cutoff=1)
        hist = g.histogram(); tot = sum(hist); acc = 0
        for med, c in enumerate(hist):
            acc += c
            if acc >= tot / 2: break
        cut = min(225, med - 30) if med > 120 else 225   # the paper of the logo, whatever its tone
        ink = g.point(lambda v, cut=cut: 0 if v > cut else min(255, int((cut - v) * 255 / max(60, cut * 0.6))))
        bb = ink.getbbox()
        if bb:
            g, ink = g.crop(bb), ink.crop(bb)
            if not neg and sum(ink.getdata()) / (ink.width * ink.height) > 150:   # a logo inside its own dark box: keep the letters
                g = ImageOps.autocontrast(ImageOps.invert(g), cutoff=2)
                ink = g.point(lambda v: 0 if v > 200 else min(255, int((200 - v) * 2.6)))
                bb2 = ink.getbbox()
                if bb2: g, ink = g.crop(bb2), ink.crop(bb2)
        o = Image.new('RGBA', g.size, (23, 59, 52, 255)); o.putalpha(ink)
        o.thumbnail((440, 200), Image.LANCZOS)
        o.save(f'{O}/logo-{i:03d}.webp', 'WEBP', quality=92, method=6)
# brand marks: the white PNGs' own shapes, white and filled with the brand's deep green; never redrawn
def mark(src, name, width, hexc=None):
    im = load(src, 'RGBA'); im = im.crop(im.getbbox())
    if hexc:
        s = Image.new('RGBA', im.size, tuple(int(hexc[j:j + 2], 16) for j in (1, 3, 5)) + (255,)); s.putalpha(im.getchannel('A')); im = s
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=90, method=6, exact=True)
mark(f'{A}/logo-icon.png', 'icon-white', 240); mark(f'{A}/logo-icon.png', 'icon-green', 240, '#173B34')
mark(f'{A}/logo-wordmark.png', 'word-white', 400); mark(f'{A}/logo-wordmark.png', 'word-green', 400, '#173B34')
mark(f'{A}/logo-icon.png', 'icon-white-lg', 600)
PY

# ---- fonts (OFL, Google Fonts): Rubik variable 400-700, Hebrew + Latin subsets, self-hosted
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
curl -fsS -A "$UA" 'https://fonts.googleapis.com/css2?family=Rubik:wght@400..700&display=swap' > "$T/rubik.css"
pick() { awk -v s="/* $1 */" '$0==s{f=1} f&&/src: url/{match($0,/https:[^)]*/);print substr($0,RSTART,RLENGTH);exit}' "$T/rubik.css"; }
curl -fsS -o "$D/fonts/rubik-hebrew.woff2" "$(pick hebrew)"
curl -fsS -o "$D/fonts/rubik-latin.woff2" "$(pick latin)"
ls -la "$D/img" "$D/video/" "$D/fonts"
