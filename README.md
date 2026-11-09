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
css/marketing.css          Gestaltung des Marketing-Bereichs unter dem Footer
js/marketing.js            Aufbau und Verhalten des Marketing-Bereichs (Tablets, Druckmuster, Rechnung, Freigabe)
js/marketing-data.js       Kampagneninhalte: Redaktionsplan mit 18 Beiträgen, Profile, Ansprechpartner (Deutsch)
praesentation/             Interaktive Präsentation „Die ersten zwölf Monate“ (index.html, deck.css, deck.js)
img/marketing/             Give-away-Visualisierungen (SVG), QR-Codes, später die Team-Musterbilder
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
| `#marketing`, `#mk-social`, `#mk-print`, `#mk-invoice`, `#mk-give`, `#mk-deck`, `#mk-ok` | gleich |

Anker der jeweils anderen Sprache funktionieren auch (z. B. `/en/#karriere` öffnet die englische Karriereseite).

## Gestaltung

- Logo: Wortmarke HEALTHKLICK in Strawberry Red `#FB3640` (`img/healthklick-logo.svg`, vektorisiert aus der Vorlage). Das Kreuz am Anfang bildet mit dem folgenden Strich das H. Zeichen für Favicon/App: `img/healthklick-icon.svg` (Kreuz und Strich), einzelnes Kreuz: `img/healthklick-kreuz.svg`
- Farben, ausschließlich: Imperial Blue `#0A2463` (Schrift, Buttons, Fußzeile), Strawberry Red `#FB3640` (Logo, Kreuz, Signal), Charcoal `#605F5E` (Sekundärtext, Kreise), Cerulean `#247BA0` (Textlinks, Hover), Alabaster Grey `#E2E2E2` (Flächen, Linien). Weiß ist das Papier
- Strawberry Red nie als Schrift auf Weiß (Kontrast 3,7 : 1). Textlinks in Cerulean, auf Alabaster Grey in Imperial Blue. Fehlermeldungen in Imperial Blue mit rotem ×
- Schrift: Corporate S (lokal installiert, falls lizenziert), sonst Source Sans 3
- Typo-Skala im Goldenen Schnitt (h1 17.942rem … small 0.618rem), fluid per `clamp()`
- Zeichensystem: Kreis = Mensch, rotes Kreuz aus dem Logo = Agent (CSS-Maske `--kreuz` in `css/site.css`, im PDF `pdfKreuz()` in `js/site.js`). Das Kreuz steht auch als Schlusszeichen im Claim
- Mobiles Menü bis 1200 px Breite (wegen Sprachumschalter im Header). Knopf: drei Linien in Logo-Rot (#FB3640, Strichstärke wie im Logo), offen werden sie zum Kreuz; Bildschirmleser lesen „Menü“ / „Menu“
- Logo-Intro (alle Geräte): Beim Öffnen der Startseite steht das Logo anderthalbmal so groß wie im Header und mit Abstand nach oben direkt über der Zeile „Human-led AI …“. Beim Scrollen wird es stufenlos kleiner und wandert an seinen Platz im Header; der Endpunkt ist erreicht, sobald die Unterkante des großen Logos die des Header-Logos erreicht. Die Größe läuft der Bewegung voraus, damit das Logo die Navigation nie überdeckt. Zurück nach oben wird es wieder groß. Kein Intro bei Sprungmarken (`#kontakt` usw.), beim Sprachwechsel und bei „Bewegung reduzieren“. Bausteine: kleines Script im `<head>` und `<img class="hero-logo">` im Hero (beide Sprachen, unsichtbarer Platzhalter), CSS-Block „Logo-Intro“ in `css/site.css` (Größe als Vielfaches von `--logo-big` und Abstand nach oben bei `.intro .hero-logo`), Funktion `logoIntro()` in `js/site.js`

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

## Leads

- Alle Anfragen gehen an **Martin Schweppe, martin.schweppe@grafitecture.de** (`mail` und `apply` in `js/de.js` und `js/en.js`): Kontaktformular, Bewerbungen, sichtbare Kontaktadressen, Fußzeile, FAQ und der Link „Gespräch zum Thema anfragen“ nach der Whitepaper-Registrierung (vorbereitete E-Mail mit den Registrierungsdaten). Martin Schweppe ist auch Absender aller Drucksachen, der Signatur und der Präsentation (`CONTACT` in `js/marketing-data.js`).
- Quelle ohne Tracking: Links mit `?quelle=linkedin` (oder `instagram`, `facebook`, `qr` …) schreiben „Gefunden über: …“ in die Anfrage. Konstante `SOURCE` in `js/site.js`.
- Die Formulare öffnen weiterhin das E-Mail-Programm der Besucher (mailto). Für den automatischen Versand braucht es einen Mail-Dienst; danach Datenschutzerklärung anpassen.

## Marketing-Material zur Freigabe (unter dem Footer)

- Abschnitt `#marketing` direkt nach `</footer>` in `index.html` und `en/index.html`, sichtbar in allen Ansichten. Inhalt baut `js/marketing.js`, Gestaltung `css/marketing.css`.
- Kapitel: Social Media (Kanalstrategie, Spielregeln, Tablet mit LinkedIn-, Instagram- und Facebook-Ansicht, Redaktionsplan KW 47/2026 bis KW 2/2027), Print (Briefbogen nach DIN 5008, Visitenkarte, Komplimentkarte, Umschlag, Imagebroschüre, Whitepaper, Mappe, Roll-up, QR-Karte, E-Mail-Signatur), Rechnungswesen (Rechnung mit markierten Pflichtangaben, E-Rechnung), Give-aways (Ideenbuch, Drei Minuten, Der Klick), Präsentation (Vorschau im Tablet), Freigabe (offene Punkte, Rückmeldung per vorbereiteter E-Mail an Grafitecture, Quellen).
- Texte drumherum je Sprache in `SITE.mk` (`js/de.js`, `js/en.js`). Die Kampagne selbst (Beiträge, Drucksachen, Rechnung, Präsentation) ist auf Deutsch, auch auf der englischen Seite.
- Beiträge ändern: `POSTS` in `js/marketing-data.js` (Datum, Kanäle `li`/`ig`/`fb`, Säule, Text, Bildtyp `v`). Ansprechpartner, Telefon und Domain stehen in `CONTACT`.
- Druckmuster sind maßstäblich in HTML gebaut (`--mm`, Schriftgrade in pt). Antippen öffnet die Lupe.
- QR-Codes: `img/marketing/qr-vcard.svg` (Kontaktdaten Martin Schweppe) und `qr-kontakt.svg` (`https://healthklick.de/?quelle=qr#kontakt`). Funktionieren erst, wenn die Domain registriert und verbunden ist.
- Team-Musterbilder (Ausflug, Bowling, Weihnachtsmarkt): Platzhalter, bis die Bilder mit Higgsfield erzeugt sind. Dann als `img/marketing/ausflug.webp`, `bowling.webp`, `weihnachtsmarkt.webp` ablegen und in `IMG` (`js/marketing-data.js`) `pending:false` setzen. In den echten Kanälen erscheinen nur echte Fotos (KI-Bilder kennzeichnen, Art. 50 KI-Verordnung).
- **Farbausnahme:** Die nachgebauten Oberflächen von LinkedIn, Instagram und Facebook im Tablet nutzen deren eigene Farben.
- **Kreuz:** In Drucksachen und auf Give-aways steht das Kreuz nur als Teil der Wortmarke, im Claim oder auf Imperial Blue (§ 125 OWiG schützt das rote Kreuz auf weißem Grund). Vor dem Druck rechtlich prüfen lassen.
- Vor dem öffentlichen Livegang: Abschnitt `#marketing`, die beiden Skripte und `css/marketing.css` aus beiden Sprachen entfernen (oder hinter eine eigene Freigabe-Adresse legen).

## Präsentation

- `praesentation/` (Deutsch): 14 Folien in 1600 × 900, skaliert aufs Fenster. Pfeiltasten, Leertaste, Wischen; `O` Übersicht, `F` Vollbild, `N` Sprechernotizen; `#5` öffnet Folie 5.
- `?embed=1` für die Vorschau im Tablet, `?print=1` zeigt alle Folien untereinander und öffnet den Druckdialog (PDF).
- Fiktiver Kunde (Auenwald Pharma GmbH), fiktive Modellrechnungen; Rechtsstand und Zahlen mit Quellen auf den Folien.

## FAQ

- Ansicht `#faq` in beiden Sprachen, 36 Fragen in sechs Gruppen (davon 13 in „Healthklick Field Force und Arbeitnehmerüberlassung“), Antworten als `<details>` (Kreuz dreht sich beim Öffnen zum ×)
- Quellen nummeriert am Ende der Ansicht (`#faq-q1` bis `#faq-q21`; `js/site.js` kennt Sprungmarken bis 30), Hinweise im Text als hochgestellte Zahl. Stand November 2026; Zahlen und Rechtsstand vor dem Livegang prüfen
- AÜG-Zahlen mit Ablaufdatum: Lohnuntergrenze 15,33 €/h bis 31.03.2027, danach 15,87 €/h; die Siebte Verordnung (Quelle 17) gilt nur bis 30.09.2027, dann Nachfolgeverordnung und Tarifwerk DGB/GVP prüfen
- Inhalte stehen direkt in `index.html` bzw. `en/index.html`

## Vor dem Livegang offen

- [ ] Domain festlegen, dann `canonical` und `hreflang` mit vollständiger Adresse eintragen (beide Sprachen)
- [ ] Impressum: Telefonnummer ergänzen; Personalpartner (Firma, Register, AÜG-Erlaubnis mit Behörde und Datum) nennen
- [ ] Datenschutz: Vercel-Tarif prüfen (Data Processing Addendum gilt für Pro und Enterprise), Logfile-Speicherdauer eintragen, Pflicht zur Benennung eines Datenschutzbeauftragten prüfen, rechtliche Prüfung
- [ ] Eigene Adressen (z. B. karriere@) anlegen und `martin.schweppe@grafitecture.de` ersetzen
- [ ] Domain healthklick.de registrieren (am 9.11.2026 frei, healthklick.com vergeben) und verbinden; QR-Codes zeigen darauf
- [ ] Markenrecherche „HEALTHKLICK“ und Prüfung des Kreuzes (§ 125 OWiG, DRK-Gesetz)
- [ ] Telefonnummer für Drucksachen und Signatur ergänzen (`CONTACT.phone` in `js/marketing-data.js`)
- [ ] Marketing-Bereich unter dem Footer entfernen
- [ ] Kontakt-, Bewerbungs- und Whitepaper-Formular an ein Backend/CRM anbinden (derzeit mailto und PDF im Browser); danach Datenschutz anpassen
- [ ] Beispielstellen durch echte Stellen ersetzen
- [ ] Englische Texte gegenlesen lassen (Muttersprachler, Fachbegriffe Pharma/Recht)
- [ ] Corporate S als Webfont lizenzieren (optional)
- [ ] Passwortschutz entfernen (`middleware.js` löschen), wenn die Seite öffentlich sein soll

Konzeption, Gestaltung und Betrieb: Grafitecture GmbH, Mannheim.
