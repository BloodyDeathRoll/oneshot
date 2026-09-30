/* Postcard — shared behaviour: header, menu, video, slideshows, mobile bar, Rosa lazy load. ~4 KB */
(() => {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator.connection && navigator.connection.saveData);
  const small = () => matchMedia('(max-width: 800px)').matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---- video: poster first, attached after first paint, never under reduced motion / Save-Data
  const attach = (v) => {
    if (v.dataset.on) return; v.dataset.on = 1;
    const d = v.dataset, m = small();
    const webm = (m ? d.webmM : d.webmD) || d.webmM, mp4 = (m ? d.mp4M : d.mp4D) || d.mp4M;
    v.innerHTML = `<source src="${webm}" type="video/webm"><source src="${mp4}" type="video/mp4">`;
    if (m && 'onceM' in d) v.loop = false; // phones: the short silhouette shot plays once and holds its last frame
    v.addEventListener('playing', () => v.classList.add('on'), { once: true });
    v.addEventListener('error', () => v.remove(), true);
    v.load();
  };
  window.__attach = attach;
  const play = (v) => { attach(v); const p = v.play(); if (p) p.catch(() => {}); };
  window.__calm = calm;
  if (!calm) {
    const start = () => setTimeout(() => $$('[data-hero]').forEach(play), 150);
    document.readyState === 'complete' ? start() : addEventListener('load', start);
    // level clips: the one most in view plays, one at a time
    const clips = $$('[data-clip]');
    if (clips.length && 'IntersectionObserver' in window) {
      const ratio = new Map();
      const io = new IntersectionObserver((es) => {
        es.forEach((x) => ratio.set(x.target, x.isIntersecting ? x.intersectionRatio : 0));
        let best = null, br = 0.6;
        ratio.forEach((r, v) => { if (r >= br) { best = v; br = r; } });
        clips.forEach((v) => { if (v === best) play(v); else if (!v.paused) v.pause(); });
      }, { threshold: [0, 0.3, 0.6, 0.8, 1] });
      clips.forEach((v) => io.observe(v));
    }
  }

  // ---- header turns solid after the first picture; mobile bar appears
  const hdr = $('#hdr'), top = $('.hero, .band'), bar = $('#mbar');
  const onScroll = () => {
    const h = top ? top.offsetHeight : 0, y = scrollY;
    hdr && hdr.classList.toggle('solid', y > h - 80);
    bar && bar.classList.toggle('show', y > h * 0.6);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // ---- menu sheet (phone)
  const sheet = $('#sheet'), openBtn = $('.hdr .menu-btn');
  if (sheet && openBtn) {
    const close = () => { sheet.classList.remove('open'); openBtn.setAttribute('aria-expanded', 'false'); openBtn.focus(); };
    openBtn.addEventListener('click', () => { sheet.classList.add('open'); openBtn.setAttribute('aria-expanded', 'true'); $('a', sheet).focus(); });
    $('.menu-btn', sheet).addEventListener('click', close);
    $$('nav a', sheet).forEach((a) => a.addEventListener('click', () => sheet.classList.remove('open')));
    sheet.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') close();
      if (ev.key === 'Tab') {
        const f = $$('a,button', sheet), first = f[0], last = f[f.length - 1];
        if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
        else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
      }
    });
  }

  // ---- slideshows and swipe rows with dots
  const rig = (track, items, dotsEl, prev, next) => {
    if (!dotsEl || items.length < 2) return;
    const go = (i) => { i = (i + items.length) % items.length; track.scrollTo({ left: items[i].offsetLeft - items[0].offsetLeft, behavior: calm ? 'auto' : 'smooth' }); };
    const dots = items.map((_, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `${i + 1} of ${items.length}`);
      b.addEventListener('click', () => go(i)); dotsEl.appendChild(b); return b;
    });
    const cur = () => { const x = track.scrollLeft; let k = 0, d = 1e9; items.forEach((it, i) => { const dd = Math.abs(it.offsetLeft - items[0].offsetLeft - x); if (dd < d) { d = dd; k = i; } }); return k; };
    const upd = () => { const k = cur(); dots.forEach((b, i) => b.setAttribute('aria-current', i === k ? 'true' : 'false')); };
    let t; track.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(upd, 60); }, { passive: true }); upd();
    prev && prev.addEventListener('click', () => go(cur() - 1));
    next && next.addEventListener('click', () => go(cur() + 1));
    track.addEventListener('keydown', (ev) => { if (ev.key === 'ArrowRight') { ev.preventDefault(); go(cur() + 1); } if (ev.key === 'ArrowLeft') { ev.preventDefault(); go(cur() - 1); } });
  };
  $$('[data-show]').forEach((s) => { const tr = $('.show-track', s); rig(tr, [...tr.children], $('.dots', s), $('.prev', s), $('.next', s)); });
  $$('[data-row]').forEach((r) => rig(r, [...r.children], r.nextElementSibling));

  // ---- Rosa (playbook §4): one lazy request to the spot JSON when the block nears the viewport.
  // Data older than 24 h, or no answer: the headline and the widget give way to the plain link.
  const box = $('[data-rosa]'), now = $('#rosa-now');
  if (box && now && 'IntersectionObserver' in window) {
    const DAY = 864e5, fresh = (iso) => Date.now() - new Date(iso).getTime() <= DAY;
    const pts = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
    const compass = (d) => pts[Math.round(((d % 360) + 360) % 360 / 22.5) % 16];
    const plain = () => { now.hidden = true; $('#rosa-meta').hidden = true; $('#rosa-plain').classList.add('on'); box.classList.add('off'); };
    const ok = () => { now.classList.add('ok'); $('#rosa-meta').classList.add('ok'); };
    const widget = () => {
      const f = document.createElement('iframe');
      f.src = box.dataset.rosa; f.title = box.dataset.title; f.loading = 'lazy';
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      f.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin');
      f.style.cssText = 'position:relative;z-index:1';
      box.style.position = 'relative';
      $('.fallback', box).style.cssText = 'position:absolute;inset:0;display:grid;place-items:center';
      box.appendChild(f);
    };
    const draw = (j) => {
      const c = j.current, sw = (c.swells || []).find((x) => x.in_window);
      const h = c.h.map((x) => x.toFixed(1)).join('–');
      $('#rosa-h').innerHTML = `${h}<small>m</small>`; $('#rosa-hk').textContent = `Wave height, ${c.phrase}`;
      if (sw) { $('#rosa-p').innerHTML = `${Math.round(sw.period)}<small>s</small>`; $('#rosa-pk').textContent = `Swell from the ${compass(sw.dir)}`; }
      $('#rosa-w').innerHTML = `${Math.round(c.wind.kph)}<small>km/h</small>`; $('#rosa-wk').textContent = `Wind, ${c.wind.class}`;
      const t = new Date(c.t);
      $('#rosa-time').textContent = t.toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Colombo' }).replace(',', '').replace('Sept', 'Sep');
    };
    const go = async () => {
      if (fresh(now.dataset.generated)) { ok(); widget(); return; }
      try {
        const c = new AbortController(); setTimeout(() => c.abort(), 8000);
        const r = await fetch(now.dataset.json, { signal: c.signal }); if (!r.ok) throw 0;
        const j = await r.json(); if (!j.current || !fresh(j.generated_at)) throw 0;
        draw(j); ok(); widget();
      } catch (e) { plain(); }
    };
    const io = new IntersectionObserver((es) => { if (es.some((x) => x.isIntersecting)) { io.disconnect(); go(); } }, { rootMargin: '300px' });
    io.observe(box);
  }
})();
