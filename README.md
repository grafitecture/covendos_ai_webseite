# HEALTHKLICK – Website

Healthklick ist ein Angebot der Grafitecture GmbH (Rebenstraße 9a, 68309 Mannheim, www.grafitecture.de).
Die Seite ist aus der Covendos-Website (Konzeptentwurf Oktober 2026) entstanden: Inhalte übernommen, Marke, Farben, Rechtstexte und Kontaktdaten neu, Team entfernt, FAQ neu.

Statische Website auf Deutsch und Englisch, mit Unterseiten (Karriere, FAQ, Impressum, Datenschutz, Markenleitfaden). Ausgeliefert über Vercel.
Keine Build-Pipeline nötig: Die Dateien werden direkt ausgeliefert.

## Struktur

```
index.html                 Deutsche Seite (/)
en/index.html              Englische Seite (/en/)
css/site.css               Gestaltung für beide Sprachen
js/site.js                 Logik für beide Sprachen (Routing, Formulare, PDF, Whitepaper, Sprachumschalter)
js/de.js                   Deutsche Daten und Texte für Script und PDFs (Stellen, Agenten, Whitepaper, Farben …)
js/en.js                   Englische Daten und Texte, gleiche Struktur wie js/de.js
fonts/source-sans-3.woff2  Web-Fallback-Schrift, lokal (keine Google-Verbindung)
img/                       Bilder (WebP, Higgsfield AI), Logo, Zeichen und Kreuz als SVG
kit/grafitecture-credit/   Grafitecture-Feld (Kit v1.2, unverändert aus grafitecture/lannee_webseite)
middleware.js              Passwortschutz mit Login-Seite (nur bei Vercel)
.htaccess                  HTTPS, Caching, Sicherheits-Header, nur falls die Seite einmal auf Apache läuft
```

## Sprachen

- Texte im Seitenaufbau stehen direkt in `index.html` bzw. `en/index.html`.
  Listen, Formular-Texte, E-Mail-Vorlagen und PDF-Inhalte stehen in `js/de.js` bzw. `js/en.js`.
  **Jede inhaltliche Änderung in beiden Sprachen nachziehen.**
- Gestaltung und Logik gibt es nur einmal (`css/site.css`, `js/site.js`).
- Sprachumschalter DE/EN: auf dem Desktop rechts im Header, mobil im Menü (Dropdown).
  Beim Wechsel bleibt man in derselben Ansicht, z. B. `#karriere` ↔ `/en/#careers`.
- Die Zuordnung der Anker steht in `js/site.js` (Konstante `HASHES`). Neue Abschnitte dort eintragen.
- `hreflang`-Verweise im `<head>` beider Seiten. Englisch in britischer Schreibweise.
- Impressum und Datenschutz auf Englisch sind Übersetzungen; maßgeblich ist die deutsche Fassung (Hinweis steht auf der Seite).

| Deutsch | Englisch |
| --- | --- |
| `#deutschlandweit` | `#germany` |
| `#leistungen` | `#services` |
| `#personal` | `#staffing` |
| `#lebenszyklus` | `#lifecycle` |
| `#agenten` | `#agents` |
| `#faq` (Ansicht) | `#faq` |
| `#faq-modell`, `#faq-markt`, `#faq-zyklus`, `#faq-recht`, `#faq-patienten`, `#faq-personal` | `#faq-model`, `#faq-market`, `#faq-lifecycle`, `#faq-compliance`, `#faq-patients`, `#faq-staffing` |
| `#wissen` | `#whitepapers` |
| `#kontakt` | `#contact` |
| `#karriere` (Ansicht) | `#careers` |
| `#stellen` | `#jobs` |
| `#bewerben` | `#apply` |
| `#marke` (Ansicht) | `#brand` |
| `#impressum` (Ansicht) | `#legal-notice` |
| `#datenschutz` (Ansicht) | `#privacy` |

Anker der jeweils anderen Sprache funktionieren auch (z. B. `/en/#karriere` öffnet die englische Karriereseite).

## Gestaltung

- Logo: Wortmarke HEALTHKLICK in Strawberry Red `#FB3640` (`img/healthklick-logo.svg`, vektorisiert aus der Vorlage). Das Kreuz am Anfang bildet mit dem folgenden Strich das H. Zeichen für Favicon/App: `img/healthklick-icon.svg` (Kreuz und Strich), einzelnes Kreuz: `img/healthklick-kreuz.svg`
- Farben, ausschließlich: Imperial Blue `#0A2463` (Schrift, Buttons, Fußzeile), Strawberry Red `#FB3640` (Logo, Kreuz, Signal), Charcoal `#605F5E` (Sekundärtext, Kreise), Cerulean `#247BA0` (Textlinks, Hover), Alabaster Grey `#E2E2E2` (Flächen, Linien). Weiß ist das Papier
- Strawberry Red nie als Schrift auf Weiß (Kontrast 3,7 : 1). Textlinks in Cerulean, auf Alabaster Grey in Imperial Blue. Fehlermeldungen in Imperial Blue mit rotem ×
- Schrift: Corporate S (lokal installiert, falls lizenziert), sonst Source Sans 3
- Typo-Skala im Goldenen Schnitt (h1 17.942rem … small 0.618rem), fluid per `clamp()`
- Zeichensystem: Kreis = Mensch, rotes Kreuz aus dem Logo = Agent (CSS-Maske `--kreuz` in `css/site.css`, im PDF `pdfKreuz()` in `js/site.js`). Das Kreuz steht auch als Schlusszeichen im Claim
- Mobiles Menü bis 1200 px Breite (wegen Sprachumschalter im Header)
- Logo-Intro (nur Tablet und mobil, bis 1200 px): Beim Öffnen der Startseite steht das Logo groß (volle Inhaltsbreite, höchstens 40 rem) und mit Abstand nach oben über der Headline. Beim Scrollen wird es stufenlos kleiner und wandert an seinen Platz im Header; der Endpunkt ist erreicht, sobald der Platz des großen Logos die Höhe des Header-Logos erreicht. Zurück nach oben wird es wieder groß. Auf dem Desktop (ab 1201 px) gibt es bewusst kein Intro. Kein Intro bei Sprungmarken (`#kontakt` usw.), beim Sprachwechsel und bei „Bewegung reduzieren“. Bausteine: kleines Script im `<head>` und `<img class="hero-logo">` im Hero (beide Sprachen, unsichtbarer Platzhalter), CSS-Block „Logo-Intro“ in `css/site.css` (Größe und Abstand nach oben bei `.intro .hero-logo`), Funktion `logoIntro()` in `js/site.js`

## Passwortschutz (Vorschau)

- Solange die Seite nicht öffentlich ist, steht eine Login-Seite davor: `middleware.js` (Vercel Routing Middleware). Ohne Anmeldung ist nichts erreichbar außer Logo, Favicon und Schrift für die Login-Seite.
- Passwort: Umgebungsvariable `SITE_PASSWORD` im Vercel-Projekt (Production und Preview), nicht im Code. Ändern unter Vercel → Settings → Environment Variables, danach neu deployen. Ein neues Passwort meldet alle ab.
- Login-Seite auf Deutsch unter `/`, auf Englisch unter `/en/`. Nach der Anmeldung geht es zur aufgerufenen Seite inklusive Sprungmarke (z. B. `#karriere`).
- Zugang gilt 30 Tage pro Browser (Cookie `healthklick_zugang`). Abmelden: `/__logout`.
- Solange der Schutz aktiv ist: `robots.txt` sperrt alles, alle Antworten tragen `X-Robots-Tag: noindex`.
- Fehlt `SITE_PASSWORD`, bleibt die Seite gesperrt.
- Schutz entfernen: `middleware.js` löschen und deployen.
- Gilt nur bei Vercel. Auf einem Apache-Server greift `middleware.js` nicht; dort bräuchte es einen eigenen Schutz (z. B. `.htaccess` mit Passwortdatei).

## Grafitecture-Feld (Impressum und Datenschutz)

- Lime-Feld mit Grafitecture-Logo, „Marken mit KI.“ / „Brands with AI.“ und Link auf `https://www.grafitecture.de/` (neues Fenster).
- Steht als letztes Element des Inhalts in den Ansichten `#impressum` und `#datenschutz` (`index.html`) sowie `#legal-notice` und `#privacy` (`en/index.html`), direkt vor der Fußzeile.
- Markup: Inhalt von `kit/grafitecture-credit/snippet.de.html` bzw. `snippet.en.html`, unverändert eingefügt. CSS: `grafitecture-credit.css` unverändert am Ende von `css/site.css`.
- **Ausnahme von den Farbregeln:** Die Farben des Feldes (Lime `#dafd55`, `#435960`, Weiß) und seine Größe gehören der Agentur, nicht Healthklick. Sie bleiben so, auch wenn sonst nur die fünf HEALTHKLICK-Farben und Weiß gelten. Am Feld nichts an Healthklick anpassen.
- Quelle ist das Kit in `grafitecture/lannee_webseite`, Ordner `kit/grafitecture-credit/` (README dort). Änderungen nur dort machen und bei einer neuen Version Ordner, Schnipsel und CSS hier nachziehen.
- Eine zusätzliche Zeile wie „Konzeption und Gestaltung: Grafitecture“ gehört nicht mehr ins Impressum (das Feld nennt die Agentur).

## FAQ

- Ansicht `#faq` in beiden Sprachen, 26 Fragen in sechs Gruppen, Antworten als `<details>` (Kreuz dreht sich beim Öffnen zum ×)
- Quellen nummeriert am Ende der Ansicht (`#faq-q1` …), Hinweise im Text als hochgestellte Zahl. Stand November 2026; Zahlen und Rechtsstand vor dem Livegang prüfen
- Inhalte stehen direkt in `index.html` bzw. `en/index.html`

## Vor dem Livegang offen

- [ ] Domain festlegen, dann `canonical` und `hreflang` mit vollständiger Adresse eintragen (beide Sprachen)
- [ ] Impressum: Telefonnummer ergänzen; Personalpartner (Firma, Register, AÜG-Erlaubnis mit Behörde und Datum) nennen
- [ ] Datenschutz: Vercel-Tarif prüfen (Data Processing Addendum gilt für Pro und Enterprise), Logfile-Speicherdauer eintragen, Pflicht zur Benennung eines Datenschutzbeauftragten prüfen, rechtliche Prüfung
- [ ] Eigene Adressen (z. B. info@ und karriere@) anlegen und `martin.schweppe@grafitecture.de` ersetzen
- [ ] Kontakt-, Bewerbungs- und Whitepaper-Formular an ein Backend/CRM anbinden (derzeit mailto und PDF im Browser); danach Datenschutz anpassen
- [ ] Beispielstellen durch echte Stellen ersetzen
- [ ] Englische Texte gegenlesen lassen (Muttersprachler, Fachbegriffe Pharma/Recht)
- [ ] Corporate S als Webfont lizenzieren (optional)
- [ ] Passwortschutz entfernen (`middleware.js` löschen), wenn die Seite öffentlich sein soll

Konzeption, Gestaltung und Betrieb: Grafitecture GmbH, Mannheim.
