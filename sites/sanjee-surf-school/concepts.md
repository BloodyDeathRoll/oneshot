# Sanjee Surf School, Weligama: concepts

Station 4d · creative-director 0.6.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-05.

Inputs:
- `dossier/sanjee-surf-school/dossier.json`, `audit.json` + `audit.md`, and the old-site evidence: `assets/old-site-desktop.png` (first screen), `funnel/walk/01-home-fold-settled.png`, `funnel/walk/01-home-toast.png`.
- `sites/sanjee-surf-school/copy/en.json`, passed at 4c in round 2. `review.md` notes N5, N7, N9, N10, R9 and R2-N2 are carried into the rules below.
- All 41 images, opened one by one, plus full-size crops of img-002, 006, 007, 009, 010 and 013. Widths were measured from the files with `sips`, and they match `assets/index.json`.
- The four videos, from their dossier entries only. No file exists (§2).

Also read or opened this run:
- `agents/designer/references.md` in full, and `agents/designer/custom.md`.
- `agents/designer/scroll/playbook.md` §0 and the pattern list.
- `.claude/skills/impeccable` for its Modes.
- The gold README and all notes. The gold pages were rendered in Chromium at 1440 and 390: Global Surf `postcard`, `the-sign` and `try-your-week`, plus `the-lavish-haven.html`, `ka-surf-hostel.html` and `layday-surf.html`. **Limit:** in this worktree the Global Surf clips did not load and `gold/shots/global-surf/` is absent. I saw those three pages' first-screen form (title, button, header), not their footage. The Lavish, KA and Layday first screens rendered in full.
- `sites/cheeky-monkey/concepts.md`, `sites/lotus-surf-house/concepts.md` and `sites/coconut-surf-inn-guest-house-and-restaurant/concepts.md`, for the divergence table only.

Colours were sampled with `ffmpeg` from original pixels: area-averaged crops, or medians over a measured pixel region. Each region is given as `x-range, y-range` or `w×h@x,y`. Contrast uses the WCAG formula.

---

## 1. What this business actually is

Everything people say about this school is about one man. All five readable Google reviews (5/5, 13 reviews, read 2026-11-05) are about one instructor, and four of them name Sanjee. One says he kept the writer "in the best positions to catch the wave". He learned "on a broken board my uncle fixed with resin and hope", and he says he still paddles out every single morning.

The school already has a working 67-page site with its own booking dialog. That site makes you tap five times, type three fields and pay by card before you can talk to anyone. Its home page has no WhatsApp or phone link. Its first screen shows an empty infinity pool that is not the school's, and names neither the business nor Weligama.

It sells more than a lesson: 3 lessons, 17 rental rows, 12 tuk-tuk tours and 11 named waves it rates by level.

Its best-looking pictures are machine-made and its real ones are small. Those real ones keep showing the same two things: a rust-red headland (img-002, img-008) and a yellow board with a pink rail (img-007, img-008).

---

## 2. What the material can and cannot carry

### Video, the business's own (`dossier.videos[]`)

**None is usable, and no concept is designed around video (Alon's decision: go on stills).** No file, sheet, cut or poster exists for any of the four, and nobody has seen them play.

| Clip | Licence | Length, size | What is known | Status |
|---|---|---|---|---|
| vid-001 | business-owned | 23.2 s, 832×464 | Opening frame only (img-005): instructor and student practising the pop-up on sand | Not on disk: 403, and `fetch-video` says unsupported |
| vid-002 | business-owned | 30.0 s, 848×480 | Opening frame only (img-006): a surfer turning on a green wave | Not on disk. Under the 1200 px floor anyway |
| vid-003 | unknown, reviewer upload | 5.1 s | Still only (img-038). The review it belongs to is flagged | Not on disk, not the business's |
| vid-004 | unknown, reviewer upload | 13.8 s | Still only (img-040) | Not on disk, not the business's |

So there are no timestamps to give and no hero loop. Both own clips would still be pitch material if the owner sends the files.

### Photographs, the business's own

20 are `business-owned`. **The largest usable width of the best photograph is 2000 px (img-002, 2000×1500).** It is the only own landscape at 1920 px or more, and it has no surfer in it, as the harvester reported. Four other own landscapes clear the 1200 px floor: img-009 and img-010 at 1600 px, and img-013 and img-014 at 1280 px. Only img-009 is good enough to fill a screen.

Own photographs at 1920 px or more **on the long edge** number six: img-002, 003, 016, 018, 019 and 020. That matters for the set-piece rule below.

The ten strongest, in order:

| # | Asset | Measured | What it is, on sight | Role and limit |
|---|---|---|---|---|
| 1 | **img-002** | **2000×1500** | From the sand: a huge clean sky, blue bay, a rust-red headland with palms and tiled roofs. Oversharpened at 100 %, but it holds. About 60 % of the frame is empty sky | Full-bleed to 1920. Phone crop 693×1500 |
| 2 | **img-007** | **962×938** | Sanjee from behind, carving on the yellow board with the pink rail, heavy spray, green wave. The best action frame. Soft at 100 %. **Rights flag:** may be a beach photographer's | Print: at most 640 css px on desktop, 390 on a phone |
| 3 | **img-009** | **1600×1067** | One figure paddling at a low aqua wave, pale sky above. Back turned, so not identifiable. Compressed but passable, and water forgives it. No rights flag | Full-bleed to about 1600 |
| 4 | **img-006** | **848×480** | A surfer turning on a green wall with white water behind (Google's still of vid-002). The second-best action frame. Soft | Print: at most 520 css px |
| 5 | **img-018** | **1440×1920** | Orange sunset over a breaking shore wave, tiny figures in the water. The most beautiful real picture, portrait | Full-bleed via landscape crop 1440×720, or portrait on a phone |
| 6 | **img-019** | **1440×1920** | Bare stilt poles in the shallows, footprints on wet gold sand. Portrait. No fishermen, whatever the old alt says | Half-bleed on desktop, full-bleed on a phone |
| 7 | **img-012** | **750×558** | Tall palms, a path, stalls, clean lines of swell behind. Very attractive, too small, processed | Print: at most 500 css px |
| 8 | **img-008** | **997×1024** | Sanjee walking out of the shallows with the board, smiling, rust cliff behind. Tilted and visibly smoothed, but it is his face | Print: at most 480 css px, tilt kept or corrected by crop |
| 9 | **img-017** | **1200×1600** | Three beach dogs in silhouette watching a sunrise or sunset. Charming and unmistakably real | Print: at most 600 css px |
| 10 | **img-005** | **832×464** | An instructor and a student in pop-up stance on a red and a blue soft-top on the sand. The only own picture of a lesson. Soft video still, faces visible | Print: at most 540 css px, owner to confirm consent |

The rest of the own set:
- img-013 and img-014 (1280×960): an empty beach and thatched parasols with lines of surf. Soft, so prints only.
- img-020 (1440×1920): silver light on the sea. Atmosphere from the owner's own camera, used once, in concept 3.
- img-016 (1440×1920): two palms against the sky. Used only as a colour source, because it could be anywhere.
- img-010 (1600×1067): a distant surfer in white water, droplets on the lens, rights flag. Held in reserve, and no concept uses it.

### Rejected on sight

| Asset | Why |
|---|---|
| **img-021 to img-032** (12, `unknown`) | I agree with the harvester: they look machine-generated. img-023 has a pyramid-shaped hill, and the others have too-perfect barrels and generic palms. They are the best-looking files in the folder, which is the trap. PLAN.md §9: generated imagery, still no |
| **img-015** (1368×1824) | The old hero: an infinity pool at what looks like a hotel. No page offers a pool. Using it would repeat audit F6 and present another place as the school |
| **img-035, img-041** (`stock`) | "Nilanka Sampath Photography" watermark, a third party's work |
| **img-033, img-034** (`review-photo`, Andrea Guenster) | Strong pictures, but same uploader and same month as the watermarked img-035, so they are probably the same photographer's. Not safe |
| **img-036 to img-040** (`review-photo`) | `usable: false` in the index. img-037 and img-039 add nothing own photos lack; img-038 and img-040 are grey video stills. **img-036 (1247×2000) is the exception worth a human's decision**: see §6 |
| **img-001** (1200×1600) | Four identifiable people posing and heavy cloud. Colour source only. The Terms promise consent before publishing identifiable images |
| **img-003** (1498×2000) | The only sight of the logo, on a tee on a motorbike seat. It prints "Coconut Surf Point", a name the copy does not use, and that would confuse things with another business in this run. Colour source only. Not redrawn: no logo file exists |
| **img-004** (618×608) | Too small, and it would read as "this is us". Nothing in the dossier says these huts are the school's |
| **img-011** (704×712) | Smoothed to plastic, and a rights flag |

### Atmosphere

There is no `dossier/sanjee-surf-school/stock/` and none is needed. The owner's own sky, sea and sand pictures (img-018, 019, 020) cover this at 1440 px, and they are of this coast by the owner's own account, which a Commons file would have to prove.

### Words (`copy/en.json`)

- **Short and worth setting large:** `featureLine` "Making waves, one lesson at a time."; the two sentences of [1] "Sanjee, head instructor"; `closing`.
- **Must stay whole and together:**
  - [4] "By tuk-tuk", all four paragraphs, sits with the tour rows (R2-N2).
  - [2] ¶2 sits with the Week Intensive.
  - [6] "Other waves" has three paragraphs that already run beginner, intermediate, advanced. It is the natural shape of a three-part layout.
- **Long and working:** [3] "Board rental" (sizes, kit, deposit).
- **Hero words:** `tagline` is 57 characters, too long for the calibrated hero, so all three concepts use its own first words, "Surf lessons in Weligama", as the title. The whole `tagline` opens the booking section (`what_where`). This is the fourth business in the run to hit the `heroLine` schema gap.

### Numbers

- Lessons: USD 40, 50 and 160 (5 private sessions, 2 hours each per `lessons[2].duration_as_written`).
- Rentals: 16 rows across 8 durations, soft-top and hardboard, plus a bodyboard.
- Board lengths: 5'8 to 9'4.
- Tours: USD 15 to 120.
- Rating: 5/5, 13 Google reviews, captured 2026-11-05.
- Requirements: swim 50 meters, kids from 6.
- Kit to buy: USD 12 and 15.

### Gaps (and which ones to design around)

- **Hero media, the big one:** nothing large shows the school at work. All three concepts answer it differently. Concept 1 leads with the place, concept 2 makes a still of one paddler move, and concept 3 turns the small action shots into the composition.
- **Hours: none, on purpose.** No hours block and no week of "closed" (N10). No reply time either: `reply_time_hint` is not in the copy.
- **Cancellation: none, on purpose.** No placeholder line.
- **Private or group for the Beginner Lesson: unresolved.** No card may print a group-size row (N7).
- **Instagram: all socials are dead (F11).** The Instagram section the calibration asks for is omitted, not faked. No social icons in the footer.
- **Who runs it:** `flags_for_operator[0]`. Nothing on the page depends on it, but the first-person block does put a named man's voice on the page.
- **What the new site gives up:** the old site has live dates, five named slots and an $8 deposit stated before paying (`audit.md`, "What already works"). WhatsApp cannot match that, and nobody has seen that number answered. This is the honest cost of the audit's primary action, and it is for the human to weigh, not for the concepts to hide.

---

## 3. The page archetype for this business: **the paddle out**

**The page goes from the sand, out to the line-up, along the coast, and back in.** Distance from the shore is the organising idea. A first-timer stays near the top, and the further you read the further out you are.

Why this business and no other in the run:

1. **It is the run's only school.** Cheeky Monkey, Lotus and Coconut sell a place to stay. This one sells what happens in the water, so the page's axis is the water.
2. **Its first question is "is this for my level?"** (playbook §2), and level here literally is distance: pop-ups on the sand (img-005), first waves near shore, then the school's own ladder of waves from beginner to advanced ([6]).
3. **It is the owner's own sentence:** "I still paddle out every single morning." The best public review is about position in the water.
4. **It gives every weak photograph a job.** Taken as a hero contest, the action shots lose. Taken as stops on the way out, each one is the right picture at the size it can hold: sand (img-005), shallows (img-008), the paddle (img-009), the wave (img-006, img-007), the horizon (img-018), back on the sand (img-019).

It differs from the others on its axis: Cheeky Monkey goes *along* a road, Lotus goes *up* a house, Coconut goes *through* a day, and this goes *out* to sea and back.

**Mode (`/impeccable`):** Persuade first, and the visitor's success is one sent message. Boards and tours are Operate islands inside it, so those tables get precision rather than expression.

### The stations, and where every copy field goes

No template label names a station ("The shallows" is my shorthand, not page copy). The order obeys the audit: lessons, then rentals, then tours, with people, spot and season between them.

| Station | Fields | Audit order inside it |
|---|---|---|
| **A. On the sand** (first screen) | `businessName` in the header, "Surf lessons in Weligama", `ctas.primary` | what + where, action |
| **B. The shallows** (booking section) | `tagline`; [0] "Who we teach"; [2] "Lessons" + `lessons[]`; `ratings[0]`; [5] "Before you book"; button | what_where → level → price → included → trust → primary_action |
| **C. Board under your arm** | [3] "Board rental" + `rentals[]` + the two "to buy" rows of `priceList[]` | |
| **D. The line-up** | [1] "Sanjee, head instructor" + `credentials[]` + `languagesSpoken[]` + `testimonials[]` | |
| **E. Outside** | `spot`, `season`, [6] "Other waves, as we rate them"; `featureLine` nearby | |
| **F. Along the coast** | [4] "By tuk-tuk" + the 12 tour rows of `priceList[]`, in one unbroken block | |
| **G. Back on the sand** | [7] "Finding us", `contact.*`, `closing`, footer | |

### Rules for all three concepts

- **Primary action:** `ctas.primary` "Ask on WhatsApp", a real `https://wa.me/94774004422?text=…` link that works with JS off. The prefill names the business and whatever was chosen: "Hello Sanjee Surf School, I'd like to ask about the Beginner Lesson." The label names nobody, because nobody has verified who holds the phone.
- **`clicks_to_book` is 1 in all three:** the hero button goes straight to WhatsApp, and so does every per-offer button unless a concept says otherwise.
- **Secondary:** `tel:+94774004422` and `mailto:sanjee@sanjee-surf.com` as designed buttons or icons (F2), never underlined text.
- **Persistent phone bar:** "Ask on WhatsApp" at full width plus a phone icon. A 390 px bar cannot carry all six `above_fold` items, so it keeps what_where (in the header above it) and primary_action. The booking section carries the full order.
- **Phone header:** name plus a real menu (Lessons, Boards, Sanjee, Waves, Tuk-tuk, Finding us). This beats F3.
- **Credentials and languages sit with Sanjee only**, under his heading, and never in a school-wide "why us" row (N5). He is "head instructor" and nothing more. No "founder", no years, no student counts.
- **Beginner Lesson:** no group-size row on any card. "One-on-one" appears only inside Private Coaching's own details line, so nothing reads as a contrast (N7).
- **Week Intensive:** `level` is null, so no level words on it. "5 private sessions" and "2 hours" stay together, and [2] ¶2 sits beside it.
- **Testimonials:** verbatim, names as published (lower case included), no dates (R9). No added quotation marks, because Rossana's quote already ends in one (N9). The visual quote device is size and colour.
- **Rating block:** "5/5", "13 Google reviews", "5 November 2026", linked to `ratings[0].url`.
- **Tour rows are never collapsed**, never in a drawer and never on separate cards. [4] ¶3 and ¶4 stay in the same block (R2-N2).
- **Nothing on load:** no cookie notice, no toast, no modal (#20, F4, F5). No surf-report widget on this page at all, so the F4 fault cannot recur.
- **Alt text:** written from what is in the picture. Never reuse the old site's (img-019 "stilt fishermen", img-014 "perfect surf waves", img-016 "school location" are false). No captions.
- **Interface labels the template owns:** tile labels, "Soft-top", "Hardboard", "Call", "Email", "Open in Google Maps". None may state a fact the copy does not.

### Forecast: **No, in all three**

It would be a good answer to F4, and it is tempting. It fails the second condition as things stand.

| | |
|---|---|
| Dossier spot | **Coco Beach**, "a beach break" (`spot`). The old site's surf report and Google's map label say "Coconut Beach", and the tee says "Coconut Surf Point". The dossier: "Same place is likely, not proven" (`location.spot.note`), and the site's "eastern end of the bay" contradicts the pin (`contradictions`) |
| Nearest Rosa spot | **`weligama-west`, "Coconut"**, Midigama, 5.9601, 80.4017. Measured against Rosa's live `data/index.json`: 250 m from the school's Google pin |
| Why not | The host of Coconut Surf Inn calls that spot "a consistent A-frame reef break". This school calls its spot a beach break. Those may be two waves 250 m apart, and the nearest other spot is never shown as this one. Rosa's `coconut-beach` is on the other coast (Arugam) and must never be used |
| If the owner confirms they are the same wave | Add it in station E: `forecast.rosaSpotId: "weligama-west"`, light widget, headline in the concept's own type, lazy |

Coconut Surf Inn already carries that spot's forecast, so leaving it out here also keeps the two sites apart.

### Scroll set-piece: **No**

The rule needs the business's own usable video or at least eight own photographs at 1920 px or more. There is no usable video, and only six own photographs reach 1920 px, even counting the long edge of portraits and the tee. Concept 3's main item is confined to the first screen and is not a playbook set-piece.

### Embeds: **none**

The map is a designed "Open in Google Maps" button to `contact.mapUrl`. Zero third-party requests, on load or later.

---

## 4. Three concepts

### Concept 1 · calm: **"The sand"**

**The idea.** You are standing on the sand looking at the bay, and the white page comes up to your feet like a wash.

**The one thing.** The rust-red headland in img-002. It is the school's strongest picture, and the same cliff turns up behind Sanjee in img-008. Nothing else on the page is loud: there are no other full-colour moments until the aqua band.

**The first screen.**
- **Media:** img-002 full-bleed, 2000 px measured (desktop crop 2000×1250, keeping the bottom of the frame, so sky fills the upper two thirds and the headland sits low right). No grading beyond the original. Phone: the 693×1500 window at x≈1000, headland in the lower third.
- **The device:** the bottom edge of the photograph is not straight. It is one soft **wash line**, an SVG mask traced by hand from the foam edge on the sand in img-019, so the white page below laps up over the photograph's strip of sand. This is the concept's one shape (#28): hero edge, closing section edge, nowhere else. On load it runs up about 12 px and settles once, like the last of a wave.
- **Words:** header with `businessName` in ink, menu to the right. "Surf lessons in Weligama" centred horizontally and vertically in the sky, in **Source Sans 3** 600 at clamp(36–60 px), in ink `#253864` (measured on the cropped sky: 6.4:1 at the title's height, 4.8:1 at the header's). It is the text face, not the script, and smaller than a display word (calibration). One button below it: "Ask on WhatsApp", white on red.
- **Proof point:** not here. The title and button own this screen, and the rating goes in the booking section, directly above the action, where someone comparing prices needs it. It is 13 reviews, which reads better with the quotes close by than alone over a landscape.

**Structure.** Centred 720 px column for reading, 960 px for tables, full-bleed for pictures.

1. **Hero.** As above.
2. **The shallows, words.** `tagline` as a 28 px lead sentence. 7/5 split: "Who we teach" (script title) and [0] left; img-005 as a print on the right at 480 css px, cropped 4:3. It is the only picture of a lesson in the whole folder and sits exactly where it belongs.
3. **Lessons.** Script title, [2] ¶1 (what every lesson includes). Three stacked full-width rows on the `#D2EAF7` tint, rounded, with no borders. Each row: label at 24 px, then a compact details line with " | " separators ("Total beginner, beginner | 2 hours"), then `includes`. On the right, "USD 40" at 32 px and its own "Ask on WhatsApp". [2] ¶2 sits inside the Week Intensive row. [2] ¶3 sits below all three. Then the rating row, then "Before you book" [5] with its price date, then one more button.
4. **Feature band.** img-009 full-bleed (1600 px measured), 70 vh, `featureLine` in the script, in ink, set in the pale sky. The paddler is the only figure. This is where the page goes in the water.
5. **Boards.** 5/7 split: [3] on the left, on the right a compact rate table on white with columns Duration, Soft-top, Hardboard and `note`, built from `rentals[]`. Bodyboard row, then the two "to buy" rows. One button.
6. **Sanjee.** 5/7 split: img-008 as a print at 460 css px, corrected upright by crop (#26). Script title, [1] as a 22 px lead, then `credentials[]` and languages as a compact " | " line under his heading.
7. **Guests.** Rating headline, then a slideshow of the four quotes, one at a time at 24 px, dot navigation, swipe on phones (calibration).
8. **Outside.** `spot` and `season` beside img-013 as a print at 560 css px (the old site itself calls this picture Coco Beach; still no caption). Then "Other waves" [6], three paragraphs in the 720 column. img-006 at 480 css px sits on the right of the middle paragraph.
9. **Along the coast.** "By tuk-tuk" script title. All four paragraphs of [4] immediately above one continuous list of the 12 rows: label, USD, note on its own line. Each row has a small WhatsApp icon button with that tour in the prefill. A compact list, not cards.
10. **Back on the sand.** The wash line again, inverted, leading into a 6/6 split: img-019 full-height on the right half (phone: full-bleed portrait, 1440 px measured), footprints towards the camera. Left: "Finding us" [7], address, an "Open in Google Maps" button, `closing`, then "Ask on WhatsApp", "Call", "Email".
11. **Footer.** Name, the same three buttons, address, and nothing else. No social icons.

**Why it beats what we already have** (compared with `assets/old-site-desktop.png` and `funnel/walk/01-home-fold-settled.png`). The old first screen is an empty hotel pool behind tree trunks, a teal headline lost among branches and a cookie box over the bottom, and it names neither the school nor Weligama. Here the first thing a stranger reads is what and where, over a clean bright bay, with a WhatsApp button that takes one tap instead of five taps, three fields and a card, and no red "Could not refresh" box arrives six seconds later.

**Colour.**

| Role | Hex | Asset | What it is |
|---|---|---|---|
| ground | `#FFFFFF` | custom.md's clean white | the wash |
| tint | `#D2EAF7` | img-002, x0–899, y1201–1459 | pale foam and shallows in the bay |
| ink | `#253864` | img-003, x300–1199, y700–1799 | the school's own navy tee |
| sky | `#5BB4FD` | img-002, 400×80@800,500 | mid-sky. Active dot and focus ring only |
| **booking accent** | **`#DE1446`** | **img-005**, x210–460, y274–304 | **the red learner's soft-top on the sand.** White text 4.9:1. Booking actions only |

No rust in the interface: it stays in the picture. Sampled as UI it is a dusty `#A58270` (img-002), which would be the muted terracotta of the default look. This palette would look wrong beside a sand or cream ground, which would turn the wash into a beige strip, and beside any teal, which would bring back the old site.

**Type.** **Source Sans 3** (400/600) for everything people read and every control: a humanist sans, the nearest free relative of the lettering ringed around the logo on the school's own tee (img-003), with good figures for "USD 40" and "5'10–6'2". **Mr Dafoe** for section titles only (40–64 px): a loose brush script of the kind on old board decals, the board being what this school's story starts with. The designer tests it on every title word, especially "Sanjee, head instructor" and "By tuk-tuk". Two families, Latin subset, about 80 KB. Neither is on the default-look list, or used elsewhere in the run or in gold.

**Motion.** No canvas.
- **Hero media:** the still itself, with the one-time wash line (mask translate, 900 ms, ease-out).
- **Micro-animations:** buttons press to 0.97 over 120 ms; slideshow slides 350 ms with a dot that stretches into a short bar; prints settle 8 px on first view with no fade on headings; the phone bar slides up once the hero's button leaves the screen; table rows take a soft hover tint.
- **`prefers-reduced-motion`:** the wash line is static, slides cut, no settle.
- **JS off:** the wash line is static; slideshow is horizontal scroll-snap (#14); every link works.
- **WebGL:** not used.

**The booking pattern.** Morgan's Rock: one action per offer, each with its own prefill, plus the persistent bar (#4, #7, #15). No panel. It is the shortest possible route, and it directly beats F1. Cost: about 350 KB first load (img-002 phone AVIF about 130 KB; desktop about 240 KB), to be measured at 4e.

**Photographs.** img-002 (full-bleed, hero), img-009 (full-bleed, band), img-019 (half-bleed, closing), img-005, img-008, img-013, img-006 (prints, each at or below its limit in §2).

**Forecast.** No (§3). **Scroll set-piece.** Not applicable to calm.

**What would make this concept fail.** A surf school whose first screen has no surfer in it: a critic or Alon may simply find it reads as a nice beach rather than a school.

---

### Concept 2 · interactive: **"Where you start"**

**The idea.** One person paddles at one wave, the water really moves, and the first thing the page asks is where you are starting from.

**The one thing.** The wave in front of the paddler in img-009: a low aqua band and a single small figure. It is also the only own picture that shows exactly what the archetype is about. Nothing else on the page has moving water.

**Main item.** A hand-written **WebGL shader on img-009**. A slow, low-frequency vertical displacement runs along the rows below the horizon, so the swell lifts and passes through the picture, with faint specular movement on the surface. The sky and horizon are locked, and the paddler is masked out of the displacement using a radius around `focalX`/`focalY` (schema v0.10), so a replaced photo still lines up. Amplitude at most 3 css px. This is a cinemagraph of a still, because there is no video.

**The first screen.**
- **Media:** img-009 full-bleed, 1600 px measured (desktop crop 1600×1000). Above 1600 px wide the picture is capped at a small scale (at most 1.2×), which water forgives. Phone: the 493×1067 centred window, about 1.3 source px per css px, so this is the softest of the three on a phone; the designer checks it on sight.
- **Words:** `businessName` in the header in ink on the pale sky. "Surf lessons in Weligama" in **Manrope** 700 at clamp(34–56 px), ink `#181D10` (7.6:1), **centred horizontally but in the lower third**, on the calm lower water. **This departs from the calibration's "vertically centred" on purpose**: the paddler sits at about 48 % of the frame's height, and a centred title would sit on the picture's only subject. One button below the title: "Ask on WhatsApp", white on cobalt. For the human to judge at the pick.
- **Proof point:** not here. Over moving water a rating is a third thing competing, and the very next screen is about you, with the rating in reach.

**Structure.** 12-column grid, tighter and more tool-like than concept 1.

1. **Hero.** As above.
2. **"Who we teach" panel.** On the tint: `tagline`, script title, [0], then **five big tiles** in one row (phone: 2 + 2 + 1): "Total beginner", "I can stand up", "Intermediate", "Advanced", "Not sure" (#2).
3. **Lessons.** Directly under the tiles: three cards in a row (phone: swipe with next-card peek, #14). Price is always visible and no card ever disappears. A tile only places a small "for you" dot on cards whose `lessons[].level` includes it, and it never dims the others. Week Intensive has no level, so it never takes a dot and is never greyed. [2] ¶1 above the cards, ¶2 on the Week card, ¶3 below. Rating row beneath. Then:
4. **The message.** A live preview: a white speech-bubble panel with the words the visitor is about to send, built as they tap (level from the tile, lesson from a card, a native date field, a "Not sure" chip, people 1 / 2 / 3+ / Not sure) (#2, #3). The button under it is "Ask on WhatsApp". Beside it, "Before you book" [5] with the price date. The panel is optional: every card's own button already goes straight to WhatsApp in one tap.
5. **Boards, to scale.** [3] on the left. On the right, **the six board types of [3] ¶2 drawn as simple SVG outlines standing on one baseline, to true relative length** (5'8 up to 9'4), filled in the tint, each labelled with its length range (#12). Hovering lifts one 4 px. It is a chart, not a decoration, and it gives this section something no photo here can. Under it, the rate table with a sliding Soft-top / Hardboard pill on phones and two columns on desktop; digits roll when it switches. Then the bodyboard and "to buy" rows.
6. **Feature band.** img-018 full-bleed via the 1440×720 landscape crop (1440 px measured), `featureLine` in the script in ink, set in the peach sky.
7. **Sanjee and his students.** 7/5 split: img-007 as a large print at 620 css px with Kube's ±4 rem parallax, off on phones (#17). Script title, [1] as a lead, credentials and languages line. Below, a full-width swipe row of the four quotes with next-card peek and dots, the rating heading it.
8. **Outside.** `spot` and `season`, then "Other waves" [6]. All three paragraphs always show, and the chosen level's paragraph takes the tint behind it, a slow 240 ms cross-fade. Prints: img-006 (500 css px) and img-014 (500 css px, 4:3).
9. **Along the coast.** 5/7 split: [4] in the left column, whole and `position: sticky`, so ¶3 and ¶4 are beside the rows at every scroll position on desktop. The 12 rows are on the right with their notes. On a phone the block sits immediately above the rows. Each row: small icon button with that tour in the prefill.
10. **Back on the sand.** The payoff: img-002 full-bleed at 2000 px with `closing` and the button in the sky, as the first time the whole bay is seen. On white beneath: "Finding us" [7], the map button, "Call", "Email".
11. **Footer.** Name, contact buttons, address.

**Why it beats what we already have** (compared with `assets/old-site-mobile.png` and `funnel/walk/01-home-fold-settled.png`). The old page opens on a still hotel pool and makes you scroll 2,500 px before a price. This one opens on moving water and a person actually going out, and the next screen answers "is it for my level, what does it cost, and what do I type" with one tap on a tile. Where the old dialog has five steps, three typed fields and a card, this writes the message in front of you and sends it through the channel the rental page already offers.

**Colour.**

| Role | Hex | Asset | What it is |
|---|---|---|---|
| ground | `#FFFFFF` | custom.md's clean white | |
| tint | `#D6DAE0` | img-006, x200–462, y200–314 | white water on the wave. Panels, boards in the chart |
| selected state | `#91B0C8` | img-009, x0–1599, y900–1050 | the calm lower water where the title sits. Selected tile and highlighted paragraph, ink text on it 7.6:1 |
| ink | `#181D10` | img-016, x200–999, y400–999 | the dark of a palm frond against the sky |
| **booking accent** | **`#05368A`** | **img-001**, x698–946, y642–1208 | **the cobalt learner's board standing on the sand.** White text 11.1:1; 4.9:1 against the lower water behind it. Booking actions only |

The wave's own aqua (`#53969D`, img-009, x0–1375, y380–519) stays in the picture. In the interface it would be the muted teal of the default look and of the old site. This palette would look wrong beside warm sand or orange, which would pull attention from the only moving thing on the page.

**Type.** **Manrope** (400/600/700) for reading and every control. It has tabular figures for the rate table and the to-scale chart, and this concept is the one with the most numbers on show. **Covered By Your Grace** for section titles only (36–56 px): a sturdy marker hand, like someone writing on a beach-hut board, legible on "Other waves, as we rate them". Two families, about 85 KB. On no default-look list, and unused elsewhere in the run or in gold.

**Motion.**
- **Main item:** the swell shader, on one small canvas over the `<img>`, hand-written, about 6 KB. It starts after first paint, pauses out of view, and runs at low resolution (at most 1× DPR).
- **Micro-animations:** tile select with a sliding pill and a springy dot on the matching card (spring, about 300 ms, no overshoot past 1.05); the message rewrites word by word as a soft cross-fade, not typing; rolling digits on the pill; board lift; momentum on the swipe row; press scale 0.97 on every button.
- **`prefers-reduced-motion`:** the still photograph, no swell, no parallax, instant state changes.
- **JS off:** tiles and the message panel are not shown; the cards' own links and all text remain. Dots become scroll-snap.
- **WebGL unavailable or Save-Data:** the still, and the tiles still work.

**The booking pattern.** White Desert's tile-tap, inside the page and without a form (#1, #2, #3), with Kube's lazy boot: tile code loads on first touch (#5). The persistent bar stays as in §3. Cost: first load about 400 KB (img-009 phone AVIF about 110 KB, desktop about 200 KB), JS about 20 KB, to be measured at 4e.

**Photographs.** img-009 (full-bleed, hero), img-018 (full-bleed, band), img-002 (full-bleed, closing), img-007, img-006, img-014 (prints). img-007 carries the rights flag: if the owner cannot clear it, img-006 takes its place with Sanjee's words and the section loses his image.

**Forecast.** No (§3). **Scroll set-piece.** Concepts 1 and 2 never carry one.

**What would make this concept fail.** The moving water reads as jelly on a soft 1600 px picture, which is the "effect hiding the photograph" Shahar has rejected before; or the visitor reads a tile's dot as a rule about who may book.

---

### Concept 3 · unique: **"The set"**

**The idea.** The small photographs are not hidden or stretched: they arrive as a set, like waves, floating on the white page, and each lifts in turn as the swell passes under it.

**The one thing.** The yellow board with the pink rail, in the front print (img-007). It is the most recognisable object in the school's own pictures, it is the man the reviews are about, and its rail is the page's one accent. Everything else in the hero is quieter blue water.

**Main item.** A **WebGL swell on the business's own prints**: five textured planes on one fixed canvas behind the DOM, with vertex displacement so each print flexes like paper on water. A slow rolling wave crosses them from right to left about every 12 seconds, then the sea goes calm. Soft shadows move with the lift. This is references #9 and #27 taken literally: imperfect photos as objects at or under native size, on a generated moment. The hard-fail rule on photographs at 1920 px or more is met because img-002 is the largest thing on the screen.

**The first screen.**
- **Media, desktop 1440×900:** white ground. Two loose rows, like lines of swell coming in. Back row, higher and smaller: img-009 (400 css px), img-018 (landscape crop, 300 css px), img-006 (360 css px). Front row, overflowing the bottom edge: **img-002 at 880 css px (2000 px measured)**, and overlapping its lower right corner **img-007 at 520 css px (962 px measured)**. Rectangles with a soft shadow, no borders, no resting tilt.
- **Media, phone 390×844:** img-007 at full width as the front print (962 px measured, 2.5 source px per css px, the sharpest action on any screen here), with img-002 behind it and rising above, plus one small img-006.
- **Words:** `businessName` in the header. "Surf lessons in Weligama" in **Shrikhand** at clamp(36–68 px), ink, centred on the white above the prints. One button: "Ask on WhatsApp", white on rail pink.
- **Proof point: here.** To the right of the button on desktop, below it on a phone, as one small line: "5/5, 13 Google reviews, 5 November 2026". Not a stack over media: it sits on white. This school's proof is much stronger than its photographs, and this concept is the place to test that for the human at the pick (playbook §3 item 1).

**Structure.** Offset 12-column grid with deliberate overlaps (#10), the boldest of the three.

1. **Hero.** As above. Scrolling eases the swell to flat within the first 40 % of the screen and the prints leave with the page. No pinning.
2. **The shallows: a full-width colour block** in cloud blue `#94D4FF` (#10), no photograph behind text. `tagline`, title "Who we teach" and [0] on the left. Then "Lessons": three prices set huge in Shrikhand ("USD 40", "USD 50", "USD 160"), each column stepping 64 px lower than the last, like going out. Label, compact details line, `includes` and a button under each. [2] ¶1 above, ¶2 under the Week Intensive, ¶3 at the foot. Rating again in full, then the button.
3. **Before you book, with two prints.** White. [5] in a narrow column with air (#10). img-005 (500 css px) overlaps the bottom edge of the blue block, img-006 (380 css px) offset below it.
4. **Boards.** [3] as a two-column text, then a **horizontal swipe strip** of duration cards, each with soft-top and hardboard prices and its `note`, next-card peek on every width (#14, #18 without the pin). Bodyboard and "to buy" as the last two cards.
5. **Feature.** img-020 full-bleed (1440×1920, crop 1440×800, silver sun on the sea), `featureLine` in Shrikhand in ink on the pale band of sky.
6. **Sanjee.** img-008 as a print at 480 css px, **keeping its tilt**, on a 7/5 split. [1] set at 34 px as a lead (#8), title above, credentials and languages line below it. Under it, **real masonry** of the four quotes, each keeping its own height, with the rating as the one large number at the head.
7. **Outside.** `spot` and `season` beside an overlapped pair, img-012 (500 css px) and img-014 (440 css px) (#10). Then [6] as **three columns**, one paragraph each, in the copy's own order, so the three levels read at a glance. On a phone they stack.
8. **Along the coast.** 5/7 split: [4] whole, sticky, on the left (a plain CSS column, not a pinned set-piece). 12 rows on the right, in a list with notes, prices in Shrikhand at 22 px. Stacked on a phone with the block directly above the rows.
9. **Back on the sand.** img-017 (the three dogs, 560 css px) as a print on white, `closing` at 34 px beside it, the button, "Call", "Email". This is the page's one joke: the school's real regulars. No caption.
10. **Finding us and footer.** [7], map button, address, on the cloud-blue block again.

**Why it beats what we already have** (compared with `assets/old-site-desktop.png`, `assets/old-site-mobile.png`, and the gold bar, `the-lavish-haven.html` and `ka-surf-hostel.html`, which also make a limit into the idea). The old site's one wide picture is a pool, with its real surfing buried thousands of pixels down. Here the first thing you see is Sanjee on that board, with the bay behind him and his score beside the button, and a visitor sees at once that this is a person and not a resort. Nothing is stretched past its size, which is the mistake a straight full-bleed of these action shots would make.

**Colour.**

| Role | Hex | Asset | What it is |
|---|---|---|---|
| ground | `#FFFFFF` | custom.md's clean white | so the prints float |
| big colour | `#94D4FF` | img-002, x0–469, y804–899 | the sky around the thin cloud. Ink on it 10.0:1 |
| small colour | `#E0CCAC` | img-007, 20×10@640,340 | the board's deck as photographed. Only the message bubble in the sheet, never a ground |
| ink | `#1A2230` | img-007, x464–499, y165–199 | his wet hair |
| **booking accent** | **`#C72C60`** | **img-007**, rail region x503–705, y349–419, median `#954B65`, hue 339° | **the pink rail of his board. Adjusted, and named as adjusted:** the picture's smoothing greys a thin rail (brightest pixels `#CC7387`, white text 3.3:1), so the hue is kept and saturation and value are raised. White text 5.3:1. Booking actions only |

This palette would look wrong beside a warm ground (the rail goes muddy) and beside any second bright colour: only the blue block may compete, and only because it is the sky.

**Type.** **Atkinson Hyperlegible** (400/700) for reading and every control: built for legibility, with very distinct letterforms and figures, which suits a phone in sun and a price list. **Shrikhand** for section titles, big prices and the hero title: a fat italic display drawn from hand-painted signage in Gujarat, the nearest relative in the free library to the hand-painted wall behind the tee in img-003. It is not a script and is not on any list here; custom.md asks for one expressive display face. "By tuk-tuk" and "USD 40" are why it is here. The designer must test "Sanjee, head instructor" and the comma. Two families, about 90 KB.

**Motion.**
- **Main item:** the swell over the prints, hand-written WebGL (no three.js, about 8 KB), starting after first paint. The DOM `<img>`s stay the LCP and the true content; the canvas takes over when ready. Pauses when out of view. Capped at DPR 1.5 on phones.
- **Micro-animations:** button press-fill (the pink floods from the press point, 200 ms); prints lift 6 px on hover; sheet opens with a damped spring (no bounce past 2 %); tiles bump 1.03 on tap; the message bubble cross-fades its words; dots stretch on the quote row on a phone; strip has momentum.
- **`prefers-reduced-motion`:** static prints in their resting layout, no swell, instant sheet.
- **JS off:** prints as a plain CSS layout; strip is native horizontal scroll; every button is a plain link; no sheet.
- **WebGL unavailable or weak phone:** CSS only, prints bob ±4 px in sequence on a 12 s loop (transform only). Save-Data: static.

**The booking pattern.** A **bottom sheet** on every width, an in-page overlay in Kube's and Tandjung Sari's family (#1), opened from each lesson's button. Tile-tap: the lesson (preselected from the button), level, date or "Not sure", people; the bubble shows the message; one button sends it. Booted on first touch (#5). The hero button **bypasses the sheet** and goes straight to WhatsApp, and so does the persistent bar, so `clicks_to_book` stays 1. Cost: first load about 550 KB for five prints (img-002 at 1760 w AVIF about 170 KB, within the 300 KB line), JS about 25 KB, to be measured at 4e.

**Photographs.** Hero: img-002, img-007, img-009, img-018, img-006. Then img-020 (full-bleed), img-008, img-005, img-012, img-014, img-017 (prints). img-007 carries the rights flag and this concept leans hardest on it: if the owner cannot clear it, img-006 takes the front print and the rail colour needs a new source.

**Forecast.** No (§3).

**Scroll set-piece.** No. Own material is six photographs at 1920 px or more against the eight required, and there is no usable video (§3).

**What would make this concept fail.** Five floating prints read as a scrapbook or a WebGL demo rather than "clean, slick", and the first screen loses the single clear picture Shahar's calibration asks for.

---

## 5. Divergence table

The run now has four businesses. Cheeky Monkey was picked as **3 · unique**, later reworked to a drone-loop hero. Lotus was picked as **1 · calm**. Coconut Surf Inn has no pick in the ledger yet. Other runs are not part of this table (base.md 0.3.0). The nine other rows are copied from Coconut's table. Script check: the Cheeky and Coconut rows match their sources word for word; the Lotus rows are Coconut's shortened versions of Lotus's own table, same devices, read against the source by eye.

None of the Sanjee rows reuses a gold first-screen form, palette or face. Global Surf is a lodge clip with a centred serif or script title and a coral button; KA is cut-paper leaves over type; Layday is a drawn berth; Lavish is a drawn cut-corner pool window. Concept 1's full-bleed-plus-centred-title is the calibrated form for a good picture, not Global's clip: it has a still, an ink text-face title, a shaped edge and a red button.

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern | scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| Cheeky Monkey | 1 · calm "The signboard" | walk in off the main road | img-147 full-bleed photograph (board noses framing the main road), "Catch waves, not worries" in Yellowtail + red-fin button | centred container; package tabs; stacked full-width room slideshows; 7/5 shop split with img-122 | `#FFFFFF` + `#EEF1F2` (img-122 wall) | micro only: tab pill, dots, in-view portrait clip | per-offer buttons + persistent phone bar (Morgan's Rock) | — |
| Cheeky Monkey | 2 · interactive "The wall of boards" | same | vid-009 full-bleed 9:16 on phone / three-column triptych of the same reel on desktop, `businessName` in Knewave + magenta button | one segmented "Plan your stay" panel; list + stage room viewer; full-bleed drag strip | `#FFFFFF` + `#EAF3F5` (img-096 mint) | triptych cut, sliding pill, rolling digits, momentum drag, crossfades | inline panel with tiles, optional date params, tel/mailto | — |
| Cheeky Monkey | 3 · unique "Pick your board" (**picked**; hero later reworked to a vid-001 drone loop) | same | vid-009 inside one centred board-shaped WebGL window on white, `featureLine` in Permanent Marker + blue-fin button | portrait package cards with board crops; 2-up room slideshows; masonry shop | `#FFFFFF` + `#FDF1F2` (img-134 sky) | resin-gloss shader, card tilt, board-mask zoom | right drawer / full sheet with a `/plan/` URL; hero bypasses it | image zoom-through (pattern 9) |
| Lotus Surf House | 1 · calm "The gate" (**picked**) | the house, floor by floor | desktop 6/6 split: img-019 (carved gate, portrait) full-height right half, name in Parisienne + red-oxide button on white left; phone: img-019 full-bleed portrait | centred 640 px column; stacked 6/6 room rows with 4:5 slideshows; 5/7 porch split; 3-up roof row | `#FFFFFF` + `#F0EDEE` (img-019 path stone) | micro only: one photo settle, dots, bar slide-up, cross-fades | per-room buttons + Kube bottom-of-hero bar → sticky phone bar with tel icon | — |
| Lotus Surf House | 2 · interactive "Dappled" | same | img-020 garden full-bleed with a WebGL shader moving the photo's own sunlight; Patrick Hand title + table-blue button | 4-up fact row; Garden / Upstairs / Roof floor switch with room tiles; 7/5 garden split; quote swipe row | `#FFFFFF` + `#E1E1E4` (img-020 sky) | light-drift shader, sliding floor pill, tile springs, rolling digits, momentum drag | tile-tap floor → room inside the page | — |
| Lotus Surf House | 3 · unique "Under the net" | same | white page: a WebGL cloth mosquito net over a portrait print of the balcony view (img-025); Allura title, violet button | stepped three-row "house section" on 12 columns; 2-up slideshow pair; masonry; offset roof pair | `#FFFFFF` + `#E1F2FD` (img-025 sky) | cloth sim, hem-sag button, damped slide-down panel | slide-down panel from the top (Tandjung Sari) with tiles incl. "Not sure" | — |
| Coconut Surf Inn | 1 · calm "The view from the roof" | one stay, 13:00 to 11:00 | img-009 (the view from the roof over the green to the reef) full-bleed landscape; on phones a one-time pan along the beach; name in Satisfy centred in the sky + banana-leaf green button | centred 680 px column; rooms in two plain groups (A/C, fan) as 6/6 rows with 4:5 slideshows; 7/5 courtyard split; full-bleed roof band; 2-column masonry | `#FFFFFF` + `#EEF2F7` (img-009 sky) | micro only: one phone pan, dots, bar slide-up, cross-fades, forecast fade-in | per-room buttons + Kube bottom-of-hero bar → sticky phone bar with tel icon | — |
| Coconut Surf Inn | 2 · interactive "Under the thatch" | same | img-102 (under the thatched roof, looking out to sea) full-bleed with a WebGL depth parallax from a hand-painted depth map; Shadows Into Light Two title + saffron button | 4-up fact row; "How do you like to sleep?" tiles (fan / A/C / 3–4 people) → list + stage viewer; veranda swipe row; full-bleed sunset band | `#FFFFFF` + `#F0F3F6` (img-102 sea haze) | depth parallax on pointer/tilt, tile lift, pill slide, rolling digits, count-up forecast, momentum drag | tile-tap by how you sleep, inside the page | — |
| Coconut Surf Inn | 3 · unique "Round the clock" | same | img-009 whose sky dissolves into the white page; Caveat title, line and vermilion (sign's sun) button set on the white "sky" | prose fact paragraph; 2-up room slideshows with Fan / A/C chips; true masonry of the house; 450 vh sticky split; forecast row | `#FFFFFF` + `#F1F1F3` (img-002 wall) | WebGL horizon wipe between frames, the sign's sun disc as hour marker, press-fill button | Kube in-page overlay: tiles 1 / 2 / 3 / 4 / Not sure → rooms that sleep that many; `/rooms/` URL; hero bypasses it | sticky split (pattern 6): five own 1920 px frames, afternoon → break |
| **Sanjee Surf School** | 1 · calm "The sand" | **the paddle out** | **img-002 (2000 px) full-bleed, bottom edge cut to a hand-traced wash line that runs up once on load; title in the text face in navy ink centred in the sky + soft-top red button** | centred 720 px reading column; 7/5 level split; three stacked lesson rows; full-bleed aqua band; 5/7 boards; 6/6 closing | `#FFFFFF` + `#D2EAF7` (img-002 pale shallows) | micro only: one wash-line run-up, dots, print settle, bar slide-up | per-offer buttons + persistent phone bar with tel icon (Morgan's Rock) | — |
| **Sanjee Surf School** | 2 · interactive "Where you start" | same | **img-009 (1600 px) full-bleed, a WebGL swell moving the photograph's own water with the paddler masked out; title low on the calm water + cobalt button** | 5 level tiles; 3-up lesson cards; live message panel; to-scale board chart; 7/5 Sanjee; sticky 5/7 tours | `#FFFFFF` + `#D6DAE0` (img-006 white water) | swell shader, tile pill, spring dot, message cross-fade, rolling digits, Kube parallax | tile-tap builds a visible message inline; every card also links direct | — |
| **Sanjee Surf School** | 3 · unique "The set" | same | **white page: five own prints (img-002 880 css px, img-007 520 css px in front) flexing on a WebGL swell that passes every 12 s; Shrikhand title, rail-pink button, rating beside it** | offset 12 columns with overlaps; full-width cloud-blue block with stepped prices; duration swipe strip; quote masonry; 3-column waves | `#FFFFFF` + `#94D4FF` (img-002 sky) | paper-flex vertex swell, press-fill button, damped bottom sheet | bottom sheet with tiles and message bubble; hero and bar bypass it | — |

**No two rows share archetype + first-screen device.** The archetype is new to the run, and all twelve first screens are different devices.

**The closest rows, honestly:**
- Concept 1 and Coconut 1 are both a bright sea-and-sky landscape with a centred title. They do not look interchangeable once you squint: a saturated blue sky over a rust-red headland, a shaped bottom edge, navy text-face title and red button, against a pale sky over a wide green lawn, a white script and a green button. Allowed by hard constraint 2, but it is the pair to look at side by side at the gate.
- Concept 2 is the run's third full-bleed still with a shader (Lotus 2 moves sunlight, Coconut 2 is depth parallax). The effect and subject differ: here it is the sea itself.
- Concept 3 is the third WebGL-on-white unique (Cheeky's board window, Lotus's net). Here there is no window or veil: several photographs are the object.

**Set-pieces:** none here, so no pattern is shared.

**Booking accents across the run:**
- Cheeky: red fin, magenta, blue fin.
- Lotus: `#B8431C`, `#0165A3`, `#5E4699`.
- Coconut: `#48660B`, `#A1591B`, `#BE4532`.
- Sanjee: `#DE1446`, `#05368A`, `#C72C60`.

Within Sanjee, concepts 1 and 3 are 5° of hue apart (`#DE1446` is brighter, `#C72C60` is deeper). Only one is shipped, so it does no harm, but it is reported. Nearest across the run: concept 2's cobalt and Lotus 2's table blue are both blue, but one is far darker, and Lotus's picked page uses brick.

**Type pairs:** no face is shared with the run or with gold.

**What a visitor would notice is different:**
- **From Cheeky Monkey:** Cheeky is loud surf colour, painted-sign lettering, boards and a road, and you walk along a shop to a bed. Sanjee is a clear bay, one man and a wave, you go into the water, and the thing you buy is two hours with an instructor.
- **From Lotus Surf House:** Lotus is inward and shaded, a carved gate and a garden you climb floor by floor. Sanjee faces straight out to sea, has no rooms at all, and its first question is your level.
- **From Coconut Surf Inn:** Coconut is a stay told by the clock, from a roof over a green, with rooms and a live forecast. Sanjee is told by distance from the shore, sells lessons, boards and tuk-tuk rides, carries no forecast, and is booked by a WhatsApp message rather than an engine.

---

## 6. For the copywriter, the deployer and Alon

**Nothing in the copy or dossier blocks a concept.** These are the things the concepts hit.

**Schema gaps** (the mockup hard-wires them, and the deployer must map them):
- **`heroLine`:** the fourth business in the run to need an optional short hero line (≤ 50 characters). All three concepts use the tagline's first words.
- **Tour and shop rows in one list:** `priceList[]` holds 3 surf tours, 9 outings and 2 things to buy, and the layout needs those groups. Proposal: optional `priceList[].group` (owner-named). Until then, by position.
- **Rental table:** `rentals[]` encodes board kind and duration in `label`, and a template must not parse prose. Proposal: optional `rentals[].kind` and `rentals[].duration`. Concepts 1 and 2's table and concept 3's strip need this.
- **Board sizes** live only in [3] ¶2. Concept 2's to-scale chart needs them as rows (`label`, min and max length), or the chart is hard-wired and owner edits will not reach it. This is the weakest link in concept 2.
- **Waves:** `spots[]` has no module, and [6] is prose. Concept 2's highlight and concept 3's columns rely on paragraph order, which the owner could break. Proposal: optional `spots[]` (name, level, break).
- **Price date:** "All prices are as of 5 November 2026" lives only in [5], which is near the lessons but far from the rental and tour rows. Proposal: optional `pricesAsOf`, which a template can print beside each table.
- `ctas` is not a schema field (`copy/sources.md` already notes this; Global Surf is the precedent).

**Decisions for Alon:**
- **img-036 (1247×2000, reviewer Tim St):** Sanjee and a student walking up the sand with boards, rust cliff behind. It is the best honest picture of the school at work, it is portrait and above the floor, and PLAN.md §9 allows review photos with credit. The index marks it `usable: false` and `schemas/dossier.md` still says only business-owned images are usable, so **no concept uses it**. If you allow it with a credit line in the footer, it would improve concept 1 (station B) and concept 3 (a sixth print) at once.
- **Rights and consent before go-live, for the owner:** img-007, img-010 (photographer provenance flags); img-005, img-008 (identifiable, consent under the site's own Terms). Concepts 2 and 3 depend on img-007.
- **The cost of WhatsApp** (`audit.md`, "For the human"): live slots and the online deposit go away, on a channel nobody has seen answered.
- **Forecast:** if the owner confirms Coco Beach is Rosa's "Coconut" (`weligama-west`), it can go in station E.
- **Concept 2's title** sits in the lower third rather than vertically centred, and **concept 3's rating** sits on the first screen. Both are departures for you to judge at the pick.

**Reported from `review.md`, not reopened:** who runs the business and who wrote the first-person story (`flags_for_operator[0]`), certificates, and the review by the legal operator's namesake counted among the 13.

**The one thing I would most want photographed on location:** one frame or a 10–15 s clip at 3000 px from waist-deep water, early morning: **Sanjee pushing a student on the red soft-top into a small wave, with the headland behind.** That single picture is the hero all three concepts are working around. Failing that, the owner's own files of vid-001 and vid-002.

## Hand-off checklist

1. Every photograph opened (all 41, individually), with full-size crops of six. Largest usable width of the best photograph: **2000 px (img-002)**. ✔
2. `agents/designer/references.md` read in full. Cited: #1, #2, #3, #4, #5, #7, #8, #9, #10, #12, #14, #15, #17, #18, #20, #26, #27, #28, and the Calibration section. ✔
3. Divergence table: all nine other rows in this run, no repeat of archetype + first-screen device, no shared set-piece. ✔
4. All four videos listed, none usable, Alon's decision on stills recorded. Ten strongest photographs listed with measured widths, and the concepts use them. ✔
5. Each concept says why it beats the page, naming the page: `assets/old-site-desktop.png`, `assets/old-site-mobile.png`, `funnel/walk/01-home-fold-settled.png`; concept 3 also the gold bar. ✔
6. First screens: own media (img-002, img-009, img-002 + img-007), what + where, primary action `whatsapp` labelled "Ask on WhatsApp", 1 tap. Full-bleed leads are ≥ 1200 px measured (2000, 1600); img-007 is a print under its native size. Rating placement decided per concept, with reasons. ✔
7. Facts trace to `en.json` and dossier keys: `lessons`, `rentals`, `priceList`, `credentials`, `ratings`, `testimonials`, `contact`, `spot`, `season`, `location.spot`, `reviews`, `lessons[2].duration_as_written`, `surf_spots`. No hours, cancellation, student counts, years, group claim, deposit amount or reply time. ✔
8. Every sampled colour has a hex, an asset id and a region. White grounds cite custom.md rather than a sample, as in the earlier concepts. The one adjusted colour (`#C72C60`) is named as adjusted, with its source values. ✔
9. Default-look list: none used. White and cool grounds; no listed display or body face; rust and aqua kept out of the interface so no terracotta or teal accent; no all-caps labels, no 01/02/03 numbering, no arrows. " | " follows the calibration. ✔
10. One thing per concept: the headland; the wave in front of the paddler; the yellow board with the pink rail. Nothing louder on each page. ✔
11. Main items: calm has img-002 with a one-time wash line and named micro-animations, no canvas; interactive has the swell shader on img-009; unique has the paper-flex swell on five own prints. No plain cookie-cutter first screen. ✔
12. `agents/designer/gold/` opened: pages rendered at 1440 and 390, with the limit stated under Inputs (Global Surf's footage did not load here). ✔ with that limit.

**Not verified:** performance figures here are estimates for 4e to measure. Fonts were chosen from knowledge of the faces and were not rendered on the title words; the designer tests them. Whether the swell shader looks like water, and whether five prints look clean, can only be judged once built. `/design-taste-frontend` and `/design-motion-principles` were not opened; motion terms are my own, with `/impeccable` used for the mode.
