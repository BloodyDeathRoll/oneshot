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
