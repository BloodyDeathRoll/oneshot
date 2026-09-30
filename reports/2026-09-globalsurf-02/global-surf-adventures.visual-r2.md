# Global Surf Lodge Kabalana — visual-critic, station 4f, round 2

visual-critic 0.1.0 · run `2026-09-globalsurf-02` · 2026-09-29 · quick mode · independent (critic / experience-critic reports not opened)

Shots: `reports/2026-09-globalsurf-02/visual-r2/` — `<mockup>-home/`, `<mockup>-book/` (tools/shoot.mjs, 1440 + 390, served on :8982), `try-your-week-book-walk/` (Playwright click-through of the step wizard), `current-home/` (globalsurf.com shot today) + `dossier/global-surf-adventures/assets/old-site-*.png` (lodge page).

Bar used: Shahar's 2026-09-29 calibration (every point a hard bar) and the current site — Maldives drone hero with a serif centred title, handwritten olive section titles, distinct tinted sections, Instagram strip, full footer (`current-home/desktop-sheet.png`, `old-site-lodge-desktop.png`). The current lodge page is weak (tractor hero, empty Rooms tab); the current **home** is the stronger half of the bar.

Summary: all three are big steps up from r1, and most of the calibration list is now met. None of them is a page a top studio would publish. Postcard and Try-your-week look like a clean booking-SaaS template: pale grey cards, small type, the same centred block repeated. The Sign has real art direction, but the loud sky-blue fields clash with the coral, the level cards are uneven and the closing band is badly composed. **Predicted Shahar verdict: none accepted as is. The Sign is the only one worth taking forward.**

---

## 1 · Postcard

**Three-second note.** Desktop (`postcard-home/desktop-00.png`): a bright, sunny pool with white daybeds. It is pleasant but reads as a hotel stock frame. The title "Surf weeks in Sri Lanka" is set in DM Sans with tight negative tracking and looks squeezed. The coral button is clean. On the phone (`mobile-00.png`) the video looks soft and upscaled, and the title sits on a white wall and palm. I would scroll on, but nothing makes me feel "surf".

**Calibration checklist**
| # | point | verdict | evidence |
|---|---|---|---|
| 1 | Title + one short CTA | met — "Book package now" | home/desktop-00 |
| 2 | No rating in hero | met | desktop-00 |
| 3 | Centred, modest title, no giant word | met (but tracking too tight) | desktop-00 |
| 4 | No overlay on video | met | desktop-00 |
| 5 | No title reveal animation | none observed in stills | desktop-00, mobile-00 |
| 6 | White on coral only | met | desktop-00, book/desktop-05 |
| 7 | Tasteful fonts + handwritten titles | partly — Caveat titles in teal are fine; DM Sans at 13–14 px body reads app-UI, not resort | home/desktop-01, 04 |
| 8 | Same fonts/colours through booking | met | book/desktop-sheet |
| 9 | No rules/underlines; buttons for actions | met | home/desktop-sheet |
| 10 | Designed contact + real footer | partly — the icon buttons are there, but the footer is a thin grey strip with no presence | home/desktop-13 |
| 11 | Distinct, well-designed sections | **not met** — white/grey alternation with the same centred-title + centred-paragraph block each time; reads template | home/desktop-sheet |
| 12 | Instagram feed | weak — six small tiles in a 960 px column | home/desktop-12 |
| 13 | Slideshows with dots | met | desktop-05, 07 |
| 14 | Compact " \| " details | met | desktop-07 |
| 15 | Forecast two-column, no stretch/lines | met | desktop-11 |
| 16 | Text over media centred, CTAs aligned | **not met** — the closing text sits in a white card that straddles the image edge, cut off at the top | desktop-12/13 |
| 17 | Rooms sold with several big images | partly — the slideshows have dots, but the photos are 440–640 px beside a lot of text | desktop-07 |
| 18 | Inclusions without images | met (icon list) | desktop-04 |
| 19 | Floating-label fields | partly — check-in is a grey select with a placeholder, not a floating label; steppers have a small top label | book/desktop-05 |
| 20 | Booking feels part of the site | met — same header, faces and coral; sticky summary card | book/desktop-sheet |

**Score 6/10** — competent template level, closest to a Webflow hotel template, below every gold page. **Would Shahar accept: no.** **Better than current: first screen yes (vs the lodge tractor); whole page no** — the current home's typography and sectioning have more character (`current-home/desktop-sheet.png` vs `postcard-home/desktop-sheet.png`).

**Top-5 fixes**
1. Scale up. Make room slideshows ≥ 60 % of the width at ≥ 800 px, the level cards taller, and body text 17–18 px desktop. Now everything sits in a 960 px column of small type.
2. Give each section its own layout: a full-bleed photo band, an asymmetric split, an image-led spread. Stop repeating "centred script title + centred paragraph".
3. Hero title: normal or positive tracking, and a heavier or more characterful face (or the script at display size). On the phone, move the title off the white wall or add a gentle bottom gradient.
4. Closing band: full-bleed image with the text and both buttons centred on it, not a white card half-off the image.
5. Instagram: a full-width square grid (6 × ~240 px or larger), edge to edge, like the current site's strip.

**Keep:** the pool-deck video hero, the Caveat teal titles, the level cards with footage + price + coral button, the booking page's sticky summary card and step structure, the icon inclusion list, the footer's icon buttons.

---

## 2 · Try your week

**Three-second note.** The hero (`try-your-week-home/desktop-00.png`) caught the surf half of vid-009e: a surfer on a whitewater reef wave, with a centred serif "Next set is yours", a short subtitle and a coral button. This is the best single frame of the three. Then the page drops into pale grey and white with small serif text (Newsreader), and the level stage is a soft, upscaled golden-hour clip (`desktop-01/02.png`). The mood falls off fast.

**Calibration checklist**
| # | point | verdict | evidence |
|---|---|---|---|
| 1 | Title + short CTA | met — "Choose your level" (not a booking CTA, but short) | desktop-00 |
| 2 | No rating in hero | met | desktop-00 |
| 3 | Centred, modest title | met | desktop-00 |
| 4 | No overlay | met | desktop-00 |
| 5 | No reveal animation | none observed | desktop-00 |
| 6 | White on coral | met | desktop-02, 10 |
| 7 | Tasteful fonts + handwritten titles | **not met** — the marker-style script ("Your room", "Getting here") looks childish, not the original's elegant hand; Newsreader body at small sizes reads dated | desktop-01, book-walk/desktop-step2 |
| 8 | Consistent through booking | met | book-walk/* |
| 9 | No rules/underlines | met | desktop-sheet |
| 10 | Designed contact + footer | **not met** — the footer has no ground and floats on white; the grey contact pills look unfinished | desktop-10/11 |
| 11 | Distinct sections | partly — the feature photo (hair flip) and the lodge split are good; the rest is grey/white repetition | desktop-sheet |
| 12 | Instagram | met (tile slideshow with dots), but small | desktop-09 |
| 13 | Slideshows with dots | met | desktop-03, 04 |
| 14 | " \| " details | met | desktop-02 |
| 15 | Forecast two-column | met | desktop-08 |
| 16 | Text over media centred, CTAs designed | **not met** — the closing line is two long serif lines over busy palm fronds; legibility poor | desktop-10 |
| 17 | Rooms sold | met on home (pill switcher, big gallery) and on booking step 2 | desktop-04, book-walk/desktop-step2 |
| 18 | Inclusions without images | met | book-walk/desktop-step1-full |
| 19 | Floating labels | partly — steppers have top labels; check-in is a placeholder in a grey box, with a red "Choose a Saturday" warning shown before any input | book-walk/desktop-step3, step4 |
| 20 | Booking feels part of site | met — step pills and a bottom bar; but step 3 is 60 % a decorative photo | book-walk/desktop-step3 |

**Score 5.5/10** — the hero is good, but the body is template-level with a type pairing that works against it. **Would Shahar accept: no.** **Better than current: first screen roughly equal to the current home (both are surf/drone video with a centred serif); whole page no.**

**Top-5 fixes**
1. Replace the marker script with a refined handwritten face (as in the original / The Sign's brush script), and move body text to a clean sans at 17–18 px.
2. The level stage: use the m1280/d1920 renditions or cap the stage at the clip's native width. The 1120 px stage blows up a soft clip.
3. The closing band: one short line (≤ 6 words) centred with a dark scrim, or move the WhatsApp sentence below the image.
4. A real footer: a tinted or dark ground, the logo, icon buttons in white, the social icons, a legal row.
5. Booking step 3: drop the decorative pool photo. Put dates first, then guests, and only show the red "Choose a Saturday" after an attempt to continue.

**Keep:** the hero, the level pill switcher, the room viewer with pills, the hair-flip feature photo, the numbered step pills and bottom total bar in booking.

---

## 3 · The Sign

**Three-second note.** The hero (`the-sign-home/desktop-00.png`) is the surf half of the clip with a white brush-script "Your surf week starts here", one short subtitle and a coral "Book your week". It feels like the lodge's own sign and the original's handwritten titles. It is the most place-specific first screen of the three, and I would keep scrolling. Below it the page is photo-rich: full-bleed pairs, big room galleries with a peek, and a full-bleed Instagram strip (`desktop-sheet.png`). The sky-blue section fields are loud next to the coral.

**Calibration checklist**
| # | point | verdict | evidence |
|---|---|---|---|
| 1 | Title + short CTA | met — "Book your week" | desktop-00 |
| 2 | No rating in hero | met | desktop-00 |
| 3 | Centred, modest title | met (script ~70 px, not a giant word) | desktop-00 |
| 4 | No overlay | met | desktop-00 |
| 5 | No reveal animation | none observed | desktop-00 |
| 6 | White on coral | met — but **coral buttons on sky-blue** (#9FE4F7-ish) clash | desktop-02 |
| 7 | Tasteful fonts + handwritten titles | met — brush script titles + clean grotesque; closest to the original. Flaw: "Follow" F reads as "+ollow" | desktop-14 |
| 8 | Consistent through booking | met | book/desktop-sheet |
| 9 | No rules/underlines | met | desktop-sheet |
| 10 | Designed contact + footer | met — blue footer, icon buttons, script column titles, legal row | desktop-16 |
| 11 | Distinct sections | met — full-bleed photo pairs, blue level field, room carousels, feature, lodge split, blue inclusions, Instagram strip | desktop-sheet |
| 12 | Instagram | met — full-bleed six-tile strip + Follow button | desktop-14 |
| 13 | Slideshows with dots | met | desktop-07, 08 |
| 14 | " \| " details | met | desktop-08, 10 |
| 15 | Forecast two-column | met | desktop-12 |
| 16 | Text over media centred, CTAs aligned | **not met** — the closing line sits low over palm fronds and is hard to read; the buttons cross into the next frame; the feature script line runs edge to edge over busy detail | desktop-14/15, desktop-09 |
| 17 | Rooms sold | met — large 3:2 carousels with a peek, 5–6 photos, description, price note | desktop-07, 08 |
| 18 | Inclusions without images | met | desktop-11 |
| 19 | Floating labels | met — label inside the field above the value ("Check-in (Saturdays) / Choose a Saturday") | book/desktop-04 |
| 20 | Booking feels part of site | met — split screen with a sticky lodge photo left and steps right, like a hotel's own desk | book/desktop-sheet |

Other polish issues: the level cards have unequal widths (Level 3 is twice as wide) and misaligned buttons (Level 3's sits 27 px higher), and the level footage is soft, with a dark rock blob in Level 2's crop (`desktop-02.png`). Booking step-1 cards use sky-blue selection fills, which makes the flow look like a kids' app (`book/desktop-00`).

**Score 7/10** — professional and specific to this place, closest in spirit to the current site's structure done better, still below gold (colour discipline and polish). **Would Shahar accept: no as is (likely "close").** **Better than current: yes** — first screen (`the-sign-home/desktop-00` vs `old-site-lodge-desktop-fold.png`) and whole page (`the-sign-home/desktop-sheet` vs `current-home/desktop-sheet`): richer media, sold rooms, prices, same handwritten warmth.

**Top-5 fixes**
1. Colour: replace the saturated sky-blue fields with a pale sand/off-white tint, or a deep navy for one or two feature sections. Keep coral on white or dark only. Booking selection states should use ink or a soft tint, not blue.
2. Level cards: three equal columns, equal clip heights, buttons on one baseline. Use sharper renditions and re-crop Level 2 to remove the rock.
3. Closing band: a darker image (or scrim), a short script line centred horizontally and vertically, both buttons centred under it inside the band.
4. Feature line: shorten it or set it at ≤ 60 % width, centred on a calm part of the frame (the water), not across the lamps.
5. Fix the script "F" (or swap glyph/weight), and give the booking step-1 level cards a thumbnail of the footage so the choice stays visual.

**Keep:** the brush-script hero and titles, the grotesque body, the full-bleed photo pairs, the room carousels with a peek, the Instagram strip, the split-screen booking desk with the sticky photo, the floating-label fields, the footer.

---

## Ranking (visual quality only)

1. **The Sign — 7/10.** The only one with art direction and the original's handwritten warmth. It fails on the sky-blue/coral clash, uneven level cards and the closing band; fix those and it can reach 8.
2. **Postcard — 6/10.** Clean, correct and compliant, but a template. Small type and repeated centred blocks: nobody would sell this as bespoke.
3. **Try your week — 5.5/10.** The best hero frame, then a childish marker script, dated small serif body, soft upscaled level video and an unfinished footer.

Result: **all three fail the 4f bar (below 8)**. Back to the designer. Take The Sign forward with its fixes, and borrow Try-your-week's level pill switcher and Postcard's sticky booking summary.

---

# Round 2 (re-score after designer fixes, 2026-09-29)

Re-scored from scratch on fresh shots: `visual-r2/round2/<mockup>-home|book/` (1440 + 390) and `visual-r2/round2/try-your-week-book-walk/` (click-through of the step wizard). Same bar and calibration as above. The other reviewers' reports were not opened.

## The Sign — 8/10 · would Shahar accept: yes (as the pick) · better than current: yes
Sky-blue is gone: sections now alternate white with a pale cool grey, so coral only sits on white or dark (`the-sign-home/desktop-sheet`). The level cards are three equal columns with buttons on one baseline (`desktop-02`). The booking selection states are ink, not blue (`the-sign-book/desktop-sheet`). The brush-script titles, full-bleed photo pairs, room carousels, Instagram strip, footer and split-screen booking desk are all kept. The page is professional and specific to this place, and it beats the current site on the first screen and on the whole page.
Remaining fixes:
1. Level footage is still soft, and there is a dark rock corner bottom-left in Level 2 (`desktop-02`). Use sharper renditions or re-crop.
2. The closing line is still two long lines in the lower third over palm fronds (`desktop-14`). Cut it to ≤ 6 words and centre it vertically.
3. Booking step-1 level cards have no footage thumbnail (`the-sign-book/desktop-00`).
4. Now that the blue is gone, the mid-page white/grey rhythm is a little flat. One dark (navy) section, e.g. the forecast or reviews, would restore pace.

## Postcard — 7/10 · would Shahar accept: no · better than current: yes (first screen and whole page, narrowly)
There are real layout changes: an asymmetric welcome with overlapping photos, a full-bleed "What's included" split, a large offset slideshow, a split reviews block, an edge-to-edge Instagram grid and bigger room galleries (`postcard-home/desktop-sheet`). The booking page is unchanged in structure, and check-in now has a floating label (`postcard-book/desktop-sheet`). It still reads a notch more "template" than The Sign.
Remaining fixes:
1. **Watermark:** the group-walk photo shows the Global Surf badge top-left (`desktop-05`). Crop it.
2. The closing text sits over palm fronds with tight tracking and poor legibility (`desktop-12`). Add a scrim, a shorter line, and centre it.
3. The new chunky brush title face reads slightly comic. Try a finer hand.
4. The hero title tracking is still tight (`desktop-00`).

## Try your week — 6.5/10 · would Shahar accept: no · better than current: no (roughly equal)
The booking wizard is now the best of the three. It has three steps, Saturday date chips by month, a live total card, and one continuous look (`try-your-week-book-walk/desktop-step3`). The footer is now designed (`desktop-11`). But the new dry-brush script is hard to read: "Our rooms", "Your level" and "Footwear is discouraged" all mis-read (`try-your-week-home/desktop-05`, `book-walk/mobile-step1`). The feature line is set over the busy hair-spray frame, and the level clip is still soft.
Remaining fixes:
1. Replace the script with a legible hand, the same family as The Sign's.
2. Move the feature line onto calm water, or shorten it.
3. Use sharper level footage.
4. Rebuild the closing band as in The Sign.

## Ranking (visual quality only)
1. **The Sign (8, pass):** calm, specific, beautifully sold rooms and a booking desk that belongs to the site. It is the one to show Shahar.
2. **Postcard (7, fail):** now properly composed, but the watermarked photo, the closing band and the title face keep it below the bar.
3. **Try your week (6.5, fail):** the best booking flow of the three, hurt by an illegible script and soft footage. Its date-chip picker is worth reusing in The Sign.

---

# Round 3 (re-score, 2026-09-29)

Re-scored from scratch on fresh shots: `visual-r2/round3/<mockup>-home|book/` (1440 + 390) and `visual-r2/round3/try-your-week-book-walk/`. Same bar, same calibration. The other reviewers' reports were not opened.

## The Sign — 8.5/10 · would Shahar accept: yes · better than current: yes
Changes:
- A dark photo-backed reviews band adds the missing pace (`the-sign-home/desktop-sheet`).
- The closing band now has a short centred script line, "All levels, steps from the beach", with a small sub-line and aligned buttons (`desktop-14`).
- The booking page's level choices now carry footage thumbnails (`the-sign-book/desktop-00`).
- The Level 2 rock is gone.

It is the most finished and most place-specific of the three.
Remaining fixes (minor):
1. The closing sub-line is still two lines of chat. One line would do.
2. The level footage is still slightly soft at card size.

## Try your week — 7.5/10 · would Shahar accept: no (close) · better than current: yes, narrowly
Changes:
- Satisfy replaces the illegible dry brush, so titles now read (`try-your-week-home/desktop-01`).
- The level stage is a sharper split (video left, text and CTA right).
- The feature line sits on calm water (`desktop-05`).
- The hero CTA is now "Book package now".
- The booking wizard is still the best of the three: 3 steps, room pills, a big gallery and a total bar (`try-your-week-book-walk/desktop-step2`).

Remaining fixes:
1. The home still leans on centred title + centred paragraph blocks on white or pale blue-grey. It needs one or two full-bleed or dark moments besides the feature.
2. The closing band sets its long two-line sentence at the bottom edge (`desktop-11`). Shorten it and centre it.
3. The footer and closing band are the same as the other two mockups (see below).

## Postcard — 7.5/10 · would Shahar accept: no (close) · better than current: yes
Changes:
- The watermark is cropped from the group photo (`postcard-home/desktop-05`).
- Satisfy in teal replaces the chunky brush and is legible.
- The closing band now has a scrim (`desktop-12`).
- The asymmetric welcome, the full-bleed inclusions split, the offset slideshow and the edge-to-edge Instagram grid are all kept.

Remaining fixes:
1. The closing line is still a long two-line sentence with tight negative tracking. Shorten it and loosen the tracking.
2. The hero title tracking is still tight.
3. The level cards are small beside the rest.

## Are they still three distinct designs? Only partly.
- The Sign stands apart: navy brush script, a condensed wordmark, full-bleed photo pairs, a dark reviews band and a split-screen booking page.
- **Postcard and Try your week have converged.** They share:
  - the same Satisfy titles;
  - a similar light geometric sans on white and pale-grey grounds;
  - the same hero clip and frame, with a centred title and a coral "Book package now";
  - the same night-pool closing photo with the same sentence and two buttons;
  - the same four-column footer.

  They differ in title colour (teal vs black), a few layouts (Postcard's asymmetric splits vs Try your week's pill stage) and the booking pattern (sticky summary vs wizard). On the first screen all three are near-identical. Shahar would be picking between layouts rather than between designs.
- To restore the choice:
  1. Give Postcard back its pool-deck opening frame (its concept) and a distinct closing photo.
  2. Give Try your week a different script, or none (e.g. a display serif), and its own colour ground.
  3. Vary the three footers.

## Ranking (visual quality only)
1. **The Sign (8.5, pass):** finished, calm and unmistakably this lodge, with a booking desk that belongs to the site. Show it.
2. **Try your week (7.5, fail, close):** now legible, with the best booking flow, but a centred, safe home that looks too much like Postcard.
3. **Postcard (7.5, fail, close):** well composed and clean, held back by the tight tracking, the long closing line, and its near-twin in Try your week. It ranks just below Try your week because Try your week's booking flow is stronger.

---

# Round 4 (re-score, 2026-09-29)

Re-scored from scratch on fresh shots: `visual-r2/round4/<mockup>-home|book/` (1440 + 390) and `visual-r2/round4/try-your-week-book-walk/`. Same bar, same calibration. The other reviewers' reports were not opened. The server on 8982 was stopped afterwards.

## The Sign — 8.5/10 · would Shahar accept: yes · better than current: yes
Unchanged in design. The hero script now reads cleanly over the wave (`the-sign-home/desktop-00`). The dark reviews band, the centred closing, the booking page with footage thumbnails and the footer all hold (`desktop-sheet`, `the-sign-book/*`).
Remaining fixes (minor):
1. The closing sub-line could be one line.
2. The level clips are still slightly soft at card size.

## Postcard — 7.5/10 · would Shahar accept: no (close) · better than current: yes
Now clearly its own design:
- The pool-deck opening frame is back, with a Lora serif title (`postcard-home/desktop-00`).
- A warm sand palette and Marck Script titles in teal.
- A sunset surfer photo beside the closing text instead of text over a photo (`desktop-12`). This is the best closing of the three.
- A new footer with the address in a sand card.
- The booking page carries the same sand, serif and script (`postcard-book/desktop-sheet`).

What holds it below 8:
1. Marck Script is set with very wide letter- and word-spacing ("Follow  the  lodge", "Surf, / breakfast, surf / again" breaking over three lines). It looks loose and amateur next to The Sign's brush. Tighten it to normal tracking, or use a size and measure that keep each title to one or two lines.
2. The hero title is a bold serif over the busiest part of the palm frame. Move it onto the sky or water band, or reduce the weight.
3. The level cards are still small (≈ 190 px wide) against the large room galleries.

## Try your week — 7.5/10 · would Shahar accept: no (close) · better than current: yes, narrowly
Changes:
- A sea-glass palette.
- A surfer-first hero.
- An edge-to-edge level video with the info row under it (`try-your-week-home/desktop-02`).
- A dusk-palms closing with a Satisfy title (`desktop-10`).
- A new footer with a map/address column and four contact tiles (`desktop-11`). It is designed, distinct and good.

The booking wizard is still the strongest flow of the three.
What holds it below 8:
1. The closing photo is a soft video frame with a large out-of-focus brown blob across the bottom (`desktop-10`, `desktop-11` top). It reads like a mistake. Crop above the blob or use another frame.
2. The edge-to-edge level video is visibly soft at 1440 wide. Cap its width, or use the sharpest rendition.
3. The mid-page is still mostly centred title + centred paragraph on white.

## Are they three distinct designs? Yes, mostly.
- **Postcard** is now clearly separate: pool-deck opening, warm sand, serif body, teal hand script, a photo-beside-text closing and a sand footer.
- **Try your week vs The Sign** now share an opening. Both heroes are the same surfer-on-the-wave frame with a centred script title and a coral button (`the-sign-home/desktop-00` vs `try-your-week-home/desktop-00`), so their first screens are near-twins. Past the fold they separate:
  - palette: sea-glass vs cool grey + navy;
  - script: black Satisfy vs navy brush;
  - level section: a single stage with pills vs a three-card row;
  - footer: tiles vs a four-column footer;
  - booking: a step wizard vs a split screen with a sticky photo.
- Fix: give Try your week a different opening frame, e.g. the vid-010 golden-hour stand-up or the vid-002e barrel, so the three first screens differ.

## Ranking (visual quality only)
1. **The Sign (8.5, pass):** finished, calm and unmistakably this lodge, with a booking desk that belongs to the site. The one to show.
2. **Postcard (7.5, fail, close):** now distinct and warm, with the best closing, held back by loosely spaced script titles and a hero title on a busy background.
3. **Try your week (7.5, fail, close):** the best booking flow and a good new footer, let down by a blurred closing frame, soft edge-to-edge level video, and a hero that duplicates The Sign's. It ranks behind Postcard because of that visible flaw on the closing.

---

# Round 5 (re-score, 2026-09-30; last round before Shahar decides)

Re-scored from scratch on fresh shots: `visual-r2/round5/<mockup>-home|book/` (1440 + 390), `visual-r2/round5/try-your-week-book-walk/` and `visual-r2/round5/mobile-heroes.png` (the three 390 px first screens side by side). Same bar, same calibration. The other reviewers' reports were not opened. The server on 8982 was stopped afterwards.

## The Sign — 8.5/10 · would Shahar accept: yes · better than current: yes
- The hero is the pool→reef clip. The brush title and the short coral "Book your week" are centred both ways at both widths (`the-sign-home/desktop-00`, `mobile-heroes.png` right).
- The rest is as in round 4: equal level cards, room carousels, a dark reviews band, a centred closing, the four-column footer, and a split-screen booking page with footage thumbnails.

Remaining fixes (minor):
1. The phone hero video is soft at 2×. Serve the m1280 tier, not m720.
2. The closing sub-line could be one line.

## Postcard — 8/10 · would Shahar accept: yes (borderline) · better than current: yes
- The golden-hour beach hero (vid-010g) with a centred Lora title is warm and unlike the other two (`postcard-home/desktop-00`).
- The level cards are now large, about 450 px, with readable serif type and full-width coral buttons (`desktop-03`).
- Marck Script is tighter and titles now break over two lines at most ("Surf, breakfast, / surf again", `desktop-sheet`).
- The sunset-beside-text closing and the sand footer hold. The booking page matches in sand, serif and script.

Remaining fixes:
1. The hero clip is grainy and soft, especially on the phone (`mobile-heroes.png` left). Use the sharpest rendition or a still poster at 1920.
2. Room titles wrap awkwardly ("Mixed dorm room – 4 / beds", "Shared Twin Room – 2 / Beds"). Widen the text column or drop the size one step.
3. The sepia grade of the hero sits a little flat against the bright room photos. Keep the brand warmth, but lift the contrast.

## Try your week — 7.5/10 · would Shahar accept: no (close) · better than current: yes
- Improvements:
  - The barrel hero (vid-002h) with a centred Figtree title and a short subtitle is dramatic and distinct (`try-your-week-home/desktop-00`).
  - The new img-036 closing, the lodge's own pool and lounge (Booking.com, business-owned), is sharp and bright with the title and buttons centred (`desktop-10`).
  - "The lodge" is now a split with a full-height slideshow (`desktop-06`).
  - The sea-glass footer with contact tiles is good.
  - The booking wizard is still the best flow.
- What still holds it below 8:
  1. The barrel hero is visibly soft at 390 (`mobile-heroes.png` centre). The pixelation reads cheap on the first screen a phone visitor sees.
  2. The mid-page still leans on centred title + paragraph + pill blocks ("Choose your level", "Our rooms", "What guests say", "Follow the lodge"). The three pale review cards read as a SaaS testimonial row.
  3. The Satisfy + Figtree pairing is the most generic of the three. It is legible, but has less character than Postcard's Marck + Lora or The Sign's brush + grotesque.

## Three distinct designs? Yes.
- The first screens now differ in clip, colour and type (`mobile-heroes.png`):
  - Postcard: golden-hour beach, warm sepia, Lora serif.
  - Try your week: the green barrel, cool sea-glass, Figtree sans.
  - The Sign: pool→reef, deep blue, brush script.
- Palettes (sand, sea-glass, cool grey + navy), type pairs, level presentation (large cards, pill stage, three-card row), closings (photo beside text, pool photo, night deck) and footers all differ.
- What they share (coral booking colour, content order, room photos, the Rosa block) is the brand and the facts. That is not convergence.

## Ranking (visual quality only)
1. **The Sign (8.5, pass):** the most finished and most place-specific, with a booking desk that belongs to the site. Recommended pick.
2. **Postcard (8, pass, borderline):** warm, editorial and distinct, with the best closing and big level cards. Only the soft hero clip and some awkward room-title wraps remain.
3. **Try your week (7.5, fail, close):** the best booking flow and a strong new closing, but a pixelated phone hero and a centred, generic mid-page keep it just under the bar.
