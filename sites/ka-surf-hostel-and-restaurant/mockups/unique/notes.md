# KA Surf Hostel — mockup 3, "unique"

Station 4d. Built 2026-09-20 from the copy that passed station 4c and `dossier/ka-surf-hostel-and-restaurant/`.
Its own Astro project; same two typefaces and paper as mockups 1 and 2, nothing else shared.

## direction

`custom.md`: *"full blown unique"*, canvas/WebGL, editorial asymmetric grids with varying column
counts, overlapping kinetic type, booking behind a slide-out.

**One long table.** This hostel has one photograph nobody else could take: fifteen people at one
table at night, shot on a phone, slightly soft, slightly warm. Everything is built on it.

- The hero is that photograph run like a **home film** — grain that moves every frame and is heavier
  in the shadows, halation bleeding out of the lamp over the table, a gentle weave, a vignette.
  Nothing is added to the photograph and nothing removed; the grain sits on top.
  `src/scripts/reel.js`, hand-written WebGL1, 5 KB for the whole page.
- The name is set as two overlapping lines — "One long" / *table* — that lean apart as the pointer
  crosses the screen. That is the kinetic type `custom.md` asks for, and it is also the sentence.
- The three platform scores are set at 6 rem as a **tally**: 9.8, 9.5, 4.8, each with its platform
  and count, never averaged.
- The photographs are set along **one rule** — a table edge, 2 px of ink running the width of the
  page — at three different heights, the way plates and glasses sit on a table.
- The guests' words are **place cards**, staggered above and below a centre line.
- Sections sit on a 12-column grid at 1/7, 7/13, 1/6, 6/13 rather than an even split.

Read against `agents/designer/references.md`: **#19** (no canvas precedent in the set — this is
built from scratch), **#8** type doing the heavy lifting, **#10** grid-breaking with no extra assets,
**#12** data as caption, **#18** one sideways run inside a vertical page, **#6** one accent for
booking only, **#4** persistent booking on a phone.

## facts

Every word other than interface labels comes from `sites/ka-surf-hostel-and-restaurant/copy/en.json`,
which the copyeditor passed at station 4c with 0 unsourced and 0 contradicted claims
(`copy/review.md`); each paragraph maps to its dossier fields in `copy/sources.md`. The three
mockups carry identical content, so the human's pick is about design (base.md, 4d outputs).

| On the page | Source |
|---|---|
| Name, tagline, all six copy blocks | `copy/en.json` → `dossier.business`, `location`, `facilities`, `room_types`, `stayInfo` |
| 9.8/10 Hostelworld · 66 · 9.5/10 Booking.com · 38 · 4.8/5 Google · 42 | `dossier.reviews` → `copy.ratings[]`, each with its own platform and count, never averaged |
| Six bed and room types with their beds | `dossier.room_types` → `copy.rooms[]` |
| Amenities with their notes | `dossier.facilities` → `copy.amenities[]` |
| Guest quotes, verbatim, with author and platform | `dossier.reviews` → `copy.testimonials[]` |
| Phone `+94773746053` | `dossier.contact.phone` (source: Google Maps listing) |
| Address `No 207/A, Welhengoda, 80650 Ahangama` | `dossier.location.address` |
| Hostelworld, Booking.com and Agoda links | `dossier.booking` → `copy.bookingLinks[]`, character for character |
| Check in 13:00–23:00, out by 13:00 | `copy.stayInfo` — **see conflicts**, this is Hostelworld's figure |
| Kabalana spot line | `copy.spot` |

## gaps

- **No prices.** `dossier.gaps`: nightly rates are live dated OTA inventory, not a published price
  list. The page says so and sends the visitor to the three listings that hold them. Pitch point.
- **No WhatsApp**, no email, no website, no socials of its own — every booking currently pays an OTA
  commission. Playbook §5 wants WhatsApp first; there isn't one, so the primary action is the
  listing the hostel already answers on, with `tel:` beside it. No number is guessed. Pitch point.
- **No season, no founding year.** Both omitted rather than guessed.
- **The restaurant.** Google's listing name is "KA Surf Hostel and Restaurant", but no OTA mentions a
  restaurant and no menu or food offer is published anywhere. So the page talks about **breakfast**,
  which is sourced, and never claims a restaurant. Open question for the owner.
- **TripAdvisor** 403s this harvester, so no TripAdvisor rating appears.
- **No FAQ section.** Playbook §3 item 8 allows only questions the dossier can answer; the
  answerable ones are already stated plainly in "What is here" and "Getting here".

## images

24 photographs, all `business-owned`, from the hostel's Booking.com, Hostelworld and Instagram
listings, at 576–1024 px. The dossier's own note: *"usable but modest… photography on location would
beat all of it."* Two things about them shaped every one of these three mockups:

1. **They are photographs of people, not of rooms.** Fifteen guests and the family at a long table at
   night; the family standing on the veranda; a breakfast spread; a bowl of cut fruit held up against
   the garden. That is the business, and every review says so. None of the three mockups leads with a
   bed.
2. **Seven of them are stored on their side** inside a square Instagram frame with no EXIF flag to
   say so. `photos.json` carries an explicit `rotate: 270` for those, applied at build time; an
   unrotated beach photograph was shipped in an earlier round of this station.

Alt text was written by looking at each photograph. `img-015` is a screenshot of somebody else's
Instagram post and is excluded — it is not a photograph of this business. `img-010` is the hostel's
roundel; unused in this round.

## self-check

| Check | Result |
|---|---|
| Every fact traces to the dossier | pass — page grepped for digits and proper nouns |
| Booking targets match the dossier character for character | pass — Hostelworld, Booking.com, Agoda and `tel:+94773746053` diffed against `dossier.booking` / `dossier.contact` |
| Mobile 390 px / desktop 1440 px | pass — `shots/mobile-*.png`, `shots/desktop-*.png`; no overflow, no overlap |
| Tap targets ≥ 44 px | pass |
| Works with JavaScript off | pass — the hero shows the photograph; every trigger is an `<a href="#book">` landing on the footer booking block, which holds all three listings and the phone number; the sideways table rail is a native scroller |
| WebGL missing or context lost | pass — `startReel` returns `null`, the canvas stays at `opacity: 0`, the photograph shows |
| `prefers-reduced-motion` | pass — the grain never starts and the name does not lean |
| Keyboard | pass — Esc closes the slide-out and focus returns to the trigger |
| Broken images | 0 (`tools/shoot-mockups.mjs`) |
| Self-hosted, no third party | **partial** — 0 external requests on first load; fonts and platform marks vendored. The Rosa forecast iframe (`rosa.surf`) is one deliberate third-party embed, lazy and sandboxed. See conflicts. |

**Weight** (`weight.json`, whole `dist/`): html + inlined css 25 KB · JS 5 KB · fonts 83 KB (Newsreader + Public Sans) · images 649 KB across all widths of every photograph used. First mobile load is the HTML, two fonts and the 400 px hero — comfortably inside the playbook §4 budget of 1.5 MB and 300 KB of JS.

**Lighthouse was not run** — there is no Lighthouse runner in `tools/`. The weights quoted are
measured file sizes from `weight.json`, not a Lighthouse score. Base.md "Before handing off" item 3
is not satisfied.

## conflicts

1. **The dossier holds two unresolved contradictions and the page must not resolve them.**
   Parking: Booking.com says "no parking available", Hostelworld lists "free parking" — so **parking
   is not mentioned anywhere on the page**. Check-in: Booking.com says "available 24 hours",
   Hostelworld says 13:00–23:00 — the page prints Hostelworld's specific figure, because it is the
   more specific claim and the copy that passed 4c already made that call, and flags it here. Both
   need the owner.
2. **The Rosa widget is a third-party embed, against playbook §4** ("third-party requests on load:
   0", "all assets self-hosted"). Shahar asked for it on 2026-09-20 and it earns its place: the
   visitor is a surfer and Kabalana is five minutes away. It is `loading="lazy"` so it is outside the
   first-load budget, it is sandboxed, and the section reads correctly without it because the spot
   sentence above it is dossier-sourced text. If `rosa.surf` is down the visitor sees an empty frame.
3. **`custom.md` asks for a booking drawer over a "complex booking engine".** There is no engine of
   ours to hide, and playbook §5 forbids introducing a channel the owner does not monitor. Where a
   drawer exists (mockups 2 and 3) it holds the three listings the hostel already sells through and
   says why it does not ask for dates.
