#!/usr/bin/env bash
# Every image and video of the unique mockup ("From the air"), from the business-owned dossier assets.
# Run tools/link-assets.sh global-surf-adventures-v2 first, so dist/video lands in the store.
# media: sites/global-surf-adventures-v2/mockups/unique/dist/img/**
# media: sites/global-surf-adventures-v2/mockups/unique/dist/video/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/global-surf-adventures-v2/assets
V=$A/video
D=sites/global-surf-adventures-v2/mockups/unique/dist
rm -rf "$D/img"; mkdir -p "$D/img" "$D/video"
T=${TMPDIR:-/tmp}/gs-v2-unique; mkdir -p "$T"
ff() { ffmpeg -v error -y "$@"; }

# ---------- photographs: crop to one ratio per run of pictures, resize, WebP
# img <id> <out> <ratio w:h | 0 = keep> <max width> <quality> [focus x 0..1] [focus y 0..1]
img() { python3 - "$A/$1.jpg" "$D/img/$2.webp" "$3" "$4" "$5" "${6:-0.5}" "${7:-0.5}" <<'PY'
import sys
from PIL import Image
src, out, ratio, maxw, q, fx, fy = sys.argv[1:8]
im = Image.open(src).convert('RGB'); W, H = im.size
if ratio != '0':
    a, b = map(float, ratio.split(':')); r = a / b
    if W / H > r: w, h = round(H * r), H
    else: w, h = W, round(W / r)
    x = min(max(round(float(fx) * W - w / 2), 0), W - w); y = min(max(round(float(fy) * H - h / 2), 0), H - h)
    im = im.crop((x, y, x + w, y + h))
mw = int(maxw)
if im.width > mw: im = im.resize((mw, round(im.height * mw / im.width)), Image.LANCZOS)
im.save(out, 'WEBP', quality=int(q), method=6)
PY
}

# the drop: three plates, uncropped (their pools are aligned in the page's JS by source pixels)
img img-062 plate-img-062-d 0 2000 74; img img-062 plate-img-062-m 0 1400 72
img img-026 plate-img-026-d 0 2000 74; img img-026 plate-img-026-m 0 1400 72
img img-005 plate-img-005-d 0 1800 76; img img-005 plate-img-005-m 0 1100 74
# reduced-motion two-up of the two aerials, 3:2
img img-062 still-img-062 3:2 1000 74 0.42 0.58
img img-026 still-img-026 3:2 1000 74
# waves band: img-099 21:9 desktop, 4:5 phone
img img-099 waves-img-099-d 21:9 2000 74 0.5 0.5
img img-099 waves-img-099-m 4:5 900 74 0.5 0.5
# breakfast 4:5
img img-011 breakfast-img-011 4:5 800 76
# sunset portrait 4:5 (img-129 is 1938 x 2000)
img img-129 sunset-img-129 4:5 1100 76
# dinner, dusk pool: drawn at most at its native 1536 px
img img-093 dinner-img-093 0 1536 78
# the lodge slideshow, 3:2
for i in 036 075 077; do img img-$i lodge-img-$i 3:2 1400 74; done
# rooms, 16:10, one ratio for all
for i in 063 078 095 042 050 064 080 084 083 069 079 081 082 041 043 044 071; do img img-$i room-img-$i 16:10 1400 72; done
# Instagram tiles, square
for i in 024 090 055 087 118 016; do img img-$i ig-img-$i 1:1 520 72; done

# ---------- hero: the aerial edit, ~7 s, hard cuts, real speed, one direction
# vid-009 (no watermark): rise over the roofs to the sea 1.70–3.20, lodge in its palms 3.25–5.25,
# turquoise reef coast 13.35–15.15; vid-010: surfers from above 1.00–2.70, badge cropped (1728x972).
ff -i "$V/vid-009-source.mp4" -i "$V/vid-010-source.mp4" -filter_complex "\
[0:v]trim=1.70:3.20,setpts=PTS-STARTPTS,fps=25,scale=1728:972,setsar=1[a];\
[0:v]trim=3.25:5.25,setpts=PTS-STARTPTS,fps=25,scale=1728:972,setsar=1[b];\
[0:v]trim=13.35:15.15,setpts=PTS-STARTPTS,fps=25,scale=1728:972,setsar=1[c];\
[1:v]trim=1.00:2.70,setpts=PTS-STARTPTS,fps=25,crop=1728:972:192:108,setsar=1[d];\
[a][b][c][d]concat=n=4:v=1:a=0,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -preset slow -crf 14 "$T/hero-master.mp4"
H=$D/video
ff -i "$T/hero-master.mp4" -an -c:v libx264 -preset slow -b:v 3600k -maxrate 4000k -bufsize 6M -pix_fmt yuv420p -movflags +faststart "$H/hero-d1728.mp4"
SVT_LOG=1 ff -i "$T/hero-master.mp4" -an -c:v libsvtav1 -preset 8 -b:v 2600k "$H/hero-d1728.webm"
# phone: its own master at native 1080 px height for the vid-009 shots (667 x 1080 centre crop);
# the vid-010 shot is cropped inside its badge-free area (600 x 972) and scaled 1.11x to match.
ff -i "$V/vid-009-source.mp4" -i "$V/vid-010-source.mp4" -filter_complex "\
[0:v]trim=1.70:3.20,setpts=PTS-STARTPTS,fps=25,crop=668:1080:626:0,setsar=1[a];\
[0:v]trim=3.25:5.25,setpts=PTS-STARTPTS,fps=25,crop=668:1080:626:0,setsar=1[b];\
[0:v]trim=13.35:15.15,setpts=PTS-STARTPTS,fps=25,crop=668:1080:626:0,setsar=1[c];\
[1:v]trim=1.00:2.70,setpts=PTS-STARTPTS,fps=25,crop=600:972:660:108,scale=668:1080,setsar=1[d];\
[a][b][c][d]concat=n=4:v=1:a=0,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -preset slow -crf 14 "$T/hero-pmaster.mp4"
ff -i "$T/hero-pmaster.mp4" -an -c:v libx264 -preset slow -b:v 1800k -maxrate 2100k -bufsize 4M -pix_fmt yuv420p -movflags +faststart "$H/hero-p668.mp4"
SVT_LOG=1 ff -i "$T/hero-pmaster.mp4" -an -c:v libsvtav1 -preset 8 -b:v 1400k "$H/hero-p668.webm"
rm -f "$H/hero-p600.mp4" "$H/hero-p600.webm"
# posters: the lodge in its palms (2.6 s into the edit = vid-009 at ~4.2 s)
ff -ss 2.6 -i "$T/hero-master.mp4" -frames:v 1 -q:v 2 "$T/hero-poster.png"
python3 -c "
from PIL import Image; im=Image.open('$T/hero-poster.png').convert('RGB')
im.save('$D/img/hero-poster-d.webp','WEBP',quality=72,method=6)
"
ff -ss 2.6 -i "$T/hero-pmaster.mp4" -frames:v 1 -q:v 2 "$T/hero-pposter.png"
python3 -c "
from PIL import Image; Image.open('$T/hero-pposter.png').convert('RGB').save('$D/img/hero-poster-m.webp','WEBP',quality=72,method=6)"

# ---------- level clips (concepts.md C1/C2 picks), centre crops at native pixels: corner badges fall outside
clip() { # id src start end crop scale
  ff -ss "$3" -to "$4" -i "$V/$2" -vf "fps=25,$5,scale=$6" -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart "$H/$1.mp4"
  ff -ss "$3" -to "$4" -i "$V/$2" -vf "fps=25,$5,scale=$6" -an -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$H/$1.webm"
  ff -ss 0.4 -i "$H/$1.mp4" -frames:v 1 "$T/$1.png"
  python3 -c "from PIL import Image; Image.open('$T/$1.png').convert('RGB').save('$D/img/$1-poster.webp','WEBP',quality=74,method=6)"
}
clip level1 vid-010-source.mp4 19.72 24.16 "crop=864:1080:528:0" 720:900     # golden-hour session, 4:5
clip level2 vid-003-source.mp4 21.56 24.88 "crop=1440:1080:240:0" 800:600    # woman on a reef wave, 4:3
clip level3 vid-002-source.webm 8.86 12.50 "crop=1440:1080:240:0" 800:600    # the barrels, 4:3

ls -la "$D/img" "$H" | awk '{print $5, $9}'
