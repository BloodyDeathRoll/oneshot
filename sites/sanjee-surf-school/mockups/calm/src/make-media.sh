#!/usr/bin/env bash
# Every image of the Sanjee Surf School calm mockup ("The sand", designer 0.7.1, station 4e), made from the
# business's own Google uploads in dossier/sanjee-surf-school/assets (tools/setup.sh / tools/link-assets.sh first).
# Needs ffmpeg and cwebp. Run from anywhere. Crops only, scaled down never up, no grading: nothing is drawn wider
# than its source. No video and no generated imagery (concepts §2 and §3).
# media: sites/sanjee-surf-school/mockups/calm/dist/img/**
set -euo pipefail
cd "$(dirname "$0")/../../../../.."
A=dossier/sanjee-surf-school/assets
D=sites/sanjee-surf-school/mockups/calm/dist
mkdir -p "$D/img"; rm -f "$D"/img/*
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
ff() { ffmpeg -v error -y "$@"; }

# img <asset file> <out-name> <filter chain or -> <quality>
img() {
  local src="$A/$1" out="$D/img/$2.webp" vf="$3" q="${4:-74}"
  if [ "$vf" = "-" ]; then ff -i "$src" "$T/x.png"; else ff -i "$src" -vf "$vf" "$T/x.png"; fi
  cwebp -quiet -q "$q" -m 6 -sharp_yuv "$T/x.png" -o "$out"
}

# ---- first screen: img-002, the bay from the sand (2000x1500), keeping the bottom of the frame.
# Desktop 1960x1225: sky over the upper two thirds, headland low right. 40 px off the right edge removes a utility
# pole at the frame's edge. Phone: the 693x1500 window at x=1000.
# The sky is smooth, so it takes a higher quality than the rest or it bands.
img img-002.jpg hero-2000 "crop=1960:1225:0:275" 76
img img-002.jpg hero-1400 "crop=1960:1225:0:275,scale=1400:-2:flags=lanczos" 76
img img-002.jpg hero-m    "crop=693:1500:1000:0" 78

# ---- the shallows: img-005, the only picture of a lesson (832x464). 4:3 around the two stances, at native size.
img img-005.jpg lesson "crop=618:464:150:0" 80

# ---- feature band: img-009, the paddler (1600x1067). Phone: a tall window around the paddler.
img img-009.webp band-1600 - 72
img img-009.webp band-m "crop=740:1067:410:0" 74

# ---- Sanjee: img-008 (997x1024). Stood upright: the horizon falls 19 degrees, so rotate back and take the largest
# 4:5 that the rotation leaves whole. 676x845, drawn at 460 css px at most.
img img-008.webp sanjee "rotate=-19*PI/180:c=white,crop=676:845:160:90" 80

# ---- outside: img-013, Coco Beach by the old site's own account (1280x960); img-006, the wave (848x480).
img img-013.webp beach "scale=1120:-2:flags=lanczos" 74
img img-006.jpg  wave - 80

# ---- back on the sand: img-019, the poles and the footprints (1440x1920).
img img-019.webp sand-d "scale=1200:-2:flags=lanczos" 74
img img-019.webp sand-m "scale=900:-2:flags=lanczos" 74

ls -l "$D/img"
