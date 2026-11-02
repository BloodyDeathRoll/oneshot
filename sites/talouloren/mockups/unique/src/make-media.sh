#!/usr/bin/env bash
# Every image, video and font of the talouloren unique mockup ("ההיפוך", The Flip), made from the
# business-owned dossier assets (dossier/talouloren/assets, all license business-owned) and the
# OFL fonts Bellefair + IBM Plex Sans Hebrew (Google Fonts, self-hosted). Nothing is upscaled.
# Video lives in the media store (~/.oneshot/assets, docs/team.md): dist/video is a symlink to
# <store>/talouloren/mockups/unique/video.
# Usage: bash sites/talouloren/mockups/unique/src/make-media.sh
# media: sites/talouloren/mockups/unique/dist/img/**
# media: sites/talouloren/mockups/unique/dist/video/**
# media: sites/talouloren/mockups/unique/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/talouloren/assets
V=$A/video
D=sites/talouloren/mockups/unique/dist
STORE=${ONESHOT_ASSETS:-$HOME/.oneshot/assets}/talouloren/mockups/unique/video
rm -rf "$D/img"; mkdir -p "$D/img" "$D/fonts" "$STORE"
[ -e "$D/video" ] || ln -s "$STORE" "$D/video"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }
src() { ls "$V/vid-$1-source".* | grep -v '\.part$' | head -1; }
dur() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }

# ---- vid-036 (BRAND YOURSELF trailer, 1920x1080): the wide behind-the-lights shot. The dossier's 30-42 s
# cut holds four cuts, a glitch and a burned-in title (39 s); the one clean take of the wide is 43.05-47.35 s,
# slowed to 1.4x length (6 s, the playbook floor). Desktop 1920 wide; phone a 4:5 crop around the stool
# and the lamp (focal x ~56 %), 720x900. Muted.
S36=$(src 036)
ff -ss 43.05 -t 4.3 -i "$S36" -vf "setpts=1.4*PTS,scale=1920:-2,fps=25,format=yuv420p" -an -c:v libvpx-vp9 -b:v 1800k -maxrate 2400k -row-mt 1 -deadline good -cpu-used 2 "$D/video/stage-d.webm"
ff -ss 43.05 -t 4.3 -i "$S36" -vf "setpts=1.4*PTS,scale=1920:-2,fps=25,format=yuv420p" -an -c:v libx264 -preset slow -b:v 2200k -maxrate 2600k -bufsize 4M -movflags +faststart "$D/video/stage-d.mp4"
CROP="crop=864:1080:min(max(iw*0.56-432\,0)\,iw-864):0,scale=720:900"
ff -ss 43.05 -t 4.3 -i "$S36" -vf "setpts=1.4*PTS,$CROP,fps=25,format=yuv420p" -an -c:v libvpx-vp9 -b:v 900k -maxrate 1200k -row-mt 1 -deadline good -cpu-used 2 "$D/video/stage-m.webm"
ff -ss 43.05 -t 4.3 -i "$S36" -vf "setpts=1.4*PTS,$CROP,fps=25,format=yuv420p" -an -c:v libx264 -preset slow -b:v 1100k -maxrate 1300k -bufsize 2M -movflags +faststart "$D/video/stage-m.mp4"
ff -ss 45 -i "$S36" -frames:v 1 "$T/stage.png"
ff -ss 63 -i "$S36" -frames:v 1 "$T/profile.png"      # Tal in profile, half his face lit
ff -ss 28 -i "$(src 027)" -frames:v 1 "$T/band.png"     # vid-027: Tal at the workshop, arms open to the room

# ---- posters of the films used in slots (embed URL + poster). Frame times picked from the sheets.
pf() { ff -ss "$2" -i "$(src "$1")" -frames:v 1 "$T/p$1.png"; }
pf 038 204; pf 022 90; pf 055 17; pf 020 15        # the four Home cases
pf 060 6; pf 042 20; pf 013 15; pf 058 20; pf 024 20; pf 027 24   # /work, boots
for i in 043 046 067 052 049 018 016 035 019 053 021 006 002 041 039 045; do f=$(src $i); pf $i "$(python3 -c "print(round($(dur "$f")*0.35,1))")"; done   # /brands and /watch films
for i in 007 004 011 012 048 059 010 040 009 030; do f=$(src $i); pf $i "$(python3 -c "print(round($(dur "$f")*(0.5 if '$i'=='012' else 0.3),1))")"; done

python3 - "$A" "$D/img" "$T" <<'PY'
import sys, os
from PIL import Image, ImageOps, ImageEnhance
A, O, T = sys.argv[1:4]
def load(p): return ImageOps.exif_transpose(Image.open(p)).convert('RGB')
def crop(im, ratio, fx=.5, fy=.5):
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio); x = round((w - nw) * fx); return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio); y = round((h - nh) * fy); return im.crop((0, y, w, y + nh))
def unbox(im):
    g = ImageOps.grayscale(im).point(lambda v: 255 if v < 235 else 0); bb = g.getbbox()
    im = im.crop(bb) if bb and (bb[2]-bb[0])*(bb[3]-bb[1]) > im.width*im.height*0.3 else im
    # trim black letterbox bars: rows whose brightest pixel stays under 24
    g = ImageOps.grayscale(im); w, h = g.size; px = g.load()
    dark = lambda y: max(px[x, y] for x in range(0, w, 4)) < 24
    t = 0
    while t < h // 4 and dark(t): t += 1
    b = h
    while b > h * 3 // 4 and dark(b - 1): b -= 1
    return im.crop((0, t, w, b)) if (t or b < h) else im
def mono(im, c=1.08): return ImageEnhance.Contrast(ImageOps.grayscale(im).convert('RGB')).enhance(c)
def out(im, name, width, q=78):
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=q, method=6)
    print(name, im.size, os.path.getsize(f'{O}/{name}.webp') // 1024, 'KB')
# stage: the loop's poster and the profile still (first screen, in the beam's pool)
st = load(f'{T}/stage.png'); out(st, 'stage-d', 1920, 72); out(crop(st, 4/5, .56), 'stage-m', 720, 74)
pr = load(f'{T}/profile.png'); out(pr, 'profile-d', 1920, 72); out(ImageEnhance.Brightness(crop(pr, 4/5, .87)).enhance(1.35), 'profile-m', 720, 76)   # round 8: whole face in frame, lifted for the phone
# partners: Tal = vid-033 still 4:5 (864x1080 around his face); img-001 head crop for /about
out(load(f'{A}/img-001.jpg').crop((376, 12, 784, 522)), 'tal-001-p', 408, 84)   # round 8: 4:5 head crop above the baked signature, the only confirmed photo of Tal
# Shahar's work strip, one ratio (4:3), kept in colour, small
for i in ('107', '110', '105'): out(crop(load(f'{A}/img-{i}.jpg'), 4/3), f'work-{i}', 640, 78)
# full-bleed and route heroes, never past native width
bd = mono(load(f'{T}/band.png'), 1.12); out(bd, 'band-d', 1920, 74); out(crop(bd, 4/5, .3), 'band-m', 720, 76)   # partnership band (round 7: img-021 crop was unreadable)
for i, w in (('025', 1500), ('029', 1500), ('014', 2000), ('019', 2000), ('022', 1500)):
    im = load(f'{A}/img-{i}.jpg'); out(im, f'img-{i}', w, 76); out(crop(im, 4/5, .62 if i == '025' else .5), f'img-{i}-m', 800, 76)
# case and film posters, graded to black and white like the archive (the page has one hue: gold)
for i in ('038', '022', '055', '020'):
    p = mono(unbox(load(f'{T}/p{i}.png'))); out(p, f'case-{i}', 1920, 72); out(crop(p, 4/5), f'case-{i}-m', 800, 74)
for i in ('060', '042', '013', '058', '024', '027', '043', '046', '067', '052', '049', '018', '016', '035', '019', '053', '021', '006', '002', '041', '039', '045'): out(mono(unbox(load(f'{T}/p{i}.png'))), f'film-{i}', 960, 74)
for i in ('007', '004', '011', '012', '048', '059', '010', '040', '009', '030'):
    out(crop(mono(unbox(load(f'{T}/p{i}.png'))), 9/16), f'v-{i}', 405, 74)
PY
for c in gold white black; do cp "$A/sig-$c.svg" "$D/img/sig-$c.svg"; done

# ---- fonts (OFL, Google Fonts), subset with text= to the characters of the passed copy + the page's own
# labels (round 7: cuts the inlined fonts from ~88 KB to a few KB each, so the first paint is not held up)
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
rm -f "$D"/fonts/*.woff2
TXT=$(python3 - <<'PY'
import json, urllib.parse
s = set(chr(c) for c in range(32, 127)) | set('׳״־–—·…’‘“”€₪©✓←→×')
for l in ('he', 'en'): s |= set(open(f'sites/talouloren/copy/{l}.json', encoding='utf-8').read())
s |= set(open('sites/talouloren/mockups/unique/src/page.js', encoding='utf-8').read())
print(urllib.parse.quote(''.join(sorted(c for c in s if c.isprintable()))))
PY
)
sub() { curl -fsS -A "$UA" "https://fonts.googleapis.com/css2?family=$1&text=$TXT&display=block" | grep -o 'https://[^)]*' | head -1; }
curl -fsS -o "$D/fonts/bellefair.woff2" "$(sub Bellefair)"
curl -fsS -o "$D/fonts/plex-400.woff2" "$(sub 'IBM+Plex+Sans+Hebrew:wght@400')"
curl -fsS -o "$D/fonts/plex-500.woff2" "$(sub 'IBM+Plex+Sans+Hebrew:wght@500')"
ls -la "$D/img" "$D/video/" "$D/fonts"
