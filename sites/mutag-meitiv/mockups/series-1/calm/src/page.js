(() => {
  const d = document, root = d.documentElement;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData === true;
  root.classList.add('js');

  // header: green band at the top, a floating white pill once the hero is scrolled past;
  // the phone bar appears once the hero button has left the screen
  const hdr = d.querySelector('[data-hdr]'), hero = d.querySelector('[data-hero]');
  const cta = d.querySelector('[data-hero-cta]'), bar = d.querySelector('[data-bar]');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => hdr.classList.toggle('pill', !en.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' }).observe(hero);
    new IntersectionObserver(([en]) => {
      const on = !en.isIntersecting && en.boundingClientRect.top < 0;
      bar.classList.toggle('on', on); bar.setAttribute('aria-hidden', on ? 'false' : 'true');
      bar.querySelectorAll('a').forEach((a) => (a.tabIndex = on ? 0 : -1));
    }).observe(cta);
    bar.querySelectorAll('a').forEach((a) => (a.tabIndex = -1));

    // reveals: cards and photos only, once
    const io = new IntersectionObserver((ens) => ens.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    d.querySelectorAll('.reveal').forEach((el, i) => {
      const sib = [...el.parentElement.children].indexOf(el);
      el.style.transitionDelay = (sib % 4) * 80 + 'ms';
      io.observe(el);
    });

    // the table clip: sources attached after first paint, plays only while on screen
    const v = d.querySelector('[data-clip]');
    if (v && !calm && !saveData) {
      let loaded = false;
      const vo = new IntersectionObserver(([en]) => {
        if (en.isIntersecting) {
          if (!loaded) { v.querySelectorAll('source[data-src]').forEach((s) => (s.src = s.dataset.src)); v.load(); loaded = true; }
          v.play().catch(() => {});
        } else if (loaded) v.pause();
      }, { rootMargin: '200px 0px' });
      const later = () => requestAnimationFrame(() => setTimeout(() => vo.observe(v), 0));
      d.readyState === 'complete' ? later() : addEventListener('load', later, { once: true });
    }
  } else d.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));

  // the method: the stage in the middle of the screen lights up and its photo fades in on the
  // sticky frame (desktop); everything is lit and the first photo shown without JS or with reduced motion
  const list = d.querySelector('[data-stages]');
  if (list && 'IntersectionObserver' in window && !calm) {
    const items = [...list.children], frames = [...d.querySelectorAll('.m-frame img')];
    list.setAttribute('data-lit', '');
    const light = (i) => {
      items.forEach((el, k) => el.classList.toggle('lit', k === i));
      frames.forEach((f, k) => f.classList.toggle('on', k === i));
    };
    light(0);
    const mio = new IntersectionObserver((ens) => ens.forEach((en) => { if (en.isIntersecting) light(items.indexOf(en.target)); }),
      { rootMargin: '-45% 0px -45% 0px' });
    items.forEach((el) => mio.observe(el));
  }

  // offer groups: three rows, then "show all"; with JS off every row is shown
  d.querySelectorAll('[data-show-all]').forEach((btn) => {
    const rows = [...btn.previousElementSibling.querySelectorAll('[data-more]')];
    rows.forEach((r) => (r.hidden = true));
    btn.hidden = false;
    btn.addEventListener('click', () => { rows.forEach((r) => (r.hidden = false)); btn.remove(); rows[0].querySelector('a').focus(); });
  });

  // team bios: three lines, then "קראו עוד"
  d.querySelectorAll('[data-bio]').forEach((bio) => {
    const btn = bio.nextElementSibling;
    bio.classList.add('clamped');
    if (!bio.closest('.member') && bio.scrollHeight <= bio.clientHeight + 4) { bio.classList.remove('clamped'); return; }
    btn.hidden = false;
    btn.addEventListener('click', () => {
      const open = bio.classList.toggle('clamped') === false;
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'פחות' : 'קראו עוד';
    });
  });

  // long quotes: clamped with a toggle; the full words stay in the DOM
  d.querySelectorAll('[data-clamp]').forEach((bq) => {
    const btn = bq.parentElement.querySelector('.q-more');
    bq.classList.add('clamped');
    if (bq.scrollHeight <= bq.clientHeight + 4) { bq.classList.remove('clamped'); return; }
    btn.hidden = false;
    btn.addEventListener('click', () => {
      const open = bq.classList.toggle('clamped') === false;
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'פחות' : 'לקריאת הכל';
    });
  });

  // testimonials: native scroll-snap + dots
  d.querySelectorAll('[data-slider]').forEach((s) => {
    const track = s.querySelector('.slides'), dots = [...s.querySelectorAll('.dots button')];
    s.querySelector('.dots').hidden = false;
    const go = (i) => track.scrollTo({ left: track.children[i].offsetLeft - track.offsetLeft, behavior: calm ? 'auto' : 'smooth' });
    dots.forEach((b, i) => b.addEventListener('click', () => go(i)));
    const mark = () => {
      const w = track.clientWidth, i = Math.round(Math.abs(track.scrollLeft) / w);
      dots.forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
    };
    track.addEventListener('scroll', () => requestAnimationFrame(mark), { passive: true });
    track.addEventListener('keydown', (ev) => {
      const i = dots.findIndex((b) => b.getAttribute('aria-current') === 'true');
      if (ev.key === 'ArrowLeft') go(Math.min(dots.length - 1, i + 1));   // RTL: forward = left
      if (ev.key === 'ArrowRight') go(Math.max(0, i - 1));
    });
    mark(); addEventListener('load', mark); addEventListener('resize', () => requestAnimationFrame(mark));
  });

  // mobile menu closes after a tap
  d.querySelectorAll('.mnav a').forEach((a) => a.addEventListener('click', () => a.closest('details').removeAttribute('open')));
})();
