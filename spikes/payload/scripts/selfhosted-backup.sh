#!/usr/bin/env bash
# One-command backup of the self-hosted stack: database (pg_dump, custom format) + uploaded media.
#   ./scripts/selfhosted-backup.sh [target-dir]        default: backups/<UTC timestamp>
# Safe to run while the stack is live. Copy the directory off the box (object storage) afterwards.
source "$(dirname "$0")/selfhosted-common.sh"

dir="${1:-backups/$(date -u +%Y%m%dT%H%M%SZ)}"
mkdir -p "$dir"; chmod 700 "$dir"
dc exec -T postgres pg_dump -U payload -d payload --format=custom --no-owner > "$dir/db.dump"
dc exec -T cms tar -C /app/media -czf - . > "$dir/media.tgz"
{
  echo "created=$(date -u +%FT%TZ)"
  echo "postgres=$(dc exec -T postgres postgres --version | tr -d '\r')"
  echo "db_dump_sha256=$(sha256sum "$dir/db.dump" | cut -d' ' -f1)"
  echo "media_sha256=$(sha256sum "$dir/media.tgz" | cut -d' ' -f1)"
} > "$dir/backup.meta"
echo "backup written to $dir ($(du -sh "$dir" | cut -f1))"
