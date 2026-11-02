# talouloren — visual-critic (station 4f, quick)

## Round 1 — 2026-11-02 · visual-critic 0.2.0

Shots: the shared sets in `sites/talouloren/mockups/{calm,interactive,unique}/shots/` (desktop 1440 and mobile 390, shot this round by `tools/shoot.mjs`). The current site was shot into `reports/2026-11-il-brand-02/current-site/shots/`. Inputs: the brief (A1–A24 win over the body), `direction.md`, `lane-references.md`, `concepts.md`, and Shahar's rules (dark, B&W, one metallic gold #f3b614, super high end, light motion, Hebrew RTL first). The critic's and experience-critic's reports were not opened.

### The current site (the minimum bar)
- `current-site/desktop-00.png`: white page. A boxed 1330×360 slider shows a dimmed portrait with a ghosted "TALOU L'OREN" and "TOTAL SUCCESS EXPERIENCE" in a Latin serif, plus a gold outline button. Under it, three gold-framed service cards over B&W photos, with a gold hairline between them.
- `desktop-sheet.png`: the rest of the page is a boxed video, a testimonial carousel, a colour logo grid, square CTA cards and a thin footer. It is tidy and consistent, but it is a 2021 boxed template: no full-bleed, nothing that moves except the slider, and the body text is small grey.
- The bar is low on composition and high on restraint: a gold signature, gold hairlines and B&W photography. All three mockups keep that DNA and go well past it on scale and darkness.

### calm — "אור עליון"
**Three-second test.** Desktop (`calm/shots/desktop-00.png`): Tal sits on a stool in the top-lit brick studio, filling the screen. The centred serif headline and the gold "Success is Beautiful" are calm and expensive. This is the Ritz/Porsche register Shahar asked for, and I would keep scrolling. Phone (`mobile-00`): the same frame cropped to Tal and the lamp, with the title and the door control readable. It is strong.
- **Media:** vid-036 full-bleed leads, which is the right asset (`desktop-00`). The Story door crop is wrong on desktop. `desktop-04` shows an empty grey wall plus a sliver of a bald man with no face, and the Launch door is a torso and knees with no head. On phone (`mobile-03/04`) the same photos show faces and work. Partnership uses the Wella keratin box full-bleed (`desktop-sheet` row 4). It is gold on black, but it reads as a hair-product ad, not "partnership".
- **Composition:** the hero is excellent. The body is a run of narrow centred or right-aligned blocks with dead black between them. `desktop-09` has about 300 px of empty black between the cases and the partners. `desktop-03` has a 150 px empty white strip left at the foot of the light band.
- **Typography:** Frank Ruhl Libre display with Assistant body is legible and high-end, and the Hebrew is good at body size (`desktop-04` door copy). On the light band the five ladder words are pale grey (`desktop-02`), about 2:1 at rest, so the payoff line of the flip reads as disabled text.
- **Colour:** black, white and one gold, as asked. The header and phone-bar CTA are unmistakable. The placeholders `{price_story_sprint}`, `{case_story_*_before}` are set as raw monospace code chips in gold (`desktop-04`, `desktop-09`). They are honest, but they look like a dev build, not a designed "price to come" mark.
- **Hierarchy/rhythm:** the stepped black, white band, black works once. After that every section is the same: a heading on the right, small grey text and an outline button.
- **Polish:** good buttons, footer and FAQ. Shahar's placeholder frame (`desktop-10`) is a tidy gold-outlined box.
- **Distinctiveness / hero and motion:** the hero is distinctive. The rest could be any dark consultancy template. Calm is allowed light motion, but nothing below the hero is alive in the sheets.
- **Score 7/10.** It beats the current site: yes, on the first screen (`desktop-00` vs `current-site/desktop-00`) and on the whole page. Closest reference: Ashcroft. It matches Ashcroft at the hero and sits below it in the body, which lacks Ashcroft's density and finish.
- **Fix list:**
  1. Re-crop the desktop door photos to 4:5 around the faces (img-025 laughing face, img-029 the full jump), as the phone crops already do.
  2. Ladder words on the light band: black at full strength with only "מודעות" in dark gold. No grey resting state.
  3. Design the placeholders as a mark: a small gold-outline pill reading "מחיר בקרוב · {price}" set in the body face, not a monospace code chip.
  4. Close the dead zones (`desktop-03` white strip, `desktop-09` gap). Give the body one more full-bleed moment, e.g. a vid-027 workshop still as a band before Proof.
  5. Partnership band: replace the Wella product box with a people image (vid-027 workshop frame, or img-014), or crop Wella so it is clearly a "work" still with a caption.
- **Keep:** the hero exactly; the type pair; the single light band; the gold signature header; the phone bar.

### interactive — "הזרקור"
**Three-second test.** Desktop (`interactive/shots/desktop-00.png`): a huge B&W close-up of Tal's face on the left and a four-line ultra-bold condensed headline on the right. It is arresting, but it reads as a film poster or event flyer rather than "super high end". Phone (`mobile-00`): the face sits on top with a raw `{hero_film_caption}` token in a dashed box at the top left.
- **Media:** a vid-033 still and loop as the hero is a good asset. The partners' Tal frame (`desktop-10`) is a 1920 video still blown to about 630 px with visible softness. The doors (img-020, img-024) and the Mercedes band (`desktop-sheet` row 5) are good.
- **Composition:** the split hero and the pinned case run (`desktop-sheet` row 3) are the most "built" sections of the three mockups. The outline-to-fill ladder (`desktop-02`) is well done.
- **Typography:** Karantina 700 everywhere: headlines, stats, section titles, FAQ questions (`mobile-sheet`), and even the partners' subtitle in grey (`desktop-10`). Condensed black Hebrew at every level is loud and sporty. It fights Ritz, Ashcroft and Porsche and Shahar's "super high end". There is no second voice, and the brief's warm and calm tone is lost.
- **Colour:** correct palette. The gold ladder word is a good single accent.
- **Polish:** `{hero_film_caption}` is a raw token in the hero (`desktop-00`, `mobile-00`). Shahar's placeholder is an almost invisible outline name in a near-black box (`desktop-10`). The stats count up and were captured mid-count (25,214 / +933, `desktop-sheet` row 3). Ensure the final values are in the HTML.
- **Hero and motion:** the main item is the pointer spotlight. In stills it is barely visible as a soft lift around the headline, so the "one thing" does not read.
- **Score 6/10.** It beats the current site: yes on energy and scale. It is not clearly more high-end than the current site's restraint. Closest reference: Steelwave's outline type without Steelwave's restraint; it sits below it.
- **Fix list:**
  1. Keep Karantina only for the hero line, the ladder and the stats. Set section titles, FAQ, partner text and the subtitle in Heebo 300/500, or a serif.
  2. Remove `{hero_film_caption}` from the hero. Use a designed "▶ הסרט" chip as calm does.
  3. Make the spotlight visibly the thing: a stronger, warmer pool (gold-white core) that clearly lifts Tal's face where the pointer crosses it. The touch drift should be visible in the first 2 s.
  4. Use a sharper Tal source for the partners' frame (img-001 head crop, or the 1920 poster at native size) instead of the upscaled still.
  5. Shahar's placeholder: the same gold-outlined, legible frame as calm/unique.
- **Keep:** the split hero with Tal talking; the outline-to-fill ladder; the pinned case run; the Check Q3 on Home; the Mercedes band.

### unique — "ההיפוך"
**Three-second test.** Desktop (`unique/shots/desktop-00.png`): black, a gold-white bloom smeared across the top under the header, and Tal's profile barely there at about 10 % on the right. The headline is clean and centred with a gold gradient CTA. It feels premium but murky: the bloom reads as a blur under the nav, not yet as "a light aimed at you". One scroll later (`desktop-03`) it is the best screen of the round: the gold beam lands on Tal in the studio and the five ladder words stand in white, ending in gold. That is igloo/Briony feel at light-motion cost. Phone (`mobile-00`, `mobile-02`): the same story, and the beam with its dust reads well at 390.
- **Media:** vid-036 inside the beam (`desktop-03`) is the strongest use of the business's media in the round. The partners section crops Tal to his mouth and chin with the eyes cut off (`desktop-11`), which is a hard visual bug. The Partnership band (img-021 L'Oréal façade) is cropped to window frames and nothing else, so it is unreadable (`desktop-sheet` row 5, `mobile` band).
- **Composition:** the set-piece frames 01–05 (`desktop-sheet` rows 1–2) are composed and paced. The giant door list (`desktop-06`), the huge stats and the closing marquee give real scale contrast. The partners appear twice (set-piece frame 04 and the section at `desktop-10/11`), which is a repeat.
- **Typography:** Bellefair display with IBM Plex Sans Hebrew is elegant and legible. The giant "סיפור/השקה" list is the right move. The resting state of the Story word is very dim grey (`desktop-06`).
- **Colour:** the best gold of the three. The metallic-gradient CTA in the header and phone bar matches Shahar's "metallic gradient" rule, and the beam core is warm gold.
- **Polish:** `{check_minutes}` and `{case_story_*}` show as code chips (`desktop-05`, `desktop-10`). Otherwise the footer, FAQ and dot slideshow are clean.
- **Hero and motion:** it has a real main item (the shader beam plus the pinned turn) and is the only mockup that is alive. The first frame undersells it.
- **Score 7/10, the closest to 8.** It beats the current site: yes, on the first screen and the whole page. Closest reference: Briony Croft / igloo in spirit. Frame 03 is at that level; the hero frame and the lower half are below it.
- **Fix list:**
  1. Hero: lift the vid-036 profile in the beam pool to at least 35–40 % so Tal is visible in the first second. Aim the bloom from the top-right source as a readable cone, not a horizontal smear under the header.
  2. Partners section: re-crop Tal's frame to eyes and head (focalY around 30 %). Better, drop the duplicate partners section and keep the set-piece frame plus the bios under it.
  3. Partnership band: replace the window crop with a readable image: img-021 cropped to the people at the door, or img-014 Mercedes, or a vid-027 workshop frame.
  4. Placeholders as a designed pill, not code chips (as calm, fix 3).
  5. Door list: make the resting word white at 60 % and lit to 100 % with the narrow beam on hover/focus, so it never reads as disabled.
- **Keep:** the beam set-piece and frame 03 exactly; Bellefair with Plex; the metallic-gold CTA; the stats scale; the closing marquee.

### Round 1 ranking (visual only)
1. **unique**: the only mockup with a true signature moment (the beam landing on Tal). It needs a brighter first frame and three crop fixes.
2. **calm**: a Ritz-level hero over a thin, gappy body with bad desktop door crops.
3. **interactive**: strong split hero and ladder, but one heavy condensed face everywhere makes it loud, not high-end.

**Result:** all three are below 8, so all three are a hard fail at 4f and go back to 4e (round 1 of max 3). All three beat talouloren.com.
