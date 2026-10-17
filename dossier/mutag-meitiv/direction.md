---
node: direction
role: merger
run: 2026-10-il-brand-01
status: complete
---

# direction.md — מותג מיטיב (Mutag Meitiv), for gate b′

Built from `brief/mutag-meitiv/brief.md` (items 1–14) and `dossier/mutag-meitiv/industry/industry.md`. Claim IDs point to `industry/skeptic.md`; only surviving claims are cited, in their narrowed form.

## The brief, in our words

Mutag Meitiv is Hadas Drachli's brand-development practice for purpose-driven businesses and people. The client wants a complete redesign of mutagmeitiv.com (3). It should look contemporary, pleasant and exciting, with motion, mini animations and interaction (4). Navigation and calls to action must be clear (5). The greens and the brand icon stay (6). The feel is clean, tidy and airy (7), the text readable and not crammed (8), and the content informative but not overwhelming, smartly divided (9). The result must look professionally designed (10). Content comes from the current site (1). Hosting is fully self-hosted with the CMS included, and nothing stays with Oneshot (2, `self_hosted_docker`). The site is Hebrew only, RTL, with no English pages (11). The two leading services are personal branding and strategic planning (12). Prices, where shown, are in ILS (13). The proposal page is in Hebrew (14).

## Positioning

- **One provider for personal branding and strategic brand planning, for purpose-driven owners.** Nobody else in the Israeli set offers both from one purpose-positioned practice. Coaches sell personal branding as career strategy with no impact angle. DoGood, the only purpose-only studio, serves organisations, not people. (C-players-03, C-players-05, C-players-06)
- **A named, certified method.** Hadas is the only Brand the Change trainer listed for Israel, and no Israeli competitor opened cites an outside purpose method. This is the hardest proof the client has. (C-players-07, C-position-10)
- **Avoid the crowded claim.** "Branding and websites for nonprofits and businesses" is what every Israeli studio says. (C-players-02)
- **Purpose as a concrete benefit, backed by proof, not adjectives.** Consumers now rank "me" benefits above "help me do good", and 60 % doubt green messaging. Say what the client's own clients get, and show who says so. (C-industry-09, C-industry-10)

## Audience

- **First screen: the purpose-driven owner or solo professional** who wants a brand and a strategy for work with meaning. This is the client's own stated buyer, not independently measured. (C-audience-04)
- **Likely price-sensitive.** Most self-employed Israeli women run one-person businesses on a 2023 median of ₪5,251 a month, and free or subsidised advice is searched for. A low-commitment first step fits. The client already offers a free intro call. (C-audience-06, C-audience-10, C-position-02)
- **Second path, "for organisations":** amutot (they search "מיתוג עמותה", "מיתוג לעמותות"), public bodies, and organisations booking talks (they search by format: "הרצאות לארגונים", "סדנה לצוות"). (C-audience-11, C-audience-12, C-audience-13)
- **Search words for the leading services must be qualified.** Bare "מיתוג אישי" means personalised merchandise in Hebrew search, and "תכנון אסטרטגי" means municipal planning. Use "מיתוג אישי לעסק" / "בניית מותג אישי" and "בניית אסטרטגיה עסקית" / "חברת מיתוג ואסטרטגיה". (C-audience-01, C-audience-02, C-audience-03)

## What the site must do

| # | Must do | Brief | Claims |
|---|---|---|---|
| 1 | Carry over only live content: the 8 menu pages, testimonials, logos, the podcast and selected posts. Drop the at least 9 stale, empty or template pages and merge the 3 duplicate pairs. Redirect old URLs that Google has indexed (e.g. `/newcourse`). | 1 | C-position-01, C-position-05, C-position-06 |
| 2 | Single-tenant Payload, editable by the owner: offers with dates, status and price, so a finished workshop can be hidden instead of left stale. Handed over in full; no Oneshot access after hand-off. | 2 | C-position-04, C-position-05 |
| 3 | A visibly new design that beats the current site side by side. The first screen is one short position sentence that names what she does, not a services list. | 3, 10 | C-sites-01 |
| 4 | Motion from low-byte patterns: a floating pill nav, a scroll-lit list (e.g. the method's stages), small reveals, hover and tap feedback at 100–500 ms. No scroll-jacking, smooth-scroll video reels, intro loaders or pop-ups. Motion is mirrored for RTL (forward = left). Reduced-motion is honoured. First load stays within the playbook's 1.5 MB. | 4 | C-sites-09, C-sites-11, C-sites-12, C-sites-21, C-sites-22 |
| 5 | Clear navigation: 4–7 top-level items whose labels name the services ("מיתוג אישי", "אסטרטגיה", not "פיתוח עסק עם משמעות" / "תהליך המיתוג"). No orphan pages. | 5 | C-sites-03, C-sites-18, C-position-01, C-position-02, C-position-03 |
| 6 | One primary action, visible on the first mobile screen and persistent. All four Israeli studio sites in the sample put a contact action there; the current site has five competing routes. Which channel leads is an open question (Q4). Each service block ends in its own CTA. | 5 | C-sites-04, C-sites-05, C-sites-17, C-sites-18, C-position-15 |
| 7 | Keep the leading greens and the brand icon. The harvester takes the logo files from the current site. | 6 | — |
| 8 | Airy layout: short blocks and plenty of space instead of the current long single paragraphs, and fewer home sections than today's ~12. | 7, 9 | C-position-03 |
| 9 | Readable Hebrew: mobile body at about 18 px with 1.5–1.7 leading (the small Hebrew practices run 18–20 px; two studios run 14 px, which reads cramped). A Hebrew-designed type family. Latin only for names and terms. | 8 | C-sites-10, C-sites-20, C-sites-11 |
| 10 | Smartly divided: the two leading services first, each with its own block or page, its own proof and its own CTA. Secondary offers grouped by type (talks and workshops for organisations, courses). The podcast, blog and newsletter go in a separate content group, never the lead. The method is described once, consistently. | 9, 12 | C-sites-18, C-sites-19, C-position-03, C-position-10 |
| 11 | Proof sits next to the services, not scattered: the BTC credential, testimonials, the logo strip, and the award once it is named. Work shown as tiles only if the client supplies projects. | 9, 10 | C-sites-02, C-sites-08, C-position-07, C-position-08, C-position-09, C-players-07 |
| 12 | Professional basics: a Hebrew `<title>` and meta description per page, one real `<h1>`, the site name consistent, and a current footer year. An accessibility statement page with no overlay plugin (WCAG 2.1 AA floor). | 10 | C-position-14, C-sites-14 |
| 13 | Hebrew only, `lang="he"` `dir="rtl"`, no English pages and no language switch. English badges ("1st PLACE", "ON AIR") are rendered in Hebrew. English testimonials need a decision (Q11). | 11 | C-position-09, C-players-11 |
| 14 | Name the leading services in their qualified search forms, in headings and titles. | 12 | C-audience-01, C-audience-02, C-audience-03 |
| 15 | Prices in one format: "₪", with VAT stated the same way every time, and one current price per offer. | 13 | C-position-04 |
| 16 | The proposal page is in Hebrew. This is the writer's job at station 9, not part of the site. | 14 | — |

Delivery note for the deployer, not a site feature: the content schema today only allows `LKR | USD | EUR` and requires `en` in `languages`. ILS and Hebrew-only need a schema proposal before the build (see `proposals/2026-10-il-brand-01/001-vertical-brand_design.md`).

## Page-archetype hints

For the creative-director (station 4d). These are hints, not a sitemap.

- **Home.**
  - First screen: the position sentence, Hadas's face (four of six small Hebrew practices show the founder on screen 1 or 2), the greens and the icon, and the primary action. (C-sites-01, C-sites-16)
  - Then the two leading services as two large blocks.
  - Then the method as 3–4 short named stages with scroll-lit motion. (C-sites-07, C-sites-12)
  - Then proof, the "for organisations" path, the latest from the podcast and blog, and the newsletter in the footer. (C-sites-06, C-sites-19)
- **Personal branding** and **Strategic planning**, one page each: who it is for, the stages, how many meetings, the testimonials that belong to it, the price if the client wants one shown, and its own CTA. These are client situations, not a capability list. (C-sites-03, C-position-02, C-position-03)
- **For organisations** ("לארגונים"): talks and workshops by format and audience, plus branding for amutot and public bodies. Lead with "הרצאות וסדנאות לארגונים" before the topic. (C-audience-11, C-audience-13)
- **Courses and workshops:** a CMS list with dates and status. Ended items are hidden. (C-position-05)
- **Content:** the podcast with all 23 episodes from the feed, the blog, and the newsletter. (C-position-11, C-position-12)
- **About:** the founder story, the BTC credential, the award (once verified), and collaborators (if permitted).
- **Contact** and **accessibility statement.** (C-sites-14)
- **Do not:**
  - cover the first screen with a cookie banner, a loader or a pop-up (C-sites-13, C-sites-22);
  - show a dialled number that differs from the one displayed (C-sites-22);
  - use a full-width video reel (C-sites-09).

## Open questions for the client

From the plan (still open):
1. **Deadline.**
2. **Budget band.** None goes on the proposal page.
3. **Sites or styles you like or dislike.** Candidates to react to include Futerra's colour-coded divisions, Mother's scroll-lit list, NotFromHere's light Hebrew page and Reuta's offer split. (C-sites-03, C-sites-12, C-sites-09, C-sites-18)
4. **Primary call to action:** WhatsApp, phone, the free intro call (Calendly), or the contact form? Today there are five routes; the Hebrew studios sampled offer phone and/or WhatsApp, the international ones email. (C-position-15, C-sites-04, C-sites-05)
5. **The award:** name, year, organiser and project. Was it the studio or Dana Russo? Brand Academy runs the Israel Brand Award and had a nonprofits category in 2024; is that the one? Is there a link? (C-position-07, C-players-08)
6. **Collaborators** (Tamar Drachli, Yael Shachar, Dana Russo, Lior Orsini Yaish): still current? May the site name them with photos and bios?
7. **Which secondary offers stay**, and which run again with dates and prices: the BRANDS OF CHANGE lecture, the BTC professional course, the change-makers' course, the therapists' retreat, THE BETTER 4 / SMST, Brand & Breakfast, community meetups, the free intro workshop, and the personal-branding group course. (C-position-04, C-position-05)
8. **The method:** are the 3 stages on `/process` and the 4 stages on `/personal101` one method or two products? Which reach figure for Brand the Change is right: 5 languages / 40+ countries, or 6 / 36? (C-position-03, C-position-10)
9. **Conflicting course prices:** 2,850 ₪ vs 5,200 ₪ + VAT for the professional course, and 2,650 ₪ for the group course. Please give one current price list, and say whether prices include VAT. (C-position-04)
10. **Domain and server:** keep mutagmeitiv.com? Where is the VPS, and who has access for the install?

Raised by the research:

11. **English testimonials** (Julia Dojas, Linda / AMBARTIQUE): translate into Hebrew with the original kept, keep them in English as quotes, or drop them? This bears on "Hebrew only". (C-position-09)
12. **Prices for the two leading services:** show a "from ₪" price, or none? No Israeli studio in the set shows one, and only Fifty & Fifty abroad does. (C-players-04, C-players-10)
13. **Case studies:** can you give 2–3 projects (client, problem, outcome, images)? Strong studio sites lead their proof with work tiles, and the current site has logos only. (C-sites-02, C-position-08)
14. **The logos:** which were paid branding or strategy work, and which were lectures or workshops? May the public bodies (Haifa Municipality, Hof HaCarmel, Kfar Yona, Reichman, Mandel) be presented as clients? (C-position-08, C-audience-12)
15. **Who pays most today** (individuals, impact ventures, amutot, public bodies or lecture bookings), and where do enquiries come from (LinkedIn, referrals, Facebook)? This decides the first screen against the "for organisations" path. (C-audience-04, C-audience-07)
16. **Contact email:** keep Hadas@kapara.com, or move to an address on the brand's own domain? (C-position-15)
17. **Content kept:** the free PDF guide (its sign-up page is orphaned today); the monthly "מיטיב" newsletter (is it still sent?); all 66 blog posts or a selection. (C-position-12, C-position-16)
18. **Photos and video:** do you have recent professional photos of yourself, of workshops, or any video? The first screen is planned around your face and your strongest media.
