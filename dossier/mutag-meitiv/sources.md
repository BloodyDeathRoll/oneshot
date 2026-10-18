# dossier/mutag-meitiv/sources.md — every URL the harvester touched (station 3, run 2026-10-il-brand-01)

Harvester 0.4.2, 2026-10-18. Business type `brand_practice` (draft row in `proposals/2026-10-il-brand-01/001-vertical-brand_design.md`, pending approval). Scope (brief 17, 19): the current site redesigned — all content and all 9 secondary offers kept; Wix leftovers, duplicates and the 3 San Francisco demo events skipped.

Method: every sitemap page rendered in headless Chromium (Playwright, `he-IL`, 1440 px, scrolled to the bottom so lazy content loads); text, images (`currentSrc`, alt, natural size), links, iframes, `<video>` elements and video network responses saved per page. Wix's server returned random HTTP 500s (and once 503/403); every failed page was retried until it rendered. Image originals are the Wix media files (`https://static.wixstatic.com/media/<id>`), not the resized thumbnails. Client facts are tagged `origin: "client"` from `brief/mutag-meitiv/brief.md` (items 11–25).

## The business's own site — https://www.mutagmeitiv.com/

| URL | Yield | Did not yield |
|---|---|---|
| `/sitemap.xml` + `pages-`, `blog-posts-`, `blog-categories-`, `event-pages-`, `booking-services-sitemap.xml`; `member-profiles_p_first-chunk-sitemap.xml` listed, not fetched (lane: empty) | 20 pages, 66 posts, 9 category URLs, 3 events, 1 booking service | — |
| `/` (desktop + phone UA) | hero, award + credential badges, 4 service cards, motto, podcast block + Spotify episode embed, team of 4 (names, roles, bios, photos), 3 latest posts, 15 client logos, newsletter, footer; brand colours (computed styles) and fonts (@font-face names); the **WhatsApp link** `api.whatsapp.com/send?phone=972546686808` in the Wix mobile action bar (phone UA only) | no `<video>`, no YouTube/Vimeo; no address, no hours |
| `/about` | founder story (verbatim in `pages[]`), founder photo | — |
| `/process` | strategic-planning page, 3-stage method wording, BTC description, reach claim "5 languages / 40+ countries", Calendly `calendly.com/hadas`, 9 photos | price, testimonials |
| `/personal101` | personal-branding page, 4 stages, 4 questions, "10 - 15 מפגשים", Calendly `/hadas/30min`, 3 testimonials, Kate Raworth quote, 10 photos | price |
| `/סדנאות-והרצאות` | 7 offers with prices (5200+VAT, free, 580+VAT/person, 3200+VAT, 480+VAT) | registration links (the "הרשמה" buttons are `<button>`s with no target), dates |
| `/newcourse` | course "מעסק למותג מיטיב", 9-meeting syllabus, founder bio, award line, 3 testimonials, "ההרשמה נסגרה" | price |
| `/copy-of-מעסק-למותג-מיטיב-הקורס` (duplicate) | 2650 ₪, meeting 6 variant, Kaparacom bio, longer Anva Ratzon quote — recorded as variants only | — |
| `/smst` | THE BETTER 4 page: 350 ש״ח, 11:00–14:00, מרכז נור רוטשילד 51 ת"א, founder bio, PayBox link `links.payboxapp.com/qIoPuiOFXUb` | date |
| `/brandandbreakfast` | Brand & Breakfast: 15.5.26 10:00–13:00, Zichron Yaakov, ≤ 7, 350 ש״ח, 2 testimonials, WhatsApp "0546686808", payment methods | — |
| `/brandpower` | PDF guide link + free intro meeting | sign-up form for the guide |
| `/_files/ugd/5b80b1_a6a31b83784f4cd7a54ab4552e6b8868.pdf` | HTTP 200, application/pdf, 523,072 bytes ("מתנה- מדריך הכנה למיתוג") — link recorded, file not stored | — |
| `/podcastbestchapters` | podcast story + 5 most-listened episodes | episodes after Jun 2024 |
| `/contact` | form text | — |
| `/הצהרת-נגישות` | accessibility statement (AA, updated 20-08-2025, coordinator Hadas, phone, email) | — |
| `/blog` | index, categories, 3 newest | — |
| `/support-us` | (500 ×3, then 200) course Q&A, intro lecture "24.9" no year — stale, kept in `pages[]` | — |
| `/register` | (500, then 200) MAP YOUR VISION 2025 payment page — stale | — |
| `/service-page/brand-the-change-לאנשי-מקצוע` | 2,850 ₪, "unavailable", phone + email | — |
| `/copy-of-אודות` | older about text (duplicate) | — |
| `/book-online`, `/courses`, `/event` | Wix leftovers (ended service / empty / "no events") — skipped | — |
| `/events/meal-packaging-delivery`, `/events/single-parent-cooking-workshop`, `/events/thanksgiving-soup-kitchen` | not fetched: Wix template demo events, skipped per scope | — |
| `/blank-2` | Wix 404 page (linked from both course pages) | — |
| `/createvisionboard` (from Instagram post C_QyLOvohWN) | HTTP 500, then 403 "You don't have permission to view this page" | its content |
| `https://www-mutagmeitiv-com.filesusr.com/html/5b80b1_50723acfc9dec977a72c5004ada6f7b1.html` | the home HTML embed = Spotify episode iframe `open.spotify.com/embed/episode/7dBiHwtr3XoqSQsPQwwvC1` | — |
| 66 blog posts (list at the end) | title, published/updated date, summary, cover-image URL — 60 from BlogPosting JSON-LD (curl), 6 from the rendered post (curl got a page without JSON-LD four times) | cover images not downloaded (many are Unsplash `nsplsh_` / third-party) |
| `static.wixstatic.com/media/…` (79 originals) | 58 site images kept (+3 logo files); skipped: 7 decorative leaf/shape PNGs, Wix system icons (quote mark, PDF icon), the Bit QR code and Bit/PayBox logos, 3 blog cover images on the home page, 3 duplicate files (BTC badge ×2 more, tree infographic a494fd copy, collage copy on /register) | — |
| `static.wixstatic.com/ufonts/…` | font names only (Heebo, Assistant) | — |

Old-site capture: `dossier/mutag-meitiv/make-old-site.sh` → `assets/old-site-mobile.png` (phone UA, Wix's 320 px mobile layout, 6596 px tall), `assets/old-site-desktop.png` (1440 px, 5641 px tall), `assets/old-site.json` (status 200; first load ≈ 5.9 MB mobile / 3.8 MB desktop; LCP 3.3 s mobile in that run).

## Other sources

| URL | Yield | Did not yield |
|---|---|---|
| https://anchor.fm/s/50a74720/podcast/rss | 23 episodes (title, date, duration, link, audio URL, cover, description), show title/author/description/cover | — |
| https://www.brandawards.co.il/%d7%96%d7%95%d7%9b%d7%99%d7%9d-2022/ | award verified: "קטגוריה עמותות — gold — ברטלי — מותג מיטיב — לאתר מותג מיטיב", judges' text; page footer "בראנד אקדמי 2022", link `brandacademy.co.il` | — |
| https://linktr.ee/hadasdrachli_mutagmeitiv (from the Instagram bio) | 4 links: site, Spotify, Instagram, LinkedIn | WhatsApp |
| https://www.youtube.com/@mutagmeitiv | 404 — no channel under that handle | — |
| YouTube search "מותג מיטיב הדס דרכלי" | only unrelated channels | a business channel |
| YouTube oEmbed for the 10 YouTube embeds/links in blog posts (3KZ6mIsbDc4, A7tvK5RAGDM, ykVIkXyq9hQ, iCvmsMzlF7o, gNxY2L5VJeQ, rwp0Bx0awoE, XCsGLWrfE4Y, grSYMuu-9NE, tl07NG4ZY5c, nSf5wdTcTuo) and Vimeo oEmbed 182342001 | all third-party (TED, Outland Denim, game trailers, a film, a gin brand…); one unavailable | any business-owned video |
| TED HLS streams on the post "5 הרצאות TED…" | third-party (TED) | — |
| WebSearch `instagram.com mutagmeitiv מותג מיטיב post` | nothing relevant | post codes |
| Facebook, LinkedIn, Apple Podcasts, brandthechange.org | not re-fetched: taken from the industry lane (`industry/lane-position.md`) — Facebook login wall, LinkedIn HTTP 999, Apple 0 ratings, BTC trainer list | — |

## Instagram — https://www.instagram.com/mutagmeitiv/ (no login, no cookies)

- `curl` of the profile and of `/mutagmeitiv/embed/` returns only the login shell (no post data).
- The profile **rendered logged-out** in headless Chromium shows the bio, 169 followers, 288 following, and the **12 newest post codes** with dated alt text: C5ynxOXNEJF, Cv4x3a4tmQP, DU6Vs32jEnO, DMLlsaXNo1u, DILN8yiNoV3, DCHkEwbI23w, C_QyLOvohWN, C74lZKMt5DB, reel C6OIqnGNoYc, C5OWBhKthwF, reel C1ZADx8tvPk, CiZ2TRYrjaQ.
- Each post's public embed page `https://www.instagram.com/<p|reel>/<code>/embed/captioned/` (rendered) gave the cover image (largest `srcset` entry, 540–1440 px), the caption and, for 3 posts, a direct MP4 URL. All 12 covers downloaded (`img-ig-01…12`), captions verbatim in `instagram.posts[]`.
- Older posts (27 in total per the industry lane) are not reachable without login → gap `instagram.older_posts` (non-blocking: "needs Shahar's OK to use a logged-in reader (Burgundy services/instagram uses a session cookie)"). Not attempted.
- Instagram CDN URLs expire, so `make-media.sh` re-resolves them from the embed pages on every run.

## Video — every surface checked

| Surface | Result |
|---|---|
| Own site, every page: `<video>` elements, YouTube/Vimeo iframes, video network responses, `video.wixstatic.com` | none (only a Spotify audio embed and third-party embeds inside blog posts) |
| YouTube (handle, search, oEmbed of every embed) | no business channel; all embeds third-party |
| Vimeo | one embed in a blog post, owned by Outland Denim |
| Instagram (public embed pages) | **3 videos, all business-owned**: reel C6OIqnGNoYc (89.8 s, 720×1280) → `vid-002`; reel C1ZADx8tvPk (29.4 s, 720×1280) → `vid-003`; carousel clip in Cv4x3a4tmQP (6.7 s, 480×600) → `vid-001`. `yt-dlp` is not installed, so `tools/fetch-video.mjs` was given each direct MP4 URL from the embed page; all three contact sheets were looked at |
| Facebook | login wall (lane); not attempted |

Pick: `vid-002` 44–56 s (hands wrapping a banana-leaf gift; no faces, no on-screen text), poster at 48.5 s — a small workshop/Instagram clip, not a full-bleed hero (vertical, handheld). `vid-003` has a burned-in caption on every frame; `vid-001` is 6.7 s at 480 px with faces close up.

## Blog posts (66)

- 2026-08-22 — https://www.mutagmeitiv.com/post/מכאוס-לאחריות-הקשר-המפתיע-בין-מרינה-אברמוביץ-ארנולד-שוורצנגר-ויעדי-הפיתוח-בר-קיימא-הבינלאומיים-ו (BlogPosting JSON-LD)
- 2026-05-28 — https://www.mutagmeitiv.com/post/socialai (BlogPosting JSON-LD)
- 2026-04-22 — https://www.mutagmeitiv.com/post/strategy (BlogPosting JSON-LD)
- 2026-03-22 — https://www.mutagmeitiv.com/post/במיוחד-ליום-האשה-נשים-שמשנות-את-העתיד-כאן-ועכשיו (BlogPosting JSON-LD)
- 2026-02-05 — https://www.mutagmeitiv.com/post/2026trendsforthbetter (BlogPosting JSON-LD)
- 2025-12-22 — https://www.mutagmeitiv.com/post/איך-מפתחים-מותג-עם-השפעה-חיובית-בישראל (BlogPosting JSON-LD)
- 2025-11-01 — https://www.mutagmeitiv.com/post/5-סרטים-מעוררי-השראה-על-קיימות-ואופנה-שכדאי-לראות (BlogPosting JSON-LD)
- 2025-01-26 — https://www.mutagmeitiv.com/post/10-מותגים-מיטיבים-מבשרי-השחר-של-2025 (BlogPosting JSON-LD)
- 2024-11-06 — https://www.mutagmeitiv.com/post/esg_בעסקים_קטנים_ובינוניים (BlogPosting JSON-LD)
- 2024-08-23 — https://www.mutagmeitiv.com/post/מיתוג-עצמי-חיובי-איך-להשתמש-בסודות-המיתוג-לקידום-רווחה-נפשית-וחשיבה-מודעת (BlogPosting JSON-LD)
- 2024-06-27 — https://www.mutagmeitiv.com/post/מה-זה-אימפקט-עושים-סדר-בחדר (BlogPosting JSON-LD)
- 2024-04-19 — https://www.mutagmeitiv.com/post/מותגי-העתיד-בתחום-בריאות-הנפש-כי-זה-מה-שאנו-הכי-זקוקים-לו-כרגע (BlogPosting JSON-LD)
- 2024-01-11 — https://www.mutagmeitiv.com/post/brands_to_watch_2024 (BlogPosting JSON-LD)
- 2023-11-21 — https://www.mutagmeitiv.com/post/איך-סולידריות-יכולה-להפוך-לאסטרטגיית-שיקום-מאמר-דעה (BlogPosting JSON-LD)
- 2023-08-10 — https://www.mutagmeitiv.com/post/holon_material_library (BlogPosting JSON-LD)
- 2023-06-20 — https://www.mutagmeitiv.com/post/די-לחרדה-על-מודלי-עבודה-מיטיבים-בעולם-תשוש (BlogPosting JSON-LD)
- 2023-04-22 — https://www.mutagmeitiv.com/post/מאומת-הסטארט-אפ-לאומת-האימפקט-ולא-אין-זו-אגדה-סיכום-ביקור-פורום-הרצל-ליזמות-חברתית-כלכלית (BlogPosting JSON-LD)
- 2023-03-07 — https://www.mutagmeitiv.com/post/איך-להפוך-את-חג-פורים-ליותר-מקיים (BlogPosting JSON-LD)
- 2023-01-16 — https://www.mutagmeitiv.com/post/עשרת-המותגים-המיטיבים-והמבטיחים-לשנת-2023 (BlogPosting JSON-LD)
- 2022-11-20 — https://www.mutagmeitiv.com/post/דמנהור-פלא-העולם-השמיני-ביקור-בקהילה-שהיא-מותג (BlogPosting JSON-LD)
- 2022-09-12 — https://www.mutagmeitiv.com/post/שנה-חדשה-בפתח-מגזין-מיוחד-לשנה-החדשה-מה-נאחל-השנה (BlogPosting JSON-LD)
- 2022-09-01 — https://www.mutagmeitiv.com/post/מיטיב-החודש-air-ink-לצייר-ולהדפיס-בעזרת-זיהום-אוויר (BlogPosting JSON-LD)
- 2022-07-07 — https://www.mutagmeitiv.com/post/הגיל-השלישי-כש-70-זה-ה-60-החדש (BlogPosting JSON-LD)
- 2022-05-18 — https://www.mutagmeitiv.com/post/מהי-צרכנות-מודעת-5-השלבים-הראשונים-לעשות-זאת-בקלות-ובאתיות (BlogPosting JSON-LD)
- 2022-04-27 — https://www.mutagmeitiv.com/post/איך-פחד-עצר-אותי-מלעמוד-בהבטחת-המותג-שלי-ולמה-לקח-מלא-זמן-להולדת-הפודקאסט (date shown on the rendered post)
- 2022-02-09 — https://www.mutagmeitiv.com/post/clariter-גם-תעשייתי-גם-מסחרי-וגם-מיטיב (BlogPosting JSON-LD)
- 2022-01-20 — https://www.mutagmeitiv.com/post/5-הרצאות-ted-מעוררות-מחשבה-ופתרונות-מעשיים-על-קיימות (date shown on the rendered post)
- 2021-12-30 — https://www.mutagmeitiv.com/post/לקראת-2022-קבלו-את-10-המותגים-המיטיבים-שעשו-פריצת-דרך-השנה-ובגדול-גם-ישראלים-ברשימה (BlogPosting JSON-LD)
- 2021-11-15 — https://www.mutagmeitiv.com/post/cop-26-סיכום-ועידת-האקלים-2021-כל-מה-שרצית-לדעת (BlogPosting JSON-LD)
- 2021-10-19 — https://www.mutagmeitiv.com/post/מיטיב-החודש-ברטלי-נוער-בתנועה (BlogPosting JSON-LD)
- 2021-09-20 — https://www.mutagmeitiv.com/post/persona (BlogPosting JSON-LD)
- 2021-07-12 — https://www.mutagmeitiv.com/post/איך-למצוא-את-הקהל-שלך-חלק-א-the-early-adopters (BlogPosting JSON-LD)
- 2021-06-30 — https://www.mutagmeitiv.com/post/כלכלה-מעגלית-מדוע-היא-מתאימה-לעסקים-קטנים-ובינוניים (BlogPosting JSON-LD)
- 2021-06-24 — https://www.mutagmeitiv.com/post/חודש-הגאווה-כשתרבות-אנושית-מיטיבה-הופכת-למותג (BlogPosting JSON-LD)
- 2021-05-20 — https://www.mutagmeitiv.com/post/לא-ימנית-ולא-שמאלנית-קולקטיבית-פוסט-תקופתי (date shown on the rendered post)
- 2021-04-20 — https://www.mutagmeitiv.com/post/22-באפריל-יום-כדור-הארץ-איך-הכל-התחיל (BlogPosting JSON-LD)
- 2021-03-15 — https://www.mutagmeitiv.com/post/5-חסמים-פופולריים-בתהליכי-מיתוג-אישי-מה-שלך (BlogPosting JSON-LD)
- 2021-02-10 — https://www.mutagmeitiv.com/post/__ubq (BlogPosting JSON-LD)
- 2021-01-12 — https://www.mutagmeitiv.com/post/inspo1 (BlogPosting JSON-LD)
- 2020-12-31 — https://www.mutagmeitiv.com/post/best_brands_to_watch_2021 (BlogPosting JSON-LD)
- 2020-12-21 — https://www.mutagmeitiv.com/post/green-washing (date shown on the rendered post)
- 2020-12-09 — https://www.mutagmeitiv.com/post/איפיון (BlogPosting JSON-LD)
- 2020-11-30 — https://www.mutagmeitiv.com/post/books (BlogPosting JSON-LD)
- 2020-11-16 — https://www.mutagmeitiv.com/post/מיטיב-בחודש-kitepride (BlogPosting JSON-LD)
- 2020-10-19 — https://www.mutagmeitiv.com/post/crisis (BlogPosting JSON-LD)
- 2020-09-30 — https://www.mutagmeitiv.com/post/https-www-mutagmeitiv-com-post-b-corp (BlogPosting JSON-LD)
- 2020-08-14 — https://www.mutagmeitiv.com/post/מותג-מיטיב-בחודש-תנועת-סחר-הוגן-ישראל (BlogPosting JSON-LD)
- 2020-08-06 — https://www.mutagmeitiv.com/post/ה-נורמלי-החדש-new-normal-מגזין-10-של-הבלוג-המיטיב (BlogPosting JSON-LD)
- 2020-07-10 — https://www.mutagmeitiv.com/post/האם-משחקי-מחשב-יכולים-להטיב (date shown on the rendered post)
- 2020-06-12 — https://www.mutagmeitiv.com/post/מהו-סחר-הוגן-כשאנושיות-היא-שם-המותג (BlogPosting JSON-LD)
- 2020-05-16 — https://www.mutagmeitiv.com/post/מותג-מיטיב-בחודש-tony-chocolonely-חשיבה-מחוץ-לשוקולד (BlogPosting JSON-LD)
- 2020-04-17 — https://www.mutagmeitiv.com/post/אז-מה-נקח-איתנו-ליום-שאחרי-הקורונה (date shown on the rendered post)
- 2020-04-16 — https://www.mutagmeitiv.com/post/מותג-מיטיב-בחודש-מדטרוניק-medtronic (BlogPosting JSON-LD)
- 2020-03-20 — https://www.mutagmeitiv.com/post/קורונה-מיטיב-אנליזה-אופטימית (BlogPosting JSON-LD)
- 2020-03-15 — https://www.mutagmeitiv.com/post/corona-for-the-better-an-optimistic-analysis (BlogPosting JSON-LD)
- 2020-02-06 — https://www.mutagmeitiv.com/post/רק-התחלנו-את-2020-וכבר-מדברים-על-2030-ובצדק-מגזין-08-של-הבלוג-המיטיב-בעינייני-סביבה (BlogPosting JSON-LD)
- 2020-01-26 — https://www.mutagmeitiv.com/post/מותג-מיטיב-בחודש-tom-shoes-או-איך-עלם-חתיך-והולל-שינה-את-חוקי-הכלכלה-ובנה-מותג-המיטיב-כבר-13-שנה (BlogPosting JSON-LD)
- 2019-12-12 — https://www.mutagmeitiv.com/post/10-המותגים-המיטיבים-שעשו-פריצת-דרך-השנה-ובגדול-ויש-גם-ישראלים-ברשימה (BlogPosting JSON-LD)
- 2019-08-29 — https://www.mutagmeitiv.com/post/את-המגזין-הזה-אני-מקדישה-ל-2-מיליון-נשים-מגזין-05-של-הבלוג-המיטיב (BlogPosting JSON-LD)
- 2019-08-27 — https://www.mutagmeitiv.com/post/outland-denim-מותג-מיטיב-בחודש (BlogPosting JSON-LD)
- 2019-07-17 — https://www.mutagmeitiv.com/post/חברת-בירה-הברזילאית-aמממנת-פרויקט-סל-קניות-חכם-ללקויי-ראייה-האמנם (BlogPosting JSON-LD)
- 2019-07-07 — https://www.mutagmeitiv.com/post/יש-לך-את-היכולת-להשתמש-בעסק-שלך-ככח-מיטיב-המילטון-פרקינס (BlogPosting JSON-LD)
- 2019-05-23 — https://www.mutagmeitiv.com/post/from-memorial-day-to-eurovision (BlogPosting JSON-LD)
- 2019-05-23 — https://www.mutagmeitiv.com/post/tld-fm-radio-launches-special-appeal-to-fight-hunger (BlogPosting JSON-LD)
- 2019-05-23 — https://www.mutagmeitiv.com/post/fairphone_mutagmeitiv (BlogPosting JSON-LD)
- 2019-05-23 — https://www.mutagmeitiv.com/post/1000-meals-donated-to-local-people-in-need (BlogPosting JSON-LD)

## Contradictions found

- BTC professional course: 5200 ש"ח + מע"מ (`/סדנאות-והרצאות`) vs 2,850 ₪ (`/service-page/…`, "unavailable").
- THE BETTER 4: 480 ש"ח + מע"מ (`/סדנאות-והרצאות`) vs 350 ש״ח (`/smst`). Its Sep 2024 run (Instagram C_QyLOvohWN poster) was 445 ש״ח.
- "מעסק למותג מיטיב": no price on the live page vs 2650 ₪ on the stale duplicate; meeting 6 differs (סטוריטלינג vs שיווק מבוסס תוכן).
- Method: 3 stages (`/process`) vs 4 (`/personal101`). The client settled it (brief 20): one method, 4 stages.
- BTC reach: 5 languages / 40+ countries (`/process`) vs 6 languages / 36 countries (`/personal101`).
- Award: the site's badge says only "1st PLACE"; `/newcourse` credits the studio; the home team bio credits Dana Russo. The organiser's list credits "מותג מיטיב" (gold, עמותות, ברטלי).
- Collaborator name: heading "ליאור ארסיני", bio "ליאור אורסיני יעיש". Founder surname "Drachli" on the site, "Drachi" in the blog JSON-LD.
- Phone/WhatsApp: one number everywhere (054.668.6808 / 0546686808 / 972546686808). No conflict.

## Schema gaps

Facts recorded in `dossier.json` that `schemas/site-content.md` (v0.10) has no field for. Nothing in `schemas/` was edited; the orchestrator raises the proposal.

| Field needed | Example value (from this dossier) |
|---|---|
| `priceList[].currency` += `ILS` | `5200` `ILS` `flat`, "+ מע"מ" (`offers.btc-professionals`) |
| a VAT flag or price-note convention for prices "+ מע"מ" | `price_text: "מחיר:  580 ש\"ח לאדם + מע\"מ"` |
| `languages` += `he`, Hebrew-only (no `en` required), RTL from the locale | `languages.site: ["he"]` (brief 11) |
| `team[]` that the owner adds/removes (name, role, photo, bio, founder flag, sort order) | `{name: "דנה רוסו", role: "מיתוג עמותות ואירגונים חברתיים.", photo: img-038, bio: "…"}` — brief 24 |
| `offers[]` with group, dates, status, schedule, location, capacity, includes, registration link (so an ended workshop can be hidden) | `{id: "brand-and-breakfast", group: "lectures_workshops", schedule: "יום שישי 15.5.26 10:00-13:00", location: "זכרון יעקב", capacity: "עד 7", price: 350 ILS, status: past}` |
| offer groups (lectures & workshops / courses) | 6 + 3 offers (direction.md must-do 10) |
| `method` (named stages with text) | `SENSING, THINKING, MAKING, INFLUENCING` with each stage's text (brief 20) |
| `services[]` for the leading services (name, card text, page, CTA) beyond `copyBlocks[]` | `personal_branding` → `/personal101`, Calendly CTA |
| `podcast` (feed URL, platform links) + `episodes[]` (title, date, duration, link, cover) — or a build-time RSS fetch | 23 episodes from `anchor.fm/s/50a74720/podcast/rss` |
| `blog` feed / `posts[]` (title, date, URL, summary, cover) | 66 posts, newest "מכאוס לאחריות…" 2026-08-22 |
| `clientLogos[]` (name, image, optional link) | 15 logos, e.g. `{name: "עיריית חיפה", image: img-044}` |
| `awards[]` (name, organiser, year, category, place, project, link, badge image) | Israel Brand Awards 2022, Brand Academy, עמותות, gold, ברטלי |
| `credentials[]` as a shared module (today teaching-only) | "Certified Brand the Change trainer" + badge img-041 |
| `testimonials[].source` += `website` (and `instagram`), `role` line, `link`, `language`, and a cap above 600 chars | Linda Friedrich quote ≈ 690 chars, English, from `/newcourse` |
| `instagram` strip (profile URL + posts: image, caption, date, link) | 12 posts, `img-ig-01…12` |
| social links (instagram, linkedin, spotify, apple podcasts) | `contact.socials` — listed in v0.1 "Not in v0.1" |
| logo / brand colours / fonts | wordmark + icon PNGs; `#00574C`, `#173B34`, `#0A5150`, `#4BD1A0` — listed in v0.1 "Not in v0.1" |
| a scheduler link distinct from `bookingLinks[]` labels (free intro call) | `https://calendly.com/hadas/30min` (fits `bookingLinks[]` today; noted for completeness) |
| newsletter sign-up block (heading, text, provider) | "הירשמו חינם למגזין ׳מיטיב׳ — אחת לחודש" |
| lead magnet (title, file/URL) | "מתנה- מדריך הכנה למיתוג.pdf" |
| accessibility-statement page content (legal; Israeli IS 5568) | AA, updated 20-08-2025, coordinator, phone, email |
| `businessType` += `brand_practice` (and the vertical's registry) | `businessType: "brand_practice"` |
| per-page content (the site is multi-page: about, two service pages, workshops, courses, content, contact, accessibility) | `pages[]` in the dossier |
