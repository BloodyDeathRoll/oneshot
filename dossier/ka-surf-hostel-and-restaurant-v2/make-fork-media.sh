#!/usr/bin/env bash
# media: dossier/ka-surf-hostel-and-restaurant-v2/assets/**
# The fork's dossier media (run 2026-10-lk-surf-01) are the original's, unchanged: copy them from
# dossier/ka-surf-hostel-and-restaurant/assets (restore that first: node tools/media.mjs restore ka-surf-hostel-and-restaurant).
set -euo pipefail
cd "$(dirname "$0")/../.."
bash tools/link-assets.sh ka-surf-hostel-and-restaurant-v2 >/dev/null
cp -an dossier/ka-surf-hostel-and-restaurant/assets/. dossier/ka-surf-hostel-and-restaurant-v2/assets/
