#!/usr/bin/env bash
# Self-hosted, subset web fonts for the three Layday v2 mockups (4f round 1: "self-host fonts").
# Downloads each face once from its publisher (Fontshare: ITF Free Font License, self-hosting allowed;
# Google Fonts: SIL OFL), subsets it to Latin + the punctuation the copy uses, and writes WOFF2 into
# each mockup's dist/fonts/. Needs fontTools + brotli: FONTPY=/path/to/python (default python3).
# Run from anywhere; rerun after changing a face.
# media: sites/layday-surf-ahangama-v2/mockups/*/dist/fonts/**
set -euo pipefail
cd "$(dirname "$0")/../../.."
M=sites/layday-surf-ahangama-v2/mockups
PY=${FONTPY:-python3}
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
UNI='U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2010-2027,U+2030-203A,U+2122,U+2212'
fontshare() { # slug weight(401=italic) out
  local url; url=$(curl -fsS "https://api.fontshare.com/v2/css?f[]=$1@$2&display=swap" | grep -o "//cdn.fontshare.com/[^']*\.woff2" | head -1)
  curl -fsS "https:$url" -o "$T/$3.src.woff2"; }
google() { # family-query weight-or-ital out   (latin subset file)
  local url; url=$(curl -fsS -A "$UA" "https://fonts.googleapis.com/css2?family=$1&display=swap" | awk '/\/\* latin \*\//{f=1} f&&/src:/{print;exit}' | grep -o 'https://[^)]*\.woff2')
  curl -fsS "$url" -o "$T/$2.src.woff2"; }
sub() { # in out-path
  "$PY" -m fontTools.subset "$T/$1.src.woff2" --unicodes="$UNI" --flavor=woff2 --layout-features='kern,liga,calt,ccmp,locl,mark,mkmk,onum,lnum,tnum,pnum' --output-file="$2"; }

# calm: Pilcrow Rounded (text + statements) + Caveat (section titles only)
mkdir -p $M/calm/dist/fonts
for w in 400 500 700; do fontshare pilcrow-rounded $w pilcrow-$w; sub pilcrow-$w $M/calm/dist/fonts/pilcrow-rounded-$w.woff2; done
google 'Caveat:wght@600' caveat-600; sub caveat-600 $M/calm/dist/fonts/caveat-600.woff2

# interactive: Libre Franklin (variable, 400–700) + Yellowtail (section titles only)
mkdir -p $M/interactive/dist/fonts
google 'Libre+Franklin:wght@400..700' librefranklin; sub librefranklin $M/interactive/dist/fonts/libre-franklin-var.woff2
google 'Yellowtail' yellowtail; sub yellowtail $M/interactive/dist/fonts/yellowtail-400.woff2

# unique: Boska (the name, titles, statements) + General Sans (everything people read)
mkdir -p $M/unique/dist/fonts
fontshare boska 400 boska-400; sub boska-400 $M/unique/dist/fonts/boska-400.woff2
fontshare boska 401 boska-400i; sub boska-400i $M/unique/dist/fonts/boska-400-italic.woff2
for w in 400 500; do fontshare general-sans $w gs-$w; sub gs-$w $M/unique/dist/fonts/general-sans-$w.woff2; done
ls -l $M/*/dist/fonts/
