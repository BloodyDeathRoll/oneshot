# Session Handoff — 2026-09-20

## Goal
Re-run the design station on run `2026-09-ahangama-02` after the previous session's nine mockups
were rejected, get a human pick, and make the pipeline hold its own rules instead of relying on
memory.

## Current State

**Shahar's last words on the mockups: "These all look cheap."** That applies to the current KA
round-2 set and, by implication, to the visual quality overall. It is the open problem. Nothing has
been done about it — the session was closed immediately after.

Ledger states (run `2026-09-ahangama-02`, `mode: test`):

| business | state | note |
|---|---|---|
| `the-lavish-haven` | `picked` → **interactive** | "Clean, good visual to textual ratio… good enough for now" |
| `layday-surf-ahangama` | `picked` → **interactive** | "…more movement/microanimation… good color separation, bad color tones" |
| `ka-surf-hostel-and-restaurant` | `mocked` (round 2, chart archetype) | round 1 rejected whole; round 2 not yet judged beyond "cheap" |

All nine mockups build, pass `check-design`, `check-places` and the audit: 0 third-party requests on
first load, 0 broken images, booking targets diff identical to the dossier, JS-off path verified,
Esc closes drawers and returns focus. Every budget line is inside playbook §4.

**Nothing has been pushed to GitHub.** 14 local commits on `main`, working tree clean.

Station 4g (Build) has never run for anyone. It needs Payload tenant wiring that this run has not
done.

## Active Files

- `agents/creative-director/` — **new agent**, station 4d. Picks one page archetype per business and
  writes three concepts before any markup; ends with a divergence table across the run.
- `agents/wiring.json` + `tools/prompt.mjs` + `tools/check-wiring.mjs` — runtime prompts are now
  assembled from disk and checked. 13 agents, 0 failures.
- `tools/build-mockup.mjs` — per-site builder. Refuses a photo marked `role:"bleed"` under 1200 px;
  handles EXIF and explicit `rotate`; loads both image sources and keeps them apart.
- `tools/check-design.mjs` — fails on dark grounds, padded picture boxes, captions under photographs.
- `tools/check-places.mjs` — fails on a borrowed photo that is not the business's locality or
  place-neutral, uncredited, or share-alike used as shader input.
- `tools/audit-mockup.mjs` — the evidence `rubric.md` demands: throttled first-load network log, LCP,
  CLS, booking tap-through, JS-off, keyboard, alt, tap targets → `audit.json` per mockup.
- `tools/fetch-atmosphere.mjs` — Wikimedia Commons, CC0/PD/CC BY freely; CC BY-SA marked
  `modify:false`.
- `sites/<slug>/concepts.md` × 3 — the 4d output: archetypes are *courtyard* (Lavish), *chart* (KA),
  *printed spec card* (Layday).
- `sites/<slug>/mockups/{calm,interactive,unique}/` — nine projects, each its own Astro build.
- `reports/2026-09-ahangama-02/<slug>.md` — 4f pre-scores.
- `PLAN.md`, `rubric.md`, `playbook.md`, `run.yaml`, `docs/ledger.md` — pipeline renumbered
  4d Concept → 4i AI SEO; new state `concepted`; image policy amended; Lighthouse removed.
- `dossier/ka-surf-hostel-and-restaurant/stock/` — 11 licensed atmosphere images + `index.json`.

## Changes Made This Session

1. **Wired every agent's prompt from disk.** The previous rejection was partly caused by
   `agents/designer/references.md` never being opened. Runtime prompts are now assembled by
   `tools/prompt.mjs` from `agents/wiring.json`; `check-wiring.mjs` fails on drift. It found that
   every `base.md` was silently dropping `tools.md`, `evals.md`, `run.yaml` and the schemas, and that
   seven files carried stale station numbers.
2. **Deleted `templates/` and the nine old mockups** (Shahar approved). One Astro template per site.
3. **Rebuilt all nine mockups**, then rebuilt them again after each round of feedback.
4. **Added the creative-director agent and station 4d** after Shahar: *"they look like they were
   created using the same cookie cutter."* The cause was structural — one playbook + one schema
   reaches the same page every time — so the archetype decision was moved out of the designer's hands.
5. **Rosa widget** (`rosa.surf/widget/?spot=kabalana`) embedded in "The wave" on all nine. It breaks
   playbook §4's "0 third-party requests"; mitigated with `loading="lazy"` + sandbox and declared as
   a conflict in every `notes.md`.
6. **Image policy amended** (PLAN §9) to allow freely-licensed *atmosphere* photography, then
   tightened the same day after the place error below.
7. **Dropped Lighthouse** from the project at Shahar's instruction; performance is measured by
   `audit-mockup.mjs`.
8. **Pre-scored all nine** at station 4f with real measured evidence, and recorded that the numbers
   do not separate variants of one business and should not.

## Failed Attempts

- **Three shared `templates/{calm,interactive,unique}/`** — violated one-template-per-site. Deleted.
- **The same page skeleton for three businesses** — full-bleed hero + docked strip + eyebrow/heading/
  two-column + photo grid + quotes. Rejected as a cookie cutter. Do not return to it.
- **KA's "kitchen noticeboard" archetype** (round 1) — rejected whole: the idea itself, too
  text-heavy, "dated / cheap". Pinned cards, tilts, paper mats and drop shadows read as ~2012.
- **A 576 px photograph as a full-bleed hero** (KA `img-002`) — "fit for the garbage bin". The build
  now refuses it.
- **Dark grounds** — done twice. Every surf business gets a light theme. Now measured.
- **Mixed aspect ratios in equal-height grid cells** — leaves half a card empty under each portrait.
  Crop to one ratio or use real masonry. Now measured.
- **Captions under photographs** — reintroduced once after being told to drop them. Now measured.
- **Orange CTAs** — "cheap and outdated" on warm cream. Greens, blues, teals, yellows only.
- **Trusting Commons filenames** — 24 of 34 fetched images were rejected on sight: a candlelight
  vigil filed under "Kabalana", a five-star hotel's suite/rooftop/pool, nine Handunugoda tea-factory
  interiors filed under "Ahangama".
- **Photographs of the wrong place** — Hikkaduwa (33 km), Weligama, Thiranagama, Negombo (180 km) and
  a *Weligama Bay* chart plan were shipped on an Ahangama page. Shahar: *"You should have caught that
  by yourself."* Now enforced by `check-places.mjs`.
- **A pre-score that scored all nine 98/100** — useless. Regraded dimension 2 on measured headroom.

## Next Step

1. **Ask Shahar what "cheap" means concretely**, per business or in general, before building
   anything. Three rounds have now been spent guessing at visual quality and each guess cost a full
   rebuild. Candidate axes to put to him: type scale and pairing, spacing and density, photographic
   treatment, colour tone (he already said Layday's separation is right and its *tones* are wrong),
   or whether the small/low-res source photography is the real ceiling.
2. Only after that: act on the two picked mockups —
   `sites/layday-surf-ahangama/mockups/interactive/` (more movement/microanimation, fix colour tones)
   and `sites/the-lavish-haven/mockups/interactive/` (find the small issues).
3. Re-ask about pushing to GitHub — 14 commits are unpushed and no approval to push was ever given.
4. Still open from earlier sessions: the unapproved `proposals/2026-09-mirissa-01/001-designer-custom-calm-variant.md`;
   whether Surf Front and Boardwalk re-qualify; KA's unresolved parking and check-in contradictions;
   the "Shahar, Israel" Booking review on Lavish Haven.

Useful commands: `node tools/serve-mockups.mjs` (ports 8901–8909),
`node tools/build-mockup.mjs <slug> <variant>`, `node tools/shoot-mockups.mjs`,
`node tools/check-design.mjs`, `node tools/check-places.mjs`, `node tools/audit-mockup.mjs --all`,
`node tools/check-wiring.mjs`.
