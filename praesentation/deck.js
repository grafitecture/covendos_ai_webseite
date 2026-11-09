/* HEALTHKLICK – Präsentation: Navigation, Skalierung, Rechner */
(function(){
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const slides = $$('.slide');
  const N = slides.length;
  let cur = 0;
  $('#t').textContent = N;
  if (params.has('embed')) root.classList.add('embed');

  /* ---------- Skalierung ---------- */
  function fit(){
    const s = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    root.style.setProperty('--s', s);
  }
  window.addEventListener('resize', fit); fit();

  /* ---------- Folien ---------- */
  function go(i, push = true){
    i = Math.max(0, Math.min(N - 1, i));
    slides.forEach((s, j) => { s.classList.toggle('on', j === i); s.setAttribute('aria-hidden', String(j !== i)); s.inert = j !== i; });
    cur = i;
    $('#n').textContent = i + 1;
    $('#prog').style.width = ((i + 1) / N * 100) + '%';
    $('#notes-t').textContent = slides[i].dataset.notes || '';
    animate(slides[i]);
    if (push && !params.has('print')) history.replaceState(null, '', '#' + (i + 1));
  }
  const next = () => go(cur + 1), prev = () => go(cur - 1);

  // Animationen, die beim Erreichen einer Folie starten
  function animate(s){
    $$('.spark', s).forEach(sp => {
      const v = sp.dataset.h.split(',').map(Number), mx = Math.max(...v);
      if (!sp.children.length) sp.innerHTML = v.map(() => '<i></i>').join('');
      Array.from(sp.children).forEach(i => i.style.height = '0');
      requestAnimationFrame(() => requestAnimationFrame(() => Array.from(sp.children).forEach((i, k) => i.style.height = (v[k] / mx * 100) + '%')));
    });
  }

  /* ---------- Steuerung ---------- */
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea')) return;
    if (overview && e.key === 'Escape'){ closeOverview(); return; }
    switch (e.key){
      case 'ArrowRight': case 'PageDown': case ' ': e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'PageUp': e.preventDefault(); prev(); break;
      case 'Home': go(0); break;
      case 'End': go(N - 1); break;
      case 'o': case 'O': toggleOverview(); break;
      case 'f': case 'F': full(); break;
      case 'n': case 'N': $('#notes').hidden = !$('#notes').hidden; break;
    }
  });
  $('.bar').addEventListener('click', e => {
    const a = e.target.closest('[data-a]'); if (!a) return;
    ({ prev, next, overview: toggleOverview, notes: () => { $('#notes').hidden = !$('#notes').hidden; }, full })[a.dataset.a]();
  });
  function full(){
    if (document.fullscreenElement) document.exitFullscreen();
    else if (root.requestFullscreen) root.requestFullscreen().catch(() => {});
  }
  // Wischen
  let x0 = null, y0 = null;
  document.addEventListener('touchstart', e => { if (e.target.closest('input, button')) return; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, {passive: true});
  document.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)();
    x0 = null;
  });
  // Agenda
  $$('[data-go]').forEach(b => b.addEventListener('click', () => go(+b.dataset.go - 1)));

  /* ---------- Übersicht ---------- */
  let overview = null;
  function toggleOverview(){ overview ? closeOverview() : openOverview(); }
  function openOverview(){
    overview = document.createElement('div');
    overview.className = 'overview-grid';
    overview.setAttribute('role', 'dialog'); overview.setAttribute('aria-label', 'Übersicht');
    slides.forEach((s, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'ov-item' + (i === cur ? ' cur' : '');
      b.setAttribute('aria-label', 'Folie ' + (i + 1));
      const c = s.cloneNode(true); c.classList.add('on'); c.removeAttribute('id'); c.inert = true;
      b.appendChild(c); b.insertAdjacentHTML('beforeend', `<b>${i + 1}</b>`);
      b.addEventListener('click', () => { closeOverview(); go(i); });
      overview.appendChild(b);
    });
    document.body.appendChild(overview);
    requestAnimationFrame(() => $$('.ov-item', overview).forEach(b => { const c = b.querySelector('.slide'); c.style.transform = `scale(${b.clientWidth / 1600})`; }));
    $('.ov-item.cur', overview).focus();
  }
  function closeOverview(){ if (overview){ overview.remove(); overview = null; } }

  /* ---------- Rechner: Herstellerabschlag ---------- */
  const eur = (v, d = 2) => v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: d, maximumFractionDigits: d });
  const num = v => v.toLocaleString('de-DE');
  function calcAbschlag(){
    const c = $('#calc-abschlag'); if (!c) return;
    const price = +$('[data-i=price]', c).value, packs = +$('[data-i=packs]', c).value;
    const o = price * .07, n = price * .155, diff = (n - o) * packs * 6;
    $('[data-o=price]', c).textContent = eur(price, 0);
    $('[data-o=packs]', c).textContent = num(packs);
    $('[data-r=old]', c).textContent = eur(o);
    $('[data-r=new]', c).textContent = eur(n);
    $('[data-r=diff]', c).textContent = eur(diff, 0);
  }
  /* ---------- Rechner: Reichweite ---------- */
  function calcReach(){
    const c = $('#calc-reach'); if (!c) return;
    const ad = +$('[data-i=ad]', c).value, er = +$('[data-i=er]', c).value, tg = +$('[data-i=tg]', c).value;
    const f2f = Math.round(ad * 5 * 19), rem = Math.round(er * 14 * 20);
    $('[data-o=ad]', c).textContent = num(ad);
    $('[data-o=er]', c).textContent = er.toLocaleString('de-DE');
    $('[data-o=tg]', c).textContent = num(tg);
    $('[data-r=f2f]', c).textContent = num(f2f);
    $('[data-r=rem]', c).textContent = num(rem);
    $('[data-r=per]', c).textContent = ((f2f + rem) * 3 / tg).toLocaleString('de-DE', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
    const mx = Math.max(1, f2f, rem, 1600);
    $('[data-b=f2f]').style.setProperty('--w', f2f / mx * 100);
    $('[data-b=rem]').style.setProperty('--w', rem / mx * 100);
  }
  ['#calc-abschlag', '#calc-reach'].forEach(id => { const c = $(id); if (c) c.addEventListener('input', id === '#calc-abschlag' ? calcAbschlag : calcReach); });
  calcAbschlag(); calcReach();

  /* ---------- Zeitstrahl ---------- */
  const tl = $('#timeline');
  if (tl){
    tl.addEventListener('click', e => {
      const b = e.target.closest('[data-p]'); if (!b) return;
      $$('[data-p]', tl).forEach(x => x.setAttribute('aria-selected', String(x === b)));
      $$('[data-pd]').forEach(d => d.hidden = d.dataset.pd !== b.dataset.p);
    });
  }

  /* ---------- Start ---------- */
  if (params.has('print')){
    root.classList.add('print');
    slides.forEach(s => { s.classList.add('on'); animate(s); });
    $$('.ring-chart').forEach(r => r.style.setProperty('--p', getComputedStyle(r.closest('.meter')).getPropertyValue('--v')));
    window.addEventListener('load', () => setTimeout(() => window.print(), 400));
  } else {
    const h = parseInt(location.hash.slice(1), 10);
    go(isNaN(h) ? 0 : h - 1, false);
  }
  window.addEventListener('hashchange', () => { const h = parseInt(location.hash.slice(1), 10); if (!isNaN(h) && h - 1 !== cur) go(h - 1, false); });
})();
