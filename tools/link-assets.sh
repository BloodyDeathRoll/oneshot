#!/usr/bin/env bash
# tools/link-assets.sh <slug> — keep a business's git-ignored media outside the checkout.
#
# Why: Shahar, 2026-09-30 — the Global Surf videos lived only inside a worktree, the worktree was
# removed, and every clip had to be downloaded and cut again. Media now lives in one store
# (default ~/.oneshot/assets, override with ONESHOT_ASSETS) and each checkout links to it:
#   dossier/<slug>/assets                   -> <store>/<slug>
#   sites/<slug>/mockups/<name>/dist/video  -> <store>/<slug>/mockups/<name>/video
# Run it once in every new checkout or worktree, and again after adding a mockup.
# A real folder already in the checkout is moved into the store first, never deleted.
set -euo pipefail
slug=${1:?usage: tools/link-assets.sh <slug>}
cd "$(dirname "$0")/.."
STORE=${ONESHOT_ASSETS:-$HOME/.oneshot/assets}/$slug

link() { # $1 path in the checkout, $2 folder in the store
  mkdir -p "$2" "$(dirname "$1")"
  if [ -L "$1" ]; then ln -sfn "$2" "$1"
  elif [ -d "$1" ]; then cp -an "$1/." "$2/" && rm -r "$1" && ln -s "$2" "$1"
  else ln -s "$2" "$1"; fi
  echo "$1 -> $2"
}

link "dossier/$slug/assets" "$STORE"
for m in sites/"$slug"/mockups/*/; do
  if [ -d "${m}dist" ]; then link "${m}dist/video" "$STORE/mockups/$(basename "$m")/video"; fi
done
