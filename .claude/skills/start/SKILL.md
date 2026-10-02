---
name: start
description: Start a Oneshot session — pull the latest main and show team status (open assignments, who worked last). Use at the start of every session, or when the user says start, sync, or "what's going on".
---

# Start a Oneshot session

Read-only except for the pull. Do not start any work.

1. Sync with GitHub `main` (`docs/team.md`, "Git"):
   - `git fetch origin`
   - On `main`: `git pull --ff-only`. If it refuses (local commits or changes), stop and report — never reset, stash or force.
   - On another branch: report how far it is behind `origin/main` (`git rev-list --count HEAD..origin/main`). Don't rebase unless asked.
2. `git status --short` — report uncommitted changes.
3. `node tools/team.mjs whoami` — who this session works for. If it fails, say so (git email missing in `team.json`).
4. `node tools/team.mjs status` — open assignments and last work per operator.
5. Report in a few lines: branch + commit, pulled or behind by N, uncommitted files, operator, open assignments. Then wait.
