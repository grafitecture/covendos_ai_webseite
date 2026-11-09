/* =========================================================
   HEALTHKLICK – Marketing-Material zur Freigabe: Kampagneninhalte
   Die Kampagne richtet sich an den deutschen Markt. Posts, Drucksachen,
   Rechnung und Präsentation sind deshalb auf Deutsch, auch auf der
   englischen Seite. Die Texte drumherum (Überschriften, Erklärungen)
   stehen je Sprache in js/de.js bzw. js/en.js unter SITE.mk.
   Stand: 9. November 2026. Zahlen mit Quelle, vor Veröffentlichung prüfen.
   ========================================================= */
window.MK_DATA = (function(){

  /* Ansprechpartner für alle Leads aus der Kampagne */
  const CONTACT = {
    name: 'Gunter Wendt',
    role: 'Ansprechpartner für Pharmaunternehmen',        // Funktion noch bestätigen
    mail: 'gunter.wendt@covendos.com',
    phone: '+49 621 000 00-00',                           // Platzhalter: Telefonnummer fehlt
    web: 'healthklick.de',                                // Domain ist frei (Stand 9.11.2026), noch registrieren
    street: 'Rebenstraße 9a', city: '68309 Mannheim'
  };

  /* Säulen der Kommunikation */
  const PILLARS = {
    wissen:      { de: 'Fachwissen',  en: 'Expertise' },
    lead:        { de: 'Leads',       en: 'Leads' },
    arbeitgeber: { de: 'Arbeitgeber', en: 'Employer' },
    team:        { de: 'Team',        en: 'Team' }
  };

  /* Bilder aus img/. pending:true = Musterbild wird noch mit Higgsfield erzeugt */
  const IMG = {
    ausflug:         { src: 'img/marketing/ausflug.webp',         pending: true, alt: 'Team beim Wandern im herbstlichen Pfälzerwald' },
    bowling:         { src: 'img/marketing/bowling.webp',         pending: true, alt: 'Team jubelt auf der Bowlingbahn' },
    weihnachtsmarkt: { src: 'img/marketing/weihnachtsmarkt.webp', pending: true, alt: 'Team mit Tassen auf dem Weihnachtsmarkt am Wasserturm' }
  };

  /* Redaktionsplan KW 47/2026 bis KW 2/2027
     ch: li = LinkedIn, ig = Instagram, fb = Facebook
     v:  Bild des Beitrags (Typen siehe visual() in js/marketing.js) */
  const POSTS = [
    { id: 'p01', date: '2026-11-16', ch: ['li'], pillar: 'wissen', format: 'Zahl-Post',
      title: 'Ab 2027: 15,5 % Herstellerabschlag',
      v: { t: 'stat', bg: 'ink', n: '15,5 %', l: 'Herstellerabschlag auf patentgeschützte Arzneimittel ab 1. Januar 2027', s: 'Quelle: GKV-Beitragssatzstabilisierungsgesetz, BMG 10.07.2026' },
      text: 'Ab 1. Januar 2027 steigt der Herstellerabschlag auf patentgeschützte Arzneimittel auf 15,5 Prozent. Das hat das GKV-Beitragssatzstabilisierungsgesetz im Juli festgelegt. Gleichzeitig fallen die AMNOG-Leitplanken weg.\n\nFür die Vermarktung heißt das: Jeder Kontakt muss mehr leisten. Drei Hebel sehen wir:\n→ Ärztinnen und Ärzte auf dem Weg erreichen, den sie wählen: vor Ort, per Video, per E-Mail\n→ KI-Agenten bereiten vor und fassen nach, Menschen führen das Gespräch\n→ Teams, die mit dem Bedarf wachsen, statt fester Kosten\n\nWie plant Ihr Team das Jahr 2027? Gunter Wendt freut sich auf Ihre Nachricht.',
      tags: '#Pharmavertrieb #AMNOG #MarketAccess #Healthklick', stats: [164, 21, 12] },

    { id: 'p02', date: '2026-11-18', ch: ['ig', 'fb'], pillar: 'arbeitgeber', format: 'Karussell',
      title: 'So funktioniert Healthklick Field Force',
      v: { t: 'slides', slides: [
        { bg: 'ink',   h: 'Healthklick Field Force', sub: 'So kommst du in den Pharma-Außendienst' },
        { bg: 'white', k: '1', h: 'Wir stellen Teams zusammen', sub: 'Für Außen- und Innendienst bei Pharmaunternehmen in ganz Deutschland.' },
        { bg: 'mist',  k: '2', h: 'Angestellt beim Personalpartner', sub: 'Mit Erlaubnis der Bundesagentur für Arbeit. Dein Vertrag ist klar geregelt.' },
        { bg: 'white', k: '3', h: 'Vorbereitet in jedes Gespräch', sub: 'KI-Agenten erstellen dein Briefing. Das Gespräch führst du.' }
      ] },
      text: 'Pharma-Außendienst mit Rückenwind: Healthklick stellt Teams für Pharmaunternehmen zusammen und begleitet jedes Projekt. Angestellt bist du bei unserem Personalpartner, mit Erlaubnis der Bundesagentur für Arbeit. Vor jedem Besuch bekommst du ein Briefing, das unsere KI-Agenten vorbereiten. Das Gespräch führst du.\n\nWisch dich durch und schau auf unsere Karriereseite: Link in der Bio.',
      tags: '#Pharmareferent #Pharmaaußendienst #Karriere #Mannheim #Healthklick', stats: [87, 6, 4] },

    { id: 'p03', date: '2026-11-19', ch: ['li'], pillar: 'wissen', format: 'Dokument-Karussell',
      title: 'Wer ist überhaupt noch erreichbar?',
      v: { t: 'slides', slides: [
        { bg: 'white', n: '53 %', h: 'der Ärztinnen und Ärzte in Europa sind für den Außendienst erreichbar', s: 'Veeva Pulse, 1. Quartal 2024' },
        { bg: 'mist',  n: '62 %', h: 'von ihnen treffen höchstens drei Pharmaunternehmen', s: 'Veeva Pulse, 1. Quartal 2024' },
        { bg: 'ink',   h: 'Wer dabei ist, muss jedes Gespräch nutzen.', sub: 'Agenten bereiten vor. Menschen führen.' }
      ] },
      text: 'Gut die Hälfte der Ärztinnen und Ärzte in Europa ist für den Außendienst überhaupt erreichbar. Und von ihnen treffen 62 Prozent höchstens drei Pharmaunternehmen (Veeva Pulse, 1. Quartal 2024).\n\nWer zu diesen dreien gehört, darf die Chance nicht verschenken. Deshalb geht bei uns niemand unvorbereitet in ein Gespräch: Der Briefing-Agent fasst Kontakthistorie, offene Fragen der Praxis und passende Inhalte zusammen. Das Gespräch führt ein Mensch.\n\nMehr dazu im Whitepaper „Der hybride Außendienst“, Link im ersten Kommentar.',
      tags: '#Außendienst #Omnichannel #HCPEngagement #Pharma', stats: [212, 18, 23] },

    { id: 'p04', date: '2026-11-20', ch: ['ig', 'fb'], pillar: 'team', format: 'Foto',
      title: 'Teamtag im Pfälzerwald',
      v: { t: 'photo', img: 'ausflug', label: 'Teamtag im Pfälzerwald' },
      text: 'Herbstlaub, klare Luft und kein Bildschirm: Unser Teamtag hat uns diese Woche auf die Kalmit geführt. Wer viel im Homeoffice arbeitet, freut sich doppelt, das Team einmal ganz in echt zu sehen. Danke an alle, die mitgewandert sind. Die Dampfnudeln am Ende hatten wir uns verdient!',
      tags: '#TeamHealthklick #Pfälzerwald #Teamtag #Mannheim', stats: [132, 11, 0] },

    { id: 'p05', date: '2026-11-23', ch: ['li'], pillar: 'lead', format: 'Whitepaper',
      title: 'Whitepaper: Die ersten zwölf Monate',
      v: { t: 'paper', no: 2, cls: 'v2', title: 'Die ersten zwölf Monate', sub: 'Launch-Kommunikation unter AMNOG-Bedingungen' },
      text: 'Ab dem siebten Monat gilt der Erstattungsbetrag. Was in den ersten sechs Monaten nicht gelingt, holt ein Launch kaum noch auf.\n\nUnser Whitepaper „Die ersten zwölf Monate“ zeigt:\n→ die drei Engpässe im Launch: Reichweite, Inhalte, Teams\n→ das hybride Launch-Modell aus Außendienst, eReps und Agenten\n→ eine Checkliste für die Wochen vor dem Markteintritt\n\nKostenlos lesen: healthklick.de/#wissen',
      tags: '#Launch #AMNOG #MarketAccess #Whitepaper', stats: [96, 7, 15] },

    { id: 'p06', date: '2026-11-25', ch: ['ig', 'fb'], pillar: 'arbeitgeber', format: 'Stellenanzeige',
      title: 'Pharmareferent:in Kardiologie, Rhein-Neckar',
      v: { t: 'job', img: 'field.webp', h: 'Pharmareferent:in (m/w/d) Kardiologie', place: 'Rhein-Neckar · Vollzeit', tag: 'Beispielstelle' },
      text: 'Wir suchen dich: Pharmareferent:in (m/w/d) für ein Projekt in der Kardiologie, Gebiet Rhein-Neckar.\n\nWas du mitbringst: Sachkenntnis nach § 75 AMG, zum Beispiel als geprüfte:r Pharmareferent:in oder mit einem Studium der Pharmazie, Chemie, Biologie oder Medizin. Erfahrung in der Kardiologie hilft, ist aber kein Muss.\n\nWas dich erwartet: ein festes Team, eine feste Ansprechperson bei Healthklick und ein Briefing vor jedem Besuch.\n\nBewerben dauert fünf Minuten: Link in der Bio.',
      tags: '#Pharmareferent #Jobs #RheinNeckar #Kardiologie', stats: [64, 9, 7] },

    { id: 'p07', date: '2026-11-26', ch: ['li'], pillar: 'wissen', format: 'Zahl-Post',
      title: '77 % der Inhalte bleiben ungenutzt',
      v: { t: 'stat', bg: 'mist', n: '77 %', l: 'der für den Außendienst produzierten Inhalte werden selten oder nie genutzt', s: 'Quelle: Veeva Pulse, Europa' },
      text: '77 Prozent der Inhalte, die für den Außendienst produziert werden, kommen selten oder nie zum Einsatz. Und nur in 30 Prozent der Arztgespräche in Europa wird überhaupt digitaler Content gezeigt (Veeva Pulse).\n\nDas Problem ist selten die Qualität. Es ist die Frage, welcher Inhalt in welches Gespräch passt. Bei Healthklick schlägt der Content-Agent vor jedem Kontakt die passenden, freigegebenen Module vor. Die Pharmaberaterin entscheidet, was sie zeigt.\n\nWie viel Ihres Contents kommt bei Ärztinnen und Ärzten an?',
      tags: '#ModularContent #Omnichannel #PharmaMarketing', stats: [141, 26, 11] },

    { id: 'p08', date: '2026-11-30', ch: ['li'], pillar: 'wissen', format: 'Text-Post von Gunter Wendt', by: 'gw',
      title: 'Drei Fragen, die Brand Manager gerade stellen',
      v: null,
      text: 'Drei Fragen, die mir Brand Manager in diesen Wochen am häufigsten stellen:\n\n1. Wie viel Außendienst brauchen wir 2027 noch?\nSo viel, wie Ihre Ärztinnen und Ärzte persönlich sehen wollen. Den Rest erreichen wir per Video, Telefon und E-Mail, mit denselben Inhalten und derselben Kontakthistorie.\n\n2. Sprechen bei Ihnen KI-Agenten mit Ärzten?\nNein. Agenten bereiten vor, dokumentieren und fassen nach. Das Gespräch führt bei uns immer ein Mensch.\n\n3. Wie schnell steht ein Team?\nDas hängt vom Profil ab. Im ersten Gespräch sage ich es Ihnen konkret, mit Zahlen.\n\nWelche Frage fehlt hier? Schreiben Sie mir.',
      tags: '#Pharmavertrieb #KI #Außendienst', stats: [248, 34, 19] },

    { id: 'p09', date: '2026-12-01', ch: ['ig', 'fb'], pillar: 'team', format: 'Foto',
      title: 'Strike! Bowlingabend',
      v: { t: 'photo', img: 'bowling', label: 'Bowlingabend' },
      text: 'Strike, Spare und ein paar Rinnen: Unser Dezember hat auf der Bowlingbahn begonnen. Das Siegerteam kam diesmal aus dem Innendienst. Die Revanche ist schon gebucht.',
      tags: '#TeamHealthklick #Bowling #Teamevent #Mannheim', stats: [154, 17, 0] },

    { id: 'p10', date: '2026-12-03', ch: ['li'], pillar: 'wissen', format: 'Zahl-Post',
      title: '16.488 Apotheken',
      v: { t: 'stat', bg: 'white', n: '16.488', l: 'Apotheken gab es Ende Juni 2026 in Deutschland, 113 weniger als zum Jahreswechsel', s: 'Quelle: ABDA' },
      text: 'Ende Juni 2026 gab es in Deutschland noch 16.488 Apotheken, 113 weniger als zum Jahreswechsel (ABDA).\n\nFür OTC-Marken heißt das: Jede Apotheke zählt mehr, und viele Teams kommen nicht mehr überall persönlich hin. Unsere Antwort für den Apothekenmarkt: telefonische Betreuung, Mailings und Besuche aus einem Guss, gesteuert über eine gemeinsame Kontakthistorie.\n\nWie erreicht Ihr OTC-Team die Apotheken auf dem Land?',
      tags: '#OTC #Apotheke #Pharmavertrieb', stats: [88, 9, 6] },

    { id: 'p11', date: '2026-12-07', ch: ['li'], pillar: 'wissen', format: 'Zahl-Post',
      title: 'EU-HTA: die erste gemeinsame Bewertung',
      v: { t: 'stat', bg: 'blue', n: 'Mai 2026', l: 'erste gemeinsame klinische Bewertung nach der EU-HTA-Verordnung abgeschlossen', s: 'Verordnung (EU) 2021/2282' },
      text: 'Im Mai 2026 wurde die erste gemeinsame klinische Bewertung nach der EU-HTA-Verordnung abgeschlossen. Seit Januar 2025 gilt das Verfahren für neue Krebsmedikamente und Arzneimittel für neuartige Therapien, ab 2028 kommen Orphan Drugs hinzu, ab 2030 alle neuen Wirkstoffe.\n\nDer G-BA entscheidet weiter über den Zusatznutzen, verhandelt wird weiter in Deutschland. Aber die Evidenz liegt früher und europaweit offen. Die Launch-Kommunikation muss diese Bewertung von Tag eins an kennen und erklären können.\n\nUnsere Medical Information beantwortet Fachfragen dazu mit freigegebenen Antworten, dokumentiert und nachvollziehbar.',
      tags: '#EUHTA #AMNOG #MarketAccess #MedicalAffairs', stats: [119, 12, 17] },

    { id: 'p12', date: '2026-12-09', ch: ['ig'], pillar: 'arbeitgeber', format: 'Reel',
      title: 'Ein Tag im Homeoffice als Pharmaberaterin',
      v: { t: 'reel', img: 'homeoffice.webp', dur: '0:42', label: 'Ein Tag im Homeoffice' },
      text: '8:30 Briefing lesen, 9:00 erstes Video-Gespräch mit einer Hausarztpraxis, 11:30 Rückruf zu einer Fachfrage, 14:00 Team-Call. Dazwischen: Kaffee. So sieht ein Tag im Innendienst bei Healthklick aus. Mit Ton anschauen!',
      tags: '#Homeoffice #Pharmaberater #Innendienst #Karriere', stats: [201, 14, 0] },

    { id: 'p13', date: '2026-12-11', ch: ['ig', 'fb', 'li'], pillar: 'team', format: 'Foto',
      title: 'Weihnachtsmarkt am Wasserturm',
      v: { t: 'photo', img: 'weihnachtsmarkt', label: 'Weihnachtsmarkt am Wasserturm' },
      text: 'Glühwein, Kinderpunsch und Lichterglanz: Das Team hat den Freitagabend auf dem Mannheimer Weihnachtsmarkt am Wasserturm verbracht. Schön, dass auch die Kolleginnen und Kollegen aus dem Homeoffice in ganz Deutschland angereist sind!',
      tags: '#TeamHealthklick #Weihnachtsmarkt #Mannheim #Wasserturm', stats: [189, 22, 3] },

    { id: 'p14', date: '2026-12-15', ch: ['li'], pillar: 'lead', format: 'Newsletter',
      title: 'Healthklick Briefing Nr. 1: Was sich 2027 ändert',
      v: { t: 'news', h: 'Healthklick Briefing', n: 'Ausgabe 1 · Dezember 2026', title: 'Was sich 2027 für die Pharmavermarktung ändert' },
      text: 'Die erste Ausgabe unseres Newsletters „Healthklick Briefing“ ist da. Einmal im Monat, fünf Minuten Lesezeit. Diesmal:\n\n→ 15,5 % Herstellerabschlag ab Januar und was die Standortklausel ändern könnte\n→ Ein Jahr ePA-Pflicht in den Praxen: was der Außendienst davon merkt\n→ KI im Recruiting: warum der AI Act erst ab Dezember 2027 greift\n→ E-Rechnung: Pflicht ab 2027 für Unternehmen über 800.000 Euro Umsatz\n\nJetzt abonnieren und keine Ausgabe verpassen.',
      tags: '#Newsletter #Pharma2027 #AMNOG', stats: [133, 8, 21] },

    { id: 'p15', date: '2026-12-18', ch: ['ig', 'fb', 'li'], pillar: 'team', format: 'Grußkarte',
      title: 'Frohe Weihnachten',
      v: { t: 'card', bg: 'ink', h: 'Mehr Zeit für die Menschen, die zählen.', sub: 'Frohe Weihnachten und ein gesundes 2027.' },
      text: 'Mehr Zeit für Medizin: Das ist unser Versprechen an Ärztinnen, Ärzte und Patienten. Über die Feiertage wünschen wir allen vor allem eines: Zeit für die Menschen, die zählen.\n\nDanke an unsere Kunden, Partner und an ein Team, das in wenigen Wochen viel aufgebaut hat. Frohe Weihnachten und ein gesundes 2027!',
      tags: '#FroheWeihnachten #Healthklick', stats: [176, 19, 5] },

    { id: 'p16', date: '2027-01-05', ch: ['li'], pillar: 'wissen', format: 'Dokument-Karussell',
      title: 'Was seit 1. Januar 2027 gilt',
      v: { t: 'slides', slides: [
        { bg: 'ink',   h: 'Was seit 1. Januar 2027 gilt', sub: 'Vier Änderungen für Pharma und Dienstleister' },
        { bg: 'white', n: '15,5 %', h: 'Herstellerabschlag auf patentgeschützte Arzneimittel', s: 'GKV-Beitragssatzstabilisierungsgesetz' },
        { bg: 'mist',  n: '2027–2030', h: 'Preismoratorium für patentgeschützte Impfstoffe', s: 'BMG, 10.07.2026' },
        { bg: 'white', n: '800.000 €', h: 'Vorjahresumsatz: ab hier sind E-Rechnungen Pflicht', s: 'Umsatzsteuergesetz, Übergangsregel endet' },
        { bg: 'mist',  n: '14,60 €', h: 'gesetzlicher Mindestlohn je Stunde', s: 'Mindestlohnanpassung 2027' }
      ] },
      text: 'Neues Jahr, neue Regeln: vier Änderungen, die seit dem 1. Januar 2027 für Pharmaunternehmen und ihre Dienstleister gelten. Zum Durchklicken im Dokument.\n\nWelche Änderung beschäftigt Ihr Team am meisten?',
      tags: '#Pharma2027 #AMNOG #ERechnung #Mindestlohn', stats: [187, 15, 31] },

    { id: 'p17', date: '2027-01-07', ch: ['ig', 'fb'], pillar: 'arbeitgeber', format: 'Stellenaufruf',
      title: 'Neues Jahr, neues Gebiet?',
      v: { t: 'job', img: 'onboarding.webp', h: 'Pharmareferent:innen gesucht', place: 'Deutschlandweit · Außen- und Innendienst', tag: 'Beispielstellen' },
      text: 'Neues Jahr, neues Gebiet? Für 2027 suchen wir Pharmareferent:innen und Pharmaberater:innen im Außen- und Innendienst, in ganz Deutschland. Ob Kardiologie, Diabetologie oder Apotheke: Schick uns deine Region, wir melden uns zeitnah.\n\nAlle Stellen: Link in der Bio.',
      tags: '#Jobs2027 #Pharmareferent #Pharmaberater #Karriere', stats: [96, 12, 9] },

    { id: 'p18', date: '2027-01-11', ch: ['li'], pillar: 'lead', format: 'Einladung',
      title: '30 Minuten für Ihren Launch 2027',
      v: { t: 'deck' },
      text: 'Sie planen einen Launch in diesem Jahr? In 30 Minuten zeigen wir Ihnen an Ihrem Profil, wie Menschen und KI-Agenten Ihre ersten zwölf Monate tragen: Zielgruppen, Kanäle, Team und Kosten pro Kontakt.\n\nTermin direkt bei Gunter Wendt: gunter.wendt@covendos.com',
      tags: '#Launch2027 #Pharmavertrieb #MarketAccess', stats: [74, 5, 9] }
  ];

  /* Ältere Instagram-Kacheln, damit das Raster vollständig ist (vor dem Redaktionsplan) */
  const IG_EXTRA = [
    { id: 'e04', date: '2026-11-13', title: 'Wie wir arbeiten', v: { t: 'photo', src: 'wall.webp', label: 'Wie wir arbeiten' }, text: 'Bevor ein Team startet, steht der Plan an der Wand: Zielgruppen, Kanäle, Inhalte, Verantwortliche. Jeder Agent hat eine Person, die für ihn geradesteht.', tags: '#Healthklick #Teamwork', stats: [58, 3, 0] },
    { id: 'e03', date: '2026-11-12', title: 'Kreis und Kreuz', v: { t: 'sign' }, text: 'Kreis = Mensch. Kreuz = Agent. Bei Healthklick sieht man auf einen Blick, wer was tut. Agenten bereiten vor, dokumentieren und fassen nach. Menschen führen jedes Gespräch, das zählt.', tags: '#HumanLedAI #Healthklick', stats: [71, 4, 0] },
    { id: 'e02', date: '2026-11-11', title: 'Mehr Zeit für Medizin', v: { t: 'claim' }, text: 'Mehr Zeit für Medizin. Dafür arbeiten wir: damit Ärztinnen, Ärzte und Apotheken die Informationen bekommen, die sie brauchen, und mehr Zeit für ihre Patienten bleibt.', tags: '#MehrZeitFürMedizin #Healthklick', stats: [93, 5, 0] },
    { id: 'e01', date: '2026-11-10', title: 'Hallo Instagram', v: { t: 'card', bg: 'white', h: 'Hallo, wir sind Healthklick.', sub: 'Human-led AI für Pharma und Healthcare. Aus Mannheim, für ganz Deutschland.' }, text: 'Hallo Instagram! Wir sind Healthklick aus Mannheim. Wir übernehmen Vertrieb, Patient Services und Medical Information für Pharmaunternehmen, mit Menschen und KI-Agenten. Hier zeigen wir, wie das aussieht, und wer dahintersteht.', tags: '#Healthklick #Mannheim #Pharma', stats: [112, 9, 0] }
  ];

  /* Profile (Beispielwerte) */
  const PROFILES = {
    li: { followers: '1.240', staff: '11–50 Beschäftigte', industry: 'Dienstleistungen für Pharma und Healthcare' },
    ig: { handle: 'healthklick', posts: 26, followers: '486', following: '118' },
    fb: { followers: '312', likes: '287', category: 'Dienstleistungen für Pharma und Healthcare' }
  };

  return { CONTACT, PILLARS, IMG, POSTS, IG_EXTRA, PROFILES };
})();
