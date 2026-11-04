/* Coconut Surf Inn, calm: hero settle/pan, slideshows, quote cross-fade, header + phone bar, the Rosa block.
   Everything works without it: slideshows are swipeable rows, every action is a plain link. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // the hero: once the photograph has painted, it settles (desktop) or pans once to the reef (phone)
  const img = document.querySelector('.hero-img');
  if (img) {
    const go = () => requestAnimationFrame(() => requestAnimationFrame(() => img.classList.add('go')));
    img.complete ? go() : img.addEventListener('load', go, { once: true });
  }

  // dot slideshows over a scroll-snap row (350 ms slide; the active dot stretches into a short sky-blue bar)
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
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
    });
    mark(0);
  }

  // one review at a time, cross-faded (300 ms); the grid stack keeps the height of the longest, so nothing jumps
  for (const box of document.querySelectorAll('[data-quotes]')) {
    const qs = [...box.querySelectorAll('.qi')], dots = [...box.querySelectorAll('.dot')];
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
    box.querySelector('.qtrack').addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
    });
    go(0);
  }

  // " | " lines: a separator never starts a wrapped line (marked .lb on the item that begins a new line)
  const lines = () => {
    for (const pl of document.querySelectorAll('.pl')) {
      let prev = null;
      for (const pi of pl.children) {
        pi.classList.remove('lb');
        const y = pi.offsetTop;
        if (prev !== null && y > prev + 4) pi.classList.add('lb');
        prev = y;
      }
    }
  };
  lines(); addEventListener('resize', () => requestAnimationFrame(lines));
  if (document.fonts) document.fonts.ready.then(lines);

  // the header turns solid and the phone bar slides up once the first screen has gone
  const top = document.querySelector('.top'), bar = document.getElementById('bar'), hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) new IntersectionObserver(([e]) => {
    const past = !e.isIntersecting;
    top.classList.toggle('solid', past); if (bar) bar.classList.toggle('on', past);
  }, { rootMargin: '-80px 0px 0px 0px' }).observe(hero);

  /* Rosa (playbook §4): nothing on first load. When the block nears the viewport, Rosa's widget is framed
     in its reserved box, and the headline is shown from the inlined values if they are under 24 h old, else
     from one request to the spot JSON. Older data, or no answer: the headline gives way to the plain link. */
  const box = document.querySelector('[data-rosa]'), now = document.getElementById('rosa-now');
  if (box && now && 'IntersectionObserver' in window) {
    const DAY = 864e5, fresh = iso => Date.now() - new Date(iso).getTime() <= DAY;
    const pts = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
    const compass = d => pts[Math.round(((d % 360) + 360) % 360 / 22.5) % 16];
    const $ = id => document.getElementById(id);
    const plain = () => { now.hidden = true; $('rosa-plain').classList.add('on'); };
    const widget = () => {
      const f = document.createElement('iframe');
      f.src = box.dataset.rosa; f.title = box.dataset.title; f.loading = 'lazy';
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      f.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin');
      box.setAttribute('data-loading', 'true');
      const done = () => box.removeAttribute('data-loading');
      f.addEventListener('load', done); setTimeout(done, 4000);
      f.addEventListener('error', () => { box.classList.add('off'); f.remove(); });
      box.appendChild(f);
    };
    const draw = j => {
      const c = j.current, sw = (c.swells || []).find(x => x.in_window);
      $('rosa-h').textContent = c.h.map(x => x.toFixed(1)).join('–');
      $('rosa-phrase').textContent = c.phrase.charAt(0).toUpperCase() + c.phrase.slice(1);
      if (sw) $('rosa-swell').textContent = `Swell ${Math.round(sw.period)} s from the ${compass(sw.dir)}`;
      $('rosa-wind').textContent = `Wind ${Math.round(c.wind.kph)} km/h, ${c.wind.class}`;
      const t = new Date(c.t);
      $('rosa-time').textContent = t.toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Colombo' }).replace(',', '').replace(' at', ',').replace('Sept', 'Sep');
    };
    // values inlined at build time are shown at once while they are under 24 h old (a clock check, no request)
    if (fresh(now.dataset.generated)) now.classList.add('ok');
    const go = () => {
      widget();
      if (now.classList.contains('ok')) return;
      const ac = new AbortController(); setTimeout(() => ac.abort(), 8000);
      fetch(now.dataset.json, { signal: ac.signal }).then(r => { if (!r.ok) throw 0; return r.json(); })
        .then(j => { if (!j.current || !fresh(j.generated_at)) throw 0; draw(j); now.dataset.generated = j.generated_at; now.classList.add('ok'); })
        .catch(plain);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); go(); } }, { rootMargin: '600px 0px' });
    io.observe(box);
  }
})();
