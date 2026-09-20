# Layday Surf Ahangama — mockup 2, "interactive"

Station 4d. Built 2026-09-20 from the copy that passed station 4c and `dossier/layday-surf-ahangama/`.
Its own Astro project. It shares the two typefaces and the wall colour with mockups 1 and 3 — it is
one business, so it has one brand — and shares no layout, component or stylesheet with them or with
any other business.

## direction

`custom.md`: *"more interactive with some bells and whistles"*, canvas/WebGL instead of static image
grids, editorial grids, a booking UX behind a sliding drawer.

**The light.** A day in a hostel with one dormitory mostly consists of the sun crossing the plaster.
So the room is pinned for three screens and scrolling walks the light across it: a warm band with the
shadow of the window louvres in it, low and orange in the morning, narrow and white at midday, long
and red in the evening, breathing slightly the way light does when something outside moves.

Read against `agents/designer/references.md`:

- **#19** records that none of the six reference sites uses canvas or WebGL, so there was nothing
  cached to lean on. `src/scripts/light.js` is hand-written WebGL1 — one texture, a tilted soft band,
  a louvre mask, 6 KB of JavaScript for the whole page. No three.js, no CDN.
- **#17 the cheapest convincing motion recipe** (Kube) — ±4 rem image parallax inside an
  `overflow: hidden` wrapper, ±5 rem on the full-bleed bands, **off at ≤ 767 px**, 0.32 s drawer ease.
- **#6 one accent, booking only**; **#4 persistent on a phone**; **#20 nothing covers the first
  screen**.
- The masonry under "The place" is one column count and one 20 px gap everywhere, with three
  repeating frame shapes so the columns stagger without any photograph being singled out.
- The directions keep their ochre block, for the same reason as in mockup 1.

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

**Weight** (`weight.json`, whole `dist/`): html + inlined css 27 KB · JS 6 KB · fonts 78 KB (Syne + Inter Tight) · images 1052 KB across all widths of every photograph used. First mobile load is the HTML, two fonts and the 400 px hero — inside the playbook §4 budget of 1.5 MB and 300 KB of JS.

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
