# concepts.md — Talou L'oren (talouloren), station 4d

Creative-director 0.6.1 · run 2026-11-il-brand-02 (inbound, `market: il`, `vertical: brand_design`, `he` first + `en`, RTL) · 2026-11-02.

**Read for this file:** the full runtime prompt (`node tools/prompt.mjs creative-director`, every layer); `brief/talouloren/brief.md` (A1–A24 first); `dossier/talouloren/direction.md`, `dossier.json`, `audit.md` / `audit.json`, `videos.md`, `industry/lane-references.md`; every image in `assets/` (img-001…125, logo-001…041, the old-site screenshots) and the frame sheets of the three rendered clips plus vid-001, vid-017, vid-033; passed copy `sites/talouloren/copy/he.json` + `en.json` and `review.md` (N1–N4); `agents/designer/references.md` in full, `custom.md`, `gold/README.md` + `global-surf-notes.md` and two gold pages opened in a browser (`global-surf-adventures/mockups/the-sign`, `gold/layday-surf.html`); `agents/designer/scroll/playbook.md` §2.3; shaharnaor.com opened live (the second site Shahar likes, A6). Other concepts: none in this run (the ledger has only `talouloren`); `sites/mutag-meitiv/concepts.md` (run 2026-10-il-brand-01) read for awareness only.

**Overrides that bind every concept (brief + Shahar's hand-off):** dark, heavily black and white, one leading colour = the old gold `#f3b614` and its metallic gradient (A6, A16); super high end; light motion only, no 3D scene (A17); surf reference sites and surf-only house rules (light grounds, constraint 4) do not apply; Hebrew first, `dir="rtl"`, fully mirrored, English toggle; brand name "Talou L'oren" (A22); logos allowed (A4); video slots = embed URL + poster, pages read without video; only img-001 is confirmed Tal as a photograph; **no photograph of Shahar exists: every concept plans a visibly marked placeholder for him, never another person's photograph**. "Flip the spotlight" is a direction, not a requirement — all three use it, each differently.

---

## 1. What this business actually is

Two partners selling themselves, not a studio's output: Tal Oren (story, strategy, mentoring, the BRAND YOURSELF course, `team[0]`) and Shahar Naor (identity, web, motion, AI, `team[1]`), with big-name proof (Amdocs 27,000, Maccabi 3 million, 1,000+ course buyers, `proof.stats`) sold to owner-led businesses through a free ten-question Focused Check and a paid Clarity Session (`booking.new_site`).

What a stranger would not guess: **the brand already is black-and-white and gold, and it was made in a photo studio.** Between 2016 and 2020 Tal's production arm shot almost everything in black and white on grey seamless or a dark brick wall — portraits (img-003, img-005, img-025), client shoots (img-024, img-030…034 with the gold laurel "ARE YOU READY FOR SUCCESS?"), photo booths for Calvin Klein, Visa Cal and Taboola (vid-042, vid-013, vid-016), and 66 films, nearly all one person talking to camera under one light (vid-015, vid-017, vid-033, vid-036). The gold hand signature "Talou L'oren" (`sig-gold.svg`, the old site's logo) closes most of them. The business's real product, on film, is **putting a person in front of a light and making them look like who they are.** That is the brief's "flip the spotlight", already shot.

Two gaps are the other half of the idea: the hero film of both partners is not shot yet (vid-036 stands in, `gaps`), and Shahar — the motion and web half — has no published photograph at all (`gaps` team[1].photos). The site must show two partners while only one of them has a picture.

## 2. What the material can and cannot carry

### Video, the business's own (`dossier.videos[]`, 66 entries, 65 `business-owned`, vid-054 `unknown` and not used)

Rendered (`tools/fetch-video.mjs`, renditions + poster in `assets/video/`):

| id | shows | length · source | renditions | three best moments |
|---|---|---|---|---|
| **vid-036** (hero rank 1) | BRAND YOURSELF trailer: Tal in black on a stool, dark brick studio, one top light, slow camera; word overlays only in the last third | 120.4 s · 1920×1080 | d1920 2.08 MB · m1280 1.25 MB · m720 0.61 MB · poster 1920 | **30–42 s** (dossier cut): the wide behind-the-lights shot, two lamps aimed at Tal, no text, no cut · **~60–70 s**: profile close-ups, half his face lit, shallow focus · **~0–10 s**: wide seated + hands (cuts) |
| **vid-027** (rank 2) | Bank Hapoalim workshop at the College of Management: Tal lecturing a seated audience | 43.6 s · 1920×1080 | d1920 3.29 MB · m1280 1.70 MB | **10–22 s** (dossier cut, poster must be re-picked: 11.2 s shows the audience) · ~24–28 s arms open to the room · ~30–36 s at the lectern |
| **vid-013** (rank 3) | Visa Cal team booster: photo booth, a line exercise; picture inset on white | 63.1 s · 1920×1080 (inset) | d1920 2.54 MB · m1280 1.45 MB | 13–25 s (dossier cut) · the booth with lights · applause; **card only, never full-bleed** (inset frame) |

Source files fetched, not yet rendered (renditions are one `tools/fetch-video.mjs` run each):

- **vid-033** "SUCCESS IS BALANCE", 33.9 s, 1920×1080: Tal close on **pure black**, talking, hands entering frame; cards only at 0–5.6 s (ALL CLUB) and 31–33.9 s (D VISION). Clean span **~7–29 s**; best moments ~10–22 s (talking, a laugh at ~26 s). The only clip whose ground is already the page's black.
- **vid-001** "SUCCESS IS BEHIND THE SCENE", 50.4 s: a sitting seen from beside the camera, grey seamless, umbrella light, no text. The subject is the "B"-cap man, **not a partner**; usable only as work, never next to a partner's name.
- Tal to camera, B&W on grey with a D VISION watermark: vid-015, vid-017, vid-025, vid-047, vid-051, vid-056, vid-057, vid-061, vid-062; with burned-in Hebrew subtitles throughout (not loopable): vid-014, vid-031, vid-032, vid-026, vid-034.
- Proof films for slots (embed + poster, never loops): Amdocs vid-038 / vid-043 / vid-046, Maccabi vid-022 / vid-067 / vid-052 / vid-049, SEAT vid-055, Park Bavli vid-018 / vid-020, Clalit vid-006, Bezeq vid-021, Philip Morris vid-002, Kornit vid-019 / vid-053, Taboola vid-016 / vid-035, Mercedes vid-039 / vid-041, Wella vid-029 / vid-037, CK vid-042, Doron Shefer vid-028 / vid-058, AMT vid-024, Rita vid-023 (400 px, poster too small for more than a thumbnail), Eugene Perma vid-060, Castro vid-045.
- Testimonials (In Their Words): Amos vid-004 / vid-007, Ronen vid-011, Joya vid-012, "Yifat" vid-010, Natali vid-048, Ella vid-059; vertical 720×900 Kravtchik vid-009 / vid-030 / vid-040 (names to confirm, review N4). Three vertical clips exist — enough to design the 9:16 `/watch` rows for real.

**Rule followed:** usable video exists, so two concepts open on it (calm: vid-036; interactive: vid-033). Unique opens on a drawn light that lands on a still of vid-036 and says why (§4.3).

### Photographs, the business's own (`assets/index.json`; all `business-owned`)

Ten strongest, by what they can carry:

| id | width × height | what it is | role it can take |
|---|---|---|---|
| img-019 | 2000 × 1333 | Wella "ENJOY THE SMOOTH KERATIN PROTECTION" box and bottles, gold type on black, one light | full-bleed: the only colour photograph already in the page's palette |
| img-014 | 2000 × 1334 | man in sunglasses at a Mercedes wheel, B&W | full-bleed work moment (Mercedes, proof wall) |
| img-021 | 2000 × 1334 | L'Oréal façade, people at the door, B&W | full-bleed work moment |
| img-020 | 1920 × 995 | a man walking past a mural, B&W street | wide band |
| img-025 | 1500 × 1000 | bald man laughing in smoke, B&W, black ground | large panel |
| img-003 | 1500 × 1000 | black-blazer portrait on grey (identity unconfirmed) | large panel, never labelled |
| img-024 | 1500 × 1000 | a group shoot, faces pulling, B&W | large panel |
| img-022 | 1500 × 1000 | paint-covered body, sculptural, B&W | panel (Rita / art) |
| img-029 | 1500 × 1000 | a man jumping through lit "LOVE" letters | panel (Castro) |
| img-001 | 1080 × 1080 | **Tal**, smiling, white ground; "LE TEMPS DU SUCCÈS" and the signature baked in over his chest | portrait only, cropped above the baked text (≈1080 × 560 head and shoulders); never full-bleed |

Also: the 1920 poster frames of vid-036, vid-027, vid-013 (and of vid-033 once rendered) are the sharpest pictures of Tal there are. Behance covers img-101…112 (1381 × 1080) are Shahar's work in saturated blues and reds: on this page they are work tiles, small, never a ground. img-113 / img-121 (1400) are the old "SUCCESS IS BEAUTIFUL" board in gold gradient on black. img-048…050 (960–1000) are sea-and-light silhouettes, too small for full-bleed. img-037 (1920) is a warm orange hair shoot: off-palette, `/work` only.

**Largest usable width: 2000 px** (img-014, img-019, img-021). Three photographs clear 1920; five more clear 1500. Full-bleed is open; the portraits that could be partners are not (img-001 is 1080 and carries baked text).

**Identity rule.** img-002…013 and vid-001 / vid-003 / vid-063 show other men (dossier `team[0].identity_note`). They appear only as work, never next to a partner's name and never in the partners section. Tal is shown by img-001 and by video frames the dossier lists in `team[0].video_appearances` (vid-033, vid-036).

### Atmosphere

`dossier/talouloren/stock/` does not exist and none is needed: the business's own archive carries every large moment.

### Words (`he.json`)

Short and worth setting large: the approved hero headline "אתם טובים במה שאתם עושים. הגיע הזמן שיראו אתכם." (`copyBlocks[0].heading`); "ואז האור מסתובב" and the five-word ladder בהירות, תנועה, תשומת לב, משיכה, מודעות (`copyBlocks[2]`); "אתם לא לבד. נשימה." (`services[4].body`); "מאיפה מתחילים? מכאן." (`extras.home.final.heading`); the eyebrow "Success is Beautiful". Long: the approved subtitle (one sentence, 22 words), the five pains (`copyBlocks[1].body`, five short lines), partner bios, the six FAQ answers, the old case "what we did" paragraphs. Placeholders that must look like placeholders: `{price_session}`, `{session_length}`, `{check_minutes}`, `{budget_ranges}`, `{turnaround}`, `{consent_text}`, `{case_story_*}`.

### Numbers

27,000 · 3 מיליון · +1,000 (`proof.stats`); "10 שאלות"; method steps 1–10 and Story = 1–7; the Check's five scores 1–5; Sprint 2–4 weeks, Build 6–10 weeks, Partnership 3–6 months (`services[].format`). No prices, no session length (placeholders).

### Gaps worth designing around

- **Shahar has no photograph.** Designed as a marked placeholder in every concept (below), never another man's photograph.
- **The partners' film is not shot.** The hero is built so the film drops into the same slot (embed URL + poster) without a redesign.
- **Logos are 200 × 133 white-ground JPEGs** (logo-001…034). On black they look pasted. Concepts set the names as type or as white single-colour marks redrawn for the mockup; real files are a pitch point (`gaps` client_logos).
- **Case stories are placeholders** (`{case_story_*}`): case cards carry the name, the stat or the film, and a marked placeholder line.

## 3. The page archetype: **the studio sitting** (סשן בסטודיו)

A portrait sitting in a dark studio. The visitor walks onto the set, the light is set on them, the questions are asked one at a time, and they leave with a print. Every route maps onto a moment of the sitting: Home is the studio with the lights on the partners; the Mirror is the glare before the light is set; the Flip is the light turning onto the client; the Focused Check is **the sitting itself** (one question per frame, a frame counter); `/thanks` is "the print is developing"; `/snapshot` is **the print** — the client's name as the title, five scores as the exposure readings, signed by the partner who reviewed it; `/book` is the call sheet (date, time, who is in the room); `/work` is the wall of prints; `/watch` is the reel.

**Why this business and no other.** The archetype is not invented: it is what the archive is. 2016–2020, TalouLoren's own studio shot its clients under one light on grey and black (img-003, img-025, vid-001, vid-036), set up photo booths for CK, Visa Cal and Taboola (vid-042, vid-013, vid-016), and signed every film in gold. The brand idea (the glare turns and lands on the owner) is a lighting cue. No other business in any run has a studio, a signature and a ten-question sitting as its product. Impeccable's mode is **Persuade** (one action: start the Check or book the session), with an **Operate** sub-mode for `/check` and `/book`.

**What it never becomes:** a photographer's portfolio. The sitting is the client's; the partners are behind the camera.

### What all three concepts share (the brief fixes these; the concepts differ in how they look and move)

- **Header (every route):** gold signature logo (`sig-gold.svg` on black, `sig-white.svg` where the gold would sit on a gold-lit image), nav (סיפור · השקה · שותפות · עבודות · עלינו · לחברות · לצפייה · הקורס, behind one menu button below 1100 px), language toggle "English" / "עברית", and **one gold button "לבדיקה הממוקדת"** (header_button). Nothing under the header: no rule, no border (references calibration).
- **Booking action and taps.** The hero's action is the Check (the brief's job for Home); `audit.json.recommended.primary_action` is WhatsApp. Both are kept: the gold Check button is on the first screen, and a **persistent bottom bar on phones** carries "לבדיקה הממוקדת" (gold) + a round WhatsApp button (`wa.me/972504635536?text=` with the page's `ctaText`) → WhatsApp is **1 tap from every screen** (`clicks_to_book: 1`, references #4); the Check is 1 tap. The bar follows `recommended.above_fold` order inside the booking section (what + where, action, trust, price placeholder). Desktop: the header button + a WhatsApp chip that docks bottom-left (RTL: the end side). Conflict reported below.
- **Video slots:** every slot = embed URL + poster image, plays on tap in a lightbox (`aria-label` = the row's `description`); the hero loop is our own muted rendition, poster first, nothing attached under reduced motion or Save-Data (schema v0.8 / v0.9 pattern). "▶ הסרט" in each hero opens the partners' film slot (vid-036 full trailer until the 30-second film exists).
- **Shahar's placeholder:** the same frame and size as Tal's portrait, black, with a thin gold outline square (the old site's frame device, `old-site-desktop.png` tiles and img-113), his name and role in type, and a visible label **"צילום בדרך · Portrait coming"**. Under it, a strip of what he makes: img-107 (Pale Force, worded "NBC: האנימציה של שחר ל־Pale Force, עבור Late Night with Conan O'Brien"), img-110 (Coca-Cola Israel), img-104 or img-105. It is listed for the owner as a placeholder (playbook §7).
- **Check mechanics (all three):** start screen with the meta line (10 שאלות · {check_minutes} דקות · בלי תשלום · תמונת מצב אישית) and one start button; then one question per screen, counter "{n} / 10" and a progress line growing **from the right**, Back + Next, Next disabled until answered (Q6 optional, says so), option cards for Q3 / Q7 / Q8 / Q10 (tile-tap, references #2), text areas with floating labels (calibration), contact + consent after Q10 (end gate, C-references-26), submit → `/thanks`. Mocked: no network call; answers stay in `sessionStorage` so Back works and the snapshot mock can show the business name.
- **Snapshot:** business name as the title, five scores 1–5 (Story, Audience, Offer, Visibility, System) shown as neutral readings, never fear labels (C-references-27), three observations, a first move, a recommended path card, "עבר על זה: {partner_name}", one button "לקביעת פגישת ייעוץ" + the line "בפגישת הייעוץ נעבור על תמונת המצב יחד."
- **Booking (`/book` → `/booked`):** three steps on one page (בוחרים מועד · פרטים · תשלום): session length, `{price_session}` and the credit note as visible placeholders; a week strip + time-slot chips; name / email / phone; a mocked card form that says "תשלום לדוגמה" (no field posts anywhere); confirm → `/booked` ("נקבע.", date, time, "אישור יגיע אליכם במייל ובוואטסאפ"). The booking UI script loads on first interaction (references #5).
- **Every route ends in one of the two actions** (brief), and every page names its pain before its solution (copy already does).
- **RTL mirroring:** forward arrows point left; marquees and carousels run mirrored; progress grows from the right; Latin words (`Success is Beautiful`, `BRAND YOURSELF`, brand names) isolated with `dir="ltr" lang="en"`.

### How each concept answers the direction's must-do list

| # | must do | calm | interactive | unique |
|---|---|---|---|---|
| 1 | RTL + English toggle + hreflang | yes, mirrored side rail | yes, mirrored spot path | yes, beam swings right→left |
| 2 | Hebrew body 16–18 px, 1.5+ | Assistant 18/30 | Heebo 17/28 | IBM Plex Sans Hebrew 17/28 |
| 3 | near-black, B&W, one gold | yes | yes | yes |
| 4 | motion within budget | stepped grounds + reveals, no canvas | pointer spotlight (CSS mask) + outline→fill | one fragment shader + one pinned set-piece |
| 5 | partners near the top, named | partner strip at the foot of the hero | partners at screen 2 | partners lit inside the set-piece |
| 6 | Check one per screen | full-page sitting | sitting; Q3 answerable on Home | sitting as a "frame counter" |
| 7 | snapshot, one action, no fear labels | the print | the print with a light meter | the print developing |
| 8 | booking mocked with placeholders | call sheet | call sheet in a drawer | call sheet |
| 9 | stats, names wall, 4 case cards, NBC wording | yes | yes (logo marks) | yes |
| 10 | no banned claims | yes | yes | yes |
| 11 | video slots + reads without video | yes | yes | yes |
| 12 | `/watch` by six series, 9:16 | yes | yes | yes |
| 14 | titles with category words | template's | template's | template's |
| 15 | voice | copy as passed | copy as passed | copy as passed |
| 16 | photos within their sizes | yes | yes | yes |
| 17 | 16 routes, 11 Home sections, Work filter, case pages, Brands form, footer newsletter, legal | yes | yes | yes |
| 18 | three mockups | this file | | |

---

## 4. Three concepts

### 4.1 · Calm — **"אור עליון" (Top Light)**

**The idea in one sentence.** A quiet black studio in the Ritz and Ashcroft manner: the top-lit film of Tal fills the first screen, the two partners stand at its foot like a "led by" line, and the page steps from black to one white band at the exact moment the copy says the light turns.

**The one thing.** The single top light of the brick studio in vid-036 (the two lamps visible at 30–42 s). Nothing else on the page is lit as brightly; everything else is black, grey and type.

**First screen (phone and desktop).**
- Media: **vid-036, 30–42 s**, full-bleed, `object-fit: cover`, focal point on the stool (phone crop keeps Tal and one lamp; `focalX ≈ 58, focalY ≈ 55`). Grade: as shot; the bottom 30 % darkens to `#0f0f0f` only where the partner strip sits (a gradient under text, not an effect on the footage). Poster: the frame at 33 s.
- Centred horizontally and vertically: the eyebrow "Success is Beautiful" in the display face, small, in the gold gradient (text-fill); the approved headline in two lines (48 px desktop / 30 px phone, weight 300), white; one row with the two doors as one segmented control ("סיפור" | "השקה", white outline, 48 px high) and, beside it, nothing else. The gold Check button is in the header (and the phone bar), so the hero carries title + one control (calibration: title + one short action).
- Foot of the hero (the Ashcroft "LED BY" pattern, C-references-06): a thin row, "טל ושחר" + two 56 px round portraits — Tal from img-001 (head crop) and Shahar's placeholder circle with the gold outline and "בקרוב" — with their roles in one line each, and "▶ הסרט" (opens the film slot).
- Proof point: none here; the stats sit in Proof (§6). A number over the film would compete with the light.
- Subtitle (approved, 22 words): first line of the next section, set large, so the hero stays clean.

**Structure (Home, 11 sections in the brief's order).**
1. Hero (above).
2. **Mirror** — `#0f0f0f`; heading "אולי זה נשמע מוכר"; the five pains as a single column of large lines (36 / 24 px), right-aligned, each with a fine grey number on the side rail (left in RTL) — a real sequence of five, so numbering is earned. Section label on the vertical side rail (Ashcroft rail, mirrored to the left).
3. **The flip** — the one **light band** (`#f7f7f7`, from img-001's seamless): "ואז האור מסתובב" in black, the five ladder words in a row (phone: a column), black, separated by space only, the last one ("מודעות") in the gold-shadow tone `#8a5a1e` (5.5:1 on the band). The page physically turns light here (Porsche stepped grounds, C-references-03).
4. **Two doors** — back to `#0f0f0f`; two tall panels side by side (phone: stacked), each a full-bleed B&W photograph cropped to 4:5: Story = img-025 (the man laughing in smoke, "seen as he is"), Launch = img-029 (jumping through the lit LOVE letters, "the launch"); title, summary, format line, `{price}` placeholder, one white outline button each. Same ratio, no padding (constraint 5).
5. **How it works** — three steps as a horizontal sequence on desktop (בדיקה ממוקדת → פגישת ייעוץ → הדרך שלכם), a vertical one on phones, joined by a thin vertical hairline (Kube's section joint, references #8) — the only line on the page.
6. **Proof** — the three stats set huge in the display face (27,000 · 3 מיליון · +1,000) with their labels; below, the names wall **as type** (Order/Porto Rocha pattern, C-references-23): brands in one justified paragraph of names in white at 60 % opacity, people in a second, sectors line, the NBC note. No logo JPEGs.
7. **Case cards** — four cards in a 2 × 2 grid (phone: swipe with next-card peek, references #14): each a poster frame of the case's film at 16:9 (Amdocs vid-038, Maccabi vid-022, SEAT vid-055, Park Bavli vid-020), client name, the one approved figure where it exists, `{case_story_*}` marked, "לסיפור המלא".
8. **The two partners** — two equal 4:5 frames side by side: Tal = a still from vid-033 (on black, 864 × 1080 crop of the 1920 frame) or img-001's head crop if Shahar prefers the photograph; Shahar = the marked placeholder; names, roles, two-line bios, "מה טל מביא / מה שחר מביא". Under Shahar, the three-tile strip of his work.
9. **Partnership band** — full-bleed **img-019** (Wella box, gold on black, 2000 px) with the band's heading "שותפות", one line from `services[4].summary`, "אתם לא לבד. נשימה." and the button "לפרטים על השותפות". The only colour photograph on Home, and it is already gold-on-black.
10. **FAQ** — six questions as an accordion, "+" icons that rotate to "×", answers in body size.
11. **Final call** — "מאיפה מתחילים? מכאן." centred, the gold Check button, "שאלה לפני? כתבו לנו בוואטסאפ" as a WhatsApp button (icon + label, not a text link).
Footer: black, signature, newsletter (floating-label email + "הרשמה"), socials as icons, WhatsApp, phone, email, legal links, "© {year} Talou L'oren".

**Routes (A10).**
- `/story`, `/launch` (one template): hero = a 4:5 photograph left of the headline (Story img-025, Launch img-029, the same as Home's door panels) + pain → what you get → the method steps (7 or 10) as a numbered column on the side rail → price placeholder → end on the Check.
- `/partnership`: hero band img-019; pain; "איך זה נראה" as three short columns; capacity + price placeholders; end on "לקביעת פגישת ייעוץ".
- `/work`: filter tabs (הכול · ארגונים · יזמים · מותגים) as a segmented control; projects as **named rows** (client · one line · a small poster at the row's end), C-references-23; case page `/work/<slug>` in three parts (איפה הם היו · מה עשינו · מה השתנה) with the film slot on top.
- `/about`: the two 4:5 frames large, bios in full, then "In Their Words" quote cards (named quote first, video on tap, C-references-17).
- `/brands`: films in a 3-column grid of posters; services list; the form (name, company, role, email, phone, need) with floating labels.
- `/watch`: six series as rows; each row a horizontal strip of **9:16 cards** (vid-009 / vid-030 / vid-040 are real vertical clips; others show their 16:9 poster centre-cropped to 9:16), mirrored scroll, series with no episodes show "הפרקים הראשונים בדרך."; each card's end screen = the Check button.
- `/course`: vid-036 as the course film slot; ten lessons as a numbered list; testimonials vid-048 / vid-059; `{course_price}`; "לרכישת הקורס".
- `/check`, `/thanks`, `/snapshot`, `/book`, `/booked`: see "Booking pattern".
- `/privacy`, `/accessibility`, 404: one text column, 680 px, side-rail title.

**Why it beats what we already have.** Compared with `old-site-desktop.png`: the old first screen is a grey 320 × 240 loop inside a boxed slider on a white page with "TOTAL SUCCESS EXPERIENCE" and a gold outline button that opens a quiz menu; here the whole first screen is Tal under his own light at 1920 px, the approved line and the two doors, with the partners named at its foot. Against the gold bar (Global Surf "the-sign"), it meets the same rule — the business's own footage, full-bleed, one centred title, one action — in the client's own black and gold.

**Colour (sampled).**

| role | hex | asset | what it is |
|---|---|---|---|
| ground | `#0f0f0f` | vid-036 poster | the shadow left of the stool |
| raised ground (cards, footer) | `#1a1a1a` → between `#0f0f0f` and `#2f2f2f` | vid-036 poster (`#2f2f2f` = the lit brick, top left) | the brick's dark mortar |
| ink | `#ffffff` (19:1); secondary `#a0a0a0` (7.3:1) | img-001 | the seamless white; the grey of his sweater |
| light band | `#f7f7f7`, ink `#0f0f0f` (17.9:1) | img-001 | the white seamless at top right |
| gold accent (booking only) | `#f3b614` fill, label `#0f0f0f` (10.5:1) | old-site-desktop.png | the gold rules and the "קבעו עכשיו" border |
| gold gradient (the eyebrow and the signature only) | `#b27c32` → `#deb050` → `#fdfab6` → `#cfaa59` | logo-041 (GoldLong.png) | the old site's metallic bar |
| gold on light (the ladder's last word) | `#8a5a1e` (5.5:1 on `#f7f7f7`) | img-121 | the darkest gold of "BEAUTIFUL" |

Would look wrong beside: any warm cream or sand (the archive is cool neutral grey), and Shahar's own blues (img-104, img-106) used as a ground. Default-look note: "a near-black page with one acid accent" is the client's own brief (A6, A16), and the accent is the old metallic gold, not an acid colour.

**Type.** Display **Frank Ruhl Libre** 300 / 500 (Hebrew + Latin serif; the old site already loaded it, `brand.fonts_old_site`), for headlines, the stats and the ladder; its quiet serif is the Ritz lead-line voice (C-references-02) without italics Hebrew does not have. Body **Assistant** 400 / 600 (Hebrew-designed sans; used by both shaharnaor.com and the old site), 18 / 30. Two families, subsets ≤ 140 KB. Not Instrument Serif / Fraunces / Playfair / Cormorant / DM Serif; no tracked caps labels (Hebrew has no capitals; the side rail uses weight).

**Motion and micro-animations.**
- Hero: the vid-036 loop (poster first, video after first paint). No title reveal (calibration).
- Section grounds step (black → black → light band → black), hard at the edge, no fade (Porsche).
- Micro: buttons fill from the right on hover / press (220 ms, ease-out); the door panels' photographs scale 1.00 → 1.03 on hover (desktop only); FAQ "+" rotates 45°; case cards lift 4 px; the progress line on `/check` grows right-to-left; the Kube parallax ±4 rem on the door and band photographs, off ≤ 767 px (references #17).
- Reduced motion: poster only, no parallax, instant accordions. JS off: everything is DOM; the doors, the Check and WhatsApp are links. No canvas, no WebGL.
- Cost: no motion library; ≈ 6 KB of JS.

**Booking pattern.** Check as a full page (`/check`), one question per screen with tile-tap options (White Desert, references #2); the snapshot as "the print": white `#f7f7f7` card on black, the business name in the display face, five horizontal 1–5 scales like exposure readings, the observations as three short paragraphs, the path card, the partner's signature line, one gold button. `/book` is a **call sheet**: one page, three numbered blocks stacked (מועד, פרטים, תשלום), week strip + slot chips in white outline (selected = white fill), floating-label fields, the mocked card form, a summary column with `{session_length}`, `{price_session}` and the credit note. WhatsApp beside every action. Taps: Check 1, WhatsApp 1.

**Photographs.** vid-036 poster (1920, hero), img-001 (head crop ≤ 560 px wide, partner strip and partners), vid-033 still (864 × 1080, partners, after rendering), img-025 and img-029 (1500, 4:5 crops ≈ 800 × 1000, doors), img-019 (2000, full-bleed band), case posters (1280 / 1920), img-107 / img-110 / img-104 (1381, Shahar's strip at ≤ 400 px). Nothing drawn larger than its native width.

**Forecast.** No (not a surf business).

**Scroll set-piece.** — (calm never carries one).

**Budget.** First load ≈ 0.55 MB on a phone: poster AVIF ≤ 180 KB, fonts ≤ 140 KB, JS ≈ 6 KB, HTML/CSS ≈ 60 KB, img-001 crop ≤ 40 KB; video m1280 1.25 MB after first paint (d1920 2.08 MB desktop). Zero third-party requests on load (film embeds load on tap).

**What would make it fail.** It is the closest to Ashcroft and could read as a law firm's site in black and gold; the partner strip and the light band must carry the warmth, or calm becomes cold.

---

### 4.2 · Interactive — **"הזרקור" (The Spot)**

**The idea in one sentence.** Ninia's clarity with Steelwave's motion: Tal talks to camera on pure black, and the visitor's own pointer (or, on a phone, their scroll) moves a soft spotlight that lights the page — the visitor operates the light, and by the Flip the light turns from the visitor to their business.

**The one thing.** A soft-edged circle of light. It lives in three places only: over the hero, in the Mirror (the glare), and on the option the visitor picks in the Check. Nowhere else.

**First screen.**
- Composition: a **split** on black. The film takes the left 55 % on desktop (RTL: the end side), full height, as a tall frame edge-to-edge with no border: **vid-033, ~10–22 s** (Tal close on pure black, talking, hands entering frame; render with `tools/fetch-video.mjs`, poster at ~14 s). The text takes the right 45 %: eyebrow, the approved headline (44 / 30 px), the approved subtitle in body size (it fits here, the half-screen gives it room), the two doors as two buttons, white outline ("סיפור", "השקה"). On a phone: the film fills the top 62 % (4:5 crop of the 16:9 frame around his face), text and doors below on black; the bar sits at the bottom.
- **The spotlight:** the page's black is not flat: a radial light (`radial-gradient` 34 vmin, white at 9 % → 0) follows the pointer across the text half and, where it crosses the film, the film's exposure lifts by about half a stop (a CSS mask on a darkening layer above the video, not a filter on the footage). On touch it drifts slowly between the headline and Tal's face, and rests on the headline after 4 s. It never covers text and never adds a shape: it only lights.
- Proof point: a single line under the doors — "Amdocs · מכבי · SEAT · פארק בבלי" in grey (the brief's four cases). A rating does not exist; the names stand in, small, because the owner-led buyer needs the "they did this at scale" in the first seconds (direction "Positioning").
- The gold Check button is in the header and the phone bar.

**Structure (Home).**
1. Hero (above).
2. **Mirror — scroll-lit list**: the five pains, large (40 / 26 px). Each line rests at 0.35 opacity and lights to 1 as it crosses the centre of the screen, with a little overexposure (white text with a soft white glow at the moment it is lit, then settling) — the glare.
3. **The flip** — "ואז האור מסתובב": the ladder's five words in **Karantina** at 120 px (phone 64), first as outlines (`-webkit-text-stroke: 1px #fff`), filling white one by one on scroll, the last one filling **gold** (Steelwave outline/fill, C-references-07). The one gold word on the page that is not a button.
4. **Two doors** — two cards that are **tilted lights**: each card is a B&W photograph (Story img-024 group shoot, Launch img-020 man walking past the mural), cropped 4:5; on hover / focus the spot moves onto that card and lifts it; title, summary, format, `{price}`, a button.
5. **How it works — the Check starts here**: three steps as a row, and under step 1, **question 3 of the Check live on Home** ("כמה אנשים עובדים בעסק?" with its four option cards). Picking one sends the visitor to `/check` at question 1 with that answer saved (`sessionStorage`), counter already showing it. JS off: the four options are links to `/check?q3=…`.
6. **Proof** — the three stats count up once on first view (1.2 s, ease-out, final value in the HTML so JS off shows it); the brands as **white single-colour logo marks** in a mirrored marquee (redrawn from logo-001…034 for the mockup; pauses on hover / focus; a static wrapped grid under reduced motion); people as a second, slower marquee of names in type; the NBC note.
7. **Case cards** — a pinned horizontal run on desktop (White Desert camps, references #18): four 16:9 poster panels (vid-038, vid-022, vid-055, vid-020) travel right-to-left as you scroll 1:1, each with client, figure, placeholder line, "לסיפור המלא". Phone: a native swipe row with peek, no pin.
8. **The two partners** — two portraits on black with the spot resting between them: Tal = vid-033 still (4:5), Shahar = the marked placeholder frame; when the pointer moves to one, that one is lit and the other dims to 60 %. Bios in two columns. Shahar's work strip below his frame.
9. **Partnership band** — img-014 (Mercedes driver, 2000 px) full-bleed, darkened to 70 % under the text; "שותפות", the summary, "אתם לא לבד. נשימה.", button.
10. **FAQ** — accordion; the open item is "lit" (white text), closed items grey.
11. **Final call** — "מאיפה מתחילים? מכאן." with the spot fixed on the gold Check button (the only time the spot lands on gold), WhatsApp button beside.
Footer: as calm, with the signature drawn in once on first view (stroke-dashoffset, 1.4 s; static under reduced motion).

**Routes (A10).** Same set as calm, with these differences: `/story` and `/launch` open on the split (film left: Story = vid-015 Tal to camera, Launch = vid-027 workshop at ~24–28 s, both as posters with play-on-tap since only 027 is rendered); the method as ten **outline numbers** that fill as you scroll past each step (Story fills 1–7 and leaves 8–10 as outlines: "Story is steps 1–7" made visible). `/work`: filter chips with a sliding underlay (the chip slides, not the list), rows in Karantina outline that fill white on hover (Steelwave /portfolio, C-references-07). `/watch`: six rows of 9:16 cards; the hovered card is lit, the rest dim. `/brands`: the films as a pinned horizontal run, then the form. `/about`: the two partners large, the spot moves between them on scroll.

**Why it beats what we already have.** Against `old-site-desktop.png`: the old page tells the visitor to "meet Tal" and opens a menu of three quizzes; here Tal is talking on the first screen, the approved promise is beside him, and the first Check answer can be given on Home in one tap. Against the gold bar ("try-your-week"), it has the same "the booking lives inside the page" quality: the Check starts in the How-it-works section without a page change.

**Colour (sampled).**

| role | hex | asset | what it is |
|---|---|---|---|
| ground | `#060606` | img-113 | the black of the "SUCCESS IS BEAUTIFUL" board |
| film ground (matched) | `#070707` | img-014 | the car's interior shadow; vid-033's black matches it |
| ink | `#ffffff`; rest state of lit lists `#ffffff` at 35 % | img-050 | the sky over the sea |
| grey text | `#8c8c8c` (5.7:1 on `#0f0f0f`) | img-014 | the mid-grey of the dashboard (`#5b5b5b` lifted for contrast) |
| gold accent (booking only + the ladder's last word) | `#f3b614` fill, label `#0f0f0f` (10.5:1) | old-site-desktop.png | the old gold rules |
| gold highlight (the signature's draw-on, never text) | `#fcf8af` | img-113 | the highlight inside "BEAUTIFUL" |

Would look wrong beside: the mid-grey seamless of the studio portraits (`#474747`, vid-036's lit brick) used as a ground — it kills the spot. Default-look note as in calm (client-required black + one metallic gold).

**Type.** Display **Karantina** 300 / 700 (condensed Hebrew + Latin display; its tall narrow letters are the condensed word cards Tal's films end on — "TAL OREN", "BRAND YOURSELF", "DNA" in vid-036, img-046 "SUCCESS IS NEVER ENOUGH" — and it outlines cleanly with a stroke), for the flip, the stats, `/work` rows and section titles. Body **Heebo** 400 / 500 at 17 / 28 (Hebrew-designed, wide x-height, reads well on black at body size). Two families, ≤ 130 KB.

**Motion and micro-animations.** Main item: **the pointer spotlight** (CSS mask + one `pointermove` listener with a 0.12 lerp; touch path on a timer; no canvas, no WebGL). Micro: list lines lit on scroll (scroll-timeline where supported, an IntersectionObserver fallback); outline → fill words; stat count-up; mirrored marquees; the pinned case run (desktop only); chip underlay slide; signature draw-on; option cards in the Check lift and light when chosen; magnetic gold buttons on fine pointers (0.25×, references scroll catalogue #14). Reduced motion: no spot (the page is evenly lit), lists at full opacity, words already filled, marquees become static grids, no pin. JS off: all DOM, every action a link. Cost: GSAP + ScrollTrigger only for the pinned case run, loaded after first paint (≈ 45 KB gz); everything else is CSS and ≈ 8 KB own JS.

**Booking pattern.** The Check as a full page, with the spot: on each question screen the spot sits on the question; picking an option moves the spot onto it (180 ms), then Next lights. Counter "{n} / 10" in Karantina. The snapshot: a black page, the business name huge in outline then filled, the five scores as five **light meters** (a horizontal bar 1–5, the filled part white, the scale ticks grey), observations in a two-column grid, the recommended path as a lit card, the partner's name, one gold button. `/book` as a **slide-over drawer** from the left (RTL end) on desktop, full-screen sheet on phones (Tandjung Sari / Kube, references #1, #3), opened from every "לקביעת פגישת ייעוץ" without leaving the page; `/book` also exists as its own URL for links and JS off. Steps with a top step indicator (מועד · פרטים · תשלום), slot chips, floating labels, the mocked payment, then `/booked`. Taps: Check 1 (or 1 answer on Home), WhatsApp 1, session drawer 1.

**Photographs.** vid-033 (1920 source, hero; poster 1920), img-024 and img-020 (4:5 crops, doors), img-014 (2000, band), case posters, the vid-033 still and the placeholder (partners), logo marks redrawn as SVG.

**Forecast.** No.

**Scroll set-piece.** — (interactive never carries one; the pinned case run is a section pattern, not the set-piece).

**Budget.** First load ≈ 0.6 MB on a phone (poster ≤ 200 KB, fonts ≤ 130 KB, own JS 8 KB); vid-033 m1280 ≈ 1.3 MB after first paint (to be measured after rendering; cap 2 MB); GSAP after first paint 45 KB. Zero third-party requests on load.

**What would make it fail.** If the spot reads as a gimmick or as a mask over Tal's face, it becomes the "decorative overlay on video" Shahar rejected; it must be subtle enough that a visitor notices the light before they notice the effect.

---

### 4.3 · Unique — **"ההיפוך" (The Flip)**

**The idea in one sentence.** The brand idea built literally: one beam of light in a black space shines straight at the visitor (the glare), and as they scroll it swings round and lands on the studio — on Tal on his stool, then on the two partners, then on the visitor's own business — with an Amuse-Bouche story order and Briony's cut-outs rising through the statement.

**The one thing.** The beam: a cone of light with drifting dust and a faint frost at its edge (Igloo's cool frost, C-references-01, at a fraction of the cost), warm gold at its core. It is drawn, not filmed, and it is the only animated light on the page.

**Why it does not open on video.** Calm and interactive open on Tal's footage. Here the first screen is the **glare** the copy describes — the moment before the light is set — and the footage arrives one scroll later, when the beam lands on it. The first screen still carries the business's own picture: the beam's lit pool holds a still of vid-036 (~62–68 s, Tal in profile, half his face lit, 1920 frame) that sharpens as the beam turns.

**First screen.**
- Media: a full-screen **WebGL fragment shader** (one quad, no three.js, ≤ 12 KB of GLSL + JS): black ground `#060606`; a soft cone from the top-left corner (RTL: the start side is right, so the source sits top-right) aimed toward the viewer, so its core is a wide, slightly overexposed bloom across the upper third; fine dust in the beam (noise, 2 octaves); a cool frost edge `#3d4760` at ≤ 12 % in the beam's fringe only (Igloo's frost idea, C-references-01, in a colour from the business's own archive). In the pool where the beam falls (lower third), the vid-036 profile still shows at 40 % brightness.
- Text, centred horizontally and vertically on the dark part (calibration): the eyebrow in gold gradient, the approved headline (46 / 30 px), the two doors as one segmented control. Readable at 4.5:1 at every frame: the beam's bloom never crosses the text box (the shader receives the text box as a uniform and falls off around it).
- Proof point: none on the first screen (the stats arrive in the set-piece).
- The gold Check button in the header and the phone bar; "▶ הסרט" bottom centre.

**Scroll set-piece (unique only): pinned object — "the beam turns"** (scroll playbook §2.3 pattern 2, a pinned object rotating with progress, plus pattern 8 text reveals inside it). Pinned **≈ 300 vh** on desktop, 220 vh on phones, scrub 0.6:
- 0 → 25 %: the beam faces the visitor; the **five pains** appear one at a time in the glare, each line overexposed white (the Mirror, Home §2).
- 25 → 55 %: the beam swings (the cone's angle rotates ~110°) away from the viewer and down onto the stage; the profile still brightens to full and becomes the **vid-036 30–42 s loop** (crossfade from the still's last frame); "ואז האור מסתובב" sits beside it; the five ladder words rise one by one at different speeds as **cut-outs** through the statement (Briony, C-references-04) — the last word gold (the Flip, §3).
- 55 → 80 %: the beam widens into a second pool: **the two partners** stand in it side by side — Tal (vid-033 still) and Shahar's marked placeholder frame — with names and roles ("LED BY" moment, now lit, C-references-24).
- 80 → 100 %: the beam narrows onto the gold Check button: "הבדיקה הממוקדת · 10 שאלות · {check_minutes} דקות · בלי תשלום". The pin releases.
- Built from: vid-036 (rendered), the vid-036 profile still, the vid-033 still; the business's own usable video qualifies the set-piece. Alignment uses `focalX / focalY` of each media item (schema v0.10), never coordinates written for one frame.
- Reduced motion: no pin; the beam is a static drawing already pointing down at the stage; the five pains, the flip and the partners are ordinary stacked sections with the vid-036 poster. Without WebGL: a pre-rendered AVIF of the beam at its "landed" angle (≤ 120 KB) behind the same DOM sections. Weak phone (`deviceMemory ≤ 2` or `Save-Data`): the AVIF path. All text is DOM at every step.

**Structure (Home, after the set-piece).** The set-piece carries sections 1–3 and the partners' introduction; the order then follows the brief and Amuse-Bouche's story order (C-references-08):
4. **Two doors as a giant list** — "סיפור" and "השקה" set at 15 vw in Bellefair, one under the other, white on black; hovering / focusing one lights it with a narrow beam (a CSS echo of the shader, no WebGL) and opens a short panel under it (summary, format, `{price}`, button). Phone: both words stacked at 22 vw, tap to open.
5. **How it works** — three frames like a contact sheet: three 3:2 black frames with thin grey frame numbers ("1 / 3"), step names, one line each; the third frame names the three paths.
6. **Proof** — the stats set enormous (Bellefair 200 px desktop / 72 phone), one per screen-width row, label beside; the names wall as type, the brands line followed by the people line, the NBC note.
7. **Case cards** — one featured case at a time: a full-bleed poster (Amdocs vid-038 first) with the client in large type and "▶" for the film; four dots for the four cases (calibration: slideshows with dot navigation), swipe on phones.
8. **The two partners** — already met in the beam; here the full bios side by side, Shahar's work strip under his half (img-107, img-110, img-105).
9. **Partnership band** — img-021 (L'Oréal façade, 2000 px) full-bleed with a slow ±4 rem parallax (off on phones), "שותפות", the summary, "אתם לא לבד. נשימה.", button.
10. **FAQ** — accordion.
11. **Final call** — a **"work with us" marquee** of the line "מאיפה מתחילים? מכאן." in Bellefair outline, running mirrored, above the gold Check button and the WhatsApp button (Amuse-Bouche's closing marquee, without its 3D object).
Footer: black, signature, newsletter, socials, contact, legal.

**Routes (A10).** As calm, with: route heroes as a **small static beam** (the AVIF) landing on each page's own picture — `/story` img-025, `/launch` img-029, `/partnership` img-021, `/about` the two partner frames, `/brands` img-014, `/course` the vid-036 poster; `/work` as a wall of prints (a masonry of case posters, each keeping its own ratio, constraint 5) with the filter tabs, case pages in three parts with a full-bleed poster; `/watch` with the six series as vertical tabs on the side and a 9:16 grid; `/check` as the sitting under a fixed narrow beam from above (the question is what is lit); `/thanks` "the print is developing" — the business name fading up from black over 2 s (static under reduced motion) with the meanwhile videos; `/snapshot` as **the print** (below).

**Why it beats what we already have.** Against `old-site-desktop.png`: the old page explains the brand in a slider headline; this one stages it — the visitor sees the glare, then sees the light land on the people who will sit with them, before reading a paragraph. Against the gold bar ("postcard"): it is the only concept whose first screen is drawn, and it lands on the business's own footage within one scroll, as the gold pages land on theirs.

**Colour (sampled).**

| role | hex | asset | what it is |
|---|---|---|---|
| ground | `#060606` | img-019 | the black around the Wella box |
| beam core (drawn) | `#fcf8af` → `#deb050` | img-113 / logo-041 | the gold gradient's highlight and body |
| beam fringe (drawn, ≤ 12 %) | `#3d4760` | img-026 | the cold blue-grey wall behind the man in profile; Igloo's frost (C-references-01) taken from the business's own photograph |
| stage | `#2f2f2f` | vid-036 poster | the lit brick |
| ink | `#ffffff`; secondary `#a0a0a0` | img-001 | |
| gold accent (booking only) | `#f3b614`, label `#0f0f0f` (10.5:1) | old-site-desktop.png | |

Would look wrong beside: any second hue (the Behance covers' blues and reds stay in thumbnails), and a cream ground. Default-look note as in calm.

**Type.** Display **Bellefair** 400 (a high-contrast hairline serif for Hebrew and Latin; its hairlines are the thin gold pen line of the signature and the 1 px gold frames of the old site), for the giant door list, the stats, the marquee. Body **IBM Plex Sans Hebrew** 400 / 500 at 17 / 28 (technical, very legible, the Shahar half of the partnership — product and AI). Two families, ≤ 140 KB.

**Motion and micro-animations.** Main item: **the beam shader** (one fragment shader, ~60 lines; renders at 0.5× device pixels; paused off-screen and when the tab is hidden; 30 fps cap on phones). Micro: the cut-out ladder words rising at three speeds; the narrow CSS beam on the door list; contact-sheet frame numbers ticking; stat numbers set once (no count-up, the size is the effect); dot slideshow for cases (cross-fade 400 ms); the marquee; the snapshot's scores "developing" (each bar fades up 0 → value, 120 ms stagger). Reduced motion, no WebGL, weak phones: as in the set-piece. JS off: every section is plain DOM; the beam is the AVIF.

**Booking pattern.** The Check as **the sitting**: a black page with a fixed narrow beam from above; the question in the pool; option cards in the dark brighten when hovered and fully lit when chosen; a frame counter "{n} / 10" in the corner like a camera's frame count; the progress as a thin gold line growing from the right along the bottom. Contact + consent after Q10 under a slightly wider beam. The snapshot as **the print**: a white `#f7f7f7` sheet on black with a narrow black border (a photographic print's border, not a CSS rule — the sheet's own margin), the business name as the title in Bellefair, the five scores as a row of five exposure strips (1–5, the filled steps darker), observations, first move, the recommended path, "עבר על זה: {partner_name}" set beside the gold signature, one gold button. `/book` as a **call sheet**: a one-page black form with three blocks, the slot chips as a time grid, the mocked payment, then `/booked` with "נקבע." under the beam. WhatsApp 1 tap everywhere; Check 1 tap.

**Photographs.** vid-036 profile still (1920, first screen in the beam), vid-036 30–42 s loop (in the set-piece), vid-033 still (partners), img-021 (2000, band), case posters (1920), img-025 / img-029 / img-014 / img-003 (1500–2000, route heroes at native width or less), Shahar's strip.

**Forecast.** No.

**Budget.** First load ≈ 0.5 MB on a phone (the profile still AVIF ≤ 150 KB, fonts ≤ 140 KB, shader + own JS ≤ 25 KB, the AVIF fallback only when needed); GSAP + ScrollTrigger after first paint (45 KB) for the pin; vid-036 m1280 1.25 MB only when the set-piece reaches 25 %. Zero third-party requests on load.

**What would make it fail.** A 300 vh pin in front of the doors delays the visitor who came to start the Check; if the beam's turn is not obviously the brand idea within one second of scrolling, the set-piece reads as a delay, not a story — the header and bar buttons must stay live throughout.

---

## 5. Divergence table

This run (`2026-11-il-brand-02`) has one business. The other brand run's rows are shown for awareness only (divergence is required within a run).

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern | scroll set-piece |
|---|---|---|---|---|---|---|---|---|
| talouloren | calm "אור עליון" | the studio sitting | full-bleed vid-036 30–42 s (the top-lit studio), centred title + door control, "led by" partner strip at the foot | 12-col, centred hero, side rail (left), 2 × 2 cases | `#0f0f0f`, one `#f7f7f7` band | stepped grounds, ±4 rem parallax, no canvas | Check page; snapshot as a white print; `/book` call sheet page | — |
| talouloren | interactive "הזרקור" | the studio sitting | split: vid-033 Tal on black (left) + headline, subtitle, doors (right), pointer spotlight | 12-col split, pinned horizontal case run | `#060606` flat black | pointer spotlight (CSS mask), scroll-lit lists, outline → fill, marquee | Check Q3 answerable on Home; snapshot as light meters; `/book` as a slide-over drawer | — |
| talouloren | unique "ההיפוך" | the studio sitting | WebGL beam aimed at the visitor, a vid-036 profile still in its pool, centred title + doors | full-screen pin, then giant type list, contact-sheet frames | `#060606`, beam gold | one fragment shader, cut-outs rising, dot slideshow, mirrored marquee | the sitting under a fixed beam; snapshot as a bordered print; call sheet | **pinned object: the beam turns** (vid-036 + stills) |
| *mutag-meitiv (run 2026-10-il-brand-01)* | S2 calm / interactive / unique | the programme (organisations) | stacked img-033 over a green band / photo swapping with format chips / full-bleed stage img-011 | 12-col lists / hero card + tabs / pinned stage | white + deep green | panels widen / chip swap, card deck / zoom-through | mint rows / chips / programme rows | zoom-through "into the screen" |

No two talouloren rows share a first-screen device. If a second business joins this run, it must avoid the studio-sitting archetype and the beam set-piece.

**What a visitor would notice against mutag-meitiv** (other run, for awareness): a black, gold-signed studio with a man on a stool under one light, against a white-and-green workshop programme with a woman's portrait and a stage screen; nothing on these pages is green, light-grounded or card-led.

---

## Hand-off checklist

1. Every photograph looked at (img-001…125 sheets, logo-001…041, old-site screenshots, five video frame sheets); best width 2000 px (img-014, img-019, img-021). ✓
2. `agents/designer/references.md` read in full; cited: #1, #2, #3, #4, #5, #6, #8, #14, #17, #18 (plus calibration). ✓
3. Divergence table: every business in this run (one) plus the other brand run for awareness. ✓
4. Every video listed by group with ids; the three rendered clips with lengths, sizes and best moments; the ten strongest photographs with widths. ✓
5. Each concept says why it beats `old-site-desktop.png` and names a gold page. ✓
6. Each first screen: own media (or the drawn beam on an own still, with the reason), what (the headline) and the booking action (doors + header/bar Check + WhatsApp). ✓
7. Facts trace to the dossier (`proof.stats`, `team`, `services`, `videos`, `brand.colors`, `gaps`). ✓
8. Every colour has a hex and an asset id. ✓
9. Default look: near-black + one accent is client-required (A6, A16) and said so in each concept; no banned faces. ✓
10. Each concept names its one thing. ✓
11. Interactive and unique name their main item (the pointer spotlight over vid-033; the beam shader with vid-036); calm names its hero media and micro-animations. ✓
12. Gold opened this run (the-sign, layday-surf), not only the notes. ✓

## Report notes (for the orchestrator and Shahar)

- **Conflict, primary action.** `audit.json.recommended.primary_action` is WhatsApp; the brief says Home's job is the Focused Check (hero = two door buttons). Every concept puts the doors in the hero, the gold Check in the header and the phone bar, and WhatsApp 1 tap away in the bar. The critic should measure WhatsApp at 1 tap and the Check at 1 tap.
- **Conflict, hero density.** The brief's hero (eyebrow + headline + subtitle + two doors + film slot) is heavier than the designer calibration (title + one short action). Calm and unique move the subtitle out of the hero; interactive keeps it, on the text half of a split.
- **Identity, to confirm.** The man in vid-036 (which the dossier and the trailer's "TAL OREN" card call Tal) closely resembles the man in img-002 / img-003 / img-005, which `team[0].identity_note` says is not Tal. If he is Tal, img-003 / img-005 (1500 px) become usable partner portraits. Until Shahar confirms, the concepts use them only as unlabelled work.
- **Shahar's photograph.** shaharnaor.com shows a small round black-and-white headshot of Shahar next to the SN monogram (opened live, 2026-11-02); it is not in the dossier (the harvester noted only `sn.webp`, the logo). Every concept uses a marked placeholder as instructed; if Shahar wants that headshot used, the harvester must fetch it and record it.
- **Renditions needed.** vid-033 (interactive's hero, unique's partner still) has only a source file; run `tools/fetch-video.mjs` before 4e. vid-027's poster must be re-picked if used large.
- **Schema gaps** (site-content v0.11): no embed-URL field on `videos[]` (the brief's "embed URL + poster" slots; today only uploads); no video-series grouping for `/watch`; no FAQ, pains, promise ladder, stats or names-wall fields (they live in `copy.extras`, not the schema); `testimonials[]` has no video. The brief lists CMS collections for these (pages by key, testimonials with video URL, video series, FAQ, site settings).
- **Naming.** review N1 (Focused Check vs Spotlight Check in English) is open; no concept depends on the English name.
- **Material the site cannot support yet:** the partners' film, Shahar's portrait, real case stories, vector logos, prices.
- **The one thing I would photograph on location:** both partners together on two stools in the dark brick studio under the same single top light as vid-036, shot once wide (16:9, for the hero loop) and once each in 4:5 (for the partner frames).
