# mutag-meitiv · series 2 · calm "דף ההזמנה" — experience-critic (station 4f)

experience-critic 0.1.0 · run 2026-10-il-brand-01 · 2026-10-18 · mode: quick · variant: calm (series 2)
Page: `sites/mutag-meitiv/mockups/calm/dist/index.html`, served on http://127.0.0.1:9640.
Frames: `reports/2026-10-il-brand-01/experience/mutag-meitiv/s2-calm/` (walk log: `walk-log.txt`).
Current site walked live: https://www.mutagmeitiv.com/ (frames `current-phone-*`, `current-laptop-*`).
I did not read the other series-2 reviewers' reports.

**Score 8/10 · pass (just) · better than the current site: yes · taps to book: 1 (hero button → wa.me, the organisation message prefilled).**

## 1. Phone, cold (390×844, touch, 150 ms RTT / 1.6 Mbps, CPU ×4)

| t | what is on screen | frame |
|---|---|---|
| 0.5 s | only the empty white header pill on white. No text, no button. | `phone-cold-500ms.png` |
| 1.5 s | the whole first screen: Hadas full-length in the green dress at the Brand Manager Day wall, the pill with the logo, a round WhatsApp button and the menu, then the deep-green band with the h1 "מיתוג לעמותות ולארגונים שרוצים להטיב עם העולם.", the mint line "לעמותות, לארגונים ולצוותים" and a full-width mint "כתבו להדס בוואטסאפ". | `phone-cold-1500ms.png` |
| 3 s | the same, settled. Nothing moves or shifts. | `phone-cold-3000ms.png` |

Measured: LCP 1.11 s, CLS 0.0007, one host only (127.0.0.1), ~380 KB transferred, scroll width 390 (no overflow), page 12,493 px (~15 screens; budget 13k).
The 0.5 s frame is blank because the 252 KB HTML carries the font and CSS inline. On this profile that costs about a second before the text and the button show. It is still well inside the budget.

How it feels: the first screen is the strongest moment on the page. A real person at a real branding conference, wearing the brand's green, with her name badge readable, and one clear action under one clear sentence. An organisation's buyer knows in two seconds who this is and what she is for. No hero video, as the concept says (the clips are small and vertical); the photograph carries the screen.

## 2. The walk (phone, 700 px steps at ~0.9 s; `phone-scroll-00…17.png`)

- **00–01 intro:** large 22 px text and a calm column. Then img-ig-01 (Hadas on stage before "BRAND THE CHANGE") in a rounded card. Good second beat, and it confirms the stage.
- **02–04 "מה ארגונים מזמינים":** four white cards with icons, a title, one sentence and a round WhatsApp button each, then the section's mint button. **This is where it gets noisy.** At y=2100 my count found 6 WhatsApp links in view (`walk-log.txt`, scroll 3): two round card buttons, the section button and the phone bar, with the section button sliding under the bar (`phone-orgs-cards.png`, bottom). The round buttons have no label, so they repeat the bar instead of adding a choice. The "הדרכות צוות" price breaks into "580" on one line and "₪ + מע״מ למשתתף/ת" on the next (`phone-orgs-cards.png`), so the number reads alone, with no currency.
- **04–05 the award on `#173B34`:** the strongest proof moment. Gold seal, the award line, then the judges' words large and white with plenty of air (`phone-award.png`). It reads as earned, not as a badge. Small flaw: the award line's bidi wrap splits "Brand / Academy" across lines.
- **05–06 "מודה על הזכות להטיב ב:":** the logos read as one ink and look crisp. Heartivism is still pale (`phone-scroll-05.png`). Then the three talk lines as **three identical grey cards** with big years (2024 / 2025 / 2025) and "לפוסט" pills. Attention drops here: three cards of the same weight read like a list of posts, not a speaker's programme.
- **07–08 method, deep `#0A5150`:** the designed moment. Tall photo panels with SENSING/THINKING/MAKING/INFLUENCING, a horizontal swipe with peek and dots, and the body with "קראו עוד" under each panel. It feels good under the thumb. The workshop clip plays only once you swipe to MAKING (`phone-method-dot1…3.png`, video 1.3 → 4.6 s). A visitor who scrolls past without swiping never sees the business's footage move (all 18 scroll frames: `paused:true`, no source attached).
- **08–09 testimonials:** a slideshow with dots, each slide sized to its quote (`phone-testi-1.png`). Good.
- **09–10 "גם לבעלי עסקים ולאנשי מקצוע":** personal branding with two buttons, then three accordions (סדנאות פתוחות 3 · קורסים 2 · סדנת הכרות ללא תשלום). Tidy. When opened, each row carries its own price and round WhatsApp (`phone-indiv-open.png`). Individuals are clearly second, as the brief asks.
- **10 demo case study:** a designed deep-green cover with the "דוגמה" badge and the m-icon. No hatched box (L5 met).
- **11–13 team, podcast, blog:** faces cropped alike in a 2-col grid, bios open on tap (`phone-team-bio.png`). The ON AIR artwork and the dated blog cards are clean, but this stretch is long and quiet (~3 screens of content before Instagram).
- **14–15 Instagram, then the closing:** six tiles edge to edge, then img-c05 full-bleed (the women holding their boards). It is the warmest image on the page and it lifts the ending. Then "רוצה להתחיל?…" with WhatsApp and the Zoom call.
- **16–17 footer:** the bar hides and the header pill's WhatsApp returns (L9 logic works). There is a real footer with buttons for WhatsApp, phone, email and the guide, plus socials and nav. No underlines.

**After one scroll, can I say what, where, why and cost?** What and for whom: yes, immediately. Why her: the stage photo plus the award two screens later. Cost: shown only where published (580 ₪, 5,200 ₪, 480 ₪), which is correct for this business. The story is told through photographs and type, never through tables.

**Wanting to go (or rather, wanting to call):** three moments do it: the hero, the judges' quote on deep green, and the closing group photo. The talks-as-cards and the long quiet team/content stretch deflate it.

## 3. Booking

- Hero "כתבו להדס בוואטסאפ" (342×56) → `https://wa.me/972546686808?text=היי הדס, אני פונה בשם ארגון. אשמח לדבר על מה שיכול להתאים לנו.` The tap was intercepted, no message sent. **1 tap**, which meets `audit.json.recommended.clicks_to_book: 1`. The class is WhatsApp, as recommended. The number matches brief 18.
- Each format card carries its own prefill, for example strategic planning: "…מעניין אותי תכנון אסטרטגי למותג, אפשר לשמוע פרטים?" and the talk: "…אשמח לפרטים על הזמנת ההרצאה BRANDS OF CHANGE." (`walk-log.txt`, "orgs WA"). The owner gets a usable first message.
- The labelled phone bar appears once the hero button leaves the screen (`phone-bar-y3000.png`). The menu (`phone-menu.png`) has six anchors and a WhatsApp button.
- Trust before the tap: good. The award quote and the logos come before the method, and the price is visible on the two formats that have one.
- Two tap targets are 27 px tall: the card title links "תכנון אסטרטגי למותג" and "הדרכות צוות". They are under 44.
- Against the current site: on my live walk it has **no WhatsApp link at all** (0 `wa.me` anchors). Its only action is "פה יוצרים קשר" in the header. The new page is far easier to book.

## 4. Motion and interaction

- Calm by intent. Native scroll, no reveals, no scroll-jacking, no loader. The phone bar slides in and out.
- Desktop method: hovering a panel widens it and reveals its body (`laptop-method-rest.png` → `laptop-method-hover3.png`). Smooth and purposeful, and the best interaction on the page. The MAKING clip plays on desktop (`laptop video false:2.9`). At ~645 px wide it is visibly soft, because the source is a 464 px rendition.
- Phone method: scroll-snap swipe with peek and dots. Good. The dots order correctly for RTL (the right-most dot is active on SENSING).
- For a brief that asks for "motion… mini animations and interaction", this is the floor rather than a delight. I count this as fair for the calm slot, not as a defect.
- Reduced motion: static, video stays on its poster, panels equal and readable (`phone-rm-method-2.png`). On a fast scroll the lazy panel photos showed as empty teal panels for a moment (`phone-rm-method.png`, 0.5 s after arrival); they load a beat later.
- JavaScript off: the full page reads, the method bodies are all shown, every link is a real link (`phone-nojs-top.png`, `phone-nojs-method.png`; height 12,893).

## 5. Laptop (1440×900; `laptop-00…13.png`)

- First screen (`laptop-00-top.png`): img-033 at 2.6:1, cropped clear of the pill, over a deep-green band. The h1 is 47 px at the start and the mint button at the end. It reads like the head of a programme sheet, which is the concept. The middle of the band is empty, and the title is modest for a 1440 screen. Two WhatsApp buttons are on the first screen (the pill and the band); they are acceptable on desktop.
- The formats as a 2×2 card set (`laptop-02.png`) read cleanly, with 19 px body. The round WhatsApp sits at the far end of each card, away from its text.
- The award, the logos (5×3) and the talks follow (`laptop-03`, `-04`). The talk cards are again three equal grey bars.
- The method strip is the highlight (`laptop-method-hover3.png`).
- The testimonial card text runs 880 px wide at 19 px (≈ 90 characters a line, over the 62 ch rule; `laptop-06.png`). This is the one place reading feels heavy.
- Team row, then the podcast beside the blog, then Instagram, then the full-bleed closing photo with two buttons (`laptop-10…13`).

## 6. Against the current site (walked live)

- **Current, phone:** at 390 it serves a clipped desktop layout. A circle photo in a boxed green panel, four unexplained seals, four cramped service columns cut off at the edge, then a long purple podcast block (`current-phone-00…07.png`). An accessibility widget panel sits in the DOM on load.
- **Current, laptop:** a 950 px boxed panel with a circle photo, four seals and "היי, הגעת למקום מיטיב!" (`current-laptop-00.png`). Small grey type, then team columns with long bios.
- **Where the current site is better:**
  - (a) Its first screen shows all four service names at once, which is quicker navigation for an individual visitor. The new page leads with organisations and puts individuals nine sections down. That trade-off is intended by brief 29.
  - (b) Its greeting "היי, הגעת למקום מיטיב!" is warmer than the new h1.
  - (c) Nothing else is better.
- **Verdict:** clearly better on the first screen and on the whole page. It has a real photograph instead of a circle crop, one labelled WhatsApp action instead of no WhatsApp at all, distinct sections, readable 18–22 px text and a real footer.

## 7. Score

**8/10.** It is engaging and clearly better than the current site, and booking takes one tap with a prefilled message. The first screen, the award moment, the method strip and the closing photograph are each good. It is held at 8, not 9, by four things:
- the WhatsApp clutter in the formats section;
- the flat talk cards;
- a long quiet middle (team, podcast and blog);
- the business's clip, which only moves on a swipe.

Pass is at the threshold, not comfortably above it.

## 8. Fix list (biggest effect first)

1. **One WhatsApp per phone screen in "מה ארגונים מזמינים".**
   - Drop the four round icon buttons on phone, or turn them into one labelled text button per card ("לפרטים בוואטסאפ"), so they do not compete with the bar.
   - Hide the phone bar while the section's own mint button is on screen, as the closing already does (`phone-orgs-cards.png`: 3 WhatsApp buttons, one under the bar).
2. **Make the talks a programme, not three post cards.**
   - Set the three talk lines as one designed list: the year large in green, the event, the place, then "לפוסט" as a small icon pill.
   - Put each line next to its own thumbnail (ig-01 / ig-04 / ig-05) so the stage, Kfar Blum and the festival are seen.
   - Right now this is the flattest screen on the page (`phone-scroll-06.png`, `laptop-04.png`).
3. **Let the business's footage move without a swipe.** On phone, start the run on MAKING, or show the clip once as a standalone tile before the swipe. On desktop, use a sharper rendition, or cap the MAKING panel at the clip's native 464 px. Today nobody who only scrolls sees it play (all 18 phone scroll frames: paused).
4. **Keep prices whole.** Use `white-space:nowrap` on "580 ₪ + מע״מ" and on the other price strings, so the number never sits alone without its currency (`phone-orgs-cards.png`). Also make the 27 px card title links ≥ 44 px.
5. **Shorten and tighten the quiet middle.**
   - Cap the testimonial measure at ~62 ch on desktop (it is 880 px today).
   - Join the podcast and blog into one row on phone.
   - Consider a mid-page mint "דברו איתי על הארגון שלכם" moment after the method, so the long stretch from the method to the closing has a beat.

Smaller points:
- Fix the "Brand / Academy" line break.
- Lift Heartivism's ink.
- Give the lazy panel images a larger rootMargin so a fast scroller never sees empty teal panels.

## 9. Keep

- The hero: img-033 full-bleed over the deep-green title band. Text never sits on the photo, there is one full-width button, and it is all inside 844 px.
- The award moment with the judges' words set large on `#173B34`.
- The method photo panels: hover-widen on desktop, swipe with peek on phone.
- The per-format WhatsApp prefills, the phone bar's hide and return logic, and the real footer.
- The organisations-first order, with individuals kept as a tidy accordion block.
- The closing on img-c05.
- The designed demo-case cover.
- The performance: LCP 1.1 s, CLS ≈ 0, a single host, ~380 KB.

## One sentence for the human

A sober, credible commissioning page: Hadas at the conference and the judges' quote do the selling, and WhatsApp is one tap away. It is the quietest of the set, and noisiest where the four formats each repeat WhatsApp.
