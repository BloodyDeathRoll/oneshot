# mutag-meitiv · visual-critic 0.1.1 · station 4f (quick) · series 2 · variant **calm** "דף ההזמנה"

## Round 1 (2026-10-18)

Shots: `sites/mutag-meitiv/mockups/calm/shots/` (build 93363127c5ec8bab, shared set, reused because the build is unchanged; 14 desktop / 17 phone captures; page 10.6k px desktop, 12.5k px phone; no console errors). Own walk over http (port 9647, 1440): scrolled to the method and hovered the MAKING panel (`scratchpad/vc-calm/method-hover.png`). Current site: `dossier/mutag-meitiv/assets/old-site-desktop.png`, `old-site-mobile.png` and `reports/2026-10-il-brand-01/current-site/shots/`. Bar: series-1 calm, round 2 (8/10), `mockups/series-1/calm/shots/desktop-sheet.png`. As decided: dark-green grounds are fine (brief 6), the surf-only rules (orange, script) do not apply, the quality bar does. Brief 29: organisations must stand out.

### Three-second test
- **1440 (desktop-00):** confident and public. Hadas, smiling, in a green dress at a branding conference, full width. Under her a deep-green band with a two-line 48 px title that names nonprofits and organisations, and one mint button. I would keep scrolling. What I see first is the **yellow Brand Manager Day wall**: about 60 % of the first screen is another organisation's yellow and its logos, not the client's greens. Her green dress and the band save the palette, but only just.
- **390 (mobile-00):** the strongest screen of the page. A close 4:5 crop with her face as the largest thing, the yellow conference badge readable. Then the band with the title in two lines, a mint line and a full-width button, all inside 844 px. Here the yellow is a backdrop, not the subject.

### Checklist (evidence)
- **Media:** the strongest organisation photo leads (img-033, full-bleed, desktop-00 / mobile-00). On stage (img-ig-01) in the intro (desktop-01). img-011, img-032, img-003 and vid-004 in the method panels (desktop-05/06). img-c05 full-bleed in the closing (desktop-11). Video is used and plays: `video.currentTime` 2.47 s, not paused, webm. **Weak spot:** the MAKING clip is a 464 px source. When the panel widens on hover it is drawn about 645 CSS px wide (method-hover.png), visibly soft, and softer still at 2×. img-ig-01 appears twice: once in the intro (desktop-01) and once as the last Instagram tile (desktop-11).
- **Composition and grid:** the pace varies and is clear. Photo plus band → white split intro → grey 2×2 format cards (desktop-02) → full deep-green award (desktop-03) → white logo grid plus talk rows (desktop-04/05) → teal method header plus four edge-to-edge panels (desktop-05/06) → testimonials → individuals → demo cover → team → content → Instagram → closing → footer. The L2 lesson is met: there are never more than 4 like items in view. **Flaws:**
  - the Instagram strip runs straight into the full-bleed closing photo with no gap (desktop-11), so two photo bands collide into one busy wall;
  - the demo case-study cover (desktop-08) is a large two-tone slab with only the m-icon on its right half, which reads as empty;
  - the talk rows (desktop-05) are grey pills holding long one-line sentences, the most "table-like" moment on the page.
- **Typography:** IBM Plex Sans Hebrew 400/600 suits an institutional buyer and is new against series 1. Body text is readable at 18–20 px with real leading (desktop-01, desktop-02). The judges' quote is set big and generous (desktop-03), which is exactly what the concept needed for warmth. **Flaws:**
  - "ושמחה." sits alone on the quote's last line, with the closing mark hanging after it (desktop-03);
  - in the method, the stage labels sit on different baselines across the four panels (desktop-06: INFLUENCING sits higher than the other three, because its line is shorter).
- **Colour:** this is the brand's palette, used at scale: `#173B34` band, award, closing and footer; `#0A5150` method; mint only for booking. The booking colour is unmistakable everywhere (desktop-02 card buttons, mobile bar). The method's deep-green gradient covers about 60 % of each panel (desktop-06), so the four photos go murky teal and lose their own colour. The yellow wall in the hero is the one loud colour, as the concept intended. But at 1440 it outweighs the greens the brief asks to lead with.
- **Hierarchy and rhythm:** the eye goes photo → title → button, then "מה ארגונים מזמינים" (the four formats, each with its own WhatsApp button). The organisational story leads in the right order: who → what to book → award → who has had her → method. Individuals come after, compact (desktop-07). Brief 29 is met clearly. Whitespace is generous without padding.
- **Polish:** the floating pill header is clean. Buttons are real pills, and there are no rules or underlines. The logos form one crisp ink grid (desktop-04), a clear step up from the old site's mixed marks. Testimonial "לקריאת הכל" is a bare bold text link, not a button (desktop-07; calibration: buttons for actions). Nothing is broken or overflowing at either width. The phone bar is labelled and does not double up with the header WhatsApp (mobile-07, where the header pill shows only the menu).
- **Distinctiveness:** it reads as this client and nobody else: her own conference, her greens, her m-icon, her award in the judges' words. It is less crafted than series-1 calm, which had curved photo corners and a sticky method. It is more confident: full-bleed photography, three big deep-green moments, and an award section that finally explains the seal.

### Score: **8 / 10 — PASS (at the bar)**
Closest reference: series-1 calm round 2 (8). It is at that level, by a different route. Series-1 calm has more crafted detail: the arched photo corners, the sticky method. This page has more presence: a full-bleed first screen, the award as a real moment, the formats as one clean 2×2. It is held back from 9 by:
- the yellow-dominated desktop hero;
- the murky method gradients and the soft upscaled MAKING clip;
- the Instagram/closing collision;
- the empty-looking demo cover.

### Better than the current site?
- **First screen: yes, clearly.** desktop-00 against old-site-desktop: the old site has a boxed green panel in a 950 px column, a small circle photo, four unexplained seals, and a form link as the only action. The new one has a full-width real person at a real conference, a title naming the audience, and one WhatsApp button. On the phone, mobile-00 against old-site-mobile shows the same gap.
- **Whole page: yes, clearly.** desktop-sheet against old-site-desktop: the old site's identical boxed blocks and 14 px text become distinct sections: formats, the award in words, a crisp logo grid, the method with photos and video, the team row, the Instagram strip, and a real footer.

### Fix list (biggest effect first)
1. **Calm the yellow on the desktop hero.** Re-crop img-033 at 1440 so Hadas fills more of the frame: shift the focus so she sits near the centre-start, at about 2.2:1, with less wall on the left. Or lay a light `#173B34` multiply/duotone over the wall area only. The yellow should read as a backdrop, as it already does on the phone, not as 60 % of the screen.
2. **Method panels:**
   - cut the gradient to the bottom 35 % of each panel so the photos keep their colour;
   - put all four labels and titles on one shared baseline (bottom-aligned block with a fixed height);
   - stop the MAKING panel growing beyond the clip's native 464 px. Either keep MAKING at a fixed width and widen the others, or swap the widened state to the poster from a sharper source.
3. **Separate the Instagram strip from the closing:**
   - give the closing photo at least 96 px of white above it, or move the strip after the closing text band;
   - swap the last Instagram tile (ig-01, already the intro photo) for another tile.
4. **Demo case-study cover:** put a real visual in the right half. Use the demo's own mock assets (a logo lock-up or a cover image from `demo-case-study.he.md`), or img-007 as a duotone under the icon, so the tile reads as a project, not a placeholder slab.
5. **Small type and action fixes:**
   - set the judges' quote so the last line holds at least two words (`text-wrap: pretty` or a non-breaking space before "ושמחה.");
   - make "לקריאת הכל" a small pill button;
   - set the talk rows as year + one short line, with the full sentence on a second line in a lighter tone, so they read less like a table.

### Keep
- The phone first screen exactly as it is.
- The photo-over-band hero structure (no text on the photo).
- IBM Plex Sans Hebrew at 18–20 px.
- The 2×2 format cards, each with its own WhatsApp button.
- The full deep-green award section with the large judges' quote.
- The crisp ink logo grid under "מודה על הזכות להטיב ב:".
- The four-panel method with hover widening and the phone swipe.
- Mint reserved for booking.
- The labelled phone bar.
- The founder-led team row.
- The closing on img-c05.
- The dark footer with pill buttons.

### One sentence for the pick
The most direct "commission her" page: Hadas at a branding conference, full width, then the four things an organisation can book and the award in the judges' own words. It is professional and on-brand, with a desktop hero that leans too yellow.
