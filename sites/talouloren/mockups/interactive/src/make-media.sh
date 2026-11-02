#!/usr/bin/env bash
# Every image, video and font of the talouloren interactive mockup ("הזרקור", The Spot), made from
# the business-owned dossier assets (dossier/talouloren/assets, all licence business-owned) and two
# OFL font families. Nothing is upscaled; every run of pictures is cropped to one ratio.
# Video lives in the media store (~/.oneshot/assets, docs/team.md): dist/video is a symlink to
# <store>/talouloren/mockups/interactive/video (the folder tools/link-assets.sh uses for this path).
# Usage: bash sites/talouloren/mockups/interactive/src/make-media.sh
# media: sites/talouloren/mockups/interactive/dist/img/**
# media: sites/talouloren/mockups/interactive/dist/video/**
# media: sites/talouloren/mockups/interactive/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/talouloren/assets
V=$A/video
D=sites/talouloren/mockups/interactive/dist
STORE=${ONESHOT_ASSETS:-$HOME/.oneshot/assets}/talouloren/mockups/interactive/video
rm -rf "$D/img"; mkdir -p "$D/img" "$D/fonts" "$STORE"
[ -e "$D/video" ] || ln -s "$STORE" "$D/video"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# ---- hero loop: vid-033 "SUCCESS IS BALANCE", Tal close on pure black, 10-22 s (concepts 4.2),
# cropped 960x1080 around his face (x 620-1580 of the 1920 frame), muted, a 0.4 s dip to black at
# both ends so the loop seam reads as the light going out and coming back.
HV="crop=960:1080:620:0,fps=25,fade=t=in:st=0:d=0.4,fade=t=out:st=11.6:d=0.4,format=yuv420p"
ff -ss 10 -t 12 -i "$V/vid-033-source.mp4" -an -vf "$HV" -c:v libx264 -preset slow -b:v 900k -maxrate 1200k -bufsize 2M -movflags +faststart "$STORE/hero-d.mp4"
ff -ss 10 -t 12 -i "$V/vid-033-source.mp4" -an -vf "$HV" -c:v libvpx-vp9 -b:v 650k -maxrate 900k -row-mt 1 -deadline good -cpu-used 2 "$STORE/hero-d.webm"
ff -ss 10 -t 12 -i "$V/vid-033-source.mp4" -an -vf "$HV,scale=720:810" -c:v libx264 -preset slow -b:v 600k -maxrate 800k -bufsize 1500k -movflags +faststart "$STORE/hero-m.mp4"
ff -ss 10 -t 12 -i "$V/vid-033-source.mp4" -an -vf "$HV,scale=720:810" -c:v libvpx-vp9 -b:v 420k -maxrate 600k -row-mt 1 -deadline good -cpu-used 2 "$STORE/hero-m.webm"

# ---- stills from the business's own films (frame times read off the dossier sheets)
grab() { ff -ss "$2" -i "$1" -frames:v 1 "$T/$3.png"; }
grab "$V/vid-033-source.mp4" 10.6 hero      # hero poster = the loop's first lit frame
grab "$V/vid-038-source.mp4" 230  c-amdocs  # Amdocs workshop table, B&W (letterboxed)
grab "$V/vid-022-source.mp4" 20   c-maccabi # Maccabi clinic, white coat
grab "$V/vid-055-source.webm" 33  c-seat    # SEAT, the man in the yellow chair (1080 square)
grab "$V/vid-020-source.mp4" 22   c-bavli   # Park Bavli penthouse, the dancer
grab "$V/vid-015-source.mp4" 8    story     # Tal to camera, B&W on grey
cp "$V/vid-027-poster.jpg" "$T/launch.jpg"
cp "$V/vid-036-poster.jpg" "$T/course.jpg"
grab "$V/vid-029-source.mp4" 125  c-wella
grab "$V/vid-042-source.mp4" 48   c-ck  # the CK photo booth under the studio light
grab "$V/vid-040-source.webm" 12  w-040     # vertical testimonial films (720x900)
grab "$V/vid-009-source.webm" 30  w-009
grab "$V/vid-030-source.mp4" 30   w-030
grab "$V/vid-048-source.mp4" 10   w-048
grab "$V/vid-059-source.mp4" 10   w-059

python3 - "$A" "$D/img" "$T" <<'PY'
import sys, os
from PIL import Image, ImageOps
A, O, T = sys.argv[1:4]
def load(p, mode='RGB'): return ImageOps.exif_transpose(Image.open(p)).convert(mode)
def crop(im, ratio, fx=.5, fy=.5):
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio); x = round((w - nw) * fx); return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio); y = round((h - nh) * fy); return im.crop((0, y, w, y + nh))
def out(im, name, width, q=80):
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=q, method=6)
    print(name, im.size, os.path.getsize(f'{O}/{name}.webp') // 1024, 'KB')

h = load(f'{T}/hero.png').crop((620, 0, 1580, 1080))          # same window as the loop
out(h, 'hero-d', 960, 82); out(h, 'hero-m', 720, 78)
# Tal's partner frame: img-001, the one confirmed photograph of Tal (dossier team[0].photos), cropped
# square to head and shoulders above the baked-in signature and "LE TEMPS DU SUCCÈS" (520x520, native)
out(load(f'{A}/img-001.jpg').crop((230, 10, 750, 530)), 'tal', 520, 86)
# doors, 4:5: Story = img-024 group shoot, Launch = img-020 man walking past the mural
out(crop(load(f'{A}/img-024.jpg'), 4/5, .62), 'door-story', 800)
out(crop(load(f'{A}/img-020.jpg'), 4/5, .62), 'door-launch', 796)
# partnership band: img-014, the Mercedes driver (2000 px)
b = load(f'{A}/img-014.jpg'); out(b, 'band-d', 2000, 78); out(crop(b, 4/5, .62), 'band-m', 900, 78)
# case posters, 16:9 (the Amdocs film is letterboxed: crop inside the bars first)
out(crop(load(f'{T}/c-amdocs.png').crop((240, 135, 1680, 945)), 16/9), 'case-amdocs', 1280)
out(crop(load(f'{T}/c-maccabi.png'), 16/9), 'case-maccabi', 1280)
out(crop(load(f'{T}/c-seat.png'), 16/9, .5, .35), 'case-seat', 1080)
out(crop(load(f'{T}/c-bavli.png').crop((240, 136, 1680, 944)), 16/9), 'case-park-bavli', 1280)  # inside the film's white bars
out(crop(load(f'{T}/c-wella.png'), 16/9), 'case-wella', 1280)
out(crop(load(f'{T}/c-ck.png'), 16/9), 'case-calvin-klein', 1280)
# route heroes, 4:5
out(crop(load(f'{T}/story.png'), 4/5, .55), 'route-story', 864)
out(crop(load(f'{T}/launch.jpg'), 4/5, .5), 'route-launch', 864)
out(crop(load(f'{T}/course.jpg'), 16/9), 'route-course', 1600, 78)
out(crop(load(f'{A}/img-021.jpg'), 16/9), 'route-brands', 1920, 76)
# /watch: 9:16 cards. The three vertical films keep their own frame, the rest are centre-cropped.
for k in ['040', '009', '030', '048', '059']:
    out(crop(load(f'{T}/w-{k}.png'), 9/16), f'watch-{k}', 405, 76)
for k in ['amdocs', 'maccabi', 'seat', 'park-bavli', 'wella', 'calvin-klein']:
    out(crop(Image.open(f'{O}/case-{k}.webp').convert('RGB'), 9/16), f'watch-{k}', 405, 76)
# Shahar's work strip (Behance covers, 1381x1080), 4:3 crops
for k, n in [('107', 'sn-paleforce'), ('110', 'sn-cocacola'), ('105', 'sn-app')]:
    out(crop(load(f'{A}/img-{k}.jpg'), 4/3), n, 640)
# client marks: the white-ground logo JPEGs turned into white marks on transparent
# (alpha = how far a pixel is from the white ground), for the black page
for k, n in [('030', 'mercedes'), ('027', 'loreal'), ('034', 'wella'), ('001', 'mizrahi'), ('032', 'philip-morris'), ('002', 'castro')]:
    im = load(f'{A}/logo-{k}.jpg'); g = ImageOps.invert(im.convert('L'))
    g = g.point(lambda v: 0 if v < 18 else min(255, int((v - 18) * 1.6)))
    m = Image.new('RGBA', im.size, (255, 255, 255, 0)); m.putalpha(g)
    m = m.crop(g.getbbox()); m.save(f'{O}/logo-{n}.webp', 'WEBP', quality=90, method=6, lossless=False)
    print('logo', n, m.size)
PY
cp "$A/sig-gold.svg" "$D/img/sig-gold.svg"
cp "$A/sig-white.svg" "$D/img/sig-white.svg"

# ---- fonts (OFL): Karantina display, Heebo body; Hebrew + Latin subsets from Fontsource
for f in karantina:400 karantina:700 heebo:300 heebo:400 heebo:500; do
  fam=${f%%:*}; w=${f##*:}
  for s in hebrew latin; do
    curl -fsSL -o "$D/fonts/$fam-$s-$w.woff2" "https://cdn.jsdelivr.net/fontsource/fonts/$fam@latest/$s-$w-normal.woff2"
  done
done
ls -la "$D/fonts" "$STORE"
