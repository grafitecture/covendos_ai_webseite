# covendos.ai – Website der Covendos Healthcare Group

Statische Website auf Deutsch und Englisch, mit Unterseiten (Karriere, Impressum, Datenschutz, Markenleitfaden).
Keine Build-Pipeline nötig: Die Dateien werden direkt ausgeliefert.

## Struktur

```
index.html                 Deutsche Seite (https://covendos.ai/)
en/index.html              Englische Seite (https://covendos.ai/en/)
css/site.css               Gestaltung für beide Sprachen
js/site.js                 Logik für beide Sprachen (Routing, Formulare, PDF, Whitepaper, Sprachumschalter)
js/de.js                   Deutsche Daten und Texte für Script und PDFs (Team, Stellen, Agenten, Whitepaper …)
js/en.js                   Englische Daten und Texte, gleiche Struktur wie js/de.js
fonts/source-sans-3.woff2  Web-Fallback-Schrift, lokal (keine Google-Verbindung)
img/                       Bilder (WebP), Logo als SVG, Favicon
img/team/                  Porträts (fiktives Team, Higgsfield AI)
kit/grafitecture-credit/   Grafitecture-Feld (Kit v1.2, unverändert aus grafitecture/lannee_webseite)
.htaccess                  HTTPS, Caching, Sicherheits-Header für Apache (Managed Server comvos)
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
| `#team` | `#team` |
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

- Farben: Covendos-Rot `#ed192e` (Logo), Weiß, Slate `#5e6f79`, Mist `#f3f5f7`, Schrift Ink `#1d2a32`
- Schrift: Corporate S (lokal installiert, falls lizenziert), sonst Source Sans 3
- Typo-Skala im Goldenen Schnitt (h1 17.942rem … small 0.618rem), fluid per `clamp()`
- Zeichensystem: Kreis = Mensch, roter Punkt = Agent
- Mobiles Menü bis 1200 px Breite (wegen Sprachumschalter im Header)
- Logo-Intro: Beim Öffnen der Startseite steht das Logo groß im Hero – ab 1201 px links neben der Headline, darunter groß über der Headline – und gleitet nach rund 2,6 s an seinen Platz im Header; Kicker, Headline und Seite gleiten mit. Scrollen, Tippen, Klicken oder eine Taste starten das Gleiten sofort. Kein Intro bei Sprungmarken (`#kontakt` usw.), beim Sprachwechsel und bei „Bewegung reduzieren“. Bausteine: kleines Script im `<head>` und `<img class="hero-logo">` im Hero (beide Sprachen), CSS-Block „Logo-Intro“ in `css/site.css`, Funktion `logoIntro()` in `js/site.js` (Standzeit `HOLD`, Dauer `DUR`)

## Grafitecture-Feld (Impressum und Datenschutz)

- Lime-Feld mit Grafitecture-Logo, „Marken mit KI.“ / „Brands with AI.“ und Link auf `https://www.grafitecture.de/` (neues Fenster).
- Steht als letztes Element des Inhalts in den Ansichten `#impressum` und `#datenschutz` (`index.html`) sowie `#legal-notice` und `#privacy` (`en/index.html`), direkt vor der Fußzeile.
- Markup: Inhalt von `kit/grafitecture-credit/snippet.de.html` bzw. `snippet.en.html`, unverändert eingefügt. CSS: `grafitecture-credit.css` unverändert am Ende von `css/site.css`.
- **Ausnahme von den Farbregeln:** Die Farben des Feldes (Lime `#dafd55`, `#435960`, Weiß) und seine Größe gehören der Agentur, nicht Covendos. Sie bleiben so, auch wenn sonst nur Covendos-Rot, Slate, Mist, Ink und Weiß gelten. Am Feld nichts an Covendos anpassen.
- Quelle ist das Kit in `grafitecture/lannee_webseite`, Ordner `kit/grafitecture-credit/` (README dort). Änderungen nur dort machen und bei einer neuen Version Ordner, Schnipsel und CSS hier nachziehen.
- Eine zusätzliche Zeile wie „Konzeption und Gestaltung: Grafitecture“ gehört nicht mehr ins Impressum (das Feld nennt die Agentur).

## Vor dem Livegang offen

- [ ] Impressum: AÜG-Erlaubnis der helena GmbH (Agentur für Arbeit, Datum) eintragen – in beiden Sprachen
- [ ] Datenschutz: Serverstandort und Logfile-Speicherdauer mit comvos abstimmen, Art. 26 DSGVO prüfen, rechtliche Prüfung
- [ ] E-Mail-Adresse `karriere@covendos.com` anlegen oder ersetzen
- [ ] Kontakt-, Bewerbungs- und Whitepaper-Formular an ein Backend/CRM anbinden (derzeit mailto und PDF im Browser)
- [ ] Fiktives Team und Beispielstellen durch echte Inhalte ersetzen
- [ ] Englische Texte gegenlesen lassen (Muttersprachler, Fachbegriffe Pharma/Recht)
- [ ] Corporate S als Webfont lizenzieren (optional)

Konzeption und Gestaltung: Grafitecture GmbH, Mannheim.
