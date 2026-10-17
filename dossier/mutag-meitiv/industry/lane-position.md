---
node: lane
role: researcher
run: 2026-10-il-brand-01
lane: position
status: complete
---

# lane: position — where מותג מיטיב (Mutag Meitiv) stands today

## Summary

The current site is a Wix build with 24 sitemap pages, 66 blog posts and 9 blog categories. Only 8 pages can be reached from the menu. At least 9 pages are stale, empty, template leftovers or duplicates. The two leading services (brief item 12) each have a page: personal branding on `/personal101`, whose menu label reads "פיתוח עסק עם משמעות" ("developing a business with meaning"), and strategic planning on `/process`, labelled "תהליך המיתוג" ("the branding process"). Neither page shows a price, and the two pages describe the method in different numbers of stages. Proof is real but scattered: an unnamed 2022 "1st place" branding award, 13 client logos with no case studies, about 9 testimonials (several in English), a Brand The Change trainer credential that can be checked off-site, a podcast with 23 episodes (2022–2026) and a blog whose output dropped from 22 posts in 2020 to 3–5 a year.

## Claims

### C-position-01 — The site is a Wix build with 24 sitemap pages, and only 8 of them can be reached from the menu
- **Evidence:** `/sitemap.xml` (`generatedBy="WIX"`) has six child sitemaps. `pages-sitemap.xml` lists 20 URLs, `booking-services-sitemap.xml` 1, `event-pages-sitemap.xml` 3, `blog-posts-sitemap.xml` 66 and `blog-categories-sitemap.xml` 9 (including `/blog`). `member-profiles` is empty. The header and footer menus on every page link only to: בית (home), אודות `/about`, בלוג `/blog`, תהליך המיתוג `/process`, פיתוח עסק עם משמעות `/personal101`, הדרכות והרצאות `/סדנאות-והרצאות`, הצהרת נגישות (accessibility statement), and the header button "פה יוצרים קשר" ("get in touch here") → `/contact`. A link scan of all 24 downloaded pages found 12 pages that no other page links to: `/podcastbestchapters`, `/brandpower`, `/event`, `/copy-of-אודות`, `/courses`, `/smst`, `/newcourse`, `/copy-of-מעסק-למותג-מיטיב-הקורס`, `/brandandbreakfast`, `/support-us`, plus `/register` (linked only from the two orphan course pages) and `/book-online` (linked only from the service page). All `pages-sitemap` lastmods read 2026-10-05, a site-wide republish rather than an edit to each page.
- **Source:** https://www.mutagmeitiv.com/sitemap.xml and its children; every page fetched with curl, 2026-10-17
- **Date:** 2026-10
- **Confidence:** high (Wix can show menu items through JS-only "More" dropdowns that a link scan of the HTML misses; the server-rendered menu is identical on every page)
- **Changes my mind:** A rendered-browser crawl showing any of the 12 pages in a dropdown or button that the HTML did not expose.

### C-position-02 — Personal branding is presented mainly on `/personal101`, under a menu label that does not say "personal branding"
- **Evidence:** The home card "מיתוג אישי" ("personal branding"), with the text "תהליכי ליווי ומיתוג אישי לעסקים. איך לגשר בין מהות למשמעות ולתרגם לאסטרטגית מיתוג" ("personal guidance and branding processes for businesses; how to bridge essence and meaning and translate them into a branding strategy"), links to `/personal101`. In the menu that page is "פיתוח עסק עם משמעות". Its `<title>` is "פיתוח עסק עם משמעות | brandforthebetter", and the search index shows it as "ליווי לעסקים עם משמעות" ("guidance for businesses with meaning"), so the page has three names. The content does say "איך עובד תהליך מיתוג אישי?" ("how does a personal branding process work?"). It sets four questions (who am I / what do I do / for whom / why it matters), four stages (SENSING, THINKING, MAKING with optional visual identity, INFLUENCING as ongoing supervision) and "השלב הראשון והשני לוקחים כ 10 - 15 מפגשים" ("stages one and two take about 10–15 meetings"). It has a free Zoom intro call (Calendly `/hadas/30min`) and three testimonials. It shows no price. A second, group form of personal branding exists only on the orphan course pages `/newcourse` and `/copy-of-מעסק-למותג-מיטיב-הקורס`, both titled "מעסק למותג מיטיב | קורס מיתוג אישי" ("from business to beneficial brand | personal branding course").
- **Source:** https://www.mutagmeitiv.com/ ; https://www.mutagmeitiv.com/personal101 ; https://www.mutagmeitiv.com/newcourse ; WebSearch "mutagmeitiv.com" result titles
- **Date:** 2026-10
- **Confidence:** high
- **Changes my mind:** The client saying a different page or offer is "personal branding" (for example the course rather than 1:1 guidance).

### C-position-03 — Strategic planning is presented on `/process`, labelled "the branding process", and it describes the method differently from `/personal101`
- **Evidence:** The home card "תכנון אסטרטגי" ("strategic planning"), with "BRAND THE CHANGE — מיתוג חדש או ריברנד - לבנות אירגון מצליח שגם מיטיב עם העולם דרך תכנון אסטרטגיית מותג מיטיב" ("new branding or rebrand: build a successful organisation that also does good, through planning a beneficial brand strategy"), links to `/process`, which the menu calls "תהליך המיתוג". `/process` describes **three** stages (Sensing, Thinking, Making), while `/personal101` describes **four** (adding INFLUENCING). `/process` also has the claim "20 שנות אסטרטגיה, עיצוב ומיתוג" ("20 years of strategy, design and branding"), the Brand The Change canvases translated into Hebrew, and one CTA, "לקביעת פגישת הכרות" ("book an intro meeting", Calendly). It has no price, no testimonials and no case study. The text is long, unbroken paragraphs. The home hero link "אסטרטגיות" also goes to `/process`. One related blog post exists, `/post/strategy` (2026-04).
- **Source:** https://www.mutagmeitiv.com/process ; https://www.mutagmeitiv.com/personal101 ; https://www.mutagmeitiv.com/
- **Date:** 2026-10
- **Confidence:** high
- **Changes my mind:** The client confirming that strategic planning is sold under another page or name, or that the three-stage and four-stage versions are deliberately different products.

### C-position-04 — The site shows prices only for courses and workshops, all in shekels, and they conflict with one another
- **Evidence:** The leading services (C-position-02, -03) show no price anywhere. Prices that do appear: `/סדנאות-והרצאות` ("training and lectures"): professional course "5200 ש"ח + מע"מ" (+VAT), "הקורס למובילי שינוי" (8 meetings) "3200 ש"ח + מע"מ", therapists' day retreat "580 ש"ח לאדם + מע"מ", THE BETTER 4 vision workshop "480 ש"ח + מע"מ", intro workshop "חינם" (free). `/service-page/brand-the-change-לאנשי-מקצוע` and `/book-online`: "2,850 ₪" for the same 8-meeting professional course that the workshops page prices at 5,200 + VAT. `/copy-of-מעסק-למותג-מיטיב-הקורס`: "2650 ₪" for 8 meetings. `/smst` and `/brandandbreakfast`: "350 ש״ח". The units mix "ש"ח", "ש״ח", "₪" and "שקלים חדשים", and VAT is stated for some prices and not for others. Payment links go to Bit, PayBox and upay (`/register`, `/smst`).
- **Source:** the pages named above, fetched 2026-10-17
- **Date:** 2026-10 (page content undated)
- **Confidence:** high that the figures are on the pages; whether any is current is unknown (C-position-05)
- **Changes my mind:** The client giving one current price list, or saying the 2,850 / 5,200 figures are different products.

### C-position-05 — At least nine pages are stale, empty, broken or Wix template leftovers
- **Evidence:** `/event`: "אין אירועים כרגע" ("no events at the moment"). `/events/meal-packaging-delivery`, `/single-parent-cooking-workshop` and `/thanksgiving-soup-kitchen` are Wix template events (San Francisco, "02 בינו׳ 2023", "Registration is Closed"). `/courses`: a heading and nothing else. `/book-online`: the only service is marked "הסתיים" ("ended"), and its service page says "שירות זה אינו זמין" ("this service is unavailable") alongside "כבר התחיל" ("already started"). `/register`: "MAP YOUR VISION 2025 … 10 באוקטובר" (a 2025 event). `/brandandbreakfast`: "יום שישי 15.5.26" (past). `/newcourse`: "ההרשמה נסגרה" ("registration closed"). `/copy-of-מעסק…`: "שתי מלגות ינתנו לעסקים שנפגעו בשנת הקורונה" ("two scholarships for businesses hurt in the corona year", 2020–21). `/support-us` (title "קורסים והרצאות", "courses and lectures"): an intro lecture "שיחל ב 24.9" with no year, plus a "Donate" button. Both course pages link to `/blank-2`, which returns the Wix "404 Error Page". The footer still reads "@2019".
- **Source:** the pages named above; https://www.mutagmeitiv.com/blank-2
- **Date:** 2026-10
- **Confidence:** high
- **Changes my mind:** The client saying a listed date is a recurring event that is still being sold.

### C-position-06 — Three pairs of pages duplicate each other
- **Evidence:** `/copy-of-אודות` and `/about` tell the same "כל סיפור טוב מתחיל מקונפליקט" ("every good story starts with conflict") founder story from late 2016, in two versions. The copy credits the quote to "Sadhguru", the live page to "a smart person". `/newcourse` and `/copy-of-מעסק-למותג-מיטיב-הקורס` carry the same title and the same 9-meeting syllabus; only meeting 6 differs ("סטוריטלינג", storytelling, vs "שיווק מבוסס תוכן", content marketing), along with price and status. The professional Brand The Change course appears on both `/סדנאות-והרצאות` and `/service-page/…` at different prices (C-position-04). `/newcourse` is the version Google has indexed (WebSearch result).
- **Source:** the pages named; WebSearch "mutagmeitiv.com"
- **Date:** 2026-10
- **Confidence:** high
- **Changes my mind:** The client saying one of a pair is intentionally live for a separate audience.

### C-position-07 — The site claims a 2022 first-place branding award but never names the award or its organiser, and we could not verify it off-site
- **Evidence:** Home hero badge: "1st PLACE — Branding for non profit organizations" (image alt "1st place brand Award_winner"). `/newcourse`: "מותג מיטיב הוא זוכה פרס המיתוג הישראלי לשנת 2022 בקטגוריית non-profit organizations" ("Mutag Meitiv won the Israeli branding award for 2022 in the non-profit organizations category"). Home team block: designer Dana Russo is "זוכת פרס המיתוג הטוב ביותר בקטגוריית עמותות לשנת 2022" ("winner of the best-branding award in the NGO category, 2022"). So the site credits the same award both to the studio and to a collaborator. No page names the competition, links to it or shows the winning project. A Hebrew WebSearch for the 2022 NGO-category winner returned nothing that matches.
- **Source:** https://www.mutagmeitiv.com/ ; https://www.mutagmeitiv.com/newcourse ; WebSearch (no match)
- **Date:** 2026-10 (claim refers to 2022)
- **Confidence:** high that the site makes the claim; low on what the award is
- **Changes my mind:** The organiser's winners list naming Mutag Meitiv and/or Dana Russo and the project.

### C-position-08 — Client proof is 13 logos in one strip, with no case studies or project pages
- **Evidence:** Home section "מודה על הזכות להטיב ב:" ("grateful for the privilege of doing good at:") shows logos. From their alt text: Haifa municipality (עיריית חיפה), Fairtrade Israel, Haifa cities association (איגוד ערים חיפה), Kfar Yona (כפר יונה), Hof HaCarmel regional council (מועצה אזורית חוף הכרמל), Reichman University (רייכמן), Mandel Institute, Bartaly – youth in motion (עמותת ברטלי נוער בתנועה), MATI (מטי), Midatech systems (מידעטק מערכות), the mothers' league (ליגת האמהות), "ריפוי עצמי 2024" (self-healing 2024) and Ambartique. No page describes work for any of them. The only project mentions are Dana Russo's bio ("ברטלי - נוער בתנועה, אוניברסיטת רייכמן - DIP השפעה ותודעה") and the "מיטיב החודש" (good-doer of the month) blog post on Bartaly (2022-07). That post is editorial, not a case study.
- **Source:** https://www.mutagmeitiv.com/ (image alt attributes, team text)
- **Date:** 2026-10
- **Confidence:** high (logos identified from file names and alt text, not by looking at the images)
- **Changes my mind:** Case-study pages found outside the sitemap, or the client saying the logos are partners rather than clients.

### C-position-09 — About 9 testimonials, spread over 4 pages, several in English, and no off-site reviews found
- **Evidence:** `/personal101` "מיטיבים מספרים.ות" ("do-gooders tell"): Julia Dojas – Heart of Hosting (English), Linda / AMBARTIQUE (English), Yuval Avraham – בונים לחיים (Hebrew). `/newcourse` and `/copy-of…`: Anva Ratzon (risk and CSR consultant, Hebrew; she says her site "במקום הראשון בחיפוש בגוגל", "ranks first on Google"), Linda Friedrich @ambartique (English), plus a therapist and yoga quote and a link to renanaorlev.com. `/brandandbreakfast`: איה (Aya) and קרן (Keren), first names only. None of them is dated. Apple Podcasts shows a 0.0 rating from 0 ratings. No Google Business Profile, Facebook page or other review platform turned up (Dead ends).
- **Source:** the pages named; https://podcasts.apple.com/il/podcast/id1644532520
- **Date:** 2026-10 (testimonials undated)
- **Confidence:** medium (the count may miss testimonials rendered only by JS sliders)
- **Changes my mind:** A Google Business Profile or Facebook page with reviews.

### C-position-10 — The Brand The Change credential checks out off-site, but the site gives two different reach figures for the method
- **Evidence:** `/process` and `/personal101` say Mutag Meitiv is "הנציגה של אירגון BRAND THE CHANGE בישראל" ("the representative of Brand The Change in Israel"), and the home page shows the badge "BRAND THE CHANGE_certified trainer". The Brand The Change blog post "Presenting the graduates of our 4th certification programme" (dated 26 February, year not shown) lists Hadas Drachli among 11 certified trainers. On reach, the site contradicts itself: `/process` says "תורגם ל 5 שפות … מעל ל 40 מדינות" ("translated into 5 languages … over 40 countries"), while `/personal101` says "מתורגל ב 36 מדינות … תורגם עד כה ל 6 שפות" ("practised in 36 countries … translated into 6 languages so far").
- **Source:** https://brandthechange.org/blog/presenting-certified-brand-the-change-trainers ; https://www.mutagmeitiv.com/process ; https://www.mutagmeitiv.com/personal101
- **Date:** BTC post undated year; site 2026-10
- **Confidence:** high on the certification; the "representative in Israel" wording is the site's own and was not confirmed by BTC
- **Changes my mind:** BTC's trainer directory showing her as lapsed, or listing another Israeli trainer.

### C-position-11 — The podcast is the studio's only regular content asset: 23 episodes from April 2022 to September 2026, now 2–3 a year, and the site's podcast page stops at June 2024
- **Evidence:** RSS `anchor.fm/s/50a74720/podcast/rss`: 23 items. The first is "פרק 1 - יום כדור הארץ, עם שבית ליפשיץ" (episode 1, Earth Day, 21 Apr 2022); the latest is "ללמוד לקרוא מחדש … קרן ברקת" (learning to read again, 15 Sep 2026). Episodes run 26–54 min. Per year: 2022: 8, 2023: 5, 2024: 6, 2025: 1, 2026: 3. Apple lists "Mutag Meitiv I מותג מיטיב" by "Hadas Drachli I הדס דרכלי", genre Business, with 0 ratings. Spotify's description is "איך להקים עסק מצליח שגם מיטיב עם העולם?" ("how to build a successful business that also does good for the world?"). The site's `/podcastbestchapters` ("most-listened episodes") features about 5 episodes, the newest being Bar Rappaport (Jun 2024). It does not mention any of the 5 later episodes, and nothing on the site links to it (C-position-01). The home page links only to Spotify, through a "לשמיעת הפודקאסט" ("listen to the podcast") / "ON AIR" block.
- **Source:** https://anchor.fm/s/50a74720/podcast/rss ; https://itunes.apple.com/lookup?id=1644532520&country=il ; https://open.spotify.com/show/3CO8m8PUlGHePnl3BbcNSb ; https://www.mutagmeitiv.com/podcastbestchapters
- **Date:** 2026-09 (latest episode)
- **Confidence:** high
- **Changes my mind:** A second feed or YouTube channel with more episodes.

### C-position-12 — The blog has 66 posts, but output fell from 22 in 2020 to 3–5 a year since 2024, and most posts are editorial rather than about the services
- **Evidence:** `blog-posts-sitemap.xml` has 66 posts. Lastmod years: 2019: 1, 2020: 22, 2021: 13, 2022: 10, 2023: 7, 2024: 5, 2025: 3, 2026: 5. Lastmod is the update date, not the publish date: `/post/from-memorial-day-to-eurovision` shows "23 במאי 2019 … עודכן: 22 ביוני 2019" (23 May 2019, updated 22 June 2019), so per-year counts are approximate. `/blog` shows the three newest as 22 Aug, 28 May and 22 Apr (2026). Topics are purpose-brand editorial: "מותג מיטיב בחודש" (brand of the month) features, yearly "brands to watch" lists, fair trade, SDG, corona. Only a few posts touch the services: "5 חסמים פופולריים בתהליכי מיתוג אישי" (5 common blocks in personal-branding processes, 2021), "מיתוג עצמי חיובי…" (positive self-branding, 2024), `/post/strategy` (2026), `/post/persona` (2021). Several slugs are leftover English template slugs whose content is unrelated (`/post/tld-fm-radio-launches-special-appeal-to-fight-hunger` is "הדס, בואי רגע נוריד דברים לקרקע…", "Hadas, let's bring things down to earth for a moment…"; `/post/1000-meals-donated-to-local-people-in-need` is "על צבעים, יום השוויון והלוגו העתיק בעולם", "on colours, equality day and the world's oldest logo"). Every page's footer has a monthly newsletter sign-up, "מגזין ׳מיטיב׳ אחת לחודש" ("the 'Meitiv' magazine, once a month"). No public newsletter archive was found.
- **Source:** https://www.mutagmeitiv.com/blog-posts-sitemap.xml ; https://www.mutagmeitiv.com/blog ; posts named above
- **Date:** 2026-08 (latest post)
- **Confidence:** medium on per-year counts (lastmod ≠ publish date); high on the trend and the topics
- **Changes my mind:** Publish dates read from every post showing a different trend.

### C-position-13 — Off-site presence is small: an Instagram account with 169 followers and 27 posts, a personal LinkedIn, and no Facebook page or Google Business Profile linked
- **Evidence:** The site footer links only to Spotify, `instagram.com/mutagmeitiv` and `linkedin.com/in/hadasdrachli` (no Facebook, no WhatsApp link). The Instagram og:description reads "169 Followers, 291 Following, 27 Posts". LinkedIn returned HTTP 999 (blocked), so it was not read. `facebook.com/mutagmeitiv` returned only a login wall. Searches for the brand together with Facebook, LinkedIn or Zichron Yaakov (the Brand & Breakfast venue) found nothing.
- **Source:** https://www.instagram.com/mutagmeitiv/ (og meta, 2026-10-17); site footer links
- **Date:** 2026-10
- **Confidence:** medium (no Google Maps lookup was possible from here; LinkedIn was not read)
- **Changes my mind:** A Google Business Profile or Facebook page found through a Google Maps search from Israel.

### C-position-14 — A search for the domain finds the site, but generic Hebrew service queries put it near the bottom, and the Hebrew brand name alone does not surface it
- **Evidence:** WebSearch "mutagmeitiv.com" returned the site's own pages (home, about, `/personal101`, blog, `/newcourse`, `/process`, posts). WebSearch `"מותג מיטיב" מיתוג אישי אסטרטגיה עסקים עם משמעות` ("Mutag Meitiv" personal branding strategy businesses with meaning) put `/newcourse` and the home page 8th and 9th of 9, below generic branding-agency guides. WebSearch `"מותג מיטיב" הדס דרכלי` (with the founder's name) returned nothing relevant: the words also mean "a beneficial brand" in plain Hebrew. The page head is weak: home `<title>` starts in English ("Brand development for purpose driven brands | …"), there is no meta description on the home page, and most page titles use "brandforthebetter" instead of "מותג מיטיב". The home page uses `<h1>` for footer labels ("יותר אינטימי", "more intimate"; "ניווט מהיר", "quick navigation") and puts its main heading in `<h2>`.
- **Source:** WebSearch runs 2026-10-17 (US-based engine, not Google Israel); page heads of the downloaded pages
- **Date:** 2026-10
- **Confidence:** low on rankings (wrong engine and locale, one run each); high on the page-head facts
- **Changes my mind:** A Google.co.il search (or Search Console data from the client) showing the site ranking for "מיתוג אישי" / "אסטרטגיית מותג" queries.

### C-position-15 — The site has no single primary action: there are five ways in, and which one a page uses varies
- **Evidence:** The header button "פה יוצרים קשר" goes to `/contact`, a form asking the visitor to "נא לציין את נושא הפנייה" ("please state the subject"). `/process`, `/personal101` and `/brandpower` link to Calendly (`calendly.com/hadas`, `/hadas/30min`; the links respond, but the event content is JS-only and was not checked). `/brandandbreakfast` and `/register` say "הכי זמינה בוואטסאפ - 0546686808" ("most available on WhatsApp") but give no `wa.me` link. The footer shows the phone "054.668.6808" and the email "Hadas@kapara.com", on a domain other than the brand's. Payment pages offer Bit, PayBox, upay or cash. The home page alone has a separate "צרו קשר" ("contact us") button, the four service cards and the newsletter form.
- **Source:** https://www.mutagmeitiv.com/ , /contact , /process , /personal101 , /brandpower , /brandandbreakfast , /register
- **Date:** 2026-10
- **Confidence:** high
- **Changes my mind:** The client naming one channel they answer first (plan.md missing information: main CTA).

### C-position-16 — A free lead magnet exists, but the page that hands it over is orphaned
- **Evidence:** `/brandpower` is a thank-you page: "רגשת! המדריך בדרך אליך" ("you're in! the guide is on its way"). It links a PDF, "מתנה- מדריך הכנה למיתוג.pdf" ("gift: a branding-preparation guide", on Wix storage, HTTP 200, 523 KB), and offers "פגישת הכרות/ייעוץ ללא תשלום" ("a free intro / consultation meeting") through Calendly. `/support-us` tells visitors to "תורידו את המדריך לאפיון (חינם)" ("download the (free) profiling guide") before signing up for a course. No sign-up form for the guide was found on any menu page (C-position-01).
- **Source:** https://www.mutagmeitiv.com/brandpower ; https://www.mutagmeitiv.com/support-us
- **Date:** 2026-10
- **Confidence:** medium (the opt-in form might be on Instagram or in an ad, which we did not see)
- **Changes my mind:** The client pointing to where the guide is offered.

## Dead ends

- **Google Business Profile:** we cannot query Google Maps from here, and WebSearch with "זכרון יעקב" (Zichron Yaakov) returned only results about the town. We don't know whether a profile exists.
- **Facebook:** `facebook.com/mutagmeitiv` shows only a login wall, and no Facebook link exists on the site.
- **LinkedIn:** `linkedin.com/in/hadasdrachli` returns HTTP 999 to automated requests.
- **The award's organiser:** Hebrew and English searches for a 2022 Israeli branding award, non-profit category, found no winners list that names the studio or Dana Russo.
- **Hebrew brand-name search:** "מותג מיטיב" is also ordinary Hebrew ("a beneficial brand"). Searches on it, with or without "הדס דרכלי", returned unrelated results. DuckDuckGo and Bing HTML scraping returned nothing usable.
- **Newsletter archive:** none found.
- **Rendered design and motion:** this lane read server HTML only and took no screenshots. Visual density is judged from the text structure, not from pixels.

## Handoff notes

### Page map (24 sitemap pages + 1 broken link; fetched 2026-10-17, all HTTP 200 unless noted)

| URL | What it is | In menu? | Status |
|---|---|---|---|
| `/` | Home: hero "כאן מפתחים אסטרטגיות מותג עם משמעות" ("here we develop brand strategies with meaning"), award badge, 4 service cards (personal branding / strategic planning / training and lectures / courses and workshops), podcast block, team of 4 collaborators, 3 latest posts, logo strip, newsletter | yes | live; long |
| `/about` | Founder story (studio partnership ended late 2016; "Brand for the Better" approach) | yes | live |
| `/copy-of-אודות` | Older version of the about story | no | **duplicate** |
| `/process` | Strategic planning / branding process, 3 stages, BTC method, Calendly | yes ("תהליך המיתוג") | live; **leading service 2** |
| `/personal101` | Personal branding 1:1, 4 stages, 10–15 meetings, 3 testimonials, Calendly | yes ("פיתוח עסק עם משמעות") | live; **leading service 1** |
| `/סדנאות-והרצאות` | Flagship lecture "BRANDS OF CHANGE", pro course 5,200+VAT, free intro workshop, community meetups, therapists' retreat 580+VAT, change-makers' course 3,200+VAT, THE BETTER 4 480+VAT | yes ("הדרכות והרצאות") | live; no dates shown |
| `/newcourse` | "מעסק למותג מיטיב" personal-branding group course, 9 meetings, testimonials, award line | no (indexed by Google) | **stale** (registration closed) |
| `/copy-of-מעסק-למותג-מיטיב-הקורס` | Same course, 2,650 ₪, corona scholarships | no | **duplicate + stale** |
| `/service-page/brand-the-change-לאנשי-מקצוע` | Pro BTC course, 2,850 ₪ | no | **stale** ("unavailable") |
| `/book-online` | Wix bookings list (1 service, "ended") | no | **stale** |
| `/courses` | Wix courses list, empty | no | **empty** |
| `/event` | Wix events list, "no events" | no | **empty** |
| `/events/meal-packaging-delivery`, `/single-parent-cooking-workshop`, `/thanksgiving-soup-kitchen` | Wix template demo events (San Francisco, 2023) | no | **template junk** |
| `/smst` | THE BETTER 4 vision workshop, Tel Aviv, 350 ₪, 11:00–14:00, undated | no | stale? (undated) |
| `/brandandbreakfast` | Brand & Breakfast, 7 participants, Zichron Yaakov, 15.5.26, 350 ₪, 2 testimonials | no | **stale** (past date) |
| `/register` | Payment page "MAP YOUR VISION 2025" | no (linked from course pages) | **stale** |
| `/support-us` | "Courses and lectures" Q&A, intro lecture "24.9", Donate | no | stale (no year) |
| `/brandpower` | Lead-magnet thank-you page, PDF guide, free meeting | no | live, orphan |
| `/podcastbestchapters` | Podcast story + ~5 featured episodes (to Jun 2024) | no | **stale** (5 newer episodes missing) |
| `/blog` (+ 8 category pages) | 66 posts, 2019–2026 | yes | live; slow cadence |
| `/contact` | Contact form | yes (header button) | live |
| `/הצהרת-נגישות` | Accessibility statement, AA, updated 20-08-2025, by "Vee" | yes | live (legal; keep) |
| `/blank-2` | Linked from both course pages | — | **broken** (Wix 404) |

### Which page presents what (for the leading-services question, brief item 12)

- **Personal branding** = `/personal101` (1:1 guidance; the only place the phrase "תהליך מיתוג אישי" appears), plus the orphan group course `/newcourse` (and its copy). Related posts: "5 חסמים פופולריים בתהליכי מיתוג אישי", "מיתוג עצמי חיובי…".
- **Strategic planning** = `/process` (the home card "תכנון אסטרטגי" and the hero word "אסטרטגיות" both link here). Related post: `/post/strategy`.
- **Everything else** is training and community: the BRANDS OF CHANGE lecture, the BTC professional course, the change-makers' course, the therapists' retreat, THE BETTER 4 / SMST, Brand & Breakfast, community meetups and the free intro workshop. The client has now said that the two services above lead. A precise question remains for the client: **which of these 8 secondary offers stay on the new site, which ones run again (with dates and prices), and are the 3-stage (`/process`) and 4-stage (`/personal101`) descriptions one method or two products?**

### Gap list, tied to the brief

| Brief # | Gap on the current site | Claims |
|---|---|---|
| 1 (content from the current site) | The content to take over is scattered over 24 pages. At least 9 are stale, empty or template junk, and 3 pairs duplicate each other. The harvester should take only the live, menu-linked pages plus testimonials, logos, the podcast and selected posts, and should not import the stale pages. | 01, 05, 06 |
| 2 (self-hosted, CMS) | The prices, dated workshops and event pages are exactly what goes stale on Wix today. The CMS needs owner-editable offers with dates and status, so an ended workshop can be hidden. | 04, 05 |
| 3, 10 (complete redesign, professional) | The page heads are mixed English and Hebrew, `<h1>` is misused, the home page has no meta description, the site name differs between pages and the footer says "@2019". | 14 |
| 4 (motion, interaction) | Not judged (no rendered view). The podcast and the 3- or 4-stage process are natural places for interaction. | 03, 11 |
| 5 (clear navigation and CTAs) | Menu labels do not match the services ("פיתוח עסק עם משמעות" is personal branding; "תהליך המיתוג" is strategic planning). 12 pages are orphaned. There are five contact routes and no primary one, and WhatsApp is mentioned without a link. | 01, 02, 03, 15, 16 |
| 6 (greens, brand icon) | Not checked here (no media harvested). The logo files are "Mutag Meitiv Master …png" and "logo_negative_black.avif" on the home page; that is the harvester's job. | — |
| 7, 8 (airy, readable, not compressed) | `/process`, `/about` and `/personal101` are long single paragraphs. The home page stacks about 12 sections, including 4 long collaborator bios. | 03, 08 |
| 9 (informative, smartly divided) | The method is described three times in different ways (3 stages, 4 stages, BTC reach 40/5 vs 36/6). Proof (award, logos, testimonials) is split across pages instead of being gathered next to the services. | 03, 07, 08, 09, 10 |
| 11 (Hebrew only) | English appears in the home title, the hero badges ("1st PLACE", "ON AIR"), several testimonials and some post slugs. The English testimonials need a decision from the client: translate, keep as quotes, or drop. | 09, 14 |
| 12 (leading services) | Neither leading service has a price, a case study or a testimonial placed with it (`/process` has none at all). Both sit behind labels that don't name them. | 02, 03, 08 |
| 13 (prices in ILS) | Prices exist only for secondary offers. They conflict (2,850 vs 5,200+VAT for the professional course), the currency is written four ways, and VAT is stated inconsistently. The client needs to give one current price list. | 04 |
| 14 (proposal in Hebrew) | Nothing for this lane to add. | — |

### Proof inventory

- Award: 2022 "1st place, non-profit branding", organiser not named (C-07). Ask the client for the organiser, the project and a link.
- Credential: certified Brand The Change trainer, confirmed on brandthechange.org (C-10).
- Clients: 13 logos (C-08); no case studies.
- Testimonials: about 9, none dated, several in English (C-09).
- Collaborators on the home page: Tamar Drachli (AI video), Yael Shachar (documentary photography; the home page says she won an Ophir award), Dana Russo (NGO branding designer), Lior Orsini Yaish (data-driven impact marketing). All of these are the site's own bios, not checked.
- Content: podcast with 23 episodes (C-11); 66 blog posts (C-12); monthly newsletter sign-up (C-12); PDF guide (C-16).
- Off-site: Instagram, 169 followers (C-13). No reviews found anywhere.

### Speculation (not claims)

- The domain of the contact email (kapara.com) may be the founder's earlier studio. Worth asking whether it should be replaced with an address on the brand's own domain.
- "Self-healing 2024" and "the mothers' league" in the logo strip may be workshop hosts rather than branding clients.
- The `/newcourse` page that Google has indexed (closed registration) is probably what search visitors land on for the course. It would be worth a redirect at go-live.
