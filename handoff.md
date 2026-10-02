# Session Handoff — 2026-10-02

## Goal
Make Oneshot work for two operators (Shahar + Alon): shared history of who did what, open
assignments on the dashboard, and media (images/video) kept out of git, with git as small as possible.

## Current State
- **Repo:** `~/Projects/oneshot` is a fresh clone of the rewritten history, on `main`, matching GitHub
  (last commit `4c29f7b`). `.git` is ~10 MB (was 3.5 GB). GitHub has only `main`.
- **Old checkout** kept at `~/Projects/oneshot-old-2026-10-02` (not deleted; Shahar may delete it).
  Superset worktree `~/.superset/worktrees/oneshot/assorted-dancer-e1a61271` is orphaned (its git
  dir was in the old repo) — start sessions from `~/Projects/oneshot`.
- **Backup** of the full pre-rewrite history: `~/.oneshot/backup/oneshot-2026-10-02.git` (also holds
  the old stash as `refs/stash-backup/brassy-waitress-handoff-2026-09-24`; patch copy beside it).
- **Verified in the new clone:** all 11 businesses' media present and hash-matching (1,208 files,
  `node tools/media.mjs status`); the Global Surf picked mockup (home + book) loads with 0 missing
  local files; pre-commit hook refuses a force-added image; dashboard server runs and shows
  last-worked/media; `tools/team.mjs whoami` → shahar.
- **Untested:** anything on Alon's machine (needs his clone + git email in `team.json`); restore of
  stock photos from Wikimedia (too slow: rate limits; one KA stock file differs after download).
- **Global Surf (run 2026-09-globalsurf-02)** unchanged by this session: ledger state `picked`.
  See `notes/global-surf-adventures.md`.

## Active Files
- `team.json` — operators + how a session identifies itself.
- `tools/team.mjs` — whoami / log / assign / done / status → `activity.jsonl` (not created yet; first log creates it).
- `tools/media.mjs` — save / status / restore / pack / forget; manifests in `media/<slug>.tsv`; store `~/.oneshot/assets/tree/`.
- `tools/clean-shots.mjs` — deletes review screenshots, keeps each shots/ folder's newest sheets.
- `tools/hooks/pre-commit` — blocks staged media; refreshes manifests; blocks new media with no recipe (`ONESHOT_ALLOW_LOCAL=1` overrides).
- `tools/setup.sh` — new clone: hook on, link media folders, restore media.
- `tools/shoot.mjs` — reuses a shoot when the build is unchanged (`--force` to reshoot).
- `tools/link-assets.sh`, `tools/restore-assets.py` — fixed (exit status; dead image URLs).
- `dashboard/data.mjs`, `dashboard/server.mjs`, `dashboard/mockups/soft-cards/src/index.html` — Team card, Last worked + History per business, operator on gate lines.
- `docs/team.md` (new), `docs/ledger.md` (`operator` field), `dashboard/DATA.md`, `PLAN.md`, `CLAUDE.md` (rules 5–6).
- `agents/{designer,critic,visual-critic,orchestrator}/base.md` + CHANGELOGs; `run.yaml` pins bumped (designer 0.4.2, critic 0.4.1, visual-critic 0.1.1, orchestrator 0.3.2).
- `notes/README.md`, `notes/global-surf-adventures.md` — per-business handoff.

## Changes Made This Session
1. Dream review 2026-10-02: two findings applied (replies/meetings KPIs from history; literal data splice) → `821c62e`.
2. Two-operator design (Shahar's decisions, 2026-10-02): either operator may pass any gate; Alon uses
   Claude Code; no media hosted online; git as lean as possible; screenshots deleted after every scoring.
3. Deleted 12,860 review screenshots (4.1 GB): they had no use — scorecards are the text record. Cause:
   agent prompts said to keep every round's shots and each step was committed.
4. All images/video git-ignored and untracked; copied to the local store; `media/<slug>.tsv` lists
   path, sha256, size, source (`dossier` / `stock` / `video` / `recipe:<script>` / `local`).
5. Agents: one shared, throwaway shot set per page; cleanup after each scored round; every new
   mockup media file must come from a script with a `# media: <glob>` header.
6. Dashboard + team tooling (see Active Files).
7. History rewritten with git-filter-repo (all image/video paths removed), verified (HEAD tree
   identical, fsck clean), force-pushed with lease after confirming GitHub matched the backup.
   Shahar approved this force push and the deletion of branches `add-claude-github-actions-…`,
   `resume-session`, `session-on` (all already contained in main) — 2026-10-02, history only.
8. Re-cloned, ran setup, rescued 7 businesses' dossier photos that lived only in the old checkout
   (bappa had none) → `4c29f7b`, pushed with Shahar's OK.

## Failed Attempts
- Dossier images of Layday/Lavish/KA/older businesses cannot be re-downloaded: `dossier.json`
  recorded the page each was found on, not the image URL. Now classed `local` (zip only).
- Stock restore from Wikimedia: HTTP 429 rate limits; backoff added, still >20 min for KA and
  stock-009 differs after download (re-saved after fetch). Effectively `local`.
- 789 existing files (mostly Global Surf mockup `dist/img/`) have no recipe — the build scripts
  reference images but don't produce them. Alon gets them via `node tools/media.mjs pack <slug>`
  only when he needs them (Shahar: the zip is on demand, not up front).
- The session-off skill could not run from the orphaned worktree (no git dir); handoff written by hand.
- Mobile dashboard overflows horizontally (~820 px) — pre-existing (header controls), not fixed.

## Next Step
1. Open the next session in `~/Projects/oneshot` (not the Superset worktree).
2. Ask Shahar whether to reclassify `stock` as `local` in `tools/media.mjs` `sourceOf()` (asked,
   not answered).
3. When Alon starts: he clones, `npm ci && tools/setup.sh`, adds his git email to `team.json`,
   `node tools/team.mjs whoami`. Send him zips only for files he needs.
4. Still open from the 2026-09-30 handoff (git history `handoff.md` at `4c29f7b~`): Shahar's approval
   of the Dancing Script titles and #1's palette on the Global Surf composite (not recorded in the
   ledger — re-ask); then the three reviewers on the composite; then station 4g; cost-cutting proposal.
5. Optional: a dashboard form to add assignments (today: `tools/team.mjs assign` only).
