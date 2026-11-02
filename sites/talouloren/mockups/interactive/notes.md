# talouloren — interactive mockup "הזרקור" (The Spot) — station 4e notes

Designer 0.7.1 · run 2026-11-il-brand-02 · 2026-11-02 · concept `sites/talouloren/concepts.md` §4.2.

One file, `dist/index.html`, built by `src/build.mjs` from the passed copy (`copy/he.json` rendered
into the HTML, `copy/en.json` inlined for the toggle; 408 copy keys, no placeholder text of ours).
Media by `src/make-media.sh` (`# media:` headers for `dist/img/**`, `dist/video/**`, `dist/fonts/**`;
`dist/video` is a symlink into `~/.oneshot/assets/talouloren/mockups/interactive/video`).
Rebuild: `bash src/make-media.sh && node src/build.mjs`.

Routes (hash views; CSS `:target` works with JS off): `#home` (11 sections), `#story`, `#launch`,
`#partnership`, `#work` (filter) + 11 case pages `#work-<slug>`, `#about`, `#brands` (form), `#watch`
(six series, 9:16 rows), `#course`, `#check` (intro, 10 questions one per screen, contact + consent),
`#thanks`, `#snapshot`, `#book` (page) + the booking drawer opened from every "לקביעת פגישת ייעוץ",
`#booked`, `#privacy`, `#accessibility`, 404 (`#notfound` for any unknown hash). English toggle in the
header (whole page mirrors to LTR, choice kept in localStorage).

## look-log

Bar for every round: `dossier/talouloren/assets/old-site-desktop.png` / `-mobile.png` (talouloren.com,
also opened live with Playwright: a white page, a 1328x360 grey slider "TOTAL SUCCESS EXPERIENCE",
three boxed photo tiles) and shaharnaor.com opened live (dark navy, a generative particle wave, small
round headshot, two pill buttons). Gold pages read: `agents/designer/gold/README.md` + notes.

**Round 1 (first screen + the rest drafted), `shots/round-1`.** The sheet was nearly black on every
frame: the lightbox and drawer had `display:grid` overriding `hidden`, so a dark overlay with a close
button sat over the page; under it the hero split worked (vid-033 Tal on black left, Karantina
headline right) but the headline ran to five lines at 104 px and the film's inner edge ended in a hard
vertical cut. On the phone the document was 502 px wide (the final call's glow pseudo-element
overflowed), so everything sat off-centre. Changes: `[hidden]{display:none!important}`, overflow
clipped on `html`, headline cut to 88 px max / 13ch, a three-stop fade on the film's text edge, the
"▶ film" chip moved off the WhatsApp chip. Already at a glance better than the old site's grey boxed
slider, not yet better than shaharnaor.com's first screen (that one is calm and finished; mine was
broken).

**Round 2, `shots/round-2`.** The first screen now reads as one picture: Tal lit on the left fading
into black, the four-line headline, the approved subtitle, two outline doors, the four client names;
the spot rests on the headline and lifts the film around his face. Wrong as design: Shahar's
placeholder frame was invisible (black on black, a tiny square), and on the phone the "{n} / 10"
counter of the Home question showed its raw template. Changed: placeholder frame on a raised ground
with a large gold-outline square and his name in outline type, counter rendered as "3 / 10", phone
film cut from 62 % to 54 % of the screen so the doors start above the bar. Clearly better than
old-site-desktop.png at a glance (the business's own film full-height vs a grey 360 px banner); on a
par with shaharnaor.com and more personal (a person talking vs a wave).

**Round 3, `shots/round-3` (+ `shots/round-3/routes`, every route at 1440 and 390).** First screen
holds on both widths; the whole page shot shows the rhythm: dim-lit pains, outline ladder filling
with the last word in metallic gold, two lit door cards, Q3 answerable on Home, count-up stats over
mirrored marquees (logo marks + names), the pinned case run, partners, the Mercedes band, FAQ, the
final call with the gold button in the light. Wrong: every route heading carried a focus ring (the
router focuses the h1), and the English toggle emptied the page (the client dictionary was flat but
read as nested; the `:target` fallback also hid `#home` once JS ran). Fixed both; English verified on
Home and the Check. Better than both bar pages: no section of the old site has motion or a
booking path inside the page; this one has the Check, the drawer and the snapshot.

**Round 4 (whole page + every route), `shots/round-4` + `shots/round-4/routes`, `routes-d.png`,
`routes-m.png`.** Checks run once: check-design flagged the partner names as captions under photos
→ now overlaid inside the frame on a scrim; audit-mockup's early-scroll CLS was 0.54 (the 300 KB
HTML streams in on slow 4G and the hero text was painted before the fonts and the rest of the hero
were in) → the film comes first in the DOM, the first-screen faces are inlined, and the hero text is
revealed on DOMContentLoaded + fonts (no-JS unaffected): early 0, settled 0. Inspector polish taken:
placeholders set in the text face (not mono), flat placeholder ground, no glow on the gold button,
one page margin (wrap 1440), mirror spacing tightened, tap targets ≥ 44 px, footer clear of the
WhatsApp chip. Last sheets looked at for overflow, overlap and unreadable text at 1440 and 390: none
left. Against old-site-desktop.png and shaharnaor.com side by side this page wins at a glance: the
owner's own film at full height under a light the visitor moves, the brand's black-and-gold signature
kept, and the Check, the session and WhatsApp one tap from every screen.

Skill rules overridden (tools.md: skills polish, never direction), one line each:
- tasteskill `eyebrow`: "Success is Beautiful" over the hero is the approved eyebrow (brief); the grey
  labels over the pains and the ladder are concept §4.2 section labels. Kept.
- `gradient-text`: the metallic gold is A16 ("the old gold with its metallic gradient"); outline→fill
  words use background-clip. Kept.
- `text-shadow`: the glare on the lit pain line is the concept's overexposure. Kept.
- `headline-lines`: the hero headline is the partners' approved line (two sentences); four lines of
  display type at 1440, never cut. Pains are list lines, not headlines.
- `covered-text` @768/390: text passes under the fixed phone bar while scrolling (bar has a fade ground).
- `long-pin`: the pinned case run is concept §4.2 (cards travel at every screen).
- `side-scroll`: the case and video rows peek on purpose (references #14).

## images

All business-owned (`dossier/talouloren/assets/index.json`, licence `business-owned`). Nothing drawn
wider than its source.

| dist file | source | use |
|---|---|---|
| video/hero-{d,m}.{mp4,webm} | vid-033 10–22 s, crop 960x1080 (x 620) | hero loop (1.29 MB / 0.87 MB mp4; 0.89 / 0.58 MB webm) |
| img/hero-{d,m}.webp | vid-033 frame 10.6 s, same crop | hero poster / LCP (no-motion state) |
| img/tal.webp | vid-033 frame 26 s, 4:5 | Tal's partner frame (dossier `team[0].video_appearances`) |
| img/door-story.webp | img-024 (1500), 4:5 | Story door |
| img/door-launch.webp | img-020 (1920x995), 4:5 | Launch door |
| img/band-{d,m}.webp | img-014 (2000) | Partnership band, /partnership hero |
| img/case-*.webp | frames of vid-038, vid-022, vid-055, vid-020, vid-029, vid-042 | case posters (B&W at rest, colour when lit) |
| img/route-story.webp | vid-015 frame 8 s | /story film slot |
| img/route-launch.webp | vid-027 poster | /launch film slot |
| img/route-course.webp | vid-036 poster | /course film slot |
| img/route-brands.webp | img-021 (2000) | /brands hero |
| img/watch-*.webp | vid-040, vid-009, vid-030, vid-048, vid-059 + the case frames, 9:16 | /watch, /work voices, /thanks |
| img/sn-*.webp | img-107, img-110, img-105 (Behance covers) | Shahar's work strip |
| img/logo-*.webp | logo-030, 027, 034, 001, 032, 002, turned white on transparent | proof marquee (A4: logos allowed) |
| img/sig-gold.svg, sig-white.svg | dossier signature files | header, footer draw-on, snapshot, booked |
| fonts/* | Karantina 400/700, Heebo 400/500 (OFL, Fontsource), Hebrew + Latin subsets, self-hosted | 4 first-screen faces inlined |

Video slots play on tap in a lightbox from `youtube-nocookie.com/embed/<id>` (ids from
`dossier.videos[].source_url`); no third-party request before a tap.

## gaps

- **Shahar's portrait:** none exists. A marked frame ("צילום בדרך · Portrait coming", gold square,
  name in outline) in his place on Home and /about; his work strip under it. Never another man's photo.
- **Partners' 30 s film:** not shot. The hero loop is vid-033 (Tal alone); "▶ {hero_film_caption}"
  opens vid-036 (the BRAND YOURSELF trailer) in the film slot. Same slot takes the new film.
- Visible placeholders as passed in the copy: all prices, `{session_length}`, `{check_minutes}`,
  `{budget_ranges}`, `{turnaround}`, `{consent_text}`, `{privacy_policy}`, `{case_story_*}`,
  `{name_to_confirm}`, accessibility statement fields.
- Snapshot content has no copy (it is the scan's output): observations and first move shown as
  `{observation_1..3}` / `{first_move}`; the five readings are sample values marked `MOCK`.
- Booking slots (09:00…18:30 over the next 7 non-Saturday days) are mock UI for a calendar tool not
  yet chosen; the card form is marked `MOCK · Cardcom`; nothing posts anywhere.
- Logos: only 6 of the 17 brand names have a usable mark in the dossier (200 px JPEGs, converted);
  the rest are set as type in the same marquee. Vector logos are a pitch point.
- Case stories for Amdocs, Maccabi, SEAT, Park Bavli are placeholders; Eugene Perma, Visa Cal, Doron
  Shefer, Rita and AMT have no rendered poster here (their case pages show a titled film tile).

## conflicts

- Primary action (from concepts.md): hero = the two doors (brief), gold Check in the header and the
  phone bar, WhatsApp one tap everywhere (bar button / desktop chip); `audit.json.recommended` is
  WhatsApp. Not blocking.
- Hero density: interactive keeps the approved subtitle in the hero (concept §4.2, split layout);
  heavier than the calibration's "title + one action". Not blocking.
- English names: `en.json` says "Take/Start the Spotlight Check" while the brief's fixed name is
  "Focused Check" (review N1, open). Used as passed; not mine to change.
- First-load transfer measured 1,178 KB on the phone, of which ~580 KB is the hero webm that starts
  300 ms after `load` (counted by the audit's network window); HTML 320 KB (inlined copy dictionaries
  and four inlined font subsets), images 258 KB, fonts 32 KB. 4g splits the dictionaries per locale.
- None blocking.

## checks (end of round 4)

- `node tools/check-design.mjs talouloren`: interactive **ok** (warnings: 4 tracked all-caps labels =
  the Latin tagline "Success is Beautiful", which the brief keeps in English).
- `node tools/check-places.mjs talouloren`: 0 borrowed images, pass.
- `node tools/audit-mockup.mjs talouloren interactive` (`audit.json`): LCP 808 ms, CLS 0,
  scroll CLS early 0 / settled 0, 0 third-party hosts, 0 images without alt, 0 taps under 44 px.
- Booking CTA: every WhatsApp link is `https://wa.me/972504635536?text=…` (dossier `contact.whatsapp`
  +972504635536, prefill from the copy's `ctaText` / `msg.whatsapp_prefill`); phone `tel:+972504635536`.
- Walked with Playwright at 1440 and 390: every route, the Check end to end (Q3 single, Q8 multi, Q6
  optional, Q10, contact + consent) → thanks (first name) → snapshot (business name from Q1) → drawer
  (day, slot, details, pay) → booked (date and time carried), English toggle, 404. No console errors.
- Reduced motion: no spot, evenly lit film, lists and words fully lit, marquees become static wrapped
  rows, no pin, no video (poster). Keyboard: drawer and lightbox trap focus, Esc closes, focus returns.
- Other businesses in this run: none (only talouloren). Against mutag-meitiv (run 2026-10-il-brand-01):
  a black film-led studio page with one gold accent vs a white-and-green workshop programme — nothing
  shared in ground, type, first screen or motion.
