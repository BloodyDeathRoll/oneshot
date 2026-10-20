# Layday Surf Ahangama v2: visual-critic, station 4f, round 2

visual-critic 0.1.2 · run `2026-10-lk-surf-01` · 2026-10-20 · mode: quick, round 2.

**Method.** Same method and calibration as `visual-4f.md`.
- Served over http (`python3 -m http.server`, 127.0.0.1:8743). Shot fresh with `tools/shoot.mjs` into the shared `sites/layday-surf-ahangama-v2/mockups/*/shots/`, because the builds had changed.
- Read every contact sheet, plus frames `interactive/desktop-02` and `desktop-10`.
- Ran the tasteskill inspector over http on all three pages.
- No current site exists. The bar is the gold pages and `agents/designer/custom.md`.

**Inspector, all three.** The one remaining FAIL on each page is `covered-text` at 768/390. It is text passing under the fixed phone booking bar, which playbook §3 requires, so I accept the designer's defence. On unique it hides 25 % of the "A two-minute walk" line at the first scroll stop.

## calm "Samples": r1 6 → r2 7

**Three-second test.**
- 1440 (desktop-sheet frame 1): the headline, tagline, 10/10, and a teak-brown "Check dates" with a "Call" pill sit left. Two berth photos (img-002, img-018) sit right at native size. The swatch tiles are gone from the first screen. Calm and clean, and it reads as a real room. Still a lot of white around small type.
- 390 (mobile frame 1): the headline, the buttons, and now the berth photo under them. The phone first screen has a picture.

**Fixed since r1.**
- The display face custom.md asks for: Caveat script on the section titles ("The room", "Just one dorm", "Guests", "Check dates").
- A booking colour from the place: teak #75421b, with white text.
- No inline photo chips, and no yellow ring.
- Amenities are compact and " | "-separated (frame 8).
- 7 sizes.

**Still weak.**
- Sections are plain: script title, small text, one photo. "Just one dorm" has 2051 px of empty middle (inspector), and the body beside its gallery is about 13 px at 1440 (frame 3).
- The booking block is a dull grey (#c4cbd1) band with a strip of thumbnails cut at the right edge (frame 9).
- A 512 px blank gap at 7168 px.
- The stepped-block "Layday" footer is still the one memorable moment.

**Score: 7/10.** Professional and tidy, but not yet beautiful. **FAIL** (below 8).

**Better than r1:** yes. It now has a script, a place colour, a photo on the phone's first screen, and no gimmicks.

**Fixes left (biggest first)**
1. Give "Just one dorm" and "Newly built" real compositions. Put the room gallery at its native 576–1024 px beside text at 17 px or more, with the text pulled to the gallery, not to the far right edge.
2. Set the booking section on white or the plaster yellow instead of grey. End the thumbnail strip inside the grid.
3. Close the 512 px gap, and set the hero type larger so the left half is not mostly white.

## interactive "One room": r1 7 → r2 8

**Three-second test.**
- 1440 (frames 1–2): unchanged and still the best first screen. "Just one dorm" is huge on yellow, the berth photo crossfades to img-018, and the ground deepens.
- 390 (mobile 1–2): the title, sentence, berth photo and plum bar.

**Fixed since r1.** The page below the hero now has pace:
- "The room" is a gallery row of four prints with dots, plus the "Bed in the dormitory" card (frame 4).
- "Newly built" has three cane/basin/porch prints edge to edge (frames 5–6).
- "Finding the door" has the text with a live map (frame 6).
- Guests is a full yellow band with Beth's quote large and the three scores beside it (frame 7).
- The Rosa widget renders over http beside the wave headline (frames 8–9).
- Practicalities is compact, with a " | " list.
- The footer is the room photograph with the contact card and filled booking buttons (`desktop-10`).

The type is Libre Franklin plus a Yellowtail script, exactly custom.md's pair. Plum (#860f47) with white text.

**Still weak.**
- "The place" (`desktop-02`) is two text columns with the right third empty and no image. It is the one screen that looks unplanned.
- The hero pin still holds "Just one dorm" for 3 screens (inspector `long-pin`).
- The wave section leaves a wide white gap between the headline numbers and the widget.
- On phones the h1 does not say "hostel".

**Score: 8/10.** Clearly professional, beautiful on the first screen, distinct sections, in the business's colour. It is above the gold "Inside" on photography and type, and near the Global Surf standard in structure. **PASS** on dimension 8 from this critic.

**Better than r1:** yes. The generic page below the hero became designed sections.

**Fixes left (polish, not gating)**
1. Give "The place" a picture: the porch img-001, or the garden img-007, in the empty right third.
2. Trim the pin to two screens.
3. Pull the Rosa widget closer to the wave numbers.

## unique "Name in plaster": r1 7 → r2 8

**Three-second test.**
- 1440 (frame 1): the three-print band over the plaster-yellow masthead with "Layday" in Boska, the tagline and a plum "Check dates". The nav is now in ink on the yellow. As strong as r1.
- 390 (mobile 1): the berth photo, then "Layday" on yellow with the tagline. Strong.

**Fixed since r1.**
- The body is now General Sans (94 % of text, 18 px / 1.55). Boska is kept for the name, the italic section titles, the big quote and the phone number. Readability is solved, and the two-family rule is kept.
- The booking card is one control: a yellow card with a plum button inside (frame 4).
- The giant cropped footer wordmark is replaced by "Layday Surf Ahangama" in Boska at a sane size (frame 9).
- The Rosa widget renders (frame 7).
- Sizes are down to 7.

**Still weak.**
- The guests band runs as a horizontal row of yellow review cards cut at the right edge (frames 5–6; inspector `side-scroll`), dense and card-like.
- "A two-minute walk from Kabalana" sits as a second title just under the masthead on the phone. It is 25 % under the bar at the first stop.
- White gaps around the wave section.

**Score: 8/10.** The most striking first screen of the round, with the best type now and the place's colour throughout. A designed page that would sit in a studio portfolio after the polish below. **PASS** on dimension 8 from this critic.

**Better than r1:** yes. Its two r1 blockers (unreadable body, the split booking control) are fixed.

**Fixes left (polish, not gating)**
1. Replace the cut-off review-card row with Beth's quote large plus two short quotes set as type on the yellow, with no cards and no edge cut.
2. Drop or shrink the second "A two-minute walk" title on the phone, so the first screen ends on the masthead.
3. Tighten the white bands around "The wave".

## Table

| variant | r1 | r2 | better than earlier round |
|---|---|---|---|
| calm | 6 | 7 | yes: script titles, teak booking colour, a photo on the phone's first screen, gimmicks removed. Still plain below the fold. |
| interactive | 7 | 8 | yes: every section below the hero is now designed (gallery row, materials band, yellow guests band, map, Rosa, photo footer). |
| unique | 7 | 8 | yes: a readable General Sans body, a single booking card, a sane footer, with the masthead kept. |

**Visual ranking:** 1. interactive (8) · 2. unique (8) · 3. calm (7).

- **interactive:** the best first screen and the most complete walk through the room.
- **unique:** the boldest masthead, now readable. Its review-card row is the last weak spot.
- **calm:** tidy and honest, but its sections are still plain. It goes back to the designer.

Calm stays below 8 and fails this critic's gate. Interactive and unique pass this critic's gate; the experience-critic must pass them too before Shahar sees them.
