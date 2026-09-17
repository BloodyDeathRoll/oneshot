#!/usr/bin/env bash
# Unpack both dist zips into clean directories (site root AND a subfolder) and serve each
# with Apache + PHP 8.3 in docker. Usage: ./serve.sh up | down
#   grav   root  http://localhost:8081/        subfolder http://localhost:8082/surf/
#   bludit root  http://localhost:8083/        subfolder http://localhost:8084/surf/
# WORK (default: test/out/www) holds the unpacked copies; it is wiped on every "up".
set -euo pipefail
cd "$(dirname "$0")"
CMS="$PWD/.."; WORK="${WORK:-$PWD/out/www}"; IMAGE=oneshot-cms-spike:php83
NAMES="oneshot-grav-root oneshot-grav-sub oneshot-bludit-root oneshot-bludit-sub"

down() { for n in $NAMES; do docker rm -f "$n" >/dev/null 2>&1 || true; done; }

up() {
  docker image inspect "$IMAGE" >/dev/null 2>&1 || docker build -q -t "$IMAGE" .
  down; rm -rf "$WORK"; mkdir -p "$WORK"
  local port=8081
  for cms in grav bludit; do
    for mode in root sub; do
      local dir="$WORK/$cms-$mode" target
      target="$dir"; [ "$mode" = sub ] && target="$dir/surf"
      mkdir -p "$target"; unzip -q "$CMS/dist/$cms-site.zip" -d "$target"
      # Apache + PHP run as the (non-root) file owner, like suexec/mod_ruid2 on cPanel shared hosting.
      docker run -d --name "oneshot-$cms-$mode" -p "127.0.0.1:$port:80" --user "$(id -u):$(id -g)" \
        -v "$dir:/var/www/html" "$IMAGE" >/dev/null
      echo "oneshot-$cms-$mode -> http://localhost:$port/$([ "$mode" = sub ] && echo surf/)"
      port=$((port + 1))
    done
  done
}

case "${1:-}" in up) up ;; down) down ;; *) echo "usage: $0 up|down" >&2; exit 2 ;; esac
