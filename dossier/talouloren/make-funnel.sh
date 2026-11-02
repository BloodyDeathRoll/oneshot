#!/usr/bin/env bash
# dossier/talouloren/make-funnel.sh — the auditor's measurement of talouloren.com (station 3b):
# tools/funnel.mjs (mobile crawl, depth 3) and the hand walk funnel/walk.mjs (session popup, course, quizzes).
# media: dossier/talouloren/funnel/*.png
# media: dossier/talouloren/funnel/walk/*.png
# Writes funnel/funnel.json, funnel/walk.json and the screenshots. Read-only on the site. Run from anywhere.
set -euo pipefail
cd "$(dirname "$0")/../.."
node tools/funnel.mjs https://talouloren.com/ --out dossier/talouloren/funnel --depth 3 --pages 30 --shots
mkdir -p dossier/talouloren/funnel/walk
node dossier/talouloren/funnel/walk.mjs dossier/talouloren/funnel/walk
