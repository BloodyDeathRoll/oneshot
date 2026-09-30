# Session Handoff — 2026-09-30

## Goal
Take Global Surf Adventures (globalsurf.com; site = their Kabalana lodge, `surf_camp`) through the
pipeline to a website visibly better than their current one, with video-led design and our own
booking pages handing off to their Bookinglayer engine. Next: Shahar's approval of the picked
composite mockup, then the real Astro build (4g) and the full review/check process.

## Current State
- **Run `2026-09-globalsurf-02`** (run.yaml). Ledger state: `picked` (a COMPOSITE, see below).
  Run `2026-09-globalsurf-01` was voided by Shahar (files deleted, ledger lines kept + `void` line).
- **Picked composite mockup:** `sites/global-surf-adventures/mockups/picked/dist/` (home) and
  `.../picked/dist/book/` (standalone booking, one step per screen). Served locally at
  http://127.0.0.1:8971/picked/dist/ (a `python3 -m http.server 8971` from
  `sites/global-surf-adventures/mockups/`; may not survive the session — restart it).
- **Title font:** last quick swap to **Dancing Script** (600) + Lora, done by sed on `dist/` only.
  `picked/src/` build scripts still reference Give You Glory → a rebuild would revert it. Shahar has
  NOT approved Dancing Script yet (he rejected Caveat and Give You Glory).
- **Three source mockups** (`mockups/the-sign`, `try-your-week`, `postcard`) passed all three
  reviewers. On 2026-09-30 Shahar said of them: "This is how you design a website! I don't want to
  see anything less for any target!" They are now designer gold (`agents/designer/gold/global-surf-notes.md`).
- **The composite has NOT been reviewed by the critics** — orchestrator-checked only.
- Untested anywhere: real phones, Safari, axe. Fonts still from Google (must self-host at 4g).
  Rosa headline fixed/stale in mockups (must be live at 4g). Owner must confirm room↔photo mapping.
- **Cost:** run 02 = 28.9M+ agent tokens (`node tools/usage.mjs 2026-09-globalsurf-02`), ~14× the 2M
  budget; resumed agents inflate the count. A cost-cutting proposal is owed.
- All work committed and pushed to `main` (and `resume-session`), last commit `1c46305`.

## Active Files
- `playbook.md` 0.6.3 — §0 quality bar, §1a video first, engine-data rule (§4), hero loop 6–20 s, the Global Surf standard.
- `rubric.md` 0.3.0 — dimension 8 visual quality (25) scored by the two visual critics; hard fails.
- `agents/visual-critic/`, `agents/experience-critic/` — new independent reviewers (0.1.0).
- `agents/{designer,visual-critic,experience-critic,creative-director}/references.md` — "Calibration: Shahar's verdict…" (his hard rules).
- `agents/designer/gold/global-surf-notes.md` + `shots/global-surf/` — the approved bar.
- `agents/orchestrator/base.md` 0.3.1 — three reviewers at 4f; loop until all three pass; ask Shahar after round 5.
- `agents/creative-director` 0.3.0, `designer` 0.4.1, `critic` 0.4.0, `harvester` 0.4.0, `auditor` 0.1.2, `deployer` 0.3.0.
- `tools/funnel.mjs`, `tools/fetch-video.mjs`, `tools/usage.mjs`, `docs/usage.md`, `usage.jsonl` — funnel probe, video harvest, cost tracking.
- `docs/bookinglayer.md` — public CORS API + documented deep links (`?start&end&female&male&couple`, never `duration`).
- `schemas/audit.md`, `schemas/site-content.md` v0.9 (heroVideo/videos[]), `schemas/dossier.md` (videos[]).
- `cms/` — video migrations (both profiles), publisher video renditions; `deploy/managed/` seed-export.
- `dossier/global-surf-adventures/` — dossier (rooms_engine, room_photo_groups, videos[]), audit, assets (git-ignored).
- `sites/global-surf-adventures/copy/en.json` — passed copy incl. `mockup_extras` (short hero, CTAs, rooms, booking microcopy).
- `proposals/2026-09-ahangama-02/007-funnel-audit.md` (applied), `006` Laya pilot (run, B/C/D failed), `proposals/2026-09-globalsurf-02/001,002` custom.md proposals (not applied; Shahar edits custom.md himself).

## Changes Made This Session
1. Proposal 007 (funnel audit): auditor agent, station 3b, `tools/funnel.mjs`; applied on Shahar's "start building".
2. Laya installed (`~/Projects/laya`); pilot: A marginal pass, B/C/D fail → not wired. Jev not tried (Shahar: scratch).
3. Cloudflare token copied from the VPS to `~/.oneshot/cf-token` (Shahar: "copy it"); proposal Workers deploy with it.
4. Global Surf run 01 → mockups rejected as far worse than the old site → **voided**, files deleted.
5. Overhaul (Shahar's orders): video first + `fetch-video`, full-bleed preferred, two visual critics, quality bar, CMS/seed video support.
6. Run 02: harvest with video, audit, copy, concepts, 3 mockups × 5 rounds → reviewers passed → Shahar: "still far off" + detailed calibration → our own booking pages (decision: own pages, hand off to Bookinglayer; his feedback overrides designer custom.md).
7. New concepts + fresh designers → The sign / Try your week / Postcard, 5 review rounds → approved as the bar.
8. Shahar picked a composite (#1 the-sign, #2 try-your-week, #3 postcard), verbatim in the ledger: hero #1 + #3's beginner stand-up scene; #3 fonts with script replaced; sections in his order; footer #1; booking = #1 design, standalone, one step per screen, rooms step with #2's Dorm/Twin/Deluxe selector + "Choose this room". Orchestrator assumption: #1's palette (told to Shahar, not confirmed).
9. Script font: Caveat → Give You Glory (both rejected) → Dancing Script (pending).

## Failed Attempts
- Rule-compliant design ≠ good design: run 01 and run 02's first rounds passed critics at 8/10 and Shahar rejected them. Critics became useful only after his written calibration.
- My own "avoid the full-bleed hero" rule (creative-director) caused type-only pages — removed.
- Hero clip mistakes: 7-shot montage with no surf; overcast surf; ping-pong loop with motion-interpolated frames (synthesised — not allowed); retimed `setpts` clips; clips shared across variants; 0.5 s crossfade reads as double exposure in stills. Use real-speed, one-direction, distinct clips per variant.
- Designers repeatedly moved hero titles off-centre to dodge subjects; Shahar's rule is centred horizontally AND vertically.
- Variants converged (same font/closing photo) when fixed in parallel — check siblings before shipping.
- JS-off hand-offs sent `duration` (counts days) — use `start`+`end`.
- `pkill` inside `&&` chains aborts the chain (exit 144) — put it last or `; true`.
- Long compound Bash commands produce unreadable permission prompts for Shahar — keep commands short and describe them first.
- Resuming agents for small fixes costs ~400–600k tokens each (context reread); cost ballooned.

## Next Step
1. Ask Shahar whether the Dancing Script titles (http://127.0.0.1:8971/picked/dist/) are approved, and whether #1's palette is right. Do not assume either.
2. On approval: port the font change into `sites/global-surf-adventures/mockups/picked/src/` so a rebuild keeps it, then run the three reviewers on the composite (home + booking), then station 4g (Astro build per designer 4g + `schemas/site-content.md` v0.9; self-host fonts; live Rosa; record vid-010c/-p45/vid-002g/-002w/-010g/-010s/composite hero cut in `dossier.videos[]`).
3. Write the cost-cutting proposal (fresh agents over resumed ones for small fixes; hero-clip and centring rules in round 1; one visual check before three-reviewer rounds).
4. Still open for Shahar: daily rebuild for price snapshots; `bookings.globalsurf.com` engine domain; Freestylers "ask us"; custom.md proposal 002; three parked Ahangama pitches.
