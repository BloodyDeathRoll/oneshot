# 003 — Rosa forecast: the nearest spot, labelled as such; four smaller rule fixes from verification 1

**Status:** awaiting Shahar. Merging this file only files the proposal; nothing is approved or applied until a `proposal:approved` ledger line records the decision (`docs/ledger.md`, gate d).
**Changes:** `agents/creative-director/base.md`, `schemas/site-content.md` (v0.3 `forecast`), `agents/critic/base.md` rule 9, `agents/designer/tools.md`, `playbook.md` §4, `agents/experience-critic/base.md`. Not a custom.md proposal.
**Run:** 2026-10-midigama-01 · **Raised:** 2026-11-09 by Alon (written up by Claude), from verification 1 of Cheeky Monkey and Lotus Surf House (`reports/2026-10-midigama-01/`, ledger 2026-11-06).

## Why

On 2026-11-04 Alon added a Rosa forecast to two finished sites, choosing the spot himself: **Rams** for Cheeky Monkey (the nearest Rosa spot to the guesthouse, about 360 m; the dossier names no break) and **Lazy Left** for Lotus Surf House (about 290 m; guests name Lazy Left and Lazy Right in the dossier). Neither went back through the creative director, so both `concepts.md` files still say "Forecast: no".

Verification 1 (2026-11-06) failed both sites, mostly on dimension 8, and the forecast block was part of that. It also showed the rules don't fit what Alon chose:

- **Rule 9 and schema v0.3 forbid the nearest other spot.** That's right when the block would read as the business's own break. It's wrong as a blanket ban: for a guesthouse next to several breaks, a clearly labelled forecast for the nearest one is true and useful. Without the change, Cheeky Monkey's Rams forecast stays out of compliance.
- **The widget gate adds a request rule 9 doesn't allow, and still fails.** All three Midigama sites send a HEAD request to Rosa's widget before showing it, because a cross-origin frame fires `load` even when it fails. Rule 9 allows only the JSON and the frame. Worse, when the HEAD succeeds and the frame then fails or is refused, the plain link is already hidden, which leaves an empty box (critic, both sites; Layday has the same gate).
- **The headline and the widget disagree about swell.** `tools.md` tells the site to show the swell's `period` (mean). Rosa's widget shows `peak_period ?? period`, rounded (read from `rosa.surf/widget/` on 2026-11-09). So the two halves side by side read "8.6 s" and "15s". All three critics flagged it.
- **Rosa's frame loads Inter**, a third font family, against the "≤ 2 families" line. The site can't change what Rosa's frame loads.
- **Small text links and the micro-animation cap.** The experience critic capped Cheeky Monkey at 7 because 16 of 132 interactive elements have no transition. Every control animates; the 16 are the skip link, the logo link, 11 review source links and 3 credit links. **Alon ruled on 2026-11-09 that the cap doesn't cover plain text links**; item 5 writes that down.

## Proposed

Each item stands alone. Version bumps and CHANGELOG entries come with the change.

### 1. The nearest Rosa spot, labelled as the nearest

When the dossier names no break Rosa has, the concept may show the nearest Rosa spot, as itself:

- labelled by its own name and its distance, e.g. "Forecast for Rams, the nearest spot Rosa covers, about 360 m from the shop";
- never called the business's break, and never placed as if it were;
- the mapping and the distance (from Rosa's `data/index.json` coordinates and the dossier's location) written in `concepts.md`.

**`agents/creative-director/base.md`, "Forecast (optional)", replace** (the text wraps across lines there) "Rosa has **that** spot, and the dossier-spot → Rosa-spot-id mapping is written down with both names (the nearest other spot is never shown as this one);" **with:**

> Rosa has **that** spot, and the dossier-spot → Rosa-spot-id mapping is written down with both names; or, when the dossier names no break Rosa covers, the nearest Rosa spot, labelled in the block as the nearest with its distance (from Rosa's `data/index.json` and the dossier's location), written down with that distance and never shown as the business's own break;

**`schemas/site-content.md`, `forecast.rosaSpotId`, replace** "The nearest other spot is never used as this one, which is why the owner cannot retype it" **with:**

> A nearest spot is used only as itself, labelled as the nearest with its distance (`concepts.md`), and never as the business's own break; this is why the owner cannot retype it

**`agents/critic/base.md`, rule 9, after** "matches the dossier's spot through the mapping recorded in `concepts.md`" **add:**

> , or is the nearest Rosa spot recorded there with its distance and labelled on the page as the nearest (never as the business's own break)

### 2. No HEAD gate: the plain link stays

**`agents/designer/tools.md`, "Rosa's widget", add:**

> Don't gate the widget on a HEAD request: a cross-origin frame fires `load` even when it fails, and a HEAD that succeeds says nothing about the frame. Keep the plain link ("See today's forecast for <spot> on Rosa") in the block at all times, under the widget or in its credit line, so a refused frame still leaves a way through.

**`agents/critic/base.md`, rule 9, after** "the JavaScript-off path and a blocked-request path both show the plain link" **add:**

> , and so does a widget frame that fails or is refused after loading

### 3. The headline's swell and time match the widget's

**`agents/designer/tools.md`, "The headline", replace** "the first `current.swells[]` with `in_window` true (period and direction)" **with:**

> the first `current.swells[]` with `in_window` true (its `peak_period ?? period`, rounded to whole seconds as Rosa's widget shows it, and its direction)

**and add after it:**

> Label the headline with its time, e.g. "Latest reading, Fri 20:30", so it can't be read as contradicting the widget's other hours.

### 4. Fonts inside a third-party frame

**`playbook.md` §4 budget table, the Fonts row, add to the limit:**

> (fonts loaded inside a third-party embed's own frame, such as Inter in Rosa's widget, don't count)

### 5. The micro-animation cap covers controls, not text links (Alon, 2026-11-09)

**`agents/experience-critic/base.md`, method step 5, replace** "or micro-animations on every interactive element" **with:**

> or micro-animations on every control: buttons, tiles, toggles, tabs, form fields and navigation. Plain text links in copy, credits and citations, and the skip link, are exempt (Alon, 2026-11-09)

## Effect on the two sites

- The fix round under way (2026-11-09) follows the rules as they stand today, items 2 and 3 included: it drops the HEAD gate, keeps the plain link visible, and labels the headline's time.
- It writes the Rams and Lazy Left mappings, with distances, into both `concepts.md` files.
- The swell value stays the mean `period` until item 3 is approved.
- Lotus's Lazy Left needs no exception: guests name it in the dossier, so the current rule already allows it once the mapping is written down.
- Cheeky Monkey's Rams depends on item 1.
- If item 1 is rejected, Rams comes off Cheeky Monkey.

## Decision

Shahar: approve all, approve some (each item stands alone), or reject. Record it as a `proposal:approved` or `proposal:rejected` ledger line.
