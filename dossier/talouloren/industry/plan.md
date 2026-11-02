---
node: plan
role: planner
run: 2026-11-il-brand-02
status: complete
---

# plan.md — research plan for TalouLoren (talouloren.com), station 2a

## Restated brief

TalouLoren is Tal Oren's brand business, relaunched as a two-partner studio with Shahar Naor (Tal: brand strategy and mentoring, creator of the BRAND YOURSELF course and its ten-step method; Shahar: identity, web, product, motion, AI automation). The new site replaces talouloren.com on the same domain, which has been frozen since 2021. Tagline "Success is Beautiful"; brand idea "flip the spotlight" (the glare that freezes the owner turns to light them up).

The site has one job: get a qualified visitor into the free **Focused Check** (בדיקה ממוקדת, a 10-question intake that returns a personal snapshot) or a booked, paid **Clarity Session** (פגישת בהירות). Behind them: Story Sprint, Launch Build, the flagship Partnership, and the BRAND YOURSELF course. Marketing leads with owner-led businesses (solo, new, 2–20 people, SMB); larger brands get a `/brands` page and a contact form.

Already settled by the brief, and not researched again: offer and ladder, fixed names, approved hero lines, audience segments and pains, sitemap and the Home section order, the Check questions and snapshot, copy rules, the do-not-claim list, the tech stack, and the funnel and video series. Hebrew first and RTL, with a full English second language. Three mockups (calm, interactive, unique) for a human pick. The designer's surf-hospitality references do not apply; references come from personal-brand, consultancy and studio sites.

Shahar's answers at the brief: a light analyst pass of 2–3 lanes, with gates a′ and b′ as usual (A1). Photos come from the old talouloren.com, shaharnaor.com and Behance until the shoot (A3). Logos on the proof wall are allowed and permissions are in hand (A4).

This research has to give the merger two things. First, reference sites and conversion patterns for a free-diagnostic → paid-session funnel in this space, so the creative-director can pick references and the build gets the Check and booking flow right. Second, an exact picture of the client's current public position: what to redirect, what to harvest, what tone to leave behind, and which Hebrew words the audience uses.

## Missing information

1. **The partners' working material.** The brief cites `talouloren-site-copy.md`, `talouloren-site-copy-hebrew.md`, the translation scaffold, the venture plan and the structure prototype (claude.ai artifacts). None of them is on disk in the repo. Should the analyst and copywriter read them, or does brief rule 2 ("OneShot writes all site copy itself") mean they are deliberately set aside? Not blocking for research: the `position` lane works from public sources. It matters at the copy station.
2. **References the partners like or dislike** (sites, studios, people). Not given. Not blocking: the `references` lane produces candidates for the partners to react to at gate b′.
3. **Tal's videos.** The two YouTube videos (Pg30FZFj-Qs, vWTLRy4CkIg) could not be read by automated access. Can Shahar supply the files, transcripts or a channel list, and are there more (Facebook, Instagram)? Not blocking: they inform tone and proof, and the lane records the gap.
4. **Tal's other channels.** Instagram, Facebook, LinkedIn and any Google Business Profile for TalouLoren are not listed in the brief. Not blocking: the `position` lane searches for them and asks only if it finds none.
5. **Vertical pack.** `verticals/brand_design/` is still a stub, pending proposal `2026-10-il-brand-01/001`. Assumed: this run's merger does not write a second pack proposal. If the research adds anything, it goes in as notes for 001. Not blocking.

No item is BLOCKING.

## Lanes

### lane: references
- **Brief:** Find the reference set for this site: personal-brand, consultancy and small (one- to three-partner) studio sites, international and Israeli, with Hebrew/RTL sites especially. Cover how the site presents two named partners as the product and how it carries a big-name proof wall without looking like an agency. Find the strongest examples of a free diagnostic (quiz, scorecard, audit or assessment, one question per screen) that leads to a paid first session or strategy call, and what converts on that path: how the free step is framed, where it sits on the first screen, the question count and progress UI, the result page, and how the paid session is priced, credited and booked. Note how video testimonials and a vertical-video library are shown, and how Hebrew sites handle RTL type, mixed Latin brand names, a language toggle and motion direction.
- **Success criteria:** 8–12 sites described in words (screenshots stay scratch). At least 3 are Hebrew/RTL, and at least 3 run a free-diagnostic → paid-call funnel; for those 3, `tools/funnel.mjs` depth 1 records the taps from the first screen to the first submit or booking. The lane ends with a short list of recurring patterns that are strong enough to state "sites like this convert by X" as claims. It also lists what to avoid: claims and devices every coach site uses (hype, income multiples, countdown timers) that clash with the brief's voice. It names the 3–5 sites the creative-director should treat as the bar.
- **Out of scope:** Business models, market size and pricing advice. The client itself (`position`). Visual taste decisions (the designer's `custom.md`). Building a competitor table of Israeli branding providers: competitors appear here only as references for their sites.
- **Suggested sources:** Award and curation galleries (Awwwards, Godly, One Page Love, Land-book), filtered to studio, consultant and personal-brand sites. Scorecard and quiz-funnel examples (ScoreApp, Typeform and Interact showcases, and consultants known for an "assessment first" funnel). Two-partner and small studios' own sites. Israeli studio and consultant sites found through Hebrew searches ("מיתוג אישי", "אסטרטגיית מותג לעסקים קטנים", "ליווי עסקי ומיתוג", "סטודיו למיתוג", "אבחון עסקי חינם") and the Awwwards Israel filter. `tools/shoot.mjs` at 1440 and 390, and `tools/funnel.mjs`.

### lane: position
- **Brief:** Establish the client's current public position from public sources only. (1) Old talouloren.com: a full URL inventory from the sitemaps and crawl, with each URL marked live, stale, duplicate or retired, and the new route each should redirect to (brief: "Old talouloren.com URLs redirect to the new pages"). Also its offers and prices as published (for example the 60-minute "Winning Personal Brand" session at 1,000 NIS and the course at 990 NIS), its proof (client wall, testimonials, videos), its tone (quoted lines that show the 2020 sales register the brief drops, and lines of the "you are not alone" warmth it keeps), its gold accent, and an inventory of images and video usable until the shoot (A3), with sizes. (2) shaharnaor.com and Behance: positioning line, projects and client credits that support the proof wall (including the NBC *Pale Force* credit), and usable images. (3) Search: what "TalouLoren", "טל אורן" and "Tal Oren" return, any other profiles or reviews, and the Hebrew search terms Israeli owner-led businesses use when they look for branding, strategy or business-mentoring help (autocomplete, People Also Ask, related searches, Trends where available), each with an English gloss.
- **Success criteria:** A redirect table covering every indexed URL of the old site. A proof inventory with a source for each item, cross-checked against the brief's do-not-claim list and flagging anything the old site claims that the new one must not. A tone sample of 5–10 quoted lines with glosses. An asset list with pixel sizes for the harvester. 10–20 Hebrew search terms grouped by intent (branding, personal brand, business mentoring, launching a business, marketing strategy), with evidence each is actually used, and a note on which terms the new pages' titles should carry.
- **Out of scope:** Downloading media and copy for the build (the harvester, station 3); this lane only maps them. Other providers' sites (`references`). Re-deciding the offer or audience.
- **Suggested sources:** https://talouloren.com/ and its sitemaps (`/sitemap.xml`, `/sitemap_index.xml`, `/wp-sitemap.xml`), `/winning-personal-brand/`, `/course/`; the Wayback Machine for URLs no longer linked; https://shaharnaor.com; https://www.behance.net/shaharnaor; public social profiles linked from either site; Google searches in Hebrew and English; Google autocomplete and Trends (geo IL).

## Not investigating

- **The offer, ladder, names, audience, pains, sitemap, Check questions and copy rules.** The brief settles all of these (A1). Research that argues against one goes to the client as an open question, not a change.
- **A third lane on the industry or competitors.** A light pass by A1. The `references` lane covers what competitor sites teach, and the brief already names the market and the client's place in it. A separate industry or players lane would not change the site.
- **Pricing advice.** Every price is a placeholder by the brief. Observed prices are recorded only as context: the old site's in `position`, and any visible session or diagnostic prices in `references`.
- **Tools: booking, CRM, payments (Cardcom), WhatsApp Business, tag manager.** Delivery choices, not research. The booking tool and CRM are the partners' open items.
- **The Check backend** (scan, rubric scoring, approval queue). Built from Oneshot's own agents; that is product work, not research.
- **Israeli privacy and consent law, and the accessibility statement.** The brief lists consent wording as an open item. It needs a legal source or counsel, not a research lane. Flagged for the build.
- **Video hooks and ad creative.** The venture plan's 39 hooks are ad material, not site copy (brief).
- **Hosting, CMS and domain.** Fixed by the brief and the architecture.
