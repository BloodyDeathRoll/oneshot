#!/usr/bin/env bash
# tools/setup.sh — run once in every new clone or worktree (docs/team.md).
#   - turns on the pre-commit hook that keeps media out of git;
#   - links each business's media folders into the local store (tools/link-assets.sh);
#   - restores each business's media from the store, its recipes, or the web (tools/media.mjs).
# Then: node tools/team.mjs whoami — if it fails, add your git user.email to team.json.
set -euo pipefail
cd "$(dirname "$0")/.."
git config core.hooksPath tools/hooks
for d in dossier/*/; do s=$(basename "$d"); [ -f "media/$s.tsv" ] && bash tools/link-assets.sh "$s" >/dev/null; done
for f in media/*.tsv; do s=$(basename "$f" .tsv); node tools/media.mjs restore "$s"; done
node tools/media.mjs status
node tools/team.mjs whoami || true
