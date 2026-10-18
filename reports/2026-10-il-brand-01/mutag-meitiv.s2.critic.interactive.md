```
mode: quick        round: 1 (series 2)        variant: interactive ("בחרו פורמט")
total: 72.4 / 80 (dimensions 1–7; dimension 8 is the visual critics')
result: pass on dimensions 1–7 (1, 3, 7 ≥ 6; no hard fail found by this review). The final result depends on dimension 8 from both visual critics.
hard_fails: []
```

Critic 0.4.3 · rubric 0.3.1 · 2026-10-18 · page `sites/mutag-meitiv/mockups/interactive/dist/index.html`, served over http on port 9742 (plain `python3 -m http.server`). Evidence is in the critic's scratchpad (`s2-critic-int/`): `audit.json` from a scratch copy of `tools/audit-mockup.mjs` (reads `copy/he.json`, port 9741, writes to the scratchpad, so the repo tool and the designer's `audit.json` are untouched), `checks.mjs` (JS-off, tap-through, keyboard, reduced motion, network after a full scroll), `contrast.mjs`, `vid.mjs`, `texts.json`, and `shots/` (`tools/shoot.mjs`, 13 desktop and 15 mobile viewport captures, not truncated, no console errors). Run decision: house rule 1 "Light themes" applies to surf sites only, and brief 6 allows the dark-green grounds. So `check-design`'s six dark-ground lines are not a fail.

| # | dimension | weight | score | points | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 9 | 18.0 | 240 text nodes compared with `copy/he.json`. 48 are not verbatim in it, and every one is either a template label or a reformatted value. Prices match `dossier.offers[].price_text` exactly: 580 ₪ + מע״מ לאדם (therapists' retreat), 480 ₪ + מע״מ (THE BETTER 4), 350 ₪ לאדם (Brand & Breakfast, no VAT, as in the dossier), 5,200 ₪ + מע״מ (BTC professionals), 3,200 ₪ + מע״מ (change-leaders course; "3200" in the dossier). Post dates 22.8.2026 and 28.5.2026 match `blog.posts[].published`. WhatsApp and phone are +972546686808 (`contact.whatsapp`/`phone`, brief 18). Email hadas@kapara.com, Calendly `https://calendly.com/hadas/30min` (`booking.engine_url`). The award (gold, nonprofits category, Bartali, 2022, Brand Academy) and the judges' text verbatim match `award.value` and link to brandawards.co.il. The three talks match `mockup_extras.series2_organisations.proof.talks`. "ההרשמה מלאה" matches `business-to-brand` status `full`. The demo case study is labelled "(דוגמה)" and "דוגמה". −1: the prices carry no capture date on the page (playbook §7). |
| 2 | mobile + performance | 15 | 10 | 15.0 | `audit.json` (390 px, throttled): first load 646 KB, 16 requests, one host, against a 1.5 MB budget. External JS 0 B (about 14 KB inline, inside the 172 KB HTML). Fonts: 1 family (Rubik), 44 KB. Largest image 79 KB. LCP 1,128 ms. CLS 0.0016. Scroll CLS early 0.0016 (`div.pbar`) and settled 0, both under 0.01. Scroll width 390 at 390 px. Phone page 11,431 px. Mobile captures 00–14 show no overflow, overlap or clipped text. The method deck's next card peeks at the edge of capture 04 on purpose (scroll-snap row with dots). |
| 3 | booking CTA | 15 | 9 | 13.5 | Primary class WhatsApp = `dossier/mutag-meitiv/audit.json` `recommended.primary_action`. Label "כתבו להדס בוואטסאפ" = `primary_label`. Above the fold at 390 (`primary_above_fold: true`), so 1 tap, which meets `clicks_to_book` 1. Every wa.me link is `https://wa.me/972546686808`, character for character, 16 visible. Tap-through at 390: hero before any chip → "היי הדס, אני פונה בשם ארגון…" (`path.ctaText`). After tapping "סדנה לצוות" the chip is `aria-pressed`, and the hero href changes to the therapists' retreat `ctaText`. Phone bar after scrolling to 3000 px → `path.ctaText`. With JS off, the hero WhatsApp link is still above the fold and carries `path.ctaText`. `tel:+972546686808` is present. −1: the generic message names Hadas but not the business or what the visitor chose (no format until a chip is tapped), and the "סדנה לצוות" chip sends a message about the day retreat for therapists, which a non-therapy team did not choose. |
| 4 | brand fit | 5 | 9 | 4.5 | Organisations lead, as brief 29 asks. The h1 is "מיתוג לעמותות ולארגונים שרוצים להטיב עם העולם". The first screen asks "מה תרצו להזמין?" with 4 formats. "מה ארגונים מזמינים" offers 4 tabs, each with price and CTA. The 4-stage method (brief 20) is a set-piece deck with photos and the MAKING clip. Proof sits beside the offers: award, three talks, the logo strip under her heading (D2), quotes. The individuals' offers (personal branding, open workshops, courses, all 9 secondary offers grouped, brief 19) are one tap away. Then the designed demo case study, team, podcast/blog, Instagram strip, closing with Calendly, footer. This matches the variant brief: interaction changes the photo, line and message. −1: personal branding, one of the two leading services (brief 12), now lives only in the secondary "גם לבעלי עסקים" block. That follows brief 29, but the human should see it. |
| 5 | copy | 10 | 8 | 8.0 | All business text is verbatim from `he.json` (passed at 4c). Hebrew only, `lang="he"`, no English pages. Testimonials stay in their original language (Julia Dojas). The template labels are plain and short ("מה תרצו להזמין?", "ההודעה שתיפתח בוואטסאפ:", "לא בטוחים מה מתאים לכם?"). −2: the chip label "סדנה לצוות" (team workshop) leads to a retreat for therapists, both in the tab body ("למשל ריטריט יום לאנשי.ות צוות בתחום הטיפול") and in the message, so the generic label promises more than the offer. The chip label "מיתוג וריברנד" stands for the service "תכנון אסטרטגי למותג", whose qualified name (direction: search words) does not appear on the chip. |
| 6 | accessibility | 8 | 8 | 6.4 | Skip link, `lang="he"`. 70 images: 0 without alt, 26 marked decorative. 74 tap targets, 0 under 44 px. Headings H1 → H2 → H3 in order. Keyboard: a 60-step Tab pass reaches nav, chips, the hero CTA, tabs, the deck (prev/next, stage and dot buttons), quotes and the team. Every stop shows a 3 px solid outline. Tabs move with ←/→ (`aria-selected` follows). A team bio opens on Enter with focus on "סגירה", and Esc returns focus to the opener, so no trap. Reduced motion: no animation running, the clip is never loaded, the photographs stay. Contrast on solid grounds is computed in `contrast.mjs`. The only real hit is the decorative "|" separator in the eyebrow, `#9AA7A3` on white at 2.49:1. The other hits are false positives where the photo is an `<img>` under a transparent header. −2: axe was not run (not installed, and the network was not opened for it). The white nav text over the four hero photographs could not be machine-checked; desktop-00 shows it readable over img-ig-01, and the other three chips' photos were not shot under the nav. |
| 7 | security + delivery | 7 | 10 | 7.0 | Static HTML/CSS/JS only. 0 third-party requests on load, and 0 after scrolling the whole page at 1440: the Instagram tiles, podcast art and post cover are self-hosted. The MAKING clip `video/s2i-making.webm` (200) loads only when MAKING is the front card, muted, looped, `playsinline`, with an `aria-label`. Fonts are self-hosted. No root-absolute or localhost URLs. No upper-case file names. No secrets, tokens or internal URLs. 0 embeds. |

**Total:** 18.0 + 15.0 + 13.5 + 4.5 + 8.0 + 6.4 + 7.0 = **72.4 / 80**.

## Budget table (playbook §4, measured)

| line | target | measured |
|---|---|---|
| first-load transfer | ≤ 1.5 MB | 646 KB |
| hero video | ≤ 2 MB mobile | none on the first screen; the MAKING clip is lazy (webm 0.86 MB, per notes) |
| JS compressed | ≤ 300 KB | 0 B external, about 14 KB inline |
| largest image | ≤ 300 KB | 79 KB |
| fonts | ≤ 2 families, ≤ 150 KB | 1 family, 44 KB |
| LCP | ≤ 2.5 s | 1.13 s |
| CLS | < 0.1 | 0.0016 (scroll early 0.0016, settled 0) |
| third-party on load | 0 | 0 |

## Default-look facts (`tools/check-design.mjs`, for the human)

The display, heading and body face is Rubik in all three roles. The ground is `#FFFFFF`. There are 0 all-caps labels and 0 of 44 headings carry a label. No caption, padded-box or upscaled-full-bleed line, and no default-look warning. Six "dark ground behind text" lines (method section `#0A5150`, demo tile and footer `#173B34`, at 1440 and 390) are waived by the run decision (brief 6).

## What the screenshots showed (deleted with the round)

- **desktop-00:** full-bleed stage photo of Hadas. A white booking card at the left with eyebrow, h1, the 2×2 format chips, the WhatsApp button and a message preview. Transparent nav, readable.
- **desktop-03 / -04:** the method deck on deep teal: fanned white cards, the SENSING card with a 4:5 workshop photo, stage pills and arrows.
- **desktop-05 / -06:** award plus judges' quote, talks with thumbnails, the logo strip with 15 marks in one ink and a pause control.
- **desktop-08:** the dark demo tile with the "דוגמה" badge and its four stage pills.
- **desktop-09:** the team row.
- **desktop-11 / -12:** the Instagram strip, then the full-bleed workshop group photograph and the closing line with WhatsApp and Calendly.
- **mobile-00:** 4:5 photo, the card overlapping it, the chips and a full-width button inside 844 px.
- **mobile-01 to -14:** the persistent bottom WhatsApp bar on every screen after the hero.

## Look loop

`notes.md` logs 3 first-screen rounds and 3 whole-page rounds, each with a visible change (card side, re-encode, eyebrow, decode-based swap, deck sizing, CLS fix, logo ink). Not hollow.

## The one sentence the human needs

Interactive scores 72.4/80 on dimensions 1–7. It loads 646 KB on the phone with a 1.13 s LCP, every WhatsApp link goes to +972546686808, and its "סדנה לצוות" chip opens a WhatsApp message about the day retreat for therapists.

**What the designer prompt got wrong:** the concept asks for a generic organisation chip ("סדנה לצוות") but maps it onto the one specific service in `path.services` (therapists-retreat). The designer prompt has no rule that a chip, tab or button label must name the offer its message and price belong to, so a generic label now carries a narrow offer's text. Proposal-ready wording: "A format or tab label must name the service whose `ctaText`, price and body it carries. If no such service exists, use the general `path.ctaText` and no price."

**Fix list (non-gating at quick, smallest first):**
1. (dim 6) Raise the eyebrow separator "|" to ≥ 3:1, or mark it `aria-hidden`.
2. (dim 1) Show the prices' capture date (or "מחירים נכון ל-10/2026") beside the tab and offer prices.
3. (dim 3/5) Make the "סדנה לצוות" chip honest. Either label it after the offer (e.g. "ריטריט יום לצוות") or give it `path.ctaText` with no therapist-specific price and line.
4. (dim 6) At station 5, run axe and check the white nav's contrast over all four chip photographs.
