#!/usr/bin/env bash
# Backup of the managed CMS: database (pg_dump, custom format) + uploaded media, then off the box.
#   ./scripts/backup.sh            → backups/<UTC stamp>/, upload to BACKUP_PAR_URL if set, keep 14 locally;
#                                    the bucket deletes uploaded backups after 30 days (lifecycle rule expire-backups-30d)
# Safe while live. Installed nightly by ./scripts/install-backup-cron.sh.
# BACKUP_PAR_URL (cms/.env): an OCI Object Storage pre-authenticated request, write-only, bucket
# oneshot-cms-backups — the box can add objects and can neither list nor read nor delete them.
source "$(dirname "$0")/common.sh"

stamp="$(date -u +%Y%m%dT%H%M%SZ)"
dir="backups/$stamp"
mkdir -p "$dir"; chmod 700 backups "$dir"
dc exec -T postgres pg_dump -U payload -d payload --format=custom --no-owner > "$dir/db.dump"
dc exec -T cms tar -C /app/media -czf - . > "$dir/media.tgz"
{
  echo "created=$(date -u +%FT%TZ)"
  echo "postgres=$(dc exec -T postgres postgres --version | tr -d '\r')"
  echo "db_dump_sha256=$(sha256sum "$dir/db.dump" | cut -d' ' -f1)"
  echo "media_sha256=$(sha256sum "$dir/media.tgz" | cut -d' ' -f1)"
} > "$dir/backup.meta"

par="$(envval BACKUP_PAR_URL || true)"
if [[ -n "$par" ]]; then
  for f in db.dump media.tgz backup.meta; do
    curl -fsS --retry 3 -T "$dir/$f" "${par%/}/$stamp/$f" >/dev/null
  done
  echo "uploaded $stamp to object storage"
else
  echo "BACKUP_PAR_URL not set — backup kept on this box only" >&2
fi

# local retention: newest 14
ls -1d backups/*/ 2>/dev/null | sort | head -n -14 | xargs -r rm -rf
echo "backup written to $dir ($(du -sh "$dir" | cut -f1))"
