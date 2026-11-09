/* =========================================================
   HEALTHKLICK – Marketing-Material zur Freigabe (Bereich unter dem Footer)
   Baut #marketing aus SITE.mk (Texte je Sprache, js/de.js bzw. js/en.js)
   und MK_DATA (Kampagneninhalte auf Deutsch, js/marketing-data.js).
   Gestaltung: css/marketing.css
   ========================================================= */
(function(){
  const root = document.getElementById('marketing');
  const MK = (typeof SITE !== 'undefined') && SITE.mk, D = window.MK_DATA;
  if (!root || !MK || !D) return;
  const B = SITE.base || '';
  const C = D.CONTACT;
  const h = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const nl = s => h(s).replace(/\n/g, '<br>');
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const img = p => B + 'img/' + p;
  const WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const MON = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
  const dt = iso => new Date(iso + 'T09:00:00');
  const dShort = iso => { const d = dt(iso); return `${WD[d.getDay()]} ${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.`; };
  const dLong = iso => { const d = dt(iso); return `${d.getDate()}. ${MON[d.getMonth()]} ${d.getFullYear()}`; };
  const dNum = iso => { const d = dt(iso); return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`; };
  function isoWeek(iso){ const d = dt(iso); const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day); const y0 = new Date(Date.UTC(t.getUTCFullYear(),0,1)); return [t.getUTCFullYear(), Math.ceil(((t - y0) / 864e5 + 1) / 7)]; }
  const fmtN = n => n >= 1000 ? (n/1000).toFixed(1).replace('.', ',') + ' Tsd.' : String(n);

  /* ---------- kleine Symbole (Plattform-Oberflächen) ---------- */
  const I = {
    like:'<path d="M7 11v9H4v-9h3Zm0 0 4-7c1.2 0 2 .9 2 2v3h5.2c1.2 0 2 1.1 1.8 2.2l-1.3 6.5c-.2.8-.9 1.3-1.7 1.3H7"/>',
    comment:'<path d="M4 5h16v11H9l-5 4V5Z"/>',
    repost:'<path d="M7 7h11l-3-3M17 17H6l3 3M18 7v5M6 17v-5"/>',
    send:'<path d="m21 3-9 18-2-8-8-2 19-8Z"/>',
    heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
    save:'<path d="M6 3h12v18l-6-5-6 5V3Z"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
    more:'<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
    play:'<path d="M8 5v14l11-7L8 5Z" fill="currentColor" stroke="none"/>',
    grid:'<path d="M4 4h16v16H4zM9.3 4v16M14.7 4v16M4 9.3h16M4 14.7h16"/>',
    search:'<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
    home:'<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4v-9Z"/>',
    bell:'<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4l2-2ZM10 21h4"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    close:'<path d="M6 6l12 12M18 6 6 18"/>',
    prev:'<path d="m15 5-7 7 7 7"/>', next:'<path d="m9 5 7 7-7 7"/>',
    ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
    zoom:'<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5M11 8v6M8 11h6"/>'
  };
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;

  /* ---------- Bildmotive der Beiträge ---------- */
  function photoSrc(v){
    if (v.src) return { src: img(v.src), alt: v.label || '', pending: false, ai: false };
    const p = D.IMG[v.img]; if (p) return { src: img(p.src.replace(/^img\//,'')), alt: p.alt, pending: !!p.pending, ai: true };
    return { src: img(v.img), alt: v.label || '', pending: false, ai: true };
  }
  const mark = (tone = 'red') => `<span class="pv-mark ${tone}" aria-hidden="true"></span>`;
  function visual(v, o = {}){
    if (!v) return '';
    switch (v.t){
      case 'stat': return `<div class="pv pv-stat bg-${v.bg}">${mark(v.bg === 'ink' || v.bg === 'blue' ? 'white' : 'red')}<div class="pv-n">${h(v.n)}</div><p class="pv-l">${h(v.l)}</p><p class="pv-s">${h(v.s)}</p></div>`;
      case 'slides': return `<div class="pv pv-slides" data-i="0">${v.slides.map((s,i) => `<div class="pv-slide bg-${s.bg}${i ? '' : ' on'}">${mark(s.bg === 'ink' ? 'white' : 'red')}${s.k ? `<span class="pv-k">${h(s.k)}</span>` : ''}${s.n ? `<div class="pv-n">${h(s.n)}</div>` : ''}<p class="pv-h">${h(s.h)}</p>${s.sub ? `<p class="pv-sub">${h(s.sub)}</p>` : ''}${s.s ? `<p class="pv-s">${h(s.s)}</p>` : ''}<span class="pv-count">${i+1}/${v.slides.length}</span></div>`).join('')}${o.thumb ? '</div>' : `<button type="button" class="pv-nav prev" aria-label="${h(MK.ui.prev)}">${ic('prev')}</button><button type="button" class="pv-nav next" aria-label="${h(MK.ui.next)}">${ic('next')}</button><span class="pv-dots" aria-hidden="true">${v.slides.map((s,i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</span></div>`}`;
      case 'photo': {
        const p = photoSrc(v);
        if (p.pending) return `<div class="pv pv-pend"><span class="pv-ring" aria-hidden="true"></span><span class="pv-x" aria-hidden="true"></span><p class="pv-h">${h(v.label)}</p><p class="pv-s">${h(MK.ui.pending)}</p></div>`;
        return `<div class="pv pv-photo"><img src="${p.src}" alt="${h(p.alt)}" loading="lazy">${p.ai ? `<span class="pv-ai">${h(MK.ui.aiTag)}</span>` : ''}</div>`;
      }
      case 'reel': return `<div class="pv pv-photo pv-reel"><img src="${img(v.img)}" alt="${h(v.label)}" loading="lazy"><span class="pv-play">${ic('play')}</span><span class="pv-dur">${h(v.dur)}</span><span class="pv-ai">${h(MK.ui.aiTag)}</span></div>`;
      case 'job': return `<div class="pv pv-job"><div class="pv-jimg"><img src="${img(v.img)}" alt="" loading="lazy"><span class="pv-tag">${h(v.tag)}</span></div><div class="pv-jband">${mark('red')}<p class="pv-h">${h(v.h)}</p><p class="pv-sub">${h(v.place)}</p><span class="pv-btn">Jetzt bewerben</span></div></div>`;
      case 'paper': return `<div class="pv pv-paper"><div class="pv-cover ${v.cls}"><span class="c-top"><span>HEALTHKLICK</span><span>Nr. ${v.no}</span></span><span class="pv-ring" aria-hidden="true"></span><span class="pv-x" aria-hidden="true"></span><span class="c-title">${h(v.title)}</span><span class="c-sub">${h(v.sub)}</span></div><span class="pv-tag">Whitepaper · kostenlos</span></div>`;
      case 'news': return `<div class="pv pv-news bg-ink">${mark('white')}<p class="pv-k2">${h(v.h)}</p><p class="pv-h">${h(v.title)}</p><p class="pv-s">${h(v.n)}</p><span class="pv-ring" aria-hidden="true"></span></div>`;
      case 'card': return `<div class="pv pv-card bg-${v.bg}">${mark(v.bg === 'ink' ? 'white' : 'red')}<p class="pv-h">${h(v.h)}<i class="pv-plus" aria-hidden="true"></i></p><p class="pv-sub">${h(v.sub)}</p></div>`;
      case 'claim': return `<div class="pv pv-claim bg-mist">${mark('red')}<p class="pv-h">Mehr Zeit<br>für Medizin<i class="pv-plus" aria-hidden="true"></i></p></div>`;
      case 'sign': return `<div class="pv pv-sign bg-white">${mark('red')}<div class="pv-pair"><span><i class="pv-ring2" aria-hidden="true"></i>Mensch</span><span><i class="pv-x2" aria-hidden="true"></i>Agent</span></div><p class="pv-sub">Bei uns sieht man, wer was tut.</p></div>`;
      case 'deck': return `<div class="pv pv-deck bg-white">${mark('red')}<span class="pv-ring" aria-hidden="true"></span><p class="pv-k2">Pitch-Vorlage · 30 Minuten</p><p class="pv-h">Die ersten zwölf Monate</p><p class="pv-sub">Launch 2027 mit Menschen und KI-Agenten</p><span class="pv-btn">Termin anfragen</span></div>`;
    }
    return '';
  }

  /* ---------- Plattform-Oberflächen im Tablet ---------- */
  const chName = { li: 'LinkedIn', ig: 'Instagram', fb: 'Facebook' };
  const avatarHK = cls => `<span class="av hk ${cls||''}" aria-hidden="true"></span>`;
  const avatarGW = cls => `<span class="av gw ${cls||''}" aria-hidden="true">${C.name.split(' ').map(w => w[0]).join('')}</span>`;
  const clip = (t, n) => t.length > n ? t.slice(0, t.lastIndexOf(' ', n)).replace(/[\s,.:;→–-]+$/, '') : t;
  const byDateDesc = (a, b) => b.date.localeCompare(a.date);
  const postsFor = ch => D.POSTS.filter(p => p.ch.includes(ch)).sort(byDateDesc);

  function liPost(p){
    const gw = p.by === 'gw';
    const head = gw
      ? `<p class="li-repost">${avatarHK('xs')}<b>Healthklick</b> hat dies reposted</p><header class="li-h">${avatarGW()}<div><b>${h(C.name)}</b><span>${h(C.role)}, Grafitecture GmbH · Healthklick</span><span>${h(dNum(p.date))} · ${ic('globe','tiny')}</span></div><span class="li-follow">+ Folgen</span></header>`
      : `<header class="li-h">${avatarHK()}<div><b>Healthklick</b><span>${h(D.PROFILES.li.followers)} Follower:innen</span><span>${h(dNum(p.date))} · ${ic('globe','tiny')}</span></div><span class="li-more">${ic('more')}</span></header>`;
    const txt = p.text + '\n\n' + p.tags;
    const short = clip(p.text, 230);
    return `<article class="li-post" data-post="${p.id}">${head}
      <div class="li-text"><p class="li-short">${nl(short)} <button type="button" class="li-mehr">…mehr</button></p><p class="li-full" hidden>${nl(txt)}</p></div>
      ${p.v ? `<div class="li-media" style="--ar:${p.v.t === 'slides' ? '4/5' : '1'}">${visual(p.v)}</div>` : ''}
      <p class="li-counts"><span class="rx"><i class="r1"></i><i class="r2"></i><i class="r3"></i></span>${p.stats[0]} <span class="sep">${p.stats[1]} Kommentare · ${p.stats[2]} Reposts</span></p>
      <div class="li-act"><span>${ic('like')}Gefällt mir</span><span>${ic('comment')}Kommentieren</span><span>${ic('repost')}Reposten</span><span>${ic('send')}Senden</span></div>
    </article>`;
  }
  function screenLI(){
    const P = D.PROFILES.li;
    return `<div class="app li">
      <div class="app-top li-top"><span class="li-logo" aria-hidden="true">in</span><span class="li-search">${ic('search')}Suchen</span><span class="li-nav">${ic('home')}${ic('bell')}</span></div>
      <div class="app-body">
        <div class="li-page">
          <div class="li-card li-hero">
            <div class="li-banner"><span class="pv-mark white"></span><p>Mehr Zeit für Medizin<i class="pv-plus"></i></p><span class="b-ring"></span></div>
            <div class="li-id">${avatarHK('lg')}<h4>Healthklick</h4><p>Human-led AI für Pharma und Healthcare. Vertrieb, Patient Services und Medical Information mit Menschen und KI-Agenten.</p><p class="li-meta">${h(P.industry)} · Mannheim, Baden-Württemberg · ${h(P.followers)} Follower:innen · ${h(P.staff)}</p>
              <div class="li-btns"><span class="b-pri">+ Folgen</span><span class="b-sec">Website besuchen ${ic('ext','tiny')}</span><span class="b-sec">Nachricht</span></div></div>
            <nav class="li-tabs"><span>Home</span><span>Info</span><span class="on">Beiträge</span><span>Jobs</span><span>Personen</span></nav>
          </div>
          <div class="li-cols">
            <div class="li-feed">${postsFor('li').map(liPost).join('')}</div>
            <aside class="li-side">
              <div class="li-card li-box"><h5>Newsletter</h5><div class="li-nl">${avatarHK('sm')}<div><b>Healthklick Briefing</b><span>Monatlich · 1 Ausgabe</span></div></div><span class="b-sec wide">Abonnieren</span></div>
              <div class="li-card li-box"><h5>Kontakt</h5><p>${h(C.name)}<br><span class="muted">${h(C.role)}</span></p><p class="li-link">${h(C.mail)}</p></div>
              <div class="li-card li-box"><h5>Hashtags</h5><p class="muted">#Pharmavertrieb #AMNOG #MarketAccess #HumanLedAI</p></div>
            </aside>
          </div>
        </div>
      </div>
    </div>`;
  }

  function igTiles(){ return [...postsFor('ig'), ...D.IG_EXTRA]; }
  function screenIG(){
    const P = D.PROFILES.ig, tiles = igTiles();
    return `<div class="app ig">
      <div class="app-top ig-top"><span class="ig-word">Instagram</span><span class="ig-nav">${ic('heart')}${ic('send')}</span></div>
      <div class="app-body">
        <div class="ig-page">
          <header class="ig-head">${avatarHK('ig-av')}
            <div class="ig-info">
              <p class="ig-user"><b>${h(P.handle)}</b><span class="b-ig">Folgen</span><span class="b-ig2">Nachricht senden</span></p>
              <p class="ig-stats"><span><b>${P.posts}</b> Beiträge</span><span><b>${h(P.followers)}</b> Follower</span><span><b>${h(P.following)}</b> Gefolgt</span></p>
              <p class="ig-bio"><b>Healthklick</b><br><span class="muted">Dienstleistungen für Pharma</span><br>Mehr Zeit für Medizin+<br>Human-led AI für Pharma und Healthcare<br>Field Force · Patient Services · Medical Information<br>Mannheim und deutschlandweit<br><span class="ig-link">${h(C.web)}/#karriere</span></p>
            </div>
          </header>
          <div class="ig-hl">${['Field Force','Team','Jobs','Wissen','Mannheim'].map((t,i) => `<span><i class="hl hl${i}"></i>${t}</span>`).join('')}</div>
          <nav class="ig-tabs"><span class="on">${ic('grid','tiny')} Beiträge</span><span>Reels</span><span>Markiert</span></nav>
          <div class="ig-grid">${tiles.map(p => `<button type="button" class="ig-tile" data-ig="${p.id}" aria-label="${h(p.title)}">${visual(p.v, {thumb: true})}${p.v.t === 'slides' ? '<span class="ig-multi" aria-hidden="true"></span>' : ''}</button>`).join('')}</div>
        </div>
        <div class="ig-modal" hidden></div>
      </div>
    </div>`;
  }
  function igModal(id){
    const p = igTiles().find(x => x.id === id); if (!p) return '';
    return `<div class="ig-dlg" role="dialog" aria-label="${h(p.title)}"><button type="button" class="ig-x" aria-label="${h(MK.ui.close)}">${ic('close')}</button>
      <div class="ig-dmedia" style="--ar:4/5">${visual(p.v)}</div>
      <div class="ig-dside"><header>${avatarHK('sm')}<b>${h(D.PROFILES.ig.handle)}</b></header>
        <div class="ig-cap"><p><b>${h(D.PROFILES.ig.handle)}</b> ${nl(p.text)}</p><p class="ig-tags">${h(p.tags)}</p></div>
        <div class="ig-act">${ic('heart')}${ic('comment')}${ic('send')}<span class="sp"></span>${ic('save')}</div>
        <p class="ig-likes"><b>${p.stats[0]} „Gefällt mir“-Angaben</b><br><span class="muted">${h(dLong(p.date))}</span></p></div></div>`;
  }

  function fbPost(p){
    return `<article class="fb-post" data-post="${p.id}"><header class="fb-h">${avatarHK()}<div><b>Healthklick</b><span>${h(dLong(p.date).replace(/ \d{4}$/, ''))} um 9:${String(10 + (p.stats[0] % 40)).padStart(2,'0')} · ${ic('globe','tiny')}</span></div><span class="li-more">${ic('more')}</span></header>
      <p class="fb-text">${nl(p.text)}<br><span class="fb-tags">${h(p.tags)}</span></p>
      ${p.v ? `<div class="fb-media">${visual(p.v)}</div>` : ''}
      <p class="fb-counts"><span><i class="fbl"></i>${Math.round(p.stats[0] * .55)}</span><span>${Math.round(p.stats[1] * .5)} Kommentare · ${Math.round(p.stats[2] * .5)} Mal geteilt</span></p>
      <div class="fb-act"><span>${ic('like')}Gefällt mir</span><span>${ic('comment')}Kommentieren</span><span>${ic('repost')}Teilen</span></div></article>`;
  }
  function screenFB(){
    const P = D.PROFILES.fb;
    return `<div class="app fb">
      <div class="app-top fb-top"><span class="fb-f" aria-hidden="true">f</span><span class="li-search">${ic('search')}Facebook durchsuchen</span><span class="li-nav">${ic('home')}${ic('bell')}</span></div>
      <div class="app-body">
        <div class="fb-page">
          <div class="fb-cover"><img src="${img('hero.webp')}" alt=""><span class="pv-ai">${h(MK.ui.aiTag)}</span></div>
          <div class="fb-id">${avatarHK('fb-av')}<div><h4>Healthklick</h4><p class="muted">${h(P.likes)} „Gefällt mir“-Angaben · ${h(P.followers)} Follower</p></div><div class="fb-btns"><span class="b-fb">${ic('like','tiny')} Gefällt mir</span><span class="b-fb2">Nachricht senden</span></div></div>
          <nav class="fb-tabs"><span class="on">Beiträge</span><span>Info</span><span>Fotos</span><span>Veranstaltungen</span><span>Jobs</span></nav>
          <div class="fb-cols">
            <aside class="fb-side"><div class="fb-card"><h5>Steckbrief</h5><p>Mehr Zeit für Medizin. Human-led AI für Pharma und Healthcare aus Mannheim.</p><p class="muted">Seite · ${h(P.category)}</p><p class="muted">${h(C.street)}, ${h(C.city)}</p><p class="fb-link">${h(C.web)}</p></div>
              <div class="fb-card"><h5>Jobs</h5><p>Pharmareferent:innen und Pharmaberater:innen, deutschlandweit</p><span class="b-fb2 wide">Alle Jobs ansehen</span></div></aside>
            <div class="fb-feed">${postsFor('fb').map(fbPost).join('')}</div>
          </div>
        </div>
      </div>
    </div>`;
  }
  const SCREENS = { li: screenLI, ig: screenIG, fb: screenFB };

  /* ---------- Tablet ---------- */
  function tablet(id, inner, cls = ''){
    return `<div class="tab-dev ${cls}" id="${id}"><div class="tab-frame"><span class="tab-cam" aria-hidden="true"></span><div class="tab-screen"><div class="tab-scale"><div class="tab-status" aria-hidden="true"><span>9:41</span><span>Mo. 11. Jan.</span><span class="bat">100 %<i></i></span></div><div class="tab-app">${inner}</div></div></div></div></div>`;
  }
  function fitTablet(dev){
    const scr = q('.tab-screen', dev), sc = q('.tab-scale', dev); if (!scr || !sc) return;
    const wide = dev.clientWidth >= 720;
    const W = wide ? 1024 : 600, H = wide ? 768 : 820;
    dev.classList.toggle('portrait', !wide);
    sc.style.width = W + 'px'; sc.style.height = H + 'px';
    const s = scr.clientWidth / W;
    sc.style.transform = `scale(${s})`;
    scr.style.height = (H * s) + 'px';
  }
  const ro = ('ResizeObserver' in window) ? new ResizeObserver(es => es.forEach(e => fitTablet(e.target))) : null;

  /* ---------- Druckmuster (Maße in mm, Schriftgrade in pt) ---------- */
  const at = (x, y, w, extra = '') => `style="--x:${x};--y:${y};${w != null ? `--wd:${w};` : ''}${extra}"`;
  const LOGO = (tone = 'red', w = 40, x, y) => x == null ? `<span class="pp-logo ${tone}" style="--lw:${w}" aria-hidden="true"></span>` : `<span class="ab pp-logo ${tone}" style="--x:${x};--y:${y};--lw:${w}" aria-hidden="true"></span>`;
  const qr = (name, tone = 'ink') => `<img class="pp-qr" src="${img('marketing/qr-' + name + (tone === 'white' ? '-weiss' : '') + '.svg')}" alt="">`;
  const LEGAL = 'Grafitecture GmbH · Rebenstraße 9a · 68309 Mannheim · Geschäftsführer: Martin Schweppe · Amtsgericht Mannheim HRB 432625 · USt-IdNr. DE209730809';
  function paper(w, hh, cls, inner, label){
    return `<div class="pp ${cls}" style="--w:${w};aspect-ratio:${w}/${hh}" role="img" aria-label="${h(label)}"><div class="pg">${inner}</div></div>`;
  }
  // DIN-5008-Briefbogen (Form B): Kopf, Anschriftfeld, Informationsblock, Falz- und Lochmarken, Fuß
  function letterhead(body, info, addr){
    return `${LOGO('red', 62, 25, 17)}
      <p class="ab fs7 slate right" ${at(125, 16.5, 65)}>Healthklick<br>${h(C.street)}<br>${h(C.city)}<br>${h(C.web)}</p>
      <p class="ab fs6 slate under" ${at(25, 50, 80)}>Healthklick · Grafitecture GmbH · ${h(C.street)} · ${h(C.city)}</p>
      <p class="ab fs10" ${at(25, 63, 80)}>${addr}</p>
      <dl class="ab fs8 info" ${at(125, 50, 65)}>${info.map(r => `<dt>${h(r[0])}</dt><dd>${h(r[1])}</dd>`).join('')}</dl>
      <span class="ab mark" ${at(3, 105, 5)}></span><span class="ab mark" ${at(3, 148.5, 7)}></span><span class="ab mark" ${at(3, 210, 5)}></span>
      ${body}
      <span class="ab pp-ringdeco" ${at(168, 248, 60)}></span>
      <p class="ab fs6 slate foot" ${at(25, 282, 165)}>${h(LEGAL)} · Bank (Muster): IBAN DE89 3704 0044 0532 0130 00 · BIC COBADEFFXXX</p>`;
  }
  const RECIPIENT = 'Auenwald Pharma GmbH<br>Frau Dr. Katrin Sommer<br>Leitung Commercial Excellence<br>Auenwaldstraße 12<br>64293 Darmstadt';
  function letterA4(){
    const body = `<p class="ab fs10 b" ${at(25, 103, 165)}>Ihre Anfrage zur Launch-Begleitung in der Kardiologie</p>
      <div class="ab fs10 txt" ${at(25, 115, 160)}><p>Sehr geehrte Frau Dr. Sommer,</p><p>vielen Dank für das Gespräch am 4. November. Wie besprochen, erhalten Sie anbei unseren Vorschlag für die ersten zwölf Monate nach dem Markteintritt: ein hybrides Team aus Außendienst und eReps, vorbereitet und begleitet von KI-Agenten, mit Medical Information vom ersten Tag an.</p><p>Jeder Agent hat bei uns eine verantwortliche Person. So sehen Sie jederzeit, wer was tut, und jede Entscheidung trifft ein Mensch.</p><p>Gern stellen wir Ihnen das Konzept am 24. November bei Ihnen in Darmstadt vor. Bis dahin erreichen Sie mich jederzeit per E-Mail.</p><p>Mit freundlichen Grüßen</p><p class="sig" aria-hidden="true"></p><p>${h(C.name)}<br>${h(C.role)}</p><p class="slate">Anlage: Präsentation „Die ersten zwölf Monate“</p></div>`;
    const info = [['Ihr Zeichen','KS-0411'],['Ihre Nachricht vom','04.11.2026'],['Unser Zeichen','MS/HK-118'],['Name',C.name],['Telefon',C.phone],['E-Mail',C.mail],['Datum','09.11.2026']];
    return paper(210, 297, 'a4', letterhead(body, info, RECIPIENT), 'Briefbogen DIN A4');
  }
  function invoiceA4(){
    const rows = [
      ['1','Projektleitung und Einrichtung Launch-Team','Pauschale','1','4.800,00','4.800,00'],
      ['2','Hybrider Außendienst als Dienstleistung, Gebiet Rhein-Main','Personentage','84','620,00','52.080,00'],
      ['3','eRep-Kontakte per Video und Telefon','Kontakte','410','38,00','15.580,00'],
      ['4','Agenten-Betrieb: Briefing-, Compliance- und Insight-Agent','Monat','1','3.900,00','3.900,00'],
      ['5','Medical Information: beantwortete Fachanfragen','Anfragen','46','42,00','1.932,00']
    ];
    const pin = n => `<span class="pin" data-pin="${n}">${n}</span>`;
    const body = `<p class="ab fs14 b" ${at(25, 100, 120)}>Rechnung</p>
      <table class="ab fs8 inv" ${at(25, 112, 165)}><thead><tr><th>Pos.</th><th>Leistung ${pin(4)}</th><th>Einheit</th><th class="r">Menge</th><th class="r">Einzelpreis €</th><th class="r">Betrag €</th></tr></thead>
      <tbody>${rows.map(r => `<tr><td>${r[0]}</td><td>${h(r[1])}</td><td>${r[2]}</td><td class="r">${r[3]}</td><td class="r">${r[4]}</td><td class="r">${r[5]}</td></tr>`).join('')}</tbody>
      <tfoot><tr><td colspan="5">Summe netto ${pin(6)}</td><td class="r">78.292,00</td></tr><tr><td colspan="5">Umsatzsteuer 19 % ${pin(7)}</td><td class="r">14.875,48</td></tr><tr class="tot"><td colspan="5">Rechnungsbetrag</td><td class="r">93.167,48</td></tr></tfoot></table>
      <div class="ab fs8 txt" ${at(25, 192, 165)}><p>Leistungszeitraum: 1. bis 30. November 2026 ${pin(5)}. Projekt: Launch-Begleitung Kardiologie, Ihre Bestellung PO 4500-118 vom 02.10.2026.</p><p>Bitte überweisen Sie den Rechnungsbetrag bis zum 14.12.2026 ohne Abzug unter Angabe der Rechnungsnummer. Kontaktberichte und Leistungsnachweise finden Sie im Kundenportal.</p><p class="slate">Personalgestellung nach dem Arbeitnehmerüberlassungsgesetz rechnet unser Personalpartner direkt mit Ihnen ab und ist nicht Teil dieser Rechnung.</p></div>
      <p class="ab fs7 slate" ${at(25, 236, 165)}>Diese Rechnung erhalten Sie als ZUGFeRD-Datei (Profil EN 16931): ein PDF mit eingebetteten strukturierten Rechnungsdaten.</p>`;
    const info = [['Rechnungsnummer','HK-2026-0042'],['Rechnungsdatum','30.11.2026'],['Kundennummer','10027'],['Ihre USt-IdNr.','DE123456789'],['Unsere USt-IdNr.','DE209730809'],['Ansprechpartner',C.name],['E-Mail',C.mail]];
    let lh = letterhead(body, info, RECIPIENT + ` ${pin(2)}`);
    lh = lh.replace('<dl class="ab fs8 info"', `<span class="ab pinwrap" ${at(121, 50)}>${pin(3)}</span><dl class="ab fs8 info"`)
           .replace('<p class="ab fs6 slate under"', `<span class="ab pinwrap" ${at(21, 17)}>${pin(1)}</span><p class="ab fs6 slate under"`)
           .replace('<p class="ab fs6 slate foot"', `<span class="ab pinwrap" ${at(21, 281)}>${pin(8)}</span><p class="ab fs6 slate foot"`);
    return paper(210, 297, 'a4 invoice', lh, 'Rechnung DIN A4');
  }
  function bizFront(){
    return paper(85, 55, 'card', `${LOGO('red', 38, 7, 7)}
      <p class="ab fs9 b" ${at(7, 31, 60)}>${h(C.name)}</p><p class="ab fs6 slate" ${at(7, 35.2, 60)}>${h(C.role)}</p>
      <p class="ab fs6" ${at(7, 41, 70)}>T ${h(C.phone)}<br>${h(C.mail)}<br>${h(C.web)}</p>`, 'Visitenkarte, Vorderseite');
  }
  function bizBack(){
    return paper(85, 55, 'card bg-ink', `<p class="ab fs13 white light" ${at(7, 8, 46)}>Mehr Zeit<br>für Medizin<i class="pp-plus"></i></p>
      <p class="ab fs6 mist" ${at(7, 41, 46)}>Healthklick · Grafitecture GmbH<br>${h(C.street)} · ${h(C.city)}</p>
      <span class="ab qrbox" ${at(57, 25, 22)}>${qr('vcard')}</span><p class="ab fs5 mist" ${at(57, 48.5, 24)}>Kontakt speichern</p>`, 'Visitenkarte, Rückseite');
  }
  function compliment(){
    return paper(210, 99, 'dl', `${LOGO('red', 56, 140, 12)}
      <p class="ab fs22 light" ${at(16, 14, 110)}>Mit besten<br>Empfehlungen</p>
      <span class="ab line" ${at(16, 60, 110)}></span><span class="ab line" ${at(16, 70, 110)}></span>
      <p class="ab fs7" ${at(140, 50, 60)}>${h(C.name)}<br><span class="slate">${h(C.role)}</span><br><br>T ${h(C.phone)}<br>${h(C.mail)}<br>${h(C.web)}</p>
      <p class="ab fs6 slate" ${at(16, 89, 180)}>Healthklick ist ein Angebot der Grafitecture GmbH · ${h(C.street)} · ${h(C.city)}</p>`, 'Komplimentkarte DIN lang');
  }
  function envelope(){
    return paper(220, 110, 'env', `${LOGO('red', 44, 15, 12)}
      <p class="ab fs6 slate" ${at(15, 20, 90)}>${h(C.street)} · ${h(C.city)}</p>
      <span class="ab window" ${at(20, 50, 90)}><span class="fs6 slate">Healthklick · Grafitecture GmbH · ${h(C.street)} · ${h(C.city)}</span><span class="fs9">Auenwald Pharma GmbH<br>Frau Dr. Katrin Sommer<br>Auenwaldstraße 12<br>64293 Darmstadt</span></span>
      <span class="ab stamp" ${at(184, 10, 24)}>Porto</span>`, 'Umschlag DIN lang mit Fenster');
  }
  const WP = [
    { no: 1, cls: 'v1', title: 'Der hybride Außendienst', sub: 'Wie KI-Agenten Arztbesuche vorbereiten, ohne sie zu ersetzen' },
    { no: 2, cls: 'v2', title: 'Die ersten zwölf Monate', sub: 'Launch-Kommunikation unter AMNOG-Bedingungen' },
    { no: 3, cls: 'v3', title: 'Patient Support, den Praxen empfehlen', sub: 'Warum Begleitprogramme scheitern und wie sie gelingen' },
    { no: 4, cls: 'v4', title: 'KI im Pharmavertrieb, aber sicher', sub: 'HWG, AI Act, DSGVO und Pharmakovigilanz' }
  ];
  function wpCover(p){
    return paper(210, 297, 'wp ' + p.cls, `<p class="ab fs9 ttl" ${at(18, 16, 174)}><span>HEALTHKLICK</span><span>Whitepaper Nr. ${p.no}</span></p>
      <span class="ab pp-ringdeco" ${at(p.no % 2 ? 70 : -40, p.no % 2 ? 40 : 70, 180)}></span><span class="ab pp-x" ${at(p.no % 2 ? 40 : 150, p.no % 2 ? 150 : 60, 26)}></span>
      <p class="ab fs40 light" ${at(18, 196, 170)}>${h(p.title)}</p><p class="ab fs12" ${at(18, 262, 160)}>${h(p.sub)}</p>
      <p class="ab fs8" ${at(18, 280, 174)}>November 2026 · ${h(C.web)}</p>`, 'Whitepaper ' + p.no + ': ' + p.title);
  }
  function wpSpread(){
    return paper(420, 297, 'spread', `<span class="ab fold" ${at(210, 0)}></span>
      <p class="ab fs8 slate" ${at(18, 16, 170)}>Der hybride Außendienst · 2</p>
      <p class="ab fs24 light" ${at(18, 34, 170)}>Ausgangslage</p>
      <div class="ab fs10 txt cols2" ${at(18, 60, 174)}><p>Der persönliche Außendienst bindet in Deutschland weiterhin den größten Teil der Budgets für Arztkommunikation. Remote-Kanäle lagen nach ihrem Hoch in der Pandemie wieder bei vier bis fünf Prozent (IQVIA). Gleichzeitig wird der Zugang zu Praxen enger: Viele Ärztinnen und Ärzte empfangen nur noch nach Termin, die Gespräche werden kürzer.</p><p>Die Frage ist deshalb nicht, ob der Außendienst bleibt, sondern wie jede Minute mit einer Ärztin oder einem Arzt mehr Wert bekommt.</p><p class="b">Was Agenten heute leisten</p><p>Briefing vor dem Termin, Gesprächsnotiz per Sprache, Compliance-Prüfung von Notizen und E-Mails, Vorschläge für das Follow-up mit Termin, Kanal und passendem Inhalt.</p><p class="b">Was Menschen bleiben</p><p>Beziehung, Urteilsvermögen und medizinische Tiefe lassen sich nicht automatisieren. Ein Agent kann vorbereiten, welche Studie eine Ärztin interessieren könnte. Ob sie heute dafür offen ist, merkt nur ein Mensch.</p></div>
      <p class="ab fs8 slate" ${at(228, 16, 170)}>3</p>
      <p class="ab fs72 light ink" ${at(228, 40, 180)}>70 %</p>
      <p class="ab fs14" ${at(228, 82, 160)}>der Ausgaben für Arztkommunikation flossen 2023 in persönliche Besuche.</p><p class="ab fs8 slate" ${at(228, 100, 160)}>Quelle: IQVIA</p>
      <div class="ab tandem" ${at(228, 130, 174)}><div><i class="r"></i><b class="fs10">Außendienst</b><span class="fs8">Top-Verordner und Kliniken</span></div><div><i class="r"></i><b class="fs10">eReps</b><span class="fs8">Breite und Vakanzgebiete</span></div><div><i class="x"></i><b class="fs10">Agenten</b><span class="fs8">vorbereiten, dokumentieren, nachfassen</span></div></div>
      <p class="ab fs10 txt" ${at(228, 220, 170)}>Alle drei Ebenen arbeiten mit derselben Kontakthistorie. Leitkennzahl ist die Kontaktqualität, nicht die Kontaktzahl.</p>`, 'Whitepaper, Innenseiten');
  }
  function brochureCover(){
    return paper(210, 297, 'bro', `<span class="ab ph" ${at(0, 0, 210, '--hh:168;')}><img src="${img('hero.webp')}" alt=""></span>
      ${LOGO('red', 70, 18, 186)}
      <p class="ab fs40 light ink" ${at(18, 204, 180)}>Mehr Zeit<br>für Medizin<i class="pp-plus"></i></p>
      <p class="ab fs11" ${at(18, 262, 160)}>Human-led AI für Pharma und Healthcare.<br>Aus Mannheim, für ganz Deutschland.</p>`, 'Imagebroschüre, Titel');
  }
  function brochureSpread(){
    const L = [['1','Hybrider Außendienst und eReps'],['2','Patient Services und Adhärenz'],['3','Medical Information und Pharmakovigilanz'],['4','Omnichannel-Content'],['5','Insights und Steuerung'],['6','Healthklick Field Force']];
    return paper(420, 297, 'spread bro', `<span class="ab fold" ${at(210, 0)}></span>
      <p class="ab fs8 slate" ${at(18, 16, 170)}>Was wir tun · 2</p><p class="ab fs36 light" ${at(18, 34, 180)}>Sechs Leistungen,<br>ein Betriebsmodell</p>
      <ol class="ab fs11 svc" ${at(18, 100, 174)}>${L.map(l => `<li><span class="n">${l[0]}</span>${h(l[1])}</li>`).join('')}</ol>
      <p class="ab fs9 txt" ${at(18, 236, 174)}>Jede Leistung läuft mit Menschen und KI-Agenten. Agenten bereiten vor, dokumentieren und fassen nach. Menschen führen jedes Gespräch, das zählt. Für jeden Agenten steht eine Person gerade.</p>
      <span class="ab ph" ${at(210, 0, 210, '--hh:200;')}><img src="${img('besprechung.webp')}" alt=""></span>
      <p class="ab fs9 slate" ${at(228, 212, 170)}>3</p><p class="ab fs16 light" ${at(228, 222, 170)}>„Wir sehen jederzeit, wer was tut. Das schafft Vertrauen, intern und bei den Ärztinnen und Ärzten.“</p><p class="ab fs8 slate" ${at(228, 262, 170)}>Musterzitat, im Livebetrieb Stimme eines Kunden mit Freigabe</p>`, 'Imagebroschüre, Doppelseite');
  }
  function brochureBack(){
    return paper(210, 297, 'bro bg-ink', `<span class="ab pp-ringdeco light" ${at(60, 30, 200)}></span>
      <p class="ab fs28 light white" ${at(18, 40, 150)}>Sprechen wir über Ihre nächsten zwölf Monate.</p>
      <p class="ab fs11 mist" ${at(18, 200, 120)}>${h(C.name)}<br>${h(C.role)}<br><br>${h(C.mail)}<br>${h(C.phone)}<br>${h(C.web)}</p>
      <span class="ab qrbox" ${at(150, 200, 42)}>${qr('kontakt')}</span><p class="ab fs7 mist" ${at(150, 245, 42)}>Gespräch vereinbaren</p>
      ${LOGO('white', 60, 18, 268)}`, 'Imagebroschüre, Rückseite');
  }
  function folder(){
    return paper(440, 310, 'folder', `<span class="ab fold" ${at(220, 0)}></span>
      <span class="ab pocket" ${at(0, 200, 220)}><span class="slot"></span></span>
      <span class="ab bcard" ${at(118, 222, 85)}><span class="pp-logo red" style="--lw:26"></span></span>
      <p class="ab fs9 slate" ${at(20, 20, 180)}>Innenseite mit Tasche und Visitenkartenschlitz</p>
      <span class="ab half bg-ink" ${at(220, 0, 220, '--hh:310;')}></span>
      ${LOGO('red', 110, 250, 40)}
      <p class="ab fs36 light white" ${at(250, 200, 170)}>Mehr Zeit<br>für Medizin<i class="pp-plus"></i></p>`, 'Präsentationsmappe A4');
  }
  function rollup(){
    return paper(850, 2000, 'rollup', `${LOGO('red', 560, 80, 110)}
      <p class="ab fs340 light ink" ${at(80, 260, 700)}>Mehr Zeit für Medizin<i class="pp-plus"></i></p>
      <p class="ab fs90 slate" ${at(80, 760, 690)}>Human-led AI für Pharma und Healthcare</p>
      <span class="ab ph" ${at(0, 900, 850, '--hh:560;')}><img src="${img('field.webp')}" alt=""></span>
      <p class="ab fs80" ${at(80, 1530, 470)}>Außendienst · eReps<br>Patient Services<br>Medical Information</p>
      <span class="ab qrbox" ${at(580, 1520, 190)}>${qr('kontakt')}</span><p class="ab fs60 slate" ${at(580, 1720, 230)}>Gespräch vereinbaren</p>
      <p class="ab fs90 b" ${at(80, 1830, 700)}>${h(C.web)}</p>`, 'Roll-up 85 × 200 cm');
  }
  function qrCard(){
    return paper(105, 148, 'a6', `<p class="ab fs7 slate" ${at(9, 9, 87)}>Begleitprogramm · Vorlage für Kundenprogramme</p>
      <p class="ab fs20 light ink" ${at(9, 20, 87)}>Sie sind mit Ihrer Therapie nicht allein.</p>
      <p class="ab fs8 txt" ${at(9, 58, 87)}>Persönliche Begleitung am Telefon, kostenfrei und auf Wunsch regelmäßig. Ihre Praxis erfährt, dass Sie dabei sind.</p>
      <span class="ab qrbox" ${at(9, 84, 34)}>${qr('kontakt')}</span><p class="ab fs8 b" ${at(48, 92, 50)}>QR-Code scannen und anmelden</p><p class="ab fs6 slate" ${at(48, 104, 50)}>Dauert zwei Minuten.</p>
      <p class="ab fs6 slate" ${at(9, 134, 87)}>Ein Programm von [Hersteller], umgesetzt von Healthklick</p>`, 'QR-Karte für Praxen A6');
  }
  function signature(){
    return `<div class="mk-mail"><div class="mail-bar"><span></span><span></span><span></span></div><div class="mail-body"><p class="mail-meta"><b>Von:</b> ${h(C.name)} &lt;${h(C.mail)}&gt;<br><b>Betreff:</b> Ihr Launch 2027</p><p>Guten Tag Frau Dr. Sommer,<br>anbei die Unterlagen zu unserem Termin.</p>
      <div class="sig"><p>Mit freundlichen Grüßen</p><p><b>${h(C.name)}</b><br><span class="slate">${h(C.role)}</span></p><span class="pp-logo red" style="--lw:34"></span><p>T ${h(C.phone)} · <span class="lnk">${h(C.mail)}</span> · <span class="lnk">${h(C.web)}</span></p><p class="slate small2">Healthklick ist ein Angebot der Grafitecture GmbH · ${h(C.street)} · ${h(C.city)} · Geschäftsführer: Martin Schweppe · Amtsgericht Mannheim HRB 432625</p></div></div></div>`;
  }

  /* ---------- Bausteine der Abschnitte ---------- */
  const chapHead = (k, c) => `<header class="wrap mk-chap-head"><p class="mk-num">${h(c.num)}</p><h3 class="t-h2" id="mk-h-${k}">${h(c.h)}</h3><div class="phi"><div></div><p class="lead">${h(c.lead)}</p></div></header>`;
  const fig = (inner, title, meta, cls = '') => `<figure class="mk-fig ${cls}"><button type="button" class="mk-zoombtn" aria-label="${h(MK.ui.zoom)}: ${h(title)}">${ic('zoom')}</button><div class="mk-mock">${inner}</div><figcaption><b>${h(title)}</b><span>${h(meta)}</span></figcaption></figure>`;

  function sectionIntro(){
    const N = MK.nav;
    return `<div class="wrap mk-head">
      <p class="t-h6 hero-kicker">${h(MK.kicker)}</p>
      <h2 class="t-h1" id="mk-title">${h(MK.title)}</h2>
      <div class="phi"><div></div><div><p class="lead">${h(MK.lead)}</p>${MK.langNote ? `<p class="mk-lang">${h(MK.langNote)}</p>` : ''}</div></div>
      <ul class="mk-facts">${MK.facts.map(f => `<li><b>${h(f[0])}</b><span>${h(f[1])}</span></li>`).join('')}</ul>
    </div>
    <nav class="mk-nav" aria-label="${h(MK.navLabel)}"><div class="wrap">${Object.keys(N).map(k => `<a href="#mk-${k}">${h(N[k])}</a>`).join('')}</div></nav>
    <div class="wrap mk-flow" aria-labelledby="mk-flow-h"><h3 class="t-h5" id="mk-flow-h">${h(MK.flowH)}</h3>
      <ol>${MK.flow.map((s,i) => `<li><span class="mk-step">${i+1}</span><b>${h(s[0])}</b><span>${h(s[1])}</span></li>`).join('')}</ol>
      <p class="small">${h(MK.flowNote)}</p></div>`;
  }

  function sectionSocial(){
    const S = MK.social, L = S.labels;
    const mix = Object.keys(D.PILLARS).map(k => [k, D.POSTS.filter(p => p.pillar === k).length]);
    const total = D.POSTS.length;
    // nach Kalenderwoche gruppieren
    const weeks = []; D.POSTS.slice().sort((a,b) => a.date.localeCompare(b.date)).forEach(p => { const [y,w] = isoWeek(p.date); const k = y + '-' + w; let g = weeks.find(x => x.k === k); if (!g){ g = {k, y, w, posts: []}; weeks.push(g); } g.posts.push(p); });
    const lang = SITE.lang === 'en' ? 'en' : 'de';
    return `<section id="mk-social" class="mk-chap" aria-labelledby="mk-h-social">${chapHead('social', S)}
      <div class="wrap"><h4 class="t-h5 mk-sub">${h(S.channelsH)}</h4>
        <div class="mk-channels">${S.channels.map(c => `<article class="mk-ch ${c.main ? 'main' : ''}"><header><span class="ch-badge ${c.id}">${h(c.short)}</span><h5 class="t-h5">${h(c.name)}</h5>${c.badge ? `<span class="ch-tag">${h(c.badge)}</span>` : ''}</header>
          <dl>${['role','who','formats','rhythm','goal'].filter(k => c[k]).map(k => `<dt>${h(L[k])}</dt><dd>${h(c[k])}</dd>`).join('')}</dl>${c.fact ? `<p class="ch-fact">${h(c.fact)}<sup>${c.src}</sup></p>` : ''}</article>`).join('')}</div>
        <p class="mk-not"><b>${h(S.notH)}</b> ${h(S.not)}</p>
      </div>
      <div class="wrap phi mk-rules"><h4 class="t-h5">${h(S.rulesH)}</h4><ol>${S.rules.map(r => `<li><b>${h(r[0])}</b> ${h(r[1])}</li>`).join('')}</ol></div>
      <div class="mk-stage" id="mk-tablet"><div class="wrap"><div class="mk-stage-head"><h4 class="t-h5">${h(S.tabletH)}</h4>
        <div class="mk-tabs" role="tablist" aria-label="${h(S.tabletH)}">${['li','ig','fb'].map((c,i) => `<button type="button" role="tab" aria-selected="${!i}" data-ch="${c}"><span class="ch-badge ${c}">${c === 'li' ? 'in' : c === 'ig' ? '◎' : 'f'}</span>${chName[c]}</button>`).join('')}</div></div>
        ${tablet('mk-dev', screenLI())}
        <p class="small mk-stage-note">${h(S.tabletNote)}</p></div></div>
      <div class="wrap mk-plan"><div class="mk-plan-head"><h4 class="t-h5">${h(S.planH)}</h4><p>${h(S.planLead)}</p>
        <div class="mk-mix" aria-label="${h(S.mixH)}">${mix.map(([k,n]) => `<span class="mx-${k}" style="flex:${n}"><b>${n}</b> ${h(D.PILLARS[k][lang])}</span>`).join('')}</div></div>
        ${weeks.map(g => `<h5 class="mk-kw">${h(S.kw)} ${g.w} · ${g.y}</h5>${g.posts.map(p => `<details class="mk-row" data-post="${p.id}"><summary><time datetime="${p.date}">${dShort(p.date)}</time><span class="chs">${p.ch.map(c => `<span class="ch-badge ${c}" title="${chName[c]}">${c === 'li' ? 'in' : c === 'ig' ? '◎' : 'f'}</span>`).join('')}</span><span class="pil mx-${p.pillar}">${h(D.PILLARS[p.pillar][lang])}</span><b>${h(p.title)}</b><span class="fmt">${h(p.format)}</span></summary>
          <div class="mk-row-body"><div class="mk-row-vis" style="--ar:${p.v && p.v.t === 'slides' ? '4/5' : '1'}">${p.v ? visual(p.v) : `<div class="pv pv-textonly"><p>${h(S.textOnly)}</p></div>`}</div>
          <div class="mk-row-txt">${p.by === 'gw' ? `<p class="mk-draft">${h(S.draftGW)}</p>` : ''}<p>${nl(p.text)}</p><p class="tags">${h(p.tags)}</p><button type="button" class="link mk-show" data-show="${p.id}">${h(S.showInTablet)}</button></div></div></details>`).join('')}`).join('')}
      </div>
    </section>`;
  }

  function sectionPrint(){
    const P = MK.print;
    return `<section id="mk-print" class="mk-chap tint-soft" aria-labelledby="mk-h-print">${chapHead('print', P)}
      <div class="wrap">
        <div class="mk-desk desk-1">
          ${fig(letterA4(), P.items.letter[0], P.items.letter[1], 'span-a4')}
          <div class="mk-stack">
            <div class="mk-pair">${fig(bizFront(), P.items.card[0], P.items.card[1])}${fig(bizBack(), P.items.cardBack[0], P.items.cardBack[1])}</div>
            ${fig(compliment(), P.items.compl[0], P.items.compl[1])}
            ${fig(envelope(), P.items.env[0], P.items.env[1])}
          </div>
        </div>
        <h4 class="t-h5 mk-sub">${h(P.broH)}</h4>
        <div class="mk-desk desk-bro">${fig(brochureCover(), P.items.broCover[0], P.items.broCover[1])}${fig(brochureSpread(), P.items.broSpread[0], P.items.broSpread[1], 'span-2')}${fig(brochureBack(), P.items.broBack[0], P.items.broBack[1])}</div>
        <h4 class="t-h5 mk-sub">${h(P.wpH)}</h4>
        <div class="mk-desk desk-wp">${WP.map(p => fig(wpCover(p), 'Nr. ' + p.no + ' · ' + p.title, P.items.wp[1])).join('')}</div>
        <div class="mk-desk desk-1wide">${fig(wpSpread(), P.items.wpSpread[0], P.items.wpSpread[1])}</div>
        <h4 class="t-h5 mk-sub">${h(P.moreH)}</h4>
        <div class="mk-desk desk-more">${fig(folder(), P.items.folder[0], P.items.folder[1], 'span-2')}${fig(rollup(), P.items.rollup[0], P.items.rollup[1], 'tall')}${fig(qrCard(), P.items.qrcard[0], P.items.qrcard[1])}${fig(signature(), P.items.sig[0], P.items.sig[1], 'span-2 nozoom')}</div>
        <div class="phi mk-needs"><div><h4 class="t-h5">${h(P.needH)}</h4><p>${h(P.needLead)}</p></div>
          <div class="mk-table-wrap"><table class="mk-table"><thead><tr>${P.specHead.map(c => `<th>${h(c)}</th>`).join('')}</tr></thead><tbody>${P.specs.map(r => `<tr>${r.map((c,i) => i ? `<td>${h(c)}</td>` : `<th scope="row">${h(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div></div>
        <div class="phi mk-needs"><div><h4 class="t-h5">${h(P.dropH)}</h4></div><ul class="mk-drop">${P.drop.map(d => `<li><b>${h(d[0])}</b> ${h(d[1])}</li>`).join('')}</ul></div>
        <aside class="mk-note"><h4 class="t-h6">${h(P.crossH)}</h4><p>${h(P.cross)}</p></aside>
      </div>
    </section>`;
  }

  function sectionInvoice(){
    const R = MK.invoice;
    return `<section id="mk-invoice" class="mk-chap" aria-labelledby="mk-h-invoice">${chapHead('invoice', R)}
      <div class="wrap phi mk-inv">
        <div class="mk-inv-side">
          <h4 class="t-h5">${h(R.dutyH)}</h4>
          <ol class="mk-duty">${R.duties.map((d,i) => `<li data-pin="${i+1}" tabindex="0"><span class="pin">${i+1}</span><span>${h(d)}</span></li>`).join('')}</ol>
          <aside class="mk-note"><h4 class="t-h6">${h(R.eH)}</h4><p>${h(R.e)}<sup>10</sup></p><button type="button" class="btn ghost mk-xml-btn" aria-expanded="false" aria-controls="mk-xml">${h(R.xmlBtn)}</button></aside>
          <pre class="mk-xml" id="mk-xml" hidden>${h(xmlSample())}</pre>
          <p class="small">${h(R.note)}</p>
        </div>
        <div>${fig(invoiceA4(), R.figH, R.figMeta, 'inv-fig')}</div>
      </div>
    </section>`;
  }
  function xmlSample(){
    return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Auszug: strukturierte Rechnungsdaten (UN/CEFACT CII, Profil EN 16931) -->
<rsm:CrossIndustryInvoice>
  <rsm:ExchangedDocument>
    <ram:ID>HK-2026-0042</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime>20261130</ram:IssueDateTime>
  </rsm:ExchangedDocument>
  <ram:SellerTradeParty>
    <ram:Name>Grafitecture GmbH</ram:Name>
    <ram:SpecifiedTaxRegistration>DE209730809</ram:SpecifiedTaxRegistration>
  </ram:SellerTradeParty>
  <ram:BuyerTradeParty>
    <ram:Name>Auenwald Pharma GmbH</ram:Name>
  </ram:BuyerTradeParty>
  <ram:BillingSpecifiedPeriod>20261101 – 20261130</ram:BillingSpecifiedPeriod>
  <ram:ApplicableTradeTax>
    <ram:CalculatedAmount>14875.48</ram:CalculatedAmount>
    <ram:BasisAmount>78292.00</ram:BasisAmount>
    <ram:RateApplicablePercent>19</ram:RateApplicablePercent>
  </ram:ApplicableTradeTax>
  <ram:DuePayableAmount currencyID="EUR">93167.48</ram:DuePayableAmount>
</rsm:CrossIndustryInvoice>`;
  }

  function sectionGive(){
    const G = MK.give;
    return `<section id="mk-give" class="mk-chap tint-soft" aria-labelledby="mk-h-give">${chapHead('give', G)}
      <div class="wrap mk-gifts">${G.items.map((g,i) => `<article class="mk-gift ${i ? '' : 'main'}">
        <div class="gift-vis">${g.imgs.map((s,j) => `<img src="${img('marketing/' + s)}" alt="${h(g.alts[j])}" ${j ? 'hidden' : ''} loading="lazy">`).join('')}${g.imgs.length > 1 ? `<div class="gift-sw" role="group">${g.views.map((v,j) => `<button type="button" aria-pressed="${!j}" data-j="${j}">${h(v)}</button>`).join('')}</div>` : ''}</div>
        <div class="gift-txt"><p class="mk-num">${h(g.tag)}</p><h4 class="t-h4">${h(g.name)}</h4><p class="lead">${h(g.idea)}</p>
          <dl>${g.specs.map(s => `<dt>${h(s[0])}</dt><dd>${h(s[1])}</dd>`).join('')}</dl></div></article>`).join('')}</div>
      <div class="wrap"><aside class="mk-note"><h4 class="t-h6">${h(G.ruleH)}</h4><p>${h(G.rule)}<sup>8</sup></p></aside></div>
    </section>`;
  }

  function sectionDeck(){
    const P = MK.deck;
    const src = B + 'praesentation/';
    return `<section id="mk-deck" class="mk-chap" aria-labelledby="mk-h-deck">${chapHead('deck', P)}
      <div class="wrap phi mk-deckwrap">
        <div class="mk-deck-txt"><h4 class="t-h5">${h(P.topicH)}</h4><p>${h(P.topic)}</p>
          <ol class="mk-slides">${P.slides.map((s,i) => `<li><span>${String(i+1).padStart(2,'0')}</span>${h(s)}</li>`).join('')}</ol>
          <div class="actions"><a class="btn" href="${src}" target="_blank" rel="noopener">${h(P.open)} ${ic('ext','tiny')}</a><a class="btn ghost" href="${src}?print=1" target="_blank" rel="noopener">${h(P.pdf)}</a></div>
          <p class="small">${h(P.keys)}</p></div>
        <div>${tablet('mk-deckdev', `<iframe class="mk-deck-frame" src="${src}?embed=1" title="${h(P.frameTitle)}" loading="lazy"></iframe>`, 'deck')}</div>
      </div>
    </section>`;
  }

  function sectionOk(){
    const O = MK.ok;
    return `<section id="mk-ok" class="mk-chap tint-soft" aria-labelledby="mk-h-ok">${chapHead('ok', O)}
      <div class="wrap phi">
        <div><h4 class="t-h5">${h(O.openH)}</h4><ul class="mk-open">${O.open.map(o => `<li><span class="ring"></span>${h(o)}</li>`).join('')}</ul></div>
        <form class="mk-okform" id="mk-okform"><fieldset><legend class="t-h5">${h(O.formH)}</legend>
          ${O.items.map((it,i) => `<div class="ok-row"><span>${h(it)}</span><label><input type="radio" name="ok${i}" value="ok"> ${h(O.yes)}</label><label><input type="radio" name="ok${i}" value="chg"> ${h(O.change)}</label></div>`).join('')}
          <div class="field"><label for="mk-ok-note">${h(O.noteL)}</label><textarea id="mk-ok-note" rows="4"></textarea></div>
          <div class="field"><label for="mk-ok-name">${h(O.nameL)}</label><input id="mk-ok-name" autocomplete="name"></div>
          <div class="actions"><a class="btn" id="mk-ok-send" href="#">${h(O.send)}</a></div><p class="small">${h(O.sendNote)}</p></fieldset></form>
      </div>
      <div class="wrap mk-src"><h4 class="t-h6">${h(MK.srcH)}</h4><ol>${MK.sources.map(s => `<li><a class="link" href="${h(s[1])}" target="_blank" rel="noopener">${h(s[0])}</a></li>`).join('')}</ol></div>
    </section>`;
  }

  /* ---------- Aufbau ---------- */
  root.innerHTML = sectionIntro() + sectionSocial() + sectionPrint() + sectionInvoice() + sectionGive() + sectionDeck() + sectionOk()
    + `<dialog class="mk-zoom" id="mk-zoom" aria-label="${h(MK.ui.zoom)}"><button type="button" class="mk-zoom-x" aria-label="${h(MK.ui.close)}">${ic('close')}</button><div class="mk-zoom-in"></div></dialog>`;

  /* ---------- Verhalten ---------- */
  const dev = q('#mk-dev'), deckDev = q('#mk-deckdev');
  [dev, deckDev].forEach(d => { fitTablet(d); if (ro) ro.observe(d); });
  window.addEventListener('load', () => [dev, deckDev].forEach(fitTablet));

  function setChannel(ch){
    qa('.mk-tabs [data-ch]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.ch === ch)));
    q('.tab-app', dev).innerHTML = SCREENS[ch]();
    q('.tab-app', dev).dataset.ch = ch;
  }
  q('.mk-tabs').addEventListener('click', e => { const b = e.target.closest('[data-ch]'); if (b) setChannel(b.dataset.ch); });
  q('.mk-tabs').addEventListener('keydown', e => {
    if (!['ArrowLeft','ArrowRight'].includes(e.key)) return;
    const bs = qa('.mk-tabs [data-ch]'), i = bs.findIndex(b => b.getAttribute('aria-selected') === 'true');
    const n = bs[(i + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length]; n.focus(); setChannel(n.dataset.ch);
  });

  // Klicks innerhalb aller Beitragsbilder und Tablet-Oberflächen
  root.addEventListener('click', e => {
    const nav = e.target.closest('.pv-nav');
    if (nav){ e.preventDefault(); e.stopPropagation(); const pv = nav.closest('.pv-slides'); const ss = qa('.pv-slide', pv), ds = qa('.pv-dots i', pv); let i = +pv.dataset.i; i = (i + (nav.classList.contains('next') ? 1 : ss.length - 1)) % ss.length; pv.dataset.i = i; ss.forEach((s,j) => s.classList.toggle('on', j === i)); ds.forEach((s,j) => s.classList.toggle('on', j === i)); return; }
    const more = e.target.closest('.li-mehr');
    if (more){ const t = more.closest('.li-text'); q('.li-short', t).hidden = true; q('.li-full', t).hidden = false; return; }
    const tile = e.target.closest('.ig-tile');
    if (tile){ const m = q('.ig-modal', dev); m.innerHTML = igModal(tile.dataset.ig); m.hidden = false; return; }
    if (e.target.closest('.ig-x') || e.target.classList.contains('ig-modal')){ const m = q('.ig-modal', dev); m.hidden = true; m.innerHTML = ''; return; }
    const show = e.target.closest('.mk-show');
    if (show){
      const p = D.POSTS.find(x => x.id === show.dataset.show); if (!p) return;
      const ch = p.ch.includes('li') && p.ch.length === 1 ? 'li' : p.ch[0];
      setChannel(ch);
      q('#mk-tablet').scrollIntoView({behavior: 'smooth', block: 'start'});
      setTimeout(() => {
        if (ch === 'ig'){ const m = q('.ig-modal', dev); m.innerHTML = igModal(p.id); m.hidden = false; return; }
        const el = q(`.tab-app [data-post="${p.id}"]`, dev), body = q('.app-body', dev);
        if (el && body){ const sc = body.getBoundingClientRect().height / body.offsetHeight || 1; body.scrollTop += (el.getBoundingClientRect().top - body.getBoundingClientRect().top) / sc - 16; el.classList.add('hl'); setTimeout(() => el.classList.remove('hl'), 2400); }
      }, 450);
      return;
    }
    const z = e.target.closest('.mk-zoombtn') || (e.target.closest('.mk-fig:not(.nozoom) .mk-mock') && !e.target.closest('a,button'));
    if (z){ const f = e.target.closest('.mk-fig'); openZoom(f); return; }
    const sw = e.target.closest('.gift-sw button');
    if (sw){ const v = sw.closest('.gift-vis'); qa('img', v).forEach((im,j) => im.hidden = j !== +sw.dataset.j); qa('.gift-sw button', v).forEach(b => b.setAttribute('aria-pressed', String(b === sw))); return; }
  });

  // Lupe für Drucksachen
  const zoom = q('#mk-zoom');
  function openZoom(f){
    const pp = q('.mk-mock', f); if (!pp) return;
    const inner = q('.mk-zoom-in', zoom); inner.innerHTML = pp.innerHTML;
    const r = q('.pp', inner); const ar = r ? (r.style.aspectRatio || '1').split('/').map(Number) : [1,1];
    inner.style.setProperty('--zar', ar[0] / (ar[1] || 1));
    if (typeof zoom.showModal === 'function') zoom.showModal(); else zoom.setAttribute('open', '');
  }
  q('.mk-zoom-x', zoom).addEventListener('click', () => zoom.close());
  zoom.addEventListener('click', e => { if (e.target === zoom) zoom.close(); });

  // Rechnung: Pflichtangaben hervorheben
  const invFig = q('.inv-fig');
  function hlPin(n){ qa('.pin', invFig).forEach(p => p.classList.toggle('on', p.dataset.pin === n)); qa('.mk-duty li').forEach(l => l.classList.toggle('on', l.dataset.pin === n)); }
  qa('.mk-duty li').forEach(li => { ['mouseenter','focus'].forEach(ev => li.addEventListener(ev, () => hlPin(li.dataset.pin))); ['mouseleave','blur'].forEach(ev => li.addEventListener(ev, () => hlPin(null))); });
  const xb = q('.mk-xml-btn'), xp = q('#mk-xml');
  xb.addEventListener('click', () => { xp.hidden = !xp.hidden; xb.setAttribute('aria-expanded', String(!xp.hidden)); xb.textContent = xp.hidden ? MK.invoice.xmlBtn : MK.invoice.xmlHide; });

  // Freigabe: Rückmeldung als vorbereitete E-Mail an die Agentur
  const okSend = q('#mk-ok-send');
  function okMail(){
    const O = MK.ok, f = q('#mk-okform');
    const lines = O.items.map((it,i) => { const v = (q(`input[name="ok${i}"]:checked`, f) || {}).value; return `${v === 'ok' ? '[x]' : v === 'chg' ? '[!]' : '[ ]'} ${it}${v === 'ok' ? ': ' + O.yes : v === 'chg' ? ': ' + O.change : ''}`; });
    const body = `${O.mailIntro}\n\n${lines.join('\n')}\n\n${O.noteL}:\n${q('#mk-ok-note').value || '–'}\n\n${q('#mk-ok-name').value || ''}`;
    okSend.href = `mailto:${O.to}?subject=${encodeURIComponent(O.subject)}&body=${encodeURIComponent(body)}`;
  }
  q('#mk-okform').addEventListener('input', okMail); q('#mk-okform').addEventListener('change', okMail); okMail();

  // Sprungmarke in den Bereich (z. B. /#mk-print): erst nach dem Aufbau anspringen
  const hs = decodeURIComponent(location.hash.slice(1));
  if (hs) { const el = document.getElementById(hs); if (el && root.contains(el)) requestAnimationFrame(() => el.scrollIntoView()); }
})();
