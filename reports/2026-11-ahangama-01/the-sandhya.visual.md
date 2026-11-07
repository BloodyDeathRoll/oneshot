# The Sandhya: visual critic, station 4f, round 1

visual-critic 0.2.0 · run `2026-11-ahangama-01` · slug `the-sandhya` · 2026-11-06 · operator alon · `mode: test`

| Page | Score | Result | Better than the current site? |
|---|---|---|---|
| calm | **8/10** | pass, narrowly | yes, first screen and whole page |
| interactive | **7.5/10** | **fail (below 8)** | yes, first screen and whole page |
| unique | **6/10** | **fail (below 8, and not clearly better on the first screen)** | first screen no, whole page yes |

**How this was looked at.** All pages served over http on port 8772 and shot with `tools/shoot.mjs` at 1440 and 390 (2x), in headless Chromium on software GL. The current site was shot live the same way. Every shot went to my own scratch folder, not the shared `shots/`: the tool clears a target folder's old images before a new shoot, and the shared set may be `file://`, which shows no WebGL. Named files below (`desktop-00.png` and so on) are from that set, one per page; `u-`, `i-`, `c-`, `g-` files are my own walks. They are scratch, so each line says in words what the file shows.

**The current site.** At 1.5 s the live page is still behind a white veil and logo preloader (`current/desktop-00.png`, `current/mobile-00.png`), so the settled first screen is judged from `old-site-first-screen-desktop.png` and `-mobile.png`. It is a soft 1080 px figure of a woman at a window at dusk, a dictionary entry for the word, and a thin RESERVE box. Soft, but it has real mood. It never says "hotel". The rest of the page (`current/desktop-sheet.png`) is restrained and tasteful: white ground, small grey justified text, thin rules, loose prints, a dark footer. It is not a weak site to beat on taste. It is weak on sharpness, legibility and selling: no room is sold on its home page.

**The bar.** Opened: The Lavish Haven and KA Surf (whole desktop sheets), Layday (desktop sheet), `agents/designer/references.md` sections 1 to 4, `gold/global-surf-notes.md`, `custom.md`. Global Surf's pages and shots are not in this worktree, so the current top bar was read only as notes.

**Decisions not scored as defects:** beachfront hotel and not a surf stay; no nightly room price; no usable video. Also taken as given: the label "Check rooms and live dates" (concepts.md: final), and an Instagram button instead of a feed, because no post could be read. The calibration does ask for the feed, so all three carry that cost at the pick.

---

## Calm: "The Artwork"

**Three-second note.** Desktop (`calm/desktop-00.png`): calm, expensive, immediately a hotel. Eye goes to the palm in the window, then the words on the bed, then the red button. I would keep scrolling. Phone (`calm/mobile-00.png`): the view still lands, but the lower third is a flat grey slab of bed with text on it, so the screen loses some of its light.

**Checklist**

- **Media.** The best square-on photograph leads, full-bleed, no scrim (`desktop-00`: window, one palm, sea). Rooms are sold with real galleries (`desktop-03`: Studio King 3:2 with dots). img-032 runs full-bleed with nothing on it (`desktop-10`). **Phone softness is real but not a blocker:** the delivered file is 924x2001, and at 2x the palm fronds smear slightly (`c-m-crop.png`: fronds soft, horizon and mullions clean). It holds at arm's length. It matters more here than on interactive because the palm is the subject of the crop. Exclusive Use is cut to a 265 px strip (`c-twilight.png`: wide, flat crop of the block and loungers), which looks like a banner, and the retouching on the palms shows.
- **Composition and grid.** First screen is exactly held: window on the centre line, text on the bed. I accept the title sitting low and not vertically centred: the centre of this frame is the subject. The rooms run as four alternating 8+4 stacks (`desktop-03`, `desktop-04`). Tidy, but by the third it is a pattern and not a moment. Arrival text starts about 100 px below the top of its photograph and on a different left line, 168 px against the page's 56 px (`desktop-01`).
- **Typography.** The best pair of the three. Sacramento is graceful at title size and readable (`desktop-01`, "Pause, take a deep breath & exhale. You are home." on one line). Schibsted Grotesk is plain and clear. Weak spot: the featureLine in white script over five lines on the brown wall (`desktop-07`, lower left) is the hardest thing to read on the page, and on a phone it runs four lines (`mobile-sheet`, frame 9). Inspector: `headline-lines` FAIL on that line. Also in arrival, the large ¶2 sits between small paragraphs and reads as an accidental size change (`desktop-01`).
- **Colour.** Crimson button from the hotel's own lamp, unmistakable, white on it (`desktop-00`). Sea-green and marble tints come from the place (`desktop-14`). The ground `#F2F2F2` is correct but flat: over 18 screens it starts to feel like an office more than a beach.
- **Hierarchy and rhythm.** Strong at the start, slack in the middle. The amenities list stands open at 30 check rows in three columns (`desktop-07`, top) and reads like an aggregator listing. Page is 18.1 screens, the longest for what it says, after unique.
- **Polish.** Clean. Slideshow dots with the active one widening, proper Call, Email, Map, Instagram buttons, a real footer (`desktop-20`). The ending is flat: a white card repeating the title over grey (`desktop-18`) straight after the twilight prints. A page named for twilight finishes on a form-like box. One unexplained detail: the header button shows a darker red in `c-nav-kabalana.png` and `c-twilight-long.png` than elsewhere. I did not trace it.
- **Distinctiveness.** First screen is this hotel and no other. The twilight pair (`c-twilight-long.png`: blue-hour façade and sunset as matted overlapping prints beside "Why Sandhya") is lovely and specific. Rooms and amenities could belong to a good template.
- **Hero and motion.** Calm has no canvas by rule. The slow settle and parallax are the motion. I did not see the settle in time; the stills show it does no harm.

**Score: 8/10, pass, narrowly.** Clearly professional, beautiful, and clearly better than the current site. The first screen is at portfolio level; the middle is at good-template level and is what stops this from being a 9.

**Better than the current site?** **Yes**, first screen (`calm/desktop-00.png` against `old-site-first-screen-desktop.png`: sharp room and sea with "boutique hotel on Kabalana Beach", against a blurred figure and a dictionary entry) and whole page (`calm/desktop-sheet.png` against `current/desktop-sheet.png`: rooms sold, legible type; it gives up some of the old page's airy restraint and still wins).

**Closest reference.** Quality nearest Lavish Haven in finish, with much stronger media and no idea as strong as Lavish's pool window. Above Morgan's Rock (references #3), whose docked booking it shares.

**Fix list**

1. **Phone first screen.** Re-cut img-071 from the 8080 px original by a committed recipe (the plain `curl` was refused with 406, so the fetch needs solving). Then shift the crop so the grey bed is under 20% of the screen, leaving a fold or pillow edge for texture, with the title on it. `mobile-00` now gives about a third to a flat slab.
2. **Break the rooms pattern.** Make the Director's Suite (about 75 sq m) a full-bleed moment with the text below it; keep the other three as they are. Collapse "Amenities" by default on desktop as it is on phone (`mobile-sheet` frame 8 shows "+ Amenities"; `desktop-07` has it standing open).
3. **Make the ending the crescendo.** Enlarge the twilight prints to native width, let img-027 hold the screen, and set the booking action beside it without the white card. Drop the repeated title if the concept allows it, because it is the third time.
4. **FeatureLine.** Use a crop that gives more wall and set it in two or three lines, or set it on the ground above the photograph as a phone-style block. Five lines of white script on mid-brown is the page's one legibility failure.
5. **Tidy arrival and Exclusive Use.** One size for arrival body with ¶2 pulled out as a lead above the text, tops aligned with img-038. Give Exclusive Use's img-039 at least 16:9 in place of the strip.

**Keep.** The first screen as it is. Sacramento with Schibsted. The crimson. Matted staff prints with the offset (`desktop-12`). The twilight overlap. The footer. The sea-green Kabalana section with the drawn map as a print. The bottom bar with the round call button (`mobile-03`).

---

## Interactive: "Double Height"

**Three-second note.** Desktop (`interactive/desktop-00.png`): wow, what a room. The strongest single image of the three; the stair on rods, the wall of glass and the pool take the whole screen. Then the card, which looks like a UI panel laid on a magazine spread. Phone (`interactive/mobile-00.png`): very good, tall rods and glass with the pool above a docked sheet. I would keep scrolling on both.

**Checklist**

- **Media.** The hotel's best photograph at full size and well used. The phone crop at 2x holds (`i-m-crop.png`: rods crisp, a slight halo on the frames, sky flat so softness hides). Softness is less of a question here than on calm. Twilight pair is the most moving image moment on any of the three pages (`desktop-11`: img-023 with the sun low through the glass, overlapped by img-027). Food is big and appetising (`desktop-05`).
- **The depth piece: strong, and it bends straight lines at the extremes.** With the software-GL guard on, the effect is switched off in this environment (`i-ptr-tl-chairs.png` and `i-ptr-br-chairs.png`, 0% of pixels changed). With `?noguard` it runs (`g-tl.png` against `g-br.png`, 31% of pixels changed) and the room really does gain depth: chairs slide against the stair and the sea holds. It is the right idea and it does not read as a filter. But at pointer corners: the soffit edges along both glass bands turn scalloped and wavy (`g-br.png`, upper right, roughly x 870 to 1320); the mullions kink around the tops of the hoop chairs (`g-tl-chairs.png`: vertical frames curve where they meet the chair tops); the coffee-table and sofa legs bend (`g-tl.png`). In a photograph sold on its clean architecture, wobbling straight lines are the first thing an art director would see. This is the risk concepts.md named. At rest it is clean.
- **Composition and grid.** Offset room tiles break the row well (`desktop-01`). The room sheet is slick and in place (`i-sheet.png`: tabs, dotted gallery, details, full-width action), though there is a large empty gap between the details and the action at desktop height. Compact 11.4-screen page with better pace than the other two.
- **Typography.** Familjen Grotesk is warm and readable. The pen hand is the weak link: Nothing You Could Do is thin with wide gaps and reads as a quick note (`desktop-01`, "The rooms"; `desktop-08`, "Guests"), not as a finished title. It is much less elegant than calm's script, and it is what a reader will remember of the section titles. "We are not international…" set large is a good moment.
- **Colour.** Magenta from the coffee cup is distinctive and clear. Too many grounds compete: sand panel, pool-blue panel, peach, cloud white. Dense body text on `#5BB2CD` (`desktop-08`) is the cheapest-looking block on the page: a whole wall of type on a saturated web blue. Magenta button floating over that blue is the worst colour pair in the set.
- **Hierarchy and rhythm.** Good. Ratings straight under the hero work (`desktop-01`, though the row is slim and the numbers small).
- **Polish.** After the hero the header hides and the button floats alone at top right over whatever is there: over a palm (`desktop-04`), over food (`desktop-06`), on the blue panel (`desktop-08`). It reads as floating, which the calibration names. Rounded chips on photographs, rounded panels and rounded buttons together tip toward product UI (`desktop-01`, `desktop-05`).
- **Distinctiveness.** Hero and twilight are this hotel. The tinted rounded panels are not.
- **Hero and motion.** A main item from the business's own media, a clear CTA, nothing cookie-cutter except the card. Sheet slide and ring on press were not judged in time.

**Score: 7.5/10, fail (below 8).** This is the closest fail possible, and it is one or two rounds from overtaking calm: the hero is the best first screen of the three. It goes back for the bending lines, the title face, the guests panel and the floating button, not for its idea.

**Better than the current site?** **Yes**, first screen (`interactive/desktop-00.png` against `old-site-first-screen-desktop.png`: sharp architecture that Wallpaper* wrote about, against a soft figure) and whole page (`interactive/desktop-sheet.png` against `current/desktop-sheet.png`: rooms open in place, stronger food and twilight, though less refined typographically than the old page's quiet).

**Closest reference.** Kube and Tandjung Sari for the sheet (references #4 for Tandjung Sari). Hero ambition is above any gold first screen in photographic strength; finish below Lavish Haven, whose whole page holds one voice.

**Fix list**

1. **Stop the lines bending.** Paint the glass wall, soffits and mullions as one smooth plane in the depth map, with no silhouette of the chairs in it, and feather near objects so they never drag a mullion. Bring the reach from 1.5% down to about 0.9%. Check all four pointer corners with `?noguard` and on a real GPU. If straight lines still move, lower it again.
2. **Replace the title face.** Choose a finished pen script, not a scrawl (candidates to test on every title word: Allura, Mr De Haviland; it must stay different from calm's). Titles need to look drawn, not jotted.
3. **Rebuild the guests section.** Remove the full-width saturated block. Set the two quotes at 20 to 22 px on the ground beside img-031 (the pool water) as a photograph, keeping blue for the photograph and at most a small accent. Bring the ratings here as a second, larger appearance so this section has a focal point.
4. **Ground the floating button.** Keep a slim ground-coloured header bar on desktop after the hero, returning on scroll up as planned, with the button inside it. Never over content on its own.
5. **Calm the card and chips.** Dock the hero card flush to the bottom-left corner like the phone's sheet (square at the screen edges), and shorten it. Put tile names on the photograph over a light scrim, as concepts.md first asked, rather than in chips. Reduce the number of panel tints to two.

**Keep.** img-032 as the hero with the solid header. The depth idea at lower amplitude. Offset tiles and the room sheet. Food swipe row. The large "We are not international…" line. The twilight overlap on peach. Bottom bar on phone.

---

## Unique: "The Hour"

**Three-second note.** Desktop (`unique/desktop-00.png`): striking, and in the next second, Photoshop. I look at the join, not the hotel. The eye goes to the yellow panes, then the seam where the left bays are grey and the right bays are lit, then the sky. I would keep scrolling out of curiosity about the effect, not desire for the place. Phone (`unique/mobile-00.png`): same, smaller and softer, with the cut building off the right edge. It is the only first screen of the three that made me doubt the business.

**Does the first screen read as one photograph passing through a day, or as a trick? A trick.** The reasons, all at normal size, on `desktop-00.png` and `u-ptr-left.png`:

- **The lighting does not pass through a day; it switches.** Bay 5 is dark daylight glass and the very next bay is saturated yellow. Concrete does not change between them. Nothing lights anything: no spill on soffits, hedge or sand.
- **The noon half is not noon.** It is lilac-grey overcast, no blue in it. A beach hotel's first screen shows a stormy sky on its bright side.
- **Sky is visibly processed.** Clouds turn blotchy in the middle (`u-d2x-sky.png` at 2x: blocky patches through the pink, muddy lilac in the join).
- **The hedge and the sand look cut out.** A hard edge with an acid-green rim along their whole length, and a torn pale patch left of centre (`u-d2x-seam.png`; also visible at 1x along y about 700). The hedge goes navy on the right, which no hedge does.

**Mottling: the designer's account understates it.** It is not mostly a zoom problem. At normal desktop size, the upper-left lit bay and the lower row show dark streaks and blotches (`desktop-00`, x about 870 to 985). At 2x they read as stains and water damage on the curtains, with grid-like block marks (`u-d2x-curtains.png`). On a phone at 2x, likewise (`u-m-curtains.png`). An owner would ask why his curtains are dirty. On the all-dusk end frame they are less obvious.

**Checklist**

- **Media.** The façade is shown small with a lot of sand. Everything else on the page is well chosen (`desktop-07`: the marble rice-and-curry full width is the best food image in the set). But the real twilight photographs arrive right after the set-piece (`desktop-19`, `desktop-20`: img-027 with blue concrete and warm fold-lit curtains) and they plainly beat the graded picture, which shows what it should have looked like.
- **Set-piece.** The one true idea in the three pages, and the bays lighting one by one with the dots filling is fun (`u-piece-0`, `u-piece-2`, `u-piece-4`: sky turning, lit bays spreading left, eight yellow dots at the end). The end frame works as a poster and not as a photograph: flat lemon panes, navy hedge, brown sand, no light falling on anything. On a phone the pinned picture sits between empty beige bands above and below (`mobile-20.png`), which looks unfinished.
- **Composition and grid.** Room panels with widths from floor area are the smartest layout in the set and they expand well (`u-rooms-b.png`: first panel opens with dots, others narrow). At rest the Studio+ King panel is cropped to grey wall and a tub (`desktop-01`, third panel) when this hotel's whole offer is the view. Kabalana's stair-stepped paragraph indents (`desktop-13`) read as a bug. The map floats in a wide empty field beside two plain columns of services (`desktop-14`).
- **Typography.** Halant with a matching Devanagari is a real and specific choice, and "Why Sandhya" at huge size has presence (`desktop-19`). But the large inline संध्य breaks the leading of its line, and 22 font sizes is too many (inspector `size-count`). It has no script, which custom.md welcomes but does not require.
- **Colour.** Blue-hour button is a good idea and legible. The pale blue `#E0E8F6` ground (`desktop-01`, `desktop-02`) reads as corporate software beside warm rooms. The move to peach by the end is nice.
- **Polish.** The translucent header picks up smeared bands of what is under it (`desktop-07`, `desktop-13`, and a dark band with hard edges in `desktop-20`): it looks dirty. This is CSS and not WebGL as far as I can tell, but check on a real browser.
- **Distinctiveness.** The highest of the three, and that is the trouble. It is memorable for the wrong thing.
- **Hero and motion.** A main item from the business's media, yes. "Interesting, clean, slick" on the first screen: interesting, not clean. The pointer shift is imperceptible here (`u-ptr-left.png` against `u-ptr-right.png`: 0% of pixels changed noticeably, mean difference 0.82 of 765). Reduced-motion still matches the shader frame (`u-reduced.png`), so nothing pops.

**Score: 6/10, fail.** The structure and interactions are good and the set-piece could be excellent. The first screen, which sets the value of the whole page, looks like a cheap effect on a hotel charging the top of its town. Concepts.md named this exact failure and asked for the first screen to be judged alone.

**Better than the current site?** **No, not clearly on the first screen** (`unique/desktop-00.png` against `old-site-first-screen-desktop.png`). Unique is sharper and says what the place is, which the old page does not. But the old page's soft dusk figure, for all its faults, feels like a real hour at a real place, and this does not. Whole page, **yes** (`unique/desktop-sheet.png` against `current/desktop-sheet.png`). A page must win both, so this is a hard fail on the second count too.

**Closest reference.** In ambition Lavish Haven: one idea from the place carried by scroll, noon to night. Well below it in execution, because Lavish draws its water honestly as a drawing, while this asks a shader to pass as a photograph.

**A question for the human, not a score.** PLAN.md §9 says "Generated imagery: still no." Grading an owned photograph generates no new subject, and on the split first screen nobody thinks it is literal. But the curtains' glow is not in the photograph, and the all-dusk end frame (`u-piece-4.png`) has no signal that it is not the building at dusk. I am not calling it a hard fail. Alon or Shahar should decide whether that end frame is allowed.

**Fix list**

1. **Take the split off the first screen.** Use img-152 ungraded and full-bleed with the title on the sand, so the page opens in plain daylight with its real sky (sharpen the colour honestly, keep it noon), and let the day happen only in the set-piece. Alternatively move the whole frame through one hour together on first load: no seam, never noon and dusk at once.
2. **Rebuild the dusk grade against img-027 side by side.** Take curtain glow from a smoothed copy of the source's own folds, low-passing out the dirt and block marks. Use amber, not flat lemon. Add falloff: a blue-hour cast on the concrete as in img-027, spill on soffits, hedge tops and sand under each lit bay; keep the hedge dark green and not navy. If it still loses to img-027 on one screen, end the sequence on the real img-027 or img-154 instead.
3. **Clean the masks and sky.** Re-cut the hedge and sand edge with no green rim or torn patch. Remove the blockiness from the sky map, and make the left of any slice properly blue.
4. **Fix the phone set-piece.** Fill the space between header and bar, or drop the pin on phones and crossfade the stills in place. No empty beige bands. Re-crop the phone first screen, which currently ends with a building cut off the right edge.
5. **Tidy the interior.** Remove the stair-stepped indents in Kabalana, and compose the map with the services list. Crop the Studio+ King rest panel to its window. Give the header a solid ground. Warm the first ground toward the cloud white already in the palette.

**Keep.** The room panels sized by floor area and their expansion. The bar that remembers the room (`u-rooms-b.png`: header reads "Studio King: check live dates"). The bays lighting in sequence with the dots filling. Full-width marble rice and curry. Halant and Mukta with real Devanagari. The blue-hour button. The ground warming to peach.

---

## Inspector evidence (taste skill, 1440 and 390)

Evidence only; the score comes from looking. Calm 5 FAIL / 6 WARN, interactive 4 / 8, unique 6 / 6.

- **Agreed with what I saw:** calm's five-line featureLine; unique's 22 font sizes; interactive's `ragged-edges` (9 left lines).
- **Set aside:** `eyebrow` at 390 on all three (it is flagging list items and a price label, not kickers); `no-footage` (no usable video, an operator decision); `hero-words`, `small-title` (the title is the agreed tagline at the calibrated small size); `gradient` on unique (the concept's moving ground).
- **Not confirmed:** unique's `covered-text` for "Studio+ King" and "Director's Suite" at 390. Those names are readable in `mobile-sheet` and it is probably the bottom bar at one scroll stop. `still-page` on interactive and unique is measured on software GL.

## Ranking, by visual quality only

1. **Calm:** a nearly perfect first screen and a graceful script, with a competent middle and a flat ending.
2. **Interactive:** the best photograph and best idea in motion, let down by bending lines at the extremes, a scrawled title face and a loud guests panel.
3. **Unique:** the most distinctive structure, with a first screen that reads as a Photoshop trick and undersells the hotel.

## What was not covered

- **Real GPU and real devices.** Everything ran on software GL in headless Chromium. Interactive's own guard turns its depth off on this renderer, so I forced it with `?noguard`: I saw positions, not motion. I could not judge how the depth, damping, sweep, or the phone's scroll-driven depth feel in time. Unique's pointer shift may read differently on a GPU. Safari and iOS were not opened.
- **Motion over time** generally: calm's settle and parallax, crossfades, sheet slide, ring on press, panel expansion easing, ground easing. Stills before and after only. The motion audit skills and `/impeccable critique` were not run.
- **Phone states:** interactive's sheet and unique's panels were not opened at 390. Hover states were not judged.
- **Global Surf gold**, the current top bar, could only be read as notes, because its media is not in this worktree.
- **Not my lane and not checked:** facts, performance numbers, booking links, keyboard use. The designers' `notes.md` were not read. The other reviewers' reports were not opened.

---

# Round 2 (interactive and unique only)

visual-critic 0.2.0 · 2026-11-07 · build `2351ac2`. Calm passed round 1 and is not re-scored.

| Page | Score | Result | Better than the current site? |
|---|---|---|---|
| interactive | **8.5/10** | **pass** | yes, first screen and whole page |
| unique | **7/10** | **fail (below 8)** | yes, first screen (narrowly) and whole page |

**How this was looked at.** Fresh shoots over http on port 8772, 1440 and 390 at 2x, on software GL, in my scratch folder: `r2-interactive/`, `r2-unique/` and my walks in `r2-walk/` (cited below by file name, with what each shows). Depth was forced with `?noguard`. The current site is judged from the same dossier captures and live sheets as round 1. The designers' notes were not read.

**One thing to disclose.** Running `git log` for this round showed the commit line for round 1, which carries the other reviewer's round 1 scores. I had already filed mine. I have not opened any round 2 section from another reviewer.

## Interactive: round 2

**Three-second note.** Desktop (`r2-interactive/desktop-00.png`): the same wow, and the panel now sits quietly in the corner like part of the page. Phone (`mobile-00.png`): tall rods, glass and pool over a docked sheet. I would keep scrolling on both.

**Do straight lines hold across a pointer sweep at normal size? Yes, at every stop I took.**
- At all four pointer corners and the centre (`i-tl.png`, `i-tr.png`, `i-bl.png`, `i-br.png`, `i-mid.png`), the mullions, soffits and rods stay straight.
- The scallops and kinks from round 1 are gone (`i-tl-glass.png`, `i-br-glass.png`: clean frames and slab edges at both extremes).
- Furniture legs stay straight, and the near chairs still slide against the room (`i-tl-near.png` against `i-br-near.png`: hoop chairs and table shift, nothing warps).
- The second use on img-068 also holds (`i-feature-tl.png` against `i-feature-br.png`: frames and pool edges straight, palm and chair shift).
- It is still clearly depth, not a filter.
- The limit: these are resting positions, on software GL. I have not seen the motion itself.

**Does Allura work as the title face? Yes.** It is elegant and readable on every title I checked, including the long two-line one (`desktop-03.png`, "Pause, take a deep breath & exhale. You are home."; `desktop-01.png`, "The rooms"; `desktop-11.png`, "Why Sandhya"; phone sheet frames 2, 5 and 14). It is a much better fit than the pen hand. It leans a little toward a wedding invitation beside this concrete architecture, but that is a taste note, not a defect.

**Is the guests section still the cheapest-looking block? No.** The blue wall of text is gone: a pool-water photograph, a script title, large rating numerals and two quotes on the ground (`desktop-08.png`). It now reads as a composed section, though a quiet one. One weak detail: the bottom of the photo is a dull band of grey pool edge. The cheapest block on the page is now the "At the house" panel, about 30 check rows standing open on desktop (`desktop-03.png`, top).

**Checklist**
- **Media.** Still the strongest first image of the set. Room tiles now crop to the windows and sell the view (`desktop-01.png`). The twilight pair holds (`desktop-11.png`: low sun through the glass with blue hour overlapping).
- **Composition.** Offset tiles, sheet and compact pace all work. The phone sheet is clean, with the action pinned at the bottom (`i-m-sheet.png`).
- **Typography.** Allura with Familjen Grotesk is now a real pair.
- **Colour.** Better: the saturated blue has gone, leaving sand and peach panels. Magenta on peach is fine.
- **Polish.** The solid header holds the button, so it no longer floats (`desktop-01.png`). "Call" sits only about 12 px from the button. Tile scrims are a little heavy and grey, most of all over the bed on Studio+ King (`desktop-01.png`).
- **Distinctiveness.** Hero and twilight are this hotel. The rounded panels remain the most template-like part.
- **Hero and motion.** Main item from the hotel's own best photograph, one clear CTA, nothing cookie-cutter.

**Score: 8.5/10, pass.** Clearly better than round 1, and by eye now the strongest page of the three, above my round 1 mark for calm (not re-scored). It stays below 9 because of the rounded-panel middle and the flat closing card.

**Better than the current site?** **Yes**, first screen (`r2-interactive/desktop-00.png` against `old-site-first-screen-desktop.png`: sharp architecture and a clear action, against a soft figure and a dictionary entry) and whole page (`r2-interactive/desktop-sheet.png` against `current/desktop-sheet.png`: rooms sold in place, stronger food and twilight).

**Closest reference.** The sheet follows Tandjung Sari (references #4). The hero is stronger photographically than any gold first screen I could open, and the finish is now close to Lavish Haven's.

**Fix list (none blocking)**
1. Check the depth on a real GPU with a real pointer sweep before the human sees it, because that is the one thing I could not see.
2. Collapse "At the house" on desktop, as it already is on phone (`mobile-sheet` frame 4).
3. Crop the guests photograph to water only, without the grey pool edge.
4. Lighten the tile scrims and keep them only behind the words, especially on Studio+ King.
5. Open up the header (24 px between "Call" and the button), and let the twilight prints carry the ending, with less repetition of the title in the closing card.

**Keep.** img-032 under the solid header, the flat-plane depth, the corner-docked card, Allura, the window-cropped offset tiles and room sheet, the food row, the large "We are not international…" line, the rebuilt guests section, the twilight overlap on peach.

## Unique: round 2

**Three-second note.** Desktop (`r2-unique/desktop-00.png`): a handsome, honest picture of a long low hotel on a beach, and I believe it now. It is also a little ordinary, like a good listing photograph, with a band of unrelated water under it. Phone (`mobile-00.png`): clean and clear. I would keep scrolling, for the content and not because the first screen made me want to.

**Does the first screen beat the current site?** **Yes, narrowly.** It is sharp, says what and where, and has a clear action, where the old page has a soft figure and a dictionary entry. It gives up the old page's mood and gains trust. It is far better than round 1's split, but "interesting, clean and slick" is now only clean: with the effect gone, nothing here is an idea. The light pills behind the nav on the sky also add UI clutter that appears nowhere else.

**Does the img-153 strip earn its place? No.** It takes the bottom 117 px of the desktop first screen below a thin white gap (`desktop-00.png`), and it peeks at the bottom of the phone screen too (`mobile-00.png`). It does supply the one thing the façade shot lacks, the sea, but it has no horizon and no context, so it reads as a stray band of colour or a mistimed next section. It breaks `custom.md`'s "only header, title, CTA" and gains nothing that the Kabalana section does not already do far better (`r2-unique/desktop-sheet.png`). Remove it.

**The set-piece: does the grade still read as a trick?** It depends on the moment.
- **Mid-sweep, yes, plainly an effect.** A hard vertical edge in the sky around x 960, with day on the left and dusk on the right, across the sky and the sand (`u-piece-3.png`; phone `u-m-piece-1.png`, the navy wipe at the right edge). In motion this is acceptable, because it visibly announces itself.
- **Late in the sweep, no, and that is the problem.** The grade is much better than round 1: amber in place of lemon, the mottling mostly gone at normal size, a dark green hedge, blue in the concrete (`u-piece-5.png`, `desktop-17.png`).
- **Up close it still gives itself away.** The panes are flat, parasols and chairs turn to black cut-outs, the palms are posterised, and no light falls on the hedge or sand (`u-grade-2x.png`).

**Could a visitor take it for a photograph of the building at dusk? Yes.** At normal size, stopped around `u-piece-5.png` just before the print rises, I think many would. And the picture is wrong about the building: the real rooms show white curtains with yellow cove light against blue concrete (`u-piece-8.png`), not uniform amber.

**The label is not visible.** The "effect, not a photograph" wording is an `aria-label` on the frame. No caption appears in any frame I shot, so only screen-reader users get it. A sighted visitor gets no notice at all.

**The rest on img-027 is the best moment on the page.** A real blue-hour photograph held on peach (`u-piece-8.png`). The transition is less good: mid-rise it sits over the graded wings like a collage, inviting direct comparison (`u-piece-6.png`). On the phone it arrives as a hard horizontal cut across the screen that looks like a rendering fault (`u-m-piece-3.png`).

**For the operator's ruling: I recommend no grade stays.**
- A visitor could take it for the building at dusk, with no visible notice.
- PLAN.md (line 392) says "Generated imagery: still no." The glow in those curtains is in no photograph. Whether a re-grade counts as generated is your ruling, but it is a picture of an hour nobody photographed, shown to people deciding whether to pay top-of-town rates.
- The real pictures are better, and the page proves it seconds later.
- **What I would do instead:** a pinned sequence of the hotel's own photographs at their real hours: img-152 day, img-023 low sun (cropped clear of the surfboards), img-027 blue hour, img-154 night, joined by a bay-width WebGL dissolve, with the eight dots kept. Those late pictures are 1200 to 1280 px wide, so they must sit as prints at or under native size, as img-027 does now. That keeps a main item and invents nothing. It may be less spectacular, and I have not seen it built.
- **If the grade is kept anyway:** stop the sweep before all the bays are lit, so it is only ever seen as an obvious wipe, cut to the print from there, and add visible wording. `custom.md`'s surface rules would need a stated exception for that caption.

**Checklist (the rest of the page)**
- **Media.** Rooms crop to the views (`desktop-01.png`). The full-width rice and curry stays excellent (`desktop-sheet.png`, third row, middle).
- **Composition.** Kabalana's stair-stepped indents are gone, replaced by clear lead and body pairs that work well (`desktop-13.png`). Map and collapsed Services now sit tidily (`desktop-14.png`).
- **Typography.** Halant with Mukta holds. Big serif titles have presence (`desktop-14.png`, "Exclusive Use"). The oversized inline संध्य still disturbs its line (`desktop-sheet.png`, "Why Sandhya").
- **Colour.** The blue ground has gone from the rooms section, which is warmer and better. Blue-hour button stays strong.
- **Polish.** The header is solid and the smears are gone (`desktop-13.png`, `desktop-14.png`). The phone print cut above is the main flaw.
- **Distinctiveness.** Lower than round 1 with the split gone, but now for honest reasons. The room panels by floor area and the print on peach are the identity.
- **Hero and motion.** The main item is real but has moved off the first screen, and its future depends on the ruling.

**Score: 7/10, fail (below 8).** A big step up from 6: good structure, trustworthy, and it ends on the page's best image. It fails on a plain first screen with a stray strip, and on a set-piece that is either an obvious wipe or a picture that could be mistaken for the real building.

**Better than the current site?** **Yes**, first screen narrowly (`r2-unique/desktop-00.png` against `old-site-first-screen-desktop.png`) and whole page (`r2-unique/desktop-sheet.png` against `current/desktop-sheet.png`).

**Closest reference.** In idea Lavish Haven, one movement from the place carried by scroll. Below it, because Lavish's device is plainly drawn and this one is ambiguous.

**Fix list**
1. **Get the ruling, then rebuild the set-piece.** My recommendation is the real-photograph sequence above, resting on img-027 as it does now.
2. **Give the first screen an idea from real pixels.** For example, a scroll-driven push from the façade through its open double bay, dissolving into img-032 inside, so the hero leads into the house. Only if that holds up in the build; otherwise keep the plain façade and accept that the hero is quiet.
3. **Remove the img-153 strip** and let the sand run to the fold; the shallows already have their moment at Kabalana.
4. **Fix the print's arrival.** No hard horizontal cut on phone (`u-m-piece-3.png`) and no collage over graded wings on desktop (`u-piece-6.png`): crossfade, or clear the frame first.
5. **Small polish.** Drop the nav pills on the hero if plain ink text holds on the sky, and reduce the inline संध्य so its line keeps normal leading.

**Keep.** The ungraded img-152. The print of img-027 held on peach. Room panels sized by floor area, and the bar that remembers the room. The Kabalana lead and body pairs. The solid header. The marble rice and curry. Halant and Mukta with real Devanagari. The blue-hour button. The ground warming to peach. The eight dots, if a sequence survives.

## Ranking, round 2, by visual quality only

Calm was not re-scored; its mark is from round 1.

1. **Interactive (8.5):** the best first screen, depth that now holds its lines, and a title face that finally suits it.
2. **Calm (8, round 1):** a nearly perfect first screen with a competent middle and a flat ending.
3. **Unique (7):** honest now and well organised, but its hero is plain and its set-piece has an open question of truth.

## What was not covered in round 2

- **Motion in time.** Software GL throughout, and every depth and sweep finding is from stopped frames. Interactive's depth was only seen with `?noguard`, so I did not see its guard behave on real hardware, nor feel its damping or the phone's scroll-driven depth. The speed and feel of unique's scrub, and the print's rise, are unseen. Safari, iOS and real devices were not opened.
- **Not rechecked this round:** reduced motion and JavaScript off on both pages, hover states, unique's panel expansion on phone, interactive's desktop sheet. The taste inspector was not re-run and gold pages were not reopened (round 1's viewing stands). The current site was not re-shot.
- **Not my lane:** facts, performance, booking links and keyboard use.
