# Layday Surf Ahangama v2: visual-critic, station 4f (quick)

visual-critic 0.1.2 · run `2026-10-lk-surf-01` · 2026-10-20 · mode: quick, round 1.
Pages: `sites/layday-surf-ahangama-v2/mockups/{calm,interactive,unique}/dist/index.html`. For comparison only:
`sites/layday-surf-ahangama/mockups/{calm,interactive,unique}` (run `2026-09-ahangama-02`, round 3; its unique "Inside" is now the gold page `agents/designer/gold/layday-surf.html`).

## Bar and evidence

- **Current site: none.** `dossier.existing_site.url` is null. The business has no website and no socials, only three OTA listings and a Google pin. So per base.md the side-by-side is with the gold pages (Layday "Inside", the Global Surf standard) and `agents/designer/custom.md`. "Better than current site" is n/a, and there is nothing to shoot into `reports/<run>/current-site/`.
- **Media the designer had:** no video (`videos[]` is absent). 22 Booking.com photos, the largest 1024 px, so nothing can honestly go full-bleed. That caps the first-screen media for every variant. The rubric's media hard fail does not apply (no video, no ≥ 1920 px photo).
- **Shots:** v2 is the shared set `sites/layday-surf-ahangama-v2/mockups/*/shots/{desktop,mobile}-sheet.png` (reused, unchanged builds). The earlier round was shot fresh into `sites/layday-surf-ahangama/mockups/*/shots/`. My own first-screen and mid-page frames at 1440×900 and 390×844 are in the scratchpad as `{v}-1440.png`, `{v}-1440-mid.png` and `{v}-390.png`. All frames are deleted after this round; every line below says what the frame showed.
- **Skills used as evidence:** the tasteskill inspector on all six pages (findings quoted per page). `/emil-design-eng` and `/design-motion-principles` were applied as a read of the motion CSS: all three v2 pages use Emil's ease-out `cubic-bezier(0.23,1,0.32,1)`, presses at 120–140 ms, a 560 ms section entrance, IntersectionObserver reveals and a `prefers-reduced-motion` branch. The motion is restrained and correct, and none of it is the slop pattern. `/impeccable critique` was not run as a separate pass; its hierarchy, type and colour checks are folded into the checklist.

---

## v2 calm: "Samples" (specimen catalogue)

**Three-second test.** 1440 (`calm-1440.png`): a white left half holds a heavy rounded grotesque headline top-left and a small red pill bottom-left, with about 350 px of nothing between. The right half is a grey board: the berth photo, two flat swatch tiles (yellow, tan) and a cropped third column. I see the berth photo first. The swatches read as images that failed to load. Would I keep scrolling? Mildly. 390 (mobile sheet, frame 1): text only. Headline, tagline, rating line and a grey "Call" pill fill the screen. The photo board starts at the fold and the red "Check dates" bar sits at the foot. No picture is on the phone's first screen.

**Checklist**
- **Media:** the berth photo (img-002) leads on desktop at native size, which is good. On the phone, nothing does. The flat swatch tiles take photo slots in the board (desktop-sheet frame 1, tiles 2 and 4). The beach frames sit as two 1024 px prints under "The wave" (sheet frame 8), fine.
- **Composition:** the hero has two unrelated halves. The inspector flags `empty-middle` ("Just one dorm": content at both edges, 1984 px of nothing), a 516 px blank gap at 7524 px, `off-centre` margins (32 left, 64 right) and a sideways-scrolling row. The "Newly built" section puts a photo inside a large yellow ring (sheet frame 5), a decorative device with no meaning for this place.
- **Typography:** one family, Pilcrow Rounded, at seven sizes. custom.md asks for a readable text face plus one expressive display face, and there is no display face. The section heading "The dormitory [thumbnail] is air-conditioned, with lockers [thumbnail]…" sets photo chips inline in the sentence (sheet frame 2). It is a gimmick and reads as emoji. Body and captions in the guest and amenity blocks are about 12–13 px on the sheet, too small.
- **Colour:** white and light grey grounds with one red (#d91628) booking colour and white text on it. The rule is met. But the red is not from the place (yellow plaster, teak, cane), and next to the berth's yellow it reads as a generic sale button.
- **Hierarchy and rhythm:** the sections are the same pace: heading left, small text, a photo. Three rating cards in grey boxes (frame 6) are a card row. The footer "Layday" set in letters on stepped colour blocks (frame 10) is the one memorable moment, and it sits at the very bottom.
- **Polish:** clean pills and a working date panel (arrival, nights stepper, leaving), with dot navigation on the room gallery. The inspector FAILs `covered-text`: "5.0/5" is 100 % hidden at 768 and 390.
- **Distinctiveness:** low. With the swatches removed it is a tidy template.

**Score: 6 / 10.** Competent template level. The closest reference is the Lavish v2 "Prints" family. It sits below the gold "Inside" in idea and below the Global Surf standard in media use and atmosphere.
**Better than current site:** n/a (no site). **Against the gold:** no (`calm-1440.png` vs gold Layday first screen).
**Pass/fail:** **FAIL** (below 8).

**Fix list**
1. Make the first screen one composition. Put the berth photo (img-002, 576×768) and img-018 (1024 px) side by side at native size, with the headline set beside or under them on the same grid. Remove the 350 px void between the headline and the CTA.
2. Remove the flat swatch tiles from the photo board, or make them carry real content (the rating, check-in times). An empty colour block in a photo grid reads as a broken image.
3. Add the expressive display face custom.md asks for (a script or an editorial serif for section titles), and lift body and caption text to at least 16 px.
4. Take the booking colour from the place, for example a deep teak/plum or the darkened yellow with white text, instead of the stock red.
5. Remove the inline photo chips from the "The dormitory…" sentence and the yellow ring frame. Show the room with the gallery that is already there, larger.
**Keep:** the date panel with the nights stepper, the room gallery with dots, the stepped-block "Layday" footer, the filled pill buttons.

---

## v2 interactive: "One room"

**Three-second test.** 1440 (`interactive-1440.png`, desktop-sheet frames 1–2): "Just one dorm" set huge (161 px, Libre Franklin 700) on a pale yellow ground, with the berth photo (img-002) right at native size and a plum "Check dates" button. On scroll the ground deepens to the plaster yellow and the photo crossfades to img-018. Immediate, confident and in the business's own colour; I would keep scrolling. 390 (mobile frames 1–2): the same headline at 58 px, the tagline, the berth photo nearly full width, and a plum bar at the foot. Strong for a phone.

**Checklist**
- **Media:** the two best berth photos lead at native size, the most honest use of 1024 px material in the round. The room gallery (img-012 and others) has dot navigation and arrows (`interactive-1440-mid.png`), as custom.md asks. Below the fold, single small prints float in white space (sheet frames 3, 7: a cabinet print top-right with nothing else) and look unplanned.
- **Composition:** the hero is excellent. After it the page turns into a generic editorial page. The inspector flags `empty-middle` ("The room": 1955 px of nothing between) and `long-pin` ("Just one dorm" stays on screen for 3 screens). The Rosa block shows an empty grey panel at file:// (frame 9). The embed is refused locally; the reserved space is correct, but it looks dead in review.
- **Typography:** Libre Franklin for text and a brush script for section titles ("The place", "The room", "Guests", "Finding the door"). This is exactly custom.md's "readable face + expressive script" and the old-site bar. The script is legible at 54 px. Body is 24 px/1.35 in the room block, generous and readable.
- **Colour:** white grounds, yellow taken from the plaster, one plum booking colour (#860f47) with white text. The rule is met. Plum next to the yellow is a good complement and not violet. Contrast is fine.
- **Hierarchy and rhythm:** the first two screens have a clear signature. Then the sections are all the same: script title, text left, image right. Guests (frame 6) is a quiet row of three scores, then a long quote beside a small sofa photo. The footer (frame 12) puts a big room photo with the contact card and filled booking buttons over it, a good ending.
- **Polish:** the "Bed in the dormitory" card in pale yellow with a plum button is clean (`interactive-1440-mid.png`). The inspector FAILs `covered-text`: "The room" is 100 % hidden at 768 and 390 at one scroll position. It also warns `name-only-title` (on a phone the h1 does not say what the business is; the tagline does, at 15 px).
- **Distinctiveness:** the first screen could only be this hostel. The rest could be any small guesthouse.

**Score: 7 / 10.** Clearly professional, with the best first screen of the six pages here. The closest reference is the gold "Inside" in having one idea in the owner's colour. It beats Inside on photography and type, and stays below the Global Surf standard because the page after the hero has no pace.
**Better than current site:** n/a. **Against the gold:** first screen yes (`interactive-1440.png` vs gold Inside, which has no photo). Whole page no: the sections below the hero are weaker than Inside's.
**Pass/fail:** **FAIL** (below 8).

**Fix list**
1. Give every section below the hero a composition of its own. Right now each is a script title plus text plus one small print. Concretely: "The room" as a wide gallery of img-012, img-005 and img-011 at their native sizes in one row, "Newly built" as three cane/basin/locker prints edge to edge (all the same 4:5 crop), and Guests with Beth's quote set large on the yellow.
2. Remove the stray single prints left alone in white space (cabinet top-right on the "Surf, chill" screen; the porch print beside two short quotes). Either group them or drop them.
3. Shorten the hero pin to two screens, and make something change on each (the photo swap is the change; the third screen is dead).
4. Fix the covered "The room" heading at 768 and 390, and put "Dorm hostel in Ahangama" in the h1 line on the phone.
5. Make the Rosa block show its plain-link fallback styled as a designed card when the iframe is refused, instead of an empty grey slab.
**Keep:** the hero (giant "Just one dorm", berth photo, yellow deepening on scroll), the script section titles, plum with white text, the room gallery with dots, the photo footer with filled booking buttons.

---

## v2 unique: "Name in plaster"

**Three-second test.** 1440 (`unique-1440.png`): a band of three photos edge to edge across the top (berth, cane lockers, room toward the garden, each 480 px wide, no upscaling). Under it a full-width yellow band carries "Layday" in Boska at 331 px, with the tagline and a plum "Check dates" beside it. It looks like a magazine masthead, warm and premium. I see the photos, then the word. I would keep scrolling. 390 (`unique-390.png`): the berth photo fills the top half, then the yellow band with the tagline and "Layday" at 113 px, then a plum bar. Strong.

**Checklist**
- **Media:** the best three interiors lead, edge to edge at native size. This is the right answer to the 1024 px cap. Later the beach prints run as a wide pair (desktop-sheet frames 2 and 7), and the room gallery has dots (frame 4).
- **Composition:** the first screen is balanced, with clear scale contrast between a giant word and small type. On scroll the wordmark shrinks and moves (frame 2 shows only the descenders of "y" crossing the top edge, which reads as a glitch on a still). The footer repeats "Layday" at 418 px, cropped at the bottom (frames 9–10). Mid-page sections are well spaced (`unique-1440-mid.png`). The "Bed in the dormitory" grey box with a separate plum box beside it is two boxes of different heights and does not read as one control.
- **Typography:** Boska is the only family, used for everything, body included. The display cuts are beautiful. At body and caption sizes the high contrast thins out: the amenity lists, guest attributions and the forecast lines on the sheets (frames 6–8) are spidery and hard to read at 390. custom.md asks for a readable text face for everything people read. The giant name is close to Shahar's "giant word … looks really bad" calibration. Here it sits on a plain colour band, not over video, so I judge it acceptable, but it is a risk at the pick.
- **Colour:** white with plaster-yellow bands and plum booking with white text. The rules are met, and the colour belongs to the place.
- **Hierarchy and rhythm:** the best pace of the three. White, then a yellow band (Guests, with a big italic quote), then white, then a big phone number. "Call or check dates" with "+94 77 855 3343" at about 100 px (frame 9) is bold and useful.
- **Polish:** the inspector FAILs `covered-text` ("Practicalities" 100 % hidden at 390) and warns `off-centre` (12 px left, 29 px right at 1440). The quote "…didn't want to leave …" breaks with "leave …" alone on the last line. The Rosa block is an empty grey panel with a black button floating in it (frames 6–7).
- **Distinctiveness:** high on the first screen and footer, medium in between.

**Score: 7 / 10.** Professional and the most "designed" first screen in the round. It sits a step below the Global Surf standard: one face doing body work it cannot do, a wordmark scroll that breaks on stills, and loose mid-page polish. Against the gold "Inside", it beats it on photography and colour and matches it on having an idea.
**Better than current site:** n/a. **Against the gold:** first screen yes (`unique-1440.png` vs gold Inside); whole page about even.
**Pass/fail:** **FAIL** (below 8).

**Fix list**
1. Add a readable text face for body, lists and captions (a humanist sans or a low-contrast text serif). Keep Boska for the name, the section titles and the big quote and phone. At 390, set the body at 17 px or more.
2. Make the booking card one control: "Bed in the dormitory" and "Check dates" in one plum-edged or yellow card, the same height, with the button inside it.
3. Fix the wordmark scroll so no frame shows a sliced "y" at the top edge (fade or clip it within its band). Show the footer "Layday" whole, not cropped by the viewport.
4. Fix the covered "Practicalities" heading at 390 and the off-centre margins at 1440. Keep "leave …" with its line.
5. Style the Rosa fallback as a designed card (headline numbers left, link button right) so the block never shows an empty grey panel.
**Keep:** the three-photo band plus yellow masthead, plum booking with white text, the yellow Guests band with the large quote, the huge phone number in "Call or check dates".

---

## Earlier round (round 3, run 2026-09-ahangama-02), scored for comparison only

All three share Urbanist 200 (thin) on a lilac-grey ground (#e8e9f0) with a violet booking colour (#3c1d51), 1 px ink rules and a "ladder" device. The inspector FAILs `hairline` on all three (9, 30 and 32 rules) and `headline-lines` on all three, FAILs `eyebrow` on all three, and warns 19–21 font sizes on all three. By today's custom.md (white grounds, no rules or borders, buttons not underlined links, photos leading) every one of them breaks the bar.

- **calm "Berth": 5/10.** First screen (calm desktop-sheet frame 1): a yellow box with a 3-line thin headline, a small berth thumbnail outside it, rungs on a vertical rule, a violet button and underlined "check dates on Hostelworld". On mobile (frame 1) a boxed card. Amateur polish: an outlined footer box with ruled booking links, a still page (0 moving elements), and overflow at 768.
- **interactive "Curtain": 5/10.** First screen (frame 1): a yellow box with a berth photo behind the drawn black curtain strings. The idea is legible, but the strings read as a barcode, and the hero headline is 44–75 % covered at 768 and 390 (inspector). Below the fold: a grey band, thin type and ruled amenity lists, ending in a yellow ruled table of booking links.
- **unique "Inside" (gold): 6/10 by today's bar.** First screen (frame 1): the drawn 3D yellow berth with lamp and niche, the headline lying in it. It was the round's one real idea and Shahar picked it. But it has no photograph on the first screen, a violet CTA, a ladder rule pinned beside every "Check dates", thin type and 32 hairlines. The empty drawn frame on screen 2 (a yellow card with a ladder on lilac) reads as unfinished.

## Comparison

| variant | new score | earlier score | better than current site | better than earlier round |
|---|---|---|---|---|
| calm | 6 | 5 | n/a (no site; vs gold: no) | **yes**: photos lead on desktop, white ground, filled buttons, a real date panel and a gallery, no rules. Still a template, and its phone first screen has no picture. |
| interactive | 7 | 5 | n/a (no site; vs gold: first screen yes, page no) | **yes, clearly**: the best first screen of all six. Real berth photos in the business's yellow, the script titles custom.md asks for, readable body, plum not violet. Its weak point is the generic page below the hero. |
| unique | 7 | 6 (gold "Inside") | n/a (no site; vs gold: first screen yes, page about even) | **yes, narrowly**: it keeps an idea on the first screen and adds the business's photographs, the place's colour and filled buttons. It loses some of Inside's singularity, and its one-face typography is less readable than it should be. |

## Ranking (visual quality only)

1. **interactive (7)**: the best first screen of the round, and the only page whose type meets custom.md as written. It needs a designed page under the hero.
2. **unique (7)**: the most striking masthead and the best section pace. A display serif doing body work and loose polish hold it back.
3. **calm (6)**: a tidy, competent template. The empty half, the swatch tiles and the stock red keep it generic.

**Result:** all three fail the gate (below 8/10) and go back to the designer before Shahar sees them. All three beat their round-3 counterparts.
