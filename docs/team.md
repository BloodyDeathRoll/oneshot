# Two operators

Decided 2026-10-02. Oneshot is run by two people, Shahar and Alon, from their own machines and
their own Claude Code sessions, on one git repo. Either of them can take a business at any station,
and either can pass any human gate. What one did, the other must be able to see and continue
without redoing it. Git stays small: text only.

## Who is who

`team.json` lists the operators. A session finds its operator with `node tools/team.mjs whoami`:
the `ONESHOT_OPERATOR` env var, else the git `user.email`, else the git `user.name`. A new operator
adds their git email to `team.json` once.

## What is recorded, where

| What | Where | Who writes it |
|---|---|---|
| A business changes state (the pipeline, the gates) | `ledger.jsonl`, with `operator` on every line (`docs/ledger.md`) | the session that made the change |
| Work between states — a font swap, a hero rework, a re-cut clip, a fix after a critic round | `activity.jsonl`, `kind: "work"` | `node tools/team.mjs log <slug> "<what changed>" [--files a,b]` |
| An assignment — "Alon: tune the picked mockup's booking steps" | `activity.jsonl`, `kind: "assign"`, closed by `kind: "done"` | `tools/team.mjs assign <slug> "<task>" [--to alon]` / `done <id>` |
| Where a business stands, for the next person | `notes/<slug>.md` | the session, before it ends |
| The code, copy, mockup HTML, scripts | git commits (author = operator) | as always |
| Images and video | the operator's disk + local store; `media/<slug>.tsv` lists them | `tools/media.mjs` (the pre-commit hook runs it) |

The dashboard joins all of these per business: who worked on it last and when, the open
assignments and their owner, one timeline (ledger + activity + commits), and whether its media is
complete on this machine.

### `activity.jsonl`

Append-only, like the ledger. One JSON object per line.

| Field | Description |
|---|---|
| `ts` | UTC, ISO 8601 |
| `operator` | id from `team.json` |
| `slug` | business slug, or `-` for project-wide work |
| `kind` | `work` · `assign` · `done` |
| `note` | `work`: what changed, in one sentence a colleague can act on. `done`: how it ended |
| `files` | optional, `work` only: the main files touched |
| `id` | `assign` and `done`: the assignment id (`tools/team.mjs` makes it) |
| `to`, `task` | `assign` only: who it is for, what to do |

An assignment is open until a `done` line carries its id. Claim work before starting it
(`assign` to yourself) so the other operator sees it on the dashboard and does not start the same
thing.

### `notes/<slug>.md`

One page per business, rewritten (not appended) at the end of a session that touched it: current
state, what was just done and why, what is open, decisions the human made that are not in the
ledger, and anything the next person must not undo. Short. `handoff.md` stays the session-level
handoff; this is the business-level one.

## Git: branches and pull requests, never straight to `main`

- Nobody pushes to `main`. Every piece of work goes on its own branch (`<operator>/<slug>-<what>`,
  e.g. `alon/globalsurf-4g`; `<operator>/<topic>` for repo-wide work) and reaches `main` through a pull request.
- Start from a fresh `main`: `git switch main && git pull --rebase && git switch -c <branch>`.
  Commit small, push the branch, open the PR (`gh pr create`). Keep PRs short-lived: one step or
  one business station each, merged the same day where possible.
- Before merging: `git pull --rebase origin main` on the branch (or GitHub's "Update branch"),
  check the PR touches nothing the other operator has open (`node tools/team.mjs status`).
  Only a human merges.
- `ledger.jsonl`, `usage.jsonl` and `activity.jsonl` merge with `merge=union` (`.gitattributes`):
  when both of you appended, git keeps both sides' lines. Order inside the file may then interleave;
  readers sort by `ts` where order matters.
- Before passing a gate, pull `main`: the other operator may already have passed it.
  `dashboard/server.mjs` refuses a decision on a business whose state changed since the page loaded.

## Media: on disk, never in git

Images and video are git-ignored (`.gitignore`), all of them, everywhere. SVG is markup and stays
tracked. Each operator's media lives in the checkout and in a local store,
`~/.oneshot/assets/` (`ONESHOT_ASSETS` overrides), so removing a worktree loses nothing.

`media/<slug>.tsv` (in git) lists every media file of a business: path, sha256, size, and its
source — how the other operator gets it without asking:

| Source | How it comes back |
|---|---|
| `dossier` | `tools/restore-assets.py` re-downloads the business's images from `dossier.json` and checks the hash |
| `stock` | re-downloaded from Wikimedia Commons (`stock/index.json`) |
| `video` | `tools/fetch-video.mjs` with the source URL in `dossier.videos[]` (restore prints them) |
| `recipe:<script>` | the committed script that made it; its header declares it with `# media: <glob>` |
| `local` | nothing in git can make it. Only the operator who has it: `tools/media.mjs pack <slug>` → a zip, sent by hand |

`node tools/media.mjs restore <slug>` tries the store, then every recipe, then reports what is
still missing and why. The pre-commit hook (`tools/hooks/pre-commit`) refuses a staged image or
video, refreshes the manifests, and refuses new `local` media unless `ONESHOT_ALLOW_LOCAL=1` — the
rule is that every new file has a recipe, so no one has to ask. The files made before 2026-10-02
(mockup `dist/img/`, pitch images, `dashboard/ref/`) are `local`: ask for the zip once.

### Screenshots are scratch

An agent looks at a page through screenshots; the scorecard, in words, is the record. One shared
set per page (`<page>/shots/`), reused by `tools/shoot.mjs` while the build is unchanged, read by
the designer and all three critics, and deleted after the round is scored
(`node tools/clean-shots.mjs`), which keeps only each folder's newest contact sheets for the gate and
the dashboard. Screenshots are never in the manifest and never restored. Exception:
`agents/designer/gold/shots/`, the visual bar, which is kept and listed.

## A new clone

```bash
git clone https://github.com/BloodyDeathRoll/oneshot.git && cd oneshot
npm ci
tools/setup.sh          # hook on, media folders linked, media restored, operator checked
```
