# mutag-meitiv · interactive · "ארבע הטבעות" (Four rings) — station 4e notes

Designer 0.5.2 · run 2026-10-il-brand-01 · 2026-10-18. Hebrew only, `lang="he" dir="rtl"`.

Files: `dist/index.html` (one page: CSS and JS inline; since round 2 of 4f the fonts are served as files from `dist/fonts/`, the header logo is inlined) · `dist/img/*.webp`, `dist/video/table-464.{webm,mp4}`, `dist/fonts/*.woff2` (all written by `src/make-media.sh`, header `# media:`) · `src/build.py` builds the page from `src/page.html` + `src/more.css` + `src/more.js` + `src/icons.svg` and the audited copy `sites/mutag-meitiv/copy/he.json` (every business word comes from he.json verbatim). Rebuild: `bash src/make-media.sh && python3 src/build.py` (after `tools/link-assets.sh mutag-meitiv`).

## look-log

Old site beside every round: `dossier/mutag-meitiv/assets/old-site-desktop.png` / `old-site-mobile.png` (boxed green panel in a 950 px column, circle photo, four unexplained badges, no labelled action, 14 px text, underlined card titles).

**First screen, round 1.** Header + hero only: sage ground, Playpen title at the start (right), four thin rings at the end with img-001 in the centre disc and vid-004 as a satellite circle; Latin stage labels on the outer arc. Wrong as design: the satellite sat on top of INFLUENCING, the bottom label read upside-down, the disc showed the grey band at the foot of img-001, the wordmark was too small to read and the tagline broke "עם / משמעות." on its own. Better than the old site already (one labelled WhatsApp button, air, readable type), but the rings looked unfinished. Change: labels to the upper arc, clip orbiting with them, tighter crop.

**First screen, round 2.** Labels moved to the top arc in RTL order (SENSING at the right → INFLUENCING at the left), each with a lit dot; the clip now rides the lit ring at 7 o'clock and orbits with the labels (counter-rotated so the footage stays upright; ~30°/screen, counter-clockwise = forward in RTL); disc re-cropped above the band; eyebrow "הדס דרכלי · מותג מיטיב" added so the face has a name. Wrong: the ring field was flat (four lines on sage, no depth), the header logo still small, title wrapped unevenly. Clearly better than the old site at a glance: Hadas larger and inside the method, the workshop moving beside her, one button.

**First screen, round 3.** Two pale-green filled discs behind the inner rings give the device depth and bring the brand green into the picture; logo enlarged (icon 42 px, wordmark 50 px); title balanced to "הי, הגעת / למקום מיטיב!"; the columns pulled closer (max 1200 px). Phone: rings 340 px, title, tagline, button all inside 844 px. This is the round the rest of the page was built on.

**Whole page, round 1.** Built every section. The sheets showed: the offers header left a large empty hole between the tabs and the group intro; the testimonial slideshow stretched every card to the tallest quote (huge white cards round a two-line quote), and its dot state was wrong in RTL; format chips were invisible inside the sage service cards; the dark footer failed `check-design` (dark ground behind text, 1440 and 390); mobile service tabs wrapped onto two lines; `audit-mockup` showed an early-scroll CLS of 0.042 (font swap in the hero, lazy logos without width, the slideshow resizing).

**Whole page, round 2.** Group intros moved into the offers header beside the photo + clip; the slideshow got its own height per quote and a dot state taken from the scroll position; chips white on sage; footer light sage with deep-green type, deep green kept only on the credits strip; logos carry their aspect ratio; fonts self-hosted (then inlined) so nothing swaps late. Wrong still: mobile hero CTA touched the section edge (a `.wrap` shorthand had wiped the hero's bottom padding), mobile tabs wrapped, dots 28 px wide.

**Whole page, round 3 (last).** Padding restored, tabs `nowrap` at 15 px, dots 44 × 44 on phone (arrows hidden there, swipe + dots), logo link 48 px tall, footer links 44 px, desktop nav `nowrap`. Looked at the last sheets for overflow, overlap and unreadable text at 1440 and 390: none (scroll width = viewport at both). **Against the old site:** the old first screen is a cramped boxed panel with badges and no labelled action; this one is an airy sage page where the visitor sees Hadas inside the four rings of her own method, the workshop table moving on the orbit, and one deep-green "כתבו להדס בוואטסאפ" button, with a persistent WhatsApp bar on the phone. Below, the old page's identical green boxes and 14 px text become distinct sections: two large service cards with their own WhatsApp line, a quote slideshow, proof cards and a moving logo strip, a scroll-lit method ring, tabbed offers with accordions and per-offer WhatsApp, the demo case study, the team with tap-to-open bios, podcast, blog, the Instagram strip and a real footer. It wins clearly on both the first screen and the whole page.

**4f round 1 → redesign round (2026-10-18, after visual 7/10, experience 7/10, critic 63.1/75; coordinator: house rule 1 is scoped to surf businesses, brief item 6 wins).** Sheets showed the page as pale mint throughout, the same rounded card in every section, a white band under the desktop hero, a 90 px clip on the phone, the method as four screens of text with no photos on the phone, a 9–16-line testimonial wall, an empty hatched case-study box, text-only blog cards, grey-boxed JPG logos and two WhatsApp buttons on every phone screen. Changed, biggest effect first: the method is a full-bleed deep-green (`#0A5150`) panel with white type, white rings lighting in `#35C68B`, one paragraph per stage + "עוד"; on the phone each stage card has a 220 px ring device with its photo in the centre whose rings fill one by one as the card enters; the footer is the concept's deep `#173B34` panel; a new full-bleed moment (img-034 at 2000 px beside the motto on `#173B34`) opens the about/team part; the hero ends at the fold, the ring device is 620 px on a 1440 laptop (min 520), the clip satellite 180 px desktop / 150 px phone, the orbit makes a 0.5 s counter-clockwise load-in turn, the logo is inlined so it paints with the HTML, and the two lead services are named on the first screen as two pills; the award and credential now sit above the testimonials; quotes are clamped to 6 lines with "להמשך הציטוט"; the demo case study has a designed cover (the four lit rings on deep green) and one "דוגמה" badge; blog cards carry branded ring covers; client logos are one deep-green ink with no boxes (recipe); offer rows line up; team bios open as a full-width row; the header WhatsApp pill fades out on the phone while the bottom bar shows; the menu closes on scroll; the default WhatsApp line names מותג מיטיב; the stage labels and ON AIR eyebrow pass contrast (`#35C68B` now only for rings and dots); every link is ≥ 44 px wide. Against the old site: now the deep greens carry three big moments (method, photo + motto, footer) as they do on mutagmeitiv.com, but in an airy, readable page with one clear action; it is better on both the first screen and the whole page.

Interaction checked in a browser (Playwright, 1440 and 390): hero clip plays muted after load (webm chosen); orbit turns on scroll; services tabs switch on phone; quote arrows/dots/swipe move one quote at a time; offer tabs + accordions open with the offer's own `ctaText` WhatsApp link; team bios open in place (Esc closes, focus returns); logo strip pauses on hover/focus and with its button; phone bar appears once the hero button has scrolled away. Reduced motion: rings static with every label shown, method shows all four rings lit, marquee becomes a wrapped grid, clip shows its poster. JS off: both service panels, both offer groups, open accordions, quotes as a swipe row, poster, phone bar visible; every action is a plain link.

## measured (tools/audit-mockup.mjs logic, last run after the redesign round)

`audit-mockup.mjs` hard-codes `copy/en.json`, which a Hebrew-only site does not have; it was run from a scratch copy that reads `copy/he.json` instead (tool gap, reported). Results in `audit.json`:

| line | measured |
|---|---|
| first load, no scroll | 1,437 KB incl. the ~0.8 MB satellite clip started after load → ~0.63 MB without video |
| hero clip | webm 0.80 MB, mp4 fallback 1.01 MB (both under the 2 MB phone cap) |
| JS | inline, ~12 KB uncompressed |
| fonts | 2 families, 135 KB, as files with `font-display: swap`, Hebrew subsets preloaded |
| LCP (throttled phone) | 2.35 s |
| CLS | 0 · scroll early 0.0018 · settled 0 |
| third-party requests on load | 0 |
| no-JS booking links in #book | 2 |
| alt missing | 0 · tap targets under 44 px: 0 after the last fix (footer links widened) |

`tools/check-design.mjs interactive`: **FAIL by decision** — 7 "dark ground behind text" lines (the method panel, the photo + motto moment, the case-study cover on phone, the footer). The coordinator ruled house rule 1 is scoped to surf businesses and brief item 6 (the client's deep greens) wins; the tool does not know the scope. No other problem, no default-look warning. `tools/check-places.mjs mutag-meitiv`: ok.

Opening `dist/index.html` from `file://` logs two CORS errors for the preloaded fonts (Chrome refuses `crossorigin` preloads from `file://`); the fonts still load and render. Over http (how the critics serve `dist/`) there are no console errors or warnings.

Booking: every WhatsApp link is `https://wa.me/972546686808?text=…` built from `contact.whatsapp` "+972546686808" (dossier `contact`, brief 18: 054-668-6808); hero/header/bar/closing/footer use the default line "היי הדס, הגעתי מהאתר של מותג מיטיב ואשמח לשמוע עוד.", each service and offer uses its own `ctaText`. Calendly `https://calendly.com/hadas/30min` (`bookingLinks[0]`) only in the closing (N9: the free Zoom call is named once on that screen, by `closing`; the button says "לקביעת שיחה ביומן"). Phone `tel:+972546686808`, mail `hadas@kapara.com`. Tapped through on a 390 px viewport.

## images

All business-owned unless stated (dossier `images[].license`).

| file | asset | use |
|---|---|---|
| hadas-disc | img-001 (713×672, crop 540²) | hero centre disc, ≤ 300 CSS px |
| table-poster + video/table-464 | vid-004 (client clip, 464×832; cut 2–14 s, 464² crop, muted) | hero satellite + offers satellite, ≤ 180 CSS px |
| svc-personal | img-003 | personal-branding card |
| svc-strategic | img-012 | strategic-planning card |
| st-sensing / st-thinking / st-making / st-influencing | img-006 / img-032 / img-c03 / img-033 | method stage circles, 1:1 |
| women-boards | img-c05 (client) | offers header, 4:3 |
| team-hadas | img-013 (1728×2000, 4:5 crop) | founder card |
| wide-hadas-2000 / -1200 | img-034 (2000×1190, the best photograph) | the full-bleed photo + motto moment |
| team-tamar / -yael / -dana / -lior | img-036 / 037 / 038 / 039 | team grid, 4:5 |
| award-seal, btc-seal | img-040, img-041 — **"unknown" (third-party marks)**, shown as on the client's site (default decided by the orchestrator) | proof cards |
| logo-044 … logo-058 | img-044 … 058 — **"unknown" (client logos)**, shown as on the client's site; recipe turns each into one deep-green ink on transparent (logos drawn inside their own dark box are knocked out to their letters), never redrawn | logo strip |
| ig-03, ig-01, ig-02, ig-09, ig-08, ig-11 | img-ig-* (business Instagram), square crops; **img-ig-06 left out** | Instagram strip, each linked to its post |
| icon-green, wordmark-green, icon-white | logo-icon.png, logo-wordmark.png: the same shapes filled with #00574C / #0A5150, and the white original (never redrawn) | header (inlined), footer, ring centres, blog covers |

Not used: img-015 (stock), img-022/023/029 (unknown), other selfies, img-028/031 (screenshots), vid-001/002/003, the blog covers (remote Wix URLs, one of the three newest is Unsplash via Wix; not in the dossier assets and not harvested here — the designer may not harvest; the cards carry branded ring covers instead).

## gaps

- **No real case study.** The demo (`caseStudies[0]`, `demo: true`) is a card with one "דוגמה" badge and a designed cover (the four lit rings on deep green) instead of the empty frame (redesign round, per 4f); no workshop photograph is used on it, so no real project is implied for the invented café. The demo page `/work/demo-shorashim` and the template page `/work/template` are 4g pages; the card links to its own section at 4e.
- **No newsletter URL** → no newsletter block. The PDF guide (`downloads[0]`) is a footer link.
- **No rating** anywhere (none exists).
- **Blog covers** not in the dossier assets → branded ring covers (three greens, the icon) above date, title, excerpt. If the harvester fetches the business-owned Wix covers, they replace the tiles.
- **Service pages** (/personal-branding, /strategic-planning, offers, about, accessibility statement) are 4g; at 4e the menu and "לפרטים" go to the home sections. The accessibility statement is in he.json (`legal`) and has its footer link.
- No dates on any secondary offer → cards show price/format/status only.

## conflicts

None blocking. Deviations from the concept or the layers, each with why:

1. **Deep-green grounds vs `check-design`.** Round 1 had a light footer to pass the dark-ground check. After 4f the coordinator ruled house rule 1 applies to surf businesses only; the method panel, the photo + motto moment and the footer are now deep green, and `check-design` reports them (decided, not a flaw).
2. **Testimonials placement.** Concept: one quote inside each service panel + a later "מיטיבים מספרים.ות" slideshow. The four `beside_lead_services` quotes are long (up to ~700 chars) and would swamp two cards; done: one slideshow after the services and the award/credential row (redesign round), each quote clamped to 6 lines with "להמשך הציטוט", in the placement order (אנווה, Julia, Linda long, רננה), then יובל and Linda short (Linda's two quotes are slides 3 and 6, never adjacent). איה and קרן sit inside the Brand & Breakfast accordion.
3. **Method photos.** Concept: img-003, img-012, img-c03, img-011. img-003 and img-012 are already the two service photographs and img-011's square crop leaves Hadas a speck in a corner; done: img-006 (sticky-note canvas), img-032 (the card deck), img-c03, img-033 (Hadas at Brand Manager Day). Same 1:1 circle for all four.
4. **Founder card photo.** Team row says `dossier:img-001`; img-001 is already the hero disc, so the founder card uses img-013 (Hadas in the pine forest, green shirt), and img-034 carries the full-bleed moment.
5. **Fonts** self-hosted as files (not Google Fonts), `swap`, Hebrew subsets preloaded; LCP 2.35 s. The hero's text and ring device are placed by grid areas so a late font or a streamed chunk never moves them (scroll CLS 0.0018).
6. **Playpen Sans Hebrew is confirmed on Google Fonts** (Hebrew subset served) and used at 600. It draws צ in its cursive form, which looks like a "3" to a non-Hebrew eye ("הרצאות", "צוות", "יוצרים"); Hebrew readers read cursive צ as written. Flagged for the human; the concept's fallback, Gveret Levin, is also on Google Fonts (checked) if the human prefers a print-style hand.
7. **Hero eyebrow** "הדס דרכלי · מותג מיטיב" added above the title (names from `team[0].name` and `businessName`), and the two lead services as two small links under the tagline (their `title`s; brief 12, critic dim 4); then the one WhatsApp button.
8. Footer headings: only "פה יוצרים קשר" (a he.json copyBlock heading); the old-site headings were dropped. Section titles "הרצאות, סדנאות וקורסים", "מקרה בוחן", "מאמרים אחרונים", "באינסטגרם" and buttons ("לפרטים", "עוד עליה", "לקביעת שיחה ביומן", "ההרשמה מלאה", "חינם") are template labels; no copy field exists for them.
9. **Tooling, not the page:** `tools/audit-mockup.mjs` requires `copy/en.json` (run from a scratch copy reading he.json); `tools/link-assets.sh mutag-meitiv` also moved the calm and unique `dist/video` folders into the asset store and linked them (that is what the tool does for every mockup of the slug).

## divergence from the other two mockups of this business (hard constraint 5)

Calm opens on a full green split panel with img-034 and a curved corner, Heebo only, mint button; unique opens on a white page with a heart-shaped vision board (img-013 + clip + award sticker), Frank Ruhl Libre title strips, salmon button. This one opens on a sage-white ground with the four method rings, img-001 in the centre disc and the workshop clip orbiting, Playpen handwriting titles + Assistant, a deep-green button; its interaction (orbiting labels, scroll-lit method ring, tabs, accordions, quote slideshow, logo marquee, tap-open bios) is its own. A visitor would not mistake any two of the three.
