# brief/talouloren/brief.md — the client's brief (station 1, inbound)

Client: TalouLoren (talouloren.com) — Tal Oren's brand business, now a two-partner studio with Shahar Naor.
Relayed by Shahar in session, 2026-11-02: "Start a new custom project, a joint project of Tal Oren and myself.
We aim at a new website." The brief below is the summary of the partners' planning conversation, attached
verbatim.

## Answers (Shahar, 2026-11-02, at the brief)

| # | Answer |
|---|---|
| A1 | Research: a light analyst pass (2–3 lanes), both gates a′ and b′ as usual, despite the brief's "skip discovery" |
| A2 | Run 2026-10-il-brand-01 stays active beside this run; sessions set `ONESHOT_RUN` |
| A3 | Photos before the shoot: harvest from the old talouloren.com, shaharnaor.com and Behance; replaced after the shoot |
| A4 | Proof wall: logos are fine; permissions are in hand |

## Answers (Shahar, 2026-11-02, at gate a′), verbatim in substance

| # | Answer | plan.md question |
|---|---|---|
| A5 | Copy is written from scratch, in Hebrew (English written after, to match); the working copy files are not used | 1 |
| A6 | Look: "The look of both current sites is nice" (talouloren.com, shaharnaor.com). Dark, heavily black and white, touches of a single leading colour, super high end | 2 |
| A7 | References: igloo.inc (animated scroll, frost, colour effects); ritzcarlton.com (clean structure, like current talouloren.com); porsche.com/international (clean, highly visual, light to dark on scroll); brionycroft.com.au (parallax + video, immersive); niniaazzopardi.com (simplified version of the aim: simple, clear, interactive, a little video scrolling); ashcroftlawfirm.com (luxury, clear, palette); steelwavellc.com/portfolio (flowing, unique, high end); amuse-bouche.pt (clean, immersive, tells a story, animated) | 2 |
| A8 | Videos are arranged on talouloren.com: list every video link by its list there (case studies, testimonials, vlog, …); Shahar gets the files or says how to access them | 3 |
| A9 | Socials: Instagram @talou_loren, YouTube @taloulorensuccess, LinkedIn talouloren (also in the talouloren.com footer); Shahar's links are on shaharnaor.com | 4 |
| A10 | Booking, payment, forms and the Check backend: mocked up only. First a few concepts, then the partners decide and the build is completed | 5 |

| A11 | The new site does NOT replace talouloren.com: it is a parallel venue. No redirects from the old site; the old site stays up. Domain for the new site: not decided | at gate b′ |
| A12 | Hebrew term change: "פגישת בהירות" → "פגישת ייעוץ" (English stays "Clarity Session" until Shahar says otherwise) | at gate b′ |
| A13 | Hebrew terms: `brief/talouloren/copy-terms.json` (Shahar's file, prototype strings + saved edits, he + en), with A12 applied. Its `term.*` keys are the fixed names; the rest is reference — copy is still written from scratch in Hebrew (A5) | at gate b′ |

| A14 | Domain: undecided; temp name `talouloren-studio` (preview `talouloren-studio.os1.workers.dev`) | at gate b′ |
| A15 | English keeps "Clarity Session"; only the Hebrew changes (A12) | at gate b′ |
| A16 | Accent: keep the old gold (#f3b614, metallic gradient) as the one leading colour | direction Q1 |
| A17 | Motion: light techniques are fine (small shader or video loop, CSS scroll effects), not a full 3D scene | direction Q2 |
| A18 | Sarit Hadad and Didi Harari: leave out. Assumed: the old written quotes (Olman, Rita, Naftali, Raziel, Yadlin) are also left out until Shahar says otherwise | direction Q3 |
| A19 | Old case studies (Wella, Eugene Perma, CK, Visa Cal, Rita, Doron Shefer, AMT): use them on /work (stories only; no figures beyond the brief's) | direction Q4 |
| A20 | Channel films (Maccabi, Amdocs, Taboola, Kornit, Bezeq, Clalit, SEAT, Philip Morris): all may go live; placement is ours | direction Q5 |
| A21 | No vlog series; existing videos may be used wherever useful | direction Q6 |
| A22 | Name spelling in logo and titles: "Talou L'oren" | direction Q7 |
| A23 | Contact: tal@talouloren.com and 050-463-5536 are correct; no street address on the site | direction Q8 |
| A24 | Old WordPress stays up; Shahar wants help removing the 2022 hack (spam posts, categories, author niso, /temp/) — outside this run's site work | direction Q9 |
| A25 | Free intake name in Hebrew: "בדיקה ללא תשלום" (replaces "בדיקה ממוקדת"); English name assumed "Free Check" until Shahar says otherwise | copy Q1, 2026-11-02 |
| A26 | Undecided values (prices, session length, Partnership capacity, budget ranges, snapshot turnaround) stay visible placeholders | copy Q2 |
| A27 | Keep the Home logo wall (track record across huge and small companies and individuals) and keep the /course pain line; the /work opening must not undercut the logo wall | copy Q3 |
| A28 | Testimonials without a confirmed name are captioned "ישראל ישראלי" (partners edit later); partners are "טל אורן" and "שחר נאור" | copy Q4 |

Note: A4 overrides the brief's "No client logo or case without written permission" for the logo wall.

---

# TalouLoren — OneShot Brief

Nov 2, 2026 · @Shahar

## How to use this brief

This is the full input for a OneShot run on **TalouLoren**, a client we already know rather than one found by scraping. Skip discovery; start at design and build.

**Inputs OneShot receives**

| Input | What it is | Role |
| --- | --- | --- |
| This brief | Business, offer, site spec, copy direction, rules | Single source for the run |
| Structure prototype | [claude.ai/artifact/RzDsTgAmCDkqcGB39vUnrq](https://claude.ai/artifact/RzDsTgAmCDkqcGB39vUnrq) | Reference for page order and flows, not for look or wording |
| Venture plan | [claude.ai/artifact/VaWZaBRXdGuKyY521R6jSy](https://claude.ai/artifact/VaWZaBRXdGuKyY521R6jSy) | Background reasoning, funnel, automation |

**Rules for the run**

1. Hebrew is the primary language, right to left. Set both `direction: rtl` and `text-align: right`. English is a full second language with a toggle.
2. OneShot writes all site copy itself, following section 7. Use the fixed offer names and approved lines exactly; everything else is OneShot's to write.
3. The prototype fixes structure only. All visual decisions are open to the Designer agent within section 8.
4. Produce the usual three mockups (calm, interactive, unique) for a human pick before the full build.
5. Nothing in section 11's do-not-claim list may appear on the site.

## The enterprise

**TalouLoren** is Tal Oren's brand business, taking a new form as a two-partner studio with Shahar Naor. The name stays TalouLoren; the site replaces the current talouloren.com on the same domain.

**What it does:** finds the story only the client can tell, builds what makes it visible, and stays beside the client until it works.

| Element | Decided |
| --- | --- |
| Tagline | Success is Beautiful (kept in English in both languages) |
| Brand idea | Flip the spotlight: owners feel like a deer in the headlights; the light turns to land on them |
| Promise ladder | Clarity, movement, attention, attraction, awareness |
| Hebrew hero (saved edit) | אתם טובים במה שאתם עושים. הגיע הזמן שיראו אתכם. |

**Voice.** Warm, calm, confident, direct. Plural or gender-neutral address in Hebrew (אתם). No hype, no promised multiples, no exclamation marks. Keep Tal's "you are not alone" warmth; drop the 2020 sales register of the old site.

## Partners and proof

### The two partners

|  | Tal Oren | Shahar Naor |
| --- | --- | --- |
| Role | Brand strategist and business mentor | Designer, developer and product strategist |
| Background | 10+ years building and launching brands with leadership teams and with one-person businesses. Creator of the BRAND YOURSELF course and its 10-step method | Two decades in design, motion, development and strategy. Co-ran Kapara studio for 12 years; founded ad-tech startup Cronus Media; advisor and hands-on partner to startups; builds AI tools |
| Brings | Story, strategy, mentoring, production | Identity, web, product, motion, AI automation |

The team and trusted providers are **not** featured on the site for now.

### Confirmed cases

| Client | What was done | Proof form |
| --- | --- | --- |
| Amdocs (27,000 employees) | Embedded the value of innovation in the organisation | Case story to be written |
| Maccabi Healthcare | Helped take a step affecting 3 million people | Case story to be written |
| Seat | Sold a car online for the first time | Case story to be written |
| Park Bavli (Yitzhak Tshuva) | Helped the project sell faster | Case story to be written |
| Dozens of owner-led businesses | Sales improved by hundreds of percent | Video testimonials |
| BRAND YOURSELF course | Over 1,000 buyers | A few video testimonials |

### Names for the proof wall

Brands: Mercedes, L'Oréal, Wella, Amdocs, Maccabi, Clalit, Coca-Cola, NBC, IDC, Bezeq, Cal, Mizrahi-Tefahot, Philip Morris, Osem, Castro, Seat, Fashion Week. Sectors: banking, hospitality, travel, crypto.

People: Conan O'Brien, Yitzhak Tshuva, Gil Shwed, Rita, Alon Ulman, Doron Sheffer, Shaul Naftali, Dr Osnat Raziel, Rotem Yadlin.

The NBC credit is Shahar's animation of *Pale Force* for Late Night with Conan O'Brien; word it that way.

### Media assets

Many client video testimonials exist and are the main proof asset. None are delivered yet; build video slots that take an embed URL and a poster image.

## Audience and pains

Marketing leads with owner-led businesses (first four rows). Larger brands get their own page and direct outreach.

| Segment | Where they are | First step on the site | Likely path |
| --- | --- | --- | --- |
| Solo owner or freelancer | Skilled, invisible, selling on referrals | Focused Check | Story Sprint or course |
| New business | Idea or fresh registration, no presence | Focused Check | Launch Build |
| Small business, 2–20 people | Working but plateaued | Clarity Session | Partnership |
| Small to medium business | Has marketing, lacks story and system | Clarity Session | Partnership |
| Larger brand or team | Budget and agencies, a specific gap | Brands page contact form | Scoped project |
| Personal brand or talent | Known in a niche, wants to break out | Clarity Session | Story Sprint, then Partnership |

**Pains the site must name** (they open the Home page as the "mirror" section):

- Stuck in a loop: every month looks like the last
- A glass ceiling they can feel but not name
- Fear of the first step, or not knowing it
- Loneliness: nobody else sees the whole picture of the business
- AI everywhere, and the owner frozen like a deer in the headlights

## Offer

One method (Tal's ten steps), two doors in, one flagship. Prices are **not decided**; every price is a placeholder.

### Two doors

|  | Story (סיפור) | Launch (השקה) |
| --- | --- | --- |
| For | Businesses and people who exist, online or not, and can't say what makes them different | New or relaunching businesses that need the whole path in order |
| Delivers | Brand DNA, five values, core story, messaging, visual language, one hero piece of content | All of Story plus strategy, identity, website, funnel, launch content, first campaign |
| Method steps | 1–7 | 1–10 |

### Ladder

| Step | Offer (Hebrew) | Format | Price |
| --- | --- | --- | --- |
| 0 | Focused Check (בדיקה ממוקדת) | Free 10-question intake, personal snapshot | Free |
| 1 | Clarity Session (פגישת בהירות) | Paid, both partners, written action plan; fee credited if they continue | `{price_session}` |
| 2 | Story Sprint (ספרינט סיפור) | 2–4 weeks, fixed scope | Open |
| 3 | Launch Build (בניית השקה) | 6–10 weeks, fixed scope | Open |
| 4 | **Partnership (שותפות), flagship** | 3–6 months, weekly meeting with both partners, tailored system for marketing, sales and operations | Open |
| DIY | BRAND YOURSELF course | 10 recorded lessons, self-paced | `{course_price}` |

**Craft services**, available at any step: branding, web, strategy, marketing, visual content, production, graphic design, copywriting, creative direction.

### The method (Tal's ten steps)

1. Me, the brand, the entrepreneur
2. The product shelf
3. My DNA
4. The DNA of my best clients
5. Know, like, trust: the client journey
6. The five brand values
7. Branding and visual branding
8. Funnel and digital strategy
9. The financial model
10. Mindset

## Site spec

The site's one job: get a qualified visitor into the Focused Check or a booked Clarity Session. Every page ends in one of those two actions.

### Sitemap

| Route | Page | Ends with |
| --- | --- | --- |
| `/` | Home | Focused Check |
| `/story` | Story | Focused Check |
| `/launch` | Launch | Focused Check |
| `/partnership` | Partnership (flagship) | Book a Clarity Session |
| `/work` | Work: cases and testimonial videos | Book a Clarity Session |
| `/about` | About Tal and Shahar | Book a Clarity Session |
| `/brands` | For brands and teams | Contact form |
| `/watch` | Video library, six series | Focused Check |
| `/course` | BRAND YOURSELF | Buy |
| `/check` | Focused Check intake | Submit |
| `/thanks` | Check thank-you | Videos |
| `/snapshot` | Personal snapshot result | Book a Clarity Session |
| `/book` | Booking and payment | Pay and confirm |
| `/booked` | Booking confirmation | Home |
| `/privacy`, `/accessibility` | Legal pages | None |
| 404 | Not found | Home |

Global on every page: header nav, language toggle, header button to the Check, footer with newsletter sign-up, WhatsApp click-to-chat.

### Home page, in order

1. Hero: eyebrow, headline, subtitle, two door buttons (Story / Launch), 30-second film slot of both partners
2. Mirror: the five pains
3. The flip: the light turns; the five-word promise ladder
4. Two doors: Story and Launch cards
5. How it works: Check → Session → your path
6. Proof: three stats (27,000 / 3 million / 1,000+) and the names wall
7. Case cards: Amdocs, Maccabi, Seat, Park Bavli
8. The two partners
9. Partnership band
10. FAQ, six questions
11. Final call to the Check

### Focused Check flow

Ten questions, one per screen, with progress, Back and Next, then contact details and consent.

| # | Question | Input |
| --- | --- | --- |
| 1 | Business name, field, years active | Text |
| 2 | Website and social links, or "none yet" | Text area plus checkbox |
| 3 | Team size | Single choice, 4 options |
| 4 | Best client | Text area |
| 5 | What they sell, main offer | Text area |
| 6 | What makes them different, one sentence | Text, optional |
| 7 | Stage: not started / invisible / stuck / growing | Single choice |
| 8 | What they've tried | Multiple choice, 5 options |
| 9 | Success in six months | Text area |
| 10 | Budget range and start time | Placeholder ranges plus single choice |
| — | Name, email, phone, consent | Required |

**Snapshot page:** business name as title; scores 1–5 on Story, Audience, Offer, Visibility, System; three personal observations; a first move; a recommended path (course, Story Sprint, Launch Build, Partnership or a craft service); "Reviewed by {partner\_name}"; button to book. In production the snapshot is produced by the automated scan plus partner approval (section 10); the site only renders it.

### Booking

Session length, price and credit note from placeholders; pick a time slot; name, email, phone; pay; confirmation page plus email and WhatsApp confirmation.

### Other functional requirements

- Work page filter: All / Organisations / Entrepreneurs / Brands
- Case pages with three sections: where they were, what we did, what changed
- Video slots everywhere take an embed URL plus poster
- Brands page form: name, company, role, email, phone, need
- Old talouloren.com URLs redirect to the new pages

## Copy direction

OneShot writes every string on the site, Hebrew first, then English written to match (not translated word for word).

### Fixed names

Use these exactly, in both languages.

| Thing | Hebrew | English |
| --- | --- | --- |
| Tagline | Success is Beautiful | Success is Beautiful |
| Free intake | בדיקה ממוקדת | Focused Check |
| Paid first meeting | פגישת בהירות | Clarity Session |
| 2–4 week package | ספרינט סיפור | Story Sprint |
| 6–10 week package | בניית השקה | Launch Build |
| Flagship | שותפות | Partnership |
| Service tracks | סיפור / השקה | Story / Launch |
| Course | BRAND YOURSELF | BRAND YOURSELF |

### Approved lines

The partners wrote these; keep them.

- Hero headline: אתם טובים במה שאתם עושים. הגיע הזמן שיראו אתכם.
- Hero subtitle: אנחנו מוצאים את הסיפור שרק אתם יכולים לספר, בונים את מה שהופך אותו לנראה וממגנט לקוחות, ונשארים לצדכם עד שזה עובד.
- Hero eyebrow: Success is Beautiful

### Rules

- Address readers in the plural (אתם) or gender-neutrally; never masculine singular
- Warm, calm, confident, direct; no hype, no exclamation marks, no promised returns
- Short headlines; one idea per section
- Every page names its pain before its solution, and ends with one of the two calls to action
- Undecided values (prices, session length, budget ranges, capacity, turnaround) appear as visible placeholders, never invented numbers

## Brand and design inputs

Design has **not** started. The partners have worked only on structure and wording, on purpose. The Designer agent has a free hand within these inputs.

| Input | Status |
| --- | --- |
| Tagline "Success is Beautiful" | Decided |
| Spotlight idea: light turning from glare onto the client | Proposed brand concept; a design direction, not a requirement |
| Gold signature accent from the old talouloren.com | Suggested, for continuity with Tal's existing audience |
| Logo, palette, typography | Open; no design system exists |
| Photography and the hero film of both partners | To be shot |
| Motion | Shahar's strength; welcome where it shows craft |

**Constraints.** Right-to-left first and fully mirrored. Works at phone width. Accessible (Israeli accessibility statement required). Hebrew webfonts must be legible at body size. Video-heavy pages must still read without video.

OneShot's standing designer layer (editorial asymmetric grids, kinetic text, canvas or WebGL motion, three mockups) applies, but its surf-hospitality reference sites do not; pick references from personal-brand, consultancy and studio sites instead.

## Tech, hosting and integrations

| Layer | Choice | Note |
| --- | --- | --- |
| Front end | Static Astro build | OneShot standard |
| Hosting | Cloudflare Worker with static assets | OneShot "managed" mode |
| CMS | Shared multi-tenant Payload (Postgres) | Tal must edit cases, videos, FAQ and prices without code |
| Domain | talouloren.com (existing) | Redirect old page URLs |
| Languages | Hebrew default, English toggle | All copy editable per language in the CMS |
| Payments | Cardcom | Already used for the course on the old site |
| Booking | Calendar tool, slots plus payment | Tool not chosen |
| Messaging | WhatsApp Business plus email | Snapshot delivery, follow-ups, booking confirmations (`msg.*` keys) |
| CRM | One pipeline, a stage per ladder step | Tool not chosen |
| Tracking | Tag manager, Meta pixel, LinkedIn tag, per-video UTM links | Judge creatives by Check completions and bookings |
| Check backend | Intake → public-presence scan → rubric scoring → partner approval queue → snapshot | Reuses OneShot's research, scraping and critic agents |

CMS collections to model: pages (by key), cases, testimonials (video URL, poster, client, segment), video series, FAQ, offers and prices, site settings (placeholders).

## Funnel and video hooks

The site is the middle of the funnel. Short videos bring people in; the site converts them.

**Attention** (short vertical videos) → **Interest** (longer videos, Watch page) → **Diagnosis** (Focused Check, snapshot) → **Conversation** (paid Clarity Session) → **Commitment** (Sprint, Build or Partnership) → **Advocacy** (client story filmed, back into Proof).

Leads who finish the Check and don't book get five follow-ups over 14 days by WhatsApp and email.

### Six video series (Watch page)

| Series | Shows |
| --- | --- |
| The Flip | One pain named exactly, then turned around |
| Two Chairs | Tal and Shahar on one question, sometimes disagreeing |
| Boots on the Ground | Real sessions and work in progress |
| Proof | One client, one change |
| Headlights | AI for owners, without the panic |
| In Their Words | Existing testimonials cut to 20–30 seconds |

### What the site needs for this

- Landing routes that accept UTM parameters and pass them into the Check submission
- Watch page grouped by series, each video linking to the Check
- Embedded vertical video that plays well on phones

The full bank of 39 opening hooks is in the venture plan; it is ad material, not site copy.

## Open items and rules

### Not decided

- [ ] All prices: Clarity Session, Story Sprint, Launch Build, Partnership, course
- [ ] Clarity Session length
- [ ] Partnership capacity (how many at once)
- [ ] Budget ranges in Check question 10
- [ ] Snapshot turnaround time
- [ ] Booking tool and CRM
- [ ] Logo, palette, typography
- [ ] Whether the course keeps its workbook, community and monthly live session
- [ ] Consent wording and privacy policy under Israeli law

### Do not claim

- No promised returns or multiples (the old site's 10x–1000x lines are out)
- No Alvaro story (30K to 1M followers, Netflix) until the testimonial is located
- No Teddy Sagi until permission is confirmed
- No figures beyond those in section 3; "hundreds of percent" stays general, unattributed to a named client
- No team or provider names
- No client logo or case without written permission
- NBC: Shahar's Pale Force animation for Late Night with Conan O'Brien, not a branding client

## Data sources

### Public sources

| Source | Used for | Status |
| --- | --- | --- |
| [talouloren.com](https://talouloren.com/) | Pillars, client wall, tone, old site | Read Sept 2026; site frozen at 2021 |
| [Winning Personal Brand](https://talouloren.com/winning-personal-brand/) | Paid 60-minute session (1,000 NIS), for/not-for lists | Read |
| [BRAND YOURSELF course](https://talouloren.com/course/) | Ten-step method, 990 NIS, testimonials | Read |
| [YouTube: Pg30FZFj-Qs](https://www.youtube.com/watch?v=Pg30FZFj-Qs) | Tal on video | Not read; YouTube blocked automated access |
| [YouTube: vWTLRy4CkIg](https://youtu.be/vWTLRy4CkIg) | Tal on video | Not read; same reason |
| [shaharnaor.com](https://shaharnaor.com) | Shahar's positioning line | Read |
| [Behance](https://www.behance.net/shaharnaor) | Kapara, Cronus Media, client list | Read |
| [GitHub](https://github.com/BloodyDeathRoll) | AI products (MegaMind, wtw, RTL tools) | Read |
| [Fiverr interview, 2018](https://community.fiverr.com/public/blogs/logo-design-success-brand-identity-explained) | Shahar's branding philosophy | Read |
| [LinkedIn](https://www.linkedin.com/in/shaharnaor/) | Shahar's career | Not read; LinkedIn blocks automated access |
| [Bluevine 2026 small-business AI report](https://www.bluevine.com/blog/small-business-ai-trends-report-2026) | AI-adoption context for positioning and hooks (US data) | Read |

### Our own working material

| Source | Content |
| --- | --- |
| Partner statements in the planning chat (Sept–Oct 2026) | Services, audience, pains, flagship, client list, confirmed cases, course numbers, name, tagline, check name, decisions on team and prices |
| [Venture plan](https://claude.ai/artifact/VaWZaBRXdGuKyY521R6jSy) | Positioning, offer, website plan, funnel, 39 hooks, automation, roadmap |
| [Translation scaffold](https://claude.ai/artifact/LDrqL6bZfouqcZ5am8EwhG) | English source strings with keys and notes |
| `talouloren-site-copy.md` | English scaffold exported for ChatGPT |
| `talouloren-site-copy-hebrew.md` | ChatGPT Hebrew transcreation, returned by the partners |
| [Structure prototype](https://claude.ai/artifact/RzDsTgAmCDkqcGB39vUnrq) | All pages and flows; partner text edits saved on 5 Oct 2026 |
