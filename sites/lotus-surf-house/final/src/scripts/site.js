/* Lotus Surf House, calm: slideshows, quote cross-fade, header + phone bar, the Rosa forecast. Everything works without it. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // dot slideshows over a scroll-snap row
  for (const show of document.querySelectorAll('[data-show]')) {
    const track = show.querySelector('.track'), slides = [...track.children];
    const ctrl = show.querySelector('.ctrl'), dots = [...show.querySelectorAll('.dot')];
    ctrl.hidden = false;
    let cur = 0;
    const mark = i => { cur = i; dots.forEach((d, j) => d.setAttribute('aria-current', j === i ? 'true' : 'false')); };
    const go = i => {
      i = (i + slides.length) % slides.length;
      track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
      mark(i);
    };
    let t;
    track.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(() => mark(Math.round(track.scrollLeft / track.clientWidth)), 60); }, { passive: true });
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    show.querySelector('.prev').addEventListener('click', () => go(cur - 1));
    show.querySelector('.next').addEventListener('click', () => go(cur + 1));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
    mark(0);
  }

  // one review at a time, cross-faded; the grid stack keeps the height of the longest, so nothing jumps
  for (const box of document.querySelectorAll('[data-quotes]')) {
    const qs = [...box.querySelectorAll('.q')], dots = [...box.querySelectorAll('.dot')];
    box.classList.add('ready'); box.querySelector('.ctrl').hidden = false;
    let cur = 0;
    const go = i => {
      cur = (i + qs.length) % qs.length;
      qs.forEach((q, j) => { q.classList.toggle('on', j === cur); q.setAttribute('aria-hidden', j === cur ? 'false' : 'true'); });
      dots.forEach((d, j) => d.setAttribute('aria-current', j === cur ? 'true' : 'false'));
    };
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    box.querySelector('.prev').addEventListener('click', () => go(cur - 1));
    box.querySelector('.next').addEventListener('click', () => go(cur + 1));
    go(0);
  }

  // the header turns solid and the phone bar slides up once the first screen has gone
  const top = document.querySelector('.top'), bar = document.getElementById('bar'), hero = document.querySelector('.hero');
  new IntersectionObserver(([e]) => {
    const past = !e.isIntersecting;
    top.classList.toggle('solid', past); bar.classList.toggle('on', past);
  }, { rootMargin: '-80px 0px 0px 0px' }).observe(hero);

  /* ---------- the Rosa forecast (playbook §4 exception; 2026-11-04, Alon: Rosa's `lazy-left`) ----------
     Port of sites/cheeky-monkey/final (from sites/layday-surf-ahangama/final). One request to Rosa's per-spot JSON,
     made only when the block nears the viewport. With fresh data (under 24 h) the site draws the headline, and only
     then is Rosa's widget iframe given its src. On failure, stale data, a 10 s timeout or no JS: the plain link in the
     widget's reserved box. The headline's box stays reserved (hidden) when the block is on or above the screen, so
     nothing shifts; when it fails while still below the screen (.solo), the empty box is dropped. */
  const fc = document.querySelector('.fc');
  if (fc) {
    const fNow = fc.querySelector('.fc-now'), fRosa = fc.querySelector('.fc-rosa'), fFrame = fRosa.querySelector('iframe');
    const fSet = (k, v) => { const el = fNow.querySelector('[data-f="' + k + '"]'); if (el) { el.textContent = v; el.hidden = !v; } };
    const fFail = () => { delete fNow.dataset.loading; fc.classList.add('off'); if (fc.getBoundingClientRect().top > innerHeight) fc.classList.add('solo'); };
    const WORDS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
    const from = deg => WORDS[Math.round((((+deg % 360) + 360) % 360) / 45) % 8];
    const parts = (iso, tz, o) => { const d = new Date(iso); if (isNaN(d)) throw new Error('bad time'); const r = {};
      new Intl.DateTimeFormat('en-GB', Object.assign({ timeZone: tz, hourCycle: 'h23' }, o)).formatToParts(d).forEach(x => { r[x.type] = x.value; }); return r; };
    const f1 = x => (+x).toFixed(1), n1 = x => String(+(+x).toFixed(1));
    const fit = () => { // the height range never wraps: it shrinks to the card's width if it must
      const nh = fNow.querySelector('.nh'); nh.style.fontSize = '';
      const avail = fNow.querySelector('.live').clientWidth, w = nh.getBoundingClientRect().width;
      if (!avail || w <= avail) return;
      let fs = parseFloat(getComputedStyle(nh).fontSize) * avail / w;
      for (let i = 0; i < 12; i++) { nh.style.fontSize = Math.floor(fs) + 'px'; if (nh.getBoundingClientRect().width <= avail) break; fs -= 2; }
    };
    const draw = d => {
      const cur = d.current, tz = (d.spot && d.spot.timezone) || 'Asia/Colombo';
      if (!cur || !Array.isArray(cur.h) || !isFinite(cur.h[0]) || !isFinite(cur.h[1])) throw new Error('no current');
      const nh = fNow.querySelector('.nh');
      if (!nh.firstChild || nh.firstChild.nodeType !== 3) nh.insertBefore(document.createTextNode(''), nh.firstChild);
      nh.firstChild.textContent = f1(cur.h[0]) + '–' + f1(cur.h[1]);
      const tt = parts(cur.t, tz, { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
      fSet('t', tt.weekday + ' ' + tt.day + ' ' + tt.month + ', ' + tt.hour + ':' + tt.minute);
      const sw = (cur.swells || []).filter(x => x.in_window)[0];
      fSet('swell', sw && isFinite(sw.period) ? 'Swell ' + f1(sw.period) + ' s from the ' + from(sw.dir) : '');
      const w = cur.wind;
      fSet('wind', w && isFinite(w.kph) ? 'Wind ' + n1(w.kph) + ' km/h from the ' + from(w.dir) + (w.class ? ', ' + w.class : '') : '');
      const u = parts(d.generated_at, tz, { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      fSet('upd', 'Rosa, updated ' + u.day + ' ' + u.month + ' ' + u.year + ', ' + u.hour + ':' + u.minute);
      fc.classList.add('live');
      fit();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
      let lastW = fNow.clientWidth;
      if ('ResizeObserver' in window) new ResizeObserver(() => { if (fNow.clientWidth !== lastW) { lastW = fNow.clientWidth; fit(); } }).observe(fNow);
    };
    /* a cross-origin iframe fires `load` even when its request failed, so the widget is shown only when a HEAD
       request to the same URL answered OK (rosa.surf/widget/ answers HEAD 200 with access-control-allow-origin *)
       AND the frame has loaded, within 10 s. Otherwise the frame loses its src and the plain link, visible all along
       in the same reserved box, stays. */
    const widget = () => {
      const src = fFrame.dataset.src; let done = false, to;
      fRosa.dataset.loading = 'true';
      const end = show => { if (done) return; done = true; clearTimeout(to); delete fRosa.dataset.loading;
        if (show) fRosa.classList.add('on'); else { fRosa.classList.remove('on'); fFrame.removeAttribute('src'); } };
      to = setTimeout(() => end(false), 10000);
      fetch(src, { method: 'HEAD', credentials: 'omit' }).then(r => {
        if (!r.ok) throw new Error(r.status);
        fFrame.addEventListener('load', () => end(true), { once: true });
        fFrame.src = src;
      }).catch(() => end(false));
    };
    // rosa.surf sends frame-ancestors *, which does not match a file:// page: there, the link
    if (!('IntersectionObserver' in window) || !window.fetch || !window.Intl || location.protocol === 'file:') fFail();
    else {
      const fio = new IntersectionObserver(es => {
        if (!es.some(x => x.isIntersecting)) return;
        fio.disconnect();
        fNow.dataset.loading = 'true';
        const ac = 'AbortController' in window ? new AbortController() : null;
        const to = setTimeout(() => { if (ac) ac.abort(); }, 10000);
        fetch(fc.dataset.json, { credentials: 'omit', signal: ac && ac.signal })
          .then(r => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
          .then(d => {
            const age = Date.now() - Date.parse(d.generated_at);
            if (!(age >= -36e5 && age < 864e5)) throw new Error('stale');
            draw(d);
            delete fNow.dataset.loading;
            widget();
          })
          .catch(fFail)
          .then(() => clearTimeout(to));
      }, { rootMargin: '400px 0px' });
      fio.observe(fc);
    }
  }
})();
