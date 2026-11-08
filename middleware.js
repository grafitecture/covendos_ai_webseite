/*
 * Passwortschutz für die HEALTHKLICK-Website (Vercel Routing Middleware)
 *
 * Läuft vor jeder Anfrage. Ohne gültiges Zugangs-Cookie zeigt sie eine Login-Seite
 * (Deutsch unter /, Englisch unter /en/), mit Cookie wird die Seite normal ausgeliefert.
 *
 * - Passwort: Umgebungsvariable SITE_PASSWORD im Vercel-Projekt (Production und Preview).
 *   Nach einer Änderung neu deployen. Neues Passwort = alle bisherigen Zugänge ungültig.
 * - Ohne SITE_PASSWORD bleibt die Seite gesperrt (kein Zugang ohne Passwort).
 * - Abmelden: /__logout
 * - Zugang gilt 30 Tage pro Browser (Cookie healthklick_zugang).
 * - Schutz entfernen: diese Datei löschen und neu deployen.
 * - Gilt nur bei Vercel. Auf einem Apache-Server greift diese Datei nicht.
 */

export const config = { runtime: 'edge' };

const COOKIE = 'healthklick_zugang';
const MAX_AGE = 60 * 60 * 24 * 30;
const LOGIN = '/__login';
const LOGOUT = '/__logout';

// Ohne Anmeldung erreichbar: nur was die Login-Seite selbst braucht
const OPEN = new Set(['/img/healthklick-logo.svg', '/img/healthklick-icon.svg', '/fonts/source-sans-3.woff2']);

const TEXT = {
  de: {
    title: 'Anmelden – HEALTHKLICK',
    kicker: 'Geschützte Vorschau',
    claim: ['Mehr Zeit', 'für Medizin'],
    lead: 'Diese Website ist noch nicht öffentlich. Bitte geben Sie das Passwort ein.',
    human: 'Menschen führen.',
    agent: 'Agenten arbeiten zu.',
    label: 'Passwort',
    show: 'Anzeigen',
    hide: 'Verbergen',
    submit: 'Anmelden',
    error: 'Das Passwort stimmt nicht. Bitte versuchen Sie es noch einmal.',
    empty: 'Bitte geben Sie das Passwort ein.',
    setup: 'Der Zugang ist gerade nicht eingerichtet. Bitte versuchen Sie es später noch einmal.',
    foot: 'HEALTHKLICK · ein Angebot der Grafitecture GmbH · Mannheim',
    langLabel: 'Sprache / Language',
  },
  en: {
    title: 'Sign in – HEALTHKLICK',
    kicker: 'Protected preview',
    claim: ['More time', 'for medicine'],
    lead: 'This website is not public yet. Please enter the password.',
    human: 'People lead.',
    agent: 'Agents assist.',
    label: 'Password',
    show: 'Show',
    hide: 'Hide',
    submit: 'Sign in',
    error: 'That password is not correct. Please try again.',
    empty: 'Please enter the password.',
    setup: 'Access is not set up at the moment. Please try again later.',
    foot: 'HEALTHKLICK · a service of Grafitecture GmbH · Mannheim',
    langLabel: 'Language / Sprache',
  },
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (OPEN.has(path)) return pass();

  if (path === '/robots.txt') {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
    });
  }

  const password = (typeof process !== 'undefined' && process.env && process.env.SITE_PASSWORD) || '';
  const pathLang = path === '/en' || path.startsWith('/en/') ? 'en' : 'de';

  if (!password) return page({ lang: pathLang, next: '/', message: 'setup', status: 503 });

  const expected = await token(password);

  if (path === LOGOUT) {
    return new Response(null, {
      status: 303,
      headers: {
        location: new URL(pathLang === 'en' ? '/en/' : '/', url.origin).href,
        'set-cookie': `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
        'cache-control': 'no-store',
      },
    });
  }

  if (path === LOGIN) {
    if (request.method !== 'POST') {
      return new Response(null, { status: 303, headers: { location: new URL('/', url.origin).href, 'cache-control': 'no-store' } });
    }
    let form;
    try { form = await request.formData(); } catch (e) { form = new FormData(); }
    const lang = form.get('lang') === 'en' ? 'en' : 'de';
    const next = safeNext(form.get('next'));
    const hash = safeHash(form.get('hash'));
    const given = String(form.get('passwort') || '');

    if (given && equal(await token(given), expected)) {
      return new Response(null, {
        status: 303,
        headers: {
          location: new URL(next, url.origin).href + hash,
          'set-cookie': `${COOKIE}=${expected}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
          'cache-control': 'no-store',
        },
      });
    }
    // Kurze Pause bremst automatisiertes Durchprobieren
    await new Promise((r) => setTimeout(r, 600));
    return page({ lang, next, hash, message: given ? 'error' : 'empty', status: 401 });
  }

  if (equal(readCookie(request, COOKIE), expected)) return pass();

  return page({ lang: pathLang, next: path + url.search, status: 401 });
}

/* ---------- Hilfsfunktionen ---------- */

// Anfrage normal weiterreichen (wie next() aus @vercel/functions), nicht indexieren solange geschützt
function pass() {
  return new Response(null, { headers: { 'x-middleware-next': '1', 'x-robots-tag': 'noindex, nofollow' } });
}

async function token(secret) {
  const data = new TextEncoder().encode('healthklick-zugang:v1:' + secret);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

function equal(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function readCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > -1 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return '';
}

// Nur Pfade auf derselben Seite, keine Weiterleitung nach außen
function safeNext(value) {
  const v = typeof value === 'string' ? value : '';
  if (!v.startsWith('/') || v.startsWith('//') || v.startsWith('/\\') || v.startsWith(LOGIN) || v.startsWith(LOGOUT)) return '/';
  return v.slice(0, 512);
}

// Sprungmarken wie #karriere oder #legal-notice
function safeHash(value) {
  const v = typeof value === 'string' ? value : '';
  return /^#[A-Za-z0-9_-]{1,64}$/.test(v) ? v : '';
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function page({ lang, next, hash = '', message = '', status }) {
  const t = TEXT[lang];
  const note = message ? t[message] : '';
  const invalid = message === 'error' || message === 'empty';
  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="referrer" content="no-referrer">
<meta name="theme-color" content="#ffffff">
<title>${esc(t.title)}</title>
<link rel="icon" href="/img/healthklick-icon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/source-sans-3.woff2" as="font" type="font/woff2" crossorigin>
<style>
@font-face{font-family:"Source Sans 3";font-style:normal;font-weight:200 900;font-display:swap;src:url("/fonts/source-sans-3.woff2") format("woff2")}
:root{--white:#fff;--mist:#e2e2e2;--line:#e2e2e2;--slate:#605f5e;--ink:#0a2463;--red:#fb3640;--blue:#247ba0;
--kreuz:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 68 68'%3E%3Cpath d='M33.1 0L34.9 0C37.39 0 39.4 2.01 39.4 4.5L39.4 27.6C39.4 28.15 39.85 28.6 40.4 28.6L63.5 28.6C65.99 28.6 68 30.61 68 33.1L68 34.9C68 37.39 65.99 39.4 63.5 39.4L40.4 39.4C39.85 39.4 39.4 39.85 39.4 40.4L39.4 63.5C39.4 65.99 37.39 68 34.9 68L33.1 68C30.61 68 28.6 65.99 28.6 63.5L28.6 40.4C28.6 39.85 28.15 39.4 27.6 39.4L4.5 39.4C2.01 39.4 0 37.39 0 34.9L0 33.1C0 30.61 2.01 28.6 4.5 28.6L27.6 28.6C28.15 28.6 28.6 28.15 28.6 27.6L28.6 4.5C28.6 2.01 30.61 0 33.1 0Z'/%3E%3C/svg%3E");
--font:"Corporate S","Corporate S Pro","Corporate Sans","Source Sans 3",system-ui,-apple-system,"Segoe UI",sans-serif;
--fs-h2:clamp(2.618rem,0.4rem + 6.8vw,11.089rem);--fs-h6:clamp(1.118rem,1rem + 0.4vw,1.618rem);--fs-small:clamp(0.75rem,0.7rem + 0.2vw,0.875rem);
--s-1:0.618rem;--s-2:1rem;--s-3:1.618rem;--s-4:2.618rem;--s-5:4.236rem;--pad:clamp(1.25rem,4.2vw,6.854rem);--max:120rem;
--logo:clamp(1.25rem,0.5rem + 1.25vw,2.2rem);--ease:cubic-bezier(.2,.7,.1,1)}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;min-height:100vh;min-height:100svh;display:flex;flex-direction:column;background:var(--white);color:var(--ink);font-family:var(--font);font-size:1rem;line-height:1.618;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
:focus-visible{outline:2px solid var(--red);outline-offset:3px;border-radius:2px}
.wrap{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:var(--pad)}
.bar{display:flex;align-items:center;justify-content:space-between;gap:var(--s-3);padding-block:var(--s-1)}
.logo{display:block;height:var(--logo);width:auto}
.lang{display:inline-flex;align-items:center;gap:.15rem;padding:.2rem;border:1.5px solid var(--line);border-radius:999px}
.lang a{display:inline-flex;align-items:center;justify-content:center;min-width:2.5rem;min-height:2.2rem;padding:.25rem .65rem;border-radius:999px;font-size:.82rem;font-weight:600;letter-spacing:.06em;line-height:1;color:var(--slate);text-decoration:none}
.lang a:hover{color:var(--ink)}
.lang a[aria-current="page"]{background:var(--ink);color:var(--white)}
main{flex:1;display:flex;flex-direction:column;justify-content:center;padding-block:clamp(2.618rem,6vw,6.854rem)}
.kicker{margin:0 0 var(--s-3);font-size:var(--fs-h6);line-height:1.45;color:var(--slate)}
h1{margin:0;font-size:var(--fs-h2);font-weight:300;line-height:.95;letter-spacing:-0.035em}
h1 .line{display:block;overflow:hidden;padding:.07em 0 .05em;margin:-.07em 0 -.05em}
h1 .line>span{display:inline-block;transform:translateY(110%);animation:rise 1s var(--ease) forwards}
h1 .line:nth-child(2)>span{animation-delay:.12s}
.brand-dot{display:inline-block;width:.3em;height:.3em;margin-left:.07em;background:var(--red);-webkit-mask:var(--kreuz) center/contain no-repeat;mask:var(--kreuz) center/contain no-repeat;transform:scale(0);animation:pop .55s .95s cubic-bezier(.3,1.7,.5,1) forwards}
@keyframes rise{to{transform:none}}
@keyframes pop{to{transform:scale(1)}}
.phi{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.618fr);column-gap:clamp(1.618rem,4.2vw,6.854rem);row-gap:var(--s-4);margin-top:clamp(2.618rem,5vw,6.854rem);align-items:end}
.legend{display:flex;flex-wrap:wrap;gap:var(--s-1) var(--s-3);margin:0;padding:0;list-style:none;color:var(--slate);font-size:var(--fs-h6)}
.legend li{display:flex;align-items:center;gap:var(--s-1)}
.ring,.dot{display:inline-block;width:.618em;height:.618em;border-radius:50%;flex:none}
.ring{border:max(1.5px,.09em) solid var(--slate)}
.dot{background:var(--red);border-radius:0;width:.72em;height:.72em;-webkit-mask:var(--kreuz) center/contain no-repeat;mask:var(--kreuz) center/contain no-repeat}
.lead{margin:0 0 var(--s-4);max-width:38em;font-size:var(--fs-h6);line-height:1.5}
form{max-width:38em}
label{display:block;font-size:.9rem;color:var(--slate);margin-bottom:.3rem}
.row{display:flex;flex-wrap:wrap;align-items:flex-end;gap:var(--s-2) var(--s-3)}
.input{flex:1 1 16rem;display:flex;align-items:center;border-bottom:1.5px solid var(--slate);transition:border-color .2s}
.input:focus-within{border-bottom-color:var(--red)}
.invalid .input{border-bottom:2px solid var(--red)}
input{flex:1;min-width:0;border:0;background:transparent;padding:.55rem 0;font:inherit;font-size:var(--fs-h6);color:var(--ink);border-radius:0}
input:focus{outline:none}
.toggle{flex:none;background:none;border:0;padding:.4rem 0 .4rem .8rem;font:inherit;font-size:.9rem;color:var(--slate);cursor:pointer}
.toggle:hover{color:var(--ink)}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:3rem;padding:.75rem 1.618rem;border-radius:999px;border:1.5px solid var(--ink);background:var(--ink);color:var(--white);font:inherit;font-weight:500;line-height:1.2;cursor:pointer;transition:background .2s,border-color .2s}
.btn:hover{background:var(--blue);border-color:var(--blue)}
.note{margin:var(--s-1) 0 0;min-height:1.618em;font-size:.95rem;font-weight:600;color:var(--ink)}
.note.info{color:var(--slate);font-weight:400}
footer{padding-block:var(--s-3);border-top:1px solid var(--line);font-size:var(--fs-small);color:var(--slate)}
@media (max-width:760px){.phi{grid-template-columns:1fr}.legend{order:2}.btn{width:100%}}
@media (prefers-reduced-motion:reduce){h1 .line>span,.brand-dot{animation:none;transform:none}}
</style>
</head>
<body>
<header class="wrap bar">
  <img class="logo" src="/img/healthklick-logo.svg" width="626" height="70" alt="HEALTHKLICK">
  <nav class="lang" aria-label="${esc(t.langLabel)}">
    <a href="/" hreflang="de" lang="de"${lang === 'de' ? ' aria-current="page"' : ''}>DE</a>
    <a href="/en/" hreflang="en" lang="en"${lang === 'en' ? ' aria-current="page"' : ''}>EN</a>
  </nav>
</header>
<main class="wrap">
  <p class="kicker">${esc(t.kicker)}</p>
  <h1><span class="line"><span>${esc(t.claim[0])}</span></span><span class="line"><span>${esc(t.claim[1])}<i class="brand-dot" aria-hidden="true"></i></span></span></h1>
  <div class="phi">
    <ul class="legend" aria-hidden="true">
      <li><span class="ring"></span>${esc(t.human)}</li>
      <li><span class="dot"></span>${esc(t.agent)}</li>
    </ul>
    <div>
      <p class="lead">${esc(t.lead)}</p>
      <form method="post" action="${LOGIN}"${invalid ? ' class="invalid"' : ''}>
        <input type="hidden" name="next" value="${esc(next)}">
        <input type="hidden" name="hash" value="${esc(hash)}">
        <input type="hidden" name="lang" value="${lang}">
        <label for="pw">${esc(t.label)}</label>
        <div class="row">
          <div class="input">
            <input id="pw" name="passwort" type="password" autocomplete="current-password" autocapitalize="off" spellcheck="false" required autofocus aria-describedby="note"${invalid ? ' aria-invalid="true"' : ''}>
            <button class="toggle" type="button" aria-controls="pw" aria-pressed="false" hidden>${esc(t.show)}</button>
          </div>
          <button class="btn" type="submit">${esc(t.submit)}</button>
        </div>
        <p class="note${message === 'setup' ? ' info' : ''}" id="note" role="alert">${esc(note)}</p>
      </form>
    </div>
  </div>
</main>
<footer class="wrap">${esc(t.foot)}</footer>
<script>
(function(){
  var f=document.querySelector('form'),h=f.elements.hash,pw=document.getElementById('pw'),b=document.querySelector('.toggle');
  // Sprungmarke (z. B. #karriere) nach der Anmeldung wieder öffnen
  if(location.hash)h.value=location.hash;
  window.addEventListener('hashchange',function(){h.value=location.hash});
  b.hidden=false;
  b.addEventListener('click',function(){var on=pw.type==='password';pw.type=on?'text':'password';b.setAttribute('aria-pressed',on);b.textContent=on?${JSON.stringify(t.hide)}:${JSON.stringify(t.show)};pw.focus()});
})();
</script>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
      'referrer-policy': 'no-referrer',
      'x-frame-options': 'DENY',
    },
  });
}
