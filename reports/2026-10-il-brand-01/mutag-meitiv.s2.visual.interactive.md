# mutag-meitiv — visual-critic 0.1.1, station 4f (quick) — series 2, variant **interactive** ("בחרו פורמט")

## Round 1 (2026-10-18) — build `262b1cc795dcb448` (dist/index.html 15:54:53)

**How it was looked at.** Served over http (port 9740, so Rubik actually loads; the shared `shots/` set was shot from `file://`, where the font is CORS-blocked) and shot with `tools/shoot.mjs` into my scratchpad: 13 desktop captures (page 10,278 px) and 15 phone captures (11,431 px). Plus my own Playwright walk of the hero chips: clicked "סדנה לצוות" and "מיתוג וריברנד" (files `chip-team.png`, `chip-brand.png`). Side by side: `dossier/mutag-meitiv/assets/old-site-desktop.png` / `old-site-mobile.png`. Bar: series-1 interactive "ארבע הטבעות", which passed round 2 at 8 (`mockups/series-1/interactive/shots/desktop-sheet.png`), and the Global Surf gold notes. Screenshots get deleted after the round, so every line below says in words what the file shows.

## Three-second test

- **1440 (`desktop-00.png`).** Hadas in her green dress fills the right two-thirds, walking a real stage in front of the "BRANDS … TO THE CHANGE / Using brands as a force for good" screen. On the left is a white rounded card with the h1, a line that changes, four card-shaped chips, a deep-green WhatsApp button and the message preview. First feeling: a serious speaker, bookable now. I'd keep scrolling. The photo is soft, though. Her face and hands smear at 1440 (a 50 KB 1440×960 WebP from an Instagram source).
- **390 (`mobile-00.png`).** The stage photo is 4:5 with the logo and menu over it. The card overlaps it, and the title, line, 2×2 chips and full-width WhatsApp button all fit inside the first screen. Clean and confident. It reads as a booking step, not as decoration.
- **Against the old site.** The old first screen is a boxed teal slab in a 950 px column, with a small circle portrait, four unexplained badges and 14 px text. The difference shows in under a second.

## Checklist (evidence)

- **Media.** The first screen leads with the strongest organisational photograph (img-ig-01 on stage). Each chip swaps in its own full-bleed photo: `chip-team.png` shows the eight women holding their vision boards, and `chip-brand.png` shows the WHO ARE YOU canvas with a hand placing a note. All three frames are warm and real, and they use the business's own material. Weak points:
  1. **Softness.** The default hero is soft at 1440 (`desktop-00.png`, the face and hands). The closing img-c05 band (`desktop-11.png`) is soft too.
  2. **Repetition.** **img-ig-01 appears four times.** It is the hero, the lecture tab photo (`desktop-02.png`, the same frame at 4:3), the talk thumbnail (`desktop-04.png`) and the last Instagram tile (`desktop-10.png`). By the third time it is wallpaper.
  3. **Video.** vid-004 plays only inside the MAKING card, which is acceptable per the concept.
- **Composition and grid.**
  - The hero card sits on the end side and clears Hadas, a good call (`desktop-00.png`). The method deck (`desktop-03.png`) is a real set-piece: four white cards fanned beside a 4:5 stage photo on deep teal.
  - **Below the method, the page becomes white rounded cards on a grey ground, section after section:**
    - the tab panel (`desktop-02.png`);
    - the talk cards and the quote card (`desktop-04/05.png`);
    - the testimonial card (`desktop-06.png`);
    - the "גם לבעלי עסקים" card (`desktop-07.png`);
    - the blog cards (`desktop-09.png`).
  - Two of them are half empty. The "גם לבעלי עסקים ולאנשי מקצוע" card has its whole left half blank (`desktop-07.png`). The demo case-study tile is a dark slab whose left half holds only a faint watermark icon (`desktop-07.png`).
  - Dead air: about 200 px of empty white above "צוות עם משמעות" (`desktop-08.png`), and about 250 px of empty teal under the method dots (`desktop-04.png`; `mobile-04.png`, where the gap under the dots is about 300 px).
- **Typography.**
  - Rubik is used alone (400/500/600). It is readable and friendly, and body text is generous at about 19 px with good leading (`desktop-01.png`, `mobile-01.png`). It answers brief 8 well.
  - The cost is character. Series 1 interactive had a handwritten display face, and the old site has its own voice. Here every heading is the same bold Rubik, so the page has no display moment at all.
  - The tab panel title "הרצאת הדגל — BRANDS OF CHANGE" breaks badly: "CHANGE" sits alone on line 2. The body then repeats "הרצאת הדגל: BRANDS OF CHANGE" word for word right under it (`desktop-02.png`).
- **Colour.**
  - The greens are right, and they appear as grounds in big moments: the method on `#0A5150` (`desktop-03.png`), the demo tile and the footer on `#173B34` (`desktop-07/12.png`). Brief 6 is answered.
  - The booking colour `#00574C` is used for every WhatsApp button and stays unmistakable on white.
  - **On the deep footer ground, the footer WhatsApp button (outline ring, `desktop-12.png`) is the weakest button on the page.**
  - **The method's pagination dots are near-black on deep teal and almost invisible** (`desktop-04.png`, `mobile-04.png`).
- **Hierarchy and rhythm.**
  - The first three screens have real pace: the photo hero, a calm white intro, then the tabs.
  - The method is the high point, and after it the pace flattens into same-weight sections. The individuals block, the demo, team, content and Instagram all read at one volume.
  - The Instagram strip runs straight into the full-bleed closing photo with no breath (`desktop-10.png`, the tiles sit right on the women's faces).
- **Polish.**
  - **Team row.** The founder is larger, as specified. The four others don't share a top edge: Yael and Tamar start about 20 px lower than Dana and Lior (`desktop-08.png`). That reads as an error, not as a stagger.
  - **Testimonial card.** The card is clipped flat at its bottom edge, so its lower rounded corners and shadow are cut (`desktop-06.png`).
  - **Phone deck.** The 14 % peek shows the next card's body text sliced mid-word down the left edge ("ומפגש…", "hange", "anvas)", ".wise" in `mobile-04.png`), and it looks broken.
  - **What works.** The logo marquee is crisp and even, every mark in one ink (`desktop-05.png`). The header pill, the chips, the buttons and the footer are clean. There was no overflow at 390.
- **Distinctiveness.**
  - The hero is distinctive. A booking step that changes the photograph and the WhatsApp message is this business's own, and it works (`chip-team.png`: the line and the bubble change to the retreat message; `chip-brand.png`: they change to the strategic-planning message).
  - The deck, built on her own Brand the Change cards, is distinctive too.
  - Everything else could come from a good SaaS template: Rubik, white cards on grey, pill buttons.

## Score: **8 / 10 — PASS (at the bar, narrowly)**

The first screen and the method deck are the best organisational pages in this run. The full-bleed stage photo answers the series-1 complaint ("no full-bleed photographic moment"), and the chips are a real, working interaction that serves brief 4 and brief 29 at once.

It lands at 8, not 9, because of what follows:
- The second half is a run of near-identical white cards with two half-empty ones.
- There is no display type.
- One photograph repeats four times.
- The hero photo is soft at desktop width.

**Closest reference:** series-1 interactive round 2 (8), and the Global Surf gold in method: one action, distinct sections, full-bleed media, the Instagram strip, a real footer. It is above series-1 interactive on the first screen and on media. It is below it on typographic character: series 1 had the handwritten titles, which the old site and the gold calibration both value. On balance it is equal to series 1, not better.

## Better than the current site?

**Yes, on both.**
- **First screen:** `desktop-00.png` against `old-site-desktop.png` (top). The stage photo with a booking step beats a boxed slab with a circle photo and unlabelled badges, and `mobile-00.png` beats `old-site-mobile.png` the same way.
- **Whole page:** `desktop-sheet.png` against `old-site-desktop.png`. A designed method, the award told in the judges' words, crisp logos, a team row instead of a text wall, and a real footer, against a column of identical green boxes.

## Fix list (biggest effect first)

1. **Give the second half shape: fill or kill the empty halves.**
   - "גם לבעלי עסקים ולאנשי מקצוע" (`desktop-07.png`): put a 4:5 photo on its left half (img-034 or img-c05, cropped like the tab photos), or narrow the card to its content and centre it.
   - The demo tile: put a real cover image or the four stages' icons on its left half, not a faint watermark.
   - Then set one of the grey-ground sections on a full-bleed deep-green or photo ground, so the page isn't five white-card sections in a row.
2. **Stop repeating img-ig-01.** Keep it in the hero only.
   - The lecture tab photo should be img-011 (stage screen, 2000 px) or img-033 (Hadas at the BMD wall, 2000 px). Both appear nowhere else on the page.
   - The Instagram strip should drop ig-01 for another tile (not ig-06).
   - That leaves at most two appearances (the hero and the small talk thumbnail).
3. **Sharpen the hero.** Re-encode `hero-talk-d` from the original at q≥90, or at 1920×1280 if the source allows: 50 KB is far below the 300 KB budget. If ig-01 is too soft for 1440 full-bleed at 2×, make img-033 (2000×1333, sharp) the desktop default and keep ig-01 for the phone 4:5 crop. Do the same for `closing-d` (img-c05).
4. **Add one display moment.** A second face for the four or five section titles only ("מתודת 'מותג מיטיב'", "על הבמות ובארגונים", "מיטיבים מספרים.ות", "צוות עם משמעות"), or at least a lighter or larger contrast weight of Rubik with real scale against the 19 px body. Right now every h2 is the same 40 px bold. Also fix the tab title: "BRANDS OF CHANGE" on one line (nowrap or a shorter Hebrew lead-in), and don't repeat it as the first words of the body.
5. **Polish pass:**
   - Method dots: white or mint on teal, or remove them, since the stage buttons already do the job (`desktop-04.png`).
   - Cut the ~250 px of dead teal under the deck and the ~200 px above the team.
   - Align the four team photos to one top edge (`desktop-08.png`).
   - Unclip the testimonial card's bottom radius and shadow (`desktop-06.png`).
   - Phone deck peek: show only the next card's edge or its photo, not its sliced body text (`mobile-04.png`).
   - Put 64–96 px of space between the Instagram strip and the closing photo.
   - Give the footer WhatsApp button a solid mint or white fill on `#173B34` (`desktop-12.png`).

## Keep

- The hero booking step: full-bleed photo, the end-side white card, four card-shaped chips, a photo, line and message that change, and the message preview bubble.
- The method deck on deep teal, with the stage photo beside it.
- The crisp single-ink logo marquee under "מודה על הזכות להטיב ב:".
- The award line plus the judges' quote card, linked.
- Rubik body at about 19 px with generous leading: it is readable, as brief 8 asks.
- One booking colour.
- The labelled phone bar, the floating pill header, the Instagram strip and the real footer.

## One sentence for the pick

The most useful first screen of the series, a stage photo with a four-way "what would you like to book?" step that rewrites the WhatsApp message. Its second half is tidy but template-plain and should get the five fixes above before it is shown.
