# copy sources — mutag-meitiv · he

Copywriter 0.3.4 · run 2026-10-il-brand-01 (inbound, live) · 2026-10-18 · schema v0.11. Facts from `dossier/mutag-meitiv/dossier.json` only; `audit.json` `recommended` used for how to sell (CTA, order, closing intent), never as a fact. The demo case study is from `brief/mutag-meitiv/demo-case-study.he.md` (invented, `demo: true`; not a dossier fact).

**Owner-prose case, scope "the current site, better and a bit more focused" (brief 17, 19).** Every paragraph below is the client's own Hebrew from `pages[<path>].text` (or the dossier field named), **verbatim** unless the line says **EDIT**. Edits are only of these kinds, as instructed: (a) a long paragraph split into short ones (marked *split*; words unchanged, line breaks/bullets become paragraph or line breaks); (b) the two leading services named in qualified form; (c) the one 4-stage method stated consistently; (d) stale or contradictory bits fixed or dropped; (e) WhatsApp as the primary action. Client typos are kept verbatim and listed at the end for the owner/copyeditor (not fixed: not in a–e).

**Round 2 (2026-10-18)**: fixes for copyeditor round 1 (`review.md` F1–F5, N2) and research R2–R5, applied to the humanised `he.json` (the humanizer's 16 strings kept). Caps are v0.11's for `brand_practice`: testimonials ≤ 1000, `copyBlocks` ≤ 16. Rows below describe the round-2 text.

`p[n]` = paragraph n (1-based) of that field's `body`, paragraphs separated by a blank line.

## Top-level fields

| Field | Copy | Rests on |
|---|---|---|
| `businessName` | מותג מיטיב | `business.name` |
| `businessType` | `brand_practice` | `businessType` (draft pack row, proposal 001) |
| `languages` | `["he"]` | `languages.site` (brief 11) |
| `tagline` | כאן מפתחים אסטרטגיות מותג עם משמעות. | `business.tagline` (home hero), verbatim |
| `featureLine` | ״להתנהל מתוך משמעות, לפעול ליצירת רווחה לעסק, ללקוחותיי, לסביבה ולחברה״ | `business.motto`, verbatim; the layout line break removed. Its home heading "כלים לבניית עסק מיטיב" is in `mockup_extras.homeToolsHeading` |
| `closing` | רוצה להתחיל? הכי זמינה בוואטסאפ. אפשר גם לקבוע איתי שיחת הכרות בזום, ללא תשלום. | **EDIT (e), written**: `audit.recommended.closing_intent` (task); humanizer: in the owner’s first person, "הכי זמינה בוואטסאפ" is her own phrase (`pages[/brandandbreakfast]`). Facts: `contact.whatsapp`, `contact.scheduler` "שיחת הכרות בzoom (ללא תשלום)" |
| `contact.phone` / `.whatsapp` | +972546686808 | `contact.phone`, `contact.whatsapp`, `contact.whatsapp_client` (brief 18) |
| `contact.email` | hadas@kapara.com | `contact.email` (on the former studio's domain — `gaps[]` contact.email_domain, owner item) |
| `contact.address` / `.mapUrl` | null | `contact.address` gap: no address published (online + venues). No Google listing in the dossier (`reviews.google` gap) — nothing to apply the address rule to |
| `bookingLinks[0]` | "שיחת הכרות בזום, ללא תשלום" → calendly.com/hadas/30min | `booking.engine_url`, `contact.scheduler`. Secondary to WhatsApp (`booking.path`, brief 15) |
| `openingHours`, `hoursNote` | empty | `hours_note` gap (appointment-based) |
| `priceList` | `[]` | prices live in `services[]` ("Offers are one list") |
| `ratings` | `[]` | `reviews`: no review platform; Apple Podcasts 0 ratings — not shown |
| `spot`, `season`, `amenities` | empty | not this type |
| `languagesSpoken` | `[]` | not in the dossier (v0.11 now allows `he`; nothing sources which languages she serves in) |

## `copyBlocks[]` (10 of 16)

| Row · para | Rests on |
|---|---|
| [0] intro · heading "הי, הגעת למקום מיטיב!" | `pages[/].text` line 1, verbatim |
| [0] p1 "ליווי ופיתוח אסטרטגי לעסקים עם משמעות." | `business.tagline_alt[1]` (home `<title>`), verbatim + full stop |
| [0] p2 "שני התהליכים המרכזיים כאן הם מיתוג אישי לעסק ותכנון אסטרטגי למותג." | **EDIT (b), written**: `services[].client_leading` (brief 12). Round 2 (F3): the clause "ושניהם נשענים על אותה שיטה" removed — the one-method fact is stated once, in `method.intro` p1 |
| [1] about · heading "כל סיפור טוב מתחיל מקונפליקט... אז הנה הסיפור שלי" | `pages[/about].text` line 1 |
| [1] p1–p5 | `pages[/about].text` lines 2–7, *split*; p5 joins the two short lines "את הפתגם…" + "משם החל…" |
| [2] about · heading "רגע של אגו בריא" | **EDIT (a)**: a phrase from `pages[/about]` ("אני קוראת לזה - רגע של אגו בריא.") promoted to a heading for the split second half |
| [2] p1–p5 | `pages[/about].text` lines 8–15 and 16 (= `business.description`), *split*. Not used: "הכרות עם תהליך העבודה" (a link label), "תודה שקפצת לבקר…/מגזין" (→ `newsletter`), the closing English quote (already in p5 of [1] in Hebrew) |
| [3] offer · heading "הרצאות וסדנאות" | **EDIT (d)**: group name per direction must-do 10 (brief 19); the old home card title was "הדרכות והרצאות" |
| [3] p1 | home card text "הדרכות צוות והרצאות…" (`pages[/]`), verbatim (line break → comma) |
| [3] p2 | `pages[/סדנאות-והרצאות]` lines 1–3, joined, verbatim |
| [4] offer · heading "קורסים" | **EDIT (d)**: group name per direction must-do 10; home card title was "קורסים וסדנאות" |
| [4] p1 | home card text "קורסים, ימי עיון ועוד…" (`pages[/]`), verbatim + full stop |
| [4] p2 "רוצים להתחיל בצעד קטן? סדנת ההכרות ושיחת ההכרות בזום הן ללא תשלום." | **EDIT, written (research R5)**: a pointer to the two free first steps, `offers[4].price_text` "מחיר: חינם" and `contact.scheduler` "שיחת הכרות בzoom (ללא תשלום)". It names the offers; their content stays in `services[intro-workshop]` and `bookingLinks[0]`. `mockup_extras.freeFirstSteps` tells the template |
| [4] p3 "WE ARE NEVER TOO SMALL TO MAKE AN IMPACT" | `pages[/סדנאות-והרצאות]`, verbatim (client's English slogan) |
| [5] info · heading "צוות עם משמעות", p1–p2 | `team_section.heading`, `team_section.intro`, *split* |
| [6] info · heading "ON AIR — על א.נשים, עסקים ומשמעות" | `podcast.home_block` lines 1–2 joined |
| [6] p1 | `podcast.home_block` line 3 / `podcast.description` |
| [6] p2 | `podcast.description` line 2, verbatim + full stop |
| [6] p3 | `pages[/podcastbestchapters]` "ביום כדור הארץ 2022…" + "המטרה: …", verbatim |
| [6] p4 | `pages[/podcastbestchapters]` "נדבר על: …", verbatim |
| [6] p5 "רוצים גם? צרו קשר" | `podcast.home_block` line 4 |
| [7] info · heading "הפודקאסט הזה לא התחיל בקלות..." | Round 2 (F2): `pages[/podcastbestchapters]` line 1 (= `podcast.story`) |
| [7] p1–p6 | `pages[/podcastbestchapters]` lines 2–10 (the choir story), verbatim, *split*; "קול א׳ / קול ב׳" kept as lines |
| [8] info · heading "הפרקים הכי נשמעים בפודקאסט" | Round 2 (F2): `pages[/podcastbestchapters]` subheading |
| [8] body | `podcast.most_listened_on_site.value`, the 5 titles, one per line, verbatim. Their descriptions are not repeated: the build reads each episode's description from `podcast.feedUrl` (they match the feed's) |
| [9] info · heading "פה יוצרים קשר", p1–p2 | `contact.contact_form` (`pages[/contact]`), *split*. The form field "נא לציין את נושא הפנייה" is not copy (no form on our pages, playbook §5) |

Cap re-check (F2): no paragraph is now left out for the `copyBlocks` cap. Still not used, for reasons other than a cap: the link label and newsletter invite on /about (→ `newsletter`), the English "The only way out is in" (its Hebrew is in [1] p5), the contact form field, the founder-bio variants on /smst and /brandandbreakfast ("יזמת אופטימית… ביישנית מצליחה/מוצלחת", "לאחר מעל עשור…" — one bio per person in `team[0]`; owner may prefer one of them), the `/podcastbestchapters` episode descriptions (in the feed), and the stale/duplicate pages (`/support-us`, `/register`, `copy-of-*`, `/service-page/…`).

## `services[]` — lead

| Row · field | Rests on |
|---|---|
| personal-branding · `title` "מיתוג אישי לעסק" | **EDIT (b)**: `services[0].name` "מיתוג אישי" qualified per direction (C-audience-01..03) |
| · `summary` | `services[0].card_text`, verbatim (line break removed) |
| · `format` "ליווי אישי 1:1" | `services[0].format` |
| · `audience` | `team[0].bio` "…לבעלי עסקים המחברים משמעות למשימת היזמות והעסק שלהם" |
| · `ctaText` | **EDIT (e), written**: `contact.whatsapp`; names the offer |
| · `bookingUrl` | `services[0].cta` / `contact.scheduler` (calendly …/30min) |
| · price | omitted: `services[0].price` gap (brief 17: pricing out of scope) |
| · body p1–p2 | `pages[/personal101]` lines 1–2 |
| · p3 "איך עובד תהליך מיתוג אישי?" | page subheading, kept as its own paragraph (services `body` has no subheading markup — schema gap) |
| · p4–p6 | `pages[/personal101]` lines 4–6, *split* |
| · p7 | lines 7–11 (the four questions, = `method.value.four_questions`), verbatim, as line breaks |
| · p8 | line 12, verbatim |
| · — | **EDIT (d), dropped**: line 13 "מותג מיטיב היא הנציגה הישראלית של האירגון שכיום מתורגל ב 36 מדינות…, תורגם עד כה ל 6 שפות" — contradicts `/process` (40+ countries, 5 languages; `btc_reach_claims`, `gaps[]`), Owner to give one figure. Round 2 (R3): the representative claim is no longer stated anywhere; the verified credential is `credentials[0]` |
| · p9–p10 | page subheading "איך למצוא משמעות…" + "רגע לפני ה״איך״…" |
| · p11–p13 | lines "אין ספק…" + "מאז תחילת המלחמה…" (joined), "דעתי האישית…", "שאלות כמו…" |
| · p14 | **EDIT (c)**: first sentence written ("התהליך עובר דרך ארבעת שלבי השיטה: …") (the 4 stage names, `method.value.stages[].name`, brief 20); rest = `method.value.duration` / `services[0].duration`, verbatim. The stage texts themselves live in `method.stages[]` (described once) |
| · p15 | "ניתן לקבוע איתי שיחת הכרות בzoom (ללא תשלום)." — **EDIT (e)**: "בלחיצה על הכפתור" dropped (the button is the template's) |
| · p16 | `quotes_on_site[0]` (Kate Raworth), verbatim. Not used: "markus-spiske unsplash" (photo credit of a stock image) |
| strategic-planning · `title` "תכנון אסטרטגי למותג" | **EDIT (b)**: `services[1].name` "תכנון אסטרטגי" qualified |
| · `summary` | **EDIT (b), research R2**: prefix "בניית אסטרטגיה עסקית ומיתוגית: " (a business qualifier beside "תכנון אסטרטגי"; direction audience bullet 4, C-audience-03 — the search term "בניית אסטרטגיה עסקית"), then `services[1].card_text` line 2, verbatim (line 1 "BRAND THE CHANGE" is the card's label). Page `<title>`/meta: `mockup_extras.seoHeadHint` for the SEO station |
| · `audience` | `services[1].audience`, verbatim (typo "הרוות" kept — list below) |
| · `ctaText` | **EDIT (e), written** |
| · `bookingUrl` | `services[1].cta` (calendly.com/hadas) |
| · body p1 "עולם עסקי מיטיב" | `pages[/process]` H1, kept as opening line |
| · p2–p4 | `pages[/process]` paragraph 2, *split* into three |
| · p5 "התהליך כולל ארבעה שלבים: SENSING, THINKING, MAKING ו-INFLUENCING." | **EDIT (c)**: replaces "התהליך כולל שלושה שלבים:" + the three stage lines (`method.client`, brief 20); stage texts in `method.stages[]` |
| · p6 | "לפתוח את הראש…", verbatim + full stop |
| · p7 "כלי העבודה" | page subheading |
| · p8–p10 | `pages[/process]` "ההבדל…", "כדי להוביל…" (`business.experience_claim` "20 שנות…"), "Brand The Change הוא ארגון…", verbatim. Round 2 (F4): "בתהליך המיתוג אנו נשתמש במתודולוגית הקנבסים…" moved out: its one home is `method.intro` p2, in her words |
| · p11 | "האירגון הוקם על ידי אן מילטנברג…", verbatim + **EDIT (d)**: "הספר תורגם ל 5 שפות והמתודה מתורגלת ונלמדת מעל ל 40 מדינות ברחבי העולם ו" removed (contradiction, see above); the rest "מובלת על ידי קהילה ענפה…" kept, with "המתודה" as subject |
| · — | **Round 2 (R3), dropped**: "מותג מיטיב, היא הנציגה של אירגון BRAND THE CHANGE בישראל." (`credentials[1]`, the site's own wording, *not confirmed by BTC*). The verified fact is in `credentials[0]`. Owner question: is "the representative in Israel" accurate? If she confirms, it can return |
| · p12 | `quotes_on_site[2]`, verbatim (stray backtick removed) |

## `services[]` — talks_workshops and courses (the 9 secondary offers, brief 19)

Prices: `/סדנאות-והרצאות` values (instruction); Brand & Breakfast is not on that page, so its own page's single price is used. `status: ongoing`, `dates: []` for all: no offer has a current or future date (`offers_note`, `gaps[]` offers.*.date). (Round 2: business-to-brand is `status: full`, below.) Every `ctaText` is **EDIT (e), written** (WhatsApp prefilled line naming the offer); every `title` is the dossier `offers[].label` unless noted.

| Row · field | Rests on |
|---|---|
| brands-of-change · summary / body | `offers[0].text`, *split* after "מהפכה!" |
| · format / audience | `offers[0].format`, `offers[0].audience`. No price (`price_text` gap) |
| therapists-retreat · summary | `offers[1].subtitle` |
| · body p1–p3 | `offers[1].text`, *split*; its line "למי מיועד הקורס: …" → `audience` |
| · format / price | `offers[1].schedule`; 580 ILS per_person, VAT excluded (`offers[1].price_text`) |
| the-better-4 · summary | `pages[/smst]` "״ארבעת המיטיבים״ (The Better 4) היא מתודולוגיה…" |
| · body p1 | `/smst` "be the brand you want to see in the world" |
| · p2–p5 | `/smst` "האני מאמין…", "ברמה הביולוגית…", "בתקופה כזו…"+"כשהאיזון מופר…", "הסדנה נותנת דרור…", *split* |
| · p6 | Round 2 (F2): `/smst` "למי מיועדת הסדנה?" list, verbatim (leading "- " removed) |
| · p7 | `offers[2].includes` under "מה תקבלו מהסדנה:" (page said "מהקורס") |
| · p8 | `/smst` "עם מה אצא מהסדנה?" list, verbatim (stray rafe in "מנטליֿ" removed) |
| · audience / price | `offers[2].audience`; 480 ILS flat + VAT (`offers[2].price_text`). **EDIT (d)**: the 350 ש״ח of `/smst` (`price_conflict`), its 11:00–14:00 time and Noor-centre venue are dropped — undated, likely a past run. Owner to confirm. (Round 2: the `/smst` audience list is now body p6.) `/smst`'s "למי מיועדת הסדנה?" list not used (overlaps `audience`) |
| brand-and-breakfast · summary | `pages[/brandandbreakfast]` line 2 (= "אודות" line), verbatim |
| · body p1–p2 | "המצב שינה את כולנו…", *split* |
| · p3–p5 | `offers[3].text` + "הסדנה מחולקת…", "חלק א'…", "חלק ב'…" (layout line breaks joined) |
| · p6–p9 | "המתודה משלבת 4 חדרים…", "התהליך הוא מודרך…", "זה בשבילך אם…" (pipes → lines), "עם מה אצא…" |
| · p10 | Round 2 (F2): `/brandandbreakfast` "למי זה מיועד?" all three items, verbatim |
| · p11 | `offers[3].includes` + `booking.payment` sentence, verbatim |
| · format | `offers[3].capacity` + "סדנת בוקר … בת 3 שעות" (`offers[3].text`) |
| · audience | `/brandandbreakfast` "למי זה מיועד?" first item; the full list is body p10 |
| · price | 350 ILS per_person (`offers[3].price`; unit is the harvester's reading — confirm). No VAT wording (the page has none) |
| · — | **EDIT (d), dropped**: "יום שישי 15.5.26 10:00-13:00" (past) and "ותתקיים בזכרון יעקב" (that run's venue); "לשאלות נוספות, הכי זמינה בוואטסאפ - 0546686808" (replaced by the WhatsApp CTA, e). The sign-up form is not copy. Next date/venue: owner item |
| intro-workshop · summary | **EDIT (a)**: `offers[4].includes` three lines joined into one sentence (humanizer: as "נכיר… נעבור… ונסתכל…", same three items) |
| · audience / price | `offers[4].audience`; 0 ILS (`price_text` "חינם") |
| community-meetups · summary | `offers[5].text` line 1 |
| · body p1–p3 | `offers[5].text` lines 2–5, *split* ("אז רגע על הרעיון" joined to its sentence) |
| · p4 | `offers[5].audience`, all four lines |
| · audience | `offers[5].audience` line 1 (140 cap). No price, no date |
| btc-professionals · title / summary | **EDIT (a)**: `offers[6].label` split at "—": title "השתלמות מקצועית לאנשי מקצוע" (80 cap), summary "הכירו את מתודיקת העתיד…" |
| · body p1–p2 | `offers[6].audience`, `offers[6].includes`, verbatim |
| · audience | `offers[6].audience` first clause (140 cap) |
| · price | 5200 ILS flat + VAT. **EDIT (d)**: 2,850 ₪ of the stale Wix booking page (`price_conflict`) not used. "8 מפגשים" not stated: only on that stale page |
| change-leaders-course · title / format | `offers[7].label` split at "—"; format = its second half |
| · summary | `offers[7].includes` line 1 |
| · body p1–p3 | `offers[7].subtitle`; `includes` lines 2–5; line 6 |
| · audience / price | `offers[7].audience`; 3200 ILS flat + VAT |
| business-to-brand · title / summary | `offers[8].label` split at "—" |
| · format "9 מפגשים: 8 קבוצתיים ומפגש אישי אחד על אחד" | **EDIT (a)**: `offers[8].meetings` in words |
| · audience | `offers[8].audience` line 1 |
| · body p1–p6 | `pages[/newcourse]` "למי מיועד הקורס?" list, "למה זה חשוב?", three paragraphs, "בעקבות הקורס:" list, verbatim |
| · p7–p16 | "הסילבוס" + the 9 sessions (`offers[8].syllabus` with each session's text), verbatim |
| · p17–p18 | "מה מיוחד בקורס?" list; "כדי לעמוד בסערות…" + "הקורס ישפוך אור…" |
| · p19 | `offers[8].terms`, verbatim (spacing normalised) |
| · p20 "ההרשמה נסגרה. רוצים לשמוע על הקורס הבא? כתבו לי בוואטסאפ." | **EDIT (d)(e)**: `offers[8].status` "ההרשמה נסגרה — עדכני אותי על הקורס הבא"; the button led to a finished 2025 workshop's payment page (audit F4), so WhatsApp replaces it |
| · `status` `full` | **Round 2 (N2)**: registration is closed (`offers[8].status` "ההרשמה נסגרה"). v0.11 has no "closed" value; `full` is the closest (rendered, not hidden — `ended` would hide it, and brief 19 keeps all 9 offers). Schema gap: a `closed` status ("registration closed, next run to be announced") |
| · price | omitted: none on the live page; 2650 ₪ only on the stale duplicate (`price_conflict`) |
| · — | not used: the award sentence and founder bio on `/newcourse` (→ `awards[]`, `team[0]`), its testimonials (→ `testimonials[]`), "פה נרשמים / פה לכל שאלה" (buttons) |

## `method`

| Field | Rests on |
|---|---|
| `name` "מתודת ״מותג מיטיב״" | `/brandandbreakfast` "כך פותחה מתודת ״מותג מיטיב״"; `method.value.name` |
| `intro` p1 "מיתוג אישי לעסק ותכנון אסטרטגי למותג עוברים באותה שיטה, בארבעה שלבים." | **EDIT (b)(c), written**: `method.client` (brief 20), the two lead services |
| `intro` p1 | Round 2 (F3): the only statement that the two lead services share one 4-stage method |
| `intro` p2 | `pages[/process]` "בתהליך המיתוג אנו נשתמש במתודולוגית הקנבסים של BRAND THE CHANGE, מתורגמים לעברית", **verbatim** (round 2, F4: the tense change is undone, and the sentence is no longer in strategic-planning's body) + full stop |
| `stages[].label` | `method.value.stages[].name` |
| `stages[0–2].title` | `method.value.stages[].text_process` (the `/process` one-liners), verbatim minus the "Sensing –" prefix |
| `stages[3].title` | `stages[3].text_personal` line 1 (`/process` has no 4th stage) |
| `stages[].body` | `stages[].text_personal` (`/personal101`), *split*; SENSING ". ." fixed to "."; MAKING leading "*" removed; INFLUENCING without its line 1 (now the title) |

## `team[]` (founder first; owner adds/removes rows, brief 24)

| Row | Rests on |
|---|---|
| [0] הדס דרכלי | `team[0].name`, `.role`, `.founder`; `bio` = `team[0].bio`, *split*. `photo` dossier:img-001 (`must_have_check.founder_photo`) |
| [1] תמר דרכלי | `team[1]`, bio *split*; photo img-036 |
| [2] יעל שחר | `team[2]`, bio *split* (the Ophir award is her own claim on the site, unchecked); photo img-037 |
| [3] דנה רוסו | `team[3]`, bio *split*; role trailing full stop removed; photo img-038 |
| [4] ליאור ארסיני | `team[4]`; name as the heading spells it (bio says "אורסיני יעיש" — owner item). **EDIT**: bio 693 chars > 600 cap: sentences 1–2 and the last kept, verbatim; the middle sentence ("עבודתה משלבת… גיוס משאבים.") dropped — owner may choose differently. Photo img-039 |

## Proof

| Field | Rests on |
|---|---|
| `testimonials[]` (8) | all 8 `dossier.testimonials[]`, quotes **verbatim and untrimmed** (Renana's unclosed opening ״ and Linda's "Concerts" included), `author`/`role` as published (Linda has no role), `source: site`, `lang` from `.language` (brief 16). No dates (none published). Round 2 (F1): Renana Orlev (736) and Linda Friedrich (687) moved in from `mockup_extras` (v0.11 cap 1000). Order (research R4, outcome quotes first): אנווה רצון, Julia Dojas, Linda Friedrich (long, /newcourse), רננה אורלב, יובל אברהם, איה, קרן, AMBARTIQUE@לינדה (short, /personal101). **Linda's two quotes**: same author (dossier note), near-identical line ("I have a brand name I love and can really identify with" / "…and really can identify with"); both are on the current site, so both stay, neither merged nor edited; they are first-of-four and last in the order and `mockup_extras.testimonialsPlacement.never_adjacent` tells the template never to set them side by side |
| `awards[0]` | `award.value` (category עמותות, gold, ברטלי, 2022), `award.source_url`, `award.client` (brief 23); label per schema example; issuer "Brand Academy" (`award.value.organiser`); image dossier:img-040 (third-party mark, `gaps[]` images.license — needs Shahar's OK) |
| `credentials[0]` "מנחה מוסמכת של Brand the Change, היחידה מישראל ברשימת המנחים המוסמכים של הארגון" | **Round 2 (R3), written**: the verified fact — `credentials[0]` "Certified Brand the Change trainer" (brandthechange.org trainers page) and skeptic C-players-07 / C-position-10 (SURVIVE: exactly one Israel trainer, Hadas Drachli). Replaces the site's "ממתגת מוסמכת בשיטת…" (her bio wording, still verbatim in `team[0].bio`) |
| `clientLogos[]` (15) | `client_logos.images` img-044…058; names from each `images[].description` / alt. Third-party marks — Shahar's OK needed (`gaps[]`). Heading in `mockup_extras.clientLogosHeading` |
| `caseStudies[0]` | `brief/mutag-meitiv/demo-case-study.he.md`, every field exactly as written; `images: []` (the template shows "תמונה לדוגמה" frames), `beforeCount: 2`. Invented, `demo: true` (brief 28). No real case study: `gaps[]` case_studies (Bartali has an award but no material) |

## Content, channels, legal

| Field | Rests on |
|---|---|
| `socialLinks[]` | `contact.socials` instagram, linkedin, spotify, apple_podcasts. Facebook: gap (login wall). Linktree not listed (it is a hop, audit F16) |
| `instagramTiles[]` (12) | `instagram.posts[]` `url` + `image`, newest first (brief 22) |
| `podcast` | `title` "מותג מיטיב" (`team[0].bio_alt` "בעלת הפודקאסט ״מותג מיטיב״"; feed name `podcast.name`); `feedUrl` `podcast.feed`; links `podcast.spotify`, `contact.socials.apple_podcasts` |
| `newsletter.label` | `newsletter.value`, its three lines joined. `url` null: the Wix form has no provider we can point at — owner item; empty url = no block |
| `downloads[0]` | `lead_magnet.title` (label without "מתנה-" and ".pdf"), `lead_magnet.url` (the PDF to upload) |
| `legal.accessibilityStatement` p1–p4 | `pages[/הצהרת-נגישות]` paragraphs 1–4, verbatim; p1 **EDIT (d)**: the old Wix URL dropped ("האתר" instead) |
| p5–p6 | "החרגות" + its two sentences, joined |
| p7–p9 | "יצירת קשר בנושא נגישות", the request text and checklist ("לרכז" → "לרכזת", matching the page's own "רכזת נגישות"), closing sentence |
| — | **EDIT (d), dropped as untrue on the new site**: everything about the Vee overlay (vendor, how to open the accessibility icon, its function list, browsers), the "AA / Jaws / NVDA / fixes made" claims (they describe the Wix site; the new site's conformance must be stated after it is audited), and "תאריך עדכון 20-08-2025". Owner/critic item before go-live (IS 5568) |
| `legal.accessibilityContact` | `accessibility_statement.coordinator`, verbatim (phone formatted) |

## `posts[]` (65)

| Field | Rests on |
|---|---|
| `title`, `date`, `oldUrl` | `blog.posts[]` `.title`, `.published`, `.url`, all 66 harvested posts except the English one. The first title's truncation "(ואיך זה קשו" completed from `pages[/]` (home teaser): "(ואיך זה קשור למותג שלכם?)" |
| `slug` | the old `/post/<slug>`, lower-cased, `_` → `-`, characters outside the schema regex removed, cut to ≤ 80 at a hyphen (5 long Hebrew slugs cut; `__ubq` → `ubq`). `oldUrl` keeps the exact old path for the redirect. Three leftover Wix template slugs on Hebrew posts kept as-is (`tld-fm-radio-…`, `1000-meals-…`, `https-www-mutagmeitiv-com-post-b-corp`) — owner may rename; the redirect covers it |
| `excerpt` (8 posts) | `blog.posts[].summary` when ≤ 300 chars and not shared with another post; for 2026-04-22 the home teaser (`pages[/]`). Not set: summaries over 300 (7), the identical summary carried by 2026-03-22 and 2026-02-05 (a harvest copy, wrong for the women's-day post), and posts with none |
| `body` | **null for all 65 — gap**: the dossier has no post bodies (`blog.note`; only titles, dates, summaries). The posts need a body harvest before seeding (`body` is required) |
| excluded | `/post/corona-for-the-better-an-optimistic-analysis` (English; brief 11 "no English pages"): `mockup_extras.redirects_extra` → its Hebrew twin `קורונה-מיטיב-אנליזה-אופטימית` |
| `cover`, `categories` | not set: covers not harvested (`blog.note`, many are stock), per-post categories not in the dossier |

## `mockup_extras` (not schema fields)

| Key | Rests on |
|---|---|
| `homeToolsHeading` | `business.motto.note` heading "כלים לבניית עסק מיטיב" (goes with `featureLine`) |
| `footerCredits` | `footer.value` "צילום: יעל שחר", "תכשיטים מנייר ממוחזר: מינה בן נון". **EDIT (d)**: "@2019 This blog was created to be shared…" dropped; the year is the template's current year (audit F14). Schema gap: no credits field |
| `clientLogosHeading` | `client_logos.heading` |
| `testimonialsHeading` | `pages[/personal101]` "מיטיבים מספרים.ות" |
| `testimonialsPlacement` | Round 2 (R4, F1): outcome quotes beside the lead services, without labelling them as reviews of a named service (they speak of "the process with Hadas"; three come from the course page); Linda's two quotes never adjacent; איה and קרן with Brand & Breakfast (`testimonials[5–6].role`) |
| `freeFirstSteps` | Round 2 (R5): the price-0 intro workshop and `bookingLinks[0]` as the free first step; words in `copyBlocks[4]` p2 |
| `seoHeadHint` | Round 2 (R2): for the SEO station |
| `redirects_extra` | see posts |

Media values `dossier:<id>` (team photos, award badge, logos, Instagram tiles) are `dossier.images[]` ids for the deployer to upload; no other media is chosen here (the designer picks photos).

## Client typos kept verbatim (owner / copyeditor to decide)

- strategic-planning `audience` and body p4: "שורת הרוות" (→ הרווח).
- personal-branding p4: "ידוע שהדרך היא הרוח שמביאים…" (garbled); p5 "גילוי המהות נחוצה"; p8 "…אשר מובילים חשיבה מותגית אחרת רוצים…".
- business-to-brand: "לקמט את זה" (→ לכמת?), "מפגש follow up … שהספציפיים לך", "פגישה מיתוג".
- `testimonials` איה: "תודהֿֿ" (two stray rafe marks); רננה אורלב: unclosed opening ״; Linda (long): "Concerts" (sic).
- community-meetups p3: unmatched ")" after "האדם.ה".
- the-better-4 title mixes English and Hebrew as on the site.

## Gaps (what the owner must supply or decide)

1. Blog post bodies (all 65) — not harvested.
2. One BTC reach figure (36 countries / 6 languages vs 40+ / 5) — both dropped.
3. Next dates (and venue) for every workshop and course, Brand & Breakfast included; registration for "מעסק למותג מיטיב" is closed.
4. Prices: lead services (none, by scope); "מעסק למותג מיטיב"; Brand & Breakfast unit (per person?) and VAT; THE BETTER 4 per person or flat.
5. Newsletter provider URL; brand-domain email (kapara.com today).
6. Lior's bio trimmed to the `team[].bio` 600 cap (v0.11 did not raise it); Lior's surname spelling. Is "מותג מיטיב היא הנציגה של BRAND THE CHANGE בישראל" accurate (R3)?
7. Accessibility conformance text for the new site, after its audit.
8. Third-party marks (award seal, BTC badge, 15 client logos): Shahar's OK.
9. A real case study (Bartali is the obvious one) to replace the demo.
10. Schema gaps: no subheading markup in `services[].body`; no footer-credits / section-heading fields; no `closed` value in `services[].status` (N2); no field linking a testimonial to a service (R4, placement is a note). `copyBlocks` uses 10 of 16.
