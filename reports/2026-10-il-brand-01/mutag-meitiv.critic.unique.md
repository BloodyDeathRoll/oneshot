# Round 2

```
mode: quick        round: 2        variant: unique («מפת חזון»)
total: 70.8 / 80 (dimensions 1–7 weigh 80; dimension 8, weight 25, belongs to visual-critic + experience-critic)
result: pass (critic gates: no hard fail in dims 1–7; dims 1, 3, 7 ≥ 6) — dimension 8 pending
hard_fails: []
```

Build `bf13db636f540de7` (index.html 2026-10-18 14:38:58). The shared `shots/` were taken from that build at 14:39:21, so they were reused.

The designer's `audit.json` was saved to the scratchpad before the run and is byte-identical afterwards. `audit-mockup` ran from a scratchpad copy (he.json, port 8948, output in the scratchpad). `check-design` ran from a scratchpad copy (port 8953). The text, contrast, keyboard and JavaScript-off scripts were re-run on ports 8951/8952.

**Correction to round 1:** the rubric's weights for dimensions 1–7 sum to 80 (20+15+15+5+10+8+7), not 75. Round 1's total is **67.4 / 80**.

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | 130 text lines of ≥ 12 chars; 113 match he.json verbatim. The other 17 are interface labels, the same set as round 1, plus one excerpt line. The excerpt ("הדס, כל-כך נהנתי היום…") is a verbatim prefix of its testimonial. All 8 testimonials are present in full in the DOM (checked by HTML text extraction). The audit's 5 "numbers not in copy" are the same as round 1: formatted prices 5,200/3,200 and post dates 22.8/28.5/22.4.2026 = `posts[0..2].date`. Prices, VAT wording, WhatsApp/tel/email, award, BTC, team and Calendly unchanged and matching the dossier. The split offer titles keep their words in order: "THE BETTER 4 — Map your vision workshop" and "סדנת חזון לפורצי דרך" both match `services[].title` segments. The founder photo is now img-010 (business-owned). −1, still open: the award seal, BTC badge and 15 client logos have licence "unknown" and are waiting for Shahar's OK on third-party marks. |
| 2 | mobile + performance | 9 | First load 572,672 B (559 KB). HTML 156 KB, JS 0 external / 6.6 KB inline, fonts 126 KB (2 families), images 290 KB, largest 79,668 B. LCP **1,320 ms**: still under 2.5 s, but up from 736 ms in round 1. My run reproduces the designer's 1,328 ms, so it is not run-to-run noise as notes.md suggests (DCL is also up, 2,849 vs 2,620 ms). CLS 0.0019. Scroll CLS 0.0019 early / 0 settled (< 0.01). scrollWidth − innerWidth = 0 at 390 and 1440. Phone page 12,917 px (was 18,739). Body 18/27 px on phone, 22/33 on desktop. Mobile sheet (17 captures): no overflow or clipped text; the persistent bar is on every capture after the hero. Google Fonts is still on the first load (allowed at 4e). |
| 3 | booking CTA | 9 | `tapped` = `wa.me/972546686808?text=היי הדס, הגעתי מהאתר של מותג מיטיב.` `primary_above_fold: true`. 16 wa.me links on the page (12 distinct prefills), and every one uses number 972546686808. `tel:+972546686808` once. Calendly once, in the closing. With JavaScript off: 16 wa.me links, `#book` present, phone bar shown. 1 tap, class whatsapp = `recommended`. −1: not walked on a physical phone. |
| 4 | brand fit | 8 | Hierarchy as in round 1, with a full-width img-c02 opening the workshops and courses on a `#173B34` band (desktop-08/09). Concept 3's set-piece now ends with all four pieces inside the heart and a pill row of progress (desktop-04/05). `check-design` **fails**, by decision, with "dark ground behind text" on `section.courses` (L 0.04), `section.voices` (L 0.07) and `footer.foot` (L 0.04) at both widths. House rule 1 is scoped to surf businesses and brief item 6 keeps the greens, so this is reported as a fact, not scored against. Look: h1/h2 Frank Ruhl Libre, body Heebo, ground #FFFFFF, 0 all-caps labels, 0/43 labelled headings. −2, unchanged: no Open Graph tags, no Organization/LocalBusiness JSON-LD. |
| 5 | copy quality | 9 | Every content line still comes from he.json. Long testimonials (> ~180 chars) now show their own opening words, with the full text behind a `<button class="more" aria-expanded aria-controls>` "קראו עוד" (q1, q2, q4, q6, q7). The round-1 desktop wall of text is gone (desktop-11 shows one excerpt on the green band). Hebrew only; testimonials stay in their original language. |
| 6 | accessibility | 9 | The contrast fix is verified: 0 text elements below AA at 390 and 1440. Labels, roles and dates are `#00574C`; white text sits on the green bands. Focus is visible (3 px outline) on all 10 Tab stops at both widths. Alt: 43 images, 0 missing (2 decorative). 73 tap targets, 0 under 44 px. Skip link, `lang="he"`, `dir="rtl"`, headings in order. Reduced motion: the board shows full and a photograph is visible. The `:target` sheet keeps Tab inside and Esc closes it. −1: axe not run (quick mode), and I did not measure the white focus ring on the green grounds separately. |
| 7 | security + delivery | 8 | Unchanged: static HTML + `img/` + `video/`, relative URLs, lowercase filenames, inline JS with no fetches, no embeds, no secrets. −2: Google Fonts on load (4e only), and `dist/video` is still a symlink into `~/.oneshot/assets` that the deploy or zip must dereference. |

**Totals:** 18 + 13.5 + 13.5 + 4 + 9 + 7.2 + 5.6 = **70.8 / 80** (round 1: 67.4 / 80).

**The one sentence the human needs:** unique round 2 is 559 KB on first load, with LCP 1.32 s (up from 0.74 s in round 1, reproduced). The coral small-text contrast failures are fixed. The award seal, BTC badge and client logos (licence "unknown") are still waiting for your OK. `check-design` fails only on the three deep-green grounds you allowed.

**Fix list (not failing), smallest first:**
1. Add Open Graph title, description and image, and Organization JSON-LD from dossier facts. (dim 4)
2. Find the LCP regression from 736 to 1,320 ms: check which element is now the LCP and whether moving the logo masks to the end of the HTML delays it. (dim 2)
3. At build: self-host the fonts and dereference the `dist/video` symlink. (dims 2, 7)
4. Get Shahar's decision on the third-party marks; the fallback is a text strip for the award. (dim 1)

---

# Round 1

```
mode: quick        round: 1        variant: unique («מפת חזון»)
total: 67.4 / 80 (corrected in round 2; first written as "/ 75". Dimensions 1–7; dimension 8 belongs to visual-critic + experience-critic)
result: pass (critic gates: no hard fail in dims 1–7; dims 1, 3, 7 ≥ 6) — dimension 8 pending
hard_fails: []
```

Critic 0.4.3, rubric 0.3.1. Run 2026-10-il-brand-01 (Hebrew only, RTL, inbound). Page `sites/mutag-meitiv/mockups/unique/dist/index.html`, build `70c85d3877b9567a` (index.html 2026-10-18 14:14:01; the shared `shots/` were taken from that same build at 14:14:25, so they were reused).

Method: `tools/audit-mockup.mjs` run from a scratchpad copy. The only changes were `copy/en.json` → `copy/he.json`, port 8947, and audit.json written to the scratchpad, so the designer's `audit.json` is untouched. `tools/check-design.mjs` was run from a scratchpad copy on port 8953. Two scratchpad Playwright scripts (ports 8951/8952) did three things: compared the page's text with he.json, computed contrast and ran a keyboard pass at 390 and 1440, and checked the page with JavaScript off. The repo tools and the site were not edited.

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | 139 distinct text lines of ≥ 12 chars at 1440. 122 match `copy/he.json` verbatim. The other 17 are interface labels ("טוען את הלוח…", "מאמרים אחרונים", "תמונה לדוגמה", "+ מע"מ · למשתתף", "מלא · ההרשמה סגורה", "© 2026 מותג מיטיב"), plus two lines that do match the copy and only failed the check on line breaks: H1 "הי, הגעת / למקום מיטיב!" is two `.strip` spans, and the footer credit matches he.json and `dossier.footer`. The audit's facts pass flagged 5 numbers outside the copy: "5,200" and "3,200" (formatted copies of 5200/3200) and 22.8.2026, 28.5.2026, 22.4.2026 (`posts[0..2].date` 2026-08-22/05-28/04-22, formatted). Against the dossier: prices 580 / 480 / 350 / 0 (חינם) / 5,200 / 3,200 ₪ = `offers[].price`. "+ מע"מ" appears only on the four offers whose dossier `price_text` says it. Brand & Breakfast 350 has no VAT wording (correct). WhatsApp/tel `+972546686808` = `contact.whatsapp`/`phone`. Email hadas@kapara.com = `contact.email`. Award "פרס המיתוג הישראלי 2022 — זהב, קטגוריית עמותות · Brand Academy · ברטלי" = `award` (gold, nonprofits, Bartali), linked to brandawards.co.il. BTC line "…היחידה מישראל ברשימת המנחים המוסמכים" = `credentials[0]` + skeptic C-players-07 (sources.md l.184). "9 מפגשים: 8 קבוצתיים ומפגש אישי אחד על אחד" = `offers[business-to-brand].meetings`. Team: 5 names and roles = `dossier.team`. Calendly = `booking.engine_url`. The demo case study is badged "דוגמה" on the tile and the sheet ("מקרה בוחן לדוגמה, לא פרויקט אמיתי"). −1: the award seal (img-040), BTC badge (img-041) and 15 client logos (img-044…058) carry licence "unknown". They are used "as on the current site" on the orchestrator's default, but concepts.md's shared rule says "Seals and logos only after Shahar's OK on third-party marks". Not a hard fail: they are not presented as the business's own images. They are an open human decision. |
| 2 | mobile + performance | 9 | Measured with audit-mockup (390×844, 1.6 Mbps / 150 ms / 4x CPU, no scroll). First load 548,308 B (535 KB ≤ 1.5 MB). HTML 146 KB (it includes the two inlined logo masks). JS 0 external, 6.4 KB inline. Fonts 126 KB, 2 families (Frank Ruhl Libre, Heebo) ≤ 150 KB. Images 266 KB, largest 79,668 B ≤ 300 KB. LCP 736 ms ≤ 2.5 s. CLS 0.0019. Scroll CLS early 0.0019 / settled 0, both under 0.01; the one early shift (0.0011 at 1,486 ms) comes from `a.btn.btn-wa`. DCL 2,620 ms. Video after first paint: table-464.webm 1,519,375 B / mp4 1,442,922 B, leaves-560 1.32 / 1.36 MB, all ≤ 2 MB. `documentElement.scrollWidth − innerWidth` = 0 at 390 and 1440. Mobile body 18 px / 27 px (1.5), desktop 22/33. Mobile sheet (25 captures): no overflow, overlap or clipped text. The persistent bar shows on every capture after the hero. −1: Google Fonts is on the first load (2 third-party hosts). That is allowed at 4e and must be self-hosted at build. |
| 3 | booking CTA | 9 | audit `booking.tapped` on the 390 viewport = `https://wa.me/972546686808?text=היי הדס, הגעתי מהאתר של מותג מיטיב.` The number matches `contact.whatsapp` character for character and the prefill names the business. `primary_above_fold: true` (hero `.btn-wa` in mobile-00, plus the header WhatsApp icon). 16 wa.me links in total, all with the same number. Each offer card carries its own `services[].ctaText`: I decoded all 13 and each names its offer, e.g. "…על הזמנת ההרצאה BRANDS OF CHANGE", and for the closed course "…ההרשמה ל״מעסק למותג מיטיב״ נסגרה…". `tel:+972546686808` appears once. Calendly appears once, in the closing (N9). 1 tap from any screen (`recommended.clicks_to_book: 1`, class whatsapp = `recommended.primary_action`). With JavaScript off: 16 wa.me links present, `#book` exists, the phone bar renders. −1: the hand-off into the WhatsApp app or Web was not walked on a physical phone; the evidence is the headless click landing. |
| 4 | brand fit | 8 | The hierarchy follows the concept's "workshop table" and playbook §3 adapted to the vertical: first screen (what plus WhatsApp, mobile-00 fits the heart board, award, H1 strips, tagline and button in 844 px) → the 2 lead services → motto → method set-piece (4 stages, SENSING/THINKING/MAKING/INFLUENCING, 1/4…4/4) → proof (award, BTC, logos) → talks/workshops and courses (all 9 secondary offers, prices where published) → demo case → testimonials → team (5) → ON AIR podcast → 3 posts → Instagram strip (6) → closing on img-c05 → footer. Menu has 6 items named by service ("מיתוג אישי לעסק", "תכנון אסטרטגי למותג"…), as direction #5 asks. The variant matches concept 3's one idea (the heart board in the hero, filled per stage). The 9 deviations are documented in notes.md "conflicts" (e.g. a light footer instead of `#173B34`, img-ig-01 for INFLUENCING). `check-design` look: h1/h2 Frank Ruhl Libre, body Heebo, ground #FFFFFF, 0 all-caps labels, 0/43 labelled headings, 0 problems, 0 warnings. −2: no Open Graph tags (`og: []`) and no `LocalBusiness`/Organization JSON-LD (playbook §10). The title and meta description are present, in Hebrew. |
| 5 | copy quality | 8 | Every business sentence is read from the 4c-passed `copy/he.json` (122/122 content lines verbatim). The page is Hebrew-only (`run.yaml languages: [he]`). Testimonials stay in their original language (Julia Dojas is in English, per brief 16). −2: on desktop, רננה אורלב's quote (desktop-10) is shown in full as a ~10-line block. The phone clamps it to 9 lines with "קראו עוד"; desktop does not. Against brief 8 ("not too compressed") this is the one wall of text left on the page. |
| 6 | accessibility | 6 | audit a11y: 42 images, 0 without alt (1 marked empty-alt decorative); 68 tap targets, 0 under 44 px (the designer's open "אודות 38×44 / תוכן 29×44" item now measures clean); skip link present; `lang="he"`, `dir="rtl"`. Headings run H1 → H2/H3 with no level skipped. Keyboard: 10 Tabs at 390 and 1440 each showed a visible 3 px outline. The `:target` case-study sheet takes focus, keeps Tab inside, closes on Esc, and returns focus to the opener (code read and confirmed by the Esc handler). Reduced motion: no video sources are attached, the board is shown full, and a photograph is visible. Contrast is below AA: `--coral-d #F27E66` text measures 2.64:1 on #FFFFFF and 2.49:1 on #F6F9F7 for `.lead-n` ("01/02", 15 px), `.stage-label` ("SENSING 1/4"…, 15 px), `.member-role` (team roles, 15 px) and `.post time` (dates, 14 px). The same coral focus ring is 2.6:1, under the 3:1 non-text minimum (WCAG 1.4.11). The hero `<video>` has no own `aria-label`; its parent `.piece` is `aria-hidden`, which is acceptable as decoration. axe not run (quick mode). |
| 7 | security + delivery | 8 | One static `index.html` plus `img/` (40 webp files, lowercase names) and `video/`. Inline JS (44 B + 6.4 KB) makes no fetch calls and has no runtime CMS dependency. All src/href values are relative (0 root-absolute). No embeds: podcast, blog and Instagram are plain links out. No secrets; the email is the public footer address. −2: Google Fonts is a third-party request on load (allowed at 4e only). `dist/video` is a symlink to `~/.oneshot/assets/…/video`, so a zip or `wrangler deploy` must dereference it or the two clips 404. |

**Totals:** 18 + 13.5 + 13.5 + 4 + 8 + 4.8 + 5.6 = **67.4 / 80** (written as "/ 75" in round 1; corrected).

### Budget table (playbook §4, measured)

| Item | Target | Measured |
|---|---|---|
| First-load transfer | ≤ 1.5 MB | 535 KB |
| Hero video after first paint | ≤ 2 MB mobile | webm 1.52 MB / mp4 1.44 MB |
| JS | ≤ 300 KB | 6.4 KB inline |
| Largest above-fold image | ≤ 300 KB | 78 KB |
| Fonts | ≤ 2 families, ≤ 150 KB | 2 families, 123 KB |
| LCP | ≤ 2.5 s | 736 ms |
| CLS | < 0.1 | 0.0019 (scroll: 0.0019 early / 0 settled) |
| Third-party on load | 0 | 2 hosts (fonts.googleapis.com, fonts.gstatic.com), allowed at 4e |

**Network, first load:** 14 requests; hosts localhost, fonts.googleapis.com, fonts.gstatic.com. No video on the first load: the hero `<video>` is `preload="none"` with sources attached on `load` + rAF + 60 ms, and none under reduced motion or Save-Data. The MAKING clip is attached only while stage 3 is active.

**Screenshots cited** (shared `shots/`, deleted after the round):
- mobile-00: hero, with the heart board (Hadas, the table clip poster, the award seal and its label), the green H1 strips, the tagline and the coral WhatsApp button, all inside 844 px.
- mobile-06/07: the set-piece pieces straight above each stage's text.
- desktop-04/05: the sticky heart board filling as the stages scroll.
- desktop-10: the full-length Renana testimonial.
- desktop-11: the slideshow dots, then about 200 px of empty space before "צוות עם משמעות".
- mobile-sheet: the persistent bar is on every capture after the hero; no overflow anywhere.

**Look-log:** 5 first-screen rounds plus 3 whole-page rounds, each with a recorded change and an old-site comparison, so it is not a hollow loop. It deviates from base by drafting the whole page before round 1, and notes.md says so.

**The one sentence the human needs:** unique is 535 KB on first load with LCP 736 ms and no measured layout shift. All 16 WhatsApp links use the dossier number, each offer with its own message. The award seal, the BTC badge and 15 client logos (licence "unknown") appear only on the orchestrator's default and are waiting for your OK on third-party marks. Four 14–15 px coral text styles are below AA contrast (2.5–2.6:1).

**What the designer prompt got wrong:** The designer took the concept's booking colour `#F6927C`, which the concept only checked as a fill with a deep-green label (5.4:1), and also used its darker shade `#F27E66` as a *text* colour for small labels (stage labels, service numbers, team roles, post dates) and as the focus ring. Neither use is checked anywhere in the designer's self-check, so the page ships 2.5:1 text. The designer base needs one line saying that any accent used as text under 18.66 px bold / 24 px is measured against its actual ground at ≥ 4.5:1, and that focus rings are measured at ≥ 3:1, before hand-off.

**Fix list (not failing; for the next pass or the build):**
1. Darken the coral used as text and as the focus ring (for example `--coral-d` → a shade ≥ 4.5:1 on #FFFFFF and #F6F9F7), or set those labels in `--green`. (dim 6)
2. Clamp long testimonials on desktop as the phone does, and drop the extra empty space under the slideshow dots (desktop-11). (dim 5)
3. Add Open Graph title, description and image, and Organization/LocalBusiness JSON-LD from dossier facts only. (dim 4)
4. At build: self-host the two font families (subset Hebrew + Basic Latin), and make the deploy step dereference the `dist/video` symlink. (dims 2, 7)
5. Get Shahar's decision on the third-party marks (award seal, BTC badge, client logos). If he says no, use the concept's text-strip fallback "פרס המיתוג הישראלי 2022 — זהב". (dim 1)

**Tool gaps (facts, not page flaws):**
- `tools/audit-mockup.mjs` hard-codes `copy/en.json` and crashes on a Hebrew-only run. It also uses fixed ports.
- Its `no_js.booking_links_reachable` counts only `#book` (it reports 2), although 16 wa.me links are present with JavaScript off.
