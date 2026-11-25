#!/usr/bin/env bash
# Station 4g stand-in for the CMS, and the recipe for every media file of the final site (interactive, "In the palms").
# No Payload tenant exists before a sale (station 8), so this writes what the deployer's first seed would upload,
# in the shape scripts/fetch-tenant.mjs would write from Payload, then runs the build's own photo step.
#
#  1. scripts/seed-from-dossier.mjs: the 24 business-owned originals (Booking.com / Airbnb property uploads) copied
#     unchanged from dossier/sea-you-surfers-nest/assets into src/tenant/media/, content.json, src/gaps/gaps.json.
#  2. The hero upload, img-003-graded.jpg: img-003 with the fronds graded, as the picked mockup's
#     (mockups/interactive/src/make-media.sh, round 3), plus 4f r3's "darken the top-right fronds at 1440 a little
#     more". Every still of the hero (first paint, no-WebGL, reduced motion, closing band) is cut from it, and the
#     shader samples those same stills. And the palm mask for the shader, src/palms/img-003-graded.png, painted on
#     this photograph only (photos.mjs cuts it with the hero's own boxes; a replaced hero gets no mask, no shader).
#  3. scripts/photos.mjs: the slot crops (src/lib/slots.mjs, the mockup's boxes) → public/photos/*.webp,
#     public/palms/*.webp and src/tenant/photos.generated.json. `npm run build` runs this step again.
# No video: the business has none (concepts.md §2).
# Needs: tools/link-assets.sh sea-you-surfers-nest (the dossier assets), ffmpeg, node deps (npm install here).
# media: sites/sea-you-surfers-nest/final/src/tenant/media/*
# media: sites/sea-you-surfers-nest/final/src/palms/*
# media: sites/sea-you-surfers-nest/final/public/photos/*
# media: sites/sea-you-surfers-nest/final/public/palms/*
set -euo pipefail
cd "$(dirname "$0")/.."
A=../../../dossier/sea-you-surfers-nest/assets
ff() { ffmpeg -v error -y "$@"; }
node scripts/seed-from-dossier.mjs

mkdir -p src/palms
# The shader's mask, in img-003's own pixels: parapet top edge y = 550 + 0.014 x; the pot plant (x 765-1135,
# y 460-550) an ellipse kept black; a long 220 px ramp so the parapet never moves. Feathered.
ff -f lavfi -i "color=black:s=2000x1333,format=gray" -frames:v 1 \
  -vf "geq=lum='255*clip((550+0.014*X-34-Y)/220,0,1)*clip((pow((X-950)/250,2)+pow((Y-515)/120,2)-1)*1.6,0,1)',gblur=sigma=10" \
  src/palms/img-003-graded.png
# The grade's own mask: a short 40 px ramp so it reaches the lower fronds. And the top-right of the desktop frame
# (x 1050+ ramping to 1550, y under 650): a second, darker pass there (4f r3, visual).
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff -f lavfi -i "color=black:s=2000x1333,format=gray" -frames:v 1 \
  -vf "geq=lum='255*clip((550+0.014*X-6-Y)/40,0,1)*clip((pow((X-950)/240,2)+pow((Y-515)/112,2)-1)*3,0,1)',gblur=sigma=4" "$T/g.png"
ff -f lavfi -i "color=black:s=2000x1333,format=gray" -frames:v 1 \
  -vf "geq=lum='255*clip((550+0.014*X-6-Y)/40,0,1)*clip((pow((X-950)/240,2)+pow((Y-515)/112,2)-1)*3,0,1)*clip((X-1050)/500,0,1)*clip((650-Y)/350,0,1)',gblur=sigma=8" "$T/tr.png"
ff -i "$A/img-003.jpg" -i "$T/g.png" -i "$T/tr.png" -filter_complex \
  "[0:v]format=gbrp,split[a][b];[b]curves=all='0/0 0.35/0.2 0.7/0.48 1/0.82',eq=contrast=1.2:saturation=1.7,colorbalance=rm=-0.08:gm=0.05:bm=-0.06,unsharp=11:11:1.0[d];[1:v]format=gbrp[m];[a][d][m]maskedmerge,split[g1][g2];[g2]curves=all='0/0 0.5/0.4 1/0.86'[dd];[2:v]format=gbrp[m2];[g1][dd][m2]maskedmerge,format=rgb24" \
  -q:v 2 src/tenant/media/img-003-graded.jpg

node scripts/photos.mjs
ls -l src/tenant/media public/photos public/palms | awk '{s+=$5} END {print "total bytes", s}'
