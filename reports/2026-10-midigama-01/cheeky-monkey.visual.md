# Cheeky Monkey: visual-critic report

Run `2026-10-midigama-01` · station 5 (full, final site) · **round 1** · visual-critic 0.2.0 · 2026-11-03.
Page: `sites/cheeky-monkey/final/dist/`, served over http at `127.0.0.1:8962` (python static server; `file://` blocks the self-hosted fonts, so that set was thrown away). Concept: 3 · unique "Pick your board" (`concepts.md` §4), the picked mockup `mockups/unique/`.

Shot set used (shared, deleted after the round, so each line says what the file shows):
- final: `sites/cheeky-monkey/final/shots/` desktop-00…19 and mobile-00…22 (1440 / 390, scrolled), shot 2026-11-03T18:0x over http, 0 console errors.
- current site: `reports/2026-10-midigama-01/current-site/shots/` desktop-00…05, mobile-00…06 (cheekymonkeymidigama.com, live).
- my own walk frames (scratch, deleted): `w-1440-800.png`, the set-piece at its widest.
- Also checked: tasteskill inspector (7 FAIL / 6 WARN), a Playwright pass (video state, the BY-SA image's rendered box), the picked mockup's sheet (`mockups/unique/shots/desktop-sheet.png`), `agents/designer/gold/global-surf-notes.md` and `layday-surf-notes.md`.

Independence: I did not open `critic-cheeky-monkey-r1/`, `experience/` or the critic's or experience-critic's reports.

---

## Three-second test

- **Current site, 1440 (current desktop-00):** a block of PHP "Notice: Function _load_textdomain_just_in_time…" text at the very top, then a centred logo and a menu, then a big but generic back-of-a-surfer photo with "Welcome to Cheeky Monkey / Your Surf and Yoga Camp in Midigama" in widely tracked white type, clipped off the bottom of the screen. There is no booking action. It reads as a broken WordPress site. **I would leave.**
- **Current site, 390 (current mobile-00):** the PHP notice fills the whole first half of the phone screen. The logo and hamburger come next, and the hero title runs over the surfer's head. A black "GOOD TO KNOW: we're renovating… not bookable" bar sits below it. **I would leave.**
- **Final, 1440 (desktop-00):** a flat illustrated beach (pale-blue sky, two blue sea bands, a white foam line, sand) with one tall board-shaped window in the centre, and the reel playing inside it. "Come as a stranger," on the left and "leave as a friend." on the right, both in a marker hand, plus a blue "Check dates on Booking.com" pill. It is clear, friendly and unusual, with one obvious button. But at this frame the window holds an extreme close-up of red and green resin rails, and for a second I can't tell what I'm looking at: it could be a fruit or an abstract smear. The drawn beach looks like clip-art, a children's-app illustration rather than this place. **I would keep scrolling, out of curiosity rather than desire.**
- **Final, 390 (mobile-00):** the same scene, portrait. The board fills most of the screen and the rails read better here (yellow with black splatter, red, sage), with the title above, the line below and a full-width blue CTA. **It's the stronger of the two first screens, and I would scroll.**

## Checklist (final site, both widths)

**Media**
- Video leads: vid-009, the only usable business-owned clip, plays inside the board window. Playwright: `cm-board.d1920.webm` on desktop and `m720.mp4` on the phone, both `paused:false`. ✔ The licence rule for the other eight clips is respected.
- **The set-piece breaks down at its peak.** At full opening, desktop-02 and w-1440-800 show a white Rockwell board at about 1080 CSS px wide, and **the white deck is visibly macroblocked**: grey 16 px compression squares across the whole board. It is the page's main item and the biggest moment on the page, and it looks like a low-bitrate phone reel blown up. On the phone, mobile-01 shows the m720 rendition opened to the full 390×1420 CSS area (about 1170 device px wide at DPR 3, so roughly a 1.6× upscale): the orange board and the red rail are soft, and the hand at the left edge is smeared. The gold bar is "sharp at every width" (`gold/global-surf-notes.md`). This isn't.
- **The water section opens on stock, not on the business.** desktop-03/04 and mobile-03 show a 1440×963 full-bleed of the Wikimedia "Indische Oceaan" photograph (CC BY-SA, credited, shown whole: Playwright confirms an uncropped 1440×963 `fill` box, so the licence rule is met). It is a hazy, grey, overcast shore under a dark tree, the dullest big picture on the page, and it sits directly above the business's own far better water pictures (desktop-05: img-100, a surfer walking into turquoise water, and img-103, the yellow fish in the shorebreak). The strongest material is placed second, and small.
- Strong uses: the pink-sunset img-134 band (desktop-13, mobile-14 top) is the most emotional moment on the page. The room slideshows are big, with 4–6 dots each (desktop-08/09, mobile-08/09), and the rooms are actually sold. The shop masonry (desktop-11/12, mobile-12/13: racks, the shaper at work, fin wall) is honest and plentiful. Baba at 4:5 among the boards (desktop-14, mobile-16) is good.
- **Package-card crops are too small to read** (desktop-06, mobile-05): each photo is squeezed into a narrow board-shaped window about 90 px wide inside a saturated colour block, so the yoga-on-the-roof and guests-on-the-beach photos become unreadable slivers.

**Composition and grid**
- Centred 1100 px column with full-bleed bands for the stock image and img-134. The rhythm alternates sand, aqua, pink and white grounds with wavy dividers. It's intentional, but the wave edges repeat between every section (desktop-03, 06, 10, 12, 16, 17, 18), so they become wallpaper rather than an accent.
- **Dead zones:** desktop-16 leaves about 250 px of empty aqua under the reviews before the wave. Inspector: "The rooms" has an empty middle 1418 px wide at 1440 (desktop-08 shows the script title alone at the left with nothing beside it). Desktop-17's closing board is a tiny 90 px sliver floating in an empty aqua field. On mobile-19 the board and closing line float in about 400 px of empty aqua, and the Instagram follow tile is a large blue ellipse that reads as a blob (desktop-18, mobile-21/22).
- The packages row (desktop-06/07) is four equal cards with a big price, a tidy hierarchy and the dated "Published 2021, call to confirm" pill. It is clean, and it is template-level.

**Typography**
- Permanent Marker for titles with Rethink Sans for text, true to Baba's hand-painted sign (img-122). Titles are readable at 28–52 px ("Catch waves, not worries", desktop-03). It suits a cheeky roadside shop and passes Shahar's "readable face + handwritten titles" bar.
- The hero pair "Come as a stranger, / leave as a friend." is split either side of the board on desktop (desktop-00). The left half sits lower than the right, so the line reads as two unrelated captions. The inspector flags both as pinned text over the moving picture.
- Inspector: 17 font sizes (13–52 px). That's too many steps; small grey 13–14 px detail lines are everywhere (package sub-prices, the room meta, the amenities run in desktop-14). The h1 is the 17 px wordmark.

**Colour**
- Booking blue `#0B72C4` with white text is unmistakable and used consistently: hero, room buttons, phone bar, footer (desktop-09, 18, mobile bar on every frame). ✔
- **Palette discipline breaks in the packages:** four saturated primary blocks (cyan blue, mustard yellow, signal red, grass green, desktop-06) appear nowhere else on the page. With the narrow board cut-outs in them they look like a toy catalogue or a kids' party flyer.
- The hero's flat illustrated beach (cornflower sky, two cyan sea bands, pale sand) is the only drawn element on an otherwise photographic page. It belongs to no photograph of this business: the place is a main road and a shop, not a cartoon beach. `concepts.md` specified a white ground for this hero, and the change to a drawn beach made it more generic, not less. The same drawing was in the picked mockup (`mockups/unique/shots/desktop-sheet.png`, frame 1), so the human saw it at the pick. I judge it on quality, not on compliance.
- The sand ground (`#f2e8d7`) is a yellow cream (inspector WARN). Next to the pink tint and the aqua it gives three warm and cool grounds in alternation, which is busy.

**Hierarchy and rhythm**
- The eye knows where to go on every screen: a script title, a short paragraph, then a blue button. The mobile phone bar ("Check dates on Booking.com" + "Plan a stay") is on every frame, mobile-01…22. ✔
- The pace is quite uniform after the set-piece: card row, card row, slideshow pair, masonry, band, split, split. Only img-134 changes tempo.

**Polish**
- Resting shadows on every button and card (inspector: 20 resting shadows plus a blue glow on `.btn`, visible under every blue pill in desktop-07/09/18). That's soft-UI-kit polish rather than studio polish.
- The guest quote dots run to 11 (desktop-16), and the controls are a long string of dots between two circular arrows.
- Inspector: with reduced motion, ten text blocks of the plan drawer stay invisible. That isn't on the visible first screen, but it is a finish defect.
- Nothing is broken at either width. The header blurs cleanly over content (desktop-03/04), and the footer has real buttons and icons (desktop-18, mobile-22). ✔

**Distinctiveness**
- One standing board as the window is an idea that belongs to a board shop, and no other business in the run has it. ✔ The illustrated beach and the primary-colour cards pull it back toward a generic "fun surf" template.

**Hero and motion (Shahar 2026-10-20)**
- Main item present: the WebGL board window with the business's own reel, opening in a scroll zoom-through (`canvas.gl` 1440×900 confirmed). There is one clear CTA, the header and a short line. ✔
- **But the main item's payoff is its weakest frame:** a macroblocked, upscaled white board (desktop-02, w-1440-800, mobile-01). The zoom delivers the viewer into the worst pixels on the page instead of a reward.
- Micro-animations exist (card tilt, dots, the CTA's rounded nose), but none showed up as a moment in the shot set.

## Score: **7 / 10**

It is clearly professional, cheerful and coherent. The rooms, shop and Baba sections are good, and the booking action is always one tap away. It is not yet an 8, for three reasons. The hero's media payoff is visibly low quality (compression blocks at the set-piece peak, a soft upscale on the phone). The water section leads with a dull grey stock photograph over the business's own sunny surf pictures. And two style choices, the clip-art beach and the four primary-colour package blocks, make it read as a friendly template rather than portfolio work.

**Closest reference:** `gold/layday-surf-notes.md` (Layday, a drawn first screen built around one object). This page shares that method, one object with the drawing as the stage. It falls below Layday because Layday's drawing is the business's own object (the berth, in its sampled colour), while this drawing is a generic beach that is not this business. It is well below the Global Surf gold, whose hero footage is "sharp at every width" and whose sections are each a designed moment.

## Better than the current site?

**Yes, clearly, at both levels.**
- First screen: final desktop-00 / mobile-00 against current desktop-00 / mobile-00. The current site opens on a PHP error, has no booking action, and its title is clipped and set over a face. The final has one clear CTA, the business's own footage and its own line.
- Whole page: final desktop/mobile sheets against the current sheets. The current site has thin sections, three small cards, no prices, no rooms and a translucent contact box. The final sells five rooms with galleries, dated prices, the shop, Baba, reviews and a real footer.

## Hard fails (visual)

- **Dimension 8 below 8/10 (7/10): hard fail by rubric.** Back to the designer.
- The video rule is met: the only usable clip is used. The first screen does not carry a ≥1920 px photograph, but the concept's reason (a business-owned reel in the board window) is one I accept, provided it is sharp (fix 1).
- The BY-SA atmosphere image is credited and shown whole and uncropped, so it is not a licence fail. It is a visual-quality problem (fix 2).

## Fix list (biggest effect first)

1. **Make the set-piece peak sharp, or stop it short.** Desktop: don't open the 1080 px reel to 1080 CSS px. Stop the zoom at about 600–700 CSS px wide (≤ 0.6 CSS px per source px), with the drawn or white ground around it. Or re-encode the d1920 rendition from `vid-009` source at a much higher bitrate for this use, because the white deck at 4–5 s is where the AV1/H.264 blocks show (w-1440-800). Phone: serve the d1920 1080-wide rendition, not m720, once the mask opens past about 50% of the viewport (mobile-01 is a 1.6× upscale). Pick the end frame from the rainbow-rail moment (10–13 s), not the flat white Rockwell deck, so the payoff is colour and not compression.
2. **Lead the water section with the business's own water.** Make img-100 (surfer walking into turquoise water, 1500×2000) or img-103 (yellow fish in the shorebreak, 2000×1333) the full-bleed band at desktop-04. Demote the grey "Indische Oceaan" stock photo to a small, whole, credited image beside "The spot" text, or drop it.
3. **Kill the four primary-colour package blocks** (desktop-06, mobile-05). Put each card's photo into a board crop at least 180 px wide on the page's own ground (sand or white), or use a plain 4:5 photo, so the picture reads (yoga on the roof, guests on the beach, the yellow fish, the racks). One accent colour, the booking blue, and no red, yellow or green fills.
4. **Replace the clip-art beach in the hero with this place.** Keep the board window and the marker lines. Set the board on the white ground the concept specified, or on a soft, desaturated full-bleed of img-147 (the main road framed by board noses) or img-109 (the white-walled rack). The flat sky/sea/sand bands are the most template-like thing on the page. On desktop, put "Come as a stranger, leave as a friend." on one baseline: both halves at the same height either side of the board, or one centred line above it as on the phone.
5. **Tighten the finish.** Drop resting shadows and the blue glow from buttons and cards (flat fills). Cut the type scale to about 5 sizes. Remove the 250 px dead band under the reviews (desktop-16). Give "The rooms" a lead room photo beside the title, or put the title above the grid (desktop-08). Make the closing board at least 260 px tall, or remove it (desktop-17, mobile-19). Replace the blue-ellipse Instagram tile with a tile the same size as the five photos (desktop-18).

## Keep

- The board-window idea and the WebGL reel inside it, the one CTA, and the marker titles over a readable sans.
- The mobile phone bar ("Check dates on Booking.com" + "Plan a stay") on every screen.
- The room slideshows: big, 4–6 photos each, the murals first, each room with its own Booking.com button.
- The shop masonry, the img-134 pink-sunset band, and Baba at 4:5 among the boards.
- The dated "Published 2021, call to confirm" price pills: honest, designed, not hidden.
- The footer with real buttons and icons.

## Report

Score **7/10**: **fail** (hard fail, below 8). Better than the current site: **yes**. Top three fixes: (1) a sharp set-piece peak (no macroblocked or upscaled reel), (2) lead the water section with img-100 or img-103 instead of the grey stock band, (3) remove the four primary-colour package blocks and enlarge the card crops.
