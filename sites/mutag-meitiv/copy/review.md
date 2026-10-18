# copy review — mutag-meitiv · he

Copyeditor 0.4.2 · station 4c · run 2026-10-il-brand-01 (inbound, live) · 2026-10-18 · **round 1**.
Reviewed: `sites/mutag-meitiv/copy/he.json` (humanizer 0.2.0) against `dossier/mutag-meitiv/dossier.json`,
`he.draft.json`, `sources.md`, `humanizer-notes.md`, `brief/mutag-meitiv/brief.md` (11–28),
`brief/mutag-meitiv/demo-case-study.he.md`, `dossier/mutag-meitiv/direction.md`, `industry/industry.md`, `industry/skeptic.md`,
`schemas/site-content.md` v0.11 (on disk: testimonials ≤ 1000 and copyBlocks ≤ 16 for `brand_practice`).

## Verdict: `copy_failed` (round 1)

Facts are clean: **0 `unsourced`, 0 `contradicted`** across 559 sentences (table below). The copy fails on
**completeness**: current-site content is still held out of the page although v0.11 now fits it, and two facts are
stated twice. Every fix goes back to the **copywriter**; none needs new wording from the humanizer beyond what the
copywriter's fix produces.

### Fix list (all must be done to pass)

| # | Owner | Field | What is wrong | Rests on |
|---|---|---|---|---|
| F1 | copywriter | `testimonials[]`, `mockup_extras.testimonials_over_cap` | The two long testimonials, **Renana Orlev** (736 chars, he) and **Linda Friedrich** (687 chars, en), are parked in `mockup_extras` and not on the site. v0.11 allows ≤ 1000 for `brand_practice`: they belong in `testimonials[]`, **verbatim and untrimmed** (Renana's unclosed opening ״ and Linda's "Concerts" included), `source: site`, `lang` as given, `author`/`role` as published (Linda has no role). Remove `testimonials_over_cap`. Also say in `sources.md` how the short **AMBARTIQUE@לינדה** quote (`testimonials[1]`, /personal101) and the long Linda quote (/newcourse) are handled: the same author with near-identical words ("I have a brand name I love and can really identify with" / "…and really can identify with"). Both are on the current site; if both stay, they must not sit side by side. Never merge or edit either one. | dossier `testimonials[3]`, `[4]` (+ note "same author"), `scope` (brief 17, 19), direction must-do 1, 11; schema v0.11 `testimonials[].quote` |
| F2 | copywriter | `copyBlocks[]` | `sources.md` drops current-site content "for the 8-row / 1500 cap": the founder's choir story on /podcastbestchapters ("no field; 1500 cap"), and gap 10 "copyBlocks cap of 8 is full". The cap is now 16 rows: re-check every paragraph left out for the copyBlocks cap and carry it over verbatim, or give a reason that is not the cap. | dossier `scope` ("keep ALL current content"), direction must-do 1 |
| F3 | copywriter | `copyBlocks[0].body` p2 · `method.intro` p1 | The same copywriter fact twice ("the two leading services run on one method"): intro p2 "שני התהליכים המרכזיים כאן הם… ושניהם נשענים על אותה שיטה." and method intro p1 "מיתוג אישי לעסק ותכנון אסטרטגי למותג עוברים באותה שיטה, בארבעה שלבים.". Both sit on the home page. Keep it in one place. | completeness: "No duplicate fact across two blocks"; schema "The method is described once" |
| F4 | copywriter | `method.intro` p2 · `services[strategic-planning].body` p10 | The client's BTC-canvas sentence appears twice: verbatim in strategic-planning p10 ("בתהליך המיתוג אנו נשתמש במתודולוגית הקנבסים…") and re-tensed in method intro p2 ("בתהליך אנו משתמשים…"). One home only. If it stays in `method.intro`, keep her words, not a rewrite (the tense change is not one of the edit kinds a–e in `sources.md`). | same as F3; scope: verbatim |
| F5 | copywriter | `sources.md` | Stale after v0.11: "two rows over the 600 cap", "`copyBlocks[]` (8, the cap)", gaps 6 and 10. Update it to the v0.11 caps and the new row counts. | schema v0.11 |

### Not blocking (record, decide, or pass on)

| # | Owner | Item |
|---|---|---|
| N1 | copywriter | `services[].audience` repeats a sentence that is also in the same row's `body` for strategic-planning (p4), community-meetups (p4), btc-professionals (p1) and business-to-brand (p1). Fine if the card shows `audience` and the page shows `body`. Tell the designer, or keep the sentence in only one of the two. |
| N2 | copywriter | `services[business-to-brand].status` is `ongoing`, but registration is closed (body p20, `offers[8].status`). v0.11 has no "closed" value. Say which one you mean, and flag the gap in the schema. |
| N3 | owner (via Shahar) | `team[4]` Lior: bio trimmed to fit the 600-char `team[].bio` cap, which v0.11 did not raise (sentence 3 dropped). Surname "ארסיני" in the heading vs "אורסיני יעיש" in the bio. |
| N4 | owner | strategic-planning p13 "מותג מיטיב, היא הנציגה של אירגון BRAND THE CHANGE בישראל." is the site's own wording, which the dossier marks *not confirmed by BTC* (`credentials[1]`). It is sourced, since it is her published claim. Ask her to confirm it (see R3). |
| N5 | owner | Client typos kept verbatim (`sources.md` list). No change is mine to make. |
| N6 | harvester | `posts[].body` is null in all 65 posts. `body` is required, so the blog cannot be seeded or built until the bodies are harvested. The gap is stated in `sources.md`, so it does not count against the copy, but it blocks the blog at build. |
| N7 | owner / critic | `legal.accessibilityStatement` has no conformance level for the new site (correctly dropped). The text must be added after the build's accessibility audit, before go-live (IS 5568). |
| N8 | Shahar | Demo `credits` "אסטרטגיה ומיתוג: מותג מיטיב · עיצוב: צוות מותג מיטיב" names the real business as the author of an invented project. It is honest only while the template's "דוגמה" label is visible. It is your text from `demo-case-study.he.md`, carried exactly, so it is not a copy fault. |

## Verbatim check (scope: the current site, made better, not rewritten)

I checked mechanically: every line of every string in `he.json` was searched, with whitespace and quote marks
normalised, in the dossier's strings and in `demo-case-study.he.md`. Everything not found is one of the 47
sentences listed in `sources.md` as an **EDIT**, plus the 11 `ctaText` lines. I read each of them against
its source:

- **Faithful:** all 8 dossier testimonials are byte-identical to `testimonials[].text`, double spaces and stray rafe marks included. `author`, `role` and `lang` match. Team names, roles and bios (except Lior, N3), the method stage texts, the service bodies, the about blocks, the podcast block, the 15 logo names, the award, the accessibility statement and all 65 post titles and dates match `blog.posts[]`. The 2026-08-22 title completion and the 2026-04-22 excerpt come from the home teaser in `pages[/]`, as stated.
- **Edits, all declared and within kinds a–e:** the qualified lead titles (b), the 3 → 4 stage lines (c), the dropped BTC reach figures and stale dates and venues (d), the WhatsApp lines (e), joins and splits (a), "מהקורס" → "מהסדנה" in THE BETTER 4 p6 (d, it is a workshop), and "לרכז" → "לרכזת" in the accessibility statement (d, matching the coordinator line). The one exception is the tense change in `method.intro` p2 (F4).
- **Draft → final:** I diffed the two files. They differ in the 16 string fields the humanizer lists, with no field added or removed. None of the 16 adds a fact. The questions in `ctaText` ("מתי…?", "יש מחזור קרוב?") assert nothing; `gaps[]` offers.*.date says no date is published.

## Demo case study (`caseStudies[0]`)

`demo: true`, `published: true`, slug `demo-shorashim`. Every field is exactly as in `brief/mutag-meitiv/demo-case-study.he.md` (16 sentences, verdict `demo`).
`client` and `quoteAuthor` both carry "(דוגמה)". The demo is never presented as real elsewhere: nothing else in the copy
names שורשים (the three other hits are the word "שורשים" inside the business-to-brand syllabus), no
field counts projects or case studies, and `awards[]` / `testimonials[]` do not refer to it. The schema puts the
"דוגמה" label, `noindex`, and the exclusion from structured data and llms.txt on the template; the critic should check them on the build. See N8 for the credits line.

## Voice audit

Most of the page is Hadas's own Hebrew and is judged as hers, not ours. The copywriter and humanizer lines:

| Section | Rhythm | No triads | No padding | Concrete | Honest limit | Owner's register | Reads aloud | Hebrew cadence | Note |
|---|---|---|---|---|---|---|---|---|---|
| closing, bookingLinks | ✓ | ✓ | ✓ | ✓ | – | ✓ (her "הכי זמינה בוואטסאפ") | ✓ | ✓ | singular "רוצה" next to plural elsewhere is her own mix (את.ה / רוצים) |
| copyBlocks (intro p2) | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | repeats method intro p1 (F3) |
| method.intro | ✓ | ✓ | ✓ | ✓ | – | ✓ | "עוברים באותה שיטה" is a little stiff, not a fail | ✓ | F3, F4 |
| services lead (p14, p5, p15) | ✓ | ✓ | ✓ | ✓ | ✓ ("שלב זה אינו חובה" in the method) | ✓ | ✓ | ✓ | – |
| services ctaText ×11 | ✓ varied | ✓ | ✓ | ✓ each names its offer | ✓ (asks for dates instead of assuming them) | ✓ | ✓ | ✓ | – |
| intro-workshop summary | ✓ | three items, but these are the offer's own three, not a decorative triad | ✓ | ✓ | – | ✓ | ✓ | ✓ | – |
| business-to-brand p20 | ✓ | ✓ | ✓ | ✓ | ✓ (registration closed) | ✓ | ✓ | ✓ | – |
| demo case study | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – |

Voice: **clean**, except for the repetition F3 and F4 cause.

## Completeness audit (`brand_practice`, direction must-do list)

| Must-do / required | Status |
|---|---|
| 1 keep all current content and offers | **not met**: F1, F2 (content held back by caps that v0.11 removed) |
| 5 nav labels name the services | titles "מיתוג אישי לעסק", "תכנון אסטרטגי למותג" ✓ |
| 6 WhatsApp primary, every service block has its own CTA | `contact.whatsapp` ✓; `ctaText` on all 11 `services[]` ✓; Calendly secondary ✓ |
| 10 lead services first, 9 secondary offers in 2 groups, content group | 2 `lead` + 6 `talks_workshops` + 3 `courses` ✓; podcast ✓; newsletter `url` null (owner item, so no block renders); blog bodies missing (N6) |
| 11 proof by the services: BTC credential, testimonials, logos, award | ✓ (but F1); the award is verified on brandawards.co.il |
| 12 accessibility statement page | ✓ text; conformance level pending (N7) |
| 13 Hebrew only; testimonials in their own language | `languages: ["he"]` ✓; `testimonials[].lang` en/he ✓, nothing translated |
| 15 demo case study, labelled | ✓ (`demo: true`) |
| Required fields (`businessName`, `languages`, `businessType`, `services[]` slug/group/title/summary, `team[]` name/role, `caseStudies[]` slug/client/title/challenge/outcome, `awards[]` label/issuer/year) | all filled ✓. `posts[].body` required, null (N6, stated) |
| Duplicates | F3, F4 (blocking); N1 (not blocking) |

## Research check

Rule 1: the copy makes no industry, market or competitor claim of its own. The few sentences that do are the
owner's published words, carried verbatim. I mark them `sourced` (as client facts on her own site) and list them
here as R6 and R7, so you can decide whether they stay. No sentence rests on the one KILLED claim (C-audience-09).

| # | Field | Suggested change (what, not the words) | Why | direction.md / claims |
|---|---|---|---|---|
| R1 | `services[strategic-planning].summary` or `.audience`, or `copyBlocks[3]` (talks) | Add one plain line for the **organisations** path, using the sector's own search words (amutot, "מיתוג לעמותות"; organisations booking a talk or a team workshop), built only from client facts: the award for ברטלי (an amuta), the municipalities, amutot and university in the logo strip, and the team trainings in the talks block. | Direction names this second audience, but no line in the copy speaks to it by name. | Audience bullet 3; C-audience-11, -12, -13 (WEAKENED / SURVIVES, narrowed) |
| R2 | `services[strategic-planning].summary`; page `<title>` / meta (SEO station) | Carry a business qualifier next to "תכנון אסטרטגי" (brand / business strategy) in the card line and the page head, so the term does not read as municipal planning. The title already has "למותג". | Bare "תכנון אסטרטגי" completes to the public sector. | Audience bullet 4; C-audience-03 (WEAKENED: completions only) |
| R3 | `credentials[0]`, `services[strategic-planning].body` p13 | Rest the credential on the **verified** fact: certified Brand the Change trainer, the only one listed for Israel on brandthechange.org. Ask the owner whether "הנציגה של BTC בישראל" (unconfirmed) is accurate before it stays as a claim. | This is the hardest proof the client has, and the copy uses the unverified version of it. | Positioning bullet 2; C-players-07, C-position-10 (SURVIVE) |
| R4 | `testimonials[]` placement (designer); possibly a schema field linking a testimonial to a service | Put the **outcome** testimonials next to the lead services: אנווה רצון (more clients, first on Google, her most profitable deal), Julia (values clarified), and Renana and Linda after F1. The copy's own benefit language is mostly purpose words. | Show what clients get, and who says so, rather than adjectives. | Positioning bullet 4, must-do 11; C-industry-09, -10 (WEAKENED) |
| R5 | `copyBlocks[4]` (courses) or the lead-service pages | Point to the existing free first steps (the Zoom intro call ✓ already in closing, bookingLinks and lead CTAs; the **free intro workshop**, `price: 0`, today only inside the talks group) as the low-commitment entry. | The audience is likely price-sensitive, and the client already offers free steps. | Audience bullet 2; C-audience-06, -10 (WEAKENED), C-position-02 |
| R6 | `copyBlocks[2]` p4 ("זהו עידן חדש…", "הדור החדש של הצרכנים… מונע מערכים") and `services[brands-of-change].summary` ("מגמה… מהפכה!") | Keep or soften: the owner decides. These are market claims in her words. No surviving claim backs them, and C-industry-09 (consumers now put "me" benefits above "help me do good") and C-industry-10 (60 % think green messaging is commercial) point the other way. Never reword her text without her. | These sentences are where a sceptical reader of a purpose brand stops. | Positioning bullet 4; C-industry-09, -10 |
| R7 | `legal.accessibilityStatement` p3 ("כ-20 אחוזים… עם מוגבלות") | The statistic is the owner's (the Wix template's) and no research claim covers it. Keep it only if she stands by it. Add the conformance line after the build is audited (N7). | Statement content is a legal duty in Israel. | must-do 12; C-sites-14 (WEAKENED) |
| R8 | `posts[]`, `newsletter.url` | The content group (podcast, blog, newsletter) is only partly fillable: no post bodies (N6) and no newsletter provider URL. Ask the owner and the harvester before the build. | Must-do 10 names the content group. | must-do 10; C-sites-19, C-position-11, -12 |

## Per-claim table (every sentence)

Verdicts: `sourced` 521 · `framing` 21 · `demo` 16 · `shared-context` 1 · **`unsourced` 0 · `contradicted` 0**.
Scope: every copy string in `he.json`, including `mockup_extras` text (headings, credits, the two held testimonials).
URLs, slugs, enums and numbers are left out; the numbers were checked against the dossier: prices 580 / 480 / 350 / 0 / 5200 / 3200 ILS, units and VAT as in `offers[].price_text`, award year 2022, phone +972546686808.
A dossier key `pages[<path>].text` is the client's own page text, verbatim. Where a sentence is on two pages (a Wix
duplicate), the table may name the duplicate.

| # | Sentence | Field | Dossier key | Verdict |
|---|---|---|---|---|
| 1 | מותג מיטיב | `businessName` | `business.name` | sourced |
| 2 | כאן מפתחים אסטרטגיות מותג עם משמעות. | `tagline` | `business.tagline` | sourced |
| 3 | רוצה להתחיל? | `closing` | `audit.recommended.closing_intent` (order only, not a fact); asserts nothing | framing |
| 4 | הכי זמינה בוואטסאפ. | `closing` | `booking.path_public` (/brandandbreakfast "הכי זמינה בוואטסאפ"), `booking.path` (brief 15) | sourced |
| 5 | אפשר גם לקבוע איתי שיחת הכרות בזום, ללא תשלום. | `closing` | `contact.scheduler`, `booking.engine_url` (free 30-min Zoom intro) | sourced |
| 6 | ״להתנהל מתוך משמעות, לפעול ליצירת רווחה לעסק, ללקוחותיי, לסביבה ולחברה״ | `featureLine` | `business.motto` | sourced |
| 7 | הי, הגעת למקום מיטיב! | `copyBlocks[0].heading` | `business.tagline.note` | sourced |
| 8 | ליווי ופיתוח אסטרטגי לעסקים עם משמעות. | `copyBlocks[0].body` | `business.tagline_alt[1]` | sourced |
| 9 | שני התהליכים המרכזיים כאן הם מיתוג אישי לעסק ותכנון אסטרטגי למותג, ושניהם נשענים על אותה שיטה. | `copyBlocks[0].body` | `services[].client_leading` (brief 12, origin client), `method.client` (brief 20) | sourced |
| 10 | כל סיפור טוב מתחיל מקונפליקט... | `copyBlocks[1].heading` | `pages[/about].text` | sourced |
| 11 | אז הנה הסיפור שלי | `copyBlocks[1].heading` | `pages[/about].text` | sourced |
| 12 | הכל התחיל אי שם בשלהי 2016 בריק שבין סיום 12 שנות שותפות עסקית בסטודיו למיתוג ועיצוב בצפון הישן של תל אביב, לדבר הלא-ידוע הבא. | `copyBlocks[1].body` | `pages[/about].text` | sourced |
| 13 | בניסיון להבין מי אני החדשה, חקרתי את השאלה: האם אפשר להקים עסק מצליח ולהיטיב או ״איך אפשר ללכת עם אהבה למכולת״? | `copyBlocks[1].body` | `pages[/copy-of-אודות].text` | sourced |
| 14 | לפני עשור חלמתי לקדם עולם שבו חשיבות הרווח הכלכלי מקבלת את מקומה אך אינה באה על חשבון ערכים נוספים החשובים לרווחת העסק והם: העובדים, הלקוחות, הסביבה ובעיקר נפש היזם.ת או בעל.ת העסק - שהוא הכי נשחק. | `copyBlocks[1].body` | `pages[/about].text` | sourced |
| 15 | תקופות כאלו, המאתגרות את הנפש, יש יתרון - הזדמנות לשינוי חשיבתי ותפיסתי. | `copyBlocks[1].body` | `pages[/copy-of-אודות].text` | sourced |
| 16 | את הפתגם הזה נהוג ליחס למספר אנשים חכמים - ״הדרך היחידה החוצה - היא פנימה״ וכך עשיתי. | `copyBlocks[1].body` | `pages[/about].text` | sourced |
| 17 | משם החל להתגבש החזון של ״עולם עסקים מיטיב״. | `copyBlocks[1].body` | `pages[/about].text` | sourced |
| 18 | רגע של אגו בריא | `copyBlocks[2].heading` | `pages[/copy-of-אודות].text` | sourced |
| 19 | בעולם העסקי שבו התפתחתי, היה נראה שזה לא יכול לעבוד ביחד- ״תעבדי למען כסף, תתרמי למען הנפש״ היה המוטו הקבוע ששמעתי, אבל האגו שלי סירב להרפות ויום אחד במהלך התקף חרדה דרמטי מיוחד הבנתי שאין מצב שאני חיה ב SPLIT הזה. | `copyBlocks[2].body` | `pages[/copy-of-אודות].text` | sourced |
| 20 | הבנתי שעלי לעבוד למען הרווחה הנפשית שלי ושעבודה למען הרווחה הנפשית שלי = עבודה למען הרווחה הנפשית של העולם. | `copyBlocks[2].body` | `pages[/copy-of-אודות].text` | sourced |
| 21 | יש המכנים את ההנעה הפנימית הזו גילוי המשמעות, כוונה או מטרה (purpose). | `copyBlocks[2].body` | `pages[/copy-of-אודות].text` | sourced |
| 22 | אני קוראת לזה - רגע של אגו בריא. | `copyBlocks[2].body` | `pages[/copy-of-אודות].text` | sourced |
| 23 | אנו יכולים לבחור להשתמש ביכולות העוצמתיות של כוח זה כדי לבנות עולם טוב ובריא יותר. | `copyBlocks[2].body` | `pages[/copy-of-אודות].text` | sourced |
| 24 | אחרי הכל, כולנו כבר יודעים מה אגו חולה יכול לעשות. | `copyBlocks[2].body` | `pages[/copy-of-אודות].text` | sourced |
| 25 | זהו עידן חדש שבה עסקים נדרשים לספק שקיפות אותנטית ואחריות אישית רבה יותר על פעולותיהם. | `copyBlocks[2].body` | `pages[/about].text` — owner's own claim about the market, verbatim; no surviving research claim backs it (Research check R6) | sourced |
| 26 | הדור החדש של הצרכנים ובעלי העסקים השתנה ומונע מערכים ומטרות שונות. | `copyBlocks[2].body` | `pages[/about].text` — owner's own claim, verbatim; C-industry-09 (WEAKENED) points the other way (Research check R6) | sourced |
| 27 | אני מאמינה שככל שהטכנולוגיה, הידע והאוטומציה יגברו כך אנחנו נשאף לחיות ולעבוד בסביבה מיטבית אשר מחברת פרנסה, משמעות והגשמה עצמית. | `copyBlocks[2].body` | `pages[/about].text` | sourced |
| 28 | תהליך העבודה בגישת המותג המיטיב מפתח אסטרטגיה המשלבת בין רווחת העסק לרווחה נפשית שלך, של לקוחותייך ושל הסביבה. | `copyBlocks[2].body` | `business.description` | sourced |
| 29 | הרצאות וסדנאות | `copyBlocks[3].heading` | direction must-do 10 group name (brief 19); not a fact | framing |
| 30 | הדרכות צוות והרצאות על מותגים שעושים אימפקט: כלכלי - חברתי - סביבתי, ואיך האירגון שלך יכול גם. | `copyBlocks[3].body` | `pages[/].text` home card (line breaks → commas) | sourced |
| 31 | ברוכים הבאות למגוון השתלמויות והדרכות לצוותים, יזמים.ות ואנשי מקצוע. | `copyBlocks[3].body` | `pages[/סדנאות-והרצאות].text` | sourced |
| 32 | צרו איתי קשר לכל שאלה. | `copyBlocks[3].body` | `pages[/סדנאות-והרצאות].text` | sourced |
| 33 | קורסים | `copyBlocks[4].heading` | direction must-do 10 group name (brief 19); home card was "קורסים וסדנאות" | framing |
| 34 | קורסים, ימי עיון ועוד - השתלמות והעשרה מקצועית להיטיב איתך, עם לקוחותיך ועם סביבתך. | `copyBlocks[4].body` | `pages[/].text` | sourced |
| 35 | WE ARE NEVER TOO SMALL TO MAKE AN IMPACT | `copyBlocks[4].body` | `pages[/סדנאות-והרצאות].text` | sourced |
| 36 | צוות עם משמעות | `copyBlocks[5].heading` | `team_section.heading` | sourced |
| 37 | תהליך פיתוח אסטרטגיה עם משמעות מבלי לדלג על שלב התוצרים והיציאה החוצה. | `copyBlocks[5].body` | `team_section.intro` | sourced |
| 38 | בשיתוף פעולה עם הטובות בתחום. | `copyBlocks[5].body` | `team_section.intro` | sourced |
| 39 | ON AIR — על א.נשים, עסקים ומשמעות | `copyBlocks[6].heading` | `podcast.home_block` lines 1–2 joined | sourced |
| 40 | איך להקים עסק מצליח שגם מיטיב עם העולם? | `copyBlocks[6].body` | `business.tagline_alt[3]` | sourced |
| 41 | פודקאסט מיטיב על א.נשים ועסקים שפועלים להטיב - אישית, כלכלית, סביבתית. | `copyBlocks[6].body` | `podcast.description` | sourced |
| 42 | ביום כדור הארץ 2022, הפודקאסט יצא לדרך. | `copyBlocks[6].body` | `pages[/podcastbestchapters].text` | sourced |
| 43 | המטרה: להעלות מודעות והשראה דרך ראיונות עם בעלי/ות עסקים מצליחים ומיטיבים המשלבים משמעות בחלק בילתי נפרד מהעשייה העסקית, מתוך מטרה לעודד ולהגביר את העשייה הזו בארץ. | `copyBlocks[6].body` | `pages[/podcastbestchapters].text` | sourced |
| 44 | נדבר על: חוקי העולם החדש, רווחה נפשית, יצירתיות, חדשנות מיטיבה, אימפקט והשפעה חברתית, סביבתית, מודלים כלכליים - חברתיים, סיפורים ומקרי בוחן של עסקים מיטיבים. | `copyBlocks[6].body` | `pages[/podcastbestchapters].text` | sourced |
| 45 | רוצים גם? | `copyBlocks[6].body` | `podcast.home_block` | sourced |
| 46 | צרו קשר | `copyBlocks[6].body` | `podcast.home_block` line 4 | sourced |
| 47 | פה יוצרים קשר | `copyBlocks[7].heading` | `menu[6]` | sourced |
| 48 | בין אם את.ה מותג מיטיב / פונה בנוגע לקורס או בא לך איזה Zoom Coffee שנכיר טוב יותר. | `copyBlocks[7].body` | `contact.contact_form` | sourced |
| 49 | בשמחה! | `copyBlocks[7].body` | `contact.contact_form` | sourced |
| 50 | שיחת הכרות בזום, ללא תשלום | `bookingLinks[0].label` | `contact.scheduler` note "שיחת הכרות בzoom (ללא תשלום)" | sourced |
| 51 | The strategic process with Hadas  helped me to clarify my values and to create a strong foundation for my brand. | `testimonials[0].quote` | `testimonials[0].text` | sourced |
| 52 | Julia Dojas - Heart of Hosting | `testimonials[0].author` | `testimonials[0].author` | sourced |
| 53 | zero waste events | `testimonials[0].role` | `testimonials[0].role` | sourced |
| 54 | I have a brand name I love and can really  identify with. | `testimonials[1].quote` | `testimonials[1].text` | sourced |
| 55 | I know my direction and my goals. | `testimonials[1].quote` | `testimonials[1].text` | sourced |
| 56 | I Got stronger in my decision to have a sustainable brand. | `testimonials[1].quote` | `testimonials[1].text` | sourced |
| 57 | AMBARTIQUE@לינדה | `testimonials[1].author` | `testimonials[1].author` | sourced |
| 58 | Sustainable living | `testimonials[1].role` | `testimonials[1].role` | sourced |
| 59 | אם יש תובנה אחת שלקחתי לחיים בעקבות התהליך עם הדס - זה שכשמתחילים משהו חדש לא תמיד צריך להרוס את הישן, אפשר גם וגם | `testimonials[2].quote` | `testimonials[2].text` | sourced |
| 60 | יובל אברהם - בונים לחיים | `testimonials[2].author` | `testimonials[2].author` | sourced |
| 61 | בנייה קלה | `testimonials[2].role` | `testimonials[2].role` | sourced |
| 62 | לפני שהתחלנו את העבודה, אמנם ידעתי מה הכיוון שלי, מה אני רוצה פחות או יותר, אבל לא ידעתי להגדיר את זה ומה אני בדיוק עושה. | `testimonials[3].quote` | `testimonials[5].text` | sourced |
| 63 | היו לי אז 4 לקוחות קבועים שעבדו איתי, חששתי שזה יקח ממני הרבה משאבי זמן ועבודה כדי לעבור את התהליך. | `testimonials[3].quote` | `testimonials[5].text` | sourced |
| 64 | בסיום התהליך איתך, הצלחתי להגדיר במשפט מה אני עושה ומה הערך המוסף שלי. | `testimonials[3].quote` | `testimonials[5].text` | sourced |
| 65 | הבנתי שאני המותג של עצמי ואני לא רוצה להיות חברה מנוכרת עם שם, אלא שהשם שלי יהיה השם של העסק. | `testimonials[3].quote` | `testimonials[5].text` | sourced |
| 66 | כיום יש לי מותג שאני גאה בו. | `testimonials[3].quote` | `testimonials[5].text` | sourced |
| 67 | מספר הלקוחות שלי עלה, אנשים מסתכלים לי על האתר כי הוא במקום הראשון בחיפוש בגוגל, ולאחרונה סגרתי את העסקה הרווחית ביותר שהייתה לי בעקבות האתר בשילוב הכרות מוקדמת. | `testimonials[3].quote` | `testimonials[5].text` | sourced |
| 68 | אנווה רצון | `testimonials[3].author` | `testimonials[5].author` | sourced |
| 69 | יועצת לניהול סיכונים ואחריות תאגידית. | `testimonials[3].role` | `testimonials[5].role` | sourced |
| 70 | הדס, כל-כך נהנתי היום והתחברתי לעצמי ואפילו שהנושאים לא קלילים השכשוך בהם הבוקר היה בכל זאת נעים ומלא בתקוה בזכות האוירה הנעימה והחמה, החיבור וכל הקסמים שאת יוצרת במרחב, עם עיניים טובות ומלאות חכמה. | `testimonials[4].quote` | `testimonials[6].text` | sourced |
| 71 | תודהֿֿ | `testimonials[4].quote` | `testimonials[6].text` (two stray rafe marks kept verbatim) | sourced |
| 72 | איה | `testimonials[4].author` | `testimonials[6].author` | sourced |
| 73 | Brand & Breakfast | `testimonials[4].role` | `offers[3].label` | sourced |
| 74 | בסדנה המפה שלי כללה תמונות צבעוניות של אוכל וציטוטים באותו נושא. | `testimonials[5].quote` | `testimonials[7].text` | sourced |
| 75 | את המפה הנחתי בחדר שינה, כך שחלפתי עליה לפחות פעם ביום. | `testimonials[5].quote` | `testimonials[7].text` | sourced |
| 76 | כיום, יכולה לומר שמפת החזון מתממשת לה. | `testimonials[5].quote` | `testimonials[7].text` | sourced |
| 77 | העזתי... | `testimonials[5].quote` | `testimonials[7].text` | sourced |
| 78 | ויחד עם שתי חברות התחלנו בישול לאירועים קטנים. | `testimonials[5].quote` | `testimonials[7].text` | sourced |
| 79 | אנחנו אוספות מחמאות ומשמחות אנשים! | `testimonials[5].quote` | `testimonials[7].text` | sourced |
| 80 | כיף🙂 | `testimonials[5].quote` | `testimonials[7].text` | sourced |
| 81 | קרן | `testimonials[5].author` | `testimonials[7].author` | sourced |
| 82 | Brand & Breakfast | `testimonials[5].role` | `offers[3].label` | sourced |
| 83 | מיתוג אישי לעסק | `services[personal-branding].title` | `services[0].card_text` | sourced |
| 84 | תהליכי ליווי ומיתוג אישי לעסקים. | `services[personal-branding].summary` | `services[0].card_text` | sourced |
| 85 | איך לגשר בין מהות למשמעות ולתרגם לאסטרטגית מיתוג. | `services[personal-branding].summary` | `services[0].card_text` | sourced |
| 86 | כבר כילדה עלו בי תהיות למדוע אנחנו כאן ומה עלי לעשות בעולם, אבל רק בעקבות משבר (בגיל בוגר יותר) הבנתי שאני כבר לא יכולה להתעלם ממה שחשוב לי, חברתית וסביבתית, ולהשאיר את הרצון כצליל רקע חלש. | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 87 | בעיני רוח התקופה קוראת לנו למימוש, אולי חווית האי נוחות הזו היא הזמנה שקוראת לעשייה עם משמעות דווקא בתוך מציאות כל כך קשה? | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 88 | איך עובד תהליך מיתוג אישי? | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 89 | ידוע שהדרך היא הרוח שמביאים היזמים/ות היא זו שמובילה את המותג קדימה ונותנת את הטון אשר ישפיע על התנהלות המותג, תרבות המותג וסוג לקוחותיו. | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 90 | תהליך מיתוג נכון וטוב צריך להיות מסוגל לגלות את הרוח הזו ולכן הוא תהליך אסטרטגי הדורש עבודת עומק ותכנון מבריק. | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 91 | בעסקים ויזמות חברתית ו/או וסביבתית, גילוי המהות נחוצה מאחר והתמריץ הוא הרי, מעבר לשורת הרווח. | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 92 | דרך תהליך מיתוג בליווי אישי, ניתן לראות ולתכנן בבהירות את הדרך ושלביה. | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 93 | בתהליך ניקח נשימה ונצלול אל העתיד, זאת כדי לזקק ולמצוא תשובה פשוטה ובהירה לשאלות האלו: | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 94 | מי אני? | `services[personal-branding].body` | `method.four_questions[0]` | sourced |
| 95 | מה אני עושה? | `services[personal-branding].body` | `method.four_questions[1]` | sourced |
| 96 | למי אני עושה? | `services[personal-branding].body` | `method.four_questions[2]` | sourced |
| 97 | ומדוע זה חשוב? | `services[personal-branding].body` | `method.four_questions[3]` | sourced |
| 98 | את התהליך אנו עושים בשילוב כלים שונים, נסיון עשיר ומתודה בשם BRAND THE CHANGE, מתודיקה בינלאומית למיפוי תהליכי אסטרטגיה לאירגונים ופרטיים אשר מובילים חשיבה מותגית אחרת רוצים להשתמש בעסק שלהם.ן ככח מיטיב. | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 99 | איך למצוא משמעות מחודשת בעסק דרך תהליך אסטרטגי מיטיב | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 100 | רגע לפני ה״איך״, מחשבה על ״למה״. | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 101 | אין ספק, שארועי אוקטובר והמצב המתמשך יוצרים טלטלה גדולה ברמה כזו שקשה שלא להיות מעורבים - חברתית, רגשית ופיזית. | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 102 | מאז תחילת המלחמה, פונים אלי, יותר מתמיד, א.נשים המחפשים לשלב משמעות ועשייה מיטיבה בעבודה. | `services[personal-branding].body` | `pages[/personal101].text` — owner's first-person report of her own enquiries (a frequency, sourced only to her own words) | sourced |
| 103 | דעתי האישית היא שלמי שיש את הקריאה, זה כנראה די תמיד היה שם.. | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 104 | אך המצב מעורר את זה. | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 105 | לעתים מדובר במצב שמעורר בחינה מחודשת של הבחירות שעשינו במהלך חיינו ועכשיו הגיע זמן שבו אי אפשר יותר לדחות את השינוי. | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 106 | שאלות כמו: כיצד אוכל לשלב בין עשייה למען בכלל והסביבה בקריירה? | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 107 | כיצד העסק שלי יכול להפוך למיטיב יותר? | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 108 | אילו מודלים עסקיים אוכל ליישם בכדי להשתדרג לעסק שרואה כנגד עיניו את הטוב הכללי? | `services[personal-branding].body` | `pages[/personal101].text` | sourced |
| 109 | התהליך עובר דרך ארבעת שלבי השיטה: SENSING, THINKING, MAKING ו-INFLUENCING. | `services[personal-branding].body` | `method.client` (brief 20) + `method.value.duration` | sourced |
| 110 | השלב הראשון והשני לוקחים כ 10 - 15 מפגשים. | `services[personal-branding].body` | `services[0].duration` | sourced |
| 111 | לאחר מכן, השלבים הבאים תלויים בתשתית הקיימת ובמקום שבו העסק נמצא (אינדיבידואלי בהתאם לתשתית והמטרות). | `services[personal-branding].body` | `method.duration` | sourced |
| 112 | ניתן לקבוע איתי שיחת הכרות בzoom (ללא תשלום). | `services[personal-branding].body` | `contact.scheduler.note` | sourced |
| 113 | ״עלינו להגדיר מחדש הצלחה כלכלית כדי לתכלל גדילה חברתית ואקולוגית, לא רק עושר פיננסי. | `services[personal-branding].body` | `quotes_on_site[0]` | sourced |
| 114 | הכלכלה צריכה להיות אמצעי להשגת מטרה ולא מטרה בפני עצמה.״ | `services[personal-branding].body` | `quotes_on_site[0]` | sourced |
| 115 | קייט ראווטת׳ - כלכלנית, מפתחת ״כלכלת הדונאט״ | `services[personal-branding].body` | `quotes_on_site[0]` | sourced |
| 116 | ליווי אישי 1:1 | `services[personal-branding].format` | `services[0].format` | sourced |
| 117 | לבעלי עסקים המחברים משמעות למשימת היזמות והעסק שלהם | `services[personal-branding].audience` | `team[0].bio` | sourced |
| 118 | היי הדס, הגעתי מהאתר. | `services[personal-branding].ctaText` | `contact.whatsapp`; prefilled message, asserts nothing | framing |
| 119 | אשמח לשמוע איך עובד אצלך תהליך מיתוג אישי לעסק. | `services[personal-branding].ctaText` | `services[0]` (offer named) | framing |
| 120 | תכנון אסטרטגי למותג | `services[strategic-planning].title` | `services[1].name` qualified per direction (C-audience-03) | sourced |
| 121 | מיתוג חדש או ריברנד - לבנות אירגון מצליח שגם מיטיב עם העולם דרך תכנון אסטרטגיית מותג מיטיב. | `services[strategic-planning].summary` | `services[1].card_text` | sourced |
| 122 | עולם עסקי מיטיב | `services[strategic-planning].body` | `pages[/copy-of-אודות].text` | sourced |
| 123 | התקיעות במיתוג ובאסטרטגיה יכולה להרגיש כמו מבוך שאין ממנו מוצא. | `services[strategic-planning].body` | `pages[/process].text` | sourced |
| 124 | לפעמים דרוש רק מבט חיצוני, שיטה הוליסטית, וקול מכוון כדי לראות את מה שהיה מולנו כל הזמן. | `services[strategic-planning].body` | `pages[/process].text` | sourced |
| 125 | מותג מיטיב היא גישה אסטרטגית מהפכנית שנועדה להוציא לפועל יוזמות בעלות משמעות אמיתית וערך מתמשך. | `services[strategic-planning].body` | `pages[/process].text` | sourced |
| 126 | המתודולוגיה הייחודית עובדת בשלבים ומשלבת תהליך עומק הוליסטי המייצר חוויה אישית וקבוצתית באירגון - מפגישות אינטימיות אמיתיות, דרך סדנאות מעצימות, ועד עבודה מעשית עם ארגז כלים שפותח במיוחד עבור אנשי שינוי וארגונים שחשובה להם המשמעות מעבר לשורת הרוות (purpose driven) בין אם להשפעה סביבתית, חברתית או פנים-ארגונית. | `services[strategic-planning].body` | `pages[/process].text` | sourced |
| 127 | התהליך כולל ארבעה שלבים: SENSING, THINKING, MAKING ו-INFLUENCING. | `services[strategic-planning].body` | `method.client` (brief 20; replaces the page's 3-stage line) | sourced |
| 128 | לפתוח את הראש, לקחת נשימה ולצלול אל העתיד שלכם. | `services[strategic-planning].body` | `pages[/process].text` | sourced |
| 129 | כלי העבודה | `services[strategic-planning].body` | `offers[7].includes` | sourced |
| 130 | ההבדל בין מותג רגיל למותג מיטיב אינו רק בתוצאה - אלא בדרך, בערכים ובהשפעה המתמשכת והמקיימת שהוא מייצר. | `services[strategic-planning].body` | `pages[/process].text` | sourced |
| 131 | כדי להוביל מותג עם משמעות המשלב רווח כלכלי עם רווחה חברתית ו/או סביבתית נשתמש בתהליך העבודה במספר כלים אותם רכשנו במהלך 20 שנות אסטרטגיה, עיצוב ומיתוג עסקים. | `services[strategic-planning].body` | `pages[/process].text` | sourced |
| 132 | בתהליך המיתוג אנו נשתמש במתודולוגית הקנבסים של BRAND THE CHANGE, מתורגמים לעברית. | `services[strategic-planning].body` | `pages[/process].text` | sourced |
| 133 | Brand The Change הוא ארגון חינוכי במימון עצמאי שנבנה על ידי קהילת ממתגים ואנשי/נשות אסטרטגיה בינלאומיים הבוחרים ללוות, לתכנן ולבנות מותגים שהם מנועי השפעה (Purpose Driven). | `services[strategic-planning].body` | `pages[/process].text` | sourced |
| 134 | האירגון הוקם על ידי אן מילטנברג ממתגת ותיקה שעבדה בחברת אינטרברנד העולמית ויצאה לדרך עצמאית עם מתודה המותאמת ליזמים.ות ואירגונים מבוססי השפעה. | `services[strategic-planning].body` | `pages[/process].text` | sourced |
| 135 | המתודה מובלת על ידי קהילה ענפה של אנשי אסטרטגיה ומיתוג פורצי דרך. | `services[strategic-planning].body` | `pages[/process].text` (BTC reach figures removed, `gaps[]` btc_reach_claims) | sourced |
| 136 | מותג מיטיב, היא הנציגה של אירגון BRAND THE CHANGE בישראל. | `services[strategic-planning].body` | `credentials[1]` — the site's own wording, NOT confirmed by BTC (dossier note); the verified fact is C-players-07 / C-position-10 (R3) | sourced |
| 137 | "Finding your own identity is the key to your brand identity" | `services[strategic-planning].body` | `quotes_on_site[2]` | sourced |
| 138 | Brand for the better | `services[strategic-planning].body` | `quotes_on_site[2]` | sourced |
| 139 | אנשי שינוי וארגונים שחשובה להם המשמעות מעבר לשורת הרוות (purpose driven) בין אם להשפעה סביבתית, חברתית או פנים-ארגונית | `services[strategic-planning].audience` | `services[1].audience` | sourced |
| 140 | היי הדס, הגעתי מהאתר. | `services[strategic-planning].ctaText` | `contact.whatsapp` | framing |
| 141 | מעניין אותי תכנון אסטרטגי למותג, אפשר לשמוע פרטים? | `services[strategic-planning].ctaText` | `services[1]` | framing |
| 142 | הרצאת הדגל — BRANDS OF CHANGE | `services[brands-of-change].title` | `offers[0].label` | sourced |
| 143 | בשנים האחרונות בעולם מתפתחת מגמה חדשה של מותגים חברתיים וסביבתיים עסקיים. | `services[brands-of-change].summary` | `offers[0].text` — owner's own claim (talk description), verbatim; no surviving claim backs it (R6) | sourced |
| 144 | מגמה שהיא כבר לא טרנד - אלא מהפכה! | `services[brands-of-change].summary` | `offers[0].text` — owner's own claim, verbatim (R6) | sourced |
| 145 | מדובר מותגים בעלי מטרה מיטיבה המשלבת מודל עסקי כלכלי. | `services[brands-of-change].body` | `offers[0].text` | sourced |
| 146 | בהרצאתי אציג את הטרנדים בעולם ניתוחי מקרה ודוגמאות של מותגים מצליחים שעושים זאת בעולם ובארץ. | `services[brands-of-change].body` | `offers[0].text` | sourced |
| 147 | הרצאה בהזמנה | `services[brands-of-change].format` | `offers[0].format` | sourced |
| 148 | למי שרוצה להכיר את מבשרי השחר של העתיד. | `services[brands-of-change].audience` | `offers[0].audience` | sourced |
| 149 | היי הדס, אשמח לפרטים על הזמנת ההרצאה BRANDS OF CHANGE. | `services[brands-of-change].ctaText` | `offers[0]` (offer named), `contact.whatsapp` | framing |
| 150 | ריטריט יום — לחשוב כמו מותג (מיטיב) | `services[therapists-retreat].title` | `offers[1].label` | sourced |
| 151 | הדרכה ייעודית לאנשי.ות צוות בתחום הטיפול | `services[therapists-retreat].summary` | `offers[1].subtitle` | sourced |
| 152 | העולם זקוק להחלמה יותר ממלחמה ולכן אני רואה צורך חשוב בחיזוק הצד האסטרטגי והמותגי בקרב אנשי ונשות טיפול. | `services[therapists-retreat].body` | `offers[1].text` | sourced |
| 153 | ישנם דרכים שונות וסוגי טיפול מגוונים ולכן יש צורך גם עבור המטפל וגם עבור המטופל להגדיר בדיוק את האיכויות, סל הכלים וקהל היעד המתאים. | `services[therapists-retreat].body` | `offers[1].text` | sourced |
| 154 | בסדנת המיתוג תחשפו לאיך חושב מותג ותצאו מהסדנה עם הבנת התהליך ואיך תוכלו לעשות זאת בעצמכם בבית או ביחד. | `services[therapists-retreat].body` | `offers[1].text` | sourced |
| 155 | ריטריט יום: 09:00-14:00 | `services[therapists-retreat].format` | `offers[1].schedule` | sourced |
| 156 | לאלו אשר רוצים לעשות שינוי בעולם דרך טיפול. | `services[therapists-retreat].audience` | `offers[1].text` | sourced |
| 157 | היי הדס, ראיתי באתר את ריטריט היום ״לחשוב כמו מותג (מיטיב)״ ואשמח לשמוע עוד. | `services[therapists-retreat].ctaText` | `offers[1]` (label verbatim) | framing |
| 158 | THE BETTER 4 — Map your vision workshop — סדנת חזון לפורצי דרך | `services[the-better-4].title` | `offers[2].label` | sourced |
| 159 | ״ארבעת המיטיבים״ (The Better 4) היא מתודולוגיה להכנת מפת חזון לפי גישת ״מותג מיטיב״. | `services[the-better-4].summary` | `pages[/smst].text` | sourced |
| 160 | be the brand you want to see in the world | `services[the-better-4].body` | `pages[/smst].text` | sourced |
| 161 | האני מאמין של גישת המותג המיטיב נעוץ בחוק טבע בשם הומאוסטאזיס ופירושו מלטינית ״שאיפה לאיזון״, בכל רגע נתון הגוף שלנו (הפנים) מושפע מהחוץ (הסביבה) ועושה כל מה שבאפשרותו כדי להגיע לאיזון. | `services[the-better-4].body` | `pages[/smst].text` | sourced |
| 162 | ברמה הביולוגית, קל לראות את זה (למשל מקלחת קרה - מוציאה חום מהגוף, עמידה על רגל אחת דורשת תנועה חזרה למרכז כדי לשמור על שיווי משקל). | `services[the-better-4].body` | `pages[/smst].text` | sourced |
| 163 | בתקופה כזו אינטנסיבית, ברמה הנפשית זה גם קורה, אבל קשה לעקוב אחרי זה. | `services[the-better-4].body` | `pages[/smst].text` | sourced |
| 164 | הרווחה הנפשית שלנו נעלמת ואנחנו בקלות יוצאים.ות מאיזון. | `services[the-better-4].body` | `pages[/smst].text` | sourced |
| 165 | כשהאיזון מופר, זה משפיע על הכל ולכן יש צורך באיזון הרווחה הנפשית, כדי להוביל גם את הרווחה העסקית. | `services[the-better-4].body` | `pages[/smst].text` | sourced |
| 166 | הסדנה נותנת דרור לחלומות, רגשות, מאווים וצרכים ומסייעת לתת מודע להעלות למודע את הדרך. | `services[the-better-4].body` | `pages[/smst].text` | sourced |
| 167 | מה תקבלו מהסדנה: | `services[the-better-4].body` | `pages[/סדנאות-והרצאות]` "מה תקבלו מהקורס:" (מהקורס → מהסדנה, it is a workshop) | framing |
| 168 | חיזוק ה well being הנפשי והעסקי | `services[the-better-4].body` | `offers[2].includes` | sourced |
| 169 | להפוך לחלק מהקהילה של פורצי דרך מיטיבה | `services[the-better-4].body` | `offers[2].includes` | sourced |
| 170 | עם מה אצא מהסדנה? | `services[the-better-4].body` | `pages[/smst].text` | sourced |
| 171 | איחוד כוונות ראש-רגש - מבנה הסדנה מאפשר לספק מענה לרצונות שלך במגוון שפות הגוף - שפת הראש (מנטלי), שפת הנפש, שפת הרוח, שפת הצבע ושפת הצורה. | `services[the-better-4].body` | `pages[/smst].text` | sourced |
| 172 | מפת דרכים לקחת הביתה - מצפן אינדיבידואלי שרק התת מודע שלך מבין. | `services[the-better-4].body` | `pages[/smst].text` | sourced |
| 173 | זמן עם עצמי - בראש הכל מתוכנן, במציאות לא תמיד אנו מוצאים את הזמן והריכוז להוריד לקרקע. | `services[the-better-4].body` | `pages[/smst].text` | sourced |
| 174 | למי שבשלב התחלתי של כיוון מקצועי ורוצה לעשות טוב בעולם אבל לא יודע.ת איך | `services[the-better-4].audience` | `offers[2].audience` | sourced |
| 175 | היי הדס, אשמח לשמוע על סדנת החזון THE BETTER 4. | `services[the-better-4].ctaText` | `offers[2]`; the date question asserts nothing (`gaps[]` offers.*.date) | framing |
| 176 | מתי היא מתקיימת? | `services[the-better-4].ctaText` | `offers[2]`; the date question asserts nothing (`gaps[]` offers.*.date) | framing |
| 177 | Brand & Breakfast | `services[brand-and-breakfast].title` | `offers[3].label` | sourced |
| 178 | 7 בעלי.ות עסקים יושבים בארוחת בוקר, עושים brand-storming ויוצאים עם מפת חזון אישי/עסקי להטמעת התובנות. | `services[brand-and-breakfast].summary` | `pages[/brandandbreakfast].text` | sourced |
| 179 | המצב שינה את כולנו. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 180 | המציאות שבחוץ, חוסר הוודאות והעומס הנפשי המתמשך, הופכים את ניהול העסק והקריירה למשימה שדורשת מאיתנו הרבה יותר מחוסן – היא מצריכה מאיתנו עוגן. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 181 | המוח רץ בחיפוש אחר פתרונות לשאלות מהותיות ולגיטימיות על העתיד, אבל מרוב רעיונות ורצונות– נוצר עומס. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 182 | הכל נשאר "למעלה", בראש, וקשה לדעת במה להתמקד קודם. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 183 | Brand & Breakfast היא סדנת בוקר אינטימית (עד 7 משתתפים/ות) בת 3 שעות שמטרתה לחבר בין הרווח של העסק לרווחה של הנפש שלך. | `services[brand-and-breakfast].body` | `offers[3].text` | sourced |
| 184 | הסדנה מחולקת לשני חלקים שמשלימים זה את זה: | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 185 | חלק א': מיקוד. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 186 | נפנה מקום בתוך העומס כדי לזהות את מוקדי הצמיחה שלך לשנה הקרובה. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 187 | אילו נושאים מבקשים להתפתח בחייך? | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 188 | איפה הלב שלך מבקש להשאיר חותם? | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 189 | נזקק את הערכים שיובילו אותך לשינוי המיוחל מתוך קשב פנימי עמוק. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 190 | חלק ב': מפת חזון (במתודת "מותג מיטיב"). | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 191 | נעבור ממיקוד לפיזור - דרך הידיים. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 192 | בדרך יצירתית ומובנית, ניצור מפת חזון פיזי ומוחשי - זוהי מפת הדרכים שלך. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 193 | המתודה משלבת 4 חדרים: | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 194 | האישי (מי אני?) | `services[brand-and-breakfast].body` | `instagram.posts[2].caption` | sourced |
| 195 | העסקי (מה אני עושה השנה?) | `services[brand-and-breakfast].body` | `instagram.posts[2].caption` | sourced |
| 196 | האיכותני (איך אני רוצה להרגיש?) | `services[brand-and-breakfast].body` | `instagram.posts[2].caption` | sourced |
| 197 | והכמותי (מה היעדים הנמדדים שלי?) | `services[brand-and-breakfast].body` | `instagram.posts[2].caption` | sourced |
| 198 | התהליך הוא מודרך וחופשי כאחד, נותן דרור לחלומות, רגשות ומאווים ומסייע, דרך יצירת מפה ויזואלית, להוריד את ׳תוכנית העבודה׳ ולאפשר דרך לרווחה נפשית ועסקית כאחד. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 199 | זה בשבילך אם: | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 200 | את.ה רוצה לקחת רגע לתכנון יצירתי | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 201 | את.ה סומכת על כוחך להשפיע על המציאות | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 202 | את.ה חושב.ת שחשיבה משותפת יכולה להטיב לעשייה העסקית שלך. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 203 | עם מה אצא מהסדנה? | `services[brand-and-breakfast].body` | `pages[/smst].text` | sourced |
| 204 | את תצאי עם מפת חזון ביד, אבל בעיקר עם תחושה של סדר פנימי ושקט. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 205 | המחשבות שהתרוצצו בראש יקבלו "בית", והדרך לשנה הקרובה תהיה פרושה לפנייך – בהירה, אפשרית ומלאה באופטימיות. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 206 | הסדנה כוללת ארוחת בוקר וחומרי עבודה. | `services[brand-and-breakfast].body` | `offers[3].includes` | sourced |
| 207 | ניתן לשלם בביט, PayBox או מזומן. | `services[brand-and-breakfast].body` | `booking.payment.note` | sourced |
| 208 | קבלה תישלח לאחר תשלום. | `services[brand-and-breakfast].body` | `pages[/brandandbreakfast].text` | sourced |
| 209 | סדנת בוקר בת 3 שעות, עד 7 משתתפים/ות | `services[brand-and-breakfast].format` | `offers[3].capacity`, `offers[3].text` ("סדנת בוקר … בת 3 שעות") | sourced |
| 210 | לבעלות עסקים מנוסות שמבינות שצמיחה עסקית (רווח) חייבת להישען על יציבות נפשית (רווחה). | `services[brand-and-breakfast].audience` | `pages[/brandandbreakfast].text` | sourced |
| 211 | היי הדס, מתי סדנת ה-Brand & Breakfast הבאה? | `services[brand-and-breakfast].ctaText` | `offers[3]`; question only | framing |
| 212 | אשמח לפרטים. | `services[brand-and-breakfast].ctaText` | `offers[3]`; question only | framing |
| 213 | סדנת הכרות — בואו להכיר מתודיקה בינלאומית | `services[intro-workshop].title` | `offers[4].label` | sourced |
| 214 | נכיר את מודל החשיבה המיתוגי של brand the change, נעבור על 2 כלי מיפוי לאסטרטגיית מיתוג (קנבס 1 ו-2) ונסתכל יחד על מקרי בוחן. | `services[intro-workshop].summary` | `offers[4].includes` (three items, same content) | sourced |
| 215 | לפורצי דרך, משבשי מערכות, מובלי שינוי מיטיב | `services[intro-workshop].audience` | `offers[4].audience` | sourced |
| 216 | היי הדס, אשמח להירשם לסדנת ההכרות. | `services[intro-workshop].ctaText` | `offers[4]`; question only | framing |
| 217 | מתי הסדנה הבאה? | `services[intro-workshop].ctaText` | `offers[4]`; question only | framing |
| 218 | מפגשי קהילה — קהילת ״עסקים ומיטיבים״ | `services[community-meetups].title` | `offers[5].label` | sourced |
| 219 | משמעות ורווח לא צריכות לבוא אחת על חשבון השניה, הן אפילו ממנפות זו את זו. | `services[community-meetups].summary` | `offers[5].text` | sourced |
| 220 | הקהילה הזו נוסדה מתוך ההבנה הזו :-) | `services[community-meetups].summary` | `offers[5].text` | sourced |
| 221 | קהילת ״עסקים ומיטיבים״ יוצאת לדרך !!! | `services[community-meetups].body` | `offers[5].text` | sourced |
| 222 | הצטרפו למערכת חיבורים עסקיים וחברתיים קהילתית, אישית, כלכלית, סביבתית. | `services[community-meetups].body` | `offers[5].text` | sourced |
| 223 | אז רגע על הרעיון: מטרת הקהילה היא להיות קהילה לומדת ומלמדת ולבנות מנוע עוצמתי הבונה חוסן עסקי וערכי דרך מטרות וערכים משותפים אהבת הסביבה, הטבע והאדם.ה) | `services[community-meetups].body` | `offers[5].text` (heading line joined to its sentence) | sourced |
| 224 | למי מיועד המפגש: | `services[community-meetups].body` | `pages[/סדנאות-והרצאות].text` | sourced |
| 225 | לא.נשים עם לב פתוח ורצון לחבר משמעות למשימת היזמות/העסק שלהם.ן | `services[community-meetups].body` | `offers[5].audience` | sourced |
| 226 | בעלי.ות עסקים שמרגישים קריאה חזקה לעבוד בעסק שמיטיב - איתם, עם לקוחותיהם ועם הסביבה - החברתית או האקולוגית המחפשים מקום עסקי תומך. | `services[community-meetups].body` | `offers[5].audience` | sourced |
| 227 | למי שמתחבר למטרה משותפת - ורוצה לקחת חלק בקהילת עסקים מיטיבים מקומית | `services[community-meetups].body` | `offers[5].audience` | sourced |
| 228 | למי שמחפש.ת סביבה תומכת לתרגל העצמה, השראה ושיתוף נתינה וקבלה. | `services[community-meetups].body` | `offers[5].audience` | sourced |
| 229 | לא.נשים עם לב פתוח ורצון לחבר משמעות למשימת היזמות/העסק שלהם.ן | `services[community-meetups].audience` | `offers[5].audience` | sourced |
| 230 | היי הדס, ספרי לי עוד על מפגשי הקהילה ״עסקים ומיטיבים״. | `services[community-meetups].ctaText` | `offers[5]` | framing |
| 231 | השתלמות מקצועית לאנשי מקצוע | `services[btc-professionals].title` | `offers[6].label` | sourced |
| 232 | הכירו את מתודיקת העתיד לפיתוח אסטרטגיה למותגי אימפקט! | `services[btc-professionals].summary` | `offers[6].label` | sourced |
| 233 | למי מיועד הקורס: | `services[btc-professionals].body` | `offers[1].text` | sourced |
| 234 | אנשי מקצוע מתחום הקריאייטיב, שיווק, מוצר ואסטרטגיה המעוניינים להעשיר את הידע המקצועי שלהם ולעשות את הצעדים הראשונים שלהם כמובילי אסטרטגיה לעסקים חברתיים וסביבתיים ומיזמי אימפקט. | `services[btc-professionals].body` | `offers[6].audience` | sourced |
| 235 | מה תקבלו מהקורס: | `services[btc-professionals].body` | `pages[/סדנאות-והרצאות].text` | sourced |
| 236 | מהי אסטרטגיית מותג מיטיב - סדר והבנה של התהליך ואיך לבנות אותו נכון. | `services[btc-professionals].body` | `offers[6].includes` | sourced |
| 237 | לדעת, להבין וליישם בקלות אסטרטגיית מותג, בעזרת קנבס המותג של BTC. | `services[btc-professionals].body` | `offers[6].includes` | sourced |
| 238 | תצאו עם מגוון כלים יומיומיים וידע שתוכלו ליישם בעסק שלכם. | `services[btc-professionals].body` | `offers[6].includes` | sourced |
| 239 | תירגול ויצירת מקרה בוחן של מותג מיטיב במתודיקה BTC. | `services[btc-professionals].body` | `offers[6].includes` | sourced |
| 240 | הבנה כיצד להנחות סדנת חזון מיטיב משלך, online או onlife. | `services[btc-professionals].body` | `offers[6].includes` | sourced |
| 241 | הכרות עם מודלים עסקיים - מיטיבים. | `services[btc-professionals].body` | `offers[6].includes` | sourced |
| 242 | מסיימי הקורס יקבלו תעודת השתלמות מבית ״מותג מיטיב״. | `services[btc-professionals].body` | `offers[6].includes` | sourced |
| 243 | הצטרפות לקהילה מקצועית ובינלאומית. | `services[btc-professionals].body` | `offers[6].includes` | sourced |
| 244 | אנשי מקצוע מתחום הקריאייטיב, שיווק, מוצר ואסטרטגיה | `services[btc-professionals].audience` | `offers[6].audience` | sourced |
| 245 | היי הדס, אשמח לפרטים על ההשתלמות בשיטת Brand the Change. | `services[btc-professionals].ctaText` | `offers[6]`; question only | framing |
| 246 | מתי נפתח המחזור הבא? | `services[btc-professionals].ctaText` | `offers[6]`; question only | framing |
| 247 | הקורס למובילי שינוי | `services[change-leaders-course].title` | `offers[7].label` | sourced |
| 248 | תהליך עומק שיקח אותך מבפנים החוצה, לפיתוח אסטרטגיית המותג שלך. | `services[change-leaders-course].summary` | `offers[7].includes` | sourced |
| 249 | קהילה לומדת, הוצאה מוכרת! | `services[change-leaders-course].body` | `offers[7].subtitle` | sourced |
| 250 | מה תקבלו מהקורס: | `services[change-leaders-course].body` | `pages[/סדנאות-והרצאות].text` | sourced |
| 251 | הכרות עם עולם האימפקט והשינוי דרך מקרי בוחן מעוררי השראה. | `services[change-leaders-course].body` | `offers[7].includes` | sourced |
| 252 | תירגול כלי העבודה של מתודה המותאמת למי שרוצה להעזר בעסק ככלי השפעה מיטיב. | `services[change-leaders-course].body` | `offers[7].includes` | sourced |
| 253 | קבלת ארגז כלים ל״יום שאחרי״. | `services[change-leaders-course].body` | `offers[7].includes` | sourced |
| 254 | להיות חלק מקהילה לומדת ומתפתחת של עסקים חברתיים. | `services[change-leaders-course].body` | `offers[7].includes` | sourced |
| 255 | בסוף הקורס תציגו את אסטרטגיית המותג ואת הכיוון לתוכנית הפעולה. | `services[change-leaders-course].body` | `offers[7].includes` | sourced |
| 256 | השתלמות מקצועית בת 8 מפגשים | `services[change-leaders-course].format` | `offers[7].label` | sourced |
| 257 | בעלי עסקים, יזמיות, אנשי רוח וחזון שהם העסק שלהם | `services[change-leaders-course].audience` | `offers[7].audience` | sourced |
| 258 | היי הדס, אני רוצה לשמוע על הקורס למובילי שינוי. | `services[change-leaders-course].ctaText` | `offers[7]`; question only | framing |
| 259 | יש מחזור קרוב? | `services[change-leaders-course].ctaText` | `offers[7]`; question only | framing |
| 260 | מעסק למותג מיטיב | `services[business-to-brand].title` | `offers[8].label.note` | sourced |
| 261 | קורס אסטרטגיה אישי מיטיב לעסק שלך | `services[business-to-brand].summary` | `offers[8].label` | sourced |
| 262 | למי מיועד הקורס? | `services[business-to-brand].body` | `offers[1].text` | sourced |
| 263 | עסקים שרוצים להטיב עם העסק, עם לקוחותיהם ועם הסביבה, המחפשים תהליך אסטרטגי מעמיק ואמתי. | `services[business-to-brand].body` | `offers[8].audience` | sourced |
| 264 | עסקים חברתיים שרוצים להסביר בפשטות את העשייה המשמעותית שהם כבר עושים. | `services[business-to-brand].body` | `offers[8].audience` | sourced |
| 265 | עסקים שרוצים לעשות אסטרטגיה מחדש בגישת מותג מיטיב. | `services[business-to-brand].body` | `offers[8].audience` | sourced |
| 266 | למה זה חשוב? | `services[business-to-brand].body` | `offers[8].syllabus[7]` | sourced |
| 267 | רובינו ״נזכה״ להכיר עסק או מותג דרך התוצרים החיצוניים שלו: לוגו, אתר, צבעים, אריזה וכו׳, אך אלו רק הפירות, יש חלק עצום שאינו נראה כלפי חוץ - החלק הזה הוא השורש, המקור והבסיס של כל עסק. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 268 | כדי להבין לאן לצמוח עלינו להתחיל מהשורש.. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 269 | כך נבנית אסטרטגית המותג. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 270 | מבלי להתייחס ברצינות לחלק של השורשים שנמצא מתחת לאדמה, אי אפשר לבנות מותג שבאמת מרגיש נכון ואותנטי, עם בידול וסיפור ייחודי, שמושך את הלקוחות המדוייקים. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 271 | בקורס ״מעסק למותג מיטיב״ נרד לעומק השורש, ונזין אותו כדי שיתפתח עם כיוון ברור לעתיד. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 272 | או בשפת המיתוג - נבין לעומק מי אתם, מה אתם עושים, מי הקהל שלכם ומדוע מה שאתם עוסקים בו כל כך חשוב? | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 273 | בעקבות הקורס: | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 274 | יהיה לכם את הבסיס לבנות מערך שיווק ומכירות שמצד אחד מאד אותנטי, ומהצד השני ממיר פניות רלוונטיות ללקוחות מצויינים. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 275 | בעקבות הבנה מעמיקה של החזון, הסיפור והערכים שלכם, יהיה לכם הרבה יותר קל לבנות תוכן שיווקי. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 276 | תצאו עם מסמך מפורט וממוקד של המותג המתאר בדיוק מי אתם (חוסך זמן של הסברים, טעויות של חוסר הבנה) כך שיהיה קל לכל מי שיעבוד איתך בעתיד - ולהיות בטוחים שתקבלו חזרה זהות גרפית מדויקת ב- 100% למי שאתם. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 277 | תבינו מהי הבשורה שאתם מביאים לעולם ואיך לקמט את זה להצעה עסקית. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 278 | תיזכרו שוב מדוע אתם עוסקים במה שאתם עוסקים (במקום להרגיש מתחזים). | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 279 | תהיו מסוגלים למגנט לקוחות מדויקים יותר לעסק שלכם דרך כלי הפרסונות. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 280 | הסילבוס | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 281 | מפגש 1: מדוע אנחנו מתמכרים למותגים? | `services[business-to-brand].body` | `offers[8].syllabus[0]` | sourced |
| 282 | נלמד על כוחו הבלתי נלאה של מיתוג בעזרת מודל ״רכשתי״ ונבין ומדוע כדאי לעסקים קטנים להשתמש בו. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 283 | נכיר את קנבס החשיבה המותגית Brand the change, כלי המחקר הכיפי שנעבוד איתו. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 284 | מפגש 2: מיתוג פרסונלי ויצירת אמינות שיווקית | `services[business-to-brand].body` | `offers[8].syllabus[1]` | sourced |
| 285 | איך בונים חזון, ערכים ומטרות? | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 286 | - השורשים של העסק. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 287 | נלמד איך לשלב את האישי והעסקי בדרך המיטיבה. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 288 | מפגש 3: מי את.ה קהל נכבד? | `services[business-to-brand].body` | `offers[8].syllabus[2]` | sourced |
| 289 | מיהם ה"מאמצים הראשונים", פרסונות ובניית הבטחת המותג - ההסכם הבילתי כתוב עם הקהל שלנו. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 290 | מפגש 4: מיטיב, מיטיב אבל איפה הכסף? | `services[business-to-brand].body` | `offers[8].syllabus[3]` | sourced |
| 291 | מהו ROI והאם בניית אסטרטגיה למיתוג שווה את ההשקעה? | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 292 | נטעם מהעולם המותג המיטיב העסקי עם מחקרי בוחן מהשטח ומודלים עסקים. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 293 | מפגש 5: אינטראקציות ותכלס | `services[business-to-brand].body` | `offers[8].syllabus[4]` | sourced |
| 294 | איך לוקחים את האסטרטגיה והופכים אותה לתוכן דרך ערוצי ההפצה. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 295 | במפגש נבחר את הערוצים הראשוניים, נתכנן את עתיד המותג ונבין את המסרים השיווקים שלנו. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 296 | מפגש 6: סטוריטלינג | `services[business-to-brand].body` | `offers[8].syllabus[5]` | sourced |
| 297 | איך בונים סיפור? | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 298 | במפגש נכיר את המתודיקה מאחורי הסיפורים הטובים בעולם ונטמיע אותה שלב אחרי שלב בסיפור המותג שלכם.ן | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 299 | מפגש 7: היום שאחרי | `services[business-to-brand].body` | `offers[8].syllabus[6]` | sourced |
| 300 | הכנה לפרזנטצית הסיום וכלים דיגיטליים להמשך הדרך | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 301 | מפגש 8: מי אני, מה אני עושה ולמה זה חשוב? | `services[business-to-brand].body` | `offers[8].syllabus[7]` | sourced |
| 302 | מפגש פרונטלי חגיגי ומשמח: הצגת פרזנטציה והגשת מסמך תיאור מותג. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 303 | מפגש 9: אישי מיטיב | `services[business-to-brand].body` | `offers[8].syllabus[8]` | sourced |
| 304 | פגישה מיתוג אחד על אחד שבה נעבור על המסמך ונמיר אותו ל Action plan. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 305 | מה מיוחד בקורס? | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 306 | מפגש follow up לאחר הקורס לדיוק השלב הבא שהספציפיים לך | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 307 | עבודה במתודיקה בינלאומית המתמקדת בפיתוח מותגי אימפקט | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 308 | תהליך התפתחות אישית הקורה במקביל להתפתחות העסקית | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 309 | פרזנטציה להצגת אסטרטגיית המותג שלך | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 310 | קבוצה אינטימית בהנחייה אישית שלא מפספסת פרט. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 311 | כדי לעמוד בסערות העסקיות של העולם המשתנה תדיר, חשוב קודם כל להעמיק ולחזק השורשים. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 312 | הקורס ישפוך אור על נקודות שאולי לא ראית, שאולי הם בעצם הייחוד והבידול העסקי שלך. | `services[business-to-brand].body` | `pages[/newcourse].text` | sourced |
| 313 | ניתן לבטל הרשמה עד שבוע לפני תחילת הקורס, וניתן לשלם בתשלומים. | `services[business-to-brand].body` | `offers[8].terms` (spacing normalised) | sourced |
| 314 | ההרשמה נסגרה. | `services[business-to-brand].body` | `offers[8].status` | sourced |
| 315 | רוצים לשמוע על הקורס הבא? | `services[business-to-brand].body` | `offers[8].status` ("עדכני אותי על הקורס הבא"), `contact.whatsapp` | sourced |
| 316 | כתבו לי בוואטסאפ. | `services[business-to-brand].body` | `contact.whatsapp` | sourced |
| 317 | 9 מפגשים: 8 קבוצתיים ומפגש אישי אחד על אחד | `services[business-to-brand].format` | `offers[8].meetings` | sourced |
| 318 | עסקים שרוצים להטיב עם העסק, עם לקוחותיהם ועם הסביבה, המחפשים תהליך אסטרטגי מעמיק ואמתי. | `services[business-to-brand].audience` | `offers[8].audience` | sourced |
| 319 | היי הדס, ראיתי שההרשמה ל״מעסק למותג מיטיב״ נסגרה. | `services[business-to-brand].ctaText` | `offers[8].status` | sourced |
| 320 | אשמח לעדכון כשייפתח המחזור הבא. | `services[business-to-brand].ctaText` | `offers[8].status` | sourced |
| 321 | מתודת ״מותג מיטיב״ | `method.name` | `method.name` | sourced |
| 322 | מיתוג אישי לעסק ותכנון אסטרטגי למותג עוברים באותה שיטה, בארבעה שלבים. | `method.intro` | `method.client` (brief 20), `services[].client_leading` (brief 12) | sourced |
| 323 | בתהליך אנו משתמשים במתודולוגית הקנבסים של BRAND THE CHANGE, מתורגמים לעברית. | `method.intro` | `pages[/process].text` (tense changed); also `/personal101` THINKING (brand thinking canvas) | sourced |
| 324 | SENSING | `method.stages[0].label` | `method.stages[0].name` | sourced |
| 325 | מחקר עומק שמטרתו להקשיב ולזקק את הלב הפועם של האירגון | `method.stages[0].title` | `method.stages[0].text_process` | sourced |
| 326 | הדרך להבנת הייחוד העסקי של השירות או המוצר עוברת דרך תהליך עומק הנעשית בדרך יצירתית המשלבת כלים מעולמות תוכן שונים. | `method.stages[0].body` | `method.stages[0].text_personal` | sourced |
| 327 | בשלב הזה אנו מארגנים את האינפורמציה כדי לעשות מיפוי. | `method.stages[0].body` | `method.stages[0].text_personal` | sourced |
| 328 | דרך תובנות, דאטה, תשאול, מחקר שטח, הקשבה וחקירה אישית. | `method.stages[0].body` | `method.stages[0].text_personal` | sourced |
| 329 | THINKING | `method.stages[1].label` | `method.stages[1].name` | sourced |
| 330 | זיקוק, פיתוח ודיוק מחודש דרך חשיבה וכתיבת תוכנית אסטרטגית. | `method.stages[1].title` | `method.stages[1].text_process` | sourced |
| 331 | הבנו מי את.ה ומה הייחוד שלך, עכשיו עלינו להטמיע את זה בצורה אסטרטגית ועסקית. | `method.stages[1].body` | `method.stages[1].text_personal` | sourced |
| 332 | בשלב הזה, אנו נעזרים, דרך סדנאות ומפגשים במתודה חדשנית בשם brand the change. | `method.stages[1].body` | `method.stages[1].text_personal` | sourced |
| 333 | בעזרת קנבס חשיבה (brand thinking canvas) יוצרים קוהרנטיות בין כל שלבי המותג, החזון, ערכי הליבה והבנת הצעת הערך ובאיזה אופנים אנו מביאים לקהל שלנו - action wise. | `method.stages[1].body` | `method.stages[1].text_personal` | sourced |
| 334 | MAKING | `method.stages[2].label` | `method.stages[2].name` | sourced |
| 335 | לקחת את החזון ולהפוך למציאות מוחשית ובת-קיימא | `method.stages[2].title` | `method.stages[2].text_process` | sourced |
| 336 | בשלב הזה, אנו לוקחים את תובנות האסטרטגיה וממירים אותה לנכסים – לוגו, גריד צבעים ועיצוב שפה חזותית, הבנת טון המותג מבחינת סגנון הכתיבה, עיצוב נכסים דיגיטליים (אתר, סושיאל, אפליקציה, וידאו). | `method.stages[2].body` | `method.stages[2].text_personal` | sourced |
| 337 | שלב זה אינו חובה, לא כל תהליך אסטרטגי דורש מיתוג ויזואלי מחודש. | `method.stages[2].body` | `method.stages[2].text_personal` | sourced |
| 338 | INFLUENCING | `method.stages[3].label` | `method.stages[3].name` | sourced |
| 339 | ייעוץ וסופרויז׳ן להמשך הדרך | `method.stages[3].title` | `method.stages[3].text_personal` | sourced |
| 340 | כדי להיות מותג שבאמת מיטיב (ולא לסיים כמותג Greenwash) ההבטחה שלנו דורשת מחויבות גדולה יותר - להיות השינוי אותו אנו רוצים לראות בעולם. | `method.stages[3].body` | `method.stages[3].text_personal` | sourced |
| 341 | הטמעה לוקחת זמן, בטח ובטח אם מדובר באירגון או עסק עם יותר מאדם אחד. | `method.stages[3].body` | `method.stages[3].text_personal` | sourced |
| 342 | השלב הזה הוא on going ומטרתו לעזור בדרך, כמו מצפן, לבנות מותג שמשלב מהות ומשמעות. | `method.stages[3].body` | `method.stages[3].text_personal` | sourced |
| 343 | הדס דרכלי | `team[0].name` | `team[0].name` | sourced |
| 344 | מייסדת גישת ׳מותג מיטיב׳ | `team[0].role` | `team[0].role` | sourced |
| 345 | הי, שמי הדס דרכלי, מלווה ומפתחת אסטרטגיה מותג אישי לבעלי עסקים המחברים משמעות למשימת היזמות והעסק שלהם. | `team[0].bio` | `team[0].bio` | sourced |
| 346 | מייסדת גישת המותג המיטיב ומנטורית לתהליכי מיתוג מיטיב לעסקים וא.נשים שרוצים גם וגם. | `team[0].bio` | `team[0].bio` | sourced |
| 347 | ממתגת מוסמכת בשיטת "Brand the change" טכניקת מיתוג בינלאומית למיתוג מבוסס אימפקט. | `team[0].bio` | `credentials[2]` | sourced |
| 348 | תמר דרכלי | `team[1].name` | `team[1].name` | sourced |
| 349 | יוצרת תוכן וידאו בשילוב AI | `team[1].role` | `team[1].role` | sourced |
| 350 | יוצרת ובימאית המשלבת בינה מלאכותית (AI) בתהליכי יצירה. | `team[1].bio` | `team[1].bio` | sourced |
| 351 | בעלת תשוקה לטבע, פרחים והשפעה מיטיבה. | `team[1].bio` | `team[1].bio` | sourced |
| 352 | דרך כתיבה ויצירת תוכן וידאו משולב AI תמר מביאה זווית ראיה המשלבת תוכן, קהילה, סושיאל אימפקט וטכנולוגיה. | `team[1].bio` | `team[1].bio` | sourced |
| 353 | בעברה עבדה תמר כבימאית וידאו קליפים ואף זכתה לביים קליפ עבור בימאי הקולנוע האגדי דיוויד לינץ. | `team[1].bio` | `team[1].bio` | sourced |
| 354 | יעל שחר | `team[2].name` | `team[2].name` | sourced |
| 355 | צילום תיעודי מכבד | `team[2].role` | `team[2].role` | sourced |
| 356 | יעל שחר, צלמת וידאו וסטילס בינלאומית זוכת פרסים בארץ ובעולם בינהם אף פרס אופיר. | `team[2].bio` | `team[2].bio` | sourced |
| 357 | יעל מובילה את המצולמים תהליכי עומק וחשיפה, מודעות והתחשבות עד לתוצאה המכבדת, מחזקת ומעצימה את המצולמ.ת. | `team[2].bio` | `team[2].bio` | sourced |
| 358 | אופי הצילום של יעל הוא דוקומנטרי, בצילומים שלה היופי והמושלמות באים לידי ביטוי בתיעודי השקוף, והאותנטי. | `team[2].bio` | `team[2].bio` | sourced |
| 359 | דנה רוסו | `team[3].name` | `team[3].name` | sourced |
| 360 | מיתוג עמותות ואירגונים חברתיים | `team[3].role` | `team[3].role` | sourced |
| 361 | מעצבת בכירה למיתוג עמותות ואירגונים חברתיים, זוכת פרס המיתוג הטוב ביותר בקטגוריית עמותות לשנת 2022. | `team[3].bio` | `team[3].bio` | sourced |
| 362 | עם תואר עיצוב מ HIT וכבוגרת קורס ״מיתוג מיטיב״. | `team[3].bio` | `team[3].bio` | sourced |
| 363 | דנה מצליחה לזקק אסטרטגיה ולהתמיר אותה ליצירת מותג שמחזיקה את רוח הזמן לאורך שנים קדימה. | `team[3].bio` | `team[3].bio` | sourced |
| 364 | בין עבודותיה - ברטלי - נוער בתנועה, אוניברסיטת רייכמן - DIP השפעה ותודעה. | `team[3].bio` | `team[3].bio` | sourced |
| 365 | כמובן מיתוג ״מותג מיטיב״! | `team[3].bio` | `team[3].bio` | sourced |
| 366 | ליאור ארסיני | `team[4].name` | `team[4].name` | sourced |
| 367 | ניהול שיווק ואימפקט מבוסס נתונים | `team[4].role` | `team[4].role` | sourced |
| 368 | ליאור אורסיני יעיש מובילה מהלכי צמיחה ושיווק עבור ארגונים, יוזמות ומותגים בתחומי האימפקט החברתי, בריאות הנפש והרווחה האישית. | `team[4].bio` | `team[4].bio` | sourced |
| 369 | היא מתמחה ביצירת אסטרטגיות מבוססות נתונים, בהגדרת קהלים מדויקים ובבניית תוכן וקמפיינים רב־ערוציים שמחברים בין ערכי המותג, סיפור ברור ותוצאות מדידות. | `team[4].bio` | `team[4].bio` | sourced |
| 370 | לליאור תואר שני במחקר תרבות עם התמחות בפסיכולוגיה תרבותית, והיא מביאה גישה ייחודית המשלבת בין אסטרטגיה, משמעות והשפעה ארוכת טווח. | `team[4].bio` | `team[4].bio` | sourced |
| 371 | שורשים — בית קפה חברתי (דוגמה) | `caseStudies[0].client` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 372 | עסק חברתי | `caseStudies[0].sector` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 373 | מבית קפה שכונתי למותג שמספר את הסיפור שלו | `caseStudies[0].title` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 374 | שורשים הוא בית קפה שמעסיק צעירים בתחילת דרכם המקצועית. | `caseStudies[0].challenge` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 375 | האוכל טוב והקהילה אוהבת את המקום, אבל מי שנכנס מהרחוב לא יודע שיש כאן יותר מקפה. | `caseStudies[0].challenge` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 376 | השם, השלט והאינסטגרם דיברו כל אחד בשפה אחרת, והמייסדים התקשו להסביר במשפט אחד למה כדאי לבחור דווקא בהם. | `caseStudies[0].challenge` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 377 | שיחות עם המייסדים, הצוות ולקוחות קבועים. | `caseStudies[0].process[0].body` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 378 | מיפינו מה גורם לאנשים לחזור, ומה הם מספרים לחברים על המקום. | `caseStudies[0].process[0].body` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 379 | ניסחנו את מהות המותג: מקום שבו כל כוס קפה היא צעד ראשון של מישהו. | `caseStudies[0].process[1].body` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 380 | מזה נגזרו הקהל, המסר המרכזי וטון הדיבור. | `caseStudies[0].process[1].body` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 381 | לוגו חדש, פלטת צבעים חמה, תפריט ושלט שמספרים את הסיפור, ותבנית קבועה לפוסטים באינסטגרם. | `caseStudies[0].process[2].body` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 382 | ליווי של שלושה חודשים אחרי ההשקה: איך מציגים את הצוות, איך מספרים על המקום באירועים, ומה בודקים כדי לדעת שהמסר עובד. | `caseStudies[0].process[3].body` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 383 | למותג יש עכשיו משפט אחד שכל הצוות אומר באותה צורה, שפה חזותית אחת בשלט, בתפריט וברשתות, וסיפור שהלקוחות מספרים הלאה. | `caseStudies[0].outcome` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 384 | סוף סוף אנחנו יודעים להגיד מי אנחנו, וגם האורחים יודעים. | `caseStudies[0].quote` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 385 | מייסדת שורשים (דוגמה) | `caseStudies[0].quoteAuthor` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 386 | אסטרטגיה ומיתוג: מותג מיטיב · עיצוב: צוות מותג מיטיב | `caseStudies[0].credits` | brief/mutag-meitiv/demo-case-study.he.md (invented, demo: true) | demo |
| 387 | פרס המיתוג הישראלי 2022 — זהב, קטגוריית עמותות | `awards[0].label` | `award.value` (place gold, category עמותות, 2022), verified on brandawards.co.il; `award.client` (brief 23) | sourced |
| 388 | Brand Academy | `awards[0].issuer` | `award.organiser` | sourced |
| 389 | ברטלי | `awards[0].project` | `award.project` | sourced |
| 390 | ממתגת מוסמכת בשיטת Brand the Change | `credentials[0].label` | `credentials[2]` (site wording), `credentials[0]` (verified on brandthechange.org, C-position-10) | sourced |
| 391 | Brand the Change | `credentials[0].issuer` | `credentials[0]` | sourced |
| 392 | עיריית חיפה | `clientLogos[0].name` | `images[43].client` | sourced |
| 393 | מכון מנדל למנהיגות | `clientLogos[1].name` | `images[44].client` | sourced |
| 394 | המעיין — א.ת מתחדש מעיין צבי | `clientLogos[2].name` | `images[45].client` | sourced |
| 395 | מט"י חיפה | `clientLogos[3].name` | `images[46].client` | sourced |
| 396 | ליגת האמהות בכדורשת | `clientLogos[4].name` | `images[47].client` | sourced |
| 397 | עמותת ברטלי — נוער בתנועה | `clientLogos[5].name` | `images[48].client` | sourced |
| 398 | מועצה אזורית חוף הכרמל | `clientLogos[6].name` | `images[49].client` | sourced |
| 399 | כפר יונה | `clientLogos[7].name` | `images[50].client` | sourced |
| 400 | HEARTIVISM | `clientLogos[8].name` | `client_logos.note` | sourced |
| 401 | אוניברסיטת רייכמן | `clientLogos[9].name` | `team[3].bio` | sourced |
| 402 | Fairtrade Israel — סחר הוגן | `clientLogos[10].name` | `images[53].client` | sourced |
| 403 | מתן בלב | `clientLogos[11].name` | `images[54].client` | sourced |
| 404 | איגוד ערים אזור מפרץ חיפה — הגנת הסביבה | `clientLogos[12].name` | `images[55].client` | sourced |
| 405 | medatech — מידעטק מערכות | `clientLogos[13].name` | `images[56].description` | sourced |
| 406 | AMBARTIQUE | `clientLogos[14].name` | `testimonials[1].author` | sourced |
| 407 | מותג מיטיב | `podcast.title` | `business.name` | sourced |
| 408 | הירשמו חינם למגזין ׳מיטיב׳ — אחת לחודש, אצלך במייל: תוכן מיטיב על א.נשים, עסקים וחדשנות מיטיבה | `newsletter.label` | `newsletter` (three lines joined) | sourced |
| 409 | מדריך הכנה למיתוג | `downloads[0].label` | `lead_magnet.title` | sourced |
| 410 | מותג מיטיב, אחראית על הקמת והפעלת האתר. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` (old Wix URL → "האתר") | sourced |
| 411 | אנו רואים חשיבות רבה במתן שירות שוויוני לכלל האזרחים ובשיפור השירות הניתן לאזרחים עם מוגבלות. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 412 | אנו משקיעים משאבים רבים בהנגשת האתר והנכסים הדיגיטליים שלנו על מנת להפוך את שירותי החברה לזמינים יותר עבור אנשים עם מוגבלות. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 413 | במדינת ישראל כ-20 אחוזים מקרב האוכלוסייה הינם אנשים עם מוגבלות הזקוקים לנגישות דיגיטלית, על מנת לצרוך מידע ושירותים כללים. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` — statistic in the owner's statement, verbatim; not in the research (R7) | shared-context |
| 414 | הנגשת האתר של מותג מיטיב, נועדה להפוך אותו לזמין, ידידותי ונוח יותר לשימוש עבור אוכלוסיות עם צרכים מיוחדים, הנובעים בין היתר ממוגבלויות מוטוריות שונות, לקויות קוגניטיביות, קוצר רואי, עיוורון או עיוורון צבעים, לקויות שמיעה וכן אוכלוסייה הנמנית על בני הגיל השלישי. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 415 | החרגות | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 416 | חשוב לציין, כי למרות מאמצינו להנגיש את כלל הדפים והאלמנטים באתר, ייתכן שיתגלו חלקים או יכולות שלא הונגשו כראוי או שטרם הונגשו. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 417 | אנו פועלים לשפר את נגישות האתר שלנו כל העת, כחלק ממחויבותנו לאפשר לכלל האוכלוסייה להשתמש בו, כולל אנשים עם מוגבלות. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 418 | יצירת קשר בנושא נגישות | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 419 | במידה ונתקלתם בבעיה בנושא נגישות באתר, נשמח לקבל הערות ובקשות באמצעות פנייה לרכזת הנגישות שלנו. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` ("לרכז" → "לרכזת", per `accessibility_statement.coordinator`) | sourced |
| 420 | על מנת שנוכל לטפל בבעיה בדרך הטובה ביותר, אנו ממליצים מאוד לצרף פרטים מלאים ככל שניתן: | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 421 | תיאור הבעיה. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 422 | מהי הפעולה שניסיתם לבצע. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 423 | קישור לדף שבו גלשתם. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 424 | סוג הדפדפן וגרסתו. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 425 | מערכת הפעלה. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 426 | סוג הטכנולוגיה המסייעת (במידה והשתמשתם). | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 427 | מותג מיטיב תעשה ככל יכולה על מנת להנגיש את האתר בצורה המיטבית ולענות לפניות בצורה המקצועית והמהירה ביותר. | `legal.accessibilityStatement` | `pages[/הצהרת-נגישות].text` | sourced |
| 428 | רכזת נגישות: הדס דרכלי, 054-668-6808, hadas@kapara.com | `legal.accessibilityContact` | `accessibility_statement.coordinator` (phone formatted) | sourced |
| 429 | מכאוס לאחריות: הקשר המפתיע בין מרינה אברמוביץ', ארנולד שוורצנגר ויעדי הפיתוח בר קיימא הבינלאומיים (ואיך זה קשור למותג שלכם?) | `posts[0].title` | `pages[/].text` | sourced |
| 430 | כדי להיות באמת מותג מיטיב, אנחנו צריכים להיות אקטיביים: לייצר מודלים עסקיים שמיטיבים עם הלקוחות והסביבה ולכוון את העשייה שלנו למטרות גדולות שמשנות את העולם. | `posts[0].excerpt` | `blog.posts[0].summary` | sourced |
| 431 | ממהפכת האש למהפכת הבינה - האם הבינה המלאכותית תעמיק את הניכור, או ההפך? | `posts[1].title` | `blog.posts[1].title` | sourced |
| 432 | מחשבות על הזמן שהתפנה לנו – ומה אנחנו בוחרים לעשות איתו ברמה האנושית והתרבותית. | `posts[1].excerpt` | `blog.posts[1].summary` | sourced |
| 433 | אסטרטגיה ומיתוג בזמן שכל מה שבא לך זה לישון: מדריך הישרדות (מצחיק-עצוב)לצמיחה | `posts[2].title` | `blog.posts[2].title` | sourced |
| 434 | איך מנהלים עסק קטן כשמד השחיקה, אי הודאות ופוטנציאל המשך מלחמה צובר תאוצה מעל ראשנו? | `posts[2].excerpt` | `pages[/].text` | sourced |
| 435 | המאמר מציע אסטרטגיית חוסן רגשי, "ניקוי" אסטרטגי, וכלים פרקטיים להפיכת אי-ודאות להזדמנות, כולל ניהול לקוחות ושימוש באוטומציות לשמירה על השפיות. | `posts[2].excerpt` | `pages[/].text` | sourced |
| 436 | במיוחד ליום האשה - נשים שמשנות את העתיד כאן, עכשיו וביחד. | `posts[3].title` | `blog.posts[3].title` | sourced |
| 437 | מי הם מבשרי השחר של 2026? | `posts[4].title` | `blog.posts[4].title` | sourced |
| 438 | הסיכום השנתי של מותג מיטיב על טרנדים ומותגים מיטיבים! | `posts[4].title` | `blog.posts[4].title` | sourced |
| 439 | איך מפתחים מותג עם השפעה חיובית בישראל? | `posts[5].title` | `blog.posts[5].title` | sourced |
| 440 | 5 סרטים מעוררי השראה על קיימות ואופנה שכדאי לראות. | `posts[6].title` | `blog.posts[6].title` | sourced |
| 441 | רגע לפני שסוף נובמבר מגיע ובלאק פריידי מציף אותנו בהנחות, רציתי לשתף בזווית ראיה נוספת – חמישה סרטים שבאמת מעוררים השראה על אופנה | `posts[6].excerpt` | `blog.posts[6].summary` | sourced |
| 442 | עשרה מותגים מיטיבים המבשרים על בואה של 2025 | `posts[7].title` | `blog.posts[7].title` | sourced |
| 443 | איך לקדם אסטרטגיית ESG בעסקים קטנים ובינוניים? | `posts[8].title` | `blog.posts[8].title` | sourced |
| 444 | מיתוג עצמי חיובי - איך להשתמש בסודות המיתוג לקידום רווחה נפשית וחשיבה מודעת. | `posts[9].title` | `blog.posts[9].title` | sourced |
| 445 | מה זה אימפקט? | `posts[10].title` | `blog.posts[10].title` | sourced |
| 446 | עושים סדר בחדר | `posts[10].title` | `blog.posts[10].title` | sourced |
| 447 | 7 מותגים בתחום הרווחה הנפשית (כי זה מה שאנו הכי זקוקים לו כרגע) | `posts[11].title` | `blog.posts[11].title` | sourced |
| 448 | 3 טרנדים ו 10 מותגים מיטיבים - מבשרי השחר של 2024 | `posts[12].title` | `blog.posts[12].title` | sourced |
| 449 | ניתן לראות באופן בוהק איך ההשלכות הפסיכולוגיות והכלכליות של תקופת הקורונה באות לידי ביטוי במותגי 2024. | `posts[12].excerpt` | `blog.posts[12].summary` | sourced |
| 450 | איך סולידריות יכולה להפוך לאסטרטגיית שיקום? | `posts[13].title` | `blog.posts[13].title` | sourced |
| 451 | מאמר דעה. | `posts[13].title` | `blog.posts[13].title` | sourced |
| 452 | חיזוק חוש המישוש והכרות עם חומרים מיטיבים - ביקור בספריית החומרים בחולון | `posts[14].title` | `blog.posts[14].title` | sourced |
| 453 | די לחרדה, על מודלי עבודה מיטיבים בעולם תשוש | `posts[15].title` | `blog.posts[15].title` | sourced |
| 454 | מאומת הסטארט אפ  לאומת האימפקט - ולא, אין זו אגדה. | `posts[16].title` | `blog.posts[16].title` | sourced |
| 455 | סיכום ביקור - פורום הרצל ליזמות חברתית - כלכלית. | `posts[16].title` | `blog.posts[16].title` | sourced |
| 456 | איך לקיים את חג הפורים בדרך יותר מקיימת? | `posts[17].title` | `blog.posts[17].title` | sourced |
| 457 | עשרת המותגים המיטיבים והמבטיחים לשנת 2023 | `posts[18].title` | `blog.posts[18].title` | sourced |
| 458 | דמנהור – פלא העולם השמיני, ביקור בקהילה שהיא מותג מיטיב | `posts[19].title` | `blog.posts[19].title` | sourced |
| 459 | שנה חדשה בפתח - מגזין מיוחד לשנה החדשה מה נאחל השנה? | `posts[20].title` | `blog.posts[20].title` | sourced |
| 460 | לצייר ולהדפיס בעזרת זיהום אוויר - קבלו את AIR-INK | `posts[21].title` | `blog.posts[21].title` | sourced |
| 461 | הגיל השלישי,כש 70 זה ה 60 החדש. | `posts[22].title` | `blog.posts[22].title` | sourced |
| 462 | מהי צרכנות מודעת, הנה 5 צעדים ראשונים לעשות זאת בקלות ובאתיות. | `posts[23].title` | `blog.posts[23].title` | sourced |
| 463 | איך פחד עצר אותי מלעמוד בהבטחת המותג שלי? | `posts[24].title` | `blog.posts[24].title` | sourced |
| 464 | ולמה לקח מלא זמן להולדת הפודקאסט? | `posts[24].title` | `blog.posts[24].title` | sourced |
| 465 | מיטיב החודש: קלריטר - Clariter, גם תעשייתי גם מסחרי וגם מיטיב. | `posts[25].title` | `blog.posts[25].title` | sourced |
| 466 | 5 הרצאות TED מעוררות מחשבה ופתרונות מעשיים על קיימות. | `posts[26].title` | `blog.posts[26].title` | sourced |
| 467 | לקראת 2022: קבלו את 11 המותגים המיטיבים שעשו פריצת דרך השנה ובגדול! | `posts[27].title` | `blog.posts[27].title` | sourced |
| 468 | (גם ישראלים ברשימה). | `posts[27].title` | `blog.posts[27].title` | sourced |
| 469 | COP 26 - סיכום ועידת האקלים 2021 - כל מה שרצית לדעת | `posts[28].title` | `blog.posts[28].title` | sourced |
| 470 | מיטיב החודש: תנועת נוער על אופניים! | `posts[29].title` | `blog.posts[29].title` | sourced |
| 471 | הכירו את ברטלי - נוער בתנועה. | `posts[29].title` | `blog.posts[29].title` | sourced |
| 472 | מותג מיטיב בחודש והפעם - ברטלי נוער בתנועה. | `posts[29].excerpt` | `blog.posts[29].summary` | sourced |
| 473 | גאה לקחת חלק בפיתוח המותג הכל כך מיטיב הזה | `posts[29].excerpt` | `blog.posts[29].summary` | sourced |
| 474 | איך למצוא את הקהל שלך? | `posts[30].title` | `blog.posts[30].title` | sourced |
| 475 | חלק ב׳ - THE BLUE OCEAN | `posts[30].title` | `blog.posts[30].title` | sourced |
| 476 | איך למצוא את הקהל שלך? | `posts[31].title` | `blog.posts[30].title` | sourced |
| 477 | חלק א׳ THE EARLY ADOPTERS | `posts[31].title` | `blog.posts[31].title` | sourced |
| 478 | כלכלה מעגלית - מדוע היא מתאימה לעסקים קטנים ובינוניים? | `posts[32].title` | `blog.posts[32].title` | sourced |
| 479 | חודש הגאווה - כשתרבות אנושית מיטיבה הופכת למותג. | `posts[33].title` | `blog.posts[33].title` | sourced |
| 480 | לא ימני ולא שמאלני - קולקטיבי! | `posts[34].title` | `blog.posts[34].title` | sourced |
| 481 | (ומה הקשר למותג מיטיב?) | `posts[34].title` | `blog.posts[34].title` | sourced |
| 482 | יום כדור הארץ - איך הכל התחיל | `posts[35].title` | `blog.posts[35].title` | sourced |
| 483 | 5 חסמים פופולריים בתהליכי מיתוג אישי - מה שלך? | `posts[36].title` | `blog.posts[36].title` | sourced |
| 484 | גאווה ישראלית ירוקה - UBQ - מיטיב החודש | `posts[37].title` | `blog.posts[37].title` | sourced |
| 485 | איך למצוא השראה בתקופת משבר? | `posts[38].title` | `blog.posts[38].title` | sourced |
| 486 | 10 המותגים המיטיבים שעשו פריצת דרך השנה ובגדול! | `posts[39].title` | `blog.posts[57].title` | sourced |
| 487 | (גם ישראלים ברשימה) מגזין הבלוג המיטיב מסכם שנה | `posts[39].title` | `blog.posts[39].title` | sourced |
| 488 | איך לזהות גרינוושינג: 4 סימנים שיעזרו לכם לזהות מותג שלא מיטיב | `posts[40].title` | `blog.posts[40].title` | sourced |
| 489 | מה זה איפיון אתר אינטרנט ולמה צריך את זה בכלל? | `posts[41].title` | `blog.posts[41].title` | sourced |
| 490 | אחת לשבוע אני מקבלת טלפון מלקוחות שמאוכזבים מהאתר החדש שלהם. | `posts[41].excerpt` | `blog.posts[41].summary` | sourced |
| 491 | בשיחתינו הם מסבירים שאחרי עבודה של חודשים ואלפי שקלים לאנשי מקצוע - הם לא מרוצים מהאתר שלהם. | `posts[41].excerpt` | `blog.posts[41].summary` | sourced |
| 492 | הוא לא נח, לא נגיש, לא מובן או לא יפה. | `posts[41].excerpt` | `blog.posts[41].summary` | sourced |
| 493 | המתכנת בכלל לא הבין אותם והמעצבת נעלמה להם. | `posts[41].excerpt` | `blog.posts[41].summary` | sourced |
| 494 | הוא לא מדגיש את הייחודיות שלהם ונראה כמו כל אתר ברשת. | `posts[41].excerpt` | `blog.posts[41].summary` | sourced |
| 495 | 8 ספרים משני תפיסה לתקופת ה"ניו נורמל" NEW NORMAL | `posts[42].title` | `blog.posts[42].title` | sourced |
| 496 | הרשת מוצפת בדיעות והצעות שונות לרוח התקופה אך אני אישית אוהבת לקבל השראה מסופרים/ות. | `posts[42].excerpt` | `blog.posts[42].summary` | sourced |
| 497 | כרגע יושבים אצלי על המדף כ 5 - 6 ספרים. | `posts[42].excerpt` | `blog.posts[42].summary` | sourced |
| 498 | כל אחד שופך אור על השאלות האלו מנקודת המבט שלו. | `posts[42].excerpt` | `blog.posts[42].summary` | sourced |
| 499 | מיטיב בחודש: KITEPRIDE - מיטיב כפול שלוש. | `posts[43].title` | `blog.posts[43].title` | sourced |
| 500 | המשבר שגרם לי להבין שאפשר גם וגם | `posts[44].title` | `blog.posts[44].title` | sourced |
| 501 | b-corp \| הכירו את התאגידים שרוצים להטיב | `posts[45].title` | `blog.posts[45].title` | sourced |
| 502 | מותג מיטיב בחודש - תנועת סחר הוגן ישראל | `posts[46].title` | `blog.posts[46].title` | sourced |
| 503 | ה"נורמלי החדש" NEW NORMAL - מגזין 10 של הבלוג המיטיב. | `posts[47].title` | `blog.posts[47].title` | sourced |
| 504 | איך משחקי מחשב יכולים להטיב? | `posts[48].title` | `blog.posts[48].title` | sourced |
| 505 | מהו סחר הוגן - כשאנושיות היא שם המותג | `posts[49].title` | `blog.posts[49].title` | sourced |
| 506 | שוקולד טוני׳ס או TONY CHOCOLONELY-  חשיבה מחוץ לשוקולד | `posts[50].title` | `blog.posts[50].title` | sourced |
| 507 | אז מה התובנות שנקח איתנו ליום שאחרי הקורונה? | `posts[51].title` | `blog.posts[51].title` | sourced |
| 508 | סקר קצר | `posts[51].title` | `blog.posts[51].title` | sourced |
| 509 | מותג מיטיב בחודש - מדטרוניק MEDTRONIC | `posts[52].title` | `blog.posts[52].title` | sourced |
| 510 | קורונה..מיטיב? | `posts[53].title` | `blog.posts[53].title` | sourced |
| 511 | אנליזה אופטימית | `posts[53].title` | `blog.posts[53].title` | sourced |
| 512 | רק התחלנו את 2020 וכבר מדברים על 2030 ובצדק! | `posts[54].title` | `blog.posts[55].title` | sourced |
| 513 | מגזין 08 של הבלוג המיטיב בעינייני סביבה. | `posts[54].title` | `blog.posts[55].title` | sourced |
| 514 | מותג מיטיב בחודש - TOMS SHOES או איך יוצא תוכנית ריאליטי שינה את חוקי הכלכלה ובנה מותג מיטיב | `posts[55].title` | `blog.posts[56].title` | sourced |
| 515 | 10 המותגים המיטיבים שעשו פריצת דרך השנה ובגדול! | `posts[56].title` | `blog.posts[57].title` | sourced |
| 516 | (גם ישראלים ברשימה)מגזין 07 של הבלוג מסכם שנה. | `posts[56].title` | `blog.posts[57].title` | sourced |
| 517 | את המגזין הזה אני מקדישה ל 2 מיליון נשים - מגזין 05 של הבלוג המיטיב | `posts[57].title` | `blog.posts[58].title` | sourced |
| 518 | מותג מיטיב בחודש - OUTLAND DENIM. | `posts[58].title` | `blog.posts[59].title` | sourced |
| 519 | איך סרט אקשן שינה את עולמו של אדם אחד ומאות נשים. | `posts[58].title` | `blog.posts[59].title` | sourced |
| 520 | מותג בירה ברזילאי מממן פרויקט סל קניות חכם ללקויי ראייה! | `posts[59].title` | `blog.posts[60].title` | sourced |
| 521 | "יש לך את היכולת להשתמש בעסק שלך ככח מיטיב"  המילטון פרקינס - מגזין 04 של הבלוג המיטיב | `posts[60].title` | `blog.posts[61].title` | sourced |
| 522 | מזיכרון לאירוזיון | `posts[61].title` | `blog.posts[62].title` | sourced |
| 523 | "הדס, בואי רגע נוריד דברים לקרקע. | `posts[62].title` | `blog.posts[63].title` | sourced |
| 524 | למה לי להפוך למותג מיטיב? | `posts[62].title` | `blog.posts[63].title` | sourced |
| 525 | מותג מיטיב בחודש - FAIRPHONE | `posts[63].title` | `blog.posts[64].title` | sourced |
| 526 | על צבעים, יום השוויון והלוגו העתיק בעולם | `posts[64].title` | `blog.posts[65].title` | sourced |
| 527 | כלים לבניית עסק מיטיב | `mockup_extras.homeToolsHeading` | `business.motto.note` | sourced |
| 528 | צילום: יעל שחר | `mockup_extras.footerCredits[0]` | `footer.value` | sourced |
| 529 | תכשיטים מנייר ממוחזר: מינה בן נון | `mockup_extras.footerCredits[1]` | `footer.value` | sourced |
| 530 | מודה על הזכות להטיב ב: | `mockup_extras.clientLogosHeading` | `client_logos.heading` | sourced |
| 531 | מיטיבים מספרים.ות | `mockup_extras.testimonialsHeading` | `pages[/personal101].text` | sourced |
| 532 | ״לפני שהתחלנו את התהליך טיפלתי במספר מועט של מטופלים ולמדתי יוגה. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 533 | לא היה לי חזון ברור מה אני רוצה, רק ידעתי שאני רוצה לצמוח ושיש לי מה לתת לעולם מעבר למה שאני נותנת. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 534 | האמת שלא חששתי מהתהליך איתך כי הקסמת אותי בידיעותיך והאמנת בי מאוד, הרבה יותר ממה שהאמנתי על עצמי. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 535 | הרבה יותר. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 536 | החזון שלך לגביי היה ברור לך וידוע לך. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 537 | אני לא האמנתי שבאמת אצליח להגשים את גישת אורלב: להנות מקליניקה פוריה, טיפולים רבים, סדנאות ועוד. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 538 | התוצאות שחוויתי מדהימות! | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 539 | כיום יש גישה ואפילו שיטה. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 540 | אני מחוברת לשם ולחזון שראית. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 541 | כיום זו מי שאני ורק רוצה עוד ועוד. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 542 | ידעת לנתב בצורה מדהימה את הספינה הזו. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 543 | הייתי מתארת את החוויה כמעצימה והכרחית לפיתוח עסק. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 544 | כיום איני יכולה לראות את עצמי צולחת לבדי את הדרך העסקית שלי. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 545 | התמיכה הזו שלך והאמונה שלך בי מאפשרות לי ולעסק לגדול ולהתפתח. | `mockup_extras.testimonials_over_cap[0].quote` | `testimonials[3].text` | sourced |
| 546 | רננה אורלב | `mockup_extras.testimonials_over_cap[0].author` | `testimonials[3].author` | sourced |
| 547 | מפתחת גישת אורלב לליווי וריפוי רוחני. | `mockup_extras.testimonials_over_cap[0].role` | `testimonials[3].role` | sourced |
| 548 | Before we started the process I didn't really know in which direction to continue. | `mockup_extras.testimonials_over_cap[1].quote` | `testimonials[4].text` | sourced |
| 549 | I was without a real direction. | `mockup_extras.testimonials_over_cap[1].quote` | `testimonials[4].text` | sourced |
| 550 | Concerts regarding the process itself were maybe that I was afraid that I can't express myself in a way to be fully understood. | `mockup_extras.testimonials_over_cap[1].quote` | `testimonials[4].text` | sourced |
| 551 | Results: | `mockup_extras.testimonials_over_cap[1].quote` | `testimonials[4].text` | sourced |
| 552 | I have a brand name I love and really can identify with.I know my direction and my goals. | `mockup_extras.testimonials_over_cap[1].quote` | `testimonials[4].text` | sourced |
| 553 | I got stronger in my decision to have a sustainable brand. | `mockup_extras.testimonials_over_cap[1].quote` | `testimonials[4].text` | sourced |
| 554 | My values and the direction I am heading to become much more clear. | `mockup_extras.testimonials_over_cap[1].quote` | `testimonials[4].text` | sourced |
| 555 | It took me a while till I started to implement all that I have learned. | `mockup_extras.testimonials_over_cap[1].quote` | `testimonials[4].text` | sourced |
| 556 | It needed to sink in I guess ;-) | `mockup_extras.testimonials_over_cap[1].quote` | `testimonials[4].text` | sourced |
| 557 | It was a lovely and very warm experience for me. | `mockup_extras.testimonials_over_cap[1].quote` | `testimonials[4].text` | sourced |
| 558 | I was actually looking forward in excitement to every meeting. | `mockup_extras.testimonials_over_cap[1].quote` | `testimonials[4].text` | sourced |
| 559 | Linda friedrich @ambartique | `mockup_extras.testimonials_over_cap[1].author` | `testimonials[4].author` | sourced |
