// series-2 calm "דף ההזמנה": small, useful behaviour only. Everything works without it.
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData === true;
  const phone = matchMedia('(max-width: 699px)');

  // phone bar: shown once the hero button has left the screen, hidden over the footer;
  // the header's WhatsApp pill hides while it shows (one WhatsApp button per phone screen)
  const cta = $('[data-hero-cta]'), ftr = $('[data-ftr]'), bar = $('[data-bar]');
  if (cta && bar) {
    let ctaOut = false, ftrIn = false;
    const set = () => {
      const on = ctaOut && !ftrIn;
      document.body.classList.toggle('bar-on', on);
      const a = $('a', bar); if (a) a.tabIndex = on && phone.matches ? 0 : -1;
      bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    };
    new IntersectionObserver(([en]) => { ctaOut = !en.isIntersecting && en.boundingClientRect.top < 0; set(); }).observe(cta);
    // hidden while the closing's own WhatsApp button or the footer is on screen
    const quiet = new Set();
    const io = new IntersectionObserver((ens) => { ens.forEach((en) => en.isIntersecting ? quiet.add(en.target) : quiet.delete(en.target)); ftrIn = quiet.size > 0; set(); });
    [ftr, document.querySelector('[data-nobar]')].filter(Boolean).forEach((el) => io.observe(el));
  }

  // mobile menu closes after a choice, on Esc, and on scroll
  const mnav = $('[data-mnav]');
  if (mnav) {
    $$('a', mnav).forEach((a) => a.addEventListener('click', () => mnav.removeAttribute('open')));
    addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && mnav.open) { mnav.removeAttribute('open'); $('summary', mnav).focus(); } });
    addEventListener('scroll', () => mnav.open && mnav.removeAttribute('open'), { passive: true });
  }

  // the workshop clip: attached after load, only near the viewport, never under reduced motion or Save-Data
  const clip = $('[data-clip]');
  if (clip && !calm && !saveData) {
    const attach = () => {
      let on = false;
      new IntersectionObserver(([en]) => {
        if (en.isIntersecting && !on) { on = true; $$('source', clip).forEach((s) => { s.src = s.dataset.src; }); clip.load(); }
        if (on) en.isIntersecting ? clip.play().catch(() => {}) : clip.pause();
      }, { rootMargin: '300px 0px' }).observe(clip);
    };
    document.readyState === 'complete' ? attach() : addEventListener('load', () => requestAnimationFrame(() => setTimeout(attach, 0)), { once: true });
  }

  // dots for a horizontal scroll-snap row (RTL-safe: positions, never scrollLeft signs)
  const dotted = (track, items, dots, onChange) => {
    const btns = $$('button', dots);
    const cur = () => {
      const r = track.getBoundingClientRect(), mid = r.left + r.width / 2;
      let best = 0, d = 1e9;
      items.forEach((it, i) => { const b = it.getBoundingClientRect(), m = Math.abs(b.left + b.width / 2 - mid); if (m < d) { d = m; best = i; } });
      return best;
    };
    const paint = () => { const i = cur(); btns.forEach((b, j) => b.setAttribute('aria-current', i === j ? 'true' : 'false')); onChange && onChange(i); };
    btns.forEach((b, i) => b.addEventListener('click', () => {
      const t = items[i], r = track.getBoundingClientRect(), b2 = t.getBoundingClientRect();
      track.scrollBy({ left: b2.left + b2.width / 2 - (r.left + r.width / 2), behavior: calm ? 'auto' : 'smooth' });
    }));
    let raf = 0;
    track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint); }, { passive: true });
    dots.hidden = false; paint();
    return paint;
  };

  // method panels on the phone: a swipe row with dots; bodies clamped to 3 lines with "קראו עוד"
  const panels = $('[data-panels]'), pdots = $('[data-pdots]');
  if (panels && pdots) {
    const items = $$('.panel', panels);
    pdots.innerHTML = items.map((_, i) => `<button type="button" aria-label="שלב ${i + 1}"></button>`).join('');
    const mq = matchMedia('(max-width: 899px)');
    let started = false;
    const sync = () => {
      pdots.hidden = !mq.matches;
      items.forEach((p) => {
        const c = $('[data-pclip]', p), b = $('.p-more', p);
        if (mq.matches && !c.dataset.open) { c.classList.add('clamped'); b.hidden = false; }
        else { c.classList.remove('clamped'); b.hidden = true; }
      });
      if (mq.matches && !started) { started = true; dotted(panels, items, pdots); }
    };
    items.forEach((p) => {
      const c = $('[data-pclip]', p), b = $('.p-more', p);
      b.addEventListener('click', () => { c.dataset.open = '1'; c.classList.remove('clamped'); b.hidden = true; });
    });
    mq.addEventListener('change', sync); sync();
  }

  // testimonials: dots, and the row takes the height of the quote in view
  const slider = $('[data-slider]');
  if (slider) {
    const track = $('.slides', slider), items = $$('.slide', slider), dots = $('[data-dots]', slider);
    const fit = (i) => { track.style.height = items[i].offsetHeight + 'px'; };
    $$('[data-clamp]', slider).forEach((q) => {
      q.classList.add('clamped');
      const more = q.parentElement.querySelector('.q-more');
      if (more) { more.hidden = false; more.addEventListener('click', () => {
        const open = q.classList.toggle('clamped') === false;
        more.setAttribute('aria-expanded', open); more.textContent = open ? 'לקיצור' : 'לקריאת הכל'; paint();
      }); }
    });
    const paint = dotted(track, items, dots, fit);
    addEventListener('resize', () => paint(), { passive: true });
  }
})();
