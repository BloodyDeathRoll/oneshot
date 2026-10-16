(function(){
var D=document;
function $(s,r){return (r||D).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s))}
var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var F=$('#bk');
var ENGINE='https://globalsurfadventures.bookinglayer.com/en/product/';
var API='https://api.bookinglayer.io/public/',BD='business_domain=globalsurfadventures.bookinglayer.com';
var WA='https://wa.me/972523593240?text=';
var WA_BASE='Hi Global Surf Lodge Kabalana, I have a question about the surf packages.';
var LEVELS={
  'level-1-fomies':{name:'Level 1 – Fomies',id:'877aef3d-86ed-4b60-8932-03e49c613af8',n:1},
  'level-2-rollers':{name:'Level 2 – Rollers',id:'4b58b491-24fc-4fb8-a40d-2705df961db4',n:2},
  'level-3-riders':{name:'Level 3 – Riders',id:'54ec3447-2efb-4677-8685-f272e00d32e8',n:3}};
/* build-time snapshot: offers[].price (7 nights, 28 Sep 2026), room supplements (29 Sep 2026) */
var SNAP={base7:1466,supp:{dorm:function(){return 0},twin:function(g){return (g.n===2&&g.couple===1)?80.025:140.04},double:function(){return 418.46}}};
var ROOMS={dorm:'Mixed dorm room – 4 beds',twin:'Shared Twin Room – 2 Beds',double:'Deluxe double room'};
var live=null,liveFailed=false;

function money(x){var r=Math.round(x*100)/100;return '$'+r.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/,'')}
function level(){return $('input[name=level]:checked').value}
function room(){return $('input[name=room]:checked').value}
function nights(){return +$('input[name=duration]:checked').dataset.n}
function guests(){var f=+$('#f-female').value||0,m=+$('#f-male').value||0,c=+$('#f-couple').value||0;return {female:f,male:m,couple:c,n:f+m+2*c}}
function addDays(iso,d){var t=new Date(iso+'T12:00:00Z');t.setUTCDate(t.getUTCDate()+d);return t.toISOString().slice(0,10)}
function fmt(iso){return new Date(iso+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})}

/* preselect from the URL */
var q=new URLSearchParams(location.search);
if(LEVELS[q.get('level')])$('input[name=level][value="'+q.get('level')+'"]').checked=true;
if(ROOMS[q.get('room')])$('input[name=room][value="'+q.get('room')+'"]').checked=true;

/* steps: one question per screen */
var order=['level','room','dates','total'],cur='level',pills=$('.pills');pills.hidden=false;
function show(s,focus){
  cur=s;$$('.step').forEach(function(x){x.classList.toggle('cur',x.dataset.step===s)});
  $$('button',pills).forEach(function(b){var i=order.indexOf(b.dataset.go);b.setAttribute('aria-current',b.dataset.go===s?'step':'false');b.classList.toggle('done',i<order.indexOf(s))});
  D.documentElement.classList.toggle('js-total',s==='total');
  $('[data-next]').textContent=s==='total'?'Continue booking':'Next';
  if(focus!==false){scrollTo({top:0,behavior:calm?'auto':'smooth'});var h=$('#s-'+s+' .script');h&&h.focus({preventScroll:true})}
}
$$('[data-go]').forEach(function(b){b.addEventListener('click',function(){show(b.dataset.go)})});
var start=q.get('room')?'room':'level';if(q.get('level')&&!q.get('room'))start='room';
show(start,false);
/* a tile tap answers and moves on */
$$('input[name=level],input[name=room]').forEach(function(i){i.addEventListener('click',function(){setTimeout(function(){show(i.name==='level'?'room':'dates')},180)})});
$('[data-next]').addEventListener('click',function(){var i=order.indexOf(cur);if(cur==='total'){F.requestSubmit();return}show(order[i+1])});

/* Saturday chips, grouped by month, from the select */
var sel=$('#f-start'),chips=$('[data-chips]');
(function(){var months={};
  $$('option',sel).forEach(function(o){if(!o.value)return;var k=o.value.slice(0,7);(months[k]=months[k]||[]).push(o)});
  Object.keys(months).forEach(function(k){var m=D.createElement('div');m.className='chips-m';
    m.innerHTML='<p>'+new Date(k+'-01T12:00:00Z').toLocaleDateString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'})+'</p><div></div>';
    months[k].forEach(function(o){var b=D.createElement('button');b.type='button';b.className='chip';b.dataset.v=o.value;b.textContent='Sat '+(+o.value.slice(8));b.setAttribute('aria-pressed','false');b.setAttribute('aria-label',o.textContent);
      b.addEventListener('click',function(){sel.value=o.value;sel.dispatchEvent(new Event('change',{bubbles:true}))});$('div',m).appendChild(b)});
    chips.appendChild(m)});
  chips.hidden=false;D.documentElement.classList.add('chips-on')})();
function syncChips(){$$('.chip',chips).forEach(function(b){var o=$('option[value="'+b.dataset.v+'"]',sel);b.disabled=o.disabled;b.setAttribute('aria-pressed',sel.value===b.dataset.v?'true':'false')})}

/* steppers: never more than 6 guests */
$$('.stp').forEach(function(w){var inp=$('input',w);
  $$('.sb',w).forEach(function(b){b.addEventListener('click',function(){
    var d=+b.dataset.d;if(d>0&&guests().n+(inp.id==='f-couple'?2:1)>6)return;
    inp.value=Math.max(+inp.min,Math.min(+inp.max,(+inp.value||0)+d));inp.dispatchEvent(new Event('input',{bubbles:true}))})})});

/* gallery for a room tile */
var gal=$('#gal');
$$('[data-photos]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openGal(b)})});
var opener=null;
function openGal(b){opener=b;var tr=$('.gal-track',gal);tr.innerHTML='';$('#gal-t').textContent=b.dataset.name;
  b.dataset.photos.split(' ').forEach(function(p){var f=D.createElement('figure');var im=D.createElement('img');im.src='../img/room-'+p.split(':')[0]+'-1400.webp';im.alt=p.split(':').slice(1).join(':').replace(/_/g,' ');im.width=1400;im.height=933;f.appendChild(im);tr.appendChild(f)});
  gal.showModal();tr.scrollLeft=0;$('.gal-x',gal).focus()}
$('.gal-x',gal).addEventListener('click',function(){gal.close()});
gal.addEventListener('close',function(){opener&&opener.focus()});
$('.prev',gal).addEventListener('click',function(){var t=$('.gal-track',gal);t.scrollBy({left:-t.clientWidth,behavior:calm?'auto':'smooth'})});
$('.next',gal).addEventListener('click',function(){var t=$('.gal-track',gal);t.scrollBy({left:t.clientWidth,behavior:calm?'auto':'smooth'})});

/* the ticket */
var big=$('.ticket.big'),side=$('.side .ticket');
function set(k,v){$$('[data-s="'+k+'"]').forEach(function(x){x.textContent=v})}
function render(){
  var lv=level(),g=guests(),rm=room(),st=sel.value,n=nights();
  $('[data-sess]').textContent=LEVELS[lv].n===3?'5 coached surf sessions of 2 hours':'5 guided surf sessions of 2 hours';
  syncChips();
  set('level',LEVELS[lv].name);
  set('dates',st?fmt(st)+' – '+fmt(addDays(st,n))+' | '+n+' nights':'Choose a Saturday');
  var parts=[];if(g.female)parts.push(g.female+' '+(g.female===1?'woman':'women'));if(g.male)parts.push(g.male+' '+(g.male===1?'man':'men'));if(g.couple)parts.push(g.couple+' '+(g.couple===1?'couple':'couples'));
  set('guests',parts.length?parts.join(', '):'—');set('room',ROOMS[rm]);
  var lk=liveKey(),L=live&&live.key===lk?live:null;
  var basePP=L?L.basePP:(n===7?SNAP.base7:null),suppPP=L?L.supp[rm]:(n===7?SNAP.supp[rm](g):null);
  set('base',basePP==null?'Shown on the booking page':money(basePP));
  set('supp',suppPP==null?(L?'Not free on these dates':'Shown on the booking page'):(suppPP===0?'Included':'+'+money(suppPP)));
  var pp=(basePP!=null&&suppPP!=null)?basePP+suppPP:null;set('pp',pp==null?'—':money(pp));
  var cnt=Math.max(g.n,1);set('alllabel','Total for '+cnt+' '+(cnt===1?'guest':'guests'));set('all',pp==null||!g.n?'—':money(pp*cnt));
  set('note','Prices in USD | '+(L?'Live price from the booking engine':(liveFailed?"Live prices didn't load. These are the booking engine's prices from 29 Sep 2026.":'Prices from the booking engine, 29 Sep 2026')));
  $$('.rooms .tile').forEach(function(c){var k=$('input',c).value;c.classList.toggle('off',!!(L&&L.supp[k]==null))});
  var msg=WA_BASE+' '+LEVELS[lv].name+(st?', check-in '+fmt(st)+', '+n+' nights':'')+(parts.length?', '+parts.join(', '):'')+', '+ROOMS[rm]+'.';
  $$('[data-wa]').forEach(function(a){a.href=WA+encodeURIComponent(msg)});
  F.action=ENGINE+lv;
  big.innerHTML=side.innerHTML;
}

/* live engine data, only after the visitor has touched the booking controls */
var tmr,dateKey='';
function liveKey(){var g=guests();return [level(),sel.value,nights(),g.female,g.male,g.couple].join('|')}
function timeout(p,ms){return Promise.race([p,new Promise(function(_,rej){setTimeout(function(){rej(new Error('timeout'))},ms)})])}
function getJSON(u,o){return timeout(fetch(u,o).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}),7000)}
function refreshDates(){var g=guests();if(!g.n)return;var dk=level()+'|'+g.female+'|'+g.male+'|'+g.couple;if(dk===dateKey)return;dateKey=dk;
  var today=new Date().toISOString().slice(0,10);
  getJSON(API+'products/'+LEVELS[level()].id+'/availabilities?format=choosable&show_available_only=1&mode=checkin&start='+today+'&end='+addDays(today,300)+'&female='+g.female+'&male='+g.male+'&couple='+g.couple+'&'+BD).then(function(j){
    var d=j&&j.data&&j.data.dates;if(!d)throw new Error('shape');
    $$('option',sel).forEach(function(o){if(!o.value)return;o.disabled=!(d[o.value]&&d[o.value].choosable)});syncChips()}).catch(function(){dateKey=''})}
function refreshQuote(){var g=guests(),st=sel.value;if(!g.n||!st)return;var lk=liveKey(),id=LEVELS[level()].id,end=addDays(st,nights());
  var gs=[];for(var i=1;i<=g.n;i++)gs.push({id:'g'+i+'-'+Date.now(),index:i});
  Promise.all([getJSON(API+'accommodations/availabilities?product='+id+'&start='+st+'&end='+end+'&currency=USD&female='+g.female+'&male='+g.male+'&couple='+g.couple+'&'+BD),
    getJSON(API+'packages/'+id+'/items?'+BD,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({start:st,end:end,currency:'USD',guests:gs,items:[]})})]).then(function(r){
    var list=r[0]&&r[0].data,tot=r[1]&&r[1].data&&r[1].data.totals;if(!Array.isArray(list)||!tot||typeof tot.base!=='number')throw new Error('shape');
    var supp={dorm:null,twin:null,double:null};
    list.forEach(function(a){var t=(a.translations&&a.translations.en&&a.translations.en.title)||'';$$('.rooms .tile').forEach(function(c){if(c.dataset.engineTitle===t)supp[$('input',c).value]=a.price&&typeof a.price.from==='number'?a.price.from:0})});
    if(lk!==liveKey())return;live={key:lk,basePP:tot.base/g.n,supp:supp};liveFailed=false;
    var free=Object.keys(supp).filter(function(k){return supp[k]!=null});if(free.length&&supp[room()]==null)$('input[name=room][value="'+free[0]+'"]').checked=true;
    render()}).catch(function(){liveFailed=true;render()})}
function touch(){clearTimeout(tmr);tmr=setTimeout(function(){refreshDates();refreshQuote()},500)}
F.addEventListener('input',function(){render();touch()});
F.addEventListener('change',function(){render();touch()});

/* hand-off: GET to the engine's product with start, end (never duration) and the guest mix */
F.addEventListener('submit',function(ev){
  var st=sel.value;
  if(!st||!guests().n){ev.preventDefault();show('dates');setTimeout(function(){(st?$('#f-female'):($('.chip:not(:disabled)')||sel)).focus()},50);return}
  var e=D.createElement('input');e.type='hidden';e.name='end';e.value=addDays(st,nights());F.appendChild(e);
  var off=$$('input[name=duration],input[name=level],input[name=room]');['#f-female','#f-male','#f-couple'].forEach(function(s){if(!(+$(s).value))off.push($(s))});
  off.forEach(function(i){i.disabled=true});
  setTimeout(function(){off.forEach(function(i){i.disabled=false});e.remove()},500);
});
render();
})();
