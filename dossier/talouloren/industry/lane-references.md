---
node: lane
role: researcher
run: 2026-11-il-brand-02
lane: references
status: complete
---

# lane: references — reference sites, diagnostic funnels, and Shahar's eight picks (talouloren)

## Summary

I measured eighteen sites on 2026-11-02: Shahar's eight A7 picks, plus ten of my own finds. Four of my finds are Hebrew/RTL, and five run a free or paid diagnostic or application that leads to a call or session. The sites that sell a person (Ashcroft, Ninia Azzopardi, Brand Builders Group, DG) show the named people and the big names on the first one or two screens. The diagnostics that fit TalouLoren's voice are short (8 questions, about 2 minutes), show one question per screen with a visible counter, and end on a score page whose one next step is a free fit meeting. The A7 picks get their high-end feel from a near-black ground, one warm accent and a large serif or outline display face, not from heavy WebGL. Only Steelwave (1.5–2.9 MB) and Ashcroft (4.4 MB) come near the 1.5 MB first-load budget. Igloo (17 MB), Amuse-Bouche (30 MB) and Ninia (32 MB) are far over it.

## Claims

### C-references-01 — igloo.inc's "frost and colour" scroll is a full-screen three.js scene driven by scroll, with no readable page underneath
- **Evidence:** The document is a single 900 px viewport (`scrollHeight` 900 at 1440 px). The wheel moves a 3D camera, and the page itself does not scroll. Its scripts are `index-2e130bc1.js`, `App3D-d68cb154.js`, a Draco WASM decoder, a Basis transcoder, and EXR, MSDF, bitmap and audio workers. `window.__THREE__` = "165" (three.js r165). The bundle contains GSAP and ScrollTrigger strings (51 and 2 hits). The page has no h1, no headings and no DOM text: the text is rendered as MSDF glyphs inside the canvas. The background is `rgb(160,165,177)` (#A0A5B1), and the scroll frames are frosted grey-blue (#6B707E sampled). Load was 17.4 MB at 1440 px, of which 15.7 MB was fetched 3D assets. Scroll frames show the igloo, then a frosted ice ring with a glowing core (shots/igloo/seq-0…3).
- **Source:** https://www.igloo.inc/ (Playwright probe, JS bundle grep, scroll sequence)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** A lighter route on the same site (a reduced-motion or mobile build) that serves real DOM text under 2 MB.

### C-references-02 — ritzcarlton.com's "clean structure" comes from a fixed type pairing (a small italic serif line over large serif capitals) repeated on white sections
- **Evidence:** The heading face is Caslon540Std and the UI and nav face is Swiss-721. Each section opens with an italic lead line over a capitals line: "Where To Go Next / FEATURED HOTELS", "The Journey / OF A LIFETIME", "The World According To / THE RITZ-CARLTON". Text is #1C1C1C (579 elements). The accent is a gold `rgb(145,110,39)` (#916E27) on 24 elements. Sections are white, with pale blue #E9F1FA bands and one #1C1C1C dark band. Section order: header with booking widget → hero video → intro paragraph → featured hotels carousel → dark "Journey of a Lifetime" band → yachts → rentals → immersions → retail → "World According To" carousel → footer. The hero is Brightcove HLS (`video-js`, 1280×720, 27 s, muted loop). There is no scroll-animation library: jQuery only, and no GSAP, Lenis or WebGL found. Load was 13.7 MB at 1440 px and 9.4 MB at 390 px.
- **Source:** https://www.ritzcarlton.com/ (probe, computed styles, shots/ritz)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** A rendered capture without the cookie overlay showing a different heading system on the fold.

### C-references-03 — porsche.com/international's "light to dark" is a stepped change of section background, not a scroll-scrubbed fade
- **Evidence:** Colours sampled from clean scroll frames (with cookies accepted) run: hero video → #FFFFFF ("Your Porsche journey starts now") → #1A1B1D → #010205 (model range grid) → #E3E3E4 light band → #010205 footer. Each change happens at a section edge. The stack is Astro v7.4.1 (`astro-island`) with the Porsche Design System web components (`p-heading`, `p-link-tile`, `p-model-signature`, `p-display`). One font family is used, Porsche Next. No GSAP, Lenis, three.js or ScrollTrigger was found. The CSS scan matched an `animation-timeline` property only in a component reset (`MobileCarRange…`). The hero is an HLS loop (`videos.porsche.com/…/hls.m3u8`, ld and fhd variants, 10 s, muted). Load was 12.6 MB at 1440 px (9.4 MB of it media) and 10.1 MB at 390 px.
- **Source:** https://www.porsche.com/international/ (probe, shots/porsche/clean-0…8, desktop-sheet)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** A measured intermediate colour between sections, which would show an interpolated scroll-driven fade.

### C-references-04 — brionycroft.com.au gets its immersion from Elementor motion effects, a 48-second background video and one copper accent on #1A1A1A
- **Evidence:** The site is WordPress 6.8 with Elementor. Six elements carry `motion_fx` or parallax settings, and the page also uses Swiper and jQuery. The video is `Briony_Croft_Own_The_Room.mp4`, 960×540, 48 s, autoplay, muted, looped, and used twice. The page loaded 7.75 MB of media of 10.9 MB total, the same at 1440 and 390 px. The h1 "OWN THE ROOM" is Domaine at weight 100 and 98 px, in `rgb(185,123,93)` (#B97B5D). Body text is Open Sans 16/24. The background is #1A1A1A, with 95 copper elements against 80 near-black ones. Section order: portrait hero → statement "CREATE PRESENCE AND CONFER CONFIDENCE." with portrait cut-outs rising through it (parallax) → full-bleed video titled "BRIONY CROFT" → services on a blush gradient ("IMAGE MANAGEMENT / INTERNATIONAL SHOPPING / PUBLIC SPEAKING / MEDIA") → contact form. A copper progress line runs along the top edge as you scroll.
- **Source:** https://www.brionycroft.com.au/ (probe, deep probe, shots/briony)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** The video served at a lower bitrate, or lazily, on mobile (it was not: 10.9 MB at 390 px).

### C-references-05 — niniaazzopardi.com shows a solo consultant carrying a blue-chip logo wall without looking like an agency: the face and "I" come first, the logos second
- **Evidence:** The hero reads "Hi, I'm Ninia / I am here to help your business" and cycles its last line ("enter a new market", "increase your international presence", "launch a new product"). It sits beside a black-and-white portrait. The next screen is "I am an independent, hands-on, marketing consultant". Only after that comes "Some brands I've had the pleasure to work with": prime video, Activision Blizzard, Accenture, McDonald's, Ray-Ban, Warner Bros, Mulberry, Call of Duty, PepsiCo and Levi's. Then come counters ("90 Total campaigns"), a numbered accordion of four services, and a giant mint statement line. The stack is Webflow IX2 (`w-mod-ix`, `data-w-id`) with jQuery. The type is Basier Square throughout, at 72 px for the h1 and 24/36 for body. The palette is teal ink #193C48 with mint #74E8AE / #17F3C7 on white. Images weigh 31.4 MB of 32.5 MB, identical at 1440 and 390 px.
- **Source:** https://niniaazzopardi.com/ (probe, shots/ninia)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** A larger sample of solo consultants whose logo-first heroes do as well.

### C-references-06 — ashcroftlawfirm.com puts its named partners in the hero ("LED BY" plus portraits and titles) on a black and gold palette, at 4.4 MB
- **Evidence:** The hero sets the h1 "Integrating Profound Government Experience with Advanced Business Insight." in IvyMode serif, 54 px, white, over a black-and-white photo of the Lincoln statue. Under it, a "LED BY" rule shows three round black-and-white portraits with titles: "Former U.S. Attorney General John Ashcroft", "Former U.S. Attorney for the District of Massachusetts Michael Sullivan", "Former U.S. Attorney for the Western District of Texas Johnny Sutton". The palette is #131313 ground, white text (80 elements), gold `rgb(201,166,109)` (#C9A66D, 24 elements) and a small red #C02B0A. Body text is Mr Eaves XL Sans 20/36, with wide-tracked gold capital labels ("/ OFFICE LOCATIONS"). Motion comes from a logo intro loader and a custom `page-scroll.min.js` that snaps section by section, with a right rail showing a vertical "HOME" label and gold up/down arrows. The rest is slick, jQuery and WordPress (Postali theme). No GSAP or WebGL was found. Load was 4.4 MB at both widths.
- **Source:** https://ashcroftlawfirm.com/ (probe, JS list, shots/ashcroft/seq-0, seq-1)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** The partner strip turning out to be a carousel that hides the names on mobile (the mobile captures show the enquiry block, not the strip).

### C-references-07 — steelwavellc.com reads as "flowing and high end" through outline type, a custom cursor and Motion reveals, and it is the lightest of the eight
- **Evidence:** The stack is Next.js (`next-route-announcer`). The JS chunks contain Framer Motion / Motion internals (`motionValue`, `dataset.motionPopId`, keyframe resolvers). No GSAP, Lenis or WebGL was found. The type is BW Gradual, used as an outline display face, with Degular for UI. The palette alternates #090909, #FCFCFC and #121212, with a red dot cursor. Home section order: a black hero with a giant outline "S" and an image reveal → "Who We Are" statement in large text → image and value text → news carousel → an outline marquee ("…NT BY DESIGN —") → an accordion of property types with images → a closing statement whose words switch between filled and outline over floating images ("SteelWave crafts exceptional environments…"). /portfolio is a typographic list of property names in outline type ("1660 Wynkoop", "Catalyst Research Center"…), with List / Map / Historical toggles. Load was 2.9 MB for home (4.2 MB after scroll) and 1.5 MB at 1440 px and 1.7 MB at 390 px for /portfolio.
- **Source:** https://steelwavellc.com/ and https://steelwavellc.com/portfolio (probe, chunk grep, shots/steelhome, shots/steelwave)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** A Lighthouse run showing the home page's images pushing LCP far past budget on 4G.

### C-references-08 — amuse-bouche.pt tells its story with a GSAP, Barba and three.js stack, a 15-second hero film and a preloader, at about 30 MB
- **Evidence:** `app.bundle.js` (WordPress theme "amuse") contains GSAP (45 hits), ScrollTrigger (5), SplitText (1), Barba (37, page transitions), three.js `WebGLRenderer` (78) and Lottie (50). One WebGL canvas is live. The preloader counts to "100" with a fish skeleton and "Good things come to those who wait…". The hero video is `FOODTOPIA_AFTERMOVIE_FINAL_1.mp4`, 1024×576, 15 s, muted loop. The palette is #0F0E0D near-black, cream #F2EDE6, grey body #7B7B7B and one hot accent `rgb(250,64,38)` (#FA4026). The type is the thin serif milk_thin for the h1 "Food Storytelling" (122 px) and biotif for body (20.9/27.4 px). Section order: preloader → hero film → cream about block → services as a giant serif list ("PR & COMUNICAÇÃO / ATIVAÇÃO DE MARCA / EVENTOS") → events with photography → featured case card with circular rotating text → "Vamos trabalhar juntos?" outline marquee with a 3D knife → newsletter. Load was 29.8 MB at 1440 px (10.5 MB xhr and 10 MB fetch assets) and 8.9 MB at 390 px.
- **Source:** https://amuse-bouche.pt/ (probe, bundle grep, shots/amuse)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** The 3D assets turning out to be lazy-loaded below the fold. The 390 px figure (8.9 MB) suggests some are, but it is still 6× budget.

### C-references-09 — Across Shahar's eight picks, the common "high end" signal is a near-black ground, one warm accent and a large display face; heavy motion is optional
- **Evidence:** Near-black grounds: Ashcroft #131313, Briony #1A1A1A, Amuse #0F0E0D, Steelwave #090909/#121212, Porsche #010205 sections. Single accents: Ashcroft gold #C9A66D, Briony copper #B97B5D, Amuse #FA4026, Ritz gold #916E27, Steelwave red cursor. Display faces: IvyMode (Ashcroft), Domaine 100 (Briony), milk_thin (Amuse), Caslon540 (Ritz), BW Gradual outline (Steelwave). Four of the eight (Ritz, Porsche, Ashcroft, Briony) use no scroll-animation library at all: jQuery or Elementor effects, CSS and video only. Only Igloo and Amuse ship three.js.
- **Source:** C-references-01 to 08
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** Shahar naming the WebGL effects specifically as what he wants, as opposed to the mood (his A7 notes mix both: "frost, colour effects" vs "clean, clear, palette").

### C-references-10 — Only two of the eight picks are near the 1.5 MB first-load budget; video and 3D are what push the rest over
- **Evidence:** First load at 1440/390 px: Steelwave /portfolio 1.5/1.7 MB (home 2.9 MB); Ashcroft 4.4/4.4; Briony 10.9/10.9 (7.75 MB video); Porsche 12.6/10.1 (9.4 MB media); Ritz 13.7/9.4 (10.4 MB xhr video segments); Igloo 17.4 (15.7 MB 3D fetch); Amuse 29.8/8.9; Ninia 32.5/32.5 (31.4 MB images).
- **Source:** Playwright response-size sum, 5 s after `load` (C-references-01 to 08)
- **Date:** 2026-11
- **Confidence:** medium (counts response bodies after load; it does not separate above-the-fold from deferred requests)
- **Changes my mind:** A waterfall split showing that most of each payload starts only after interaction.

### C-references-11 — RND's Hebrew business check is the clearest one-question-per-screen diagnostic → free fit meeting found: 8 questions, "1 / 8" counter, score out of 100, 1.09 MB
- **Evidence:** The intro reads "אבחון עסקי מקצועי — גלה את הציון של העסק שלך ב-2 דקות בלבד" ("Professional business diagnosis — discover your business's score in just 2 minutes"), followed by "✓ 8 שאלות ✓ 2 דקות ✓ דוח אישי ✓ חינם" ("8 questions, 2 minutes, personal report, free") and the button "בוא נתחיל ←" ("Let's start"). The markup is 11 `.step` blocks. Each question shows 4 `.option` cards and a disabled "המשך ←" ("Continue") button until an option is picked. A gold gradient progress bar (`--gold:#bea66e`) sits on #131313, with a "1 / 8" counter. Step 9 is the gate: "התוצאות שלך מוכנות — השאר פרטים וקבל את הדוח המלא" ("Your results are ready — leave details and get the full report"), asking for name*, phone*, email, and consent. Step 10 shows "X מתוך 100" ("X out of 100") with a breakdown over 8 categories (revenue, profitability, systems, marketing, numbers, strategy, retention, energy) and a single CTA: "בפגישת התאמה קצרה וללא עלות, ניר דובדבני ינתח איתך את המצב… לפגישת התאמה ללא עלות ←" ("In a short free fit meeting, Nir Duvdevani will analyse the situation with you… → to a free fit meeting"). Taps to first submit (counted from the markup, not with funnel.mjs, see Dead ends): 1 (start) + 8 × 2 (answer, continue) + 1 (submit) = **18 taps**, plus 2–3 typed fields. The page weighs 1.09 MB at 390 px, in Noto Sans Hebrew, `dir=rtl`.
- **Source:** https://www.rnd.org.il/ein-totsaa/business-health-check/ (HTML, Playwright, shots/rnd, shots/funnel-rnd)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** Conversion data from RND showing that the end gate loses most finishers.

### C-references-12 — The Dent / Key Person of Influence scorecard (ScoreApp) gates first: name, email and phone before question 1, then 40 yes/no questions and a PDF report
- **Evidence:** The landing page says "Instant results + tailored report + personalised insights … Take the Key Person of Influence quiz … PDF report direct to inbox in 5 minutes or less", with 5 scored areas (Pitch, Publish, Product, Profile, Partnerships) and the CTA "Discover influence score". One tap opens "Let's get started — Answer a few quick questions and we'll send over your custom results in no time. Easy!", with 5 fields (first name, last name, email, phone, country) and "Start", plus "Your personalised report will be emailed to you along with relevant business tips and events". **Taps to first submit: 2** (CTA, Start), before any question. The question count (40 yes/no) comes from the scorecard's own listing. The paid path sits on keypersonofinfluence.com: the hero "Book A Free Strategy Call" is above the fold at 390 px (funnel.mjs `cta_above_fold: true`) and leads to "Apply for a free Strategy Session … Begin your 60-second application to book a call" (3 fields). The program price is not published. The scorecard is "Powered by ScoreApp" and weighs 4.0 MB.
- **Source:** https://scorecard.dent.global/ (→ become.keypersonofinfluence.com/scorecard); https://become.keypersonofinfluence.com/gameplan; funnel.mjs `dossier/talouloren/industry/funnel/kpi/funnel.json`; shots/dent-quiz/form.png
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** Finding that the gate appears only for some traffic sources (ScoreApp lets the gate sit at the start or at the end).

### C-references-13 — Sites of this kind sell the diagnostic with three stated costs (question count, minutes, "free") and one stated reward (a score or report)
- **Evidence:** RND: "8 שאלות / 2 דקות / דוח אישי / חינם". Dent: "5 minutes or less / PDF report / instant results". Fascinate: "IN JUST 5 MINUTES, SEE YOUR MOST IMPRESSIVE AND INFLUENTIAL TRAITS". Phable: "Is Your Brand Strong Enough? Find Out Now – For Free! … get a pro score, expert insights, and actionable tips". Benny Vazana: "שלב 1 מתוך 8" ("Stage 1 of 8") with a 12% progress bar. All five name a score, report or profile as the payoff. None names the consultant's paid offer on the landing step.
- **Source:** C-references-11, 12, 14, 18; https://www.phable.io/free-brand-assessment
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** A strong diagnostic that converts while leaving out the time cost.

### C-references-14 — How to Fascinate does not give the assessment away: the test is $79 and the next step is a $697 package with two 45-minute sessions
- **Evidence:** Hero: "STOP ONLY MEASURING HOW YOU SEE YOURSELF." The CTA "DISCOVER WHAT MAKES YOU FASCINATING" leads to /products-for-you: "FASCINATE TEST $79" ("BUY NOW") and "COACHING PACKAGE $697", which includes "Two 45-minute sessions with a Fascinate Certified Advisor. The first session serves as a personalized walkthrough of your Fascinate report…". Taps from the hero to checkout: **2** (hero CTA, BUY NOW). funnel.mjs found no terminal action (checkout is off-site). The proof is media logos and stats ("1 MILLION PROFESSIONALS", "PUBLISHED IN 22 LANGUAGES"). Load was 18.3 MB at 390 px.
- **Source:** https://www.howtofascinate.com/ ; https://www.howtofascinate.com/products-for-you/ ; funnel.mjs `funnel/fascinate/funnel.json`
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** —(this is a documented exception, not a pattern claim)

### C-references-15 — Where a paid first session follows a diagnostic, it is framed as a walkthrough of the result, not as a sales call
- **Evidence:** Fascinate: "The first session serves as a personalized walkthrough of your Fascinate report". RND: "ניר דובדבני ינתח איתך את המצב ויגיד לך בדיוק מה הצעד הבא" ("Nir Duvdevani will analyse the situation with you and tell you exactly what the next step is"). Dent: "One of our senior strategy advisors will: Diagnose the biggest bottlenecks… identify quick-win opportunities". No site in the set credits a session fee against a later package, so no crediting language was found.
- **Source:** C-references-11, 12, 14
- **Date:** 2026-11
- **Confidence:** medium (3 sites; crediting not observed)
- **Changes my mind:** Consultant sites that publish "fee credited to your package" and show it lifts bookings.

### C-references-16 — Brand Builders Group runs the "free strategy call" as a scored application (a ~10-screen Typeform with score branching), not as a calendar link
- **Evidence:** Every CTA reads "request a free strategy call" and opens `brandbuildersgroup.typeform.com/to/GKOCnIAj`. The form definition lists name, last name, phone, email, company, industry, profession, location, source, "What is the dream vision you have for your personal brand?", and "give us an idea of where you're currently at". It also contains `score_branching` with two `thankyou_screen`s and a `url_redirect`: answers decide where a lead lands. funnel.mjs found no terminal action (`clicks_to_book: null`). The home page weighs 90 MB at 390 px.
- **Source:** https://brandbuildersgroup.com/ ; https://freebrandcall.com/ ; Typeform HTML; funnel.mjs `funnel/bbg/funnel.json`
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** —

### C-references-17 — Personal-brand firms show video testimonials as named-celebrity quote cards with a "watch video" link, not as a video grid
- **Evidence:** Brand Builders Group, "Hear what our clients have to say": quote cards for Amy Porterfield, Chalene Johnson, Anton Gunn and Kevin Harrington ("Original Shark on Shark Tank"), with 5 "watch video" links, 4 lightbox hooks and 1 Vimeo embed. The quote is the visible element, and the video opens on demand. DG shows TV appearances (Channel 13, 14, Walla) as 16:9 thumbnails with a play button, followed by a media logo row. Lush shows text-quote carousels with a round face photo, name and business.
- **Source:** https://brandbuildersgroup.com/ ; https://freebrandcall.com/ ; https://dg-branding.com/ ; https://lushbranding.co.il/ (shots/bbg, shots/dg, shots/lush)
- **Date:** 2026-11
- **Confidence:** medium
- **Changes my mind:** A comparable site whose inline autoplay testimonial grid outperforms quote-first cards.

### C-references-18 — Benny Vazana's Hebrew "digital diagnostic" is built as an 8-stage game with a YouTube video per stage and a willingness-to-pay question at the end
- **Evidence:** The h1 reads "ברוכים הבאים לאבחון העסקי הדיגיטלי הראשון בישראל" ("Welcome to the first digital business diagnostic in Israel"). It is framed as "משחק, כולל סרטונים והוראות בעברית" ("a game, including videos and Hebrew instructions"), with "שלב 1 מתוך 8" ("Stage 1 of 8") and a 12% bar. The page carries 5+ YouTube iframes. Its last question asks the budget for a package: "0-1000 / 1000-2500 / 2500-4000 / 4000-6000 ₪". The page weighs 10.5 MB, in Rubik, `dir=rtl`.
- **Source:** https://bennyvazana.co.il/digital-business-diagnostics1/ (probe, WebFetch, shots/vazana)
- **Date:** 2026-11
- **Confidence:** medium (the stage contents were not walked)
- **Changes my mind:** —

### C-references-19 — DG (Hebrew) presents its owners by first name with illustrated portraits, puts ~30 client logos and TV clips on the first scrolls, and reaches WhatsApp in 1 tap
- **Evidence:** The hero reads "אנחנו המיתוג הדיגיטלי נעים להכיר." ("We are DG Digital Branding, nice to meet you") over a cartoon of the two founders. A team row follows with "דניאל", "גיא", "מור" (Daniel, Guy, Mor). CTAs: "בואו נכיר לעומק «" ("Let's get to know each other properly") and an inline 4-field form, "אני רוצה לתאם פגישת אסטרטגיה לעסק" ("I want to book a strategy meeting for the business"). Logos include Outbrain, GSK, KIA, Cyberark and TheMarker, with TV-clip thumbnails. funnel.mjs: `clicks_to_book: 1` (floating WhatsApp above the fold; tel 050-3312024). First load is 0.91 MB, and 8.4 MB after scroll. Body text sits in a system sans stack, with the `gazoz` display face for headings.
- **Source:** https://dg-branding.com/ ; funnel.mjs `funnel/dg/funnel.json`; shots/dg
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** —

### C-references-20 — On Hebrew sites, "forward" points left: arrows and chevrons on CTAs are mirrored, and well-built carousels inherit `direction: rtl`
- **Evidence:** RND: "בוא נתחיל ←", "המשך ←", "לתוצאות ←", "גלה את התוצאות שלך ←" (every forward arrow points left). DG: "בואו נכיר לעומק «". Lush: all 6 Swiper containers compute `direction: rtl`. DG mixes them: two image carousels are `dir=rtl` and one is forced `dir=ltr` on the same page. RND's YouTube feed (Yottie) and fade carousel compute `ltr` inside an `rtl` page.
- **Source:** Playwright computed styles on https://dg-branding.com/, https://lushbranding.co.il/, https://www.rnd.org.il/ and the RND check page
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** —

### C-references-21 — Hebrew studio sites set Latin brand words as decoration or as plain inline words; none of the four isolates them with `dir=ltr` or `lang=en`, and none publishes hreflang
- **Evidence:** DG sets large faded Latin words behind Hebrew headings ("CREATIVE", "BRANDING", "VIDEOS", "MARKETING", "PROFESSIONAL"), and mixes them inline in h1s ("מסרים שיווקיים- LESS IS MORE"). Lush sets oversized Latin numerals 1–4 as background figures in an RTL layout. Counts of `[dir=ltr]` / `bdi` / `[lang=en]`: DG 2, Lush 0, Vazana 0, RND home 14 (widgets). `link[hreflang]`: 0 on all four. English: DG links a flag icon and "EN" to a separate subdomain (en.dg-branding.com, also /en). Lush, RND and Vazana have no English version.
- **Source:** Playwright DOM counts on the four sites (2026-11-02); shots/dg, shots/lush
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** —

### C-references-22 — Hebrew sites in the set use one Hebrew-capable family for body (Noto Sans Hebrew, Assistant, Rubik, atlas) at 16–18 px with 1.33–2.0 line height
- **Evidence:** RND: Noto Sans Hebrew, p 16/32, h1 40/800 in gold `rgb(204,174,110)`. DG: Assistant and gazoz, p 18/24. Vazana: Rubik, p 18/24. Lush: atlas, p 18/27. Mobile h1 sizes run 22–29 px: Vazana 22, DG 29, Lush 29. The RND check page sets its h1 at 28 px.
- **Source:** Playwright computed styles at 390 px
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** —

### C-references-23 — Two-partner studios carry big names as named project rows with a one-line outcome, and put the founders in the news feed, not the hero (Porto Rocha, Order)
- **Evidence:** Porto Rocha's left rail lists projects as icon, name and one line: "Tinder — Reigniting the flame of the world's most popular dating app", "MoMA PS1 — Establishing MoMA PS1 as Your Place for experimental art…", "Robinhood Market…". Its feed carries founder items: "Leo Porto and Felipe Rocha to headline OFFF Barcelona", "The Bold Way Podcast: A candid conversation with Leo Porto and Felipe Rocha", with portraits. Hero line: "PORTO ROCHA is a global strategy and design agency with offices in New York and London." Order's home is one long typographic work list in which Google, Apple, Herman Miller and Coca-Cola appear as plain entries ("Brand Identification Manuals for Coca-Cola", "Google Iconography"). Its co-founder appears only in a news line ("a new book by Order co-founder, Jesse Reed"). Weights: Porto Rocha 5.5 MB (Nuxt, SF Pro); Order 1.05 MB first load, 52.5 MB after scroll (Vimeo).
- **Source:** https://www.portorocha.com/ ; https://order.design/ (probe, HTML text, shots/portorocha, shots/order)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** —

### C-references-24 — Sites like this make the partners the product by showing faces with titles on the first screen; the agency-style studios that show only work do not
- **Evidence:** Partners on the first screen: Ashcroft ("LED BY" plus 3 portraits and titles), Ninia ("Hi, I'm Ninia" plus portrait), DG (two founders illustrated, "נעים להכיר"), Briony (portrait plus "OWN THE ROOM"), BBG (both founders on the audiobook banner, "Wealthy and Well-Known"). Agency-style, no person on the first screen: Porto Rocha, Order, Steelwave, Amuse-Bouche. The first group sells a person or partnership. The second sells a studio's output.
- **Source:** C-references-04, 05, 06, 16, 19, 23
- **Date:** 2026-11
- **Confidence:** medium (pattern across 9 sites; no conversion data)
- **Changes my mind:** —

### C-references-25 — Lush (Hebrew) shows a calm, editorial RTL studio pattern: a big logotype, one belief sentence, numbered services, then portfolio tiles
- **Evidence:** The first screen is the "LUSH" logotype on cream, with a 5-item nav ("שירותי הסטודיו / שואו טיים / המגזין / אודות / צרו קשר" — studio services, showtime, magazine, about, contact). The statement reads "לאש מאמינה בעסקים מדהימים ובונה עבורם מיתוג מוביל שמדבר עם הלקוחות שלהם גם כשהם לא לידם." ("Lush believes in amazing businesses and builds them leading branding that speaks to their customers even when they aren't there."). Four services follow with big background numerals, then a testimonial carousel, then a 3-column portfolio of client names (Hebrew and Latin mixed: "NALU", "טוקסה – TUCASA", "Ella Travels | אלה קינן"). There is no diagnostic. The page weighs 59.9 MB at 390 px (75 MB after scroll).
- **Source:** https://lushbranding.co.il/ (probe, shots/lush)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** —

### C-references-26 — The diagnostics that fit TalouLoren's voice end on one free or low-friction step; the conflicting case is the gate position (start vs end)
- **Evidence:** End-gated (RND): the questions are answered first, and the details are asked only once "התוצאות שלך מוכנות" ("your results are ready"). Start-gated (Dent/ScoreApp): 5 fields before question 1. Both lead to one next step: "פגישת התאמה ללא עלות" (a free fit meeting) or "Book A Free Strategy Call". The set gives no conversion figures to decide which gate converts better.
- **Source:** C-references-11, 12
- **Date:** 2026-11
- **Confidence:** medium
- **Changes my mind:** Published A/B data from ScoreApp or a consultant comparing the two gate positions.

### C-references-27 — The coach-site devices the brief rules out are present in this set: stale countdown timers, outcome percentages, "critical" fear labels, multiples and double exclamation marks
- **Evidence:** RND home has 54 `elementor-countdown` hooks on workshops dated "22.08.2022", "22.10.2022" and "14.12.2022", under "הזדמנות אחרונה" ("last chance") with "הסדנא הקרובה בעוד ימים שעות דקות שניות" ("next workshop in days hours minutes seconds"). It also claims "88% מלקוחותינו משנים לגמרי את התודעה שלהם" ("88% of our clients completely change their consciousness") and "אנחנו מתחייבים ומחויבים להצלחה שלכם!" ("we commit and are committed to your success!"). The RND check's lowest score band is labelled "מצב קריטי — העסק צריך התערבות מיידית" ("Critical state — the business needs immediate intervention"). BBG: "8-figure personal brand" (2 hits) and "You are a freaking genius". `!!` counts: RND home 10, DG 4.
- **Source:** https://www.rnd.org.il/ ; https://www.rnd.org.il/ein-totsaa/business-health-check/ ; https://brandbuildersgroup.com/ ; https://freebrandcall.com/ ; https://dg-branding.com/ (HTML grep)
- **Date:** 2026-11
- **Confidence:** high
- **Changes my mind:** —

### C-references-28 — No site in the set runs a vertical (9:16) video library; video libraries here are YouTube feed carousels or per-step embeds
- **Evidence:** RND home embeds a Yottie YouTube channel feed (a `swiper-container`, computed `ltr`) and a YouTube subscribe button. Vazana embeds 5+ 16:9 YouTube iframes. DG shows 16:9 TV clips. BBG has 1 Vimeo embed plus lightboxes. Order has 3+ Vimeo iframes inside project tiles. No `<video>` with a portrait aspect ratio and no 9:16 grid appeared on any of the 18 sites.
- **Source:** iframe and video lists from the Playwright probes
- **Date:** 2026-11
- **Confidence:** medium (absence across 18 sites, not a market survey)
- **Changes my mind:** A comparable consultant or studio site with a vertical-video library page.

## Dead ends

- **funnel.mjs does not see quiz flows.** It is tuned for booking actions (WhatsApp, tel, engines, dated forms). It returned `clicks_to_book: null` for RND, Dent, Fascinate, Phable and BBG, because their next steps are JS steps, Typeform or off-site checkout. I counted the diagnostic taps from the RND markup (`.step` / `.option` / `.btn-next`), by walking the Dent scorecard in Playwright, and from Fascinate's product page. funnel.json files are in `dossier/talouloren/industry/funnel/{rnd,kpi,dent-scorecard,fascinate,phable,dg,bbg}/`, and their PNGs were moved to `shots/funnel-*` (no images outside `shots/`).
- **Phable's assessment** did not render headless: no quiz widget in the DOM at 390 px, only "Let's talk". I could not count its question count or taps.
- **kehila.biz/business-diagnosis** returned 404.
- **dg-branding.com's "שאלון מחקר" ("research questionnaire")** at quiz.dg-branding.com is a post-purchase intake per service, not a diagnostic.
- **Igloo, Porsche and Ritz text and colours:** Igloo has no DOM text (canvas MSDF). Porsche renders in shadow DOM, so the element-from-point probe returned blank, and I sampled pixels from clean screenshots instead. Ritz's cookie modal covered the probe's h1 ("Privacy Preference Center"). Its fonts and colours come from the whole-page computed scan.
- **Searches that did not find Hebrew brand-strategy diagnostics:** "אבחון מיתוג חינם שאלון מותג אישי", "מיתוג אישי ליווי פגישת אסטרטגיה" and "סטודיו למיתוג שני שותפים". I found Hebrew diagnostics only in general business consulting (RND, Vazana), not in branding.
- **Order /about** returned 404. I took the founder mention from the home page news line.
- **All eight A7 sites were reached** (HTTP 200).

## Handoff notes

**The bar (for the creative-director), 5 sites:**
1. **ashcroftlawfirm.com.** It shows partners as the product in the hero ("LED BY", portraits and titles) on near-black with one gold, at 4.4 MB. It is the closest structural match to "two named partners plus big-name proof" in the client's look.
2. **brionycroft.com.au.** A personal brand that is dark, uses one copper accent and a thin display serif, with video and light parallax. It is the mood reference. Its 10.9 MB video weight is the thing not to copy.
3. **steelwavellc.com.** Shows how far outline type, a custom cursor and Motion reveals can go at 1.5–2.9 MB. It is the motion-within-budget reference.
4. **niniaazzopardi.com.** The simplest version of the aim: face, then "I", then a blue-chip logo wall, then numbered services. It is the structure reference. Its 31 MB of images are the thing not to copy.
5. **rnd.org.il business-health-check.** The functional bar for the Focused Check: Hebrew RTL, one question per screen, "1 / 8" counter, gold bar on #131313, score page, one free next step, at 1.09 MB. Copy the mechanics, not its labels (C-references-27).

**Per A7 site: what transfers to a Hebrew RTL two-partner studio site**
- **Igloo:** transfers the frost and colour mood (a cool grey-blue field, light inside glass). As built, it does not transfer: 17 MB, no DOM text, so no SEO, a11y or CMS content. If wanted, it could be a single small shader or poster-frame video behind the hero (speculation: <300 KB as a WebGL fragment shader without models).
- **Ritz:** transfers the italic-serif lead line over capitals as a section-title system (in Hebrew this needs a Hebrew serif with an italic or a weight contrast instead, because Hebrew has no true italic). It also transfers white/pale bands with one dark band. Not its weight (Brightcove HLS).
- **Porsche:** transfers stepped section backgrounds, light → dark → light → dark, which is CSS only and costs nothing. Not the HLS hero at 9 MB.
- **Briony Croft:** transfers the copper-on-charcoal single-accent palette, the thin display face, cut-outs rising through a statement, and the top scroll-progress line (in RTL the line should grow from the right). Use a poster image or a short compressed loop instead of a 48 s video.
- **Ninia:** transfers the cycling last line of the hero (a natural fit for the approved hero lines), the logo wall after the intro, and the numbered service accordion. Webflow IX2 is not needed: CSS and a few lines of JS are enough.
- **Ashcroft:** transfers the partner strip in the hero, wide-tracked gold capital labels (Hebrew has no capitals, so tracking or weight would stand in), and a vertical section label (mirror the rail to the left in RTL). Section snap scrolling is optional. It fights the long /watch library.
- **Steelwave:** transfers outline/fill word alternation (check that the Hebrew display face has an outline cut or use `-webkit-text-stroke`), the marquee (it must run left-to-right in RTL, that is, mirrored), and the red-dot cursor as the "single leading colour".
- **Amuse-Bouche:** transfers the storytelling order (preloader → film → belief → giant service list → case → "work with us" marquee). Barba page transitions and three.js do not transfer to the budget. A preloader also delays the Check CTA.

**Recurring patterns (stated as "sites like this convert by X"):**
- Sites like this sell the diagnostic by naming its cost (questions, minutes, free) and its payoff (a score or report) in one line next to the start button (C-references-13).
- They convert the diagnostic into a call through one next step on the result page, framed as reading the result together (C-references-11, 15, 26).
- They make partners the product by putting faces with names and titles on the first screen, and the logos after the intro (C-references-05, 06, 24).
- They show video proof as a named quote first and the video on tap (C-references-17).

**Avoid list (clashes with the brief's voice):** countdown timers, especially stale ones; "last chance" ("הזדמנות אחרונה"); outcome percentages ("88% of our clients…"); fear-labelled score bands ("מצב קריטי… התערבות מיידית", "critical… immediate intervention"); income multiples or "8-figure"; "freaking genius"-style quotes; double exclamation marks; asking budget ranges inside the free diagnostic (Vazana); 30–90 MB pages (Lush 60 MB, BBG 90 MB, Ninia 32 MB).

**Speculation for the merger:**
- The Focused Check's 10 questions sit just above RND's 8. A "1 / 10" counter, plus stating "10 שאלות · כ-3 דקות · חינם" ("10 questions · about 3 minutes · free") on the start screen, follows the observed pattern.
- The gate position is undecided by evidence (C-references-26). The brief's "returns a personal snapshot" fits an end gate.
- The Clarity Session's price, and whether it is credited, had no comparable on-site examples beyond Fascinate's bundled $697 package.
