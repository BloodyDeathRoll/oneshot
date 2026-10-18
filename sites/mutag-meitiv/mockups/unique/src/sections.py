# Sections below the stage, exec'd by build.py (same helpers: C, S2, e, P, paras, wa, wa_btn, img, svc, block,
# quotes, social, I, OLD, ORG, CAL, TEL, TEL_SHOW, MAIL, SOC_LABEL). Defines `rest` and `footer`.
# Interface labels (written here, no copy field): "לפרטים", "לפוסט באינסטגרם", "תוכניות קודמות", "מקרה בוחן",
# "דוגמה", "גם לבעלי עסקים ולאנשי מקצוע", "סדנאות פתוחות", "קראו עוד", "באינסטגרם", "מהבלוג", "לבלוג המלא",
# "לקביעת שיחה ביומן", "ניווט", "הצהרת נגישות", unit and VAT words, the price-capture line.

UNIT = {'per_person': 'למשתתף/ת'}
def price(s):
    if s.get('price') is None: return ''
    if s['price'] == 0: return '<span class="price free">ללא תשלום</span>'
    vat = ' <small>+ מע״מ</small>' if s.get('vat') == 'excluded' else ''
    unit = f' <small>{UNIT[s["unit"]]}</small>' if s.get('unit') in UNIT else ''
    return f'<span class="price"><b>{s["price"]:,} <span class="nis">₪</span></b>{unit}{vat}</span>'

# ------------------------------------------------------------------ 4. the programme: what organisations book
path = S2['path']
pp = paras(path['body'])
rows = ''
PAGE = {'strategic-planning': f'{OLD}/process', 'brands-of-change': f'{OLD}/סדנאות-והרצאות', 'therapists-retreat': f'{OLD}/סדנאות-והרצאות'}
for slug, para in zip(path['services'], pp):
    s = svc[slug]
    if ':' in para.split('.')[0]:
        name, desc = para.split(':', 1)
    else:                                    # p4 opens with the service's own name, no colon: same words, split there
        name, desc = s['title'], para[len(s['title']):]
    details = [x for x in ([s.get('format')] if slug != 'brands-of-change' else []) + ([s.get('audience')] if slug in ('brands-of-change', 'therapists-retreat') else []) if x]
    det = f'<p class="r-det">{" | ".join(e(x) for x in details)}</p>' if details else ''
    more = f'<a class="btn btn-line btn-sm" href="{e(PAGE[slug])}">לפרטים</a>' if slug in PAGE else ''
    rows += (f'<article class="prow"><div class="r-main"><h3>{e(name.strip())}</h3><p class="r-desc">{e(desc.strip())}</p>{det}</div>'
             f'<div class="r-act">{price(s)}<div class="r-btns">{wa_btn(s["ctaText"], "כתבו להדס", "btn btn-wa btn-sm")}{more}</div></div></article>')
programme = f'''
<section class="programme light" id="programme" aria-labelledby="prog-h">
  <div class="wrap">
    <h2 id="prog-h" class="sec-h">{e(path['heading'])}</h2>
    <div class="prows">{rows}</div>
    <div class="prog-foot">{wa_btn(ORG, 'כתבו להדס בוואטסאפ', 'btn btn-wa btn-lg')}
      <p class="note">המחירים כפי שפורסמו באתר הנוכחי, 18.10.2026</p></div>
  </div>
</section>'''

# ------------------------------------------------------------------ 5. for nonprofits, organisations and teams
it, cr = S2['intro'], C['credentials'][0]
intro = f'''
<section class="intro deep" aria-labelledby="intro-h">
  <div class="wrap intro-in">
    <div class="intro-text">
      <h2 id="intro-h">{e(it['heading'])}</h2>
      {P(it['body'])}
      <a class="cred" href="{e(cr['url'])}" target="_blank" rel="noopener">
        {img('btc-seal.webp', 'חותם CERTIFIED TRAINER של Brand the Change', 197, 200)}
        <span>{e(cr['label'])}</span></a>
    </div>
    <figure class="intro-photo">{img('intro-hadas-900.webp', 'הדס דרכלי צוחקת בז׳קט צהוב ליד קנבס "WHO ARE YOU?", ספרייה מאחוריה', 892, 1190)}</figure>
  </div>
</section>'''

# ------------------------------------------------------------------ 6. past programmes + the award
pr = S2['proof']
PROG = [('prog-2024.webp', 'הדס דרכלי בשמלה ירוקה עם תג כנס, מול קיר הצילום של Brand Manager Day 2024'),
        ('prog-kfarblum.webp', 'כרטיס: ״מצפן לצפון״ לדמיין את המרחב הצפוני 2030, הדס דרכלי, אולם סימפוניה 2'),
        ('prog-festival.webp', 'פוסטר פסטיבל קיימות וא.נשים #3, 10.4.25, הרצאה של הדס דרכלי')]
past = ''
for (ph, alt), line, url in zip(PROG, pr['talks'], pr['instagramLinks']):
    year = re.search(r'20\d\d', line).group(0)
    past += (f'<article class="past-row"><a class="past-img" href="{e(url)}" target="_blank" rel="noopener" aria-label="לפוסט באינסטגרם">{img(ph, alt, 720, 720)}</a>'
             f'<p class="past-year" aria-hidden="true">{year}</p>'
             f'<div class="past-text"><p>{e(line)}</p><a class="btn btn-line btn-sm" href="{e(url)}" target="_blank" rel="noopener">{I["instagram"]}<span>לפוסט באינסטגרם</span></a></div></article>')
aw = C['awards'][0]
proof = f'''
<section class="past light" aria-labelledby="past-h">
  <div class="wrap">
    <h2 id="past-h" class="sec-h">תוכניות קודמות</h2>
    <div class="past-rows">{past}</div>
  </div>
</section>
<section class="award teal" aria-labelledby="award-h">
  <div class="wrap award-in">
    {img('award-seal.webp', 'חותם פרס המיתוג הישראלי 2022', 244, 260, cls='seal')}
    <h2 id="award-h" class="award-line">{e(pr['award'])}</h2>
    <figure class="judges">
      <blockquote cite="{e(aw['url'])}"><p>{e(pr['judgesQuote'])}</p></blockquote>
      <figcaption><a href="{e(aw['url'])}" target="_blank" rel="noopener">{e(pr['judgesQuoteAttribution'])}</a></figcaption>
    </figure>
  </div>
</section>'''

# ------------------------------------------------------------------ 7. logos, under her own heading only (D2)
from PIL import Image as _Im
def _dims(n):
    w, h = _Im.open(DIST / f'img/logo-{n}.webp').size; return w, h
logos = ''
for l in C['clientLogos']:
    n = l['logo'].split('-')[-1]; w, h = _dims(n)
    logos += f'<li>{img(f"logo-{n}.webp", l["name"], w, h)}</li>'
clients = f'''
<section class="logos deep" aria-labelledby="logos-h">
  <div class="wrap"><h2 id="logos-h" class="sec-h">{e(pr['heading'])}</h2><ul class="logo-grid">{logos}</ul></div>
</section>'''

# ------------------------------------------------------------------ 8. testimonials: 3, each slide sized to its quote
def quote(name):
    q = quotes[name]; lang = q.get('lang') or 'he'; d = 'ltr' if lang == 'en' else 'rtl'
    role = f'<span class="q-role">{e(q["role"])}</span>' if q.get('role') else ''
    long = len(q['quote']) > 300
    body = e(q['quote']).replace('\n\n', '<br><br>').replace('\n', '<br>')
    more = '<button class="q-more" type="button" aria-expanded="false">קראו עוד</button>' if long else ''
    return (f'<figure class="slide-q{" long" if long else ""}" lang="{lang}" dir="{d}"><blockquote><p>{body}</p></blockquote>{more}'
            f'<figcaption><b>{e(q["author"])}</b>{role}</figcaption></figure>')
QS = ['אנווה רצון', 'Julia Dojas - Heart of Hosting', 'יובל אברהם - בונים לחיים']
qdots = ''.join(f'<button type="button" data-q="{i}" aria-label="ציטוט {i + 1} מתוך {len(QS)}"><span></span></button>' for i in range(len(QS)))
testi = f'''
<section class="voices pale" aria-labelledby="voices-h">
  <div class="wrap">
    <h2 id="voices-h" class="sec-h">{e(C['mockup_extras']['testimonialsHeading'])}</h2>
    <div class="q-track" data-track tabindex="0" aria-label="{e(C['mockup_extras']['testimonialsHeading'])}">{''.join(quote(n) for n in QS)}</div>
    <div class="q-dots" data-qdots>{qdots}</div>
  </div>
</section>'''

# ------------------------------------------------------------------ 9. also for owners and professionals (nothing removed)
def mini(s):
    status = '<span class="tag">ההרשמה נסגרה</span>' if s.get('status') == 'full' else ''
    label = 'עדכנו אותי' if s.get('status') == 'full' else 'כתבו להדס'
    det = ' | '.join(e(x) for x in [s.get('format')] if x)
    det = f'<p class="r-det">{det}</p>' if det else ''
    return (f'<li class="mini"><div><h4>{e(s["title"])}</h4><p>{e(s["summary"])}</p>{det}</div>'
            f'<div class="mini-act">{price(s)}{status}{wa_btn(s["ctaText"], label, "btn btn-wa btn-sm")}</div></li>')
pb = svc['personal-branding']
workshops = [svc[x] for x in ('intro-workshop', 'the-better-4', 'brand-and-breakfast', 'community-meetups')]
courses = [svc[x] for x in ('change-leaders-course', 'business-to-brand')]
tb, cb = block('הרצאות וסדנאות'), block('קורסים')
fringe = f'''
<section class="fringe light" id="fringe" aria-labelledby="fringe-h">
  <div class="wrap fringe-in">
    <div class="fringe-list">
      <h2 id="fringe-h" class="sec-h">גם לבעלי עסקים ולאנשי מקצוע</h2>
      <details class="fr">
        <summary><span class="fr-t">{e(pb['title'])}</span><span class="fr-s">{e(pb['summary'])}</span><span class="fr-i">{I['plus']}</span></summary>
        <div class="fr-body"><p>{e(pb['audience'])}</p><div class="r-btns">{wa_btn(pb['ctaText'], 'כתבו להדס', 'btn btn-wa btn-sm')}<a class="btn btn-line btn-sm" href="{OLD}/personal101">לפרטים</a></div></div>
      </details>
      <details class="fr">
        <summary><span class="fr-t">סדנאות פתוחות</span><span class="fr-s">{e(paras(tb['body'])[1])}</span><span class="fr-i">{I['plus']}</span></summary>
        <ul class="fr-body minis">{''.join(mini(s) for s in workshops)}</ul>
      </details>
      <details class="fr">
        <summary><span class="fr-t">{e(cb['heading'])}</span><span class="fr-s">{e(paras(cb['body'])[0])}</span><span class="fr-i">{I['plus']}</span></summary>
        <ul class="fr-body minis">{''.join(mini(s) for s in courses)}</ul>
      </details>
    </div>
    <figure class="fringe-clip s-video">
      {img('s2u-leaves-poster.webp', '', 560, 700, cls='s-poster')}
      <video muted loop playsinline preload="none" disablepictureinpicture width="560" height="700"
        aria-label="ידיים עוטפות מתנה בעלי בננה וחוט על שולחן עץ, בסדנה" data-clip>
        <source data-src="video/s2u-leaves-560.webm" type="video/webm"><source data-src="video/s2u-leaves-560.mp4" type="video/mp4"></video>
    </figure>
  </div>
</section>'''

# ------------------------------------------------------------------ 10. the demo case study: a designed cover, labelled
cs = C['caseStudies'][0]
proc = ''.join(f'<li><b lang="en" dir="ltr">{e(p["stage"])}</b><p>{e(p["body"])}</p></li>' for p in cs['process'])
case = f'''
<section class="case light" aria-labelledby="case-h">
  <div class="wrap">
    <h2 id="case-h" class="sec-h">מקרה בוחן</h2>
    <details class="case-card">
      <summary class="case-cover">
        <span class="badge">דוגמה</span>
        <img class="case-ic" src="img/icon-white.webp" width="720" height="477" alt="" loading="lazy" decoding="async">
        <span class="case-meta"><span class="case-client">{e(cs['client'])} | {e(cs['sector'])}</span>
        <span class="case-title">{e(cs['title'])}</span>
        <span class="case-stages" lang="en" dir="ltr">{''.join(f'<i>{e(p["stage"])}</i>' for p in cs['process'])}</span>
        <span class="btn btn-ghost btn-sm case-open">קראו את המקרה</span></span>
      </summary>
      <div class="case-body">
        <p class="case-flag">מקרה בוחן לדוגמה, לא פרויקט אמיתי.</p>
        <p>{e(cs['challenge'])}</p><ol class="case-proc">{proc}</ol><p>{e(cs['outcome'])}</p>
        <blockquote><p>״{e(cs['quote'])}״</p><footer>{e(cs['quoteAuthor'])}</footer></blockquote>
        <p class="note">{e(cs['credits'])}</p>
      </div>
    </details>
  </div>
</section>'''

# ------------------------------------------------------------------ 11. team: faces in a row, founder first and larger, bios on tap
TP = {'הדס דרכלי': ('team-hadas.webp', 560, 700, 'הדס דרכלי מחייכת בחולצה ירוקה בחדר מואר באור חם'),
      'תמר דרכלי': ('team-tamar.webp', 480, 600, 'תמר דרכלי בשמלה אדומה על רקע ירוק-מרווה'),
      'יעל שחר': ('team-yael.webp', 480, 600, 'יעל שחר במשקפיים על רקע אפור'),
      'דנה רוסו': ('team-dana.webp', 480, 600, 'דנה רוסו בחולצה פרחונית על רקע צהוב'),
      'ליאור ארסיני': ('team-lior.webp', 480, 600, 'ליאור ארסיני בחולצה ורודה על רקע ירוק-מרווה')}
mem = ''
for m in C['team']:
    ph, w, h, alt = TP[m['name']]
    mem += (f'<li class="mem{" founder" if m.get("founder") else ""}"><figure>{img(ph, alt, w, h)}</figure>'
            f'<h3>{e(m["name"])}</h3><p class="mem-role">{e(m["role"])}</p>'
            f'<details class="bio"><summary>קראו עוד</summary>{P(m["bio"])}</details></li>')
tm = block('צוות עם משמעות')
team = f'''
<section class="team pale" id="team" aria-labelledby="team-h">
  <div class="wrap">
    <h2 id="team-h" class="sec-h">{e(tm['heading'])}</h2>
    <div class="sec-lede">{P(tm['body'])}</div>
    <ul class="mems">{mem}</ul>
  </div>
</section>'''

# ------------------------------------------------------------------ 12. content + Instagram
pod = block('ON AIR')
plinks = ''.join(f'<a class="btn btn-line btn-sm" href="{e(l["url"])}" target="_blank" rel="noopener">{I[l["platform"]]}<span>{SOC_LABEL[l["platform"]]}</span></a>' for l in C['podcast']['links'])
def date_he(dd): y, m, d_ = dd.split('-'); return f'{int(d_)}.{int(m)}.{y}'
posts = ''.join(f'<li><a href="{e(p["oldUrl"])}"><time datetime="{p["date"]}">{date_he(p["date"])}</time><span>{e(p["title"])}</span></a></li>' for p in C['posts'][:2])
IGT = [('ig-03', 'הדס דרכלי בחולצה ירוקה מסדרת צבעים וצמחים על שולחן סדנה'), ('ig-08', 'מסך הקרנה IMPACT NATION un-conference עם חצים וקודי QR'),
       ('ig-02', 'הדס דרכלי בשמלה בהדפס עלים מול קיר חטיפי Tony\'s Chocolonely'), ('ig-11', 'כוס קפה וגזרי מגזינים, סדנת חזון אישי עסקי'),
       ('ig-12', 'כרטיס בצבע אלמוג: Meet AIR-INK #circular economy'), ('ig-10', 'כרטיס צהוב: מותג מיטיב ששווה להכיר, PRECIOUS PLASTIC')]
tile_url = {t['image'].split(':')[1].replace('img-', ''): t['postUrl'] for t in C['instagramTiles']}
tiles = ''.join(f'<li><a href="{e(tile_url[t])}" target="_blank" rel="noopener">{img(t + ".webp", alt, 560, 560)}</a></li>' for t, alt in IGT)
content = f'''
<section class="content light" aria-labelledby="pod-h">
  <div class="wrap content-in">
    <div class="pod">
      {img('podcast.webp', 'עטיפת הפודקאסט מותג מיטיב', 560, 560, cls='pod-art')}
      <div><p class="eyebrow" lang="en" dir="ltr">ON AIR</p><h2 id="pod-h">{e(pod['heading'].split('—', 1)[1].strip())}</h2>
        <p>{e(paras(pod['body'])[0])}</p><div class="r-btns">{plinks}</div></div>
    </div>
    <div class="posts"><h3>מהבלוג</h3><ul>{posts}</ul><a class="btn btn-line btn-sm" href="{OLD}/blog">לבלוג המלא</a></div>
  </div>
</section>
<section class="insta light" aria-labelledby="ig-h">
  <div class="wrap insta-head"><h2 id="ig-h" class="sec-h">באינסטגרם</h2>
    <a class="btn btn-line btn-sm" href="{e(social['instagram'])}" target="_blank" rel="noopener">{I['instagram']}<span dir="ltr">@mutagmeitiv</span></a></div>
  <ul class="ig-strip">{tiles}</ul>
</section>'''

# ------------------------------------------------------------------ 13. closing + footer
closing = f'''
<section class="closing deep" id="book" aria-labelledby="close-h">
  <div class="wrap closing-in">
    <img class="close-ic" src="img/icon-white.webp" width="720" height="477" alt="" loading="lazy" decoding="async">
    <h2 id="close-h">{e(C['closing'])}</h2>
    <div class="r-btns center">{wa_btn(ORG, 'כתבו להדס בוואטסאפ', 'btn btn-wa btn-lg')}
      <a class="btn btn-ghost btn-lg" href="{e(CAL['url'])}" target="_blank" rel="noopener">{I['cal']}<span>לקביעת שיחה ביומן</span></a></div>
  </div>
</section>'''
rest = programme + intro + proof + clients + testi + fringe + case + team + content + closing

dl = C['downloads'][0]
soc = ''.join(f'<a class="soc" href="{e(s["url"])}" target="_blank" rel="noopener" aria-label="{SOC_LABEL[s["platform"]]}">{I[s["platform"]]}</a>' for s in C['socialLinks'])
year = datetime.date.today().year
footer = f'''
<footer class="ftr deep">
  <div class="wrap ftr-in">
    <div class="ftr-brand"><img src="img/wordmark-white.webp" width="640" height="143" alt="{e(C['businessName'])}" loading="lazy">
      <p>{e(C['tagline'])}</p><div class="socs">{soc}</div></div>
    <div class="ftr-contact"><h2>{e(block('פה יוצרים קשר')['heading'])}</h2>
      <div class="pills">{wa_btn(ORG, 'וואטסאפ', 'pill pill-wa')}
        <a class="pill" href="tel:{TEL}">{I['phone']}<span dir="ltr">{TEL_SHOW}</span></a>
        <a class="pill" href="mailto:{MAIL}">{I['mail']}<span dir="ltr">{MAIL}</span></a>
        <a class="pill" href="{e(dl['file'])}" target="_blank" rel="noopener">{I['pdf']}<span>{e(dl['label'])}</span></a></div></div>
    <nav class="ftr-nav" aria-label="ניווט באתר"><h2>ניווט</h2><ul>{nav_html()}<li><a href="{OLD}/blog">בלוג</a></li><li><a href="{OLD}/הצהרת-נגישות">הצהרת נגישות</a></li></ul></nav>
  </div>
  <div class="wrap ftr-base"><span>© {year} {e(C['businessName'])}</span>{''.join(f'<span>{e(c)}</span>' for c in C['mockup_extras']['footerCredits'])}</div>
</footer>'''
