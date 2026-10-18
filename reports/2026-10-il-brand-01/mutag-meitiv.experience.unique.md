# mutag-meitiv · experience-critic 0.1.0 · station 4f (quick) · variant **unique** «מפת חזון»

## Round 2 · 2026-10-18

The page is `sites/mutag-meitiv/mockups/unique/dist/index.html` (built 14:38). I served it on :9433 and walked it fresh with playwright. Taps to wa.me and Calendly were intercepted and aborted, so no message was sent. Scripts are in my own scratchpad subfolder `xc-unique-r2/`.
Every frame cited in this section is new and lives in `experience/mutag-meitiv/unique/r2/`, with logs in `walk.log`. The round-1 frames in the parent folder were partly overwritten by another session, so the citations in the Round 1 section below no longer point at the frames I took.
I wrote this without reading the visual-critic or critic reports. Deep-green grounds are taken as decided (brief item 6).

**Score 8.5 / 10 · pass · better than the current site: yes · taps to book: 1 (audit target 1, class whatsapp)**

### Timeline: phone cold load (390 × 844, 150 ms RTT, 1.6 Mbps, 4× CPU, cache off, two runs)

Frames: `sheet-phone-cold.png`, `sheet-phone-cold-2-4s.png`.

- **0.5 s:** the title strips, tagline and coral button are all painted together, which fixes the round-1 gap where the button came late. The heart, the table poster and the award seal are already there.
- **Two regressions in the first 3 seconds:**
  - **The logo is missing from the header until about 3.4 s.** It appears only when `index.html` finishes (it finished at 3,389 ms and 3,392 ms in the two runs), because the logo masks now sit at the end of the HTML. Until then the header shows only the burger and the WhatsApp disc. In round 1 the logo was there at 0.5 s.
  - **Hadas's photo is half-painted at 0.5–3 s.** The phone picks `hadas-forest-720.webp`, which finishes at 3,317 ms. Until then a white block covers her face from the nose down. The 480 px file was done at 1,450 ms.
- **4 s:** everything is complete. The hero clip plays (`table-464.webm`, `paused:false`). On load the only hosts are localhost and Google Fonts, which 4e allows.

### Walk and story (phone)

Frames: `sheet-phone-a.png`, `sheet-phone-b.png`.

- **Length:** the page is now **12,916 px**, down from 18,688. It no longer reads as a list to get through.
- **The story after one scroll:** Hadas, the award, then the two lead services on 2:1 photo cards. After the motto strips comes the method, with each stage's photo beside its title.
- **Offers:** a swipe row with a peek of the next card (`phone-offers-1/2`). `#talks` scrolls 1821/358 px and courses 905/358 px.
- **Mid-page photo:** the workshops open on img-c02, Hadas at the easel, under a pasted green strip. It is a real lift halfway down.
- **Green grounds:** courses sit on `#173B34`, testimonials on `#00574C` (one excerpt at a time; "קראו עוד" opens the full quote in place), then ON AIR and the footer. The page now feels like the brand's green.
- **Coral:** used on 6 WhatsApp buttons. The other 9 are green pills and one is white (computed backgrounds: 6 × `rgb(246,146,124)`, 9 × `rgb(227,238,234)`, 1 × white).
- **Tap targets:** none under 44 px. scrollWidth is 390.

### Booking

- **Tap 1:** the hero button opens `wa.me/972546686808?text=היי הדס, הגעתי מהאתר של מותג מיטיב.` (intercepted).
- **Offer card:** "כתבו להדס" opens `…text=היי הדס, אשמח לפרטים על הזמנת ההרצאה BRANDS OF CHANGE.`
- The phone bar "מותג מיטיב | כתבו להדס בוואטסאפ" is on every frame from the second screen on.
- Desktop hero click: the same URL.
- The current site has no WhatsApp in its hero, so this is still clearly better.

### Motion and interaction

- **Desktop set-piece** (`sheet-desk-method.png`): the heart starts empty. SENSING lands large in the middle, THINKING lower left, then MAKING (the clip plays only at 40 %; the logged `paused` arrays are true at 0, 20, 60 and 80 %, false at 40 %), then INFLUENCING upper right. The pill row under the board fills as each stage lands. Stages are closer together, so the text column no longer sits empty. The finished board reads as a composed map, not a set of slots, which is a real improvement.
  - Still weak: the first stage shows a large empty pale heart with one small piece. The composition stays small inside the outline.
- **Hover:** hero pieces straighten (`desk-hover.png`). The focus ring is green (`desk-focus.png`).
- **Phone menu:** now closes after a link tap (`details.open = false`, `#talks`, `phone-menu-after.png`).
- **Demo case sheet:** opens via `#work-demo-shorashim` (`phone-demo.png`). The striped tile became a designed green cover with the heart and four paper notes.
- **Reduced motion** (`desk-rm-*`): full board, no movement. Small inconsistency: the pill row still marks only SENSING and THINKING as filled while all four pieces are shown.
- **JS off** (`desk-nojs-*`, `phone-nojs-hero.png`): no `<video>` is shown (posters only), and no "טוען את הלוח…" label. Both round-1 bugs are fixed.

### Laptop (1440 × 900)

Frames: `sheet-desk-a.png`, `sheet-desk-b.png`.

- Distinct sections with a calm rhythm: white, green, the workshop photo, white, deep green, green, deep green. Offers sit in a 3 × 2 grid.
- The testimonials band is quite sparse at 1440: one sentence of excerpt in a tall green band (`sheet-desk-b`, frame 3).
- **The hero is unchanged from round 1:** the board is about 600 px tall inside the 1192 px grid, with about 250 px of white between the board and the text. It is the one first screen that still feels small for the brief's "contemporary, exciting".

### Against the current site

My own walk, `../current/sheet-current-phone.png` (from round 1; the site has not changed).

- The current site is shorter (6.6k px) and has its Spotify card.
- The new page now matches it on green identity and beats it on everything else: photos, a primary action in the hero, a readable method, priced offers each with its own message, grouped proof, a real footer.

### Score

**8.5 / 10.**
- **Up from round 1 (8):** length cut by a third, the greens back as grounds, coral used only where it matters, a composed set-piece, the workshop photo moment, and the JS-off and menu bugs fixed.
- **Not 9:** the desktop hero is still undersized, and the cold-load logo and photo regressions are the first thing a slow-phone visitor sees.

### Remaining fixes (biggest effect first)

1. **Cold load:**
   - Put the logo mask back early: inline only the small icon and wordmark masks in the `<head>` CSS, and leave the rest at the end.
   - Serve the 480 px Hadas cut-out to phones (`sizes` ≈ 220 px CSS × DPR, or make 480 the phone default), so her face is never under a white block at 1–3 s.
2. **Desktop hero:** enlarge the board to about 720–760 px tall and close the gap of about 250 px to the text column. Better: let the hero take about 85 vh, with the services heading peeking below.
3. **Set-piece start state:** make the first piece larger, or show a faint outline of where the four pieces will sit, so the first desktop stage is not a mostly empty pale heart.
4. **Testimonials band at 1440:** show two or three lines of excerpt, or add the speaker's photo or role, so the tall green band is not one sentence.
5. **Reduced-motion pill row:** mark all four pills as filled when the board is shown full.

### Keep

The heart board hero. The pasted green title strips. The composed set-piece with the pill progress and the in-view clip. The green grounds (courses, voices, ON AIR, footer). Coral used only on 6 buttons. Swipe rows with a peek on phone. The img-c02 workshop moment. Per-offer prefills. Testimonials in their own language. The closing on the vision-boards photo.

---

## Round 1


Run 2026-10-il-brand-01 · 2026-10-18 · page `sites/mutag-meitiv/mockups/unique/dist/index.html`, served locally on :9417 and walked with playwright.
Frames and logs: `reports/2026-10-il-brand-01/experience/mutag-meitiv/unique/` (`walk-phone.log`, `walk-2.log`, `sheet-*.png`, `current/`).
Written without reading the visual-critic or critic reports.

**Score 8 / 10 · pass · better than the current site: yes · taps to book: 1 (audit target 1, class whatsapp)**

## 1. Phone, cold load (390 × 844, 150 ms RTT, 1.6 Mbps, 4× CPU) — `sheet-phone-cold.png`

- **0.5 s:** header (burger, coral WhatsApp disc, logo) is painted. The heart outline, two empty grey cards, the award label, the title strips and the tagline are there too. The hero button is **not painted yet**.
- **1.5 s:** the board is filled in: Hadas among the trees, the workshop-table clip tucked under her photo, the award seal. The coral "כתבו להדס בוואטסאפ" button is under the tagline, and the top of the next section shows.
- **3 s / 6 s:** the hero clip is playing (`table-464.webm`, `paused:false`, t = 2.6 s, readyState 4). It is a small, gentle movement inside the collage, not a stage show. On load the only third-party hosts are Google Fonts, which 4e allows.
- **Feeling:** warm and personal. A face, a real workshop and a gold seal, set in the shape of her own logo. Within a second you know it is a person-led brand studio. It reads as made for this business, not a template.

## 2. The story after one scroll

After one scroll you can say what this is: Hadas, a brand strategy practice, award-winning, with two lead services (personal branding and strategic planning) on photo cards. The story is told through her photos and her tools (the canvas, the cards). Tables play no part in it. Price is not in the first two screens. That is correct for this vertical: prices belong to the workshops and courses, which sit further down.

## 3. Wanting to go

- **What pulls you in:** the hero board. The motto set on pasted green strips (`phone-scroll-04`), which is very much her. On desktop, the method board filling piece by piece (`sheet-desk-method.png`): SENSING, then THINKING, then MAKING (a leaf-wrapping clip that plays only while its stage is in view, verified `paused:false` at 45 %), then INFLUENCING. The closing on women holding their finished vision boards.
- **What lets it down:** length. The phone page is **18,688 px (about 22 screens)**, against **6,596 px** for the current site. Leads 2,653 px, method 3,516 px, offers 3,177 px, team 2,011 px. The offers run as nine cards in a row, each with its own coral "כתבו להדס" button (`sheet-phone-b`). Halfway down this becomes a list to get through, which works against brief item 9 ("not overpowering… smartly divided"). Long quotes also become walls of text even with "קראו עוד" (Renana's quote in `phone-voices-1/2`).

## 4. Booking walk

- **Tap 1:** hero button → `https://wa.me/972546686808?text=היי הדס, הגעתי מהאתר של מותג מיטיב.` (intercepted and aborted; no message sent). The number matches the brief (+972546686808), and the prefill names the business.
- There are 16 wa.me links. Each offer card carries its own prefill, naming the offer (e.g. "…סדנת החזון THE BETTER 4. מתי היא מתקיימת?"). A persistent bottom bar "מותג מיטיב | כתבו להדס בוואטסאפ" is shown on every phone frame from the second screen on, and nothing covers it. The Calendly free intro call appears once, in the closing (the audit's secondary path).
- **Against the current site:** the current site's hero has no WhatsApp action at all. Its only button is a "פה יוצרים קשר" contact button, and `api.whatsapp.com` sits in the footer. The new page is clearly better here: 1 tap from every screen.
- **Trust:** the award with its category and year, the BTC credential, 15 client logos, testimonials kept in their own language (Julia's in English), and named team members. Good.

## 5. Motion and interaction

- **Set-piece (desktop):** smooth. Each piece lands in about 350 ms with a slight rotation settle. Passed stages stay on the board, and scrolling back up resets to the stage in view (`desk-method-back.png`). The rhythm is the weak part: about 250–300 px of empty white between stages at 1440 (`desk-method-5`), so the text column empties while the board waits.
- **Hover:** hero pieces straighten (`desk-hover-hero.png`), subtly. Keyboard focus is a visible coral ring on nav items (`desk-focus.png`).
- **Phone:** there is no pinning. Each stage shows its photo above its text. Fine, but the phone loses the page's one big moment and gets four tall photo + text blocks instead.
- **Slideshow:** 8 controls, dots work (`phone-voices-2`).
- **Menu (phone):** `<details>` drop-down, clean (`phone-menu.png`). **Bug:** after tapping "הרצאות וסדנאות" the page scrolls to `#talks`, but the menu **stays open** and covers the section (`phone-menu-after.png`, `details.open = true`).
- **Reduced motion:** the board is full from the start, all four pieces, no rotation, and both videos paused on their posters (`desk-rm-*`). Good.
- **JS off:** a good page overall. But the hero clip and the MAKING clip show **native video control bars**, and the method board keeps the label **"טוען את הלוח…" for good**, under a board that is already full (`desk-nojs-hero`, `desk-nojs-method`).

## 6. Laptop (1440 × 900)

- **Hero:** title on two green strips, tagline, one coral button, and the heart board on the other side. Composed and calm. But the board is only about 600 px tall inside a 1192 px grid, with about 250 px of white between it and the text (`desk-t3000.png`), so the first screen feels a little small and empty for a "contemporary, exciting" brief.
- **Body text** measures 19 px / 1.7 at 1440 and 18 px on phone, which meets brief item 8 ("readable, not too compressed").
- Sections are distinct: services, motto, method, proof, offers, case study, voices, team, ON AIR band, blog, Instagram strip, closing, light footer. The sticky header with its WhatsApp pill is always reachable.
- The demo case-study tile with its striped "תמונה לדוגמה" frame reads as unfinished at this size, even though it is labelled "דוגמה".

## 7. Against the current site (walked: `current/sheet-current-phone.png`, `current/sheet-current-desk.png`)

**Where the current site is still better:**
- It is short (6.6 k px on phone). You see everything in 7 screens.
- The green is unmistakably *the* brand: deep-green panels, wave dividers. In the new page the most present colour is the coral button (16 instances plus the bar), and the greens live in strips, headings and the team cards. That is still within brief item 6 ("stay with the leading greens"), but it shifts the brand's feel towards coral.
- The podcast is a visible Spotify card. The new ON AIR band is two link chips.

**Where the new page is better:** first impression, photography, a real primary action, a method you can understand, priced offers each with its own message, proof grouped instead of a logo dump, a real footer. Overall it is clearly better.

## 8. Score

**8 / 10.** Engaging, clearly better than the current site, easy to book. The hero board and the desktop set-piece are memorable and specific to Hadas. It is held from 9 by phone length and the coral-led feel, and by the empty band in the desktop hero and between the method stages.

## Fix list (biggest effect first)

1. **Cut the phone length by about a third.** Fold the 9 secondary offers into the two groups with one card visible per group and a "עוד N" expand (or a horizontal swipe row), with one WhatsApp per card shown only on expand. Shorten the lead cards (quote below a "קראו עוד"). Target ≤ 13 k px on phone.
2. **Bring the leading green back as a surface:** a deep-green (`#00574C`/`#173B34`) ground for one or two key bands, e.g. the motto or the proof section. Consider the coral only on the primary hero, bar and closing buttons, with the per-offer buttons in a green outline style, so coral marks *the* action rather than 16 of them.
3. **Fill the desktop hero:** enlarge the board to about 720–760 px tall and pull the text column towards it (or widen the board column). Tighten the empty white between the method stages at 1440 to around 40 vh per stage or less, so the text column never stands empty while the board waits.
4. **Close the phone menu on link tap** (`details.open = false` on click), and **fix JS-off:** hide the "טוען את הלוח…" label without JS (render it from JS, or `<noscript>` CSS), and drop the `controls` attribute without JS (keep the poster).
5. **Make the hero button paint with the title** on slow phones (it is missing at 0.5 s while the tagline shows), and replace the demo case-study's striped placeholder with a real workshop photo marked "תמונה לדוגמה", so the tile does not read as unfinished.

## Keep

The heart vision-map board in the hero (three pieces only, small rotations). The title on pasted green strips. The desktop "the board fills" set-piece with the MAKING clip playing only in view. The persistent phone bar and one-tap WhatsApp with a prefill per offer. Testimonials in their own language. The award with category and year. The closing on the real vision-board photo. 19 px body text. The light footer.

## Experience ranking at 4f

This file covers only the unique variant. A ranking across all three variants is not given here: comparing would mean reading another reviewer's work for this round, which my independence rule forbids.
