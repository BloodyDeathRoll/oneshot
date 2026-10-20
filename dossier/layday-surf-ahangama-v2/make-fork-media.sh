#!/usr/bin/env bash
# media: dossier/layday-surf-ahangama-v2/assets/**
# The fork's dossier media (run 2026-10-lk-surf-01) are the original's, unchanged: copy them from
# dossier/layday-surf-ahangama/assets (restore that first: node tools/media.mjs restore layday-surf-ahangama).
set -euo pipefail
cd "$(dirname "$0")/../.."
bash tools/link-assets.sh layday-surf-ahangama-v2 >/dev/null
cp -an dossier/layday-surf-ahangama/assets/. dossier/layday-surf-ahangama-v2/assets/
