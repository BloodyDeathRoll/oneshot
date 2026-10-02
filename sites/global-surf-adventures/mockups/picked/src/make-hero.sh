#!/usr/bin/env bash
# Hero loop for the picked composite: business-owned sources only, real speed, one direction, hard cuts.
#  1 pool deck      vid-009-source 5.28–8.04 s  (the pool shot of vid-009e)
#  2 stand-up       vid-010-source 28.16–29.44 s (beginner stands up)
#  3 guide cheers   vid-010-source 29.44–31.08 s (the guide in the water, arms up, clapping)
#  4 reef           vid-009-source 40.36–45.00 s (the surfer on the reef, the reef shot of vid-009e)
# Phone reef shot: the crop follows the surfer with a slow 150 px pan (real frames, no interpolation).
# vid-010 carries a corner badge top-left: desktop crops x>=192, phone crop is central, so it never shows.
# media: sites/global-surf-adventures/mockups/picked/dist/video/hero-*
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
SRC=dossier/global-surf-adventures/assets/video
OUT=sites/global-surf-adventures/mockups/picked/dist/video
T=${TMPDIR:-/tmp}/picked-hero; mkdir -p "$T"
G010="eq=contrast=1.06:saturation=1.12"
# desktop master 1728x972
ffmpeg -v error -y -i $SRC/vid-009-source.mp4 -i $SRC/vid-010-source.mp4 -filter_complex "
[0:v]trim=5.28:8.04,setpts=PTS-STARTPTS,scale=1728:972,setsar=1[a];
[1:v]trim=28.16:31.08,setpts=PTS-STARTPTS,crop=1728:972:192:40,$G010,setsar=1[b];
[0:v]trim=40.36:45.00,setpts=PTS-STARTPTS,scale=1728:972,setsar=1[c];
[a][b][c]concat=n=3:v=1:a=0,fps=25[v]" -map "[v]" -an -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p $T/d.mp4
# phone master 608x1080 (9:16), subjects centred per shot
ffmpeg -v error -y -i $SRC/vid-009-source.mp4 -i $SRC/vid-010-source.mp4 -filter_complex "
[0:v]trim=5.28:8.04,setpts=PTS-STARTPTS,crop=608:1080:${POOLX:-700}:0,setsar=1[a];
[1:v]trim=28.16:29.44,setpts=PTS-STARTPTS,crop=608:1080:${STANDX:-656}:0,$G010,setsar=1[b];
[1:v]trim=29.44:31.08,setpts=PTS-STARTPTS,crop=608:1080:${CHEERX:-600}:0,$G010,setsar=1[b2];
[0:v]trim=40.36:45.00,setpts=PTS-STARTPTS,crop=608:1080:x='760-150*t/4.64':y=0,setsar=1[c];
[a][b][b2][c]concat=n=4:v=1:a=0,fps=25[v]" -map "[v]" -an -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p $T/m.mp4
ffmpeg -v error -y -i $T/d.mp4 -c:v libvpx-vp9 -b:v 0 -crf ${DCRF:-39} -row-mt 1 -deadline good -cpu-used 2 -an $OUT/hero-d1728.webm
ffmpeg -v error -y -i $T/d.mp4 -c:v libx264 -crf ${DXCRF:-29} -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an $OUT/hero-d1728.mp4
ffmpeg -v error -y -i $T/m.mp4 -c:v libvpx-vp9 -b:v 0 -crf ${MCRF:-37} -row-mt 1 -deadline good -cpu-used 2 -an $OUT/hero-m608.webm
ffmpeg -v error -y -i $T/m.mp4 -c:v libx264 -crf ${MXCRF:-27} -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an $OUT/hero-m608.mp4
# posters = first frame of each rendition (so the video starts where the poster is)
ffmpeg -v error -y -ss 0.04 -i $T/d.mp4 -frames:v 1 -q:v 3 $OUT/hero-poster-d.jpg
ffmpeg -v error -y -ss 0.04 -i $T/m.mp4 -frames:v 1 -q:v 3 $OUT/hero-poster-m.jpg
for s in d m; do ffmpeg -v error -y -i $OUT/hero-poster-$s.jpg -c:v libwebp -quality 74 $OUT/hero-poster-$s.webp; done
# small copies, inlined in the page so the first paint already carries the picture (the full poster replaces them)
ffmpeg -v error -y -i $OUT/hero-poster-m.jpg -vf scale=270:480 -c:v libwebp -quality 42 $OUT/hero-poster-m-lq.webp
ffmpeg -v error -y -i $OUT/hero-poster-d.jpg -vf scale=512:288 -c:v libwebp -quality 42 $OUT/hero-poster-d-lq.webp
ls -l $OUT/hero-*
