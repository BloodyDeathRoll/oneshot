---
node: lane-extra
role: researcher
run: 2026-11-il-brand-02
lane: position
status: complete
---
# videos.md — every video on talouloren.com, plus socials

Collected 2026-11-02. Method: all 162 sitemap URLs were fetched with curl. 148 non-spam URLs were rendered in Chromium (Playwright) and scrolled, and their DOM and network requests were captured. The scan covered Uncode `.youtube-player[data-id]` blocks, Elementor `data-settings` (`youtube_url`), iframes, `<video>`/`<source>`, lightbox links and `i.ytimg.com` requests. `wp-json/wp/v2/pages`, `/posts` and `/media` (373 items, including 9 `oembed/youtube` and 2 `video/mp4`) were also checked. Titles come from YouTube oEmbed. Posters are YouTube auto thumbnails: `maxresdefault` where it exists, else `hqdefault`. The site's own custom thumbnails (`/wp-content/uploads/2018/06/hqdefault-NN-uai.jpg`) are low-res crops of the same frames. No media were downloaded.

Lists are grouped as the site groups them (menu item, then page heading or tab). Hebrew headings are kept, with a gloss.

## Videos by the site's own lists

### 1. Home `/` — "WHAT THEY SAY ABOUT US" (testimonial carousel)

Five video tiles, each linking to its post under `/testimonials/` (category "Testimonials", 5 posts). Posters on the site are custom crops (`/wp-content/uploads/2018/06/hqdefault-NN-uai.jpg`); the YouTube ones below are the same frames at higher resolution.

| Page | Title / person (as shown) | Watch URL | Poster | YouTube title (oEmbed) | Note |
|---|---|---|---|---|---|
| https://talouloren.com/ → https://talouloren.com/testimonials/yifat/ | יפעת (Yifat) | https://www.youtube.com/watch?v=ccyOcrzwUY0 | https://i.ytimg.com/vi/ccyOcrzwUY0/maxresdefault.jpg (YouTube auto) | TESTIMONIALS MAGIC TALOU |  |
| https://talouloren.com/ → https://talouloren.com/testimonials/amos/ | AMOS | https://www.youtube.com/watch?v=ATWRaeFv2Fk | https://i.ytimg.com/vi/ATWRaeFv2Fk/maxresdefault.jpg (YouTube auto) | AMOS TESTIMONIALS | same person as next row; Amos = AMT case study |
| https://talouloren.com/ → https://talouloren.com/testimonials/amos-second/ | AMOS (second) | https://www.youtube.com/watch?v=3RocZwVhmUA | https://i.ytimg.com/vi/3RocZwVhmUA/maxresdefault.jpg (YouTube auto) | AMOS TESTIMONIALS |  |
| https://talouloren.com/ → https://talouloren.com/testimonials/ronen/ | RONEN | https://www.youtube.com/watch?v=clzMDU8pogc | https://i.ytimg.com/vi/clzMDU8pogc/maxresdefault.jpg (YouTube auto) | TESTIMONIALS RONEN |  |
| https://talouloren.com/ → https://talouloren.com/testimonials/joya-cosmetics/ | JOYA COSMETICS | https://www.youtube.com/watch?v=ctGDSAsvv1A | https://i.ytimg.com/vi/ctGDSAsvv1A/maxresdefault.jpg (YouTube auto) | TESTIMONIALS JOYA COSMETICS |  |

Home also plays a muted, looping background video in the hero ("TOTAL SUCCESS EXPERIENCE" slider): `https://talouloren.com/wp-content/uploads/2018/07/TalulIntro_out.mp4` (file, 320x240, 21.3 s, 638 KB; no poster attribute). Not a watchable item; too small to reuse. A second file in the media library, `https://talouloren.com/wp-content/uploads/2018/05/hp_out.mp4` (598x240, 29.2 s), is on no page.

### 2. VLOG of success `/vlog-of-success/` — "SUCCESS IS A BLOG" / "SUCCESS IS..." grid

Menu item "VLOG of success". The page grid shows 12 posts; each post page embeds one video (category "Blog").

| Page | Title / person (as shown) | Watch URL | Poster | YouTube title (oEmbed) | Note |
|---|---|---|---|---|---|
| https://talouloren.com/blog/sucess-is-a-winner/ | הצלחה היא וינריות (Success is being a winner) | https://www.youtube.com/watch?v=MR0Kleh4sQw | https://i.ytimg.com/vi/MR0Kleh4sQw/maxresdefault.jpg (YouTube auto) | SUCCESS IS A WINNER |  |
| https://talouloren.com/blog/success-is-imagination/ | הצלחה היא דמיון (Success is imagination) | https://www.youtube.com/watch?v=mH4N2w96iYc | https://i.ytimg.com/vi/mH4N2w96iYc/maxresdefault.jpg (YouTube auto) | SUCCESS IS IMAGINATION |  |
| https://talouloren.com/blog/success-is-the-right-story/ | הצלחה היא סיפור (Success is a story) | https://www.youtube.com/watch?v=dczMWZI8u1Y | https://i.ytimg.com/vi/dczMWZI8u1Y/maxresdefault.jpg (YouTube auto) | SUCCESS IS THE RIGHT STORY |  |
| https://talouloren.com/blog/success-is-inside-your-organization/ | הצלחה היא פנים ארגונית (Success is inside the organisation) | site embeds `IPRK9cBvK0` (broken: leading "-" dropped); real video https://www.youtube.com/watch?v=-IPRK9cBvK0 | https://i.ytimg.com/vi/-IPRK9cBvK0/hqdefault.jpg (YouTube auto) | SUCCESS IS INSIDE YOUR ORGANIZATION (channel listing) | embed broken on the site |
| https://talouloren.com/blog/success-is-dialog/ | הצלחה היא דיאלוג משותף (Success is a shared dialogue) | https://www.youtube.com/watch?v=_Ercqq7ZLnI | https://i.ytimg.com/vi/_Ercqq7ZLnI/maxresdefault.jpg (YouTube auto) | SUCCESS IS DIALOG |  |
| https://talouloren.com/blog/success-is-romantic/ | הצלחה היא אהבה (Success is love) | https://www.youtube.com/watch?v=I976Dvtch5I | https://i.ytimg.com/vi/I976Dvtch5I/maxresdefault.jpg (YouTube auto) | SUCCESS IS ROMANTIC |  |
| https://talouloren.com/blog/success-is-visual-attraction/ | הצלחה היא גירוי ויזואלי (Success is visual attraction) | https://www.youtube.com/watch?v=eD9BzE7Wi9k | https://i.ytimg.com/vi/eD9BzE7Wi9k/maxresdefault.jpg (YouTube auto) | SUCCESS IS VISUAL ATTRACTION |  |
| https://talouloren.com/blog/success-is-working-together/ | הצלחה היא שותפים לדרך (Success is partners on the way) | https://www.youtube.com/watch?v=_X-Ngv4QOnw | https://i.ytimg.com/vi/_X-Ngv4QOnw/maxresdefault.jpg (YouTube auto) | SUCCESS IS WORKING TOGETHER |  |
| https://talouloren.com/blog/success-is-winning-after-winning-after-winning/ | הצלחה היא מומנטום של נצחונות (Success is a momentum of wins) | https://www.youtube.com/watch?v=zH6W50VddUM | https://i.ytimg.com/vi/zH6W50VddUM/maxresdefault.jpg (YouTube auto) | SUCCESS IS WINNING AFTER WINNING AFTER WINNING |  |
| https://talouloren.com/blog/success-is-leading-the-way/ | הצלחה היא להוביל וליצור דרך (Success is leading and making a way) | https://www.youtube.com/watch?v=TR5JwdagN44 | https://i.ytimg.com/vi/TR5JwdagN44/maxresdefault.jpg (YouTube auto) | SUCCESS IS LEADING THE WAY |  |
| https://talouloren.com/blog/success-is-life-experience/ | הצלחה היא אוסף של כשלונות (Success is a collection of failures) | https://www.youtube.com/watch?v=y2TRRMGWsmQ | https://i.ytimg.com/vi/y2TRRMGWsmQ/maxresdefault.jpg (YouTube auto) | SUCCESS IS LIFE EXPERIENCE |  |
| https://talouloren.com/blog/success-is-not-giving-up/ | הצלחה היא להתמודד עם הקשיים (Success is facing the difficulties) | https://www.youtube.com/watch?v=z0k2iCDRH9Y | https://i.ytimg.com/vi/z0k2iCDRH9Y/maxresdefault.jpg (YouTube auto) | SUCCESS IS NOT GIVING UP |  |

### 2b. Same "Blog" category, not in the `/vlog-of-success/` grid

Seven more vlog posts exist in the sitemap and the category archive `/category/blog/` (paginated), but the VLOG page grid does not show them.

| Page | Title / person (as shown) | Watch URL | Poster | YouTube title (oEmbed) | Note |
|---|---|---|---|---|---|
| https://talouloren.com/blog/success-is-inspiration/ | הצלחה היא השראה (Success is inspiration) | https://www.youtube.com/watch?v=dFteLZPyKiM | https://i.ytimg.com/vi/dFteLZPyKiM/maxresdefault.jpg (YouTube auto) | SUCCESS IS INSPIRATION |  |
| https://talouloren.com/blog/success-is-a-drive/ | הצלחה היא דחף פנימי (Success is an inner drive) | https://www.youtube.com/watch?v=R_b-XLJs6cM | https://i.ytimg.com/vi/R_b-XLJs6cM/hqdefault.jpg (YouTube auto; no maxres) | SUCCESS IS A DRIVE |  |
| https://talouloren.com/blog/success-is-balance/ | הצלחה היא איזון (Success is balance) | https://www.youtube.com/watch?v=nelEGbRrFnk | https://i.ytimg.com/vi/nelEGbRrFnk/maxresdefault.jpg (YouTube auto) | SUCCESS IS BALANCE |  |
| https://talouloren.com/blog/success-is-movement/ | הצלחה היא השתחררות תנועתית (Success is release through movement) | https://www.youtube.com/watch?v=3JUsTJhhoVA | https://i.ytimg.com/vi/3JUsTJhhoVA/maxresdefault.jpg (YouTube auto) | SUCCESS IS MOVEMENT |  |
| https://talouloren.com/blog/success-is-behind-the-scene/ | הצלחה היא מאחורי הקלעים (Success is behind the scenes) | https://www.youtube.com/watch?v=0J8i5Tvlztw | https://i.ytimg.com/vi/0J8i5Tvlztw/maxresdefault.jpg (YouTube auto) | SUCCESS IS BEHIND THE SCENE |  |
| https://talouloren.com/blog/success-is-perfect-image-at-facebook/ | הצלחה היא תמונת פרופיל מושלמת (Success is a perfect profile picture) | https://www.youtube.com/watch?v=zZvdKaa10lY | https://i.ytimg.com/vi/zZvdKaa10lY/hqdefault.jpg (YouTube auto; no maxres) | SUCCESS IS PERFECT IMAGE AT FACEBOOK |  |
| https://talouloren.com/blog/success-is-being-ready/ | SUCCESS IS BEING READY | https://www.youtube.com/watch?v=4tQST_M_Jgo | https://i.ytimg.com/vi/4tQST_M_Jgo/hqdefault.jpg (YouTube auto; no maxres) | SUCCESS IS BEING READY |  |

### 3. Case Study `/case-study/` — "SUCCESS STORIES" / "מהלכים מוצלחים" (successful moves), tabs ENTREPRENEURS · BRANDS · ORGANIZATIONS

Menu item "Case Study". One video per post.

| Page | Title / person (as shown) | Watch URL | Poster | YouTube title (oEmbed) | Note |
|---|---|---|---|---|---|
| https://talouloren.com/entrepreneurs/doron-shefer/ | ENTREPRENEURS — DORON SHEFER (דורון שפר) | https://www.youtube.com/watch?v=yHGw0ObrWqU | https://i.ytimg.com/vi/yHGw0ObrWqU/maxresdefault.jpg (YouTube auto) | DORON SHEFER CASE STUDY |  |
| https://talouloren.com/entrepreneurs/rita/ | ENTREPRENEURS — RITA (ריטה) | https://www.youtube.com/watch?v=X1j7LVg_IEg | https://i.ytimg.com/vi/X1j7LVg_IEg/maxresdefault.jpg (YouTube auto) | ריטה - מאחורי הקלעים של צילומי הקליפ "מזמן" | video is on Rita's official channel (@ritaofficial), "behind the scenes of the clip מזמן"; Tal's own upload: https://www.youtube.com/watch?v=hoSK8Drn7b8 "CASE STUDY RITA" |
| https://talouloren.com/entrepreneurs/amt-case-study/ | ENTREPRENEURS — AMT CASE STUDY (Amos) | site embeds `3W8rtunSG1o` (dead); live upload https://www.youtube.com/watch?v=H_oTTaODt64 | https://i.ytimg.com/vi/H_oTTaODt64/maxresdefault.jpg (YouTube auto) | AMT CASE STUDY (channel listing) | embed on site is dead |
| https://talouloren.com/brands/eugene-perma-blonde-master-study-case/ | BRANDS — EUGENE PERMA BLONDE MASTER STUDY CASE (יוג'ין פרמה) | https://www.youtube.com/watch?v=YTwMzvCGKW8 | https://i.ytimg.com/vi/YTwMzvCGKW8/hqdefault.jpg (YouTube auto; no maxres) | EUGENE PERMA BLONDE MASTER STUDY CASE |  |
| https://talouloren.com/brands/wella-case-study/ | BRANDS — WELLA CASE STUDY (וולה) | https://www.youtube.com/watch?v=l5AyYFkqAuc | https://i.ytimg.com/vi/l5AyYFkqAuc/maxresdefault.jpg (YouTube auto) | WELLA CASE STUDY |  |
| https://talouloren.com/organizations/obsessed-ck-team-booster-case-study/ | ORGANIZATIONS — OBSESSED – CK TEAM BOOSTER CASE STUDY (שסטוביץ) | https://www.youtube.com/watch?v=rYBhEfcPM0Q | https://i.ytimg.com/vi/rYBhEfcPM0Q/maxresdefault.jpg (YouTube auto) | OBSESSED- CK TEAM BOOSTER CASE STUDY |  |
| https://talouloren.com/organizations/visa-cal-managment-team-booster/ | ORGANIZATIONS — VISA CAL MANAGMENT TEAM BOOSTER (ויזה כאל) | https://www.youtube.com/watch?v=CYXYhGudBEs | https://i.ytimg.com/vi/CYXYhGudBEs/maxresdefault.jpg (YouTube auto) | VISA CAL MANAGMENT TEAM BOOSTER |  |

### 4. Course `/course/` — BRAND YOURSELF sales page (Elementor)

Section headings as on the page. `/12333-2/` is an older copy with the same four videos (duplicates, not counted again).

| Page | Title / person (as shown) | Watch URL | Poster | YouTube title (oEmbed) | Note |
|---|---|---|---|---|---|
| https://talouloren.com/course/ | "BRAND YOURSELF" (hero) | https://www.youtube.com/watch?v=Pg30FZFj-Qs | https://i.ytimg.com/vi/Pg30FZFj-Qs/maxresdefault.jpg (YouTube auto) | BRAND YOURSELF INTO THE PROCESS |  |
| https://talouloren.com/course/ | "קבלו הצצה, איך הקסם קורה מאחורי הקלעים:" (Get a peek at how the magic happens behind the scenes) | https://www.youtube.com/watch?v=bP90t8JLFCs | https://i.ytimg.com/vi/bP90t8JLFCs/maxresdefault.jpg (YouTube auto) | THE FUTURE OF PERSONAL BRANDING |  |
| https://talouloren.com/course/ | "עדויות משתתפי הקורס:" (Course participants' testimonials) — Natali | https://www.youtube.com/watch?v=U52Lrz14nGk | https://i.ytimg.com/vi/U52Lrz14nGk/maxresdefault.jpg (YouTube auto) | Brand Yourself - Testimonials - Natali |  |
| https://talouloren.com/course/ | "עדויות משתתפי הקורס:" — Ella | https://www.youtube.com/watch?v=yM2YALs5pdQ | https://i.ytimg.com/vi/yM2YALs5pdQ/maxresdefault.jpg (YouTube auto) | Brand Yourself - Testimonials - ELLA |  |

### 5. Session page `/winning-personal-brand/` — "תוכנית פעולה להזנקת המותג האישי שלך!" (An action plan to launch your personal brand)

No list headings around the videos; the nearest heading is given. `/winning-personal-brand-too/` repeats the first video; `/testing222/` has its own intro video.

| Page | Title / person (as shown) | Watch URL | Poster | YouTube title (oEmbed) | Note |
|---|---|---|---|---|---|
| https://talouloren.com/winning-personal-brand/ | Intro after "שלום לך! אני טל אורן…" (Hello! I'm Tal Oren…) | https://www.youtube.com/watch?v=dczMWZI8u1Y | https://i.ytimg.com/vi/dczMWZI8u1Y/maxresdefault.jpg (YouTube auto) | SUCCESS IS THE RIGHT STORY | same video as vlog post "הצלחה היא סיפור" |
| https://talouloren.com/winning-personal-brand/ | "האם הפגישה או השיחה היא בחינם?" (Is the meeting free?) — CLIENT EXPERIENCE | https://www.youtube.com/watch?v=Wvxq6-_mDxM | https://i.ytimg.com/vi/Wvxq6-_mDxM/maxresdefault.jpg (YouTube auto) | CLIENT EXPERIENCE | embedded 3 times (once per repeated price block) |
| https://talouloren.com/winning-personal-brand/ | "סמוך עליי העסק שלך שווה את ההשקעה הזו." (Trust me, your business is worth this investment.) | https://www.youtube.com/watch?v=bP90t8JLFCs | https://i.ytimg.com/vi/bP90t8JLFCs/maxresdefault.jpg (YouTube auto) | THE FUTURE OF PERSONAL BRANDING | same as course "behind the scenes" video |
| https://talouloren.com/testing222/ | Intro after "שלום לך! אני טל אורן…" (test copy) | https://www.youtube.com/watch?v=UsBVhE_ziLw | https://i.ytimg.com/vi/UsBVhE_ziLw/maxresdefault.jpg (YouTube auto) | SUCCESS IS 3 STEPS |  |

### 6. Programme page `/total-success/` (2019, orphan)



| Page | Title / person (as shown) | Watch URL | Poster | YouTube title (oEmbed) | Note |
|---|---|---|---|---|---|
| https://talouloren.com/total-success/ | Under "בוא לבנות אסטרטגיה להזנקה עסקית של המותג שלך…" (Come build a strategy to launch your brand…) | https://www.youtube.com/watch?v=IzAxFuZ9-1g | https://i.ytimg.com/vi/IzAxFuZ9-1g/hqdefault.jpg (YouTube auto; no maxres) | סדנה למיתוג אישי מנצח ליזמים בשיתוף עם בנק פועלים | title names Bank Hapoalim workshop |
| https://talouloren.com/total-success/ | "בתהליך תקבל:" (In the process you get:) | https://www.youtube.com/watch?v=UEuVeL50pKY | https://i.ytimg.com/vi/UEuVeL50pKY/maxresdefault.jpg (YouTube auto) | את במיטבך |  |

### 7. Landing post `/landing/כלים-לניהול-מותג-פרסונלי/` (2019, "Tools for managing a personal brand")



| Page | Title / person (as shown) | Watch URL | Poster | YouTube title (oEmbed) | Note |
|---|---|---|---|---|---|
| https://talouloren.com/landing/%D7%9B%D7%9C%D7%99%D7%9D-%D7%9C%D7%A0%D7%99%D7%94%D7%95%D7%9C-%D7%9E%D7%95%D7%AA%D7%92-%D7%A4%D7%A8%D7%A1%D7%95%D7%A0%D7%9C%D7%99/ | Free brand-management video | https://www.youtube.com/watch?v=nsjPLKiGbk0 | https://i.ytimg.com/vi/nsjPLKiGbk0/maxresdefault.jpg (YouTube auto) | הצלחה עסקית- סרטון ניהול מותג |  |

### 8. Portfolio (2016 production-era pages, orphan)

Section headings = page titles. All embeds are dead.

| Page | Title / person (as shown) | Watch URL | Poster | YouTube title (oEmbed) | Note |
|---|---|---|---|---|---|
| https://talouloren.com/portfolio/פוסט-פרודקשן/ | פוסט פרודקשן (Post-production) | `49Jl3sEFSRw` (dead) https://www.youtube.com/watch?v=49Jl3sEFSRw | none (thumbnail 404) | unavailable (oEmbed 404: private or deleted) |  |
| https://talouloren.com/portfolio/פוסט-פרודקשן/ | פוסט פרודקשן | `JbiSgJUPS4E` (dead) https://www.youtube.com/watch?v=JbiSgJUPS4E | none (thumbnail 404) | unavailable (oEmbed 404: private or deleted) |  |
| https://talouloren.com/portfolio/פוסט-פרודקשן/ | פוסט פרודקשן | `6RWOasI903g` (dead) https://www.youtube.com/watch?v=6RWOasI903g | none (thumbnail 404) | unavailable (oEmbed 404: private or deleted) |  |
| https://talouloren.com/portfolio/צילום-ועריכת-וידאו/ | צילום ועריכת וידאו (Video shooting and editing) | `fRo_WWPRGK4` (dead) https://www.youtube.com/watch?v=fRo_WWPRGK4 | none (thumbnail 404) | unavailable (oEmbed 404: private or deleted) |  |
| https://talouloren.com/portfolio/צילום-ועריכת-וידאו/ | צילום ועריכת וידאו | `3W8rtunSG1o` (dead) https://www.youtube.com/watch?v=3W8rtunSG1o | none (thumbnail 404) | unavailable (oEmbed 404: private or deleted) |  |
| https://talouloren.com/portfolio/צילום-ועריכת-וידאו/ | צילום ועריכת וידאו | `SLb-mPsm658` (dead) https://www.youtube.com/watch?v=SLb-mPsm658 | none (thumbnail 404) | unavailable (oEmbed 404: private or deleted) |  |
| https://talouloren.com/portfolio/ריטושים/ | ריטושים (Retouching) | `Y73mMfaxIy4` (dead) https://www.youtube.com/watch?v=Y73mMfaxIy4 | none (thumbnail 404) | unavailable (oEmbed 404: private or deleted) |  |

### 9. Test posts `/hp/testing/` ("DEKEL SABAN. HAIR & BEAUTY") and `/hp/total-success-experience/`

Both embed the same dead id (also used on the AMT case study).

| Page | Title / person (as shown) | Watch URL | Poster | YouTube title (oEmbed) | Note |
|---|---|---|---|---|---|
| https://talouloren.com/hp/testing/ | DEKEL SABAN. HAIR & BEAUTY | `3W8rtunSG1o` (dead) https://www.youtube.com/watch?v=3W8rtunSG1o | none (thumbnail 404) | unavailable (oEmbed 404: private or deleted) | duplicate of a dead id |

## Totals

| List (site's own) | Rows | Playable | Dead / broken |
|---|---|---|---|
| 1. Home "WHAT THEY SAY ABOUT US" (testimonials) | 5 | 5 | 0 |
| 2. VLOG of success grid "SUCCESS IS..." | 12 | 11 | 1 broken embed (`-IPRK9cBvK0`, fixable) |
| 2b. Blog posts outside the grid | 7 | 7 | 0 |
| 3. Case Study "SUCCESS STORIES" (Entrepreneurs 3 · Brands 2 · Organizations 2) | 7 | 6 | 1 (AMT; live re-upload exists) |
| 4. Course BRAND YOURSELF | 4 | 4 | 0 |
| 5. Session pages (`/winning-personal-brand/` 3 + `/testing222/` 1) | 4 | 4 | 0 |
| 6. `/total-success/` | 2 | 2 | 0 |
| 7. Landing post | 1 | 1 | 0 |
| 8. Portfolio (2016) | 7 | 0 | 7 |
| 9. Test posts | 1 | 0 | 1 |
| **All rows** | **50** | **40** | **10** |

- **Distinct YouTube ids on the site: 47.** 39 play as embedded. One (`IPRK9cBvK0`) is a typo for the live `-IPRK9cBvK0`. 7 are dead (oEmbed 404, no thumbnail): `3W8rtunSG1o`, `49Jl3sEFSRw`, `6RWOasI903g`, `JbiSgJUPS4E`, `fRo_WWPRGK4`, `SLb-mPsm658`, `Y73mMfaxIy4`.
- **Self-hosted files: 2.** The hero background `TalulIntro_out.mp4` (320x240) is used on Home. `hp_out.mp4` (598x240) is in the media library only.
- **Duplicates across pages.** `dczMWZI8u1Y` appears on the vlog "הצלחה היא סיפור" post, `/winning-personal-brand/` and `/winning-personal-brand-too/`. `bP90t8JLFCs` appears on `/course/`, `/12333-2/` and `/winning-personal-brand/`. `Wvxq6-_mDxM` appears 3 times on `/winning-personal-brand/`. `3W8rtunSG1o` (dead) appears on the AMT case study, the portfolio video page, `/hp/testing/` and `/hp/total-success-experience/`. `/12333-2/` duplicates all 4 course videos. The archives (`/category/*`, `/author/*`, `/temp/`) re-list the post videos and add none.
- **One embed is not Tal's own upload:** the Rita case study embeds Rita's official channel video. Tal's own cut is `hoSK8Drn7b8` "CASE STUDY RITA" (maxres missing; use hqdefault).
- **Brief's "unreadable" videos:** `Pg30FZFj-Qs` = "BRAND YOURSELF INTO THE PROCESS" (course hero). `vWTLRy4CkIg` = "מפגש אסטרטגי להזנקה עסקית" ("A strategic meeting to launch your business"). It is on the channel, not on the site; poster https://i.ytimg.com/vi/vWTLRy4CkIg/sddefault.jpg.

## Socials

### talouloren.com header/footer (identical on every page)

| Network | Exact URL on the site | Verified 2026-11-02 |
|---|---|---|
| Instagram | https://www.instagram.com/talou_loren/ | live: "TAL OREN (@talou_loren)", 11K followers, 2,832 following, 758 posts (og:description) |
| Facebook | https://www.facebook.com/talouloren | live: page "TALOU L'OREN", Tel Aviv-Yafo, 3,218 followers, 154 check-ins, category text "מנטור להצלחה עסקית ופיתוח יזמות" ("mentor for business success and entrepreneurship development") |
| YouTube | https://www.youtube.com/channel/UCX-DqELI3PQjSbpNV95u8fA | live = **@taloulorensuccess**, "TALOU L'OREN", 76 subscribers, 187 videos + 19 shorts; RSS https://www.youtube.com/feeds/videos.xml?channel_id=UCX-DqELI3PQjSbpNV95u8fA (latest upload 2025-07-13 "Mosdot UNKNOWN") |
| LinkedIn | https://www.linkedin.com/in/talouloren/ | URL confirmed in the HTML; LinkedIn returned HTTP 999 (bot wall), so the profile could not be read |
| WhatsApp | https://api.whatsapp.com/send?phone=+972504635536 | number 050-463-5536 |
| YouTube (2nd, "CONNECT WITH TALOU LOREN" box on `/vlog-of-success/` and others) | https://www.youtube.com/channel/UCcKsvGT3KYfohI4miuoOmwA | page loads but has no title or handle; RSS 404. Likely deleted or empty. Drop it. |
| Facebook (2nd, in Home's markup) | https://www.facebook.com/talulashow | live: personal profile "Talou Tal Oren (@talulashow)" |

The footer Instagram feed (Smash Balloon) shows 6 cached posts from Oct–Dec 2022. It also prints "There has been a problem with your Instagram Feed" on every page.

### YouTube channel @taloulorensuccess — all videos (rendered channel page, scrolled to the end)

Titles as shown. 4 rows show only a duration because the title was not captured. The channel holds many client and production films that are not on the site: Maccabi (several), Amdocs (3), Taboola (2), Philip Morris, Kornit, Bezeq, Clalit, SEAT, Mercedes, Castro, "Talou Testimonial Film 1–3 HQ", and BRAND YOURSELF episodes 1–4 plus a promo.

**videos** (187 items)

| # | Video | Title |
|---|---|---|
| 1 | https://www.youtube.com/watch?v=SUutzmTG_fc | Mosdot UNKNOWN |
| 2 | https://www.youtube.com/watch?v=9bXdVcnauL8 | TEAM TESTEMONIAL- UNKNOWN |
| 3 | https://www.youtube.com/watch?v=O0m7vg_BWF8 | EVERYTHING WILL WAIT- UNKNOWN |
| 4 | https://www.youtube.com/watch?v=Wu4064Tcz9c | THE VUCA- UNKNOWN |
| 5 | https://www.youtube.com/watch?v=KIpHpl6VNyE | TESTEMONIALS UNKNOWN WE CAN WIN |
| 6 | https://www.youtube.com/watch?v=Hu7tInX0W94 | FLYING BIRDS INKNOWN |
| 7 | https://www.youtube.com/watch?v=LxXKwUegu2U | THE CONCEPT OF THE UNKNOWN EXPERIENCE |
| 8 | https://www.youtube.com/watch?v=rQK03LJS6mA | MOVING FORWARD TESTEMONIALS UNKNOWN |
| 9 | https://www.youtube.com/watch?v=u5qiORZRRWk | TESTEMONIAL UNFORGETABLE UNKNOWN |
| 10 | https://www.youtube.com/watch?v=cOlbNwsZ90w | INTO THE UNKNOWN MANTRA |
| 11 | https://www.youtube.com/watch?v=Vi1ua1kL8G0 | TESTEMONIALS UNKNOWN |
| 12 | https://www.youtube.com/watch?v=FGYupqe2aGU | UNKNOWN |
| 13 | https://www.youtube.com/watch?v=gULimbsqZgk | מכבי יזמות אנשי האור |
| 14 | https://www.youtube.com/watch?v=sD75-5HI0NM | מכבי יזמות- לוחמי אור |
| 15 | https://www.youtube.com/watch?v=E9ZPeuVVLj0 | Maccabi בתי רופאים 2023 |
| 16 | https://www.youtube.com/watch?v=WsmYOrHHrRg | Maccabi בתי הרופאים 2023 |
| 17 | https://www.youtube.com/watch?v=UMgXg43Yxyk | CEO DARE TO DARE VIDEO |
| 18 | https://www.youtube.com/watch?v=DT8q9FJ1mqs | LONDON FASHION WEEK OPENING VIDEO |
| 19 | https://www.youtube.com/watch?v=B291ohPCCW0 | JEWELRY |
| 20 | https://www.youtube.com/watch?v=184rwQ5JnWY | FASHION & JEWELRY SHOW |
| 21 | https://www.youtube.com/watch?v=2j72oLy525s | PERSONAL BRANDING YAKIR |
| 22 | https://www.youtube.com/watch?v=jgJnB60QAw0 | PURPOSE TEASER 2 |
| 23 | https://www.youtube.com/watch?v=s1WLhJavTl8 | PURPOSE TEASER |
| 24 | https://www.youtube.com/watch?v=iYeI_jGDhhA | RUSSIAN TARGETING CAMPAIGN |
| 25 | https://www.youtube.com/watch?v=qax-ZmzWH8E | (title not captured; duration 1:01) |
| 26 | https://www.youtube.com/watch?v=DEDvs-oNWhk | ANTIPLASTIC VISUAL PRODUCTIONS |
| 27 | https://www.youtube.com/watch?v=YxxHOTLOTaU | process of creation |
| 28 | https://www.youtube.com/watch?v=hE4zIY-Sqp0 | SHIRA MANIFEST |
| 29 | https://www.youtube.com/watch?v=SgG08cI3VbI | ARTISTIC JAM VIDEO ART |
| 30 | https://www.youtube.com/watch?v=eG2O2u9rmck | איך ארגון מרגיש מבפנים? |
| 31 | https://www.youtube.com/watch?v=uXm2j7K3WU8 | HUMAN EXPERIENCE PARIS |
| 32 | https://www.youtube.com/watch?v=kXRJmGj5pBo | דורון שפר מיתוג |
| 33 | https://www.youtube.com/watch?v=kbbOjOFBcSc | personal branding fashion designers |
| 34 | https://www.youtube.com/watch?v=nJWeh258K2s | NANOMOTION IMAGE VIDEO |
| 35 | https://www.youtube.com/watch?v=VLYyZiBNEY0 | פרסומת בית בכפר בהשתתפות הדיירים |
| 36 | https://www.youtube.com/watch?v=PuF-FV-zGa4 | אחת מתשע. פעילות מודעות סרטן השד |
| 37 | https://www.youtube.com/watch?v=3zuNNYo9dc4 | (title not captured; duration 0:12) |
| 38 | https://www.youtube.com/watch?v=6JySyvmzZ5g | ROYALTY TV |
| 39 | https://www.youtube.com/watch?v=uV0ILm40VSo | 1 of 250 videos for CK |
| 40 | https://www.youtube.com/watch?v=PBR_gJShWUw | hairbnb changing the world of hairdressers |
| 41 | https://www.youtube.com/watch?v=B4p4RwUFI1c | intro fw 2022 1 |
| 42 | https://www.youtube.com/watch?v=2mDuj_A0z2I | HAREL GM |
| 43 | https://www.youtube.com/watch?v=6ncXWrh0Hlw | ELIRAN DONE |
| 44 | https://www.youtube.com/watch?v=T2zemOuZw8M | THE WAVE |
| 45 | https://www.youtube.com/watch?v=lKlsB-PTwx0 | Talou Testimonial Film 3 HQ |
| 46 | https://www.youtube.com/watch?v=1myFxs8sGKw | RETREAT VID |
| 47 | https://www.youtube.com/watch?v=Qa2dhEy89fo | אג'נדה אדריכלית--הזמנה להשקת דירה לדוגמא |
| 48 | https://www.youtube.com/watch?v=B2PzFhFXvus | UVM FACTS TAKE 6 |
| 49 | https://www.youtube.com/watch?v=nI80vkV05ok | פרסומת מלח הארץ |
| 50 | https://www.youtube.com/watch?v=s3NjKBlKxyQ | PHILIP MORRIS #HISTORY LOWQ 2 |
| 51 | https://www.youtube.com/watch?v=Zb41f6xEsME | HUMAN EXPERIENCE BUTTERFLIES |
| 52 | https://www.youtube.com/watch?v=bvHD-5jypp8 | enter the UVM |
| 53 | https://www.youtube.com/watch?v=5aFqWeNKNsY | HUMAN EXPERIENCE CHANGES |
| 54 | https://www.youtube.com/watch?v=5QmcfNwuWNQ | CHOICES HUMAN EXPERIENCE |
| 55 | https://www.youtube.com/watch?v=mbiObviAlDE | פרסומת מטרופולין 2 |
| 56 | https://www.youtube.com/watch?v=RKOtsYN15jU | Mercedes vip club 1 of 300 videos |
| 57 | https://www.youtube.com/watch?v=RijPilaHbcU | Talou Testimonial Film 1 HQ |
| 58 | https://www.youtube.com/watch?v=gCu6UgP9TXQ | יצחק תשובה, אדריכלית גל נאור - קמפיין פארק בבלי |
| 59 | https://www.youtube.com/watch?v=ffXXusMA4nY | פארק בבלי נדלן |
| 60 | https://www.youtube.com/watch?v=EZL4NwtKf_g | (title not captured; duration 0:25) |
| 61 | https://www.youtube.com/watch?v=-ld9x-gXWM0 | feel 2 |
| 62 | https://www.youtube.com/watch?v=XWhkjLzEqjg | feel 3 |
| 63 | https://www.youtube.com/watch?v=CCw5TYrMkdY | Talou Testimonial Film 2 HQ |
| 64 | https://www.youtube.com/watch?v=U9fPLZX08Qw | מכבי דנט מודעות סרטן הפה |
| 65 | https://www.youtube.com/watch?v=24LdRyGh-LM | קמפיין נדל"ן ערך עיר |
| 66 | https://www.youtube.com/watch?v=iepYVtXsKaI | Backstage |
| 67 | https://www.youtube.com/watch?v=_omKTYVkZ9I | (title not captured; duration 0:39) |
| 68 | https://www.youtube.com/watch?v=CX1Br90qJF8 | Niko expectations |
| 69 | https://www.youtube.com/watch?v=HiusxbahckY | קולקציית מלונות |
| 70 | https://www.youtube.com/watch?v=ZPgFnCQxWIk | HUMAN EXPERIENCE |
| 71 | https://www.youtube.com/watch?v=PMFI4WM8vtk | Human experience |
| 72 | https://www.youtube.com/watch?v=MTqBRHfoXdw | Personal branding Eddie |
| 73 | https://www.youtube.com/watch?v=UNwb5gtkqcE | Human experience |
| 74 | https://www.youtube.com/watch?v=sHSKlhPSag4 | קמפיין בריאות שלילי |
| 75 | https://www.youtube.com/watch?v=CpjZJ-bv5wM | ערכים |
| 76 | https://www.youtube.com/watch?v=Mc8mdX40CjA | retreat testimonials |
| 77 | https://www.youtube.com/watch?v=0bCC2ZvMg-M | קמפיין שמלות כלה אליהב ששון |
| 78 | https://www.youtube.com/watch?v=W8WVzp5ztcU | retreat talks |
| 79 | https://www.youtube.com/watch?v=6BujEbqfrCw | retreat talks 2 |
| 80 | https://www.youtube.com/watch?v=wpxD_ZAs92M | האנשים של טמבור |
| 81 | https://www.youtube.com/watch?v=5wP5N-O9HiE | retreat fun |
| 82 | https://www.youtube.com/watch?v=guhE-lmTy0A | בזק אנשים |
| 83 | https://www.youtube.com/watch?v=1g2bkf56vN8 | retreat testimonials |
| 84 | https://www.youtube.com/watch?v=rLBAqBsuiEM | TALOU L'OREN SPIRIT |
| 85 | https://www.youtube.com/watch?v=Ox3Bf_-fTQo | מטבחי זיו |
| 86 | https://www.youtube.com/watch?v=MopuBPOmKlw | PERSONAL BRANDING EDDIE LINDENBAUM |
| 87 | https://www.youtube.com/watch?v=Vt5XHmOBuUU | retreat testimonials |
| 88 | https://www.youtube.com/watch?v=tAn4y-l5aCA | personal branding kobi lupo |
| 89 | https://www.youtube.com/watch?v=txXx407v-ik | TALOU L'OREN STYLE |
| 90 | https://www.youtube.com/watch?v=OUN4WoGQQy8 | TALOU L'OREN STYLE |
| 91 | https://www.youtube.com/watch?v=10qJDgb8UVw | personal branding |
| 92 | https://www.youtube.com/watch?v=08uo1m68PYg | מאחורי הקלעים הפקה ויזואלית |
| 93 | https://www.youtube.com/watch?v=kwef0Tk2OYM | קמפיין לגן אירועים בישראל--צולם במדריד |
| 94 | https://www.youtube.com/watch?v=xM-tv2gjVJw | אתה המותג |
| 95 | https://www.youtube.com/watch?v=m5X2NViXY-Y | ציפור הנפש- שירה מויאל |
| 96 | https://www.youtube.com/watch?v=PNagC0cqX_k | artistic seminar for Wella |
| 97 | https://www.youtube.com/watch?v=ZheG7tNwHNk | Jewelry collection by @taloulorensuccess |
| 98 | https://www.youtube.com/watch?v=xR4dd5yc7h8 | TRANSFORMATIOM 4 ANDRE BY NETA- INSPIRE TO PITCH YOUR BOSS |
| 99 | https://www.youtube.com/watch?v=9PoA_GZo7SY | פרויקט פנים ארגוני לשירותי בריאות כללית |
| 100 | https://www.youtube.com/watch?v=C0rYWFtC2xY | הסתדרות הציונית |
| 101 | https://www.youtube.com/watch?v=Q8bj2ugRnHs | GIL ROZEN |
| 102 | https://www.youtube.com/watch?v=3PiI91L1zGk | (title not captured; duration 0:45) |
| 103 | https://www.youtube.com/watch?v=b4MKAzdRESc | ITAY NEW HORIZONS |
| 104 | https://www.youtube.com/watch?v=zCXz4gt1jZg | TRAVOR |
| 105 | https://www.youtube.com/watch?v=85XWSFuX4Hg | INNOVATION TEAM DEEP DIVE WORKSHOP |
| 106 | https://www.youtube.com/watch?v=aXT5QMnDU2A | TALIA MOTIVATES ME |
| 107 | https://www.youtube.com/watch?v=p0OUtdQ7e3w | HUMAN EXPERIENCE |
| 108 | https://www.youtube.com/watch?v=PiBJJTvYx4o | GOT A VISON? |
| 109 | https://www.youtube.com/watch?v=kMRoyF2sXHg | הפקה, קריאטיב פרסומת טלוויזיה מוזיאון הטבע |
| 110 | https://www.youtube.com/watch?v=wVWD0D7cBOg | KORNIT RECAP EXTERNAL |
| 111 | https://www.youtube.com/watch?v=A87kYRFXm_s | social HM |
| 112 | https://www.youtube.com/watch?v=OM3cWkuxVnc | TABOOLA AT HILTON |
| 113 | https://www.youtube.com/watch?v=uQRCEoW6aa0 | SUSTAINABILITY |
| 114 | https://www.youtube.com/watch?v=g3ztbjAh80o | LONDON 22 |
| 115 | https://www.youtube.com/watch?v=f--wex3ZqsE | kornit make better |
| 116 | https://www.youtube.com/watch?v=X1U4tMQ0WTc | SEAT TV COMMERCIAL |
| 117 | https://www.youtube.com/watch?v=hBQBcH-n58Q | STRONG DNA |
| 118 | https://www.youtube.com/watch?v=Q9BqMECK04s | MAC PURIM |
| 119 | https://www.youtube.com/watch?v=6IqJ-FzCE2A | IM NOT YOUR WOMAN SCHON |
| 120 | https://www.youtube.com/watch?v=dwW6JXfkv2g | BILLY WALK & STYLE |
| 121 | https://www.youtube.com/watch?v=xWa2QaN8SDQ | VOICEMSG AUCTION |
| 122 | https://www.youtube.com/watch?v=wUKASFHmUG4 | TIA WALK & STYLE |
| 123 | https://www.youtube.com/watch?v=nEr7VdVWOrU | AIRBERLIN |
| 124 | https://www.youtube.com/watch?v=L1xEs0jNLfM | UNLIMITED FUTURE PERFECT HEBREW SESSION |
| 125 | https://www.youtube.com/watch?v=ptY68466mgM | AMDOCS INNOVATION PROJECT |
| 126 | https://www.youtube.com/watch?v=S3lSR3ALyHw | AMDOCS PURPOSE |
| 127 | https://www.youtube.com/watch?v=eedsf4vtOx8 | מיתוג מעסיק TABOOLA |
| 128 | https://www.youtube.com/watch?v=1ikpV4NPTOY | מיתוג מעסיק וגיוס עובדים פיליפ מוריס |
| 129 | https://www.youtube.com/watch?v=nWNo_b5p3qY | קמפיין טלוויזיה גיוס עובדים מטרופולין |
| 130 | https://www.youtube.com/watch?v=OUzLGMPklXw | ליהנות מהלא נודע. תהליך של מיתוג והזנקה עסקית באמצעות חשיבה יצירתית |
| 131 | https://www.youtube.com/watch?v=ukjAvx5cJJc | איך להצליח עסקית. איך לצאת מתקיעות עסקית ולהזניק את המכירות. הדרך להצלחה העסקית של המותג שלנו |
| 132 | https://www.youtube.com/watch?v=WBk-F9n2nsk | EVERYONE IS BEAUTIFUL |
| 133 | https://www.youtube.com/watch?v=yM2YALs5pdQ | Brand Yourself - Testimonials - ELLA |
| 134 | https://www.youtube.com/watch?v=U52Lrz14nGk | Brand Yourself - Testimonials - Natali |
| 135 | https://www.youtube.com/watch?v=vWTLRy4CkIg | מפגש אסטרטגי להזנקה עסקית |
| 136 | https://www.youtube.com/watch?v=VoOOVJt1JIU | למה קלארק קנט לא לובש את גלימת הסופרמן שלו כל הזמן? |
| 137 | https://www.youtube.com/watch?v=C54vBVwkHLo | מי אני? |
| 138 | https://www.youtube.com/watch?v=zxNyJoIj3t0 | BRAND YOURSELF- EPISODE 1 |
| 139 | https://www.youtube.com/watch?v=ubomGtDGps4 | BRAND YOURSELF- EPISODE 2 |
| 140 | https://www.youtube.com/watch?v=MHXlO_YbBjI | BRAND YOURSELF- EPISODE 3 |
| 141 | https://www.youtube.com/watch?v=Xn5J9f7VA24 | BRAND YOURSELF- EPISODE 4 |
| 142 | https://www.youtube.com/watch?v=Pg30FZFj-Qs | BRAND YOURSELF INTO THE PROCESS |
| 143 | https://www.youtube.com/watch?v=J6qy6lvqcwM | PROMO BRAND YOURSELF |
| 144 | https://www.youtube.com/watch?v=zqSOneW-_G4 | HAPPY CLIENT SFAA |
| 145 | https://www.youtube.com/watch?v=Wvxq6-_mDxM | CLIENT EXPERIENCE |
| 146 | https://www.youtube.com/watch?v=bP90t8JLFCs | THE FUTURE OF PERSONAL BRANDING |
| 147 | https://www.youtube.com/watch?v=Hn0ZlnWMi6A | WORKER |
| 148 | https://www.youtube.com/watch?v=Smfp2-TYeNY | CASTRO DPPL |
| 149 | https://www.youtube.com/watch?v=SUXru7qiZFI | AMDOCS DARE TO INNOVATE |
| 150 | https://www.youtube.com/watch?v=3xTt-hkQ6Zo | מיתוג ויזואלי. מיתוג מעסיק |
| 151 | https://www.youtube.com/watch?v=TKl485LQMk8 | DEEP DIVE & BRAND DISCOVERY |
| 152 | https://www.youtube.com/watch?v=UEuVeL50pKY | את במיטבך |
| 153 | https://www.youtube.com/watch?v=IzAxFuZ9-1g | סדנה למיתוג אישי מנצח ליזמים בשיתוף עם בנק פועלים |
| 154 | https://www.youtube.com/watch?v=RhJFTPkbGyo | הוצאתם לי את הרגש |
| 155 | https://www.youtube.com/watch?v=nsjPLKiGbk0 | הצלחה עסקית- סרטון ניהול מותג |
| 156 | https://www.youtube.com/watch?v=xz5OviPyy3Q | 5 KEYS FOR SUCCESS |
| 157 | https://www.youtube.com/watch?v=yHGw0ObrWqU | DORON SHEFER CASE STUDY |
| 158 | https://www.youtube.com/watch?v=ccyOcrzwUY0 | TESTIMONIALS MAGIC TALOU |
| 159 | https://www.youtube.com/watch?v=UsBVhE_ziLw | SUCCESS IS 3 STEPS |
| 160 | https://www.youtube.com/watch?v=R_b-XLJs6cM | SUCCESS IS A DRIVE |
| 161 | https://www.youtube.com/watch?v=HmbINABlJnM | SUCCESS IS WHATS NEXT |
| 162 | https://www.youtube.com/watch?v=TR5JwdagN44 | SUCCESS IS LEADING THE WAY |
| 163 | https://www.youtube.com/watch?v=zH6W50VddUM | SUCCESS IS WINNING AFTER WINNING AFTER WINNING |
| 164 | https://www.youtube.com/watch?v=eD9BzE7Wi9k | SUCCESS IS VISUAL ATTRACTION |
| 165 | https://www.youtube.com/watch?v=z0k2iCDRH9Y | SUCCESS IS NOT GIVING UP |
| 166 | https://www.youtube.com/watch?v=y2TRRMGWsmQ | SUCCESS IS LIFE EXPERIENCE |
| 167 | https://www.youtube.com/watch?v=dFteLZPyKiM | SUCCESS IS INSPIRATION |
| 168 | https://www.youtube.com/watch?v=_X-Ngv4QOnw | SUCCESS IS WORKING TOGETHER |
| 169 | https://www.youtube.com/watch?v=_Ercqq7ZLnI | SUCCESS IS DIALOG |
| 170 | https://www.youtube.com/watch?v=I976Dvtch5I | SUCCESS IS ROMANTIC |
| 171 | https://www.youtube.com/watch?v=CYXYhGudBEs | VISA CAL MANAGMENT TEAM BOOSTER |
| 172 | https://www.youtube.com/watch?v=3RocZwVhmUA | AMOS TESTIMONIALS |
| 173 | https://www.youtube.com/watch?v=l5AyYFkqAuc | WELLA CASE STUDY |
| 174 | https://www.youtube.com/watch?v=ATWRaeFv2Fk | AMOS TESTIMONIALS |
| 175 | https://www.youtube.com/watch?v=H_oTTaODt64 | AMT CASE STUDY |
| 176 | https://www.youtube.com/watch?v=rYBhEfcPM0Q | OBSESSED- CK TEAM BOOSTER CASE STUDY |
| 177 | https://www.youtube.com/watch?v=clzMDU8pogc | TESTIMONIALS RONEN |
| 178 | https://www.youtube.com/watch?v=nelEGbRrFnk | SUCCESS IS BALANCE |
| 179 | https://www.youtube.com/watch?v=hoSK8Drn7b8 | CASE STUDY RITA |
| 180 | https://www.youtube.com/watch?v=ctGDSAsvv1A | TESTIMONIALS JOYA COSMETICS |
| 181 | https://www.youtube.com/watch?v=3JUsTJhhoVA | SUCCESS IS MOVEMENT |
| 182 | https://www.youtube.com/watch?v=0J8i5Tvlztw | SUCCESS IS BEHIND THE SCENE |
| 183 | https://www.youtube.com/watch?v=-IPRK9cBvK0 | SUCCESS IS INSIDE YOUR ORGANIZATION |
| 184 | https://www.youtube.com/watch?v=dczMWZI8u1Y | SUCCESS IS THE RIGHT STORY |
| 185 | https://www.youtube.com/watch?v=mH4N2w96iYc | SUCCESS IS IMAGINATION |
| 186 | https://www.youtube.com/watch?v=MR0Kleh4sQw | SUCCESS IS A WINNER |
| 187 | https://www.youtube.com/watch?v=cXPxe9Yr0X4 | SHOWREEL COVER SITE |

**shorts** (19 items)

| # | Video | Title |
|---|---|---|
| 1 | https://www.youtube.com/shorts/JFDJek1imdU | LEAVE A MARK- UNKNOWN |
| 2 | https://www.youtube.com/shorts/kiboRfSYO6I | LEADING WITHIN THE VORTEX |
| 3 | https://www.youtube.com/shorts/5dMlj_VxIpw | NON-DUAL UNKNOWN |
| 4 | https://www.youtube.com/shorts/ky5Pleke5_A | CHANGE- UNKNOWN |
| 5 | https://www.youtube.com/shorts/V5wiT_vWxzg | TOTAL TERA STORY |
| 6 | https://www.youtube.com/shorts/Y__6V7UNa4w | אנשי השיווק |
| 7 | https://www.youtube.com/shorts/4FV04fUtFlg | רפאל מיתוג אסטרטגיה |
| 8 | https://www.youtube.com/shorts/ikwPrsngMyQ | personal branding Refael |
| 9 | https://www.youtube.com/shorts/OgX5NkoOcII | personal branding Moshiko Malka |
| 10 | https://www.youtube.com/shorts/-jjMR5M3fn0 | personal branding |
| 11 | https://www.youtube.com/shorts/qAAWBKVsNfo | Jewelry collection by@talou_loren |
| 12 | https://www.youtube.com/shorts/BoC2HXQS1EY | Jewelry collection by@talou_loren |
| 13 | https://www.youtube.com/shorts/l1eXO4Spf6g | Jewelry collection by@talou_loren |
| 14 | https://www.youtube.com/shorts/TBGABSfzkKc | Jewelry collection by @talou_loren |
| 15 | https://www.youtube.com/shorts/05j2rajnSbw | Jewelry collection by @talou_loren |
| 16 | https://www.youtube.com/shorts/j-Fa1gpHGSI | Jewelry collection by @talou_loren |
| 17 | https://www.youtube.com/shorts/YTwMzvCGKW8 | EUGENE PERMA BLONDE MASTER STUDY CASE |
| 18 | https://www.youtube.com/shorts/zZvdKaa10lY | SUCCESS IS PERFECT IMAGE AT FACEBOOK |
| 19 | https://www.youtube.com/shorts/4tQST_M_Jgo | SUCCESS IS BEING READY |

### Shahar Naor — links on shaharnaor.com (header, identical on `/` and `/projects.html`)

| Link | Exact URL |
|---|---|
| LinkedIn | https://www.linkedin.com/in/shaharnaor/ |
| Vimeo | https://vimeo.com/shaharnaor (105 videos; latest include "Diesenhaus logo animation" https://vimeo.com/1151544103, "Sheket logo animation" https://vimeo.com/1056167043, Privex and NFA pieces, "Haddad Brands Europe - UNITE" https://vimeo.com/847717164) |
| GitHub | https://github.com/BloodyDeathRoll |
| Reddit | https://www.reddit.com/user/ein_hanamer/ |
| Discord | https://discord.com/users/einhanamer |
| Cronus Media | http://cronus.media/ |
| Portfolio (Behance) | https://www.behance.net/shaharnaor |
| Projects | https://shaharnaor.com/projects.html (Rosa https://rosa.surf/, WTW https://wtw-wine.vercel.app/, toll-e https://toll-e.vercel.app/, Oneshot https://oneshot-dashboard.os1.workers.dev/, Burgundy https://burgundy-mocha.vercel.app/, Tachyon (no link)) |
| Email / phone | shaharnaor@outlook.com · 0546502144 |

Shahar's videos usable for the proof wall: the Behance project "NBC's & Conan O'Brien's Pale Force | Animation" (https://www.behance.net/gallery/56282761/NBCs-Conan-OBriens-Pale-Force-Animation) embeds https://www.youtube.com/watch?v=xAnrETikIks ("Pale Force - Pale imposter - part #1") and https://www.youtube.com/watch?v=B5z_Hv4NAAI ("… part #2"). Both are on Shahar's channel https://www.youtube.com/@kaparacom, with posters at `https://i.ytimg.com/vi/<id>/maxresdefault.jpg`.

## Could not reach

- **LinkedIn** (talouloren, shaharnaor): HTTP 999 bot wall. Only the URLs are verified.
- **YouTube channel UCcKsvGT3KYfohI4miuoOmwA**: the page has no metadata and the RSS returns 404. Treated as dead.
- **7 dead YouTube ids** (listed above): oEmbed 404 and thumbnails 404, so they are private or deleted. Titles are unknown.
- **YouTube RSS** gives only the latest 15 uploads. The full list above comes from the rendered channel page. The 4 untitled rows did not expose a title.
- **Instagram and Facebook post lists**: only the profile counts (og tags) were read. The post grids need a login.
- **Behance project pages**: plain HTTP returns 403. They were read through a rendered browser instead.
- **Rendering timeouts**: 7 heavy portfolio photo pages (`/portfolio/art-factory/`, `צילום-אווירה`, `צילום-אירועים`, `צילום-קולקציה`, `צילום-יחצ`, `צילום-תדמיתי`, `צילום-מוצר`) timed out in Chromium. Their static HTML (curl, 200) has no video embeds.
