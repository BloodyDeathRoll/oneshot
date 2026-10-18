#!/usr/bin/env bash
# dossier/mutag-meitiv/make-client-media.sh — web renditions of the video the client handed over.
# media: dossier/mutag-meitiv/assets/video/vid-004*
#
# Input: dossier/mutag-meitiv/client/2026-10-18/video-01.mp4 (git-ignored; from Shahar, 2026-10-18,
# WhatsApp zip). tools/fetch-video.mjs fetches over HTTP, so the file is served from 127.0.0.1 for
# the run. Same cut every time: 2–14 s, poster at 3 s.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
SRC=dossier/mutag-meitiv/client/2026-10-18/video-01.mp4
[ -f "$SRC" ] || { echo "missing $SRC (client file; ask Shahar for the 2026-10-18 zip)"; exit 1; }
PORT=8799
python3 -m http.server $PORT --bind 127.0.0.1 --directory "$(dirname "$SRC")" >/dev/null 2>&1 &
PID=$!; trap 'kill $PID' EXIT; sleep 1
cp "$SRC" "$(dirname "$SRC")/vid-c01.mp4"
node tools/fetch-video.mjs mutag-meitiv "http://127.0.0.1:$PORT/vid-c01.mp4" \
  --license business-owned --license-note "handed over by the client (WhatsApp zip via Shahar, 2026-10-18)" \
  --start 2 --length 12 --poster-at 3 \
  --describe "vertical phone clip, overhead: a workshop table covered in plastic with magazine cut-outs, collage boards, scissors, markers and greenery; hands at work; a participant in the first second"
rm -f "$(dirname "$SRC")/vid-c01.mp4"
