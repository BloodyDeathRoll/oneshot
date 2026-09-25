#!/usr/bin/env bash
# Nightly backup at 02:30 UTC via the invoking user's crontab. Idempotent.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
line="30 2 * * * $here/backup.sh >> $here/../backups/cron.log 2>&1"
mkdir -p "$here/../backups"; chmod 700 "$here/../backups"
( crontab -l 2>/dev/null | grep -vF "$here/backup.sh"; echo "$line" ) | crontab -
crontab -l | grep -F "$here/backup.sh"
