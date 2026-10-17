---
node: lane
role: researcher
run: 2026-10-il-brand-01
lane: sites
status: complete
---

# lane: sites — what the best brand-studio sites do now (mutag-meitiv)

## Summary

Eleven brand-studio sites were opened and measured on 2026-10-17 (7 international: Koto, Wolff Olins, Mother Design, Forpeople, Studio Dumbar, Collins, Futerra; 4 Israeli: Butcher.studio (English), Imaginet, iDeez, NotFromHere (Hebrew RTL)). They recur on the same moves: a short one-sentence position on the first screen, work shown as image tiles with a one-line problem or outcome plus service tags, a small nav of 4–7 items, and a contact action that asks for little. The international studios keep that action out of the first screen. The Israeli studios put "בואו נדבר", phone or WhatsApp on the first screen and end the page with a long form. Motion is used heavily, but the readable sites keep it to reveals, sticky elements and small UI feedback. The heaviest motion (autoplay video reels, smooth-scroll hijacking) comes with mobile first loads of 20–42 MB.

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

## Dead ends

- **futerra.co** is a parked domain (123 Reg holding page), and **futerra.com** redirected to an unrelated company (profileproducts.com). The real site is **wearefuterra.com**, which was measured instead.
- **siyon.co.il** timed out. **almogdvir.co.il** returns a hosting "suspended" page. Both were dropped.
- **Awwwards' Israel filter** could not be reached through search. The Awwwards profile pages found (e.g. Tzlil Yosher) are personal portfolios, not studios. No award-listed Hebrew-language studio site was confirmed. The Israeli award winner found (Butcher.studio) publishes in English only.
- **Material Design bidirectionality pages** (m2 and m3) render client-side and returned no text. skillselion.com's Hebrew RTL guide returned only metadata. rtlstyling.com was used instead.
- **`tools/funnel.mjs` and Hebrew:** `BOOK_WORDS` has no Hebrew, so "בואו נדבר", "צרו קשר" and "לקביעת פגישה" links are not classed as CTAs. iDeez reads as having no action at all, which is wrong (its hero pill is visible in the shot). On Koto the tool reports a "whatsapp" action that is really a project page (`/projects/whatsapp`). Both were corrected by hand in C-sites-04.
- **The reduced-motion check** (scanning stylesheets for `prefers-reduced-motion`) cannot read cross-origin sheets, so it was not used as a claim.
- **Pentagram, Wednesday and Brand New lists** were not covered; 11 sites were enough for the success criteria.

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
