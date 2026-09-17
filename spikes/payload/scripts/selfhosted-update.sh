#!/usr/bin/env bash
# One-command update of the self-hosted stack: take a backup, rebuild the images from the current
# checkout (pulling newer base images for the pinned tags), restart, run DB migrations (the CMS
# does that on boot via prodMigrations), rebuild the site with the new template.
#   git pull && ./scripts/selfhosted-update.sh
source "$(dirname "$0")/selfhosted-common.sh"

"$(dirname "$0")/selfhosted-backup.sh" "backups/pre-update-$(date -u +%Y%m%dT%H%M%SZ)"
dc build --pull
dc up -d --remove-orphans
wait_healthy cms; wait_healthy publisher
trigger_rebuild update
dc ps
