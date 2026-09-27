# 001 — Control layer, step 1: answer the human gates from the dashboard

Filed 2026-09-27 on Shahar's instruction at the dashboard-01 pick gate ("Is this layout supposed
to also let us start a pipeline and follow the progress of the agents, as well as leave feedback
(select the mockup, guide the decisions) like we did in the session CLI?" → "yes", write it up).
This is a proposal for PLAN.md and CLAUDE.md, not a diff to an agent prompt. Nothing is built.

## What it changes, in one sentence

The dashboard gains a small local server so that the four human gates — approve the shortlist,
pick a mockup, send the pitch, merge a prompt diff — can be answered from the page (phone
included), and the orchestrator reads those answers from the ledger instead of waiting for Shahar
to type them in the CLI. The agents still run exactly as today.

## Why step 1 and not the whole thing

PLAN.md §4 says "the orchestrator … stops at human gates, never runs past a gate unattended" and
Phase 3 made the gates CLI prompts. CLAUDE.md fixes "disk is the memory — no daemon, no DB". A
dashboard that *starts* runs and *streams* agents needs a server that owns Claude sessions,
authentication, cost controls and the gate rule enforced server-side: it rewrites §1 and §4 and is
weeks of work. Step 1 keeps every one of those rules — the ledger stays the only state, the
orchestrator stays a CLI session — and delivers the part Shahar named: act on gates without the
terminal. Step 2 (start and watch runs) is sketched at the end and is a separate proposal.

## Design

### Components

| Piece | What it is | Writes |
|---|---|---|
| `dashboard/server.mjs` | one Node process on the operator's machine (or the CMS VPS behind Caddy + basic auth), no dependencies beyond Node ≥ 22 | `ledger.jsonl` (append only), `dashboard/data.json` |
| watcher | `fs.watch` on `ledger.jsonl`, `run.yaml`, `sites/*/deploy.json`, `proposals/`; on change, re-runs `buildData()` and pushes `data.json` over Server-Sent Events | `data.json` |
| decision endpoint | `POST /decide` with `{gate, slug, run_id, choice, reason}`; validates against the current ledger state, appends exactly one `agent: "human"` line, returns it | one ledger line per decision |
| the page | the picked "Soft cards" build, unchanged in look; the "Needs you" rows and the Sites / Decisions views gain forms in place of the "Open" buttons; no change when the server is absent (the forms read "open the CLI to decide") | nothing |

### The four gates as forms

| Gate (PLAN §4) | From → to | Form | Ledger line it appends |
|---|---|---|---|
| a. Shortlist | `shortlisted → approved` per business | the shortlist as check rows with the scout's presence note; approve / drop, one reason per drop, one "approve N" button | one line per business: `approved` with `note: "gate a: approved by Shahar via dashboard"` or stays `shortlisted` with the drop reason (today's convention: `dropped by Shahar: …`) |
| b. Mockup pick | `mocked → picked` | the three variant sheets side by side (from `sites/<slug>/mockups/*/shots/`), a radio per variant, a required reason, optional per-variant notes | `picked` with `note: "Shahar picks <VARIANT>. Verbatim: \"…\""` — same shape as every pick line in the ledger today |
| c. Send pitch | `packaged → pitched` | the pitch drafts (`sites/<slug>/pitch/`) shown read-only, channel radio (WhatsApp / in person / email), "I sent it" + date; later outcome buttons reply / meeting / sale / ignored | `pitched` with `note: "sent by Shahar via <channel>, <date>"`; then `outcome:*` lines. This is also where the pitch channel finally gets recorded (a field the ledger lacks today) |
| d. Prompt diffs | proposal → merged | each `proposals/<run>/*.md` rendered, with approve / reject / edit-in-CLI; approve appends the line and leaves the merge itself to the CLI session (bumping versions and CHANGELOGs stays a code change under review) | a new ledger shape: `slug: "-"`, `to_state: "proposal:approved"` or `proposal:rejected`, `note: "<file>: <reason>"` — needs one row in docs/ledger.md |

Every form requires a reason; the reason is the note, verbatim, as the ledger already does for
Shahar's decisions. No form can write any state other than these; the server rejects anything
else, and rejects a decision whose `from_state` no longer matches the ledger (stale page).

### How the orchestrator picks decisions up

Nothing new to build in the orchestrator: CLAUDE.md's resume procedure already says "read
`ledger.jsonl` … for each slug the last line's `to_state` is the current state" and "do not infer
approval from files on disk". A decision appended by the server is a ledger line by `human`, so a
session that resumes (or an orchestrator that polls the ledger while parked at a gate) sees
`approved` / `picked` / `pitched` and continues. The one addition: the orchestrator's base.md gets
a line saying that while parked at a gate it re-reads the ledger every N seconds instead of only
prompting in the terminal — a proposal for `agents/orchestrator/base.md`, filed with this one when
approved.

### Security and access

- Local by default: `127.0.0.1:8970`, opened in the browser; nothing listens on the network.
- Remote (Shahar's phone): run it on the CMS VPS behind the existing Caddy with basic auth and
  the same login rate limit the CMS uses; the repo checkout on the VPS is a read-write clone that
  pushes the ledger commit after each decision (so the ledger's single source of truth stays git,
  as today). Or, simpler, a Cloudflare Tunnel to the operator machine. Decide at build time.
- The server holds no Claude credentials and runs no agent. It can only append the six line shapes
  above.

### Out of scope for step 1

Starting a run, choosing a `run.yaml`, watching an agent's live output, stopping an agent, editing
prompts, any write to `sites/`, `dossier/`, `agents/`. Those are step 2.

## Cost

- Build: about two to three days — server (~300 lines), the four forms in the picked design
  (designer, one look loop), the docs/ledger.md row, the orchestrator polling line, a critic pass
  on the forms (keyboard, contrast, the "stale page" path).
- Run: zero. One Node process; no database; the VPS already exists.
- Risk: a form that writes the wrong line. Mitigated by the server validating `from_state` and by
  append-only — a wrong decision is corrected by another human line, as today.

## Step 2, sketched only (separate proposal if wanted)

"Start and watch runs" = the dashboard launches the orchestrator for a `run.yaml` and shows each
station as it happens. Options: (a) the server spawns `claude -p` with the orchestrator prompt
and tails its ledger writes — smallest, but the session runs on whichever machine hosts the
server, with its Claude login; (b) Claude Agent SDK in the server process — same, with
programmatic control (stop, budget); (c) Managed Agents — Anthropic hosts the session, the
server only sends `run.yaml` and receives events; cleanest remotely, changes where the repo lives
during a run. All three make the server own Claude credentials and cost, and all three need the
gate rule enforced in the server, not in a prompt. This is the change to PLAN.md §1 that step 1
avoids.

## Decision needed

Approve step 1 as scoped (four gates, ledger-only writes, local first, VPS/tunnel second)? If
yes: it starts after the dashboard-01 build passes its final critic round, as run `dashboard-02`.
