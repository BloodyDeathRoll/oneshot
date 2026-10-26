# Live strip: who is running what, right now

Decided 2026-10-26 (Shahar). Everything the dashboard knew came from git, so a run on the other
operator's machine was invisible until a PR merged, and a business appeared only once it had a ledger
line. The Live strip bypasses git: each session reports what it is doing to the dashboard box, and
both dashboards show it.

```
Claude Code hook ──▶ tools/heartbeat.mjs ──POST /status (bearer key)──▶ dashboard box ──▶ Live strip
(SessionStart, Agent start/end, any tool call ≤ 1/min, Stop, SessionEnd)   dashboard-state/live.json   (online + both laptops)
```

## What is sent

One small JSON line per event, from `.claude/settings.json` hooks (project-wide, so every session in
this repo sends them; nothing to remember):

| Hook | kind | Carries |
|---|---|---|
| `SessionStart` | `session` | the run this machine resolves (`node tools/run.mjs`) and whether its file is on `origin/main` yet (a run that exists only locally shows as *pending PR*) |
| `PreToolUse` on `Agent` | `station_start` | agent, station and version parsed from the runtime prompt header (`# RUNTIME PROMPT — agent: scout (station 2)`, `version: 0.3.2`), the business slug if the prompt names one |
| `PostToolUse` on `Agent` | `station_end` | the same, plus the first 300 characters of the agent's report (a critic score, a candidate count) |
| `PreToolUse` on anything else | `alive` | at most once a minute (a timestamp file throttles it) |
| `Stop` | `idle` | the session is waiting for the human |
| `SessionEnd` | `session_end` | |

Always: `operator` (team.json), `run_id`, `branch`, `host`, `session`, `ts`. Never: prompts, file
contents, tokens, anything from a client. Nothing is written to git.

## Where it lands

`dashboard/server.mjs` on the box accepts `POST /status` with `Authorization: Bearer <ONESHOT_BOX_KEY>`
and no Cloudflare Access login (machines cannot do the e-mail code). The key lives in
`/etc/oneshot/dashboard.env` on the box and in each operator's `~/.oneshot/box.json`:

```json
{ "url": "https://dash.130-61-212-182.sslip.io", "key": "<ONESHOT_BOX_KEY>" }
```

The server keeps the current line per operator and the last 24 hours of events in
`dashboard-state/live.json` (outside the repo), pushes a Server-Sent Event, and includes the picture
in `data.json` as `live`. A laptop's local dashboard with `~/.oneshot/box.json` pulls the box's
picture every 30 seconds (`GET /live`, same key), so the strip is the same everywhere.

## What it shows

The Live strip at the top of the Overview, one line per operator:

- **running**: `Alon · midigama-01 · Scout 0.3.2 · running 14 min` — a station is in progress;
- **active**: tool calls in the last 10 minutes, no station running;
- **idle since 11:25**: the session stopped and waits for the human;
- **stale**: no heartbeat for 10 minutes, probably stopped (grey);
- **offline**: the session ended.

Under it, the last station reports ("Scout returned: 67 candidates …"), newest first. A run that is
only on the sender's disk is marked *pending PR*.

## Setup

- **Box**: `ONESHOT_BOX_KEY=<random 32+ chars>` in `/etc/oneshot/dashboard.env`, then
  `sudo systemctl restart oneshot-dashboard`. The key is generated once; `infra/dashboard/README.md`.
- **Each laptop**: `~/.oneshot/box.json` as above (Shahar passes the key to Alon once, like the
  Cloudflare token). `node tools/heartbeat.mjs --test` sends one `alive` and prints the reply.
- Without `box.json` the hooks exit silently; without the key the box refuses with 401.

## Limits

- A heartbeat is fire-and-forget with a 4-second timeout; a slow network delays a tool call by that
  much at most, once a minute.
- The strip says what the hooks saw. A session killed with the terminal sends no `session_end`; it
  turns stale after 10 minutes.
- The station is parsed from the prompt header `tools/prompt.mjs` writes. An agent launched some other
  way shows as a station with no name.
