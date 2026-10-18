# mutag-meitiv · experience-critic 0.1.0 · station 4f (quick) · round 1 · variant **interactive** ("ארבע הטבעות", Four rings)

Run 2026-10-il-brand-01 · 2026-10-18 · page `sites/mutag-meitiv/mockups/interactive/dist/index.html`, served locally from `dist/` and walked in Playwright Chromium.
Frames and logs: `reports/2026-10-il-brand-01/experience/mutag-meitiv/interactive/`. Sheets: `sheet-phone-cold.png`, `sheet-phone-scroll-0..3.png`, `sheet-phone-interact*.png`, `sheet-phone-method.png`, `sheet-phone-orbit.png`, `sheet-laptop-0..3.png`, `sheet-reduced-nojs.png`, `sheet-cur-phone-0..1.png`, `sheet-cur-laptop.png`. Logs: `new-walk-log-cold.txt`, `new-walk-log-int3.txt`, `new-walk-log-lap.txt`, `new-walk-log-var.txt`, `cur-walk-log.txt`.
I wrote my own file per variant (`.experience.interactive.md`) because the calm and unique critics run in parallel and share the `<slug>.experience.md` path. Merge the files into one if you want them together.
I did not read the visual-critic's or the critic's report.

Scope note: designer house rule 1 ("light themes") is scoped to surf businesses. This is `brand_design`, and brief item 6 keeps the greens. This variant is light (sage `#EEF4F2` and white), so the question does not come up.

**Score 7/10 · FAIL (below 8) · better than the current site: YES (clearly on phone, clearly on laptop) · taps to book: 1**

---

## Round 2 (4f re-walk, 2026-10-18) — **8/10 · PASS · better than the current site: YES · taps to book: 1**

I walked this round fresh, with the same method as round 1: phone throttled to 1.6 Mbps, 150 ms RTT and 4× CPU, a laptop at 1440×900, and every WhatsApp tap caught before it navigated. Nothing was sent.
Frames are in the same folder, prefixed `r2-`. Sheets: `r2-sheet-phone-cold.png`, `r2-sheet-phone-scroll-0..3.png`, `r2-sheet-phone-interact.png`, `r2-sheet-laptop-0..2.png`. Logs: `r2-walk-log-cold.txt`, `r2-walk-log-int3.txt`, `r2-walk-log-lap.txt`, `r2-walk-log-var.txt`.
The deep greens are by decision (brief 6), and I judged them as part of the design.

**Phone timeline**
- **At 0.5 s:** the header logo is already painted. Round 1's 3-second blank header is fixed.
- **Also at 0.5 s:** the rings, title, tagline, the **two lead-service pills** ("מיתוג אישי לעסק", "תכנון אסטרטגי למותג") and the WhatsApp button.
- **At 1.5 s:** the portrait and the clip poster.
- **By 6 s:** the clip is playing (`table-464.webm`, muted).
- **Measurements:**
  - 19 requests, 1.47 MB.
  - **0 third-party requests.**
  - LCP 2.51 s, at the 2.5 s target (it was 2.66 s).
  - CLS 0.000 at load and after the full scroll.
  - Height 16,057 px; scrollWidth 390, so nothing overflows.

**What changed in the experience (fix list of round 1 → seen in frames)**
1. **Method:** it is now a full-bleed deep-green panel (`r2-sheet-phone-scroll-0/1`, `r2-phone-method-*.png`).
   - Each stage has a ring device of about 220 px with its own photo in the centre (SENSING the canvas, THINKING the card, MAKING the table, INFLUENCING Hadas in green).
   - The rings fill as the card enters.
   - Each stage is one paragraph plus "עוד".
   - This is now the high point of the phone walk, where round 1 lost attention. On the laptop, the sticky ring beside photo-circle cards on deep green reads as a designed set-piece.
2. **Hero:**
   - The clip is about 150 px on the phone and readable (scissors, collage, hands).
   - The orbit makes a visible load-in turn.
   - The ring device is about 580 px on the laptop and fills the left half; the empty sage of round 1 is gone.
   - The service pills answer "what" on the first screen.
3. **Proof before quotes:**
   - The award and BTC cards now come directly after the services.
   - Each quote is cut to 6 lines with "להמשך הציטוט" (`r2-phone-quotes-*.png`). The wall is gone.
4. **Demo case study:** it has a designed deep-green cover with the four lit rings and one "דוגמה" badge, so it no longer reads as unfinished.
5. **Rhythm:** the deep green now carries three big moments.
   - The method panel.
   - A new full-bleed img-034 (Hadas laughing, yellow jacket, at the canvas) beside the motto. This is the warmest frame on the page and gives the "want to be there" moment the page lacked.
   - The footer.
   - In between, the page is light and airy. The brand now reads at a glance, as the current site does, without its cramped boxes.
6. **Other fixes I saw working:**
   - The header WhatsApp pill hides on the phone while the bottom bar shows (opacity 0 / hidden), so one button per screen.
   - The menu closes after an item is tapped.
   - The client logos are one deep-green ink with no grey boxes.

**Booking**
- **Hero, header or bar:** 1 tap → `wa.me/972546686808?text=היי הדס, הגעתי מהאתר של מותג מיטיב ואשמח לשמוע עוד.` The default line now names the business.
- **A specific offer:** 2 taps (open the accordion, then its WhatsApp), with the offer named in the message (BRANDS OF CHANGE tested).
- **Count:** 16 wa.me links.
- **Current site:** 0 WhatsApp links.

**Reduced motion and JS off**
- Under reduced motion, no video is requested and the page is complete and static.
- With JS off, every panel and accordion is open, the 16 links work, and the page is 22,786 px long.
- The keyboard order is skip link → logo → nav → CTA → pills, with a visible 3 px outline.

**Against the current site:** it is better on the first screen and on the whole page, on phone and laptop. The current site's one advantage, its confident deep-green brand presence, is now matched. Its remaining edges:
- The colourful purple Spotify card. The new ON AIR block is still text plus buttons.
- Blog covers that are real photos. The new covers are the same logo-and-rings motif three times in a row, which reads as filler.

**Score 8/10, pass.** It is engaging, clearly better than the current site and easy to book. It is short of 9 because the page is long on the phone (about 19 screens), and its lower third (blog, podcast, Instagram) is quieter and more generic than the method and photo moments above it.

**Remaining fixes (not blocking; biggest first)**
1. **Blog covers:** give each card its own cover. Use the post's image if the old site has one, or a different real workshop photo per card. The three identical logo-and-rings covers read as placeholders.
2. **ON AIR:** give it one visual anchor, such as the podcast cover art (the old site's purple card is the client's own) or img-033 / img-011. Today it is the only major section with no image.
3. **Phone length:** consider folding the team's four collaborator cards into a horizontal swipe row, or tightening section padding, to bring the phone page from 16k px nearer to about 13k px.
4. **Logo strip on the phone:** only about 2 logos are visible at a time and they are small. Use a larger logo height, or a static 3-column wrap.
5. **Testimonial dots:** the dots follow 6 slides while the quotes' "להמשך הציטוט" buttons expand the card in place. Make sure an expanded quote collapses when the visitor moves to the next one, so the card height stays stable.

**Keep:** everything in the round 1 keep list, plus the deep-green method panel with photo rings, the img-034 + motto moment, the designed demo cover, proof above the quotes, the 6-line quote clamp, the single CTA per phone screen, and the logo painted with the HTML.

---

## Round 1 (superseded)

## 1. Phone, cold load (390×844, 2×, touch, 1.6 Mbps / 150 ms RTT / 4× CPU)

| t | what is on screen (`new-phone-t*.png`) |
|---|---|
| 0.5 s | Sage ground. The four rings and their Latin stage labels, an empty disc, an empty satellite circle, the eyebrow "הדס דרכלי · מותג מיטיב", the title "הי, הגעת למקום מיטיב!" in Playpen, the tagline, and the full-width "כתבו להדס בוואטסאפ" button. The header shows only the burger and "כתבו להדס". **There is no logo yet.** |
| 1.5 s | Same frame. The WhatsApp icon is still missing from the buttons. |
| 3 s | Hadas's portrait fills the centre disc. The satellite shows the poster. The logo (icon and wordmark) and the button icons arrive. |
| 6 s | vid-004 plays in the satellite (`table-464.webm`, currentTime 2.0 s, muted). |

- Measured: 16 requests, 1.43 MB, **0 third-party requests**. LCP 2.66 s (IMG, the portrait), just over the 2.5 s target. Page height 15,179 px (about 18 phone screens). scrollWidth 390, so nothing overflows.
- Feeling: calm, clean and immediately readable. The words and the action work before any image arrives, which is right. The page is gentle rather than exciting, though. The face is the only warm thing on screen. The workshop clip is about 90 CSS px wide, so at that size scissors and collage read as a texture, not as "her workshop table". The brand mark arrives last, so for the first 3 s the page has no identity apart from the words.

## 2. The scroll at human pace (`sheet-phone-scroll-0..3.png`, frames every 640 px)

1. **Hero** (scroll 0): as above. The persistent bar ("מותג מיטיב · הדס דרכלי" + WhatsApp) appears as soon as the hero button leaves the screen. On every later screen the header pill *also* carries a WhatsApp button, so **two WhatsApp buttons are visible on every screen.**
2. **"כלים לבניית עסק מיטיב"** (scroll 1–2): a two-tab switch, then a large 1:1 photo (img-003, a woman writing on the ring canvas), the title, summary, chips, "למי", WhatsApp and "לפרטים". This is the best moment on the phone: a real photo of the method in use, one clear action.
3. **Testimonials** (scroll 3): one white card about 16 lines tall, with 6 dots underneath. It is a wall of text. Attention drops here.
4. **Proof** (scroll 4): award and BTC cards with their seals, then the logo marquee. It is tidy, and the logos are small and grey.
5. **Method** (scroll 5–8, `sheet-phone-method.png`): four white cards. Each has a 90 px ring icon, the Latin label, a two-line title and 6–10 lines of body text. **On the phone none of them has a photo.** Concept 2 asks for "each stage card carries one photo, cropped 1:1 in a circle", and the laptop shows those photos. This is about 2,500 px of text at the very section that should *show* the method working. **Attention drops most here.** The "scroll-lit ring" on the phone is only the small icon's inner ring turning green, which is barely noticeable.
6. **Offers** (scroll 9–11): a group photo of women holding collages, with the clip as an overlapping circle (good), the tabs, intro text, then a tidy accordion list with prices (`580 ₪ + מע״מ לאדם`, `חינם`, `ללא תשלום`). It is clear and well organised.
7. **Demo case study** (scroll 12): a hatched grey box reading "תמונה לדוגמה" with an image icon, two "דוגמה" badges, then the text. **It reads as an unfinished page,** not as an example.
8. **Motto** (scroll 13), then the **team** (scroll 14–16): the founder card has a large img-034 (the yellow jacket, the warmest photo on the page). Then a 2-column grid on coloured grounds. It looks good.
9. **ON AIR podcast, blog, Instagram, closing, footer** (scroll 17–23): the blog cards are text only (no covers) with a tiny arrow button. The Instagram strip (3×2) brings colour back. The closing is ring device + "פה יוצרים קשר" + WhatsApp + Calendly. The footer is light sage with pill buttons and social icons, and it is a real footer.

**The story after one scroll:** what (brand strategy with meaning), who (Hadas, named, her face) and how to act (WhatsApp) are all clear. *Why her* (the award, the BTC certification) comes only after the 16-line testimonial, at screen 4. *What it costs* appears for the secondary offers only, at screen 10, which is right because the lead services have no published price. The story is told mostly through text, supported by photos. It is not told through the media.

**Wanting to go:** the service photo (img-003), the workshop group photo with the clip, and Hadas in yellow make you want to sit at that table. The testimonial wall, the four text-only method cards and the hatched case-study placeholder deflate it.

## 3. Booking walk (`new-walk-log-int3.txt`; taps intercepted, nothing sent)

- **Hero → WhatsApp: 1 tap.** It lands on `wa.me/972546686808?text=היי הדס, הגעתי מהאתר ואשמח לשמוע עוד.` The number matches the brief (+972 54-668-6808). This meets `audit.json.recommended`: whatsapp, `clicks_to_book: 1`, label "כתבו להדס בוואטסאפ".
- **A specific offer: 2 taps.** Open the accordion (`aria-expanded` false → true, frames `new-phone-offer-open-mid.png` / `new-phone-offer-open.png`), then tap its WhatsApp button, which carries `…אשמח לפרטים על הזמנת ההרצאה BRANDS OF CHANGE.` All 9 secondary offers and both lead services have their own prefilled text (16 wa.me links in total). The price and the audience ("למי") are visible before the tap, and the message names the offer.
- The phone bar is persistent from the second screen on. All tap targets are 44 px or more (0 smaller found). It feels trustworthy: one channel, a named person, the real number.
- **Current site:** **0 WhatsApp links** in the DOM on the phone (`cur-walk-log.txt`). The only contact action is a "צרו קשר" header item. The new page wins this outright.

## 4. Motion and interaction

- **Hero orbit** (`sheet-phone-orbit.png`): the clip satellite and the labels turn with scroll (about 30° per screen). It is smooth, with no jank in the frames. It is so slow and small that most visitors will not notice it on the phone. The brief asked for "exciting … mini animations", and here they are near invisible.
- **Service tabs:** a 220 ms slide. The mid-frame (`new-phone-tab0-mid.png`) shows a clean switch.
- **Offer accordions:** open in place, with the height animated. Smooth.
- **Quotes:** 6 dots, 44 px targets. The dot moves one quote at a time (`new-phone-quotes-b.png`). The English quote is set LTR inside the RTL page, as brief 16 asks.
- **Team "עוד עליה":** the bio opens in place, focus moves into it, and Esc closes it.
- **Menu:** the burger opens a white sheet. Tapping "הרצאות וסדנאות" closes it and scrolls to the offers. When I left the menu open, it stayed open over the content while I scrolled (`new-phone-acc7.png`). That is minor: it should close on scroll.
- **Laptop:** the method ring sits sticky on the left and lights the ring for the stage in view (`sheet-laptop-1.png`). This is the concept's set-piece and it works there. Stage photos appear on laptop only. The CTA hover state exists. Keyboard: there is a skip link first, then the logo, the six nav items, then the CTAs, all with a 3 px visible outline (`new-walk-log-lap.txt`).
- **Reduced motion** (`new-reduced-full.png`): rings static, no video requested (`src: ""`), and the page stays complete.
- **JS off** (`new-nojs-full.png`): both service panels and both offer groups are shown, accordions are open, the poster is shown, there are 16 working wa.me links, and the page grows to 20,523 px. It is still a usable page.

## 5. Laptop, 1440×900 (`sheet-laptop-0..3.png`, 13.5 screens)

The first screen has the title and button at the right, and the rings with the portrait and the playing clip at the left. It is airy and clean, but the ring device is about 300 px tall in a 900 px viewport, with a lot of empty sage around it, so the screen feels sparse and small-scale rather than confident. The rest of the page is calm and well spaced: two service cards with 4:3 photos, the method with its sticky ring and photo circles (the best section on the laptop), offers in a two-column accordion grid, the case study with a large hatched placeholder, the team, the podcast and its episode list, the blog, the 6-tile Instagram row and the footer. It is professional, readable and consistent. It is never striking.

## 6. Against the current site (`sheet-cur-phone-*.png`, `sheet-cur-laptop.png`, walked the same way)

- **Current phone:** 222 requests and 2.25 MB after 14 s. For about 3 s the hero is a white circle on dark green. The layout overflows sideways: the nav and the service cards are cut off at the screen edge. There are 14 px texts, underlined card titles, badges with no explanation, and no WhatsApp anywhere. The new page is better on every count.
- **Where the current site is better (honestly):** (a) **brand presence**. The deep `#00574C`/`#173B34` green fields and the large white wordmark read as a confident brand at a glance. The new page's pale sage and thin rings are softer and more generic, and the brief's "leading greens" appear here mainly as the button fill. (b) **The podcast block.** The old embedded purple Spotify card is the most colourful, eye-catching element on either page. The new ON AIR block is text plus two buttons. (c) **The blog cards.** The old cards have cover images. The new ones are text only.
- **Verdict:** yes, it is clearly better than the current site. It is better on the first screen (labelled action, readable type, her face inside her method) and on the whole page (distinct sections, a working phone layout, offers with prices and per-offer WhatsApp, a real footer).

## 7. Score: **7 / 10 · fail**

It is clearly better than the current site, easy to book (1 tap) and well built, with nothing broken. It is not yet *engaging*. On the phone the page is about 18 screens of mostly text in white cards on sage. The concept's one idea (the rings carrying the method) is visible only in the hero and on the laptop. The hero media is small, and the motion is too subtle to register. Against the brief's "contemporary, pleasant, **exciting** … with motion", it delivers pleasant, clean and readable, but not exciting. Against the gold bar (Global Surf), it is a competent page, not a portfolio piece.

## 8. Fix list (biggest effect first)

1. **Make the method section show, not tell, on the phone.** Give each of the four stage cards its stage photo as concept 2 specifies (SENSING img-003, THINKING img-012, MAKING img-c03, INFLUENCING img-011, 1:1 circles). Cut the body to the first paragraph, with a "עוד" toggle for the rest. Make the lit ring large enough to see: a ring device of 200 px or more that fills ring by ring as each card enters, not a 90 px icon. This is the concept's set-piece and on the phone it is missing.
2. **Give the hero more scale and the clip a readable size.** Enlarge the satellite clip on the phone to about 150–180 px (still within the 464 px source at 2×, or accept 1.5×). Make the orbit motion perceptible: a short load-in turn of the labels (300–400 ms, mirrored for RTL), on top of the scroll turn. On the laptop, let the ring device take about 520 px as the concept says (it measures about 300 px), so the first screen is not mostly empty sage. Paint the logo with the HTML: it is absent for the first 3 s on slow 4G.
3. **Break the testimonial wall.** Show at most about 6 lines of each quote with "להמשך הציטוט", or choose the shortest strong quotes for the slideshow. Move the proof row (award and BTC) above the testimonials, right after the services, so "why her" lands at screen 2–3 instead of screen 4.
4. **Make the demo case study look like an example, not a gap.** Replace the hatched "תמונה לדוגמה" box with a designed cover: the four lit rings, or a real workshop photo (img-c05 / img-007) clearly marked "דוגמה". Keep a single "דוגמה" badge, not two.
5. **Bring the deep greens back as a section ground, and remove the doubled CTA.** Use one or two full-bleed `#0A5150`/`#173B34` bands (for example the motto, ON AIR, or the closing) with white type, so the page carries the brand's own colour the way the current site does and the rhythm is not white card on sage all the way down. On the phone, hide the header WhatsApp pill once the bottom bar is showing, because two identical buttons on every screen is noise. Add covers to the blog cards. Close the menu on scroll.

## 9. Keep

- The hero structure: eyebrow, short title, short tagline, one labelled WhatsApp button. Text and action usable at 0.5 s. Hadas's face inside the rings.
- The 1-tap WhatsApp everywhere, with prefilled text per offer, and the persistent labelled phone bar.
- The service cards with the big 1:1 method photos, and the offer accordions with prices and per-offer WhatsApp.
- The laptop method section: the sticky ring that lights per stage, with the photo circles.
- The type: Playpen titles with Assistant body text at a readable size. Airy spacing. The team grid on coloured grounds. The Instagram strip. The real footer with pill buttons.
- Reduced-motion and JS-off behaviour. Zero third-party requests. 1.43 MB first load.

## 4f ranking (experience only)

This report covers only the interactive variant. The ranking across calm / interactive / unique has to be made by whoever merges the three experience reports.
