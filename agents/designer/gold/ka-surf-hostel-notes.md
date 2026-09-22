# KA Surf Hostel — how the gold page was made

The pipeline's own output, station 4e, run `2026-09-ahangama-02`: concept 3 ("Canopy") of the
round-3 concepts (`sites/ka-surf-hostel-and-restaurant/concepts.md`, creative-director 0.2.0), built
by designer 0.3.2–0.3.3 and revised on Shahar's notes of 2026-09-22. Picked by Shahar on 2026-09-22:
"the only variant with an idea on the first screen, and the only one inside every budget with all copy
blocks." One HTML file, images inlined. Read this for the method. Do not copy the page.

## The method, in order

1. **Took the material's limit first.** The hostel's best photograph is 576×768 — nothing it owns
   can fill a screen. So the big moment is drawn, in colours sampled from its photographs, and every
   photograph appears at the size it can hold (references.md #27). Round 1 and round 2 of KA had
   failed by fighting that limit (a noticeboard, then a borrowed chart).
2. **Found the one thing.** The garden: cottages among banana trees, off the main road — in 8 of its
   12 listing photographs. The page is built on the banana canopy and nothing else is loud.
3. **Sampled the palette from the photographs.** Leaf green `#75A12B` (`img-006`), lit and shade
   greens for the moving parts only (`img-007`, `img-006`), cool white ground `#F0F1F2` (the basin,
   `img-005`), ink `#060504` (night sky, `img-002`), watermelon `#F05654` (`img-003`) for booking and
   nothing else. Text never sits on green; button text is ink, never white.
4. **One idea, one moment.** You start under cut-paper leaves — flat, hard-edged, a 1 px midrib, no
   gradient — in a clearing that holds the name, the heading, the score and the button as real text.
   Scrolling is walking out: the leaves close into one green column that changes grid column at each
   section, thins to a 1 px line for the walk, and ends at the sky-blue wave panel.
5. **One family of type.** Outfit, ExtraLight and Light, large. KA's things are circles — plate,
   bowls, basin, ring lamp — and its proof numbers are round digits.
6. **Looked, three rounds, on the first screen alone.**
   - Round 1: an even ring of thirty small leaves — a stock "leaf frame", the thing the concept
     warned about — and a pale front blade swallowing the last letter of "Kabalana".
   - Round 2: ten large blades weighted to one side, so the clearing leans towards the type; a blade
     still made the word read "Kabalanc".
   - Round 3: type clear of green except one deliberate nick; the phone header slides away so the
     leaves meet the top edge.
7. **Then the rest of the page, and more rounds.** A 180 px gap broke the green line at every
   section; text ran under the fruit plate; the Agoda tile was clipped in the slide-out. All found in
   screenshots, not in code.
8. **Then Shahar's review, round by round.** Rosa's forecast rebuilt to the two-half rule (headline
   in the page's type, Rosa's own widget beside it, lazy). The headline and widget grouped side by
   side with one gutter; the guest quote moved to the guests section. An OpenStreetMap card beside
   "Getting here". The page held to a centred 1200 px column — at his real ~1525 px viewport the
   first fix (a 1600 px cap) never engaged, so "check at the viewport the human actually uses" is
   part of the method now. Photos and booking blocks centred; platform marks on the booking blocks.
9. **Small things that carry weight.** A borrowed CC BY-SA photograph was removed rather than
   re-saved (PLAN.md §9). No photograph captioned or tied to a room. Every booking control is a real
   link underneath. Reduced motion and no-JS get an inline SVG of the parted canopy; no WebGL gets
   the same canopy on a 2D canvas.

## What was avoided on purpose

Cream ground, a serif display face, Inter, a teal or terracotta accent, all-caps labels over
headings, 01/02/03 numbering, a fade-up on every section, a full-bleed upscaled photograph. KA's
first two archetypes (the noticeboard, the chart) are retired.

## Not verified

A real phone or GPU (headless Chromium only). Self-hosted fonts (it loads Outfit from Google
Fonts). `audit-mockup` after the round-15 width change. The forecast headline is the 2026-09-21
fixture, not live data. The platform marks' brand guidelines. The map is a second third-party embed,
which playbook §4 does not yet allow — Shahar's decision is open.

Open from the pick, for 4g: cut the two near-empty screens after the hero to one; keep the leaves off
the headline at every width (at 2560 px the headline sits left of the centred column).
