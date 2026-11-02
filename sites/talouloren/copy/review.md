# copy review — talouloren · he + en

Copyeditor 0.4.2 · station 4c · **round 1** · run 2026-11-il-brand-02 (inbound, live) · 2026-11-02 · reviewed `he.json` + `en.json` (copywriter 0.5.0, humanizer 0.2.1) against `dossier/talouloren/dossier.json`, `brief/talouloren/brief.md` (A1–A24 over the body), `copy-terms.json`, `direction.md`, `industry/industry.md` + `skeptic.md`, `schemas/site-content.md` v0.11, `rubric.md`.

## Verdict: FAIL (round 1 of 2)

- Fact audit: **7 unsourced** and **4 contradicted** sentence-instances (6 distinct items, both locales counted separately), out of 706 audited (353 he + 353 en).
- Voice: 2 blocking items. Completeness: 1 blocking item (3 pages).
- Everything else is clean: no `!`, no em dash, no masculine-singular address, no promised returns or multiples, no Alvaro / Teddy Sagi / Sarit Hadad / Didi Harari, no old written quotes, no team or provider names, NBC worded as Shahar's *Pale Force* animation (Emmy not claimed), name "Talou L'oren" throughout, no street address, every undecided value a visible `{placeholder}` (70 per locale, identical sets).

### What must change to pass (blocking)

| ID | Field (locale) | Sentence | Verdict | Owner |
|---|---|---|---|---|
| H1 | `caseStudies[6].challenge` (he + en) | "קלווין קליין רצו להעצים את הדימוי של יועצות היופי שלהם בישראל." / "Calvin Klein wanted to lift how its beauty advisors in Israel are seen." | unsourced: the old case text gives the goal, not who wanted it, and its page names the Israeli client "שסטוביץ", not Calvin Klein. Added in the humanizer rewrite; the draft named no one who wanted it | humanizer |
| F2 | `extras.pages.work.case_what_we_did.doron-shefer` s2 (he + en) | "במקביל עבדנו על בניית האתר, על פאנלים שיווקיים, על הפיתוח העסקי ועל מדף המוצרים." / "At the same time we worked on building the website…" | unsourced: the source says the work was done "באינטגרציה מלאה עם תהליך של" site-building, panels, BD and shelf. It does not say the studio did those | copywriter |
| F3 | `caseStudies[10].outcome` (en only) | "…until the decision was made to open a second branch." | unsourced: source "סניף נוסף" = an additional branch. "Second" adds a count (do_not_claim: no figures beyond the brief's). The he sentence is sourced | copywriter |
| F4 | `extras.pages.work.voices_intro` s2 (he + en) | "חלקם סיפרו על זה מול המצלמה." / "Some of them talked about it on camera." | unsourced: no dossier entry says which videos mention a sales rise. Above the named captions (Amos/AMT, Ronen, Joya Cosmetics, Natali, Ella), it ties "hundreds of percent" to named clients by implication, against `confirmed_cases[4].note` / `do_not_claim[3]`. s1 on its own is sourced | copywriter |
| F5 | `extras.video_library.proof[26].label` (he + en) | "Mercedes vip club 1 of 300 videos" | contradicted: the title is verbatim, but "1 of 300 videos" is a figure beyond the brief's three stats (`do_not_claim[3]`). A verbatim title still counts once it is on a page | copywriter |
| F6 | `extras.pages.watch.series[5].line` (he + en) | "לקוחות מספרים, בעשרים עד שלושים שניות." / "Clients talking, in twenty to thirty seconds." | contradicted: every video placed in "In Their Words" (`video_library.voices`) runs 17–125 s (`videos[].duration_s`). The brief's "cut to 20–30 seconds" describes cuts nobody has made yet | copywriter |
| V1 | `/partnership`: `extras.pages.partnership.headline`, `.pain_heading`, `services[4].body` p1 (he + en) | "לא עוד חודש שנראה כמו הקודם." · "העסק עובד. ותקוע." · "העסק עובד, ובכל זאת כל חודש דומה לקודם. יש תקרה, ואתם היחידים שרואים את כל התמונה." | voice: the page says one pain three times in a row (headline, pain heading, first sentence), and the body sentence repeats the Home mirror's lines almost word for word. Reads as padding when read aloud | humanizer |
| V2 | `copyBlocks[1].heading` (en) | "Does any of this sound familiar" | voice: a question with no question mark. The he heading is a statement ("אולי זה נשמע מוכר"), so this is a defect in the en cadence | humanizer |
| K1 | `/work`, `/watch`, `/course` (he + en) | no pain line on these pages (`pages.work.intro`, `pages.watch.intro`, `pages.course` + `services[5]`) | completeness: brief "Copy direction › Rules" says "Every page names its pain before its solution". `direction.md` must-do 15 (voice per the brief's rules) and 17. `/about` passes through `copyBlocks[3]` (slot `about`) p1. The flow pages (`/check`, `/thanks`, `/snapshot`, `/book`, `/booked`, legal, 404) are steps, not pitch pages, and are exempt | copywriter |

No replacement wording is given here, on purpose.

## Rulings

1. **Brief sections incorporated by reference.** `dossier.site_spec` (origin client) points to the brief's "Site spec" and "Funnel and video hooks" sections ("as written in the brief; not repeated here"). `dossier.audience` and `dossier.pains` point to "Audience and pains". Ruling: a brief section named in the `source_url` of an `origin: client` dossier entry counts as part of the dossier. A sentence resting only on that section is `sourced`, marked "sourced (brief spec by ref.)" in the table (20 instances). One extension, limited to how the site's own flows work and never to business facts: the brief's "Tech" table rows "Check backend" and "Messaging" (snapshot delivery by WhatsApp and email, the public-presence scan). These describe the mocked flow we are building, the brief calls itself the "single source for the run", and the Site spec's own Snapshot paragraph already names the "automated scan". Business facts (history, results, people, prices, figures) count only when a dossier field carries them. **Harvester to-do (not blocking):** copy the Tech rows "Check backend" and "Messaging" into the dossier, so the next round needs no extension.
2. **Free intake, English name.** A13 (later than the brief body) makes the `copy-terms.json` `term.*` keys the fixed names. `en.term.check` = "Spotlight Check", and `dossier.business.fixed_terms` points to those keys, so "Spotlight Check" counts as `sourced`. The brief body ("Focused Check") and `dossier.offers[0].label_en` ("Focused Check") still conflict with it. **Flag for Shahar:** confirm "Spotlight Check". Harvester to update `offers[0].label_en` once confirmed. Not blocking. he "בדיקה ממוקדת" and "פגישת ייעוץ" (A12) / en "Clarity Session" (A15) are correct everywhere. Neither "פגישת בהירות" nor "Focused Check" appears in either file.
3. **Funnel.** The brief governs over `audit.json`. Each page's last action matches the brief's sitemap: Home, `/story`, `/launch`, `/watch` → the Check. `/partnership`, `/work`, `/about`, `/snapshot` → a Clarity Session. `/brands` → its form. `/course` → Buy (the brief's own exception). `/thanks` → videos. `/booked` and 404 → Home. WhatsApp is the global secondary (`cta.whatsapp`, `closing`, `msg.whatsapp_prefill`). Correct.
4. **Old case texts (A19).** `old_case_studies[].text` (verbatim from talouloren.com, with source URLs) counts as `sourced` for stories. Every figure in it was removed correctly (Wella 80%→20%, 28%, three-year, the CEO's name and award; Eugene Perma doubled, 1000+, four years, 10%; CK 650, 5 cities; AMT registration blocked). F3 and F5 are the only figures that got through.

## Draft vs final (humanizer 0.2.1)

Diffed `he.draft.json` → `he.json` and `en.draft.json` → `en.json` key by key: both have the same 837 keys. 12 he strings and 11 en strings changed, matching `humanizer-notes.md`. Nothing was added or lost except where noted.

| Field | Finding |
|---|---|
| `caseStudies[6].challenge` | **H1 (blocking):** the rewrite gives the goal to Calvin Klein as its wish. The draft named no one |
| `extras.pages.work.case_what_we_did.amt` (he) | "לפלטפורמות השיווק" → "לכל פלטפורמת שיווק" ("each"; en already had "each"). Source "התאמתם לפלטפורמות השיווקיות": same scope, framing. Not blocking |
| `extras.pages.work.case_what_we_did.eugene-perma` (en) | "we set up a training programme", "a community grew": the source lists both under the studio's solution. No fact added |
| `copyBlocks[3].body` p1 | the opinion line changed ("says nothing" → "is mostly just beautiful"). Framing; `sources.md` updated |
| `extras.pages.work.intro` | "what we did" dropped from the intro. The three parts stay in `case_sections`. No fact lost |
| `services[4].summary`, `services[5].summary`, `newsletter.label`, `extras.home.faq.items[3].a`, `extras.pages.work.case_what_we_did.wella` / `.visa-cal`, `extras.pages.watch.series[3].line` | changed shape only: same facts, nothing added or dropped |

## Fact audit — one row per sentence

Every sentence that asserts anything, he and en paired by field and sentence index. Where the two locales split into different sentences, or the verdicts differ, they get separate rows marked (he) / (en). Dossier keys are paths in `dossier.json`. `site_spec → X` = the brief section X, incorporated by `dossier.site_spec` (ruling 1). Rows 1–2 group lists (17 logo names, 9 people), each one claim with one source. Not listed, because they assert nothing: interface labels and buttons (`nav`, `cta`, `footer`, `form`, Check and snapshot labels, `book.*` steps), the Check questions and answer options, the snapshot dimension questions, page names used as headings, `services[].ctaText` and `msg.whatsapp_prefill` (the visitor's own words), the 70 `{placeholders}`, ids, slugs, URLs other than socials, and the confirmed cases' placeholder stories. That is 378 strings per locale, all read. None asserts a fact.

| # | Field · sentence | he | en | Dossier key | Verdict | Note |
|---|---|---|---|---|---|---|
| 1 | `clientLogos` | Mercedes · L'Oréal · Wella · Amdocs · מכבי · כללית · Coca-Cola · NBC · IDC · בזק · כאל · מזרחי טפחות · Philip Morris · אסם · קסטרו · SEAT · Fashion Week | Mercedes · L'Oréal · Wella · Amdocs · Maccabi · Clalit · Coca-Cola · NBC · IDC · Bezeq · Cal · Mizrahi-Tefahot · Philip Morris · Osem · Castro · SEAT · Fashion Week | `proof.names_wall_brands (17, brief order); proof.logos_cleared (A4)` | sourced |  |
| 2 | `extras.home.proof.people` | קונאן אובריאן · יצחק תשובה · גיל שוויד · ריטה · אלון אולמן · דורון שפר · שאול נפתלי · ד"ר אסנת רזיאל · רותם ידלין | Conan O'Brien · Yitzhak Tshuva · Gil Shwed · Rita · Alon Ulman · Doron Sheffer · Shaul Naftali · Dr Osnat Raziel · Rotem Yadlin | `proof.names_wall_people (brief spellings)` | sourced |  |
| 3 | `businessName` | Talou L'oren | Talou L'oren | `business.name (A22)` | sourced |  |
| 4 | `tagline` | Success is Beautiful | Success is Beautiful | `business.tagline` | sourced |  |
| 5 | `closing s1` | מתחילים בבדיקה הממוקדת. | Start with the Spotlight Check. | `booking.new_site; contact.whatsapp` | sourced |  |
| 6 | `closing s2` | שאלה לפני? | A question first? | `booking.new_site; contact.whatsapp` | sourced |  |
| 7 | `closing s3` | כתבו לנו בוואטסאפ. | Message us on WhatsApp. | `booking.new_site; contact.whatsapp` | sourced |  |
| 8 | `copyBlocks[0].heading s1` | אתם טובים במה שאתם עושים. | You're good at what you do. | `business.approved_lines.hero_headline (verbatim)` | sourced |  |
| 9 | `copyBlocks[0].heading s2` | הגיע הזמן שיראו אתכם. | It's time people saw it. | `business.approved_lines.hero_headline (verbatim)` | sourced |  |
| 10 | `copyBlocks[0].body` | אנחנו מוצאים את הסיפור שרק אתם יכולים לספר, בונים את מה שהופך אותו לנראה וממגנט לקוחות, ונשארים לצדכם עד שזה עובד. | We find the story only you can tell, build what makes it visible and draws clients in, and stay beside you until it works. | `business.approved_lines.hero_subtitle (verbatim)` | sourced |  |
| 11 | `copyBlocks[1].heading` | אולי זה נשמע מוכר | Does any of this sound familiar | `brief Home 2 (mirror) via site_spec` | framing |  |
| 12 | `copyBlocks[1].body s1` | כל חודש נראה כמו החודש שלפניו. | Every month looks like the one before. | `pains[0..4] (in order)` | sourced |  |
| 13 | `copyBlocks[1].body s2` | יש תקרה. | There's a ceiling. | `pains[0..4] (in order)` | sourced |  |
| 14 | `copyBlocks[1].body s3` | מרגישים אותה, ולא יודעים לקרוא לה בשם. | You can feel it, and you can't quite name it. | `pains[0..4] (in order)` | sourced |  |
| 15 | `copyBlocks[1].body s4` | הצעד הראשון מפחיד. | The first step is frightening. | `pains[0..4] (in order)` | sourced |  |
| 16 | `copyBlocks[1].body s5` | או שפשוט לא ברור מהו. | Or you don't know what it is. | `pains[0..4] (in order)` | sourced |  |
| 17 | `copyBlocks[1].body s6` | אף אחד חוץ מכם לא רואה את התמונה המלאה של העסק. | Nobody but you sees the whole picture of the business. | `pains[0..4] (in order)` | sourced |  |
| 18 | `copyBlocks[1].body s7` | AI בכל מקום, ואתם קופאים מולו כמו צבי מול פנסים של מכונית. | AI is everywhere, and you're frozen like a deer in the headlights. | `pains[0..4] (in order)` | sourced |  |
| 19 | `copyBlocks[2].heading` | ואז האור מסתובב | Then the light turns | `business.brand_idea` | sourced |  |
| 20 | `copyBlocks[2].body s1` | האור שמסנוור אתכם היום נוחת עליכם. | The glare that freezes you today lands on you instead. | `business.brand_idea; business.promise_ladder` | sourced |  |
| 21 | `copyBlocks[2].body s2` | מה שקורה אחרי זה בא לפי הסדר: בהירות, תנועה, תשומת לב, משיכה, מודעות. | What follows comes in order: clarity, movement, attention, attraction, awareness. | `business.brand_idea; business.promise_ladder` | sourced |  |
| 22 | `copyBlocks[3].heading` | שניים, כי צריך גם סיפור וגם מי שיבנה אותו | Two of us, because a story needs someone to build it | `business.description` | framing |  |
| 23 | `copyBlocks[3].body s1` | סיפור שאף אחד לא בונה נשאר על הנייר. | A story nobody builds stays on paper. | `team[0..1].brings; tone_old_site[1]` | framing | opinion line, asserts nothing about anyone |
| 24 | `copyBlocks[3].body s2` | ואתר יפה בלי סיפור הוא בעיקר יפה. | And a beautiful website with no story is mostly just beautiful. | `team[0..1].brings; tone_old_site[1]` | framing | opinion line |
| 25 | `copyBlocks[3].body s3` | טל מביא את הסיפור ואת האסטרטגיה, מלווה ומפיק. | Tal brings the story and the strategy, and he mentors and produces. | `team[0..1].brings; tone_old_site[1]` | sourced |  |
| 26 | `copyBlocks[3].body s4` | שחר אחראי על הזהות, האתר והמוצר, וגם על המושן ועל האוטומציה עם AI. | Shahar takes the identity, the website and the product, plus the motion and the AI automation. | `team[0..1].brings; tone_old_site[1]` | sourced |  |
| 27 | `copyBlocks[3].body s5` | ביחד נדייק את החזון שלכם. | Together we sharpen your vision. | `team[0..1].brings; tone_old_site[1]` | sourced |  |
| 28 | `photos[0].caption` | טל אורן | Tal Oren | `images[img-001].subject = tal; team[0].photos` | sourced |  |
| 29 | `videos[0].description` | AMDOCS INNOVATION PROJECT: ראיונות עם עובדים, סדנאות במשרדים וקיר הלוגו של Amdocs | AMDOCS INNOVATION PROJECT: employee interviews, office workshops and the Amdocs logo wall | `videos[vid-038].title/.shows` | sourced |  |
| 30 | `videos[1].description` | מכבי, "אנשי האור": סרט תיעודי על יזמות, עם צוות המרפאות בחלוקים לבנים | Maccabi, "People of Light": a documentary on entrepreneurship, with clinic staff in white coats | `videos[vid-022].title/.shows` | sourced |  |
| 31 | `videos[2].description` | SEAT: פרסומת למכירה אונליין, גבר בחליפה בכורסה צהובה ולצדו רכב SEAT | SEAT: an online-sale ad, a man in a suit in a yellow armchair beside a SEAT car | `videos[vid-055].shows` | sourced |  |
| 32 | `videos[3].description` | קמפיין פארק בבלי: דירה גבוהה, חלונות גדולים והלוגו של הפרויקט | Park Bavli campaign: a high-rise apartment, tall windows and the project's logo | `videos[vid-020].shows` | sourced |  |
| 33 | `videos[4].description` | טל אורן מעביר סדנה למיתוג אישי ליזמים במכללה למינהל, בשיתוף בנק הפועלים | Tal Oren running a personal-branding workshop for entrepreneurs at the College of Management, with Bank Hapoalim | `videos[vid-027].title/.shows` | sourced |  |
| 34 | `videos[5].description` | עמוס מ־AMT מדבר מול המצלמה, בשחור־לבן עם כתוביות | Amos of AMT talking to camera, black and white, with subtitles | `videos[vid-007].shows; testimonials.video[Amos]` | sourced |  |
| 35 | `contact.phone` | +972504635536 | +972504635536 | `contact.phone / .whatsapp / .email (A23)` | sourced |  |
| 36 | `contact.whatsapp` | +972504635536 | +972504635536 | `contact.phone / .whatsapp / .email (A23)` | sourced |  |
| 37 | `contact.email` | tal@talouloren.com | tal@talouloren.com | `contact.phone / .whatsapp / .email (A23)` | sourced |  |
| 38 | `services[0].title` | בדיקה ממוקדת | Spotlight Check | `business.fixed_terms (copy-terms term.*, A12/A13/A15); offers[]; offers_note` | sourced |  |
| 39 | `services[0].summary` | תמונת מצב אישית של העסק, בלי תשלום. | A personal snapshot of your business, free of charge. | `offers[0] (free, personal snapshot)` | sourced |  |
| 40 | `services[0].body s1` | עונים על השאלות, ואנחנו מסתכלים גם על מה שכבר יש לכם ברשת. | You answer the questions, and we also look at what's already out there about you online. | `site_spec → brief Snapshot page (automated scan, 5 scores, 3 observations, first move, path)` | sourced (brief spec by ref.) |  |
| 41 | `services[0].body s2` | מזה יוצאת תמונת המצב: ציון מ־1 עד 5 בחמישה תחומים, שלושה דברים ששמנו לב אליהם, צעד ראשון, ודרך שאנחנו ממליצים עליה. | That becomes your snapshot: a score from 1 to 5 in five areas, three things we noticed, a first move, and the path we'd recommend. | `site_spec → brief Snapshot page (automated scan, 5 scores, 3 observations, first move, path)` | sourced (brief spec by ref.) |  |
| 42 | `services[0].format` | 10 שאלות, שאלה אחת בכל מסך | 10 questions, one per screen | `offers[0].format; site_spec (one per screen)` | sourced |  |
| 43 | `services[0].audience` | בעלי עסקים, פרילנסרים, עסקים חדשים ומותגים אישיים | Business owners, freelancers, new businesses and personal brands | `audience` | sourced |  |
| 44 | `services[1].title` | פגישת ייעוץ | Clarity Session | `business.fixed_terms (copy-terms term.*, A12/A13/A15); offers[]; offers_note` | sourced |  |
| 45 | `services[1].summary s1` | פגישה בתשלום עם שנינו. | A paid session with both of us. | `offers[1].format (paid, both partners, written action plan)` | sourced |  |
| 46 | `services[1].summary s2` | יוצאים ממנה עם תוכנית פעולה כתובה. | You leave with a written action plan. | `offers[1].format (paid, both partners, written action plan)` | sourced |  |
| 47 | `services[1].body` | אם ממשיכים איתנו אחרי הפגישה, מה ששילמתם עליה מקוזז. | If you go on to work with us after the session, what you paid for it is credited. | `offers[1].format (fee credited)` | sourced |  |
| 48 | `services[1].format` | {session_length}, עם טל ושחר | {session_length}, with Tal and Shahar | `offers[1].gap ({session_length}); team[].name` | sourced |  |
| 49 | `services[1].audience` | עסקים של 2 עד 20 אנשים, עסקים קטנים ובינוניים ומותגים אישיים | Businesses of 2 to 20 people, small and medium businesses, and personal brands | `audience (brief segment table, cited section)` | sourced |  |
| 50 | `services[2].title` | סיפור | Story | `business.fixed_terms (copy-terms term.*, A12/A13/A15); offers[]; offers_note` | sourced |  |
| 51 | `services[2].summary` | לעסקים ולאנשים שכבר קיימים, ברשת או מחוצה לה, ולא מצליחים להגיד מה מבדיל אותם. | For businesses and people who already exist, online or not, and can't say what makes them different. | `doors.value[0].for` | sourced |  |
| 52 | `services[2].body s1` | מי שעובד איתכם יודע למה דווקא אתם. | The people who work with you know why it's you. | `audience (segment "selling on referrals"); doors.value[0].delivers` | framing | framing of the referral segment |
| 53 | `services[2].body s2` | מי שעוד לא, לא יודע. | Everyone else doesn't. | `audience (segment "selling on referrals"); doors.value[0].delivers` | framing | framing of the referral segment |
| 54 | `services[2].body s3` | אז ממליצים עליכם רק מי שכבר מכיר אתכם. | So the only ones recommending you are the ones who already know you. | `audience (segment "selling on referrals"); doors.value[0].delivers` | framing | framing of the referral segment |
| 55 | `services[2].body s4` | בסיפור אנחנו מוציאים את זה החוצה: ה־DNA של המותג, חמשת הערכים שלו, סיפור הליבה, המסרים, השפה הוויזואלית, ותוכן מרכזי אחד שנבנה מכל אלה. | Story brings that out: your brand DNA, its five values, the core story, the messaging, the visual language, and one hero piece of content built from all of it. | `audience (segment "selling on referrals"); doors.value[0].delivers` | sourced |  |
| 56 | `services[2].format` | ספרינט סיפור · 2–4 שבועות, היקף קבוע | Story Sprint · 2–4 weeks, fixed scope | `offers[2].format` | sourced |  |
| 57 | `services[2].audience` | פרילנסרים ובעלי עסקים שטובים במה שהם עושים ונמכרים בעיקר מהמלצות | Freelancers and owners who are good at what they do and sell mostly on referrals | `audience (solo owner / freelancer segment)` | sourced |  |
| 58 | `services[3].title` | השקה | Launch | `business.fixed_terms (copy-terms term.*, A12/A13/A15); offers[]; offers_note` | sourced |  |
| 59 | `services[3].summary` | לעסקים חדשים, או לעסקים שעולים מחדש, שצריכים את כל הדרך ובסדר הנכון. | For new or relaunching businesses that need the whole path, in the right order. | `doors.value[1].for` | sourced |  |
| 60 | `services[3].body s1` | רעיון, או רישום טרי, ועוד אין שום נוכחות. | An idea, or a fresh registration, and no presence yet. | `audience (new business segment); pains[2]; doors.value[1].delivers` | sourced |  |
| 61 | `services[3].body s2` | כשהכול חסר, קשה לדעת מה קודם למה, ובדיוק שם נתקעים בצעד הראשון. | When everything is missing it's hard to know what comes first, and that's exactly where people get stuck on the first step. | `audience (new business segment); pains[2]; doors.value[1].delivers` | sourced |  |
| 62 | `services[3].body s3` | בהשקה עוברים את כל מה שיש בסיפור, ואחריו אסטרטגיה, זהות, אתר, משפך, תוכן להשקה וקמפיין ראשון. | Launch covers everything in Story, then strategy, identity, website, funnel, launch content and a first campaign. | `audience (new business segment); pains[2]; doors.value[1].delivers` | sourced |  |
| 63 | `services[3].format` | בניית השקה · 6–10 שבועות, היקף קבוע | Launch Build · 6–10 weeks, fixed scope | `offers[3].format` | sourced |  |
| 64 | `services[3].audience` | עסקים חדשים ועסקים בהשקה מחדש | New businesses and businesses relaunching | `doors.value[1].for` | sourced |  |
| 65 | `services[4].title` | שותפות | Partnership | `business.fixed_terms (copy-terms term.*, A12/A13/A15); offers[]; offers_note` | sourced |  |
| 66 | `services[4].summary s1` | המסלול המרכזי שלנו. | Our flagship. | `offers[4] (flagship; tailored system)` | sourced |  |
| 67 | `services[4].summary s2` | בונים מערכת לשיווק, למכירות ולתפעול, לפי העסק שלכם. | We build a system for marketing, sales and operations around your business. | `offers[4] (flagship; tailored system)` | sourced |  |
| 68 | `services[4].body s1` | העסק עובד, ובכל זאת כל חודש דומה לקודם. | The business works, and still every month looks like the last. | `pains[0],[1],[3]; tone_old_site[0]; offers[4]` | sourced |  |
| 69 | `services[4].body s2` | יש תקרה, ואתם היחידים שרואים את כל התמונה. | There's a ceiling, and you're the only one who sees the whole picture. | `pains[0],[1],[3]; tone_old_site[0]; offers[4]` | sourced |  |
| 70 | `services[4].body s3` | אתם לא לבד. | You are not alone. | `pains[0],[1],[3]; tone_old_site[0]; offers[4]` | sourced |  |
| 71 | `services[4].body s4` | נשימה. | Breathe. | `pains[0],[1],[3]; tone_old_site[0]; offers[4]` | sourced |  |
| 72 | `services[4].body s5` | בשותפות אנחנו לצדכם, ובונים יחד את המערכת שמזיזה את העסק מהמקום הזה. | In a Partnership we're beside you, building the system that moves the business off that spot. | `pains[0],[1],[3]; tone_old_site[0]; offers[4]` | framing | framing of offers[4] |
| 73 | `services[4].format` | 3–6 חודשים, פגישה שבועית עם שנינו | 3–6 months, a weekly meeting with both of us | `offers[4].format` | sourced |  |
| 74 | `services[4].audience` | עסקים של 2 עד 20 אנשים, עסקים קטנים ובינוניים, ומותגים אישיים אחרי ספרינט סיפור | Businesses of 2 to 20 people, small and medium businesses, and personal brands after a Story Sprint | `audience (segments whose path is Partnership)` | sourced |  |
| 75 | `services[5].title` | BRAND YOURSELF | BRAND YOURSELF | `business.fixed_terms (copy-terms term.*, A12/A13/A15); offers[]; offers_note` | sourced |  |
| 76 | `services[5].summary s1` | רוצים להתחיל לבד? | Rather start on your own? | `offers[5] (DIY, recorded lessons)` | sourced |  |
| 77 | `services[5].summary s2` | השיטה כולה נמצאת בשיעורים מוקלטים. | The whole method is there in recorded lessons. | `offers[5] (DIY, recorded lessons)` | sourced |  |
| 78 | `services[5].body` | בקורס עוברים את עשרת הצעדים של השיטה, שיעור לכל צעד. | The course walks through the method's ten steps, one lesson for each. | `method.note (10 lessons = 10 steps)` | sourced |  |
| 79 | `services[5].format` | 10 שיעורים מוקלטים, בקצב שלכם | 10 recorded lessons, at your own pace | `offers[5].format` | sourced |  |
| 80 | `services[5].audience` | פרילנסרים ובעלי עסקים של אדם אחד | Freelancers and one-person businesses | `audience (solo owner segment → course)` | sourced |  |
| 81 | `services[6].title` | שירותים בכל שלב | Services at any step | `business.fixed_terms (copy-terms term.*, A12/A13/A15); offers[]; offers_note` | sourced |  |
| 82 | `services[6].summary` | מיתוג, אתרים, אסטרטגיה, שיווק, תוכן ויזואלי, הפקה, עיצוב גרפי, קופירייטינג וקריאייטיב. | Branding, web, strategy, marketing, visual content, production, graphic design, copywriting and creative direction. | `offers_note (nine craft services)` | sourced |  |
| 83 | `services[6].body` | אפשר להוסיף כל אחד מאלה בכל שלב בדרך, גם בלי מסלול. | Any of these can be added at any point along the way, even without a path. | `offers_note ("at any step"); site_spec → Snapshot path "a craft service"` | sourced |  |
| 84 | `method.name` | השיטה | The method | `business.fixed_terms (term.method)` | sourced |  |
| 85 | `method.intro s1` | עשרה צעדים, מהיזמות עצמה ועד המיינדסט. | Ten steps, from the entrepreneur to the mindset. | `method.value[0],[9]; doors.value[].method_steps` | sourced |  |
| 86 | `method.intro s2` | סיפור עובר את שבעת הראשונים, השקה את כל העשרה. | Story goes through the first seven, Launch through all ten. | `method.value[0],[9]; doors.value[].method_steps` | sourced |  |
| 87 | `team[0].name` | טל אורן | Tal Oren | `team[0].name; identity_note` | sourced |  |
| 88 | `team[0].role` | אסטרטג מותג ומנטור עסקי | Brand strategist and business mentor | `team[0].role` | sourced |  |
| 89 | `team[0].bio s1` | יותר מעשר שנים טל בונה ומשיק מותגים, עם צוותי הנהלה ועם עסקים של אדם אחד. | For more than ten years Tal has built and launched brands, with leadership teams and with one-person businesses. | `team[0].bio` | sourced |  |
| 90 | `team[0].bio s2` | הוא יצר את הקורס BRAND YOURSELF ואת שיטת עשרת הצעדים שלו. | He created the BRAND YOURSELF course and its ten-step method. | `team[0].bio` | sourced |  |
| 91 | `team[1].name` | שחר נאור | Shahar Naor | `team[1].name` | sourced |  |
| 92 | `team[1].role` | מעצב, מפתח ואסטרטג מוצר | Designer, developer and product strategist | `team[1].role` | sourced |  |
| 93 | `team[1].bio s1` | שני עשורים בעיצוב, מושן, פיתוח ואסטרטגיה. | Two decades in design, motion, development and strategy. | `team[1].bio` | sourced |  |
| 94 | `team[1].bio s2` | 12 שנה היה שותף בניהול הסטודיו Kapara, והקים את חברת האד־טק Cronus Media. | He co-ran the Kapara studio for 12 years and founded the ad-tech startup Cronus Media. | `team[1].bio` | sourced |  |
| 95 | `team[1].bio s3` | הוא מייעץ לסטארטאפים ועובד איתם מבפנים, ובונה כלי AI. | He advises startups and works with them from the inside, and he builds AI tools. | `team[1].bio` | sourced |  |
| 96 | `caseStudies[0].client` | Amdocs | Amdocs | `confirmed_cases[].client` | sourced |  |
| 97 | `caseStudies[0].sector` | ארגונים | Organisations | `work filter (site_spec); confirmed_cases[].client type` | framing |  |
| 98 | `caseStudies[0].title` | פרויקט החדשנות של Amdocs | The Amdocs innovation project | `videos[vid-038].title` | sourced |  |
| 99 | `caseStudies[0].outcome` | ערך החדשנות הוטמע בארגון של 27,000 עובדים. | The value of innovation was embedded in an organisation of 27,000 employees. | `confirmed_cases[0] (what, size)` | sourced |  |
| 100 | `caseStudies[1].client` | מכבי שירותי בריאות | Maccabi Healthcare | `confirmed_cases[].client` | sourced |  |
| 101 | `caseStudies[1].sector` | ארגונים | Organisations | `work filter (site_spec); confirmed_cases[].client type` | framing |  |
| 102 | `caseStudies[1].title` | מכבי: אנשי האור | Maccabi: People of Light | `videos[vid-022].title` | sourced |  |
| 103 | `caseStudies[1].outcome` | עזרנו למכבי לעשות צעד שנוגע ב־3 מיליון איש. | We helped Maccabi take a step that reaches 3 million people. | `confirmed_cases[1]` | sourced |  |
| 104 | `caseStudies[2].client` | SEAT | SEAT | `confirmed_cases[].client` | sourced |  |
| 105 | `caseStudies[2].sector` | מותגים | Brands | `work filter (site_spec); confirmed_cases[].client type` | framing |  |
| 106 | `caseStudies[2].title` | הפרסומת של SEAT | The SEAT commercial | `videos[vid-055].title` | sourced |  |
| 107 | `caseStudies[2].outcome` | רכב נמכר אונליין, בפעם הראשונה. | A car sold online, for the first time. | `confirmed_cases[2]` | sourced |  |
| 108 | `caseStudies[3].client` | פארק בבלי | Park Bavli | `confirmed_cases[].client` | sourced |  |
| 109 | `caseStudies[3].sector` | מותגים | Brands | `work filter (site_spec); confirmed_cases[].client type` | framing |  |
| 110 | `caseStudies[3].title` | קמפיין הנדל"ן של פארק בבלי | The Park Bavli real-estate campaign | `videos[vid-018/020].title` | sourced |  |
| 111 | `caseStudies[3].outcome` | עזרנו לפרויקט של יצחק תשובה להימכר מהר יותר. | We helped Yitzhak Tshuva's project sell faster. | `confirmed_cases[3]` | sourced |  |
| 112 | `caseStudies[4].client` | Wella | Wella | `old_case_studies[].text (client named in the text; A19)` | sourced |  |
| 113 | `caseStudies[4].sector` | מותגים | Brands | `old_case_studies[].tab` | sourced |  |
| 114 | `caseStudies[4].title` | BACK TO WELLA | BACK TO WELLA | `old_case_studies[wella].text (A19)` | sourced |  |
| 115 | `caseStudies[4].challenge s1` | מותג ותיק בישראל, שבמשך עשור איבד חלק גדול מנתח השוק שלו, כששחקנים חזקים נוספים נכנסו לקטגוריה. | A long-established brand in Israel that, over a decade, lost a large part of its market share as strong new players entered the category. | `old_case_studies[wella].text (A19)` | sourced |  |
| 116 | `caseStudies[4].challenge s2` | כשנכנס לחברה מנכ"ל חדש, נפתחה הדרך לבנות איתו תוכנית פעולה. | When a new CEO arrived, there was a way in to build an action plan with him. | `old_case_studies[wella].text (A19)` | sourced |  |
| 117 | `caseStudies[4].outcome` | וולה חזרה להיות שחקנית מובילה בקטגוריה, והמותג התרענן. | Wella became a leading player in the category again, and the brand felt new. | `old_case_studies[wella].text (A19)` | sourced |  |
| 118 | `caseStudies[5].client` | Eugene Perma | Eugene Perma | `old_case_studies[].text (client named in the text; A19)` | sourced |  |
| 119 | `caseStudies[5].sector` | מותגים | Brands | `old_case_studies[].tab` | sourced |  |
| 120 | `caseStudies[5].title` | BLONDE MASTER | BLONDE MASTER | `old_case_studies[eugene-perma].text (A19)` | sourced |  |
| 121 | `caseStudies[5].challenge s1` | ייבואן פרטי של מותג בינלאומי. | A private importer of an international brand. | `old_case_studies[eugene-perma].text (A19)` | sourced |  |
| 122 | `caseStudies[5].challenge s2 (he)` | המותג לא היה נחשק, הניהול שלו לא היה מקצועי, מערך ההדרכה לא פעל, ואנשי המכירות נתקלו בעיקר בסירובים. |  | `old_case_studies[eugene-perma].text (A19)` | sourced |  |
| 123 | `caseStudies[5].challenge s2 (en)` |  | Nobody wanted the brand, it wasn't managed professionally, the training programme had stalled, and the sales team mostly heard no. | `old_case_studies[eugene-perma].text (A19)` | framing | "Nobody wanted the brand" for "המותג לא נחשק" (not desirable): an absolute in English; note, not blocking |
| 124 | `caseStudies[5].outcome` | מרכז ההדרכה של החברה התמלא, והמותג נכנס למגרש של מובילי התחום. | The company's training centre filled up, and the brand moved into the league of the category's leaders. | `old_case_studies[eugene-perma].text (A19)` | sourced |  |
| 125 | `caseStudies[6].client` | Calvin Klein | Calvin Klein | `old_case_studies[].text (client named in the text; A19)` | sourced |  |
| 126 | `caseStudies[6].sector` | ארגונים | Organisations | `old_case_studies[].tab` | sourced |  |
| 127 | `caseStudies[6].title` | OBSESSED: יועצות היופי במרכז | OBSESSED: the beauty advisors at the centre | `old_case_studies[obsessed-ck].text; videos[vid-042].title (A19)` | sourced |  |
| 128 | `caseStudies[6].challenge` | קלווין קליין רצו להעצים את הדימוי של יועצות היופי שלהם בישראל. | Calvin Klein wanted to lift how its beauty advisors in Israel are seen. | `old_case_studies[obsessed-ck].text; videos[vid-042].title (A19)` | **unsourced** | old_case_studies[obsessed-ck].text names no commissioning wish; page title is "שסטוביץ" (the Israeli client). "Calvin Klein wanted" is new in the humanizer rewrite (draft: "…and the wish to lift how they are seen", no subject). **H1 · humanizer** |
| 129 | `caseStudies[6].outcome` | היועצות הפיצו את התוצרים בעצמן, והמהלך תפס מקום משמעותי ברשתות החברתיות בלי עלות נוספת. | The advisors shared the results themselves, and the campaign took real space on social media at no extra cost. | `old_case_studies[obsessed-ck].text; videos[vid-042].title (A19)` | sourced |  |
| 130 | `caseStudies[7].client` | כאל | Cal | `old_case_studies[].text (client named in the text; A19)` | sourced |  |
| 131 | `caseStudies[7].sector` | ארגונים | Organisations | `old_case_studies[].tab` | sourced |  |
| 132 | `caseStudies[7].title` | סדנת מצליחנות להנהלה | A success workshop for the management team | `old_case_studies[visa-cal].text (A19)` | sourced |  |
| 133 | `caseStudies[7].challenge` | הנהלת החברה, ורצון לחבר אותה לתפיסת עולם של מצליחנות. | The company's management, and the wish to bring it into a mindset of success. | `old_case_studies[visa-cal].text (A19)` | sourced |  |
| 134 | `caseStudies[7].outcome` | צוות ההנהלה יצא מהסדנה מגובש וחדור מטרה. | The management team came out of the workshop united and driven. | `old_case_studies[visa-cal].text (A19)` | sourced |  |
| 135 | `caseStudies[8].client` | דורון שפר | Doron Sheffer | `old_case_studies[].text (client named in the text; A19)` | sourced |  |
| 136 | `caseStudies[8].sector` | יזמים | Entrepreneurs | `old_case_studies[].tab` | sourced |  |
| 137 | `caseStudies[8].title` | יוזמה חדשה במנטורינג עסקי | A new business-mentoring venture | `old_case_studies[doron-shefer].text (A19)` | sourced |  |
| 138 | `caseStudies[8].challenge` | דורון שפר הקים יוזמה חדשה בתחום המנטורינג העסקי, והיה צריך את הכלים לדבר עליה. | Doron Sheffer was setting up a new venture in business mentoring, and needed the tools to talk about it. | `old_case_studies[doron-shefer].text (A19)` | sourced |  |
| 139 | `caseStudies[8].outcome` | {case_story_doron_shefer_after} | {case_story_doron_shefer_after} | `old_case_studies[doron-shefer].text (A19)` | sourced |  |
| 140 | `caseStudies[9].client` | ריטה | Rita | `old_case_studies[].text (client named in the text; A19)` | sourced |  |
| 141 | `caseStudies[9].sector` | יזמים | Entrepreneurs | `old_case_studies[].tab` | sourced |  |
| 142 | `caseStudies[9].title` | קליפ לתקליט החדש | A music video for the new album | `old_case_studies[rita].text (A19)` | sourced |  |
| 143 | `caseStudies[9].challenge` | ריטה רצתה קליפ לתקליט החדש שלה. | Rita wanted a music video for her new album. | `old_case_studies[rita].text (A19)` | sourced |  |
| 144 | `caseStudies[9].outcome` | קליפ יוצא דופן, וחשיפה גדולה. | An unusual video, and wide exposure. | `old_case_studies[rita].text (A19)` | sourced |  |
| 145 | `caseStudies[10].client` | AMT | AMT | `old_case_studies[].text (client named in the text; A19)` | sourced |  |
| 146 | `caseStudies[10].sector` | יזמים | Entrepreneurs | `old_case_studies[].tab` | sourced |  |
| 147 | `caseStudies[10].title` | אסטרטגיה ומיתוג ליזם בתחום הספורט | Strategy and branding for a sports entrepreneur | `old_case_studies[amt-case-study].text (A19)` | sourced |  |
| 148 | `caseStudies[10].challenge` | יזם בתחום הספורט, שהיה צריך אסטרטגיה, מיתוג ומיתוג ויזואלי. | An entrepreneur in sport who needed strategy, branding and visual branding. | `old_case_studies[amt-case-study].text (A19)` | sourced |  |
| 149 | `caseStudies[10].outcome s1 (he)` | העסק צמח מהר מאוד, עד שהוחלט לפתוח סניף נוסף. |  | `old_case_studies[amt-case-study].text (A19)` | sourced |  |
| 150 | `caseStudies[10].outcome s1 (en)` |  | The business grew very fast, until the decision was made to open a second branch. | `old_case_studies[amt-case-study].text (A19)` | **unsourced** | source "סניף נוסף" (an additional branch); "a second branch" adds a count the dossier lacks (do_not_claim: no figures beyond the brief's). he "סניף נוסף" is sourced. **F3 · copywriter** |
| 151 | `socialLinks[0].url` | https://www.instagram.com/talou_loren/ | https://www.instagram.com/talou_loren/ | `contact.socials.client_confirmed (A9)` | sourced |  |
| 152 | `socialLinks[1].url` | https://www.youtube.com/@taloulorensuccess | https://www.youtube.com/@taloulorensuccess | `contact.socials.client_confirmed (A9)` | sourced |  |
| 153 | `socialLinks[2].url` | https://www.linkedin.com/in/talouloren/ | https://www.linkedin.com/in/talouloren/ | `contact.socials.client_confirmed (A9)` | sourced |  |
| 154 | `newsletter.label` | מכתב קצר לבעלי עסקים, ובכל פעם רעיון אחד על סיפור, נראות או צמיחה. | A short letter for business owners, each one carrying a single idea about story, visibility or growth. | `gaps[newsletter.url]; brief Global (footer newsletter) — owner to confirm` | framing |  |
| 155 | `legal.accessibilityStatement s1` | אנחנו רוצים שכל מי שנכנס לאתר יוכל להשתמש בו, גם אנשים עם מוגבלות. | We want everyone who comes to this site to be able to use it, including people with disabilities. | `gaps[legal.accessibilityStatement]; placeholders` | framing |  |
| 156 | `legal.accessibilityStatement s2` | רמת ההתאמה של האתר: {accessibility_level}, לפי תקן ישראלי 5568. | The site's conformance level: {accessibility_level}, under Israeli Standard 5568. | `gaps[legal.accessibilityStatement]; placeholders` | framing |  |
| 157 | `legal.accessibilityStatement s3` | הבדיקה האחרונה נעשתה ב־{accessibility_audit_date}. | The last check was on {accessibility_audit_date}. | `gaps[legal.accessibilityStatement]; placeholders` | framing |  |
| 158 | `legal.accessibilityStatement s4` | מה נעשה באתר: {accessibility_measures} | What we have done on the site: {accessibility_measures} | `gaps[legal.accessibilityStatement]; placeholders` | framing |  |
| 159 | `legal.accessibilityStatement s5` | נתקלתם בבעיה? | Ran into a problem? | `gaps[legal.accessibilityStatement]; placeholders` | framing |  |
| 160 | `legal.accessibilityStatement s6` | כתבו לנו, ציינו באיזה עמוד ומה לא עבד, ונטפל בזה. | Write to us, tell us which page and what didn't work, and we'll deal with it. | `gaps[legal.accessibilityStatement]; placeholders` | framing |  |
| 161 | `legal.accessibilityContact` | {accessibility_coordinator} · tal@talouloren.com · 050-463-5536 | {accessibility_coordinator} · tal@talouloren.com · 050-463-5536 | `contact.email, contact.phone (A23); placeholder` | sourced |  |
| 162 | `extras.home.hero.eyebrow` | Success is Beautiful | Success is Beautiful | `business.approved_lines.hero_eyebrow` | sourced |  |
| 163 | `extras.home.doors_title` | שתי דלתות | Two doors | `doors (two)` | sourced |  |
| 164 | `extras.home.how.title` | איך מתחילים | How it starts | `site_spec → Home 5` | framing |  |
| 165 | `extras.home.how.step3_body` | תוכנית הפעולה מהפגישה מראה לאן ממשיכים: סיפור, השקה או שותפות. | The action plan from the session shows where you go next: Story, Launch or Partnership. | `offers[1] (written action plan); site_spec → Home 5` | framing |  |
| 166 | `extras.home.proof.title` | עבדנו איתם | Who we've worked with | `proof.names_wall_brands/people` | sourced |  |
| 167 | `extras.home.proof.stats[0].value` | 27,000 | 27,000 | `proof.stats` | sourced |  |
| 168 | `extras.home.proof.stats[0].label` | עובדי Amdocs | Amdocs employees | `proof.stats` | sourced |  |
| 169 | `extras.home.proof.stats[1].value` | 3 מיליון | 3 million | `proof.stats` | sourced |  |
| 170 | `extras.home.proof.stats[1].label` | איש, במהלך אחד במכבי | people, in one step at Maccabi | `proof.stats` | sourced |  |
| 171 | `extras.home.proof.stats[2].value` | +1,000 | 1,000+ | `proof.stats` | sourced |  |
| 172 | `extras.home.proof.stats[2].label` | רוכשים לקורס BRAND YOURSELF | BRAND YOURSELF buyers | `proof.stats` | sourced |  |
| 173 | `extras.home.proof.people_title` | ואנשים | And people | `proof.names_wall_people` | sourced |  |
| 174 | `extras.home.proof.sectors` | וגם בבנקאות, במלונאות, בתיירות ובקריפטו. | And in banking, hospitality, travel and crypto. | `proof.names_wall_sectors` | sourced |  |
| 175 | `extras.home.proof.nbc_note` | NBC: האנימציה של שחר ל־Pale Force, עבור Late Night with Conan O'Brien. | NBC: Shahar's animation of Pale Force for Late Night with Conan O'Brien. | `proof.nbc_wording` | sourced |  |
| 176 | `extras.home.cases_title` | ארבעה פרויקטים מקרוב | Four projects, up close | `site_spec → Home 7 (four case cards)` | sourced |  |
| 177 | `extras.home.faq.items[0].a s1` | אנחנו. | We do. | `site_spec → Snapshot ("Reviewed by", partner approval)` | sourced (brief spec by ref.) |  |
| 178 | `extras.home.faq.items[0].a s2` | לפני שתמונת המצב נשלחת אליכם, אחד מאיתנו עובר עליה ומאשר אותה. | Before your snapshot is sent, one of us goes through it and signs it off. | `site_spec → Snapshot ("Reviewed by", partner approval)` | sourced (brief spec by ref.) |  |
| 179 | `extras.home.faq.items[1].a` | זה בדיוק מה שתמונת המצב מהבדיקה עונה עליו. | That's exactly the question your snapshot from the Check answers. | `site_spec → Snapshot (recommended path)` | sourced (brief spec by ref.) |  |
| 180 | `extras.home.faq.items[2].a s1` | כן. | Yes. | `audience (SMB segment: has marketing, lacks story and system → Clarity Session)` | sourced |  |
| 181 | `extras.home.faq.items[2].a s2` | יש עסקים שיש להם שיווק, ואין להם סיפור ומערכת שמחזיקה אותו. | Some businesses have marketing but no story, and no system to hold it. | `audience (SMB segment: has marketing, lacks story and system → Clarity Session)` | sourced |  |
| 182 | `extras.home.faq.items[2].a s3` | בשבילם הצעד הראשון הוא פגישת ייעוץ. | For them the first step is a Clarity Session. | `audience (SMB segment: has marketing, lacks story and system → Clarity Session)` | sourced |  |
| 183 | `extras.home.faq.items[3].a` | בשביל זה יש את הקורס BRAND YOURSELF. | That's what the BRAND YOURSELF course is for. | `offers[5] (DIY)` | sourced |  |
| 184 | `extras.home.faq.items[4].a s1` | בשבועיים שאחרי נשלח לכם חמש הודעות קצרות, בוואטסאפ ובמייל. | Over the next two weeks we'll send you five short messages, on WhatsApp and by email. | `site_spec → Funnel (five follow-ups over 14 days, WhatsApp + email)` | sourced (brief spec by ref.) |  |
| 185 | `extras.home.faq.items[4].a s2` | אפשר לעצור אותן מתי שתרצו. | You can stop them whenever you like. | `site_spec → Funnel (five follow-ups over 14 days, WhatsApp + email)` | framing | opt-out promise rests on the copy's own `msg.unsubscribe`, not the dossier; consent wording undecided (gaps[legal.privacy]). Not blocking: an opt-out is a legal floor for marketing messages, not a business fact. Owner to confirm |
| 186 | `extras.home.faq.items[5].a s1` | כן. | Yes. | `audience (larger brands via /brands and a form)` | sourced |  |
| 187 | `extras.home.faq.items[5].a s2` | לחברות ולצוותים יש עמוד משלהם, עם טופס פנייה. | Companies and teams have their own page, with a contact form. | `audience (larger brands via /brands and a form)` | sourced |  |
| 188 | `extras.home.final.heading s1` | מאיפה מתחילים? | Where do you start? | `site_spec → Home 11` | framing |  |
| 189 | `extras.home.final.heading s2` | מכאן. | Here. | `site_spec → Home 11` | framing |  |
| 190 | `extras.pages.story.headline s1` | אתם קיימים. | You exist. | `doors.value[0].for` | sourced |  |
| 191 | `extras.pages.story.headline s2` | רק קשה להגיד מה מבדיל אתכם. | It's just hard to say what makes you different. | `doors.value[0].for` | sourced |  |
| 192 | `extras.pages.story.pain_heading` | ממליצים עליכם, ומשם זה נעצר | People recommend you, and it stops there | `audience (segment "selling on referrals")` | framing |  |
| 193 | `extras.pages.story.method_heading` | שבעת הצעדים הראשונים בשיטה | The method's first seven steps | `doors.value[0].method_steps (1–7)` | sourced |  |
| 194 | `extras.pages.story.end_heading` | רוצים לדעת אם זו הדלת שלכם? | Want to know if this is your door? | `site_spec → Sitemap (ends with Check)` | framing |  |
| 195 | `extras.pages.launch.headline` | מתחילים מאפס, או מתחילים מחדש. | Starting from zero, or starting again. | `doors.value[1].for` | sourced |  |
| 196 | `extras.pages.launch.pain_heading` | כשלא ברור מה קודם למה | When it isn't clear what comes first | `audience (new business); pains[2]` | framing |  |
| 197 | `extras.pages.launch.method_heading` | עשרת הצעדים של השיטה | The method's ten steps | `doors.value[1].method_steps (1–10)` | sourced |  |
| 198 | `extras.pages.launch.end_heading` | רוצים לדעת אם זו הדלת שלכם? | Want to know if this is your door? | `site_spec → Sitemap (ends with Check)` | framing |  |
| 199 | `extras.pages.partnership.headline` | לא עוד חודש שנראה כמו הקודם. | No more months that look like the last one. | `pains[0]` | framing |  |
| 200 | `extras.pages.partnership.pain_heading s1` | העסק עובד. | The business works. | `audience (2–20 segment "working but plateaued")` | framing |  |
| 201 | `extras.pages.partnership.pain_heading s2` | ותקוע. | And it's stuck. | `audience (2–20 segment "working but plateaued")` | framing |  |
| 202 | `extras.pages.partnership.end_heading` | הדרך לשותפות מתחילה בפגישת ייעוץ | The way into a Partnership starts with a Clarity Session | `site_spec → Sitemap (/partnership ends with a Clarity Session)` | framing |  |
| 203 | `extras.pages.work.intro s1` | ארגונים, יזמים ומותגים. | Organisations, entrepreneurs, brands. | `site_spec → case pages in three parts; old_case_studies[].tab` | framing |  |
| 204 | `extras.pages.work.intro s2` | כל סיפור מתחיל איפה שהם היו, ונגמר במה שהשתנה. | Each story starts where they were and ends with what changed. | `site_spec → case pages in three parts; old_case_studies[].tab` | framing |  |
| 205 | `extras.pages.work.case_what_we_did.wella s1` | ליווי אסטרטגי שוטף של המנכ"ל ושל צוות השיווק, בחיבור לצוות המכירות. | Ongoing strategic support for the CEO and the marketing team, working hand in hand with sales. | `old_case_studies[wella].text` | sourced |  |
| 206 | `extras.pages.work.case_what_we_did.wella s2` | אסטרטגיה תחת הקונספט BACK TO WELLA, וניהול תקציב השיווק והמדיה. | A strategy under the concept BACK TO WELLA, and management of the marketing and media budget. | `old_case_studies[wella].text` | sourced |  |
| 207 | `extras.pages.work.case_what_we_did.wella s3` | השקה חווייתית של סדרת מוצרים, שהחזירה הביתה לקוחות שהתרחקו. | A product line launched as an experience, which brought lapsed customers back home. | `old_case_studies[wella].text` | sourced |  |
| 208 | `extras.pages.work.case_what_we_did.wella s4` | פורמטים חדשים למערך ההדרכה, ועיצוב מחדש של מארזי החג של הסדרה המובילה. | New formats for the training programme, and a redesign of the holiday packs for the leading line. | `old_case_studies[wella].text` | sourced |  |
| 209 | `extras.pages.work.case_what_we_did.wella s5` | נסיעה ליוון חיברה את הקהילה המקומית לקהילה הבינלאומית, ושירות צבע חדש יצא עם מהלך מכירות ארצי וקמפיין דיגיטלי. | A trip to Greece connected the local community with the international one, and a new colour service went out with a national sales push and a digital campaign. | `old_case_studies[wella].text` | sourced |  |
| 210 | `extras.pages.work.case_what_we_did.wella s6` | ובתוך החברה, הצוות התחבר לערכים המחודשים של המותג. | And inside the company, the team connected with the brand's renewed values. | `old_case_studies[wella].text` | sourced |  |
| 211 | `extras.pages.work.case_what_we_did.eugene-perma s1` | מחקר ואפיון אסטרטגי, ופיצוח קריאטיבי. | Strategic research and positioning, then the creative idea. | `old_case_studies[eugene-perma].text` | sourced |  |
| 212 | `extras.pages.work.case_what_we_did.eugene-perma s2` | משם יצא הקמפיין BLONDE MASTER, שקרא למעצבי שיער מכל הארץ לבוא ולהיות מומחי הבלונד של ישראל. | Out of it came the BLONDE MASTER campaign, which called hairdressers from across the country to become Israel's blonde experts. | `old_case_studies[eugene-perma].text` | sourced |  |
| 213 | `extras.pages.work.case_what_we_did.eugene-perma s3` | לצד הקמפיין נבנה מערך הדרכות שמלמד טכניקות מקצועיות חדשות, וקמה קהילה של מעצבי שיער שרוצים להיות חלק ממנה. | Alongside it we set up a training programme teaching new professional techniques, and a community grew of hairdressers who wanted to be part of it. | `old_case_studies[eugene-perma].text` | sourced |  |
| 214 | `extras.pages.work.case_what_we_did.eugene-perma s4` | גם המותג והצוות שלו קיבלו מיצוב מחדש. | The brand and its team got a new position too. | `old_case_studies[eugene-perma].text` | sourced |  |
| 215 | `extras.pages.work.case_what_we_did.calvin-klein s1` | קונספט שגיבשנו כאן, בדיונים מול מטה התקשורת העולמי של קלווין קליין. | A concept we shaped locally, in discussions with Calvin Klein's global communications office. | `old_case_studies[obsessed-ck].text` | sourced |  |
| 216 | `extras.pages.work.case_what_we_did.calvin-klein s2` | ההפקה עברה בין ערים ברחבי הארץ, עם עמדת צילום חווייתית, והכניסה אנרגיה לכל מערך יועצות היופי. | The production travelled between cities across the country, with an experiential photo booth, and brought energy to the whole team of beauty advisors. | `old_case_studies[obsessed-ck].text` | sourced |  |
| 217 | `extras.pages.work.case_what_we_did.visa-cal` | בסדנה למצליחנות היו הרצאה, עמדת צילום מעצימה לעובדים וגם סדנת תנועה עם כוריאוגרפית. | The success workshop had a talk, an empowering photo booth for the employees and a movement session with a choreographer. | `old_case_studies[visa-cal].text` | sourced |  |
| 218 | `extras.pages.work.case_what_we_did.doron-shefer s1` | נתנו לדורון כלים תקשורתיים. | We gave Doron communication tools. | `old_case_studies[doron-shefer].text` | sourced |  |
| 219 | `extras.pages.work.case_what_we_did.doron-shefer s2` | במקביל עבדנו על בניית האתר, על פאנלים שיווקיים, על הפיתוח העסקי ועל מדף המוצרים. | At the same time we worked on building the website, the marketing panels, the business development and the product shelf. | `old_case_studies[doron-shefer].text` | **unsourced** | source: "העשייה נעשתה באינטגרציה מלאה עם תהליך של בניית אתר, פאנלים שיווקיים ופיתוח עסקי ומדף המוצרים" — the work was integrated with that process; it does not say the studio built the site, panels, BD or shelf. **F2 · copywriter** |
| 220 | `extras.pages.work.case_what_we_did.rita s1` | בנינו קונספט של "ג'אם" ויזואלי ששומר על התדמית ועל האופי של ריטה. | We built a concept of a visual "jam" that keeps Rita's image and character. | `old_case_studies[rita].text` | sourced |  |
| 221 | `extras.pages.work.case_what_we_did.rita s2` | אמנית רב־תחומית הפכה את ריטה למכחול אנושי, ויחד עם רקדן נוצר חיבור בין צבע, מילים ותנועה. | A multidisciplinary artist turned Rita into a human paintbrush, and with a dancer it became one piece of colour, words and movement. | `old_case_studies[rita].text` | sourced |  |
| 222 | `extras.pages.work.case_what_we_did.amt s1` | עשינו מחקר ואפיון, וליווינו את היזם באופן אישי. | We did the research and positioning, and mentored the entrepreneur one to one. | `old_case_studies[amt-case-study].text` | sourced |  |
| 223 | `extras.pages.work.case_what_we_did.amt s2` | סרטוני התדמית הותאמו לכל פלטפורמת שיווק. | The brand films were adapted to each marketing platform. | `old_case_studies[amt-case-study].text` | sourced |  |
| 224 | `extras.pages.work.case_what_we_did.amt s3` | ולאורך הדרך השתנה גם האופן שבו העסק חושב ומתנהל. | And somewhere along the way, how the business thinks and runs changed too. | `old_case_studies[amt-case-study].text` | sourced |  |
| 225 | `extras.pages.work.voices_intro s1` | עשרות עסקים שמנוהלים בידי הבעלים שלהם ראו את המכירות עולות במאות אחוזים. | Dozens of owner-led businesses have seen sales rise by hundreds of percent. | `confirmed_cases[4]` | sourced |  |
| 226 | `extras.pages.work.voices_intro s2` | חלקם סיפרו על זה מול המצלמה. | Some of them talked about it on camera. | `confirmed_cases[4]` | **unsourced** | no dossier entry says which videos state a sales rise; placed above named testimonial captions (Amos/AMT, Ronen, Joya Cosmetics, Natali, Ella) it attributes "hundreds of percent" to named clients by implication, against confirmed_cases[4].note / do_not_claim. **F4 · copywriter** |
| 227 | `extras.pages.work.end_heading` | הצעד הבא: פגישת ייעוץ עם שנינו | Next step: a Clarity Session with both of us | `offers[1] (both partners); site_spec → Sitemap` | framing |  |
| 228 | `extras.pages.about.end_heading s1` | רוצים להכיר? | Want to meet us? | `site_spec → Sitemap (/about ends with a Clarity Session)` | framing |  |
| 229 | `extras.pages.about.end_heading s2` | מתחילים בפגישת ייעוץ. | It starts with a Clarity Session. | `site_spec → Sitemap (/about ends with a Clarity Session)` | framing |  |
| 230 | `extras.pages.brands.pain` | יש תקציב, יש משרדי פרסום, ועדיין נשאר פער אחד שאף אחד לא סוגר. | There's budget, there are agencies, and there's still one gap nobody closes. | `audience (larger brand: budget and agencies, a specific gap → scoped project)` | sourced |  |
| 231 | `extras.pages.brands.solution` | אנחנו נכנסים לפער הזה, בפרויקט בהיקף מוגדר. | We step into that gap, as a scoped project. | `audience (larger brand: budget and agencies, a specific gap → scoped project)` | sourced |  |
| 232 | `extras.pages.brands.films_heading` | מתוך העבודה עם ארגונים | From our work with organisations | `channel_films (A20)` | framing |  |
| 233 | `extras.pages.watch.intro s1` | שש סדרות קצרות. | Six short series. | `video_series (six); site_spec → Funnel (each video links to the Check)` | sourced |  |
| 234 | `extras.pages.watch.intro s2` | אחרי כל סרטון אפשר לעבור לבדיקה הממוקדת. | After every video you can go on to the Spotlight Check. | `video_series (six); site_spec → Funnel (each video links to the Check)` | sourced |  |
| 235 | `extras.pages.watch.series[0].line` | כאב אחד, בשם המדויק שלו, ואז הופכים אותו. | One pain, named exactly, and then turned around. | `video_series; site_spec → Funnel "Six video series" (Shows)` | sourced |  |
| 236 | `extras.pages.watch.series[1].line s1` | טל ושחר על שאלה אחת. | Tal and Shahar on one question. | `video_series; site_spec → Funnel "Six video series" (Shows)` | sourced |  |
| 237 | `extras.pages.watch.series[1].line s2` | לפעמים הם לא מסכימים. | Sometimes they disagree. | `video_series; site_spec → Funnel "Six video series" (Shows)` | sourced |  |
| 238 | `extras.pages.watch.series[2].line` | פגישות אמיתיות, ועבודה באמצע התהליך. | Real sessions, and work in the middle of it. | `video_series; site_spec → Funnel "Six video series" (Shows)` | sourced |  |
| 239 | `extras.pages.watch.series[3].line` | לקוח, ומה השתנה אצלו. | A client, and what changed for them. | `video_series; site_spec → Funnel "Six video series" (Shows)` | sourced |  |
| 240 | `extras.pages.watch.series[4].line` | AI לבעלי עסקים, בלי הפאניקה. | AI for owners, without the panic. | `video_series; site_spec → Funnel "Six video series" (Shows)` | sourced |  |
| 241 | `extras.pages.watch.series[5].line` | לקוחות מספרים, בעשרים עד שלושים שניות. | Clients talking, in twenty to thirty seconds. | `video_series; site_spec → Funnel "Six video series" (Shows)` | **contradicted** | states the series runs 20–30 s; every video placed in it (video_library.voices) is 17–125 s per videos[].duration_s (vid-007 17 s, vid-004 54 s, vid-011 56 s, vid-012 41 s, vid-048 60 s, vid-059 96 s, vid-010 54 s, vid-040 125 s, vid-009 80 s, vid-030 63 s). The brief's "cut to 20–30 s" describes cuts not yet made. **F6 · copywriter** |
| 242 | `extras.pages.watch.empty_series` | הפרקים הראשונים בדרך. | The first episodes are on their way. | `video_series.note (A21)` | framing |  |
| 243 | `extras.pages.course.lessons_heading` | עשרה שיעורים, עשרה צעדים | Ten lessons, ten steps | `method.note; offers[5].format` | sourced |  |
| 244 | `extras.pages.course.voices_heading` | מי שכבר עשו את הקורס | People who've done the course | `confirmed_cases[5].videos (vid-048, vid-059)` | sourced |  |
| 245 | `extras.pages.check.intro.meta` | 10 שאלות · {check_minutes} דקות · בלי תשלום · תמונת מצב אישית | 10 questions · {check_minutes} minutes · free · a personal snapshot | `offers[0]; placeholder {check_minutes}` | sourced |  |
| 246 | `extras.pages.check.questions[5].hint s1` | לא חובה. | Optional. | `site_spec → Check Q6 optional` | framing |  |
| 247 | `extras.pages.check.questions[5].hint s2` | אם קשה לענות, גם זה אומר משהו. | If it's hard to answer, that tells us something too. | `site_spec → Check Q6 optional` | framing |  |
| 248 | `extras.pages.thanks.body` | תמונת המצב תגיע אליכם בוואטסאפ ובמייל, תוך {turnaround}. | Your snapshot will reach you on WhatsApp and by email within {turnaround}. | `brief Tech "Messaging" (snapshot delivery by WhatsApp + email); placeholder {turnaround}` | sourced (brief spec by ref.) |  |
| 249 | `extras.pages.snapshot.intro` | מה שראינו, מהתשובות שלכם וממה שיש עליכם ברשת. | What we saw, from your answers and from what's out there about you online. | `site_spec → Snapshot (automated scan + answers)` | sourced (brief spec by ref.) |  |
| 250 | `extras.pages.snapshot.cta_line` | בפגישת הייעוץ נעבור על תמונת המצב יחד. | In the Clarity Session we'll go through your snapshot together. | `direction must-do 7; offers[1]` | framing |  |
| 251 | `extras.pages.booked.body s1` | אישור יגיע אליכם במייל ובוואטסאפ. | A confirmation is on its way by email and WhatsApp. | `site_spec → Booking (confirmation by email and WhatsApp); runtime vars` | sourced (brief spec by ref.) |  |
| 252 | `extras.pages.booked.body s2` | נתראה ב־{date}, בשעה {time}. | See you on {date} at {time}. | `site_spec → Booking (confirmation by email and WhatsApp); runtime vars` | sourced (brief spec by ref.) |  |
| 253 | `extras.pages.not_found.title` | העמוד הזה לא כאן. | This page isn't here. | `site_spec → 404` | framing |  |
| 254 | `extras.pages.not_found.body` | אולי הקישור השתנה, אולי נפלה בו טעות. | Maybe the link changed, maybe it has a typo in it. | `site_spec → 404` | framing |  |
| 255 | `extras.method_steps[0].title` | אני, המותג, היזמות | Me, the brand, the entrepreneur | `method.value[n]` | sourced |  |
| 256 | `extras.method_steps[1].title` | מדף המוצרים | The product shelf | `method.value[n]` | sourced |  |
| 257 | `extras.method_steps[2].title` | ה־DNA שלי | My DNA | `method.value[n]` | sourced |  |
| 258 | `extras.method_steps[3].title` | ה־DNA של הלקוחות הכי טובים | The DNA of my best clients | `method.value[n]` | sourced |  |
| 259 | `extras.method_steps[4].title` | Know, Like, Trust: מסע הלקוח | Know, like, trust: the client journey | `method.value[n]` | sourced |  |
| 260 | `extras.method_steps[5].title` | חמשת ערכי המותג | The five brand values | `method.value[n]` | sourced |  |
| 261 | `extras.method_steps[6].title` | מיתוג ומיתוג ויזואלי | Branding and visual branding | `method.value[n]` | sourced |  |
| 262 | `extras.method_steps[7].title` | משפך ואסטרטגיה דיגיטלית | Funnel and digital strategy | `method.value[n]` | sourced |  |
| 263 | `extras.method_steps[8].title` | המודל הפיננסי | The financial model | `method.value[n]` | sourced |  |
| 264 | `extras.method_steps[9].title` | מיינדסט | Mindset | `method.value[n]` | sourced |  |
| 265 | `extras.video_library.proof[0].label` | AMDOCS INNOVATION PROJECT | AMDOCS INNOVATION PROJECT | `videos[id].title (verbatim)` | sourced |  |
| 266 | `extras.video_library.proof[1].label` | AMDOCS PURPOSE | AMDOCS PURPOSE | `videos[id].title (verbatim)` | sourced |  |
| 267 | `extras.video_library.proof[2].label` | AMDOCS DARE TO INNOVATE | AMDOCS DARE TO INNOVATE | `videos[id].title (verbatim)` | sourced |  |
| 268 | `extras.video_library.proof[3].label` | מכבי יזמות אנשי האור | מכבי יזמות אנשי האור | `videos[id].title (verbatim)` | sourced |  |
| 269 | `extras.video_library.proof[4].label` | מכבי יזמות- לוחמי אור | מכבי יזמות- לוחמי אור | `videos[id].title (verbatim)` | sourced |  |
| 270 | `extras.video_library.proof[5].label` | Maccabi בתי הרופאים 2023 | Maccabi בתי הרופאים 2023 | `videos[id].title (verbatim)` | sourced |  |
| 271 | `extras.video_library.proof[6].label` | מכבי דנט מודעות סרטן הפה | מכבי דנט מודעות סרטן הפה | `videos[id].title (verbatim)` | sourced |  |
| 272 | `extras.video_library.proof[7].label` | SEAT TV COMMERCIAL | SEAT TV COMMERCIAL | `videos[id].title (verbatim)` | sourced |  |
| 273 | `extras.video_library.proof[8].label` | פארק בבלי נדלן | פארק בבלי נדלן | `videos[id].title (verbatim)` | sourced |  |
| 274 | `extras.video_library.proof[9].label` | קמפיין פארק בבלי | קמפיין פארק בבלי | `videos[id].title (verbatim)` | sourced |  |
| 275 | `extras.video_library.proof[10].label` | WELLA CASE STUDY | WELLA CASE STUDY | `videos[id].title (verbatim)` | sourced |  |
| 276 | `extras.video_library.proof[11].label` | artistic seminar for Wella | artistic seminar for Wella | `videos[id].title (verbatim)` | sourced |  |
| 277 | `extras.video_library.proof[12].label` | EUGENE PERMA BLONDE MASTER STUDY CASE | EUGENE PERMA BLONDE MASTER STUDY CASE | `videos[id].title (verbatim)` | sourced |  |
| 278 | `extras.video_library.proof[13].label` | OBSESSED- CK TEAM BOOSTER CASE STUDY | OBSESSED- CK TEAM BOOSTER CASE STUDY | `videos[id].title (verbatim)` | sourced |  |
| 279 | `extras.video_library.proof[14].label` | VISA CAL MANAGMENT TEAM BOOSTER | VISA CAL MANAGMENT TEAM BOOSTER | `videos[id].title (verbatim)` | sourced |  |
| 280 | `extras.video_library.proof[15].label` | DORON SHEFER CASE STUDY | DORON SHEFER CASE STUDY | `videos[id].title (verbatim)` | sourced |  |
| 281 | `extras.video_library.proof[16].label` | דורון שפר מיתוג | דורון שפר מיתוג | `videos[id].title (verbatim)` | sourced |  |
| 282 | `extras.video_library.proof[17].label` | CASE STUDY RITA | CASE STUDY RITA | `videos[id].title (verbatim)` | sourced |  |
| 283 | `extras.video_library.proof[18].label` | AMT CASE STUDY | AMT CASE STUDY | `videos[id].title (verbatim)` | sourced |  |
| 284 | `extras.video_library.proof[19].label` | מיתוג מעסיק TABOOLA | מיתוג מעסיק TABOOLA | `videos[id].title (verbatim)` | sourced |  |
| 285 | `extras.video_library.proof[20].label` | TABOOLA AT HILTON | TABOOLA AT HILTON | `videos[id].title (verbatim)` | sourced |  |
| 286 | `extras.video_library.proof[21].label` | kornit make better | kornit make better | `videos[id].title (verbatim)` | sourced |  |
| 287 | `extras.video_library.proof[22].label` | KORNIT RECAP EXTERNAL | KORNIT RECAP EXTERNAL | `videos[id].title (verbatim)` | sourced |  |
| 288 | `extras.video_library.proof[23].label` | בזק אנשים | בזק אנשים | `videos[id].title (verbatim)` | sourced |  |
| 289 | `extras.video_library.proof[24].label` | פרויקט פנים ארגוני לשירותי בריאות כללית | פרויקט פנים ארגוני לשירותי בריאות כללית | `videos[id].title (verbatim)` | sourced |  |
| 290 | `extras.video_library.proof[25].label` | מיתוג מעסיק וגיוס עובדים פיליפ מוריס | מיתוג מעסיק וגיוס עובדים פיליפ מוריס | `videos[id].title (verbatim)` | sourced |  |
| 291 | `extras.video_library.proof[26].label` | Mercedes vip club 1 of 300 videos | Mercedes vip club 1 of 300 videos | `videos[id].title (verbatim)` | **contradicted** | videos[vid-041].title verbatim, but "1 of 300 videos" is a figure beyond the brief's three stats (do_not_claim[3]); a verbatim title is not an exemption on a page. **F5 · copywriter** |
| 292 | `extras.video_library.proof[27].label` | SUCCESS IS A DRIVE | SUCCESS IS A DRIVE | `videos[id].title (verbatim)` | sourced |  |
| 293 | `extras.video_library.proof[28].label` | CASTRO DPPL | CASTRO DPPL | `videos[id].title (verbatim)` | sourced |  |
| 294 | `extras.video_library.voices[0].label` | AMOS TESTIMONIALS | AMOS TESTIMONIALS | `videos[id].title (verbatim)` | sourced |  |
| 295 | `extras.video_library.voices[0].caption` | עמוס, AMT | Amos, AMT | `testimonials.video[].person` | sourced |  |
| 296 | `extras.video_library.voices[1].label` | AMOS TESTIMONIALS | AMOS TESTIMONIALS | `videos[id].title (verbatim)` | sourced |  |
| 297 | `extras.video_library.voices[1].caption` | עמוס, AMT | Amos, AMT | `testimonials.video[].person` | sourced |  |
| 298 | `extras.video_library.voices[2].label` | TESTIMONIALS RONEN | TESTIMONIALS RONEN | `videos[id].title (verbatim)` | sourced |  |
| 299 | `extras.video_library.voices[2].caption` | רונן | Ronen | `testimonials.video[].person` | sourced |  |
| 300 | `extras.video_library.voices[3].label` | TESTIMONIALS JOYA COSMETICS | TESTIMONIALS JOYA COSMETICS | `videos[id].title (verbatim)` | sourced |  |
| 301 | `extras.video_library.voices[3].caption` | Joya Cosmetics | Joya Cosmetics | `testimonials.video[].person` | sourced |  |
| 302 | `extras.video_library.voices[4].label` | Brand Yourself - Testimonials - Natali | Brand Yourself - Testimonials - Natali | `videos[id].title (verbatim)` | sourced |  |
| 303 | `extras.video_library.voices[4].caption` | נטלי, BRAND YOURSELF | Natali, BRAND YOURSELF | `testimonials.video[].person` | sourced |  |
| 304 | `extras.video_library.voices[5].label` | Brand Yourself - Testimonials - ELLA | Brand Yourself - Testimonials - ELLA | `videos[id].title (verbatim)` | sourced |  |
| 305 | `extras.video_library.voices[5].caption` | אלה, BRAND YOURSELF | Ella, BRAND YOURSELF | `testimonials.video[].person` | sourced |  |
| 306 | `extras.video_library.voices[6].label` | TESTIMONIALS MAGIC TALOU | TESTIMONIALS MAGIC TALOU | `videos[id].title (verbatim)` | sourced |  |
| 307 | `extras.video_library.voices[6].caption` | {name_to_confirm} | {name_to_confirm} | `testimonials.video[].person` | sourced |  |
| 308 | `extras.video_library.voices[7].label` | Talou Testimonial Film 1 HQ | Talou Testimonial Film 1 HQ | `videos[id].title (verbatim)` | sourced |  |
| 309 | `extras.video_library.voices[7].caption` | {name_to_confirm} | {name_to_confirm} | `testimonials.video[].person` | sourced |  |
| 310 | `extras.video_library.voices[8].label` | Talou Testimonial Film 2 HQ | Talou Testimonial Film 2 HQ | `videos[id].title (verbatim)` | sourced |  |
| 311 | `extras.video_library.voices[8].caption` | {name_to_confirm} | {name_to_confirm} | `testimonials.video[].person` | sourced |  |
| 312 | `extras.video_library.voices[9].label` | Talou Testimonial Film 3 HQ | Talou Testimonial Film 3 HQ | `videos[id].title (verbatim)` | sourced |  |
| 313 | `extras.video_library.voices[9].caption` | {name_to_confirm} | {name_to_confirm} | `testimonials.video[].person` | sourced |  |
| 314 | `extras.video_library.boots[0].label` | סדנה למיתוג אישי מנצח ליזמים בשיתוף עם בנק פועלים | סדנה למיתוג אישי מנצח ליזמים בשיתוף עם בנק פועלים | `videos[id].title (verbatim)` | sourced |  |
| 315 | `extras.video_library.course_trailer.label` | BRAND YOURSELF INTO THE PROCESS | BRAND YOURSELF INTO THE PROCESS | `videos[vid-036].title` | sourced |  |
| 316 | `extras.msg.snapshot s1` | היי {first_name}, כאן {partner_name} מ־Talou L'oren. | Hi {first_name}, it's {partner_name} from Talou L'oren. | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 317 | `extras.msg.snapshot s2` | תמונת המצב של {business_name} מוכנה: {link} | The snapshot for {business_name} is ready: {link} | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 318 | `extras.msg.snapshot s3` | אם משהו שם מפתיע אתכם, אפשר לענות כאן. | If anything in it surprises you, just reply here. | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 319 | `extras.msg.email_subject_snapshot` | תמונת המצב של {business_name} מוכנה | The snapshot for {business_name} is ready | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 320 | `extras.msg.follow1 s1` | {first_name}, דבר אחד מתמונת המצב נשאר איתנו: {observation}. | {first_name}, one thing from your snapshot stayed with us: {observation}. | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 321 | `extras.msg.follow1 s2` | רוצים לדבר על זה? | Want to talk it through? | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 322 | `extras.msg.follow1 s3` | {booking_link} | {booking_link} | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 323 | `extras.msg.follow2 s1` | סיפור של עסק שהיה במקום דומה לשלכם: {case_title}. | The story of a business that was somewhere close to where you are: {case_title}. | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 324 | `extras.msg.follow2 s2` | {case_link} | {case_link} | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 325 | `extras.msg.follow3` | משהו קטן שאפשר לעשות כבר השבוע: {tip} | A small thing you could do this week: {tip} | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 326 | `extras.msg.follow4` | סרטון קצר, קשור למה שראינו אצלכם: {video_link} | A short video, about what we saw in your business: {video_link} | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 327 | `extras.msg.follow5 s1` | זו ההודעה האחרונה מאיתנו בינתיים. | This is our last note for now. | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 328 | `extras.msg.follow5 s2` | כשתרצו תוכנית פעולה כתובה, מתחילים בפגישת ייעוץ: {booking_link} | Whenever you want a written action plan, it starts with a Clarity Session: {booking_link} | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 329 | `extras.msg.email_subject_follow` | עוד מחשבה על {business_name} | One more thought about {business_name} | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 330 | `extras.msg.booking_confirm s1` | פגישת הייעוץ נקבעה: {date}, בשעה {time}. | Your Clarity Session is booked: {date} at {time}. | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 331 | `extras.msg.booking_confirm s2` | {location_or_link} | {location_or_link} | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 332 | `extras.msg.booking_confirm s3` | טל ושחר | Tal and Shahar | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 333 | `extras.msg.booking_reminder s1` | תזכורת: נפגשים מחר בשעה {time}. | Reminder: we're meeting tomorrow at {time}. | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 334 | `extras.msg.booking_reminder s2` | {location_or_link} | {location_or_link} | `site_spec → Funnel / Booking; runtime vars` | framing |  |
| 335 | `extras.msg.unsubscribe` | כדי להפסיק לקבל הודעות, השיבו "הסר". | To stop these messages, reply STOP. | `none (opt-out mechanism; consent wording undecided, gaps[legal.privacy])` | framing |  |
| 336 | `extras.seo.home.title` | Talou L'oren · מיתוג אישי לעסק ובניית מותג אישי | Talou L'oren · Personal branding for business owners | `business.name; offers[0..4]; team[].name; C-position-21 (SURVIVES)` | sourced |  |
| 337 | `extras.seo.home.description` | טל אורן ושחר נאור: בדיקה ממוקדת בלי תשלום, פגישת ייעוץ עם שנינו, ודרך לעסק שלכם, מסיפור ועד שותפות. | Tal Oren and Shahar Naor: a free Spotlight Check, a Clarity Session with both of us, and a path for your business, from Story to Partnership. | `business.name; offers[0..4]; team[].name; C-position-21 (SURVIVES)` | sourced |  |
| 338 | `extras.seo.story.title` | סיפור · מיתוג לעסקים קטנים · Talou L'oren | Story · Branding for small businesses · Talou L'oren | `offers[2]; doors.value[0].delivers; C-position-22 (WEAKENED, used as keyword only)` | sourced |  |
| 339 | `extras.seo.story.description` | ספרינט סיפור של 2–4 שבועות: ה־DNA של המותג, חמשת הערכים, סיפור הליבה, המסרים והשפה הוויזואלית. | A 2–4 week Story Sprint: brand DNA, five values, core story, messaging and visual language. | `offers[2]; doors.value[0].delivers; C-position-22 (WEAKENED, used as keyword only)` | sourced |  |
| 340 | `extras.seo.launch.title` | השקה · מיתוג לעסק חדש והקמת עסק חדש · Talou L'oren | Launch · Branding a new business · Talou L'oren | `offers[3]; doors.value[1].delivers; C-position-22 (keyword only)` | sourced |  |
| 341 | `extras.seo.launch.description` | בניית השקה של 6–10 שבועות לעסקים חדשים: אסטרטגיה, זהות, אתר, משפך, תוכן להשקה וקמפיין ראשון. | A 6–10 week Launch Build for new businesses: strategy, identity, website, funnel, launch content and a first campaign. | `offers[3]; doors.value[1].delivers; C-position-22 (keyword only)` | sourced |  |
| 342 | `extras.seo.partnership.title` | שותפות · מנטור עסקי ואסטרטגיה שיווקית לעסק · Talou L'oren | Partnership · Business mentoring and marketing strategy · Talou L'oren | `offers[4].format; C-position-22 (keyword only)` | sourced |  |
| 343 | `extras.seo.partnership.description` | 3–6 חודשים, פגישה שבועית עם טל ושחר, ומערכת לשיווק, למכירות ולתפעול. | 3–6 months, a weekly meeting with Tal and Shahar, and a system for marketing, sales and operations. | `offers[4].format; C-position-22 (keyword only)` | sourced |  |
| 344 | `extras.seo.work.title` | עבודות · Amdocs, מכבי, SEAT, פארק בבלי · Talou L'oren | Work · Amdocs, Maccabi, SEAT, Park Bavli · Talou L'oren | `confirmed_cases[0..3]; old_case_studies; testimonials.video` | sourced |  |
| 345 | `extras.seo.work.description` | סיפורים מהעבודה עם ארגונים, יזמים ומותגים, וסרטונים של לקוחות. | Stories from our work with organisations, entrepreneurs and brands, and client videos. | `confirmed_cases[0..3]; old_case_studies; testimonials.video` | sourced |  |
| 346 | `extras.seo.about.title` | טל אורן ושחר נאור · Talou L'oren | Tal Oren and Shahar Naor · Talou L'oren | `team[].name/.role` | sourced |  |
| 347 | `extras.seo.about.description` | אסטרטג מותג ומנטור עסקי, ומעצב, מפתח ואסטרטג מוצר. | A brand strategist and business mentor, and a designer, developer and product strategist. | `team[].name/.role` | sourced |  |
| 348 | `extras.seo.brands.title` | לחברות ולצוותים · Talou L'oren | For brands and teams · Talou L'oren | `audience (scoped project); offers_note` | sourced |  |
| 349 | `extras.seo.brands.description` | פרויקטים בהיקף מוגדר לחברות ולצוותים: מיתוג, תוכן, הפקה ואסטרטגיה. | Scoped projects for companies and teams: branding, content, production and strategy. | `audience (scoped project); offers_note` | sourced |  |
| 350 | `extras.seo.watch.title` | לצפייה · Talou L'oren | Watch · Talou L'oren | `video_series` | sourced |  |
| 351 | `extras.seo.watch.description` | שש סדרות סרטונים קצרים לבעלי עסקים. | Six series of short videos for business owners. | `video_series` | sourced |  |
| 352 | `extras.seo.course.title` | BRAND YOURSELF · קורס מיתוג אישי לעסק | BRAND YOURSELF · Personal branding course | `offers[5]; method.note; C-position-21` | sourced |  |
| 353 | `extras.seo.course.description` | עשרה שיעורים מוקלטים, בקצב שלכם, לפי שיטת עשרת הצעדים. | Ten recorded lessons, at your own pace, following the ten-step method. | `offers[5]; method.note; C-position-21` | sourced |  |
| 354 | `extras.seo.check.title` | בדיקה ממוקדת · ייעוץ עסקי לעסקים קטנים בחינם · Talou L'oren | Spotlight Check · Free business review for small businesses · Talou L'oren | `offers[0]; direction must-do 14; C-position-22 (keyword only)` | sourced |  |
| 355 | `extras.seo.check.description` | 10 שאלות, ותמונת מצב אישית של העסק שלכם. | 10 questions, and a personal snapshot of your business. | `offers[0]; direction must-do 14; C-position-22 (keyword only)` | sourced |  |

## Voice audit

Criteria: R rhythm varies · T no triads · P no padding vocabulary · N concrete nouns · L at least one honest limit · G register matches the owner's (warm, calm, direct, plural address) · A reads aloud without wincing · C written in the locale's own cadence. ✓ = clean, ✗ = flagged (blocking items in the table above, notes below).

| Section | he | en | Notes |
|---|---|---|---|
| Home hero + closing | ✓ all | ✓ all | approved lines verbatim (triad in the subtitle is the client's line, exempt) |
| Mirror (`copyBlocks[1]`) | ✓ all | ✗ A | en heading missing "?" (**V2**). The even rhythm is deliberate (one pain per line) |
| Flip (`copyBlocks[2]`) | ✓ all | ✓ all | |
| Partners (`copyBlocks[3]`, `team[]`) | ✓ all | ✓ all | "ביחד נדייק את החזון שלכם" / "Together we sharpen your vision" is the kept old-site line |
| Doors, offers (`services[]`) | ✓ all | ✓ all | honest limits present (free Check, fee credited, `{placeholders}`) |
| How it works, proof, FAQ | ✓ all | ✓ all | 3 of 6 FAQ answers open "כן." / "Yes.": fine |
| `/story`, `/launch` | ✓ all | ✓ all | |
| `/partnership` | ✗ R, A | ✗ R, A | **V1** |
| `/work` case stories | ✓ all | ✗ C (note) | en reads translated in places: "took real space on social media", "brought lapsed customers back home", "wide exposure", "Nobody wanted the brand". Not blocking. Wella p1 and Visa Cal keep list fragments; the items are the facts |
| `/brands` | ✓ all | ✓ all | the three-beat pain line works when spoken |
| `/watch` | ✓ all | ✓ all | (F6 is a fact item, not voice) |
| `/course` | ✓ all | ✓ all | |
| Check, snapshot, booking | ✓ all | ✓ all | "אם קשה לענות, גם זה אומר משהו" is a good honest line. No fear bands, no countdowns |
| `msg.*` | ✓ all | ✓ all | plural address, signed by first names |
| Newsletter, legal, 404 | ✓ all | ✗ C (note) | en newsletter "each one carrying a single idea" is stiff. Not blocking |
| `seo.*` | ✓ | ✓ | keyword-led by design (direction must-do 14) |

Brief rules checked on every string: plural or neutral Hebrew address (a grep for masculine and feminine singular forms finds none in reader address; "מי ש…" + singular appears only for third parties), no `!` (0 / 0), no hype, no promised returns. `/partnership` "לא עוד חודש שנראה כמו הקודם" is an emotional promise, not a return, so framing.

## Completeness audit

- **Schema (v0.11, `brand_practice`; the vertical pack is still a stub):** every required field is filled or empty with a stated reason in `sources.md`. `clientLogos[].logo` is null for 10 of 17 rows (no file: gap `client_logos (resolution)`). `method.stages[]` is empty because the cap is 6 and the method has 10 steps; the steps live in `extras.method_steps` (a schema gap for the owner). The confirmed cases' `challenge` / what-we-did are visible placeholders. Doron Shefer's outcome is a placeholder (the source states none).
- **Sitemap:** all 16 routes plus 404 have copy in both locales (`/privacy` and `/accessibility` hold placeholders and the IS 5568 statement frame). Home has all 11 sections in order, with six FAQ items.
- **Check flow:** 10 questions, one per screen, with progress `{n} / 10`, Back and Next, "pick an answer to continue", Q2 "none yet", Q6 optional, Q10 placeholder ranges + start time, then name, email, phone and `{consent_text}`. Matches the brief.
- **Snapshot:** business name as the title, five dimensions on a 1–5 scale, three observations, first move, five path options, "Reviewed by {partner_name}", and the booking line. Matches the brief.
- **Booking:** time → details → pay, confirmation page, `msg.booking_confirm` + `booking_reminder`. Length, price and credit come from `services[clarity-session]` and `{price_session}`.
- **`msg.*`:** snapshot delivery (WhatsApp + email subject), five follow-ups + email subject, booking confirm and reminder, unsubscribe. Complete for the brief's three uses.
- **Both languages:** identical key sets (837). No field is empty in one locale and filled in the other. The `{placeholder}` sets are identical.
- **Duplicates:** the four deliberate repeats in `sources.md` are justified. V1 is the one repeat that is not.
- **Must-do items (`direction.md`):** 1, 5–12, 14–17 are covered in copy (2–4, 13, 18 are design or dropped). The exception is the brief rule behind 15 and 17 (pain before solution on every page): **K1**.

Not blocking:
- No email subject for the booking confirmation (the brief asks for email and WhatsApp confirmation; `msg.booking_confirm` can serve both bodies).
- `seo.course.title` is the only title without "· Talou L'oren".
- Testimonial captions name Amos (AMT), Ronen, Joya Cosmetics, Natali and Ella, but hold Dr. Oded Kravtchik and "Yifat" as `{name_to_confirm}`. None of the five named is on the brief's people list, and `direction.md` must-do 10 says "no names outside the brief's list". The talouloren.com testimonial pages publish all five, A20 clears every channel film, and the harvester's gap covers only Kravtchik and Yifat. **Shahar to confirm** that published testimonial names may be captioned.
- `extras.msg.unsubscribe` ("reply הסר / STOP") and FAQ a5 s2 ("you can stop them whenever you like") describe an opt-out the brief does not specify. Consent wording is still undecided. Owner to confirm with the consent text.
- `newsletter.label` describes a letter that does not exist yet (no provider). Framing; owner to confirm.

## Research check

The copy makes no claim about the industry, the market or competitors, so no sentence rests on a research claim except the SEO keywords. Those use C-position-21 (SURVIVES) and C-position-22 (WEAKENED: "typed in Israel; who types them is not known"). They are used only as title words, with no claim about the audience, so that is within the narrowed form. No KILLED claim exists (skeptic: 39 / 13 / 0).

Suggested updates (not blocking; the copywriter writes the words):

| Field | Change and why | Behind it |
|---|---|---|
| `extras.pages.check.intro.meta` | Fill `{check_minutes}` once the mock is timed. In the set, free diagnostics sell themselves by stating the time cost next to "free" and the payoff | must-do 6; C-references-13 (narrowed) |
| `extras.pages.book.*` | Show the fee-credit line on the booking step itself, not only on the offer card. No site in the set credits a session fee, so the line has to carry its own weight | must-do 8; C-references-15 (narrowed) |
| `extras.seo.course.title` | Add the brand name like the other titles, using the one spelling chosen | must-do 14; C-position-18 (narrowed) |
| `extras.video_library.voices[6..9].caption` | Resolve the four `{name_to_confirm}` captions with Shahar: testimonials show a name first | must-do 11 |
| `extras.home.proof.people[8]` | Confirm "Rotem Yadlin" (brief) against the old site's "Yaldin" | C-position-12 |
| Home proof / partnership band | Keep the "big names, and they sit with you" bridge visible beside the logo wall. It now lives in the hero subtitle and the Partnership body only | Positioning "Big-name proof, owner-led promise"; C-position-08, C-position-17 (narrowed), C-position-20 |
| `services[spotlight-check]`, `seo.check` | No change: "free" is stated in both, which answers the free-diagnostic gap in Hebrew branding | C-references-11, C-references-18 |

## Counts

- Sentences audited: **706** (353 he + 353 en) in 355 table rows. Plus 378 non-asserting strings per locale, read and listed by group above.
- Sentence-instances by verdict: sourced **546** · sourced (brief spec by ref.) **20** · framing **129** · shared-context **0** · **unsourced 7** · **contradicted 4**.
- Blocking items: 6 fact (H1, F2–F6: humanizer 1, copywriter 5) · 2 voice (V1, V2: humanizer) · 1 completeness (K1: copywriter).

Other notes, outside the copy: the run file pins copywriter 0.5.1, which does not exist (`agents/copywriter/base.md` is 0.5.0, as `sources.md` notes). The fact audit was not affected.
