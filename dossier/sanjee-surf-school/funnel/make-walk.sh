#!/usr/bin/env bash
# dossier/sanjee-surf-school/funnel/make-walk.sh — the old-site funnel screenshots of station 3b (auditor 0.1.3).
# media: dossier/sanjee-surf-school/funnel/landing-*.png
# media: dossier/sanjee-surf-school/funnel/walk/*.png
# Both come from the live site, so a re-run shows the site as it is that day, not as the audit saw it.
# Crawl capped at 12 pages on purpose (operator's instruction, 2026-11-05): keep the load on the site light. All 67 sitemap URLs were checked by the harvester.
# Read-only: no login, no cookies of ours, nothing typed, nothing submitted (see funnel/walk.mjs).
set -euo pipefail
cd "$(dirname "$0")/../../.."
node tools/funnel.mjs https://sanjee-surf.com/ --out dossier/sanjee-surf-school/funnel --depth 3 --pages 12
node dossier/sanjee-surf-school/funnel/walk.mjs dossier/sanjee-surf-school/funnel/walk
