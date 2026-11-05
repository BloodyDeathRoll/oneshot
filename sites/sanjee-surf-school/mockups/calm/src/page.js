// The sand. Everything here is an enhancement: with JS off every link works and the slideshow is scroll-snap.
(() => {
  const root = document.documentElement;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The wash line runs up once, when the photograph is there to be washed over.
  const heroImg = document.querySelector('.hero-img');
  const go = () => root.classList.add('go');
  if (calm) go();
  else if (heroImg.complete) requestAnimationFrame(go);
  else { heroImg.addEventListener('load', go, { once: true }); heroImg.addEventListener('error', go, { once: true }); setTimeout(go, 4000); }

  // Header turns white and the phone bar slides up once the hero's button has left the screen.
  const top = document.querySelector('.top');
  const bar = document.getElementById('bar');
  const heroBook = document.querySelector('.hero-book');
  let queued = false;
  const place = () => {
    queued = false;
    const past = heroBook.getBoundingClientRect().bottom < 64;
    top.classList.toggle('solid', past);
    bar.classList.toggle('on', past);
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(place); } }, { passive: true });
  place();

  // The phone menu closes after a choice, on Esc and on a tap outside.
  const menu = document.querySelector('.menu');
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) menu.open = false; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); } });
  document.addEventListener('click', (e) => { if (menu.open && !menu.contains(e.target)) menu.open = false; });

  // Prints settle 8 px the first time they come into view. Headings never move.
  const prints = document.querySelectorAll('.print');
  const seen = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); seen.unobserve(e.target); }
  }, { rootMargin: '0px 0px -6% 0px' });
  prints.forEach((p) => seen.observe(p));

  // Guests: dots on a native scroll-snap track, so a swipe is the browser's own. A dot slides over 350 ms.
  const track = document.querySelector('.track');
  const slides = [...track.querySelectorAll('.slide')];
  const dotsBox = document.querySelector('.dots');
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  let raf = 0;
  const go2 = (i) => {
    cancelAnimationFrame(raf);
    const to = slides[i].offsetLeft - track.offsetLeft;
    if (calm) { track.scrollLeft = to; return; }
    const from = track.scrollLeft;
    const t0 = performance.now();
    track.style.scrollSnapType = 'none';
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 350);
      track.scrollLeft = from + (to - from) * ease(p);
      if (p < 1) raf = requestAnimationFrame(step);
      else track.style.scrollSnapType = '';
    };
    raf = requestAnimationFrame(step);
  };
  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'dot';
    b.setAttribute('aria-label', `Review ${i + 1} of ${slides.length}`);
    b.addEventListener('click', () => go2(i));
    dotsBox.append(b);
    return b;
  });
  const mark = () => {
    const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    dots.forEach((d, n) => d.setAttribute('aria-current', n === i ? 'true' : 'false'));
  };
  track.addEventListener('scroll', mark, { passive: true });
  mark();
})();
