/* =========================================================
   HEALTHKLICK – gemeinsames Script für alle Sprachen
   Inhalte und Texte kommen aus js/de.js bzw. js/en.js (Objekt SITE),
   die vor dieser Datei geladen werden.
   ========================================================= */
const T = SITE.t;
const MAIL = SITE.mail;
const BASE = SITE.base || '';
const { CHANNELS, JOBS, AGENTS, TOPICS, PAPERS, SCALE, COLORS } = SITE;

/* Abschnitte und Ansichten je Sprache – für den Sprachumschalter */
const HASHES = [
  ['', ''], ['top', 'top'], ['inhalt', 'content'],
  ['deutschlandweit', 'germany'], ['leistungen', 'services'], ['personal', 'staffing'],
  ['lebenszyklus', 'lifecycle'], ['agenten', 'agents'],
  ['wissen', 'whitepapers'], ['kontakt', 'contact'], ['faq', 'faq'],
  ['karriere', 'careers'], ['stellen', 'jobs'], ['bewerben', 'apply'],
  ['marke', 'brand'], ['brand', 'brand'],
  ['impressum', 'legal-notice'], ['datenschutz', 'privacy'],
  ['faq-modell', 'faq-model'], ['faq-markt', 'faq-market'], ['faq-zyklus', 'faq-lifecycle'],
  ['faq-recht', 'faq-compliance'], ['faq-patienten', 'faq-patients'], ['faq-personal', 'faq-staffing']
];
for (let i = 1; i <= 30; i++) HASHES.push(['faq-q' + i, 'faq-q' + i]);   // Quellen der FAQ
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
$('#job-list').innerHTML = JOBS.map(j => `<li class="job"><h3 class="t-h6">${esc(j.t)}</h3><p class="kind">${j.k==='own'?`<span class="ring" aria-hidden="true"></span>${esc(T.own)}`:`<span class="dot" aria-hidden="true"></span>${esc(T.client)}`}</p><p class="where">${esc(j.where)}<br>${esc(j.time)}</p><button type="button" class="btn ghost" data-job="${j.id}">${esc(T.applyBtn)}</button></li>`).join('');
$('#a-job').innerHTML = `<option value="${esc(T.initiative)}">${esc(T.initiative)}</option>` + JOBS.map(j => `<option value="${esc(j.t)}">${esc(j.t)}</option>`).join('');
$('#paper-list').innerHTML = PAPERS.map((p,i) => `<li class="paper"><div class="cover ${p.v}" aria-hidden="true"><span class="c-ring" style="width:${p.ring.s};aspect-ratio:1;left:${p.ring.x};top:${p.ring.y}"></span><span class="c-dot" style="width:${p.dot.s};aspect-ratio:1;left:${p.dot.x};top:${p.dot.y}"></span><div class="c-top"><span>HEALTHKLICK</span><span>${esc(T.paperNo)}${i+1}</span></div><div class="c-title">${esc(p.title)}</div></div><h3 class="t-h6">${esc(p.title)}</h3><p class="sub">${esc(p.sub)}</p><p class="facts">${esc(T.paperFacts(p.for, p.min))}</p><button type="button" class="btn ghost" data-paper="${p.id}">${esc(T.paperBtn)}</button></li>`).join('');
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
   Logo-Intro (nur Tablet und mobil, bis 1200 px): Das Logo steht beim
   Öffnen der Startseite groß und tief über der Headline (Klasse .intro,
   gesetzt im <head>). Beim Scrollen wird es stufenlos kleiner und wandert
   an seinen Platz im Header; zurück nach oben wird es wieder groß.
   Desktop: kein Intro.
   ========================================================= */
(function logoIntro(){
  const root = document.documentElement;
  if (!root.classList.contains('intro')) return;
  root.classList.add('intro-js');
  const big = $('.hero-logo'), small = $('.site-header .logo img');
  if (!big || !small || location.hash.length > 1 || window.scrollY > 40) { root.classList.remove('intro'); return; }

  // Flieger: fixe Kopie des Logos über der Seite. .hero-logo bleibt als
  // unsichtbarer Platzhalter im Hero und hält dort den Platz frei.
  const fly = big.cloneNode();
  fly.className = 'logo-flyer';
  document.body.appendChild(fly);

  const mix = (a, b, p) => a + (b - a) * p;
  let raf = 0, until = 0;

  function update(now){
    raf = 0;
    const a = big.getBoundingClientRect();   // Startpunkt (scrollt mit der Seite)
    const b = small.getBoundingClientRect(); // Endpunkt im Header
    // Platzhalter unsichtbar (andere Ansicht oder breiter als 1200 px): Header-Logo zeigen
    // Scrollweg bis zum Endpunkt: bis der Platzhalter die Höhe des Header-Logos erreicht
    const way = a.top + window.scrollY - b.top;
    const p = a.width && way > 0 ? Math.min(1, Math.max(0, window.scrollY / way)) : 1;
    root.classList.toggle('intro-end', p >= 1);
    if (p < 1) Object.assign(fly.style, { left: mix(a.left, b.left, p) + 'px', top: mix(a.top, b.top, p) + 'px', width: mix(a.width, b.width, p) + 'px' });
    // Das Header-Logo ändert nach dem Scrollen noch kurz seine Größe: so lange mitlaufen
    if (now < until) raf = requestAnimationFrame(update);
  }
  function schedule(){ until = performance.now() + 450; if (!raf) raf = requestAnimationFrame(update); }
  ['scroll', 'resize', 'hashchange', 'load'].forEach(ev => window.addEventListener(ev, schedule, { passive: true }));
  update(performance.now());
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
  text(x, y, str, {size=10, bold=false, color=[10,36,99]}={}){ this.cur.push(`BT /${bold?'F2':'F1'} ${size} Tf ${this.rgb(color)} rg ${this.mm(x).toFixed(2)} ${(this.H-this.mm(y)).toFixed(2)} Td (${this.enc(str)}) Tj ET`); }
  rect(x, y, w, h, {fill=null, stroke=null, lw=0.5}={}){ const op = fill&&stroke?'B':fill?'f':'S'; this.cur.push(`${fill?this.rgb(fill)+' rg ':''}${stroke?this.rgb(stroke)+' RG ':''}${lw} w ${this.mm(x).toFixed(2)} ${(this.H-this.mm(y+h)).toFixed(2)} ${this.mm(w).toFixed(2)} ${this.mm(h).toFixed(2)} re ${op}`); }
  line(x1,y1,x2,y2,{color=[226,226,226], lw=0.5}={}){ this.cur.push(`${this.rgb(color)} RG ${lw} w ${this.mm(x1).toFixed(2)} ${(this.H-this.mm(y1)).toFixed(2)} m ${this.mm(x2).toFixed(2)} ${(this.H-this.mm(y2)).toFixed(2)} l S`); }
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
const LOGO = {"vb":[0,-0.15,625.95,70.35],"p":[["M33.1 1L34.9 1C37.39 1 39.4 3.01 39.4 5.5L39.4 28.6C39.4 29.15 39.85 29.6 40.4 29.6L63.5 29.6C65.99 29.6 68 31.61 68 34.1L68 35.9C68 38.39 65.99 40.4 63.5 40.4L40.4 40.4C39.85 40.4 39.4 40.85 39.4 41.4L39.4 64.5C39.4 66.99 37.39 69 34.9 69L33.1 69C30.61 69 28.6 66.99 28.6 64.5L28.6 41.4C28.6 40.85 28.15 40.4 27.6 40.4L4.5 40.4C2.01 40.4 0 38.39 0 35.9L0 34.1C0 31.61 2.01 29.6 4.5 29.6L27.6 29.6C28.15 29.6 28.6 29.15 28.6 28.6L28.6 5.5C28.6 3.01 30.61 1 33.1 1ZM78.14 1L79.84 1C82.33 1 84.34 3.01 84.34 5.5L84.34 64.5C84.34 66.99 82.33 69 79.84 69L78.14 69C75.65 69 73.64 66.99 73.64 64.5L73.64 5.5C73.64 3.01 75.65 1 78.14 1ZM102.65 1L134.5 1C136.99 1 139 3.01 139 5.5L139 5.5C139 7.99 136.99 10 134.5 10L110.35 10C109.52 10 108.85 10.67 108.85 11.5L108.85 27.5C108.85 28.33 109.52 29 110.35 29L132.8 29C135.29 29 137.3 31.01 137.3 33.5L137.3 33.5C137.3 35.99 135.29 38 132.8 38L110.35 38C109.52 38 108.85 38.67 108.85 39.5L108.85 58.5C108.85 59.33 109.52 60 110.35 60L136.3 60C138.79 60 140.8 62.01 140.8 64.5L140.8 64.5C140.8 66.99 138.79 69 136.3 69L102.65 69C100.16 69 98.15 66.99 98.15 64.5L98.15 5.5C98.15 3.01 100.16 1 102.65 1ZM174.7 1L177.7 1C180.19 1 182.91 2.89 183.79 5.21L206.25 64.79C207.13 67.11 205.82 69 203.34 69L200.81 69C198.32 69 195.63 67.1 194.81 64.76L189.37 49.41C189.1 48.63 188.2 48 187.37 48L165.03 48C164.2 48 163.3 48.63 163.03 49.41L157.59 64.76C156.77 67.1 154.08 69 151.59 69L149.06 69C146.58 69 145.27 67.11 146.15 64.79L168.61 5.21C169.49 2.89 172.21 1 174.7 1ZM175.8 13.33L167.21 37.59C166.94 38.37 167.38 39 168.21 39L184.19 39C185.02 39 185.46 38.37 185.19 37.59L176.6 13.33C176.38 12.71 176.02 12.71 175.8 13.33ZM220.28 1L221.98 1C224.47 1 226.48 3.01 226.48 5.5L226.48 58.5C226.48 59.33 227.16 60 227.98 60L253.3 60C255.79 60 257.8 62.01 257.8 64.5L257.8 64.5C257.8 66.99 255.79 69 253.3 69L220.28 69C217.8 69 215.78 66.99 215.78 64.5L215.78 5.5C215.78 3.01 217.8 1 220.28 1ZM252.5 1L299.9 1C302.39 1 304.4 3.01 304.4 5.5L304.4 5.5C304.4 7.99 302.39 10 299.9 10L283.05 10C282.22 10 281.55 10.67 281.55 11.5L281.55 64.5C281.55 66.99 279.54 69 277.05 69L275.35 69C272.86 69 270.85 66.99 270.85 64.5L270.85 11.5C270.85 10.67 270.18 10 269.35 10L252.5 10C250.01 10 248 7.99 248 5.5L248 5.5C248 3.01 250.01 1 252.5 1ZM314.14 1L315.84 1C318.33 1 320.34 3.01 320.34 5.5L320.34 27.2C320.34 28.03 321.01 28.7 321.84 28.7L353.15 28.7C353.98 28.7 354.65 28.03 354.65 27.2L354.65 5.5C354.65 3.01 356.66 1 359.15 1L360.85 1C363.34 1 365.35 3.01 365.35 5.5L365.35 64.5C365.35 66.99 363.34 69 360.85 69L359.15 69C356.66 69 354.65 66.99 354.65 64.5L354.65 39.2C354.65 38.37 353.98 37.7 353.15 37.7L321.84 37.7C321.01 37.7 320.34 38.37 320.34 39.2L320.34 64.5C320.34 66.99 318.33 69 315.84 69L314.14 69C311.65 69 309.64 66.99 309.64 64.5L309.64 5.5C309.64 3.01 311.65 1 314.14 1ZM383.7 1L385.41 1C387.89 1 389.91 3.01 389.91 5.5L389.91 30.39C389.91 30.94 390.2 31.06 390.57 30.64L414.16 4.35C415.82 2.5 419.17 1 421.66 1L425.99 1C428.47 1 429.13 2.48 427.45 4.32L404.74 29.07C404.18 29.68 404.13 30.72 404.63 31.38L430.11 65.4C431.6 67.39 430.8 69 428.31 69L424.42 69C421.94 69 418.73 67.38 417.25 65.38L397.21 38.33C396.39 37.22 395.1 37.25 394.34 38.4L392.13 41.71C390.9 43.54 389.91 46.82 389.91 49.03L389.91 64.5C389.91 66.99 387.89 69 385.41 69L383.7 69C381.22 69 379.2 66.99 379.2 64.5L379.2 5.5C379.2 3.01 381.22 1 383.7 1ZM441 1L442.71 1C445.19 1 447.21 3.01 447.21 5.5L447.21 58.5C447.21 59.33 447.88 60 448.71 60L473.9 60C476.39 60 478.4 62.01 478.4 64.5L478.4 64.5C478.4 66.99 476.39 69 473.9 69L441 69C438.52 69 436.5 66.99 436.5 64.5L436.5 5.5C436.5 3.01 438.52 1 441 1ZM491.15 1L492.85 1C495.34 1 497.35 3.01 497.35 5.5L497.35 64.5C497.35 66.99 495.34 69 492.85 69L491.15 69C488.66 69 486.65 66.99 486.65 64.5L486.65 5.5C486.65 3.01 488.66 1 491.15 1ZM578.76 1L580.47 1C582.95 1 584.97 3.01 584.97 5.5L584.97 30.39C584.97 30.94 585.26 31.06 585.63 30.64L609.22 4.35C610.88 2.5 614.23 1 616.72 1L621.05 1C623.53 1 624.19 2.48 622.51 4.32L599.8 29.07C599.24 29.68 599.19 30.72 599.69 31.38L625.17 65.4C626.66 67.39 625.86 69 623.37 69L619.48 69C617 69 613.79 67.38 612.31 65.38L592.27 38.33C591.45 37.22 590.16 37.25 589.4 38.4L587.19 41.71C585.96 43.54 584.97 46.82 584.97 49.03L584.97 64.5C584.97 66.99 582.95 69 580.47 69L578.76 69C576.28 69 574.26 66.99 574.26 64.5L574.26 5.5C574.26 3.01 576.28 1 578.76 1ZM561.58 2.28C557.91 0.16 550.44 -0.11 545.38 -0.11C522.39 -0.11 507.2 14.58 507.2 36.82C507.2 56.91 522.39 70.18 545.38 70.18C549.34 70.18 558.69 68.9 561.51 67.27C563.45 66.15 564.33 63.82 563.62 61.7C562.91 59.58 560.81 58.25 558.58 58.52C558.09 58.58 552.61 60.88 545.83 60.88C529.04 60.88 518.26 50.88 518.26 35.3C518.26 19.26 529.04 8.96 545.83 8.96C554.07 8.96 558.03 11.02 558.63 11.1C560.87 11.37 562.99 10.03 563.7 7.89C564.42 5.75 563.53 3.4 561.58 2.28Z","nonzero"]]};
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
/* Markenfarben HEALTHKLICK: Imperial Blue, Charcoal, Strawberry Red, Alabaster Grey, Cerulean; Weiß als Papier */
const C = {ink:[10,36,99], slate:[96,95,94], red:[251,54,64], line:[226,226,226], mist:[226,226,226], blue:[36,123,160], white:[255,255,255]};
function pdfLogo(d, x, y, s=1){ d.svg(LOGO.p, LOGO.vb, x, y - 8, 56 * s, C.red); }
/* Kreuz aus dem Logo (Agent-Zeichen), mittig um cx/cy, Kantenlänge size in mm */
const KREUZ = 'M33.1 0L34.9 0C37.39 0 39.4 2.01 39.4 4.5L39.4 27.6C39.4 28.15 39.85 28.6 40.4 28.6L63.5 28.6C65.99 28.6 68 30.61 68 33.1L68 34.9C68 37.39 65.99 39.4 63.5 39.4L40.4 39.4C39.85 39.4 39.4 39.85 39.4 40.4L39.4 63.5C39.4 65.99 37.39 68 34.9 68L33.1 68C30.61 68 28.6 65.99 28.6 63.5L28.6 40.4C28.6 39.85 28.15 39.4 27.6 39.4L4.5 39.4C2.01 39.4 0 37.39 0 34.9L0 33.1C0 30.61 2.01 28.6 4.5 28.6L27.6 28.6C28.15 28.6 28.6 28.15 28.6 27.6L28.6 4.5C28.6 2.01 30.61 0 33.1 0Z';
function pdfKreuz(d, cx, cy, size, color=C.red){ d.svg([[KREUZ, 'nonzero']], [0, 0, 68, 68], cx - size/2, cy - size/2, size, color); }
function pdfFooter(d, n){ d.line(20, 282, 190, 282); d.text(20, 287, T.pdfFooter, {size:7.5, color:C.slate}); d.text(183, 287, String(n), {size:7.5, color:C.slate}); }
function writer(d, startY=30){
  let y = startY, page = 1; const L=20, R=190, W=R-L;
  const need = h => { if (y + h > 272){ pdfFooter(d, page); d.addPage(); page++; y = 26; } };
  return {
    get y(){ return y; }, set y(v){ y=v; }, get page(){ return page; },
    h(text, size=13){ need(14); y += 4; for (const ln of d.wrap(text, W, size, true)){ d.text(L, y, ln, {size, bold:true, color:C.ink}); y += size*0.48; } y += 2.5; },
    p(text, size=10, color=C.ink){ for (const ln of d.wrap(text, W, size, false)){ need(6); d.text(L, y, ln, {size, color}); y += size*0.5; } y += 3; },
    li(items, size=10){ for (const it of items){ const lines = d.wrap(it, W-7, size, false); need(lines.length*5+2); pdfKreuz(d, L+1.6, y-1.3, 2.7); lines.forEach(ln => { d.text(L+6, y, ln, {size}); y += size*0.5; }); y += 1.8; } y += 1.5; },
    box(label, checked){ need(7); d.circle(L+2.2, y-1.3, 2.0, {stroke:C.slate, lw:0.9}); if (checked) pdfKreuz(d, L+2.2, y-1.3, 2.9); d.text(L+7, y, label, {size:10.5}); y += 6.2; },
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
  pdfKreuz(d, 56.1, 120, 66.8);
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
let reg = store('hk-reg');
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
  store('hk-reg', reg);
  showReady();
});
$('#wp-pdf').addEventListener('click', async () => {
  const r = await saveFile(W.file(currentPaper.id), paperPDF(currentPaper, reg ? `${reg.first} ${reg.last}, ${reg.company}` : ''));
  $('#wp-status').textContent = saveMessage(r, W.what, W.alt);
});
$('#wp-read').addEventListener('click', () => { const r = $('#wp-reader'); r.hidden = !r.hidden; $('#wp-read').setAttribute('aria-expanded', !r.hidden); $('#wp-read').textContent = r.hidden ? W.read : W.readClose; });
