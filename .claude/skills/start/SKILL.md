---
name: start
description: Start a Oneshot session — pull the latest main and show team status (open assignments, who worked last). Runs automatically when a session starts or after /clear (SessionStart hook); use it by hand when the user says start, sync, or "what's going on".
---

# Start a Oneshot session

1. Run `tools/session-start.sh` (the same script the SessionStart hook in `.claude/settings.json` runs). It:
   - fetches `origin` (a failed fetch is reported, the rest still runs);
   - on `main`: fast-forwards only — never resets, stashes or forces; if it can't, it reports ahead/behind;
   - on a branch or detached HEAD: reports how far behind `origin/main` it is (no rebase);
   - prints uncommitted files, `tools/team.mjs whoami` and `tools/team.mjs status`.
2. Report its output in a few lines. If `main` was not pulled or `whoami` failed, say so plainly. Then wait — start no work.
