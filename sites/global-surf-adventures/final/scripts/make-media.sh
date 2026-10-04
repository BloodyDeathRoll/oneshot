#!/usr/bin/env bash
# Station 4g stand-in for the CMS, and the recipe for every media file of the final site.
# There is no Payload tenant for Global Surf yet, so this writes what the deployer's first seed
# would upload, in the shape scripts/fetch-tenant.mjs writes from Payload, then runs the build's own
# media steps on it. Once the tenant exists, `npm run build:cms` replaces steps 1–2 with the CMS's
# content and uploads.
#
#  1. The video uploads (src/tenant/media/gs-*.mp4 + posters): high-quality masters cut from the
#     business-owned sources (dossier.videos[]: vid-002, vid-003, vid-009, vid-010 and the derived
#     vid-002e / vid-003e), with the picked mockup's cut lists, so the build encodes them once:
#       gs-hero-loop        mockups/picked/src/make-hero.sh, desktop master (1728×972, 10.32 s)
#       gs-level-{1,2,3}-card  mockups/make-clips.sh p45 cuts (864×1080), the home level cards
#       gs-level-{1,2,3}-desk  mockups/picked/src/make-book-clips.sh (864×1080), booking step 1
#     Recorded in dossier.videos[] as vid-hero-c (hero) and vid-book-l1..l3 (booking desk).
#  2. scripts/seed-from-dossier.mjs: photos copied from dossier/<slug>/assets, content.json from the
#     audited copy (sites/<slug>/copy/en.json) + the dossier; src/gaps/ (SCHEMA GAP content) and
#     src/lib/labels.json (template wording) from the copy's mockup_extras.
#  3. cms/publisher/src/video.mjs: the v0.9 renditions + src/tenant/videos.generated.json.
#  4. scripts/video-portrait.mjs: the portrait-phone rendition of the hero.
#  5. scripts/photos.mjs: the photo crops + src/tenant/photos.generated.json.
# Needs: tools/link-assets.sh global-surf-adventures (dossier assets + video sources), ffmpeg with
# libx264, libsvtav1 and libwebp.
# media: sites/global-surf-adventures/final/src/tenant/media/*
# media: sites/global-surf-adventures/final/src/gaps/media/*
# media: sites/global-surf-adventures/final/public/photos/*
# media: sites/global-surf-adventures/final/public/video/*
set -euo pipefail
cd "$(dirname "$0")/.."
A=../../../dossier/global-surf-adventures/assets/video
M=src/tenant/media
rm -rf "$M"; mkdir -p "$M"
ff() { ffmpeg -v error -y "$@"; }
master() { ff "$@" -an -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p -movflags +faststart; }

# 1a. hero loop (pool deck | beginner stands up | guide cheers | reef), desktop master of make-hero.sh
G010="eq=contrast=1.06:saturation=1.12"
master -i $A/vid-009-source.mp4 -i $A/vid-010-source.mp4 -filter_complex "
[0:v]trim=5.28:8.04,setpts=PTS-STARTPTS,scale=1728:972,setsar=1[a];
[1:v]trim=28.16:31.08,setpts=PTS-STARTPTS,crop=1728:972:192:40,$G010,setsar=1[b];
[0:v]trim=40.36:45.00,setpts=PTS-STARTPTS,scale=1728:972,setsar=1[c];
[a][b][c]concat=n=3:v=1:a=0,fps=25[v]" -map "[v]" $M/gs-hero-loop.mp4
ff -ss 0.04 -i $M/gs-hero-loop.mp4 -frames:v 1 -q:v 2 $M/gs-hero-loop-poster.jpg

# 1b. home level cards: make-clips.sh's p45 cuts (crop 864×1080 at x 528)
P45="crop=864:1080:528:0"
master -ss 20 -t 9 -i $A/vid-010-source.mp4 -vf "$P45" $M/gs-level-1-card.mp4
master -ss 1.4 -i $A/vid-003e-d1920.webm -vf "$P45" $M/gs-level-2-card.mp4
master -i $A/vid-002e-d1920.webm -vf "$P45" $M/gs-level-3-card.mp4
ff -ss 20.4 -i $A/vid-010-source.mp4 -frames:v 1 -vf "$P45" -q:v 2 $M/gs-level-1-card-poster.jpg
for n in 2 3; do ff -i $M/gs-level-$n-card.mp4 -frames:v 1 -q:v 2 $M/gs-level-$n-card-poster.jpg; done

# 1c. booking desk clips: make-book-clips.sh (native 864×1080 crops of the sources)
C1="crop=864:1080:528:0"; C="crop=864:1080:631:0"
master -i $A/vid-010-source.mp4 -filter_complex "[0:v]trim=20:29,setpts=PTS-STARTPTS,$C1,fps=25,setsar=1[v]" -map "[v]" $M/gs-level-1-desk.mp4
master -i $A/vid-003-source.mp4 -filter_complex "[0:v]trim=12.2:14.0,setpts=PTS-STARTPTS,$C,fps=25,setsar=1[a];[0:v]trim=14.2:17.8,setpts=PTS-STARTPTS,$C,fps=25,setsar=1[b];[a][b]concat=n=2:v=1:a=0[v]" -map "[v]" $M/gs-level-2-desk.mp4
master -i $A/vid-002-source.webm -filter_complex "[0:v]trim=8.9:12.5,setpts=PTS-STARTPTS,$C,fps=25,setsar=1[a];[0:v]trim=26.8:28.9,setpts=PTS-STARTPTS,$C,fps=25,setsar=1[b];[a][b]concat=n=2:v=1:a=0[v]" -map "[v]" $M/gs-level-3-desk.mp4
for n in 1 2 3; do ff -i $M/gs-level-$n-desk.mp4 -frames:v 1 -q:v 2 $M/gs-level-$n-desk-poster.jpg; done

# 2–5
node scripts/seed-from-dossier.mjs
node ../../../cms/publisher/src/video.mjs .
node scripts/video-portrait.mjs
node scripts/photos.mjs
ls -l $M public/video | awk '{print $5, $9}'
