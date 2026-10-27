# 002 — creative-director base.md: beat the best page we already have, not only the current site

**Suggested tweak** to `agents/creative-director/base.md` (0.6.0 → 0.6.1). No `custom.md` is touched. Nothing here is applied until Shahar approves it.
**Run:** 2026-10-lk-surf-01 · **Raised:** 2026-10-27

## What happened

Dashboard figure (all runs, from `ledger.jsonl`): 11 of 19 mockup decisions ended without a pick; since 0.6.0 (first used 2026-10-26), 0 of 1. The verdict is shared with the designer.

The three most recent no-picks, all run 2026-10-lk-surf-01, concepted by **creative-director 0.5.1**:

| Business | Concepted (ledger, 2026-10-20) | Mocked | Gate |
|---|---|---|---|
| the-lavish-haven-v2 | archetype "the view from the room"; Prints / Pick your view / Do not disturb (door tag) | r3: visual 7 · 7 · 7 | void: "Drop the mockups. Dont redo for now"; "judged the first runs more interesting" |
| ka-surf-hostel-and-restaurant-v2 | archetype "the camera roll"; Patio / Stories / The roll (contact sheet) | r3: visual 7 · 7.5 · 7.5 | same line |
| layday-surf-ahangama-v2 | archetype "the way in"; Samples (specimen catalogue) / One room / Name in plaster | r2–r3: visual 7 · 8 · 8 | same line |

All three were forks of businesses that **already had a page Shahar picked and put in gold** (`agents/designer/gold/the-lavish-haven.html`, `ka-surf-hostel.html`, `layday-surf.html`). The new round was asked for "to compare with the earlier ones" (ledger fork note), and lost to them.

## What in base.md lets this happen

1. **The bar the concepts are checked against is the business's current site, and these businesses have none.** §4 asks each concept to say "why it beats the current site" by opening `dossier/<slug>/assets/old-site-*.png`. Lavish, KA and Layday sell only through Booking.com / Hostelworld / Agoda listings, so the concept is compared with an OTA listing, a bar every concept clears. The visual critics then compared the built mockups with the gold pages instead (r3 reports: "no business site exists, so 'current site' means the Booking.com listing … with the gold Lavish Haven method and the Global Surf gold as the bar"; "KA has no website, so the comparison is the OTA listing plus the gold page (Canopy)"; "There is no current site. The bar is the gold pages") and seven of the nine stayed below 8 (only Layday interactive and unique reached it). The concepts were never asked to clear that bar.
2. **`gold/` is not an input.** It appears once, in passing ("at the level of `agents/designer/references.md` and `gold/`"), but the Inputs table does not list it, and nothing tells the agent to open the gold pages or the earlier picked page of the same business. The designer's base.md does (Inputs row and hard constraint "yours is clearly better at a glance"); the station that decides what kind of page it is does not.
3. **The 0.6.0 rule has no hand-off check.** 0.6.0 (Shahar, after this round: "our first run created more interesting designs and animations … I want more micro animations and WebGL as the main items") added the main item to §4, but "Before handing off" still ends at the 0.3.0 checks, and its numbering runs 1, 2, 3, 9, 10, 4–8.

What 0.6.0 already fixed and this proposal does not repeat: the skills dealing directions (`draw.mjs`, now forbidden in `tools.md`), and the missing main item / micro-animations in §4. The one 0.6.0 decision so far (2026-10-midigama-01 / cheeky-monkey, 2026-10-26) ended in a pick.

## Proposed change to `agents/creative-director/base.md`

**a. Inputs table, new row after `agents/designer/references.md`:**

> | `agents/designer/gold/` + its `*-notes.md`, and the business's own earlier picked page if it has one (a fork or a re-run: its run's `sites/<slug>/mockups/` or its gold file) | **Open the pages.** They are the bar every concept must clear at first glance, never a source of form (gold README: no first-screen device, section order, palette or typeface may be reused). When the business has no website of its own, this is the bar, not its booking-site listing. |

**b. §4, replace the "Why it beats the current site" bullet with:**

> - **Why it beats what we already have** — open `dossier/<slug>/assets/old-site-*.png` and say, in two sentences, what a visitor would find better here at first glance. If the business has no website of its own (only booking-site listings), or it already has a picked page from an earlier run, compare with that page and with the current gold bar (`gold/README.md`, top row) instead, and name the page you compared with. Beating a booking-site listing is not the bar. If you cannot say it, the concept is not good enough.

**c. "Before handing off", renumber 1–12 and replace items 9–10 with:**

> 9. §2 lists every video and the ten strongest photographs with widths; the concepts use them.
> 10. Each concept says why it beats what we already have, and names the page it compared with: the current site, or — when there is none, or the business already has a picked page — that page and the gold bar.
> 11. Interactive and unique each name a main item from the business's own media (a WebGL piece, a scroll-driven video or a video cut) and their micro-animations; calm names its hero media and micro-animations. No first screen is a plain cookie-cutter section.
> 12. `agents/designer/gold/` was opened this run: the pages, not only the notes.

**d. CHANGELOG:** `0.6.1 — <date> — From proposal 2026-10-lk-surf-01/002 (approved by Shahar). Concepts must beat the best page we already have: gold/ and the business's earlier pick are inputs, and a business with no website is compared with them, not with its booking listing; hand-off checks for the 0.6.0 main item; checklist renumbered.`

## Decision

Shahar: approve, edit or reject. On approval Claude applies (a)–(d) and bumps `version:` to 0.6.1.
