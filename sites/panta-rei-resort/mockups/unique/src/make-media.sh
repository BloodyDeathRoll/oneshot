#!/usr/bin/env bash
# Every image, frame and video of the Panta Rei "unique" mockup (From the pool to the sea), made
# from the business-owned sources in dossier/panta-rei-resort/assets/ (run tools/link-assets.sh
# first). Crop and scale DOWN only; nothing is upscaled. WebP is written by cwebp (the local ffmpeg
# has no WebP encoder), from lossless PNG intermediates in a temp folder.
# media: sites/panta-rei-resort/mockups/unique/dist/**
#
#   bash sites/panta-rei-resort/mockups/unique/src/make-media.sh
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/panta-rei-resort/assets
V=$A/video
D=sites/panta-rei-resort/mockups/unique/dist
T=${TMPDIR:-/tmp}/panta-unique-media; rm -rf "$T"; mkdir -p "$T" "$D/img" "$D/frames/d" "$D/frames/m" "$D/video"
ff() { ffmpeg -v error -y "$@"; }
webp() { cwebp -quiet -q "$3" -m 6 -sharp_yuv "$1" -o "$2"; }       # in.png out.webp quality
photo() { # asset-id out-stem quality "vf"   (vf = ffmpeg crop/scale chain, scale down only)
  local src; src=$(ls $A/img-$1.* | head -1)
  ff -i "$src" -vf "$4" -frames:v 1 "$T/$2.png"; webp "$T/$2.png" "$D/img/$2.webp" "$3"
}

# ---- the set-piece: vid-001 55.55-69.70 s (three aerial shots: the pool close, the ring from
# above, the rise to the coast; the cuts are the film's own). 150 frames over 14.15 s.
SEQ_SS=55.55; SEQ_T=14.15; FPS="fps=150/14.15"
ff -ss $SEQ_SS -t $SEQ_T -i $V/vid-001-source.mp4 -vf "$FPS,hqdn3d=2:2:2:2,scale=1280:-2:flags=lanczos" -frames:v 150 "$T/fd%03d.png"
ff -ss $SEQ_SS -t $SEQ_T -i $V/vid-001-source.mp4 -vf "$FPS,crop=608:1080,hqdn3d=3:3:2:2,scale=540:960:flags=lanczos" -frames:v 150 "$T/fm%03d.png"
frames() { # prefix quality out-dir
  ls "$T"/$1*.png | xargs -P 8 -n 1 sh -c 'b=$(basename "$0" .png); cwebp -quiet -q '"$2"' -m 6 "$0" -o '"$3"'/${b#f?}.webp'; }
frames fd 38 "$D/frames/d"
frames fm 36 "$D/frames/m"

# poster = frame 1 of each set, at a higher quality (the LCP image); stills for the static tier
still() { # time out-stem
  ff -ss "$1" -i $V/vid-001-source.mp4 -frames:v 1 -vf "scale=1600:-2:flags=lanczos" "$T/$2-d.png"; webp "$T/$2-d.png" "$D/img/$2-d.webp" 72
  ff -ss "$1" -i $V/vid-001-source.mp4 -frames:v 1 -vf "crop=608:1080,scale=540:960:flags=lanczos" "$T/$2-m.png"; webp "$T/$2-m.png" "$D/img/$2-m.webp" 70
}
still $SEQ_SS film-poster
still 58.40 still-a      # the roofs and the pool from above, close
still 60.60 still-b      # the whole ring from above
still 69.50 still-c      # the coastline over the canopy

# ---- photographs (business-owned)
photo 023 logo 90 "scale=200:-1"                                            # white logo, alpha kept
photo 006 pool-d 74 "scale=1600:-2:flags=lanczos";  photo 006 pool-m 72 "scale=900:-2:flags=lanczos"
photo 030 lounge-d 76 "scale=1350:-2";              photo 030 lounge-m 72 "scale=800:-2:flags=lanczos"
photo 035 lawn-d 76 "crop=1350:760:0:70";           photo 035 lawn-m 72 "crop=760:900:300:0,scale=640:-2:flags=lanczos"
# prints, all 4:5
for x in 003:breakfast 018:prawns 020:balcony; do id=${x%%:*}; n=${x##*:}
  photo $id $n 74 "crop='min(iw,ih*4/5)':'min(ih,iw*5/4)',scale=800:1000:flags=lanczos"; done
# rooms, all 3:2 (house rule 2), 1200 and 720 wide
room() { photo $1 room-$1-l 74 "crop='min(iw,ih*3/2)':'min(ih,iw*2/3)',scale=1200:800:flags=lanczos"
         photo $1 room-$1-s 72 "crop='min(iw,ih*3/2)':'min(ih,iw*2/3)',scale=720:480:flags=lanczos"; }
for id in 028 031 029 007 013  037 034 036 010 011  038 040 012 014 015  043 046 047 044 002 016; do room $id; done

# ---- the closing film: vid-002's web renditions (already the 3-17 s cut, no audio) + its poster
cp $V/vid-002-d1920.webm $V/vid-002-d1920.mp4 $V/vid-002-m1280.webm $V/vid-002-m1280.mp4 "$D/video/"
ff -i $V/vid-002-poster.jpg -vf "scale=1600:-2:flags=lanczos" "$T/close-d.png"; webp "$T/close-d.png" "$D/img/close-d.webp" 72
ff -i $V/vid-002-poster.jpg -vf "crop=608:1080,scale=540:960:flags=lanczos" "$T/close-m.png"; webp "$T/close-m.png" "$D/img/close-m.webp" 70

rm -rf "$T"
du -sh "$D/frames/d" "$D/frames/m" "$D/img" "$D/video"
