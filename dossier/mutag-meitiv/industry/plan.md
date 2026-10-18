---
node: plan
role: planner
run: 2026-10-il-brand-01
status: complete
---

# plan.md — research plan for מותג מיטיב (Mutag Meitiv), station 2a

## Restated brief

Mutag Meitiv ("brandforthebetter") is an Israeli brand-development practice for purpose-driven brands: businesses, nonprofits and individuals who want to grow while doing social or environmental good. Its current site, https://www.mutagmeitiv.com/, is Hebrew-only (`lang="he"`, hreflang `he-il` only) on Wix. A skim on 2026-10-17 shows these sections: home, about, the branding process (`/process`), "developing a business with meaning" (`/personal101`), training and lectures (`/סדנאות-והרצאות`), courses (`/courses`, `/newcourse`), a podcast (`/podcastbestchapters`), a blog of about 60 posts plus a monthly "מיטיב" newsletter, a team of collaborators (video/AI, photography, nonprofit-branding design, data-driven marketing), one bookable service ("Brand the Change לאנשי מקצוע"), event pages, `/support-us`, and an accessibility statement. Its main proof point is a "1st PLACE — Branding for non profit organizations" badge.

The client asks for (brief.md, items 1–10):

- a complete redesign that is contemporary, pleasant and exciting (3);
- motion, mini animations and interaction (4);
- clear navigation and clear CTAs (5);
- the leading greens and the brand icon kept (6);
- a clean, tidy, airy and pleasant feel (7);
- readable text that is not crammed (8);
- informative but not overwhelming, smartly divided (9);
- a professional result (10).

The content comes from the current site (1). Hosting is fully self-hosted with the CMS included, and nothing stays with Oneshot (2, `self_hosted_docker`).

This research has to give the merger enough to write `direction.md`. That means knowing what this industry is, what the best studio sites in it do (especially navigation, CTAs and restrained motion in RTL), who the client is measured against, where the client stands today, and who buys and how they search, so the direction can turn a broad offer into a site that is "smartly divided".

## Missing information

1. **Deadline.** Not given. Not blocking: it changes scheduling, not research.
2. **Budget band.** Not given. Not blocking. The market pack says no price goes on the pitch for this inbound one-off.
3. **References the client likes or dislikes** (sites, studios, motion styles). Not given. Not blocking: the `sites` and `players` lanes produce candidates the client can react to at gate b′.
4. **Languages beyond Hebrew.** Not given. The blog has some English posts and the title tag is part English. Should the new site have an English version or English pages? Not blocking: research covers both Hebrew and international players either way.
5. **Which services lead, and which are shown at all.** The current site lists personal branding, Brand the Change (strategy and rebrand), training and lectures, courses and workshops, a podcast, a blog and newsletter, events and "support us". Which of these are current, which matter most commercially, and which are retired (for example `/copy-of-*`, `/brandandbreakfast`, `/smst`, `/register`)? Not blocking, but this is the main input to "smartly divided" (brief item 9). The `position` lane maps what exists so the question can be asked precisely.
6. **Prices.** Should course, workshop, lecture or service prices appear on the site, and in ILS? Not blocking.
7. **The primary conversion.** Should the main CTA be a discovery call, WhatsApp, the booking page, course registration or the newsletter? The current site offers all of these. Not blocking: the `sites` lane reports what converts in this space, and the client confirms at b′.
8. **The award and the collaborators.** What exactly is the "1st PLACE" award (name, year, awarding body)? Is the collaborators team current, and may the site name them with photos? Not blocking for research. It is blocking for publishing the claims on the site later (playbook §7).
9. **Domain and the self-hosting target.** Is the domain kept, and where will the client's VPS be? Not research. It is noted here for station 8.

No item is BLOCKING.

## Lanes

### lane: industry
- **Brief:** Describe purpose-driven or impact branding as a service category, in Israel and internationally. Cover what is sold (brand strategy, rebrand, personal branding, workshops, courses, lectures, ESG and impact communication), to whom, in what engagement shapes (project, retainer, cohort course, keynote), and how practices of this size make money. Cover the forces moving the category now: ESG reporting pressure, B Corp growth in Israel, greenwashing scrutiny, the post-war and economic climate for Israeli SMBs and nonprofits, and AI in branding.
- **Success criteria:** A reader can say which 2–4 revenue lines carry a small practice like this, and which offer shapes are standard versus unusual. Every price or market-size figure carries a source and a date.
- **Out of scope:** Named competitors and their sites (`players`), website design patterns (`sites`), and the client's own offer (`position`).
- **Suggested sources:** B Lab and B Corp Israel directories and reports; Israeli impact-economy bodies (Social Finance Israel, the Herzl Forum for social-economic entrepreneurship, which the client's blog cites, JDC/Tevel-type programmes, Midot); the Israeli press in Hebrew (Calcalist, TheMarker, Globes; search terms such as "מיתוג עם משמעות", "מיתוג לעמותות", "אימפקט", "ESG לעסקים קטנים"); international sources (Brand Purpose reports, Kantar or Edelman trust and purpose studies, the Futerra and Wolff Olins point of view pieces); course marketplaces for the price shapes of branding courses in Hebrew.

### lane: sites
- **Brief:** Establish what the best websites of brand studios and consultancies do now. Cover first-screen structure, how a broad multi-service offer is split into navigation, where CTAs sit and what they ask for (call, form, WhatsApp, booking, newsletter), how case studies and process are shown, and how motion and micro-interactions are used without hurting readability or performance. Include how this is done well in Hebrew and RTL: type sizes, line length, mixing in Latin text, and direction in animation.
- **Success criteria:** 8–12 sites described in words (screenshots stay scratch), each with what it does well and its path from first screen to first contact (`tools/funnel.mjs`, depth 1). The lane ends with a short list of patterns that recur across the strong sites, enough to state "sites like this convert by X" as a claim, and with 3–5 named motion patterns the designer can use.
- **Out of scope:** The business models or market share of these studios (`players` and `industry`) and visual taste choices (the designer's `custom.md`).
- **Suggested sources:** Award galleries (Awwwards, CSS Design Awards, Godly, Brand New and the Underconsidered studio lists); the sites of international purpose-led studios (Futerra, Wolff Olins, Mother Design, Koto, Wednesday's "good brands", Forpeople, Pentagram's nonprofit work); strong Hebrew RTL studio sites (Israeli studios found through Awwwards' Israel filter and Hebrew searches such as "סטודיו למיתוג", "משרד מיתוג"); `tools/shoot.mjs` at 1440 and 390, and `tools/funnel.mjs`.

### lane: players
- **Brief:** Identify the client's real competitive set, the people a would-be client in Israel compares them with. These are Israeli branding studios and consultants with an impact, nonprofit or values focus, personal-branding coaches, and branding-course providers in Hebrew. Add 3–5 international purpose-branding studios as the aspiration set. For each player, give the positioning line, the offer list, any visible price, proof (awards, named clients, case studies), content assets (podcast, blog, newsletter, courses), and site language(s).
- **Success criteria:** 6–10 Israeli players and 3–5 international ones in a comparable table. The lane ends with a stated view of what is crowded (claims every studio makes) and what is rare in this set, sourced player by player.
- **Out of scope:** Site design and UX critique (`sites`). Market sizing (`industry`). The client itself (`position`).
- **Suggested sources:** Hebrew Google searches ("מיתוג עמותות", "מיתוג עסקים חברתיים", "מיתוג אישי עם משמעות", "קורס מיתוג", "מיתוג מיטיב"); the winners and juries of the Israeli nonprofit and branding award the client cites (to be identified); B Corp Israel member studios; LinkedIn company pages (public only); Israeli design communities (the Israeli Association of Graphic Designers, Shenkar, HIT and Bezalel alumni showcases); international lists of purpose-driven agencies (B Corp directory filtered to agencies, the Fast Company "Brands That Matter" agencies).

### lane: position
- **Brief:** Establish where the client stands today, from public sources only. Cover what the current site claims and offers, the structure and depth of each page, what proof it shows (the award, collaborators, named clients, testimonials), and its content assets and their freshness (podcast episodes, blog cadence, newsletter). Cover its presence and reviews off-site (Google Business Profile, Facebook, Instagram, LinkedIn, podcast platforms), and what it ranks for in Hebrew search. Judge the current site against the brief's own complaints, which are implied by what the client asks to change.
- **Success criteria:** A page and offer map of the current site with live, stale or duplicate status per page. A proof inventory with sources. A short gap list in which each gap is tied to a brief item (1–10). Enough to ask the client the "which services lead" question (missing information 5) as a precise list.
- **Out of scope:** Collecting media and copy for the build (the harvester's job, station 3). Competitors (`players`). Generic best practice (`sites`).
- **Suggested sources:** https://www.mutagmeitiv.com/ and its sitemaps (pages, blog-posts, booking-services, event-pages); the podcast's listing on Spotify and Apple; public social profiles linked from the site; a Google search for the brand name in Hebrew and English; Google Business Profile if one exists.

### lane: audience
- **Brief:** Establish who buys purpose-driven branding in Israel and how they look for it. Cover segments (social entrepreneurs, nonprofits and amutot, SMBs adding impact or ESG, professionals doing personal branding, organisations booking lectures or team training), what triggers a purchase, who decides, and what they fear (greenwashing, cost, "fluff"). Cover the Hebrew terms they search with and the questions they ask, and which channels bring them (Google, LinkedIn, Facebook groups, podcasts, referrals, accelerators).
- **Success criteria:** 3–5 segments, each with a sourced trigger and the search terms or questions it uses (Hebrew with an English gloss). Signs of willingness to pay are kept separate from statements of need. The lane ends with which segment the site's first screen should speak to, as a handoff note rather than a claim.
- **Out of scope:** Competitor offers (`players`). Market size and revenue models (`industry`). Site patterns (`sites`).
- **Suggested sources:** Google autocomplete, People Also Ask and Google Trends for Hebrew terms ("מיתוג לעמותה", "מיתוג אישי", "אסטרטגיית מותג", "ריברנדינג", "הרצאה על אימפקט", "ESG לעסק קטן"); public Israeli Facebook and LinkedIn groups for social entrepreneurs and nonprofit managers (read-only, public posts); Israeli nonprofit-sector reports (GuideStar Israel, Midot, the Registrar of Amutot statistics); accelerator programmes for impact ventures in Israel; the client's own blog comments and podcast reviews where public.

## Not investigating

- **Visual identity choices.** The greens and the brand icon are kept by the client's instruction (brief item 6). We do not research colour or logo alternatives.
- **Hosting, CMS and the self-hosted stack.** These are fixed by the brief (item 2) and the architecture (PLAN.md). They are delivery work, not research.
- **Harvesting copy, photos, video and blog content** from the current site. That is station 3 (the harvester). The `position` lane maps it only.
- **SEO and AI-search optimisation** beyond the audience's search terms. Those are the seo and aiseo agents' jobs after the build.
- **Pricing advice for the client's services.** Not asked. Observed competitor prices are recorded in `players` only as context.
- **Other languages and markets** (Arabic, Russian, diaspora English audiences). Not asked. This is revisited only if the client answers missing information 4.
- **Wix migration mechanics** (redirects, blog export). These are build and delivery tasks, noted for the harvester and deployer.
