# humanizer notes — mutag-meitiv · he

Humanizer 0.2.0 · run 2026-10-il-brand-01 · 2026-10-18 · schema v0.11. Previous draft: `he.draft.json`.

## Scope

Shahar: the current site made better, not rewritten. Most of `he.json` is the client's own Hebrew
(`sources.md`, verbatim) and was **not touched**: tagline, featureLine, every copyBlock except intro p2,
all service bodies except two copywriter sentences, method stages, team, testimonials, awards, posts,
legal. Only copywriter-written or copywriter-edited lines were reworked, into Hadas's own register:
first person singular ("ניתן לקבוע איתי", "הכי זמינה בוואטסאפ"), plural address to readers
("רוצים גם? צרו קשר"), short and warm.

## What changed (16 fields)

| Field | Draft | Now | Why |
|---|---|---|---|
| `closing` | רוצה להתחיל? כתבו להדס בוואטסאפ, או קבעו שיחת הכרות בזום, ללא תשלום. | רוצה להתחיל? הכי זמינה בוואטסאפ. אפשר גם לקבוע איתי שיחת הכרות בזום, ללא תשלום. | Draft spoke of Hadas in the third person and mixed singular "רוצה" with plural imperatives. "הכי זמינה בוואטסאפ" is her own phrase from the current site. |
| `copyBlocks[0]` p2 | שני תהליכים מובילים, בשיטה אחת: מיתוג אישי לעסק ותכנון אסטרטגי למותג. | שני התהליכים המרכזיים כאן הם מיתוג אישי לעסק ותכנון אסטרטגי למותג, ושניהם נשענים על אותה שיטה. | Slogan-with-colon pattern; now a spoken sentence. |
| `method.intro` p1 | שיטה אחת בארבעה שלבים, לשני התהליכים המובילים: מיתוג אישי לעסק ותכנון אסטרטגי למותג. | מיתוג אישי לעסק ותכנון אסטרטגי למותג עוברים באותה שיטה, בארבעה שלבים. | Same colon move as the intro, repeated; shorter and plain. p2 (client's /process sentence) unchanged. |
| personal-branding body p14, sentence 1 | התהליך עובר בארבעת השלבים של השיטה: … | התהליך עובר דרך ארבעת שלבי השיטה: … | Smoother Hebrew; rest of the paragraph is the client's, unchanged. |
| business-to-brand body p20 | ההרשמה נסגרה. אפשר לכתוב להדס בוואטסאפ ולקבל עדכון על הקורס הבא. | ההרשמה נסגרה. רוצים לשמוע על הקורס הבא? כתבו לי בוואטסאפ. | Third person → her first person; mirrors her "רוצים גם? צרו קשר". |
| intro-workshop `summary` | הכרות עם מודל החשיבה המיתוגי brand the change, עם 2 כלי מיפוי אסטרטגיית מיתוג - קנבס 1 ו 2, ועם מקרי בוחן. | נכיר את מודל החשיבה המיתוגי של brand the change, נעבור על 2 כלי מיפוי לאסטרטגיית מיתוג (קנבס 1 ו-2) ונסתכל יחד על מקרי בוחן. | Three joined bullet lines read as a list ("עם… עם… ועם"); now what happens in the room, same three items. |
| 10 × `services[].ctaText` | 9 of 11 were "היי הדס, אשמח לשמוע על …" | varied per offer (see below) | Same template on every row. Each still names its offer. Where no date is published (every offer), the message asks for the next date instead of assuming one. community-meetups kept as it was. |

ctaText now:
- personal-branding: היי הדס, הגעתי מהאתר. אשמח לשמוע איך עובד אצלך תהליך מיתוג אישי לעסק.
- strategic-planning: היי הדס, הגעתי מהאתר. מעניין אותי תכנון אסטרטגי למותג, אפשר לשמוע פרטים?
- brands-of-change: היי הדס, אשמח לפרטים על הזמנת ההרצאה BRANDS OF CHANGE.
- therapists-retreat: היי הדס, ראיתי באתר את ריטריט היום ״לחשוב כמו מותג (מיטיב)״ ואשמח לשמוע עוד.
- the-better-4: היי הדס, אשמח לשמוע על סדנת החזון THE BETTER 4. מתי היא מתקיימת?
- brand-and-breakfast: היי הדס, מתי סדנת ה-Brand & Breakfast הבאה? אשמח לפרטים.
- intro-workshop: היי הדס, אשמח להירשם לסדנת ההכרות. מתי הסדנה הבאה?
- community-meetups: unchanged (היי הדס, ספרי לי עוד על מפגשי הקהילה ״עסקים ומיטיבים״.)
- btc-professionals: היי הדס, אשמח לפרטים על ההשתלמות בשיטת Brand the Change. מתי נפתח המחזור הבא?
- change-leaders-course: היי הדס, אני רוצה לשמוע על הקורס למובילי שינוי. יש מחזור קרוב?
- business-to-brand: היי הדס, ראיתי שההרשמה ל״מעסק למותג מיטיב״ נסגרה. אשמח לעדכון כשייפתח המחזור הבא.

All new strings are within caps (closing ≤ 140, summary ≤ 200, ctaText ≤ 200, method.intro ≤ 600). `sources.md` updated for every changed line.

## Left as they are, on purpose

- Qualified titles "מיתוג אישי לעסק" / "תכנון אסטרטגי למותג": natural Hebrew, and fixed by direction (search terms).
- strategic-planning p5 "התהליך כולל ארבעה שלבים: …": the client's own sentence with only the count changed; closest to her voice.
- bookingLinks label "שיחת הכרות בזום, ללא תשלום": her words.
- Group headings "הרצאות וסדנאות", "קורסים": plain labels.
- Demo case study: the Hebrew is clean and unforced; no change.
- Testimonials, quotes, every client-verbatim paragraph.

## Fact check

Field-by-field diff of draft vs now: 16 string fields changed, none added or removed. No new fact: WhatsApp,
the free Zoom intro call, closed registration, the two lead services, one 4-stage method, the intro
workshop's three items are all as in the draft. The date questions in ctaText assert nothing (no offer has a
published date, `gaps[]`).

## For the owner / copyeditor (could not fix without touching her words)

- btc-professionals title "השתלמות מקצועית לאנשי מקצוע" repeats "מקצוע"; it is her label split at the dash. A shorter title is her call.
- `method.intro` p2 "מתודולוגית" (→ "מתודולוגיית" in full spelling) is her wording, kept.
- The client-typo list in `sources.md` stands; none was fixed here.

## Round 2 (copyeditor review.md round 2, V1) — 2026-10-18

Draft for this round kept as `he.draft.json` (it now holds the copywriter's round-2 file).

| Field | Draft | Now | Why |
|---|---|---|---|
| strategic-planning `summary` | בניית אסטרטגיה עסקית ומיתוגית: מיתוג חדש או ריברנד - לבנות אירגון מצליח שגם מיטיב עם העולם דרך תכנון אסטרטגיית מותג מיטיב. | מיתוג חדש או ריברנד - לבנות אירגון מצליח שגם מיטיב עם העולם דרך תכנון אסטרטגיית מותג מיטיב. בניית אסטרטגיה עסקית ומיתוג, יחד. | V1: a keyword label and colon glued before her card line, with "מיתוגית" next to "מיתוג". Her sentence now leads, verbatim; the business qualifier ("בניית אסטרטגיה עסקית", C-audience-03) follows as a short closing fragment. 125 chars ≤ 200. No fact added: strategy and branding are both what `/process` sells (R2). |

Glanced, unchanged: R3 `credentials[0].label` (plain and concrete) and R5 `copyBlocks[4]` p2 "רוצים להתחיל בצעד קטן? …" (her plural address; "ההכרות" twice is the two offers' own names). Neither is clearly unnatural.

## Round 4 (copyeditor review.md round 4, H1–H3; `mockup_extras.series2_organisations` only) — 2026-10-18

Draft for this round kept as `he.draft.json`. Series-1 fields untouched. First screen = tagline option + intro block, so each search phrase is said once there: "מיתוג לעמותות" (tagline[0]) / "אסטרטגיות מותג" (tagline[1]), "מעבר לשורת הרווח" (intro p1 only), "הרצאה בארגון" and "סדנה לצוות" (intro p2 only). The `path` block below names the offers again on its own screen.

| Field | Draft | Now | Fix |
|---|---|---|---|
| `tagline_options[1]` | אסטרטגיית מותג, הרצאות לארגונים וסדנה לצוות, למי שהמשמעות חשובה לו מעבר לשורת הרווח. | כאן מפתחים אסטרטגיות מותג עם משמעות, גם לארגונים. | H2: no three-item list; her own tagline plus "גם לארגונים". "מעבר לשורת הרווח" was also in intro p1 on the same screen. |
| `intro.body` p2 | מיתוג חדש או ריברנד לעמותה ולארגון, הרצאות לארגונים וסדנה לצוות: הכל במקום אחד. | אפשר להתחיל ממיתוג חדש או מריברנד, ואפשר גם להזמין אותי להרצאה בארגון או לסדנה לצוות. | H1/H2: no list-colon, no "הכל במקום אחד", no singular form-label "לעמותה ולארגון"; first person. |
| `path.ctaText` | היי הדס, אני פונה בשם ארגון. אשמח לשמוע על הרצאה, סדנה לצוות או תכנון אסטרטגי למותג. | היי הדס, אני פונה בשם ארגון. אשמח לדבר על מה שיכול להתאים לנו. | H2: the list was the third repeat; the path block already names the offers. Asserts nothing. |
| `proof.talks[2]` | בתוכנית פסטיבל קיימות ואנשים 3 (2025): הרצאה שלי על תהליך האסטרטגיה של איזור התעשיה המתחדש במעיין צבי. | ב-2025 נכללה בתוכנית פסטיבל קיימות ואנשים 3 הרצאה שלי על תהליך האסטרטגיה של איזור התעשיה המתחדש במעיין צבי. | H3: same year-first sentence form as talks[0–1]; still only "on the programme", not that it took place. |

No new facts (the dropped list items stay in intro p2 and `path`); caps: tagline 49/140, intro body 200/1500, ctaText 62/200.
Not changed (not in H1–H3): `intro.heading` "לעמותות, לארגונים ולצוותים" and the label-colon rows in `path.body` p1–p3, which read as list rows in an offers block. Copyeditor may flag them if the design runs them as prose.
