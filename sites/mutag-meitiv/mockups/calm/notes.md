# notes.md — mutag-meitiv · series 2 · calm "דף ההזמנה" (station 4e)

Designer 0.5.2 · run 2026-10-il-brand-01 · 2026-10-18 · Hebrew only, `lang="he" dir="rtl"`.

Files: `dist/index.html` (one self-contained page: CSS + JS inline, IBM Plex Sans Hebrew 400/600 inlined,
header and footer marks inlined), `dist/img/**`, `dist/video/**`, `dist/fonts/**` made by `src/make-media.sh`
(`# media:` header). The page is made by `src/build.py` from `copy/he.json` (incl.
`mockup_extras.series2_organisations`) + `src/page.css` + `src/page.js`.
Rebuild: `bash src/make-media.sh && python3 src/build.py` (`FIRST=1 python3 src/build.py` builds the
first screen alone, as used for the first look rounds). Every business word is read from he.json verbatim;
interface labels only in build.py ("לארגונים", "אודות", "גם לבעלי עסקים ולאנשי מקצוע", "סדנאות פתוחות",
"סדנת הכרות", "מקרה בוחן", "מהבלוג", "מותג מיטיב באינסטגרם", "לפוסט", "לפרטים", "קראו עוד", the
price capture line, the demo note).

## look-log

Every round compared with `dossier/mutag-meitiv/assets/old-site-desktop.png` / `old-site-mobile.png`
(boxed green panel in a 950 px column, small circle photo, four unexplained seals, a form link as the only action).

**First screen, round 1** (FIRST=1, 1440 + 390). img-033 full-bleed at 62vh over a 250 px `#173B34` band:
h1 (series-2 tagline) + the intro heading in mint, mint WhatsApp at the end. Wrong: at 1440 the floating
pill sat on top of Hadas's head (crop started 120 px into the source); the 2.4:1 crop cut through her
conference badge, which read as an accident; the band's title was small for the empty middle. On the phone
the 4:5 full-height crop made her small and the pill touched her hair. Already clearly better than the old
site at a glance: a real person at a real branding conference, full width, one labelled action.

**First screen, round 2.** Crop from the top of the source (headroom under the pill), title up to 48 px.
Wrong: the bottom edge now cut the badge in half (a yellow sliver at the frame edge). Still clearly better.

**First screen, round 3.** Desktop crop 2.6:1 (2000×770), ending on the lanyard straps above the badge, so the
frame ends cleanly; face well clear of the pill. Band title two lines at 48 px, mint line, button at the end:
reads like the head of a programme sheet. Kept for desktop.

**First screen, round 4.** Phone crop changed from the full-height 1066×1333 to a closer 800×1000 (hair to
mid-thigh): her face is now the largest thing on the screen and the badge "הדס דרכלי MEITIV BRANDING" is
legible; header, photo, title, line and full-width button all inside 844 px. Against old-site-mobile
(cramped green wave, four seals, circle photo below the fold): clearly better.

**Whole page, round 1.** Built every section (intro, the four formats, award, logos + talks, method panels,
testimonials, individuals, demo case, team, podcast + blog, Instagram, closing, footer). Sheets showed:
(1) **the phone page laid out 434 px wide** — the individuals block had no phone breakpoint, so the
document overflowed and every phone screen looked shrunk; (2) the formats list at 980 px was four wide
bars with the round WhatsApp button stranded 500 px from its text; "הרצאה בהזמנה" repeated under a line
that already says it; (3) the method's phone dots showed on desktop (`[hidden]` lost to `display:flex`);
(4) logos: המעיין kept its box edges, Heartivism and medatech read pale; (5) the individuals heading
wrapped in a half column; (6) the closing photo cut the women's foreheads and the closing buttons hung
under a left-aligned line with an empty half; (7) a 1 px rule in the footer (no lines); (8) the phone bar
sat on top of the closing's own WhatsApp button (two on one screen).
Fixed: one column ≤ 820 px (scroll width = 390 again); formats as a 2×2 set of cards on desktop, list on
phone, format detail dropped when the line already contains it; `[hidden]{display:none!important}`; logo
recipe crops a box's anti-aliased edge before knocking it out and lifts light greys to full ink; heading
spans both columns; closing crop raised (fy .2) and centred; footer rule removed, nav in two columns;
the bar hides while the closing CTA or the footer is on screen.

**Whole page, round 2** (after `audit-mockup`). Early-scroll CLS 0.0127: the inlined Plex decodes ~1 s
into the throttled load and re-wrapped the hero title, moving the band button. Fixed by reserving the
title's two lines (`height:2.4em`) and the line's one: early 0.0009, settled 0. Reduced motion looked at:
panels static at equal width, every stage body shown, the panels grow to fit (they clipped before this
round). Footer nav links widened to 44 px. Last sheets read at 1440 and 390 for overflow, overlap and
unreadable text: none found (phone scroll width = viewport). Page 10.6k px desktop, **12.5k px phone** (≤ 13k).
Against the old site, whole page: the same brand greens and icon, but the old page's identical boxed
blocks, 14 px text, unexplained seals and a form as the only action become distinct sections — a
conference photograph, the four things an organisation can book with their own WhatsApp messages, the
award in the judges' own words on deep green, the logos as one crisp ink, the method as four photo panels
with the workshop clip, and a real footer. Clearly better on the first screen and the whole page.

## images

| file in dist/img | source | license | use |
|---|---|---|---|
| img-033-hero-2000/1280 | img-033 (2000×1333) | business-owned | desktop hero, full-bleed 2.6:1 (2000 px source) |
| img-033-hero-p800/p560 | img-033 | business-owned | phone hero, 4:5 (800×1000 of the source) |
| img-ig-01-intro | img-ig-01 (1440×1800) | business-owned | intro, 4:5 |
| img-003-panel, img-032-panel, img-011-panel | img-003, img-032, img-011 | business-owned | method panels SENSING / THINKING / INFLUENCING, 2:3 |
| vid-004-poster + video/table-464x696.{webm,mp4} | vid-004 (client clip) | business-owned (client) | MAKING panel, cut 2–14 s, 2:3 at native 464 px, no audio, webm 1.15 MB / mp4 1.66 MB |
| img-c05-close-1600 / -p900 | img-c05 (client, 1600×1200) | business-owned (client) | closing, 3:1 desktop / 4:3 phone |
| img-034-founder | img-034 | business-owned | founder, 4:5 (never img-013 / img-c06) |
| img-036…039-team | img-036…039 | business-owned | team, 4:5 |
| img-ig-01/08/03/02/09/11 | img-ig-* | business-owned | Instagram strip (never ig-06) |
| post-2026-05-28 | the post's cover, Wix media of the site account 5b80b1 (fetched by the recipe) | business account's own upload | blog |
| podcast-art | `dossier.podcast.cover_image_url` | the show's own artwork | podcast |
| icon-green / icon-white / icon-mint / wordmark-green | logo-icon, logo-wordmark | business-owned | header, footer, case cover (the white PNGs' shapes recoloured, never redrawn) |
| img-040-award | img-040 | unknown (third-party mark) | award seal, as on the current site |
| img-044…058-logo | img-044…058 | unknown (third-party marks) | under "מודה על הזכות להטיב ב:", one deep-ink `#173B34` treatment, as on the current site (run default) |

Not used: img-013, img-c06 (selfies), img-015 (stock), img-022/023/029 (unknown), img-ig-06, the 2026-08-22
blog cover (Abramović portrait, photographer not stated), the 2026-04-22 cover (Unsplash via Wix), vid-001/002/003.

## gaps

- **No organisation testimonial.** The judges' quote (linked to brandawards.co.il, D3) is the third-party
  voice; the slideshow holds three individuals' quotes (אנווה רצון, יובל אברהם, Julia Dojas), never labelled as
  organisations'.
- **No inner pages in a 4e mockup:** format rows, "לפרטים" and the blog link to the current site's pages.
- **Demo case study:** no images; designed deep-green cover with the m-icon and the "דוגמה" badge; opened,
  it shows the full layout with labelled frames (frames only inside the opened example, none on the page).
- **No newsletter block** (`newsletter.url` null; run default). **No rating** (none exists).
- **Prices:** ₪, "+ מע״מ" where `vat: excluded`, "למשתתף/ת" for `per_person`, capture line 18.10.2026; intro
  workshop "ללא תשלום"; business-to-brand "ההרשמה נסגרה". btc-professionals is in the formats list only
  (not repeated under courses).
- **N1:** rows show `summary`/`format`, never `audience` beside `body`. **N9:** the free Zoom call appears once,
  in the closing. **D1:** the award line once (`proof.award`), in the award section; Dana's bio is in the team
  section, five sections away. **D2:** logos only under her heading.
- The intro section has no visible heading of its own: its heading is the band line on the first screen
  directly above it, so it is not printed twice (the section carries it as `aria-label`).

## conflicts

1. **Resolved by run default — dark greens.** `check-design` (scratch copy, unmodified checks) reports only
   "dark ground behind text" for `section.hero` (the band), `section.award`, `section.method`,
   `details.case-card`, `div.close-band`, `footer.ftr`, at 1440 and 390. House rule 1 is surf-only; brief 6
   wins. No other problem; default-look report: Plex for h1/h2/body, white ground, 0 all-caps labels, 0
   labelled headings — no warning.
2. **img-ig-01 shared with series-2 interactive.** Interactive opens on it (hero, "הרצאה" default); calm uses
   it as the intro's 4:5 photo, one screen below a different hero (img-033). The first screens differ; the
   human may want calm's intro swapped (candidates: img-004, img-034 — img-034 is already the founder).
3. **Formats as 2×2 cards on desktop** where the concept says a list: a single 980 px column left each
   round WhatsApp button far from its text (whole-page round 1). Still one set of four, a list on phone.
4. **Method panel text under the photo on phone** (on the photo on desktop): label + title stay on the photo's
   gradient, the body sits under the panel, as the concept says.
5. **Tools:** `tools/audit-mockup.mjs` reads `copy/en.json` and `check-design.mjs` uses fixed ports; both were
   run as copies in my scratchpad (he.json, ports 9473 / 9463, check-design filtered to slug+variant). Repo
   tools untouched.

## measured (audit-mockup, scratch copy, throttled phone)

First load 372 KB, 5 requests, 0 third-party hosts, LCP 1.07 s, CLS 0, scroll early 0.0009 / settled 0,
0 images without alt, JS inline (~6 KB source). Tap targets under 44 px: 2, the format rows' title links (27 px
tall) — each is a stretched link covering its whole ≥ 100 px row card, so the real target is the card.
`check-places`: 0 borrowed images, pass.

## booking

`https://wa.me/972546686808?text=…` (`contact.whatsapp` +972546686808, copied). General buttons (header, hero,
section button, phone bar, closing) carry `path.ctaText` "היי הדס, אני פונה בשם ארגון. אשמח לדבר על מה שיכול
להתאים לנו."; each format row and each individuals row its own service `ctaText`. Tapped at 390 (Playwright):
hero → the org line; the four rows → strategic-planning, brands-of-change, therapists-retreat,
btc-professionals messages. Phone bar appears once the hero button has scrolled away and the header pill's
WhatsApp hides meanwhile (one per screen); the bar hides over the closing CTA and the footer. Calendly once,
in the closing. JS off: 18 wa.me links, everything readable, details open natively, clip as poster.

## other mockups in this run (hard constraint 5)

Series-2 interactive opens on img-ig-01 full-bleed with a white booking card of four format chips (Rubik,
`#00574C` button); series-2 unique is the img-011 stage (concept); series-1 calm a green split panel with
img-013, series-1 interactive the four rings on sage. This one opens on Hadas in her green dress at the
Brand Manager Day wall, full width, over a separate deep-green title band with a mint button, set in IBM Plex
Sans Hebrew — the only page of the six with text off the photo, a stacked photo-and-band and Plex.
