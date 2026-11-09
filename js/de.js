/* =========================================================
   HEALTHKLICK – deutsche Inhalte und Texte
   Gegenstück: js/en.js. Gemeinsame Logik: js/site.js
   ========================================================= */
const SITE = (() => {
  const CHANNELS = {
    rx: ['Persönliches Gespräch in Praxis und Klinik','Remote-Detailing per Video und Telefon','Fachportale und CME-Fortbildung','Webinare und Kongresse','E-Mail auf Anforderung','Medical Information'],
    otc: ['Beratung im Handverkauf','Apotheken-Telesales und Schulungen','Fachportale für PTA und Apotheker','Social Media und Suche','Verbraucher-Hotline','Point of Sale']
  };


  const JOBS = [
    {id:'innendienst-kardio', t:'Pharmaberater:in im Innendienst, Kardiologie', k:'own', where:'Homeoffice, bundesweit', time:'Voll- oder Teilzeit'},
    {id:'callagent-otc', t:'Callagent Kundenberatung und Telesales, OTC', k:'own', where:'Homeoffice oder Mannheim', time:'Teilzeit möglich'},
    {id:'patientenbegleitung', t:'Pflegefachkraft als Patientenbegleiter:in', k:'own', where:'Homeoffice, bundesweit', time:'Vollzeit'},
    {id:'aussendienst-onko', t:'Pharmareferent:in im Außendienst, Onkologie', k:'client', where:'Gebiet Rhein-Neckar und Rhein-Main', time:'Vollzeit'},
    {id:'kam-rare', t:'Key Account Manager:in Klinik, seltene Erkrankungen', k:'client', where:'Gebiet Nord, Hamburg und Bremen', time:'Vollzeit'},
    {id:'customer-service', t:'Kundenberater:in Medical Customer Service', k:'client', where:'Mannheim, hybrid', time:'Vollzeit'}
  ];

  const AGENTS = [
    {name:'Briefing-Agent', text:'Fasst vor jedem Termin Historie, offene Fragen und freigegebene Materialien auf einer Seite zusammen.', owner:'Head of Hybrid Field Force'},
    {name:'Compliance-Agent', text:'Prüft Gesprächsnotizen, E-Mails und Materialien gegen HWG und Ihre SOPs, bevor etwas hinausgeht. Überwacht außerdem die Fristen der Arbeitnehmerüberlassung.', owner:'AI Governance und Compliance'},
    {name:'Content-Agent', text:'Baut aus freigegebenen Modulen Varianten für jeden Kanal. Neue Werbeaussagen formuliert er nie.', owner:'Modular Content Architect'},
    {name:'Vigilanz-Agent', text:'Erkennt mögliche Nebenwirkungen in Gesprächen und Nachrichten und startet den Meldeprozess.', owner:'Medical Director'},
    {name:'Begleit-Agent', text:'Erinnert Patienten, beantwortet Alltagsfragen aus geprüften Inhalten und holt Pflegefachkräfte dazu, wenn es nötig ist.', owner:'Lead Patient Journeys'},
    {name:'Insight-Agent', text:'Findet Muster in Verordnungen und Kontakten und schlägt die nächste beste Aktion vor.', owner:'Data Scientist, Next Best Action'}
  ];

  const TOPICS = [
    {group:'Vertrieb', items:['Hybrider Außendienst','eReps und Remote-Detailing','Vakanzmanagement','KI-Briefings für den Außendienst']},
    {group:'Patienten', items:['Patient Support Programm','Adhärenz und Erinnerungen']},
    {group:'Medical', items:['Medical Information','Pharmakovigilanz-Prozesse']},
    {group:'Content', items:['Omnichannel-Content und Freigabe','Webinare und Fachkreis-Events']},
    {group:'Lebenszyklus', items:['Launch-Vorbereitung','Erstes Marktjahr und AMNOG','Etablierte Marken nach Patentablauf']},
    {group:'OTC und Apotheke', items:['Apotheken-Telesales','Schulungen für Apothekenteams']},
    {group:'Grundlagen', items:['KI-Governance und Compliance','Workshop Human-led AI']}
  ];

  const PAPERS = [
    {id:'hybrid', v:'v1', title:'Der hybride Außendienst', sub:'Wie KI-Agenten Arztbesuche vorbereiten, ohne sie zu ersetzen', for:'Vertrieb und Sales Excellence', min:7,
     ring:{s:'120%',x:'-35%',y:'-18%'}, dot:{s:'22%',x:'62%',y:'40%'},
     blocks:[
      {h:'Ausgangslage'},
      {p:'Der persönliche Außendienst bindet in Deutschland weiterhin den größten Teil der Budgets für Arztkommunikation. 2023 flossen rund 70 Prozent der Ausgaben in persönliche Besuche. Remote-Kanäle lagen nach ihrem Hoch in der Pandemie wieder bei vier bis fünf Prozent (IQVIA). Gleichzeitig wird der Zugang zu Praxen enger: Viele Ärztinnen und Ärzte empfangen nur noch nach Termin, die Gespräche werden kürzer.'},
      {p:'Die Frage ist deshalb nicht, ob der Außendienst bleibt, sondern wie jede Minute mit einer Ärztin oder einem Arzt mehr Wert bekommt.'},
      {h:'Was Agenten heute leisten'},
      {li:['Briefing vor dem Termin: Historie, offene Fragen, freigegebene Materialien und Hinweise aus Medical Information auf einer Seite.','Gesprächsnotiz per Sprache, strukturiert ins CRM übertragen.','Compliance-Prüfung von Notizen, E-Mails und Materialien vor dem Versand.','Vorschläge für das Follow-up mit Termin, Kanal und passendem Inhalt.']},
      {p:'Große CRM-Anbieter liefern solche Agenten inzwischen selbst aus. Der Unterschied entsteht deshalb nicht durch das Werkzeug, sondern durch das Betriebsmodell dahinter.'},
      {h:'Was Menschen bleiben'},
      {p:'Beziehung, Urteilsvermögen und medizinische Tiefe lassen sich nicht automatisieren. Ein Agent kann vorbereiten, welche Studie eine Ärztin interessieren könnte. Ob sie heute dafür offen ist, merkt nur ein Mensch.'},
      {h:'Das Tandem-Modell'},
      {p:'Wir kombinieren drei Ebenen: den Außendienst für Top-Verordner und Kliniken, eReps für die Breite und für unbesetzte Gebiete, und eine Agenten-Ebene, die beide Teams vorbereitet, dokumentiert und nachfasst. Alle drei arbeiten mit derselben Kontakthistorie.'},
      {li:['Kontaktqualität statt Kontaktzahl als Leitkennzahl.','Follow-up innerhalb von 48 Stunden als Standard.','Abdeckung auch in Vakanzgebieten.']},
      {h:'Die ersten 90 Tage'},
      {li:['Woche 1 bis 3: Pilotgebiet wählen, Ausgangswerte messen, Inhalte für Agenten freigeben.','Woche 4 bis 8: Briefing- und Dokumentations-Agent im Tandem mit zwei bis drei Mitarbeitenden im Außendienst.','Woche 9 bis 12: Auswertung, Ausbau auf eReps, Entscheidung über den Rollout.']}
     ]},
    {id:'launch', v:'v2', title:'Die ersten zwölf Monate', sub:'Launch-Kommunikation unter AMNOG-Bedingungen', for:'Brand Teams und Launch Excellence', min:6,
     ring:{s:'70%',x:'48%',y:'14%'}, dot:{s:'14%',x:'18%',y:'30%'},
     blocks:[
      {h:'Ausgangslage'},
      {p:'Mit dem Markteintritt beginnt in Deutschland die frühe Nutzenbewertung. Seit dem GKV-Finanzstabilisierungsgesetz gilt der verhandelte Erstattungsbetrag bereits ab dem siebten Monat. Das Zeitfenster, in dem ein neues Arzneimittel Bekanntheit, Erstverordnungen und Erfahrung in der Versorgung aufbauen muss, ist damit kürzer geworden.'},
      {h:'Drei Engpässe im Launch'},
      {li:['Reichweite: Die Zielgruppe ist breiter, als der Außendienst in den ersten Monaten erreichen kann.','Inhalte: Materialien hängen in der medizinisch-rechtlichen Freigabe, während der Markt wartet.','Teams: Rekrutierung und Einarbeitung dauern länger, als die Launch-Planung erlaubt.']},
      {h:'Das hybride Launch-Modell'},
      {p:'Der Außendienst konzentriert sich auf Zentren und Top-Verordner. eReps erreichen die Breite per Video und Telefon, vom ersten Tag an mit denselben freigegebenen Inhalten. Agenten bereiten jeden Kontakt vor, erkennen Informationsbedarf und lösen Anfragen an Medical Information aus. Ein Patientenbegleitprogramm steht bereit, bevor die ersten Patienten eingestellt werden.'},
      {h:'Modulare Inhalte für die Freigabe'},
      {p:'Statt kompletter Materialien geben Medical, Regulatory und Legal einmal geprüfte Module frei: Kernaussagen, Studiendaten mit Referenz, Indikationstext. Daraus entstehen Varianten für E-Mail, Webinar, Detailing und Print, ohne dass jede Variante neu geprüft werden muss.'},
      {h:'Messen, was zählt'},
      {li:['Zeit bis zur ersten Verordnung je Zielpraxis.','Anteil der Zielgruppe mit mindestens einem qualifizierten Kontakt.','Patientenstarts im Begleitprogramm.','Offene Anfragen an Medical Information und deren Bearbeitungszeit.']},
      {h:'Checkliste vor dem Launch'},
      {li:['Segmentierung und Kanalpräferenzen der Zielgruppe sind bekannt.','Mindestens zehn freigegebene Content-Module liegen vor.','Das Remote-Team ist eingearbeitet und im CRM angebunden.','Der Pharmakovigilanz-Prozess ist für alle Kanäle getestet.']}
     ]},
    {id:'psp', v:'v3', title:'Patient Support, den Praxen empfehlen', sub:'Warum Begleitprogramme scheitern und wie sie wirken', for:'Brand Teams und Patient Services', min:6,
     ring:{s:'86%',x:'34%',y:'22%'}, dot:{s:'32%',x:'6%',y:'40%'},
     blocks:[
      {h:'Ausgangslage'},
      {p:'Patientenbegleitprogramme genießen bei Ärztinnen und Ärzten einen guten Ruf, werden aber erstaunlich selten aktiv empfohlen. In Gesprächen mit Praxen hören wir immer wieder dieselben Gründe: Was das Programm leistet, ist unklar. Der Nutzen für die Praxis bleibt unsichtbar. Und wenn eine neue Patientin eingestellt wird, denkt niemand mehr an das Programm.'},
      {h:'Ein klares Profil'},
      {p:'Ein gutes Programm sagt in einem Satz, was es tut und was nicht. Es nimmt der Ärztin keine Entscheidung ab, sondern ergänzt ihre Arbeit dort, wo in der Sprechstunde keine Zeit bleibt.'},
      {h:'Zeit schenken'},
      {li:['Soziale Unterstützung: Arbeit, Familie, Behörden, Pflege, Schwerbehinderung.','Begleitung zur Therapietreue: Einnahme, Termine, Rezepte, Ernährung.','Psychosoziale Stabilisierung und Vermittlung an Fachstellen.','Vorbereitung auf das nächste Arztgespräch mit gezielten Fragen.']},
      {h:'Einstieg in zwei Minuten'},
      {p:'Ein Aufsteller in der Praxis, ein QR-Code auf dem Flyer, ein kurzes Online-Formular. Die Patientin meldet sich selbst an und nennt ihre behandelnde Praxis. Mit ihrer Einwilligung informieren wir die Praxis über die Aufnahme. So wird das Programm sichtbar, ohne die Praxis zu belasten.'},
      {h:'Die Rolle der Agenten'},
      {p:'Agenten übernehmen Erinnerungen, beantworten Alltagsfragen aus geprüften Inhalten und erkennen Signale für einen drohenden Therapieabbruch. Mögliche Nebenwirkungen leiten sie sofort an die Pharmakovigilanz weiter. Für jedes Gespräch, das Empathie verlangt, holen sie eine Pflegefachkraft dazu.'},
      {h:'Was Sie messen sollten'},
      {li:['Anteil der Praxen, die das Programm empfehlen.','Zeit von der Verordnung bis zur Anmeldung.','Therapietreue nach drei und nach sechs Monaten.','Zufriedenheit von Patienten und Praxen.']}
     ]},
    {id:'governance', v:'v4', title:'KI im Pharmavertrieb, aber sicher', sub:'HWG, EU AI Act, DSGVO und Pharmakovigilanz in der Praxis', for:'Compliance, Medical und Geschäftsführung', min:7,
     ring:{s:'62%',x:'44%',y:'34%'}, dot:{s:'10%',x:'70%',y:'12%'},
     blocks:[
      {h:'Ausgangslage'},
      {p:'Kaum eine Branche ist so streng reguliert wie die Kommunikation über Arzneimittel. Wer KI-Agenten in Vertrieb, Medical Information oder Patient Services einsetzt, muss die bestehenden Regeln einhalten und neue dazunehmen. Das ist machbar, wenn Governance von Anfang an Teil des Designs ist.'},
      {h:'Der Rahmen'},
      {li:['Heilmittelwerbegesetz und FSA-Kodex: Was ein Agent gegenüber Fachkreisen oder Laien sagen darf, bestimmt weiterhin das Werberecht.','DSGVO: Gesundheitsdaten sind besonders geschützt und brauchen eine klare Rechtsgrundlage, meist die ausdrückliche Einwilligung.','EU AI Act: Menschen müssen erkennen können, wenn sie mit einem KI-System interagieren.','Pharmakovigilanz: Jede Information über eine mögliche Nebenwirkung muss erkannt und fristgerecht weitergeleitet werden, auch im Chat und am Telefon.']},
      {h:'Fünf Prinzipien für den Betrieb'},
      {li:['Jeder Agent hat eine verantwortliche Person mit Namen.','Agenten formulieren keine neuen Werbeaussagen. Sie kombinieren freigegebene Module.','Medizinische Fragen über die Erstauskunft hinaus beantworten Menschen.','Jede Interaktion wird vollständig und nachvollziehbar protokolliert.','Daten werden in der EU verarbeitet und nur so lange gespeichert wie nötig.']},
      {h:'Pharmakovigilanz im Agentenbetrieb'},
      {p:'Ein Vigilanz-Agent prüft jede Interaktion auf Hinweise zu Nebenwirkungen, Anwendungsfehlern oder einer Anwendung in der Schwangerschaft. Bei einem Treffer erstellt er eine Erstmeldung, die eine Fachkraft innerhalb eines Werktags prüft und an den Zulassungsinhaber weitergibt. Regelmäßige Abgleiche stellen sicher, dass kein Fall verloren geht.'},
      {h:'Audit und Review'},
      {p:'Einmal im Quartal prüfen Compliance, Medical und das Projektteam gemeinsam Stichproben, Eskalationen und Fehlerquoten. Was dabei auffällt, fließt in Freigaben, Trainingsdaten und Prozesse zurück.'},
      {p:'Hinweis: Dieses Whitepaper gibt einen Überblick und ersetzt keine Rechtsberatung.'}
     ]}
  ];

  const SCALE = [
    ['h1','17.942rem','clamp(3.236rem, 0.4rem + 13.5vw, 17.942rem)','var(--fs-h1)','Zeit'],
    ['h2','11.089rem','clamp(2.618rem, 0.4rem + 6.8vw, 11.089rem)','var(--fs-h2)','Zeit für'],
    ['h3','6.854rem','clamp(1.618rem, 0.6rem + 3.3vw, 6.854rem)','var(--fs-h3)','Mehr Zeit für'],
    ['h4','4.236rem','clamp(1.382rem, 0.9rem + 1.55vw, 4.236rem)','var(--fs-h4)','Mehr Zeit für Medizin'],
    ['h5','2.618rem','clamp(1.236rem, 1rem + 0.75vw, 2.618rem)','var(--fs-h5)','Mehr Zeit für Medizin'],
    ['h6','1.618rem','clamp(1.118rem, 1rem + 0.4vw, 1.618rem)','var(--fs-h6)','Mehr Zeit für Medizin'],
    ['p','1rem','1rem','1rem','Mehr Zeit für Medizin'],
    ['small','0.618rem','clamp(0.618rem, 0.55rem + 0.22vw, 0.75rem)','var(--fs-small)','Mehr Zeit für Medizin'],
    ['Abstand','0.382rem','nur Abstand','','']
  ];
  const COLORS = [
    ['Strawberry Red','#FB3640','Logo, Kreuz, Signal'],['Imperial Blue','#0A2463','Schrift, Buttons, Fußzeile'],['Cerulean','#247BA0','Textlinks, Hover, Akzent'],
    ['Charcoal','#605F5E','Sekundärtext, Kreise'],['Alabaster Grey','#E2E2E2','Flächen, Linien'],['Weiß (Papier)','#FFFFFF','Grundfläche, keine Markenfarbe']
  ];

  const t = {
    owner:'Verantwortlich:',
    own:'Bei Healthklick', client:'Über Healthklick beim Kunden',
    applyBtn:'Bewerben', initiative:'Initiativbewerbung',
    paperNo:'Nr. ', paperFacts:(f,m) => `Für ${f}. Lesezeit ${m} Minuten.`, paperBtn:'Whitepaper anfordern',
    to:'An', subj:'Betreff',
    save:{
      saved:w => `${w} ist gespeichert.`,
      browser:(w,a) => `${w} wird heruntergeladen. Falls nichts passiert, nutzen Sie ${a}.`,
      declined:'Speichern abgebrochen.',
      busy:'Es ist schon ein Speichern-Dialog offen. Bitte kurz warten.',
      failed:(w,a) => `Speichern ist in dieser Ansicht nicht möglich. Nutzen Sie ${a}.`
    },
    pdfFooter:'HEALTHKLICK  |  Ein Angebot der Grafitecture GmbH  |  Mehr Zeit für Medizin',
    brief:{
      greet:'Guten Tag,', intro:'ich interessiere mich für ein Gespräch mit Healthklick.', source:'Gefunden über: ',
      topicsH:'Themen:', noTopics:'noch keine ausgewählt', contextH:'Kontext:',
      market:'Markt', area:'Indikationsgebiet', phase:'Phase im Lebenszyklus', time:'Zeitrahmen', open:'offen',
      msgH:'Nachricht:', bye:'Viele Grüße', namePh:'[Name]',
      subject:(c,n) => `Gesprächsanfrage${c ? ': ' + c : ''} (${n} ${n===1 ? 'Thema' : 'Themen'})`,
      count:n => n ? `${n} ${n===1 ? 'Thema' : 'Themen'} gewählt` : 'Noch kein Thema gewählt'
    },
    err:{
      topics:'Bitte wählen Sie mindestens ein Thema.', chooseFirst:'Wählen Sie zuerst Ihre Themen.',
      name:'Bitte geben Sie Ihren Namen an.', company:'Bitte geben Sie Ihr Unternehmen an.',
      mail:'Bitte geben Sie eine gültige E-Mail-Adresse an.', missing:'Bitte ergänzen Sie die markierten Angaben.'
    },
    msg:{
      mailOpen:m => `Ihr E-Mail-Programm öffnet sich mit der vorbereiteten Anfrage. Falls nicht, kopieren Sie den Text und senden ihn an ${m}.`,
      copied:m => `Text kopiert. Fügen Sie ihn in eine E-Mail an ${m} ein.`,
      selected:'Text markiert. Mit Strg+C oder Cmd+C kopieren.'
    },
    pdf:{
      brTitle:'Gesprächs-Briefing', contactH:'Kontakt', noData:'Noch keine Angaben', topicsH:'Gewählte Themen',
      noTopics:'Noch keine Themen gewählt.', contextH:'Kontext', msgH:'Nachricht',
      brNote:m => `Bitte senden an ${m}. Wir melden uns innerhalb eines Werktags.`,
      brFile:'healthklick-briefing', brWhat:'Ihr Briefing', brAlt:'„Text kopieren“',
      clTitle:'Themen-Checkliste', clSub:'Kreuzen Sie an, worüber Sie mit uns sprechen möchten.', clContextH:'Ihr Kontext',
      clContext:['Markt:  Rx  /  OTC  /  beides','Indikationsgebiet:','Phase im Lebenszyklus:','Zeitrahmen:'],
      clContact:['Name:','Unternehmen und Funktion:','E-Mail und Telefon:'],
      clNote:m => `Ausgefüllt an ${m} senden oder im Gespräch mitbringen.`,
      clFile:'healthklick-themen-checkliste.pdf', clWhat:'Die Checkliste', clAlt:'die Themenauswahl im Formular'
    },
    apply:{
      greet:'Guten Tag,', line:j => `hiermit bewerbe ich mich: ${j}.`, open:'offen',
      way:'Wunschweg', place:'Arbeitsort', qual:'Qualifikation', region:'Wohnort oder PLZ', start:'Frühester Start',
      cv:'Meinen Lebenslauf habe ich angehängt.', bye:'Viele Grüße', subject:'Bewerbung: ',
      mailOpen:m => `Ihr E-Mail-Programm öffnet sich mit der vorbereiteten Bewerbung. Hängen Sie dort Ihren Lebenslauf an. Falls sich nichts öffnet, kopieren Sie den Text und senden ihn an ${m}.`,
      copied:m => `Text kopiert. Fügen Sie ihn in eine E-Mail an ${m} ein und hängen Sie Ihren Lebenslauf an.`
    },
    wp:{
      label:'WHITEPAPER', forLine:f => `Für ${f}  |  Oktober 2026`, readerLine:r => `Bereitgestellt für ${r}`,
      aboutH:'Über Healthklick',
      about:'Healthklick übernimmt Vertrieb, Patient Services, Medical Information und Personal für Pharmaunternehmen. KI-Agenten bereiten vor, dokumentieren und fassen nach. Erfahrene Menschen führen jedes Gespräch, das zählt. Zentrale in Mannheim, Teams in ganz Deutschland. Healthklick ist ein Angebot der Grafitecture GmbH, Mannheim.',
      cta:'Gespräch vereinbaren: ',
      thanks:(n,t) => `Danke, ${n}. „${t}“ ist bereit.`, read:'Hier lesen', readClose:'Lesen schließen',
      errFirst:'Bitte Vornamen angeben.', errLast:'Bitte Nachnamen angeben.',
      errMail:'Bitte eine gültige E-Mail-Adresse angeben.', errCompany:'Bitte Unternehmen angeben.',
      talkSubj:t => `Gespräch zum Whitepaper „${t}“`,
      talkBody:(r,t) => `Guten Tag Herr Wendt,\n\nich habe das Healthklick-Whitepaper „${t}“ gelesen und möchte gern über das Thema sprechen.\n\nName: ${r.first} ${r.last}\nUnternehmen: ${r.company}\nFunktion: ${r.fn || '–'}\nE-Mail: ${r.mail}\nNeue Whitepaper per E-Mail: ${r.news ? 'ja' : 'nein'}\n\nMit freundlichen Grüßen\n${r.first} ${r.last}`,
      file:id => `healthklick-whitepaper-${id}.pdf`, what:'Das Whitepaper', alt:'„Hier lesen“'
    }
  };

  /* Marketing-Material zur Freigabe (Bereich unter dem Footer, js/marketing.js) */
  const mk = {
    kicker:'Marketing-Material zur Freigabe · Stand 9. November 2026',
    title:'Marketing',
    lead:'Eine Kampagne aus einem Guss: Social Media, Print, Rechnungswesen, Give-aways und Präsentation. Ziel ist jeder qualifizierte Kontakt, und alle Anfragen aus der Kampagne gehen direkt an Gunter Wendt.',
    langNote:'',
    facts:[['1','Ansprechpartner für alle Leads'],['18','Beiträge in acht Wochen auf drei Kanälen'],['10','Drucksachen und Vorlagen'],['3','Give-aways'],['1','interaktive Präsentation']],
    navLabel:'Marketing-Material',
    nav:{social:'Social Media', print:'Print', invoice:'Rechnungswesen', give:'Give-aways', deck:'Präsentation', ok:'Freigabe'},
    flowH:'So kommt jeder Lead bei Gunter Wendt an',
    flow:[['Kanal','LinkedIn, Instagram, Facebook, QR-Codes auf Drucksachen, Präsentation'],['Website','Kontaktformular oder Whitepaper. Jeder Kanal hat einen eigenen Link mit Quelle, zum Beispiel ?quelle=linkedin'],['E-Mail','Vorbereitete Anfrage mit Themen und Quelle an gunter.wendt@covendos.com'],['Gespräch','Antwort innerhalb eines Werktags, vorbereitet vom Briefing-Agenten']],
    flowNote:'Die Quelle steht in der Anfrage, ganz ohne Tracking-Cookies. Damit Anfragen ohne Umweg über das E-Mail-Programm ankommen, braucht es noch einen Mail-Dienst (siehe Freigabe).',
    ui:{prev:'Zurück', next:'Weiter', pending:'Musterbild folgt', aiTag:'KI-Musterbild', close:'Schließen', zoom:'Vergrößern'},
    social:{
      num:'01', h:'Social Media',
      lead:'LinkedIn bringt die Leads, Instagram und Facebook die Menschen. Die Kommunikation baut auf dem auf, was Healthklick ausmacht: Fachwissen zu Markt, Recht und Lebenszyklus, sichtbare Verantwortung und ein Team, das man kennenlernen möchte.',
      channelsH:'Welche Kanäle wir bespielen',
      labels:{role:'Rolle', who:'Zielgruppe', formats:'Formate', rhythm:'Rhythmus', goal:'Ziel'},
      channels:[
        {id:'li', short:'in', name:'LinkedIn', badge:'Hauptkanal', main:true, role:'Lead-Kanal und Fachstimme', who:'Brand Manager, Sales Excellence, Market Access, Medical Affairs und Geschäftsführung bei Pharma- und Biotechunternehmen', formats:'Zahlen-Posts, Dokument-Karussells, Whitepaper mit Lead-Formular, Newsletter „Healthklick Briefing“, Beiträge von Gunter Wendt als persönliche Stimme', rhythm:'3 Beiträge pro Woche auf der Unternehmensseite, 1 bis 2 von Gunter Wendt', goal:'Gesprächsanfragen und Whitepaper-Registrierungen', fact:'80 % der B2B-Leads aus sozialen Netzwerken kommen über LinkedIn.', src:7},
        {id:'ig', short:'◎', name:'Instagram', badge:'Arbeitgebermarke', role:'Gesicht des Teams', who:'Pharmareferent:innen, PTA, Naturwissenschaftler:innen, Innendienst und Call-Agents', formats:'Reels aus dem Alltag, Karussells zur Field Force, Team-Momente, Stories mit Fragen und Antworten', rhythm:'2 bis 3 Beiträge pro Woche, Stories nach Anlass', goal:'Bewerbungen und Bekanntheit', fact:'Meistgenutzte Plattform in Deutschland: 40 % Wochenreichweite ab 14 Jahren.', src:5},
        {id:'fb', short:'f', name:'Facebook', badge:'Recruiting in der Fläche', role:'Stellen und Team in den Regionen', who:'Erfahrene Außendienstler:innen und regionale Netzwerke', formats:'Stellen mit Region, Team-Momente, Veranstaltungen', rhythm:'2 Beiträge pro Woche, Stellenanzeigen gezielt nach Region', goal:'Bewerbungen für konkrete Gebiete', fact:'31 % Wochenreichweite in Deutschland.', src:5},
        {id:'yt', short:'▶', name:'YouTube', badge:'Empfehlung ab Q1 2027', role:'Erklären und gefunden werden', who:'Alle Zielgruppen, über die Suche', formats:'Erklärvideos von 2 bis 4 Minuten, Webinar-Aufzeichnungen', rhythm:'1 Video pro Monat', goal:'Auffindbarkeit und Material für den Vertrieb', fact:'Erreicht 72 % der Menschen ab 14 Jahren.', src:5},
        {id:'xi', short:'X', name:'Xing', badge:'Nur Stellenanzeigen', role:'Jobbörse, kein eigener Content', who:'Bewerberinnen und Bewerber im deutschsprachigen Raum', formats:'Stellenanzeigen', rhythm:'Bei Bedarf', goal:'Zusätzliche Bewerbungen', fact:'15 % der Menschen in Deutschland nutzen LinkedIn, 8 % Xing.', src:6}
      ],
      notH:'Bewusst nicht:', not:'TikTok und X. Die Zielgruppe ist dort kaum beruflich unterwegs, und Kommentare lassen sich schwer verantwortungsvoll begleiten.',
      rulesH:'Spielregeln',
      rules:[
        ['Keine Produktwerbung.','In öffentlichen Kanälen keine Werbung für verschreibungspflichtige Arzneimittel (§ 10 HWG) und keine Präparate von Kunden. Healthklick spricht über Leistungen, Markt und Recht.'],
        ['Nebenwirkungen ernst nehmen.','Erwähnt jemand in Kommentaren oder Nachrichten eine Nebenwirkung, markiert der Vigilanz-Agent den Beitrag. Eine Fachperson prüft ihn und leitet ihn an den jeweiligen Hersteller weiter.'],
        ['Echte Menschen, echte Fotos.','Die Team-Bilder hier sind KI-Musterbilder für die Freigabe. In den Kanälen erscheinen nur echte Fotos, mit Einwilligung der Abgebildeten. KI-erzeugte Bilder werden gekennzeichnet (Art. 50 KI-Verordnung).'],
        ['Datenschutz.','Die Datenschutzerklärung bekommt einen Abschnitt zu den Social-Media-Seiten: Für die Seitenstatistiken sind Healthklick und die Plattform gemeinsam verantwortlich (EuGH, C-210/16).'],
        ['Vier Augen.','Jeder Beitrag mit Rechts- oder Marktbezug geht vor der Veröffentlichung durch den Compliance-Agenten und eine verantwortliche Person.'],
        ['Jeder Link mit Quelle.','Links aus den Kanälen tragen ?quelle=linkedin, ?quelle=instagram oder ?quelle=facebook. Die Quelle steht dann in der Anfrage an Gunter Wendt.']
      ],
      tabletH:'So sehen die Kanäle aus',
      tabletNote:'Beispielansicht auf dem Tablet, Stand nach acht Wochen. Follower und Reaktionen sind Beispielwerte. Bei Instagram Beiträge antippen, Karussells mit den Pfeilen blättern.',
      planH:'Redaktionsplan', planLead:'18 Beiträge von KW 47/2026 bis KW 2/2027. Zeile aufklappen für Text und Bild.',
      mixH:'Mischung der Beiträge', kw:'KW', draftGW:'Entwurf für Gunter Wendt, zur Freigabe durch ihn', textOnly:'Textbeitrag ohne Bild', showInTablet:'Im Tablet zeigen'
    },
    print:{
      num:'02', h:'Print',
      lead:'Klassisch gedruckt, digital gedacht. Alles auf einem Raster, in den fünf Markenfarben, mit Gunter Wendt als Absender. Antippen zum Vergrößern.',
      items:{
        letter:['Briefbogen','DIN A4 nach DIN 5008, Form B · 100 g/m² Recyclingpapier, FSC · als Word-Vorlage und im Digitaldruck'],
        card:['Visitenkarte, Vorderseite','85 × 55 mm · 400 g/m² Naturkarton · Logo-Rot als Sonderfarbe'],
        cardBack:['Visitenkarte, Rückseite','Imperial Blue vollflächig · QR-Code mit Kontaktdaten (vCard)'],
        compl:['Komplimentkarte','DIN lang, 210 × 99 mm · 300 g/m² · für Unterlagen und Muster'],
        env:['Umschlag','DIN lang mit Fenster · passend zum Briefbogen'],
        broCover:['Imagebroschüre, Titel','DIN A4 hoch · 16 Seiten · Rückstichheftung'],
        broSpread:['Doppelseite „Was wir tun“','Leistungen, Bild und Kundenstimme'],
        broBack:['Rückseite','Kontakt und QR-Code zum Gesprächstermin'],
        wp:['Whitepaper','DIN A4 · digital als PDF, gedruckt in kleiner Auflage'],
        wpSpread:['Whitepaper, Innenseiten','Zweispaltiger Text, eine große Zahl, Tandem-Grafik'],
        folder:['Präsentationsmappe','DIN A4 · 350 g/m² · Tasche mit Visitenkartenschlitz'],
        rollup:['Roll-up','85 × 200 cm · für Kongresse und Veranstaltungen'],
        qrcard:['QR-Karte für Praxen','DIN A6 · Vorlage für Begleitprogramme von Kunden'],
        sig:['E-Mail-Signatur','Die meistgelesene Drucksache ist digital · mit den Pflichtangaben nach § 35a GmbHG']
      },
      broH:'Imagebroschüre', wpH:'Whitepaper', moreH:'Was heute noch dazugehört',
      needH:'Was man heute noch druckt',
      needLead:'Gedruckt wird, was man in die Hand gibt oder aufstellt. Alles andere ist digital und wird bei Bedarf gedruckt. Auflagen klein halten, nachdrucken ist günstig.',
      specHead:['Drucksache','Format','Material','Auflage zum Start'],
      specs:[
        ['Visitenkarte','85 × 55 mm','400 g/m² Naturkarton, Rückseite Imperial Blue','250 je Person'],
        ['Komplimentkarte','DIN lang','300 g/m²','250'],
        ['Briefbogen','DIN A4','100 g/m² Recyclingpapier, FSC','500, dazu Word-Vorlage'],
        ['Umschlag','DIN lang mit Fenster','100 g/m²','500'],
        ['Imagebroschüre','DIN A4, 16 Seiten','Umschlag 250 g/m², Inhalt 150 g/m²','300'],
        ['Whitepaper','DIN A4','Digitaldruck','je 50, sonst PDF'],
        ['Präsentationsmappe','DIN A4','350 g/m²','250'],
        ['Roll-up','85 × 200 cm','Bannerstoff mit Kassette','2'],
        ['QR-Karte für Praxen','DIN A6','300 g/m²','1.000 je Programm']
      ],
      dropH:'Was es nicht mehr braucht',
      drop:[
        ['Faxvorlage und Faxnummer.','Die Kommunikation läuft per E-Mail, Telefon und Video.'],
        ['Briefbogen in Großauflage.','Briefe entstehen am Rechner. Gedruckt wird nur für Originale und Verträge.'],
        ['Gedruckter Leistungskatalog.','Website und Imagebroschüre als PDF sind aktueller.'],
        ['Werbekugelschreiber für Arztpraxen.','Der FSA-Kodex verbietet Geschenke an Fachkreise seit 2014 grundsätzlich.']
      ],
      crossH:'Hinweis zum Kreuz',
      cross:'Das rote Kreuz auf weißem Grund und Zeichen, die ihm zum Verwechseln ähnlich sind, sind gesetzlich geschützt (§ 125 OWiG, DRK-Gesetz). In den Drucksachen steht das Kreuz deshalb als Teil der Wortmarke, im Claim oder auf Imperial Blue, nie allein und groß auf Weiß. Vor dem Druck sollte eine Markenanwältin oder ein Markenanwalt Logo und Zeichen prüfen.'
    },
    invoice:{
      num:'03', h:'Rechnungswesen',
      lead:'Die Rechnung gehört zur Marke: gleicher Briefbogen, klare Tabelle, alle Pflichtangaben. Ab 2027 kommt sie als E-Rechnung. Alle Daten auf diesem Muster sind fiktiv.',
      dutyH:'Pflichtangaben, im Muster markiert',
      duties:[
        'Name und Anschrift des leistenden Unternehmens',
        'Name und Anschrift des Leistungsempfängers',
        'Rechnungsnummer, Ausstellungsdatum und Umsatzsteuer-Identifikationsnummer',
        'Menge und Art der Leistung',
        'Zeitpunkt der Leistung, hier der Leistungszeitraum',
        'Entgelt, nach Steuersätzen aufgeschlüsselt',
        'Steuersatz und Steuerbetrag',
        'Angaben der GmbH im Geschäftsbrief: Sitz, Registergericht, Handelsregisternummer, Geschäftsführer (§ 35a GmbHG)'
      ],
      eH:'E-Rechnung ab 2027',
      e:'Seit 2025 müssen alle Unternehmen E-Rechnungen empfangen können. Ab 1. Januar 2027 müssen Unternehmen mit mehr als 800.000 Euro Vorjahresumsatz sie auch ausstellen, ab 2028 alle. Das Layout bleibt: Im ZUGFeRD-Format steckt die strukturierte Rechnung als XML im PDF.',
      xmlBtn:'Strukturierte Daten zeigen', xmlHide:'Strukturierte Daten ausblenden',
      note:'Pflichtangaben nach § 14 Abs. 4 UStG. Kunde, Auftrag, Beträge und Bankverbindung sind Muster; die Bankverbindung ist die übliche Beispiel-IBAN aus Dokumentationen.',
      figH:'Rechnung', figMeta:'DIN A4 · gleicher Briefbogen · Pflichtangaben markiert'
    },
    give:{
      num:'04', h:'Give-aways',
      lead:'Drei Dinge, die bleiben. Eines ist ein Klassiker mit eigenem Namen, zwei sind neu und übersetzen die Marke in etwas zum Anfassen: Zeit und Klick.',
      items:[
        {tag:'Give-away 1 · Klassiker', name:'Ideenbuch', idea:'Ein Notizbuch im A5-Format mit weißen, leeren Seiten. Für Workshops, Kundentermine und die eigenen Gedanken dazwischen. Leer, weil gute Ideen keine Linien brauchen.',
         specs:[['Format','A5, 148 × 210 mm, Hardcover mit runden Ecken'],['Inhalt','192 Seiten blanko, 100 g/m², Fadenheftung'],['Einband','Leinen in Imperial Blue, Prägung „Ideenbuch“ in Weiß, Wortmarke in Rot'],['Details','Gummiband und Lesebändchen in Logo-Rot, Innentasche, erste Seite „Dieses Ideenbuch gehört …“'],['Für','Kunden, Partner, Bewerber:innen, Team']],
         imgs:['ideenbuch.svg','ideenbuch-offen.svg'], alts:['Ideenbuch, geschlossen: Leineneinband in Imperial Blue mit Prägung und rotem Gummiband','Ideenbuch, aufgeschlagen: leere weiße Seiten und rotes Lesebändchen'], views:['Geschlossen','Aufgeschlagen']},
        {tag:'Give-away 2 · neu', name:'Drei Minuten', idea:'Eine Sanduhr für den Schreibtisch, die genau drei Minuten läuft: der Claim „Mehr Zeit für Medizin“ zum Anfassen. In Workshops bekommt jede Idee drei Minuten, im Alltag erinnert sie daran, wofür wir arbeiten.',
         specs:[['Maße','ca. 6 × 6 × 14 cm'],['Material','Glas, Sand in Logo-Rot, Gestell aus Aluminium in Imperial Blue'],['Veredelung','Gravur im Sockel: „Drei Minuten mehr.“ und Wortmarke'],['Laufzeit','3 Minuten'],['Für','Kunden-Workshops, Pitch-Termine, Team']],
         imgs:['sanduhr.svg'], alts:['Sanduhr mit rotem Sand und Gestell in Imperial Blue'], views:[]},
        {tag:'Give-away 3 · neu', name:'Der Klick', idea:'Ein Handzähler aus Metall mit roter Taste. Das Wortspiel steckt im Namen, die Botschaft auf der Rückseite: „Jeder Kontakt zählt.“ Für Kongress-Stände, Team-Rituale und alle, die Gespräche zählen statt Zahlen.',
         specs:[['Maße','ca. 5 × 3,5 cm, vierstelliges Zählwerk'],['Material','Metall, pulverbeschichtet in Imperial Blue, Taste in Logo-Rot'],['Veredelung','Lasergravur „Jeder Kontakt zählt.“, Wortmarke in Weiß'],['Details','Rückstellrad, Schlaufe für den Schlüsselbund'],['Für','Kongresse, Field-Force-Teams, Kunden']],
         imgs:['klicker.svg'], alts:['Handzähler in Imperial Blue mit roter Taste und Zählwerk'], views:[]}
      ],
      ruleH:'Für wen die Give-aways gedacht sind',
      rule:'Für Kunden, Partner, Bewerberinnen und Bewerber und das eigene Team. Nicht für Ärztinnen, Ärzte und Apotheken im Auftrag eines Pharmaunternehmens: Der FSA-Kodex Fachkreise verbietet Geschenke an Fachkreise seit Juli 2014 grundsätzlich, § 7 HWG setzt enge Grenzen. Das Kreuz erscheint auf den Give-aways nur als Teil der Wortmarke.'
    },
    deck:{
      num:'05', h:'Präsentation',
      lead:'Eine interaktive Präsentation im Corporate Design, gebaut für einen echten Termin: den Pitch bei einem Pharmaunternehmen. Läuft im Browser, auf dem Tablet und als PDF.',
      topicH:'Das Thema',
      topic:'Fiktiver Pitch bei der Auenwald Pharma GmbH am 24. November 2026. Ein mittelständischer Hersteller bringt 2027 ein neues Präparat in der Kardiologie auf den Markt, mit 15,5 % Herstellerabschlag und Erstattungsbetrag ab dem siebten Monat. Healthklick zeigt, wie Menschen und KI-Agenten die ersten zwölf Monate tragen. Unternehmen, Präparat und Modellrechnung sind fiktiv.',
      slides:['Titel: Die ersten zwölf Monate','Agenda','2027: neue Spielregeln, mit Rechner zum Herstellerabschlag','Wer überhaupt noch erreichbar ist','Das Zeitfenster bis Monat 7','Unser Modell: Menschen führen, Agenten arbeiten zu','Sechs Agenten, sechs Verantwortliche','Kanalmix mit Reichweitenrechner','Fahrplan über zwölf Monate','Compliance von Anfang an','Steuerung: das Launch-Cockpit','So arbeiten wir zusammen','Nächste Schritte','Kontakt'],
      open:'Präsentation öffnen', pdf:'Als PDF drucken',
      keys:'Steuerung: Pfeiltasten oder Wischen, O für die Übersicht, F für Vollbild, N für Sprechernotizen.',
      frameTitle:'Präsentation „Die ersten zwölf Monate“'
    },
    ok:{
      num:'06', h:'Freigabe',
      lead:'Was vor dem Druck noch offen ist, und wie Ihre Rückmeldung zu uns kommt.',
      openH:'Offene Punkte',
      open:[
        'Funktion von Gunter Wendt bestätigen, sie steht auf allen Drucksachen und in der Signatur.',
        'Telefonnummer ergänzen: Visitenkarte, Briefbogen, Signatur und Impressum.',
        'Domain healthklick.de registrieren und mit Vercel verbinden. Die QR-Codes zeigen darauf. Am 9. November 2026 war sie frei, healthklick.com ist vergeben.',
        'Empfänger der Anfragen rechtlich klären: Das Postfach liegt bei Covendos. Vertrag nach Art. 28 oder Art. 26 DSGVO schließen und die Datenschutzerklärung ergänzen.',
        'Marke und Zeichen prüfen lassen: Markenrecherche „HEALTHKLICK“ und Abstand zum geschützten Roten Kreuz.',
        'Echte Team-Fotos für Social Media aufnehmen. Die Bilder hier sind KI-Musterbilder.',
        'Automatischen Versand der Anfragen einrichten (Mail-Dienst) und danach die Datenschutzerklärung anpassen.'
      ],
      formH:'Ihre Rückmeldung',
      items:['Kanalstrategie und Spielregeln','Redaktionsplan und Beiträge','Visitenkarte, Briefbogen, Komplimentkarte, Umschlag','Imagebroschüre und Whitepaper','Mappe, Roll-up, QR-Karte, E-Mail-Signatur','Rechnungslayout','Give-aways','Präsentation'],
      yes:'Freigegeben', change:'Änderung',
      noteL:'Anmerkungen', nameL:'Ihr Name',
      send:'Rückmeldung per E-Mail senden', sendNote:'Öffnet eine vorbereitete E-Mail an die Agentur Grafitecture. Auf der Website wird nichts gespeichert.',
      to:'martin.schweppe@grafitecture.de', subject:'Freigabe Marketing-Material Healthklick',
      mailIntro:'Rückmeldung zum Marketing-Material von Healthklick (Stand 9. November 2026):'
    },
    srcH:'Quellen',
    sources:[
      ['1 · BMG: Bundestag beschließt GKV-Beitragssatzstabilisierungsgesetz, 10.07.2026','https://www.bundesgesundheitsministerium.de/ministerium/meldungen/bundestag-beschliesst-gkv-beitragssatzstabilisierunggesetz-pm-10-07-2026'],
      ['2 · Veeva: Expand HCP Access with Connected Engagement (Veeva Pulse, Europa), 04.07.2024','https://www.veeva.com/eu/blog/expand-hcp-access-with-connected-engagement-veeva-pulse-data-europe/'],
      ['3 · Pharmazeutische Zeitung: Zahl der Apotheken fällt unter 16.500, 14.09.2026','https://www.pharmazeutische-zeitung.de/zahl-der-apotheken-faellt-unter-16500-168310/'],
      ['4 · NCPE: Erste gemeinsame klinische Bewertung nach der EU-HTA-Verordnung abgeschlossen, 04.05.2026','https://www.ncpe.ie/?p=17810'],
      ['5 · ARD/ZDF-Medienstudie 2025: Social Media zwischen Wachstum und Sättigung (Media Perspektiven 31/2025)','https://www.media-perspektiven.de/fileadmin/user_upload/media-perspektiven/pdf/2025/MP_31_2025_ARD_ZDF-Medienstudie_Social_Media_zwischen_Wachstum_und_Saettigung_Nutzungsmuster_und_Plattformdynamiken_in_Deutschland.pdf'],
      ['6 · YouGov, Februar 2026, zitiert nach skill-sprinters.de: Xing vs. LinkedIn 2026','https://skill-sprinters.de/blog/social-media/xing-vs-linkedin-2026/'],
      ['7 · LinkedIn Marketing Solutions, zitiert nach thunderbit.com: LinkedIn-Statistiken 2026','https://thunderbit.com/de/blog/linkedin-stats'],
      ['8 · FSA: Neuregelung des Geschenkeverbots im FSA-Kodex Fachkreise','https://www.fsa-pharma.de/wp-content/uploads/2023/05/flyer_geschenkeverbot_web.pdf'],
      ['9 · § 125 OWiG: Benutzen des Roten Kreuzes','https://www.gesetze-im-internet.de/owig_1968/__125.html'],
      ['10 · IHK Gera: Nächste Stufe der E-Rechnung, Stand 28.10.2026','https://www.ihk.de/gera/recht-und-steuern/aktuelles-rechtundsteuern/naechste-stufe-der-e-rechnung-7216566'],
      ['11 · Pharmazeutische Zeitung: Erweiterte Standortklausel, vier Kriterien, 01.10.2026','https://www.pharmazeutische-zeitung.de/vier-kriterien-fuer-erleichterungen-168838/'],
      ['12 · Bitkom: Ein Jahr Pflicht zur elektronischen Patientenakte, 01.10.2026','https://www.bitkom.org/index%2ephp/Presse/Presseinformation/1-Jahr-Pflicht-elektronische-Patientenakte-ePA']
    ]
  };

  return {
    lang:'de', locale:'de-DE', base:'',
    mail:'gunter.wendt@covendos.com', apply:'martin.schweppe@grafitecture.de',
    alias:{marke:'brand'},
    CHANNELS, JOBS, AGENTS, TOPICS, PAPERS, SCALE, COLORS, t, mk
  };
})();
