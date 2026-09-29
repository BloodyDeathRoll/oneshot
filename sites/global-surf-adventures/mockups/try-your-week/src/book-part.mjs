// Booking desk (book/index.html) — imported by build.mjs. Three steps: Level, Room, Dates & guests (with the total).
export function buildBook(ctx) {
  const { C, X, LV, RM, esc, ic, img, vidEl, incList, tabsLv, roomViewer, header, footer, page, wa } = ctx;
  const SNAP = {
    asOf: '29 Sep 2026', base7: 1466,
    saturdays: ['2026-10-03', '2026-10-24', '2026-10-31', '2026-12-19', '2027-01-23', '2027-01-30', '2027-02-13', '2027-02-20', '2027-02-27', '2027-03-06', '2027-03-13', '2027-03-20', '2027-03-27', '2027-04-03'],
    rooms: { dorm: { one: 0, two: 0 }, twin: { one: 140.04, two: 80.025 }, deluxe: { one: 418.46, two: 418.46 } },
  };
  const B = X.booking;
  const addDays = (s, n) => { const t = new Date(s + 'T12:00:00Z'); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); };
  const fmtDate = (s) => new Date(s + 'T12:00:00Z').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  const outs = [...new Set(SNAP.saturdays.flatMap((s) => [7, 14, 21, 28].map((n) => addDays(s, n))))].sort();
  const pills = B.step_pills.slice(0, 3);

  const css = `
.desk{padding:100px 0 150px}
.prog{list-style:none;margin:0 auto 30px;padding:0;display:flex;justify-content:center;gap:8px;flex-wrap:wrap}
.prog button{display:flex;align-items:center;gap:10px;min-height:44px;padding:0 18px 0 8px;border-radius:999px;border:0;background:var(--tint-soft);color:var(--ink-2);font-size:15.5px;font-weight:500;cursor:pointer}
.prog .n{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#fff;font-size:13.5px;font-weight:700}
.prog .n svg{width:16px;height:16px;stroke-width:2.4}
.prog button[aria-current="step"]{background:var(--ink);color:#fff}
.prog button[aria-current="step"] .n{background:rgba(255,255,255,.16);color:#fff}
.prog button.done{color:var(--ink)}
.prog button.done .n{background:var(--place);color:#fff}
.prog button:disabled{cursor:default;opacity:.7}
.step{max-width:1120px;margin:0 auto}
.js .step:not(.on){display:none}
.no-js .step{margin-bottom:88px}
.js .step.in{animation:stepIn .3s var(--ease)}
.js .step.in.back{animation-name:stepBack}
@keyframes stepIn{from{opacity:0;transform:translateX(56px)}to{opacity:1;transform:none}}
@keyframes stepBack{from{opacity:0;transform:translateX(-56px)}to{opacity:1;transform:none}}
.step-h{text-align:center;margin-bottom:22px}
.step-h .count{font-size:15px;color:var(--ink-2);margin:0 0 2px}
.step-h h1,.step-h h2{font-family:var(--script);font-weight:400;font-size:clamp(50px,5.4vw,68px);line-height:1;margin:0}
.step-h h1:focus,.step-h h2:focus{outline:none}
.band{position:relative;height:clamp(240px,40vh,440px);border-radius:var(--r);overflow:hidden;background:#dfe3e6}
.band .lv-clip,.band .lv-clip img,.band .lv-clip video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.band .lv-clip{transition:opacity .4s var(--ease)}
.js .band .lv-clip:not(.on){opacity:0;visibility:hidden}
.no-js .band .lv-clip:not(:first-child){display:none}
.lvsum{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(28px,5vw,72px);margin-top:34px}
.lvsum h3{font-family:var(--serif);font-weight:600;font-size:28px;letter-spacing:-.015em;margin:0 0 6px}
.lvsum .one{font-size:18.5px;margin-bottom:12px}
.lvsum h4{font-family:var(--script);font-weight:400;font-size:44px;line-height:1;margin:0 0 18px}
.lvsum .note{margin:20px 0 0;font-size:15.5px;color:var(--ink-2)}
.lv-panel[hidden]{display:none}
.no-js .lv-panel{margin-bottom:36px}
.room .flag{display:none;font-size:15.5px;color:var(--book);font-weight:600;margin:-8px 0 14px}
.room-panel.full .flag{display:block}
.dgrid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:clamp(28px,4vw,56px);align-items:start}
.fields{display:grid;gap:14px}
.fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.fl{position:relative;min-height:64px;border-radius:12px;background:var(--tint-soft);padding:26px 14px 8px 16px;display:flex;align-items:center;gap:8px;transition:background-color .2s,box-shadow .2s}
.fl:focus-within{background:#fff;box-shadow:0 0 0 2px var(--place)}
.fl>label,.fl>.lab{position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:16.5px;color:var(--ink-2);pointer-events:none;transition:top .2s var(--ease),font-size .2s var(--ease),transform .2s var(--ease)}
.fl.filled>label,.fl.filled>.lab,.fl:focus-within>label,.fl.up>.lab{top:12px;transform:none;font-size:13px;font-weight:500}
.fl input[type=number]{flex:1;min-width:0;border:0;background:none;font:inherit;font-size:18px;font-weight:600;color:var(--ink);padding:0;-moz-appearance:textfield;outline:none}
.fl input::-webkit-inner-spin-button{-webkit-appearance:none}
.fl select{flex:1;border:0;background:none;font:inherit;font-size:17px;font-weight:500;color:var(--ink);outline:none;padding:0;appearance:none;min-height:30px}
.step-btn{width:44px;height:44px;border-radius:50%;border:0;background:#fff;display:grid;place-items:center;cursor:pointer;color:var(--ink);box-shadow:0 1px 4px rgba(10,25,32,.08);flex:none}
.step-btn:disabled{opacity:.35;cursor:default}
.step-btn svg{width:18px;height:18px;stroke-width:2}
.help{font-size:15px;color:var(--ink-2);margin:-4px 0 0 4px}
.help.err{color:var(--book);font-weight:600}
.chips{padding:34px 12px 12px 16px;display:block}
.chips .mo{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px}
.chips .mo span{width:84px;font-size:14.5px;color:var(--ink-2);font-weight:500}
.chips button{min-width:56px;min-height:44px;padding:0 12px;border-radius:10px;border:0;background:#fff;font:inherit;font-size:16px;font-weight:600;color:var(--ink);cursor:pointer;transition:background-color .2s,color .2s}
.chips button:hover{background:#DDF0F1}
.chips button[aria-pressed="true"]{background:var(--ink);color:#fff}
.seg{display:flex;gap:6px;flex:1}
.seg button{flex:1;min-height:44px;border-radius:9px;border:0;background:#fff;font:inherit;font-size:16.5px;font-weight:600;color:var(--ink);cursor:pointer}
.seg button[aria-pressed="true"]{background:var(--ink);color:#fff}
.fl.segf{padding-top:34px;padding-bottom:10px}
.card{background:var(--tint-soft);border-radius:var(--r);padding:28px}
.card h3{font-family:var(--script);font-weight:400;font-size:46px;line-height:1;margin:0 0 16px}
.rows{margin:0;display:grid;gap:10px}
.rows div{display:flex;justify-content:space-between;gap:18px;align-items:baseline}
.rows dt{color:var(--ink-2)}
.rows dd{margin:0;text-align:right;font-weight:600}
.rows .sum{padding-top:10px;margin-top:4px}
.rows .sum dt{color:var(--ink);font-weight:700;font-size:18px}
.rows .sum dd{font-weight:700;font-size:26px;letter-spacing:-.02em}
.rows+.rows{margin-top:18px}
.card .small{font-size:14.5px;color:var(--ink-2);margin:12px 0 0}
.card .btn{width:100%;margin-top:18px}
.card .hand{font-size:15px;color:var(--ink-2);margin:12px 0 0;text-align:center}
.nojs-go{display:grid;gap:10px}
.js .nojs-go{display:none}
.no-js .js-go,.no-js .jsonly{display:none}
.js .nojsonly{display:none}
.bbar{position:fixed;left:0;right:0;bottom:0;z-index:35;background:#fff;box-shadow:0 -8px 30px rgba(10,25,32,.10);padding:12px 0 calc(12px + env(safe-area-inset-bottom))}
.bbar .wrap{display:flex;align-items:center;gap:12px}
.bbar .sum{flex:1;min-width:0;line-height:1.25}
.bbar .sum b{font-size:19px;display:block}
.bbar .sum span{font-size:14px;color:var(--ink-2);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.no-js .bbar{display:none}
.hdr-wa .wa{color:var(--wa)}
@media (min-width:901px){.dgrid .card{position:sticky;top:96px}}
@media (max-width:900px){
  .hdr-wa{display:none}
  .lvsum,.dgrid{grid-template-columns:1fr}
  .desk{padding-top:84px}
  .prog button{padding:0 12px 0 6px;font-size:14.5px}
}
@media (max-width:640px){
  .fgrid{grid-template-columns:1fr}
  .band{height:32vh}
  .bbar .back{display:none}
  .chips .mo span{width:100%}
}
`;

  const body = `
${header('../', true)}
<main id="main" class="desk">
<form id="bk" method="get" action="https://globalsurfadventures.bookinglayer.com/en/product/level-1-fomies" class="wrap" novalidate>
 <ol class="prog" aria-label="Booking steps">${pills.map((p, k) => `<li><button type="button" data-step="${k}" ${k ? 'disabled' : 'aria-current="step"'}><span class="n">${k + 1}</span><span class="t">${esc(p)}</span></button></li>`).join('')}</ol>

 <section class="step on" id="s-level" aria-labelledby="h-level">
  <div class="step-h"><p class="count">${B.step_counter.replace('{n}', 1).replace('{total}', 3)}</p><h1 id="h-level" tabindex="-1">${esc(X.section_titles.book_level)}</h1></div>
  <div class="pills-row">${tabsLv('b')}</div>
  <div class="band">${LV.map((l, k) => vidEl(l, '../', k ? '' : 'on')).join('')}</div>
  ${LV.map((l) => `<div class="lv-panel" id="blv-${l.n}" role="tabpanel" aria-labelledby="btab-${l.n}">
   <div class="lvsum">
    <div><h3>${esc(l.label)}</h3><p class="one">${esc(l.one)}</p>
      <p class="detail">${esc(X.detail_lines.level_price).replace('$1,466', '<b>$1,466</b>')}</p>
      <p class="detail">${esc(X.detail_lines.trust)}</p></div>
    <div><h4>${esc(X.section_titles.book_included)}</h4>${incList(l)}<p class="note">${esc(X.inclusions.optional_extra)}</p></div>
   </div></div>`).join('')}
 </section>

 <section class="step" id="s-room" aria-labelledby="h-room">
  <div class="step-h"><p class="count">${B.step_counter.replace('{n}', 2).replace('{total}', 3)}</p><h2 id="h-room" tabindex="-1">${esc(X.section_titles.book_room)}</h2></div>
  <div id="bookRooms">${roomViewer('../', 'b', (r) => `<p class="flag">${esc(B.room_not_free)}</p><button type="button" class="btn btn-book pick jsonly" data-room="${r.key}">${esc(X.ctas.room)}</button>`)}</div>
  <p class="detail" style="text-align:center;margin-top:24px">${esc(X.rooms_note)}</p>
 </section>

 <section class="step" id="s-dates" aria-labelledby="h-dates">
  <div class="step-h"><p class="count">${B.step_counter.replace('{n}', 3).replace('{total}', 3)}</p><h2 id="h-dates" tabindex="-1">${esc(X.section_titles.book_dates)}</h2></div>
  <div class="dgrid">
   <div class="fields">
    <div class="fl up chips jsonly" role="group" aria-labelledby="dlab"><span class="lab" id="dlab">${esc(B.field_checkin)}</span><div id="chips"></div></div>
    <div class="fl filled nojsonly"><label for="d-start">${esc(B.field_checkin)}</label>
      <select id="d-start" name="start"><option value="">${esc(B.field_checkin_nojs_placeholder)}</option>${SNAP.saturdays.map((s) => `<option value="${s}">${fmtDate(s)}</option>`).join('')}</select></div>
    <div class="fl filled nojsonly"><label for="d-end">Check-out (Saturdays)</label>
      <select id="d-end" name="end"><option value="">${esc(B.field_checkin_nojs_placeholder)}</option>${outs.map((s) => `<option value="${s}">${fmtDate(s)}</option>`).join('')}</select></div>
    <p class="help" id="dhelp">${esc(B.field_checkin_help)}</p>
    <div class="fl up segf jsonly" role="group" aria-labelledby="nlab"><span class="lab" id="nlab">${esc(B.field_nights)}</span>
      <div class="seg">${X.booking.nights_options.map((n, k) => `<button type="button" data-nights="${n}" aria-pressed="${k === 0}">${n}</button>`).join('')}</div></div>
    <div class="fgrid">${[['female', B.field_women], ['male', B.field_men], ['couple', B.field_couples]].map(([n, l]) => `
      <div class="fl filled"><label for="g-${n}">${esc(l)}</label>
        <input id="g-${n}" name="${n}" type="number" inputmode="numeric" min="0" max="${n === 'couple' ? 3 : 6}" value="0">
        <button type="button" class="step-btn jsonly" data-dec="${n}" aria-label="${esc(B.stepper_less)}: ${esc(l)}">${ic('minus')}</button>
        <button type="button" class="step-btn jsonly" data-inc="${n}" aria-label="${esc(B.stepper_more)}: ${esc(l)}">${ic('plus')}</button>
      </div>`).join('')}</div>
    <p class="help" id="ghelp">${esc(B.guests_help)}</p>
   </div>
   <div class="card" aria-live="polite">
     <h3>${esc(X.section_titles.book_total)}</h3>
     <dl class="rows">
       <div><dt>${esc(B.summary_labels.level)}</dt><dd id="t-level">${esc(LV[0].label)}</dd></div>
       <div><dt>${esc(B.summary_labels.room)}</dt><dd id="t-room">${esc(RM[0].label)}</dd></div>
       <div class="jsonly"><dt>${esc(B.summary_labels.dates)}</dt><dd id="t-dates">–</dd></div>
       <div class="jsonly"><dt>${esc(B.summary_labels.guests)}</dt><dd id="t-guests">–</dd></div>
     </dl>
     <p class="small err" id="t-roomflag" hidden style="color:var(--book);font-weight:600"></p>
     <dl class="rows">
       <div><dt>${esc(B.total_package)}</dt><dd id="p-base">$1,466</dd></div>
       <div><dt>${esc(B.total_room)}</dt><dd id="p-room">${esc(B.room_included)}</dd></div>
       <div><dt>${esc(B.total_per_person)}</dt><dd id="p-pp">$1,466</dd></div>
       <div class="sum jsonly"><dt id="p-all-l">${esc(B.total_all.replace('{n}', 0))}</dt><dd id="p-all">–</dd></div>
     </dl>
     <p class="small" id="p-src">${esc(B.prices_snapshot.replace('{date}', SNAP.asOf))} | ${esc(B.currency_note)}</p>
     <p class="small">${esc(B.deposit)}</p>
     <div class="js-go"><button type="submit" class="btn btn-book">${esc(X.ctas.handoff)}</button></div>
     <div class="nojs-go">${LV.map((l) => `<button type="submit" class="btn btn-book" formaction="https://globalsurfadventures.bookinglayer.com/en/product/${l.slug}">${esc(X.ctas.handoff)}: ${esc(l.label)}</button>`).join('')}</div>
     <p class="hand">${esc(B.handoff)} ${esc(B.handoff_nothing_booked)}</p>
     <a class="btn btn-white" href="${wa}" data-wa>${ic('wa', 'i f wa')}${esc(X.ctas.whatsapp)}</a>
   </div>
  </div>
 </section>
</form>
</main>
${footer('../')}
<div class="bbar" id="bbar"><div class="wrap">
  <p class="sum" style="margin:0"><b id="b-total">From $1,466 pp</b><span id="b-sub"></span></p>
  <button type="button" class="btn btn-soft back" id="b-back" aria-label="Back">${ic('left')}</button>
  <button type="button" class="btn btn-book" id="b-next">${esc(X.ctas.step_next)}</button>
</div></div>
`;

  const js = `
(function(){var d=document,GS=window.GS;
var LV=${JSON.stringify(LV.map((l) => ({ n: l.n, slug: l.slug, id: l.id, label: l.label })))};
var RMS=${JSON.stringify(RM.map((r) => ({ key: r.key, label: r.label, title: r.engine_title })))};
var SNAP=${JSON.stringify(SNAP)};
var T=${JSON.stringify({ next: X.ctas.step_next, go: X.ctas.handoff, incl: B.room_included, supp: B.room_supplement, notFree: B.room_not_free, onlyOne: B.room_only_one_free, all: B.total_all, snap: B.prices_snapshot, live: B.prices_live, fb: B.prices_fallback, cur: B.currency_note, choose: B.field_checkin_nojs_placeholder, guestsHelp: B.guests_help, women: B.field_women, men: B.field_men, couples: B.field_couples, wa: wa })};
var BD='globalsurfadventures.bookinglayer.com',API='https://api.bookinglayer.io/public/';
var q=new URLSearchParams(location.search);
var lvq=+q.get('level');
var S={level:lvq>=1&&lvq<=3?lvq-1:0,room:Math.max(0,RMS.findIndex(function(r){return r.key===q.get('room');})),start:'',nights:7,g:{female:0,male:0,couple:0},live:null,liveFail:false,choosable:SNAP.saturdays.slice(),step:0,reached:0};
var steps=[].slice.call(d.querySelectorAll('.step')),prog=[].slice.call(d.querySelectorAll('.prog button'));
function money(v){var r=Math.round(v*100)/100;return '$'+r.toLocaleString('en-US',{minimumFractionDigits:r%1?2:0,maximumFractionDigits:2});}
function persons(){return S.g.female+S.g.male+2*S.g.couple;}
function addDays(s,n){var t=new Date(s+'T12:00:00Z');t.setUTCDate(t.getUTCDate()+n);return t.toISOString().slice(0,10);}
function fmt(s){return new Date(s+'T12:00:00Z').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});}
function short(s){return new Date(s+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',timeZone:'UTC'});}
function guestText(){var gl=[];if(S.g.female)gl.push(T.women+': '+S.g.female);if(S.g.male)gl.push(T.men+': '+S.g.male);if(S.g.couple)gl.push(T.couples+': '+S.g.couple);return gl.join(', ');}

/* ---- level (clip attached after first paint) ---- */
var clips=[].slice.call(d.querySelectorAll('#s-level .band .lv-clip')),lpanels=[].slice.call(d.querySelectorAll('#s-level .lv-panel')),painted=false;
function playLevel(){clips.forEach(function(c,j){var v=c.querySelector('video');if(j===S.level&&S.step===0&&painted)GS.attach(v);else if(!v.paused)v.pause();});}
function showLevel(k){S.level=k;clips.forEach(function(c,j){c.classList.toggle('on',j===k);});lpanels.forEach(function(p,j){p.hidden=j!==k;});S.live=null;S.choosable=SNAP.saturdays.slice();playLevel();render();}
var ltabs=GS.tabs(d.querySelector('#s-level [role=tablist]'),function(k){showLevel(k);if(persons())fetchCal();});
addEventListener('load',function(){requestAnimationFrame(function(){setTimeout(function(){painted=true;playLevel();},150);});});

/* ---- rooms ---- */
var rbox=d.getElementById('bookRooms'),rpanels=[].slice.call(rbox.querySelectorAll('.room-panel'));
var rtabs=GS.roomViewer(rbox,function(k){S.room=k;render();});
rbox.querySelectorAll('.pick').forEach(function(b,k){b.addEventListener('click',function(){S.room=k;go(2);});});

/* ---- check-in chips ---- */
var chips=d.getElementById('chips');
function drawChips(){var by={},h='';S.choosable.forEach(function(s){var m=s.slice(0,7);(by[m]=by[m]||[]).push(s);});
  Object.keys(by).sort().forEach(function(m){var lab=new Date(m+'-15T12:00:00Z').toLocaleDateString('en-GB',{month:'short',year:'numeric',timeZone:'UTC'});
    h+='<div class="mo"><span>'+lab+'</span>'+by[m].map(function(s){return '<button type="button" data-d="'+s+'" aria-pressed="'+(s===S.start)+'" aria-label="'+fmt(s)+'">Sat '+(+s.slice(8))+'</button>';}).join('')+'</div>';});
  chips.innerHTML=h;}
chips.addEventListener('click',function(e){var b=e.target.closest('[data-d]');if(!b)return;S.start=b.dataset.d;S.live=null;d.getElementById('dhelp').className='help';drawChips();render();refreshLive();});
d.querySelectorAll('[data-nights]').forEach(function(b){b.addEventListener('click',function(){S.nights=+b.dataset.nights;d.querySelectorAll('[data-nights]').forEach(function(x){x.setAttribute('aria-pressed',x===b);});S.live=null;render();refreshLive();});});

/* ---- guests ---- */
['female','male','couple'].forEach(function(n){var inp=d.getElementById('g-'+n),per=n==='couple'?2:1,max=n==='couple'?3:6;
  function set(v){v=Math.max(0,Math.min(max,v|0));var others=persons()-per*S.g[n];while(v>0&&others+per*v>6)v--;S.g[n]=v;inp.value=v;d.getElementById('ghelp').className='help';S.live=null;render();clearTimeout(gt);gt=setTimeout(function(){fetchCal();refreshLive();},600);}
  d.querySelector('[data-dec='+n+']').addEventListener('click',function(){set(S.g[n]-1);});
  d.querySelector('[data-inc='+n+']').addEventListener('click',function(){set(S.g[n]+1);});
  inp.addEventListener('change',function(){set(+inp.value);});});
var gt;
function stepBtns(){var p=persons();['female','male','couple'].forEach(function(n){var per=n==='couple'?2:1;d.querySelector('[data-dec='+n+']').disabled=S.g[n]<=0;d.querySelector('[data-inc='+n+']').disabled=p+per>6||S.g[n]>=(n==='couple'?3:6);});}

/* ---- live data, only after the visitor interacts (docs/bookinglayer.md §6) ---- */
function tfetch(u,o){var c=new AbortController();setTimeout(function(){c.abort();},8000);o=o||{};o.signal=c.signal;return fetch(u,o).then(function(r){if(!r.ok)throw r.status;return r.json();});}
function gq(){return '&female='+S.g.female+'&male='+S.g.male+'&couple='+S.g.couple+'&business_domain='+BD;}
function fetchCal(){if(persons()<1)return;var lv=LV[S.level],t=new Date(),e=new Date();e.setUTCFullYear(e.getUTCFullYear()+1);
  tfetch(API+'products/'+lv.id+'/availabilities?format=choosable&show_available_only=1&mode=checkin&start='+t.toISOString().slice(0,10)+'&end='+e.toISOString().slice(0,10)+gq())
  .then(function(j){var ds=j&&j.data&&j.data.dates;if(!ds)throw 'shape';var list=Object.keys(ds).filter(function(k){return ds[k].choosable;}).sort();if(!list.length)throw 'empty';S.choosable=list;if(S.start&&list.indexOf(S.start)<0){S.start='';}drawChips();render();})
  .catch(function(){});}
var lt;function refreshLive(){clearTimeout(lt);if(!S.start||persons()<1)return;lt=setTimeout(function(){
  var lv=LV[S.level],end=addDays(S.start,S.nights),guests=[];for(var i=0;i<persons();i++)guests.push({id:(crypto.randomUUID?crypto.randomUUID():'g'+i+Date.now()),index:i+1});
  Promise.all([tfetch(API+'accommodations/availabilities?product='+lv.id+'&start='+S.start+'&end='+end+'&currency=USD'+gq()),
    tfetch(API+'packages/'+lv.id+'/items?business_domain='+BD,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({start:S.start,end:end,currency:'USD',guests:guests,items:[]})})])
  .then(function(r){var acc=r[0]&&r[0].data,tot=r[1]&&r[1].data&&r[1].data.totals;if(!Array.isArray(acc)||!tot||typeof tot.base!=='number')throw 'shape';
    var rooms={};acc.forEach(function(a){var t=a.translations&&a.translations.en&&a.translations.en.title;if(!t)return;var p=a.price&&a.price.from;if(!(t in rooms)||(p||0)<rooms[t])rooms[t]=p||0;});
    S.live={base:tot.base,rooms:rooms};S.liveFail=false;render();})
  .catch(function(){S.liveFail=true;render();});},300);}

/* ---- totals ---- */
function calc(){var n=persons(),r=RMS[S.room];
  if(S.live&&n){var free=r.title in S.live.rooms;return{known:true,live:true,free:free,basePP:S.live.base/n,roomPP:free?S.live.rooms[r.title]:0};}
  if(S.nights!==7)return{known:false};
  var sr=SNAP.rooms[r.key];return{known:true,live:false,free:true,basePP:SNAP.base7,roomPP:n>=2?sr.two:sr.one};}
function waLink(){var u=new URL(T.wa),txt=u.searchParams.get('text')||'',lv=LV[S.level],bits=[lv.label];
  if(S.step>=1||q.get('room'))bits.push(RMS[S.room].label);if(S.start)bits.push(fmt(S.start)+', '+S.nights+' nights');if(persons())bits.push(guestText());
  return u.origin+u.pathname+'?text='+encodeURIComponent(txt+' '+bits.join(' | '));}
function render(){var n=persons(),c=calc(),lv=LV[S.level],r=RMS[S.room],has=!!S.start,end=has?addDays(S.start,S.nights):'';
  stepBtns();
  d.getElementById('t-level').textContent=lv.label;d.getElementById('t-room').textContent=r.label;
  d.getElementById('t-dates').textContent=has?'Sat '+short(S.start)+' – Sat '+short(end)+' '+end.slice(0,4):'–';
  d.getElementById('t-guests').textContent=guestText()||'–';
  var freeList=S.live?RMS.filter(function(x){return x.title in S.live.rooms;}):RMS;
  rpanels.forEach(function(p,k){p.classList.toggle('full',!!S.live&&!(RMS[k].title in S.live.rooms));
    if(S.live&&RMS[k].title in S.live.rooms){var v=S.live.rooms[RMS[k].title];p.querySelector('[data-price]').textContent=v?T.supp.replace('{amount}',(Math.round(v*100)/100).toLocaleString('en-US')):T.incl;}});
  var flag=d.getElementById('t-roomflag');
  if(S.live&&!c.free){flag.hidden=false;flag.textContent=freeList.length===1?T.onlyOne.replace('{room}',freeList[0].label):T.notFree;}else flag.hidden=true;
  var lbl=T.all.replace('{n}',n);if(n===1)lbl=lbl.replace(/guests$/,'guest');d.getElementById('p-all-l').textContent=lbl;
  if(c.known){var pp=c.basePP+c.roomPP;
    d.getElementById('p-base').textContent=money(c.basePP);d.getElementById('p-room').textContent=c.roomPP?'+'+money(c.roomPP):T.incl;
    d.getElementById('p-pp').textContent=money(pp);d.getElementById('p-all').textContent=n?money(pp*n):'–';
    d.getElementById('b-total').textContent=n&&has?money(pp*n):'From '+money(pp)+' pp';}
  else{['p-base','p-room','p-pp','p-all'].forEach(function(id){d.getElementById(id).textContent='–';});d.getElementById('b-total').textContent='From '+money(SNAP.base7)+' pp';}
  d.getElementById('p-src').textContent=(c.live?T.live:(S.liveFail?T.fb.replace('{date}',SNAP.asOf):T.snap.replace('{date}',SNAP.asOf)))+' | '+T.cur;
  d.getElementById('b-sub').textContent=lv.label+(S.step>=1?' | '+r.label:'')+(has?' | '+short(S.start)+'–'+short(end):'');
  d.getElementById('b-next').textContent=S.step===2?T.go:T.next;
  d.getElementById('b-back').style.visibility=S.step?'visible':'hidden';
  var w=waLink();d.querySelectorAll('[data-wa]').forEach(function(a){a.href=w;});}

/* ---- steps ---- */
var hashes=['level','room','dates'];
function go(k,fromHash){var back=k<S.step;S.step=k;S.reached=Math.max(S.reached,k);
  steps.forEach(function(s,j){s.classList.remove('in','back');s.classList.toggle('on',j===k);});
  var s=steps[k];void s.offsetWidth;s.classList.add('in');if(back)s.classList.add('back');
  prog.forEach(function(b,j){b.disabled=j>S.reached;var done=j<S.reached&&j!==k;b.classList.toggle('done',done);if(j===k)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');b.querySelector('.n').innerHTML=done?'<svg class="i"><use href="#i-check"/></svg>':String(j+1);});
  playLevel();if(k===1)GS.slides(rpanels[S.room].querySelector('.slides'));
  render();if(!fromHash)history.pushState(null,'','#'+hashes[k]);
  scrollTo({top:0,behavior:GS.RM?'auto':'smooth'});s.querySelector('[tabindex="-1"]').focus({preventScroll:true});}
prog.forEach(function(b,j){b.addEventListener('click',function(){go(j);});});
function submit(){var ok=true;
  if(!S.start){d.getElementById('dhelp').className='help err';d.getElementById('dhelp').textContent=T.choose;ok=false;}
  if(persons()<1){d.getElementById('ghelp').className='help err';ok=false;}
  if(!ok){if(S.step!==2)go(2);return;}
  var u='https://globalsurfadventures.bookinglayer.com/en/product/'+LV[S.level].slug+'?start='+S.start+'&end='+addDays(S.start,S.nights);
  ['female','male','couple'].forEach(function(n){if(S.g[n])u+='&'+n+'='+S.g[n];});location.href=u;}
d.getElementById('b-next').addEventListener('click',function(){if(S.step===2){submit();return;}go(S.step+1);});
d.getElementById('b-back').addEventListener('click',function(){go(Math.max(0,S.step-1));});
addEventListener('popstate',function(){var k=hashes.indexOf(location.hash.slice(1));go(k<0?0:Math.min(k,S.reached),true);});
d.getElementById('bk').addEventListener('submit',function(e){e.preventDefault();submit();});

/* ---- init: a level chosen on the home page skips straight to the room ---- */
rtabs.select(S.room);ltabs.select(S.level);showLevel(S.level);drawChips();
rpanels.forEach(function(p,k){p.hidden=k!==S.room;});
if(lvq>=1&&lvq<=3){S.reached=1;go(1,true);history.replaceState(null,'','#room');}else{history.replaceState(null,'','#level');render();}
})();
`;
  return page('../', `Book your surf week | ${C.businessName}`, C.tagline, css, body, js);
}
