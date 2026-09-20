# Layday Surf Ahangama — mockup 2, "interactive"

Station 4d. Built 2026-09-20 from the copy that passed station 4c and `dossier/layday-surf-ahangama/`.
Its own Astro project. It shares the two typefaces and the wall colour with mockups 1 and 3 — it is
one business, so it has one brand — and shares no layout, component or stylesheet with them or with
any other business.

## direction — archetype: **the printed spec card**, concept 2 "The card, at four o'clock"

`sites/layday-surf-ahangama/concepts.md` §3. The same card, in the same colours off the same walls —
one business, one brand — with one difference: the card's photograph cell is full height and
**pinned**, and the sun crosses the room inside it as you scroll while the rest of the card goes
past. A day in a hostel with one dormitory really does mostly consist of that.

- **The light** is hand-written WebGL: a warm band with the shadow of the window louvres in it, low
  and orange in the morning, narrow and white at midday, long and red at the end, breathing slightly
  the way light does when something outside moves. No three.js, no CDN. references.md **#19** —
  there is no canvas anywhere in the reference set to copy from.
- Below the card, the photographs become a masonry with **one hairline gap everywhere**, carrying
  Kube's ±4 rem parallax, off at ≤ 767 px (**#17**).
- Booking is a drawer pulled up from the card's foot, actions centred (**#1**, **#2**).
- The directions keep their ochre cells, for the same reason as in concept 1.

## facts

Every word other than interface labels comes from `sites/layday-surf-ahangama/copy/en.json`, which
the copyeditor passed at station 4c with 0 unsourced and 0 contradicted claims (`copy/review.md`);
each paragraph maps to its dossier fields in `copy/sources.md`. The three mockups carry identical
content, so the human's pick is about design (base.md, 4d outputs).

| On the page | Source |
|---|---|
| Name, tagline, all six copy blocks | `copy/en.json` → `dossier.business`, `location`, `facilities`, `room_types`, `stayInfo` |
| 9.8/10 Hostelworld · 10 · 10/10 Booking.com · 6 · 5.0/5 Google · 15 | `dossier.reviews` → `copy.ratings[]`, each with its own platform and count, **never averaged** — the dossier names that explicitly |
| "Bed in the dormitory", one air-conditioned dormitory | `dossier.room_types` → `copy.rooms[]` |
| 19 amenities with their notes | `dossier.facilities` → `copy.amenities[]` |
| Five guest quotes, verbatim, with author and platform | `dossier.reviews` → `copy.testimonials[]` |
| Phone `+94778553343` | `dossier.contact.phone` (source: Google Maps listing) |
| Address `'Warnagiri' Welhengoda, Ahangama` | `dossier.location.address` |
| Hostelworld, Booking.com and Agoda links | `dossier.booking` → `copy.bookingLinks[]`, character for character |
| Check in 14:00–19:00, out by 14:00, no credit cards, non-smoking, taxes included | `copy.stayInfo` |
| The four directions to the door | `copy.copyBlocks[slot=info]` "Finding the door", the copywriter's own sentences; the numbering is layout, not new content |
| Kabalana spot line | `copy.spot` |

## gaps

- **No prices.** `dossier.gaps`: Hostelworld shows "from US$17" inside a dated search, which is live
  inventory and not a published price list. The page says rates move with the dates and sends the
  visitor to the three listings that hold them. Pitch point.
- **No bed count.** Booking lists a "6-Bed Dormitory Room"; a Hostelworld guest describes one dorm
  with four bunk beds, so eight. Unresolved in the dossier, so **no bed count is published anywhere
  on the page** — the room line says only "one air-conditioned dormitory" and carries the copy's own
  note that the count is not published consistently. One of the first questions for the owner.
- **No WhatsApp**, no email, no website, no social account at all — every booking pays an OTA
  commission. Playbook §5 wants WhatsApp first; there isn't one, so the primary action is the
  listing the hostel already answers on, with `tel:` beside it. Nothing is guessed. Pitch point.
- **No season, no founding year, no latitude/longitude** captured this run. All omitted.
- **Three of the Booking quotes are truncated** by "Read more" on the source page; they are shown
  exactly as harvested, ellipsis and all, rather than completed.
- **No FAQ section.** The answerable questions are already stated plainly in "Finding the door" and
  "Before you arrive".

## images

22 photographs, all `business-owned`, from the hostel's Booking.com, Hostelworld and Agoda listings,
at 576–1024 px. The dossier's note: *"good coverage, not print quality."*

This is the one business of the three whose photographs already carry a design: ochre plaster walls,
black steel bunk frames with their own curtains, cane cabinet fronts, white linen, one abstract
painting, terracotta floors. So none of these three mockups invents a palette — the page colours are
taken off the walls, and the accent is the rust of the timber door frames. Alt text was written by
looking at each photograph.

## self-check

| Check | Result |
|---|---|
| Every fact traces to the dossier | pass — page grepped for digits and proper nouns |
| Booking targets match the dossier character for character | pass — Hostelworld, Booking.com, Agoda and `tel:+94778553343` diffed against `dossier.booking` / `dossier.contact` |
| Mobile 390 px / desktop 1440 px | pass — `shots/mobile-*.png`, `shots/desktop-*.png`; no overflow, no overlap |
| Tap targets ≥ 44 px | pass |
| Works with JavaScript off | pass — the hero shows the dormitory photograph; every `Check dates` / `Check this bed` trigger is an `<a href="#book">` landing on the footer booking block, which holds all three listings and the phone number |
| WebGL missing or context lost | pass — `startLight` returns `null`, the canvas stays at `opacity: 0`, the photograph shows |
| `prefers-reduced-motion` | pass — the shader never starts, parallax is skipped, the drawer has no transition |
| Keyboard | pass — Esc closes the drawer and focus returns to the trigger |
| Broken images | 0 (`tools/shoot-mockups.mjs`) |
| Self-hosted, no third party | **partial** — 0 external requests on first load; fonts and platform marks vendored. The Rosa forecast iframe (`rosa.surf`) is one deliberate third-party embed, lazy and sandboxed. See conflicts. |

**Weight** (`weight.json`, whole `dist/`): html + inlined css 27 KB · JS 5 KB · fonts 78 KB (Syne + Inter Tight) · images 1052 KB across every width of every photograph used. First mobile load is the HTML, two fonts and one 400 px photograph — inside the playbook §4 budget of 1.5 MB and 300 KB of JS.

**Lighthouse was not run** — there is no Lighthouse runner in `tools/`. The weights quoted are
measured file sizes from `weight.json`, not a Lighthouse score. Base.md "Before handing off" item 3
is not satisfied.

## conflicts

1. **The bed count is contradicted between platforms, and the page must not resolve it.** See gaps.
   Publishing either number would be inventing a fact the owner has to answer for.
2. **The Rosa widget is a third-party embed, against playbook §4** ("third-party requests on load:
   0", "all assets self-hosted"). Shahar asked for it on 2026-09-20 and it earns its place here more
   than anywhere: this hostel is a two-minute walk from Kabalana and its guests are surfers. It is
   `loading="lazy"` so it is outside the first-load budget, it is sandboxed, and the section reads
   correctly without it because the spot sentence is dossier-sourced text. If `rosa.surf` is down
   the visitor sees an empty frame.
3. **`custom.md` asks for a booking drawer over a "complex booking engine".** There is no engine of
   ours to hide, and playbook §5 forbids introducing a channel the owner does not monitor. Where a
   drawer exists (mockups 2 and 3) it holds the three listings the hostel already sells through and
   says why it does not ask for dates.

## house rules — checked, not promised

`tools/check-design.mjs` measures these on the built page at 1440 px and 390 px and fails the
station if any of them breaks. All three were said by Shahar, then broken by a later rebuild of
this very mockup, then said again:

1. **Light theme.** Every surf business, every variant. This page's ground and every panel behind
   body text are measured for luminance; a photograph filling a container is a picture, not a theme.
2. **No padded picture boxes.** Where photographs of different shapes sit together they are either
   cropped to one ratio or laid out as real masonry where each keeps its own height. Equal-height
   boxes with mixed content — half a card empty under a portrait — are what this check exists for.
3. **No caption under a photograph.** Alt text carries the description; attribution under a
   quotation is not a caption and stays.

Result for this mockup: **0 problems**.

## what a visitor would notice is different

Against **The Lavish Haven**: that site is a continuous magazine that opens on a photograph filling
the screen; this is a bordered object read in panels, and its first screen is a card, not a picture.
Against **KA Surf Hostel**: KA is a dark wall with small prints pinned to it at angles; Layday is
pale ochre, square, and everything sits inside hairline rules. See the divergence table in
`sites/the-lavish-haven/concepts.md` §5.
