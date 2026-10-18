# mutag-meitiv · experience-critic 0.1.0 · station 4f (quick) · run 2026-10-il-brand-01

## calm "ירוק בית"

### Round 2 (2026-10-18)

The page was re-walked fresh: phone 390×844 touch, throttled (1.6 Mbps, 150 ms RTT, 4× CPU), and laptop 1440×900. Every wa.me and Calendly request was intercepted and aborted, so nothing was sent. Frames: `reports/2026-10-il-brand-01/experience/mutag-meitiv/calm-r2/`. The current-site frames are the ones from round 1. Dark greens are kept by decision (brief 6) and were not judged against.

score: **8 / 10** · result: **pass** · better than current site: **yes** · taps to book: **1** (target 1)

**Timeline (phone, cold).**
- **0.5 s:** the green hero, the photo, the title and the WhatsApp button are all painted (`phone-t500.png`). Round 1 was a white screen at this point.
- **1.5 s:** the same, but the header wordmark has not arrived yet; only the menu button shows (`phone-t1500.png`). By 3 s the wordmark is in (`crop-hdr-t3000.png`).
- **Measured:** LCP 1.16 s, CLS 0, ~125 KB on load, one host (localhost). No third-party request.

**The walk (phone, 25 steps of 640 px; `sheet-phone-1…4.png`).** Page height is 15,629 px, about 18.5 screens (round 1: 19,079).
- **Hero:** Hadas now looks into the lens (img-013), and the green shirt carries the brand. It is warmer and more direct than img-034. It is also visibly a selfie with a conference lanyard, and the background looks soft-focus.
- **Tools cards:** the four are now deep-green blocks in a swipe row with a peek. They have the old site's presence, done properly.
- **Lead services:** unchanged and good.
- **Method:** each stage is numbered and carries its own photo inline (`sheet-phone-2`, frames 2–5). It now reads as a process rather than a box list. On phone every stage is lit; that is by design.
- **Full-bleed band:** img-007, overhead vision-map table, between the method and the offers. It is the first "I want to be at that table" moment mid-page.
- **Offers:** compact rows with title, format, price and a 46 px round WhatsApp button. Only 3 rows show, then "הצג את כל 6". **The 8-screen card wall is gone.** Lectures and courses now take about 3 screens.
- **Testimonials:** a slider with 6 dots, which now holds the Brand & Breakfast quotes.
- **Case study:** a green text tile with the "דוגמה" badge; the grey placeholder is gone.
- **Logos:** unchanged.
- **Team:** faces, names and roles, with bios behind "קראו עוד". It went from a wall of text to two screens.
- **ON AIR:** now shows the show's artwork.
- **Blog:** has covers, but 2 of the 3 are the same green icon tile (licence reasons, per notes.md).
- **Close:** the Instagram strip, the closing group photo, the footer.
- **Where attention still dips:** the logos-to-team stretch and the blog, mildly. No section drags.

**Booking.**
- Hero tap lands on `wa.me/972546686808?text=היי הדס, הגעתי מהאתר של מותג מיטיב ואשמח לשמוע עוד.`
- A tap on an offer row (`a.r-wa`, 46×46, accessible name "לפרטים בוואטסאפ") lands on that offer's own message, e.g. "…ריטריט היום ״לחשוב כמו מותג (מיטיב)״…".
- The bottom bar persists from the first scroll to the footer.
- The audit target is met: WhatsApp, 1 click. The current site still has no WhatsApp or tel link at all.

**Motion.**
- **Laptop:** the method is now a real set-piece. A sticky 4:5 frame cross-fades between the stage photos while the stage in view lights (mint number, the others at 42 %; `sheet-laptop-1`, frames 5–6). It is smooth, native scroll, no jank in the frames.
- **Phone:** vid-004 plays as an overlapping tile on img-030, but it is drawn at **150×188 CSS px** (measured), smaller than round 1's 232 px. It is still easy to miss.
- **Reduced motion:** no clip attached, page complete (`phone-reduced-full.png`).
- **JS off:** all 9 rows and every bio are visible, and the page grows to 18,351 px. Fine (`phone-nojs-full.png`).

**Laptop (`laptop-first.png`, `sheet-laptop-1/2.png`).**
- The ghost letter is gone. The hero is a split with the photo at 470×590 and the text plus the button on the right. The right half below the button is still empty green, so the first screen is calm rather than striking.
- Below the hero, the rhythm alternates well: dark tool blocks, alternating services, the motto, the sticky method, the full-bleed band, the workshops photo with the clip tile, the compact lists, the slider, the green case tile, the logos, the team, ON AIR with artwork, the blog, the Instagram strip, the closing photo and the footer.

**Against the current site.** The new page is better on every count I listed in round 1, except one: the **newsletter signup is still missing** (0 matches for ניוזלטר / מגזין / newsletter). The current footer has it.

**Remaining fixes (not blocking; biggest effect first).**
1. **Phone clip:** draw vid-004 at least 240–280 px wide, or swap it to lead the tile, not trail it. At 150 px it does not register as the page's one moving picture.
2. **Hero photo quality:** img-013 is a lanyard selfie. If the owner has a lens-facing portrait without a lanyard, use it. If not, crop above the lanyard (4:5 from the shoulders up). On desktop, fill the empty right-bottom of the hero, or make the photo larger (photo ≈ 55 % width).
3. **Newsletter:** restore the "מגזין מיטיב" signup as a link or button in the content group or footer. Never a form that posts nowhere.
4. **Blog covers:** give the two icon-only tiles distinct treatments (e.g. the post's first business-owned image, or a typographic tile with the title), so the row is not two identical logos.
5. **Wordmark:** preload or inline the header wordmark so the first phone paint has the brand, not only a menu button.

**Keep.** Everything listed in round 1, plus these round-2 changes:
- the compact offer rows with a per-offer WhatsApp button and "הצג את כל"
- the sticky lit method on desktop and the per-stage photos on phone
- the full-bleed img-007 band
- the team bios behind "קראו עוד"
- the self-hosted Heebo (first paint at 0.5 s)
- the deep-green tools blocks
- the podcast artwork

---

### Round 1 (2026-10-18)

Page: `sites/mutag-meitiv/mockups/calm/dist/index.html`, served locally (`python3 -m http.server`). Walk scripts: playwright, phone 390×844 touch DPR 2 with CDP throttling (1.6 Mbps, 150 ms RTT, 4× CPU); laptop 1440×900. Frames: `reports/2026-10-il-brand-01/experience/mutag-meitiv/calm/`. Current site walked the same way (`old-phone-*`, `old-laptop-*`).

score: **7 / 10** · result: **fail** (below 8) · better than current site: **yes** · taps to book: **1** (target 1)

### Timeline, phone cold load (throttled)
- **0.5 s:** a blank white screen (`calm-phone-t500.png`). The Google Fonts stylesheet blocks render; nothing of the hero or the button paints yet. On a real phone, the first impression is white, not the brand green.
- **1.5 s:** the whole first screen at once (`calm-phone-t1500.png`): the green header with the wordmark, Hadas 4:5 with the icon-curve corner, "הי, הגעת למקום מיטיב!", the tagline, and the full-width mint WhatsApp button (358×56). The award row starts at the fold.
- **3 s / 6 s:** unchanged. Measured: LCP 2.55 s, CLS 0.0007, ~0.5 MB transferred, hosts localhost + fonts.googleapis.com + fonts.gstatic.com (third-party on load; this is the critic's line, flagged here because it causes the blank 0.5 s).
- Feeling: calm, on-brand, instantly hers. Pleasant, not exciting. She looks up and away from the visitor in img-034. The current site's portrait looks straight into the lens, which makes it warmer.

### The walk (phone, 29 scroll steps of 640 px, 0.9 s each; `sheet-phone-1…4.png`)
- **Screens 1–2:** award + BTC proof row, then "כלים לבניית עסק מיטיב" as a swipe row of four cards with a peek. Clear, and the next-card peek invites a swipe.
- **Screens 3–5:** the two lead services, each with a photo, a short summary, two chips, a quote and two buttons. This is the best part of the page: easy to read, 19 px body, a clear CTA on each one.
- **Screen 6:** the motto, large and light. A nice pause.
- **Screens 7–8:** the method, four white cards with "קראו עוד" (`calm-phone-method-open.png`). Readable but static, just a list of boxes. The brief asked for "mini animations and interaction", and this is where they belonged.
- **Screens 9–17:** lectures, workshops and courses. **Attention drops here.** Nine near-identical white cards stack one after another, each with the same mint "לפרטים בוואטסאפ" bar, plus two long grey Brand & Breakfast testimonial boxes. That is about 8 screens of the same rhythm. The only moving thing, vid-004, is a 232×290 tile (`calm-phone-video.png`). It plays only while in view (it started at scroll 7 and paused by scroll 10), and it is easy to scroll past.
- **Screen 18:** the case study tile shows a grey "תמונה לדוגמה" placeholder box on the home page. It reads as unfinished.
- **Screens 19–20:** the testimonial slider with dots (`calm-phone-testimonial-dot2.png`), one short quote in a white card with a lot of grey around it. Thin.
- **Screens 20–21:** the logos, greyscale, three per row. Fine.
- **Screens 22–25:** the team. Each member's full bio runs as 10–15 lines of small text, so this is a wall of text again.
- **Screens 26–29:** ON AIR (the good dark band), then the blog as **three text-only grey cards** (the current site's blog cards have cover images), then the Instagram strip, which is lively, real people, the best "I want to be there" moment after the hero. Then the closing photo of the eight women with their boards (strong), and the footer.
- **Page length:** 19,079 px on phone, about 23 screens. Brief item 9 asks for "informative but not overwhelming, smartly divided". The middle third is overwhelming.

### The story after one scroll
What: brand strategy with meaning. Who: Hadas. Proof: award + BTC. Yes, all of that is clear by screen 2. Price is not on the first screens, and that is correct for this business: it appears per offer card in ₪ with `+ מע"מ`. The story is told through her face and through cards, not tables. Good.

### Wanting to go
Moments that pull: the hero portrait, the personal-branding photo (her at the canvas), the Instagram strip, and the closing group photo. Moments that deflate: the blank first 0.5 s, the 9-card wall, the placeholder image on the case study, the text-only blog, and the team bios.

### Booking
- Tap 1, the hero "כתבו להדס בוואטסאפ", lands on `wa.me/972546686808?text=היי הדס, הגעתי מהאתר של מותג מיטיב ואשמח לשמוע עוד.` The number matches the brief (054-668-6808). The request was intercepted and aborted; no message was sent.
- 17 WhatsApp links. Each offer card carries its own prefilled message naming the offer (e.g. "…סדנת החזון THE BETTER 4. מתי היא מתקיימת?"). That is exactly right.
- The persistent bottom bar (icon + "מותג מיטיב" + WhatsApp) is present from scroll 1 to the end, and every button is at least 44 px. The Calendly free call sits beside it in the closing.
- Against `audit.json.recommended`: primary action WhatsApp, `clicks_to_book` 1. Met.
- Against the current site: the current page has **no WhatsApp or tel link at all** (counted: 0), only a "פה יוצרים קשר" button. On the phone it is not responsive: the desktop layout is cropped, with horizontal overflow (`old-phone-first.png`). The new page wins here by a wide margin.

### Motion and interaction
- Floating pill header after the hero: works on both viewports, and the pill holds its width.
- Card and photo reveals (12 px rise, once). Subtle, never on headings. Correct, but it is almost the only motion on the page.
- The swipe row with peek, the testimonial dots, and the method `<details>` all respond. No hover lift was visible on the laptop card hover frame (`calm-laptop-hover-card.png`).
- Reduced motion: no clip is attached (`src` empty, poster stays) and the page is complete (`calm-phone-reduced-full.png`). JS off: all content visible, the clip shows its poster (`calm-phone-nojs-full.png`). Good.
- Overall, motion is purposeful but too sparse for brief item 4 ("contemporary, pleasant and exciting, with motion, mini animations and interaction").

### Laptop 1440×900 (`calm-laptop-first.png`, `sheet-laptop-1/2.png`)
- Hero: a split, with the photo on the left, the text on the right, and a mint button. The faint icon mark behind the text reads as one giant ghost letter (a "Y"/"m" shape spanning the whole hero) rather than the brand curve. The right half feels empty below the button.
- Tools cards: four white cards with small round arrow buttons at the bottom, mostly empty space. The current site's four dark-green cards are, frankly, bolder.
- The service blocks alternate well. The workshops video is a small tile next to the heading (~232 px wide at 1440), so it barely registers.
- The testimonial is a one-line quote in a wide white card on grey, which leaves a lot of dead space. The team grid has four columns of long bios. The blog is three text-only grey boxes. The Instagram strip is full-width and alive. The closing photo is strong. The footer is clean, designed, with icon buttons.

### Against the current site: where the current one is better (honest)
1. **Portrait:** Hadas looking into the lens, smiling, arms crossed (old) is warmer and more direct than img-034 (looking up and away).
2. **Blog cards have cover images** on the current site. The new page shows text-only boxes.
3. **Newsletter signup** in the current footer ("הירשמו חינם למגזין 'מיטיב'"). It is missing from the new page (0 matches), although the direction keeps the newsletter in the content group.
4. The current tools row of four dark-green blocks has more presence than the new quiet white cards.

Everything else is better on the new page: a responsive phone layout instead of a cropped desktop one, a real WhatsApp action, readable 19 px type, no underlined titles, no salmon excerpts, prices and the method present, a designed footer, and the Instagram strip.

### Fix list (biggest effect first)
1. **Break the 9-card wall.** Show each group (lectures/workshops, courses) as a phone swipe row with peek (like the tools row), or as 3 visible cards + "הצג הכל". Move the two long Brand & Breakfast quotes into the testimonial slider. That cuts about 6 phone screens and restores the rhythm.
2. **Give the page one real moment of motion or media in the middle.** Make vid-004 big: full content width on phone, at least 4:5 at 358 px; on desktop a large tile beside the method or the workshops. Or make the method a scroll-lit row of stages (direction must-do 4, "a scroll-lit list, e.g. the method's stages"). Right now the page is still from screen 6 to screen 26.
3. **Self-host Heebo (subset, `font-display: swap`)** so the first 0.5 s on a phone is the green hero, not a white screen. This also removes the third-party request on load.
4. **Use the warmer portrait in the hero:** a lens-facing photo of Hadas (img-001/img-013, or a crop of the current hero portrait if a large enough source exists). Replace the desktop ghost mark with a smaller, clearly curve-shaped fragment, so it stops reading as a giant letter.
5. **Finish the lower half:** cover images on the 3 blog cards; a real image (or the demo's first visual) on the case-study tile instead of the grey "תמונה לדוגמה" box; team bios clamped to 3 lines with "קראו עוד"; restore the newsletter signup in the content group/footer (a link to the existing form is fine; no form posting nowhere).

### Keep
- The green header and hero split, the icon-curve corner, the one full-width mint WhatsApp button, and the label-to-colour discipline (mint = booking only).
- The prefilled WhatsApp message per offer, and the persistent bottom bar.
- The award/BTC proof row under the hero, not in it.
- The two lead-service blocks (photo, chips, quote, two buttons).
- The motto pause, the ON AIR dark band, the Instagram strip, the closing group photo, and the designed footer.
- Reduced-motion and JS-off behaviour.

### What the designer prompt got wrong (one paragraph)
"Calm" was read as "few moving parts and every item shown", so the page keeps all of the current content at full length and runs eight phone screens of identical cards. The calm concept still owes the client brief item 4 (exciting, motion, interaction) and item 9 (smartly divided, not overwhelming). Calm should mean fewer elements per screen, not fewer ideas per page: group long lists behind swipe rows or "show all", and give the middle of the page one large media or scroll moment.

### Experience ranking at 4f
Not given here: this report covers calm only. The ranking is made once interactive and unique have been walked.
