#!/usr/bin/env bash
# Every image, video and font of the talouloren calm mockup ("אור עליון", Top Light), made from the
# business-owned dossier assets (dossier/talouloren/assets/, all license business-owned).
# Nothing is upscaled; every run of pictures is cropped to one ratio.
# Video lives in the media store (~/.oneshot/assets, docs/team.md): dist/video is a symlink to
# <store>/talouloren/mockups/calm/video.
# Usage: bash sites/talouloren/mockups/calm/src/make-media.sh
# media: sites/talouloren/mockups/calm/dist/img/**
# media: sites/talouloren/mockups/calm/dist/video/**
# media: sites/talouloren/mockups/calm/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/talouloren/assets
V=$A/video
D=sites/talouloren/mockups/calm/dist
STORE=${ONESHOT_ASSETS:-$HOME/.oneshot/assets}/talouloren/mockups/calm/video
mkdir -p "$D/img" "$D/fonts" "$STORE"
[ -e "$D/video" ] || ln -s "$STORE" "$D/video"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -nostdin -v error -y "$@"; }
src() { ls "$V/vid-$1-source."* | grep -v '\.part$' | head -1; }

# ---- hero loop: vid-036, three clean shots of the dossier's 30-42 s span, which itself carries a glitch
# transition at 32.7 s and a text card at 38-39.9 s (scene cuts measured with ffmpeg scene detection):
# the wide top-lit shot 34.40-37.95, Tal to camera 40.00-42.90, the wide shot again 29.95-32.60 (9.1 s).
# Muted, 25 fps; H.264 MP4 (+faststart) and VP9 WebM at 1920 and 1280.
SRC36="$V/vid-036-source.mp4"
FC="[0:v]trim=34.40:37.95,setpts=PTS-STARTPTS[a];[0:v]trim=40.00:42.90,setpts=PTS-STARTPTS[b];[0:v]trim=29.95:32.60,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0,fps=25,format=yuv420p[v]"
ff -i "$SRC36" -filter_complex "$FC" -map "[v]" -an -c:v libx264 -crf 12 -preset fast "$T/hero-master.mp4"
for w in 1920 1280; do
  n=$([ $w = 1920 ] && echo d1920 || echo m1280); b=$([ $w = 1920 ] && echo 1500k || echo 850k)
  ff -i "$T/hero-master.mp4" -vf "scale=$w:-2" -an -c:v libx264 -preset slow -b:v $b -maxrate $b -bufsize 3M -pix_fmt yuv420p -movflags +faststart "$STORE/hero-$n.mp4"
  ff -i "$T/hero-master.mp4" -vf "scale=$w:-2" -an -c:v libvpx-vp9 -b:v $b -maxrate $b -bufsize 3M -row-mt 1 -deadline good -cpu-used 2 "$STORE/hero-$n.webm"
done
ff -i "$T/hero-master.mp4" -frames:v 1 "$T/hero.png"   # poster = the loop's first frame (35 s area, the top light)

# ---- stills from the business's own films: "<id> <seconds> <name>"
while read -r id t name; do
  ff -ss "$t" -i "$(src "$id")" -frames:v 1 "$T/$name.png"
done <<'L'
036 41 tal-036
038 212 case-amdocs
022 97 case-maccabi
055 13.8 case-seat
020 7.6 case-park-bavli
029 88.6 w-wella
060 4.5 w-eugene-perma
042 75 w-calvin-klein
013 19 w-visa-cal
058 14.4 w-doron-shefer
024 30 w-amt
023 30 w-rita
016 18 b-taboola
035 5.6 b-taboola-hilton
019 30 b-kornit
053 40 b-kornit-recap
021 30 b-bezeq
006 40 b-clalit
002 40 b-philip-morris
041 20 b-mercedes
039 20 b-success-drive
045 20 b-castro
009 20 v-009
030 20 v-030
040 30 v-040
007 6 v-amos
004 20 v-amos2
011 20 v-ronen
012 16 v-joya
010 20 v-magic
048 20 v-natali
059 20 v-ella
027 25 boots-027
015 12 flip-015
L

python3 - "$A" "$D/img" "$T" <<'PY'
import sys, os, glob
from PIL import Image, ImageOps
A, O, T = sys.argv[1:4]
def load(p): return ImageOps.exif_transpose(Image.open(p)).convert('RGB')
def crop(im, ratio, fx=.5, fy=.5):
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio); x = round((w - nw) * fx); return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio); y = round((h - nh) * fy); return im.crop((0, y, w, y + nh))
def out(im, name, width, q=80):
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(f'{O}/{name}.webp', 'WEBP', quality=q, method=6)
    print(name, im.size, os.path.getsize(f'{O}/{name}.webp') // 1024, 'KB')
def trim(im, tol=18):
    # drop letterbox / inset borders: rows and columns that are flat black or flat white
    g = im.convert('L'); w, h = g.size; px = g.load()
    def flat(vals): return max(vals) - min(vals) < tol and (max(vals) < 40 or min(vals) > 215)
    t, b, l, r = 0, h, 0, w
    while t < h // 3 and flat([px[x, t] for x in range(0, w, 4)]): t += 1
    while b > h * 2 // 3 and flat([px[x, b - 1] for x in range(0, w, 4)]): b -= 1
    while l < w // 3 and flat([px[l, y] for y in range(t, b, 4)]): l += 1
    while r > w * 2 // 3 and flat([px[r - 1, y] for y in range(t, b, 4)]): r -= 1
    return im.crop((l, t, r, b))
P = lambda n: trim(load(f'{T}/{n}.png'))
# hero poster (vid-036 at 33 s, the frame the video starts from): desktop 16:9, phone 1280 wide
h = load(f'{T}/hero.png'); out(h, 'hero-1920', 1920, 72); out(h, 'hero-1280', 1280, 72)
# Tal: img-001 head crop (above the baked "LE TEMPS DU SUCCÈS" text) for the round avatar
t = load(f'{A}/img-001.jpg'); out(t.crop((300, 0, 760, 460)), 'tal-avatar', 240, 84)
# Tal: vid-036 at 41 s, seated to camera under the top light, 4:5 for the partners section (864 x 1080)
out(crop(load(f'{T}/tal-036.png'), 4/5, .47, .5), 'tal-portrait', 864, 82)
# doors, 4:5: Story = img-025 (man laughing in smoke), Launch = img-029 (LOVE letters)
out(crop(load(f'{A}/img-025.jpg'), 4/5, .62, .5), 'door-story', 800, 80)
out(crop(load(f'{A}/img-029.jpg'), 4/5, .52, .5), 'door-launch', 800, 80)
# partnership band: img-019 (Wella box, gold on black), native 2000
b = load(f'{A}/img-019.jpg'); out(b, 'band-1920', 1920, 78); out(crop(b, 4/5, .6, .5), 'band-phone', 1000, 78)
# route heroes in the same 4:5 as the doors; partnership hero reuses the band
# Shahar's work strip (his Behance covers), 4:3 crop
for n, f in (('sn-pale-force', 'img-107'), ('sn-coca-cola', 'img-110'), ('sn-privex', 'img-104')):
    out(crop(load(f'{A}/{f}.jpg'), 4/3), n, 700, 80)
# case posters 16:9
for n in ('case-amdocs', 'case-maccabi', 'case-seat', 'case-park-bavli'):
    out(crop(P(n), 16/9, .5, .5), n, 1280, 76)
# /work row thumbs and /brands film posters, 16:9
for p in sorted(glob.glob(f'{T}/w-*.png') + glob.glob(f'{T}/b-*.png') + [f'{T}/boots-027.png', f'{T}/flip-015.png']):
    n = os.path.basename(p)[:-4]; out(crop(trim(load(p)), 16/9), n, 640, 74)
# /watch and voices: 9:16 cards (vertical clips cropped from 720x900, the rest centre-cropped)
for p in sorted(glob.glob(f'{T}/v-*.png')) + [f'{T}/boots-027.png', f'{T}/flip-015.png']:
    n = os.path.basename(p)[:-4]; fx = {'v-joya': .88, 'v-ronen': .8}.get(n, .5)
    out(crop(trim(load(p)), 9/16, fx), 'tall-' + n, 405, 74)
PY
cp "$A/sig-gold.svg" "$A/sig-white.svg" "$A/sig-black.svg" "$D/img/"

# ---- fonts (OFL, Google Fonts), self-hosted: Frank Ruhl Libre (display) + Assistant (text),
# variable, Hebrew + Latin subsets
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
for fam in 'Frank+Ruhl+Libre:wght@300..700' 'Assistant:wght@300..700'; do
  n=$(echo "$fam" | cut -d: -f1 | tr 'A-Z+' 'a-z-')
  curl -fsS -A "$UA" "https://fonts.googleapis.com/css2?family=$fam&display=swap" > "$T/$n.css"
  for sub in hebrew latin; do
    u=$(awk -v s="/* $sub */" '$0==s{f=1} f&&/src: url/{match($0,/https:[^)]*/);print substr($0,RSTART,RLENGTH);exit}' "$T/$n.css")
    curl -fsS -o "$D/fonts/$n-$sub.woff2" "$u"
  done
done
ls -la "$D/img" "$D/video/" "$D/fonts" | tail -n +1 | wc -l
du -sh "$D/img" "$D/fonts" "$STORE"
