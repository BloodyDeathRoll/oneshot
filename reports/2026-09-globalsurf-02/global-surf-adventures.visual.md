# Global Surf Lodge Kabalana: visual critic, station 4f (quick), round 1

visual-critic 0.1.0 · run `2026-09-globalsurf-02` · slug `global-surf-adventures` · 2026-09-28
Pages were served over http on 127.0.0.1:8982 and shot with `tools/shoot.mjs` at 1440 and 390 (settle 1200 ms). All shots are under `reports/2026-09-globalsurf-02/visual/global-surf-adventures/`:
- mockups: `calm/`, `interactive/`, `unique/`
- current site: `current-home/` (globalsurf.com) and `current-lodge/` (the Kabalana lodge page, which is the page this site replaces)
- gold, for comparison: `gold-lavish/`, `gold-layday/`
- hero frames 5 s after load: `{calm,interactive,unique}-hero-5s.png`
- the hero cut at 1 fps: `vid-009-cut-1fps.png`

Playback check (Playwright, 5 s after load): all three pages play `vid-009-d1920.webm` on desktop and `vid-009-m1280.webm` at 390. Posters paint first. No image is drawn wider than its source, except calm's img-002 (576 px drawn at 606 px, which does not matter).

## The current site, the baseline

`current-lodge/desktop-00.png` shows a moody sunset rock (a YouTube embed, with a pause glyph and the YouTube logo left on it), a serif headline, a breadcrumb and a circular badge over the headline, and a Messenger bubble. Below that come "Choose your level" twice in a row, script headings, grey level tiles, and a long page of white gaps (`current-lodge/desktop-sheet.png`). It is a dated Elementor build, but its photographs and footage are real and it has atmosphere. I score it about 4/10. It is an easy bar to clear on clarity and a harder one on mood.

## One problem all three share: the hero loop

`vid-009-cut-1fps.png` shows what the 12 s cut contains: a drone shot where the neighbour's pink-roofed three-storey house dominates (0–2 s), the pool deck (2–5 s), **the back of the tuk-tuk driver's head** (5–6 s), a hillside Buddha, an outrigger prow, a woman walking to the beach, and a reef drone shot. That is seven shots in twelve seconds. It plays like a travel-agency montage behind the headline, and it never shows anyone surfing. `unique-hero-5s.png` catches it mid-loop: the title "Global Surf Lodge Kabalana" is set over a driver's blue shirt that says "Unichela Koggala 2018". On the calm page ("nothing moves") the montage contradicts the concept outright. The poster is good; the loop is not. This one edit would lift every variant.

---

## 1 · calm, "Daybed"

**Three-second note.** Desktop (`calm/desktop-00.png`): bright, sunny and pleasant. The pool deck, the palms and a big light Sora name, with the coral button low-left. It feels like a nice boutique hotel. I would keep scrolling, but nothing surprises me. Phone (`calm/mobile-00.png`): the crop is mostly white roof and a parasol, with the pool only a dark sliver at the bottom. It looks soft, like an upscaled video frame, and the loop soon cuts away from it.

**Checklist**
- **Media.** Video leads (plays, checked). Poster and first frame are good. The loop is the montage described above (`vid-009-cut-1fps.png`). Level 3's panel is the drone shot over grey roofs with a dirt lot and a pickup truck, not the barrel (`calm/desktop-03.png`, right panel). The intro pairs a palm-top crop with a white wall and **an air-conditioning grille** (`calm/desktop-01.png`, bottom right): the weakest photograph on any of the three pages, in the second screen. The feature band (pool at water level, `calm/desktop-05.png`) and the night closing band (`calm/desktop-sheet.png`, last row) are strong.
- **Composition and grid.** Correct but inert. The intro screen is mostly empty: the headline, one text column and then two orphan crops (`calm/desktop-01.png`). There are long blank stretches before "Twelve rooms" and before "What guests say", where the heading is stranded at the foot of an empty screen (`calm/desktop-sheet.png`, rows 3–4). The four-photo day strip, edge to edge, is the best section.
- **Typography.** Sora Light suits the low white architecture. Display sizes are confident ("Next set is yours", `calm/desktop-01.png`). Level bodies repeat the name ("Level 1 – Fomies is for…" under the heading "Level 1 – Fomies", `calm/desktop-03.png`).
- **Colour.** Grey-white ground, pool-blue figures, coral CTA. It is clean and it belongs to the lodge. The coral is unmistakable. The white price stickers over the level photos (`calm/desktop-03.png`) look like template badges.
- **Hierarchy and rhythm.** Every section is photo, heading, text at the same pace. The feature band is the only change of tempo. On mobile the persistent bar is two rows, about 110 px, on every screen (`calm/mobile-sheet.png`).
- **Polish.** Nothing is broken. The outline "Book Level n" buttons are thin next to the heavy coral. The forecast widget sits cleanly.
- **Distinctiveness.** Low. Swap the photos and it could be any villa in Bali. The concept named its own risk ("too polite… a nice hotel template"), and that is what happened.

**Score: 6/10. FAIL** (below 8).
**Better than the current site?** Yes, both on the first screen (`calm/desktop-00.png` vs `current-lodge/desktop-00.png`: sunlit pool, name, price path and rating, against a dark rock with a breadcrumb over it) and on the whole page (`calm/desktop-sheet.png` vs `current-lodge/desktop-sheet.png`: the week is priced and bookable). It wins on clarity, not on beauty.
**Closest reference.** The Lavish Haven (gold) in manners: white ground, one light face, pool blue. It sits well below it because it has no idea. Lavish turns its pool into the page's device (`gold-lavish/desktop-sheet.png`), while calm just shows photographs in boxes.

**Top 5 fixes**
1. Re-cut the hero to **one or two slow shots**: the pool-deck move (vid-009 source ≈ 5–8 s) held for 8–10 s, optionally ending on the reef drone. No tuk-tuk, Buddha, outrigger or neighbour's house. On a phone, set the focal point on the pool and daybeds, not the roof.
2. Replace the intro's two orphan crops (the palm tops and the **AC-grille wall**, `desktop-01`) with one big photograph: img-001 (daybed over the pool) at 4:5, 7 columns, bleeding left, with the text beside it. That removes the empty half-screen.
3. Level 3 panel: use the vid-002 barrel frame (the poster the concept named), not the roof-and-dirt-lot drone shot. All three level panels should show water.
4. Close the blank gaps before "Twelve rooms" and "What guests say" (`desktop-sheet` rows 3–4). Start each heading with its content on the same screen.
5. Make the price chips part of the layout, not stickers: set "$1,466" in pool blue on the ground under each photo, or print it straight on the photo without the white box. Drop the level name from the start of each level's body text.

**Keep.** Sora Light display. The pool-at-water-level feature band with the footwear line. The edge-to-edge day strip. The night closing band. One coral colour for booking. The rating block set large.

---

## 2 · interactive, "Pick your water"

**Three-second note.** Desktop (`interactive/desktop-00.png`, `interactive-hero-5s.png`): the giant white **"Kabalana"** across the pool is bold. It is the only first screen of the three with a graphic idea, and it lands. Then the eye finds a second, small "Global Surf Lodge Kabalana" in thin Barlow washing out against the white bungalow wall, and the header says "Global Surf Lodge" a third time. Phone (`interactive/mobile-00.png`): name, rating, a full-width coral button, and "Kabalana" filling the foot. It is strong and uncluttered. I would scroll.

**Checklist**
- **Media.** Video leads. The stage plays each level's clip at 7/12 width (`interactive/desktop-02.png`: Level 1, a woman paddling out into golden light, beautiful). Riders shows the drone shot over grey roofs, a dirt lot and a pickup (`interactive/desktop-03.png`), and in the scrolled shot the clip breaks into macroblocks (`interactive/desktop-04.png`, left). On a phone the stage crops the Level 1 woman to a headless torso (`interactive/mobile-02.png`). The hair-flip splash (`interactive/desktop-06.png`) is the best still on any of the pages.
- **Composition and grid.** The stage is a strong editorial split (`desktop-02`). The pinned horizontal run sits on an aqua half-band that reads unfinished: it becomes a bare aqua slab with nothing on it (`interactive/desktop-08.png`, bottom; `interactive/desktop-11.png`, top). "Footwear is discouraged" is set huge on an empty white screen with the photo pushed below it (`desktop-05`). Type and picture never meet.
- **Typography.** Barlow Condensed Light is the best type decision of the three. The level words (`desktop-02`) and the closing "Fomies Rollers Riders" at display size (`interactive/desktop-sheet.png`, last rows) look like a poster. The hero's secondary type is far too light and small over the video.
- **Colour.** Warm white, deep green ink, reef aqua and coral. The active level word in sky blue (`#6197E4`) looks like a default link colour next to the aqua underline.
- **Hierarchy and rhythm.** Good variety: stage, run, hover list, quote-plus-three-photos, giant closing words. The mobile bar (level switch plus "Book Level 1") is clear.
- **Polish.** The Riders macroblocks (may be partly headless decode, but the frame choice is the designer's), the stranded aqua band, the weak hero secondary type, and "Book Level 3" in the header while the page shows rooms.
- **Distinctiveness.** Medium-high. The giant place word and the condensed type give it a voice, and the stage is this business's own idea (levels as water).

**Score: 6/10. FAIL** (below 8).
**Better than the current site?** Yes, both on the first screen (`interactive/desktop-00.png` vs `current-lodge/desktop-00.png`) and on the whole page (`interactive/desktop-sheet.png` vs `current-lodge/desktop-sheet.png`).
**Closest reference.** White Desert's giant word over one good picture (references #8), and in spirit Layday gold ("an idea on the first screen", `gold-layday/desktop-00.png`). It falls short of both on finish: Layday has one clear voice on the first screen, while this one has three names competing.

**Top 5 fixes**
1. Hero: remove the small "Global Surf Lodge Kabalana" block from over the white wall. Put the name once, in the header, at readable weight. Put the tagline and rating on a single line above the button, on the darkened lower third. Let "Kabalana" be the only big type. Apply the same hero re-cut as in the shared section: one slow pool shot, no montage.
2. Stage clips: Riders must show the barrel (vid-002 source ≈ 9–12 s), not the roofs and dirt lot. Rollers should use the vid-003 reef rides that now exist. On a phone, crop the stage 4:5 on the rider's face and board, not the torso.
3. Kill the aqua half-band behind the horizontal run (`desktop-08`, `desktop-11`). Either put the run on the white ground, or make the band carry the day's copy in type large enough to justify the colour.
4. "Footwear is discouraged…": set the line **over** the hair-flip photograph (in the sky area, as the concept said), not on an empty white screen above it.
5. Replace the sky-blue active state with ink plus the aqua underline alone. One place colour is enough.

**Keep.** The giant "Kabalana". Barlow Condensed display. The level stage as an idea, with the Level 1 golden-hour clip. The hair-flip photograph. The closing trio of level words. The synced mobile bar.

---

## 3 · unique, "Waterline"

**Three-second note.** Desktop (`unique/desktop-00.png`): a sunlit pool with the name in wide Archivo Expanded, a coral button, and a thin live waterline across the foot that refracts the pool beneath it. It feels like the pool, and it is the only first screen that does something the old site could not. Then the loop cuts to the tuk-tuk driver's back under the title (`unique-hero-5s.png`), and the magic goes. Phone (`unique/mobile-00.png`): sky and palm, big name, a full-width coral button, and the waterline below. It is the best phone first screen of the three.

**Checklist**
- **Media.** This is the only page where **surfing is shown big**. The level scenes are full-bleed video: Rollers carving (`unique/desktop-04.png`) and Riders on a green wall (`unique/desktop-06.png`). That is what the business sells, and neither of the other two shows it at this scale. At 1440 full-bleed the YouTube-sourced footage is soft. There is a cut-off dark figure at the left edge of Riders (`desktop-06`). The Fomies scene lands on silhouetted legs on wet sand (`unique/desktop-03.png`), not a person surfing. The drone over the pool and palm (`unique/desktop-sheet.png`, row 4) is a great frame.
- **Composition and grid.** The rhythm is right: full-bleed scene, then a quiet panel. But each level panel is a slab of pale blue with a large empty centre (`desktop-03`, `desktop-05`). The "Surf, breakfast, surf again" masonry is small and polite for a page this cinematic (`desktop-09`, `desktop-10`).
- **Typography.** Archivo Expanded is distinctive and matches the horizon idea. There are awkward breaks: "Level 1 –" and "Level 3 –" hang as orphan labels with a trailing dash above the name (`desktop-03`, `desktop-06`), and "Surf, / breakfast, / surf again" is broken into three lines (`desktop-09`).
- **Colour.** Foam-blue ground, ink, barrel-teal prices and coral. It is coherent and cool, and the coral pops. The pale blue ground makes the photographs look slightly cold.
- **Hierarchy and rhythm.** The strongest of the three. Scene, level, price, book, then the next scene rising through the line.
- **Polish.** Caught mid-transition, the waterline shows muddy refracted frames: a striped towel smeared under the line (`desktop-05`, bottom) and palms in pool tiles (`desktop-10`, bottom). A visitor scrolling will see those frames. The hero title "Global Surf" sits white-on-white over the bungalow roof (`desktop-00`).
- **Distinctiveness.** The highest of the three. The waterline is this lodge's own photographic habit (shooting at the pool's surface) turned into the page's device.

**Score: 7/10. FAIL** (below 8), but closest to passing.
**Better than the current site?** Yes, clearly, both on the first screen (`unique/desktop-00.png` and `unique/mobile-00.png` vs `current-lodge/desktop-00.png` and `current-lodge/mobile-00.png`) and on the whole page (`unique/desktop-sheet.png` vs `current-lodge/desktop-sheet.png`: real surfing big where the old site has grey tiles).
**Closest reference.** The Lavish Haven gold, same family (water as the page's device), `gold-lavish/desktop-sheet.png`. It is below Lavish because Lavish's device is crisp and controlled on every screen, while here the transitions smear the footage and the panels between scenes are empty.

**Top 5 fixes**
1. The hero re-cut from the shared section: one slow pool shot (vid-009 ≈ 5–8 s, slowed), so the waterline always refracts pool water. With the montage, it refracts a tuk-tuk.
2. Make the waterline transition shorter and sharper: about 0.4 s of scroll, less displacement, and the incoming frame fully resolved before it passes the 1 px line. No frame should ever sit half-smeared (`desktop-05`, `desktop-10`).
3. Fill the level panels. Set the level name at display size **beside** the price, not on its own row. Drop the "Level n –" dangling label (write "Level 1" small above, no dash). Pull price, includes and button into the left half so the panel is half as tall, then cut straight to the next scene.
4. Fomies scene: start the clip on the stand-up into the sun (vid-010 source ≈ 20–21 s, the named poster), not on legs on sand. Crop the dark figure out of the Riders edge (shift the focal point right).
5. Make the day masonry big: two photographs full-width at 3:2 (img-118 board through the jungle, img-111 sunset session) with the rest in a strip, so the middle of the page carries the same scale as the level scenes.

**Keep.** The waterline on the first screen. Full-bleed surfing video per level. Archivo Expanded headings. The drone-over-pool scene opening the rooms section. The phone first screen as it is (apart from the loop). The one-coral booking system and the persistent bar.

---

## Visual ranking (visual quality only)

1. **unique, 7/10, fail.** The only page with surfing shown big and a device that belongs to this lodge. Fix the montage loop, the smeared transitions and the empty level panels, and it is the one to take to 8.
2. **interactive, 6/10, fail.** The best type and the boldest first-screen word. It is let down by three competing names in the hero, a roofs-and-dirt Riders clip and an unfinished aqua band.
3. **calm, 6/10, fail.** Clean, correct and clearly better than the old site, but a polite hotel template with an AC grille in its second screen and nothing a visitor will remember.

None reaches 8. Under rubric dimension 8 all three are hard fails and go back to the designer before Shahar sees them. All three are better than the current site.

**What the designer prompt got wrong.** It accepted the prepared vid-009 cut as the hero without judging it as a loop. Seven shots in twelve seconds, including a driver's back and a neighbour's house, is a trailer, not a first screen. The prompt should require a hero loop of at most two shots, chosen frame by frame, that shows the one thing (here, the pool) for the whole loop, and it should require every level clip's first frame to show water and a surfer.
