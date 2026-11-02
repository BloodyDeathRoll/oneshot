# talouloren — experience-critic (experience-critic 0.2.0)

## Round 1 · station 4f (quick) · 2026-11-02

Walked as an owner-led business (and a brand lead) meeting Talou L'oren cold. Phone 390×844 touch, cold load at 1.6 Mbps / 150 ms RTT / 4× CPU; laptop 1440×900. Each mockup was served from its `dist/` and walked by playwright: Home scrolled at a human pace, header/bar CTA → Focused Check (all 10 questions + contact + consent) → `/thanks` → `/snapshot` → book (day, slot, details, mock pay) → `/booked`; English toggle; all 18 routes at 390 px for overflow; reduced motion; JavaScript off; hover transitions on desktop. Current site talouloren.com walked the same way (phone + laptop), shaharnaor.com first screen. Only fake data was typed; no network call left localhost.

Frames: `sites/talouloren/mockups/<variant>/shots/xc-r1/` (`sheet-phone-*.png`, `sheet-laptop-*.png`, `sheet-flow-{check,snap,book}.png`, `phone-cold*.png`, `phone-reduced-*.png`, `phone-nojs-hero.png`, `walk.log`, `flow-phone.log`). Current site: `calm/shots/xc-r1/current-site/`. (Note: `interactive/shots/xc-r1/` also has frames numbered from a first scripted run that used the wrong route prefix and landed on the 404 page. Ignore those 404 frames; the real flow is in `flow-phone.log`.)

### The current site (the bar to beat)

talouloren.com (`current-site/sheet-tal-phone.png`, `sheet-tal-laptop.png`) is a white 2021 WordPress page. It has a small dark slider ("TOTAL SUCCESS EXPERIENCE"), square gold-outlined frames over B&W portraits, tiny serif caps, a colour logo wall, a testimonial video slider, and an Instagram strip. "קבעו עכשיו" appears eight times and goes to `/meet-tal/`; a WhatsApp float is 1 tap. Its strengths are the gold-frame device, the real logo wall and distinct sections. Its weaknesses: it is small, white and dated, has no story order and no diagnostic step. All three mockups beat it at a glance on both devices. shaharnaor.com is a dark purple one-screen card with a wave canvas and two buttons; no mockup borrows it, which is fine.

---

### Calm — "אור עליון"

**Timeline (phone, throttled; `phone-cold2-*.png`).** FCP is at 1.18 s, with the headline, the segmented Story/Launch pill and the gold bottom bar on black. By 2 s the poster of Tal on his stool under the top light paints behind them. The video (`hero-m1280.webm`) attaches after load and plays at about 3 s without a flash. It is clean, quiet and expensive-looking. On the phone the headline sits over Tal's torso; it is readable, but it covers the subject.

**Story after one scroll.** The approved subtitle is set large, then the five pains with side-rail numbers, then the page turns white for "ואז האור מסתובב" with the five ladder words, the last one in gold (`sheet-phone-a.png`). This is the brief told in order, and the light band is the one moment of surprise. Next come the two doors (big B&W portraits), the steps, the stats (`3 מיליון` reads correctly), the names wall as type, a swipe row of cases, the partners (Tal's film still, then Shahar's gold-framed "צילום בדרך"), the Partnership band, FAQ, the final call and the footer.

**Wanting it.** The hero and the white flip band do the work. The page then settles into an even rhythm of black sections, and on the laptop it goes flat (`sheet-laptop-a/b.png`): small nav and body type, wide empty bands around the subtitle and pains, and a footer squeezed into the right half.

**Booking.** WhatsApp is 1 tap from every screen (bottom bar + desktop chip). The Check is 1 tap, then start, then 10 Next and Send: 13 taps to submit. The bar is hidden during the Check, which is good. Snapshot → "לקביעת פגישת ייעוץ" → day → slot → 3 fields → "לתשלום ולאישור" → `/booked` "נקבע.": 4 taps plus typing. The snapshot is a white "print" with neutral 1–5 bars, which is trustworthy.

**Defects (frames).**
- `/book` at 390 px: both booking panels bleed off the left edge with no gutter, and the "9 נוב׳" tile touches the screen edge (`phone-flow-24-book-step0.png`).
- `/thanks` at 390 px: the title "תודה, {first_name}." overflows and is clipped (`sheet-flow-snap.png` frame 1).
- `/partnership` at 390 px: the price/capacity row overflows.
- Laptop: the Partnership band's copy sits on top of the Wella bottles, so text collides with the product (`sheet-laptop-b.png` frame 4).
- Placeholders such as `{price_story_sprint}` and `{case_story_amdocs_before}` render as monospace code chips. That is honest, but it reads as a developer page next to the luxury type.
- The snapshot's bottom bar still says "לבדיקה הממוקדת" after the Check is done; it should switch to booking there.

**Motion.** There is a top-lit film loop, reveals, the stepped white band, the FAQ "+" rotating to "×", and transitions on 13 of the 15 controls in view. Calm by design. Reduced motion shows the poster with no video and reads fine; JavaScript off renders the full Home (17 k chars, 13 Check links, 24 WhatsApp links).

**Score 8 / 10 · better than current: yes · pass (borderline).**

**Fix list.**
1. Fix the 390 px overflows on `/book`, `/thanks` and `/partnership`.
2. Laptop: raise nav/body type one step, tighten the empty bands under the subtitle and pains, and give the footer the full width.
3. Partnership band: move the copy off the product, or put a solid dark field under the text half.
4. Restyle placeholders as quiet gold-outlined tags in the body face, not code chips.
5. On `/snapshot` and `/thanks`, switch the bottom bar to "לקביעת פגישת ייעוץ".

**Keep:** the top-lit hero film, the partner "LED BY" strip, the single white flip band, names-as-type, the white snapshot print, the bar with no bar inside the Check.

---

### Interactive — "הזרקור"

**Timeline (phone).** FCP at 0.79 s, the fastest of the three. Tal's close-up (vid-033) fills the top. A large condensed-display headline, the subtitle, two door buttons and the bar sit below. The video plays at about 6 s throttled. Strong face, but the first thing the eye meets at the top is a raw `{hero_film_caption}` chip (`sheet-phone-cold.png`), on both devices.

**Story.** Scroll-lit pains (dim → lit), the ladder as outline words filling in turn with the last one in gold, door cards, the steps with Q3 of the Check live on Home, count-up stats, logo and name marquees, a pinned horizontal case run on desktop, partners, a Mercedes band, FAQ, final call. The structure is the most "interactive", and the Home Q3 hand-off works: the answer carried into `/check` and Q3 was already filled.

**Wanting it.** The face and the outline→fill ladder pull you in. Then whole viewports of empty black (`sheet-laptop-a.png` frames 2–3, `sheet-laptop-b.png` frames 2, 5, 7) and the door photos dimmed to mud deflate it. The condensed display face carries the FAQ questions and all the English (`sheet-flow-book.png` EN frames). In Latin it looks crude, not high end.

**Booking.** WhatsApp 1 tap. Check: 12 taps from Home Q3 to Send, with 2-column option cards. Booking is a three-step drawer over the snapshot: slot → details → pay ("MOCK · Cardcom"), then `#booked`, 5 taps + typing. It is the clearest booking UI of the three.

**Defects.**
- The header has no backdrop: on scroll, headings and labels pass under the logo, nav and "English" on phone and laptop (`sheet-phone-a.png` frames 2 and 5, `sheet-laptop-a.png` frames 6–7).
- `{hero_film_caption}` is visible on the first screen.
- At 390 px the `/partnership` "בשביל מי זה" block and the snapshot `{business_name}` title overflow.
- JavaScript off renders only 3.5 k chars of Home.

**Motion.** It has the most micro-interaction (14 of 15 in-view controls transition, pointer spotlight, scroll-lit lines, count-ups, marquees pausing on hover). The main item is the hero video plus the spotlight; that qualifies under the method's cap rule. Reduced motion is static and fine.

**Score 7 / 10 · better than current: yes · fail.**

**Fix list.**
1. Give the header a solid or blurred black backdrop once scrolled.
2. Remove or design the hero film caption (a "▶ הסרט" chip like calm's).
3. Collapse the dead black spans: the pains, the ladder and the partners intro each take up to a full empty viewport on laptop.
4. Keep the condensed face for Hebrew display only; set the FAQ in the body face and the English display in a proper Latin face.
5. Lift the door photos: less darkening, and the text in a solid panel instead of over the image.

**Keep:** the Home Q3 → Check hand-off, the booking drawer, the outline→fill ladder, the count-up stats, the logo marquee.

---

### Unique — "ההיפוך"

**Timeline (phone).** The screen is black until FCP at 1.82 s throttled, the slowest of the three. Then the WebGL beam paints from the top with dust in it, a faint profile of Tal in the pool, the centred headline, the Story/Launch pill, "▶ הסרט" and the metallic-gold bar. This is the most cinematic first screen of the run.

**Story.** The pinned set-piece is 05 chapters with a counter (`sheet-phone-a.png`, `sheet-laptop-a.png`): the pains in the glare → the beam swings onto Tal on his stool as the five ladder words rise, the last one gold → the two partners lit side by side (Tal, Shahar's "ש״נ" placeholder) → the beam lands on the Focused Check with its meta line and CTA. Then come the giant Story/Launch words, contact-sheet steps, enormous stats, names as type, a case carousel, partners, Partnership, FAQ, and a "מאיפה מתחילים? מכאן." marquee. Of the three, this one makes the brand idea, the light turning, something you experience rather than read about.

**Wanting it.** Yes. The beam landing on the studio is the moment that makes you want to be in that room. After the pin is released the page is quieter, but it stays consistent.

**Booking.** WhatsApp 1 tap. Check: 13 taps (start + 10 + Send), framed as a "sitting" with a gold progress line. Book: one page, day + slot + details + mock card + "לתשלום ולאישור" → "נקבע.", 4 taps + typing.

**Defects.**
- **JavaScript off: blank page** (57 chars, no h1, no Check link; `phone-nojs-hero.png`). All content is rendered by script. Every other mockup ships its Home in the HTML.
- Stats: on laptop "3 מיליון" renders with the 3 on the left (`dir:ltr`), so it reads "מיליון 3" (`sheet-laptop-a.png` frame 8).
- The persistent "לבדיקה הממוקדת" bar stays visible inside the Check, offering the step the visitor is already doing (`sheet-flow-check.png`).
- The set-piece counter showed "01 / 05" on the partners chapter (`sheet-laptop-a.png` frame 5).
- `/book` at 390 px: the 7-day strip is squeezed so "יום ג׳" wraps into two lines, and the bar covers the second row of slots.
- `/snapshot`: a long `{business_name}` placeholder breaks across lines in a code chip.
- Case posters are letterboxed inside the 16:9 frames.

**Motion.** One fragment shader, a scrubbed pin and a crossfade to the vid-036 loop, with transitions on 24 of 28 controls. This is purposeful and light (A17), and it is the WebGL main item the method asks for. Reduced motion falls back to stacked static sections with the beam drawn and reads well (`phone-reduced-*.png`).

**Score 7 / 10 · better than current: yes · fail.** The walk itself is the best of the run (8–9 on its own). It is held at 7 because the page is empty without JavaScript and the first paint is the slowest.

**Fix list.**
1. Ship Home (headline, doors, pains, ladder, partners, Check link, WhatsApp) as static HTML and let the script enhance it, so JS-off and first paint show the page.
2. Bring FCP under about 1.2 s throttled: inline the critical CSS and the hero text, and start the shader after first paint.
3. Fix the stat bidi (`3 מיליון` RTL) and the chapter counter.
4. Hide the bottom bar inside `/check`.
5. On phone `/book`, use a swipeable 5-day strip with single-line day labels, and keep the slots clear of the bar.

**Keep:** the beam set-piece and its chapter order, the gold metallic CTA, the giant door words, the contact-sheet steps, the static reduced-motion path.

---

### Experience ranking (4f, round 1)

1. **Unique**: the only one that makes "the light turns" an experience. It needs the JS-off/first-paint fix to pass.
2. **Calm**: the cleanest and most trustworthy; it passes at 8, with phone overflows to fix.
3. **Interactive**: a good booking drawer and good Home Q3, but the header collisions, the raw caption on the first screen and dead black spans hold it at 7.

What the designer prompt got wrong: it did not require the page to stay whole without JavaScript and before the shader (unique), or a scrolled-header backdrop and no raw placeholder on the first screen (interactive), and no layout was checked at 390 px on the secondary routes (`/book`, `/thanks`, `/partnership`) (calm).

## Round 2 · station 4f (quick) · 2026-11-02 · after commit 23f9cef

Same method and walk as round 1 (phone 390×844 throttled cold load, scroll, Check 10 + contact → `/thanks` → `/snapshot` → book → `/booked`, English toggle, 18 routes at 390 px, reduced motion, JavaScript off, laptop 1440×900). The visual-critic and critic reports were not read. Frames: `sites/talouloren/mockups/<variant>/shots/xc-r2/` (`sheet-phone-a/b.png`, `sheet-laptop.png`, `sheet-flows.png`, `phone-cold2-*.png`, `phone-nojs-hero.png`, `walk.log`, `flow-phone.log`). The current-site frames are those of round 1 (`calm/shots/xc-r1/current-site/`).

Measured (phone, 1.6 Mbps / 150 ms / 4× CPU):

| | FCP | JS-off Home text | overflow at 390 px (excluding carousels and marquees) | stat bidi | flow end to end |
|---|---|---|---|---|---|
| calm | 1.10 s | 16.7 k chars | none | correct | yes (`#/booked`) |
| interactive | 0.82 s | 15.8 k chars (was 3.5 k) | none | correct | yes (`#booked`) |
| unique | 0.83 s (was 1.82) | 4.8 k chars, h1 + 6 Check links + WhatsApp (was blank) | none | correct (was "מיליון 3") | yes (`#/booked`) |

### Calm: 8 / 10 · better than current: yes · pass

- **Fixed:** `/book`, `/thanks` and `/partnership` now fit at 390 px (`sheet-flows.png`). Placeholders are now quiet gold pills ("מחיר בקרוב"). The bottom bar switches to "לקביעת פגישת ייעוץ" on `/thanks` and `/snapshot`. The Partnership band now carries a portrait with its copy on the dark side, and the Wella box became a case feature band ("BACK TO WELLA"), which reads well (`sheet-phone-a.png`, `sheet-laptop.png`).
- **Remaining:** on laptop the nav and body type are still small and the footer still sits in the right half (`sheet-laptop.png`, last two frames). Calm stays calm: correct for the variant, and the least memorable of the three.

### Interactive: 8 / 10 · better than current: yes · pass

- **Fixed:** the header has a dark backdrop once scrolled, so nothing passes under the logo or menu. The hero caption is a designed "▶ הצגה" chip. The pains and the FAQ are set in the body face. The English display uses a proper Latin face ("You're good at what you do…", `sheet-flows.png`). The dead black spans are shorter, the door photos are brighter, and the Tal partner frame is img-001.
- **Remaining:** raw `{price_story_sprint}` / `{case_story_*}` / `{business_name}` tags still appear as code-style chips, including a button on `/thanks` labelled `{business_name}`. The bar does not switch to booking after the Check. Some laptop bands are still sparse (the logo marquee, the partner bios).

### Unique: 8 / 10 · better than current: yes · pass

- **Fixed:** Home is in the HTML. With JS off it renders the headline, doors, pains and Check links, and first paint dropped from 1.82 s to 0.83 s, so the black wait is gone. "3 מיליון" reads correctly. The set-piece counter is right (04 / 05 on the partners chapter, `sheet-laptop.png`). The bottom bar is hidden inside `/check`. `/book` on the phone uses a 5-day strip with single-line labels, and the slots are clear of the bar (`sheet-flows.png`).
- **Remaining:** laptop body type is small under the set-piece. The case carousel's crossfade briefly stacks two titles. The bar stays "לבדיקה הממוקדת" on `/thanks` and `/snapshot`. It is still the strongest experience: the beam landing on the studio.

### Experience ranking, round 2

1. **Unique**: the brand idea made into the walk, and now fast and whole without JS.
2. **Calm**: the most trustworthy and the cleanest booking.
3. **Interactive**: the best booking drawer and the Home Q3 hand-off, but its leftover placeholders are the most visible of the three.

All three pass dimension 8 at 8 from this critic and beat talouloren.com on the first screen and on the whole walk.
