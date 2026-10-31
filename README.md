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

## Vor dem Livegang offen

- [ ] Impressum: AÜG-Erlaubnis der helena GmbH (Agentur für Arbeit, Datum) eintragen – in beiden Sprachen
- [ ] Datenschutz: Serverstandort und Logfile-Speicherdauer mit comvos abstimmen, Art. 26 DSGVO prüfen, rechtliche Prüfung
- [ ] E-Mail-Adresse `karriere@covendos.com` anlegen oder ersetzen
- [ ] Kontakt-, Bewerbungs- und Whitepaper-Formular an ein Backend/CRM anbinden (derzeit mailto und PDF im Browser)
- [ ] Fiktives Team und Beispielstellen durch echte Inhalte ersetzen
- [ ] Englische Texte gegenlesen lassen (Muttersprachler, Fachbegriffe Pharma/Recht)
- [ ] Corporate S als Webfont lizenzieren (optional)

Konzeption und Gestaltung: Grafitecture GmbH, Mannheim.
