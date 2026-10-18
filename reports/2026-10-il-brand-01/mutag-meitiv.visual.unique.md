# mutag-meitiv — visual-critic, station 4f (quick) — variant **unique** "מפת חזון"

## Round 2 (build bf13db636f540de7, shot 2026-10-18T11:39Z; 16 desktop + 17 mobile captures, 0 console errors)

**Verdict: PASS — 8/10.** Better than the current site: **yes**, first screen (desktop-00/mobile-00 vs current desktop-00/mobile-00, unchanged hero) and whole page (desktop-sheet vs current desktop-sheet). Deep-green grounds judged as decided (brief 6).

### Three-second test
- **1440 / 390:** same hero as round 1, still the strongest screen: her face inside the heart, the table clip playing (`table-464.webm`, playing, 220 / 115 px), two green title strips, one salmon button. Scrolling now changes pace: white → pale → green bands → a full-bleed photo → green → white.

### What round 1's fixes did (checked in this round's shots)
1. **Method set-piece — fixed.** No grey placeholder slots: the heart starts with one piece (desktop-03: img-003 alone, centred) and fills by overlap (desktop-04: card deck, canvas, leaf hands stacked inside the outline), with SENSING/THINKING/MAKING/INFLUENCING pills that light up per stage below it (desktop-04/05). Pieces stay inside the heart. Dead bands are gone (desktop-03: method heading ~110 px under the section top). Mobile shows each stage with its piece beside the title (mobile-04/05/06).
2. **Rhythm and greens — fixed.** Courses on a `#173B34` band with white cards (desktop-08); testimonials on a full-width `#00574C` band, one display-face quote at a time with "קראו עוד" and dots (desktop-09/10); ON AIR band; dark-green footer (desktop-14/15). A full-bleed workshop photo (img of the collage board in the print shop) opens "הרצאות וסדנאות" with the title on a green strip overlapping its bottom edge (desktop-06/07, mobile-07/08) — the mid-page image moment it lacked. Logos now sit on white without per-logo cards (desktop-06).
3. **Salmon rationed — fixed.** Offer and course cards use deep-green-on-mint "כתבו להדס" pills (desktop-07/08, mobile-08); salmon stays on header, hero, bar, the two service blocks and the closing (desktop-02, 14).
4. **Workshops and case study — fixed.** The orphan tilted photo is gone (desktop-07). The demo case study's right half is a dark-green typographic heart with the four stage labels as paper chips (desktop-09, mobile-10) — reads as designed, not missing.
5. **Polish — fixed.** No horizontal overflow (scrollWidth 1440/1440 and 390/390; no white edge strips). Offer titles now kicker + Hebrew title ("THE BETTER 4 — Map your vision workshop" small caps over "סדנת חזון לפורצי דרך", desktop-07). Founder card straight, with a new warm green-shirt portrait and no band artefact (desktop-10/11, mobile-11).

### Checklist
- **Media:** business video in the hero; best photos large (services img-034/img-012, full-bleed workshop photo, closing img-c05). ✓
- **Composition:** hero and method are composed; mid-page now alternates card grids with bands and one full-bleed image. Offers (6 pale cards, desktop-07) and blog (3 pale cards, desktop-12) are still plain card grids, but now separated by stronger sections. 
- **Typography:** Frank Ruhl Libre + Heebo 400, generous size and leading; testimonials set as display quotes (desktop-09); mixed-script titles resolved.
- **Colour:** white + two greens carry the page; salmon is again the one action.
- **Hierarchy/rhythm:** clear; pace varies.
- **Polish:** clean at both widths; remaining nits below.
- **Distinctiveness:** heart board, title strips and the stage pills are this brand's own; the case-study heart echoes it.

### Score 8/10
Clearly professional, airy and on-brand, clearly better than the current Wix site. Below gold (Global Surf) because after the method the page still leans on standard card grids (offers, blog, team) rather than each section being its own moment.

### Remaining fixes (not blocking; biggest first)
1. **Founder card:** the text column sits low with ~110 px empty above "הדס דרכלי" (desktop-10/11). Vertically centre the text against the portrait or top-align both.
2. **Mobile swipe rows** (offers, courses, blog — mobile-08, mobile-09, mobile-13): the next card is clipped hard at the 32 px inner gutter, not at the screen edge, and there is no position indicator. Let the row bleed to the screen edge (scroll-padding 16 px) and add the same dots used by the testimonials.
3. **Offers grid** (desktop-07): six identical pale cards. Give the two priced flagship workshops (THE BETTER 4, Brand & Breakfast) a photo header (img-c03 / img-c05 crops, 16:9) so the grid has scale contrast.
4. **Stage pills under the heart** (desktop-04/05) duplicate the stage labels on the right; consider dropping the inactive-state pill styling difference or tying a tap on a pill to scroll to its stage.
5. **Blog cards** (desktop-12): add a post image (when the dossier has one) or a green strip title treatment so the block isn't three grey text cards before the Instagram strip.

### Keep
Everything kept in round 1, plus: the method's single-piece start and overlap fill, the green testimonial band, the dark courses band, the full-bleed workshops photo with its title strip, the case-study green heart panel, mint WhatsApp pills on cards, the dark footer.

**One sentence for the pick:** the most personal of the three — her own heart-shaped vision map as hero and method — now with a finished set-piece and a varied, green-led page; 8/10, pass.

---

# Round 1

visual-critic 0.1.1 · run 2026-10-il-brand-01 · 2026-10-18
Page: `sites/mutag-meitiv/mockups/unique/dist/index.html` (build 70c85d3877b9567a; shared set `sites/mutag-meitiv/mockups/unique/shots/`, 17 desktop + 25 mobile captures, 0 console errors). Also walked it on http://localhost:8973 with playwright (1440 and 390).
Current site: `reports/2026-10-il-brand-01/current-site/shots/` (desktop-00…06, mobile-00…02).
Calibration applied: the quality bar (Global Surf gold) and the non-surf parts of Shahar's calibration. Surf-only rules (orange, script titles, light-theme-for-surf) not applied, per the brief and concepts.md.

**Verdict: FAIL — 7/10.** Better than the current site: **yes** (first screen and whole page). Below 8, so it goes back to the designer.

## Three-second test

- **1440 (desktop-00):** warm and personal. First I see Hadas's face in the pine forest inside a thin green heart, then the two green title strips. It is clean and airy and it reads as her brand right away. I'd keep scrolling. The right half is a little thin: a 20 px tagline and one button against a big composition on the left.
- **390 (mobile-00):** the best screen of the page. The heart, her photo, the playing table clip and the award seal fill the width. Below are the title strips, a one-line tagline and the salmon button. It all fits in 844 px.
- **Current site (current-site desktop-00 / mobile-00):** a dark-green Wix block with a circle portrait and a four-badge row, plus four boxes with underlined titles. On mobile the nav and the boxes overflow off-screen. The new first screen wins clearly.

## Checklist (evidence)

- **Media.** vid-004 plays in the hero's 9:16 piece (`table-464.webm`, playing, 220 px wide at 1440 and 115 px at 390; it is the left piece in desktop-00 and mobile-00). img-013 leads, sharp at its size. The services use img-034 and img-012 big and well cropped (desktop-01: the yellow jacket by the ring canvas, the canvas by the window). The closing img-c05 is wide (desktop-14/15: women holding their boards), the page's best photo moment. Weak spots: the workshops section shows one small tilted photo floating at the far left (desktop-07/08), and its vid-002 tile never reads as video in the set. The founder photo img-001 has a visible darker horizontal band across its lower third (desktop-12 top, mobile-17). Hard-fail check: the first screen carries no ≥ 1920 px photo (img-013 is 1728 px). I accept the concept's reason: the pieces are about 300 px wide, so resolution is not the limit, and the green shirt carries the brand.
- **Composition and grid.** The hero is intentional and balanced. The method set-piece is not. In desktop-03 the heart opens on two **empty grey placeholder slots labelled THINKING / SENSING**, and in desktop-04 the MAKING / INFLUENCING slots are empty. That reads as unfinished, not as anticipation. When full (desktop-06), the four pieces sit as a stiff 2×2 grid that spills over the heart's bottom point, not a composed vision map. From section 3 to the blog nearly every block is the same pale-grey rounded card: services, testimonials, credentials, 15 logo cards, 9 offer cards, 3 course cards, team, blog (desktop-01…13). That is template rhythm.
- **Typography.** Frank Ruhl Libre and Heebo 400 are a good pair. The headings are confident ("כלים לבניית עסק מיטיב", "מתודת "מותג מיטיב"") and the body is large and airy, which meets brief 8. Problems: the mixed-script offer titles break badly. "THE BETTER 4 — Map your vision workshop — סדנת חזון לפורצי דרך" runs to three ragged lines (desktop-08, mobile-12), and "הרצאת הדגל — BRANDS OF CHANGE" also breaks badly. The testimonials are set as long body-text paragraphs (desktop-02 right card, desktop-10), not the concept's 26 px display quotes, so proof reads as a wall of text.
- **Colour.** White ground, deep-green strips (desktop-00, desktop-03 motto), one dark band (ON AIR, desktop-13). The salmon booking colour is unmistakable and the deep-green label works. But salmon is on about 20 buttons per scroll (9 offer cards plus courses plus header plus bar, desktop-08/09, mobile-12). It stops being "the one action" and turns the lower page salmon-and-grey. Below the hero the client's "leading greens" (brief 6) appear only in the motto strips and the ON AIR band. The footer is pale (desktop-16), not the `#173B34` the concept specified.
- **Hierarchy and rhythm.** Good at the top (hero → two services → motto). Then the pace flattens. Dead whitespace: about 180 px between the motto and the method heading (desktop-03), about 200 px of empty band above the method's MAKING step (desktop-05), and about 220 px of nothing between the testimonial dots and "צוות עם משמעות" (desktop-11; mobile-17 shows the same gap). After the hero there is no full-width image moment until the closing.
- **Polish.** Measured horizontal overflow: scrollWidth 1442 at 1440 and 391 at 390. Every tinted band shows a white 2 px strip at its left edge (desktop-01, 07, 09, 16). The demo case study's whole right half is a hatched placeholder with a "תמונה לדוגמה" pill (desktop-09/10). On the home page that looks like a missing image. The founder card is rotated (desktop-11/12, mobile-17) although the concept keeps everything outside the hero and method straight. The team grid is clean (desktop-12). The mobile persistent bar is well made (mobile-04). The footer is tidy, with pill contact buttons and icon socials (desktop-16).
- **Distinctiveness.** The heart board in the hero belongs to this business alone: her logo shape, her template, her table on video. Below the fold the page could be any consultant's card template.

## Score: 7/10

The hero is at the bar (8–9). The rest is clean, professional and readable, but it is card-template competent rather than designed moments. The method set-piece is the concept's "one thing", and it shows empty placeholder slots and ends as a grid. Against gold (Global Surf "the-sign"/"postcard"): those make every section its own moment with full-bleed media. This page has one strong screen, then 10 sections in the same card idiom. It is above the current site, below gold.

**Better than the current site?** Yes. First screen: unique desktop-00 vs current desktop-00, and mobile-00 vs current mobile-00 (the current mobile overflows). Whole page: unique desktop-sheet vs current desktop-sheet (the current site has underlined headings, raw Spotify embed, cramped team columns).

## Fix list (biggest effect first)

1. **Make the method set-piece finished at every scroll position.** Remove the grey labelled placeholder slots (desktop-03/04). The heart starts with only its outline and the pieces land into open space. Compose the four pieces as a real vision map inside the heart (overlapping, varied sizes, 4:5 crops, −3…+2°, all inside the outline), not a 2×2 grid spilling over the point (desktop-06). Cut the dead bands above MAKING (desktop-05) and between the motto and the method heading (desktop-03) to ≤ 96 px.
2. **Break the card monotony and bring the greens back below the hero.** Give 2–3 sections their own ground and form. Testimonials: a full-width `#00574C` band with one quote at a time in Frank Ruhl Libre 26–30 px white, shortened to an excerpt with "קראו עוד", with the dots. Proof: credentials plus a logo strip on white without per-logo cards. Footer: `#173B34` as specified. Add one full-width image moment mid-page (img-033 or img-c03 wide) before the offers.
3. **Ration the salmon.** Keep it on the header, the hero, the bar, the two service blocks and the closing. On the 12 offer/course cards use a deep-green text-and-icon pill ("כתבו להדס" in `#00574C` on a `#EEF4F2` pill) so the salmon stays the one action.
4. **Fix the workshops and case-study blocks.** Lay out "הרצאות וסדנאות" as a real split: the vid-002 portrait tile at ≈ 320 px beside the heading and intro, top-aligned, no floating orphan photo (desktop-07/08). On the home page, replace the hatched "תמונה לדוגמה" half of the demo tile (desktop-09) with a typographic panel (the four stage names on a green strip, or the challenge quote) until real images exist.
5. **Polish pass.** Kill the 2 px / 1 px horizontal overflow (white edge strips on tinted bands). Straighten the founder card (desktop-12, mobile-17) and use a crop of img-001 that avoids the dark band, or use img-034. Set the offer titles as Hebrew title plus a small Latin kicker line (e.g. kicker "THE BETTER 4", title "סדנת חזון לפורצי דרך") so no title breaks into three ragged mixed-script lines. Close the empty gap under the testimonial dots (desktop-11).

## Keep

- The hero exactly as composed, at both widths: the heart outline, img-013, the playing vid-004 piece, the award seal plus text label, the two green title strips, a one-line tagline and one salmon button (desktop-00, mobile-00).
- The two lead-service cards with img-034 and img-012 (desktop-01).
- The motto on green strips (desktop-03, mobile-04).
- Frank Ruhl Libre with Heebo 400, the large airy body text and the measure.
- The team grid (desktop-12), the Instagram strip (desktop-14), the closing over img-c05 (desktop-15), the mobile persistent bar (mobile-04), and the footer's pill contact buttons (desktop-16).
- No lines, borders or underlines anywhere.

## One sentence for the pick

A distinctive, personal heart-board hero that clearly beats the current site, followed by a clean but generic run of grey cards and an unfinished-looking method set-piece. **7/10, fail.**
