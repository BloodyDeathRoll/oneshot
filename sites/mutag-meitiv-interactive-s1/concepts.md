# concepts.md — מותג מיטיב (mutag-meitiv), station 4d

Creative-director 0.4.2 · run 2026-10-il-brand-01 (inbound, `market: il`, `vertical: brand_design`, `he` only, RTL) · 2026-10-18.
Inputs read: runtime prompt (all layers), `brief/mutag-meitiv/brief.md` (1–28), `dossier/mutag-meitiv/direction.md`, `dossier.json`, `audit.md` / `audit.json.recommended`, `sites/mutag-meitiv/copy/he.json` + `review.md` (N1, N9), `industry/lane-sites.md` (C-sites-01…22), `proposals/2026-10-il-brand-01/001-vertical-brand_design.md` (draft references), `agents/designer/references.md` (in full), `agents/designer/custom.md`, `agents/designer/gold/global-surf-notes.md`, the Global Surf v2 live page (bottom sections, 1440 and 390 px), `old-site-desktop.png` / `old-site-mobile.png`, every image in `dossier.images[]` (contact sheets) and the frame sheets of vid-002 and vid-004.

**How the surf layers apply here.** Playbook, base and calibration were written for surf. Taken as written: the quality bar (the Global Surf mockups; the current site is the floor), one primary action on the first screen and in a persistent bar, a short hero (title + one short CTA), no lines or underlined links, Instagram strip, a real footer, slideshows with dots, the performance budget, facts only from the dossier. Not taken: orange, handwritten Latin scripts, a surf video hero, "light themes for every surf business". In their place: the client's greens and icon (brief 6), Hebrew-designed type (direction 9), RTL with mirrored motion (C-sites-11), and no full-width video, because the only clips are vertical phone clips (`gaps.videos.landscape_hero`).

---

## 1. What this business actually is

- **One woman's practice that works at a table.** Hadas Drachli (`business.founder`) works in her photos the same way every time: on a large paper canvas, a deck of cards or a magazine collage, often shot from above. She stands by it and talks, or people bend over it. The material is a working table, not a studio portfolio (img-003, 005, 007, 012, 027, 030, c02, c03, vid-004).
- **Its method has a physical object.** The four stages (SENSING, THINKING, MAKING, INFLUENCING, `method.stages[]`, brief 20) come from Brand the Change. That method's canvas is a set of concentric rings ("WHO ARE YOU?", img-003, img-001, img-006, img-020, img-034). Hadas is the only certified trainer listed for Israel (`credentials[]`).
- **The brand icon is a heart drawn as an "m"** (`logo-icon`, white PNG only). Her own vision-map template is a heart too (img-028 / img-031). The heart shape is hers twice over: once as the logo, once as a tool she hands to participants.
- **No case study yet, but there is an award.** The proof is an Israel Brand Award 2022 (gold, nonprofits, for ברטלי), 15 client logos, 8 testimonials (3 of them in English) and one demo case study labelled דוגמה (`caseStudies[0].demo`). There is no real project page (`gaps.case_studies`).

## 2. What the material can and cannot carry

### Video, the business's own (`dossier.videos[]`)

| id | what | length · size | use |
|---|---|---|---|
| **vid-004** (client, hero rank 2) | overhead workshop table: collage boards, magazine cut-outs, scissors, markers, greenery, hands at work; one participant in the first second | 16.6 s · 464×832 vertical · d1920 webm 1.40 MB / mp4 2.39 MB · poster at 3 s | **The clip for every concept.** Best moments: **2–6 s** (the white collage board with faces, cut-outs and scissors; hands come in), **7–11 s** (the camera moves along the table: pens, the cards box, the yellow pad), **12–14 s** (watercolours, the open pencil box, greenery). Cut 2–14 s (the dossier's `cut`). |
| **vid-002** (hero rank 1) | gift-wrapping in banana leaves at the המעיין festival station | 89.8 s · 720×1280 vertical · webm 2.0 MB / mp4 3.39 MB | **44–56 s** only: hands, leaves, twine on a wooden drum table, no face. Second clip for the MAKING stage (concept 3) or the workshops section. The person is a participant, not Hadas. Never present it as her. |
| vid-003 | vision-map workshop with a burned-in yellow caption on every frame | 29 s · 720×1280 | Not used: the caption is burned in and the camera moves all the time. |
| vid-001 | 6.7 s, 480×600, at a third-party shop (Tony's) | — | Not used: too short, too small, a third party's shop. |

**What the video can and cannot do.** Both usable clips are vertical. At most they are 464 or 720 px wide, so they **cannot be full-bleed**. They also cannot fill a phone width: at 390 CSS px on a 2× screen, 464 px would be upscaled. The largest honest frame is about **232 CSS px wide for vid-004** and **360 CSS px for vid-002**, either as a portrait tile or a circle. Two concepts open on vid-004 that way (2 and 3). Concept 1 explains why it doesn't. Renditions: the mp4 of vid-004 is 2.39 MB, over the 2 MB mobile cap. The webm (1.40 MB) is the phone source. The designer adds an m720 mp4 tier for the fallback, or the poster stays.

### Photographs, the business's own

84 entries: 58 from the site, 12 from Instagram, 6 handed over by the client. 20 of them are third-party logos and seals, flagged "unknown" (`gaps.images.license.third_party_marks`: **they need Shahar's OK to be shown**). img-015 is stock, and img-022, 023 and 029 are "unknown"; none of those is used. img-ig-06 (two elderly men, photographer not stated) is **left out of the Instagram strip**.

**The best photograph is img-034 at 2000 × 1190 px** (Hadas laughing in a yellow jacket beside the "WHO ARE YOU?" ring canvas, bookcase behind). Real photos ≥ 1920 px: img-003, 011, 016, 018, 032, 033, 034 (**7**; img-028 and 031 are screenshots). That is fewer than 8, so photographs alone cannot carry a scroll set-piece (base §4).

The ten strongest:

| # | id | px | what | role |
|---|---|---|---|---|
| 1 | img-034 | 2000×1190 | Hadas, yellow jacket, laughing at the ring canvas | hero (C1), about |
| 2 | img-003 | 2000×2000 | a participant writing on the "WHO ARE YOU?" canvas | method SENSING, personal-branding page |
| 3 | img-013 | 1728×2000 | Hadas, selfie, pine forest, green shirt (the greens are in the photo) | hero piece (C3), about |
| 4 | img-033 | 2000×1333 | Hadas in a green dress, Brand Manager Day 2024 wall | talks (BRANDS OF CHANGE) |
| 5 | img-011 | 2000×1023 | stage screen "BRANDS OF CHANGE" with the m-icon, Hadas small at right | talks, INFLUENCING |
| 6 | img-c05 | 1600×1200 | eight women holding finished collage boards | workshops, proof |
| 7 | img-c03 | 1200×1600 | long workshop table with collages and greenery | workshops (THE BETTER 4) |
| 8 | img-012 | 1512×1572 | ring canvas on a table by a window, plants, markers | strategic-planning page, THINKING |
| 9 | img-032 / img-024 | 2000×1333 / 851×610 | hand holding a Brand the Change card over the deck | method, courses |
| 10 | img-001 | 713×672 | Hadas, arms crossed, in front of the canvas (the current hero portrait) | team founder card, circle portrait (C2) ≤ 340 CSS px |

Also usable: img-007 (1600, overhead vision-map table), img-030 (1200×1600, overhead round tables), img-027 (1200×1600, woman over a paint-and-map table), img-c02 (1600², Hadas presenting a collage on an easel), img-c01 (1600×1200, the handwritten "שנת 2030" vision sheet), img-019/020/021 (851 px, rounded cut-outs; source is small), team portraits img-036/037/038/039 (874–1800 px, studio cut-outs on sage, grey, yellow and sage grounds).

Not for any first screen: selfies img-014/016/017/018 and img-c04 (the cat); the screenshots img-028/031, which are only for the heart template's **outline**, redrawn, never shown as a screenshot.

### Atmosphere
None, and none needed: the business has enough of its own material. Do not fetch any.

### Words
- **Long:** `services[personal-branding].body` 2231 chars, `business-to-brand` 3171, `brand-and-breakfast` 1847, `the-better-4` 1271, `strategic-planning` 1438. These are page text, cut into short blocks with subheads and air (direction 8). They are never shown on the home page.
- **Short and worth setting large:** `tagline` "כאן מפתחים אסטרטגיות מותג עם משמעות." · `copyBlocks[intro].heading` "הי, הגעת למקום מיטיב!" · `featureLine` (the motto, ״להתנהל מתוך משמעות…״) · the four `method.stages[].label`s · `closing`.
- **Testimonials:** 8; three in English (Julia Dojas, Linda ×2), set `lang="en" dir="ltr"` inside the RTL page, left-aligned, never translated (brief 16). Linda's two quotes are never side by side (`mockup_extras.testimonialsPlacement`). איה and קרן go with Brand & Breakfast.

### Numbers
Prices on secondary offers only: 580 / 480 ₪ + מע"מ, 350 ₪, 0 (the free intro workshop), 5200 / 3200 ₪ + מע"מ. No price for the two lead services. Award: 2022. Experience "20 שנות אסטרטגיה, עיצוב ומיתוג עסקים". **No rating anywhere** (no Google profile, `gaps.reviews.platform`), so no concept has a rating block.

### Gaps worth designing around
- **No real case study:** the demo (דוגמה) and the template page are the design answer. The demo has **no images** (`caseStudies[0].images` is empty) → see Report.
- **Only white logo PNGs:** the icon is shown white on green, or recoloured by CSS mask to a single green (allowed: same shape, the brand's own green). It is never redrawn or re-proportioned. A drawn or animated icon waits for the vector master.
- **No newsletter URL** (`newsletter.url` null): per the schema there is no form. The label stays out until she gives the provider link.
- **No dates on any secondary offer:** cards show `status`, never a fake date.

## 3. The page archetype: **The workshop table** (שולחן הסדנה)

The page is laid out like walking up to Hadas's table. First, who is standing at it (Hadas, the greens, the icon, WhatsApp). Then what is made there: the two lead services, as two large blocks. Then how it is made: the four stages, as the canvas. Then what came out: the proof, the demo case study, the testimonials, the logos. Then what is on the table next: lectures and workshops, courses. Then the noticeboard: podcast, blog, Instagram.

The archetype belongs to this business because her material is a table seen from above. The canvas, the deck and the collage are the actual objects of the method; no surf business in the system has them. It organises the media and does not replace it: every section's large image is one of her own table, canvas or stage photographs, and vid-004 is the table itself.

**Sitemap (all three concepts; current content kept, brief 17/19):** בית · מיתוג אישי לעסק (`/personal-branding`) · תכנון אסטרטגי למותג (`/strategic-planning`) · הרצאות וסדנאות · קורסים · אודות (with the team) · תוכן (podcast, blog) · WhatsApp button. That is 6 menu items + the action (C-sites-03, C-sites-18). Not in the menu: `/work/template`, the demo `/work/demo-shorashim` (reached from its home card), `/accessibility` (footer). Old URLs redirect (`services[].slug`, `posts[].oldUrl`).

**Shared rules (all concepts):**
- **Booking:** primary action `whatsapp`, label **"כתבו להדס בוואטסאפ"** (`audit.json.recommended.primary_label`), `wa.me/972546686808?text=` with the default line, or a service's `ctaText` on its block or page. 1 tap from any screen (`clicks_to_book: 1`): the hero button, the header button, and a **persistent labelled phone bar** (references #4). The bar's order follows `above_fold`: what (a 2–4 word page-specific "what": the service title on a service page) → the WhatsApp button. "included / price / trust" do not fit a 56 px bar. They lead the **booking section at the end of each service page**: what_where (`format`, `audience`) → included (the 4 stages, named) → price (only where published, `₪ … + מע"מ`) → trust (one testimonial from `beside_lead_services`) → the WhatsApp button, with Calendly ("שיחת הכרות בזום, ללא תשלום") as a secondary text-free button beside it. **N9:** the free Zoom call appears at most once per screen. On the home page it lives only in the closing. **N1:** cards show `audience`, pages show `body`; never both on one screen.
- **Hero:** the header + the title ("הי, הגעת למקום מיטיב!") + the tagline as a short subtitle + one button. No badges stacked in the hero, except where concept 3 says otherwise (calibration; the current hero's four badges are what we remove, `audit F13`).
- **Type:** Hebrew-designed families, body **18 px / 1.65 on phone, 19–20 px / 1.7 on desktop**, measure ≤ 62 characters, weight 400 (never light for body; the current site's 300 Heebo is part of the "too compressed" complaint) (C-sites-10, C-sites-20, brief 8). Latin only for names and terms (SENSING…, BRAND THE CHANGE) (C-sites-11).
- **RTL motion:** "forward" enters from the left. Arrow nudges and slide directions are flipped explicitly for `[dir=rtl]` (C-sites-11). All UI motion is 100–400 ms (C-sites-12, NN/g). No scroll-jacking, no smooth-scroll library, no intro loader, no pop-up, no cookie banner, no accessibility-overlay widget (references #20; C-sites-13, C-sites-14, C-sites-22; `audit F11`). Under `prefers-reduced-motion` everything is static and in place.
- **Lines:** no rules, borders or underlines. Separation by space, ground colour and imagery. Actions are buttons (calibration). Old wave-shaped side bands go.
- **Pictures:** every run of pictures is cropped to one ratio (house rule 5; references #26). No captions under photographs (hard constraint 6). Alt text from `media.alt`.
- **Team (brief 24):** a reflowing grid that looks right with 1 to 20 people. The founder card is larger, then the others in 2 (phone) / 3 / 4 columns. No composition depends on there being four. Portraits are cropped 4:5 around `focalX/Y`. The four collaborator photos already sit on flat coloured grounds; keep the photo as it is, crop all of them alike, and put name + role under each photo as text, not as a caption. The bio opens on tap (C2) or sits below (C1, C3).
- **Instagram strip (brief 22), like Global Surf's bottom sections:** a centred section title in the concept's display face, one short line, an outline-free pill button "@mutagmeitiv" (from `socialLinks`), then **6 square tiles edge to edge** (a 3×2 grid on phone). Each tile links to its post. Photo-led tiles come first: ig-03, ig-01, ig-02, ig-09, ig-08, ig-11; the text-card posts (ig-04, 05, 07, 10, 12) after them; **never ig-06**. No call to Instagram at build or at runtime. The heading words are template labels, kept to a few words (no copy field exists).
- **Proof:** the award shows its label, issuer and year as text and links to `awards[0].url`; the BTC credential shows its label and link (`audit F13`). Seals and logos only after Shahar's OK on third-party marks.
- **Footer:** the icon (white on `#173B34`), pill buttons with icons (WhatsApp, phone, email), social icons, the menu, the accessibility statement link, "צילום: יעל שחר" and the paper-jewellery credit (`mockup_extras.footerCredits`), and the current year. No underlined links (calibration).
- **Case-study pages (brief 26, 28):** `/work/template` has the full layout. Every slot is a visible placeholder frame stating what to collect: client and sector, the challenge (≤ 800 chars), each of the 4 stages (≤ 600 chars each), the outcome, before/after images (count, ≥ 1600 px), a client quote and permission, credits. It is `noindex` and not in the menu. `/work/demo-shorashim` uses the same layout, filled, with a **"דוגמה" badge on the card and at the top of the page**, `noindex`, and no images until Shahar decides (Report). The concept sets the layout's personality; the slots are the same in all three.
- **Budget:** home first load ≤ 1.5 MB with video excluded. Hero image AVIF ≤ 300 KB. Fonts ≤ 2 families, subset Hebrew + Basic Latin, ≤ 150 KB total. JS ≤ 300 KB (expected < 30 KB: IntersectionObserver, a slideshow, a tab set). Video only after first paint (vid-004 webm 1.40 MB on phone). 0 third-party requests on load; the podcast player is a link out to Spotify/Apple, not an embed. No forecast (not a wave business: "No").

---

## 4. Three concepts

### Concept 1 · calm — **"ירוק בית" (House green)**

**The idea in one sentence.** The current site, cleaned and opened up: the same green hero and the same order of content, with the clutter gone, the type set larger and given air, and every action a button. The client recognises it at once and sees it done properly.

**The one thing.** **The brand icon's curve.** The bowl of the heart-shaped "m" becomes the single shape: it is the one rounded-off corner of the hero photograph (the top-start corner follows the icon's outer curve), the large faint curve on the green hero ground (as the current site has, img-035 shows the same device in purple), and the tip of the closing section's photo. Nothing else on the page is curved beyond a standard 14 px card radius (references #28: one shape, three uses).

**Structure (home).**
1. **Header:** the white wordmark (`logo-wordmark`) on the green band, 6 menu items, the WhatsApp button at the start side (right). Once scrolled, the header becomes a floating white pill with the green icon (C-sites-12 pattern 1).
2. **Hero, a green panel, split:** text at the start (right) on `#00574C`; img-034 at the end (left), cropped 4:5 around Hadas, with the icon-curve corner. Details below.
3. **Proof strip on white, one row:** the award (seal img-040 + "פרס המיתוג הישראלי 2022 — זהב, קטגוריית עמותות · Brand Academy", linked), the BTC credential (img-041 + its label, linked). Two items, generous air, no line between them.
4. **"כלים לבניית עסק מיטיב"**: the four entry cards the current site has, as four quiet white cards on `#EAEAE8`, each a title + one line + an arrow-free whole-card link: מיתוג אישי לעסק · תכנון אסטרטגי למותג · הרצאות וסדנאות · קורסים. A swipe row with a next-card peek on phone (references #14).
5. **The two lead services, two large alternating blocks:** a photo (img-003 for personal branding, img-012 for strategic planning; 4:3 crops), title, `summary`, `format` and `audience` as two short lines, one outcome testimonial from `beside_lead_services`, and two buttons: "כתבו להדס בוואטסאפ" (with that service's `ctaText`) and "לפרטים" (to the page) (C-sites-18).
6. **The motto** (`featureLine`), set large in Heebo 300 at display size, centred on white, nothing else. (300 is fine at display size; body stays at 400.)
7. **The method, four stages:** a plain 4-column row (2×2 on phone). Each stage has its Latin `label` in small green caps (the one place labels are used, because they are the owner's own names for the stages), its Hebrew `title`, and its `body` opening on tap ("קראו עוד"). No numbering beyond the stage names. Small reveal: each column fades up 12 px, staggered 80 ms, once.
8. **הרצאות וסדנאות / קורסים:** two groups. Cards show title, `format`, price (₪, `+ מע"מ` when `vat: excluded`), a "חינם" badge on the intro workshop (`freeFirstSteps`), a status chip for `full`, and a WhatsApp button per card. Beside the group heading on desktop, vid-004 plays as a 4:5 portrait tile (232 CSS px), lazy, muted, looped, poster first.
9. **Case study:** one wide tile (image area, client, title, the "דוגמה" badge) linking to the demo.
10. **"מיטיבים מספרים.ות":** testimonials from `elsewhere`, a slideshow with dot navigation (calibration), one quote at a time, Hebrew right-aligned, English left-aligned.
11. **"מודה על הזכות להטיב ב:"**: 15 logos, greyscale at 60 % opacity, 5 per row desktop / 3 phone, colour on hover. No borders.
12. **צוות עם משמעות:** the team grid (shared rule), on `#EAEAE8`.
13. **ON AIR:** the podcast band, the one green panel below the hero (`#173B34`, short text only: the `ON AIR` copy block's heading + its first paragraph + Spotify / Apple buttons).
14. **The blog:** the 3 newest posts, image + title + date, no excerpt text in salmon (the current site's salmon excerpts go).
15. **Instagram strip** (shared rule); the title in Heebo 600.
16. **Closing:** `closing` + WhatsApp + the Calendly button, centred on white, with img-c05 (the eight women with their boards) cropped wide above it, its bottom-start corner on the icon curve.
17. **Footer** (shared rule), on `#173B34`.

Service pages: a short green title band (title + `summary` + WhatsApp), then the `body` in short blocks with subheads on white, one photo per screen at most, the four stages as the step row, testimonials, and the booking section (shared order).

**The first screen.** Phone (390 px): the green header with the wordmark and a menu button. Then img-034 cropped 4:5 at the full content width (≈ 358×448 CSS px, source crop ≈ 950×1190 px ✓) with the icon-curve corner. Below it, still on green: "הי, הגעת למקום מיטיב!" (Heebo 600, 30 px, white), the tagline (18 px, white at 85 %; not mint, which is reserved for booking), and the mint button "כתבו להדס בוואטסאפ". The persistent bar appears once the hero button scrolls out. Desktop: text block at the right half, centred vertically, photo at the left half. **No rating** (none exists). **The award sits in the strip directly under the hero, not in it**: the calibration asks for title + one CTA, and the current hero's four-badge row is exactly the clutter to remove.

**Why there is no video in this hero.** Direction asks for Hadas's face on the first screen. The best clip is hands-only and 464 px wide, so in a calm split hero it would be a small second picture competing with her. It plays in the workshops section (item 8), where "this is what happens at the table" is the point.

**Why it beats the current site.** Today the first screen is a boxed green panel inside a 950 px column, with a circle-cropped photo, four unexplained badges and no labelled action; below it sit underlined card titles in 14 px text (`old-site-desktop.png`). Here the visitor gets the same green, Hadas larger and sharper, one clear WhatsApp button and readable 18 px text, with the clutter moved to its own quiet row.

**Colour.**

| role | hex | sampled from |
|---|---|---|
| hero / band ground | `#00574C` | the current site's hero panel, `old-site-desktop.png` (computed `--color_18`, `dossier.brand.colors.green_dark`); matches `logo-favicon` ground `#064E4E` |
| deep panel (podcast, footer) | `#173B34` | the current site's service cards, `old-site-desktop.png` (`green_deep`) |
| page ground | `#FFFFFF`, alternate sections `#EAEAE8` | the current site's surface, `old-site-desktop.png` top band (sampled `#EAEAE8`) |
| ink | `#2F2F2E` body, `#0A5150` headings | the current site's text and heading colours (`old-site-desktop.png`; 13.4:1 and 9.1:1 on white) |
| booking accent (fills only) | `#4BD1A0` with `#173B34` label (6.4:1) | the current header button "פה יוצרים קשר", `old-site-desktop.png` (sampled `#4BD1A0`) |

Mint is used only as the WhatsApp fill (hero button, header button, bar, card buttons). Headings that are mint on the current site become `#0A5150`. This palette would look wrong beside warm ochre or terracotta, and next to the yellow BTC seal at large size (keep the seal at 72 px).

**Type.** **Heebo** alone (Hebrew by Oded Ezer; the client's current face, `dossier.brand.fonts`): 400 body, 600 headings, 300 only for the motto at display size. It is the calm concept, so the site keeps the face the client already knows and wins on size, weight and air rather than on a new font. Default-look check: Heebo's Latin is Roboto-derived, and Roboto is on the list. Here it is chosen because it is the client's own Hebrew face, Latin is limited to terms, and body text is Hebrew.

**Motion.** Floating pill header after the first screen (CSS + 1 IntersectionObserver). Section reveals: fade + 12 px rise, 300 ms, once, not on headings (calibration: no title reveals; only cards and photos). Button hover/press: 100 ms lift and shade. Card swipe on phone (native scroll-snap). Cost ≈ 3 KB JS. Reduced motion: no reveals, header switches without a transition. JS off: everything visible, slideshow becomes a stacked list, video shows its poster. No WebGL.

**Booking pattern.** Persistent WhatsApp (references #4) + one accent reserved for booking (references #6) + per-offer action (references #7). Desktop has the header button and a per-section button; phone has the labelled bottom bar. No drawer: WhatsApp is one tap.

**Photographs.** img-034 hero 4:5 (≤ 300 KB AVIF at 1190 px tall). img-003, img-012 at 4:3 in the service blocks. img-c05 wide in the closing. Team img-001/036/037/038/039 at 4:5. Blog covers from the old posts at 3:2. Logos at native size or smaller.

**Forecast.** No (not a wave business).

**What would make this concept fail.** It is so close to the current site that a reviewer could call it a reskin; the only defence is execution: real air, 18 px text, crisp photography and buttons that look designed.

---

### Concept 2 · interactive — **"ארבע הטבעות" (Four rings)**

**The idea in one sentence.** The page is built around the Brand the Change canvas. Four concentric rings carry the four stages: they frame Hadas and the workshop clip in the hero, then light up stage by stage as the visitor scrolls the method, so the method can be seen working.

**The one thing.** **The ring canvas** ("WHO ARE YOU?", img-003, img-001, img-034, img-012). A visitor who has been to her workshop recognises it in a second. It is drawn as four thin rings in `#0A5150` (redrawn as SVG, not the copyrighted canvas artwork: rings only, no text from the canvas). It appears in the hero and the method section only.

**Structure (home).**
1. **Header:** white ground, the icon recoloured to `#00574C` (CSS mask of the white PNG), 6 items, the WhatsApp button. Becomes a floating pill on scroll (C-sites-12 pattern 1).
2. **Hero: the rings** (details below).
3. **The two lead services, a two-tab switch** ("מיתוג אישי לעסק" | "תכנון אסטרטגי למותג") on phone; side by side on desktop. Each panel holds a photo (img-003 / img-012, 1:1 crops), `summary`, `format` and `audience` as chips, a testimonial, WhatsApp (`ctaText`) and "לפרטים". The switch slides forward to the left in RTL (220 ms).
4. **Proof row:** the award and BTC credential in two white cards with their labels, then the logos as a slow, pausable marquee (it pauses on hover and focus and stops under reduced motion), greyscale.
5. **The method, a scroll-lit ring (C-sites-12 pattern 2):** on desktop the ring diagram is `position: sticky` on the left while the four stages scroll on the right. The ring of the stage in view fills with the `#35C68B` → `#0A5150` greens, and its Latin label sits on the arc. On phone the ring sits small (160 px) at the top of each stage card and lights its own ring. Native scroll, no scrubbing. Each stage card carries one photo, cropped 1:1 in a circle: SENSING img-003, THINKING img-012, MAKING img-c03, INFLUENCING img-011.
6. **Offers:** two tabs, "הרצאות וסדנאות" | "קורסים". Inside, cards with a tap-to-open detail (format, price, the first paragraph of `body`, WhatsApp with `ctaText`) as an accordion, not a modal. vid-004 plays as a circle tile beside the tabs' heading on desktop.
7. **Case study:** the demo as a tile: image area, title, the "דוגמה" badge. On hover/tap the four stage labels light in order (an echo of the rings), 4 × 120 ms.
8. **Testimonials:** a slideshow with dot navigation, swipe on phone, one quote, the author and role, Hebrew/English direction per quote.
9. **Team:** the grid. Tapping a card opens the bio in place (the height animates 250 ms, focus moves into it, Esc closes).
10. **ON AIR:** the podcast section on `#EEF4F2`, the heading in the display face, Spotify / Apple buttons, the "most listened" episodes copy block as a short list.
11. **Blog:** 3 newest; cards rise 4 px on hover.
12. **Instagram strip** (shared rule); tiles scale 1.04 on hover, 200 ms.
13. **Closing:** a small ring device (the four rings, all lit) beside `closing`, WhatsApp + Calendly.
14. **Footer** on `#173B34`.

Service pages open with the ring device small at the start of the title band, and the booking section's "included" lists the four stages with their rings lit.

**The first screen.** Light ground `#EEF4F2`. Desktop: at the right half, "הי, הגעת למקום מיטיב!" in the display face (44 px, `#0A5150`), the tagline (20 px, ink) and the button "כתבו להדס בוואטסאפ" (`#00574C`, white text). At the left half, the four rings (≈ 520 px), with **Hadas's portrait img-001 in the centre disc** (at most 336 CSS px: the 672 px source height covers exactly that at 2×). On the outer ring sits a **satellite circle playing vid-004** (180 px; 464 px source ✓), poster first. The rings turn very slowly as the page scrolls (orbiting labels, C-sites-12 pattern 3: the four Latin stage labels ride the outer arc, about 30° per screen of scroll, with the turn mirrored for RTL). Phone: rings + portrait 300 px wide at the top (the disc 200 px), the satellite clip 112 px, then title, tagline and button. **No rating** (none exists); the award goes to the proof row (item 4), next to the services it proves.

**Why it beats the current site.** The current site already puts Hadas in a circle in front of this canvas, but as a flat crop in a green box with badges around it. Here the circle *means* something: the visitor sees her inside the method's rings, the workshop moving beside her, and one labelled WhatsApp button, on a light, airy ground.

**Colour.**

| role | hex | sampled from |
|---|---|---|
| ground | `#EEF4F2` (20 % of `#AAC6C1` on white) and `#FFFFFF` | the sage ground of the team portraits, img-036 / img-039 (sampled `#AAC6C1`) |
| ink | `#2F2F2E` body, `#0A5150` headings and rings | `old-site-desktop.png` text / heading colours |
| lit ring, light | `#35C68B` | `dossier.brand.colors.green_mid`, the current site's light text accent; close to Hadas's green dress img-033 (sampled `#356C4E`, darker) |
| deep panel (footer only) | `#173B34` | `old-site-desktop.png` service cards |
| booking accent (fills only) | `#00574C`, white label (8.5:1) | the current hero panel, `old-site-desktop.png` / `logo-favicon` ground |

`#00574C` is used only as the WhatsApp fill. Headings use `#0A5150`, which sits close; a 1 px difference is not the distinction. The button is the only *filled* green shape on a light page (references #6). The palette looks wrong beside warm cream; the ground must stay a cool sage-white.

**Type.** **Assistant** (Hebrew by Ben Nathan; the client's second current face) for all reading text, 400/600. **Playpen Sans Hebrew** (TypeTogether's handwriting face; Google Fonts) for section titles only. It reads like the marker handwriting on her own boards: the "שנת 2030" vision sheet (img-c01), the cards and the markers on every table. This is the calibration's "readable text face + handwritten titles" bar, in Hebrew. The designer confirms the Hebrew cut is on Google Fonts and tests it on every title word ("מיטיבים מספרים.ות" with its dot, "צוות עם משמעות", "ON AIR"). If it fails, the fallback is **Gveret Levin** (Alef Alef Alef, free). Default-look check: none of the listed faces.

**Motion.** Orbiting stage labels on the hero rings (transform on scroll, throttled with rAF; ≈ 2 KB). The scroll-lit ring in the method (IntersectionObserver; fill transitions 300 ms). Tabs and accordions (220–250 ms; RTL forward = left). Slideshow with dots and swipe. Marquee for logos (pausable). Hover lifts. Cost < 15 KB JS. Reduced motion: the rings are static with all four labels shown, the method ring shows every ring lit, no marquee (static wrapped grid), tabs switch instantly. JS off: both tab panels are shown stacked, accordions open, slideshow is a list, video shows the poster, and the rings are a static SVG. No WebGL (none needed).

**Booking pattern.** Persistent bar + header button (references #4); booking colour reserved (references #6); each offer card's accordion ends in its own WhatsApp with its `ctaText`, so the owner's first message names the offer (references #7, playbook §5).

**Photographs.** img-001 in the hero disc (≤ 336 CSS px); vid-004 satellite (≤ 180 px); img-003, 012, c03, 011 as 1:1 circles in the method; img-003 / img-012 1:1 in the service tabs; img-c05, img-033 for the talks group; team at 4:5. Every crop in one run has the same ratio.

**Forecast.** No.

**What would make this concept fail.** If the rings turn too much or the satellite clip draws the eye away from Hadas, the hero reads as a gimmick. The rings must stay thin, slow and green on green, so that the portrait and the button are what the eye lands on.

---

### Concept 3 · unique — **"מפת חזון" (Vision map)**

**The idea in one sentence.** The home page is one of her vision maps: the heart-shaped board from her own template (img-028/031) holds the pieces of this practice as cut-outs: Hadas, the workshop clip, the award. As the visitor scrolls the method, a new piece lands on the board for each stage.

**The one thing.** **The heart-shaped vision-map board.** It is her workshop tool and the shape of her logo. It is drawn as one thin `#0A5150` heart outline (redrawn from the template's line, not the screenshot). Pieces are set on it as slightly rotated photo "cut-outs" (−3° … +2°, clean edges, a soft 8 px shadow, no torn-paper effect). It appears only in the hero and the method set-piece; elsewhere the page is calm and straight.

**Structure (home).**
1. **Header:** white, the icon in `#00574C` (CSS mask), 6 items, the WhatsApp button.
2. **Hero: the board** (details below).
3. **"כלים לבניית עסק מיטיב"**: the two lead services as two tall cut-out cards side by side (one column on phone), straightened (0°), each with a photo (img-003 / img-012, 4:5), its title in the display face, `summary`, the `audience` chip, a testimonial and WhatsApp (`ctaText`) + "לפרטים".
4. **The motto** (`featureLine`), set in the display face across the page on white strips, the way her own Instagram cards set words on coloured strips (img-ig-04).
5. **The method: the set-piece "the board fills"** (details below).
6. **Proof:** the award, BTC credential and logos on a calm white section, logos in a straight 5-column grid (no collage here; this is evidence, not decoration).
7. **Offers:** two groups as straight cards; each card's price set large in the display face's figures; the free intro workshop with a coral "חינם" strip. vid-002 (44–56 s, the leaf-wrapping hands) plays as a 4:5 portrait tile beside "הרצאות וסדנאות" (≤ 360 CSS px wide; source 720 ✓).
8. **Case study:** the demo as a large straight tile with its "דוגמה" strip.
9. **Testimonials:** a slideshow with dots; quotes set in the display face at 26 px, one at a time.
10. **Team:** the grid; the founder card larger; collaborators below.
11. **ON AIR:** podcast on `#173B34`, the one dark band below the hero, short text only.
12. **Blog:** 3 newest.
13. **Instagram strip** (shared rule): the six tiles, each with a 1° rotation, alternating, as if pinned. Rotation only on desktop; on phone they are straight.
14. **Closing:** `closing` on a white strip, the coral WhatsApp button, Calendly beside it, and img-c05 (the women with their finished boards) wide above it. The page ends on real vision maps.
15. **Footer** on `#173B34`.

Case-study pages in this concept read like a finished vision map: the challenge on a strip, the four stages as four pieces on a small heart, before/after as two cut-outs.

**The first screen.** White ground. Desktop: at the right, "הי, הגעת למקום מיטיב!" in Frank Ruhl Libre (52 px), set on two white-on-`#00574C` strips like the words on img-ig-04, the tagline below in Heebo 20 px, then the coral button "כתבו להדס בוואטסאפ". At the left, the heart outline (≈ 560 px) holding **three pieces only**: Hadas img-013 (portrait, 4:5, ≈ 300 px wide; source 1728 ✓; her green shirt carries the brand green into the photo), **vid-004** playing in a 9:16 portrait frame (≈ 200 px wide; source 464 ✓, poster first) tucked half under her photo, and the **award seal img-040** as a small 96 px sticker, labelled "פרס המיתוג הישראלי 2022" in text beside it and linked. Phone: the heart shrinks to the content width with the two pictures (Hadas 220 px, clip 140 px) and the sticker, then the title strips, tagline and button; the whole first screen fits in 844 px.

**Proof in the hero, and why here.** A collage invites a sticker; the award is a physical seal she already put in her hero, and this is the one concept where it can stand as a piece of the composition rather than in a badge row. It is one sticker with its words beside it, not a rating stack. **No rating** (none exists). If Shahar does not clear third-party marks, the sticker becomes a text strip "פרס המיתוג הישראלי 2022 — זהב".

**Scroll set-piece: "the board fills" (pattern: pinned object).** Built from the business's own video: **vid-004 and vid-002 (44–56 s)**, plus photographs. On desktop the heart board is `position: sticky` on the left (native scroll; no scrubbing, no smooth-scroll library) while the four stages scroll on the right. As each stage enters, one piece lands on the board (a 350 ms move from the start side plus a rotation settle; in RTL it comes in from the right):
- SENSING: img-003 (the canvas being written on);
- THINKING: img-032 (the hand holding a card over the deck);
- MAKING: **vid-002** 44–56 s in a portrait frame (it plays only while its stage is in view);
- INFLUENCING: img-011 (the BRANDS OF CHANGE stage).

Each stage's label and title are DOM text on the right. The board ends full, four pieces in the heart, before the proof section. Pieces are aligned with `focalX/Y` so an owner's replacement photo still lands right (schema v0.10). **Reduced motion:** the board is shown full from the start, all four pieces in place, the clip as its poster. **No WebGL** (none used). **Weak phone:** on phone there is no pinning: each stage card shows its piece above its text (the same images, straight), and vid-002 is a poster with a play-on-view only when not Save-Data. **JS off:** the full board and a plain stage list.

**Why it beats the current site.** The current home shows a static circle photo and a grid of identical green boxes. Here, in one glance, the visitor sees what Hadas does: her face, her workshop table moving, and her award, composed in the shape of her own logo, with one button to write to her.

**Colour.**

| role | hex | sampled from |
|---|---|---|
| ground | `#FFFFFF` | the white collage boards in vid-004 (poster frame) and the heart template sheet img-031 |
| strips / bands | `#00574C` under white title words; `#173B34` podcast and footer | `old-site-desktop.png` hero panel and service cards (`green_dark`, `green_deep`) |
| heart line, headings | `#0A5150` | the template's line colour, img-031 (dark green outline); `teal_dark` |
| warm piece colour (stickers' backs, the free strip) | `#EBCE8C` | the yellow portrait ground of img-038 (Dana Russo); also near Hadas's yellow jacket img-034 (sampled `#B37509`, darker) |
| booking accent (fills only) | `#F6927C`, label `#173B34` (5.4:1) | the salmon leaf shapes on the current workshops page (`dossier.brand.colors.accent_salmon`); her own coral post img-ig-12 (sampled `#FB7763`) |

The salmon is the brand's own warm colour and the only warm fill on a green-and-white page, so the button cannot be missed and still belongs to the brand. The label is deep green, never black or blue (calibration; white on this salmon fails contrast at 2.3:1). If Shahar wants the booking colour inside "the leading greens", the fallback is concept 1's mint `#4BD1A0` with a `#173B34` label. The palette looks wrong beside any cream ground or a second warm accent.

**Type.** **Frank Ruhl Libre** (a Hebrew-designed serif in the classic Hebrew newspaper tradition) for titles, the motto, prices and quotes. Her vision maps are made of Hebrew magazine headlines cut out and pasted (img-025, vid-004, img-c03), so the display face is the type those cut-outs carry. **Heebo** 400/600 for reading text (the client's own face, continuity). Two clearly different families. Default-look check: a serif display on a **white** ground (not cream), and not one of the listed Latin serifs. The reason is the collage material, not taste.

**Motion.** The set-piece above (IntersectionObserver + CSS transforms; ≈ 6 KB). Title strips are static on load (no title reveal, calibration). Pieces on the hero board are static on load; on desktop hover they straighten to 0° (150 ms). Slideshow with dots. Instagram tiles straighten on hover. Reduced motion: no transforms, no rotation, board full. JS off: everything in place, straight. No WebGL.

**Booking pattern.** Hero button + persistent labelled bar (references #4); one reserved accent (references #6); a WhatsApp per offer (references #7). The set-piece never pins the bar or covers it.

**Photographs.** img-013 (hero, 4:5, ≤ 300 KB AVIF); vid-004 (hero, 9:16); img-040 (sticker); set-piece img-003, img-032, vid-002, img-011 (all 4:5 crops, one ratio); services img-003 / img-012 4:5; img-c05 wide in the closing; team 4:5. The cut-out "rotation" is a transform, never a mismatched crop, so there are no padded boxes (house rule 5).

**Forecast.** No.

**What would make this concept fail.** A collage drifts into clutter fast. With more than three pieces in the hero, rotations past 3°, or torn-paper effects, it stops being "clean, tidy, airy" (brief 7) and looks like a scrapbook. The board must stay sparse and every other section straight.

---

## 5. Divergence table

Run 2026-10-il-brand-01 has one business (`max_sites: 1`); no other `concepts.md` exists in this run. Rows are this business's three concepts.

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern | scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| mutag-meitiv | 1 calm "ירוק בית" | the workshop table | green split panel: text + img-034 with the icon-curve corner | 12-col, alternating 2-col blocks, 4-card row | white / `#EAEAE8`, green hero band `#00574C` | reveals 300 ms + floating pill header | mint fill, header + bar + per-card | — |
| mutag-meitiv | 2 interactive "ארבע הטבעות" | the workshop table | four rings: img-001 in the centre disc + vid-004 satellite, orbiting stage labels | 12-col with a sticky method ring, tabs + accordions | sage-white `#EEF4F2` | orbiting labels, scroll-lit ring, tabs, marquee | deep-green fill, header + bar + per-offer accordion | — (scroll-lit list only, not a set-piece) |
| mutag-meitiv | 3 unique "מפת חזון" | the workshop table | heart-shaped vision-map board: img-013 + vid-004 frame + award sticker, title on strips | 12-col, pinned board + stage column, else straight | white `#FFFFFF`, green strips | pieces landing on a pinned board, hover-straighten | salmon fill (deep-green label), header + bar + per-card | pinned object, "the board fills" (vid-004, vid-002, img-003/032/011) |

No two rows repeat archetype + first-screen device: green split panel, rings, heart board.

**Other businesses in this run:** none. Across the system, no surf site uses a Hebrew RTL page, a method diagram or the workshop-table archetype, so a visitor would not mistake any of these for a surf business's page.

---

## Hand-off checklist (base.md "Before handing off")

1. Every image looked at (four contact sheets + both video frame sheets); best photograph img-034 at 2000 px. ✓
2. `agents/designer/references.md` read in full; cited: #4, #6, #7, #10, #14, #20, #26, #28 (plus C-sites-01/03/10/11/12/13/14/18/20/21/22). ✓
3. Divergence table: the run's only business. ✓
4. Every video and the ten strongest photos listed with widths; the concepts use them. ✓
5. Each concept says why it beats the current site. ✓
6. Each first screen: media + what + the WhatsApp action (playbook §3.1). ✓
7. Facts trace to dossier keys (named inline). ✓
8. Every colour has a hex, a source asset and what it is. Two derived values are marked as derived: `#EEF4F2` from img-036 sage, and the brand-CSS greens from `old-site-desktop.png`. ✓
9. Default-look items used with a stated reason: Heebo (C1, C3: the client's own face); a serif display (C3: magazine cut-outs, white ground). Small caps labels only for the method's own Latin stage names (C1). ✓
