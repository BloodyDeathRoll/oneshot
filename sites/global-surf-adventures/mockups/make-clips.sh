#!/usr/bin/env bash
# Every derived clip of the Global Surf mockups, from the business-owned sources (the picked hero
# loop is separate: picked/src/make-hero.sh). These are the commands of 2026-09-28…30, recovered
# from the session logs after the files were lost with a worktree — keep this file current when a
# clip changes. Before it: tools/link-assets.sh, then the sources and their renditions
# (tools/fetch-video.mjs; cuts are in dossier.videos[]).
set -euo pipefail
cd "$(dirname "$0")/../../.."
A=dossier/global-surf-adventures/assets/video
M=sites/global-surf-adventures/mockups
T=${TMPDIR:-/tmp}/gs-clips; mkdir -p "$T"
WM=",crop=iw/1.12:ih/1.12:iw-iw/1.12:ih-ih/1.12,scale=1920:1080"   # 1/1.12 from bottom-right: removes the globe watermark
BADGE="crop=1728:972:192:108"                                       # removes the faint corner badge
ff() { ffmpeg -v error -y "$@"; }
x264() { ff "${@:3}" -an -c:v libx264 -crf "$1" -preset slow -pix_fmt yuv420p -movflags +faststart "$2"; }  # crf out <input + filter args>
vp9() { ff "${@:3}" -an -c:v libvpx-vp9 -crf "$1" -b:v 0 -row-mt 1 "$2"; }
webp() { python3 -c "
import sys; from PIL import Image
im=Image.open(sys.argv[1]).convert('RGB')
if sys.argv[4]!='0': im.thumbnail((int(sys.argv[4]),)*2)
im.save(sys.argv[2],'WEBP',quality=int(sys.argv[3]),method=6)" "$@"; }   # in out quality max-side(0 = as is)

# ---- edits in assets/video: two takes of one source, all renditions + poster + contact sheet
edit() { # id source join(xfade|concat) crop a_start a_end b_start b_end poster_at
  local id=$1 src=$A/$2 join crop=$4 m=$T/$1-master.mp4
  if [ "$3" = xfade ]; then join="xfade=transition=fade:duration=0.5:offset=$(echo "$6-$5-0.5" | bc)"; else join="concat=n=2:v=1:a=0"; fi
  ff -i "$src" -filter_complex "[0:v]trim=$5:$6,setpts=PTS-STARTPTS,fps=25,format=yuv420p$crop[a];[0:v]trim=$7:$8,setpts=PTS-STARTPTS,fps=25,format=yuv420p$crop[b];[a][b]$join[v]" -map "[v]" -an -c:v libx264 -preset slow -crf 16 "$m"
  local s; for s in "d1920 1920 3900k 3900k" "m1280 1280 1600k 1700k" "m720 720 1500k 1500k"; do set -- $s
    ff -i "$m" -vf "scale=$2:-2" -an -c:v libx264 -preset slow -b:v $3 -maxrate $4 -bufsize 6M -profile:v high -pix_fmt yuv420p -movflags +faststart "$A/$id-$1.mp4"; done
  for s in "d1920 1920 3000k" "m1280 1280 1600k"; do set -- $s
    SVT_LOG=1 ff -i "$m" -vf "scale=$2:-2" -an -c:v libsvtav1 -preset 8 -b:v $3 "$A/$id-$1.webm"; done
}
poster() { ff -ss "$2" -i "$T/$1-master.mp4" -frames:v 1 -q:v 3 "$A/$1-poster.jpg"
  ff -i "$A/$1-poster.jpg" -c:v libaom-av1 -still-picture 1 -crf 32 "$A/$1-poster.avif"
  ff -i "$T/$1-master.mp4" -vf "fps=2,scale=240:-1,tile=10x2" -frames:v 1 "$A/$1-sheet.jpg"; }
edit vid-009e vid-009-source.mp4 concat ""    5.3 8.0 40.4 45.0; poster vid-009e 1.0   # hero: pool deck + sunny reef surf, hard cut
edit vid-002e vid-002-source.webm xfade "$WM" 8.9 12.5 26.8 28.9; poster vid-002e 1.5   # Level 3: two barrels
edit vid-003e vid-003-source.mp4 xfade "$WM" 10.8 14.0 14.2 17.8; poster vid-003e 1.0   # Level 2: sunny ride + reef ride

# ---- the-sign: the hero edit + 4:5 level clips (864x1080 centre crop, no upscaling)
D=$M/the-sign/dist/video; mkdir -p "$D"
cp "$A"/vid-009e-d1920.mp4 "$A"/vid-009e-d1920.webm "$A"/vid-009e-m1280.webm "$A"/vid-009e-m720.mp4 "$A"/vid-009e-poster.avif "$D/"
p45() { # id webm_crf mp4_crf <input args>
  ff "${@:4}" -vf "crop=864:1080:528:0" -an -c:v libvpx-vp9 -crf "$2" -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$D/$1-p45.webm"
  x264 "$3" "$D/$1-p45.mp4" "${@:4}" -vf "crop=864:1080:528:0"; }
p45 vid-002e 33 24 -i "$A/vid-002e-d1920.webm"
p45 vid-003e 33 24 -ss 1.4 -i "$A/vid-003e-d1920.webm"          # from 1.4 s: drops the opening frames with the dark rock
p45 vid-010 35 28 -ss 20 -t 9 -i "$A/vid-010-source.mp4"         # the golden-hour stand-up
for id in vid-002e vid-003e; do ff -i "$D/$id-p45.mp4" -frames:v 1 -q:v 3 "$D/$id-p45-poster.jpg"; done
ff -ss 20.4 -i "$A/vid-010-source.mp4" -frames:v 1 -vf "crop=864:1080:528:0" -q:v 3 "$D/vid-010-p45-poster.jpg"
mkdir -p "$M/picked/dist/video/s"; cp "$D"/vid-*-p45* "$M/picked/dist/video/s/"   # the picked composite uses the same clips

# ---- try-your-week
D=$M/try-your-week/dist/video; mkdir -p "$D"
cp "$A"/vid-003e-d1920.mp4 "$A"/vid-003e-d1920.webm "$A"/vid-003e-m1280.mp4 "$A"/vid-003e-m1280.webm "$D/"
webp "$A/vid-003e-poster.jpg" "$D/vid-003e-poster.webp" 70 1280
# vid-010c, Level 1: the vid-010 rendition with the badge cropped out
x264 28 "$D/vid-010c-d1728.mp4" -i "$A/vid-010-d1920.mp4" -vf "$BADGE"
vp9 38 "$D/vid-010c-d1728.webm" -i "$A/vid-010-d1920.mp4" -vf "$BADGE"
F="crop=iw*0.86:ih*0.86:iw*0.14:ih*0.14,scale=1280:720"
x264 30 "$D/vid-010c-m1280.mp4" -i "$A/vid-010-d1920.mp4" -vf "$F"
vp9 44 "$D/vid-010c-m1280.webm" -i "$A/vid-010-d1920.mp4" -vf "$F"
ff -ss 2 -i "$D/vid-010c-m1280.mp4" -frames:v 1 -q:v 3 "$T/010c.jpg"; webp "$T/010c.jpg" "$D/vid-010c-poster.webp" 70 1280
# vid-002g, Level 3: the golden-hour carve, 18.56–23.98 s of vid-002, real speed
F="trim=start=18.56:end=23.98,setpts=PTS-STARTPTS,$BADGE"
x264 24 "$D/vid-002g-d1728.mp4" -i "$A/vid-002-source.webm" -vf "$F" -r 25
vp9 34 "$D/vid-002g-d1728.webm" -i "$A/vid-002-source.webm" -vf "$F" -r 25
x264 26 "$D/vid-002g-m1280.mp4" -i "$A/vid-002-source.webm" -vf "$F,scale=1280:-2" -r 25
vp9 36 "$D/vid-002g-m1280.webm" -i "$A/vid-002-source.webm" -vf "$F,scale=1280:-2" -r 25
ff -ss 4.2 -i "$D/vid-002g-d1728.mp4" -frames:v 1 -vf scale=1280:-2 "$T/002g.jpg"; webp "$T/002g.jpg" "$D/vid-002g-poster.webp" 70 0
# vid-002w, the hero: two barrels (8.86–12.50, 25.20–28.60 s), one direction, 0.4 s fade at the loop seam; desktop + 3:4 phone crop
BASE="[0:v]trim=start=8.86:end=12.50,setpts=PTS-STARTPTS[a];[0:v]trim=start=25.20:end=28.60,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1,fps=25,split[c1][c2];[c1]trim=start=0.4,setpts=PTS-STARTPTS[m];[c2]trim=end=0.4,setpts=PTS-STARTPTS[h];[m][h]xfade=transition=fade:duration=0.4:offset=6.24"
for s in "$BADGE vid-002w-d1728" "crop=810:1080:670:0 vid-002w-p810"; do set -- $s
  vp9 34 "$D/$2.webm" -i "$A/vid-002-source.webm" -filter_complex "$BASE,$1[o]" -map "[o]"
  x264 25 "$D/$2.mp4" -i "$A/vid-002-source.webm" -filter_complex "$BASE,$1[o]" -map "[o]"; done
ff -ss 1.2 -i "$D/vid-002w-d1728.mp4" -frames:v 1 -q:v 1 "$T/pd.png"; ff -ss 1.2 -i "$D/vid-002w-p810.mp4" -frames:v 1 "$T/pp.png"
webp "$T/pd.png" "$D/vid-002w-poster-1728.webp" 80 0; webp "$T/pp.png" "$D/vid-002w-poster-p810.webp" 80 0
python3 -c "
import sys; from PIL import Image
Image.open(sys.argv[1]).convert('RGB').resize((960,540),Image.LANCZOS).save(sys.argv[2],'JPEG',quality=82,optimize=True,progressive=True)" "$T/pd.png" "$D/vid-002w-poster.jpg"

# ---- postcard
D=$M/postcard/dist/video; mkdir -p "$D"
cp "$A"/vid-002e-m1280.webm "$A"/vid-002e-m720.mp4 "$A"/vid-003e-m1280.webm "$A"/vid-003e-m720.mp4 "$A"/vid-010-m1280.webm "$A"/vid-010-m720.mp4 "$A"/vid-010-poster.jpg "$D/"
# vid-010g, the hero: six real-speed takes of vid-010, hard cuts, badge cropped
ff -i "$A/vid-010-source.mp4" -filter_complex "[0:v]trim=22.52:24.12,setpts=PTS-STARTPTS[a];[0:v]trim=28.2:29.4,setpts=PTS-STARTPTS[b];[0:v]trim=29.48:31.04,setpts=PTS-STARTPTS[c];[0:v]trim=31.12:31.88,setpts=PTS-STARTPTS[d];[0:v]trim=21.12:22.44,setpts=PTS-STARTPTS[e];[0:v]trim=36.48:38.12,setpts=PTS-STARTPTS[f];[a][b][c][d][e][f]concat=n=6:v=1,$BADGE[o]" -map "[o]" -an -c:v libx264 -crf 14 -preset medium "$T/010g.mp4"
ff -i "$T/010g.mp4" -an -c:v libvpx-vp9 -b:v 2300k -maxrate 2700k -row-mt 1 -deadline good -cpu-used 4 "$D/vid-010g-d1728.webm"
ff -i "$T/010g.mp4" -an -c:v libx264 -b:v 2600k -maxrate 2900k -bufsize 5800k -pix_fmt yuv420p -movflags +faststart "$D/vid-010g-d1728.mp4"
ff -i "$T/010g.mp4" -vf "select=eq(n\,0)" -frames:v 1 "$T/010g.png"
python3 -c "
import sys; from PIL import Image
Image.open(sys.argv[1]).convert('RGB').save(sys.argv[2],quality=76,optimize=True,progressive=True)" "$T/010g.png" "$D/vid-010g-poster.jpg"
# vid-010s: the 1.6 s stand-up take
ff -ss 22.52 -t 1.6 -i "$A/vid-010-source.mp4" -an -vf "$BADGE,scale=1280:-2" -c:v libvpx-vp9 -b:v 1400k -row-mt 1 -deadline good -cpu-used 4 "$D/vid-010s-m1280.webm"
ff -ss 22.52 -t 1.6 -i "$A/vid-010-source.mp4" -an -vf "$BADGE,scale=720:-2" -c:v libx264 -b:v 1400k -pix_fmt yuv420p -movflags +faststart "$D/vid-010s-m720.mp4"

du -sh "$M"/*/dist/video/
