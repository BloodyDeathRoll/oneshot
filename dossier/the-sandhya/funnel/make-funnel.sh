#!/usr/bin/env bash
# dossier/the-sandhya/funnel/make-funnel.sh — remake the two landing screenshots tools/funnel.mjs
# writes for the auditor (station 3b). The tool runs into a temporary folder and only the images are
# copied back, so funnel/funnel.json, which audit.json's `measured` equals field for field, stays as
# it was measured. A remade landing-fold.png can catch the white intro veil at another moment.
# media: dossier/the-sandhya/funnel/landing-*.png
set -euo pipefail
cd "$(dirname "$0")/../../.."
OUT=dossier/the-sandhya/funnel
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
# The page can outlast the tool's 30 s wait for the load event (it did on one run of two, 2026-11-06).
for attempt in 1 2 3; do
  node tools/funnel.mjs https://thesandhya.com/ --out "$TMP" --depth 0 --pages 1
  [ -f "$TMP/landing-mobile.png" ] && break
done
cp "$TMP/landing-mobile.png" "$TMP/landing-fold.png" "$OUT/"
