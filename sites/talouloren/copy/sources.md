# copy sources — talouloren · he + en

Copywriter 0.5.0 (the run file pins 0.5.1, which does not exist; `agents/copywriter/base.md` is 0.5.0) · run 2026-11-il-brand-02 (inbound, live) · 2026-11-02 · schema v0.11 (caps re-read this round: `copyBlocks` ≤ 16 for `brand_practice`, `services` ≤ 20, `method.stages` ≤ 6, `videos` ≤ 6, `caseStudies` ≤ 24, `clientLogos` ≤ 40, `testimonials.quote` ≤ 1000).

**No owner prose is reused (brief A5: copy written from scratch, Hebrew first, English written after to match).** Facts come from `dossier/talouloren/dossier.json` only; most rest on `origin: client` fields copied from the brief. `audit.json` shapes order and CTA only, never a fact; the brief governs the funnel over the audit (every page ends in the Check or a Clarity Session; WhatsApp is the global secondary). `direction.md` "must do" items are covered as listed at the end. `brief/talouloren/copy-terms.json` is used for its `term.*` keys only (A13); the rest of that file was not copied.

Notation: `d.` = `dossier.json`. `p[n]` = paragraph n of a `body`. he and en carry the same facts field for field; one row covers both unless it says otherwise.

## Fixed names and approved lines

| Thing | he | en | Rests on |
|---|---|---|---|
| Brand name (logo, titles) | Talou L'oren | Talou L'oren | `d.business.name` (A22) |
| Tagline | Success is Beautiful | Success is Beautiful | `d.business.tagline`; copy-terms `term.tagline` |
| Free intake | בדיקה ממוקדת | **Spotlight Check** | copy-terms `term.check` (A13: `term.*` keys are the fixed names). The brief body and `d.offers[0].label_en` say "Focused Check"; A13 is the later answer, so `term.check` en wins. **Open for Shahar** |
| Paid first meeting | פגישת ייעוץ | Clarity Session | `term.session`, `d.offers[1]` (A12, A15) |
| Packages | ספרינט סיפור · בניית השקה · שותפות | Story Sprint · Launch Build · Partnership | `term.story_sprint` / `.launch_build` / `.partnership`, `d.offers` |
| Doors | סיפור / השקה | Story / Launch | `term.door_story` / `.door_launch`, `d.doors` |
| Course | BRAND YOURSELF | BRAND YOURSELF | `d.offers[5]` |
| Snapshot | תמונת מצב | snapshot | `term.snapshot` |
| Method | השיטה | The method | `term.method`, `d.method` |
| Ladder | בהירות, תנועה, תשומת לב, משיכה, מודעות | clarity, movement, attention, attraction, awareness | `term.clarity`…`term.awareness`, `d.business.promise_ladder` |
| Hero eyebrow / headline / subtitle | verbatim | written to match | `d.business.approved_lines` (verbatim in he; en is ours) |

## Top-level fields

| Field | Rests on |
|---|---|
| `businessName` | `d.business.name` |
| `businessType` `brand_practice` | `d.businessType` |
| `languages` `["he","en"]` | `d.languages.client`, run file |
| `tagline` | `d.business.tagline` |
| `closing` "מתחילים בבדיקה הממוקדת. שאלה לפני? כתבו לנו בוואטסאפ." | `d.booking.new_site` (every page ends in the Check or a session), `d.contact.whatsapp`; closing intent per `audit.recommended` (wording only) |
| `featureLine` | null: the flip line lives in `copyBlocks[2]` (one fact once) |
| `contact.phone` / `.whatsapp` +972504635536 · `.email` tal@talouloren.com | `d.contact.phone`, `.whatsapp`, `.email` (A23) |
| `contact.address` / `.mapUrl` null | `d.contact.address` gap: no street address by client choice (A23). No Google listing in the dossier; nothing to apply the address rule to |
| `bookingLinks` `[]` | `d.booking.engine_url` gap: no booking tool; booking and payment are mocked (A10). The Check (`/check`) and `/book` are site routes, not links |
| `openingHours`, `hoursNote` | `d.hours_note` gap (by appointment) |
| `priceList` `[]` | prices live in `services[]` ("Offers are one list") |
| `photos[0]` img-001, caption "טל אורן" | `d.images[img-001]` (subject tal), `d.team[0].photos`. No other image is certainly Tal or Shahar (`d.gaps[0..1]`), so nothing else is captioned as them |
| `heroVideo` vid-036 + poster | `d.videos[vid-036]` (hero_candidate rank 1), `d.gaps` "hero film of both partners: to be shot; vid-036 (Tal alone) stands in" |
| `videos[0..5]` descriptions | `d.videos[vid-038, vid-022, vid-055, vid-020, vid-027, vid-007].shows` / `.title`, shortened, nothing added. vid-022 "אנשי האור" is its title; vid-027 "College of Management … Bank Hapoalim" is its title + `shows` |
| `ratings`, `testimonials` `[]` | no review platform; written quotes left out (A18, `d.testimonials.written.use: false`); Hadad and Harari out (`d.testimonials.left_out`). Video testimonials are in `extras.video_library.voices` |
| `spot`, `season`, `amenities`, `languagesSpoken`, `awards`, `credentials`, `instagramTiles`, `podcast`, `downloads`, `posts` | empty: not in the dossier for this business (Instagram media not resolvable, `d.gaps` "instagram media") |
| `socialLinks` Instagram, YouTube, LinkedIn | `d.contact.socials.client_confirmed` (A9). Facebook left out: A9 names three |
| `newsletter.label` / `.url` null | `d.gaps` "newsletter.url": the brief asks for a footer sign-up, no provider named. The label says what it is (letters for owners on story, visibility, growth) — **framing**: no frequency or content promise beyond the brief's "Copy direction" voice; owner to confirm |

## `copyBlocks[]` (4 of 16)

| Row · para | Rests on |
|---|---|
| [0] intro · heading (he) | `d.business.approved_lines.hero_headline`, verbatim |
| [0] p1 (he) | `.hero_subtitle`, verbatim ("ממגנט" as written) |
| [0] en | written to match the two approved lines |
| [1] info · heading "אולי זה נשמע מוכר" / "Does any of this sound familiar" | framing for the mirror section (brief Home 2) |
| [1] p1–p5 | `d.pains[0..4]` in order, one pain each, rewritten in plural address; p5 keeps the deer-in-the-headlights image of `d.pains[4]` and `d.business.brand_idea` |
| [2] info · heading "ואז האור מסתובב" / "Then the light turns" | `d.business.brand_idea` ("the light turns to land on them") |
| [2] p1 | `d.business.brand_idea` + `d.business.promise_ladder` (fixed words, in order) |
| [3] about · heading | framing of `d.business.description` (find the story / build what makes it visible) |
| [3] p1 "סיפור שאף אחד לא בונה…" (humanizer 0.2.1; was "סיפור בלי מי שיבנה אותו…") | **framing**: an opinion line introducing why two partners; asserts no fact about anyone |
| [3] p2 s1–s2 | `d.team[0].brings`, `d.team[1].brings` |
| [3] p2 s3 "ביחד נדייק את החזון שלכם" / "Together we sharpen your vision" | `d.tone_old_site[1]` ("ביחד נדייק את החזון שלך", keep), in plural |

## `services[]` (7 of 20)

Prices: `price: null` + a visible placeholder in `extras.placeholders` / `extras.pages.<page>.price` for every undecided price (`d.offers[].gap`, brief "Copy direction": visible placeholders). The Check is `price: 0` (`d.offers[0]` "Free").

| Row · field | Rests on |
|---|---|
| spotlight-check · title | `term.check` |
| · summary "תמונת מצב אישית של העסק, בלי תשלום." | `d.offers[0]` ("Free", "personal snapshot") |
| · body s1 "ואנחנו מסתכלים גם על מה שכבר יש לכם ברשת" | brief "Tech" row "Check backend: Intake → public-presence scan → rubric scoring → partner approval → snapshot" — carried in the dossier as `d.site_spec` (brief "Site spec") and `d.businessType.note` ("free diagnostic"); **flag for the copyeditor: the public-presence scan is in the brief's Tech table, which `d.site_spec` points to but does not copy** |
| · body s2 (score 1–5 in five areas, three observations, first move, recommended path) | brief "Snapshot page", via `d.site_spec` (same flag) |
| · format "10 שאלות, שאלה אחת בכל מסך" | `d.offers[0].format` ("10-question"), brief "Focused Check flow" ("one per screen") via `d.site_spec` |
| · audience | `d.audience` (owner-led segments) |
| · ctaText | prefilled WhatsApp line naming the offer (playbook §5) |
| clarity-session · summary | `d.offers[1].format` ("Paid, both partners, written action plan") |
| · body (fee credited) | `d.offers[1].format` ("fee credited if they continue") |
| · format "{session_length}, עם טל ושחר" | `d.offers[1].gap` (length undecided → placeholder), `d.team[].name` |
| · audience | `d.audience` + brief segment table rows whose first step is the Clarity Session (2–20 people, SMB, personal brand), via `d.audience` |
| story · summary | `d.doors.value[0].for` |
| · body p1 "ממליצים עליכם רק מי שכבר מכיר אתכם" | brief segment "Solo owner or freelancer: Skilled, invisible, selling on referrals" (via `d.audience`); framing of that line |
| · body p2 (DNA, five values, core story, messaging, visual language, one hero piece) | `d.doors.value[0].delivers` |
| · format | `d.offers[2]` (Story Sprint, 2–4 weeks, fixed scope) |
| · audience | segment "Solo owner or freelancer … Story Sprint or course" |
| launch · summary | `d.doors.value[1].for` |
| · body p1 | segment "New business: Idea or fresh registration, no presence" + `d.pains[2]` (fear of the first step) |
| · body p2 | `d.doors.value[1].delivers` |
| · format | `d.offers[3]` (Launch Build, 6–10 weeks, fixed scope) |
| partnership · summary | `d.offers[4]` (flagship; "tailored system for marketing, sales and operations") |
| · body p1 | `d.pains[0]`, `[1]`, `[3]` |
| · body p2 "אתם לא לבד. נשימה." / "You are not alone. Breathe." | `d.tone_old_site[0]` ("keep, rewritten in plural") |
| · body p3 | framing of `d.offers[4]` ("weekly meeting with both partners" is in `format`, not repeated) |
| · format | `d.offers[4].format` (3–6 months, weekly meeting with both partners) |
| · audience | segments whose likely path is Partnership (2–20 people, SMB, personal brand "Story Sprint, then Partnership") |
| course · summary / body | `d.offers[5]` (DIY, 10 recorded lessons, self-paced), `d.method.note` ("also the 10 lessons of the BRAND YOURSELF course") |
| · format | `d.offers[5].format` |
| · audience | segment "Solo owner or freelancer … course" |
| craft · summary | `d.offers_note` (craft services, the nine, in the brief's order) |
| · body "בכל שלב בדרך" | `d.offers_note` ("available at any step"); "even without a path" — **framing** of "at any step"; copyeditor to judge |

## `method`

| Field | Rests on |
|---|---|
| `name` | `term.method` |
| `intro` s1 (ten steps, first and last) | `d.method.value[0]`, `[9]` |
| `intro` s2 (Story 1–7, Launch 1–10) | `d.doors.value[].method_steps` |
| `stages` `[]` | **cap**: `method.stages[]` ≤ 6 (schema v0.11, re-read this round); the method has 10 steps. The ten are in `extras.method_steps` (described once) so the count is never cut. Schema gap: a 10-row method; proposal material for the schema owner |

`extras.method_steps` he titles follow Tal's own Hebrew lesson names on the old course page where they exist (`industry/lane-position.md` C-position-06 list: מדף המוצרים, ה-DNA שלי, Know Like Trust מסלול הלקוח, חמשת ערכי המותג, מיתוג ומיתוג ויזואלי, משפך ואסטרטגיה דיגיטלית); steps 1, 9, 10 translate `d.method.value`. Step 1 he "אני, המותג, היזמות": the English "the entrepreneur" made gender-neutral (brief rule: never masculine singular). en titles are `d.method.value` verbatim.

## `team[]`

| Row · field | Rests on |
|---|---|
| Tal · name / role | `d.team[0].name`, `.role` (he "טל אורן": the old site's own spelling, "אני טל אורן", `d.team[0].identity_note`) |
| · bio s1 | `d.team[0].bio` ("10+ years building and launching brands with leadership teams and with one-person businesses") |
| · bio s2 | `d.team[0].bio` ("Creator of the BRAND YOURSELF course and its 10-step method"). Stated only here: the course and method fields do not repeat who made them |
| · photo | img-001 (`d.team[0].photos`) |
| Shahar · name / role | `d.team[1].name`, `.role`; he spelling "שחר נאור" is the transliteration (no Hebrew spelling in the dossier) — owner to confirm |
| · bio | `d.team[1].bio`, sentence by sentence (two decades; co-ran Kapara 12 years; founded Cronus Media; advisor and hands-on partner to startups; builds AI tools) |
| · photo null | `d.team[1].photo_gap` |
| · url | `d.contact.socials.shahar.site` |

Brief "team and trusted providers are not featured": only the two partners appear (`d.team_rule`).

## `caseStudies[]` (11 of 24)

Section mapping (brief "Case pages with three sections: where they were, what we did, what changed"): `challenge` = where they were, `extras.pages.work.case_what_we_did[<slug>]` = what we did (`process[]` cannot be used: its `stage` must equal a `method.stages[].label`, and `stages` is empty, see `method`), `outcome` = what changed. `sector` carries the Work filter (brief "Organisations / Entrepreneurs / Brands"; old tabs `d.old_case_studies[].tab`).

**Confirmed cases** (`d.confirmed_cases`, "case story to be written"): only the brief's one line is a fact. Where nothing is sourced, a **visible placeholder** stands (`{case_story_<slug>_before}` / `_did`), never an invented story.

| Slug | Field | Rests on |
|---|---|---|
| amdocs | title "פרויקט החדשנות של Amdocs" | `d.videos[vid-038].title` "AMDOCS INNOVATION PROJECT" |
| | outcome (innovation embedded, 27,000 employees) | `d.confirmed_cases[0]` (`what`, `size`). The 27,000 also stands as a Home stat: **deliberate**, brief Home 6 (stat) and 7 (case card) ask for both |
| maccabi | client "מכבי שירותי בריאות" / "Maccabi Healthcare", title "אנשי האור" | `d.confirmed_cases[1]`, `d.videos[vid-022].title` |
| | outcome (a step reaching 3 million people) | `d.confirmed_cases[1]` (`what`). Stat repeat as for Amdocs |
| seat | title "הפרסומת של SEAT" | `d.videos[vid-055]` (SEAT TV COMMERCIAL) |
| | outcome | `d.confirmed_cases[2]` ("Sold a car online for the first time") |
| park-bavli | title | `d.videos[vid-018]`, `[vid-020]` titles (real-estate, campaign) |
| | outcome (Yitzhak Tshuva's project sold faster) | `d.confirmed_cases[3]` ("Park Bavli (Yitzhak Tshuva)", "Helped the project sell faster") |

**Old case studies** (A19: on /work, stories only, no figures beyond the brief's). Each sentence restates the old Hebrew text `d.old_case_studies.value[<slug>].text` in the new voice. Removed, with the reason (`d.old_case_studies.note`, `d.do_not_claim`, direction must-do 10):

| Slug | Rests on (sentence by sentence) | Left out |
|---|---|---|
| wella | challenge s1: "צניחה של נתח השוק … תוך עשור ובעקבות כניסה של שחקנים דומיננטיים" (no figures); s2: "כניסתו של המנכ"ל החדש … אפשרה לנו לחבור ולבנות תוכנית פעולה". did p1: "ליווי אסטרטגי שוטף של מנכ"ל החברה וצוות השיווק … אינטגרציה מול צוות המכירות", "BACK TO WELLA", "ניהול תקציב השיווק והמדיה"; p2: product launch that "החזירה את לבבות הלקוחות הרדומים הביתה", training formats, holiday packs, Greece trip, colour service + national sales push + digital campaign, team connected to renewed values. outcome: "המותג וולה חזר להיות שחקן מוביל בקטגוריה. המותג התרענן" | 80%→20%, 28%, "three-year" (a figure), the CEO's name, "CEO of the year" award, "hundreds of new clients", "thousands of end customers" |
| eugene-perma | challenge: "הצורך" list verbatim in substance. did p1: research, creative, BLONDE MASTER call to hairdressers; p2: training, community, repositioning of brand and team. outcome: "מרכז ההדרכה … בתפוסה מלאה", "מיצוב מחדש וכניסה למגרש של מובילי התחום" | "doubled turnover", "over 1000 new clients", "four years", "10%" |
| calvin-klein | client: the brand named in the text ("קלווין קליין"; the old title "שסטוביץ" is a company name not on the brief's list, left out). challenge: "העצמה תדמיתית של … יועצות היופי של המותג קלווין קליין בישראל" (as a goal: **framing**). did: local concept + "דיונים מול מטה התקשורת העולמית", production across cities, photo booth, "הזנקה אנרגטית של כל מערך יועצות היופי". outcome: "הפצנו באמצעות היועצות עצמן … כבשנו מדיה משמעותית ברשתות החברתיות ללא עלות נוספת" | "650", "5 cities", the exclamation mark |
| visa-cal | challenge: "חיבור הנהלת החברה לתפיסת עולם של מצליחנות". did: talk, photo booth, movement session with a choreographer. outcome: "צוות ההנהלה יצא מגובש, חדור מטרה" | "והתוצאות העסקיות לא איחרו להגיע" (an unmeasured result claim); "מובילה" (a superlative) |
| doron-shefer | challenge + did: the two sentences of the old text. outcome: `{case_story_doron_shefer_after}` — the old text states no outcome | — |
| rita | challenge: "המטרה: צילומי קליפ לתקליט החדש". did: the process paragraph. outcome: "קליפ יוצא דופן וחשיפה עצומה" ("עצומה" → "גדולה" / "wide": a calmer word for the same claim, brief voice) | — |
| amt | challenge + did: the first two sentences ("Amos" not named in the case: the client is AMT). outcome: "העסק … צמח מהר מאוד … הוחלט על פתיחת סניף נוסף" | "ההרשמה נחסמה בשל עומס יתר" (`d.old_case_studies.note`: do-not-claim), "אשר מוקם בימים אלו" (stale) |

## `clientLogos[]` (17 of 40)

Names: `d.proof.names_wall_brands` (17, the brief's order), cleared by A4 (`d.proof.logos_cleared`). Logo files where the old wall has one (`d.images[logo-*].description`): Mercedes logo-030, L'Oréal logo-038, Wella logo-037, Mizrahi-Tefahot logo-001, Philip Morris logo-032, Osem logo-003, Castro logo-002. The others have no file: `logo: null` (required by the schema) — **gap**: all wall logos need redrawing (`d.gaps` "client_logos (resolution)"). Logos on the old wall but not on the brief's list (Google, Wix, Nespresso, Shufersal, MAC, Marc Jacobs…) are left out: the brief gives the names.

## `legal`

| Field | Rests on |
|---|---|
| `accessibilityStatement` p1 | **framing** (intent of the statement) |
| p2 level / date | **placeholders** `{accessibility_level}`, `{accessibility_audit_date}`: nothing audited yet (`d.gaps` legal.accessibilityStatement; market il, IS 5568) |
| p3 measures | placeholder `{accessibility_measures}` |
| p4 how to report | framing; the contact is the next field |
| `accessibilityContact` | placeholder `{accessibility_coordinator}` + `d.contact.email`, phone as A23 writes it. Contact repeated here **deliberately**: the statement must name its contact |
| privacy page | `extras.pages.privacy.body` = `{privacy_policy}`: `d.gaps` "legal.privacy / consent wording" not decided |

## `extras` (not schema fields)

Why extras: v0.11 has no fields for interface strings per page, the Check flow, the snapshot, booking, messages, a 10-step method, a video library over 6 rows, the hero door buttons or SEO titles. Template-owned interface labels (playbook: "Book on WhatsApp" etc.) are written here because the brief asks OneShot to write every string; they assert nothing.

| Key | Rests on |
|---|---|
| `placeholders` | `d.offers[].gap`, brief "Not decided" (prices, session length, capacity, budget ranges, turnaround), Check length (direction must-do 6 asks for "about N minutes": N unknown), consent and privacy (`d.gaps`) |
| `nav`, `cta`, `footer`, `form` | sitemap routes (`d.site_spec`); labels only. `cta.whatsapp` = the global secondary (`d.contact.whatsapp`, brief "Global"). `footer.rights` year is runtime |
| `home.hero` | eyebrow `d.business.approved_lines.hero_eyebrow`; door buttons `term.door_*`; `film_label` `{hero_film_caption}`: the 30-second film of both partners is to be shot (`d.gaps`), so no caption claims it exists |
| `home.how` | brief Home 5 (Check → Session → your path) via `d.site_spec`; step3_body: `d.offers[1]` (written action plan) + the paths (`d.offers`) |
| `home.proof.stats` | `d.proof.stats` (the three approved numbers and what they count) |
| `home.proof.people` | `d.proof.names_wall_people`, brief spellings (he transliterations ours) |
| `home.proof.sectors` | `d.proof.names_wall_sectors` |
| `home.proof.nbc_note` | `d.proof.nbc_wording` (brief wording; Emmy nomination not claimed) |
| `home.cases_order` | brief Home 7 |
| `home.partnership_band` | heading `term.partnership`; the band shows `services[partnership].summary` |
| `home.faq` (6, brief Home 10) | a1: partner approval before the snapshot goes out (brief "Tech" Check backend + Snapshot "Reviewed by {partner_name}" via `d.site_spec` — same flag as the Check body). a2: the snapshot carries a recommended path (brief Snapshot page, via `d.site_spec`). a3: segment "Small to medium business: Has marketing, lacks story and system → Clarity Session" (`d.audience`). a4: `d.offers[5]` (DIY). a5: "Leads who finish the Check and don't book get five follow-ups over 14 days by WhatsApp and email" (brief "Funnel", via `d.site_spec`) + `extras.msg.unsubscribe` (stop any time). a6: `/brands` page and form (`d.site_spec`, `d.audience`) |
| `home.final.heading` | framing; the action is the Check (brief Home 11) |
| `pages.story` | headline: `d.doors.value[0].for`; pain heading: segment "selling on referrals"; price `{price_story_sprint}`; end → Check (sitemap) |
| `pages.launch` | headline: `d.doors.value[1].for` ("new or relaunching"); price `{price_launch_build}`; end → Check |
| `pages.partnership` | headline: `d.pains[0]`; pain heading: segment "Working but plateaued"; capacity `{partnership_capacity}`; price `{price_partnership}`; end → Clarity Session (sitemap; segment first steps) |
| `pages.work.intro`, `.filter`, `.case_sections` | brief "Other functional requirements" (filter, three sections), via `d.site_spec` |
| `pages.work.case_what_we_did` | see `caseStudies[]` above; confirmed cases are placeholders |
| `pages.work.voices_intro` s1 | `d.confirmed_cases[4]` ("Dozens of owner-led businesses — sales improved by hundreds of percent"), general, attributed to no named client (`d.do_not_claim`) |
| s2 "חלקם סיפרו על זה מול המצלמה" | `d.confirmed_cases[4].proof` ("video testimonials") |
| `pages.work.end_heading` | sitemap: /work ends with a Clarity Session; "with both of us" `d.offers[1]` |
| `pages.about` | labels; end → Clarity Session (sitemap) |
| `pages.brands.pain` / `.solution` | segment "Larger brand or team: Budget and agencies, a specific gap → Scoped project" (`d.audience`) |
| `pages.brands.films_heading` | `d.channel_films` (A20: all may go live) |
| `pages.brands.form` | brief "Brands page form: name, company, role, email, phone, need" via `d.site_spec` |
| `pages.watch.series` | `d.video_series` names; lines = brief "Six video series" Shows column, rewritten; he names are ours (the brief gives English names only) |
| `pages.watch.empty_series` | `d.video_series.note` (A21: no vlog series; new series to be shot) |
| `pages.course` | headline `d.offers[5]`; lessons heading: 10 lessons = 10 steps (`d.method.note`); price `{course_price}` |
| `pages.check` | brief "Focused Check flow" (10 questions, inputs, contact + consent) via `d.site_spec`; option wordings for Q3/Q7/Q8/Q10 follow the brief's input column (4 team sizes; the four stages; five things tried; start time). `meta` line: direction must-do 6 (cost and payoff on the start screen) — **repeat by design** of the Check's free / 10 questions / snapshot facts. Consent `{consent_text}` (`d.gaps`) |
| `pages.thanks` | snapshot by WhatsApp and email (brief "Tech" Messaging row via `d.site_spec`), `{turnaround}` (not decided) |
| `pages.snapshot` | brief "Snapshot page" (five dimensions, three observations, first move, path options, "Reviewed by {partner_name}", button to book). Scale "1 עד 5" with no score-band labels (direction must-do 7: no fear-labelled bands). `cta_line`: **framing** of the session as going through the snapshot together (direction must-do 7) |
| `pages.book`, `pages.booked` | brief "Booking" (pick a time, details, pay, confirmation plus email and WhatsApp confirmation) via `d.site_spec`; the session's length, price and credit come from `services[clarity-session]` (not repeated) |
| `pages.not_found` | sitemap 404 → Home |
| `method_steps` | see `method` |
| `video_library` | ids from `d.confirmed_cases[].videos`, `d.channel_films.videos`, `d.old_case_studies[].videos`, `d.testimonials.video`. `label` = the video's own title from `d.videos[].title`, verbatim and untranslated (vid-020 trimmed to "קמפיין פארק בבלי": its full title names an architect who is not on the brief's list). Captions: names as `d.testimonials.video[].person`; vid-010 ("Yifat" tile shows someone else) and vid-040/009/030 (Dr. Oded Kravtchik, not on the names list) are `{name_to_confirm}` (`d.gaps` "testimonials.video (names)"). Series placement is ours (A20 "placement is ours"): Proof = case and channel films, In Their Words = testimonials, Boots on the Ground = vid-027 (Tal lecturing a workshop). The "SUCCESS IS…" vlog (vid-014…062) is not placed in a series (A21) |
| `msg.*` | brief "Messaging" (snapshot delivery, follow-ups, booking confirmations) and "Funnel" (five follow-ups over 14 days) via `d.site_spec`; every variable is runtime. follow5 "written action plan" = `d.offers[1]`. booking_confirm signed by both partners' first names (`d.team`) |
| `seo.*` | category words from `direction.md` must-do 14 and C-position-21/22 (`industry.md`): "מיתוג אישי לעסק", "בניית מותג אישי", "מיתוג לעסקים קטנים", "מיתוג לעסק חדש", "הקמת עסק חדש", "מנטור עסקי", "אסטרטגיה שיווקית לעסק", "ייעוץ עסקי לעסקים קטנים בחינם". The descriptions restate each page's facts (meta text by design). The search phrase on `/check` is the typed query; the Check is a free review of the business, not consulting: **copyeditor to judge** |

## Each fact once (constraint 10)

Checked across both files. Repeats left in on purpose, each with its reason:

1. 27,000 and 3 million: Home stat and their case outcome (brief Home 6 + 7).
2. The Check's "10 questions / free / snapshot": `services[spotlight-check]` and the Check start screen `meta` (direction must-do 6).
3. Email and phone: `contact` and `legal.accessibilityContact` (the statement must name its contact).
4. `seo.*` descriptions restate page facts (meta, not page copy).

Removed in drafting to keep one place per fact: "weekly" from the Partnership body (it is in `format`), "at your own pace" from the course body (in `format`), the path list from FAQ a2 (in the snapshot), Tal as creator from the course and method fields (in his bio), the flip line from `featureLine` (in `copyBlocks[2]`).

## direction.md "must do" coverage

| # | Covered by |
|---|---|
| 1 RTL, full English | both locales complete; Latin brand names kept Latin in he |
| 5 partners near the top, film slot | `team[]`, `copyBlocks[3]`, `extras.home.hero.film_label` placeholder |
| 6 Check one per screen, counter, start screen cost/payoff, contact after Q10 | `extras.pages.check` |
| 7 snapshot one action, no fear bands, no countdowns | `extras.pages.snapshot` |
| 8 booking mocked with placeholders and the credit line | `services[clarity-session]`, `extras.pages.book` |
| 9 stats, names wall, four case cards, NBC wording | `extras.home.proof`, `clientLogos`, `caseStudies` |
| 10 nothing banned carried over | see the old-cases table; no multiples, no Alvaro, no Teddy Sagi |
| 11 video slots with poster, site reads without video | `videos[]`, `extras.video_library`; every video has a text label |
| 12 /watch by six series | `extras.pages.watch` |
| 14 qualified category words in titles | `extras.seo` |
| 15 voice, old warmth in plural | `services[partnership].body` p2, `copyBlocks[3]` p2 |
| 16 photos: no image implying a team | only img-001 used |
| 17 every page and function | sitemap routes all in `extras.pages` (privacy, accessibility, 404 included); global header button, WhatsApp, newsletter |
| 2, 3, 4, 13, 18 | design / dropped (13) / mockups: no copy |

## Tempted and did not (owner list)

- Case stories for Amdocs, Maccabi, SEAT, Park Bavli (before / what we did): placeholders until the partners write them.
- Doron Shefer's outcome: the old page states none.
- Session length, all prices, Partnership capacity, budget ranges, snapshot turnaround, Check minutes: placeholders.
- Where the Clarity Session happens (Zoom / office): the old site's 60-minute session said both; the new session's format is not decided. Not written.
- Founding year, client counts, years of the studio: no source.
- Names under three testimonial videos and the "Yifat" tile: to confirm.
- Shahar's Hebrew name spelling and portrait: to confirm / shoot.
- Consent wording, privacy policy, accessibility statement details: to write under Israeli law.
- English name of the free intake: "Spotlight Check" (A13 `term.check`) vs "Focused Check" (brief body, dossier `offers[0].label_en`).
