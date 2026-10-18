# mutag-meitiv · series 2 · unique «על הבמה» — experience-critic 0.1.0, station 4f (quick)

## Round 2 (2026-10-18)

The walk ran fresh on the rebuilt `dist/`, served at http://127.0.0.1:9861, with the same script and profiles as round 1:
- phone 390 × 844 at 1.6 Mbps / 150 ms / 4× CPU;
- laptop 1440 × 900, with the set-piece stepped every 225 px of wheel;
- reduced motion, and JS off.

WhatsApp taps were intercepted. Frames are in `experience/mutag-meitiv/s2-unique/r2/` (log `r2-walk.log`, sheets `r2-*.png`). I did not read the other reviewers' reports.

**Score 8/10 · PASS · better than the current site: yes · taps to book: 1**

### Round-1 fixes, checked against frames

| # | Round-1 fix | Round 2 | Evidence |
|---|---|---|---|
| 1 | Intro portrait cut through her face | **Fixed.** Hadas's whole face is in frame, smiling, with the method canvas behind her. It is the warmest portrait on the page. | `dist/img/intro-hadas-900.webp`, `r2-phone-s06.png`, `r2-laptop-p00.png` |
| 2 | Phone first screen: a slide with no person; three m-icons | **Fixed.** The crop moved to the stage: Hadas, smiling in green, stands at the lower right under the yellow stage light. The slide's clipped Hebrew line is gone. The icon at the head of the method was removed, so the first 1.2 screens show only the header icon. Trade-off: the stage-screen icon is no longer in the phone hero. Acceptable, because a person now leads, which is what the current site did better. | `r2-phone-t1500.png`, `r2-phone-s01.png` |
| 3 | Murky set-piece opening, zoom invisible | **Fixed, mostly.** The zoom now reads first (`sp01`, `sp02`: the icon grows visibly). The fade to green takes about one 225 px step (`sp03`). The logo slide is clean by `sp04`, and SENSING arrives at about 1,125 px (`sp05`): within ~1.25 viewports, as the concept asked. | `r2-big.png`, `r2-sp1.png` |
| 4 | Stage slides top-aligned; "ובת-קיימא" break | **Fixed.** The slides are now half-bleed: the photo fills the full height on the left, and the text sits centred on the right. No dead band. "ובת-קיימא" stays on one line on phone and desktop. | `r2-sp1/2.png`, `r2-phone-s01.png` |
| 5 | Soft hero, white under the hero at 0.5 s | **Fixed.** hero-2000 is now 169 KB, and the slide lettering is sharp at 1440. The 0.5 s phone frame is all room-dark, with no white. | `r2-laptop-hero.png`, `r2-phone-t500.png` |

### Re-walk notes

- **Load:** phone LCP 1,044 ms; first load 576 KB from one host; scrollWidth 390; page 12,957 px. JS off: 13,588 px with all 18 links. Reduced motion: stacked layout, 13,790 px.
- **Booking:** the hero tap goes to `wa.me/972546686808?text=היי הדס, אני פונה בשם ארגון…` in 1 tap (intercepted). 18 links, each with its service's own prefill. The phone bar now appears from about 1,400 px, after the taller hero button scrolls away. Before that, the header's WhatsApp disc is the one button, so there is always exactly one.
- **Videos:** vid-004 plays in MAKING on phone (s02–s03) and on laptop (sp08–sp09); vid-002 plays in the owners block (s12–s13). Both pause when off screen.
- **Wanting to go:** the phone now opens on her, on a stage. The desktop stage slides are a real set-piece, with large photos of the workshop room and Hadas on stage for INFLUENCING. The award quote and the intro portrait carry the middle of the page.

### Remaining fixes (none blocking)

1. **Desktop hero:** the title strips now sit over the slide's own "להיות מותג חברתי…" line and half of "BRANDS OF CHANGE" (`r2-laptop-hero.png`). The strips are solid, so the h1 reads, but the slide text peeks out above and below them. Nudge the strips down into the empty lower stage (above the button), or slightly darken the slide's text line behind them.
2. **Middle stretch:** team → blog → Instagram is still three white list sections in a row (`r2-phone-s13–s15`). One media moment there would lift it, for example the podcast artwork larger, or the Instagram strip moved above the blog.
3. **Programme rows:** on phone, the pill pairs ("כתבו להדס" + "לפרטים") repeat four times. Consider one pill per row, with the title as the details link.

### Keep

Everything in the round-1 keep list, plus:
- the new phone hero crop;
- the half-bleed stage slides;
- the fixed intro portrait.

---

# Round 1

Run 2026-10-il-brand-01 · 2026-10-18 · page `sites/mutag-meitiv/mockups/unique/dist/index.html`, served at http://127.0.0.1:9860 · Hebrew, RTL.
Frames: `reports/2026-10-il-brand-01/experience/mutag-meitiv/s2-unique/` (walk log `new-walk.log`, contact sheets `c-*.png`).
Independent: I did not read the visual-critic or critic reports for this round.

**Score 7/10 · FAIL (below 8) · better than the current site: yes · taps to book: 1**

## Timeline, phone cold (390 × 844, 1.6 Mbps / 150 ms RTT, 4× CPU)

- **0.5 s** (`new-phone-t500.png`): stage photo, title strips and the header buttons are there. The rest of the screen under the hero is still white, and there is no WhatsApp button or wordmark yet.
- **1.5 s** (`t1500`): finished. Wordmark, green button "כתבו להדס בוואטסאפ", and the top of the method section. LCP 928 ms, scrollWidth 390 (no overflow), first load 557 KB, one host (127.0.0.1). No video on load.
- **3 s** (`t3000`): same as 1.5 s. Nothing moves; the hero is a still.
- **How it feels:** dark, serious, a conference. But on the phone the whole first screen is **a photo of a projected slide**. The slide has its own words ("BRANDS OF CHANGE", "להיות מותג חברתי, סביבתי ועסקי"), and they are cut off at both edges. Those words sit right above the h1 and compete with it. No person is on screen: Hadas is cropped out on phone. The m-icon shows three times in the first 1.2 screens (header, the slide, then the head of the method).

## The walk, phone (19 frames at 700 px steps, `new-phone-s00…s18`, `c-ph1…3.png`)

1. **Method** (s01–s03): four stacked stage blocks on `#0A5150`. Each has a Latin label, a Hebrew title beside a 4:5 photo, one paragraph and "קראו עוד". vid-004 plays when you reach MAKING (s02 `paused:false t=0.34`) and pauses once it scrolls past. It reads well and the photos hold up. Attention holds.
2. **"מה ארגונים מזמינים"** (s03–s05): white programme rows with a title, a sentence, details joined by " | ", a price where one is published (580 ₪, 5,200 ₪ + מע"מ), and two pills ("כתבו להדס" + "לפרטים"). Clear, and the organisation angle is obvious. The run of pill pairs gets repetitive: 4 × 2 pills plus the section button.
3. **Intro on deep green** (s06, `new-phone-s06.png`): **the portrait of Hadas is cropped through her face.** Only the right half of her face shows at the left edge, and she looks out of the frame. Most of the image is a bookshelf. The derived file `dist/img/intro-hadas-900.webp` is cropped that way at source. The same crop shows on laptop (`new-laptop-p00/p01.png`). This is the founder's introduction, and it is the worst moment on the page.
4. **Past programmes** (s07–s08): big years in Secular One beside her Instagram cards, each with "לפוסט באינסטגרם". The years make a good rhythm, but the cards are small.
5. **Award + judges' quote** (s09) on `#0A5150`: the seal, then the quote set large. This is the strongest proof moment for an organisation.
6. **Logos** (s09–s10): white on deep green, crisp, under "מודה על הזכות להטיב ב:".
7. **Testimonials** slideshow with dots (s10); **owners block** with accordions + vid-002 (s11–s12, plays: `t=0.6→1.6`); **demo case** cover with the "דוגמה" badge (s12–s13); **team** swipe row (s13); **podcast, blog, Instagram strip** (s14–s15); **closing** + Calendly (s16); **footer** (s17–s18). Attention drops in the middle stretch, team → blog → Instagram (s13–s15): white list sections one after another, with no media moment between the logos and the closing.
- Page length 12,901 px (under the 13k cap).

## Story after one scroll

What, and for whom: yes. The h1 says "מיתוג לעמותות ולארגונים…". Why her: partly. A stage and a method, but on the phone there is no face until the half-face in s06. Cost: not until the programme rows (s04), which is fine for this business. The story is told through the stage photo and the method photos, not through tables.

## Wanting to book her

The **desktop hero** (`new-laptop-hero.png`) does it best: the stage, her icon on the big screen, and Hadas small and smiling at the bottom right. "She speaks at conferences" lands in one look. The **judges' quote** is the second moment. What deflates it: the half-face portrait (s06), and on the phone a first screen with no person in it.

## Booking (tap-through, wa.me intercepted, nothing sent)

- 18 WhatsApp links, all `https://wa.me/972546686808?text=…`. The number matches the brief (items 15 and 18) character for character.
- **Hero button → 1 tap** → `…text=היי הדס, אני פונה בשם ארגון. אשמח לדבר על מה שיכול להתאים לנו.` (request intercepted, `new-walk.log`). Each programme row carries its own service message (BRANDS OF CHANGE, the retreat, Brand the Change training, strategic planning).
- **Phone bar:** hidden on load (`translateY 70px`, opacity 0), shown from y=700 on (`bar-on`). The header WhatsApp disc hides while the bar shows, so there is one button per screen. Audit target: `clicks_to_book 1`, class whatsapp. **Met.**
- **JS off:** 18 links still present; the page stacks to 13,531 px.
- **Against the current site:** the live site has **no WhatsApp or tel link at all** (`wa: []`, walked 2026-10-18). Booking is through the "פה יוצרים קשר" form. The new page is far easier to book from.

## Motion

- **Desktop set-piece** (`html.js.pinned.armed`, frames `new-laptop-sp00…sp20` at 225 px wheel steps, `c-sp1…3.png`):
  - y 0: the hero (good).
  - y 450 (`sp02`): the strips have left, and the photo sits under a half-faded green. It reads as **a murky, dimmed photo** for about one viewport, not as a camera moving into a screen. The 1.25× zoom is hardly visible.
  - y 900 (`sp04`): the logo slide (icon + "מתודת מותג מיטיב") is clean.
  - y 1350–4050: SENSING → THINKING → MAKING → INFLUENCING with cross-fades and four dots at the start side. Each slide is a clean two-column composition, **but the content sits in the top 110–635 px of a 900 px viewport, leaving a ~265 px empty green band underneath** (`new-laptop-sp10.png`).
  - MAKING's title breaks as "ובת-" / "קיימא" across two lines.
  - vid-004 plays only inside the MAKING window (`sp10–sp11 PLAY`, paused at sp12). It is a soft 464-px vertical clip at 420 CSS px.
  - The run takes about 4,000 px of wheel to clear. With 4 stage slides that is acceptable, but the transition at the start is the weak part, exactly what concepts.md warned of ("if the zoom is soft or long it feels like a gimmick").
- **Small motion:** header pill on scroll, slideshow dots, Instagram hover lift. Purposeful and unobtrusive.
- **Reduced motion** (1440): `html.js` without `pinned`, page 13,198 px, stacked stages (log). **JS off:** stacked (log). No pin, no jank.
- The hero photo is visibly soft at 1440 (hero-2000.webp is 39 KB for 2000 px; the slide lettering is blurred in `new-laptop-hero.png`).

## Laptop (1440 × 900)

The header carries 6 named items + a WhatsApp pill, and it is clear. The hero is the best screen of the whole run for an organisation buyer. The programme rows (`sp18`, `sp20`) are airy and readable, and the prices are right-aligned in the row. The award, logos, team row of faces and Instagram strip (`p05–p09`) are distinct, designed sections, and the footer is real. The intro portrait is the same half-face crop as on phone.

## Against the current site (live, walked 2026-10-18: `old-phone-00/01.png`, `old-laptop-00.png`, `c-old-*.png`)

- The current site is a boxed Wix column. On the phone, text overflows and is cut at the right edge. There are no WhatsApp or tel links, an accessibility-widget layer comes first in the tab order, and the type is small.
- **Where the current site is better:** its first screen puts **Hadas's warm, direct face** in a large circle, with the icon and the seals beside her. The new phone first screen has no person, and its one portrait (intro) cuts her face in half. On the current desktop, the four service tiles sit above the fold, so "what she offers" shows sooner.
- Overall the new page is **clearly better**: scale, drama, organisation focus, readable Hebrew, 1-tap booking.

## Fix list (biggest effect first)

1. **Recrop the intro portrait** (`src/make-media.sh` → `intro-hadas-900.webp`) so her whole face sits inside the frame, eyes about a third from the top. Or use img-033 / img-ig-01 as concepts.md §4 item 5 specifies. A half-face founder photo reads as broken.
2. **Phone first screen: let it read as a stage, not a slide.** Widen the 4:5 crop or move it down, so that a sliver of the stage floor/light and Hadas (or at least the screen's full frame) are in it and the slide's Hebrew line is not cut at both edges. Or crop above the slide's text line, so only the icon + "BRANDS OF CHANGE" sit over the h1. One m-icon in the first screen, not three: drop the icon at the head of the method on phone.
3. **Fix the set-piece's opening transition.** Make the zoom actually visible: reach 1.25× before the green starts, then fade the green fast (≤ 0.2 vh), so no frame shows a murky half-faded photo (`sp02`). Trim the run so the first stage arrives within about 1.5 viewports (concept's own fail condition).
4. **Vertically centre the stage slides** in the pinned viewport (the dead band below content in `sp06–sp16`). Fix the "ובת-קיימא" line break: keep the compound together with a non-breaking hyphen (U+2011) or `white-space: nowrap`.
5. **Re-encode hero-2000** at a higher quality (≈ 120–200 KB AVIF/WebP is still within budget) so the stage lettering is sharp at 1440. Also give the white area under the hero the room dark from the first paint (the 0.5 s frame shows white).

Smaller: consider one pill per programme row on phone ("כתבו להדס"), with the row title linking to "לפרטים", to cut the pill repetition. Add one media moment between team and Instagram.

## Keep

- The desktop hero (stage, her icon on the screen, Hadas in frame, the h1 on solid strips, one button).
- 1-tap WhatsApp with per-service prefilled messages, the labelled phone bar, and one button per screen.
- The judges' quote as the lead proof, the white-ink logo grid, and the big programme years.
- The phone method blocks with photos and the vid-004 tile; the reduced-motion and JS-off stacked fallbacks.
- Secular One + Heebo, the deep-green grounds (L1), the 18 px Hebrew body, length under 13k.

**Experience ranking (series 2):** only the unique page was reviewed in this task, so there is no ranking here.
