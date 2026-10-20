# Layday Surf Ahangama v2 · calm · "Samples"

Station 4e, designer 0.6.1, run `2026-10-lk-surf-01`, 2026-10-20. Concept 1 of `../../concepts.md`
(tasteskill direction *The specimen catalogue*, seed 95956834, sheet `.taste-skill/layday-v2-calm-specimen-catalogue/`).
Idea: the room's own materials (lime plaster, cane, concrete) become specimen tiles on a sample board.
One file: `dist/index.html`; images from `src/make-media.sh` (`# media:` header).

## look-log

1. **First screen, round 1.** h1 broke into three lines with a dangling "A two-" hyphen; the lower
   two-thirds of the left half was empty; the plaster swatch read as a blank colour-picker on the phone.
   Not yet better than round 3 "Inside" at a glance. Changed: non-breaking hyphen, h1 to 5vw.
2. **Round 2.** Two-line h1, berth tile strong; but the tagline sat at the foot (tasteskill: the
   supporting sentence belongs under the headline) and wrapped "in / Ahangama". Moved the tagline under
   the h1, balanced it; the phone mosaic cropped the berth to its ceiling.
3. **Round 3.** Phone mosaic rebuilt as two offset columns of 3:4 tiles (berth + basin left; plaster,
   cane lockers right, 48 px lower), so every swatch sits beside the photograph of its material.
   Beside round 3 "Inside" (a drawn box, no photograph): this first screen shows the room itself,
   large, on its own colours, with the place, a 10/10 and "Check dates". Clearly better at a glance.
4. **Whole page, round 1.** Wave section left half empty; booking section left-heavy; footer "y"
   descenders cut; on the phone "Newly built, and kept that way" ran off the right edge (grid
   min-width). Fixed: wave heading/statement side by side, booking note + Taiya's quote in two
   columns, footer letters re-seated, `min-width:0` on the column.
5. **Whole page, round 2 (inspector + skills).** Eyebrow-like "Check-in" labels folded into the
   times line; 18 font sizes cut to 8; one blank gap closed; 768 px now stacks at ≤900.
   Early-scroll CLS was 0.19: traced to `scroll-behavior:smooth` on `html` defeating scroll
   anchoring while the font swapped; removed (buttons scroll smoothly by JS) and added a
   metric-matched fallback face per weight → 0.0003.
6. **Last round, against the old site and round 3.** There is no business website
   (`existing_site.url` null); the comparison is the OTA listings (thumbnails in a grey grid) and
   round 3 `../../../layday-surf-ahangama/mockups/` (calm: one 288 px print; unique "Inside": a
   drawn berth, violet accent, 1 px ink rules). This page beats both on the first screen (the room's
   own photographs and materials at native size) and on the whole page (room gallery with dots, the
   disc chooser, dated ratings, a real stay chooser). It is the quietest of the three; its weakest
   part is below the fold, where sections are plainer than interactive's.

Inspector (`.claude/skills/design-taste-frontend/scripts/inspect.mjs`), last run: 0 FAIL except
`covered-text` at 768/390 — the text is under the fixed phone booking bar, which playbook §3 and
references #4 require (precedence: playbook over skill). Its "no gradient" rule: no gradient used.
WARNs defended: no-footage (the business has no video, concepts §2); side-scroll = the room
gallery's scroll-snap row (custom.md asks for slideshows); off-centre / empty-middle = the hero
mosaic deliberately cropped by the right edge and the gallery row; blank-gap 516 px = booking-field
padding + footer gap at 1440; lopsided at 768 = the practicalities column.

## skills

| Skill | What it flagged / gave | What changed |
|---|---|---|
| tasteskill draw (`--show` of the 4d sheet) | specimen-catalogue hero, statement with inline thumbnails, object on a disc, photo strip + three-cell bar, block wordmark | built as dealt, with the 4d replacements (portrait + offset quote instead of paper slips) |
| `inspect.mjs` | eyebrows over the times, 18 sizes, headline 3 lines at 768, 768 overflow, blank gap, covered text | all fixed except the foot-bar `covered-text` (playbook wins) |
| `/animate` | frequency gate: crossfade ambient, disc and stepper occasional; strong ease-out/in-out tokens, no `ease-in`, no `scale(0)` | tokens `--ease-out`, `--ease-io`; stepper 180 ms text morph; press 140 ms |
| `/design-motion-principles` | Jakub primary, Jhey once, Emil for controls | reveals 560 ms rise 20 px stagger 70 ms; disc 300 ms |
| `/find-animation-opportunities` | "Leaving" date teleports | 180 ms fade-rise on change; rejected: counting ratings, heading reveals (custom.md), hover lifts |
| `/impeccable typeset` + detect | `/10` set at a relative size that resolved tiny; leading 1.22/1.25 on statements; white letters on yellow/grey in the footer (1.6–1.9:1); marquee | fixed size token; leading 1.3; footer letters now ink; marquee kept (concept's one moving picture, pauses on hover, off under reduced motion) |
| `/impeccable layout`, `polish` | rhythm and stacking at 768 | section gaps 80–140 px; ≤900 stacks |
| `/mobile-native` | tap highlight, `touch-action`, long-press select, `interactive-widget` | baseline added; inputs already ≥16 px; hovers already gated |
| `/emil-design-eng` | checklist: no `transition: all`, no `ease-in`, exits faster than enters | passed |
| `/impeccable critique` (A + B sub-agents) | A: no script face; red reads as alert; footer reads as a bar chart; "tiny text" (a contact-sheet misread: body is 17–18 px); native date field. B: footer contrast, 37 px disc tabs | footer letters → ink; tabs → 44 px; script face / red kept (concept, see conflicts) |
| `/review-animations` | not run: the skill refuses model invocation (`disable-model-invocation`); Shahar must run `/review-animations` himself | — |

## images

All business-owned Booking.com listing photos (`license: business-owned`, Shahar approved OTA photos
2026-09-19), cropped near the centre, never above native size:
img-002, img-008, img-018 (berth crossfade, 3:4 576 px); img-013, img-003, img-005 (tiles);
img-012, img-013 (inline thumbs); img-012, 005, 011, 002, 018, 008, 017 (gallery, 4:5 576 px);
img-002, 013, 003, 017, 001 (disc, 576 px squares); img-017 (guests, 3:4); img-013, 017, 005, 007
(amenity bullets); img-019, img-021 (wave, 1024); eleven strip prints (150 px tall). No stock, no
atmosphere. Beach frames are never captioned or named as Kabalana.

## gaps

No video (pitch point); no rates (the copy's "Rates change with the dates" + listing links); no
WhatsApp/email (phone + three listings); no season (omitted); no Instagram (custom.md's feed section
cannot exist); no bed count (none shown); no photograph of the gate (the directions section has
none); no `audit.json` (primary action assumed "Check dates", engine, 2 taps).

## conflicts

- **Ratings, copy vs dossier:** copy says Hostelworld 9.8; the dossier re-read on 2026-09-25 says
  10/10 (10). The page shows the dossier value with "read 25 September 2026". Not blocking.
- **Taiya's quote:** "I was only supposed to stay a night and just kept expecting and ended up here
  a week." is the dossier's verbatim first sentence (`reviews.quotes[0]`, truncated by Booking after
  it); the copy's testimonial for Taiya is her other quote. Used beside the nights control as
  concepts.md asks. Not blocking; the copyeditor may want to confirm.
- **OTA dates:** Booking.com `checkin/checkout/group_adults/no_rooms/group_children` verified live on
  2026-10-20 (the listing showed "Tue 10 Nov — Fri 13 Nov"). Hostelworld (`from/to`, `dateFrom/dateTo`)
  did not take dates; Agoda's dossier URL redirected a headless browser to the Ahangama city page.
  Both get the plain dossier URL; Agoda's link should be re-checked by the auditor.
- **custom.md vs concept type:** custom.md asks for a text face + an expressive display face (a
  script welcome); concept 1 is Pilcrow Rounded alone (tasteskill one-family). Built as the concept;
  critique A flagged it. Not blocking; a choice for the pick.
- **Accent red `#D91628`** (the painting's red) — critique A thinks it reads as an alert colour.
  Kept per concept; not blocking.
- **Gallery ratio:** concept asked 16:10 at up to 1024; seven portraits cropped to 16:10 would be
  576 px wide and upscaled, so the gallery is 4:5 at ≤576 (no upscaling). Not blocking.
- **Phone booking:** concept asked a full-screen sheet; the header and foot-bar "Check dates" scroll
  to the stay chooser and focus arrival instead. Not blocking.
- **Fonts from Fontshare** (not Google Fonts) at 4e; 4g self-hosts.
- No blocking conflicts.

## hand-off checks

1. Look loop: 3 first-screen + 3 whole-page rounds above; recipe `src/make-media.sh`; last sheets
   looked at for overflow/overlap; every named flaw fixed or listed above.
2. Booking targets identical to the dossier; tapped through at 390: foot bar → arrival focused →
   Booking.com href carries the dates; Hostelworld/Agoda/`tel:+94778553343` plain.
3. `tools/check-design.mjs layday-surf-ahangama-v2`: 0 problems, 0 warnings.
4. `tools/check-places.mjs`: pass (no borrowed images).
5. Reduced motion (static berth, no marquee, no reveals) and no-JS (bar hidden, plain listing links)
   looked at; no WebGL used. `audit-mockup` scroll CLS early 0.0003, settled 0.
6. Other businesses: KA v2 opens on a mint field / centred story frame / contact sheet in leaf
   green with an orange button; Lavish v2 on pool blue and a script name. Layday calm is a white /
   pale-grey split with yellow plaster, cane and concrete tiles and a red button: no green, no blue,
   no script, no single framed print.
7. No video exists; first screen = the strongest own photographs at native size; why it beats the
   current presence: round 6 above.

---

# Round 2 (4f round 1 → designer), 2026-10-20

Read in full: `reports/2026-10-lk-surf-01/layday-surf-ahangama-v2/{critic-4f,visual-4f,experience-4f}.md`
(calm: critic 71.5/80, visual 6, experience 6). Shot and inspected over http (`python3 -m http.server`
on `mockups/`), not `file://`.

## look-log, round 2

7. **First screen rebuilt as one composition** (visual fix 1, experience fix 1–2). Statement,
   tagline, rating and the two buttons on the left; the berth (`img-002`, crossfading to `img-008`)
   and `img-018` side by side at native 3:4 on the right, the second 48 px lower. The swatch tiles
   are gone (they read as failed images). The phone first screen is h1, tagline, rating, "Check
   dates" + "Call", then the berth photograph (4:5, 576 native) under them; the foot bar sits below
   the photo. First look: the phone page scrolled sideways by 67 px (the nowrap amenity items),
   which pushed the foot bar off the screen — fixed (`min-width:0`, wrap on phones).
8. **Whole page.** Booking colour now teak `#75421B` (the dormitory's end door, `img-005`; white on
   it 8.6:1) instead of the painting red. Section titles in Caveat 600 (custom.md's script for
   section titles), Pilcrow Rounded for everything else; body 17–18 px, small text 16 px. The
   inline photo chips and the yellow ring are gone: "The room" is a statement and two columns;
   "Newly built" is the chooser beside a plain square photograph. "The wave" now comes before
   Guests and Practicalities (playbook §3). Ratings are three large figures (no grey cards), the
   amenities one compact " | " list (separators stay at line ends). Footer blocks are one even
   row of material tiles with ink letters (no longer a bar chart). Every "Check dates" opens a
   booking sheet (bottom sheet on a phone, 320 ms drawer curve; centred on a laptop) instead of
   the 8,000 px scroll; Booking.com (dates carried) is the one primary button, the other two
   listings secondary.
9. **Inspector + audit round.** Wave statement 4 lines → widened to 3; early-scroll CLS 0.018
   (a statement re-wrapping when Pilcrow arrived) → self-hosted faces with `font-display:optional`
   and preload, metric-matched fallback → 0. Gallery arrows hidden under 600 px (the dot row and
   arrows overflowed the phone); dots 44 × 44. Last look: the room, the materials and teak read as
   one place; below the fold it is quiet but every section now has its own composition.

## skills, round 2

| Skill | What it flagged / gave | What changed |
|---|---|---|
| `inspect.mjs` (http) | statement over 3 lines; covered text (foot bar); side-scroll/empty-middle = the gallery row | widened; foot bar kept (see conflicts) |
| `/animate` + `/design-motion-principles` (round 1 rules applied) | sheet: occasional → 260 ms in / 180 ms out on a laptop, 320 ms drawer / 200 ms out on a phone; listing buttons stagger 40 ms | built |
| `/mobile-native` | overflow pushed the fixed bar off-screen; arrows too wide for the dot row | fixed |
| `/impeccable detect` | marquee (kept, concept's one moving picture, pauses on hover, off under reduced motion); stacked crossfade images; cramped padding on full-bleed fields (false positives) | — |
| `/review-animations` | still not runnable by an agent | — |

## conflicts, round 2

- **`covered-text` (inspector FAIL at 768/390): kept.** It is the fixed phone booking bar passing
  over a heading at one scroll stop. Playbook §3 requires the bar; the page is padded by the bar's
  height (`body` padding-bottom and `scroll-padding-bottom`) so nothing ends hidden under it. Not
  blocking; Shahar may rule otherwise.
- **Fonts:** Pilcrow Rounded (Fontshare, ITF FFL) and Caveat (OFL) are self-hosted from
  `../make-fonts.sh` (subset Latin, 82 KB). `font-display:optional`: on a first visit over a very
  slow link the metric-matched fallback may stay for that visit; that is the price of zero jump.
- Earlier conflicts still stand (ratings 9.8 vs 10, Taiya's dossier sentence, Hostelworld/Agoda
  without dates). The "single family" and "red" conflicts are resolved (Caveat added, teak).

## hand-off checks, round 2

1. Look loop: rounds 7–9 above (first screen rebuilt, then whole page), recipe updated
   (`src/make-media.sh` adds the phone hero crop; fonts from `../make-fonts.sh`).
2. Booking: tapped through at 390 over http — foot bar → sheet with arrival focused → Booking.com
   carries `checkin/checkout`; Esc closes, focus returns. Links identical to the dossier.
3. check-design (`--no-shots`): 0 problems, 0 warnings. 4. check-places: pass.
5. `audit-mockup`: scroll CLS early 0, settled 0; fonts 82 KB; first load 600 KB; LCP 1.35 s;
   third-party hosts on load: none; tap targets under 44 px: 0.
6. Other businesses unchanged in kind (KA mint/green, Lavish pool blue); calm Layday is now white
   with the berth photographs, teak buttons and a hand-script title face.
7. No video exists; first screen leads with the two strongest own photographs at native size.

---

# Round 3 (4f round 2 → designer, calm only), 2026-10-20

Read in full: `reports/2026-10-lk-surf-01/layday-surf-ahangama-v2/{visual-4f-r2,experience-4f-r2,critic-4f-r2}.md`
(calm: visual 7, experience 7, critic 76.5/80). Interactive and unique untouched. Shot, inspected and
audited over http.

## look-log, round 3

10. **The one moment that pulls you in** (fix 1). "The room" is now a stage: the three landscape
    views of the dormitory (`img-012`, `img-018`, `img-017`, 4:3 at native 1024) crossfading every
    5.2 s (1.4 s ease-in-out, paused when the tab is hidden, dots to choose, still under reduced
    motion), with the room text pulled beside it. **Hero** (fix 3): two equal halves, h1 to 6.1 vw
    (96 px max), tagline 22–32 px, rating at body size; the left half is no longer mostly white.
11. **Real layouts** (fix 2). "Just one dorm": a crossfading 4:5 gallery at native 576 px (dots,
    arrows, keys, swipe) with 20–26 px text pulled close beside it (grid `576px + 520px`, start-
    aligned). "Newly built": chooser text at the lead size beside the 576 px specimen, pulled close.
    The 2,051 px empty middle is gone (inspector: no `empty-middle`); the 512 px gap near the foot is
    closed (footer wordmark 300 → 170 px tall; inspector: no `blank-gap`).
12. **Booking and fonts** (fixes 4–6). The booking section is on plaster yellow; the thumbnail strip
    sits inside the grid with rounded ends. One date chooser only: the section's "Choose your dates"
    pill opens the sheet, and the pill then reads e.g. "10 Nov – 14 Nov, 4 nights"; every Booking.com
    link on the page carries the dates. The native `mm/dd/yyyy` field is replaced by a styled date
    pill ("Arrival / Tuesday 10 November", the native picker opens on tap). Caveat and Pilcrow are
    now `font-display: swap` with preload and size-matched fallbacks (Caveat fallback: Georgia
    italic at 84.8 %), so the script titles show on a slow first visit; scroll CLS stays 0. The page
    bottom is padded by the bar's height on phones (`body` padding-bottom 76 px + safe area,
    `scroll-padding-bottom` 96 px).

## skills, round 3

| Skill | What it flagged / gave | What changed |
|---|---|---|
| `inspect.mjs` (http) | blank gap near the foot; tagline orphan; then only `covered-text` at 768 (bar over "The room" at one stop) | gap closed, tagline balanced; bar kept |
| `/animate` | stage crossfade: ambient, purpose = show the one room, opacity only, 1.4 s ease-in-out, paused off-tab, none under reduced motion | built |
| `/mobile-native` | date pill: native input stays underneath (opacity 0) so the OS picker and keyboard work; ≥ 44 px | built |
| `/review-animations` | not runnable by an agent | — |

## conflicts, round 3

- `covered-text` (inspector FAIL at 768): the fixed booking bar over a heading at one scroll stop.
  The page is padded so nothing ends under it; the bar is playbook §3. Not blocking.
- Earlier conflicts unchanged (ratings 9.8 vs 10, Taiya's dossier sentence, Hostelworld/Agoda
  without dates, first screen not full-bleed: no photograph ≥ 1200 px exists).

## hand-off checks, round 3

1. Look loop rounds 10–12; recipe `src/make-media.sh` adds the three 4:3 stage crops.
2. Booking at 390: foot bar → sheet, date pill focused; 2026-11-10 + 4 nights → "Leaving Saturday
   14 November", pill "10 Nov – 14 Nov, 4 nights", Booking.com `?checkin=2026-11-10&checkout=2026-11-14…`;
   Esc closes, focus returns. Links identical to the dossier.
3. check-design: 0 problems, 0 warnings. 4. check-places: pass.
5. `audit-mockup`: scroll CLS early 0, settled 0; fonts 82 KB; first load 714 KB; LCP 1.37 s;
   third-party on load: none; tap targets < 44 px: 0.
6–7. As before.
