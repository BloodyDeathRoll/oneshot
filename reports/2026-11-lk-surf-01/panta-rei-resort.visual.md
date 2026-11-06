# panta-rei-resort — visual-critic (station 4f, round 1)

visual-critic 0.2.0 · run `2026-11-lk-surf-01` · 2026-11-06 · mode quick · dimension 8 only.

**Shots used.** calm and interactive: their shared `shots/` sets (calm reshot this round, interactive reused, build `21f8165148db3ec2`). unique: the shared `unique/shots/` set was shot over `file://`, where `fetch()` of `frames/d/*.webp` fails (150 console errors in `shoot.json`), so its pinned film never scrubs. I shot unique again over http (`tools/_serve.mjs` on port 18733) into a scratch folder and judged from that set (`desktop-00…20`, `mobile-00…22`), plus a playwright walk of the pin at scroll 700 / 1300 / 1900 / 2500 / 3100 / 3700 px. Current site: `reports/2026-11-lk-surf-01/current-site/shots/` (desktop 6 captures, mobile 3) plus `dossier/panta-rei-resort/assets/old-site-mobile.png`. Playback check after 4 s: calm hero `vid-001-d1920.webm` playing (15 s loop); interactive hero `hero-d1920.webm` and welcome clip playing (14 s); unique hero is the frame sequence on a canvas. Inspector run on all three (`design-taste-frontend/scripts/inspect.mjs`). Bar: `agents/designer/gold/README.md` + `global-surf-notes.md` (the Global Surf photographs are not on this machine, so I compared against the method and the written calibration, not the pictures) and the calibration in `agents/visual-critic/references.md`.

**The current site, for every comparison.** Desktop `current-site/desktop-00`: a cropped photo of rattan lamps against a black ceiling, a pale-salmon "CHECK AVAILABILITY" box in the middle, and a vertical stack of social icons on the right. `desktop-01…04`: one intro paragraph in small blue display type, then full-bleed photos (aerial of the roofs, the room with the palm-fan headboard, breakfast, yoga). Each one carries a single spaced-caps word ("THIS IS US", "ROOMS", "RESTAURANT", "FITNESS") and an outlined ghost button. `desktop-05`: a Google map embed and a few lines of grey text. Mobile `current-site/mobile-00…02`: the desktop layout cropped at 390. The nav runs off the right edge, the CTA is cut in half and "RE…" is clipped, so the phone layout is broken. `old-site-mobile.png` (Wix's own mobile view) shows the same tiles stacked, with ghost buttons and an underlined email in the footer. What it does well: big, well-graded full-bleed photographs and a calm rhythm. What it lacks: rooms, prices, sizes, reviews and a real footer, and its phone layout is broken.

---

## Calm — "Welcome to Panta Rei"

**Three seconds.** 1440 (`calm/desktop-00`): their own drone shot looking straight down on the ring of red roofs around the turquoise pool, sharp and full-bleed. "Panta Rei, Kabalana" is centred in white over the pool, with one coral "Check dates →" under it and a quiet white nav. It feels warm, clean and expensive, and I want to scroll. 390 (`calm/mobile-00`): the same aerial cropped to the pool and two roofs, the title at about 32 px centred, and a full-width coral bar at the bottom. Clear and calm. Of the three first screens, this one is the closest to Shahar's hero formula.

**Checklist**
- **Media:** leads with the business's best footage (vid-001, ring of roofs, `desktop-00`). The film's colour is rich and true. The lounge photo img-030 runs full-width (`desktop-02`) and the swimmer in the pool, img-006, is wide (`desktop-07`). Rooms use the engine photos at about 660 px wide (`desktop-03…06`), sharp. Weak: the closing uses a hazy, yellow-cast drone frame of the coast (`desktop-14`, the sky reads olive-yellow) and then a dull, underexposed jungle frame (`desktop-15`). It is the worst-graded picture on the page, and it is where the page ends.
- **Composition and grid:** a 12-column grid with alternating 60/40 room splits (`desktop-03…06`), a pool photo with an overlapping text card (`desktop-07`), and a restaurant block with one big photo over three smaller ones (`desktop-08`). It is balanced and intentional, but the same unit repeats from the rooms down to "Getting here": a rounded photo, a text column and a pale-teal panel. From `desktop-09` onward the scale contrast flattens.
- **Typography:** Figtree for reading and Gochi Hand for section titles ("Welcome to Panta Rei", "Four ways to stay", "The pool", "What guests say" in `desktop-01/03/07/12`). The hand face is informal and fits the guest-booklet idea. This is exactly the readable face plus handwritten titles that Shahar named as the bar. Gochi Hand at 50 px+ looks a little childish next to the polished photography, and "Four ways to / stay" breaks badly (`desktop-03`, "stay" alone on the second line). The closing line is a 3-line sentence set at about 40 px plain sans (`desktop-14`), which the inspector also flags as a headline wrapping past two lines.
- **Colour:** a cool white ground, pale pool-teal panels and the coral roof colour only on booking actions. White text on coral throughout (`desktop-00`, `desktop-03` "Book this room"). It belongs to the place, and the booking colour is unmistakable.
- **Hierarchy and rhythm:** the top half has a strong rhythm (aerial, then Welcome text with the script line "No paradise like home." to the right, then the lounge full-bleed, then rooms). The bottom half (`desktop-09…13`: fitness, after the surf, guests, getting here, groups) is five sections in a row built from the same light-teal panel with text and a card, with no full-bleed moment between them.
- **Polish:** neat alignment, consistent pill buttons and good dots on the room slideshows (`desktop-04` five dots, `desktop-06`). Defects: 28 resting box-shadows (the inspector counts the pool card, buttons and slideshow arrows). "Good to know" is a long column of bordered pills (`desktop-13`) that reads as a tag cloud and breaks the "no lines/borders" rule. The closing headline sits at the bottom of one image and its two buttons float at the top of the next, with a 300 px band of dull jungle between them (`desktop-14` → `desktop-15`). At 768 px the inspector finds "After the surf" fully covered at one scroll position. On mobile the persistent bar overlaps the "Welcome" script line (`mobile-01`, "No paradise like" cut by the bar).
- **Distinctiveness:** the aerial and the hand-lettered titles make it this place. Below the fold, the pill buttons, Figtree and pale panels drift toward a good booking-site template.
- **Hero and motion:** the hero is clean and slick, with the film, header, one centred title and one CTA. As the calm variant it carries micro-motion only (slideshows, button lift, parallax), which its brief allows.

**Score: 8 / 10** (just). Clearly professional and clearly better than the current site, and the only one of the three whose first screen and type pair match Shahar's calibration as written. It is held back from more by the samey lower half and the weak closing.

**Better than the current site?** Yes. First screen: `calm/desktop-00` (their aerial film, a title saying what and where, a white-on-coral CTA) against `current-site/desktop-00` (a cropped lamp-and-ceiling photo with a salmon box). Whole page: `calm/desktop-03…06` (four rooms with 5-photo slideshows, sizes, beds and a per-room booking button) against `current-site/desktop-02` (one word, "ROOMS", over one photo). At 390 there is no contest, because the current site's mobile layout is broken (`current-site/mobile-00`).

**Closest reference:** the method of the Global Surf gold (`global-surf-notes.md`: own footage, centred short title, coral CTA, readable face plus script titles, rooms with galleries, real footer). It sits below that bar for three reasons: no full-bleed media moment after the pool, no Instagram block, and a weak closing.

**Fix list**
1. **Rebuild the closing.** Replace the yellow-cast coast frame and dull jungle band (`desktop-14/15`) with the vid-001 poster of the ring at noon or img-001. Cut the line to one short sentence ("Book direct for our best rate") centred in the image, with both buttons directly under it inside the same image.
2. **Give the lower half one full-bleed moment.** Between "After the surf" and "What guests say" (`desktop-10/11`), run img-035 (guests with boards on the lawn) or the yoga-shala cut of vid-001 edge to edge, then return to the panels. Drop the teal panel from at least two of the five sections, so their grounds alternate white and tint instead of tint, tint, tint.
3. **Remove the borders and shadows.** Turn "Good to know" (`desktop-13`) from bordered pills into a compact list separated by " | " in two columns. Take the resting shadows off the pool card, the buttons and the slideshow arrows, and separate surfaces by tone only.
4. **Fix the script titles.** Set Gochi Hand smaller (about 40 px at 1440) and break titles by hand ("Four ways / to stay"), so no single word sits alone on a line. On mobile, keep the "No paradise like home." line clear of the bottom bar (`mobile-01`).
5. **Add an Instagram strip before the footer:** six of their own photos (img-002, 003, 006, 030, 035, 046) as a tight row linking to their Instagram. It is part of the calibration and fills the gap between "Groups" and the footer.

**Keep:** the hero as it is (`desktop-00`): film, title, one coral CTA, no rating. The Welcome block with the owner's text set large and the script line beside it. The room slideshows with dots, the " | " details and white-on-coral "Book this room". The restaurant's one-big-three-small photo block. The footer with real buttons and round social icons.

---

## Interactive — "Morning swim"

**Three seconds.** 1440 (`interactive/desktop-00`): a drone sweep along a palm-lined beach with clean white water and the sea to the horizon, playing. "Panta Rei, Kabalana" is centred in a heavy rounded face with a coral "Check dates" under it. It is the most surf-like first screen of the three, and I want to scroll. But the sky is flat and hazy grey-teal (top quarter of `desktop-00`), and the rounded, heavy title reads more like an app than a boutique hotel. 390 (`interactive/mobile-00`): the beach and surf line cropped vertically, the title on two lines, a coral CTA, and a WhatsApp icon top-right. Good.

**Checklist**
- **Media:** the hero cut of vid-004 is the only surf footage, sharp, with real speed. Welcome has a playing 4:5 inset of vid-002 (`desktop-01`, the roofs and pool from above). The room chooser opens on img-001 full-bleed (`desktop-02/03`), with four room cards overlapping it. Elsewhere the photographs are shrunk into rounded cards: the pool is two overlapping prints at about 260 px (`desktop-04`), the fitness clip sits in a phone-shaped frame (`desktop-06`) and the massage photo is a card (`desktop-07`). Below the rooms the page shows less big photography than the current site does.
- **Composition and grid:** the room chooser (`desktop-03`: four cards straddling the edge of the aerial) is the best composition across the three mockups. Most other sections are a text column beside a rounded framed picture on a pastel rounded panel (`desktop-01, 05, 07, 10`), so the page reads as a stack of rounded containers. `desktop-11` is almost empty ground (the inspector counts 2 of 12 desktop screens nearly empty).
- **Typography:** Nunito Sans for reading and Fredoka for titles. Fredoka at about 50 px ("Panta Fitness Club", `desktop-06`) is heavy and toy-like. It is tidy, but neither elegant nor handwritten, and the closest of the three to "not great" in Shahar's terms. Titles sit tight on the body copy (no space under "Panta Fitness Club", `desktop-06`). The guest quotes are long 12-line blocks of small text in cards (`desktop-08`).
- **Colour:** lilac, peach and sage page tints from the booklet, an off-white ground and a coral CTA. The tints stay light, but three pastel panels plus white cards plus coral make it busier and less "of the place" than calm. The inspector reports a "Breakfast" label at 1:1 contrast (white on white) in one state of the menu chips.
- **Hierarchy and rhythm:** a strong first three screens (beach film, welcome inset, rooms over the aerial), then a long run of panel, card and chips with similar weight (`desktop-04…12`). The eye has no big moment until the closing aerial (`desktop-11`).
- **Polish:** 35 resting box-shadows (cards, clips, buttons). In the static capture the fitness price cards are misaligned, the third sitting about 3 px higher than the first two, and the suite card in `desktop-03` sits 6 px higher than its neighbours, so the tilt state lingers. The week chips (`desktop-06`) are seven grey blocks with no information until tapped, and Friday's "day off" is invisible at rest. A floating WhatsApp button and a persistent bar both sit at bottom right. "Getting here" (`desktop-09`) uses five bordered distance rows. On the plus side, the details line is " | "-separated (`desktop-10` top), as the calibration asks.
- **Distinctiveness:** the room chooser over the ring is unmistakably this place. The rest could belong to any wellness app.
- **Hero and motion:** the main item is the beach video cut, sharp and with real speed. The micro-motion (card tilt, chips, drag stack) exists but is UI motion on small cards. Nothing on the page is a spectacle after the hero.

**Score: 7 / 10.** Professional and better than the current site, but the rounded-card, pastel-panel UI language and the heavy rounded title face make it read as a well-made app template, not a boutique resort. Below 8: **hard fail at 4f.**

**Better than the current site?** Yes on information and on the phone. First screen: `interactive/desktop-00` against `current-site/desktop-00`, where a real moving beach with a clear CTA beats the lamp photo. Whole page: `interactive/desktop-03` (four rooms, sizes, sleeps) against `current-site/desktop-02` (one word, "ROOMS"). With one reservation: the current site's full-bleed photo rhythm (`current-site/desktop-01…04`) uses their photography bigger and more confidently than this page does below the rooms.

**Closest reference:** below the Global Surf gold. It shares the method (own footage, room galleries, booking inside the site) but not the type quality or the section-by-section craft. Its type and card language put it nearer the pre-calibration pages.

**Fix list**
1. **Replace Fredoka.** Use a tasteful display face with character, ideally a hand or script face for section titles as in the calibration (different from calm's Gochi Hand), and keep Nunito Sans for reading. Add 16–24 px between each title and its body (`desktop-06`).
2. **Let the photographs out of the cards.** Make the pool (`desktop-04`) a full-bleed img-006 with the text on the ground beside it. Set "After the surf" (`desktop-07`) as img-035 at full width. Use one full-bleed photo between restaurant and fitness. Cut the nested rounded panels: one tint per section, not a rounded panel holding rounded cards.
3. **Remove the resting shadows and frames.** Drop the shadows on the cards, clips and price boxes, and the phone frame around the fitness clip (play vid-003 as a clean 9:16 or 4:5 crop). Turn the bordered distance rows (`desktop-09`) into one " | " line or a simple two-column list.
4. **Give the week strip and the reviews content at rest.** Show "8:30" under each day and "day off" on Friday without a tap. Shorten each guest quote to its best 2–3 sentences with a "read more", and set the quotes larger than the body text.
5. **Grade the hero's top band** (the flat grey-teal sky in `desktop-00`): crop it out or start the cut 1 s later on a frame with a blue sky. Settle the tilt so cards are aligned at rest (`desktop-03`), and fix the white-on-white "Breakfast" chip state.

**Keep:** the beach-film hero (one centred title, one coral CTA). The room chooser with four cards straddling the aerial (`desktop-03`), which is the best idea in the three mockups. The welcome block with the playing vid-002 inset. The " | " details line. The closing aerial with the line and two buttons together (`desktop-11`).

---

## Unique — "From the pool to the sea"

**Three seconds.** 1440 (http `desktop-00`): the top-down ring at its closest, with swimmers in the pool. "Panta Rei" is set large in tight Bricolage Grotesque, with a small "Boutique resort · Kabalana, Ahangama" line and a coral "Check dates" under it, a small "Scroll" cue, and a coral "Check dates" in the header too. It is the most striking first screen of the three, with a confident display face and the strongest frame of their film. 390 (http `mobile-00`): the pool and roofs, the title, the sub-line and the CTA centred, plus a coral header CTA. Strong. Two coral CTAs on the first screen is one more than the calibration asks.

**Checklist**
- **Media:** the main item is a scroll-scrubbed vid-001 rise from the ring to the coast. It works over http: the playwright walk at 1300 px shows the ring smaller in the jungle, and at 2500 px the coast and surf line appear with caption 3/3. But the pin is graded and scrimmed dark. `desktop-02`, `desktop-03` and the 1300 px frame are dim, muddy green-black jungle with low contrast, and the red roofs turn brown. Two of the five desktop pin captures (`desktop-02, 03`) carry no caption at all. On mobile, `mobile-02/03` are almost black. The end frame (`desktop-04`) has the olive-yellow haze in the sky. Their best footage looks worse in the pin than in the hero. Below the pin, the photography is good but mostly carded: the lounge as a large rounded card (`desktop-06`), the rooms as a sticky split (`desktop-07…10`) and the pool full-bleed with a card over it (`desktop-12`).
- **Composition and grid:** hero, then pin, then a big type moment ("No paradise like home." at about 52 px, `desktop-05`, fine), then a sticky room split. The idea is the most cinematic of the three. The lower half (`desktop-12…18`) repeats calm's structure (panel, card, chips, reviews) with nothing new.
- **Typography:** Bricolage Grotesque display and Hanken Grotesk text. The display face is the most expressive and grown-up of the three pairs (`desktop-00`, `desktop-05`). But it is used for long sentences: pin caption 2/3 is 4 lines (`desktop-01`), the closing is a 3-line sentence at about 48 px (`desktop-19`), and the inspector flags 3 headlines past two lines at 1440 and 4 at 390. There is no script anywhere, which departs from the calibration's readable face plus handwritten titles. It is defensible as "one expressive display face", but the face only reads as expressive at title length.
- **Colour:** a cool grey-white ground, jade-tint panels and a deep coral CTA, white on coral. Fine. The inspector flags the terracotta accent family.
- **Hierarchy and rhythm:** the pace changes are the best of the three (full-bleed hero, 400 vh of film, then a big type statement). That pace collapses into a uniform card stack after the restaurant.
- **Polish (the problem):** the persistent "Check dates + WhatsApp" pill floats at bottom centre over everything. It covers the closing headline ("if there's anyt[pill]ke to ask first", `desktop-19`), review text (`desktop-16`), "Getting here" (`desktop-17`), and on mobile "Book this room" (`mobile-08`), "Rest…bar" (`mobile-12`) and "Pan…ub" (`mobile-14`). The inspector confirms large text covered at every width, including "Panta Rei" and caption 2/3. The header and the pill show two coral "Check dates" at once on every screen. The section-progress dots at the right edge of the pin (`desktop-02`) are tiny and unexplained. 9 text-shadows and 23 resting shadows.
- **Distinctiveness:** the highest. No template opens on a film you fly through from the pool to the sea.
- **Hero and motion:** the hero is interesting and has a clear CTA. The main item is present and working. The caption masks are the only micro-motion of note, and the dim, mostly captionless pin weakens the spectacle.

**Score: 7 / 10.** The best idea and the best first screen of the three, let down by the dark, empty middle of the pin, the floating pill sitting on top of headlines at both widths, and a lower half that falls back to the calm template. Below 8: **hard fail at 4f.**

**Better than the current site?** Yes. First screen: http `desktop-00` (their ring footage, the name and one CTA) against `current-site/desktop-00`. Whole page: the pin explains where the rooms are and how close the sea is (2500 px frame), and four rooms with galleries plus a booking panel with thumbnails (`desktop-10`) set against `current-site/desktop-02`. Mobile: http `mobile-00` against the broken `current-site/mobile-00`.

**Closest reference:** in ambition, the scroll-film pages in `agents/designer/references.md` (scroll playbook pattern 3). In finish, below the Global Surf gold, which never let a CTA sit over a title and kept its footage bright.

**Fix list**
1. **Move the pill so it never covers text.** Dock it bottom-right, or only show it while the pin runs and hand back to the header CTA after it. Give it a reserved bottom gutter on mobile. Never overlay the closing headline (`desktop-19`). Hide the header "Check dates" while the pill is visible, so there is one coral CTA per screen.
2. **Brighten the pin and fill its gaps.** Remove or halve the dark scrim and regrade the sequence to the hero's colour (the roofs must stay red, not brown, in the 1300 px frame). Spread the three captions so one is on screen across the whole 400 vh, or shorten the pin to about 280 vh so the dim stretches (`desktop-02/03`, `mobile-02/03`) disappear. Remove the yellow haze from the end frame or end on a frame with a blue sky.
3. **Shorten every display-face line to title length.** Caption 2/3 becomes "Sixteen bungalows around one long pool". The closing becomes "Book direct, best rate". Long copy goes in Hanken below. This clears the headline-length fails at both widths.
4. **Give the lower half its own idea instead of calm's panels.** Continue the film language: a full-bleed vid-001 yoga-shala cut behind "Panta Fitness Club", img-035 full-bleed behind "After the surf", and the reviews as one large quote at a time in Bricolage. Remove the resting shadows and the gradient on `#fitness`.
5. **Clean the hero.** Drop the "Scroll" cue and the header CTA on the first screen, and keep the sub-line. Add one quiet micro-interaction outside the pin (for example the room crossfade at 0.6 s, which the sheets show as instant), so the page stays alive after the film.

**Keep:** the hero frame and the tight Bricolage "Panta Rei" (`desktop-00`). The scrubbed rise from the ring to the coast as the main item. The big "No paradise like home." statement (`desktop-05`). The sticky room split with galleries. The "Check dates and book direct" panel with four room thumbnails (`desktop-10`). The closing aerial of the ring (`desktop-19`).

---

## Ranking by visual quality only

1. **Calm — 8, pass.** The hero and type pair match Shahar's calibration and the craft is the most even of the three, though the lower half and the closing are template-safe.
2. **Unique — 7, fail.** The best idea and the best first screen, held back by a dark, half-captionless pin and a floating pill that covers headlines at both widths; it can be the strongest of the three once those are fixed.
3. **Interactive — 7, fail.** It has the best single section (the room cards over the aerial), but its rounded-card, pastel-panel UI and heavy rounded title face make it read as an app template rather than a boutique resort.

---
---

# Round 2

visual-critic 0.2.0 · 2026-11-06 · quick mode · dimension 8 only.

**Shots used.** calm: a fresh shoot into `calm/shots/` (the build changed, so the tool reshot it: 17 desktop, 18 mobile captures). interactive: the tool reused `interactive/shots/` because the fingerprint matches the round-2 build (`90af951c26d1b655`, shot 12:14 today, after the revision). unique: served over http (`tools/_serve.mjs`, port 18761) and shot into my own scratch folder (22 desktop, 23 mobile captures). The pin scrubs in this set, with captions 2/3 and 3/3 visible. **Current site on a phone:** shot with Playwright's iPhone 13 profile (iPhone UA, `innerWidth` 320, Wix's mobile layout, page 2606 px, 4 captures). **Correction to round 1:** I said the current site's phone layout was broken. That was the desktop layout at 390 px with a desktop UA. A real phone gets a working mobile layout. Round 1's verdicts don't depend on it, but the comparison below uses the phone layout. Inspector run on all three again.

**The current site on a phone** (`cur-ph-00…03`): the first screen is a sunlit lounge with orange rattan chairs, the logo in white at the top, a salmon "CHECK AVAILABILITY" box, the line "Best price when booking direct" in a serif, and round WhatsApp and Instagram buttons. Then come "No Paradise Like Home, Panta Rei." in blue display type, and the aerial pool, room, breakfast and yoga photos full-width. Each photo carries one spaced-caps word and a cream outlined ghost button ("Our Story", "Book", "Eat & Drink", "Sweat with us."). It ends with a Google map and four centred lines of grey text with an underlined email. It is pretty and short. It has strong photographs, ghost buttons, no rooms, no prices, no reviews and no real footer.

---

## Calm — round 2

**Three seconds.** 1440 (`calm/desktop-00`): a pool-level shot down the long pool, with loungers on both sides, red roofs and palms under a blue sky with clouds. "Panta Rei, Kabalana" is centred with one coral "Check dates →". It is clear, warm and bright: you can almost step into the pool. 390 (`calm/mobile-00`): a different moment of the same cut, with the pool edge, stone deck and stepping stones in the grass. The footage is softer (motion blur on the deck and grass), and the bottom third is shadowed lawn under the coral bar. It is still clear what and where.

**Checklist**
- **Media:** better than round 1. The pool-level cut sells the pool as you would swim in it. The lower half now has full-bleed moments: the restaurant photo with the title over it (`desktop-08`), the yoga photo as half-bleed beside the fitness text (`desktop-10`), the "After the surf" photo at full right-half (`desktop-11`), and an aerial strip after "Groups" (`desktop-14`). The closing is now the bright top-down pool, not the hazy coast (`desktop-15`). Mobile hero footage is a little soft.
- **Composition and grid:** the rhythm now alternates text sections with full-bleed photo moments. Rooms are still four 60/40 zig-zags with one photo at about 660 px and dots (`desktop-03…06`). The restaurant body (`desktop-09`) is a text column beside three small 145 px food thumbnails, with an empty right half below them.
- **Typography:** Figtree with Gochi Hand titles, now set smaller ("Four ways to stay" on one line, `desktop-03`), so the old orphan is gone. "Restaurant and bar" in white script over the photo (`desktop-08`) works well. "No paradise like home." still breaks onto three lines (inspector).
- **Colour:** unchanged and right. Coral only on booking, white on coral. The pool teal in the hero now ties to the tint panels.
- **Hierarchy and rhythm:** much improved. Photo, text, photo, text through to the footer.
- **Polish:** "Good to know" is now a " | " list, not bordered pills (`desktop-13`). The closing line and both buttons sit together over the image (`desktop-15`), though the line is still a 2-line sentence pushed to the top edge rather than centred. Resting shadows dropped from 28 to 11 (slideshow arrows). In `desktop-09` the frosted header has a thin dark line along its bottom edge. It looks like the photo above showing through, but it reads as a rule under the header. At 768/390 the inspector finds "Good to know" and "4.7/5" under the bottom bar at one scroll position each.
- **Distinctiveness:** better. The pool-level film and the hand-lettered titles over photos feel like this place. The room zig-zags and the pill buttons are still generic.
- **Hero and motion:** clean and slick, one title and one CTA. Micro-motion fits the calm variant.

**Score: 8 / 10.** A solid pass this time. It is clearly professional, the lower half is photo-led, and the closing is fixed. Room presentation and the restaurant block keep it from 9.

**Better than the current site?** Yes. First screen: `calm/desktop-00` (bright pool-level film, name, one coral CTA) against `cur-ph-00` / `current-site/desktop-00` (lounge or lamp photo with a salmon box and a social-icon stack). Whole page: four rooms with galleries, prices, reviews and a real footer (`calm/desktop-03…16`) against one word per photo and a map (`cur-ph-01…03`). On a phone (`calm/mobile-00…17` against `cur-ph-00…03`), the current site is about as pretty per photo, but it has no rooms, prices or proof, and its buttons are ghost outlines.

**Closest reference:** the Global Surf method (`global-surf-notes.md`). Now level with its structure: own footage, centred title, coral CTA, readable face plus script titles, full-bleed section moments, rooms with galleries, real footer. Still missing its Instagram block and its larger room galleries.

**Fix list (polish, not gating)**
1. **Make the rooms larger.** Give each room's slideshow the full 7 of 12 columns at about 800 px, or show two photos side by side per room, so the "rooms sold with galleries" read is immediate (`desktop-03…06`).
2. **Rework the restaurant body.** Replace the three 145 px thumbnails (`desktop-09`) with one large photo (img-003 or img-018), or set the three at full column height.
3. **Centre the closing line.** Cut it to one line ("Book direct for our best rate") and centre it vertically in the image with the buttons (`desktop-15`).
4. **Remove the dark line under the frosted header** (`desktop-09`): make the header opaque when it is over a photo edge. Set "No paradise like home." on two lines.
5. **Add the Instagram strip** before the footer.

**Keep:** everything from round 1's keep list. Also keep the pool-level hero, the script titles over full-bleed photos, the " | " "Good to know" list and the new closing image.

---

## Interactive — round 2

**Three seconds.** 1440 (`interactive/desktop-00`): the vid-002 aerial over the ring and the main building, roofs bright red, pool full of swimmers. "Panta Rei, Kabalana" is set large in Satisfy script, centred, white, with a coral "Check dates" under it. It is elegant and warm, the opposite of round 1's toy-like Fredoka. The script at about 90 px over a busy aerial is legible but competes with the roofs. 390 (`interactive/mobile-00`): the script on two lines over the pool and roofs, with a coral CTA. Pretty.

**Checklist**
- **Media:** much more photo-led than round 1. The room cards still straddle the aerial (`desktop-03`). Under them, a full-bleed swimmer-in-the-pool photo (`desktop-04`), a half-bleed restaurant photo on a peach panel (`desktop-05/06`), "After the surf" with the guests and boards full-bleed (`desktop-08`), and the groups photo (`desktop-11`). Weak spots: the fitness photos are two small crops at about 420 × 470 px (`desktop-06/07`), and the closing (`desktop-12`) is a dim, brown-scrimmed bedroom interior with the coast barely visible through the door. It is the muddiest picture on the page and the last one. The surf-beach clip from round 1 is gone, so all three heroes now open on the ring or the pool.
- **Composition and grid:** cards and shadows removed. The inspector's resting-shadow FAIL is gone (round 1 counted 35). Sections are now split layouts and full-bleed photos. `desktop-07` is half empty: the yoga crop on the left, the week strip and one price line on the right, and 300 px of empty ground under both.
- **Typography:** Satisfy script titles and Jost for reading. A readable face plus a handwritten title face, exactly what the calibration asks for. "Surf Therapy Massage" and "Revitalizing Massage" are also set in script as sub-titles (`desktop-09`), which is one script use too many. Body text is comfortable. Quotes are short and set larger (`desktop-09`).
- **Colour:** off-white with lilac, peach and sage panels, now flat, and a coral CTA. The panels read as gentle tints next to full-bleed photos. Fine.
- **Hierarchy and rhythm:** good through the middle (rooms, then pool full-bleed, then restaurant split, then fitness, then the after-the-surf full-bleed). The page ends weakly: groups, then the dim interior closing.
- **Polish:** week chips now carry times and "Day off" at rest (`desktop-07`). Prices are a " | " line. "Getting here" is a clean two-column list (`desktop-10`). The closing button label is long ("Check dates and book direct"), and the buttons sit at the bottom edge of the image, cut by the fold (`desktop-12`). The frosted header lets headings ghost through as they scroll under it ("After the surf" faintly visible behind the nav, `desktop-09`; the inspector finds "Getting here and around" fully under it at 768).
- **Distinctiveness:** the room chooser over the aerial plus the script give it its own identity. It is now closer to calm in structure than in round 1.
- **Hero and motion:** a clean hero with a centred title and one CTA. The main item is the vid-002 aerial cut, plus the room-card interaction. Micro-motion is present (chips, drawer, slider).

**Score: 8 / 10** (just). The type pair, the flat surfaces and the photo-led lower half put it at a professional level. The muddy closing and the half-empty fitness screen hold it at the line.

**Better than the current site?** Yes. First screen: `interactive/desktop-00` (bright aerial film, script name, one CTA) against `current-site/desktop-00` / `cur-ph-00`. Whole page: rooms with sizes and a drawer gallery, prices, reviews and a footer with buttons (`interactive/desktop-03…13`) against `cur-ph-01…03`.

**Closest reference:** the Global Surf method, at about calm's level. The script-title pairing is the closest of the three to the gold's type approach. It is below the gold at the closing and in the fitness section.

**Fix list (polish, not gating)**
1. **Replace the closing image.** Use the bright top-down ring (vid-002 poster or img-001) instead of the dim interior (`desktop-12`). Shorten the CTA to "Check dates". Centre the line and the buttons vertically in the image.
2. **Fill the fitness screen.** Set the yoga photo full-height half-bleed (as calm does) or play vid-003 at 9:16 beside the text, and close the 300 px gap under the week strip (`desktop-07`).
3. **Use script only for section titles.** Set "Surf Therapy Massage" and "Revitalizing Massage" in Jost semibold (`desktop-09`).
4. **Make the header opaque** (or at least 92 %) once scrolled, so headings don't ghost through it.
5. **Reduce the hero title.** Bring the Satisfy title down to about 72 px at 1440, or add a soft local scrim behind it, so it doesn't fight the roofs (`desktop-00`). Consider restoring the surf-beach clip (vid-004) as the hero. It made this variant's first screen different from the other two.

**Keep:** the Satisfy and Jost pair. The room cards over the aerial. The full-bleed pool and "After the surf". The " | " price lines. The week strip with times. The larger short quotes. The "Getting here" list.

---

## Unique — round 2

**Three seconds.** 1440 (`unique/desktop-00`): the top-down ring with swimmers, "Panta Rei" in tight Bricolage, "Boutique resort · Kabalana, Ahangama" and one coral "Check dates". The header no longer carries a second CTA. It is the most striking first screen of the three. 390 (`unique/mobile-00`): the same frame, centred and sharp. As I scroll, the film rises from the ring (`desktop-01`, caption 2/3 "The bungalows sit in a ring around a long pool", now two lines) to the coast (`desktop-02`, caption 3/3 "The waves of Kabalana, a short walk from the resort."). It ends on the coastline at golden hour (`desktop-03`), with the roofs red against the jungle. I kept scrolling to see where it goes.

**Checklist**
- **Media:** the regraded pin is much better. The roofs stay red in `desktop-01/02`, and the end frame (`desktop-03`) shows sea, beach and palms in warm light. The frames are a little soft at 1440 (72-frame sequence), and the scrim under caption 3/3 (`desktop-02`) still darkens the jungle more than needed. On mobile, `mobile-01` is visibly smeared (motion blur across the roofs), but `mobile-02/03` are clear. The lower half now has full-bleed moments with titles set over them: "After the surf" over the guests with boards (`desktop-12`), "Panta Fitness Club" over the shala (`desktop-15`), and "What guests say" with 9.2 and 4.7 over the breakfast photo (`desktop-16`). The closing is the bright top-down ring (`desktop-20`).
- **Composition and grid:** the best-paced of the three. Hero, then the pin, then a big type statement (`desktop-04`), then the lounge photo, then the room split, then the booking panel with thumbnails (`desktop-10`), then the pool, then full-bleed sections. The rooms are four repeated left-photo/right-text blocks (`desktop-06…09`), slightly long. The restaurant body (`desktop-13/14`) is two small food photos beside text.
- **Typography:** Bricolage for display and Hanken for reading. Captions are now title length (two lines). The Welcome paragraph is still set at 38 px for five lines (inspector), which is a statement paragraph rather than a headline but heavy. White Bricolage titles over full-bleed photos (`desktop-12, 15, 16`) look sharp. There is no script. The pair is defensible as one expressive display face, and it is the most grown-up pair of the three.
- **Colour:** grey-white ground, jade tint, deep coral, white on coral. Fine.
- **Hierarchy and rhythm:** strong throughout. The closing "Check dates and book direct" title with a short line and two buttons is set together and centred (`desktop-20`).
- **Polish:** the pill now shows only during the pin. On mobile the header carries "Check dates" after the pin, and I saw no text under the pill in any capture. The inspector still lists covered text (the hero title and the captions under the pinned stage) at some scroll position, but in the shots they are on top. I treat that as the pinned stage reading as "covering" when it is off-screen, not a visible defect. 20 text-shadows (on titles over photos) and 15 faint button shadows remain.
- **Distinctiveness:** the highest. No template does the pool-to-sea flight.
- **Hero and motion:** a clean hero with one CTA. The main item (the scrubbed film) now works and looks good. Caption masks and room crossfades provide the micro-motion.

**Score: 8 / 10.** The pin is now a real spectacle in the business's colours, the overlap defects are gone and the lower half is photo-led. The soft and smeared pin frames and the repetitive room blocks keep it from 9.

**Better than the current site?** Yes, most clearly of the three. First screen: `unique/desktop-00` against `current-site/desktop-00` / `cur-ph-00`. Whole page: the pin explains where the resort is and how close the sea is, something the current site never says, and is followed by rooms, booking, proof and a real footer (`unique/desktop-01…21`) against `cur-ph-01…03`.

**Closest reference:** in ambition, the scroll-film references in `agents/designer/references.md`. In finish, now near the Global Surf method: own footage, a short centred title, one coral CTA, distinct sections and a real footer. Below it on room galleries and the restaurant section.

**Fix list (polish, not gating)**
1. **Sharpen the pin.** Raise the sequence to about 96–110 frames, or export the mobile frames from the 1080 p source without motion blur, so `mobile-01` isn't smeared. Halve the scrim under caption 3/3 (`desktop-02`).
2. **Tighten the rooms.** Show two rooms per screen, or use one sticky gallery whose photos change as the room text scrolls, instead of four full-height repeats (`desktop-06…09`).
3. **Give the restaurant a full-bleed or large photo** instead of two small food prints (`desktop-13/14`).
4. **Set the Welcome paragraph at about 26–28 px** below the 52 px title, so the statement is the title and the paragraph reads as text (`desktop-04`).
5. **Drop the remaining text-shadows** on titles over photos and use a soft local scrim instead. Add the Instagram strip before the footer.

**Keep:** the hero. The regraded scrubbed flight with the two-line captions. The pill limited to the pin. The full-bleed titled sections ("After the surf", "Panta Fitness Club", "What guests say" over breakfast). The booking panel with room thumbnails. The new closing.

---

## Ranking by visual quality only — round 2

1. **Unique — 8, pass.** The flight from the pool to the sea now works in their own colours, and the lower half has full-bleed moments, making it the most striking and the most unmistakably Panta Rei of the three.
2. **Calm — 8, pass.** The most even and calm page, with a bright pool-level hero and photo-led sections; its rooms and restaurant are the only parts that still look like a template.
3. **Interactive — 8, pass (just).** It has the best type pair (Satisfy + Jost) and the room chooser, but its closing is the muddiest image on any of the three pages and its fitness screen is half empty.

---
---

# Station 5 · full r1

visual-critic 0.2.0 · 2026-11-06 · full mode, round 1 · dimension 8 only · page: `sites/panta-rei-resort/final/` (the interactive pick, built as Astro).

**How I looked.** I re-read the prompt (`tools/prompt.mjs visual-critic`, unchanged since 4f). Ran `npm run build` in `final/` (1 page, built clean). Served `final/dist/` over http (`tools/_serve.mjs`, port 18762) and shot it fresh with `tools/shoot.mjs` into my own scratch folder: 14 desktop captures (page 11209 px) and 16 mobile captures (page 12086 px). Below, `final/desktop-NN` and `final/mobile-NN` are that set. With Playwright I checked hero playback after 2.5 s: `vid-002-cut.d1920.webm` playing at 1440 and `vid-002-cut.p1080.webm` playing on the iPhone 13 profile. I opened the booking drawer from the hero CTA on the iPhone 13 profile (`drawer-ph`) and at 1440 (`drawer-dt`). I ran the tasteskill inspector. Compared against the picked mockup's round-2 set (`mockups/interactive/shots/desktop-00…13`, `mobile-00…15`) and against the current site on a phone with an iPhone UA (`cur-ph-00…03`, from 4f round 2) and on desktop (`current-site/desktop-00…05`).

**Three seconds.** 1440 (`final/desktop-00`): the vid-002 aerial over the ring and the main building, roofs bright red, swimmers in the pool. "Panta Rei, Kabalana" in white Satisfy script, centred, with one coral "Check dates" under it, and a clean white nav with no second CTA. It is warm, bright and calm. Same as the picked mockup's first screen. 390 (`final/mobile-00`): the script name on two lines over the pool, a coral CTA, and a WhatsApp icon top-right. Lovely. The frame is slightly soft from the drone's motion.

**Checklist**
- **Media:** the business's own film leads and plays. Full-bleed photos run through the page: the pool with the swimmer (`final/desktop-04`), the restaurant half-bleed (`desktop-05/06`), and the fitness photo, now a full-height half-bleed beside the text (`desktop-06/07`, fixed since the pick). Also the lights and surfboards on the lawn running into "After the surf" (`desktop-07/08`) and the groups yoga photo (`desktop-11`). The closing is now the top-down ring and pool (`desktop-12`). That is the right picture, but it sits under a heavy dark-green scrim: the roofs read brick-brown and the pool dull teal. It is darker than the same footage in the hero, so the page still ends on its dimmest image. The inspector warns that 3 clips have no poster.
- **Composition and grid:** split layouts and full-bleed photos alternate as in the mockup. Room cards straddle the aerial (`desktop-03`). The fitness section is no longer half empty. The inspector measures the margins at 106 px left and 122 px right at 1440, a small off-centre that I can see in `desktop-09/10`, where the left column starts a little closer to the edge than the nav. One row scrolls sideways past its edge (the room cards on narrow widths, by design).
- **Typography:** Satisfy for section titles only ("Welcome to Panta Rei", "Four ways to stay", "The pool", "Restaurant and bar", "Panta Fitness Club", "After the surf", "What guests say", "Getting here and around", "Groups and retreats", "Talk to us", "Follow"). "Surf Therapy Massage" and "Revitalizing Massage" are now Jost semibold (`desktop-08`, fixed since the pick). Jost body is comfortable. The inspector counts 15 font sizes, which is many, but nothing reads as chaotic.
- **Colour:** off-white with flat lilac, peach and sage section panels, and the coral only on booking actions, white on coral. The peach panel (`#fcf1e8`) is flagged as cream by the inspector. Next to the restaurant photo it reads as warm, not beige.
- **Hierarchy and rhythm:** good. The hero, then a quiet welcome, then rooms over the aerial, then the full-bleed pool, then restaurant and fitness splits, then the lawn full-bleed, then quotes, then getting here, then groups, then the closing, then the footer. The eye always knows where to go.
- **Polish:** (a) **The frosted header lets the page show through.** Body text and buttons scroll visibly behind the nav: "…tairs…the…Go" behind the nav in `desktop-06`, the fitness paragraph behind the logo in `desktop-07`, and the "Ask about a group" pill sitting behind "Restaurant / Fitness" in `desktop-12`. Also on mobile (`mobile-03, 05, 07, 11`). The inspector finds "Getting here and around" 75 % hidden under it at 390. This was in the mockup and is still not fixed. It is the most visible polish defect on the page. (b) **The closing line** is still the 2-line sentence. On mobile it is pushed to the top of the image, with the buttons under it and the bottom half of the image empty (`mobile-14`). (c) **The phone drawer** (`drawer-ph`): the title is in script, four room chips with photos, floating-label Arrival / Departure / Guests, and a coral "See prices on our booking page" with WhatsApp and Call. It is well designed and part of the site, and dates now come before the gallery as intended. But the top 80 px of the room gallery peeks out as a cut sliver between "Prices with your dates are on our booking page." and the CTA. It looks like a mistake. The desktop side-sheet drawer (`drawer-dt`) is clean: chips, a gallery with dots, details, the CTA, WhatsApp and Call. (d) The week strip, " | " price lines, short larger quotes and the "Getting here" list are all tidy.
- **Distinctiveness:** the room chooser over the ring, the script titles and the booklet tints make it this place and not a template.
- **Hero and motion:** a clean hero with header, one centred title and one coral CTA. The main item is the business's aerial film. Drawers spring, chips swap and the slider moves. The inspector calls the page fairly still (10 elements moved on load and scroll at 1440). That matches the brief's restraint and is not a defect, but there is no further spectacle after the hero.

**Score: 8 / 10.** Professional, beautiful and clearly better than the current site. It is at least as good as the picked mockup. The two fixes made since the pick (fitness, massage sub-titles) land, and the closing image is the right picture. The see-through header and the dark closing scrim keep it at 8.

**Better than the current site?** Yes. First screen: `final/desktop-00` / `final/mobile-00` (their aerial film, name, one coral CTA) against `cur-ph-00` (a lounge photo with a salmon "CHECK AVAILABILITY" box and two round social buttons) and `current-site/desktop-00`. Whole page: rooms with sizes, galleries and a booking drawer with dates (`final/desktop-03`, `drawer-ph`), prices for the pool, classes and massages, reviews with sources, directions and a footer with real buttons (`final/desktop-04…13`). The current site's phone page (`cur-ph-01…03`) has one word per photo, outlined ghost buttons, a map and an underlined email.

**Regressions against the picked mockup (round 2, `mockups/interactive/shots/`)**
- None that lower the score. Compared frame by frame: the hero (`desktop-00`), rooms (`desktop-03`), pool, restaurant, quotes, getting here, groups and footer are the same.
- Improved: the fitness section is now a full-height half-bleed with no empty band (`final/desktop-06/07` against mockup `desktop-07`). The massage names are in Jost (`final/desktop-08` against mockup `desktop-09`). The closing uses the ring and pool image with "Check dates" instead of the dim bedroom and "Check dates and book direct" (`final/desktop-12` against mockup `desktop-12`).
- New small defect: the cut gallery sliver in the phone drawer between the price note and the CTA (`drawer-ph`).
- Not fixed from the mockup: the see-through frosted header, and the closing line's length and position.

**Fix list (biggest effect first)**
1. **Make the header opaque once scrolled.** Use a solid `#FAFAF7` (or 96 % with a stronger blur) as soon as it leaves the hero, so no text or buttons show through it at any width (`final/desktop-06, 07, 12`, `mobile-03, 05, 07, 11`). Also clear the "Getting here and around" overlap at 390.
2. **Lift the closing scrim.** Halve it, or use a local radial scrim only behind the text, so the roofs stay red and the pool turquoise as in the hero. Cut the line to one sentence ("Book direct for our best rate.") and centre it with the buttons vertically in the image, on mobile too (`final/desktop-12`, `mobile-14`).
3. **Fix the phone drawer's gallery sliver.** Either show the gallery in full below the dates, at least 180 px tall with its dots, or hide it until a room chip is tapped. Never leave 80 px of a photo cut between the price note and the CTA (`drawer-ph`).
4. **Add posters to the three clips that have none.** Use a real frame of each clip, so no grey box shows before playback on slow phones.
5. **Even the side margins** to 120 px at 1440 (106 vs 122 measured). Optionally reduce the hero script to about 72 px, or add a soft local scrim behind it, so it doesn't compete with the roofs (`final/desktop-00`).

**Keep:** the hero (aerial film, Satisfy name, one coral CTA). The room cards over the aerial and the designed booking drawer (chips, floating labels, the coral hand-off, WhatsApp and Call). The Satisfy and Jost pair with script for titles only. The full-bleed pool, lawn and fitness photos. The " | " price lines and the week strip. The short larger quotes. The ring closing image, with a lighter scrim. The footer with button links and round social icons.

---
---

# Station 5 · full r2

visual-critic 0.2.0 · 2026-11-06 · full mode, round 2 · dimension 8 only · page: `sites/panta-rei-resort/final/` at commit 4fa7dce.

**How I looked.** Ran `npm run build:demo` in `final/` (1 page; `dist/index.html` rebuilt 23:25). Served `dist/` over http (`tools/_serve.mjs`, port 18763) and shot it fresh into my own scratch folder: 14 desktop captures (page 11209 px) and 16 mobile captures (page 12086 px). Below, `r2/desktop-NN` and `r2/mobile-NN` are that set. With Playwright I checked hero playback (`vid-002-cut.d1920.webm` playing at 1440, `.p1080.webm` on the iPhone 13 profile) and that all three `<video>` elements have a poster (true, true, true). I scrolled the closing section to the centre of the screen on both profiles (`r2-close-dt`, `r2-close-ph`). I opened the booking drawer from the hero CTA on the iPhone 13 profile (`r2-drawer-ph`), measured each `h2`'s left edge, and ran the inspector. Compared against the picked mockup's round-2 set (`mockups/interactive/shots/`), my r1 shots of this build, and the current site (`cur-ph-00…03` on an iPhone UA, `current-site/desktop-00…05`).

**Three seconds.** Unchanged from r1, and good. 1440 (`r2/desktop-00`): the aerial film over the ring, "Panta Rei, Kabalana" in white Satisfy, one coral "Check dates", and a clean nav. 390 (`r2/mobile-00`): the script name on two lines over the pool and one coral CTA.

**What changed since r1, checked**
- **Header:** solid once past the hero. In `r2/desktop-07` the fitness text scrolls cleanly under an opaque off-white bar, and in `r2/desktop-12` the nav sits on plain ground with nothing behind it. On mobile (`r2/mobile-03, 05, 07, 11`) no text shows through. **Fixed.** The inspector still reports "Getting here and around" 75 % under the header at one scroll position at 390. With a solid header, that is an ordinary sticky header covering a heading mid-scroll, not see-through text. Anchors land below the header, per the designer, and I did not see a heading cut on an anchor jump.
- **Closing:** the ring-and-pool aerial with only a soft scrim behind the words. Roofs read true red and the pool turquoise (`r2-close-dt`, `r2/desktop-12`). The sentence and its two buttons sit together and centred. **Fixed.** The sentence is still long: 2 lines at 1440, and 4 lines at about 30 px at 390 (`r2-close-ph`). It is centred and legible, but heavier than the rest of the page's display text.
- **Phone drawer:** the gallery is gone until a room is tapped. The sheet now goes title in script, four room chips, Arrival / Departure / Guests with floating labels, the price note, then the coral CTA with WhatsApp and Call (`r2-drawer-ph`). **Fixed.** Under the price note, the first line of the room description ("Every room has air conditioning, hot water and wifi…") now peeks cut in half above the sticky CTA. It is the same kind of artefact as r1's photo sliver, but text instead of a photo and smaller.
- **Posters:** all three clips have posters. The inspector's no-poster warning is gone. **Fixed.**
- **Margins:** the inspector still measures 106 px left and 122 px right at 1440. My `h2` measurements give 148 px for most sections and 106 px for the half-bleed fitness title, which sits in its half by design. I can't confirm 100/100 from the outside. Nothing looks off-centre in the shots, so I am not counting it.
- **Hover states:** not judged. The sheets are static, and I did not walk hovers this round.

**Checklist (full page, r2)**
- **Media:** the business's own film leads and plays, every clip has a poster, the full-bleed pool, lawn, restaurant and fitness photos are unchanged from r1, and the closing aerial is now bright. The page no longer ends on its darkest picture.
- **Composition and grid:** split sections and full-bleed photos alternate, with the room cards straddling the aerial (`r2/desktop-03`). Unchanged and good.
- **Typography:** Satisfy for section titles only, Jost for reading and sub-titles. The closing sentence is the only display line that runs long.
- **Colour:** off-white with flat lilac, peach and sage panels, and coral only on booking actions, white on coral.
- **Hierarchy and rhythm:** clear from hero to footer.
- **Polish:** the solid header removes r1's worst defect. What remains is the cut description line in the phone drawer and the long closing sentence.
- **Distinctiveness:** the room chooser over the ring, the script titles and the booklet tints make it this place.
- **Hero and motion:** a clean hero with the aerial film as the main item, plus spring drawers, chip swaps and the slider. Still a quiet page after the hero. The inspector reports "still-page", consistent with the brief.

**Score: 8 / 10.** Pass. Every r1 fix I could check landed, and the page is cleaner than at r1 with nothing worse. It does not reach 9: the closing sentence is long, the page has no motion moment after the hero, the restaurant body is a text column beside one half-bleed photo, and there is no Instagram block.

**Better than the current site?** Yes. First screen: `r2/desktop-00` / `r2/mobile-00` against `cur-ph-00` (a lounge photo with a salmon "CHECK AVAILABILITY" box and two round social buttons) and `current-site/desktop-00`. Whole page: rooms with sizes and a designed booking sheet with dates (`r2/desktop-03`, `r2-drawer-ph`), prices, sourced reviews, directions, a bright closing and a footer with button links (`r2/desktop-04…13`). The current phone page (`cur-ph-01…03`) has one word per photo, outlined ghost buttons, a map and an underlined email.

**Regressions against the picked mockup:** none. Hero, rooms, pool, restaurant, fitness, after the surf, quotes, getting here, groups and footer match the mockup or improve on it. Fitness is fuller, massage names are in Jost, the closing is the bright ring instead of the dim bedroom, and the header is solid instead of see-through. Nothing that was in the mockup is lost.

**Fix list (polish, not gating; biggest effect first)**
1. **Shorten the closing sentence** to one line, such as "Book direct for our best rate." with "Ask us anything on WhatsApp" as the second button's label. Then 390 shows one or two lines instead of four (`r2-close-ph`).
2. **Phone drawer:** end the scrolling content above the sticky CTA with a fade or 24 px of padding, so the room description isn't cut in half against the button (`r2-drawer-ph`).
3. **Add one quiet motion moment after the hero.** For example, play the vid-003 fitness clip muted in the fitness half-bleed, or slowly scale the "After the surf" photo with scroll (±4 %), so the page stays alive below the film.
4. **Add an Instagram strip** (six of their photos) between Groups and the closing.
5. **Recheck the 1440 side margins** with the inspector (it still reads 106 / 122) and align the fitness text column to the same 148 px edge as the other sections.

**Keep:** everything in r1's keep list. Also keep the solid header, the soft local scrim on the closing, the posters on every clip, and the drawer order (rooms, then dates, then CTA).
