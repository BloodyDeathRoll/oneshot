# talouloren · calm — "אור עליון" (Top Light) · station 4e notes

Designer 0.7.1 · run 2026-11-il-brand-02 · 2026-11-02. Built to `sites/talouloren/concepts.md` §4.1 with the passed copy
(`copy/he.json`, `copy/en.json`). One file: `dist/index.html`, hash routes. Built by `src/build.mjs` from `src/page.css`,
`src/page.js` and the copy JSON; every image, video and font by `src/make-media.sh` (`# media:` headers). Hebrew is in the DOM;
English sits in a `<template>` and the toggle swaps it in (`lang`/`dir` switch, choice kept in localStorage, `?lang=en` works).

Routes: `#/` (Home, the brief's 11 sections) · `#/story` · `#/launch` · `#/partnership` · `#/work` (filter) · `#/work/<slug>`
(11 case pages, three parts) · `#/about` · `#/brands` (films + form) · `#/watch` (six series, 9:16 rows) · `#/course` ·
`#/check` (intro, 10 questions one per screen, contact + consent) · `#/thanks` · `#/snapshot` (the print) · `#/book`
(call sheet: week strip, slots, details, sample payment) · `#/booked` · `#/privacy` · `#/accessibility` · 404.
All backend flows are front-end only: no request leaves the page; answers live in sessionStorage.

## look-log

Bar compared every round: `dossier/talouloren/assets/old-site-desktop.png` / `old-site-mobile.png`, and talouloren.com and
shaharnaor.com opened live with Playwright (2026-11-02). Gold read: the-sign notes (global-surf), as the concept names.

**Round 1** (`shots/round-1`, first full build). The sheet showed three real faults before any taste question: (1) the hero was
a field of grey glitch blocks — the dossier's "clean" 30–42 s cut of vid-036 opens on a glitch transition frame (32.7 s) and also
carries a text card at 38–39.9 s, and the poster I took at 30.0 s was that glitch; (2) every font fell back to Times — Chromium
refuses `url(fonts/…)` over `file://`, so the Hebrew read as a default page; (3) the phone page was zoomed out to 624 px because the
names wall had no break opportunities (no spaces between `<bdi>` names). Against the old site it did not yet win: the old one at
least has its gold signature and clean grey slider; mine looked broken. Changes: measured the scene cuts with ffmpeg and cut a new
9.1 s loop from three clean shots (wide top-lit 34.40–37.95, Tal to camera 40.00–42.90, wide 29.95–32.60), poster = its first
frame; fonts inlined as data URIs from the self-hosted files; spaces in the names wall, `minmax(0,1fr)` grid, `overflow-x: clip`.

**Round 2** (`shots/round-2`). First screen now reads as the concept: Tal on his stool under the one lamp, full-bleed, the
two-line approved headline centred in Frank Ruhl Libre 300, the "Success is Beautiful" eyebrow in the metallic gold gradient,
the white segmented "סיפור | השקה" control, and the "led by" foot (Tal's head crop + Shahar's gold-ring "בקרוב" circle + roles,
"▶ הסרט"). Wrong with it as design: the "הסרט" label ran under the desktop WhatsApp chip, and on the phone the partner strip sat
under the gold bar; lower down, the partnership band put its text over the Wella box (the box sits 21–69 % across the photo, and
at 1440 the photo cannot be cropped sideways), and Tal's partner frame was a half-face crop of the vid-033 close-up. Side by side
with the old site: clearly better at a glance now — the old first screen is a boxed grey slider on white with "TOTAL SUCCESS
EXPERIENCE"; this one is the studio itself at full width, in the brand's own black and gold. Changes: hero foot padding clears the
chip and the bar; band text moved to the physical right (empty dark side of img-019) at 390 px max, image anchored right;
Tal's portrait re-cut from vid-036 at 41 s (seated to camera under the top light, 4:5).

**Round 3** (`shots/round-3`, plus every route at 1440 and 390 shot separately and the Check/booking flows walked with Playwright).
First screen held; the partners section now pairs Tal in the studio with Shahar's black placeholder frame (gold square,
"צילום בדרך · Portrait coming") — a matched pair rather than a face and a hole. Found: `display:flex` on the Check's nav overrode
`hidden`, so Back/Next/Submit all showed on the intro screen; the views carried `hidden`, which would have blanked the page with
JS off once fixed; the play triangle flipped to point left in RTL (reads as rewind). Flow results: Q6 optional passes empty, Q10
needs a "when" answer, contact + consent gate Submit, `/thanks` greets by first name, `/snapshot` titles with the business name
from Q1, `/book` refuses without a day and slot then lands on `/booked` with the date and time; language toggle swaps both ways,
no console errors. Changes: global `[hidden]{display:none!important}`, views switched by class only (all views show with JS off),
play icons always point right.

**Round 4 — whole page** (`shots/round-4`, the set the critics should read). Ran `audit-mockup` (via a copy on port 8987: 8980 was
held by another session's server), `check-design`, `check-places`, the tasteskill inspector. Audit round 1 showed an early-scroll
CLS of 0.0317 from the display face swapping in under the hero headline, and 11 tap targets under 44 px (footer links, logo).
Fixed: `font-display: block` on the inlined faces (they arrive with the HTML), 44 px footer links and logo, `id="book"` on the
final call (its WhatsApp link is the no-JS booking path). Inspector fixes taken: secondary grey lifted to `#8a8a8a` (rail and
step numbers were 3.8:1), the large subtitle capped at 36 px, the swipe rows given `scroll-padding-inline` (cards sat flush at the
right edge at 390), the menu sheet removed above 1100 px, blur dropped from the play buttons. Against the old site and both live
sites: this page wins on the first screen and on the whole page — one full-bleed film of Tal under his own light where the old
site has a boxed grey loop; a white "light band" at the exact moment the copy says the light turns; the stats set huge; four case
films; the gold kept to the signature, the eyebrow and the booking actions. talouloren.com's restraint and shaharnaor.com's dark
ground are both kept; neither has a hero this strong or any booking path inside the page.

Inspector items kept, with why (tools.md: a skill FAIL against the concept stays with a line): **mono** — the `{placeholder}`
chips are monospace on purpose so an undecided value can never pass for a real one; **numbering** 01–05 — the five pains are a real
sequence and the concept asks for the side-rail numbers; **eyebrow** — "אולי זה נשמע מוכר" and "טל ושחר" are copy headings the
copy gives those sections; **gradient-text / gradient** — the metallic gold eyebrow is the brief's A16 accent, and the radial in
Shahar's placeholder is the studio dark; **text-shadow** — legibility over video (playbook §1a scrim); **glass** — two surfaces left
(sticky header, segmented control over the film); **still-page** — calm has no canvas and no reveal animations by design; motion is
the film loop, the sheen on the eyebrow, the scroll-driven ladder and hairline, parallax and the micro-interactions;
**side-scroll / covered-text** at 390 — the case cards are a swipe row with a peek and dots, as the concept asks; **size-count** —
noted, not changed at 4e.

Measured (`audit.json`): first load 554 KB (HTML 474 KB incl. ~200 KB inlined fonts, images 82 KB), LCP 1.26 s on the throttled
phone, CLS 0, early-scroll CLS 0.0082, settled 0, third-party requests on load 0, alt missing 0, own JS ≈ 13 KB inline (uncompressed). Hero video
after first paint: m1280 VP9 0.99 MB / H.264 0.90 MB (used up to 1100 px wide), d1920 1.66 / 1.29 MB. Reduced motion and
Save-Data: poster only, no parallax (looked at, 390). No WebGL/canvas anywhere (calm). Film slots are YouTube links that open a
`youtube-nocookie` embed in a `<dialog>` only on tap (Esc closes, focus returns).

## images

All `business-owned` (dossier `assets/index.json`); none drawn wider than its source.

| file in dist/img | dossier asset | use |
|---|---|---|
| hero-1280 / hero-1920 | vid-036 (loop's first frame, 34.4 s) | hero poster |
| video/hero-*.mp4/webm | vid-036 source, 3 clean shots 29.95–42.90 s | hero loop (store, not git) |
| tal-avatar | img-001 (head crop above the baked text) | hero "led by" circle |
| tal-portrait | vid-036 frame at 41 s, 4:5 | partners, about |
| door-story / door-launch | img-025 / img-029, 4:5 crops 800×1000 (native) | doors, /story, /launch |
| band-1920 / band-phone | img-019 (2000 px) | partnership band, /partnership hero |
| sn-pale-force / sn-coca-cola / sn-privex | img-107 / img-110 / img-104 (Shahar's Behance covers) | Shahar's work strip |
| case-amdocs / -maccabi / -seat / -park-bavli | frames of vid-038 / 022 / 055 / 020 | case cards, case pages |
| w-* | frames of vid-029, 060, 042, 013, 058, 024, 023 | /work rows, case pages |
| b-* | frames of vid-016, 035, 019, 053, 021, 006, 002, 041, 039, 045 | /brands films |
| tall-* | frames of vid-009, 030, 040 (vertical), 007, 004, 011, 012, 010, 048, 059, 027 | 9:16 cards (/work, /about, /watch, /course, /thanks) |
| sig-gold / sig-white / sig-black .svg | dossier signature files | logo, snapshot signature |

Not used: img-002…013 and vid-001/003/063 (other men, identity rule), vid-054 (`unknown`), logo JPEGs (names set as type, as the
concept says). No stock.

## gaps

- **Shahar's photograph** — none in the dossier: a marked placeholder everywhere he appears ("צילום בדרך · Portrait coming",
  "בקרוב" in the hero circle). shaharnaor.com shows a small round B&W headshot of him (seen live); not used, not harvested.
- **The partners' 30-second film** — not shot; "▶ הסרט" opens vid-036 (the BRAND YOURSELF trailer), the hero loop is cut from it.
- **Prices, session length, Check minutes, budget ranges, turnaround, capacity, consent text, privacy policy, accessibility
  details, case stories, snapshot observations / first move / partner name** — visible `{placeholder}` chips, never numbers.
- **Snapshot scores** are sample values on a sheet labelled "דוגמה / Example".
- **Course purchase** — no checkout page in the copy or the dossier; "לרכישת הקורס" opens WhatsApp with the course's own
  `ctaText` (Cardcom is the brief's tool, mocked nowhere).
- **Booking slots and the week** are interface mock-ups (times are not facts); payment is labelled "תשלום לדוגמה" and posts nowhere.
- **Video testimonial names** for vid-010/040/009/030 — `{name_to_confirm}` chips (copy).
- **Brand logos** — set as type (white-ground 200 px JPEGs would look pasted on black).
- **English "Focused Check" vs "Spotlight Check"** (review N1) — the English copy as passed says "Spotlight Check".

## conflicts

1. **Hero density vs the brief** (concept report note): the brief's hero has eyebrow + headline + subtitle + two doors + film slot;
   calibration says title + one short action. Built as the concept says: subtitle moved to the first line of the next section;
   doors as one segmented control; the Check in the header and the phone bar. Not blocking.
2. **Primary action**: `audit.json.recommended.primary_action` is WhatsApp; the brief makes the Check Home's job. Check is 1 tap
   (header button / phone bar), WhatsApp 1 tap (round button in the phone bar, chip bottom-left on desktop, every page end).
   Not blocking.
3. **The dossier's vid-036 cut (30–42 s, "no text, no cut") is wrong**: it holds a glitch transition at 32.7 s and a text card at
   38–39.9 s. Re-cut from three clean shots (see round 1); the dossier's renditions are not used. The harvester's `cut` should be
   corrected. Not blocking for this mockup.
4. **Fonts inlined**: base.md says Google Fonts may load at 4e and 4g self-hosts; Shahar asked for self-hosting now. The woff2 files
   are self-hosted in `dist/fonts/` and also inlined into the HTML so the page renders from `file://` (Chromium blocks font files
   there). At 4g they become normal self-hosted files. Not blocking.
5. **Light theme (house rule 1)** is surf-only; this run is `brand_design` and the brief requires dark. Not a conflict.
6. **Audit tool port**: `tools/audit-mockup.mjs` hard-codes port 8980, held by another session's server; it was run from a
   temporary copy on port 8987 (deleted after). Not blocking.

No blocking conflict.

## divergence (hard constraint 5)

One business in this run; the three variants differ on purpose. Against interactive and unique as they stand in their latest
shots: calm opens on the full-bleed wide studio film with a centred serif headline and a "led by" partner strip; interactive opens
on a split with a big condensed Karantina headline beside a close-up of Tal on black; unique opens on a drawn beam of light with
its own serif. Calm alone steps to a white band for "ואז האור מסתובב", uses Frank Ruhl Libre + Assistant, and has no canvas.
