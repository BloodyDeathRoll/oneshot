# KA Surf Hostel v2 — visual-critic 4f (quick), run 2026-10-lk-surf-01

visual-critic 0.1.2, 2026-10-20. Runtime prompt read in full (`tools/prompt.mjs visual-critic`).
Pages: `sites/ka-surf-hostel-and-restaurant-v2/mockups/{calm,interactive,unique}/dist/` (new) and
`sites/ka-surf-hostel-and-restaurant/mockups/{calm,interactive,unique}/dist/` (earlier round 3, for comparison only; dists present, not rebuilt).

**How it was shot.** Each dist was served over http (`python3 -m http.server`, one port per dist). `tools/shoot.mjs http://127.0.0.1:<port>/`
was run at 1440 and 390 (`--settle 1200`) into a scratch folder, not the designer's shared `shots/` (that set was shot from file://). Also used: the tasteskill
inspector (`inspect.mjs --widths 1440,390`) and a Playwright walk (third-party hosts on load, iframe state after a slow scroll, the booking sheet).
All screenshots were deleted after scoring, so each evidence line below describes its shot in words.
`/impeccable critique` and the motion-audit skills were not run in this quick pass.

**Side by side.** KA has no website (`existing_site.url: null`). The comparison is therefore the OTA listing a visitor would otherwise land on
(Hostelworld/Booking.com chrome), plus the gold page for this business (`ka-surf-hostel.html`, which is the earlier round's `unique`, "Canopy", and is scored below).
The Global Surf gold (`the-sign`) was shot as calibration, but its media is not in this worktree (blank image boxes), so it was judged from `gold/global-surf-notes.md` and the calibration in references.md.

Facts common to all three new variants (from the Playwright walk):
- **The Rosa widget and the map never appear** (interactive and unique). Each iframe is `loading="lazy"` plus `hidden` (display:none), and is revealed only on its own `load` event. Chromium never loads a lazy iframe that is display:none, so `load` never fires. After a full slow scroll plus 4 s, both iframes were still `display:none` at 0×0 and no rosa.surf frame existed. What a visitor sees is a large white card that holds only "See today's forecast… / Open Rosa", and a grey map tile. This is a build bug, not a headless artefact: earlier-round `unique` loaded the same widget in the same walk.
- **Fonts come from third-party CDNs on first load**: fonts.gstatic.com (calm), fonts.googleapis.com and gstatic (interactive), gstatic and cdn.fontshare.com (unique). This is the critic's dimension 7, noted here only because it is visible.
- No video exists (`videos: null`). Every inspector run carries WARN `no-footage`, which is correct for this business, so it does not count against the pages.

---

## New round

### calm — "Patio" (split stage, mint field)

**Three seconds.** 1440 (desktop-00): a calm, tidy split. On the left is a mint half with the cottages-under-palms print at about 384 px. On the right is "Five minutes from Kabalana Beach" at 52 px, a papaya "Check dates" button and the 9.8 line. It reads pleasant and honest, but small: nothing pulls the eye. I would scroll on, without excitement. 390 (mobile-00): the print is about 228 px on mint, with the headline under it. Clean, but it could be any boutique template.

- **Media:** KA's own photographs throughout, never upscaled, one 3:4 crop. The strongest ones (cottages, dorm, plate, open-air bathroom) are used. They are all small: no picture holds a third of the first screen (inspector FAIL `focal-point`). The sticky "fixed half" prints are often cut by the section edge mid-scroll: desktop-03 shows the dorm print sliced at the bottom, and desktop-08 shows the bathroom print half off-screen.
- **Composition:** the split works on the first screen. Down the page it turns into a long reading column of text and two-ended lists (desktop-03 to desktop-09). Breakfast breaks the split as promised (desktop-05, full mint). desktop-09 to desktop-10 are mostly empty mint/white beside small prints.
- **Typography:** Albert Sans is clean. Kalam section titles ("Dorms and private rooms", "Breakfast, every day") are the handwritten touch the calibration asks for, and they read well. Body and list text are small at 1440 (about 15–16 px, light grey).
- **Colour:** mint, cool white and papaya all belong to the photographs. White on papaya, booking-only, is unmistakable. Consistent through to the footer.
- **Hierarchy/rhythm:** clear, but even. Every section has the same weight and the same small print. There is no moment.
- **Polish:** no rules, no underlined links. The footer is designed (Kalam name, three platform buttons, call/IG buttons). Mobile has a persistent "Check dates + call" bar (mobile-01 onward). The booking popover opens in-page with the room list. Off-centre margins (inspector WARN: 120/182 px).
- **Distinctiveness:** low to medium. It is a tasteful split template, and the mint is its only signature.

**Score 6.5/10.** It is closest to a well-made boutique template. It is above the earlier round on every calibration point, and well below the Global Surf gold bar ("distinct, well-designed sections", rooms sold big).
**Better than current presence:** yes. On both the first screen and the whole page (desktop-00, desktop-sheet) it beats an OTA listing: own colour, own pictures, one button. **Hard fail: below 8.**

Fix list:
1. Make the first screen own a focal point. Fill the mint half with two or three prints at different scales (cottages 384 + room 288 + plate 240, overlapping slightly), or bring the headline to about 64–72 px. Right now nothing holds a third of the viewport.
2. Stop the sticky prints being sliced at section edges (desktop-03, desktop-08). Release each print with its section (`position: sticky` inside the section, bottom padding equal to the print's height), or crossfade instead of curtaining.
3. Sell the rooms bigger. Use the dots slideshow at 432 px with two or three prints visible per room group, and move the bed lists into a compact " | " line under each group rather than a long two-ended list.
4. Raise body text to 17–18 px in ink, not grey, at 1440. Cut the amenities sheet (desktop-08/09) to one short three-column block.
5. Self-host Albert Sans and Kalam (subset) instead of fonts.gstatic.com.
Keep: the mint/papaya palette, white-on-papaya booking, Kalam titles, the footer, the mobile booking bar, the in-page booking sheet.

### interactive — "Stories" (pinned poster, denim-blue field)

**Three seconds.** 1440 (desktop-00): a single 360 px story frame dead centre on a big pale-lavender page, with "Five minutes" to its left and "from Kabalana Beach" running to the right margin. My eye goes to the frame, then to the empty space around it. The split headline reads lopsided: the left half sits near the frame and the right half runs to the edge. It feels like a small phone mock floating on a big screen, which is the failure the concept itself named. 390 (mobile-00): the headline is stacked above the frame (no split), and the frame is about 300 px with reel slivers. Fine, but generic.

- **Media:** own photographs, story-cycled in the hero with progress segments and a pause control. Chapter circles (desktop-01) are a nice touch. The Instagram grid (desktop-11) is the best picture moment on the page, at about 280 px tiles. The beach rail is good.
- **Composition:** the denim-blue rooms block (desktop-01 to desktop-03) is well composed, with prints beside lists. Then come large empty stretches. desktop-07 holds a lone "The beach" heading at the foot of an empty screen. desktop-08 is a forecast block whose right half is an empty white card (the Rosa bug). desktop-08/09 have "On Instagram" sitting under the header (inspector FAIL `covered-text`, 50% hidden). desktop-11/12 have a grey empty map box.
- **Typography:** Public Sans is solid. Gochi Hand titles read childish/marker at 40–56 px ("Dorms and private rooms", "KA Surf Hostel" in the footer): less tasteful than Kalam, below the "tasteful and readable" calibration. Inspector: 15 font sizes.
- **Colour:** denim field plus deep-runner button is a good idea from the bed linen, and white on #306588 is fine. The pale lavender ground is cold against it.
- **Hierarchy/rhythm:** three good blue sections, then the page loses pace: empty screens, two broken embed boxes.
- **Polish:** a designed footer and a mobile bottom bar, and the booking `dialog` opens in-page. Against that: the broken Rosa and map boxes, the covered heading, and the off-balance hero.
- **Distinctiveness:** the story frame and chapter circles are distinctive in principle. As built, the hero is too small to land.

**Score 6/10.** It is closest to a competent product-landing template with one interactive gimmick. Below the gold bar because of the empty screens and the dead embeds.
**Better than current presence:** yes (desktop-00 / desktop-sheet versus an OTA listing), but narrowly on the first screen. **Hard fail: below 8.**

Fix list:
1. Fix the embeds. Drop `loading="lazy"` from the hidden iframes (or un-hide them before setting `src`), so the Rosa widget and the map actually appear (desktop-08, desktop-12). Two big white boxes are the most visible defect on the page.
2. Make the hero frame the centre of a composed screen. Use a 440 × 586 frame at 1440, set both headline halves at 56–64 px tight to the frame's left and right edges (equal gaps), and tint the ground with the denim field so the frame does not float on blank lavender.
3. Replace Gochi Hand with a calmer hand (Kalam-like weight), or use it only for one or two titles. Footer "KA Surf Hostel" in Gochi looks juvenile.
4. Close the empty gaps (desktop-07: "The beach" alone at the foot of a blank screen; desktop-10/11: "On Instagram" under the header). Cap section padding at about 120 px and keep each heading with its content.
5. Self-host Public Sans and Gochi Hand. Remove the Google Fonts CSS request.
Keep: the denim/runner palette, chapter circles, the blue rooms block with prints beside lists, the Instagram grid, the in-page booking dialog.

### unique — "The roll" (contact sheet)

**Three seconds.** 1440 (desktop-00): the whole viewport is KA's own camera roll, a masonry of about 16 sharp upright frames (cottages, room, plate, open-air shower, dorm, long table, sunset, boards, the ring lamp). One clear cell in the centre holds "KA Surf Hostel / Five minutes from Kabalana Beach / Check dates / 9.8". It is the first screen in any KA round where you feel the place at once. I would scroll. 390 (mobile-00): the name, headline, a full-width papaya button and the 9.8 line sit on top, with the two-column roll below. Warm and honest.

- **Media:** the best use of KA's material in any round. Every frame is shown at about its native size, so nothing is upscaled, and their sheer number replaces a full-bleed hero. After the first screen, pictures return to normal small prints. The desktop Instagram strip is 6 thumbnails at about 70 px (desktop-10), far too small.
- **Composition:** the hero is strong. The rest is the shared section skeleton (rooms with slideshow, guests, breakfast, amenities, cyan beach, Instagram, getting-here, tile footer). desktop-07 has a large empty white gap after the amenities. desktop-08/09 have a cyan band with an empty top strip, and the Rosa card is an empty white box (bug). desktop-12: the heading "Getting here" is 100% covered at one scroll position (inspector FAIL `covered-text`).
- **Typography:** Switzer is clean and the Nanum Pen Script titles are light and handwritten, which fits. But the hero type is small for the centre of a full-screen composition (40 px headline, inspector FAIL `focal-point`), and the name above it is only 22 px.
- **Colour:** cool white, papaya booking (white on it), board cyan for the beach block. The cyan is loud and pool-like next to the papaya. Acceptable, but the beach block is the weakest colour moment.
- **Hierarchy/rhythm:** an excellent opening, then a flat middle. The tile footer (desktop-11/12: papaya booking tile, call, find us, Instagram, ratings) is a good close.
- **Polish:** the header appears only after the hero, which is intentional. The booking sheet (side panel at 1440, sheet at 390) holds the room list, three platform buttons and Call, all in the page's type and colour. The platform marks promised by the concept are absent. Mobile bar present.
- **Distinctiveness:** high on the first screen. It is KA and nobody else.

**Score 7/10.** In quality, the first screen is closest to the Global Surf gold's "lead with the business's strongest media", achieved without big media. The page below it is template level and drags the whole down.
**Better than current presence:** yes, clearly, on the first screen (desktop-00, mobile-00) and the whole page (desktop-sheet). **Hard fail: below 8.**

Fix list:
1. Fix the embeds (same bug as interactive): the Rosa widget and map stay hidden forever. Un-hide them or drop `loading="lazy"`.
2. Carry the roll down the page. Each section should open with a band of three to five frames from the roll (rooms, table, plate, beach) instead of one 288 px print. Make the desktop Instagram block a 4–6-column grid at 200+ px, not 70 px thumbnails (desktop-10).
3. Give the hero cell more voice: headline at 56–64 px, name at 28 px, and a wider centre cell (2 columns) so the text block holds its own against 16 photographs.
4. Remove the empty stretches (desktop-07 white gap; desktop-08/09 empty cyan top band) and the covered "Getting here" (desktop-12). Consider a softer field for the beach (a sea-glass tone sampled from `img-016`) rather than pool cyan.
5. Self-host Switzer and Nanum Pen Script (fontshare and Google CDNs today). Add the platform marks to the booking sheet as the concept specifies.
Keep: the contact-sheet first screen, the papaya booking sheet, the tile footer, the handwritten titles, the room slideshow with dots.

---

## Earlier round (round 3, `sites/ka-surf-hostel-and-restaurant/mockups/`), scored for comparison only

### calm (earlier)

Three seconds (desktop-00): a giant two-line light headline (about 96 px) over three small prints standing on a leaf-green block. A watermelon "Check dates" button with ink text, and an underlined "or call" link. Busy and dated.
Evidence: inspector 8 FAIL (`hairline` ×8 ruled room list, `outlined-box` ×9, `eyebrow` ×3, `headline-lines`, `edge-text`, `covered-text`, `still-page`). Underlined "check dates" links on every room row (desktop-01/02). The booking close is three outlined boxes plus one watermelon box (desktop-12). Footer links underlined. Mobile headline on three lines.
**Score 4.5/10.** It breaks the 2026-09-29 calibration on ink-on-orange, underlined action links, rules, the giant headline and the bare footer. Better than current presence: only marginally (own photos, but it reads like a document).

### interactive (earlier)

Three seconds (desktop-00): the headline and a huge "9.8", over a full-width strip of photographs chopped by green vertical slats. The slats read as a rendering fault. That is a decorative overlay on imagery, which the calibration bans.
Evidence: inspector 5 FAIL (`headline-lines` ×4, `eyebrow`, `hairline` ×8, `still-page`). Underlined room "Check dates" links and a ruled list (desktop-02). Ink on watermelon buttons. Rosa block as a row of day boxes (desktop-08, banned "row of days"). Text-link footer (desktop-10).
**Score 4.5/10.** Better than current presence: marginally.

### unique (earlier) — "Canopy", the picked page and current gold

Three seconds (desktop-00): cut-paper banana leaves framing a light three-line headline (about 138 px), a watermelon button with ink, and 9.8. It has an idea, but no photograph of KA on the first screen.
Evidence: inspector 8 FAIL (`headline-lines`, `eyebrow`, `hairline` ×13 including the header rule, `icon-cards`, `blank-gap` ×3 of about 400 px, `covered-text` for the hero headline at one scroll step, `still-page`). desktop-01/02 are two near-empty screens of green column. Underlined links throughout. The booking close is three watermelon/black tiles. On the plus side, the Rosa widget and the OSM map load (desktop-12, desktop-11).
**Score 5.5/10** against today's calibration (it was picked on 2026-09-22, before the 2026-09-29 calibration and the 2026-09-30 Global Surf bar). Better than current presence: yes on the idea, no on showing the place.

---

## Comparison: does each new variant beat its earlier counterpart?

- **calm: yes.** v2 fixes every calibration point the earlier calm broke: white on papaya, no rules or underlines, Kalam titles, a designed footer, a rooms slideshow with dots, and a moderate headline. It is calmer and more finished, though still template-even.
- **interactive: yes, narrowly.** v2 drops the slat overlay and the ruled lists, and adds a story frame, chapter circles, a real footer and a big Instagram grid. It loses some ground with two dead embed boxes and long empty stretches, where the earlier page's forecast at least rendered.
- **unique: yes.** "The roll" puts all of KA's own pictures on the first screen. That is the thing Canopy could not do, and the main gap the creative director named. It also clears Canopy's underlines, rules, giant headline and blank gaps. Canopy keeps the edge only in having working embeds and a more consistent single idea through the scroll.

## Visual ranking (new round)

1. **unique: 7.** The only first screen in four KA rounds that sells the place at a glance. The page below needs the roll carried through and the embeds fixed.
2. **calm: 6.5.** The most finished and consistent, and also the least memorable: small prints on an even split.
3. **interactive: 6.** A good story-frame idea, built too small, with dead embeds and empty screens.

None reaches 8. **All three fail 4f** and go back to the designer before Shahar sees them. If Shahar wants to compare anyway, `unique` is the one to look at.

## Final table

| variant | new score | earlier score | better than current site | better than earlier round |
|---|---|---|---|---|
| calm | 6.5 | 4.5 | yes (no website; vs OTA listing) | yes |
| interactive | 6 | 4.5 | yes, narrowly (no website; vs OTA listing) | yes, narrowly |
| unique | 7 | 5.5 | yes (no website; vs OTA listing) | yes |
