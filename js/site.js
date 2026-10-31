/* =========================================================
   Covendos Healthcare Group – gemeinsames Script für alle Sprachen
   Inhalte und Texte kommen aus js/de.js bzw. js/en.js (Objekt SITE),
   die vor dieser Datei geladen werden.
   ========================================================= */
const T = SITE.t;
const MAIL = SITE.mail;
const BASE = SITE.base || '';
const { CHANNELS, TEAM, JOBS, AGENTS, TOPICS, PAPERS, SCALE, COLORS } = SITE;

/* Abschnitte und Ansichten je Sprache – für den Sprachumschalter */
const HASHES = [
  ['', ''], ['top', 'top'], ['inhalt', 'content'],
  ['deutschlandweit', 'germany'], ['leistungen', 'services'], ['personal', 'staffing'],
  ['lebenszyklus', 'lifecycle'], ['agenten', 'agents'], ['team', 'team'],
  ['wissen', 'whitepapers'], ['kontakt', 'contact'],
  ['karriere', 'careers'], ['stellen', 'jobs'], ['bewerben', 'apply'],
  ['marke', 'brand'], ['brand', 'brand'],
  ['impressum', 'legal-notice'], ['datenschutz', 'privacy']
];
const LANGS = ['de', 'en'];
function mapHash(h, from, to){
  if (from === to) return h;
  const row = HASHES.find(r => r[LANGS.indexOf(from)] === h);
  return row ? row[LANGS.indexOf(to)] : '';
}

/* =========================================================
   Helfer
   ========================================================= */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function store(key, val){ try{ if(val===undefined) return JSON.parse(localStorage.getItem(key)||'null'); localStorage.setItem(key, JSON.stringify(val)); }catch(e){ return null; } }

/* =========================================================
   Rendering der Listen
   ========================================================= */
function renderChannels(m){ $('#channel-list').innerHTML = CHANNELS[m].map(c => `<li>${esc(c)}</li>`).join(''); }
$('#agent-list').innerHTML = AGENTS.map(a => `<li class="agent"><h3 class="t-h5"><span class="dot" aria-hidden="true"></span>${esc(a.name)}</h3><p>${esc(a.text)}</p><p class="owner"><span class="ring" aria-hidden="true"></span>${esc(T.owner)} ${esc(a.owner)}</p></li>`).join('');
$('#team-list').innerHTML = TEAM.map(t => `<li class="member"><figure><img src="${BASE}img/team/${t.id}.webp" width="720" height="900" alt="${esc(T.portrait(t.name))}" loading="lazy"></figure><h3 class="t-h6">${esc(t.name)}</h3><p class="role">${esc(t.role)}</p><p class="bio">${esc(t.bio)}</p><p class="tags"><span>${esc(t.city)}</span>${t.agent?`<span><span class="dot" aria-hidden="true"></span>${esc(t.agent)}</span>`:''}</p><p class="mail"><a class="link" href="mailto:${t.mail}@covendos.com">${t.mail}@covendos.com</a></p></li>`).join('');
$('#job-list').innerHTML = JOBS.map(j => `<li class="job"><h3 class="t-h6">${esc(j.t)}</h3><p class="kind">${j.k==='own'?`<span class="ring" aria-hidden="true"></span>${esc(T.own)}`:`<span class="dot" aria-hidden="true"></span>${esc(T.client)}`}</p><p class="where">${esc(j.where)}<br>${esc(j.time)}</p><button type="button" class="btn ghost" data-job="${j.id}">${esc(T.applyBtn)}</button></li>`).join('');
$('#a-job').innerHTML = `<option value="${esc(T.initiative)}">${esc(T.initiative)}</option>` + JOBS.map(j => `<option value="${esc(j.t)}">${esc(j.t)}</option>`).join('');
$('#paper-list').innerHTML = PAPERS.map((p,i) => `<li class="paper"><div class="cover ${p.v}" aria-hidden="true"><span class="c-ring" style="width:${p.ring.s};aspect-ratio:1;left:${p.ring.x};top:${p.ring.y}"></span><span class="c-dot" style="width:${p.dot.s};aspect-ratio:1;left:${p.dot.x};top:${p.dot.y}"></span><div class="c-top"><span>Covendos</span><span>${esc(T.paperNo)}${i+1}</span></div><div class="c-title">${esc(p.title)}</div></div><h3 class="t-h6">${esc(p.title)}</h3><p class="sub">${esc(p.sub)}</p><p class="facts">${esc(T.paperFacts(p.for, p.min))}</p><button type="button" class="btn ghost" data-paper="${p.id}">${esc(T.paperBtn)}</button></li>`).join('');
$('#topic-groups').innerHTML = TOPICS.map((g,gi) => `<div class="topic-group" role="group" aria-labelledby="tg-${gi}"><span class="legend-label" id="tg-${gi}">${esc(g.group)}</span><div class="chips">${g.items.map(it => `<label class="chip"><input type="checkbox" name="topic" value="${esc(it)}"><span>${esc(it)}</span></label>`).join('')}</div></div>`).join('');
$('#scale-body').innerHTML = SCALE.map(r => `<tr><td><strong>${r[0]}</strong></td><td class="num">${r[1]}</td><td class="num">${r[2]}</td><td class="sample" style="font-size:${r[3]||'1rem'}">${r[4]}</td></tr>`).join('');
$('#swatches').innerHTML = COLORS.map(c => `<div class="sw"><div class="chipc" style="background:${c[1]}"></div><p><strong>${c[0]}</strong><br><span class="hex">${c[1]}</span><br><span class="small">${c[2]}</span></p></div>`).join('');
$('#spacing').innerHTML = ['0.382','0.618','1','1.618','2.618','4.236','6.854','11.089'].map(v => `<figure><div style="width:${v}rem;height:${v}rem"></div><figcaption>${v}</figcaption></figure>`).join('');

/* =========================================================
   Header, Navigation, Routing, Sprachumschalter
   ========================================================= */
const header = $('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

const menuBtn = $('.menu-btn'), nav = $('#nav');
function closeMenu(){ nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }
menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
$$('#nav a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuBtn.focus(); } });

const VIEWS = $$('#site, #brand, .view').map(el => el.id);
function showView(id){ VIEWS.forEach(v => { const el = document.getElementById(v); if (el) el.hidden = (v !== id); }); }
function updateLangLinks(h){
  $$('[data-lang]').forEach(a => {
    const to = mapHash(h, SITE.lang, a.dataset.lang);
    a.setAttribute('href', a.dataset.base + (to ? '#' + to : ''));
  });
}
function route(){
  const raw = decodeURIComponent(location.hash.replace('#',''));
  let h = (SITE.alias && SITE.alias[raw]) || raw;
  // Anker der anderen Sprache (z. B. /en/#karriere) auf den eigenen Abschnitt abbilden
  if (h && !document.getElementById(h)) { const other = LANGS.find(l => l !== SITE.lang); h = mapHash(h, other, SITE.lang) || h; }
  let view = 'site', target = null;
  if (h) {
    const el = document.getElementById(h);
    if (el) { const c = el.closest('#site, #brand, .view'); view = c ? c.id : 'site'; target = (c === el) ? null : el; }
  }
  const changed = document.getElementById(view).hidden;
  showView(view);
  $$('#nav a:not([data-lang])').forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + (view === 'site' ? h : view))));
  updateLangLinks(raw);
  if (target) requestAnimationFrame(() => target.scrollIntoView());
  else if (view !== 'site' || changed) { const top = () => window.scrollTo({top:0, left:0, behavior:'instant'}); top(); requestAnimationFrame(top); }
}
window.addEventListener('hashchange', route);
$$('[data-home]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); if(location.hash){ location.hash = ''; } window.scrollTo(0,0); route(); }));
$$('.view a[href="#"], #brand a[href="#"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); location.hash=''; route(); window.scrollTo(0,0); }));
route();

/* =========================================================
   Logo-Intro: Das Logo steht beim Öffnen groß im Hero (Klasse .intro,
   gesetzt im <head>) und gleitet dann an seinen Platz im Header.
   Scrollen, Tippen, Klicken oder eine Taste starten das Gleiten sofort.
   ========================================================= */
(function logoIntro(){
  const root = document.documentElement;
  if (!root.classList.contains('intro')) return;
  root.classList.add('intro-js');
  const big = $('.hero-logo'), small = $('.site-header .logo img');
  if (!big || !small || location.hash.length > 1 || window.scrollY > 40) { root.classList.remove('intro'); return; }

  const HOLD = 2600, DUR = 1100;            // Standzeit ab Seitenstart, Dauer des Gleitens (ms)
  const EASE = 'cubic-bezier(.65,0,.35,1)'; // gleich wie inOut() unten
  const inOut = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
  const TRIGGERS = ['wheel', 'touchstart', 'pointerdown', 'keydown', 'scroll', 'hashchange'];
  let started = false;

  function slide(){
    if (started) return; started = true;
    clearTimeout(timer);
    TRIGGERS.forEach(ev => window.removeEventListener(ev, slide, true));

    // Ausgangslage merken: großes Logo und die Inhalte, die mitgleiten
    const from = big.getBoundingClientRect();
    const opacity = getComputedStyle(big).opacity;
    // #site gleitet als Ganzes (gemessen an .hero-foot), Kicker und Headline zusätzlich seitlich
    const page = $('#site'), parts = [$('.hero-kicker'), $('.hero-title')];
    const measured = [$('.hero-foot'), ...parts];
    const before = measured.map(el => el.getBoundingClientRect());

    // Flieger: Kopie des großen Logos, fix positioniert, wird auf das Header-Logo verkleinert
    const fly = big.cloneNode();
    fly.className = 'logo-flyer';
    Object.assign(fly.style, { left: from.left + 'px', top: from.top + 'px', width: from.width + 'px', height: from.height + 'px', opacity });
    document.body.appendChild(fly);

    // Endlage herstellen, dann die Inhalte per FLIP von der alten Lage aus hineingleiten lassen
    root.classList.add('intro-fly');
    root.classList.remove('intro');
    const after = measured.map(el => el.getBoundingClientRect());
    const dyPage = before[0].top - after[0].top;
    const flip = (el, dx, dy) => {
      if (Math.abs(dx) < .5 && Math.abs(dy) < .5) return;
      el.style.transition = 'none';
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.getBoundingClientRect();
      el.style.transition = `transform ${DUR}ms ${EASE}`;
      el.style.transform = '';
      setTimeout(() => { el.style.transition = ''; }, DUR + 50);
    };
    flip(page, 0, dyPage);
    parts.forEach((el, i) => flip(el, before[i+1].left - after[i+1].left, before[i+1].top - after[i+1].top - dyPage));

    // Flieger folgt dem Header-Logo Bild für Bild (das Ziel kann sich beim Scrollen verkleinern)
    const t0 = performance.now();
    (function frame(now){
      const t = Math.min(1, (now - t0) / DUR), e = inOut(t);
      const to = small.getBoundingClientRect();
      const x = (to.left - from.left) * e, y = (to.top - from.top) * e;
      const s = (from.width + (to.width - from.width) * e) / from.width;
      fly.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
      fly.style.opacity = +opacity + (1 - opacity) * e;
      if (t < 1) requestAnimationFrame(frame);
      else { root.classList.remove('intro-fly'); fly.remove(); }
    })(t0);
  }

  const timer = setTimeout(slide, Math.max(700, HOLD - performance.now()));
  TRIGGERS.forEach(ev => window.addEventListener(ev, slide, { capture: true, passive: true }));
})();

/* Rx / OTC */
function setMarket(m){
  $$('.switch button').forEach(b => b.setAttribute('aria-pressed', b.dataset.market === m));
  $$('[data-rx][data-otc]').forEach(el => { el.textContent = el.dataset[m]; });
  $$('img[data-rx-src]').forEach(img => { img.src = img.dataset[m+'Src']; img.alt = img.dataset[m+'Alt']; });
  renderChannels(m);
}
$$('.switch button').forEach(b => b.addEventListener('click', () => setMarket(b.dataset.market)));
setMarket('rx');

/* =========================================================
   Downloads: Artifact-Capability, sonst normaler Browser-Download
   ========================================================= */
let downloadsP = null;
function getDownloads(){
  if (!downloadsP) downloadsP = (async () => {
    try {
      if (!(window.claude && typeof window.claude.use === 'function')) return null;
      return await Promise.race([window.claude.use('downloads'), new Promise(r => setTimeout(() => r(null), 10000))]);
    } catch(e) { return null; }
  })();
  return downloadsP;
}
getDownloads();
async function saveFile(filename, blob){
  const downloadsNS = await getDownloads();
  if (downloadsNS) {
    try { await downloadsNS.save({filename, data: blob}); return 'saved'; }
    catch(e){ if (e && e.code === 'declined') return 'declined'; if (e && e.code === 'rate_limited') return 'busy'; }
  }
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    return 'browser';
  } catch(e){ return 'failed'; }
}
function saveMessage(r, what, alt){ const m = T.save[r]; return typeof m === 'function' ? m(what, alt) : m; }

/* =========================================================
   Minimaler PDF-Writer (Helvetica, WinAnsi) – ohne externe Bibliothek
   ========================================================= */
const HELV = {"Helvetica":[278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584,761,556,0,222,556,333,1000,556,556,333,1000,667,333,1000,0,611,0,0,222,222,333,333,350,556,1000,333,1000,500,333,944,0,500,667,278,333,556,556,556,556,260,556,333,737,370,556,584,333,737,333,400,584,333,333,333,556,537,278,333,333,365,556,834,834,834,611,667,667,667,667,667,667,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,500,556,556,556,556,278,278,278,278,556,556,556,556,556,556,556,584,611,556,556,556,556,500,556,500],"Helvetica-Bold":[278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584,761,556,0,278,556,500,1000,556,556,333,1000,667,333,1000,0,611,0,0,278,278,500,500,350,556,1000,333,1000,556,333,944,0,500,667,278,333,556,556,556,556,280,556,333,737,370,556,584,333,737,333,400,584,333,333,333,611,556,278,333,333,365,556,834,834,834,611,722,722,722,722,722,722,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,556,556,556,556,556,278,278,278,278,611,611,611,611,611,611,611,584,611,611,611,611,611,556,611,556]};
const WIN = {'€':128,'‚':130,'„':132,'…':133,'‘':145,'’':146,'“':147,'”':148,'•':149,'–':150,'—':151};
function winCode(ch){ const c = ch.charCodeAt(0); if (WIN[ch]) return WIN[ch]; if (c >= 32 && c <= 126) return c; if (c >= 160 && c <= 255) return c; if (ch === ' ' || ch === ' ') return 32; return 63; }
class PDF {
  constructor(){ this.pages=[]; this.W=595.28; this.H=841.89; this.addPage(); }
  addPage(){ this.cur=[]; this.pages.push(this.cur); this.font='F1'; this.size=10; return this; }
  mm(v){ return v*72/25.4; }
  rgb(c){ return c.map(v => (v/255).toFixed(3)).join(' '); }
  width(text, size, bold){ const w = HELV[bold?'Helvetica-Bold':'Helvetica']; let s=0; for (const ch of text){ const c=winCode(ch); s += (w[c-32]||556); } return s/1000*size; }
  enc(text){ let o=''; for (const ch of text){ const c=winCode(ch); if (c===40||c===41||c===92) o+='\\'+String.fromCharCode(c); else if (c<128) o+=String.fromCharCode(c); else o+='\\'+c.toString(8).padStart(3,'0'); } return o; }
  text(x, y, str, {size=10, bold=false, color=[26,42,51]}={}){ this.cur.push(`BT /${bold?'F2':'F1'} ${size} Tf ${this.rgb(color)} rg ${this.mm(x).toFixed(2)} ${(this.H-this.mm(y)).toFixed(2)} Td (${this.enc(str)}) Tj ET`); }
  rect(x, y, w, h, {fill=null, stroke=null, lw=0.5}={}){ const op = fill&&stroke?'B':fill?'f':'S'; this.cur.push(`${fill?this.rgb(fill)+' rg ':''}${stroke?this.rgb(stroke)+' RG ':''}${lw} w ${this.mm(x).toFixed(2)} ${(this.H-this.mm(y+h)).toFixed(2)} ${this.mm(w).toFixed(2)} ${this.mm(h).toFixed(2)} re ${op}`); }
  line(x1,y1,x2,y2,{color=[214,223,228], lw=0.5}={}){ this.cur.push(`${this.rgb(color)} RG ${lw} w ${this.mm(x1).toFixed(2)} ${(this.H-this.mm(y1)).toFixed(2)} m ${this.mm(x2).toFixed(2)} ${(this.H-this.mm(y2)).toFixed(2)} l S`); }
  circle(cx, cy, r, {fill=null, stroke=null, lw=1}={}){ const k=0.5523*this.mm(r), X=this.mm(cx), Y=this.H-this.mm(cy), R=this.mm(r); const p=[`${(X+R).toFixed(2)} ${Y.toFixed(2)} m`,`${(X+R).toFixed(2)} ${(Y+k).toFixed(2)} ${(X+k).toFixed(2)} ${(Y+R).toFixed(2)} ${X.toFixed(2)} ${(Y+R).toFixed(2)} c`,`${(X-k).toFixed(2)} ${(Y+R).toFixed(2)} ${(X-R).toFixed(2)} ${(Y+k).toFixed(2)} ${(X-R).toFixed(2)} ${Y.toFixed(2)} c`,`${(X-R).toFixed(2)} ${(Y-k).toFixed(2)} ${(X-k).toFixed(2)} ${(Y-R).toFixed(2)} ${X.toFixed(2)} ${(Y-R).toFixed(2)} c`,`${(X+k).toFixed(2)} ${(Y-R).toFixed(2)} ${(X+R).toFixed(2)} ${(Y-k).toFixed(2)} ${(X+R).toFixed(2)} ${Y.toFixed(2)} c`]; const op = fill&&stroke?'B':fill?'f':'S'; this.cur.push(`${fill?this.rgb(fill)+' rg ':''}${stroke?this.rgb(stroke)+' RG ':''}${lw} w ${p.join(' ')} ${op}`); }
  wrap(text, maxW, size, bold){ const words = String(text).split(/\s+/); const lines=[]; let cur=''; for (const w of words){ const t = cur ? cur+' '+w : w; if (this.width(t,size,bold) <= this.mm(maxW)) cur=t; else { if(cur) lines.push(cur); cur=w; } } if(cur) lines.push(cur); return lines; }
  blob(){
    const objs=[]; const add = s => { objs.push(s); return objs.length; };
    const catalog = add(''); const pagesId = add('');
    const f1 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    const f2 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    const kids=[];
    for (const pg of this.pages){ const content = pg.join('\n'); const cId = add(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`); const pId = add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${this.W} ${this.H}] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >> >> /Contents ${cId} 0 R >>`); kids.push(pId); }
    objs[catalog-1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
    objs[pagesId-1] = `<< /Type /Pages /Kids [${kids.map(k=>k+' 0 R').join(' ')}] /Count ${kids.length} >>`;
    let out = '%PDF-1.4\n'; const offs=[];
    objs.forEach((o,i) => { offs.push(out.length); out += `${i+1} 0 obj\n${o}\nendobj\n`; });
    const xref = out.length;
    out += `xref\n0 ${objs.length+1}\n0000000000 65535 f \n` + offs.map(o => String(o).padStart(10,'0')+' 00000 n \n').join('');
    out += `trailer\n<< /Size ${objs.length+1} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return new Blob([out], {type:'application/pdf'});
  }
}
const LOGO = {"vb":[41.003906,107.941406,127.921875,82.238282],"p":[["M 114.09 150.45 C 113.67 150.67 112.85 150.87 111.80 150.87 C 109.20 150.87 107.28 149.13 107.28 145.78 C 107.28 142.37 109.38 140.49 112.05 140.49 C 113.12 140.49 113.81 140.72 114.11 140.88 L 113.81 141.92 C 113.39 141.71 112.83 141.56 112.08 141.56 C 110.10 141.56 108.62 142.94 108.62 145.71 C 108.62 148.38 109.95 149.79 112.04 149.79 C 112.73 149.79 113.42 149.64 113.85 149.43 Z M 114.09 150.45 ","nonzero"],["M 116.16 147.12 C 116.16 148.59 116.87 149.91 118.08 149.91 C 119.26 149.91 119.99 148.58 119.99 147.09 C 119.99 145.91 119.49 144.32 118.08 144.32 C 116.69 144.32 116.16 145.83 116.16 147.12 M 121.28 147.06 C 121.28 149.78 119.58 150.89 118.02 150.89 C 116.25 150.89 114.87 149.52 114.87 147.15 C 114.87 144.66 116.34 143.34 118.13 143.34 C 119.97 143.34 121.28 144.77 121.28 147.06 ","nonzero"],["M 123.26 143.48 L 124.53 147.56 C 124.73 148.17 124.89 148.78 125.04 149.39 L 125.07 149.39 C 125.22 148.78 125.40 148.19 125.60 147.56 L 126.86 143.48 L 128.16 143.48 L 125.60 150.73 L 124.41 150.73 L 121.91 143.48 Z M 123.26 143.48 ","nonzero"],["M 133.32 146.39 C 133.34 145.37 132.93 144.27 131.72 144.27 C 130.55 144.27 130.04 145.46 129.95 146.39 Z M 129.93 147.30 C 129.95 149.22 131.01 149.88 132.18 149.88 C 132.99 149.88 133.53 149.73 133.95 149.53 L 134.16 150.45 C 133.73 150.66 132.98 150.87 132.00 150.87 C 129.92 150.87 128.70 149.42 128.70 147.21 C 128.70 144.98 129.92 143.34 131.84 143.34 C 133.94 143.34 134.54 145.26 134.54 146.67 C 134.54 146.96 134.52 147.15 134.49 147.30 Z M 129.93 147.30 ","nonzero"],["M 136.08 145.41 C 136.08 144.63 136.05 144.08 136.02 143.48 L 137.13 143.48 L 137.21 144.58 L 137.24 144.58 C 137.58 143.94 138.35 143.34 139.41 143.34 C 140.40 143.34 141.72 143.99 141.72 146.25 L 141.72 150.74 L 140.46 150.74 L 140.46 146.42 C 140.46 145.33 140.10 144.39 138.99 144.39 C 138.24 144.39 137.63 144.94 137.42 145.69 C 137.37 145.86 137.34 146.08 137.34 146.31 L 137.34 150.74 L 136.08 150.74 Z M 136.08 145.41 ","nonzero"],["M 148.16 146.39 C 148.16 146.22 148.14 146.01 148.11 145.85 C 147.95 145.03 147.32 144.36 146.45 144.36 C 145.20 144.36 144.53 145.59 144.53 147.15 C 144.53 148.64 145.16 149.85 146.42 149.85 C 147.14 149.85 147.84 149.39 148.10 148.38 C 148.14 148.22 148.16 148.03 148.16 147.84 Z M 149.42 140.16 L 149.42 148.91 C 149.42 149.51 149.45 150.26 149.48 150.73 L 148.37 150.73 L 148.29 149.58 L 148.25 149.58 C 147.90 150.30 147.12 150.89 146.07 150.89 C 144.47 150.89 143.25 149.44 143.25 147.19 C 143.25 144.74 144.62 143.34 146.19 143.34 C 147.14 143.34 147.81 143.78 148.13 144.36 L 148.16 144.36 L 148.16 140.16 Z M 149.42 140.16 ","nonzero"],["M 152.25 147.12 C 152.25 148.59 152.96 149.91 154.17 149.91 C 155.35 149.91 156.08 148.58 156.08 147.09 C 156.08 145.91 155.58 144.32 154.17 144.32 C 152.78 144.32 152.25 145.83 152.25 147.12 M 157.37 147.06 C 157.37 149.78 155.67 150.89 154.11 150.89 C 152.34 150.89 150.96 149.52 150.96 147.15 C 150.96 144.66 152.43 143.34 154.22 143.34 C 156.06 143.34 157.37 144.77 157.37 147.06 ","nonzero"],["M 158.73 149.43 C 159.08 149.66 159.71 149.91 160.31 149.91 C 161.17 149.91 161.61 149.46 161.61 148.85 C 161.61 148.23 161.28 147.89 160.38 147.48 C 159.18 146.97 158.60 146.28 158.60 145.42 C 158.60 144.26 159.53 143.34 160.95 143.34 C 161.64 143.34 162.21 143.53 162.58 143.76 L 162.27 144.69 C 161.99 144.51 161.52 144.30 160.94 144.30 C 160.20 144.30 159.81 144.75 159.81 145.28 C 159.81 145.83 160.17 146.10 161.04 146.51 C 162.17 147.00 162.83 147.65 162.83 148.69 C 162.83 150.03 161.83 150.87 160.28 150.87 C 159.56 150.87 158.87 150.67 158.42 150.39 Z M 158.73 149.43 ","nonzero"],["M 109.08 158.62 L 109.08 162.89 L 113.35 162.89 L 113.35 158.62 L 114.62 158.62 L 114.62 168.73 L 113.35 168.73 L 113.35 164 L 109.08 164 L 109.08 168.73 L 107.82 168.73 L 107.82 158.62 Z M 109.08 158.62 ","nonzero"],["M 120.85 164.39 C 120.87 163.37 120.47 162.27 119.25 162.27 C 118.08 162.27 117.57 163.46 117.48 164.39 Z M 117.47 165.30 C 117.48 167.22 118.55 167.88 119.72 167.88 C 120.53 167.88 121.07 167.73 121.49 167.53 L 121.70 168.45 C 121.26 168.66 120.51 168.87 119.54 168.87 C 117.45 168.87 116.24 167.41 116.24 165.21 C 116.24 162.98 117.45 161.34 119.37 161.34 C 121.47 161.34 122.07 163.26 122.07 164.67 C 122.07 164.96 122.06 165.15 122.03 165.30 Z M 117.47 165.30 ","nonzero"],["M 127.10 165.01 C 125.91 165.00 124.35 165.21 124.35 166.66 C 124.35 167.55 124.89 167.92 125.48 167.92 C 126.30 167.92 126.86 167.40 127.04 166.76 C 127.08 166.62 127.10 166.47 127.10 166.33 Z M 128.33 167.03 C 128.33 167.62 128.34 168.24 128.43 168.74 L 127.29 168.74 L 127.19 167.87 L 127.14 167.87 C 126.77 168.42 126.08 168.89 125.15 168.89 C 123.84 168.89 123.09 167.91 123.09 166.80 C 123.09 165.03 124.61 164.12 127.07 164.13 L 127.07 163.95 C 127.07 163.25 126.87 162.28 125.57 162.30 C 124.95 162.30 124.33 162.48 123.89 162.78 L 123.60 161.92 C 124.11 161.60 124.92 161.34 125.78 161.34 C 127.76 161.34 128.33 162.69 128.33 164.19 Z M 128.33 167.03 ","nonzero"],["M 130.32 158.16 L 131.58 158.16 L 131.58 168.73 L 130.32 168.73 Z M 130.32 158.16 ","nonzero"],["M 135.17 159.75 L 135.17 161.48 L 136.91 161.48 L 136.91 162.44 L 135.17 162.44 L 135.17 166.47 C 135.17 167.39 135.45 167.82 136.10 167.82 C 136.40 167.82 136.59 167.79 136.77 167.75 L 136.82 168.71 C 136.58 168.80 136.22 168.87 135.74 168.87 C 135.18 168.87 134.70 168.69 134.40 168.35 C 134.07 167.97 133.92 167.37 133.92 166.47 L 133.92 162.44 L 132.87 162.44 L 132.87 161.48 L 133.92 161.48 L 133.92 160.17 Z M 135.17 159.75 ","nonzero"],["M 138.27 158.16 L 139.53 158.16 L 139.53 162.51 L 139.56 162.51 C 139.76 162.18 140.06 161.88 140.40 161.67 C 140.76 161.48 141.17 161.34 141.65 161.34 C 142.59 161.34 143.91 161.97 143.91 164.26 L 143.91 168.73 L 142.65 168.73 L 142.65 164.42 C 142.65 163.32 142.28 162.39 141.18 162.39 C 140.43 162.39 139.83 162.93 139.61 163.67 C 139.55 163.83 139.53 164.04 139.53 164.26 L 139.53 168.73 L 138.27 168.73 Z M 138.27 158.16 ","nonzero"],["M 150.58 168.5 C 150.27 168.66 149.61 168.87 148.77 168.87 C 146.78 168.87 145.44 167.44 145.44 165.18 C 145.44 162.99 146.84 161.34 149.04 161.34 C 149.70 161.34 150.32 161.52 150.63 161.69 L 150.35 162.66 C 150.08 162.53 149.64 162.36 149.03 162.36 C 147.51 162.36 146.73 163.65 146.73 165.12 C 146.73 166.82 147.68 167.83 149.01 167.83 C 149.62 167.83 150.05 167.69 150.39 167.53 Z M 150.58 168.5 ","nonzero"],["M 155.46 165.01 C 154.28 165.00 152.72 165.21 152.72 166.66 C 152.72 167.55 153.26 167.92 153.84 167.92 C 154.67 167.92 155.22 167.40 155.40 166.76 C 155.44 166.62 155.46 166.47 155.46 166.33 Z M 156.69 167.03 C 156.69 167.62 156.71 168.24 156.80 168.74 L 155.66 168.74 L 155.55 167.87 L 155.51 167.87 C 155.13 168.42 154.44 168.89 153.51 168.89 C 152.21 168.89 151.46 167.91 151.46 166.80 C 151.46 165.03 152.97 164.12 155.43 164.13 L 155.43 163.95 C 155.43 163.25 155.24 162.28 153.93 162.30 C 153.32 162.30 152.70 162.48 152.25 162.78 L 151.97 161.92 C 152.48 161.60 153.28 161.34 154.14 161.34 C 156.12 161.34 156.69 162.69 156.69 164.19 Z M 156.69 167.03 ","nonzero"],["M 158.67 163.62 C 158.67 162.84 158.64 162.10 158.61 161.48 L 159.72 161.48 L 159.78 162.82 L 159.83 162.82 C 160.13 161.94 160.88 161.34 161.69 161.34 C 161.82 161.34 161.91 161.34 162.02 161.37 L 162.02 162.60 C 161.91 162.57 161.79 162.57 161.64 162.57 C 160.77 162.57 160.14 163.26 159.98 164.19 C 159.94 164.39 159.93 164.60 159.93 164.82 L 159.93 168.73 L 158.67 168.73 Z M 158.67 163.62 ","nonzero"],["M 167.21 164.39 C 167.22 163.37 166.82 162.27 165.60 162.27 C 164.43 162.27 163.92 163.46 163.83 164.39 Z M 163.82 165.30 C 163.83 167.22 164.90 167.88 166.07 167.88 C 166.88 167.88 167.42 167.73 167.84 167.53 L 168.05 168.45 C 167.61 168.66 166.86 168.87 165.89 168.87 C 163.80 168.87 162.59 167.41 162.59 165.21 C 162.59 162.98 163.80 161.34 165.72 161.34 C 167.82 161.34 168.42 163.26 168.42 164.67 C 168.42 164.96 168.41 165.15 168.38 165.30 Z M 163.82 165.30 ","nonzero"],["M 114.71 186.35 C 114.17 186.56 113.13 186.84 111.99 186.84 C 110.66 186.84 109.52 186.5 108.63 185.61 C 107.81 184.78 107.28 183.44 107.28 181.77 C 107.30 178.47 109.34 176.52 112.25 176.52 C 113.25 176.52 114.05 176.73 114.45 176.92 L 114.15 177.98 C 113.69 177.76 113.10 177.60 112.23 177.60 C 110.13 177.60 108.60 178.98 108.60 181.69 C 108.60 184.42 110.03 185.79 112.05 185.79 C 112.77 185.79 113.24 185.69 113.48 185.57 L 113.48 182.46 L 111.66 182.46 L 111.66 181.44 L 114.71 181.44 Z M 114.71 186.35 ","nonzero"],["M 116.51 181.62 C 116.51 180.84 116.48 180.10 116.45 179.48 L 117.56 179.48 L 117.62 180.82 L 117.66 180.82 C 117.96 179.94 118.71 179.34 119.52 179.34 C 119.66 179.34 119.75 179.34 119.85 179.37 L 119.85 180.60 C 119.75 180.57 119.63 180.57 119.48 180.57 C 118.61 180.57 117.98 181.26 117.81 182.19 C 117.78 182.39 117.77 182.60 117.77 182.82 L 117.77 186.73 L 116.51 186.73 Z M 116.51 181.62 ","nonzero"],["M 121.71 183.12 C 121.71 184.59 122.42 185.91 123.63 185.91 C 124.82 185.91 125.54 184.57 125.54 183.09 C 125.54 181.91 125.04 180.32 123.63 180.32 C 122.24 180.32 121.71 181.83 121.71 183.12 M 126.83 183.06 C 126.83 185.78 125.13 186.89 123.57 186.89 C 121.80 186.89 120.42 185.52 120.42 183.15 C 120.42 180.66 121.89 179.34 123.68 179.34 C 125.52 179.34 126.83 180.76 126.83 183.06 ","nonzero"],["M 133.92 184.76 C 133.92 185.52 133.95 186.16 133.98 186.73 L 132.87 186.73 L 132.80 185.69 L 132.77 185.69 C 132.47 186.19 131.76 186.89 130.62 186.89 C 129.44 186.89 128.34 186.15 128.34 183.82 L 128.34 179.48 L 129.60 179.48 L 129.60 183.62 C 129.60 184.92 129.96 185.83 131.03 185.83 C 131.85 185.83 132.38 185.21 132.56 184.69 C 132.62 184.50 132.66 184.28 132.66 184.02 L 132.66 179.48 L 133.92 179.48 Z M 133.92 184.76 ","nonzero"],["M 137.21 183.87 C 137.21 184.07 137.22 184.25 137.27 184.42 C 137.49 185.37 138.21 185.87 138.96 185.87 C 140.24 185.87 140.90 184.68 140.90 183.07 C 140.90 181.62 140.25 180.38 138.99 180.38 C 138.21 180.38 137.48 181.01 137.28 181.89 C 137.24 182.06 137.21 182.25 137.21 182.43 Z M 135.94 181.82 C 135.94 180.82 135.92 180.10 135.89 179.48 L 137.01 179.48 L 137.09 180.63 L 137.12 180.63 C 137.61 179.78 138.39 179.34 139.38 179.34 C 141.00 179.34 142.17 180.78 142.17 183.03 C 142.17 185.66 140.72 186.89 139.19 186.89 C 138.30 186.89 137.60 186.47 137.24 185.83 L 137.21 185.83 L 137.21 189.67 L 135.94 189.67 Z M 135.94 181.82 ","nonzero"],["M 78.66 108.89 C 77.96 109.53 77.88 110.60 78.46 111.33 C 85.41 120.09 96.30 136.09 91.12 144.87 C 88.13 149.94 80.06 151.94 69.53 150.21 C 63.88 149.30 59.41 147.42 57.46 146.54 C 51.66 143.88 47.07 140.19 46.23 136.18 C 46.08 135.48 46.22 133.76 47.78 132.23 C 48.03 131.97 48.35 131.71 48.73 131.44 C 49.12 131.17 49.58 130.91 50.12 130.66 C 51.20 130.16 52.62 129.71 54.49 129.44 C 54.80 129.39 55.12 129.35 55.46 129.32 C 56.12 129.25 56.84 129.19 57.62 129.17 C 58.01 129.16 58.41 129.15 58.82 129.15 C 59.96 129.15 61.20 129.20 62.55 129.31 C 64.81 129.5 67.39 129.85 70.32 130.42 L 63.97 147.80 C 63.97 147.80 65.87 148.50 68.90 148.97 L 77.35 128.79 C 77.55 128.30 77.53 127.75 77.28 127.27 C 77.03 126.80 76.59 126.47 76.07 126.35 C 56.76 122.17 48.40 125.43 44.78 128.91 C 41.83 131.74 41.50 135.11 41.77 136.65 C 42.88 142.93 53.07 184.13 53.17 184.53 C 53.36 185.33 54.08 185.90 54.90 185.90 L 55.06 185.89 C 69.43 184.59 93.67 174.25 100.08 156.16 C 105.13 141.89 98.75 126.01 81.10 108.93 C 80.76 108.60 80.31 108.44 79.86 108.44 C 79.43 108.44 79.00 108.59 78.66 108.89 ","nonzero"],["M 70.32 130.42 L 63.97 147.80 C 63.97 147.80 65.87 148.50 68.90 148.97 L 76.25 131.42 Z M 62.97 148.80 L 64.89 149.21 C 64.24 149.03 63.61 148.85 63.02 148.66 Z M 62.97 148.80 ","nonzero"]]};
PDF.prototype.svg = function(paths, vb, x, y, w, color){
  const sc = w / vb[2], H = this.H, mm = v => v*72/25.4;
  const X = px => mm(x + (px - vb[0]) * sc).toFixed(2), Y = py => (H - mm(y + (py - vb[1]) * sc)).toFixed(2);
  const ops = [this.rgb(color) + ' rg'];
  for (const [d, rule] of paths){
    const t = d.match(/[MLCZ]|-?\d*\.?\d+/g); let i = 0, cmd = ''; const o = [];
    while (i < t.length){
      if (/[MLCZ]/.test(t[i])) { cmd = t[i++]; if (cmd === 'Z') { o.push('h'); continue; } }
      if (cmd === 'M') { o.push(`${X(+t[i])} ${Y(+t[i+1])} m`); i += 2; cmd = 'L'; }
      else if (cmd === 'L') { o.push(`${X(+t[i])} ${Y(+t[i+1])} l`); i += 2; }
      else if (cmd === 'C') { o.push(`${X(+t[i])} ${Y(+t[i+1])} ${X(+t[i+2])} ${Y(+t[i+3])} ${X(+t[i+4])} ${Y(+t[i+5])} c`); i += 6; }
      else i++;
    }
    ops.push(o.join(' ') + (rule === 'evenodd' ? ' f*' : ' f'));
  }
  this.cur.push(ops.join('\n'));
};
const C = {ink:[29,42,50], slate:[94,111,121], red:[237,25,46], line:[218,225,229], mist:[243,245,247], white:[255,255,255]};
function pdfLogo(d, x, y, s=1, dark=false){ d.svg(LOGO.p, LOGO.vb, x, y - 8, 34 * s, dark ? C.white : C.red); }
function pdfFooter(d, n){ d.line(20, 282, 190, 282); d.text(20, 287, T.pdfFooter, {size:7.5, color:C.slate}); d.text(183, 287, String(n), {size:7.5, color:C.slate}); }
function writer(d, startY=30){
  let y = startY, page = 1; const L=20, R=190, W=R-L;
  const need = h => { if (y + h > 272){ pdfFooter(d, page); d.addPage(); page++; y = 26; } };
  return {
    get y(){ return y; }, set y(v){ y=v; }, get page(){ return page; },
    h(text, size=13){ need(14); y += 4; for (const ln of d.wrap(text, W, size, true)){ d.text(L, y, ln, {size, bold:true, color:C.ink}); y += size*0.48; } y += 2.5; },
    p(text, size=10, color=C.ink){ for (const ln of d.wrap(text, W, size, false)){ need(6); d.text(L, y, ln, {size, color}); y += size*0.5; } y += 3; },
    li(items, size=10){ for (const it of items){ const lines = d.wrap(it, W-7, size, false); need(lines.length*5+2); d.circle(L+1.6, y-1.2, 1.1, {fill:C.red}); lines.forEach(ln => { d.text(L+6, y, ln, {size}); y += size*0.5; }); y += 1.8; } y += 1.5; },
    box(label, checked){ need(7); d.circle(L+2.2, y-1.3, 2.0, {stroke:C.slate, lw:0.9, fill: checked?C.red:null}); d.text(L+7, y, label, {size:10.5}); y += 6.2; },
    gap(v){ y += v; },
    keep(h){ need(h); },
    done(){ pdfFooter(d, page); }
  };
}
function paperPDF(p, reader){
  const d = new PDF();
  // Titelseite
  d.rect(0,0,210,297,{fill:C.mist});
  pdfLogo(d, 20, 24);
  d.circle(146, 120, 54, {stroke:C.slate, lw:2.2});
  d.circle(56.1, 120, 33.4, {fill:C.red});
  d.text(20, 206, T.wp.label, {size:8, bold:true, color:C.slate});
  let y = 220; for (const ln of d.wrap(p.title, 170, 30, true)){ d.text(20, y, ln, {size:30, bold:true, color:C.ink}); y += 13; }
  y += 1; for (const ln of d.wrap(p.sub, 160, 14, false)){ d.text(20, y, ln, {size:14, color:C.slate}); y += 7; }
  d.text(20, 284, T.wp.forLine(p.for), {size:8.5, color:C.slate});
  if (reader) d.text(20, 289, T.wp.readerLine(reader), {size:8.5, color:C.slate});
  // Inhalt
  d.addPage(); pdfLogo(d, 20, 16, .8);
  const w = writer(d, 32);
  for (const b of p.blocks){ if (b.h) w.h(b.h); if (b.p) w.p(b.p); if (b.li) w.li(b.li); }
  w.keep(42); w.h(T.wp.aboutH);
  w.p(T.wp.about);
  w.p(T.wp.cta + MAIL, 10, C.slate);
  w.done();
  return d.blob();
}

/* =========================================================
   Kontaktformular
   ========================================================= */
const form = $('#contact-form');
const val = id => ($('#'+id).value || '').trim();
function selectedTopics(){ return $$('input[name="topic"]:checked').map(i => i.value); }
function market(){ const r = $('input[name="market"]:checked'); return r ? r.value : ''; }
const B = T.brief;
function contextLines(){ return [B.market + ': ' + (market()||B.open), B.area + ': ' + (val('f-area')||B.open), B.phase + ': ' + (val('f-phase')||B.open), B.time + ': ' + (val('f-time')||B.open)]; }
function briefingText(){
  const t = selectedTopics(); const lines = [];
  lines.push(B.greet, '', B.intro, '');
  lines.push(B.topicsH); if (t.length) t.forEach(x => lines.push('– ' + x)); else lines.push('– ' + B.noTopics);
  lines.push('', B.contextH, ...contextLines().map(l => '– ' + l));
  if (val('f-msg')) lines.push('', B.msgH, val('f-msg'));
  lines.push('', B.bye, val('f-name') || B.namePh);
  const sig = [val('f-role'), val('f-company')].filter(Boolean).join(', '); if (sig) lines.push(sig);
  const reach = [val('f-mail'), val('f-phone')].filter(Boolean).join(' | '); if (reach) lines.push(reach);
  return lines.join('\n');
}
function subject(){ return B.subject(val('f-company'), selectedTopics().length); }
const mailHead = (to, subj) => `${T.to}: ${to}\n${T.subj}: ${subj}\n\n`;
function updatePreview(){
  const n = selectedTopics().length;
  $('#topic-count').textContent = B.count(n);
  const text = briefingText();
  $('#preview').textContent = mailHead(MAIL, subject()) + text;
  $('#mail-btn').href = `mailto:${MAIL}?subject=${encodeURIComponent(subject())}&body=${encodeURIComponent(text)}`;
  if (n) $('#err-topics').textContent = '';
}
form.addEventListener('input', e => { updatePreview(); const f = e.target.closest('.field'); if (f) { f.classList.remove('invalid'); const er = $('.err', f); if (er) er.textContent=''; } if (e.target.id==='f-consent') $('#consent-wrap').classList.remove('invalid'); });
form.addEventListener('change', updatePreview);
form.addEventListener('submit', e => e.preventDefault());
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
function setErr(id, msg){ const f = $('#'+id).closest('.field'); f.classList.add('invalid'); const er = $(`.err[data-for="${id}"]`); if (er) er.textContent = msg; }
function validate(){
  let first = null; const mark = (el) => { if (!first) first = el; };
  if (!selectedTopics().length){ $('#err-topics').textContent = T.err.topics; mark($('#topic-groups input')); }
  if (!val('f-name')){ setErr('f-name', T.err.name); mark($('#f-name')); }
  if (!val('f-company')){ setErr('f-company', T.err.company); mark($('#f-company')); }
  if (!emailOk(val('f-mail'))){ setErr('f-mail', T.err.mail); mark($('#f-mail')); }
  if (!$('#f-consent').checked){ $('#consent-wrap').classList.add('invalid'); mark($('#f-consent')); }
  if (first){ first.focus({preventScroll:true}); first.scrollIntoView({block:'center'}); return false; }
  return true;
}
const status = (msg, err=false) => { const s = $('#form-status'); s.textContent = msg; s.classList.toggle('err-s', err); };
$('#mail-btn').addEventListener('click', e => {
  if (!validate()){ e.preventDefault(); status(T.err.missing, true); return; }
  updatePreview();
  status(T.msg.mailOpen(MAIL));
});
$('#copy-btn').addEventListener('click', async () => {
  const text = mailHead(MAIL, subject()) + briefingText();
  try { await navigator.clipboard.writeText(text); status(T.msg.copied(MAIL)); }
  catch(e){ const r = document.createRange(); r.selectNodeContents($('#preview')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); status(T.msg.selected); }
});
function briefingPDF(){
  const P = T.pdf;
  const d = new PDF(); pdfLogo(d, 20, 18);
  d.text(20, 40, P.brTitle, {size:26, bold:true});
  d.text(20, 48, new Date().toLocaleDateString(SITE.locale, {day:'2-digit', month:'long', year:'numeric'}), {size:10, color:C.slate});
  const w = writer(d, 60);
  w.h(P.contactH, 12);
  const contact = [val('f-name'), [val('f-role'), val('f-company')].filter(Boolean).join(', '), [val('f-mail'), val('f-phone')].filter(Boolean).join(' | ')].filter(Boolean);
  w.p(contact.length ? contact.join('  /  ') : P.noData);
  w.h(P.topicsH, 12);
  TOPICS.forEach(g => { const chosen = g.items.filter(i => selectedTopics().includes(i)); if (chosen.length){ w.p(g.group, 9, C.slate); chosen.forEach(i => w.box(i, true)); } });
  if (!selectedTopics().length) w.p(P.noTopics);
  w.h(P.contextH, 12);
  w.li(contextLines());
  if (val('f-msg')){ w.h(P.msgH, 12); w.p(val('f-msg')); }
  w.gap(4); w.p(P.brNote(MAIL), 9.5, C.slate);
  w.done(); return d.blob();
}
function checklistPDF(){
  const P = T.pdf;
  const d = new PDF(); pdfLogo(d, 20, 18);
  d.text(20, 40, P.clTitle, {size:26, bold:true});
  d.text(20, 48, P.clSub, {size:10.5, color:C.slate});
  const w = writer(d, 58);
  TOPICS.forEach(g => { w.p(g.group, 9, C.slate); g.items.forEach(i => w.box(i, false)); w.gap(.5); });
  w.keep(60); w.h(P.clContextH, 12);
  P.clContext.forEach(l => { w.p(l); d.line(70, w.y-4.5, 190, w.y-4.5); });
  w.h(P.contactH, 12);
  P.clContact.forEach(l => { w.p(l); d.line(70, w.y-4.5, 190, w.y-4.5); });
  w.gap(4); w.p(P.clNote(MAIL), 9.5, C.slate);
  w.done(); return d.blob();
}
$('#pdf-btn').addEventListener('click', async () => {
  if (!selectedTopics().length){ $('#err-topics').textContent = T.err.topics; status(T.err.chooseFirst, true); return; }
  const name = T.pdf.brFile + (val('f-company') ? '-' + val('f-company').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') : '') + '.pdf';
  const r = await saveFile(name, briefingPDF()); status(saveMessage(r, T.pdf.brWhat, T.pdf.brAlt), r==='failed');
});
$('#checklist-btn').addEventListener('click', async () => { const r = await saveFile(T.pdf.clFile, checklistPDF()); status(saveMessage(r, T.pdf.clWhat, T.pdf.clAlt), r==='failed'); });
updatePreview();

/* =========================================================
   Bewerbung
   ========================================================= */
const APPLY = SITE.apply;
const A = T.apply;
const aForm = $('#apply-form');
const aVal = id => ($('#'+id).value || '').trim();
function applyText(){
  const way = ($('input[name="way"]:checked') || {}).value || A.open;
  const places = $$('input[name="place"]:checked').map(i => i.value);
  const L = [A.greet, '', A.line(aVal('a-job') || T.initiative), ''];
  L.push(A.way + ': ' + way, A.place + ': ' + (places.length ? places.join(', ') : A.open), A.qual + ': ' + (aVal('a-qual') || A.open), A.region + ': ' + (aVal('a-region') || A.open), A.start + ': ' + (aVal('a-start') || A.open));
  if (aVal('a-msg')) L.push('', aVal('a-msg'));
  L.push('', A.cv, '', A.bye, aVal('a-name') || B.namePh);
  const reach = [aVal('a-mail'), aVal('a-phone')].filter(Boolean).join(' | '); if (reach) L.push(reach);
  return L.join('\n');
}
const aSubject = () => `${A.subject}${aVal('a-job') || T.initiative}${aVal('a-name') ? ' – ' + aVal('a-name') : ''}`;
function aUpdate(){
  $('#a-preview').textContent = mailHead(APPLY, aSubject()) + applyText();
  $('#a-mail-btn').href = `mailto:${APPLY}?subject=${encodeURIComponent(aSubject())}&body=${encodeURIComponent(applyText())}`;
}
const aStatus = (m, err=false) => { const s = $('#a-status'); s.textContent = m; s.classList.toggle('err-s', err); };
aForm.addEventListener('input', e => { aUpdate(); const f = e.target.closest('.field'); if (f){ f.classList.remove('invalid'); const er = $('.err', f); if (er) er.textContent = ''; } if (e.target.id === 'a-consent') $('#a-consent-wrap').classList.remove('invalid'); });
aForm.addEventListener('change', aUpdate);
aForm.addEventListener('submit', e => e.preventDefault());
$('#a-mail-btn').addEventListener('click', e => {
  let first = null; const m = el => { if (!first) first = el; };
  if (!aVal('a-name')) { setErr('a-name', T.err.name); m($('#a-name')); }
  if (!emailOk(aVal('a-mail'))) { setErr('a-mail', T.err.mail); m($('#a-mail')); }
  if (!$('#a-consent').checked) { $('#a-consent-wrap').classList.add('invalid'); m($('#a-consent')); }
  if (first) { e.preventDefault(); first.focus({preventScroll:true}); first.scrollIntoView({block:'center'}); aStatus(T.err.missing, true); return; }
  aUpdate(); aStatus(A.mailOpen(APPLY));
});
$('#a-copy').addEventListener('click', async () => {
  const text = mailHead(APPLY, aSubject()) + applyText();
  try { await navigator.clipboard.writeText(text); aStatus(A.copied(APPLY)); }
  catch(e){ const r = document.createRange(); r.selectNodeContents($('#a-preview')); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); aStatus(T.msg.selected); }
});
$('#job-list').addEventListener('click', e => {
  const b = e.target.closest('[data-job]'); if (!b) return;
  const j = JOBS.find(x => x.id === b.dataset.job);
  $('#a-job').value = j.t;
  const r = $(`input[name="way"][data-k="${j.k}"]`); if (r) r.checked = true;
  aUpdate(); aForm.closest('section').scrollIntoView(); setTimeout(() => $('#a-name').focus({preventScroll:true}), 400);
});
aUpdate();

/* =========================================================
   Whitepaper
   ========================================================= */
const W = T.wp;
const dlg = $('#wp-dialog'); let currentPaper = null;
let reg = store('cov-reg');
function readerHTML(p){ return p.blocks.map(b => b.h ? `<h4>${esc(b.h)}</h4>` : b.p ? `<p>${esc(b.p)}</p>` : `<ul>${b.li.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`).join(''); }
function showReady(){
  $('#wp-form').hidden = true; $('#wp-ready').hidden = false;
  $('#wp-thanks').textContent = W.thanks(reg.first, currentPaper.title);
  $('#wp-reader').hidden = true; $('#wp-read').setAttribute('aria-expanded', false); $('#wp-read').textContent = W.read;
  $('#wp-reader').innerHTML = readerHTML(currentPaper); $('#wp-status').textContent = '';
}
function openPaper(id){
  currentPaper = PAPERS.find(p => p.id === id);
  $('#wp-title').textContent = currentPaper.title; $('#wp-sub').textContent = currentPaper.sub;
  if (reg) showReady(); else { $('#wp-form').hidden = false; $('#wp-ready').hidden = true; }
  if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open','');
}
$('#paper-list').addEventListener('click', e => { const b = e.target.closest('[data-paper]'); if (b) openPaper(b.dataset.paper); });
$('#wp-close').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
$('#wp-form').addEventListener('input', e => { const f = e.target.closest('.field'); if (f){ f.classList.remove('invalid'); const er=$('.err',f); if(er) er.textContent=''; } if (e.target.id==='w-consent') $('#w-consent-wrap').classList.remove('invalid'); });
$('#wp-form').addEventListener('submit', e => {
  e.preventDefault(); let ok = true; let first=null; const m = el => { ok=false; if(!first) first=el; };
  if (!val('w-first')){ setErr('w-first', W.errFirst); m($('#w-first')); }
  if (!val('w-last')){ setErr('w-last', W.errLast); m($('#w-last')); }
  if (!emailOk(val('w-mail'))){ setErr('w-mail', W.errMail); m($('#w-mail')); }
  if (!val('w-company')){ setErr('w-company', W.errCompany); m($('#w-company')); }
  if (!$('#w-consent').checked){ $('#w-consent-wrap').classList.add('invalid'); m($('#w-consent')); }
  if (!ok){ first.focus(); return; }
  reg = {first:val('w-first'), last:val('w-last'), mail:val('w-mail'), company:val('w-company'), fn:val('w-fn'), news:$('#w-news').checked, at:new Date().toISOString()};
  store('cov-reg', reg);
  showReady();
});
$('#wp-pdf').addEventListener('click', async () => {
  const r = await saveFile(W.file(currentPaper.id), paperPDF(currentPaper, reg ? `${reg.first} ${reg.last}, ${reg.company}` : ''));
  $('#wp-status').textContent = saveMessage(r, W.what, W.alt);
});
$('#wp-read').addEventListener('click', () => { const r = $('#wp-reader'); r.hidden = !r.hidden; $('#wp-read').setAttribute('aria-expanded', !r.hidden); $('#wp-read').textContent = r.hidden ? W.read : W.readClose; });
