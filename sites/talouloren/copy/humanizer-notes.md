# humanizer notes — talouloren · he + en

Humanizer 0.2.1 · run 2026-11-il-brand-02 · 2026-11-02. Drafts kept as `he.draft.json` / `en.draft.json` (unchanged copies of the copywriter 0.5.0 files).

## Summary

- he: 12 strings changed. en: 11 strings changed (wella what-we-did had the tell in he only).
- Main tells: list-colon labels (tell 10), fragment triads on /work (tells 1, 11), mirrored or repeated sentence shapes (tell 4), labels repeated on one screen (tell 11).
- Each locale was rewritten in its own cadence. The en lines are not translations of the new he lines (e.g. copyBlocks[3] p1 en "is mostly just beautiful", amt "somewhere along the way").
- Facts: the same set in both files, checked field by field (the script asserted each old value before replacing it). No fact moved between fields. `sources.md` changes one quoted cell: copyBlocks[3] p1.
- Untouched: fixed names, the approved hero lines and eyebrow, "אתם לא לבד. נשימה.", every `{placeholder}`, video labels, ids, URLs, numbers, `extras.msg.*`, seo.*. Address stays plural (אתם) or neutral everywhere.
- No `!`, no em dash, in either file.

## Tell counts (both files, prose fields)

| Tell | Before he / en | After he / en |
|---|---|---|
| 10 · colon in prose (all, regex count) | 37 / 35 | 30 / 29 |
| 10 · label or list colon that was fixable | 7 / 6 | 0 / 0 |
| 1 · fragment triads on /work what-we-did | 4 (wella p1, eugene p2, visa-cal, amt) | 2 (wella p1, visa-cal: the items are the facts) |
| 4 · FAQ answers opening "כן." / "Yes." | 4 of 6 | 3 of 6 |
| 4 · mirrored or repeated sentence shapes | 4 | 0 |
| 11 · same list twice on one screen | 1 (/work intro vs case_sections) | 0 |
| em dash · `!` | 0 · 0 | 0 · 0 |

Remaining colons are left on purpose: content lists after a colon (snapshot contents, the ladder, the craft list), titles (`Maccabi: People of Light`, `Know, Like, Trust: מסע הלקוח`), the NBC credit note, and `msg.*` / seo lines.

## Changes (old → new, by JSON path)

### he

**`copyBlocks[3].body`** · Tell 4 (mirrored chiasmus "X without Y… Y without X") and "מי שיבנה אותו" repeated from the heading; tell 4 again in p2 (two identical "X מביא את…" list sentences). p2 now varies the verb and splits the lists; same items, same people.

- old: סיפור בלי מי שיבנה אותו נשאר על הנייר. אתר יפה בלי סיפור לא אומר כלום. ¶ טל מביא את הסיפור, האסטרטגיה, הליווי וההפקה. שחר מביא את הזהות, האתר, המוצר, המושן והאוטומציה עם AI. ביחד נדייק את החזון שלכם.
- new: סיפור שאף אחד לא בונה נשאר על הנייר. ואתר יפה בלי סיפור הוא בעיקר יפה. ¶ טל מביא את הסיפור ואת האסטרטגיה, מלווה ומפיק. שחר אחראי על הזהות, האתר והמוצר, וגם על המושן ועל האוטומציה עם AI. ביחד נדייק את החזון שלכם.

**`services[4].summary`** · Tell 10: keyword label + colon in front of the sentence.

- old: המסלול המרכזי שלנו: מערכת לשיווק, למכירות ולתפעול, שנבנית לפי העסק שלכם.
- new: המסלול המרכזי שלנו. בונים מערכת לשיווק, למכירות ולתפעול, לפי העסק שלכם.

**`services[5].summary`** · Tell 10: label + colon. Now a question, the brief's direct voice.

- old: למי שרוצים להתחיל לבד: השיטה כולה, בשיעורים מוקלטים.
- new: רוצים להתחיל לבד? השיטה כולה נמצאת בשיעורים מוקלטים.

**`caseStudies[6].challenge`** · Tell 4: same "noun phrase, and the wish to…" shape as caseStudies[7].challenge. Now a plain sentence; the goal stays a goal.

- old: מערך יועצות היופי של קלווין קליין בישראל, והרצון להעצים את הדימוי שלהן.
- new: קלווין קליין רצו להעצים את הדימוי של יועצות היופי שלהם בישראל.

**`extras.pages.work.case_what_we_did.wella`** · Tell 10: "ובתוך החברה:" label colon (he only; en already used a comma).

- old: ליווי אסטרטגי שוטף של המנכ"ל ושל צוות השיווק, בחיבור לצוות המכירות. אסטרטגיה תחת הקונספט BACK TO WELLA, וניהול תקציב השיווק והמדיה. ¶ השקה חווייתית של סדרת מוצרים, שהחזירה הביתה לקוחות שהתרחקו. פורמטים חדשים למערך ההדרכה, ועיצוב מחדש של מארזי החג של הסדרה המובילה. נסיעה ליוון חיברה את הקהילה המקומית לקהילה הבינלאומית, ושירות צבע חדש יצא עם מהלך מכירות ארצי וקמפיין דיגיטלי. ובתוך החברה: הצוות התחבר לערכים המחודשים של המותג.
- new: ליווי אסטרטגי שוטף של המנכ"ל ושל צוות השיווק, בחיבור לצוות המכירות. אסטרטגיה תחת הקונספט BACK TO WELLA, וניהול תקציב השיווק והמדיה. ¶ השקה חווייתית של סדרת מוצרים, שהחזירה הביתה לקוחות שהתרחקו. פורמטים חדשים למערך ההדרכה, ועיצוב מחדש של מארזי החג של הסדרה המובילה. נסיעה ליוון חיברה את הקהילה המקומית לקהילה הבינלאומית, ושירות צבע חדש יצא עם מהלך מכירות ארצי וקמפיין דיגיטלי. ובתוך החברה, הצוות התחבר לערכים המחודשים של המותג.

**`extras.pages.work.case_what_we_did.eugene-perma`** · Tells 1 + 10: list-colon triad. Split into two sentences; same three items.

- old: מחקר ואפיון אסטרטגי, ופיצוח קריאטיבי. משם יצא הקמפיין BLONDE MASTER, שקרא למעצבי שיער מכל הארץ לבוא ולהיות מומחי הבלונד של ישראל. ¶ לצד הקמפיין: מערך הדרכות שמלמד טכניקות מקצועיות חדשות, קהילה של מעצבי שיער שרוצים להיות חלק ממנה, ומיצוב מחדש של המותג ושל הצוות שלו.
- new: מחקר ואפיון אסטרטגי, ופיצוח קריאטיבי. משם יצא הקמפיין BLONDE MASTER, שקרא למעצבי שיער מכל הארץ לבוא ולהיות מומחי הבלונד של ישראל. ¶ לצד הקמפיין נבנה מערך הדרכות שמלמד טכניקות מקצועיות חדשות, וקמה קהילה של מעצבי שיער שרוצים להיות חלק ממנה. גם המותג והצוות שלו קיבלו מיצוב מחדש.

**`extras.pages.work.case_what_we_did.visa-cal`** · Tell 10: list-colon. Colon removed; the three items are the facts, so the list stays (no order implied).

- old: סדנה למצליחנות: הרצאה, עמדת צילום מעצימה לעובדים, וסדנת תנועה עם כוריאוגרפית.
- new: בסדנה למצליחנות היו הרצאה, עמדת צילום מעצימה לעובדים וגם סדנת תנועה עם כוריאוגרפית.

**`extras.pages.work.case_what_we_did.amt`** · Tells 1 + 11: fourth fragment triad in a row on /work. Now sentences with a subject; same three items plus the change.

- old: מחקר ואפיון, ליווי אישי של היזם, וסרטוני תדמית שהותאמו לפלטפורמות השיווק. ולאורך הדרך, שינוי באופן שבו העסק חושב ומתנהל.
- new: עשינו מחקר ואפיון, וליווינו את היזם באופן אישי. סרטוני התדמית הותאמו לכל פלטפורמת שיווק. ולאורך הדרך השתנה גם האופן שבו העסק חושב ומתנהל.

**`extras.home.faq.items[3].a`** · Tell 4: four of six FAQ answers opened "כן." / "Yes."; this one answers without it.

- old: כן. בשביל זה יש את הקורס BRAND YOURSELF.
- new: בשביל זה יש את הקורס BRAND YOURSELF.

**`extras.pages.work.intro`** · Tell 11: "where they were, what we did, what changed" repeats the case_sections labels on the same screen; label colon. Categories kept (also the filter labels).

- old: ארגונים, יזמים ומותגים. בכל סיפור: איפה הם היו, מה עשינו, ומה השתנה.
- new: ארגונים, יזמים ומותגים. כל סיפור מתחיל איפה שהם היו, ונגמר במה שהשתנה.

**`extras.pages.watch.series[3].line`** · Tell 4: "אחד" closing three of six series lines ("one pain", "one question", "one client, one change").

- old: לקוח אחד, שינוי אחד.
- new: לקוח, ומה השתנה אצלו.

**`newsletter.label`** · Tells 1 + 10: label colon + triad. "and" → "or": each letter carries one idea (framing, as before; owner to confirm).

- old: מכתב קצר לבעלי עסקים: רעיון אחד בכל פעם, על סיפור, נראות וצמיחה.
- new: מכתב קצר לבעלי עסקים, ובכל פעם רעיון אחד על סיפור, נראות או צמיחה.

### en

**`copyBlocks[3].body`** · Tell 4 (mirrored chiasmus "X without Y… Y without X") and "מי שיבנה אותו" repeated from the heading; tell 4 again in p2 (two identical "X מביא את…" list sentences). p2 now varies the verb and splits the lists; same items, same people.

- old: A story nobody builds stays on paper. A beautiful website with no story says nothing. ¶ Tal brings the story, the strategy, the mentoring and the production. Shahar brings the identity, the website, the product, the motion and the AI automation. Together we sharpen your vision.
- new: A story nobody builds stays on paper. And a beautiful website with no story is mostly just beautiful. ¶ Tal brings the story and the strategy, and he mentors and produces. Shahar takes the identity, the website and the product, plus the motion and the AI automation. Together we sharpen your vision.

**`services[4].summary`** · Tell 10: keyword label + colon in front of the sentence.

- old: Our flagship: a system for marketing, sales and operations, built around your business.
- new: Our flagship. We build a system for marketing, sales and operations around your business.

**`services[5].summary`** · Tell 10: label + colon. Now a question, the brief's direct voice.

- old: For those who'd rather start on their own: the whole method, in recorded lessons.
- new: Rather start on your own? The whole method is there in recorded lessons.

**`caseStudies[6].challenge`** · Tell 4: same "noun phrase, and the wish to…" shape as caseStudies[7].challenge. Now a plain sentence; the goal stays a goal.

- old: Calvin Klein's team of beauty advisors in Israel, and the wish to lift how they are seen.
- new: Calvin Klein wanted to lift how its beauty advisors in Israel are seen.

**`extras.pages.work.case_what_we_did.eugene-perma`** · Tells 1 + 10: list-colon triad. Split into two sentences; same three items.

- old: Strategic research and positioning, then the creative idea. Out of it came the BLONDE MASTER campaign, which called hairdressers from across the country to become Israel's blonde experts. ¶ Alongside the campaign: a training programme teaching new professional techniques, a community of hairdressers who wanted to be part of it, and a new position for the brand and its team.
- new: Strategic research and positioning, then the creative idea. Out of it came the BLONDE MASTER campaign, which called hairdressers from across the country to become Israel's blonde experts. ¶ Alongside it we set up a training programme teaching new professional techniques, and a community grew of hairdressers who wanted to be part of it. The brand and its team got a new position too.

**`extras.pages.work.case_what_we_did.visa-cal`** · Tell 10: list-colon. Colon removed; the three items are the facts, so the list stays (no order implied).

- old: A workshop on success: a talk, an empowering photo booth for the employees, and a movement session with a choreographer.
- new: The success workshop had a talk, an empowering photo booth for the employees and a movement session with a choreographer.

**`extras.pages.work.case_what_we_did.amt`** · Tells 1 + 11: fourth fragment triad in a row on /work. Now sentences with a subject; same three items plus the change.

- old: Research and positioning, personal mentoring for the entrepreneur, and brand films adapted to each marketing platform. And along the way, a change in how the business thinks and runs.
- new: We did the research and positioning, and mentored the entrepreneur one to one. The brand films were adapted to each marketing platform. And somewhere along the way, how the business thinks and runs changed too.

**`extras.home.faq.items[3].a`** · Tell 4: four of six FAQ answers opened "כן." / "Yes."; this one answers without it.

- old: Yes. That's what the BRAND YOURSELF course is for.
- new: That's what the BRAND YOURSELF course is for.

**`extras.pages.work.intro`** · Tell 11: "where they were, what we did, what changed" repeats the case_sections labels on the same screen; label colon. Categories kept (also the filter labels).

- old: Organisations, entrepreneurs and brands. Each story in three parts: where they were, what we did, and what changed.
- new: Organisations, entrepreneurs, brands. Each story starts where they were and ends with what changed.

**`extras.pages.watch.series[3].line`** · Tell 4: "אחד" closing three of six series lines ("one pain", "one question", "one client, one change").

- old: One client, one change.
- new: A client, and what changed for them.

**`newsletter.label`** · Tells 1 + 10: label colon + triad. "and" → "or": each letter carries one idea (framing, as before; owner to confirm).

- old: A short letter for business owners: one idea at a time, on story, visibility and growth.
- new: A short letter for business owners, each one carrying a single idea about story, visibility or growth.

## Left alone on purpose

- copyBlocks[1] (the five pains, one line each): an even rhythm here is the mirror device of the section, and each line is one sourced pain.
- copyBlocks[2] "…לפי הסדר: בהירות, תנועה, תשומת לב, משיכה, מודעות": the colon introduces the fixed ladder words in order; any other form hides the order.
- extras.pages.brands.pain "יש תקציב, יש משרדי פרסום, ועדיין…": a triad that works as speech, and the turn on the third beat is the point.
- extras.home.how.step3_body lists Story, Launch, Partnership: the three paths are the content of that step.
- story / launch `end_heading` identical: different pages, same question, by design.

## Clumsy for lack of a fact (owner list)

- extras.pages.work.voices_intro "sales rise by hundreds of percent": sourced (`d.confirmed_cases[4]`) but reads close to a promised return. A named client, a date or a single case would make it credible; none is in the dossier. Not changed.
- caseStudies[6] / [7] challenges stay thin (a goal, no situation): the old pages give no "before" for CK or Cal.
- caseStudies[9] Rita outcome "קליפ יוצא דופן, וחשיפה גדולה" is vague: no view count or channel is sourced.
- newsletter.label: topics and "one idea each" are framing; frequency unknown.
- Same placeholders as the copywriter left: four confirmed case stories, Doron Shefer's outcome, prices, session length, capacity, turnaround, Check minutes.
