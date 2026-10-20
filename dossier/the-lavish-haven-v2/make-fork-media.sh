#!/usr/bin/env bash
# media: dossier/the-lavish-haven-v2/assets/**
# The fork's dossier media (run 2026-10-lk-surf-01) are the original's, unchanged: copy them from
# dossier/the-lavish-haven/assets (restore that first: node tools/media.mjs restore the-lavish-haven).
set -euo pipefail
cd "$(dirname "$0")/../.."
bash tools/link-assets.sh the-lavish-haven-v2 >/dev/null
cp -an dossier/the-lavish-haven/assets/. dossier/the-lavish-haven-v2/assets/
