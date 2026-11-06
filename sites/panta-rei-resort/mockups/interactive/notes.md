# panta-rei-resort · interactive · "Morning swim" — designer 0.7.1, station 4e, run 2026-11-lk-surf-01

Built from `concepts.md` concept 2 (+ §2–§3), `copy/en.json` verbatim, `dossier.json`, `audit.json`.
Media: `src/make-media.sh`. Page: `src/build.py` (+ `src/style.css`, `src/app.js`) → `dist/index.html`.

## look-log

Compared every round with `dossier/panta-rei-resort/assets/old-site-desktop.png`, `old-site-mobile.png` and `funnel/walk/01-home-fold.png` (old first screen: their logo, a salmon "CHECK AVAILABILITY" and "Best price when booking direct" over a sunlit veranda with rattan chairs; below it, four dark bands with one word each: ROOMS, RESTAURANT, FITNESS).

**Round 1 — first screen only (1440, 390).** The vid-004 drone shot along the surf beach fills the screen; title "Panta Rei, Kabalana" and one coral "Check dates" centred, nav and a second "Check dates" in the header. As design: the hazy grey sky at the top leaves the white nav and the logo with weak contrast; the logo is too small on desktop to read as their mark (~55 px of ink in a 72 px box); the title sits well but wraps unevenly on the phone. Change: a stronger top scrim under the header only, logo up to 96 px on desktop, balanced title wrap. Against the old site: already clearly better at a glance — the old fold is a ceiling and chairs with no place named; this is the sea and the surf with the name and the place, one action.

**Round 2 — first screen.** Header now reads on the haze, logo is legible as their arc-and-sprig mark. Still wrong: two identical coral "Check dates" buttons are on screen at once on desktop (header + hero), which breaks "one clear CTA"; the bold Fredoka title reads a little like a children's brand at 70 px; on the phone the centre crop wastes the right-hand surf lines and leaves a flat block of sky. Change: the header's button stays hidden over the hero and slides in only once the header turns solid; title down to weight 500; phone crop moved to 64 % so the breaking waves sit under the title. Against the old site: clearly better — real surf and a place name versus a veranda and no "where".

**Round 3 — first screen.** One CTA now (the header button waits until the header is solid), the lighter title weight reads as the booklet's rounded lettering rather than a toy brand, and the phone crop puts the breaking surf right under the title. What is still wrong as design: nothing on the screen says this page is a set of pages you move through — the hero ends in a hard edge and gives no sign of the booklet underneath. Change: the hero stops 44 px short of the viewport so the rounded top of the lilac Welcome page peeks in under the footage (the colour-blocked pages announce themselves without any text or arrow). Against the old site, side by side: the old fold is a static veranda, a pale salmon button and two icon circles; this is moving surf, the name and place, one confident coral action — better at a glance on both widths.

**Round 4 — whole page (1440, 390), plus the drawer opened by hand at both widths.** The booklet reads as pages: lilac Welcome with the vid-002 pool clip in a 4:5 frame, the ring of roofs full-bleed with the four room cards riding up over its bottom edge, the two overlapping pool prints, the peach restaurant page with its sliding chip tabs and the dish photo, the phone-framed mat class beside the week strip, the lilac massage page, the guests' cards, the sage "Getting here" page, groups, the ring from above as the closing, a real footer. Wrong as design: the "Look inside" pill on the room cards broke onto two lines on the phone; the massage rows wrapped price under label ("45 min back, neck & shoulders · / 17,000 LKR"); the three class-price chips wrapped 2+1 on the phone; "Good to know" sat 150 px below the Getting-here content, cut loose from it; in the drawer on the phone the room chips wrapped "sleeps / 3" and the date fields ran off the right edge. Change: nowrap pill; massage rows as label-left / price-right lines; price chips as a three-column grid; tighter row gap in the sage page; drawer chips smaller with one-line meta, date fields `min-width:0` in a `minmax(0,1fr)` grid, title 23 px on the phone. Against the old site (dark bands with one word each, no room told apart, no price, no ratings): every one of those is now a designed section with the business's own photographs and numbers.

**Round 5 — whole page again, after the round-4 fixes, plus the inspector (`design-taste-frontend/scripts/inspect.mjs`).** The ring photograph was being covered exactly where it matters: at 1440 the cards rode 220 px up over img-001 and hid the pool, so the "one thing" of the concept showed only bungalow roofs; and a 280 px band of empty ground sat between the stay notes and the pool. Fixed: the ring section now shows the whole frame (main building, roofs, the long pool) and the cards overlap only its lower edge by 36–72 px; the rooms section's bottom padding is cut. The inspector also found two empty screens at the foot of the page (Groups was a centred paragraph on bare ground) and the closing line wrapping to 3–4 lines; Groups became a split with the business's lounge photograph (img-030) beside its words and WhatsApp button, and the closing line went down to 22–32 px. Drawer opened by keyboard at 390 and 1440: room chips, a 3:2 gallery with dots and arrows, beds/sleeps/note, the included line from the offer block, 9.2/468 on Booking.com, arrival/departure/guests with floating labels; focus stays in the drawer for 40 Tabs, Esc closes and focus returns to the card that opened it. Inspector lines kept on purpose: resting shadows on cards and prints (custom.md: "gentle shadows where they help"); text-shadow on the hero title and closing line (legibility over moving footage, playbook §1a scrim rule); the peach page tint flagged as cream (concepts.md's booklet tint `#FCF1E8`, flagged there as from the guest PDF); the sideways quote row (the concept's draggable card stack, with arrows and dots); the bare-name h1 (concepts.md §6: "Panta Rei, Kabalana" until new copy is audited; the tagline is the first line of the Welcome page directly below); "Breakfast 1:1 white on white" is a false reading — the selected tab's dark pill is a sibling element the inspector does not see. Verdict against the old site, side by side at 1440 and 390: clearly better. The old page is a veranda photo, a pale salmon button, then dark bands with one word each and ~140 words in total; this one opens on their own surf footage with the name and place, then sells four distinct rooms with their own galleries and sizes, shows the restaurant, the fitness week, the massage prices, both ratings with counts and dates and six guest quotes, how to get there, and keeps "Check dates" one tap away on every screen.

## images

All business-owned (`dossier.json` `images[]` / `videos[]`, licence `business-owned`). Every file in `dist/img` and `dist/video` is written by `src/make-media.sh` (crop and scale down only; the script refuses to upscale).

| use | file(s) | asset | licence |
|---|---|---|---|
| hero poster | hero-1920.jpg/.webp, hero-960.webp | vid-004 poster (6 s), never captioned with a place | business-owned (YouTube channel) |
| hero video | hero-d1920.mp4/.webm, hero-m1280.mp4/.webm | vid-004 cut 0.5–14.5 s, dossier renditions copied | business-owned |
| Welcome clip | welcome-720.mp4/.webm (1.4 / 1.9 MB, 14 s, no audio), welcome-poster | vid-002 3–17 s, 4:5 centre crop 864×1080 → 720×900 | business-owned |
| ring of roofs | ring-2000.jpg/.webp, ring-1000.webp | img-001 (2000 px; drawn ≤ 1440 wide) | business-owned |
| room cards (4:5) | card-double/triple/family/suite | img-028, img-037, img-038, img-043 | business-owned |
| room galleries (3:2) | room-double-1…5 | img-028, 031, 029, 007, 013 | business-owned |
| | room-triple-1…5 | img-037, 034, 036, 010, 011 | business-owned |
| | room-family-1…5 | img-038, 040, 012, 014, 015 | business-owned |
| | room-suite-1…6 | img-043, 046, 047, 044, 002, 016 | business-owned |
| pool prints | pool-1500 (3:2), plunge-720 (4:5) | img-006, img-046 | business-owned |
| menu photos (4:5) | menu-breakfast / -later / -dinner | img-003, img-005, img-025 | business-owned |
| fitness clip | fitness-540.mp4/.webm (1.3 / 1.3 MB, 10 s, no audio), fitness-poster | vid-003 4–14 s, 1080×1920 → 540×960 | business-owned |
| after the surf | surf-1350 | img-035 | business-owned |
| groups | lounge-1350 | img-030 | business-owned |
| closing still | closing-1920 | vid-001 poster (57 s, top-down ring) | business-owned |
| logo | logo.png (180 px, inlined as a CSS mask) | img-023 | business-owned |

Not used: img-022, img-026, img-027 (not the business), img-024 (menu cover), duplicates img-033/041/042. No stock, so `check-places` has nothing to check.

## gaps

- **Room prices**: none in the dossier (engine needs dates). No "from" price; the drawer says "Prices with your dates are on our booking page" and hands off with the dates.
- **Beach distance**: copy says "a short walk" (dossier contradiction 300 vs 600 m); the Getting-here list prints "A short walk · Kabalana Beach", no metres.
- **Instagram feed** (custom.md asks for one): no post images in the dossier (Instagram needs a login). The footer has an Instagram icon button only.
- **Season, named break, staff names, reply time**: not in the dossier; not shown. No Rosa forecast (no named break).
- **Hours of yoga beyond Vinyasa 8:30**: Pilates times not published; the week strip shows only "Vinyasa yoga at 8:30" and Friday off, from the copy.
- **Menu chips**: only dish names block [2] carries; menu prices not shown (not in the copy).

## conflicts

- **Hero title** — concept 2 asks for "A short walk from the waves"; concepts.md §6 says it is unaudited new copy. Used **"Panta Rei, Kabalana"** (concept §6's fallback). The words exist in `spot` ("The waves of Kabalana, a short walk from the resort.") but in a different order, so it is not the audited sentence. Not blocking; the copyeditor can approve the line later.
- **Menu tabs** — concept lists "Breakfast / Lunch & dinner / Sweets" with img-024. The copy has no sweets and does not split lunch from dinner, so the tabs are **Breakfast / Later on / Dinner** (the copy's own words "Later there's…", "Dinner is…"), photos img-003 / img-005 / img-025. Not blocking.
- **Engine date parameters** — concept says "verify before passing dates". Verified 2026-11-06 in headless Chromium: `https://pantareiresort.holidayfuture.com/listings/572800?start=2026-12-10&end=2026-12-14&numberOfGuests=2` loads with "Dec 10 – Dec 14", 2 guests and a total ($630 for 4 nights). So the drawer hands off to the chosen room's page **with** `start`, `end`, `numberOfGuests`. The engine home is linked bare (no room chosen = no parameters). Plain links with JS off: hero/header/bar/closing → engine home, each room card → its `/listings/<id>` page.
- **audit-mockup's drawer probe** looks for `[data-open-drawer]` links to `#book` and a `[data-drawer]` element; this drawer's triggers are real links to the engine (so they work with JS off, as the brief asks) and open the drawer with `data-book`. So audit.json reports `drawer_triggers 0` / "no drawer". The keyboard pass was run by hand instead (Playwright, 390 and 1440): opens on the chosen room chip, Tab ×40 stays inside, Esc closes, focus returns to the opener. Not blocking; a tool convention mismatch.
- **Tap targets**: the first audit counted six 26 px slideshow dots and two squeezed review arrows under 44 px; dots are now 44×44 hit areas and the arrows `flex:none` 46 px. Final audit: 0 under 44 px.
- **Rating in hero**: not shown (concept: "Rating: no, with the guests"); it sits in the guests section and inside the drawer.
- **Different from the other variants of this business** (only business in the run): calm opens on vid-001's aerial ring, Figtree + Gochi Hand script, pool-tint panels; unique is the scrubbed drone rise in Bricolage Grotesque. This one opens on vid-004's surf beach, is set in Fredoka + Nunito Sans, moves through lilac / peach / sage pages, sells rooms through overlapping photo cards and a drawer with galleries, and has the phone-framed fitness clip and flip-day week strip — a visitor would see a different first frame, different type and a different booking pattern.

## checks (final, 2026-11-06)

- `node tools/check-design.mjs panta-rei-resort`: interactive **ok** at 1440 and 390 (light ground hsl(80 27% 98%), no captions, no padded boxes, no upscaled bleed; 0 default-look warnings; fonts Fredoka / Nunito Sans).
- `node tools/check-places.mjs panta-rei-resort`: 0 borrowed images, 0 failing.
- `node tools/audit-mockup.mjs panta-rei-resort interactive` (written to `audit.json` beside this file by the tool): first load 1.16 MB (HTML 109 KB incl. inline CSS/JS and the logo mask, largest image 251 KB = hero poster jpg, fonts 79 KB), LCP 1.29 s (unthrottled local), CLS 0.0, **scroll.early.cls 0.0012, scroll.settled.cls 0**, third-party on load: Google Fonts only (allowed at 4e; self-hosted at 4g), 0 images without alt, 0 tap targets under 44 px, reduced motion: no video source attached (poster only), JS off: all text, all four menu lists, room cards as plain `/listings/<id>` links, every CTA a plain engine / wa.me / tel link.
- Video sizes after first paint: hero 3.4–3.8 MB desktop (d1920) / 1.8–1.9 MB phone (m1280); Welcome clip 1.4–1.9 MB and fitness clip 1.3 MB, each attached only when its frame nears the viewport.
