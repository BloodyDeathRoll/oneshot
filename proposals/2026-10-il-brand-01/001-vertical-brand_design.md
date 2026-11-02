# 001: The `brand_design` vertical pack (taxonomy, business types, references)

**Pack proposal** from the analyst (merger, station 2b), run 2026-10-il-brand-01, business mutag-meitiv. No `custom.md` is touched. Nothing here is applied until Shahar approves it. The analyst never writes into `verticals/`.

## Why

`verticals/brand_design/taxonomy.md` and `business-types.md` are one-line stubs, and `references.md` does not exist. Proposal 2026-09-globalsurf-02/004 §2 says the merger drafts all three on the first inbound run. Downstream agents (harvester, creative-director, designer, critics) read them as prompt layers from station 3 on. Every factual line below cites a claim from `dossier/mutag-meitiv/industry/skeptic.md` (SURVIVES or WEAKENED, narrowed form).

Scope follows Shahar's answer of 2026-10-17: one `brand_design` vertical, for the current one-off client, to be widened only if more clients fit.

## Changes

1. Replace `verticals/brand_design/taxonomy.md` with draft A.
2. Replace `verticals/brand_design/business-types.md` with draft B.
3. Add `verticals/brand_design/references.md` (draft C), and wire it as `vertical/references.md` for the creative-director and designer, the same way the surf pack would be.
4. **Not in this proposal, flagged for a separate schema proposal:** the content-schema gaps in draft B, "Schema gaps". Draft B adds no field.

---

## Draft A: `verticals/brand_design/taxonomy.md`

```markdown
# verticals/brand_design/taxonomy.md: what counts as in scope for brand-design practices.

Version 0.1 · 2026-10-18 · drafted by the analyst on run 2026-10-il-brand-01 (proposal 001), approved by Shahar.

## In scope

A business whose main income is helping others define or express a brand. Any of:
- brand strategy, positioning, rebrand, or strategic brand planning for organisations;
- visual and verbal identity design;
- personal branding for professionals and owners, sold 1:1 or in groups;
- talks, workshops and courses whose subject is branding, sold to organisations or to individuals.

A practice that also does websites, content or campaigns is in scope when branding or strategy is what it leads with.

## Out of scope

- Marketing-execution agencies whose lead offer is content, campaigns, media buying or fundraising, with brand strategy as one line among many. Example: Israeli nonprofit-only agencies. (C-players-01)
- Career and image coaches who do not sell brand strategy or identity. Personal branding framed only as dress, body language or job search. (C-players-05)
- Merchandise printing. In Hebrew, "מיתוג אישי" also means personalised event products, and those businesses are not this vertical. (C-audience-01)
- Generic web studios, print shops, logo marketplaces.

## Edge cases

- Course providers that teach designers to brand for clients (e.g. Rinat Hadar, Tali Gilad's designer courses) are in scope when the provider is itself a branding practice. (C-players-06)
- A one-founder practice with collaborators is one business, not a studio plus freelancers.
```

## Draft B: `verticals/brand_design/business-types.md`

```markdown
# verticals/brand_design/business-types.md: the type registry for brand-design practices

Version 0.1 · 2026-10-18 · companion to `schemas/site-content.md`. A checklist, not a second schema: nothing here adds a field.

## The types

| `businessType` | What it is | Must have to be buildable | Should have | Modules in play |
|---|---|---|---|---|
| `brand_studio` | A studio or agency selling strategy and identity projects to organisations | `contact`, ≥ 1 `copyBlocks[]` per service (slot `offer`), ≥ 6 `photos[]` of real work | client logos, named testimonials, awards, case studies | shared + `credentials[]` |
| `brand_practice` | A founder-led practice selling 1:1 strategy or personal branding, plus talks, workshops or courses | `contact`, ≥ 1 `copyBlocks[]` per leading service, ≥ 1 photo of the founder | `testimonials[]`, `credentials[]` (a named method or certification), `priceList[]` for courses and workshops, `bookingLinks[]` (an intro-call scheduler) | shared + `credentials[]` |
| `other` | Anything the registry does not cover yet | the core fields only | — | shared |

Mutag Meitiv is a `brand_practice`: two leading 1:1 services (personal branding, strategic planning), with talks, workshops, courses, a podcast and a blog behind them. (C-position-02, C-position-03, C-position-11, C-position-12)

## What the harvester hunts for, per type

- **Both types:**
  - a position line;
  - the services by name;
  - proof with its source: client logos (with alt text), testimonials (verbatim, dated if possible), awards (name, year, organiser), certifications that can be checked off-site;
  - the contact routes the owner actually answers.
  (C-sites-01, C-sites-08, C-position-07, C-position-10, C-position-15)
- **`brand_practice` also:**
  - the founder's photo, because four of six small Hebrew practices show the founder's face on screen 1 or 2 (C-sites-16);
  - the method's steps;
  - offers with their dates and status, so stale ones are not imported (C-position-05);
  - content assets: podcast feed, blog, newsletter (C-sites-19).
- **Prices:** Israeli studios publish no project price. Visible prices sit on courses and workshops (C-players-04). Take what the site shows, with the page it came from. Flag conflicts as a gap, never pick one (C-position-04).

## Schema gaps (for a separate `schemas/site-content.md` proposal; nothing here adds a field)

Found while mapping mutag-meitiv:
1. `priceList[].currency` allows `LKR | USD | EUR`. Needs `ILS`. (brief item 13)
2. `languages` must contain `en`. Needs `he` and Hebrew-only, with RTL direction derived from the locale. (brief item 11)
3. `credentials[]` is a teaching module (surf types). It should be shared, so a certified method can be listed. (C-players-07)
4. `testimonials[].source` lists booking platforms only. Needs `website` (quotes from the business's own site) and probably `linkedin`. (C-position-09)
5. No module for dated offers (courses, workshops, events with date, status, price, sign-up link), so an ended workshop can be hidden. (C-position-05)
6. No module for case studies or work tiles (client, one-line problem or outcome, tags, images). (C-sites-02)
7. No module for client logos (name, image, optional link). (C-position-08, C-sites-08)
8. No module for team or collaborators (name, role, photo, bio). (`playbook.md` §9 lists team members as owner-editable; the schema has no field.)
9. No module for content feeds (podcast episodes from RSS, blog posts). (C-position-11, C-position-12)

## Cross-type rules

1. Proof is evidence. An award is shown only with its name, year and organiser from a source. An unnamed badge is a gap, not a claim. (C-position-07)
2. Logos are not case studies. A logo strip says "worked with" only if the client confirms paid work. (C-position-08, C-audience-12)
3. A type is not a template, as in the surf pack.
```

## Draft C: `verticals/brand_design/references.md`

```markdown
# verticals/brand_design/references.md: curated sites for the creative-director and designer

Captured 2026-10-17/18 by the analyst's `sites` and `players` lanes. Home pages, 390 and 1440 px stills, depth-1 funnel. Motion was never seen moving: it is inferred from stills. Weights come from one unthrottled headless run (load + 4 s) and give an order, not a budget. No conversion data stands behind any of these. They are the structure of strong or comparable sites. (C-sites-09, C-sites-12)

## Large studios: structure and restraint

| Site | What we like | Watch out | Claims |
|---|---|---|---|
| NotFromHere (notfromhere.net), he RTL | A question headline ("מה המהלך הבא של המותג שלכם?", what is your brand's next move?); services × industries in the nav; a big logo wall plus a testimonial carousel; a header phone icon above the fold; mirrored arrows ("לכל העבודות ←", to all work); the lightest page in the set (~1.2 MB) | Body text ~14 px is small for Hebrew; the form at the end has 11 fields | C-sites-01, C-sites-03, C-sites-04, C-sites-08, C-sites-09, C-sites-10, C-sites-11 |
| Futerra (wearefuterra.com) | Purpose-led tone; a broad offer split into four colour-coded divisions; footer-only newsletter; light (~1.7 MB) | The cookie panel covers ~35–40 % of the first mobile screen; email only, no phone | C-sites-03, C-sites-06, C-sites-09, C-sites-13 |
| Mother Design (motherdesign.com) | A sticky wordmark; a 14-item capability list, grey with the item in focus in black (scroll-lit); process as four values | — | C-sites-03, C-sites-07, C-sites-12 |
| Forpeople (forpeople.com) | Projects framed as questions; service labels orbiting on an arc; a persistent bottom pill menu; a B Corp mark | ~8 MB | C-sites-02, C-sites-08, C-sites-12 |
| Collins (wearecollins.com) | Services as 11 named "Programs", each a client situation with a tagline. The model for naming personal branding and strategic planning as situations, not capabilities | Display-size body with tight leading | C-sites-03, C-sites-10 |
| Butcher (butcher.studio), Israeli, English | A 3-step process ("01 Discover / 02 Shape / 03 Deliver"); dense proof (awards, rating, a named client quote); blur-to-focus image reveals | Pattern may be a lazy-load placeholder | C-sites-07, C-sites-08, C-sites-12 |
| Wolff Olins (wolffolins.com) | A one-sentence ambition; work tiles with client, tagline and tags; the header becomes a floating pill on scroll | 20–42 MB class with its video reel; a large cookie panel | C-sites-01, C-sites-02, C-sites-09, C-sites-12, C-sites-13 |
| iDeez (ideez.co.il), he RTL | A single-niche hero; playful, specific CTA pills with a left-pointing circled arrow; a named newsletter | ~7 MB, mostly images | C-sites-01, C-sites-05, C-sites-06, C-sites-11 |

**Do not copy:** Studio Dumbar's scroll-scrubbed video reel with smooth-scroll (GSAP + Lenis). It is the heaviest pattern and conflicts with NN/g's scrolljacking findings. (C-sites-09, C-sites-12)

## Small Hebrew practices: the client's real comparison set

| Site | What we like | Watch out | Claims |
|---|---|---|---|
| DoGood Studio (dogood.studio) | The purpose position line on screen 1 ("מיתוג ודיגיטל לארגונים עם משמעות", branding and digital for organisations with meaning); "תיאום פגישת היכרות" (book an intro meeting) → WhatsApp or a 2-field form; ~1.1 MB | No navigation at all; proof only as a PDF | C-sites-16, C-sites-17, C-sites-21, C-players-03 |
| Reuta Yosef Tzvi (reuta.co.il) | The clearest offer split for a solo multi-offer practice: mentoring tracks / courses / about / content / contact, with the home page in the same order; a floating call pill on every screen | The pill dials a different number than it shows; a lead popup covers the viewport later in the scroll | C-sites-17, C-sites-18, C-sites-19, C-sites-22 |
| Shelly Sever (shellysever.com) | Each offer has its own home section and its own CTA (course, lecture, consulting); the podcast filed under "האזינו" (listen); 18 px body | The first screen is an intro loader plus a cookie banner with no offer text; contact only at the end of 12.9k px | C-sites-16, C-sites-17, C-sites-18, C-sites-20, C-sites-22 |
| Tali Gilad (taligilad.co.il) | A flat 7-item menu by audience; three service blocks each ending in "לכל הפרטים על…" (all the details on…) | The hero sentence is hidden at 390 px; contact only at the page end | C-sites-16, C-sites-17, C-sites-18 |
| Galit Sharon (galit-sharon.co.il) | Founder name + role line first; a short form right under the hero; 20 px / 1.9 body | ~30 menu items | C-sites-16, C-sites-17, C-sites-18, C-sites-20 |

## International purpose studios: proof models

| Site | What we like | Claims |
|---|---|---|
| Fifty & Fifty (fiftyandfifty.org) | A published price band ($15–50k) and timeline; named awards; a podcast and newsletter | C-players-10 |
| Studio J Lorne (jlorne.studio) | Quantified outcomes (50+ brands, 3X average ROI, $50M+ client funding) | C-players-10 |
| Brand the Change (brandthechange.org) | Method-led: canvases, courses, a certified-trainer network. The client's own credential | C-players-07, C-players-10 |

## Rules these references support

- One position sentence first; services from screen 2. (C-sites-01)
- 4–7 top-level nav items; offers grouped by type or audience; one block and one CTA per offer. (C-sites-03, C-sites-18)
- In Israel, a contact action on the first mobile screen. (C-sites-04)
- Hebrew body about 18 px, leading 1.5–1.7; mirrored arrows; RTL-flipped nudges. (C-sites-10, C-sites-11, C-sites-20)
- Motion: pill nav, scroll-lit list, orbiting labels, reveals. No scroll-jacking, no loaders, no pop-ups over the content. (C-sites-12, C-sites-22)
- An accessibility statement page; no overlay plugin as compliance. (C-sites-14)
```

---

## Not changed

- No `custom.md`, no agent `base.md`, no schema file. The schema gaps in draft B need their own proposal before the mutag-meitiv build (station 8).
- `verticals/surf/` is untouched.
- Screenshots behind these references are scratch and are deleted after the merge (`tools/clean-shots.mjs`).

---

## Addendum: run 2026-11-il-brand-02 (talouloren), 2026-11-02

Added by the analyst (merger, station 2b) because `verticals/brand_design/` is still a stub and base.md asks the merger for a pack draft in that case. This proposal is still pending, so the second inbound run adds to it rather than opening a second pack proposal (`dossier/talouloren/industry/plan.md`, missing information 5). Claim IDs below point to `dossier/talouloren/industry/skeptic.md`. Nothing above this line changes.

### To draft B (business types)

- TalouLoren is a `brand_practice` with a studio's craft attached: two named partners, a free diagnostic (the Focused Check) leading to a paid first session, a course, a video library. No new type is proposed. The "Should have" column for `brand_practice` gains, as a hint for the harvester: **a diagnostic or intake flow** and **a video library** (the client's YouTube channel, testimonials, case films). (C-references-11, C-position-16, C-position-17)
- Schema gaps to add to the separate schema proposal (no field added here): a multi-step intake (questions, options, progress) and its result page; testimonials with a video URL and poster; video series. The brief's CMS list names them (`brief/talouloren/brief.md`, "Tech").

### To draft C (references): personal-brand, consultancy and partner-led sites

| Site | What we like | Watch out | Claims |
|---|---|---|---|
| ashcroftlawfirm.com | Named partners as the product: a "LED BY" strip of portraits and titles in the hero; near-black #131313 with one gold; 4.4 MB | Section-snap scrolling fights long pages | C-references-06 |
| brionycroft.com.au | Personal brand, dark, one copper accent, thin display serif, parallax cut-outs, scroll-progress line | 10.9 MB, a 48 s background video | C-references-04, C-references-10 |
| niniaazzopardi.com | Person first ("Hi, I'm Ninia" + portrait), cycling hero line, logo wall second, numbered services | 32.5 MB of images | C-references-05 |
| steelwavellc.com | Outline/fill display type, marquee, custom cursor, Motion reveals at 1.5–2.9 MB | — | C-references-07 |
| porsche.com/international | Light/dark section steps at section edges, no animation library | 10–13 MB of HLS media | C-references-03 |
| rnd.org.il business health check, he RTL | The working model for a Hebrew diagnostic: one question per screen, "1 / 8" counter, gate at the end, score page, one free next step, 1.09 MB | Fear-labelled score band ("מצב קריטי", critical state); the main site's stale countdowns | C-references-11, C-references-27 |
| Porto Rocha, Order | Two-partner studios carrying big names as named project rows with one line each | Founders only in the news feed | C-references-23 |

**Do not copy:** canvas-only text and 17 MB 3D scenes (igloo.inc); preloaders and 30 MB story sites (amuse-bouche.pt); countdowns, outcome percentages and "8-figure" claims (RND home, BBG). (C-references-01, C-references-08, C-references-27)

**Rules these add:** Hebrew diagnostics state cost and payoff on the start screen (C-references-13); forward arrows point left and carousels inherit `rtl` (C-references-20); Hebrew sites in the set publish no `hreflang` and do not isolate Latin words, which a bilingual site must do (C-references-21).
