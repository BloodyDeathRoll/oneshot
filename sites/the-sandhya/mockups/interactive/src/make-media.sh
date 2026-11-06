#!/usr/bin/env bash
# make-media.sh: every image in the interactive mockup's dist/img, from the dossier's assets.
# media: sites/the-sandhya/mockups/interactive/dist/img/*
# Needs cwebp (brew install webp) and node. Run from anywhere: bash make-media.sh
# Sources are the local copies in dossier/the-sandhya/assets, capped at 2000 px. See notes.md.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../../../../.." && pwd)"
A="$ROOT/dossier/the-sandhya/assets"
O="$HERE/../dist/img"
mkdir -p "$O"

# web <asset-number> <out-name> <width> <quality> [x y w h]: crop in the 2000 px frame, then resize.
web() {
  local src="$A/img-$1.jpg" out="$O/$2.webp" width="$3" q="$4"
  if [ "$#" -gt 4 ]; then
    cwebp -quiet -metadata none -sharp_yuv -m 6 -q "$q" -crop "$5" "$6" "$7" "$8" -resize "$width" 0 "$src" -o "$out"
  else
    cwebp -quiet -metadata none -sharp_yuv -m 6 -q "$q" -resize "$width" 0 "$src" -o "$out"
  fi
}

# The depth maps, painted by hand in code.
node "$HERE/paint-depth.mjs"

# Logo: the white file, shown in ink with a CSS filter.
cwebp -quiet -metadata none -q 90 -alpha_q 90 -resize 406 0 "$A/logo-white.png" -o "$O/logo.webp"

# First screen: img-032. The phone crop's x and w are mirrored in index.html (data-crop).
web 032 hero-2000 2000 76
web 032 hero-1440 1440 78
web 032 hero-phone 616 76 880 0 616 1333

# featureLine: img-068, same code. Phone crop mirrored in index.html.
web 068 feature-2000 2000 74
web 068 feature-1440 1440 76
web 068 feature-phone 900 78 430 0 1000 1334

# Room tiles, 4:5, cut to the window.
web 077 tile-studio-king 800 76 620 0 1066 1333
web 043 tile-studio-twin 800 76 560 0 1066 1333
web 071 tile-studio-plus 800 76 467 0 1067 1334
web 087 tile-suite 800 76 620 0 1024 1280

# Room galleries, 3:2.
for n in 077 061 062 070 079 043 080 165 167 083 042 066 067 074 076 073 071 087 171 172 058 059 055; do
  web "$n" "r-$n" 1100 72
done

# Arrival.
web 038 arrival 1400 76

# Dining: one ratio, 1:1, each cut to its plate.
web 118 food-118 853 76 370 0 1334 1334
web 112 food-112 853 76 143 0 853 853
web 115 food-115 853 76 427 0 853 853
web 114 food-114 853 76 200 0 853 853
web 113 food-113 853 76 213 0 853 853
web 108 food-108 853 76 213 0 853 853

# Casual Luxe slideshow, 3:2.
web 035 luxe-035 1200 74
web 015 luxe-015 1200 74
web 016 luxe-016 1200 74
web 122 luxe-122 1200 74

# Kabalana: two photographs and the hotel's own drawn map.
web 034 beach-034 900 76
web 153 beach-153 1200 76
web 013 map 800 82

# Exclusive Use.
web 152 house-152 1400 76

# Twilight: the lobby cut clear of the surfboards, the facade at native size.
web 023 dusk-023 960 80 240 0 960 800
web 027 dusk-027 1000 80
