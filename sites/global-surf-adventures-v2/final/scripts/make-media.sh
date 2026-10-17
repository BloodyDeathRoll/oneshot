#!/usr/bin/env bash
# Station 4g stand-in for the CMS, and the recipe for every media file of the final site (unique, "From the air").
# No Payload tenant exists before a sale (station 8), so this writes what the deployer's first seed would
# upload, in the shape scripts/fetch-tenant.mjs writes from Payload, then runs the build's own media steps.
#
#  1. The video uploads (src/tenant/media/gs2-*.mp4 + posters): high-quality masters cut from the
#     business-owned sources (dossier.videos[] vid-009, vid-010, vid-003, vid-002) with the unique mockup's
#     cut lists (mockups/unique/src/make-media.sh):
#       gs2-hero     the aerial edit at 1920×1080, rotated so it starts where the mockup's loop started
#                    (vid-009 3.05 s, the poster frame): the loop point is now a continuous cut
#       gs2-level-1  vid-010 11.8–16.4 s, 4:5 (beach pop-up lesson on soft-tops, boards carried to the water):
#                    replaces the 32.88 s whitewater shot the visual critic found dull (4f round 2)
#       gs2-level-2  vid-003 21.56–24.88 s, 4:3 · gs2-level-3  vid-002 8.86–12.50 s, 4:3 (as the mockup)
#  2. scripts/seed-from-dossier.mjs: photos, content.json, src/gaps/, src/lib/labels.json.
#  3. cms/publisher/src/video.mjs: the v0.9 renditions + src/tenant/videos.generated.json.
#  4. scripts/video-portrait.mjs: the 668×1080 portrait-phone rendition of the hero (the mockup's hero-p668).
#  5. scripts/photos.mjs: photo and poster crops + src/tenant/photos.generated.json.
# Needs: tools/link-assets.sh global-surf-adventures-v2, ffmpeg with libx264, libsvtav1, libwebp.
# media: sites/global-surf-adventures-v2/final/src/tenant/media/*
# media: sites/global-surf-adventures-v2/final/src/gaps/media/*
# media: sites/global-surf-adventures-v2/final/public/photos/*
# media: sites/global-surf-adventures-v2/final/public/video/*
set -euo pipefail
cd "$(dirname "$0")/.."
A=../../../dossier/global-surf-adventures-v2/assets/video
M=src/tenant/media
rm -rf "$M" public/video; mkdir -p "$M"
ff() { ffmpeg -v error -y "$@"; }
master() { ff "$@" -an -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p -movflags +faststart; }

# 1a. hero: [vid-009 3.05–3.20][3.25–5.25 lodge in palms][13.35–15.15 reef coast][vid-010 1.00–2.70 surfers, badge
#     cropped][vid-009 1.70–3.05 the rise] — the last shot runs into the first, so the loop has no visible seam.
master -i $A/vid-009-source.mp4 -i $A/vid-010-source.mp4 -filter_complex "
[0:v]trim=3.05:3.20,setpts=PTS-STARTPTS,fps=25,setsar=1[a2];
[0:v]trim=3.25:5.25,setpts=PTS-STARTPTS,fps=25,setsar=1[b];
[0:v]trim=13.35:15.15,setpts=PTS-STARTPTS,fps=25,setsar=1[c];
[1:v]trim=1.00:2.70,setpts=PTS-STARTPTS,fps=25,crop=1728:972:192:108,scale=1920:1080:flags=lanczos,setsar=1[d];
[0:v]trim=1.70:3.05,setpts=PTS-STARTPTS,fps=25,setsar=1[a1];
[a2][b][c][d][a1]concat=n=5:v=1:a=0[v]" -map "[v]" $M/gs2-hero.mp4
ff -i $M/gs2-hero.mp4 -frames:v 1 -q:v 2 $M/gs2-hero-poster.jpg

# 1b. level clips, centre crops at native pixels (corner badges fall outside)
clip() { master -ss "$2" -to "$3" -i "$A/$1" -vf "fps=25,$4,setsar=1" "$M/$5.mp4"; ff -ss "$6" -i "$M/$5.mp4" -frames:v 1 -q:v 2 "$M/$5-poster.jpg"; }
clip vid-010-source.mp4 11.80 16.40 "crop=864:1080:528:0" gs2-level-1 0.8
clip vid-003-source.mp4 21.56 24.88 "crop=1440:1080:240:0" gs2-level-2 0.4
clip vid-002-source.webm 8.86 12.50 "crop=1440:1080:240:0" gs2-level-3 0.4

# 2–5
node scripts/seed-from-dossier.mjs
node ../../../cms/publisher/src/video.mjs .
node scripts/video-portrait.mjs
node scripts/photos.mjs
ls -l $M public/video | awk '{print $5, $9}'
