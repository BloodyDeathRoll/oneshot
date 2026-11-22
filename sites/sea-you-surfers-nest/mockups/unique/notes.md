# Sea You Surfers Nest: unique mockup, "Every side of the four-poster" (concept 3)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-22.
Page: `dist/index.html`, plus `dist/stay/index.html` (the booking door as its own page, for JS off). CSS and JS are inlined from `src/page.css` / `src/page.js` by `src/build.py`; every word comes from `copy/en.json` (passed 4c, including the 5b022e1 closing addendum) and the three booking URLs are asserted against `dossier.json` at build. Media: `src/make-media.sh` (`# media: sites/sea-you-surfers-nest/mockups/unique/dist/img/**`). Fonts: Google Fonts at 4e (Instrument Sans 400/500/600, Leckerli One). No library: the four-poster is raw WebGL (23.5 KB of JS for the whole page, 8.6 KB gzipped, inline). Rebuild: `bash src/make-media.sh && python3 src/build.py`. `?still` forces the still layout; `?turn` forces the set-piece.

## look-log

Shot with `tools/shoot.mjs` (file://, headless software GL, the default URL; the set-piece runs in the shots). Extra mid-scroll looks with a Playwright script at 1440 and 390. The bar: Sea You has no website, so it is the Booking.com phone fold (`dossier/…/assets/walk/03-booking-com-fold.png`: blue header, a bold name with the slogan, "8.0 Very good", the road sign, a yellow "Choose dates" band) and gold (Global Surf notes for the first-screen discipline; the Lavish notes for the drawn-object method). Process note: the page skeleton was assembled before round 1, as on Lotus; rounds 1–3 changed the first screen and the pull-back only.

**Round 1, first screen + the pull-back.** img-015 full-bleed with the name in Leckerli One on the white wall between the posts, "Midigama, Sri Lanka", one teal "See live dates". As design the first screen held, but the move behind it did not:
- the inside photograph was clipped to a letterbox band (object-fit inside a scaled box), so the 90° side showed three strips of two photos;
- the drawn bed was too big (86% of the screen height, cut at the floor), seen 24° off-axis so a post ran down the middle of the photograph, and its panels were single flat slabs with seams (coincident faces) — it read as a CAD toy;
- the frame faded in at 40% opacity during the pull-back, a washed mint ghost over the photo;
- on the phone the hero veil overflowed the viewport (458 px layout width), which pushed the fixed booking bar off-screen.
Against the Booking.com fold it already wins at a glance (the room itself, one name, one button, versus a road sign under three rows of chrome), but the main item was not yet good enough to show.

Change: images sized to their own cover box, so every side fills its 4:5 window; the bed at 66% of the height, 9° off-axis (posts frame the photo instead of crossing it), camera raised to show the gable; framed-and-panelled boards (rails and stiles proud of a recessed panel) and a painted-edge shading term; full opacity from 10–30% of the pull, so the camera visibly backs out of the photograph; the photograph enlarged to sit inside the frame with the footboard and front top rail in front of it; hero overflow clipped.

**Round 2, first screen.** The turn now reads: each quarter rests with its own photograph inside the mint frame and its sentence beside it; the phone bar is back. What was wrong:
- the header nav sat on the busy ceiling with a text-shadow halo that looked muddy;
- the hero title stayed half-faded over the growing frame for too long (visible mess at 0.2 viewport);
- the first caption ("All seven rooms are doubles…") was never on screen at rest: rest 0 lasted 0.2 viewport.
Change: one frosted pill behind the nav (and later the name); the hero text clears within the first 16% of a viewport; the turn mapping gives the first and last labels a full rest.

**Round 3, first screen.** On the phone the name broke "Sea You Surfers / Nest". The first screen was clean but the hint was a plain label. Change: `text-wrap: balance` on every title ("Sea You / Surfers Nest"); the hint "Scroll, and the bed turns" carries the gable icon in mint, turning slowly on its Y axis (off under reduced motion), so the first screen names the move without animating the title. Verdict with the Booking.com fold beside it: **clearly better at a glance** — the bed a guest sleeps in, full-bleed and sharp (2000 px source, 1920 w served), the name, the place and one button; on the first scroll the photograph backs into a drawn mint four-poster that turns, which no listing can do.

**Round 4, whole page.** The sheets showed:
- the room slideshows at 4:5 took the full 1440 height, room names and buttons below the fold;
- desktop, at 1.8 viewports the bed stood alone with an empty left column (captions came in late);
- audit: the first heading in the DOM was the stage's "Seven rooms" h2, before the h1; 21 tap targets under 44 px (rating links, dots, the name mark); reduced-motion canvases reported visible (display:none, but opacity 1); no `#book` block for the no-JS check;
- inspector: rest shadows on the booking buttons, a text-shadow, "covered text" (the hidden captions under the glance).
Change: rooms column capped at 1180 px; captions on when the glance's bottom passes 38% of the viewport, turn starts with them; the stage caption title is a styled `<p>` (the still layout keeps the h2); 44 px targets everywhere (inline ratings are 44 px rows; slideshow arrows hidden on phones so six 44 px dots fit); canvases at opacity 0 by default; the closing is `#book`; no rest shadow on buttons, the name in the same frosted pill as the nav, captions `visibility:hidden` when off; the door scrim a touch darker.

**Round 5, whole page (final sheets in `shots/`).** No overflow, overlap or unreadable text at 1440 or 390 (layout width = viewport). In order: the bed full-bleed → the pull-back with the glance on the left (tagline, the spot line large, included | live dates, three dated ratings, two actions) → four rests of the turn, each with its photo (015, 002, 017, 053) and sentence → "Deluxe or Standard", two 4:5 slideshows of six, "In every room" with the mint gable icon and the full facilities line → the courtyard as true 3-column masonry → the carved door and the surfboard shower as an offset pair of matted prints → Breakfast, type only → Ashly, the three rating blocks and the turning quote stack (Kenza first, her line break kept) → the sign print beside "Finding the house" → the closing in the gabled white panel with all three listings → footer. The closing now reads the copy's new one-sentence version (commit 5b022e1 dropped the call clause while the phone is unconfirmed); the build picked it up unchanged. Also looked at: the door open at 1440 (panel swings in on its right hinge, focus on the Booking.com tile) and 390 (full-height sheet with the gabled top); Esc closes and focus returns to the trigger; Tab stays inside; `stay/` with JS off; reduced motion at 1440 (still hero, then the static 2×2 grid of the four sides beside the four sentences). Clearly better than the Booking.com listing side by side, and nothing like any other page in this run.


### 4f round 1 → designer round 2 (2026-11-22)

Reports read in full (commit 0ead646): `reports/2026-10-midigama-01/sea-you-surfers-nest.visual.md` (unique 6/10), `.experience.md` (7/10), `sea-you-surfers-nest.md` (critic 72.5/80, dimension 1 at 9). What they agreed on: the photograph sat in the drawn bed as a 310×390 card that the rails cut across; the pin was too long and too empty (six near-empty desktop screens, about seven phone screens for four sentences); the model looked like a CAD block with white seams; the phone first screen showed the name and two booking buttons twice; the type of business was not on the first screen; "Open in Google Maps" was 15 phone screens down; the Standard gallery showed a toilet and a WC door for a room with no bathroom. Kept as asked: the laptop gabled-bed opening and the booking door.

**Round 6, the set-piece rebuilt.**
- **The photograph is seated in the bed.** At each rest it fills the opening of the face turned to the camera, post to post and from the footboard, side board or headboard rail up to the canopy rail; its edges tuck under the drawn wood, so the front posts frame it and no drawn post crosses it. Rects are projected per face from the scene (`FACE` in `page.js`) and morph between rests; between rests the photo draws in by up to 32% while the corner posts sweep past. Sides are now whole landscape frames (1400 w), so the opening crops them by cover-fit.
- **Bigger:** the bed fills about 78–83% of the desktop viewport (round 1: 66%); at rest the photo is about 430×425 CSS px on the foot, 590×470 on the long side, 430×320 over the headboard (round 1: 310×390). Captions 30 px desktop, 21 px phone; "Seven rooms" 60 px.
- **Shorter:** four rests (0, 90, 180, 270), no 360° return and no captionless exit. Desktop turn 160 vh (was 300), turn-room 229 svh (was 418); phone turn 220 vh, turn-room 280 svh (was 520). Pages: desktop 13,137 → 11,563 px, phone 14,766 → 12,868 px; the rooms now start at phone capture 06 of 17 (was 08 of 20) and desktop capture 05 of 15.
- **Phone:** the photograph backs into the bed while the glance sheet covers the stage, so the stage is revealed already showing the bed at rest 0 (the hero is no longer shown a second time full-bleed). On phones the 0° side is img-015 (side-015), the hero stays img-005.
- **Material:** a warm tint ground (#ECEBE5) under the bed instead of white; a stronger contact shadow (soft ellipse + darker spots under each post); softer key/ambient balance; the thin highlight band that read as white seams removed; a gentler painted-edge darkening; gable lowered (0.34 m) so the opening dominates.
- **Bug found and fixed:** the damping step could run with a negative `dt` (rAF time behind `performance.now()`), pushing the turn below 0 and throwing in round 6's first build; dt is now clamped. It may have caused odd states in round 1 too.

**Round 7, first screen and order.** The hero subtitle is now the copy's `tagline` ("A bed and breakfast in Midigama, on Sri Lanka's south coast."), so type + place are on the first screen at both widths (critic dimension 4); the glance no longer repeats it. The phone header is gone: the first phone screen is one name, the tagline, one button and the hint; the bottom bar takes over once the hero button leaves. Desktop header: no more white sticker pills; a soft white top scrim that fades once the header turns solid; nav links 44 px tall. "Open in Google Maps" and the address moved into the glance (phone screen 2, desktop beside the bed), and stay in "Finding the house". Glance ratings fit one line at 1440 and gained hover/press feedback. The closing gabled panel now sits on img-002 full-bleed, so the page ends on the house. Standard gallery: img-008 and img-010 removed (4 photos: 026, 009, 005, 025), asserted in `build.py`.

**Round 8, whole page (final sheets in `shots/`).** Desktop: hero → pull-back with the glance and Maps on the left → foot, side, head and other side rests, each photo seated in its opening with its sentence beside it → rooms at capture 05 → courtyard masonry → carved pair → breakfast → Ashly and guests → Finding the house → the gabled panel over img-002 → footer. Phone: hero (name, tagline, button, hint) → glance sheet with Maps → the bed already standing, four rests with captions under it → rooms. No overflow or overlap at 1440 or 390. Door re-tested at both widths: opens, focus on the Booking.com tile, Tab stays inside, Esc closes and returns focus. Against the Booking.com fold it is clearly better at a glance, as before; against round 1 the set-piece now shows the house's photographs larger and inside the bed, in about half the scroll.

Inspector after round 8 (notes, not gates): `empty-screens` 4 of 12 (was 6; it does not see the canvas, and the bed now fills the right of those screens), `pinned-over-picture` and `off-centre` (the set-piece), `shadow` (the matted prints, kept), `covered-text` at 390 on "Deluxe or Standard" at one scroll position (the fixed bottom booking bar over a heading as it scrolls past; not fixable without dropping the bar), `palette-cream` (the concept's tint), `size-count` 17, `side-scroll` (slideshows), `empty-middle` in the rooms section.

Skill notes from round 5 (tools.md: notes, never gates). Inspector (`design-taste-frontend/scripts/inspect.mjs`), last run before round 5:
- `empty-screens`, `off-centre`, `long-pin`, `pinned-over-picture`: the set-piece screens. The inspector does not see the canvas, so the drawn bed counts as empty ground; the pin is the concept's 300 vh rotation (pattern 2), and the captions sit beside the bed, not over it. Kept.
- `palette-cream` (#ECEBE5): the concept's tint, sampled from img-002's linen. Kept.
- `size-count` (20 sizes), `grey-body` (secondary lines at 6.8:1): not changed at 4e; body copy is full ink.
- `shadow` on the matted prints and the quote stack: the prints and the stack's depth are the concept's devices. Kept.
- `side-scroll`: the room slideshows (dots and arrows). `no-footage`: there is no video.
`/animate`, `/find-animation-opportunities` and `/impeccable` were not invoked as skills this run; the motion system follows the scroll playbook (one ease-out family, damp λ 6, press 0.97/160 ms, door 420 ms on `.32,.72,0,1`, cross-fades 400–600 ms, bar 260 ms).

## images

All are the property's own Booking.com uploads (`business-owned`, uploaded 2025-09-28/29). None upscaled; none drawn wider than its source. Alt texts were written from the photographs, opened on contact sheets and at full size.

| use | asset | crop |
|---|---|---|
| first screen, desktop (16:9, 1280/1920 w) | img-015 | 2000×1125 from y 0 |
| first screen, phone | img-005 | 1000×2000 from x 333 (720/1000 w) |
| turn sides 0° / 90° / 180° / 270° (1400 w, whole frame; cover-fit into the bed's opening) | img-015, img-002, img-017, img-053 | none |
| still layout 2×2 (CSS 4:5 cover) | the four sides | |
| closing, full-bleed behind the gabled panel (1920 w) | img-002 | none |
| Deluxe slideshow (4:5, 820 w) | img-012, 002, 022, 033, 013, 032 | Booking.com's Deluxe tags |
| Standard slideshow (4:5, 820 w) | img-026, 009, 005, 025 | Booking.com's Standard tags, minus the toilet/shower (img-008) and WC door (img-010): the unit has 0 bathrooms on Booking.com |
| courtyard masonry, own ratios (820 w) | img-071 (extinguishers cropped out, 1600×1081), 003, 045, 041, 004, 007, 076, 038, 042 | |
| matted prints (2:3) | img-027, img-036, img-001 | whole frame |

## gaps

No price (live dates only), no WhatsApp, email or Instagram, no video, no photograph of the sea, the street, Ashly or breakfast; which room has the A/C and which have their own bathroom unknown (nothing on the page assigns them); no check-in time (only check-out shown); no break, season or forecast. The phone (+94715880052) was read off the sign and is unconfirmed: **no Call button is rendered anywhere** (`PHONE_CONFIRMED = False` in `build.py`; flipping it adds Call to the glance, the door, the closing). The number still appears on the sign in img-001, as the business printed it. Schema gaps as in concepts §6: a short hero line, a short CTA label ("See live dates" is a template label with the full copy label as `aria-label`), `rooms[].photos[]`.

## conflicts

None blocking. Departures from concepts.md, each a deliberate call:
1. **270° side is img-053, not img-059.** img-059 is the same room from almost the same spot as img-015 (the 0° side), so the turn would have shown one photograph twice; img-053 (1920×1280) shows the long side.
2. **At a glance sits beside the bed on desktop, not as its own offset 12-column band.** The concept puts section 2 between the hero and the set-piece and also starts the pull-back on the first scroll; both hold only if the glance scrolls up the left columns while the photograph backs into the frame on the right. Without JS / under reduced motion it is the offset 12-column band as written.
3. **On phones the hero is img-005 and the pull-back happens under the glance.** The phone hero (img-005, as specified) is the stage's own photograph; it backs into the bed while the glance sheet covers it, and the bed is revealed already standing with img-015 at 0° (round 2, so the hero is not shown twice).
4. **No `snap: "labels"`.** The rotation has a plateau at every quarter turn (the scroll rests there by itself) instead of a programmatic snap, which would fight the visitor's scroll.
5. **Four rests, no return to 360°, no fade (round 2).** The turn ends at 270° and the stage scrolls away with the last sentence as the rooms arrive; 160 vh desktop / 220 vh phone instead of the concept's 300 vh, at the critics' request.
6a. **Photo size (round 2, not blocking).** The visual critic asked for a photo plane of at least 560×700 CSS px. Seated in the bed's real opening, with the whole bed at about 80% of the viewport height, the photo is about 430×425 (foot), 590×470 (long side) and 430×320 (head) at 1440×900. Reaching 700 px tall would need the bed taller than the screen; I kept the bed whole.
6. **No library.** The concept names OGL; the bed is 40 boxes and needed none, so the set-piece is raw WebGL in the page's inline script (no CDN request at all). The photographs stay DOM images moved by `transform`/`clip-path` between two canvases (the frame's far half behind, near half in front), so they are pixel-sharp, need no texture upload (file:// pages cannot upload images to WebGL), and cause no layout shift.
7. **"8.0"**: Booking.com's score is `8` on a scale of 10 in the copy; the page prints it as 8.0/10, as Booking.com does (audit lists "8.0" as not in the copy).
8. Interface labels the template owns: "See live dates", "More ways to book", "Book a room", "Live dates on Booking.com", "Ratings as of", "Deluxe or Standard", "In every room", "Facilities", "Spoken here: English", "Open in Google Maps", "Scroll, and the bed turns", the nav labels, the footer button labels.

## other businesses in this run

Cheeky Monkey opens on a road or a reel through board noses, with a board-shaped WebGL window and painted-sign scripts. Lotus opens on a carved gate (picked) or a cloth net over a balcony print, in a violet script. Coconut tells the stay by the clock from its roof, with a sun-disc button and a forecast. Sanjee faces the water with a WebGL swell. This page opens on a full-bleed mint four-poster, then the photograph backs into that same bed drawn in mint and turning a full circle on white, in a fat enamel script with a velvet-teal button; its booking opens as a door hinged on the right. No board, road, net, sea or forecast.

## hand-off checks (4e)

1. Look loop: 3 first-screen rounds + 2 whole-page rounds, written up; every `dist/img` file comes from `src/make-media.sh`. **pass**
2. Every Booking.com, Airbnb and Maps URL is the copy's, asserted equal to `dossier.json` at build; the hero and the phone bar go straight to Booking.com (1 tap); the door and `stay/` hold all three. **pass**
3. `check-design`: ok, 0 problems, 0 warnings. **pass**
4. `check-places`: no atmosphere images. **pass**
5. Reduced motion / no WebGL / no JS: still hero + static 2×2 grid (audit `reduced_motion`: 2 canvases, both hidden); a context that fails after load leaves the photographs pulling back and turning without the frame. `scroll.early.cls` 0.0002, `scroll.settled.cls` 0. **pass**
6. Other businesses compared above. **pass**
7. No video exists; the first screen is the strongest own landscape (img-015, 2000 px) full-bleed, with the WebGL four-poster as the main item from the first scroll. **pass**

audit-mockup after round 8 (phone, slow 4G, 4× CPU; 2026-11-22T10:51Z): first load 184 KB (HTML 92 KB, images 45 KB, fonts 47 KB; the four turn photos now load only once the visitor scrolls toward the turn), LCP 1,236 ms, CLS 0.0015, scroll CLS early 0.0001 / settled 0, 0 tap targets under 44 px, 0 images without alt, 3 booking links in `#book` with JS off, reduced motion: 2 canvases hidden. `check-design`: ok, 0 problems, 0 warnings.

Round 5 numbers, for the record:
- first load 285 KB (HTML 85 KB with inline CSS/JS, images 154 KB, fonts 47 KB incl. Google's CSS; Google Fonts the only third party, allowed at 4e);
- JS 23.5 KB raw, 8.6 KB gzipped, inline (no library);
- largest image 54 KB;
- LCP 988 ms, CLS 0.0014; scroll CLS early 0.0002 / settled 0;
- 0 tap targets under 44 px; 0 images without alt; headings start at H1.
Whole page: all 32 images ≈ 1.27 MB (lazy below the fold; the three turn sides load after first paint), so ≈ 1.4 MB fully scrolled.
