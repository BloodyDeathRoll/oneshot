# The Lavish Haven v2 — unique · "Do not disturb" (the hang tag) — designer notes (4e)

designer 0.6.1 · run 2026-10-lk-surf-01 · 2026-10-20 · concept: `sites/the-lavish-haven-v2/concepts.md` §4.3
(tasteskill direction `page-is-the-object`, seed 1160445519, type redrawn at 4d to EB Garamond; not redrawn here).

## look-log

Old site for every comparison: the live site (`https://the-lavish-haven.os1.workers.dev`, shot this session) and the
Booking.com phone page (`dossier/the-lavish-haven/funnel/booking-fold.png`).

**Round 1 (first screen).** The night pool as a 0.74x print beside a white tag on a hook reads at once as an object, which is
the point. Wrong: the tag was a 310 px sliver, so the name broke into three lines; the hole was drawn with a slot to the
edge, and through the mask the drop-shadow filled hole and slot with grey, so the slot read as a grey rule across the card;
the hook stopped above the hole instead of passing through it; on the phone the hook ran down over the photograph because the
print came first. Change: tag widened to four columns (max 430 px), slot dropped (hole only — the photographed tags in
`img-046`/`img-058` are too small to be sure of a slot), hook redrawn to curl inside the hole, print enlarged to eight
columns (867 px, 0.85x native). Against the live site: different and warmer, not yet clearly better — the tag is mostly empty.

**Round 2 (first screen).** The hook now passes through the hole and the name fits two lines. Wrong: the hook ran straight
through the "Rooms" nav link (the nav sat right, exactly where the tag hangs); the tag's foot ran 50 px past the print's foot
for no reason; on the phone the print still came first. Change: nav moved beside the wordmark on the left so the hook drops
through clear ground; the tag's height now follows the print's (grid row stretch), so their feet line up; on the phone the tag
comes first, hung from the top of the screen, the print below it.

**Round 3 (first screen).** One wall: a night print and a white card whose feet align, the hook dropping from the top edge
through the hole. Inspector: FAIL `few-pictures` and `still-page` (first screen only — the whole page carries eight
photographs and the swing/flip), WARN `no-footage` (no video exists of this hotel; see conflicts), WARN `off-centre`
(64 / 106 px — checked in the whole-page round). Still wrong: the middle of the tag is empty on both widths. Change for the
next round: the stay note's first sentence ("Check-in from 14:00 until midnight; check-out at any hour.") printed on the tag
above the buttons, the thing a door card actually tells a guest. Against the live site: yes — the hotel's best photograph at
nearly native size and a card that is plainly this hotel's, with the booking on it; the live page opens on abstract water.

**Round 4 (whole page, 1440 + 390).** Built the back of the tag (the dates form: arrival, departure, guests with
floating labels; Booking.com with the dates, Agoda with the same dates, call, turn back) and its 3D flip; the facts row
under "Among cafés" (2 min to Kabalana | check in until 00:00 | check out any hour | 9.3 / 10, 34 reviews, each with its
source); the twelve rooms as small tag-shaped cards in the three view tones, travelling sideways while the page scrolls
(a pinned run, CSS scroll-driven, desktop only; a 2-column stack on the phone); the slideshow beside "New, and it shows";
the noon pool at native size with the featureLine under it; "Staying longer" as one long letter; practicalities beside a
tall balcony print with the blind square on its corner; Kabalana; and the footer as the back of the tag, uncovered by a
curtain. What the sheet showed wrong: the curtain footer sat pinned behind the page for twelve screens (inspector
`long-pin`) → the footer now shares a wrapper with the Kabalana section only, so it is pinned for one screen; the deck's
heading and key sat on one side with 66 % of the width empty → heading left, note and key right; the offer text was one
narrow column → two columns; the facts and closing were set above statement size. Against the live site: yes, and the
furthest from it — a card that is plainly this hotel's, with the booking on it.

**Round 5 (whole page, after the skills pass and the critique; last round).** From the critique: the desktop header had
no booking button and did not stay → sticky header with a teak "Check dates" pill (the hook now drops from under the
bar); the room cards were 70 % empty and the key swatches invisible → shorter cards (360), larger names, deeper tones,
bigger swatches, and the heading + key moved inside the pinned stage so every pinned screen carries its title; "Front"
was cryptic → "Turn back"; italic everywhere → the Kabalana paragraph and the closing in roman, italic for titles only.
From the inspector: the deck's text touched the screen edge mid-travel → the pinned stage is clipped to the page margins.
From `audit-mockup`: an early scroll moved the page by 0.084 on the phone (the night print below the tag was parsed after
first paint) → the phone hero reserves its height; fonts self-hosted + preloaded, `optional`. Scroll CLS now 0.004 early
(the phone bar arriving), 0 settled. With the old site beside it: the live page opens on generic water; this one opens on
the hotel's best photograph at 0.85x beside the card that hangs on its doors, swinging once on its hook, with the
booking on its face and the dates on its back.

## skills (tools.md "Design skills", in its order)

- **tasteskill draw** — not re-dealt: concepts.md names `page-is-the-object` (seed 1160445519, type redrawn to EB
  Garamond at 4d); sheet reprinted and used (the object hero, title + note + facts row, cards that fold into spines → a
  sideways-travelling deck, one long letter, questions beside a tall photograph, the back of the card, curtain footer).
  The spines were not built: folding cards would animate width; the deck travels on transforms only.
- **inspect.mjs** — run in round 3 (not rounds 1–2), 4 and 5. Fixed: lopsided ×2, headline lines ×2, the long pin, edge
  text, statement sizes. Left, defended: `covered-text` "Choose your dates" (the back face of the tag, hidden by design
  until flipped; `aria-hidden` + `inert`) and "Your dates" (the curtain footer, uncovered at the end by design); WARN
  `long-pin` 3 screens (the deck: each screen shows different cards), `size-count`, `side-scroll` (the deck),
  `no-footage`.
- **/animate + /design-motion-principles** (Jhey weighted for the unique variant, Jakub for the rest): the swing is a
  real damped spring in JS (k 170, c 8, ζ ≈ 0.31, settles in ~1.2 s; one rAF loop that stops at rest), kicked once on
  load, by a fine pointer entering the tag, by a fast scroll near the top and by the flip; the flip is a 460 ms
  ease-in-out `rotateY` transition (interruptible), reduced motion → a 200 ms crossfade of the faces and no swing; the
  deck is a CSS scroll-driven `view-timeline` (off the main thread); the curtain is `position: sticky`, no JS.
- **/find-animation-opportunities** — accepted: `<details>` answers open with height + opacity. Rejected: hover lift on
  room cards (data, tens of times), photo effects, heading reveals.
- **/impeccable typeset / layout / polish** — `italic-serif-display` flagged on every title: kept, it is the concept's
  stated voice (concepts.md §4.3 names the risk); body italic removed instead. Display leading 1.0–1.1 intentional.
  `cramped-padding` on the back-of-tag footer → side padding min 28 px.
- **/mobile-native** — as calm; the flip's inputs are 17 px (no iOS zoom).
- **Playwright** (MCP browser not exposed to this agent; scripts instead): mid-flip at 250 ms and the back at 390 px, the
  swing at 300 ms, the hover nudge, the deck mid-travel, the curtain at the end, the back-of-tag submit tap-through.
- **/review-animations** — not run: user-only skill.
- **/emil-design-eng** — flip shortened 520 → 460 ms (state change the user waits on); nothing else.
- **/impeccable critique** (dual sub-agent) — A: 22/32 ("most memorable first screen; the idea lives only in the hero");
  P1 ×2 and P2 ×2 fixed as above; P2 "dead space on the tag front" partly: the tag's height follows the print's (round 2),
  so its middle stays open. B: 14 warnings, judged false positives (italic display by concept, display leading, padding).

## images

`business-owned` Booking.com photos via `src/make-media.sh` (img/** and fonts/**), ≤ 1.2x: u-night ← img-002 ·
u-room-1…6 ← img-007, -024, -029, -013, -032, -047 · u-balcony-tall ← img-071 · u-blind-sq ← img-077 · u-noon ← img-078.

## gaps

As calm (no video, prices, WhatsApp/email/Instagram; 9.3 from the dossier; no forecast on this concept, by concepts.md).
Interface words added: "Choose dates first", "Choose your dates", "Turn back", the deck note and key, the facts row's
source lines, "Your dates", "Open the hotel on Google Maps" (`location.map_url` opens the hotel's pin, so the concept's
"Open Kabalana on Google Maps" would have been wrong). The tag front prints the stay note "Check-in from 14:00 until
midnight; check-out at any hour." (`stayInfo`, Booking.com house rules).

## conflicts

- The tag's front carries a third line (the stay note) where the calibration asks for title + one CTA; kept because the
  tag is the object, not a hero over video, and the note is what a door card says. Non-blocking; Shahar may cut it.
- Spines not built (above). `font-display: optional` (as calm). No blocking conflicts.

## checks (4e hand-off)

1. Look loop: 3 first-screen rounds + 2 whole-page rounds; all dist media from `src/make-media.sh`.
2. Booking: 15 links checked against the dossier. Tag front CTA tapped at 390 → Booking.com. Back-of-tag submit →
   `?checkin=2026-11-12&checkout=2026-11-15&group_adults=2&no_rooms=1&group_children=0` (Booking.com verified to show
   the dates and 3 nights); Agoda `?checkIn=2026-11-12&los=3&adults=2&rooms=1` (verified). JS off: no flip; the dates
   form shows as a section under the hero and the front button still works.
3. `check-design` ok. 4. `check-places` pass.
5. `audit-mockup` (last run): scroll CLS early 0.004 / settled 0; first load 199 KB, LCP 416 ms, 0 third-party hosts.
   Reduced motion: no swing, faces crossfade, deck stacks, entrances opacity only.
6. Other businesses: nothing in KA v2 or Layday v2 is an object; KA is a garden field / print / mosaic, Layday heavy type
   and yellow berths. A visitor would notice the white hang tag on a hook beside a night photograph of a pool.
7. No video; the first screen is the hotel's strongest photograph; round 5 says why it beats the live site.

inspect.mjs FAILs left: `covered-text` (back face, curtain — by design).

# Round 2 (after 4f round 1: critic 73.7/80, visual 6, experience 6)

Reports read in full (critic, visual, experience). Shot and inspected over http.

**Round 6 (whole page).** (1) Fonts: EB Garamond italic (titles) `swap`, roman `optional` + preload, fallback
size-adjusted 95 %; (2) all six category scores; (3) the tag is now a door hanger: drawn as an SVG mask in the
proportions of the hotel's own tag (`img-046`: round head, punched hole, slot from the hole to the edge, shoulders
flaring to a wide body); the stroke "hook" is gone; the shadow is a drop-shadow on the whole shape; (4) front and back are
one fixed height (640 phone / 703 desktop measured, both faces), so the flip ends without a jump; the stay note gave its
place to the rating (9.3 / 5.0, read 25 Sep 2026), which the audit wants on the first screen; (5) phone: the night pool
comes first at full width and the tag hangs under it, its head overlapping the photograph's foot; (6) the rooms: the
3-screen pinned pastel carousel (and the 3.5-screen phone stack) is replaced by one screen of small tags grouped by view
(pool / garden / no view), roman names; on the phone one swipeable snap row; deeper tones; (7) Kabalana paragraph roman.
Tested: flip on a 390 touch tap and a desktop click — page scroll before/after 0/0 (focus uses `preventScroll`); Esc
turns the tag back and returns focus to "Choose dates first" (both widths); back-face fields no longer overflow at 390.
What the sheet/audit showed wrong: the new phone order shifted the page by 0.29 on an early scroll (the tag was laid
out before the print's height was known) → the print box reserves its 4:3 height.

**Round 7 (last).** Inspector FAIL left: `covered-text` (back face, curtain footer — by design). WARN `card-rows` (the
room tags, the concept's object), `side-scroll` (phone tag row), `size-count`, `no-footage`.

## skills (round 2)
inspect.mjs over http; /impeccable typeset (font split, roman for names and paragraphs); /emil-design-eng + /animate:
the flip stays a 460 ms transition, now height-stable; the swing spring unchanged; /mobile-native: preventScroll on the
date focus, one booking button per screen.

## checks (round 2)
check-design ok · check-places pass · audit-mockup: first load 517 KB, LCP 1880 ms, scroll CLS early 0.0048
(the phone bar arriving) / settled 0, 0 third-party · 15 links = dossier; tap → booking.engine_url; back-of-tag dates
hand-off unchanged (verified round 1) · no overflow at 390.

# Round 3 (after 4f round 2: visual 7, experience 8, critic 77.0/80) — last round

**Round 8 (whole page).** Phone: the hanger now overlaps only the night print's bottom ~20 % (hole and slot below the
water), height reserved so nothing jumps; room tags three per row at 1440, names 19 px, bed lines 16 px; "Staying longer"
gets a 1024 px photograph (`img-069`, balcony over pool and garden) and its letters run in four columns under it (the
empty left gap is closed); Kabalana gets the noon pool `img-079` at 1024 px, in its own section before the curtain
(inside the curtain it made the closing card pin over it for 3 screens); "New, and it shows" slideshow moved to the
first column; amenities eight + "All 25" on the phone; first load trimmed 517 → 323 KB and the largest image 182 → 57 KB
(night print at lower quality plus a 640 w phone rendition, preloaded with `imagesrcset`).
**Round 9 (last).** Inspector FAIL left: `covered-text` (tag back face, curtain footer — by design). WARN `card-rows`
(the room tags), `size-count`, `no-footage`.
**checks:** check-design ok · check-places pass · audit-mockup 323 KB, LCP 1588 ms, scroll CLS 0.0049 / 0 (phone bar),
0 third-party · 15 links = dossier, tap → booking.engine_url · flip/Esc behaviour unchanged from round 2.
