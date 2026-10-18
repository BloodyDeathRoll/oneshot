**This audit is not a fact source for the site.** Nothing here may appear on the site as content; facts come from `dossier.json` only.

# Funnel audit — מותג מיטיב (mutag-meitiv), run 2026-10-il-brand-01

Auditor 0.1.3 · 2026-10-18T09:55:00Z · scope `site` · https://www.mutagmeitiv.com/

## Measured (tools/funnel.mjs 0.2.0, copied)

`status 200, clicks_to_book 2, primary engine (לקביעת פגישת הכרות), hero -, CTA above fold false, pages 30, broken 9`

Caveat: the tool browses with Chromium's user agent, so Wix served it the 980 px **desktop** page (no WhatsApp, no tel). A phone gets a separate mobile layout with a fixed WhatsApp + email bar on every page. The phone layout was walked by hand: `funnel/walk.mjs` → `funnel/walk/` (`walk-raw.json`, `clicks.json`, screenshots). On a phone the real tap count to WhatsApp is 1, via an unlabelled icon. Funnel numbers above are unchanged.

## Findings (0 high · 9 medium · 7 low)

- **F1 · medium · cta** · pitch — On a phone, WhatsApp is only an unlabelled icon in a bottom bar; nothing in the page itself offers it. The first phone screen shows the greeting, four badges and Hadas's photo; the only labelled action is 'פה יוצרים קשר' in the top corner, which opens a contact form, and WhatsApp is a small unlabelled black icon in a bar at the bottom shared with an email icon. Evidence: `funnel/walk/01-home-fold.png`
- **F2 · medium · cta** · pitch — A desktop visitor has no WhatsApp and no tappable phone link anywhere. On a computer the home page offers 'פה יוצרים קשר' (a form) and Spotify in the header; the WhatsApp the business answers first does not exist, and the phone number in the footer is plain text. Evidence: `funnel/walk/desktop-home-fold.png`
- **F3 · medium · funnel** · pitch — The two leading service pages end in a Calendly button several screens down and never offer WhatsApp. A visitor reading 'פיתוח עסק עם משמעות' (personal branding) reaches its only action, 'לקביעת פגישה' (Calendly), after about six phone screens; on 'תהליך המיתוג' (strategic planning) 'לקביעת פגישת הכרות' is about four screens down; neither page has a WhatsApp or phone action in its body. Evidence: `/ → מיתוג אישי → /personal101 → לקביעת פגישה → https://calendly.com/hadas/30min`
- **F4 · medium · funnel** · pitch — 'Update me about the next course' leads to the payment page of a past 2025 workshop. On the course page 'מעסק למותג מיטיב' the visitor reads 'ההרשמה נסגרה'; its button 'עדכני אותי על הקורס הבא' opens 'MAP YOUR VISION 2025 … תודה שנרשמת! אפשרויות התשלום' with Bit, PayBox and card payment — a different, finished workshop. Evidence: `/newcourse → עדכני אותי על הקורס הבא → /register`
- **F5 · medium · funnel** · pitch — Brand & Breakfast still takes sign-ups for Friday 15.5.26, a date that has passed. The page invites the visitor to 'יום שישי 15.5.26' and ends in a sign-up form ('אני רוצה להבין יותר'); nothing says the date is over or when the next one is. Evidence: `https://www.mutagmeitiv.com/brandandbreakfast`
- **F6 · low · funnel** — Workshop 'הרשמה' buttons open a generic registration lightbox, not a dated booking. Tapping 'הרשמה' or 'ספרי לי עוד' on the lectures and workshops page opens a 'הרשמה' pop-up form (workshop dropdown, name, email, phone, reCAPTCHA); none of the offers carries a date, so the visitor registers interest and waits. Evidence: `/סדנאות-והרצאות → הרשמה → lightbox form`
- **F7 · medium · offer** · pitch — The same offer shows two different prices on two pages. A visitor comparing pages sees the professional Brand the Change course at 5200 ש"ח + מע"מ on the workshops page and 2,850 ₪ on its Wix booking page, and THE BETTER 4 at 480 ש"ח + מע"מ versus 350 ש״ח on /smst. Evidence: `https://www.mutagmeitiv.com/%D7%A1%D7%93%D7%A0%D7%90%D7%95%D7%AA-%D7%95%D7%94%D7%A8%D7%A6%D7%90%D7%95%D7%AA`
- **F8 · low · content** — The menu names neither leading service. A visitor looking for personal branding or strategic planning finds menu items 'פיתוח עסק עם משמעות' and 'תהליך המיתוג'; the words 'מיתוג אישי' and 'תכנון אסטרטגי' appear only on the home cards. The phone menu has no contact item. Evidence: `funnel/walk/click-home-menu.png`
- **F9 · medium · content** · pitch — The blog and its category pages returned server errors during the crawl. Tapping 'בלוג' in the menu showed a white 'ERROR: INTERNAL SERVER ERROR 500 … try again in a few minutes' page; 9 of the 30 crawled pages answered 503 (the blog, 6 category pages, a tag page, a post). The same blog loaded on a later visit. Evidence: `funnel/page-03.png`
- **F10 · medium · mobile** — The phone home page loads about 5.9 MB and paints its largest element after about 3.3 s on an unthrottled connection. On a phone the home page downloads ~5.9 MB before it settles — four times the playbook's first-load budget — and that was measured without throttling. Evidence: `dossier.json#existing_site.measured.mobile`
- **F11 · low · mobile** — A third-party accessibility widget and its button sit over every page. A round accessibility button floats over the content on every page and its panel of 21 controls (Vee) loads with it. Evidence: `funnel/walk/01-home-fold.png`
- **F12 · low · funnel** — A graphic on the desktop course page links to a Wix 404 page. On a computer, the yellow chevron on 'מעסק למותג מיטיב' opens /blank-2, titled '404 Error Page'. Evidence: `funnel/walk/desktop-newcourse-blank2-link.png`
- **F13 · low · trust** — The award badge does not say what it is, and the award text sits in a collaborator's bio. The home hero shows an 'ISRAEL BRAND AWARD 2022' seal with '1st PLACE Branding for non profit organizations' (desktop) and no link; further down the 2022 nonprofit-branding award appears in Dana Russo's team bio, not as the practice's own. Evidence: `funnel/walk/desktop-home-fold.png`
- **F14 · low · trust** — The contact email is on another business's domain and the footer says 2019. The footer of every page gives Hadas@kapara.com and '@2019 This blog was created to be shared'. Evidence: `funnel/walk/01-home-full.png`
- **F15 · low · content** — The home page has no main heading. Screen readers and search engines find no <h1> on the phone home page; the desktop page marks footer labels as <h1>. Evidence: `https://www.mutagmeitiv.com/`
- **F16 · medium · offsite** — From Instagram, the visitor passes through a Linktree that offers no WhatsApp. Instagram's bio link opens a Linktree with the site, Instagram and LinkedIn; to message Hadas the visitor must open the site and find the bottom-bar icon. Evidence: `https://linktr.ee/hadasdrachli_mutagmeitiv`

## Recommended funnel

1. Primary action: **WhatsApp** (`contact.whatsapp` +972546686808 = `dossier.booking.path`), working label “כתבו להדס בוואטסאפ”.
2. Target: 1 tap to WhatsApp from any page (`clicks_to_book: 1`), measured by the critic.
3. The first screen shows Hadas, what + where, and one labelled WhatsApp action. The phone bar is persistent and labelled.
4. Secondary: Calendly free intro call (`services[].bookingUrl`), `contact.phone` as tel:, `contact.email`.
5. Booking section / bar order: what_where → included → price (only where published) → trust → primary_action.
6. Each lead `services[]` row (personal branding, strategic planning) has its own page and ends in its own WhatsApp CTA (`services[].ctaText`).
7. Secondary offers are `services[]` rows in `talks_workshops` / `courses`, with one price each (ILS, `vat`). `status` and `dates[]` hide past runs.
8. Proof sits beside the services: `testimonials[]` (own language), `awards[]` (Brand Academy 2022), `credentials[]`, `clientLogos[]`.
9. Old URLs (`/newcourse`, `/register`, duplicates, blog posts) redirect. There are no dead or Wix-leftover links.
10. Closing intent: invite the purpose-driven owner to a first conversation on WhatsApp and name the free Zoom intro call as the alternative. Off-site: add a WhatsApp link to the Linktree, or point the Instagram bio straight at the new site (F16).

## Not measurable

- reply time on WhatsApp, Calendly or the forms — no contact with the owner from the audit (constraint 10)
- whether the contact, Brand & Breakfast and lightbox registration forms deliver — forms are never submitted
- Calendly's own pages beyond the hand-off (both links answer HTTP 200; dates not opened)
- Google Business Profile — none found by the harvester, Maps not queryable from here (dossier.json#reviews.google)
- Instagram bio link and DM path — logged-out view only; the bio-link target is taken from the dossier
- conversion, traffic or sources — no analytics access
- tools/funnel.mjs on the phone layout — the tool has no user-agent option, so its numbers describe Wix's desktop page at 390 px; the phone layout was measured by hand (funnel/walk.mjs)

Note: during the first walk, the 'אני רוצה להבין יותר' button on /brandandbreakfast was tapped to see where it led. It turned out to be the submit button of an empty form. The form validation blocked it and nothing was sent. That step is not in `walk.mjs`.
