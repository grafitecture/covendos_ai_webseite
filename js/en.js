/* =========================================================
   Covendos Healthcare Group – English content and UI strings
   Counterpart: js/de.js. Shared logic: js/site.js
   ========================================================= */
const SITE = (() => {
  const CHANNELS = {
    rx: ['Face-to-face meetings in practices and hospitals','Remote detailing by video and phone','Professional portals and CME','Webinars and congresses','Email on request','Medical information'],
    otc: ['Advice at the pharmacy counter','Pharmacy telesales and training','Professional portals for pharmacy teams','Social media and search','Consumer hotline','Point of sale']
  };

  const TEAM = [
    {id:'wenninger', name:'Dr. Clara Wenninger', mail:'clara.wenninger', role:'Founder and CEO', bio:'Internist, then 15 years in commercial leadership in the pharmaceutical industry. Responsible for strategy and client relationships.', city:'Mannheim'},
    {id:'osei', name:'Malik Osei', mail:'malik.osei', role:'Co-founder, Chief Agent Officer', bio:'Builds the agent platform. Previously machine learning for insurers and hospital groups.', city:'Remote, Berlin'},
    {id:'marchetti', name:'Dr. Sofia Marchetti', mail:'sofia.marchetti', role:'Medical Director', bio:'Specialist in pharmacology. Responsible for medical information and pharmacovigilance.', city:'Mannheim', agent:'Vigilance Agent'},
    {id:'reiter', name:'Jonas Reiter', mail:'jonas.reiter', role:'Head of Hybrid Field Force', bio:'Twelve years in field sales and key account management. Leads the eReps.', city:'Mannheim', agent:'Briefing Agent'},
    {id:'demir', name:'Aylin Demir', mail:'aylin.demir', role:'Lead Patient Journeys', bio:'Registered nurse. Develops support programmes that practices are happy to recommend.', city:'Remote, Cologne', agent:'Companion Agent'},
    {id:'lindqvist', name:'Prof. Dr. Henrik Lindqvist', mail:'henrik.lindqvist', role:'Senior Advisor Market Access', bio:'Health economist. Advises on benefit assessment, AMNOG and price negotiations.', city:'Remote, Hamburg'},
    {id:'hartmann', name:'Mei Lin Hartmann', mail:'meilin.hartmann', role:'Modular Content Architect', bio:'Designer and copywriter. Breaks campaigns down into modules that can be approved.', city:'Mannheim', agent:'Content Agent'},
    {id:'kraemer', name:'Tobias Krämer', mail:'tobias.kraemer', role:'AI Governance and Compliance', bio:'Lawyer specialising in medicinal products advertising law. Oversees HWG, AÜG, EU AI Act and GDPR.', city:'Mannheim', agent:'Compliance Agent'},
    {id:'fischbach', name:'Nora Fischbach', mail:'nora.fischbach', role:'Data Scientist, Next Best Action', bio:'Physicist. Builds models for segmentation and early warning signals.', city:'Remote, Leipzig', agent:'Insight Agent'},
    {id:'nowak', name:'Lukas Nowak', mail:'lukas.nowak', role:'Lifecycle Strategist', bio:'Specialist in established brands, tenders and rebate contracts after patent expiry.', city:'Mannheim'},
    {id:'raman', name:'Priya Raman', mail:'priya.raman', role:'Agent Trainer, Conversation Design', bio:'Linguist. Teaches agents how to talk to doctors and patients, and when to hand over to a person.', city:'Remote, Munich'},
    {id:'albers', name:'Greta Albers', mail:'greta.albers', role:'Lead OTC and Pharmacy', bio:'Pharmacist. Responsible for telesales and training for pharmacy teams.', city:'Remote, Bremen'}
  ];

  const JOBS = [
    {id:'innendienst-kardio', t:'Inside pharma consultant, cardiology', k:'own', where:'Remote, anywhere in Germany', time:'Full-time or part-time'},
    {id:'callagent-otc', t:'Call agent for customer advice and telesales, OTC', k:'own', where:'Remote or Mannheim', time:'Part-time possible'},
    {id:'patientenbegleitung', t:'Registered nurse as patient support coordinator', k:'own', where:'Remote, anywhere in Germany', time:'Full-time'},
    {id:'aussendienst-onko', t:'Pharmaceutical sales representative, oncology', k:'client', where:'Territory Rhine-Neckar and Rhine-Main', time:'Full-time'},
    {id:'kam-rare', t:'Key account manager hospitals, rare diseases', k:'client', where:'Territory North, Hamburg and Bremen', time:'Full-time'},
    {id:'customer-service', t:'Medical customer service advisor', k:'client', where:'Mannheim, hybrid', time:'Full-time'}
  ];

  const AGENTS = [
    {name:'Briefing Agent', text:'Before every appointment, summarises history, open questions and approved materials on a single page.', owner:'Jonas Reiter'},
    {name:'Compliance Agent', text:'Checks call notes, emails and materials against the HWG and your SOPs before anything goes out. Also monitors the deadlines of temporary staffing assignments.', owner:'Tobias Krämer'},
    {name:'Content Agent', text:'Builds variants for every channel from approved modules. It never writes new promotional claims.', owner:'Mei Lin Hartmann'},
    {name:'Vigilance Agent', text:'Detects possible side effects in conversations and messages and starts the reporting process.', owner:'Dr. Sofia Marchetti'},
    {name:'Companion Agent', text:'Reminds patients, answers everyday questions from reviewed content and brings in nurses when needed.', owner:'Aylin Demir'},
    {name:'Insight Agent', text:'Finds patterns in prescriptions and contacts and suggests the next best action.', owner:'Nora Fischbach'}
  ];

  const TOPICS = [
    {group:'Sales', items:['Hybrid field force','eReps and remote detailing','Vacancy management','AI briefings for the field force']},
    {group:'Patients', items:['Patient support programme','Adherence and reminders']},
    {group:'Medical', items:['Medical information','Pharmacovigilance processes']},
    {group:'Content', items:['Omnichannel content and approval','Webinars and HCP events']},
    {group:'Lifecycle', items:['Launch preparation','First year on the market and AMNOG','Established brands after patent expiry']},
    {group:'OTC and pharmacy', items:['Pharmacy telesales','Training for pharmacy teams']},
    {group:'Foundations', items:['AI governance and compliance','Human-led AI workshop']}
  ];

  const PAPERS = [
    {id:'hybrid', v:'v1', title:'The hybrid field force', sub:'How AI agents prepare doctor visits without replacing them', for:'sales and sales excellence teams', min:7,
     ring:{s:'120%',x:'-35%',y:'-18%'}, dot:{s:'22%',x:'62%',y:'40%'},
     blocks:[
      {h:'Starting point'},
      {p:'In Germany, the face-to-face field force still takes the largest share of budgets for communication with doctors. In 2023, around 70 per cent of spending went into in-person visits. After their peak during the pandemic, remote channels were back at four to five per cent (IQVIA). At the same time, access to practices is getting tighter: many doctors only see reps by appointment, and conversations are getting shorter.'},
      {p:'So the question is not whether the field force will stay, but how every minute with a doctor can be worth more.'},
      {h:'What agents can do today'},
      {li:['Pre-call briefing: history, open questions, approved materials and notes from medical information on one page.','Call notes by voice, transferred to the CRM in a structured format.','Compliance check of notes, emails and materials before they are sent.','Follow-up suggestions with date, channel and suitable content.']},
      {p:'Major CRM vendors now ship agents like these themselves. The difference therefore does not come from the tool, but from the operating model behind it.'},
      {h:'What stays with people'},
      {p:'Relationships, judgement and medical depth cannot be automated. An agent can prepare which study a doctor might be interested in. Whether she is open to it today, only a person will notice.'},
      {h:'The tandem model'},
      {p:'We combine three levels: the field force for top prescribers and hospitals, eReps for broad coverage and vacant territories, and an agent layer that prepares, documents and follows up for both teams. All three work with the same contact history.'},
      {li:['Contact quality rather than contact numbers as the lead KPI.','Follow-up within 48 hours as standard.','Coverage in vacant territories, too.']},
      {h:'The first 90 days'},
      {li:['Weeks 1 to 3: choose a pilot territory, measure baselines, approve content for agents.','Weeks 4 to 8: briefing and documentation agents in tandem with two to three field reps.','Weeks 9 to 12: evaluation, extension to eReps, decision on the rollout.']}
     ]},
    {id:'launch', v:'v2', title:'The first twelve months', sub:'Launch communication under AMNOG', for:'brand teams and launch excellence', min:6,
     ring:{s:'70%',x:'48%',y:'14%'}, dot:{s:'14%',x:'18%',y:'30%'},
     blocks:[
      {h:'Starting point'},
      {p:'In Germany, early benefit assessment begins as soon as a medicine enters the market. Since the SHI Financial Stabilisation Act (GKV-FinStG), the negotiated reimbursement amount applies from the seventh month. The window in which a new medicine has to build awareness, first prescriptions and experience in everyday care has therefore become shorter.'},
      {h:'Three launch bottlenecks'},
      {li:['Reach: the target group is broader than the field force can cover in the first months.','Content: materials are stuck in medical-legal review while the market waits.','Teams: recruiting and onboarding take longer than launch planning allows.']},
      {h:'The hybrid launch model'},
      {p:'The field force concentrates on centres and top prescribers. eReps reach the wider market by video and phone, with the same approved content from day one. Agents prepare every contact, recognise information needs and trigger requests to medical information. A patient support programme is ready before the first patients start therapy.'},
      {h:'Modular content for approval'},
      {p:'Instead of complete materials, medical, regulatory and legal approve reviewed modules once: key messages, study data with references, indication text. These are combined into variants for email, webinars, detailing and print, without every variant needing a new review.'},
      {h:'Measure what matters'},
      {li:['Time to first prescription per target practice.','Share of the target group with at least one qualified contact.','Patient starts in the support programme.','Open medical information requests and their processing time.']},
      {h:'Pre-launch checklist'},
      {li:['Segmentation and channel preferences of the target group are known.','At least ten approved content modules are available.','The remote team is onboarded and connected to the CRM.','The pharmacovigilance process has been tested for all channels.']}
     ]},
    {id:'psp', v:'v3', title:'Patient support that practices recommend', sub:'Why support programmes fail and how they work', for:'brand teams and patient services', min:6,
     ring:{s:'86%',x:'34%',y:'22%'}, dot:{s:'32%',x:'6%',y:'40%'},
     blocks:[
      {h:'Starting point'},
      {p:'Patient support programmes have a good reputation among doctors, yet they are surprisingly rarely recommended. In conversations with practices we hear the same reasons again and again: it is unclear what the programme does. The benefit for the practice remains invisible. And when a new patient starts therapy, nobody thinks of the programme any more.'},
      {h:'A clear profile'},
      {p:'A good programme says in one sentence what it does and what it does not do. It takes no decisions away from the doctor, but complements her work where there is no time left in the consultation.'},
      {h:'Giving time'},
      {li:['Social support: work, family, authorities, long-term care, severe disability status.','Adherence support: medication, appointments, prescriptions, nutrition.','Psychosocial stabilisation and referral to specialist services.','Preparation for the next doctor’s appointment with targeted questions.']},
      {h:'Enrolment in two minutes'},
      {p:'A display in the practice, a QR code on the leaflet, a short online form. Patients enrol themselves and name their treating practice. With their consent, we inform the practice about the enrolment. This makes the programme visible without adding to the practice’s workload.'},
      {h:'The role of agents'},
      {p:'Agents take care of reminders, answer everyday questions from reviewed content and recognise signals that a patient may be about to stop therapy. They forward possible side effects to pharmacovigilance immediately. For every conversation that calls for empathy, they bring in a nurse.'},
      {h:'What you should measure'},
      {li:['Share of practices that recommend the programme.','Time from prescription to enrolment.','Adherence after three and after six months.','Satisfaction of patients and practices.']}
     ]},
    {id:'governance', v:'v4', title:'AI in pharma sales, done safely', sub:'HWG, EU AI Act, GDPR and pharmacovigilance in practice', for:'compliance, medical and management', min:7,
     ring:{s:'62%',x:'44%',y:'34%'}, dot:{s:'10%',x:'70%',y:'12%'},
     blocks:[
      {h:'Starting point'},
      {p:'Hardly any industry is as strictly regulated as communication about medicines. Anyone who uses AI agents in sales, medical information or patient services has to comply with the existing rules and add new ones. That is achievable if governance is part of the design from the start.'},
      {h:'The framework'},
      {li:['German Medicinal Products Advertising Act (HWG) and FSA Code: advertising law still determines what an agent may say to healthcare professionals or the public.','GDPR: health data enjoys special protection and needs a clear legal basis, usually explicit consent.','EU AI Act: people must be able to recognise when they are interacting with an AI system.','Pharmacovigilance: every piece of information about a possible side effect must be recognised and forwarded on time, including in chat and on the phone.']},
      {h:'Five principles for operations'},
      {li:['Every agent has a named person who is responsible for it.','Agents do not write new promotional claims. They combine approved modules.','Medical questions beyond first-line information are answered by people.','Every interaction is logged completely and traceably.','Data is processed in the EU and stored only as long as necessary.']},
      {h:'Pharmacovigilance in agent operations'},
      {p:'A vigilance agent checks every interaction for indications of side effects, medication errors or use during pregnancy. When it finds one, it creates an initial report that a specialist reviews within one working day and passes on to the marketing authorisation holder. Regular reconciliations ensure that no case gets lost.'},
      {h:'Audit and review'},
      {p:'Once a quarter, compliance, medical and the project team jointly review samples, escalations and error rates. Whatever stands out feeds back into approvals, training data and processes.'},
      {p:'Note: this white paper provides an overview and does not replace legal advice.'}
     ]}
  ];

  const SCALE = [
    ['h1','17.942rem','clamp(3.236rem, 0.4rem + 13.5vw, 17.942rem)','var(--fs-h1)','Time'],
    ['h2','11.089rem','clamp(2.618rem, 0.4rem + 6.8vw, 11.089rem)','var(--fs-h2)','Time for'],
    ['h3','6.854rem','clamp(1.618rem, 0.6rem + 3.3vw, 6.854rem)','var(--fs-h3)','More time for'],
    ['h4','4.236rem','clamp(1.382rem, 0.9rem + 1.55vw, 4.236rem)','var(--fs-h4)','More time for medicine'],
    ['h5','2.618rem','clamp(1.236rem, 1rem + 0.75vw, 2.618rem)','var(--fs-h5)','More time for medicine'],
    ['h6','1.618rem','clamp(1.118rem, 1rem + 0.4vw, 1.618rem)','var(--fs-h6)','More time for medicine'],
    ['p','1rem','1rem','1rem','More time for medicine'],
    ['small','0.618rem','clamp(0.618rem, 0.55rem + 0.22vw, 0.75rem)','var(--fs-small)','More time for medicine'],
    ['Spacing','0.382rem','spacing only','','']
  ];
  const COLORS = [
    ['White','#ffffff','Surface'],['Mist','#f3f5f7','Surfaces, sections'],['Line','#dae1e5','Lines, frames'],
    ['Slate','#5e6f79','Secondary text, rings'],['Ink','#1d2a32','Text, buttons'],['Covendos red','#ed192e','Logo, dot, signal']
  ];

  const t = {
    owner:'Responsible:',
    portrait:n => `Portrait of ${n}`,
    own:'At Covendos', client:'Via Covendos at a client',
    applyBtn:'Apply', initiative:'Speculative application',
    paperNo:'No. ', paperFacts:(f,m) => `For ${f}. ${m}-minute read.`, paperBtn:'Request white paper',
    to:'To', subj:'Subject',
    save:{
      saved:w => `${w} has been saved.`,
      browser:(w,a) => `${w} is downloading. If nothing happens, use ${a}.`,
      declined:'Saving cancelled.',
      busy:'A save dialog is already open. Please wait a moment.',
      failed:(w,a) => `Saving is not possible in this view. Please use ${a}.`
    },
    pdfFooter:'Covendos Healthcare Group  |  covendos.ai  |  More time for medicine',
    brief:{
      greet:'Hello,', intro:'I would like to arrange a conversation with the Covendos Healthcare Group.',
      topicsH:'Topics:', noTopics:'none selected yet', contextH:'Context:',
      market:'Market', area:'Therapeutic area', phase:'Lifecycle phase', time:'Timeframe', open:'open',
      msgH:'Message:', bye:'Kind regards', namePh:'[Name]',
      subject:(c,n) => `Meeting request${c ? ': ' + c : ''} (${n} ${n===1 ? 'topic' : 'topics'})`,
      count:n => n ? `${n} ${n===1 ? 'topic' : 'topics'} selected` : 'No topic selected yet'
    },
    err:{
      topics:'Please choose at least one topic.', chooseFirst:'Please choose your topics first.',
      name:'Please enter your name.', company:'Please enter your company.',
      mail:'Please enter a valid email address.', missing:'Please complete the highlighted fields.'
    },
    msg:{
      mailOpen:m => `Your email program will open with the prepared request. If it doesn’t, copy the text and send it to ${m}.`,
      copied:m => `Text copied. Paste it into an email to ${m}.`,
      selected:'Text selected. Press Ctrl+C or Cmd+C to copy.'
    },
    pdf:{
      brTitle:'Meeting briefing', contactH:'Contact', noData:'No details yet', topicsH:'Selected topics',
      noTopics:'No topics selected yet.', contextH:'Context', msgH:'Message',
      brNote:m => `Please send to ${m}. We will get back to you within one working day.`,
      brFile:'covendos-briefing', brWhat:'Your briefing', brAlt:'“Copy text”',
      clTitle:'Topic checklist', clSub:'Tick the topics you would like to discuss with us.', clContextH:'Your context',
      clContext:['Market:  Rx  /  OTC  /  both','Therapeutic area:','Lifecycle phase:','Timeframe:'],
      clContact:['Name:','Company and role:','Email and phone:'],
      clNote:m => `Send the completed checklist to ${m} or bring it to our meeting.`,
      clFile:'covendos-topic-checklist.pdf', clWhat:'The checklist', clAlt:'the topic selection in the form'
    },
    apply:{
      greet:'Hello,', line:j => `I would like to apply for: ${j}.`, open:'open',
      way:'Preferred route', place:'Place of work', qual:'Qualification', region:'Place of residence or postcode', start:'Earliest start',
      cv:'Please find my CV attached.', bye:'Kind regards', subject:'Application: ',
      mailOpen:m => `Your email program will open with the prepared application. Attach your CV there. If nothing opens, copy the text and send it to ${m}.`,
      copied:m => `Text copied. Paste it into an email to ${m} and attach your CV.`
    },
    wp:{
      label:'WHITE PAPER', forLine:f => `For ${f}  |  October 2026`, readerLine:r => `Provided for ${r}`,
      aboutH:'About the Covendos Healthcare Group',
      about:'The Covendos Healthcare Group handles sales, patient services, medical information and staffing for pharmaceutical companies. AI agents prepare, document and follow up. Experienced people lead every conversation that matters. Headquarters in Mannheim, teams across Germany. The group comprises Covendos GmbH and helena GmbH.',
      cta:'Arrange a meeting: ',
      thanks:(n,t) => `Thank you, ${n}. “${t}” is ready.`, read:'Read here', readClose:'Close reader',
      errFirst:'Please enter your first name.', errLast:'Please enter your last name.',
      errMail:'Please enter a valid email address.', errCompany:'Please enter your company.',
      file:id => `covendos-white-paper-${id}.pdf`, what:'The white paper', alt:'“Read here”'
    }
  };

  return {
    lang:'en', locale:'en-GB', base:'../',
    mail:'info@covendos.com', apply:'karriere@covendos.com',
    alias:{},
    CHANNELS, TEAM, JOBS, AGENTS, TOPICS, PAPERS, SCALE, COLORS, t
  };
})();
