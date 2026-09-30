#!/usr/bin/env bash
# usage: hero-sheet.sh <out-dir>   (static server on 8931 serving mockups/)
set -e; D=$1; mkdir -p $D
node "$(dirname "$0")/hero-shots.mjs" http://127.0.0.1:8931/picked/dist/ $D
cd $D
ffmpeg -v error -y -i hero-1440-poster.png -i hero-1440-t3.4.png -i hero-1440-t4.8.png -i hero-1440-t9.8.png -filter_complex "[0][1][2][3]xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0,scale=1440:-1" sheet-1440.png
ffmpeg -v error -y -i hero-390-poster.png -i hero-390-t0.5.png -i hero-390-t3.4.png -i hero-390-t4.8.png -i hero-390-t7.5.png -i hero-390-t9.8.png -filter_complex "hstack=inputs=6,scale=1560:-1" sheet-390.png
