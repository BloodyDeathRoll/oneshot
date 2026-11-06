# The Sandhya: interactive, "Double Height" (station 4e)

designer 0.7.1 · run `2026-11-ahangama-01` · operator alon · `mode: test` · 2026-11-06

**To see the depth effect, open the page over http.** Browsers refuse a `file://` image as a WebGL texture, so from a file path, and in any `tools/shoot.mjs` run on a file path, the page shows the plain photograph (the designed fallback). `shots/round-1/states/` holds the states a file path cannot show.

## look-log

`shots/round-1/` holds the last shoot only. The rounds below are the look loop inside this first critic round.

**Round 1, first screen.** The docked card works: the title and the button sit on a clean ground and the photograph is untouched, which text laid straight on it never achieved. At the pointer's extreme the first shader tore badly: combed ghosts on the uprights, a wavy horizon, the pool edge warped, so it read as a filter. Changed the march to close in on the surface exactly and grew near shapes so a depth ramp lies on the far side of a silhouette. Against the old first screen (a soft figure and a dictionary entry) it is already clearly better at a glance, on both widths, but only at rest.

**Round 2, first screen.** The ghosts were gone, but the steel rods, the room's best feature, kinked wherever they crossed from wall to stair to glass, and the horizon still bent beside each upright. Changed the map's logic: wall, stair, rods and glass wall became one rigid box whose planes meet without a step, the sea sits one small step behind the glass, the pivot moved back to the box so it barely moves, and the map went from 256 to 768 px. Rods now stay dead straight and the sofa and chairs slide against them, which is what the concept describes. Clearly better than the old site, and the motion now reads as a room rather than an effect.

**Round 3, first screen.** My furniture shapes were traced from the whole frame and were loose, so chair arms bent at the shape's edge, and the card clipped the far armchair. Retraced all furniture from a close crop, each piece at the floor's own depth under its feet, narrowed the card from 452 to 420 px so it clears the chair, and added the arrow to the button. At the extremes there are small kinks left on table legs and at the feet of two uprights behind the hoop chairs; they are about 2 px, seen only at a corner of the screen, and I judged them acceptable. Beside the old first screen: sharp architecture and sea in place of a blurred figure, "hotel" and the place in the title in place of a definition, a 52 px real link in place of a 70 x 30 px control.

**Round 4, whole page.** Built everything below. The sheets showed: the script's "&" does not read as an ampersand; the phone's arrival text ran straight into the feature photograph with no gap; twilight sat two section gaps from Exclusive Use; the room notes' second column aligned to nothing; the script titles at the concept's 40/30 px were lost beside full-bleed photographs. Fixed all five: "&" in the text face at .7em, titles at 46/34 px, a gap, a tighter twilight, notes on the lede's column line. The page clearly beats the old site's long dark scroll, and every room is one tap away in place.

**Round 5, states.** The sheet showed the last gallery dot active because the gallery was measured while hidden, and the tile's photograph jumped in scale when it landed. The phone sheet left 600 px empty. Fixed the measuring; the flight now lands the tile's exact crop on its own pixels inside the gallery's wider frame, then fades; the phone's gallery is square, with the first picture framed as the tile was. The design check failed on the amenities panel (translucent tint read as dark), so it is now a solid `#E8ECEC`. The audit found an early-scroll jump of 0.028 from the font swap: metric-matched fallback faces took it to 0. The canvas at rest measured 37.7 dB against the photograph, not identical, so the canvas now hides whenever nothing is displaced.

**Round 6, final.** Scrolling back up left the ground at dusk, because the first screen had no ground of its own: fixed. Added one plain-CSS scroll-driven slide on the offset photographs (third tile, tall beach photograph, map, blue-hour print), the same idea as the depth piece, and trimmed the type sizes. Looked at the last sheets at 1440 and 390, plus 820 and 1920 in full, for overflow, overlap and unreadable text: no horizontal overflow at 820 or 1920, none seen at 1440 or 390. **Why it beats the current site:** the old page opens on a soft figure and a dictionary entry, takes 52 s on slow 4G for RESERVE to answer, and shows interiors several screens down; this one opens on the architecture Wallpaper* wrote about, in sharp light, moving under the hand, with a link that works from the first byte, the ratings next, and the rooms one scroll away.

Compared with: `old-site-first-screen-desktop.png` and `old-site-first-screen-mobile.png`. I read the Lavish and Global Surf gold notes for the bar; I did not open the gold pages themselves.

**Round 7, depth checked on the final page, over http.** The phone's scrolled state came out blank in the capture, the headless compositor artefact of references #29: a dump of the canvas showed the correct picture. Added `opacity:.999` to the layers over the canvas, which restores it in captures. With it visible, the scroll-driven displacement on the phone warped the pool edge around the stair and hoop chair at mid-scroll, so I cut the scroll term by about 45% on phones and 30% on desktop. Screens: `shots/round-1/states/`.

**Round 8, second critic round: the reviewers' fix lists.** `shots/round-2/` holds this round's sheets and states.

- **What round 1 got wrong.** My "about 2 px" at the extremes understated it. The reviewers saw soffit edges scallop, uprights bow behind the hoop chairs and furniture legs bend, even with the pointer on the CTA. Silhouettes in a depth map are the cause: every edge is somewhere for a line to kink, and feathering only turns a kink into a bow.
- **Depth, rebuilt.** The maps now have no silhouettes at all. Each room is four flat planes (wall, glass wall, ceiling, floor) and depth is the maximum of them, which is what a box seen from inside really is. Inverse depth is linear across a plane, so each plane moves as a plane and a straight line stays straight. The glass wall, its uprights, soffits and the sea are one plane. Furniture stands on the floor's plane, so tall pieces lean very slightly rather than sliding clear of what is behind them. Nearest movement is 0.9% of the frame's width, down from 1.5%. The cost: the sea no longer slips behind the uprights, as the reviewers asked.
- **Checked with a sweep, not only the corners.** The pointer walked a 13-stop path, corners and CTA included. At each stop 20 lines were tracked along their length against the rest frame, and a straight line fitted to how far each moved (uprights, upper uprights, rods, table legs, lamp pole, band edges, soffit, sofa rail, table front). The 75th-percentile departure from straight was at most 0.28 px on 19 lines, and 0.85 px on the lamp pole; lines moved up to about 6 px. A few points on some lines read 12 to 14 px, the limit of the tracker's search range, on stretches with little texture to lock on to; I read those as lost tracks, not bends, and looked at the corner frames by eye: clean. This is software GL at 1440 x 900.
- **Phone.** The photograph is now held: sticky CSS, so it also holds with JS off. The card waits for the first 22% of a screen of scroll, then the page rises over the photograph as one sheet. As it rises the visitor walks into the room: a forward step towards the horizon, a true projective move, so lines stay straight. It runs over the first 42% of a screen. Rooms start about 185 px later than in round 1. Reduced motion keeps the plain layout.
- **The rest of the list.** Allura replaces the pen hand: tested beside Mr De Haviland on every title word, it reads as drawn and stays legible, while Mr De Haviland tangles on "Why Sandhya" and "Looking after", and its "&" works, so the text-face ampersand is gone. Guests is rebuilt on the ground beside img-031, with the ratings at 56 px as its focal point; blue now belongs to the photograph, and panel tints are down to two. The phone bar waits until the card's button has gone. The desktop button sits in a slim 56 px header that stays. The hero and feature cards dock flush to the corner. Tile names sit on the photograph over a scrim, and tiles are re-cut to the view, with no ceiling fan as the lead. The kit is an icon list at every width, with its three sentences intact in the DOM. On a phone the food follows Dining's first paragraph. There is a real skip link, and dots have 44 px targets at a tighter pitch by overlap.
- **Against the current site.** Still clearly better at a glance on both widths: the same comparison as round 6, now with a first screen that holds still and true under the hand.

**Round 2 checks.** `audit-mockup`: first load 628 KB, LCP 2168 ms, CLS 0, scroll CLS 0 early and settled, 0 tap targets under 44 px. `check-design`: pass. Its one warning, a ground "in the cream range" at `rgb(243,243,240)`, is the page's ground caught mid-ease between cloud white and the later step, not a colour in the page. `check-places`: pass. Copy: 98 of 98 strings found verbatim with JS off, the kit's three sentences included. The tile scrim was shortened after these ran; only the screen shoot was rerun. The inspector was not rerun this round; the list below is from round 1 and some of it no longer applies.

**Inspector, round 1** (`design-taste-frontend`, run once), results kept with reasons:
- `headline-lines`: the audited tagline and intro heading. Words are not mine to cut.
- `shadow`: the two twilight prints and the map are matted prints (references #9), and `custom.md` allows gentle shadows.
- `still-page`: no reveals on headings, by rule. The motion here is the depth piece and on touch, and a load-and-scroll count does not see it.
- `eyebrow`: false positives (a rating line and an amenity above a heading).
- `no-footage`: no usable video exists.
- `small-title`, `hero-words`, `side-scroll`, `mixed-font-headline`, `palette-cream`: the concept's 26 px title, the copy's 11 words, the concept's swipe rows, the ampersand fix, the concept's dusk tint.
- `size-count`: reduced, still about 12.
- `ragged-edges`, `empty-middle`: judged by eye on the sheets. Not changed.

## images

All `license: business-owned`, "published on the business's own site; no credit shown, so the photographer's terms are not known". No stock. Every file in `dist/img/` comes from `src/make-media.sh`; the recipe was rerun in full at the end.

| Use | Assets |
|---|---|
| First screen, with depth | img-032 (2000 px wide, phone crop 616 x 1333) |
| featureLine, with depth | img-068 (2000 px wide, phone crop 1000 x 1334) |
| Room tiles, 4:5, cut to the view | img-077, img-043, img-071, img-087 |
| Guests | img-031 (the pool's water and stone edge; business-owned, cut to 1040 x 1300) |
| Studio King | img-077, 061, 062, 070, 079 |
| Studio Twin | img-043, 080, 165, 167, 083 |
| Studio+ King | img-071, 042, 066, 067, 074, 076, 073 |
| Director's Suite | img-087, 171, 172, 058, 059, 055 |
| Arrival | img-038 |
| Dining, 1:1 | img-118, 112, 115, 114, 113, 108 |
| Casual Luxe | img-035, 015, 016, 122 |
| Kabalana | img-153, img-034, map img-013 |
| Exclusive Use | img-152 |
| Twilight, at or under native size | img-023 (cut to x 240+, clear of the surfboards), img-027 |
| Logo | `logo-white.png`, shown in ink with a CSS filter |

Depth maps `depth-hero.png` and `depth-feature.png` are computed from plane equations in `src/paint-depth.mjs`, with no image input.

**Originals: not used.** A plain request to the site answered 406 for an upload URL and for `robots.txt` itself, so the robots rules could not be read. I did not change identity or use a browser to get round it. Everything comes from the local copies in `dossier/the-sandhya/assets/`, capped at 2000 px. The phone hero is therefore 616 source px wide: clean at 2x in the shots, and it will be slightly soft on a 3x phone. A re-cut from the 6150 px original would fix that if the owner supplies it.

## gaps

- **No video.** `vid-001` is a third party's and unusable; the first screen rests on the photograph and the depth piece. Pitch point.
- **No nightly price.** The page says rates are on the booking page, and the only price is the Exclusive Use row with its note.
- **No Instagram feed.** No post could be read, so it is an Instagram button.
- **No season, no named owner or staff.** Omitted.
- **WhatsApp.** Unconfirmed, so absent. Call and email are the secondary actions.
- **Stay facts.** Shown with the copy's disclosed contradiction under the times.
- **Two template strings I added to the concept's labels:** "At the house" (title of the amenities panel) and "Guests" (title of the quotes panel), plus "Close" as an aria label. The footer prints the number and email as text, because a Call button does nothing on a desktop without a dialler; the number is spaced as on the hotel's own site (`dossier.contact.phone`).

## conflicts

None blocking.

0. **Concept: `#5BB2CD` guests panel.** Removed in round 2 on the reviewers' finding. The photograph carries the blue.

1. **`custom.md` "pick dates" against the operator's decision and audit recommendation 4.** No date picker: nobody has seen the engine honour dates. Raised at the pick by the operator. The sheet leaves room: the action block is docked to the sheet's foot with free space above it at 1440 x 900 and 390 x 844, and a comment in `.room-go` marks where the fields go. Cost: the booking step `custom.md` wants does not exist yet.
2. **`custom.md` "centred title" against the concept.** The title is on a card at the lower left, because this photograph takes no text. The concept reports it as a departure.
3. **`custom.md` Instagram feed.** See gaps.
4. **Concept: header hides on scroll down, and the desktop action lives in the header.** Both cannot hold. Round 2: on desktop the header stays, slimmed to 56 px with the button inside it, so nothing floats over content; on a phone it still steps away, because the bar carries the action. With JS off the desktop has no persistent button, only the section buttons.
5. **Concept: img-068 in the Studio+ King gallery, against its own rule that nothing may suggest a room has its own pool.** I left img-068 out of the gallery and kept it at the featureLine, tied to no room. The gallery has seven photographs.
6. **Concept: "pool" ambiguity in other room photographs.** img-066 and img-067 show the pool from a room; they are kept as listed, and nothing on the page says the pool is private. Worth a look at the pick.
7. **Concept: hand-painted depth with chairs sliding against the stair, the sea far away, 1.5% displacement.** Round 2, on the reviewers' finding: planes only, 0.9%, one plane for the glass wall and the sea. Chairs still move against the stair, as part of the floor. The sea no longer parallaxes behind the uprights.
8. **Concept: Nothing You Could Do at 40/30 px.** Round 2: replaced by Allura at 56/44 px, 68/52 for "Why Sandhya", on the reviewers' finding. Allura has a smaller x-height, hence the size.
9. **Concept: `#D5CEBE` "panels only" and also "ground steps to the deck tint" at Dining.** Built as a panel. To keep the ground's easing meaningful I added one step not in the concept's table, `#F5EDE5`, a blend of cloud white and dusk, at Kabalana and Exclusive Use.
10. **Concept: sheet code loads on first interaction.** At 4e all JS is inline in one file, as `base.md` requires. It runs after the HTML and never delays the link. Splitting it is 4g's. Room gallery images do load only when a sheet opens.

**Test switch in the page:** `?noguard` turns off the weak-device guard, which otherwise drops to the photograph after repeated slow frames. Headless software GL needs it. Remove at 4g.

**For 4g:** depth maps are tied to these two photographs (concepts.md §6); web fonts load non-blocking from Google at this station; the metric-matched fallbacks use `size-adjust` measured against Arial only.
