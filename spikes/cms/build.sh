#!/usr/bin/env bash
# CMS spike build: download pinned Grav + Bludit releases, verify sha256, overlay our
# shared design + content, and produce one upload-ready zip per CMS in dist/.
#
#   ./build.sh            build both
#   ./build.sh grav       build one
#   ./build.sh bludit
#
# Needs: bash, curl, unzip, zip, sha256sum. No PHP, no docker, no network after the
# first run (downloads are cached in .cache/).
# Output zips are FLAT (files at the zip root, including .htaccess): upload the zip into
# the target folder (public_html or a subfolder) and extract it there.
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$PWD"

GRAV_VERSION="2.1.6"
GRAV_URL="https://github.com/getgrav/grav/releases/download/${GRAV_VERSION}/grav-admin-v${GRAV_VERSION}.zip"
# Same bytes as https://getgrav.org/download/core/grav-admin/2.1.6 (checked 2026-09-17).
GRAV_SHA256="3e0e546a4f39ae8c5276ff631156e2bc25ffab63eec44c103a724a9b600318ca"

BLUDIT_VERSION="3.22.0"
# The download button on https://www.bludit.com/ points at this GitHub tag archive.
# GitHub generates tag archives on demand; if the sha256 ever changes, diff the contents
# against the 3.22.0 tag before updating the pin.
BLUDIT_URL="https://github.com/bludit/bludit/archive/refs/tags/${BLUDIT_VERSION}.zip"
BLUDIT_SHA256="cbc869e12d37f359b7f4ca7044d43d6305ac1d8d0cebdf8416d80e0378d4a070"

# Bludit plugins that stay in the package. Everything else under bl-plugins/ is removed
# (PLAN.md §6: no unused plugins). Each kept plugin has a db.php in the overlay = activated.
BLUDIT_KEEP_PLUGINS="tinymce canonical robots wobbly"

fetch() { # url sha256 dest
  mkdir -p "$(dirname "$3")"
  [ -f "$3" ] || curl -fsSL --retry 3 -o "$3" "$1"
  echo "$2  $3" | sha256sum -c - >/dev/null || { echo "sha256 mismatch for $3" >&2; exit 1; }
  echo "verified $(basename "$3")"
}

pack() { # site_dir zip_path
  rm -f "$2"; mkdir -p "$(dirname "$2")"
  # -X: no extra file attributes, sorted input: stable-ish archive. -D: no directory entries
  # would drop empty dirs, so directories are kept.
  (cd "$1" && find . -mindepth 1 | LC_ALL=C sort | zip -q -X "$2" -@)
  echo "$(basename "$2"): $(du -h "$2" | cut -f1), $(find "$1" -type f | wc -l) files, $(du -sh "$1" | cut -f1) unpacked"
}

build_grav() {
  local zip="$ROOT/.cache/grav-admin-v${GRAV_VERSION}.zip" site="$ROOT/grav/site"
  fetch "$GRAV_URL" "$GRAV_SHA256" "$zip"
  rm -rf "$site" "$ROOT/grav/.unpack"; mkdir -p "$ROOT/grav/.unpack"
  unzip -q "$zip" -d "$ROOT/grav/.unpack"
  mv "$ROOT/grav/.unpack/grav-admin" "$site"; rmdir "$ROOT/grav/.unpack"

  # Remove the sample content, the stock theme and the one plugin nothing depends on.
  # Kept plugins: admin2 + api (the admin), login/form/email/shortcode-core (their
  # dependency chain), flex-objects (accounts/pages backend for the API), error, problems.
  rm -rf "$site/user/pages/"* "$site/user/themes/quark2" "$site/user/plugins/github-markdown-alerts"

  cp -a "$ROOT/grav/overlay/." "$site/"
  mkdir -p "$site/user/themes/wobbly/css" "$site/user/themes/wobbly/js"
  cp "$ROOT/design/css/site.css" "$site/user/themes/wobbly/css/site.css"
  cp "$ROOT/design/js/waves.js" "$site/user/themes/wobbly/js/waves.js"
  cp "$ROOT/design/img/hero.jpg" "$site/user/pages/01.home/hero.jpg"

  # Credential check: the package must not contain any account.
  if [ -n "$(find "$site/user/accounts" -type f ! -name '.*' 2>/dev/null)" ]; then
    echo "refusing to package: user/accounts is not empty" >&2; exit 1
  fi
  pack "$site" "$ROOT/dist/grav-site.zip"
}

build_bludit() {
  local zip="$ROOT/.cache/bludit-${BLUDIT_VERSION}.zip" site="$ROOT/bludit/site"
  fetch "$BLUDIT_URL" "$BLUDIT_SHA256" "$zip"
  rm -rf "$site" "$ROOT/bludit/.unpack"; mkdir -p "$ROOT/bludit/.unpack"
  unzip -q "$zip" -d "$ROOT/bludit/.unpack"
  mv "$ROOT/bludit/.unpack/bludit-${BLUDIT_VERSION}" "$site"; rmdir "$ROOT/bludit/.unpack"

  # Repo cruft, the stock installer (replaced by first-run.php, see README), stock themes,
  # and every plugin we do not activate.
  rm -rf "$site/.github" "$site/.gitignore" "$site/.prettierrc" "$site"/README.*.md "$site/install.php"
  rm -rf "$site/bl-themes/"*
  for p in "$site/bl-plugins/"*/; do
    case " $BLUDIT_KEEP_PLUGINS " in *" $(basename "$p") "*) ;; *) rm -rf "$p" ;; esac
  done

  cp -a "$ROOT/bludit/overlay/." "$site/"
  find "$site/bl-content" -name .gitkeep -delete
  mkdir -p "$site/bl-themes/wobbly/css" "$site/bl-themes/wobbly/js"
  cp "$ROOT/design/css/site.css" "$site/bl-themes/wobbly/css/site.css"
  cp "$ROOT/design/js/waves.js" "$site/bl-themes/wobbly/js/waves.js"
  cp "$ROOT/design/img/hero.jpg" "$site/bl-content/uploads/pages/0a1b2c3d4e5f60718293a4b5c6d7e8f1/hero.jpg"

  if [ -e "$site/bl-content/databases/users.php" ]; then
    echo "refusing to package: bl-content/databases/users.php exists" >&2; exit 1
  fi
  pack "$site" "$ROOT/dist/bludit-site.zip"
}

case "${1:-all}" in
  grav) build_grav ;;
  bludit) build_bludit ;;
  all) build_grav; build_bludit ;;
  *) echo "usage: $0 [grav|bludit|all]" >&2; exit 2 ;;
esac
