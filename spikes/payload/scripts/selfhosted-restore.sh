#!/usr/bin/env bash
# One-command restore of a selfhosted-backup.sh directory. DESTRUCTIVE: replaces the database and
# the media directory of the running stack, then rebuilds the site.
#   ./scripts/selfhosted-restore.sh <backup-dir>
source "$(dirname "$0")/selfhosted-common.sh"

dir="${1:?usage: selfhosted-restore.sh <backup-dir>}"
[[ -f "$dir/db.dump" && -f "$dir/media.tgz" ]] || { echo "$dir is not a backup directory" >&2; exit 1; }

dc stop publisher cms                       # nothing may write while we restore
dc exec -T postgres pg_restore -U payload -d payload --clean --if-exists --no-owner --single-transaction < "$dir/db.dump"
dc run --rm --no-deps -T --entrypoint sh cms -c 'find /app/media -mindepth 1 -delete && tar -C /app/media -xzf -' < "$dir/media.tgz"
dc up -d cms publisher
wait_healthy cms; wait_healthy publisher
trigger_rebuild restore
echo "restored from $dir"
