---
node: lane
role: researcher
run: 2026-10-il-brand-01
lane: sites
status: complete
---

# lane: sites — what the best brand-studio sites do now (mutag-meitiv)

## Summary

Eleven brand-studio sites (7 international, 4 Israeli) measured on 2026-10-17 share one short position sentence on the first screen, work as image tiles with a one-line problem or outcome and service tags, a 4–7 item nav, and a low-effort contact action, which the Israeli studios (phone, WhatsApp, "בואו נדבר", then a long form) put on the first screen and the international ones (email) do not. Motion is heavy, but the readable sites keep it to reveals, sticky elements and small UI feedback, and the video-reel and smooth-scroll sites load 20–42 MB on a first mobile visit. Reopen (2026-10-18): six small Hebrew practices the client's buyers compare with (DoGood, Tali Gilad, Shelly Sever, Reuta Yosef Tzvi, Galit Sharon, Rinat Hadar) lead with the founder's name, face or role rather than a position sentence, group several offers by offer type or audience in a hamburger menu, mostly keep contact at the page end, set mobile body at 18–20 px with 1.5–1.9 leading, and load 1.1–20 MB (C-sites-16 to C-sites-22).

## Claims

### C-sites-01 — The first screen of a strong studio site is one short position sentence (≤ ~15 words), not a services list
- **Evidence:** Koto: "We're Koto — The Creative Company" and a one-line sub. Wolff Olins: "We create transformative brands that move businesses, people and the world forward." Forpeople: "How can we make the future more human?" Collins: "Rewrite your worth." Futerra: "At Futerra, we are expert solutionists and sustainability storytellers." NotFromHere: "מה המהלך הבא של המותג שלכם?" ("What is your brand's next move?"). iDeez: "מיתוג מעסיק — אתכם? נחתתם במקום הנכון" ("Employer branding — you? You've landed in the right place"). In 10 of the 11 sites, the services list starts at the second screen or later. Imaginet is the exception: its first screen leads with its niche, "ליווי שיווקי לחברות B2B" ("marketing support for B2B companies"). Seen in the WebFetch reads and in the 390 px shots.
- **Source:** https://koto.com/ ; https://www.wolffolins.com/ ; https://www.forpeople.com/ ; https://wearecollins.com/ ; https://wearefuterra.com/ ; https://notfromhere.net/ ; https://www.ideez.co.il/ ; https://imaginet.co.il/ (all opened 2026-10-17)
- **Date:** 2026-10
- **Confidence:** high
- **Changes my mind:** A comparable set of award-level studio sites that lead with a services grid or a multi-line paragraph on the first screen.

### C-sites-02 — Case studies are shown as large image tiles with the client name, a one-line problem or outcome, and service tags; the full story sits one tap away
- **Evidence:** Wolff Olins shows client, tagline ("Adding a spark to the coffee run") and tags ("Brand Strategy", "Visual Identity", "Verbal Identity"). Forpeople frames every project as a question ("How can circularity become second nature?") with tags ("Circularity · Identity · Strategy"). Koto shows client, tagline ("A new mark with old memories"), year and category. Futerra shows title, tagline ("Petrol icon becomes a low-carbon leader"), topic tags and "Read More". NotFromHere shows project title, a two-line description, and industry and service chips. Butcher shows NAME / DESCRIPTION / tag chips. All 11 sites follow this pattern. None puts a long case narrative on the home page.
- **Source:** same URLs as C-sites-01, plus https://www.butcher.studio/ ; 390 px scrolled shots (scratch, `shots/<site>/mobile-*`)
- **Date:** 2026-10
- **Confidence:** high
- **Changes my mind:** Strong studio sites that convert with long-form case text on the home page, or with no case studies at all.

### C-sites-03 — A broad multi-service offer is split into 3–11 named groups, framed either as divisions or as client problems, never as one flat list in the nav
- **Evidence:** Futerra splits into four divisions, each with its own colour block and shape: "Change Agency", "Academy", "Think Tank", "Solutions Union". Collins turns services into 11 named "Programs", each a client situation with a tagline: "Brand Refresh — Stay Relevant. Stay Valuable.", "Reposition — Don't Become the Best. Become the Only.", "Turnaround — Make Your Next Move Your Turning Point." Imaginet uses five pillars (אסטרטגיה, מיתוג, שיווק דיגיטלי, UX/UI, אתרים) plus a second axis of industries. NotFromHere has a services list plus a separate "תעשיות" (industries) axis in the nav. Mother lists 14 capabilities as a scroll-highlighted typographic list, below the fold, not in the nav. Top-level navs have 4–7 items: Wolff Olins 4, Mother 4, Forpeople 4 + email, Dumbar 5, Koto 6, Collins 7, NotFromHere 6 + EN.
- **Source:** https://wearefuterra.com/ ; https://wearecollins.com/programs ; https://imaginet.co.il/ ; https://notfromhere.net/ ; https://www.motherdesign.com/ ; nav labels from the WebFetch reads of each home page
- **Date:** 2026-10
- **Confidence:** high
- **Changes my mind:** Evidence that a flat mega-menu of all services converts better for small studios (no such test was found).

### C-sites-04 — Israeli studio sites put a contact action on the first screen on mobile; the international studios mostly do not
- **Evidence:** `tools/funnel.mjs` (390×844, depth 1) found a terminal action above the fold on Imaginet (a floating WhatsApp button, wa.me/972525594180, plus a "בואו נדבר" tab in the header) and on NotFromHere (a phone icon in the header, tel:972525917942). Butcher has a "Contact us" header link above the fold. On iDeez, the "בואו נדבר" pill sits in the hero (390 px shot; the tool missed it, see Dead ends). For Koto, Wolff Olins, Mother, Forpeople, Dumbar, Collins and Futerra, the tool found no contact action above the fold (`any_action_above_fold: false`). Their first contact sits in the footer or one tap away on /contact. Clicks to the first terminal action (phone, WhatsApp or engine): Butcher 1, Imaginet 1, NotFromHere 1, Forpeople 1 (footer phone), Mother 2, Dumbar 2, Wolff Olins / Collins / Futerra none (email or form only).
- **Source:** `tools/funnel.mjs` 0.2.0 runs, 2026-10-17 (scratch: `dossier/mutag-meitiv/industry/shots/funnel/<site>/funnel.json`); https://imaginet.co.il/ ; https://notfromhere.net/ ; https://www.ideez.co.il/
- **Date:** 2026-10
- **Confidence:** medium (the tool has no Hebrew CTA words, so Hebrew text links are undercounted; WhatsApp and tel are detected reliably)
- **Changes my mind:** A Hebrew-aware rerun that finds first-screen CTAs on the international sites, or none on the Israeli ones.

### C-sites-05 — What the CTA asks for differs by audience: international studios ask for an email to an office inbox; Israeli studios offer phone or WhatsApp plus a long form
- **Evidence:** Koto lists one email per office (la@, nyc@, london@…) behind "Say Hello". Wolff Olins: "Talk to us or ask us anything → Contact Us", and /contact lists emails per office. Mother lists office emails plus a "Call your Mother" phone link on /contact. Forpeople shows hello@forpeople.com with a "Copy" button and a 3-field form. Futerra: hello@ / hey@ / hola@ per office. Collins: a footer email and a "Work with us" button. Imaginet: WhatsApp, phone 076-8098820, email and an 8-field form (name*, phone*, email*, company*, subject, message, consent). NotFromHere: phone, email and an 11-field form with two dropdowns. iDeez: "בואו נדבר", "אני רוצה עוד פרטים" ("I want more details") and "גם אני רוצה כזה!" ("I want one like this too!"), plus a form at the bottom.
- **Source:** WebFetch reads and funnel.json of each home page and /contact, 2026-10-17 (URLs as in C-sites-01, C-sites-02)
- **Date:** 2026-10
- **Confidence:** high (for what the sites ask); this says nothing about which converts better
- **Changes my mind:** Data from Israeli studios showing email-only enquiries outperform WhatsApp or phone.

### C-sites-06 — Newsletter capture is common but secondary: footer-only, email-only
- **Evidence:** Mother: "Sign up for our emails" (one field plus a consent checkbox) in the footer. Collins: "Keep up to date — Your email" in the footer. Futerra: "Be first to get our ideas, invites and breakthroughs. Join the list with your email." in the footer. iDeez: "תרשמו אותי לאיידיזלטר" ("Sign me up for the iDeez-letter"). None of the 11 sites showed a newsletter pop-up at 390 px.
- **Source:** https://www.motherdesign.com/ ; https://wearecollins.com/ ; https://wearefuterra.com/ ; https://www.ideez.co.il/ (2026-10-17); 390 px shots
- **Date:** 2026-10
- **Confidence:** high
- **Changes my mind:** A strong site in the set that uses an entry or exit pop-up.

### C-sites-07 — A process section on the home page is the exception (3 of 11); when present it is 3–4 short named steps or values
- **Evidence:** Butcher has three numbered steps: "01 Discover / 02 Shape / 03 Deliver", one line each. Mother has four values under "How we do it": "Rigor, Rebellion, Depth, Care". Forpeople: "Everything we do enriches everything we do", linking to "How we work". Koto, Wolff Olins, Dumbar, Collins, Futerra, Imaginet, iDeez and NotFromHere have no process section on the home page (WebFetch reads).
- **Source:** https://www.butcher.studio/ ; https://www.motherdesign.com/ ; https://www.forpeople.com/ ; others as in C-sites-01
- **Date:** 2026-10
- **Confidence:** medium (process may sit on inner pages the depth-1 crawl only touched)
- **Changes my mind:** Process sections on the inner "About" or "Services" pages of most of these sites (then the claim narrows to "the home page").

### C-sites-08 — Trust is shown with client logos, awards and named testimonials; Israeli sites lean harder on logo walls and testimonials
- **Evidence:** NotFromHere has a large black logo wall (MyHeritage DNA, Woojer, Lifebuoy, Haifa municipality…) and a testimonial carousel. Imaginet shows 40+ client logos and 5+ Hebrew testimonials. iDeez: "הארגונים שכבר עושים איתנו דרך" ("Organizations already on the road with us") with a logo strip (L'Oréal Israel, ישראל היום…). Butcher shows "30+ international awards", "9 Best studio", a "5.0" rating and "$15M+ funding raised by clients", plus a named quote from a client CEO with "Read on Clutch". Collins: "8x Agency of the Year" in the hero. Forpeople: a B Corp "Certified" mark in the footer (390 px shot). Mother: a logo grid (facebook, NBA, Target, Tripadvisor).
- **Source:** https://notfromhere.net/ ; https://imaginet.co.il/ ; https://www.ideez.co.il/ ; https://www.butcher.studio/ ; https://wearecollins.com/ ; https://www.forpeople.com/ ; https://www.motherdesign.com/ ; shots 2026-10-17
- **Date:** 2026-10
- **Confidence:** high
- **Changes my mind:** n/a (descriptive). The "lean harder" part is medium: 3 Israeli sites against 7 international ones is a small sample.

### C-sites-09 — The heaviest motion costs the most: video-reel home pages load 20–42 MB on a first mobile visit; the restrained sites stay at 1–4 MB
- **Evidence:** A scratch Playwright run (390×844, page load plus 4 s, no scroll, bytes on the wire). Wolff Olins 41.9 MB (40.1 MB media, 5 videos). Studio Dumbar 39.9 MB (38.6 MB media, 14 videos, GSAP + ScrollTrigger + Lenis). Koto 20.6 MB (12.3 MB media, 15 videos). Imaginet 8.6 MB (6.1 MB media). Forpeople 8.0 MB. Collins 7.5 MB. iDeez 7.1 MB (5.9 MB images). Mother 3.65 MB. Butcher 3.4 MB. Futerra 1.7 MB. NotFromHere 1.23 MB. Every site is above the 1.5 MB first-load target in `playbook.md` §4 except NotFromHere.
- **Source:** Scratch measurement (`scratchpad/weigh.mjs`, CDP `Network.loadingFinished` encodedDataLength), 2026-10-17, against the home pages listed in C-sites-01 and C-sites-02
- **Date:** 2026-10
- **Confidence:** medium (one headless run, no throttling; streaming video inflates the 4 s window)
- **Changes my mind:** A repeat run, or WebPageTest/Lighthouse, giving a different order (video-led sites not heaviest).

### C-sites-10 — Hebrew RTL studio sites use Hebrew-designed type families and generous line-height (1.5–1.7), but two of three set mobile body text at about 14 px
- **Evidence:** Computed styles at 390 px on the first paragraph over 60 characters. Imaginet: objektiv-mk1-hebrew → IBM Plex Sans Hebrew, 14 px / 24 px (1.71). NotFromHere: Miriam Libre, 14.3 px / 22.2 px (1.55). iDeez: Rubik, 17 px / 25.5 px (1.5). The international sites run tighter: Mother 16 / 19.2 (1.2), Butcher 19 / 21.2 (1.12), Collins 29 / 30.5 (1.05, display-size body). All three Hebrew sites set `lang="he"` and `dir="rtl"` on `<html>`. Separately, Ubuntu's type designers sized Hebrew "just short of the Latin caps", rejecting a smaller "akin to small caps" design because it "was wrong". At the same font size, Hebrew is visually larger than Latin x-height and needs its own size and leading.
- **Source:** Scratch computed-style run, 2026-10-17 (https://imaginet.co.il/ , https://notfromhere.net/ , https://www.ideez.co.il/); Canonical/Ubuntu blog, "Hebrew and Arabic on track", https://ubuntu.com/blog/hebrew-and-arabic-on-track
- **Date:** 2026-10 (sites); 2011-01 (Ubuntu post)
- **Confidence:** medium (three Hebrew sites; one paragraph sampled per site)
- **Changes my mind:** More Hebrew studio sites sampled showing body text ≥ 16 px as the norm, or leading under 1.4.

### C-sites-11 — In Hebrew studio sites, Latin is kept to brand names and industry jargon; directional arrows are mirrored (forward points left)
- **Evidence:** Imaginet: Hebrew copy with Latin "B2B", "UX/UI" and the slogan "YOU IMAGINE IT". iDeez: Hebrew with "TikTok", "EVP", "Onboarding", "ROI" and the Latin logo "iDeez Employer Branding". NotFromHere: Latin logo "NFH notfromhere ltd.", Latin client names, otherwise Hebrew. Imaginet and NotFromHere offer an EN toggle. iDeez CTAs are pills with a circled arrow pointing left (←) at the pill's left end. NotFromHere's "לכל העבודות ←" ("to all work") and "לכל ההמלצות ←" also point left (390 px shots). rtlstyling.com: directional arrows flip in RTL; media controls and symmetrical icons do not; there is no logical property for `translateX`, so a hover nudge must be flipped explicitly for `[dir=rtl]`.
- **Source:** https://imaginet.co.il/ ; https://www.ideez.co.il/ ; https://notfromhere.net/ (2026-10-17, shots); Ahmad Shadeed, "RTL Styling 101", https://rtlstyling.com/posts/rtl-styling/
- **Date:** 2026-10 (sites); undated (rtlstyling.com)
- **Confidence:** high (sites); medium (guide is undated)
- **Changes my mind:** Hebrew studio sites that keep LTR-pointing "forward" arrows without user confusion.

### C-sites-12 — Five named motion patterns recur on the strong sites, all usable without hurting reading
- **Evidence:** (all seen in the 390/1440 scrolled shots, 2026-10-17)
  1. **Floating pill nav.** The header turns into a rounded floating pill once the page scrolls (Wolff Olins, from the second screen on). Forpeople keeps a persistent bottom pill ("forpeople" + "+") as its menu on every screen.
  2. **Sticky wordmark with a scroll-lit list.** Mother's "Mother Design" wordmark stays centred while sections pass under it. Its 14-capability list is grey with the item in focus set in black ("Care", "Depth").
  3. **Orbiting labels.** Forpeople sets service names ("Brand Architecture", "Go-to-Market", "Forecasting"…) on an arc that rotates as you scroll, around the "Everything we do enriches everything we do" statement.
  4. **Blur-to-focus reveal.** Butcher's project images enter blurred and sharpen into place (frame 4 of the mobile shot is mid-transition). Its intro is a three-line word stack ("BE MEMORABLE / EVOKE EMOTIONS / BE BOLD") before the wordmark.
  5. **Scroll-scrubbed reel.** Studio Dumbar's home page is a full-screen sequence of project videos driven by GSAP ScrollTrigger with Lenis smooth scroll (scripts `gsap.min.js`, `ScrollTrigger.min.js`, `lenis.js` loaded). It is the most striking and the heaviest (C-sites-09).
  NN/g on limits: most UI animation should run 100–500 ms, simple feedback about 100 ms, and at 500 ms animations "start to feel like a real drag". Scrolljacking left "the majority of our study participants … at least mildly disoriented"; NN/g advises keeping scroll vertical, minimising animated text and skipping it on mobile.
- **Source:** https://www.wolffolins.com/ ; https://www.forpeople.com/ ; https://www.motherdesign.com/ ; https://www.butcher.studio/ ; https://studiodumbar.com/ (script tags in raw HTML); NN/g "Executing UX Animations: Duration and Motion Characteristics", https://www.nngroup.com/articles/animation-duration/ (2020-02); NN/g "Scrolljacking 101", https://www.nngroup.com/articles/scrolljacking-101/ (2023-08)
- **Date:** 2026-10 (sites); 2020-02 and 2023-08 (NN/g)
- **Confidence:** medium (motion is inferred from sequential still captures, not video; pattern 4 could partly be a lazy-load placeholder)
- **Changes my mind:** A screen recording showing these effects differ from the description (for example, Butcher's blur is only a loading placeholder).

### C-sites-13 — Cookie consent banners cover a large part of the first mobile screen on several strong sites
- **Evidence:** At 390×844, the consent panel covers about the bottom 35–40 % of every captured viewport on Wolff Olins, Futerra and Imaginet, which also has floating WhatsApp and accessibility buttons. Butcher and Koto use a slim bottom bar. Mother, Forpeople, Collins, NotFromHere and iDeez showed no blocking banner in the shots.
- **Source:** 390 px scrolled shots, 2026-10-17 (scratch `shots/wolffolins`, `shots/futerra`, `shots/imaginet`, `shots/butcher`, `shots/koto`)
- **Date:** 2026-10
- **Confidence:** high (for what headless Chromium was served from this machine; a real visitor's banner can differ by region)
- **Changes my mind:** The banners not appearing for Israeli visitors in a normal browser.

### C-sites-14 — Israeli sites must carry an accessibility statement and meet IS 5568 (WCAG AA); an accessibility plugin alone does not satisfy it
- **Evidence:** Protocol's guide cites the Equal Rights for Persons with Disabilities regulations (Regulation 35) and Israeli Standard 5568, which adopts WCAG 2.0 AA. It states a prominent "הצהרת נגישות" (accessibility statement) is required, and that "תוספי נגישות אינם נותנים מענה אוטומטי" ("accessibility plugins do not provide an automatic solution"). It lists turnover-based exemptions for small businesses. Imaginet and NotFromHere link an accessibility statement in the footer; no such link was found in iDeez's raw HTML. Imaginet adds a floating accessibility menu with contrast, font-size, highlight and "animations" toggles.
- **Source:** Protocol, "נגישות באינטרנט – מדריך הנגשת אתרים", https://protocol.co.il/web-accessibility/ ; https://imaginet.co.il/ ; https://notfromhere.net/ (2026-10-17)
- **Date:** undated (Protocol guide); 2026-10 (sites)
- **Confidence:** medium (a secondary legal guide, undated; the exemption thresholds it lists look inconsistent and were not checked against the regulation text)
- **Changes my mind:** The regulation text (or the Commission for Equal Rights of Persons with Disabilities) stating different obligations or a newer standard version.

### C-sites-15 — Top international studios build on a headless CMS with a JS framework; Israeli studios mostly on WordPress or Webflow
- **Evidence:** Raw home-page HTML on 2026-10-17. Koto and Mother: Next.js (`_next`) with Sanity (cdn.sanity.io). Collins: Nuxt with Sanity. Wolff Olins: Next.js. iDeez: Next.js. Imaginet: WordPress (`wp-content`). NotFromHere: WordPress with Swiper/Splide carousels and Lenis. Butcher: Webflow. Forpeople: WordPress (generator meta) with Barba page transitions and Lottie. Studio Dumbar: GSAP + Lenis.
- **Source:** curl of each home page (URLs as in C-sites-01 to C-sites-09), 2026-10-17
- **Date:** 2026-10
- **Confidence:** medium (fingerprints from string matches; a `_next` string can appear without Next.js)
- **Changes my mind:** Response headers or build manifests showing a different stack.

### C-sites-16 — Small Hebrew practices lead with the founder (name, face, role line) rather than a position sentence; two of six show no sentence at all on the first mobile screen
- **Evidence:** First screen at 390 px (1440 where noted). Reuta: "רעותה יועצת עסקית / יעוץ עסקי לנשים" ("Reuta, business consultant / business consulting for women") over her photo. Galit Sharon: a photo slider with "גלית שרון / Power Skills לאנשים שמובילים אנשים" ("Galit Sharon / power skills for people who lead people"). DoGood: "מיתוג ודיגיטל לארגונים עם משמעות" ("branding and digital for organisations with meaning") and a 60-word paragraph. Rinat Hadar: "מעצבות לך מיתוג קונספטואלי לעסק" ("we design conceptual branding for your business"). Tali Gilad: at 1440, "סטודיו טלי גלעד. מיתוג אסטרטגי, מקיף, מעמיק וחכם, לארגונים, עמותות, חברות ועסקים." ("Tali Gilad studio. Strategic, comprehensive, deep and smart branding for organisations, nonprofits, companies and businesses."). At 390 that text is hidden (computed width 0), so the first screen is only the logo and her photo. Shelly Sever: the first screen at both widths is an intro animation of five star glyphs, "SHELLY SEVER", a "כאן מתחילים" ("start here") cue and a cookie banner. Her line "זה לא מקרה שהגעת אליי!" ("it's no accident you came to me!") comes on the second screen. Four of six show the founder's face on the first or second screen (Tali, Shelly, Reuta, Galit).
- **Source:** https://www.reuta.co.il/ ; https://www.galit-sharon.co.il/ ; https://dogood.studio/ ; https://r-h.studio/ ; https://taligilad.co.il/ ; https://shellysever.com/ ; `tools/shoot.mjs` 1440 and 390, 2026-10-18 (scratch `shots/reopen/<site>/`)
- **Date:** 2026-10
- **Confidence:** high (what is on screen); medium for "rather than": DoGood and Rinat Hadar, the two design studios in the set, do lead with a position line
- **Changes my mind:** Other Israeli personal-branding or coaching sites that lead with a position sentence and no founder.

### C-sites-17 — Only two of six put a contact action on the first mobile screen; the rest put it one popup away or at the end of a 7–13k px page
- **Evidence:** Read from the 390 px shots and `tools/funnel.mjs` (depth 1). The tool's Hebrew blind spot was corrected by hand: it found nothing on DoGood and missed Shelly's home footer.
  - **Reuta:** 0 scrolls. A floating green "לשיחה עם רעות חייגו 050-200-0224" ("to talk to Reuta, call") pill stays on every screen, and a hero button "לפגישת זום ראשונית במתנה!" ("first Zoom meeting free!") opens a popup form. Her inner pages add a floating WhatsApp "צריכה עזרה? שלחי הודעה" ("need help? send a message").
  - **Galit Sharon:** a top bar with a mailto email and the phone number, then a red 3-field form ("רוצים לקבל פרטים נוספים על הסדנאות?", "want more details about the workshops?") right under the hero. A WhatsApp button "שלחו לי הודעה ואחזור בהקדם" ("send me a message and I'll get back soon") sits mid-page.
  - **DoGood:** "תיאום פגישת היכרות" ("book an intro meeting") is just below the first screen. It opens a popup, "בואו נעשה טוב ביחד!" ("let's do good together!"), with a WhatsApp icon and a 2-field form (name, email): 2 taps to WhatsApp.
  - **Tali Gilad:** no CTA in the mobile hero. Contact is an icon row (email, WhatsApp, phone) and a 4-field form, "נדבר בקרוב :)" ("we'll talk soon :)"), at the end of a 7,214 px page.
  - **Shelly Sever:** phone, WhatsApp and email in the footer of a 12,899 px page (17 mobile screens). Her mid-page "דברו איתי" ("talk to me") links to a service page (/brand-development), not to a contact action.
  - **Rinat Hadar:** phone and email only in the footer of an 8,441 px work wall, plus "יצירת קשר" in the menu.
- **Source:** funnel.json per site (scratch `shots/reopen/funnel/<site>/`); shots as in C-sites-16; raw home HTML of dogood.studio and shellysever.com (popup and footer links), 2026-10-18
- **Date:** 2026-10
- **Confidence:** medium (page lengths are one headless run; "just below the first screen" on DoGood depends on device height)
- **Changes my mind:** A real-device check finding first-screen contact on Tali, Shelly or Rinat, for example a sticky bar that the headless run did not render.

### C-sites-18 — A multi-offer solo practice splits its offers in a hamburger menu by offer type or by audience, and on the home page gives each offer its own block with its own CTA
- **Evidence:** All six use a hamburger menu at 390 px.
  - **Reuta:** five groups. "ליווי עסקי" (business mentoring) holds three 1:1 or premium tracks. "קורסים דיגיטליים" holds five named courses. "אודות" (about) holds testimonials, press and client interviews. "תכנים לעסק" (business content) holds the podcast, videos and blog categories. Then "דברו איתי" (talk to me). The home page follows the same order: H2 "מסלולי הליווי העסקי שלי" ("my mentoring tracks"), with three H3 tracks (monthly 1:1, annual package, annual club), then H2 "תוכן לעסקים" with H3s for the podcast, courses and blog.
  - **Shelly Sever:** verb-labelled groups: "התעוררות / תכירו / הגשימו / תקראו / האזינו / המלצות / דברו איתי" ("awaken / meet / fulfil / read / listen / testimonials / talk to me"). "הגשימו" holds 1:1 consulting, personal-branding consulting, consulting for entrepreneurs, the course, the accelerator and two lectures. On the home page each offer is its own section with its own CTA: "קורס אונליין" (online course), "להזמנת הרצאה" (book a lecture), "יעוץ למיתוג אישי" (personal-branding consulting), "לפרטים נוספים על הקורס ולהרשמה" (course details and sign-up), and "למה לי פודקאסט?" (why do I need a podcast?) with "להזמנת הרצאה או סדנה" (book a lecture or workshop).
  - **Galit Sharon:** about 30 menu items grouped by audience: "סדנאות למנהלים" (workshops for managers), "סדנאות לעובדים" (workshops for employees), "קורסים דיגיטליים" (digital courses), styling, about, blog, contact.
  - **Tali Gilad:** a flat 7-item menu by audience: "בית / פרויקטים / מיתוג / ייעוץ לארגונים / ליווי למעצבים / קורסים למעצבים / אודות" ("home / projects / branding / org consulting / designer mentoring / courses for designers / about"). The home page has three service blocks, each ending in "לכל הפרטים על…" ("all the details on…").
  - **Rinat Hadar:** 7 items by work type, with courses as one item ("קורסים"). The course itself lives on a separate subdomain (course.r-h.studio).
  - **DoGood:** no navigation at all: one page and a portfolio PDF.
- **Source:** menu links from raw HTML and the rendered DOM (header and nav anchors), H2/H3 lists of each home page, 2026-10-18; URLs as in C-sites-16
- **Date:** 2026-10
- **Confidence:** high (structure as published)
- **Changes my mind:** n/a (descriptive). No evidence was found on which split converts better.

### C-sites-19 — Podcast and content are a separate "content" group, never the lead; email capture is a free download or a footer field, not a newsletter pitch
- **Evidence:** Reuta files the podcast ("הפודקאסט לעסקים") with courses and the blog under "תוכן לעסקים", after the paid tracks. Shelly files podcasts under "האזינו" (listen), and her home "למה לי פודקאסט?" is sold as a lecture. Email capture: Reuta uses a lead-magnet popup, "התוכנית העסקית שלך, מוכנה למילוי" ("your business plan, ready to fill in"), with name and email. From about the ninth mobile screen it covers most of every viewport. Galit Sharon shows a red "להורדת מדריך מיתוג עצמי מנצח לחצו כאן" ("click to download the winning self-branding guide"). Shelly has a footer "הרשמה לעדכונים" ("sign up for updates") email field. Tali Gilad, Rinat Hadar and DoGood show no newsletter or lead magnet. None of the six leads with the podcast or newsletter on the first screen.
- **Source:** https://www.reuta.co.il/ ; https://shellysever.com/ ; https://www.galit-sharon.co.il/ (390 px shots, H2/H3 lists, raw HTML string search for ניוזלטר / newsletter / הרשמה), 2026-10-18
- **Date:** 2026-10
- **Confidence:** medium (popups and lead magnets can vary by visit; one headless run each)
- **Changes my mind:** A small Israeli practice whose home page leads with its podcast or newsletter.

### C-sites-20 — The small practices set mobile body text larger than the studios: 18–20 px with 1.45–1.9 leading in four of six
- **Evidence:** Dominant body style at 390 px, weighted by characters of visible text blocks of 40 or more characters, outside header, nav and footer, after scrolling the page. Galit Sharon: Assistant 20 px / 1.90. Shelly Sever: Alef 18 px / 1.50. Reuta: Heebo 18 px / 1.50, plus 16 px / 1.45 for secondary text. Tali Gilad: Arbel 18 px / 1.28. DoGood: Ping 22 px / 1.55 for its intro paragraph (its only long text). Rinat Hadar: TheBasics 14 px / 1.10 on its only paragraph; the page is otherwise image tiles with captions. All six set `lang="he-IL"` and compute `direction: rtl`. Compare C-sites-10: Imaginet and NotFromHere at about 14 px.
- **Source:** scratch computed-style run (`scratchpad/type.mjs`), 2026-10-18; URLs as in C-sites-16
- **Date:** 2026-10
- **Confidence:** medium (one run; the character weighting can over-count repeated testimonial or slider text)
- **Changes my mind:** A real-device check showing smaller rendered sizes, for example from viewport-scaled type.

### C-sites-21 — First mobile loads range 1.1–20 MB; the two lightest are a one-page studio and a coaching site with no video, and the heaviest is the one with autoplay video
- **Evidence:** Playwright at 390×844, page load plus 4 s, no scroll, CDP encoded bytes. DoGood 1.09 MB (54 requests). Shelly Sever 1.81 MB (1.04 MB of it scripts, Lottie). Reuta 1.95 MB (1.21 MB scripts). Tali Gilad 5.41 MB (4.03 MB images). Galit Sharon 6.16 MB (5.57 MB images, 392 KB fonts). Rinat Hadar 9.94 MB in the first run and 20.16 MB in the second (8.9 and 19.1 MB of media from 5 videos, GSAP + ScrollTrigger). Only DoGood is under the 1.5 MB target in `playbook.md` §4. Five of the six are WordPress: Elementor on Tali, Shelly, Reuta and Rinat (from `elementor-action` links), Bricks on DoGood (`brxe-` classes). Galit Sharon's stack was not checked (curl returned an empty body).
- **Source:** scratch `scratchpad/weigh.mjs` and `weigh2.mjs`/`weigh3.mjs`, 2026-10-18 (output in `shots/reopen/weigh*.out`); raw HTML
- **Date:** 2026-10
- **Confidence:** medium (one or two headless runs, no throttling; video streaming makes Rinat Hadar's number unstable). DoGood answered 403 to a spoofed Android user agent and was measured with the default headless user agent.
- **Changes my mind:** A throttled Lighthouse or WebPageTest run giving a different order.

### C-sites-22 — The small sites show friction a buyer meets at once: a dialled number that differs from the shown one, a lead popup over the content, an intro loader, and a hero text hidden on mobile
- **Evidence:** Reuta's call pill reads "050-200-0224", but every `tel:` link on the home page dials `tel:0559851686`. Her WhatsApp link uses 972559851686. Her lead-magnet popup covers most of the viewport from about screen 9 on (C-sites-19). Shelly Sever's first screen at both widths is an intro animation plus a cookie banner covering about the bottom fifth at 390 px, with no text about her offer. Tali Gilad hides her hero sentence at 390 px (C-sites-16), and a reCAPTCHA badge stays over the bottom corner of every screen. Galit Sharon has a fixed accessibility button over the left edge of every screen.
- **Source:** https://www.reuta.co.il/ (raw HTML `tel:` and WhatsApp links; funnel.json label vs href) ; https://shellysever.com/ ; https://taligilad.co.il/ ; https://www.galit-sharon.co.il/ ; 390 px shots, 2026-10-18
- **Date:** 2026-10
- **Confidence:** high (the Reuta mismatch is in the HTML); medium for the popup and banner (headless, one visit)
- **Changes my mind:** 050-200-0224 forwarding to the dialled number (then the mismatch is cosmetic, not broken), or the popup and banner not appearing in a normal browser.

## Dead ends

- **futerra.co** is a parked domain (123 Reg holding page), and **futerra.com** redirected to an unrelated company (profileproducts.com). The real site is **wearefuterra.com**, which was measured instead.
- **siyon.co.il** timed out. **almogdvir.co.il** returns a hosting "suspended" page. Both were dropped.
- **Awwwards' Israel filter** could not be reached through search. The Awwwards profile pages found (e.g. Tzlil Yosher) are personal portfolios, not studios. No award-listed Hebrew-language studio site was confirmed. The Israeli award winner found (Butcher.studio) publishes in English only.
- **Material Design bidirectionality pages** (m2 and m3) render client-side and returned no text. skillselion.com's Hebrew RTL guide returned only metadata. rtlstyling.com was used instead.
- **`tools/funnel.mjs` and Hebrew:** `BOOK_WORDS` has no Hebrew, so "בואו נדבר", "צרו קשר" and "לקביעת פגישה" links are not classed as CTAs. iDeez reads as having no action at all, which is wrong (its hero pill is visible in the shot). On Koto the tool reports a "whatsapp" action that is really a project page (`/projects/whatsapp`). Both were corrected by hand in C-sites-04.
- **The reduced-motion check** (scanning stylesheets for `prefers-reduced-motion`) cannot read cross-origin sheets, so it was not used as a claim.
- **Pentagram, Wednesday and Brand New lists** were not covered; 11 sites were enough for the success criteria.

- **Reopen (2026-10-18):** dogood.studio answered **403 Forbidden** to Playwright with a spoofed Android Chrome user agent, while `tools/shoot.mjs` (default user agent) got the page; it was weighed again with the default user agent. `tools/funnel.mjs` again missed Hebrew CTAs: nothing found on DoGood (its CTA opens a popup), and Shelly's home-footer phone and WhatsApp were missed (the tool reported 2 taps via the accessibility page). Corrected by hand in C-sites-17. curl of galit-sharon.co.il returned an empty body, so its phone markup was read from funnel.json only. Rinat Hadar's weight differed 2× between two runs because of streamed video.

## Handoff notes

**Sites covered (path to first contact = funnel.mjs depth 1 at 390 px, corrected by hand where noted in Dead ends):**

| Site | Lang | What it does well | First screen → first contact |
|---|---|---|---|
| Koto (koto.com) | en | Dark, video-led work wall; one-line position; per-office emails | No CTA above the fold; "Say Hello" / per-office email in footer or on /contact; 20.6 MB |
| Wolff Olins (wolffolins.com) | en | One-sentence ambition; work tiles with client, tagline and tags; floating pill nav | Footer "Talk to us or ask us anything → Contact Us" → /contact email list (no phone); 41.9 MB |
| Mother Design (motherdesign.com) | en | Sticky wordmark; 14-capability scroll-lit list; four values as process | Footer office emails; /contact "Call your Mother" tel (2 taps); 3.65 MB |
| Forpeople (forpeople.com) | en | Projects framed as questions; orbiting service labels; persistent bottom pill menu; B Corp mark | Footer phone (1 scroll), email with Copy button, 3-field form; 8.0 MB |
| Studio Dumbar (studiodumbar.com) | en | Full-screen scroll-driven project reel (GSAP + Lenis) | Nav "Contact" → phone (2 taps); 39.9 MB |
| Collins (wearecollins.com) | en | Services as 11 named "Programs" (client situations); awards in hero | "Work with us" + footer email; no phone; 7.5 MB |
| Futerra (wearefuterra.com) | en | Four colour-coded divisions for a broad offer; purpose-led tone | Footer emails per office + newsletter; no phone; 1.7 MB |
| Butcher.studio (butcher.studio) | en (IL studio) | 3-step process; dense award and rating proof; blur-to-focus reveals | "Contact us" in header above the fold; footer phone and Telegram; "Discuss the project"; 3.4 MB |
| Imaginet (imaginet.co.il) | he RTL | Five service pillars + industries; WhatsApp always visible; accessibility menu | Floating WhatsApp above the fold (0 taps); "בואו נדבר" tab; 8-field form at the end; 8.6 MB |
| iDeez (ideez.co.il) | he RTL | Single-niche hero (employer branding); playful, specific CTAs; mirrored arrow pills | "בואו נדבר" pill in hero → bottom form; newsletter; 7.1 MB |
| NotFromHere (notfromhere.net) | he RTL | Question headline; services × industries nav; big logo wall; lightest page | Header phone icon above the fold (0 taps); 11-field form at the end; 1.23 MB |

**"Sites like this convert by X" (pattern statement for the merger, built from C-sites-01, -02, -04, -05):** strong studio sites convert by stating one position in one sentence, proving it at once with large work tiles and named clients, and keeping one low-effort contact action always in reach. For Israeli visitors that action is WhatsApp or phone, while international sites use email. There is no conversion data behind "convert"; it is the recurring structure of award-level and market-leading sites, so the skeptic should treat it as such.

**Speculation for the designer and creative-director (not claims):**
- Mutag Meitiv's two leading services (personal branding, strategic planning; brief answer 12) fit Collins's "programs as client situations" framing better than a capability list.
- The brief asks for "readable texts that is not too compressed". C-sites-10 suggests Hebrew body at ≥ 17–18 px with leading of about 1.6 beats the 14 px seen at two Israeli studios.
- The client is self-hosted (`self_hosted_docker`) with motion asked for. Patterns 1–4 of C-sites-12 are cheap in bytes. Pattern 5 (video reel, smooth scroll) is what drives the 20–42 MB pages and conflicts with NN/g's mobile advice.
- RTL motion: anything that slides "forward" should enter from the left in Hebrew, and arrow nudges need an explicit `[dir=rtl]` flip (C-sites-11).
- An accessibility statement page and a working reduced-motion fallback should be planned from the start (C-sites-14). Do not rely on an overlay plugin.
- The client's current Wix site (measured as a control, not one of the 11): 2.49 MB, `lang="he"`, but `<html>` computes `direction: ltr`, and the funnel found its "לקביעת פגישת הכרות" ("book an intro meeting") booking link 2 taps deep on /process. Handed to the `position` lane; not a claim here.

Scratch: screenshots under `dossier/mutag-meitiv/industry/shots/<site>/`, funnel output under `dossier/mutag-meitiv/industry/shots/funnel/<site>/`. The `funnel/` path is not git-ignored, so everything was kept under `shots/`. Delete with `tools/clean-shots.mjs` after the merge.

**Reopen: small Hebrew practices (2026-10-18; C-sites-16 to C-sites-22):**

| Site | First screen (390) | First contact → taps | Offer split (nav / home) | Body (390) | First load |
|---|---|---|---|---|---|
| DoGood (dogood.studio) | "מיתוג ודיגיטל לארגונים עם משמעות" + paragraph | "תיאום פגישת היכרות" just below the first screen → popup → WhatsApp or 2-field form (2 taps) | No nav; one page + portfolio PDF | Ping 22/1.55 | 1.09 MB |
| Tali Gilad (taligilad.co.il) | Logo + photo only (hero sentence hidden on mobile) | Footer icons (email, WhatsApp, phone) + 4-field form at the end of 7.2k px | 7 flat items by audience; 3 service blocks with "לכל הפרטים" | Arbel 18/1.28 | 5.41 MB |
| Shelly Sever (shellysever.com) | Intro loader + cookie banner; "זה לא מקרה שהגעת אליי!" on screen 2 | Footer phone and WhatsApp at the end of 12.9k px | Verb-labelled groups; one section per offer with its own CTA (course, lecture, consulting, podcast talk) | Alef 18/1.5 | 1.81 MB |
| Reuta Yosef Tzvi (reuta.co.il) | "רעותה יועצת עסקית / יעוץ עסקי לנשים" + free-Zoom CTA | Floating call pill on every screen (0 taps; dials a different number than shown) | 5 groups: mentoring tracks / courses / about / content / contact; home follows the same order | Heebo 18/1.5 | 1.95 MB |
| Galit Sharon (galit-sharon.co.il) | Photo slider "גלית שרון / Power Skills לאנשים שמובילים אנשים"; email and phone top bar | 3-field form right under the hero; WhatsApp mid-page (1 tap) | ~30 items by audience (managers / employees / digital courses / styling) | Assistant 20/1.9 | 6.16 MB |
| Rinat Hadar (r-h.studio) | "מעצבות לך מיתוג קונספטואלי לעסק" | Footer phone and email at the end of 8.4k px | 7 items by work type; courses as one item on a subdomain | TheBasics 14/1.1 (one paragraph) | 9.9–20.2 MB |

**Speculation for the merger and creative-director (not claims):** the client is a one-founder, multi-offer practice like Reuta and Shelly. Their pattern (founder plus role on the first screen; offers grouped by type, each with its own block and CTA; content such as the podcast as a separate group) is the closest structural precedent for "smartly divided". Their weak points (contact only at the page end, a loader instead of a sentence, popups) are where a new site can visibly beat them. Reuta's always-visible call pill is the one first-screen contact pattern in the set, and it would need a WhatsApp variant to match C-sites-04/05.

