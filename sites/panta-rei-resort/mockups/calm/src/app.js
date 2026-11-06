(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* header + phone bar */
const hdr=$('#hdr'),bar=$('#bar'),hero=$('.hero');
const onScroll=()=>hdr.classList.toggle('solid',scrollY>innerHeight*.6);
addEventListener('scroll',onScroll,{passive:true});onScroll();
/* the bar shows once the hero is passed, and steps aside where the page has its own booking buttons (closing, footer) */
const seen=new Map();const own=[hero,$('.closing'),$('.foot')];
const setBar=()=>{const on=!own.some(el=>seen.get(el));bar.classList.toggle('on',on);bar.setAttribute('aria-hidden',String(!on));$$('a',bar).forEach(a=>a.tabIndex=on?0:-1)};
const io=new IntersectionObserver(es=>{for(const en of es)seen.set(en.target,en.isIntersecting);setBar()},{threshold:.15});own.forEach(el=>el&&io.observe(el));

/* hero film: attached after first paint; never under reduced motion or Save-Data */
const v=$('video[data-hero]');
const save=navigator.connection&&navigator.connection.saveData===true;
const attach=()=>{for(const s of $$('source[data-src]',v)){if(s.media&&!matchMedia(s.media).matches)s.remove();else s.src=s.dataset.src}
 v.load();v.addEventListener('playing',()=>v.classList.add('on'),{once:true});v.play().catch(()=>{})};
if(v&&!reduce&&!save){const later=()=>requestAnimationFrame(()=>setTimeout(attach,0));document.readyState==='complete'?later():addEventListener('load',later,{once:true})}

/* parallax ±2rem on full-bleed photographs, desktop only (Kube recipe) */
const pars=$$('.par img');
if(!reduce&&matchMedia('(min-width: 861px)').matches&&pars.length){
 let tick=false;const run=()=>{tick=false;const vh=innerHeight;for(const img of pars){const r=img.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>vh)continue;const p=(r.top+r.height/2-vh/2)/(vh/2+r.height/2);img.style.transform=`translate3d(0,${(-p*32).toFixed(1)}px,0)`}};
 addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(run)}},{passive:true});run();
}

/* slideshows: native scroll-snap; dots and arrows drive it */
for(const show of $$('[data-show]')){
 const track=$('.track',show),dots=$$('.dot',show),n=dots.length,prev=$('.prev',show),next=$('.next',show);
 const idx=()=>Math.round(track.scrollLeft/track.clientWidth);
 const go=i=>track.scrollTo({left:Math.max(0,Math.min(n-1,i))*track.clientWidth,behavior:reduce?'auto':'smooth'});
 const sync=()=>{const i=idx();dots.forEach((d,k)=>d.setAttribute('aria-current',String(k===i)));if(prev)prev.disabled=i===0;if(next)next.disabled=i===n-1};
 dots.forEach((d,k)=>d.addEventListener('click',()=>go(k)));
 prev&&prev.addEventListener('click',()=>go(idx()-1));next&&next.addEventListener('click',()=>go(idx()+1));
 track.addEventListener('scroll',()=>{clearTimeout(track._t);track._t=setTimeout(sync,60)},{passive:true});
 track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(idx()+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(idx()-1)}});
 sync();
}

/* fitness week: mark today */
const today=new Date().getDay();const d=$(`.day[data-day="${today}"]`);d&&d.classList.add('today');

/* dialogs: menu + booking drawer (focus trapped, Esc closes, focus returned) */
let open=null,opener=null;
const focusables=el=>$$('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])',el).filter(x=>x.offsetParent!==null);
const scrim=$('#scrim');
function show(el,from){opener=from||document.activeElement;open=el;el.hidden=false;document.body.style.overflow='hidden';
 if(el.id==='drawer'){scrim.hidden=false;requestAnimationFrame(()=>{scrim.classList.add('on');el.classList.add('on')})}
 if(el.id==='menu')$('.menu-btn').setAttribute('aria-expanded','true');
 setTimeout(()=>{const f=focusables(el);(el.id==='drawer'?($('input[name=room]:checked',el)||$('input[name=room]',el)):f[0]).focus({preventScroll:true})},reduce?0:60)}
function hide(){if(!open)return;const el=open;open=null;document.body.style.overflow='';
 if(el.id==='drawer'){el.classList.remove('on');scrim.classList.remove('on');setTimeout(()=>{el.hidden=true;scrim.hidden=true},reduce?0:320)}else el.hidden=true;
 if(el.id==='menu')$('.menu-btn').setAttribute('aria-expanded','false');
 opener&&opener.focus&&opener.focus({preventScroll:true})}
addEventListener('keydown',e=>{if(!open)return;if(e.key==='Escape'){hide();return}
 if(e.key==='Tab'){const f=focusables(open);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
$$('[data-close]').forEach(b=>b.addEventListener('click',hide));scrim.addEventListener('click',hide);
$('.menu-btn').addEventListener('click',e=>show($('#menu'),e.currentTarget));
$$('#menu a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{hide()}));

/* booking drawer */
const dr=$('#drawer'),inp=$('#d-in'),out=$('#d-out'),gN=$('#g-n'),go=$('#go'),goWa=$('#go-wa'),sumRoom=$('#sum-room');
let guests=2;
const iso=dt=>dt.toISOString().slice(0,10);
const t0=new Date();inp.min=iso(t0);
const fmt=s=>new Date(s+'T12:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'});
function update(){
 const r=$('input[name=room]:checked',dr);const max=r?+r.dataset.sleeps:4;if(guests>max)guests=max;gN.value=gN.textContent=guests;
 if(inp.value){const nx=new Date(inp.value+'T12:00');nx.setDate(nx.getDate()+1);out.min=iso(nx);if(out.value&&out.value<=inp.value)out.value=''}
 let url=ENGINE,msg="Hi Panta Rei Resort, I'd like to ask about a stay";
 if(r){url=r.dataset.url;msg=`Hi Panta Rei Resort, I'd like to ask about the ${r.dataset.label}`;
  const q=new URLSearchParams();if(inp.value&&out.value){q.set('start',inp.value);q.set('end',out.value)}q.set('numberOfGuests',guests);url+='?'+q.toString();
  sumRoom.textContent=r.dataset.label+(inp.value&&out.value?` · ${fmt(inp.value)} – ${fmt(out.value)}`:'')+` · ${guests} guest${guests>1?'s':''}`}
 else sumRoom.textContent='Choose a room to see its prices for your dates.';
 if(inp.value&&out.value)msg+=`, ${fmt(inp.value)} to ${fmt(out.value)}`;msg+=`, ${guests} guest${guests>1?'s':''}.`;
 go.href=url;goWa.href=`https://wa.me/${WA_NUM}?text=`+encodeURIComponent(msg);
 if(!reduce){go.classList.remove('bump');void go.offsetWidth;go.classList.add('bump')}
}
dr.addEventListener('change',update);
$$('[data-g]',dr).forEach(b=>b.addEventListener('click',()=>{const r=$('input[name=room]:checked',dr);guests=Math.max(1,Math.min(r?+r.dataset.sleeps:4,guests+ +b.dataset.g));update()}));
$$('[data-drawer]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();if(open)hide();show(dr,a)}));
update();
})();
