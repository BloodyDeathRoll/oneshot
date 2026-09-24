# Layday Surf Ahangama — interactive · "Curtain" — 4e notes

designer 0.3.3 · run 2026-09-ahangama-02 · 2026-09-22 · brief: `concepts.md` round 3, concept 2.
One file, `dist/index.html` (40 KB, CSS/JS inline, Urbanist from Google Fonts), photographs in `dist/img/`.

## look-log

Shot over http (`python3 -m http.server`) with `tools/shoot.mjs`; both contact sheets opened every round.
Rounds 5 and 6 also have `w1525-NN.png` / `w1920-NN.png` stops.

- **Round 1 — first screen.** Wrong: the curtain read as a barcode, forty straight evenly spaced
  lines sitting on top of the photo's own brown curtain; the ladder was one rail with three ticks
  sticking out above the berth, so it read as a ruler; the print sat low and left the top right of
  the berth empty. Change: hang the curtain from the berth's top edge so it runs down across the
  print; make the ladder two rails with rungs, from the berth's top to the foot of the drawer.
  Would a stranger guess it was generated? Yes, because of the barcode.
- **Round 2 — first screen.** The ladder now reads as a ladder and the curtain hangs in the berth
  opening, but the headline broke as "A two- / minute walk", and the lines looked like hanging
  strings, not cloth. Change: keep "two-minute" on one line, and gather each fold of three lines
  onto one hook on the rail so the lines open out toward the hem. A stranger would probably take
  the strings for a bead curtain.
- **Round 3 — first screen.** The folds hang from hooks and flare toward the hem, so the curtain
  reads as pleated cloth; the headline sits on three lines. What's left: a band of air between
  the headline and the tagline at 1440. I kept it on purpose, so the headline sits at the top
  of the box and the action row lines up with the foot of the print. It would not obviously
  read as generated now: one yellow box, a real berth photo, ink cloth.
- **Round 4 — whole page.** Wrong: the pinned room frame's curtain was a dense black block (a
  barcode again) at its resting edge; empty bands after Beth's quote and at the foot of the
  "Finding the door" panel; the sections below the fold drift toward a generic editorial page
  once the curtain is out of sight. Change: spread the frame's resting bunch into folds over
  about 70 px, shorten the pinned run (220 vh → 190 vh) and the door panel's padding.
- **Round 5 — whole page + 1525/1920.** Bands tightened; the folds in the frame read as cloth.
  At 1525 and 1920 everything sits in the centred 1200 px column with no horizontal scroll
  (`scrollWidth` = viewport width at both). Wrong: at 1920 the headline hit its 6.4 rem cap in a
  narrower text column and broke to four lines ("A / two-minute / walk from / Kabalana");
  "Newly built, and kept that / way" left an orphan. Change: cap the headline at 5.1 rem and
  widen the newly-built heading's column.
- **Round 6 — whole page, final.** Visible change against round 5: at 1920 the headline is back on
  three lines, and "Newly built, and kept that way" sits on one line at 1440, 1525 and 1920. No
  overflow, overlap or unreadable text on either sheet. Known and left: under reduced motion the
  open curtain bunched against the ladder is dense enough to read as a black bar (see gaps).

States looked at outside the rounds (headless screenshots, not kept in `shots/`): the lamp on
button hover (the lit wedge from the top-right corner), the drawer open under the berth at 1440, the
phone sheet raised from the bottom bar at 390, JS off (1440: no curtain, drawer panel open, room
photos stacked as prints, the forecast box shows the plain Rosa link), and reduced motion (curtain
drawn once open against the ladder, no pin, room photos stacked).

## images

All business-owned: property-uploaded Booking.com listing photos, which Shahar approved on 2026-09-19
(`assets/index.json` license note). Resized/cropped with PIL, never enlarged; 4:5 centre crops
(576×720 from 576×768; 614×768 from 1024×768). There is no `stock/`, so no borrowed images.

| file | asset | shown | alt written from looking |
|---|---|---|---|
| img-018-1024.jpg | img-018 (1024×768) | first-screen print, 512×384 CSS (288×216 on a phone) | inside a berth |
| img-012-45.jpg | img-012 | room frame 448×560 | dorm through the open door |
| img-005-45.jpg | img-005 | room frame | dorm from the doorway |
| img-011-45.jpg | img-011 | room frame | toward the garden doors |
| img-008-45.jpg | img-008 | room frame | berth end and ladder |
| img-013-45.jpg | img-013 | room frame | cane lockers, concrete shelves |
| img-003-45.jpg | img-003 | newly built, 320 | basin, cane mirror |
| img-017-45.jpg | img-017 | newly built, 320 | bench and painting |
| img-001-45.jpg | img-001 | newly built, 320 | porch, glass doors |
| img-019-45.jpg · img-021-45.jpg · img-020-45.jpg | img-019, -021, -020 | the wave, 320 | beach; alt never says Kabalana |

Excluded, as the brief says: img-009 (a private double room, which can't be booked), img-022 (a third-party
resort dominates it), img-015 (weak), img-006 (a near-copy of img-003), img-014 (a near-copy of img-012). Nothing is full-bleed.
The largest photo is 1024 px wide, and none is drawn wider than 512 CSS px.

## gaps

- **No WhatsApp, no email** (dossier gaps): booking is the OTA listings plus `tel:+94778553343`, with no prefill
  (none is possible). The "Check dates" button is a real link to the Hostelworld listing. With JS it opens the drawer:
  the three listings (URLs copied from `copy/en.json` `bookingLinks[]`, checked character for character
  against dossier `booking.engine_url` / `other_engines`), the rates sentence, and the phone.
- **No rates**: none shown. The offer block's second paragraph ("Rates move with the season…") sits in the
  drawer, the phone sheet and the footer drawer, per the brief.
- **No bed count**: none shown. One berth drawn, never a row of them.
- **No season**: omitted.
- **No coordinates**: the map is a text link (the address) to the dossier's `map_url`; there is no drawn pin.
- **No gate photograph**: the directions section has no picture.
- **Rating capture dates** are not shown next to the scores (playbook §2). That belongs to 4g.
- **Reduced-motion curtain**: bunched open against the ladder, it reads as a dense bar. 4g could widen
  the open bunch (a look fix, not a content one).
- The forecast headline uses the checked-in fixture values (fetched 2026-09-21): 0.7–1.1 m, Monday 20:30,
  swell 12.6 s from 184° (south), wind 6.5 km/h, shown as 7, from 270° (west), cross-shore, generated 19:55 local. At 4g it goes live.

## conflicts

1. **The drawer without JS.** Brief: "JavaScript off / no canvas: … the drawer is `<details>`." Built: with
   JS off the drawer's panel is simply **open** under the berth (three listings + rates sentence), and every
   "Check dates" is a plain link to Hostelworld. A `<details>` needs a `<summary>` label, which would
   be a second "Check dates" control or a new line not in `en.json`. Cost of the alternative: one extra
   interface label and a duplicated control on the first screen.
2. **The ladder has two rails.** Brief: "a black 2 px ladder upright on one edge … three rungs, reaching
   right." Built: 2 px rail on the berth's edge, three rungs, and a second 2 px rail at the rungs' ends,
   running from the berth's top to the foot of the drawer. With one rail, round 1 read as a ruler. The rungs
   still step in 80 ms apart; the second rail draws down after them.
3. **The curtain hangs from the berth's top edge**, not from a rail just above the print. It is still over the
   right third only and never under the words. Hanging it from the box reads as the berth's own curtain.
4. **Pinned room section on a phone.** The brief doesn't say. On a phone the five room photos are a swipe row
   of 240 px prints with a peek (references.md #14). The sticky frame would sit over the text at 390 px.
5. **The phone sheet.** "Rises from the bottom bar on a phone": built as a fixed sheet above the bar
   (Esc closes it, focus moves in and returns). On desktop, "Check dates" in the top line scrolls back to the berth and opens
   the drawer there, so the drawer always comes out of the berth's foot.
6. **Copy placement, not wording.** Hostelworld's seven categories are shown once, inside the `about` body
   where the copy has them, not again as a separate guests sentence. The intro body opens the room section as
   its lead. `stayInfo.note`'s "Reception has limited hours" isn't shown: the practicalities body already
   covers cards, smoking and taxes, and that one phrase would be the only new fact. Flagging it rather than
   dropping it silently.
7. **Words not in `en.json`**, all interface labels or data formatting, no sentences: "Check dates" (button),
   "or call", "Call", "on Hostelworld / Booking.com / Google", "N reviews", "Check in from / Check in until /
   Check out by", review attributions ("Beth, England, on Hostelworld, April 2026", from the testimonial
   fields), the phone shown as "+94 77 855 3343" (the link is `tel:+94778553343`), the forecast lines (data +
   playbook §4's two fixed strings: the credit and the fallback link) and "Rosa, updated 21 September 2026, 19:55".

## default-look warnings

`check-design` reported none for interactive: Urbanist on h1, h2 and body; ground hsl(233 21% 93%), not
cream; 0 all-caps labels; 0/7 labelled headings.

## hand-off check 6 — against the other businesses and gold

Opened: KA calm round 7, KA interactive round 8, KA unique round 9 (picked), and the gold Lavish Haven
forecast shots.

- **KA**: all three KA first screens are a white page with a big Outfit headline and **green**: a field,
  slats or leaves, plus a watermelon button. Layday has no green. Its first screen is one square-cut yellow box
  with the words inside it, a black ladder on its edge, and a violet button.
- **Near-miss, stated:** KA interactive ("Planks") also puts vertical elements over photographs that answer the pointer.
  The differences: KA's are thick green slats turning across a full-width run of five photos. Layday's are 1 px
  ink lines gathered into folds on hooks, over **one** photo inside the box, and they part sideways
  like cloth. Section order differs too (Layday: room → door → built → guests → wave → practicalities).
- **Shared with KA, from the house layers, not the form:** a cool-white ground, a light geometric sans, and the
  "Check dates / or call" booking wording (the copy's own `bookingLinks` labels).
- **Gold (Lavish Haven)**: no pool window, no water, no Jost, no blue. The gold page's forecast sits in a
  noon-blue panel. Layday's sits on the page ground with the headline in Urbanist 200. The Rosa widget is
  the same in both, because it has to be (shown exactly as Rosa ships it). No first-screen device, section order, palette or typeface is reused from gold.

## lazy load and other checks (2026-09-22, headless Chromium, served over http)

- 390×844 load with no scroll: **0 requests to rosa**. Hosts contacted: 127.0.0.1, fonts.googleapis.com,
  fonts.gstatic.com.
- After scrolling the widget into view: 3 Rosa requests, the first `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`.
  The frame loaded (`.on` set) and shows in the round-4 to round-6 sheets.
- JS off: 0 Rosa requests, and the reserved 420×500 box shows "See today's forecast for Kabalana on Rosa".
  On `file://` the script doesn't set the frame's `src` either, so the link stays.
- Drawer: opens under the berth on "Check dates" (1440), focus goes to "Check dates on Hostelworld", Esc closes it.
  Phone sheet: rises on the bar's "Check dates" (390), focus goes to the first listing, Esc closes it.
- Every href on the page: Hostelworld, Booking.com and Agoda listing URLs, `tel:+94778553343`, the dossier `map_url`,
  `https://rosa.surf/spot/kabalana`, `#`. The listing URLs match the dossier exactly.
- Not done: tapping through to the OTAs on a real phone. Keyboard pass and audit-mockup are 4g's.
