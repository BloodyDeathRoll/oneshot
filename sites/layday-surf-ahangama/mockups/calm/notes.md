# Layday Surf Ahangama — mockup 1, "calm"

Station 4d. Built 2026-09-20 from the copy that passed station 4c and `dossier/layday-surf-ahangama/`.
Its own Astro project: no shared template, and no markup or CSS carried from another business
(CLAUDE.md, Architecture).

## direction

`custom.md`: *"calm, moderate and expressing a conformist standard approach."* PLAN.md §9: the calm
mockup skips the canvas.

"It is quiet" is this hostel's whole pitch, and its own photographs already hold a design — ochre
plaster, black bunk steel, cane, white linen. So the page takes its colours off the walls, sets the
type out of the way, and gives the single most useful thing on the site a block of the wall colour
to itself: **the directions**. The dossier's own gap note says guests cannot find this place, that
it is an unmarked black gate, and that a map and directions on a site would fix it today. So four
numbered lines, in the copywriter's own words, on ochre, above the fold of that section.

Read against `agents/designer/references.md`:

- **#6 one accent, booking only** — the rust of the door frames, on the four actions, the phone and
  map links and focus rings. Nowhere else.
- **#4 booking persistent on a phone** — a fixed bar under 760 px, plus the strip under the hero.
- **#7** — each booking action carries its platform mark, drawn inline as SVG so nothing is fetched.
- **#16 the FAQ is where dossier facts live** — here it is "Finding the door" and "Before you
  arrive", written as answers rather than questions, because the dossier can answer only those.
- **#15 Morgan's Rock's order**; **#20 nothing covers the first screen**.

Three full-bleed photographs sit between the long text sections, parallaxing with
`background-attachment: fixed`, which keeps this mockup at **zero bytes of JavaScript**; plain cover
images on phones and under `prefers-reduced-motion`.

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
| Works with JavaScript off | pass — the build ships **0 bytes of its own JavaScript**; every action is an `<a href>`, and the parallax is CSS. The Rosa widget runs its own script inside its sandboxed iframe; with JavaScript off the frame is empty and nothing else changes. |
| Reduced motion | pass — the bands stop being fixed; nothing else moves |
| Keyboard | pass — document order, skip link first, visible focus ring on every link |
| Broken images | 0 (`tools/shoot-mockups.mjs`) |
| Self-hosted, no third party | **partial** — 0 external requests on first load; fonts and platform marks vendored. The Rosa forecast iframe (`rosa.surf`) is one deliberate third-party embed, lazy and sandboxed. See conflicts. |

**Weight** (`weight.json`, whole `dist/`): html + inlined css 21 KB · JS 0 KB · fonts 78 KB (Syne + Inter Tight) · images 1052 KB across all widths of every photograph used. First mobile load is the HTML, two fonts and the 400 px hero — inside the playbook §4 budget of 1.5 MB and 300 KB of JS.

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
