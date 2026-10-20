# Layday Surf Ahangama v2 · unique · "Name in plaster"

Station 4e, designer 0.6.1, run `2026-10-lk-surf-01`, 2026-10-20. Concept 3 of `../../concepts.md`
(tasteskill direction *The name as a monument*, redrawn from *place carries it*, seed 1700297439).
Idea: the berths' yellow lime plaster becomes the field the name stands in, and that field opens into
the booking. One file: `dist/index.html`; images from `src/make-media.sh` (`# media:` header).

## look-log

1. **First screen, round 1.** Band of three room prints edge to edge works; but "Layday" at 19 vw
   (Boska is narrow) filled only half the width — a monument that does not reach the edge — and the
   y descenders were cut by the screen. Moved the sentence and button beside the name.
2. **Round 2.** Name at 24.5 vw beside the sentence block: reads as one composition in the plaster.
   Descenders still cut at 900 px tall.
3. **Round 3.** Name sized `min(23vw, 38svh)` with room for descenders; phone: one print at full
   width for 50 svh, sentence, name at 29 vw, foot bar. Beside round 3 "Inside" (drawn berth, no
   photograph, violet): the room itself, large, on its own yellow. Clearly better at a glance.
4. **Whole page, round 1.** Field-opening panel: close button clipped (fixed), phone stay cells
   overflowed (one column), plate tabs numbered 1–7 (tasteskill bans index numbers → dots).
5. **Whole page, round 2 (inspector + skills).** 768 overflow (plate min-width) fixed; statements
   over 3 lines cut to ≤32 px; nav moved off the photographs into the yellow field (white on the
   light prints failed contrast); body to Boska 500 for readability (critique A); the plate held at
   576 px (it drew 576 px files at 662). Early-scroll CLS 0.028 traced to late Boska faces → faces
   declared inline and preloaded, with a metric-matched fallback → 0.
6. **Last round, against the old site and round 3.** No business website; against the OTA
   thumbnails and round 3 "Inside" the first screen is the strongest single image of the round
   (critique A) and the booking now lives inside the business's own colour. Below the fold it is
   calmer than interactive; the guests field is dense.

Inspector, last run: 0 FAIL except `covered-text` at 390 (fixed phone booking bar, playbook wins).
WARNs defended: no-footage (no video exists); off-centre 12/29 px = the monument set −0.05 em into
the margin for optical alignment.

## skills

| Skill | What it flagged / gave | What changed |
|---|---|---|
| tasteskill draw (`--show`) | name under a photograph, narrow column, side facts + wide paragraph, lead quote + corners, phone number as display | built; Boska only; scaling wordmark replaced by the band drift (KA v2 has it) |
| `inspect.mjs` | 768 overflow, numbered tabs (house rule), statements over 3 lines, covered text | fixed all but the foot-bar `covered-text` |
| `/animate` | gate: field opening occasional (420 ms drawer curve, accordion exemption for `grid-template-rows`); band drift scroll-linked transform only | close 280 ms `--ease-out` (exit faster); controls stagger 50 ms after the field grows |
| `/design-motion-principles` | Jakub primary, Jhey once | the phone number's characters lift 6 px, 18 ms stagger, on hover/focus only |
| `/find-animation-opportunities` | "Leaving" teleports | 180 ms fade-rise |
| `/impeccable typeset` + detect | white nav on light prints 1.9:1; leading 1.18/1.25; italic serif display titles (saturated pattern) | nav on the field in ink; leading 1.3; italic titles kept (concept names Boska italic for section titles) |
| `/mobile-native` | tap highlight, `touch-action`, plate swipe axis | baseline; `touch-action: pan-y` on the plate |
| `/emil-design-eng` | exits faster than enters | panel close 280 ms vs open 420 ms; reduced motion instant |
| `/impeccable critique` (A + B) | A: Boska body hard to read, no script face, guests field dense, Rosa empty under file://; B: plate upscaled 1.15×, inputs 36 px tall inside 84 px cells | body Boska 500; plate ≤576; script / density kept (see conflicts) |
| `/review-animations` | not run: refuses model invocation; Shahar must run it | — |

Playwright states looked at: the field mid-open (grown, controls not yet in), open with arrival
focused, Esc closes and focus returns to the opener; phone opening in place.

## images

Business-owned Booking.com photos, centre crops, never above native: img-002, 013, 011, 008, 005
(band, 4:5 576 × 720; the fifth only drifts in); img-020 (1024); img-012, 018, 017 (plate 768) and
img-005, 011, 002, 008 (plate 576); img-019, img-021 (1024). No stock.

## gaps

As calm.

## conflicts

- Ratings 9.8 (copy) vs 10/10 (dossier): dossier shown with "read 25 September 2026".
- Beth's lead line is a verbatim fragment with ellipses ("… I extended my stay way longer than
  expected and didn't want to leave …"); her full quote follows in the same field.
- Taiya's dossier sentence beside the nights control (see calm).
- OTA dates: Booking.com verified live; Hostelworld and Agoda plain (Agoda's URL to be re-checked).
- custom.md asks for a readable text face + an expressive display face; the concept is Boska only
  (roman + italic). Body set at 500 to read better; a second family would be a concept change.
  Not blocking; a choice for the pick.
- Nav links moved from the photographs (concept) to the yellow field, for contrast.
- Phone: the field opens in place and scrolls into view instead of a bottom sheet (same yellow,
  keeps the continuity idea). Not blocking.
- Fonts from Fontshare at 4e (declared inline and preloaded); 4g self-hosts.
- No blocking conflicts.

## hand-off checks

1. Look loop: 3 first-screen + 3 whole-page rounds; recipe present; flaws fixed or listed.
2. Booking targets identical to the dossier; phone tap-through: foot bar → field opens → arrival
   focused → Booking.com carries the dates.
3. check-design: 0 problems, 0 warnings.  4. check-places: pass.
5. Reduced motion (band still, field opens instantly) and no-JS (field shown open with the four
   plain links; date controls hidden) looked at; no WebGL. `audit-mockup` scroll CLS early 0,
   settled 0.
6. KA v2 "The roll" fills the screen with a six-column contact sheet of garden frames and a centred
   card; Lavish v2 "Do not disturb" sets a script name on a hang tag beside a night-pool print.
   Layday unique is a band of room prints over a full-width berth-yellow field with a giant serif
   name, no green, no blue, no script, no card.
7. No video exists; first screen = three own photographs edge to edge at native size; why it beats
   the current presence: round 6 above.

---

# Round 2 (4f round 1 → designer), 2026-10-20

Read in full: the three 4f reports (unique: critic 64.7/80 and back for scroll CLS 0.031; visual 7;
experience 7). My round-1 "early 0" was measured with Fontshare's CSS still able to change between
runs; the critic's 0.031 is the right figure for that build. Shot and inspected over http.

## look-log, round 2

7. **Type.** Boska kept for the name, section titles, the guests' lead line and the phone number
   (400 roman + 400 italic); everything people read is General Sans 400/500 at 17–19 px (critic
   and experience fix 1). Both self-hosted and subset (56 KB, was 196 KB from seven Fontshare
   faces), preloaded, with metric-matched fallbacks. Scroll CLS 0.031 → 0.0058.
8. **Hero and booking.** The name fades as the first screen scrolls away, so no still shows a
   sliced "y"; the giant footer name is gone (the footer is the name at heading size, whole).
   "Bed in the dormitory" and "Check dates" are one yellow card. On a phone "Check dates" raises
   the same yellow field as a bottom sheet (340 ms drawer curve, scrim, the page behind made
   inert, Esc/close/scrim close it, focus returns); on a laptop it still opens in place.
9. **Guests and the rest.** The yellow guests field is now: title at heading size, three ratings
   as figures, Beth's line large (≤ 2 lines on a laptop, 24 px on a phone), the housekeeping
   paragraph, then a swipeable row of the four full quotes with dots. `<dl>` in Finding the door
   holds only its dt/dd pairs (the button follows it). Rosa: live headline with the 24 h rule as
   interactive, designed card under the widget. "The walk" column widened so its title holds two
   lines; amenities as one " | " list.

## skills, round 2

| Skill | What it flagged / gave | What changed |
|---|---|---|
| `inspect.mjs` (http) | the closed booking panel's text and the phone scrim counted as covering content (hidden now with `visibility`); eyebrow from ratings wrapping at 768 (ratings now figure-over-label columns); lead quote 3 lines at 390 | fixed |
| `/animate` | phone sheet: occasional, spatial (it comes from the bar it was opened from), transform only, exit faster (220 ms) | built |
| `/mobile-native` | sheet `overscroll-behavior: contain`, safe-area padding, inert background | built |
| `/impeccable detect` | italic serif display titles (kept: concept names Boska italic for titles, now with a sans text face beside it), stacked plate images, cramped padding (false positives) | — |

## conflicts, round 2

- `covered-text` at 390 (foot bar over the walk title at one scroll stop): kept, as calm.
- `name-only-title` WARN: "Layday" with the copy's sentence under it.
- Rosa live headline at 4e: as interactive.
- Earlier conflicts on facts and OTA dates unchanged; the one-family conflict is resolved
  (General Sans added as the text face).

## hand-off checks, round 2

2. Booking: phone foot bar → yellow sheet, arrival focused, page behind inert; Esc closes and focus
   returns; Booking.com carries the dates. 3. check-design: 0/0. 4. check-places: pass.
5. `audit-mockup`: scroll CLS early 0.0058, settled 0; fonts 56 KB; first load 551 KB; LCP 1.24 s
   (was 2.36); third-party on load: none; tap targets < 44: 0.
6–7. As round 1.
