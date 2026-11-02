---
node: lane
role: researcher
run: 2026-11-il-brand-02
lane: position
status: complete
---

# lane: position — where TalouLoren stands today, and what the new site inherits

## Summary

talouloren.com is a WordPress/Uncode site, frozen at "© 2021", with 162 sitemap URLs and 29 more in the Wayback Machine. Only about 40 of them carry live content, and the site was hit by spam injection in 2022 (8 posts in 6 junk categories). It sells a paid 60-minute session (1,000 NIS) and the BRAND YOURSELF course (990 NIS) in a hard 2020 sales register, with return multiples, celebrity name-drops and unapproved case-study numbers that the new site must drop. Its booking button even 404s. The real proof and the current activity live off-site: a YouTube channel with 187 videos (uploads to 2025), Instagram (11K followers), a client-logo wall, and Shahar's NBC *Pale Force* and Coca-Cola credits. The brand names "TalouLoren" and "טל אורן" have almost no search footprint.

## Claims

### C-position-01 — The old site is WordPress (Uncode theme, Elementor on the 2020 pages), frozen in 2021, with 162 sitemap URLs in 8 child sitemaps
- **Evidence:** `/sitemap.xml` resolves to `/sitemap_index.xml`, which lists post, page, portfolio, qmn_log (empty), qsm_quiz, category, portfolio_category and author sitemaps. Together they hold 162 non-image URLs, and all 162 return 200. `/wp-sitemap.xml` returns 404. `wp-json/wp/v2/pages` lists 31 pages (last modified 2020-12-28, `/course/`) and `/posts` lists 43. The theme CSS is `/wp-content/themes/uncode/…`. The footer reads "© 2021 All rights reserved to TALOULOREN". Every page prints a visible PHP notice under the footer: "Notice: ob_end_flush(): failed to send buffer of zlib output compression (0) in /home/talouloren/public_html/wp-includes/functions.php on line 4615". Menu: Homepage `/`, Services `/services/`, VLOG of success `/vlog-of-success/`, Case Study `/case-study/`, Meet Tal `/meet-tal/` (button). Footer: TALOU LOREN PHILOSOPHY `/philosophy/`, CONTACT TALOU `/contact/`, PARTNERSHIP `/partnership/`, PRIVACY `/privacy/`.
- **Source:** https://talouloren.com/sitemap_index.xml and child sitemaps; https://talouloren.com/wp-json/wp/v2/pages?per_page=100; rendered pages (Playwright)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** a second sitemap or a multisite install serving other paths.

### C-position-02 — The site was compromised in 2022: 8 injected spam posts in 6 junk categories are still live and indexed
- **Evidence:** `post-sitemap.xml` lists 8 posts dated 2022-03-09 to 2022-06-09 (wp-json), all by author id 7. Their paths are `/dating-tips/the-ultimate-guide-to-online-dating/`, `/dll-files-tutorial/running-dll-files-for-malware-analysis/`, `/windows-10-laatste-updates/hoe-te-ontbrekende-dll-7/`, `/android-14/android-apps-by-mediafire-on-google-play/`, `/android-14/are-you-aware-of-soap2day-virus-6/`, `/android-14/how-to-install-and-play-gta-6-apk-obb-data-for/`, `/windows-11-filer/flytte-vivaldi-til-ny-server/` and `/corrupt-windows-registry-2/how-to-fix-unarc-dll-errors-in-windows-10/`. Their 6 categories are also in `category-sitemap.xml`. The author archive `/author/niso/` ("NISO NISO") and the test page `/temp/` both list the spam text. All return 200.
- **Source:** https://talouloren.com/post-sitemap.xml; https://talouloren.com/wp-json/wp/v2/posts?per_page=100
- **Date:** 2022-03 → 2022-06 (still live 2026-11)
- **Confidence:** high
- **Changes my mind:** evidence that the owner published these on purpose (unlikely: Dutch/Norwegian DLL and APK content).

### C-position-03 — Every indexed old URL has a status and a target. 44 are live content, 100 stale, 3 duplicates, 44 retired (incl. 29 Wayback-only)
- **Evidence:** The full table is in Handoff notes. It has 191 rows: 162 from the sitemaps plus 29 paths found only in Wayback CDX (`http://web.archive.org/cdx/search/cdx?url=talouloren.com*…`, 1,361 captures, 116 unique non-asset paths). Most CDX-only paths are pre-2018 static pages (`/branding.html`, `/fashion.html`, `/successisbeautiful.html`, `/strategy`, `/dvision-studio`, …) that now 404. Redirect targets: `/work` 83, `410` 32, `/watch` 21, `/` 18, `/check` 12, `/book` 8, `/about` 6, `/course` 4, `/brands` 3, `/thanks` 2, `/partnership` 1, `/privacy` 1. The spam URLs and the 2014 Uncode demo portfolio items get 410, not a redirect. Feed/embed variants (`…/feed`, `…/embed`) are not listed; one rule (`/*/feed`, `/*/embed` → parent target) covers them.
- **Source:** sitemaps above; Wayback CDX; HTTP status checks with curl (2026-11-02)
- **Date:** 2026-11
- **Confidence:** high for statuses; medium for targets (they follow the brief's route list)
- **Changes my mind:** Google Search Console data showing other indexed URLs; the partners keeping a blog route.

### C-position-04 — The main conversion button on the session page is broken: "הזמן שיחה עם טל" goes to a 404
- **Evidence:** On `/winning-personal-brand/` the CTA "הזמן שיחה עם טל (לחץ כאן כדי להתחיל)" ("Book a call with Tal (click here to start)") links to `/SuccessfulPersonalBrandDesktop` and `/SuccessfulPersonalBrandMobile`. Both return 404 today. The only working routes to booking are the phone number 050.4635536 and WhatsApp.
- **Source:** https://talouloren.com/winning-personal-brand/ (HTML hrefs); curl status
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** those paths being served by a plugin only to some user agents (not seen with a desktop UA or in Chromium).

### C-position-05 — The paid session is published as "Winning Personal Brand": 60 minutes, 1,000 NIS, on Zoom or at the office. Older copies show 1,500, 690 and 199 NIS
- **Evidence:** `/winning-personal-brand/` (title "Winning personal brand - TALOU L'OREN | תוכנית פעולה להזנקת המותג האישי שלך!", "An action plan to launch your personal brand!"; modified 2020-12-18) says "עלות הפגישה 1000 ש"ח" ("the meeting costs 1,000 NIS") and "ההשקעה שלך היא 1000 ₪ לפגישה אחד על אחד של 60 דקות בזום או אצלי במשרד" ("your investment is 1,000 NIS for a 60-minute one-to-one meeting on Zoom or at my office"). Its FAQ "האם הפגישה או השיחה היא בחינם?" ("Is the meeting free?") answers "השיחה לא בחינם" ("the call is not free"). The orphan copies differ: `/winning-personal-brand-too/` (2020-04) shows 1,500 NIS, then 690 NIS, office only. `/testing222/` (2019-03) shows 199 NIS by phone or video, or 690 NIS in person. The session page lists who it suits ("למי זה מתאים") and who it does not ("למי זה לא מתאים").
- **Source:** https://talouloren.com/winning-personal-brand/ ; /winning-personal-brand-too/ ; /testing222/
- **Date:** 2020-12 (live page)
- **Confidence:** high
- **Changes my mind:** a newer price the partners use offline (prices are placeholders in the brief anyway).

### C-position-06 — The BRAND YOURSELF course is published at 990 NIS incl. VAT, with 10 lessons, a "full price 1,755" anchor and Cardcom checkout
- **Evidence:** `/course/` reads "עלות קורס BRAND YOURSELF … 990 כולל מע"מ · 170 ₪ בחודש ב-6 תשלומים [כולל ריבית] · (או בתשלום אחד של 990 ₪ בלבד) … לאחר מכן הקורס יימכר במחיר מלא של 1755 ₪". In English: "990 incl. VAT · 170 NIS a month in 6 payments [incl. interest] · (or one payment of 990 NIS) … afterwards the course will sell at the full price of 1,755 NIS". The deadline the page refers to ("עד התאריך", "until the date") is blank. The buy link is https://secure.cardcom.solutions/e/x1lV. The 10 lessons:
  1. מבוא (introduction)
  2. מדף המוצרים (product shelf)
  3. ה-DNA שלי (my DNA)
  4. ה-DNA של הלקוחות (the clients' DNA)
  5. Know Like Trust מסלול הלקוח שלי (my customer journey)
  6. חמשת ערכי המותג (the five brand values)
  7. מיתוג ומיתוג ויזואלי (branding and visual branding)
  8. משפך ואסטרטגיה דיגיטלית (funnel and digital strategy)
  9. מודל פיננסי (financial model)
  10. חשיבה חיובית וגישה של מצליחנים (positive thinking and a winner's attitude)

  The older copy `/12333-2/` and the checkout step `/brand-yourself/` show 585 NIS (198 × 3).
- **Source:** https://talouloren.com/course/ ; /12333-2/ ; /brand-yourself/
- **Date:** 2020-12
- **Confidence:** high
- **Changes my mind:** the Cardcom page showing a different live price (not opened, to avoid a payment flow).

### C-position-07 — Other published offers: a 2019 four-meeting strategy programme (700 + 8,000 NIS) and three service pillars with no prices
- **Evidence:** `/total-success/` (orphan, 2019-06) offers "מפגש מקדים לתיאום ציפיות ותכנון ראשוני: 700 ש"ח · ארבעה מפגשים לבניית אסטרטגיה מלאה: ~~15000~~ 8000 ש"ח". In English: "a preliminary meeting to set expectations and plan: 700 NIS · four meetings to build a full strategy: 15,000 struck through, 8,000 NIS". The meetings are 90-minute sessions in person. `/services/` lists three pillars:
  - MENTORING & ENTREPRENEURSHIP: "ליווי עסקי וקריאטיבי" (business and creative mentoring), with "תוכנית הזנקה עסקית" (business launch plan) and "ליווי שוטף · מפגש שבועי" (ongoing mentoring · weekly meeting).
  - MARKETING & BRAND MANAGEMENT: "מיתוג \ מיתוג פרסונלי" (branding / personal branding), "הזנקת מכירות" (sales launch), "ביזנס אונליין" (online business).
  - VISUAL BRANDING.

  None of the three shows a price. `/brand-kick-start/` (2019) is a free 15-minute video lead magnet.
- **Source:** https://talouloren.com/total-success/ ; /services/ ; /brand-kick-start/
- **Date:** 2019-06 / 2019-01
- **Confidence:** high
- **Changes my mind:** —

### C-position-08 — The proof wall is a three-tab logo grid ("SOME OF OUR HAPPY CLIENTS") of 36 small logos, 200x133 px or smaller
- **Evidence:** Home, tabs ארגונים / יזמים / מותגים (organisations / entrepreneurs / brands).
  - **Organisations (8):** mizrahi, castro, osem, daromazafona, google, hapoalim, ck, wix.
  - **Entrepreneurs (15, people's names):** rita, alon, eli, oren, ziv, moshe, yaniv, osnat, chen, ronen, amos, yoram, dekel, idan, barok.
  - **Brands (13):** eugene, loreal, wella, mac, mercedes, royalty, phillipmorris, marcjacobs, castro, shufersal, nespresso, ck, sacara.

  The files are `/wp-content/uploads/2018/04|07/<name>.jpg` at 200x133, or `/2016/05/<name>.jpg` at 150x100. They are JPEG on white, too small to reuse; the logos need redrawing or SVG sources. `/total-success/` adds `2019/05/amdocs.png` and `wework.png` (500x500). By client answer A4, logos are cleared.
- **Source:** https://talouloren.com/ (HTML, tab panes); wp-json media
- **Date:** 2018
- **Confidence:** high
- **Changes my mind:** —

### C-position-09 — DO-NOT-CLAIM: the session and course pages name-drop executives and celebrities that are not on the brief's approved list
- **Evidence:** `/winning-personal-brand/` says: "ב-10 השנים האחרונות ליוויתי מנכ"לים והנהלות של ארגונים ומותגים … כדוגמת: הנהלת לוריאל העולמית, מנכ"ל וולה ישראל, קסטרו, מזרחי טפחות, מרצדס, אסם, פיליפ מוריס, אנשי עסקים וידוענים כדוגמת אלון אולמן, יצחק תשובה, גיל שוויד, ריטה, שרית חדד, דידי הררי, דורון שפר ורבים אחרים". In English: "in the last 10 years I mentored CEOs and managements of organisations and brands … such as L'Oréal global management, Wella Israel's CEO, Castro, Mizrahi Tefahot, Mercedes, Osem, Philip Morris; business people and celebrities such as Alon Olman, Yitzhak Tshuva, Gil Shwed, Rita, Sarit Hadad, Didi Harari, Doron Shefer and many others". The course page adds "יצרתי מיתוג ומיתוג ויזואלי למותגים הגדולים בעולם. חלקם שילמו מאות אלפי שקלים" ("I created branding for the biggest brands in the world. Some paid hundreds of thousands of shekels"). Brand logos are allowed (A4). The named private individuals are in the same class as the brief's banned "Teddy Sagi" line: Tshuva, Shwed, Hadad, Harari and the others. The brief does not clear them, and Philip Morris (tobacco) carries risk. The old site does **not** contain Alvaro, Netflix, Teddy Sagi or NBC (searched across all 148 non-spam pages).
- **Source:** https://talouloren.com/winning-personal-brand/ ; https://talouloren.com/course/ ; internal: brief do-not-claim list
- **Date:** 2020-12
- **Confidence:** high (text); the ruling is the client's
- **Changes my mind:** the partners confirming permission for each named person.

### C-position-10 — DO-NOT-CLAIM: the case studies carry figures beyond the four approved ones
- **Evidence:**
  - **Wella** (`/brands/wella-case-study/`): market share fell "מ 80% ל 20% תוך עשור" ("from 80% to 20% within a decade"), with "מאות לקוחות חדשים" ("hundreds of new clients"). It also claims the CEO was named "מנכ"ל השנה בעולם" ("CEO of the year worldwide") and names the CEO, Itay Domb.
  - **Eugene Perma** (`/brands/eugene-perma-blonde-master-study-case/`): "הכפלת המחזור השנתי" ("doubled annual turnover"), "מעל 1000 לקוחות חדשים" ("over 1,000 new clients"), and a training centre full for four years "לעומת תפוסה של 10%" ("versus 10% occupancy").
  - **CK** (`/organizations/obsessed-ck-team-booster-case-study/`): "650 יועצות היופי" ("650 beauty advisors").
  - **Portfolio pages:** "צמיחה של 50% במחזור" ("50% turnover growth", `/portfolio/eugene-perma-2/`), "119 מדינות" ("119 countries") and "מאות אחוזים במכירות" ("hundreds of percent in sales", `/portfolio/hairdreams/`).
  - **AMT:** registrations "blocked from overload".

  Only "hundreds of percent" (unattributed) is approved. None of 27,000, 3 million or 1,000+ course buyers appears anywhere on the old site.
- **Source:** the URLs above; internal: brief
- **Date:** 2018
- **Confidence:** high
- **Changes my mind:** the client approving specific figures with a source.

### C-position-11 — DO-NOT-CLAIM: return-multiple lines appear on 5 pages
- **Evidence:** The session pages say "ההשקעה שלך בשיחה איתי תחזיר את עצמה פי 10, פי 100... ואפילו פי 1000!" ("your investment in a call with me will return itself 10x, 100x… even 1000x!"). The course says "החזר ההשקעה יכול להיות פי 10, פי 100 או פי 1000!" ("the return can be 10x, 100x or 1000x!"). Also on the course: "רווח של עשרות ואף מאות אלפי שקלים" ("a profit of tens and even hundreds of thousands of shekels"). Pages: `/winning-personal-brand/`, `/winning-personal-brand-too/`, `/testing222/`, `/course/`, `/12333-2/`.
- **Source:** those URLs
- **Date:** 2020
- **Confidence:** high
- **Changes my mind:** —

### C-position-12 — Named testimonials exist in writing (course) and on video (home). Names are clients, not team
- **Evidence:** The `/course/` quote wall:
  - Alon Olman ("הקוד המנצח", "The Winning Code"): "טל יודע בדיוק מה צריך בשביל לייצר נראות מצליחנית ותדמית מנצחת" ("Tal knows exactly what it takes to create a successful look and a winning image").
  - Rita (singer): "טל הוא איש חזון והשראה…" ("Tal is a man of vision and inspiration…").
  - Shaul Naftali ("שיחות השראה", "Inspiration Talks").
  - Dr. Osnat Raziel.
  - Rotem Yaldin, "ראש מועצת גזר" (head of the Gezer council).
  - Spaa.

  Headshots: `2020/05/alon.png`, `rita.png`, `spaa.png` (265x265) and `osnat.png`, `rotem2.png` (344x344). Video testimonials: Yifat, Amos ×2, Ronen, Joya Cosmetics (home), and Natali and Ella (course). See videos.md.
- **Source:** https://talouloren.com/course/ ; https://talouloren.com/
- **Date:** 2018–2020
- **Confidence:** high
- **Changes my mind:** permissions for quotes, which A4 grants for logos only.

### C-position-13 — Tone: the old copy mixes a "you are not alone" warmth with a loud 2020 coaching-sales register
- **Evidence:** Ten quoted lines, Keep / Drop, in Handoff notes. The key line to keep is "אתה לא לבד. נשימה." ("You are not alone. Breathe."), on `/` and `/services/`. Typical lines to drop: "ונהפוך אותך ללוחם האולטימטיבי. ווינריות ומצליחנות זה שם המשחק." ("and we'll make you the ultimate warrior. Winning and success is the name of the game.") and the "Maldives" and "time wasters" lines on `/winning-personal-brand/`.
- **Source:** https://talouloren.com/ ; /services/ ; /philosophy/ ; /winning-personal-brand/ ; /course/
- **Date:** 2018–2020
- **Confidence:** high
- **Changes my mind:** —

### C-position-14 — The gold accent is #f3b614, with a metallic gradient from #a46a34 through #faf1a1 on near-black #111214
- **Evidence:** Inline theme CSS: `.goldGrad{background:#f3b614; …linear-gradient(-30deg, rgb(164,106,52), rgb(225,180,83) 16%, rgb(213,162,68) 26%, rgb(186,131,58) 36%, rgb(177,123,56) 47%, rgb(190,140,60) 57%, rgb(211,177,95) 66%, rgb(250,241,161) 77%, rgb(251,248,195) 84%, rgb(211,177,95) 90%, rgb(190,140,60) 95%, rgb(162,105,51) 100%)}`. Dividers, `hr`, and button hovers use `#f3b614`. In `style-custom.css`, #f3b614 is used 53 times and #111214 66 times; also #303133 and #141618. In hex, the gradient stops are #a46a34 → #e1b453 → #d5a244 → #ba833a → #b17b38 → #be8c3c → #d3b15f → #faf1a1 → #fbf8c3 → #d3b15f → #be8c3c → #a26933. Signature assets: `2018/04/gold_sig.svg`, `black_sig.svg`, `white_sig.svg`, `2019/02/goldsig.png` (410x68), `2016/05/GoldLong.png` (2040x150). Fonts loaded: Assistant, Frank Ruhl Libre, David Libre, Gilda Display, EB Garamond, Old Standard TT, Roboto, Open Sans, Arimo, Nunito.
- **Source:** https://talouloren.com/ (inline `<style>`); https://talouloren.com/wp-content/themes/uncode/library/css/style-custom.css
- **Date:** 2018–2020
- **Confidence:** high
- **Changes my mind:** a brand book with a different gold.

### C-position-15 — Usable images are few and mid-resolution. The best portraits of Tal are 921x1060 to 1500x1000, and the largest file is 2598 px wide
- **Evidence:** The media library (`wp-json/wp/v2/media`, 373 items) holds 259 JPEG, 83 PNG, 12 SVG and 1 GIF. 32 images are ≥1600 px wide, but most are 2016 Pixabay stock (`pens-1129434_1920.jpg`, `sea-84629_1920.jpg`, …) or section backgrounds. Portraits of Tal seen in the renders: `2019/03/lp_taloren.jpg` 921x1060 (B&W, session-page hero), `2018/04/2.jpg` 1500x1000 (Meet Tal hero) and `2018/04/cid_D8376DB7-…jpg` 640x960 (footer "PARTNERSHIPS"). `2018/04/cid_ED996016-…jpg` (960x640, footer "CAREERS") shows Tal with two other men, so it must not be used to imply a team (brief: no team names). The full asset table is in Handoff notes.
- **Source:** https://talouloren.com/wp-json/wp/v2/media?per_page=100 (pages 1–4); rendered screenshots (scratch)
- **Date:** 2016–2020
- **Confidence:** medium. Subjects of unrendered images were not viewed one by one.
- **Changes my mind:** original shoot files from Tal at higher resolution.

### C-position-16 — The site carries 47 distinct YouTube videos in 9 site lists. 39 play, 1 is a fixable typo, 7 are dead
- **Evidence:** See `dossier/talouloren/videos.md`, which has 50 rows and 47 distinct ids. The lists:
  - Home "WHAT THEY SAY ABOUT US": 5.
  - VLOG of success grid: 12, plus 7 blog posts outside the grid.
  - Case Study (Entrepreneurs / Brands / Organizations): 7.
  - Course: 4.
  - Session pages: 4.
  - `/total-success/`: 2.
  - Landing post: 1.
  - Portfolio: 7, all dead.
  - Test post: 1, dead.

  The vlog post "Inside your organisation" embeds `IPRK9cBvK0`; the real id is `-IPRK9cBvK0`. The AMT case-study id is dead; the channel holds a live re-upload (`H_oTTaODt64`). The hero background `TalulIntro_out.mp4` is 320x240, so it cannot be reused.
- **Source:** all 162 URLs, curl + Playwright DOM/network; YouTube oEmbed
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** —

### C-position-17 — Tal's current activity is on YouTube and Instagram, not the site: 187 videos + 19 shorts (uploads to 2025-07), Instagram 11K
- **Evidence:** YouTube @taloulorensuccess (= footer `UCX-DqELI3PQjSbpNV95u8fA`) has 76 subscribers, 187 videos and 19 shorts. The latest uploads date from 2024-04 to 2025-07 (the "UNKNOWN" series, "TEAM TESTEMONIAL- UNKNOWN", "Mosdot UNKNOWN"). The channel also holds client films not on the site: Maccabi (several), Amdocs ("AMDOCS PURPOSE", "AMDOCS DARE TO INNOVATE", "AMDOCS INNOVATION PROJECT"), Taboola, Kornit, Bezeq, Clalit, SEAT and Philip Morris, plus "Talou Testimonial Film 1–3 HQ". Instagram @talou_loren ("TAL OREN") has 11K followers and 758 posts. Facebook "TALOU L'OREN" has 3,218 followers and describes itself as "מנטור להצלחה עסקית ופיתוח יזמות" ("mentor for business success and entrepreneurship development"). The second footer YouTube link (`UCcKsvGT3KYfohI4miuoOmwA`) has no content. LinkedIn could not be read (HTTP 999).
- **Source:** https://www.youtube.com/@taloulorensuccess/videos and /shorts (rendered); RSS; og tags of https://www.instagram.com/talou_loren/ and https://www.facebook.com/talouloren
- **Date:** 2026-11
- **Confidence:** high (counts as displayed)
- **Changes my mind:** —

### C-position-18 — The brand names have almost no search footprint. "TalouLoren" returns nothing about Tal, and "טל אורן" autocompletes to other people
- **Evidence:** Web search for "TalouLoren" returned the singer TAL/TALOULA, "Loren" and Loreen pages; nothing from talouloren.com. "טל אורן" מיתוג and "Tal Oren" branding Tel Aviv returned Hila Oren and Tel Aviv place branding. Google autocomplete (gl=il, hl=he) for "טל אורן" suggests "טל אורן אופניים" (bicycles), "טל אורן הסברה" (public diplomacy), "טל אורן אל על" (El Al) and "טל אורון …" variants. "talouloren" returns no suggestions. No review profiles (Google Business, Dapei Zahav, Facebook reviews) were found: the one d.co.il hit was an unrelated locksmith, "אורן מערכות מיגון". The old page titles all start with "טאלו לורן |" ("Talou Loren |"), a third spelling.
- **Source:** WebSearch (3 queries, 2026-11-02); https://suggestqueries.google.com/complete/search?client=firefox&hl=he&gl=il&q=…
- **Date:** 2026-11
- **Confidence:** medium (the search tool is US-indexed; Google.co.il results were not seen directly)
- **Changes my mind:** a Google.co.il SERP showing the site or profiles on page 1 for these names.

### C-position-19 — shaharnaor.com positions Shahar as a freelance UI/UX and visual designer with two decades across design, motion and development
- **Evidence:** `<title>` "Shahar Naor — Freelance UI/UX & Visual Designer". Meta description: "freelance UI/UX and visual designer with two decades of experience in product design, motion, branding, and interactive development. Creator of Rosa, WTW, and toll-e." Tagline on the page: "Water bending. Development. Strategy. Design. Motion. Two decades. One Skynet devout". `/projects.html` lists Rosa (rosa.surf, wave forecast), WTW, toll-e, Oneshot, Burgundy and Tachyon; the only images are app icons (150–512 px) and `imgs/sn.webp` (320x320 logo). It has no client credits and no photo of Shahar. Links: LinkedIn, Vimeo, GitHub, Reddit, Discord, Cronus Media, Behance (exact URLs in videos.md).
- **Source:** https://shaharnaor.com/ ; https://shaharnaor.com/projects.html (rendered)
- **Date:** sitemap lastmod 2024-02-19; checked 2026-11
- **Confidence:** high
- **Changes my mind:** —

### C-position-20 — Behance supports the proof wall with NBC (*Pale Force*) and Coca-Cola Israel, plus 12 years at Kapara studio
- **Evidence:** Behance profile shaharnaor: "Visual artist | Technology sector | UI veteran", Tel Aviv. Stats: 16,496 views, 450 appreciations, 54 followers. Work history: Cronus Media (founder), Kapara Studio (co-owner, designer, illustrator), freelance. About: "I ran a design studio (Kapara.com) for 12 years and an Ad-Tech startup (Cronus Media) for 3 … Past clients include NBC, Coca-Cola, and dozens of growth-stage startups". 12 projects:
  - 2017-08-31: "NBC's & Conan O'Brien's Pale Force | Animation"; "Coca Cola Israel | Web design & animated video".
  - 2022: Crypto Branding Compilation; AdRabbit; CVI.
  - 2023: gCOTI airdrop; COTIPay Viper; Allegronet Branding.
  - 2025: NFA; Privex; Sheket; Bulldog Markets (2025-10-26).

  The Pale Force page says: "Animation of Pale Force - Emmy award nominee for outstanding comedy broadband program. Created by stand-up comedian Jim Gaffigan and 'The New Yorker' cartoonist Paul Noth, for 'Late night with Conan O'brien'. Storyboard and characters by Paul Noth." The Emmy nomination belongs to the programme, not to Shahar personally. Project covers are 1380x1080 crops at `https://mir-s3-cdn-cf.behance.net/projects/original/<hash>.Y3JvcCwxMzgwLDEwODAsMCww.png` (list in Handoff).
- **Source:** https://www.behance.net/shaharnaor ; https://www.behance.net/gallery/56282761/NBCs-Conan-OBriens-Pale-Force-Animation (rendered)
- **Date:** 2017–2025
- **Confidence:** high
- **Changes my mind:** —

### C-position-21 — In Hebrew autocomplete, "מיתוג אישי" (personal branding) mostly means personalised party goods. The business sense needs a qualifier
- **Evidence:** Autocomplete for "מיתוג אישי" returns "…ליום הולדת, …על מוצרים, …לראש השנה, …לאירועים, …לבר מצווה, …לחתונה, …להפרשת חלה" (for a birthday, on products, for Rosh Hashana, for events, for a bar mitzvah, for a wedding, for a challah ceremony). The plain "מיתוג" (branding) also starts with "מיתוגון קטלוג" (a party-goods catalogue), "מיתוג ליום הולדת" (for a birthday) and "מיתוג לבר מצווה" (for a bar mitzvah). The business sense appears as "מיתוג אישי לעסק" (personal branding for a business), "בניית מותג אישי" (building a personal brand), "יועץ מיתוג אישי" (personal-branding consultant) and "איך למתג את עצמך" (how to brand yourself).
- **Source:** https://suggestqueries.google.com/complete/search?client=firefox&hl=he&gl=il&q=מיתוג%20אישי (2026-11-02)
- **Date:** 2026-11
- **Confidence:** high (autocomplete as returned); medium on relative volume (no Trends)
- **Changes my mind:** Trends or Keyword Planner volumes showing the business sense dominant.

### C-position-22 — 20 Hebrew search terms owner-led businesses use, all confirmed by Google IL autocomplete, grouped by intent
- **Evidence:** The table is in Handoff notes. Every term was returned as a suggestion by `suggestqueries.google.com` with gl=il and hl=he on 2026-11-02. A suggestion shows real query volume; it gives no number. "ליווי עסקי" (business mentoring) and "ליווי עסקים קטנים" returned **no** suggestions, while "יועץ עסקי" (business consultant), "מנטור עסקי" and "מנטורינג עסקי" did.
- **Source:** Google autocomplete endpoint (queries listed in the table)
- **Date:** 2026-11
- **Confidence:** medium (presence is certain; ranking by volume is not)
- **Changes my mind:** Google Trends IL or Keyword Planner volumes.

### C-position-23 — The old `/partnership/` path meant something else: agency co-marketing partnerships, not a client offer
- **Evidence:** `/partnership/` says "'CO-SUCCESS' STATE OF MIND … נשמח להכיר ולבחון אפשרות של שיתופי פעולה וצמיחה משותפת. משרדי פרסום ושיווק, משרדי הפקה, תוכן ויחסי ציבור, יועצים עסקיים". In English: "we'd be glad to explore collaboration and shared growth: ad and marketing agencies, production, content and PR offices, business consultants". The footer box is "PARTNERSHIPS & BARTERSHIPS". The new `/partnership` is the flagship client offer on the same path. The meaning changes, but the URL keeps working.
- **Source:** https://talouloren.com/partnership/
- **Date:** 2018-07
- **Confidence:** high
- **Changes my mind:** —

### C-position-24 — Contact details published on every page: Bat Ami 3, Noga compound, Tel Aviv · tal@talouloren.com · 050-463-5536
- **Evidence:** Footer: "בת עמי 3, מתחם נגה, תל אביב" (Bat Ami 3, Noga compound, Tel Aviv), "tal@talouloren.com", "+972 50 4635536". The address sits in the "CAREERS WITH TALOU LOREN — ההצלחה דורשת צוות מושלם" box ("success requires a perfect team").
- **Source:** https://talouloren.com/ (footer)
- **Date:** 2021
- **Confidence:** high that it is published; unknown whether it is current
- **Changes my mind:** the partners giving a current address.

## Dead ends

- **Google Trends** (`trends.google.com/trends/api/explore`, geo=IL) returned HTTP 400 without a session token. Term evidence rests on autocomplete only.
- **LinkedIn** (talouloren, shaharnaor) returned HTTP 999 bot walls.
- **Google.co.il SERPs** and "related searches": the available search tool is US-indexed. The brand-name searches (C-position-18) are therefore weak evidence.
- **The second YouTube channel** in the footer has no content.
- **Behance project pages** return 403 to curl and needed a rendered browser.
- **7 portfolio photo pages** timed out in Chromium; their static HTML was read instead (no videos).
- **Instagram and Facebook post grids** need a login. Only the profile counts were read.
- **Pixel sizes for Elementor-only images** (2020/05 course icons and headshots) came from the HTML, not the media API. They match the files' size suffixes.

## Handoff notes


### A. Redirect table (C-position-03; 191 rows)

Status key:
- **live**: real content, reachable from the menu or a grid.
- **stale**: 200 but test, demo, orphan or outdated.
- **duplicate**: a copy of another page.
- **retired**: spam (410) or already 404 / CDX-only.

`410` means return Gone and do not redirect. Paths are decoded.

Rules for the Worker:
1. 301 every row with a route target.
2. Return 410 for the spam prefixes `/android-14/`, `/dll-files-tutorial/`, `/windows-10-laatste-updates/`, `/windows-11-filer/`, `/corrupt-windows-registry-2/`, `/dating-tips/` and their `/category/…` pages.
3. Send `/*/feed` and `/*/embed` to the parent row's target.
4. Send every other `/portfolio/*` and `/portfolio_cat/*` path to `/work`.
5. Send `/wp-*` and `/?p=*` to `/`.

Several pages map to `/book`, `/check` and `/course`. Their final targets may change once the partners settle the Check and course routes.

| Old path | Now | Status | Redirect to | Note |
|---|---|---|---|---|
| `/` | 200 | live | `/` | Home; menu "Homepage" |
| `/12333-2/` | 200 | duplicate | `/course` | earlier copy of /course/ (1,755 / 585 NIS) |
| `/android-14/android-apps-by-mediafire-on-google-play/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/android-14/are-you-aware-of-soap2day-virus-6/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/android-14/how-to-install-and-play-gta-6-apk-obb-data-for/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/author/niso/` | 200 | retired | `410` | author archive listing the 2022 spam posts |
| `/author/shahar/` | 200 | stale | `/about` | author archive (sitemap lastmod 2026-05-06) |
| `/author/talouloren/` | 200 | stale | `/about` | author archive |
| `/blog/success-is-a-drive/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-balance/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-behind-the-scene/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-being-ready/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-dialog/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-imagination/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-inside-your-organization/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-inspiration/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-leading-the-way/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-life-experience/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-movement/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-not-giving-up/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-perfect-image-at-facebook/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-romantic/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-the-right-story/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-visual-attraction/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-winning-after-winning-after-winning/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/success-is-working-together/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/blog/sucess-is-a-winner/` | 200 | live | `/watch` | vlog post (YouTube video) |
| `/brand-kick-start/` | 200 | stale | `/check` | 2019 free-video lead magnet |
| `/brand-quiz/` | 200 | stale | `/check` | 2019 quiz |
| `/brands/eugene-perma-blonde-master-study-case/` | 200 | live | `/work` | case-study post (YouTube video) |
| `/brands/wella-case-study/` | 200 | live | `/work` | case-study post (YouTube video) |
| `/brand-yourself/` | 200 | stale | `/course` | course checkout step (198x3 or 585 NIS) |
| `/case-study/` | 200 | live | `/work` | menu "Case Study"; 7 case studies in 3 tabs |
| `/category/android-14/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/category/blog/` | 200 | live | `/watch` | vlog archive |
| `/category/brands/` | 200 | stale | `/work` | archive |
| `/category/case-study/` | 200 | stale | `/work` | archive |
| `/category/corrupt-windows-registry-2/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/category/dating-tips/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/category/dll-files-tutorial/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/category/entrepreneurs/` | 200 | stale | `/work` | archive |
| `/category/hp/` | 200 | stale | `/` | archive |
| `/category/landing/` | 200 | stale | `/check` | 2019 landing post "כלים לניהול מותג פרסונלי" |
| `/category/organizations/` | 200 | stale | `/work` | archive |
| `/category/testimonials/` | 200 | live | `/work` | archive |
| `/category/windows-10-laatste-updates/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/category/windows-11-filer/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/contact/` | 200 | live | `/book` | footer "CONTACT TALOU" |
| `/corrupt-windows-registry-2/how-to-fix-unarc-dll-errors-in-windows-10/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/course/` | 200 | live | `/course` | BRAND YOURSELF sales page, 990 NIS |
| `/dating-tips/the-ultimate-guide-to-online-dating/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/dll-files-tutorial/running-dll-files-for-malware-analysis/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/entrepreneur-quiz/` | 200 | stale | `/check` | 2019 quiz |
| `/entrepreneurs/amt-case-study/` | 200 | live | `/work` | case-study post (YouTube video) |
| `/entrepreneurs/doron-shefer/` | 200 | live | `/work` | case-study post (YouTube video) |
| `/entrepreneurs/rita/` | 200 | live | `/work` | case-study post (YouTube video) |
| `/hp/casestudy/` | 200 | stale | `/work` | home-slider post |
| `/hp/testing/` | 200 | stale | `/work` | test post "DEKEL SABAN" (dead video) |
| `/hp/total-success-experience/` | 200 | stale | `/` | home-slider post |
| `/landing/כלים-לניהול-מותג-פרסונלי/` | 200 | stale | `/check` | 2019 landing post "כלים לניהול מותג פרסונלי" |
| `/maintenance/` | 200 | stale | `/` | maintenance placeholder |
| `/media-carousels/` | 200 | stale | `/` | Uncode theme demo (2014) |
| `/media-gallery/` | 200 | stale | `/` | Uncode theme demo |
| `/meet-tal/` | 200 | live | `/about` | menu "Meet Tal"; only a 3-button "SUCCESS MEETING" quiz entry |
| `/newsletter/` | 200 | stale | `/check` | newsletter signup |
| `/organization-quiz/` | 200 | stale | `/check` | 2019 quiz |
| `/organizations/obsessed-ck-team-booster-case-study/` | 200 | live | `/work` | case-study post (YouTube video) |
| `/organizations/visa-cal-managment-team-booster/` | 200 | live | `/work` | case-study post (YouTube video) |
| `/partnership/` | 200 | live | `/partnership` | footer link; old meaning = co-marketing partnerships with agencies (new /partnership = flagship offer) |
| `/philosophy/` | 200 | live | `/about` | footer link; Tal's "Success Is Beautiful" letter |
| `/portfolio/` | 200 | stale | `/work` | 2018 portfolio archive |
| `/portfolio/6b/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/6b-studio/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/aldo-coppola/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/art-factory/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/artistic-team/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/castro/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/castro-2/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio_cat/6b/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/casestudy/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/castro/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/celebration-kit/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/eugene/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/headspinners/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/how/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/hub/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/inbar/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/photography/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/production/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/rntl/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio_cat/video/` | 200 | stale | `/work` | 2016-18 portfolio category |
| `/portfolio/centered-custom-one/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/centered-custom-two/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/centered-gallery/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/centered-gallery-full-width/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/centered-slides/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/centered-slides-full-width/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/centered-stack/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/centered-stack-full-width/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/בימוי/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/הפקה/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/מובילי-דעה/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/מיתוג/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/פוסט-פרודקשן/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/צילום-אווירה/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/צילום-אירועים/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/צילום-דוקומנטרי/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/צילום-ועריכת-וידאו/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/צילום-יחצ/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/צילום-לרשתות-החברתיות/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/צילום-מוצר/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/צילום-קולקציה/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/צילום-תדמיתי/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/ריטושים/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/eugene/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/eugene-perma/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/eugene-perma-2/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/everything-is-always-working-out-for-me/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/fashion-club/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/fashion-club-2/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/fashion-tour/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/fashion-week/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/gift-of-beauty/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/glamorizer/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/hairdreams/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/headspinners/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/inbar/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/kissed-by-the-sun/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/portfolio/sidebar-custom-one/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/sidebar-custom-two/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/sidebar-gallery/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/sidebar-gallery-full-width/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/sidebar-slides/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/sidebar-slides-full-width/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/sidebar-stack/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/sidebar-stack-full-width/` | 200 | stale | `410` | Uncode theme demo portfolio item (2014) |
| `/portfolio/wizzo-haifa-fashion-institute/` | 200 | stale | `/work` | 2016-18 portfolio item (photo/video production era) |
| `/privacy/` | 200 | live | `/privacy` | footer link |
| `/quiz/` | 200 | stale | `/check` | quiz archive |
| `/quiz/new_brand/` | 200 | stale | `/check` | quiz |
| `/quiz/new_entrepreneur/` | 200 | stale | `/check` | quiz |
| `/quiz/new_organization/` | 200 | stale | `/check` | quiz |
| `/services/` | 200 | live | `/` | menu "Services"; 3 service pillars, no prices |
| `/temp/` | 200 | stale | `/` | theme test page (lists spam posts) |
| `/temp2/` | 200 | stale | `/` | theme test page |
| `/testimonials/amos/` | 200 | live | `/work` | video testimonial post |
| `/testimonials/amos-second/` | 200 | live | `/work` | video testimonial post |
| `/testimonials/joya-cosmetics/` | 200 | live | `/work` | video testimonial post |
| `/testimonials/ronen/` | 200 | live | `/work` | video testimonial post |
| `/testimonials/yifat/` | 200 | live | `/work` | video testimonial post |
| `/testing222/` | 200 | duplicate | `/book` | test copy of the session page (199 / 690 NIS) |
| `/testing-quiz/` | 200 | stale | `/check` | test quiz |
| `/thanks/` | 200 | stale | `/thanks` | "thanks for leaving details" |
| `/thank-you/` | 200 | stale | `/thanks` | 2019 thank-you page |
| `/thankyou/` | 200 | stale | `/course` | "thank you for buying the course" |
| `/total-success/` | 200 | stale | `/book` | 2019 one-to-one programme: 700 NIS intro + 4 meetings 15,000 struck to 8,000 NIS |
| `/unsubscribe/` | 200 | stale | `/` | newsletter unsubscribe |
| `/vlog-of-success/` | 200 | live | `/watch` | menu "VLOG of success"; grid of 12 vlog posts |
| `/windows-10-laatste-updates/hoe-te-ontbrekende-dll-7/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/windows-11-filer/flytte-vivaldi-til-ny-server/` | 200 | retired | `410` | 2022 injected spam (site compromised); remove, do not redirect |
| `/winning-personal-brand/` | 200 | live | `/book` | paid 60-min session, 1,000 NIS; booking button 404s |
| `/winning-personal-brand-too/` | 200 | duplicate | `/book` | older copy of the session page (1,500 / 690 NIS) |
| `/SuccessfulPersonalBrandDesktop` | 404/301 | retired | `/book` | Wayback CDX only; booking-button target on /winning-personal-brand/, 404 now |
| `/SuccessfulPersonalBrandMobile` | 404/301 | retired | `/book` | Wayback CDX only; same, mobile |
| `/branding` | 404/301 | retired | `/` | Wayback CDX only; pre-2018 site |
| `/branding.html` | 404/301 | retired | `/` | Wayback CDX only; pre-2018 static site |
| `/about.html` | 404/301 | retired | `/about` | Wayback CDX only; pre-2018 static site |
| `/index.html` | 404/301 | retired | `/` | Wayback CDX only; pre-2018 static site |
| `/fashion.html` | 404/301 | retired | `/work` | Wayback CDX only; pre-2018 static site |
| `/productions.html` | 404/301 | retired | `/work` | Wayback CDX only; pre-2018 static site |
| `/mobile.html` | 404/301 | retired | `/` | Wayback CDX only; pre-2018 static site |
| `/error.html` | 404/301 | retired | `410` | Wayback CDX only;  |
| `/successisbeautiful.html` | 404/301 | retired | `/about` | Wayback CDX only; pre-2018 static site |
| `/marketing` | 404/301 | retired | `/` | Wayback CDX only; pre-2018 |
| `/marketing-and-brand-management` | 404/301 | retired | `/` | Wayback CDX only; pre-2018 |
| `/strategy` | 404/301 | retired | `/` | Wayback CDX only; pre-2018 |
| `/organizations-how` | 404/301 | retired | `/brands` | Wayback CDX only; pre-2018 |
| `/organizations-new-virtual-reality` | 404/301 | retired | `/brands` | Wayback CDX only; pre-2018 |
| `/salon-expert` | 404/301 | retired | `/work` | Wayback CDX only; pre-2018 |
| `/the-studio-of-fashion-and-beauty-photography` | 404/301 | retired | `/work` | Wayback CDX only; pre-2018 |
| `/dvision-studio` | 404/301 | retired | `/work` | Wayback CDX only; pre-2018 |
| `/dvisual-hub` | 404/301 | retired | `/work` | Wayback CDX only; pre-2018 |
| `/rntl` | 404/301 | retired | `/work` | Wayback CDX only; pre-2018 |
| `/a` | 404/301 | retired | `/` | Wayback CDX only;  |
| `/portfolio/label-m` | 404/301 | retired | `/work` | Wayback CDX only; 404 |
| `/portfolio/maralboro` | 404/301 | retired | `/work` | Wayback CDX only; 404 |
| `/portfolio/salon-fashion-week` | 404/301 | retired | `/work` | Wayback CDX only; 404 |
| `/portfolio/loreal` | 404/301 | retired | `/work` | Wayback CDX only; now 301 to a .jpg |
| `/portfolio/wella` | 404/301 | retired | `/work` | Wayback CDX only; now 301 to a .jpg |
| `/organizations` | 404/301 | retired | `/brands` | Wayback CDX only; now 301 to an empty base |
| `/marketing-and-brand-management/contact` | 404/301 | retired | `/book` | Wayback CDX only; now 301 to /contact/ |

### B. Proof inventory, cross-checked against the do-not-claim list

| Proof item | Source | Use on new site? |
|---|---|---|
| Logo wall: 36 logos in 3 tabs (C-position-08) | `/` | Yes (A4). Redraw: the files are 200x133 px |
| Amdocs, WeWork logos | `/total-success/` | Yes (A4); the brief allows the 27,000 Amdocs figure |
| Maccabi, Amdocs, Taboola, Kornit, Bezeq, Clalit films | YouTube channel (videos.md) | Yes as video proof; the brief allows Maccabi "3 million" |
| Case studies: Wella, Eugene Perma, CK, Visa Cal, Doron Shefer, Rita, AMT | `/case-study/` | Story yes. **Strip all numbers** (C-position-10) |
| Celebrity / executive list (Tshuva, Shwed, Hadad, Harari, Olman…) | `/winning-personal-brand/` | **No** without explicit permission (C-position-09) |
| "Biggest brands in the world … paid hundreds of thousands" | `/course/` | **No** |
| 10x / 100x / 1000x return lines | 5 pages (C-position-11) | **No** (brief) |
| Written quotes: Alon Olman, Rita, Shaul Naftali, Dr. Osnat Raziel, Rotem Yaldin, Spaa | `/course/` | Ask the partners; A4 covers logos only |
| Video testimonials: Yifat, Amos ×2, Ronen, Joya, Natali, Ella; "Talou Testimonial Film 1–3" | `/`, `/course/`, YouTube | Yes (client videos) |
| NBC = *Pale Force* animation for Late Night with Conan O'Brien (Shahar) | Behance 56282761 | Yes, credited as Shahar's animation. Do not imply an NBC branding client; "Emmy nominee" belongs to the programme |
| Coca-Cola Israel: web design and animated video (Shahar, 2017) | Behance 56293729 | Yes |
| COTI, Allegronet, Privex, NFA, Sheket, Bulldog Markets, AdRabbit, CVI (Shahar) | Behance | Yes, as logos or work |
| Philip Morris logo and films | `/`, YouTube | Allowed by A4; reputational call for the partners |
| Alvaro / Netflix / Teddy Sagi | not found on old site | n/a |

### C. Tone sample (C-position-13)

| # | Quote (page) | Gloss | Verdict |
|---|---|---|---|
| 1 | "אתה לא לבד. נשימה." (`/`, `/services/`) | "You are not alone. Breathe." | **Keep**: the core warmth line |
| 2 | "ביחד נדייק את החזון שלך" (`/`, `/services/`) | "Together we'll sharpen your vision" | **Keep** |
| 3 | "העסק שהקמתי מבוסס על סינדרום שגיליתי שיש לי. הסינדרום הוא שאני רואה כל דבר באידאל שלו." (`/philosophy/`) | "The business I built rests on a syndrome I discovered I have: I see everything at its ideal." | **Keep**: personal, story-led |
| 4 | "כי כשאנחנו במיטבנו – האור שלנו מופץ!" (`/course/`) | "Because when we're at our best, our light spreads!" | **Keep** (matches "flip the spotlight") |
| 5 | "אתה זה המותג. את המותג." (`/course/`) | "You are the brand." (both genders) | **Keep** |
| 6 | "ונהפוך אותך ללוחם האולטימטיבי. ווינריות ומצליחנות זה שם המשחק." (`/`) | "We'll make you the ultimate warrior. Winning and success is the name of the game." | Drop |
| 7 | "אנחנו גן עדן ליזמים ואנשי עסקים" (`/`) | "We are a paradise for entrepreneurs and business people" | Drop |
| 8 | "כולם ואחיהם היו היום מיליונרים. כולנו היינו מסתובבים יחד במלדיבים…" (`/winning-personal-brand/`) | "Everyone and their brother would be millionaires; we'd all be hanging out in the Maldives…" | Drop |
| 9 | "למי זה לא מתאים: לבזבזני זמן ואנרגיה … למי שמחפש פתרונות בקומבינה" (`/winning-personal-brand/`) | "Not for: time and energy wasters … people looking for shortcut schemes" | Drop |
| 10 | "שיחת אסטרטגיה חינם שווה בערך למחיר שאתה משלם עבורה. אז לא. השיחה לא בחינם." (`/winning-personal-brand/`) | "A free strategy call is worth about what you pay for it. So no, the call isn't free." | Drop the jab. The idea of a paid session stays (brief) |
| 11 | "תוך כמה רגעים תהיה לך ביד גישה לבניית אסטרטגיית מותג שתזניק אותך למקומות שאפילו לא העזת לחלום!" (`/course/`) | "In a few moments you'll have a brand strategy that launches you to places you never dared dream of!" | Drop |

### D. Asset list for the harvester (C-position-15, C-position-20)

Base URL: `https://talouloren.com/wp-content/uploads/`. All sizes come from the WP media API unless marked "HTML".

| Asset | Path | Size (px) | Content / use |
|---|---|---|---|
| Tal portrait, B&W | `2019/03/lp_taloren.jpg` (also `.png`) | 921x1060 | Session-page hero; best single portrait |
| Tal portrait | `2018/04/2.jpg` | 1500x1000 | Meet Tal hero |
| Tal portrait | `2018/04/cid_D8376DB7-E02B-4708-89BF-65C022C48D11.jpg` | 640x960 | Footer "PARTNERSHIPS" |
| Tal + 2 men | `2018/04/cid_ED996016-879C-4538-BA5B-D17151CBC351.jpg` | 960x640 | Footer "CAREERS". Do not use as a team photo |
| Tal, laughing | `2019/02/lp_laugh.jpg` / `-mobile` | 480x720 / 480x443 | Session page |
| Tal, "about time" | `2019/02/lp_aboutTime.jpg` / `-mobile` | 679x1051 / 635x861 | Session page |
| Home portraits | `2018/04/IMG_8345.jpg` (also `2016/05/IMG_8345.jpg` 1000x1500), `2018/06/mobileHP.jpg` | 1000x1168, 789x938 | Home hero slider |
| Home "SO PROUD" still | `2018/07/FINAL.jpg` | 1400x933 | Case-study teaser (subject not checked) |
| Event / shoot stills | `2018/04/cid_166AE5B1-…jpg` 2500x1667; `2018/07/cid_67B43628-…`, `cid_64F45B62-…`, `cid_9F547C53-…` 1500x1000; `2018/04/cid_E9DE9C89-…`, `cid_9B6CB322-…` 1200x800 | as listed | Case-study and workshop photos (subjects not checked one by one) |
| Square brand image | `2019/05/talouloren.png` | 1080x1080 | `/total-success/` |
| Client-wall backgrounds | `2019/02/clients-bg1…5.jpg` | 1920x1080 (mobile `2019/03/clients-bg*m.jpg` 640x1138) | Session-page section backgrounds |
| Section backgrounds | `2019/02/section7-bg.jpg` 1920x1899; `section9-bg.jpg` 921x1060 | as listed | Session page |
| Question avatars | `2019/02/question-person1…7.jpg` | 500x500 | FAQ avatars (likely stock) |
| Org / brand tiles | `2018/04/organizations.jpg` 1308x1142; `brands.jpg` 1236x1118 | as listed | Case-study tabs |
| Philosophy banner | `2018/05/philosophy.jpg` | 1194x446 | `/philosophy/` |
| Course icons | `2020/05/*.png` (8 lesson icons) | 375x376 (HTML) | Course page |
| Testimonial headshots | `2020/05/alon.png`, `rita.png`, `spaa.png` 265x265; `osnat.png`, `rotem2.png` 344x344 | (HTML) | Course quotes |
| Logos (36) | `2018/04|07/*.jpg`, `2016/05/*.jpg` | 200x133 / 150x100 | Proof wall. Too small; redraw |
| Amdocs, WeWork, money-back badge | `2019/05/amdocs.png`, `wework.png`, `moneyback.png` | 500x500 | `/total-success/` |
| Signature | `2018/04/gold_sig.svg`, `black_sig.svg`, `white_sig.svg`; `2019/02/goldsig.png` 410x68; `2018/06/signatureAnimation.gif` 200x33 | vector / as listed | "Talou L'oren" handwritten logo |
| Gold bar | `2016/05/GoldLong.png` | 2040x150 | Gold gradient strip |
| Audio | `2016/05/Success-Is-Beautiful.m4a` | — | Unused jingle "Success Is Beautiful" |
| Video files | `2018/07/TalulIntro_out.mp4` 320x240; `2018/05/hp_out.mp4` 598x240 | — | Too small to reuse |
| Shahar — Behance covers | `https://mir-s3-cdn-cf.behance.net/projects/original/<hash>.Y3JvcCwxMzgwLDEwODAsMCww.png`; hashes: 7c4a7a56282761 (Pale Force), a6116956293729 (Coca-Cola), 02ce2b174440027 (Allegronet), 8aacdd145993385, 3d3d16147186705, 5bbecc152496563, cd65d8170696805, 46f041173347387, 0372a8217553565, 446a3d217555661, b9751d219157569, 972bc5219429061 | 1380x1080 | Proof and work |
| Shahar — site | `https://shaharnaor.com/imgs/sn.webp` 320x320; app icons 150–512 | as listed | Logo and icons only; no portrait online |
| Videos | see `dossier/talouloren/videos.md` | — | 47 YouTube ids + channel lists |

### E. Hebrew search terms (C-position-21, C-position-22)

Every term below was returned by Google IL autocomplete (`hl=he&gl=il`) on 2026-11-02. The "Seed" column is the query that surfaced it.

| Intent | Term | Gloss | Seed |
|---|---|---|---|
| Branding | מיתוג עסקי | business branding | מיתוג / מיתוג עסקי |
| Branding | מיתוג לעסקים קטנים | branding for small businesses | מיתוג עסקי, מיתוג לעסק |
| Branding | מיתוג לעסק חדש | branding for a new business | מיתוג לעסק |
| Branding | סטודיו למיתוג תל אביב | branding studio Tel Aviv | סטודיו למיתוג |
| Branding | בניית מותג | building a brand | בניית מותג |
| Personal brand | בניית מותג אישי | building a personal brand | מותג אישי, בניית מותג |
| Personal brand | מיתוג אישי לעסק | personal branding for a business | מיתוג אישי לעסק |
| Personal brand | יועץ מיתוג אישי | personal-branding consultant | יועץ מיתוג |
| Personal brand | איך למתג את עצמך | how to brand yourself | איך למתג |
| Business mentoring | יועץ עסקי | business consultant | יועץ עסקי |
| Business mentoring | ייעוץ עסקי לעסקים קטנים בחינם | free business consulting for small businesses (returned only with "בחינם") | יועץ עסקי |
| Business mentoring | מנטור עסקי | business mentor | מנטור עסקי |
| Business mentoring | מנטורינג עסקי | business mentoring | מנטורינג עסקי |
| Launching a business | הקמת עסק חדש | setting up a new business | הקמת עסק |
| Launching a business | ייעוץ עסקי לפתיחת עסק | business advice for opening a business | יועץ עסקי |
| Launching a business | פתיחת עסק קטן מהבית | opening a small home business | פתיחת עסק |
| Marketing strategy | אסטרטגיה שיווקית לעסק | marketing strategy for a business | אסטרטגיה שיווקית |
| Marketing strategy | בניית אסטרטגיה שיווקית | building a marketing strategy | אסטרטגיה שיווקית |
| Marketing strategy | ייעוץ שיווקי לעסקים קטנים | marketing consulting for small businesses | ייעוץ שיווקי |
| Marketing strategy | ייעוץ שיווקי אסטרטגי | strategic marketing consulting | ייעוץ שיווקי |

**Which terms the page titles should carry (speculation, for the SEO and copy stations):**
- **Home:** "מיתוג אישי לעסק" or "בניית מותג אישי" plus "אסטרטגיית מותג". Avoid bare "מיתוג אישי", which reads as party goods (C-position-21).
- **`/story`:** "בניית מותג אישי".
- **`/launch`:** "הקמת עסק חדש" and "מיתוג לעסק חדש".
- **`/partnership`:** "מנטור עסקי" or "ליווי עסקי". Note: "ליווי" got no autocomplete; "יועץ עסקי" and "מנטור" did.
- **`/check`:** "ייעוץ עסקי לעסקים קטנים". The autocomplete pairs it with "בחינם" (free), which suits the free Check.
- **`/book`:** "ייעוץ שיווקי אסטרטגי".
- **`/brands`:** "סטודיו למיתוג תל אביב" and "מיתוג עסקי".
- **`/course`:** "קורס בניית מותג". This was suggested under "בניית מותג"; "קורס מיתוג אישי" returns only itself.

The old titles targeted "מלווה עסקי" (business mentor), "מדריך לפתיחת עסק" (guide to opening a business), "שירותי ליווי עסקי, בניית מותג" (business mentoring services, brand building) and "איך להצליח בעסק?" (how to succeed in business?). They were never ranking evidence; they only show past intent.

### F. Other notes

- **Spelling.** The brand appears in at least four spellings: "TALOU L'OREN", "Talou Loren", "TalouLoren" and "טאלו לורן". The new site should pick one and set it in `schema.org` `alternateName`, since the name has no search footprint today (C-position-18).
- **Old proof of work.** The 2016–2018 photo-production portfolio (פוסט פרודקשן post-production, צילום תדמיתי image photography, צילום מוצר product photography, Castro, Wella, Eugene, Aldo Coppola, Hairdreams…) is a different, earlier business line. It maps to `/work` only for its redirects.
- **Fixable videos.** The vlog embed typo and the AMT re-upload mean all 7 case-study and 19 vlog videos are usable for `/watch` and `/work`.
- **Security.** The site is compromised and leaks a PHP path. If the old WordPress must stay up during the switch, it should be locked down or replaced by the Worker's redirect map quickly. That is not this lane's call.
