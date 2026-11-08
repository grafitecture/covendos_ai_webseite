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
      greet:'Guten Tag,', intro:'ich interessiere mich für ein Gespräch mit Healthklick.',
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
      file:id => `healthklick-whitepaper-${id}.pdf`, what:'Das Whitepaper', alt:'„Hier lesen“'
    }
  };

  return {
    lang:'de', locale:'de-DE', base:'',
    mail:'martin.schweppe@grafitecture.de', apply:'martin.schweppe@grafitecture.de',
    alias:{marke:'brand'},
    CHANNELS, JOBS, AGENTS, TOPICS, PAPERS, SCALE, COLORS, t
  };
})();
