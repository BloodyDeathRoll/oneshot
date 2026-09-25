#!/usr/bin/env bash
# Restore a backup.sh directory. DESTRUCTIVE: replaces the database and the media of the running
# stack. Does not republish: run the publisher CLI for the tenants you want rebuilt afterwards.
#   ./scripts/restore.sh <backup-dir>
source "$(dirname "$0")/common.sh"

dir="${1:?usage: restore.sh <backup-dir>}"
[[ -f "$dir/db.dump" && -f "$dir/media.tgz" ]] || { echo "$dir is not a backup directory" >&2; exit 1; }
( cd "$dir" && grep -q "db_dump_sha256=$(sha256sum db.dump | cut -d' ' -f1)" backup.meta \
  && grep -q "media_sha256=$(sha256sum media.tgz | cut -d' ' -f1)" backup.meta ) \
  || { echo "$dir: checksum mismatch — refusing" >&2; exit 1; }

dc stop publisher cms                       # nothing may write while we restore
dc exec -T postgres pg_restore -U payload -d payload --clean --if-exists --no-owner --single-transaction < "$dir/db.dump"
dc run --rm --no-deps -T --entrypoint sh cms -c 'find /app/media -mindepth 1 -delete && tar -C /app/media -xzf -' < "$dir/media.tgz"
dc up -d cms publisher
wait_healthy cms; wait_healthy publisher
echo "restored from $dir"
