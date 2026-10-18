# mutag-meitiv — visual-critic 0.1.1, station 4f (quick) — variant **interactive** ("ארבע הטבעות")

## Round 2 (2026-10-18) — build `fe44172d723d1d3b`

Shots: shared set `sites/mutag-meitiv/mockups/interactive/shots/` (shot 11:31 UTC for this build; desktop-00…, mobile-00…). Current site: `reports/2026-10-il-brand-01/current-site/shots/` + `dossier/mutag-meitiv/assets/old-site-*.png`, as in round 1. Own walk: dist served over http on port 8794, 1440 px. The hero clip plays (`paused:false`, 168 px), there is no overflow (scrollWidth 1440) and no console errors. Photo + motto moment shot separately (scratch). By decision, deep-green grounds are allowed here (brief 6). Not read: the other reviewers' reports.

**Three-second test.** 1440 (desktop-00): the same calm, friendly first screen, now complete. It ends at the fold with no white band. The rings are larger (~560 px), the clip satellite is bigger, and the two lead services sit as pills above one deep-green button. Hadas → title → button reads in that order. 390 (mobile-00): rings and portrait fill the width, then the title, two service pills and the button, all in one screen. The clip circle (~150 px) now overlaps the lower-left of the portrait disc and the ring field, which is a little crowded. I would keep scrolling at both widths.

**What changed, with evidence.**
- **Colour (fixed):** the method is now a full-bleed deep-green panel with white type and rings lighting in `#35C68B` (desktop-05, mobile-05…07). There is a new full-bleed moment, the portrait img-034 beside the motto on `#173B34` (desktop-08/09, scratch r2-motto). The footer is the deep `#173B34` panel (desktop sheet, last frames; mobile-17…19). The page now alternates sage → deep green → white → deep green → sage, so it has the brand's weight and still feels airy. It no longer reads as pale mint.
- **Media:** the photo + motto band is the best new moment: Hadas looking up at her own ring canvas, ~886 px wide, sharp, with the handwritten motto in white. It is portfolio-level. Method stage photos are back on mobile, inside a 220 px ring device (mobile-06). The case study has a designed deep-green cover with the four lit rings and one "דוגמה" badge (desktop-08), replacing the grey hatched box.
- **Rhythm:** sections now change pace: light hero, white services, sage proof + quotes, a deep method panel, tabbed offers, a split case study, a full-bleed photo band, team, podcast, blog, the Instagram strip, a deep footer.
- **Polish:** the offer rows line up (desktop sheet, offers frame). On the phone, the header WhatsApp pill hides while the bottom bar shows (mobile-06: the header shows only the logo and menu). Quotes are clamped, with "להמשך הציטוט" (desktop-03). The logos no longer sit in grey boxes.

**Still weak.**
1. **The ring motif is overused.** It appears in the hero, the method, the mobile stage cards, the case-study cover, all three blog covers (desktop-12: three near-identical deep-green ring tiles) and the closing, about 10 times in all. On the blog it replaces real article photos, which the current site has (current-site desktop-sheet, frame 5), so the blog row reads as placeholder art. The device is losing its meaning.
2. **The logos are washed out.** In one pale ink at low contrast (desktop-03: Bartali, mamanet, חוף הכרמל read as light grey; Mandel and Heartivism nearly vanish at the strip edges), the strip is weaker than the current site's crisp logo grid (current-site desktop-sheet, frame 6).
3. **The testimonial is still dense:** 6 lines of 17 px text at full card width, plus a button, plus the author (desktop-03, mobile-04). Better than round 1, but still a paragraph to read, not a quote to glance at.
4. **Cards inside panels:** in the deep-green method, each stage is a rounded translucent card with an outline (desktop-05, mobile-06). With the panel, the sticky ring and the per-card photo, it is busy. Plain stage blocks separated by space would be calmer.
5. **On mobile, the hero clip circle crowds the portrait** (mobile-00: it overlaps the disc edge and the lower rings).

**Score: 8 / 10 — PASS.** The page is now clearly professional, beautiful and on-brand. Its standout moments are the hero, the deep-green scroll-lit method, the photo + motto band and the footer. Closest reference: the Global Surf gold mockups (`agents/designer/gold/global-surf-notes.md`) in method: one action, a handwritten title face over a readable text face, distinct sections, a full-bleed photo moment, the Instagram strip, a real footer. It sits just below them because of the repeated ring tiles and the logo and quote weaknesses above, not because of any structural problem.

**Better than the current site?** **Yes**, on the first screen and on the whole page.
- **First screen:** desktop-00 vs current-site desktop-00. One labelled action and readable type replace the badge-crowded green slab. The client's greens are now kept as grounds lower on the page.
- **Mobile:** mobile-00 vs current-site mobile-00, where the current site is broken.
- **Whole page:** the only remaining regressions are the blog images and the logo contrast.

**Remaining fixes (biggest effect first).**
1. Blog cards: use each article's own cover image, as the current site does. Keep the ring cover only as the fallback for an article with no image. Keep the rings to hero, method, case-study cover and closing.
2. Logos: deep-green ink at full opacity (or their original colours) and a slightly larger height, so every name reads at 1440 and 390. Check Mandel and Heartivism in particular.
3. Testimonials: clamp to 3–4 lines at a narrower measure (≤ 640 px), with "להמשך הציטוט", and give the author line more weight.
4. Method panel: drop the outlined translucent cards and set each stage as plain white type with its photo on the deep green, separated by space. The active stage can be marked by the ring alone.
5. Mobile hero: move the clip satellite clear of the portrait disc (onto the outer ring at 7–8 o'clock, outside the inner rings), or reduce it to ~120 px.

**Keep:** everything listed under Keep in round 1, plus the deep-green method panel, the photo + motto band, the deep footer, the service pills in the hero, the bottom-bar / header-pill hand-off on the phone, and the designed case-study cover.

**One sentence for the pick:** Light, friendly hero built on her own method rings, with the brand's deep greens back in big moments (method, a full-bleed portrait + motto, the footer); just at the bar (8/10). The ring device is overused on the blog cards.

---

## Round 1

Run 2026-10-il-brand-01 · 2026-10-18 · page `sites/mutag-meitiv/mockups/interactive/dist/index.html`, build `e93570bb27a2f9c4`.
Shots: shared set `sites/mutag-meitiv/mockups/interactive/shots/` (desktop-00…14 at 1440, mobile-00…19 at 390 @2x; reused, build unchanged). Current site: shared set `reports/2026-10-il-brand-01/current-site/shots/` (shot 2026-10-18 11:08 UTC, https://www.mutagmeitiv.com/) + `dossier/mutag-meitiv/assets/old-site-{desktop,mobile}.png`. Own walk: dist served over http (port 8793), Playwright at 1440 and 390 — hero clip playing (`table-464.webm`, `paused:false`, t≈3 s), rings rotate on scroll (0° → −17° after 500 px), Playpen Sans Hebrew 600 + Assistant 400–700 loaded, no horizontal overflow, no console errors; offer accordion, team bio and mobile menu opened and shot (scratch).
Calibration applied: brand_design vertical, Hebrew RTL; the surf items (orange, Latin script, landscape hero video, "light themes for surf") do not apply; the quality bar does. Not read: critic or experience-critic reports.

## Three-second test

- **1440 (desktop-00):** calm, light, pleasant. The eye lands on Hadas's smiling portrait inside the rings, then the handwritten "הי, הגעת למקום מיטיב!" and the deep-green button. It reads as contemporary and friendly. It also reads a little thin: the rings sit at the left with a lot of empty sage, and the hero ends in a ~80 px white band at the bottom of the viewport (desktop-00, y≈818–900), so the first screen looks unfinished at the fold. I would keep scrolling.
- **390 (mobile-00):** strong. The rings and portrait fill the width, the title is centred and clear, and one large WhatsApp button follows. It is clearly better than the current mobile site, which is a desktop layout cropped off the right edge (current-site mobile-00: nav cut to "ם משמעות", service cards cut in half).

## Checklist (evidence)

- **Media:** the best material leads. The portrait img-001 sits in the centre disc (desktop-00, mobile-00), and the workshop clip plays in a satellite circle, 146 px at 1440 and 83 px at 390, smaller than the concept's 180/112 px; at 390 it is a thumbnail. Below the hero, photographs are used well in the two service cards (desktop-01: the ring canvas on the table and the woman pinning a note on the canvas, both ~576 px wide, sharp) and in the workshop group photo (desktop-07). Everywhere else imagery is small or missing: method stage photos are 150 px circles on desktop (desktop-05/06) and **gone on mobile** (mobile-05/06 show only the ring icon); blog cards have **no images at all** (desktop-12), although the current site's blog cards carry photos (current-site desktop-sheet, frame 5). The case study's image half is an empty hatched placeholder, ~620 × 450 px, with an icon and "תמונה לדוגמה" (desktop-08, mobile-10): the single biggest picture area below the fold is a grey box. The Instagram strip is the only full-bleed photo moment (desktop-13), and it works.
- **Composition and grid:** clean 12-col, consistent 1192 px container, generous margins. But the rhythm is one move repeated: a heading at the right, then rounded sage or white cards (services, awards, method, offers, case study, podcast, blog are all rounded cards; desktop-01 → 12). There is no full-bleed photo section or change of scale between the hero and Instagram. The offers grid is ragged: cards in the same row have different heights ("BRANDS OF CHANGE" 84 px beside "ריטריט יום" 114 px; "סדנת חזון" 143 px beside "Brand & Breakfast" 114 px; desktop-07), so the two columns do not line up. The award card is raised with a shadow and the BTC card is flat, at different heights (desktop-03). The team bio opens inside a 280 px column and leaves the other three columns empty below (team walk shot).
- **Typography:** a good pair. Playpen Sans Hebrew for titles reads like her marker handwriting and fits the brand ("כלים לבניית עסק מיטיב", "מיטיבים מספרים.ות", desktop-01/02). Assistant at 18 px with 1.65 leading is readable and not compressed, as the brief asked. Problems: the testimonial is a 9-line wall of text in a white card (desktop-02/03, mobile-03), and the method cards are 6–10 lines each, four in a row; on mobile that is about four screens of text (mobile-05…08), which is the opposite of the brief's "informative but not overpowering". The Latin small-caps stage labels are heavily tracked and pale (#35C68B on white for SENSING/THINKING, desktop-05), and look weak next to the Hebrew.
- **Colour:** fresh, cool sage-white with deep-green accents, and the booking colour is clear (the only filled deep-green shape on the page, white label). But brief item 6, "stay with the leading greens", is only half met. On the current site the deep green **is** the identity: a full green hero panel and dark-green service cards (current-site desktop-00). Here the deep green survives only on buttons and in a 64 px footer strip (desktop-14). The page as a whole reads pale-mint and could belong to any wellness brand. The logo marquee is greyscale, and three logos are JPGs with grey boxes behind them (Heartivism, המעיין, Mandel; desktop-03, mobile-04): they look like grey rectangles and lose to the current site's crisp logo grid (current-site desktop-sheet, frame 6).
- **Hierarchy and rhythm:** clear navigation (6 items + WhatsApp, floating pill on scroll; desktop-01 onward) and one primary action everywhere. On mobile, though, every screen shows **two** WhatsApp buttons, the header pill "כתבו להדס" and the bottom bar "כתבו להדס בוואטסאפ" (mobile-01…19), and the header pill is ~64 px tall: together they take about 13 % of the viewport and make the CTA feel repeated, not designed. Pace is even rather than varied: almost every section has the same padding and the same card treatment.
- **Polish:** generally tidy: consistent radii and shadows, good buttons with icons, a real footer with icon buttons (desktop-14), slideshow with dots and arrows (desktop-03). Defects: the white band under the desktop hero (desktop-00); the ragged offer grid (desktop-07); grey-boxed logos (desktop-03); "דוגמה" badge shown twice on the case-study tile, once on the image and once over the text (desktop-08, mobile-10); a blank ~200 px gap under the method section before the offers heading (desktop-06, y≈520–740); the footer is a light-sage block with a thin dark strip, not the deep `#173B34` panel the concept specified (desktop-14).
- **Distinctiveness:** the rings idea is specific to this practice (her Brand the Change canvas) and pays off in the hero, the sticky scroll-lit method ring (desktop-05/06, filling SENSING → INFLUENCING) and the closing ring (desktop-13). Outside those three moments the page is a well-made card template.

## Score

**7 / 10 — FAIL (below 8).**

Clearly professional, clean and pleasant, with real motion that works (orbiting labels, scroll-lit method ring, tabs, accordions, marquee, slideshow). It is not yet at the bar: there is no full-bleed photographic moment between the hero and the Instagram strip, the home page's biggest image area is an empty placeholder, the brand's deep green has been diluted to button colour, and long text walls in the testimonial and method go against the brief's "not overpowering". Closest reference: the Global Surf gold mockups (`agents/designer/gold/global-surf-notes.md`) in method (one primary action, handwritten titles + readable text face, slideshow with dots, Instagram strip, real footer). It sits below them because the gold pages make every section "its own moment" with full-bleed media and change of scale; here most sections are the same rounded card on sage.

## Better than the current site?

- **First screen:** desktop: **yes, narrowly**. desktop-00 vs current-site desktop-00: cleaner, airier, readable, with one clear CTA instead of a green slab crowded with four badges and underlined card titles. The current hero has more brand presence (the full deep green); the new one has more ease. Mobile: **yes, clearly**. mobile-00 vs current-site mobile-00, where the current site is broken (cropped layout).
- **Whole page:** **yes**, with two regressions to fix: blog cards without images (desktop-12 vs current-site frame 5) and the logo wall (desktop-03 vs current-site frame 6).

## Fix list (biggest effect first)

1. **Give the brand back its deep green, as a ground, in at least two big moments.** Set the method section (desktop-04…06) on a full-bleed `#0A5150`/`#173B34` panel with the rings in `#35C68B` and white text, and make the footer the deep `#173B34` panel the concept specified (desktop-14 is light sage). This also breaks the "every section is a sage card" monotony. The current site's identity is a deep green; keep the hero light, but the page must not read as pale mint throughout (brief 6).
2. **Replace the empty case-study placeholder with a real picture.** desktop-08 / mobile-10 show a ~620 × 450 hatched box. Use a real workshop photograph (for example img-030 or img-c03, labelled דוגמה) or shrink the tile to text + stage chips; never let the largest image area below the fold be grey. Show the "דוגמה" badge once.
3. **Add one full-bleed photographic moment and put images back where the current site has them.** Between the proof row and the method (or before the offers), run a full-width image or the workshop clip at real size (for example img-034 at 2000 px, or vid-004 in a wide crop band). Give each blog card its cover image (the current site has them). On mobile, keep each method stage's circular photo (mobile-05…08 drop them), so the four stage cards are not four screens of plain text.
4. **Cut the text walls.** Testimonials: show the first 3–4 lines with "קראו עוד", or choose a shorter quote per slide (desktop-02/03 is 9 lines). Method cards: lead with the headline + one paragraph; put the second paragraph behind a tap. Make the Latin stage labels the deep green, not the pale `#35C68B` at small size (desktop-05).
5. **Polish pass:** (a) end the desktop hero at the viewport bottom (remove the white band, desktop-00) and enlarge the hero clip satellite to the specified 180 px desktop / 112 px mobile; (b) align the offers grid: equal row heights or a single-column list (desktop-07); (c) logos: use transparent-background versions or one consistent treatment (no grey JPG boxes, desktop-03); (d) on mobile, drop the header WhatsApp pill once the bottom bar is visible, or shrink the header to ~52 px (mobile-01…); (e) remove the ~200 px dead gap after the method (desktop-06); (f) open team bios full-width under the row, not in a 280 px column.

## Keep

- The hero on mobile (mobile-00): the rings, portrait, centred handwritten title, one big button.
- The type pair: Playpen Sans Hebrew titles + Assistant 18/1.65 body. It is readable and has character.
- The scroll-lit sticky method ring (desktop-05/06) and the slowly orbiting stage labels: motion that means something.
- The two lead-service cards with the canvas photographs (desktop-01), the floating pill header, the workshop group photo + clip satellite in offers (desktop-07), the Instagram strip (desktop-13), the closing ring with WhatsApp + Calendly (desktop-13), the icon-button footer contacts (desktop-14).
- Interactions: tabs, accordions with per-offer WhatsApp (accordion walk shot), slideshow with dots and arrows, mobile menu sheet.

## One sentence for the pick

Clean, friendly and genuinely interactive, with a hero built on her own method rings; but the deep brand green is diluted to buttons and most sections are the same sage card, so it is not yet at the bar (7/10).
