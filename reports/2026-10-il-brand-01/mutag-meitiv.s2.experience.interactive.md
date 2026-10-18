# mutag-meitiv · series 2 · interactive "בחרו פורמט" — experience-critic (station 4f)

experience-critic 0.1.0 · run 2026-10-il-brand-01 · 2026-10-18 · mode: quick · round 1 (series 2)
Page: `sites/mutag-meitiv/mockups/interactive/dist/index.html`, served over http on 127.0.0.1:9741.
Frames: `reports/2026-10-il-brand-01/experience/mutag-meitiv/s2-interactive/` (p-* phone, l-* laptop, cur-* current site). Walk scripts are in the scratchpad (`s2-ec-int/walk.mjs`, `walk2.mjs`, `cur.mjs`). WhatsApp and Calendly requests were intercepted and aborted, so no message was sent and no form was submitted. I did not read the other reviewers' reports for this round.

**Score 8/10 · pass · better than the current site: yes · taps to book: 1 (hero button) or 2 (chip + button). The audit target is 1, class WhatsApp: met.**

## 1. Phone cold load (390×844, touch, 150 ms RTT, ~1.6 Mbps, CPU 4×)

| t | what is there | frame |
|---|---|---|
| 0.5 s | white page, the header pill with only the m-icon. No text yet: the 172 KB HTML (logo data URIs inline) is still streaming | p-cold-500 |
| 1.5 s | complete first screen: Hadas on stage in green, white card with the eyebrow, h1, the format line, "מה תרצו להזמין?", 2×2 card chips, full-width WhatsApp button | p-cold-1500 |
| 3.0 s | same; stable | p-cold-3000 |

Measured LCP was 1.17 s, the load event fired at 3.5 s, and 661 KB were transferred. No video plays on the first screen, which is what the concept specifies. The first screen at 1.5 s is complete and bookable. What it feels like: a real person on a real stage, and one question you can answer with your thumb. The whole 0.5 s frame is blank. That is a small cost, caused by the inlined data URIs.

## 2. The walk (phone, 700 px steps, p-scroll-00…16; page 11,431 px, scroll width 390)

- **00–01, hero → intro.** The message preview ("ההודעה שתיפתח בוואטסאפ:" plus a mint bubble) sits just under the fold. "לעמותות, לארגונים ולצוותים" follows, centred and airy, at a readable 18–20 px. One scroll in, I can say what this is (brand strategy and talks for nonprofits and organisations) and who it is (Hadas Darchli). Cost is not shown, and none is published for the lead services, so that is correct.
- **02, formats tabs.** The tabs work. But the first panel, "הרצאה", repeats the hero: the same photograph (img-ig-01) and the same sentence. Its title also repeats itself: "הרצאת הדגל — BRANDS OF CHANGE" becomes "הרצאת הדגל BRANDS OF CHANGE: הרצאה בהזמנה…". In RTL the Latin title breaks into "BRANDS OF — הרצאת הדגל / CHANGE". **Two WhatsApp buttons are in one phone screen** here: the panel's button and the phone bar (L9).
- **03–05, the method deck (deep teal).** This is the one strong moment after the hero: a full-bleed green ground, the stage photo, and the next card peeking from the left (RTL forward). On the phone, though, the photo takes about 650 px. The card's text ("SENSING / מחקר עומק…") arrives a full scroll later, partly under the phone bar (p-method, p-scroll-04). The MAKING clip plays when its card is in front (`paused:false, t:1.44`), and it pauses when the card leaves (p-method-2). It is visibly soft: the 464 px source is drawn about 310 CSS px wide at 2×, and on the laptop it is drawn 440 px wide (l-method-2).
- **05–09, proof → logos → quotes → "גם לבעלי עסקים".** The award with its seal and the judges' quote is honest and well set. After that, though, about four phone screens are white cards on grey: three talk cards, each with a grey "לפוסט באינסטגרם" pill, then the logo marquee, a quote card and the sub-chips box. **This is where attention drops.** It is tidy, but there is no photograph and no green ground between the deck and the demo tile.
- **10–16, demo → team → content → Instagram → closing → footer.** The deep-green demo tile with its "דוגמה" badge and the team row of faces (founder larger) lift the page again. The bio opens in place and focus goes to "סגירה" (p-team-bio). The Instagram strip leads into the full-bleed workshop photo and the closing ("רוצה להתחיל?…", with WhatsApp and Calendly). The footer is a real footer. The phone bar shows from y≈1400 and hides over the footer (state log, frames 14–16).

**Wanting to go.** The moment that does it is the first chip tap. "סדנה לצוות" changes the photograph to eight women holding their boards, and the line and the message bubble change with it (p-chip-team). For an organisation's buyer this is the page saying "we've done this with a team like yours". What deflates it: the tabs repeating the same four photos and lines a screen later, and the grey card run after the method.

## 3. Booking (tap-through, phone)

| step | result |
|---|---|
| hero button, default | `wa.me/972546686808?text=היי הדס, אני פונה בשם ארגון. אשמח לדבר על מה שיכול להתאים לנו.` (intercepted) |
| chip סדנה לצוות → hero button | `…ראיתי באתר את ריטריט היום ״לחשוב כמו מותג (מיטיב)״ ואשמח לשמוע עוד.` (intercepted) |
| chips הרצאה / מיתוג וריברנד / השתלמות | each rewrites the line, the bubble and the href to its own service's ctaText (log); the tab is pre-selected |
| fast double change team→pro | the photo, line and href all end on "pro" (no stale state) |
| phone bar | general `path.ctaText` message (intercepted) |
| JS off | the hero button carries the general message; a chip is a link to `#fmt-team` and scrolls there (y 2192) |

The number is identical everywhere (+972546686808). The prefilled message is shown before the tap, which builds trust. **One mismatch:** an organisation that picks "סדנה לצוות" sends a message about the therapists' day retreat, and the line under the h1 says "למשל ריטריט יום לאנשי.ות צוות בתחום הטיפול". For a municipality or a foundation, that reads as the wrong product.

The current site has no WhatsApp action on the home page. Its only actions are "פה יוצרים קשר" / "צרו קשר" pointing to /contact (cur.mjs action list).

## 4. Motion, interaction, reduced motion, JS off

- Chip → photo cross-fade, line swap and bubble swap: smooth, about 350 ms (p-chip-*-mid shows the fade). The laptop hover lift on the chips is subtle and fine (l-chip-hover). The card's top edge moves about 12 px when the format line changes length (l-hero vs l-chip-team).
- The deck on the laptop is a fan of white cards with the stage photo, arrows, four stage pills and dots: purposeful, and the best motion on the page. But at 1440×900 the card text and the controls never fit in one viewport (l-method-0: the card starts at y≈480, and the stage pills sit around y≈1130). The visitor has to scroll down to press a stage, and the card's heading has then gone above the fold (l-method-2). The controls are also redundant: arrows, four pills and four near-black dots on `#0A5150` (low contrast).
- **Menu navigation is broken for the lead service.** "תכנון אסטרטגי למותג" points to `#fmt-brand`, a hidden tab panel. On the phone the page did not move (y stayed at 6000, the tab stayed "talk"), and on the laptop the same (y 0, tab talk) (walk2 log, p-nav-brand2, l-nav-brand). "הרצאות וסדנאות" works only because "talk" is the default tab. "מיתוג אישי לעסק" and "קורסים" both land on the same `#also` box without opening their list. Brief 5 asked for clear navigation, and brief 12 makes strategic planning a lead service.
- Reduced motion: the chip swap is instant (p-rm-chip-brand), the marquee shows as a grid (p-rm-logos), and the deck is still readable (p-rm-method). Good.
- JS off: the page is complete and every link works. The chips jump to stacked panels, which is reasonable. The page grows to 18,419 px, and the phone bar sits over the hero card's lower chips (p-nojs-hero), so the hero button and the bar are both in the first screen.

## 5. Laptop (1440×900)

The first screen is the best of the walk (l-hero). Hadas fills the right two-thirds, the white card sits at the left (end) side, the nav reads clearly over the photo, and the header WhatsApp pill stays hidden while the card's button is in view. Each chip gives a genuinely different, strong image (l-chip-team, l-chip-brand, l-chip-pro). The img-ig-01 talk photo is visibly soft at full width, because it is an Instagram source. The whole-page sheet shows a clean, airy, consistent page in one family (Rubik) with the greens. Its rhythm goes hero → white → grey tabs → teal deck → grey proof → white logos → grey quotes → white → green demo → team → content → Instagram + photo → white closing → green footer. The middle third is the weakest stretch (l-proof: two columns of white cards on grey).

## 6. Against the current site (walked live, cur-p-*, cur-l-*)

On the phone, mutagmeitiv.com is the Wix desktop layout cropped at 390 px: the nav is cut ("ם משמעות"), the service columns are cut at the edge, and the same blog card repeats as you scroll (cur-p-05…07). There is no WhatsApp action and no labelled booking step. On the laptop it is a boxed green panel with a circle portrait and badges, four service columns, a long team text wall, a grey logo grid and a newsletter field.

Where the current site is still better: its circle portrait of Hadas, smiling at the canvas, is warmer and more personal than the stage shot. Its team section shows longer bios at a glance. Its logo grid shows all 15 marks at once instead of in a marquee. **Where the new page wins:** at a glance, on every screen. It has a real photograph of her on stage, a heading addressed to nonprofits and organisations, a one-tap WhatsApp with the message shown, a phone bar, a method that is an actual set-piece, and a page that fits the phone.

## 7. Verdict

**8/10, pass.** It is engaging, clearly better than the current site, and easy to book in one tap. Over the old site and over series 1 it adds the "pick a format" first screen, which does what the concept promised. The visitor answers the organisation's one question, and the picture, the line and the message change on the first tap. It stays at 8, not higher, because of a dead menu item for a lead service, a method deck that does not fit a laptop viewport, a tabs section that repeats the hero, and a flat grey middle.

## 8. Fix list (biggest effect first)

1. **Make the menu work.** "תכנון אסטרטגי למותג" (and every `#fmt-*` link) must select its tab and scroll to `#formats`. A small hash handler in page.js would do it, with JS off unchanged since the panels are stacked there. "מיתוג אישי לעסק" and "קורסים" should open their `#acc-pb` / `#acc-cr` list. At the moment the lead service's menu item does nothing on the phone or the laptop.
2. **Fit the deck into one viewport on the laptop, and put the text first on the phone.** At 1440×900 the photo, the front card and the stage controls should all fit under the header (photo about 4:5 at about 520 px tall, controls directly under the card). Keep the stage pills and the arrows, and drop the dots. On the phone, put the card's title and body above the photo, or shrink the photo to about 4:3, so the stage text shows in the same screen. Either replace the MAKING clip with a sharper rendition or draw it no wider than about 300 CSS px.
3. **Stop the tabs from repeating the hero.** Give each panel a different photograph from the hero's: for the talk, img-033 or img-011 (stage); for the team workshop, img-007 or img-004; for the professional training, img-008 or img-024. Remove the duplicated "הרצאת הדגל BRANDS OF CHANGE:" prefix from the body, and wrap the Latin title as one unit (`<bdi>`/nowrap) so it does not break into "BRANDS OF — … CHANGE".
4. **Put one image or green moment in the grey middle.** Between the method and the demo there are about four phone screens of white cards on grey. Make the three talks a horizontal row of large photo thumbnails, or set the judges' quote on a deep-green ground with the seal, and keep the talk rows compact.
5. **Fix the "סדנה לצוות" message for organisations, and keep one WhatsApp per phone screen.** The chip should send an organisation team-workshop message (a template label like `path.ctaText`, or a passed-copy variant), not the therapists' retreat message. The retreat can stay inside the tab panel as the example with its price. Hide the phone bar while a panel's or the closing's WhatsApp button is in view, and with JS off, so a screen never shows two identical buttons.

## 9. Keep

- The chip-driven first screen: the photo, the line and the message preview change on the first tap, the default screen is already bookable, and on the phone everything fits inside 844 px.
- The visible "ההודעה שתיפתח בוואטסאפ" bubble. It builds trust and nobody else does it.
- The deep-teal deck as a full-bleed set-piece, the fanned white cards on the laptop, and the clip that plays only on MAKING.
- The demo tile, the team row with bios opening in place (focus and Esc), the Instagram strip, the full-bleed workshop photo before the closing, the real footer, and a phone bar that hides over the footer.
- One family (Rubik), the airy 18–20 px body, and the consistent greens. The reduced-motion and JS-off versions stay complete.

## 4f ranking note

I scored this page alone (calm and unique series 2 were not part of this assignment), so there is no experience-only ranking here.
