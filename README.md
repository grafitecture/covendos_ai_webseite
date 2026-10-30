# covendos.ai – Website der Covendos Healthcare Group

Statische One-Page-Website mit Unterseiten (Karriere, Impressum, Datenschutz, Markenleitfaden).
Keine Build-Pipeline nötig: Die Dateien werden direkt ausgeliefert.

## Struktur

```
index.html                 Seite inkl. CSS und JavaScript
fonts/source-sans-3.woff2  Web-Fallback-Schrift, lokal (keine Google-Verbindung)
img/                       Bilder (WebP), Logo als SVG, Favicon
img/team/                  Porträts (fiktives Team, Higgsfield AI)
.htaccess                  HTTPS, Caching, Sicherheits-Header für Apache (Managed Server comvos)
```

Ansichten werden über den Hash gesteuert: `#karriere`, `#impressum`, `#datenschutz`, `#marke`.
Abschnitte der Startseite: `#deutschlandweit`, `#leistungen`, `#personal`, `#lebenszyklus`, `#agenten`, `#team`, `#wissen`, `#kontakt`.

## Gestaltung

- Farben: Covendos-Rot `#ed192e` (Logo), Weiß, Slate `#5e6f79`, Mist `#f3f5f7`, Schrift Ink `#1d2a32`
- Schrift: Corporate S (lokal installiert, falls lizenziert), sonst Source Sans 3
- Typo-Skala im Goldenen Schnitt (h1 17.942rem … small 0.618rem), fluid per `clamp()`
- Zeichensystem: Kreis = Mensch, roter Punkt = Agent

## Vor dem Livegang offen

- [ ] Impressum: AÜG-Erlaubnis der helena GmbH (Agentur für Arbeit, Datum) eintragen
- [ ] Datenschutz: Serverstandort und Logfile-Speicherdauer mit comvos abstimmen, Art. 26 DSGVO prüfen, rechtliche Prüfung
- [ ] E-Mail-Adresse `karriere@covendos.com` anlegen oder ersetzen
- [ ] Kontakt-, Bewerbungs- und Whitepaper-Formular an ein Backend/CRM anbinden (derzeit mailto und PDF im Browser)
- [ ] Fiktives Team und Beispielstellen durch echte Inhalte ersetzen
- [ ] Corporate S als Webfont lizenzieren (optional)

Konzeption und Gestaltung: Grafitecture GmbH, Mannheim.
