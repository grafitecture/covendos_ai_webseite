/* =========================================================
   HEALTHKLICK – English content and UI strings
   Counterpart: js/de.js. Shared logic: js/site.js
   ========================================================= */
const SITE = (() => {
  const CHANNELS = {
    rx: ['Face-to-face meetings in practices and hospitals','Remote detailing by video and phone','Professional portals and CME','Webinars and congresses','Email on request','Medical information'],
    otc: ['Advice at the pharmacy counter','Pharmacy telesales and training','Professional portals for pharmacy teams','Social media and search','Consumer hotline','Point of sale']
  };


  const JOBS = [
    {id:'innendienst-kardio', t:'Inside pharma consultant, cardiology', k:'own', where:'Remote, anywhere in Germany', time:'Full-time or part-time'},
    {id:'callagent-otc', t:'Call agent for customer advice and telesales, OTC', k:'own', where:'Remote or Mannheim', time:'Part-time possible'},
    {id:'patientenbegleitung', t:'Registered nurse as patient support coordinator', k:'own', where:'Remote, anywhere in Germany', time:'Full-time'},
    {id:'aussendienst-onko', t:'Pharmaceutical sales representative, oncology', k:'client', where:'Territory Rhine-Neckar and Rhine-Main', time:'Full-time'},
    {id:'kam-rare', t:'Key account manager hospitals, rare diseases', k:'client', where:'Territory North, Hamburg and Bremen', time:'Full-time'},
    {id:'customer-service', t:'Medical customer service advisor', k:'client', where:'Mannheim, hybrid', time:'Full-time'}
  ];

  const AGENTS = [
    {name:'Briefing Agent', text:'Before every appointment, summarises history, open questions and approved materials on a single page.', owner:'Head of Hybrid Field Force'},
    {name:'Compliance Agent', text:'Checks call notes, emails and materials against the HWG and your SOPs before anything goes out. Also monitors the deadlines of temporary staffing assignments.', owner:'AI Governance and Compliance'},
    {name:'Content Agent', text:'Builds variants for every channel from approved modules. It never writes new promotional claims.', owner:'Modular Content Architect'},
    {name:'Vigilance Agent', text:'Detects possible side effects in conversations and messages and starts the reporting process.', owner:'Medical Director'},
    {name:'Companion Agent', text:'Reminds patients, answers everyday questions from reviewed content and brings in nurses when needed.', owner:'Lead Patient Journeys'},
    {name:'Insight Agent', text:'Finds patterns in prescriptions and contacts and suggests the next best action.', owner:'Data Scientist, Next Best Action'}
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
    ['Strawberry Red','#FB3640','Logo, cross, signal'],['Imperial Blue','#0A2463','Text, buttons, footer'],['Cerulean','#247BA0','Text links, hover, accent'],
    ['Charcoal','#605F5E','Secondary text, rings'],['Alabaster Grey','#E2E2E2','Surfaces, lines'],['White (paper)','#FFFFFF','Background, not a brand colour']
  ];

  const t = {
    owner:'Responsible:',
    own:'At Healthklick', client:'Via Healthklick at a client',
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
    pdfFooter:'HEALTHKLICK  |  A service of Grafitecture GmbH  |  More time for medicine',
    brief:{
      greet:'Hello,', intro:'I would like to arrange a conversation with Healthklick.', source:'Found via: ',
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
      brFile:'healthklick-briefing', brWhat:'Your briefing', brAlt:'“Copy text”',
      clTitle:'Topic checklist', clSub:'Tick the topics you would like to discuss with us.', clContextH:'Your context',
      clContext:['Market:  Rx  /  OTC  /  both','Therapeutic area:','Lifecycle phase:','Timeframe:'],
      clContact:['Name:','Company and role:','Email and phone:'],
      clNote:m => `Send the completed checklist to ${m} or bring it to our meeting.`,
      clFile:'healthklick-topic-checklist.pdf', clWhat:'The checklist', clAlt:'the topic selection in the form'
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
      aboutH:'About Healthklick',
      about:'Healthklick handles sales, patient services, medical information and staffing for pharmaceutical companies. AI agents prepare, document and follow up. Experienced people lead every conversation that matters. Headquarters in Mannheim, teams across Germany. Healthklick is a service of Grafitecture GmbH, Mannheim.',
      cta:'Arrange a meeting: ',
      thanks:(n,t) => `Thank you, ${n}. “${t}” is ready.`, read:'Read here', readClose:'Close reader',
      errFirst:'Please enter your first name.', errLast:'Please enter your last name.',
      errMail:'Please enter a valid email address.', errCompany:'Please enter your company.',
      talkSubj:t => `Conversation about the white paper “${t}”`,
      talkBody:(r,t) => `Dear Mr Schweppe,\n\nI have read the Healthklick white paper “${t}” and would like to talk about the topic.\n\nName: ${r.first} ${r.last}\nCompany: ${r.company}\nRole: ${r.fn || '–'}\nEmail: ${r.mail}\nNew white papers by email: ${r.news ? 'yes' : 'no'}\n\nKind regards\n${r.first} ${r.last}`,
      file:id => `healthklick-white-paper-${id}.pdf`, what:'The white paper', alt:'“Read here”'
    }
  };

  /* Marketing material for approval (section below the footer, js/marketing.js) */
  const mk = {
    kicker:'Marketing material for approval · as of 9 November 2026',
    title:'Marketing',
    lead:'One campaign, one look: social media, print, invoicing, giveaways and a presentation. The goal is every qualified contact, and all enquiries from the campaign go straight to Martin Schweppe.',
    langNote:'The campaign material itself is in German because it is written for the German market. Explanations, notes and the approval form are in English.',
    facts:[['1','contact person for all leads'],['18','posts in eight weeks on three channels'],['10','print items and templates'],['3','giveaways'],['1','interactive presentation']],
    navLabel:'Marketing material',
    nav:{social:'Social media', print:'Print', invoice:'Invoicing', give:'Giveaways', deck:'Presentation', ok:'Approval'},
    flowH:'How every lead reaches Martin Schweppe',
    flow:[['Channel','LinkedIn, Instagram, Facebook, QR codes on print items, presentation'],['Website','Contact form or white paper. Every channel has its own link with a source, for example ?quelle=linkedin'],['Email','Prepared enquiry with topics and source to martin.schweppe@grafitecture.de'],['Conversation','Reply within one working day, prepared by the briefing agent']],
    flowNote:'The source is part of the enquiry, without any tracking cookies. For enquiries to arrive without going through the visitor’s email program, a mail service is still needed (see Approval).',
    ui:{prev:'Previous', next:'Next', pending:'Sample image to follow', aiTag:'AI sample image', close:'Close', zoom:'Enlarge'},
    social:{
      num:'01', h:'Social media',
      lead:'LinkedIn brings the leads, Instagram and Facebook bring the people. The communication builds on what makes Healthklick: expertise in market, law and lifecycle, visible responsibility and a team people want to get to know.',
      channelsH:'Which channels we use',
      labels:{role:'Role', who:'Audience', formats:'Formats', rhythm:'Frequency', goal:'Goal'},
      channels:[
        {id:'li', short:'in', name:'LinkedIn', badge:'Main channel', main:true, role:'Lead channel and expert voice', who:'Brand managers, sales excellence, market access, medical affairs and management at pharma and biotech companies', formats:'Number posts, document carousels, white papers with lead form, newsletter “Healthklick Briefing”, posts by Martin Schweppe as a personal voice', rhythm:'3 posts a week on the company page, 1 to 2 by Martin Schweppe', goal:'Meeting requests and white paper registrations', fact:'80% of B2B leads from social networks come via LinkedIn.', src:7},
        {id:'ig', short:'◎', name:'Instagram', badge:'Employer brand', role:'The face of the team', who:'Pharma sales representatives, pharmacy technicians, scientists, inside sales and call agents', formats:'Reels from everyday work, carousels on the field force, team moments, stories with questions and answers', rhythm:'2 to 3 posts a week, stories as needed', goal:'Applications and awareness', fact:'Most used platform in Germany: 40% weekly reach among people aged 14 and over.', src:5},
        {id:'fb', short:'f', name:'Facebook', badge:'Regional recruiting', role:'Jobs and team in the regions', who:'Experienced field sales staff and regional networks', formats:'Jobs by region, team moments, events', rhythm:'2 posts a week, job ads targeted by region', goal:'Applications for specific territories', fact:'31% weekly reach in Germany.', src:5},
        {id:'yt', short:'▶', name:'YouTube', badge:'Recommended from Q1 2027', role:'Explaining and being found', who:'All audiences, via search', formats:'Explainer videos of 2 to 4 minutes, webinar recordings', rhythm:'1 video a month', goal:'Findability and material for sales', fact:'Reaches 72% of people aged 14 and over.', src:5},
        {id:'xi', short:'X', name:'Xing', badge:'Job ads only', role:'Job board, no own content', who:'Applicants in the German-speaking region', formats:'Job ads', rhythm:'As needed', goal:'Additional applications', fact:'15% of people in Germany use LinkedIn, 8% use Xing.', src:6}
      ],
      notH:'Deliberately not:', not:'TikTok and X. The audience is hardly there in a professional capacity, and comments are hard to moderate responsibly.',
      rulesH:'Ground rules',
      rules:[
        ['No product advertising.','No advertising for prescription-only medicines in public channels (Section 10 HWG) and no client products. Healthklick talks about services, the market and the law.'],
        ['Take side effects seriously.','If someone mentions a side effect in comments or messages, the vigilance agent flags it. A qualified person reviews it and forwards it to the manufacturer concerned.'],
        ['Real people, real photos.','The team images here are AI sample images for approval. The channels only show real photos, with the consent of the people shown. AI-generated images are labelled (Art. 50 AI Act).'],
        ['Data protection.','The privacy policy gets a section on the social media pages: Healthklick and the platform are joint controllers for page statistics (CJEU, C-210/16).'],
        ['Four eyes.','Every post that touches on law or the market passes the compliance agent and a responsible person before publication.'],
        ['Every link with a source.','Links from the channels carry ?quelle=linkedin, ?quelle=instagram or ?quelle=facebook. The source then appears in the enquiry to Martin Schweppe.']
      ],
      tabletH:'What the channels look like',
      tabletNote:'Sample view on a tablet, as it would look after eight weeks. Followers and reactions are sample values. On Instagram, tap a post; browse carousels with the arrows.',
      planH:'Editorial plan', planLead:'18 posts from week 47/2026 to week 2/2027. Expand a row for text and image.',
      mixH:'Mix of posts', kw:'Week', draftGW:'Draft for Martin Schweppe, to be approved by him', textOnly:'Text post without image', showInTablet:'Show on the tablet'
    },
    print:{
      num:'02', h:'Print',
      lead:'Printed the classic way, thought through digitally. Everything on one grid, in the five brand colours, with Martin Schweppe as sender. Tap to enlarge.',
      items:{
        letter:['Letterhead','A4 to DIN 5008, form B · 100 g/m² recycled paper, FSC · as a Word template and digital print'],
        card:['Business card, front','85 × 55 mm · 400 g/m² natural board · logo red as a spot colour'],
        cardBack:['Business card, back','Full Imperial Blue · QR code with contact details (vCard)'],
        compl:['Compliments slip','DL, 210 × 99 mm · 300 g/m² · for documents and samples'],
        env:['Envelope','DL with window · matching the letterhead'],
        broCover:['Image brochure, cover','A4 portrait · 16 pages · saddle-stitched'],
        broSpread:['Spread “What we do”','Services, image and client quote'],
        broBack:['Back cover','Contact and QR code to book a meeting'],
        wp:['White paper','A4 · digital as PDF, printed in small runs'],
        wpSpread:['White paper, inside pages','Two-column text, one big number, tandem graphic'],
        folder:['Presentation folder','A4 · 350 g/m² · pocket with business card slot'],
        rollup:['Roll-up banner','85 × 200 cm · for congresses and events'],
        qrcard:['QR card for practices','A6 · template for client support programmes'],
        sig:['Email signature','The most-read print item is digital · with the details required by Section 35a GmbHG']
      },
      broH:'Image brochure', wpH:'White papers', moreH:'What else is still needed',
      needH:'What is still printed today',
      needLead:'We print what people hold in their hands or what stands at an event. Everything else is digital and printed on demand. Keep runs small, reprints are cheap.',
      specHead:['Item','Format','Material','Initial run'],
      specs:[
        ['Business card','85 × 55 mm','400 g/m² natural board, back Imperial Blue','250 per person'],
        ['Compliments slip','DL','300 g/m²','250'],
        ['Letterhead','A4','100 g/m² recycled paper, FSC','500, plus Word template'],
        ['Envelope','DL with window','100 g/m²','500'],
        ['Image brochure','A4, 16 pages','Cover 250 g/m², inside 150 g/m²','300'],
        ['White paper','A4','Digital print','50 each, otherwise PDF'],
        ['Presentation folder','A4','350 g/m²','250'],
        ['Roll-up banner','85 × 200 cm','Banner fabric with cassette','2'],
        ['QR card for practices','A6','300 g/m²','1,000 per programme']
      ],
      dropH:'What is no longer needed',
      drop:[
        ['Fax template and fax number.','Communication runs by email, phone and video.'],
        ['Letterhead in large runs.','Letters are written on the computer. We only print originals and contracts.'],
        ['Printed service catalogue.','The website and the brochure as PDF are more up to date.'],
        ['Promotional pens for practices.','Since 2014, the FSA code has generally prohibited gifts to healthcare professionals.']
      ],
      crossH:'Note on the cross',
      cross:'The red cross on a white background, and signs confusingly similar to it, are protected by law in Germany (Section 125 OWiG, German Red Cross Act). In the print items, the cross therefore appears as part of the wordmark, in the claim or on Imperial Blue, never on its own and large on white. Before printing, a trade mark lawyer should review the logo and sign.'
    },
    invoice:{
      num:'03', h:'Invoicing',
      lead:'The invoice is part of the brand: the same letterhead, a clear table, all mandatory details. From 2027 it is sent as an e-invoice. All data on this sample is fictitious.',
      dutyH:'Mandatory details, marked in the sample',
      duties:[
        'Name and address of the supplier',
        'Name and address of the recipient',
        'Invoice number, date of issue and VAT identification number',
        'Quantity and type of service',
        'Time of supply, here the service period',
        'Net amount, broken down by tax rate',
        'Tax rate and tax amount',
        'Company details required on business letters: registered office, register court, register number, managing director (Section 35a GmbHG)'
      ],
      eH:'E-invoicing from 2027',
      e:'Since 2025, all businesses in Germany must be able to receive e-invoices. From 1 January 2027, companies with more than €800,000 turnover in the previous year must also issue them, and from 2028 all companies. The layout stays: in the ZUGFeRD format, the structured invoice sits inside the PDF as XML.',
      xmlBtn:'Show structured data', xmlHide:'Hide structured data',
      note:'Mandatory details under Section 14(4) of the German VAT Act. Client, order, amounts and bank details are samples; the bank details are the usual example IBAN used in documentation.',
      figH:'Invoice', figMeta:'A4 · same letterhead · mandatory details marked'
    },
    give:{
      num:'04', h:'Giveaways',
      lead:'Three things that stay. One is a classic with a name of its own, two are new and turn the brand into something you can touch: time and a click.',
      items:[
        {tag:'Giveaway 1 · classic', name:'Ideenbuch (idea book)', idea:'An A5 notebook with white, blank pages. For workshops, client meetings and your own thoughts in between. Blank, because good ideas do not need lines.',
         specs:[['Format','A5, 148 × 210 mm, hardcover with rounded corners'],['Inside','192 blank pages, 100 g/m², thread-sewn'],['Cover','Linen in Imperial Blue, “Ideenbuch” embossed in white, wordmark in red'],['Details','Elastic band and ribbon in logo red, inner pocket, first page “Dieses Ideenbuch gehört …”'],['For','Clients, partners, applicants, team']],
         imgs:['ideenbuch.svg','ideenbuch-offen.svg'], alts:['Idea book, closed: linen cover in Imperial Blue with embossing and red elastic band','Idea book, open: blank white pages and red ribbon'], views:['Closed','Open']},
        {tag:'Giveaway 2 · new', name:'Drei Minuten (three minutes)', idea:'A desk hourglass that runs for exactly three minutes: the claim “More time for medicine” to hold in your hand. In workshops every idea gets three minutes; in everyday work it reminds us what we work for.',
         specs:[['Size','approx. 6 × 6 × 14 cm'],['Material','Glass, sand in logo red, aluminium frame in Imperial Blue'],['Finish','Engraving on the base: “Drei Minuten mehr.” and wordmark'],['Running time','3 minutes'],['For','Client workshops, pitch meetings, team']],
         imgs:['sanduhr.svg'], alts:['Hourglass with red sand and a frame in Imperial Blue'], views:[]},
        {tag:'Giveaway 3 · new', name:'Der Klick (the click)', idea:'A metal tally counter with a red button. The pun is in the name, the message on the back: “Jeder Kontakt zählt.” (Every contact counts.) For congress stands, team rituals and everyone who counts conversations rather than numbers.',
         specs:[['Size','approx. 5 × 3.5 cm, four-digit counter'],['Material','Metal, powder-coated in Imperial Blue, button in logo red'],['Finish','Laser engraving “Jeder Kontakt zählt.”, wordmark in white'],['Details','Reset wheel, loop for a key ring'],['For','Congresses, field force teams, clients']],
         imgs:['klicker.svg'], alts:['Tally counter in Imperial Blue with a red button and counter'], views:[]}
      ],
      ruleH:'Who the giveaways are for',
      rule:'For clients, partners, applicants and our own team. Not for doctors and pharmacies on behalf of a pharmaceutical company: since July 2014 the FSA code for healthcare professionals has generally prohibited gifts, and Section 7 HWG sets narrow limits. On the giveaways, the cross only appears as part of the wordmark.'
    },
    deck:{
      num:'05', h:'Presentation',
      lead:'An interactive presentation in the corporate design, built for a real meeting: the pitch at a pharmaceutical company. It runs in the browser, on a tablet and as a PDF.',
      topicH:'The topic',
      topic:'Fictitious pitch at Auenwald Pharma GmbH on 24 November 2026. A mid-sized manufacturer launches a new cardiology product in 2027, with a 15.5% manufacturer discount and the reimbursement amount applying from month seven. Healthklick shows how people and AI agents carry the first twelve months. The company, product and model calculation are fictitious. The slides are in German.',
      slides:['Title: the first twelve months','Agenda','2027: new rules, with a manufacturer discount calculator','Who can still be reached','The window up to month 7','Our model: people lead, agents assist','Six agents, six people responsible','Channel mix with reach calculator','Twelve-month roadmap','Compliance from day one','Steering: the launch cockpit','How we work together','Next steps','Contact'],
      open:'Open presentation', pdf:'Print as PDF',
      keys:'Controls: arrow keys or swipe, O for the overview, F for full screen, N for speaker notes.',
      frameTitle:'Presentation “Die ersten zwölf Monate”'
    },
    ok:{
      num:'06', h:'Approval',
      lead:'What is still open before printing, and how your feedback reaches us.',
      openH:'Open points',
      open:[
        'Add a phone number: business card, letterhead, signature and legal notice.',
        'Register the domain healthklick.de and connect it to Vercel. The QR codes point to it. It was available on 9 November 2026; healthklick.com is taken.',
        'Have the brand and sign reviewed: trade mark search for “HEALTHKLICK” and distance from the protected red cross.',
        'Take real team photos for social media. The images here are AI sample images.',
        'Set up automatic sending of enquiries (mail service) and then update the privacy policy.'
      ],
      formH:'Your feedback',
      items:['Channel strategy and ground rules','Editorial plan and posts','Business card, letterhead, compliments slip, envelope','Image brochure and white papers','Folder, roll-up, QR card, email signature','Invoice layout','Giveaways','Presentation'],
      yes:'Approved', change:'Change',
      noteL:'Comments', nameL:'Your name',
      send:'Send feedback by email', sendNote:'Opens a prepared email to the Grafitecture agency. Nothing is stored on the website.',
      to:'martin.schweppe@grafitecture.de', subject:'Approval of Healthklick marketing material',
      mailIntro:'Feedback on the Healthklick marketing material (as of 9 November 2026):'
    },
    srcH:'Sources',
    sources:[
      ['1 · German Federal Ministry of Health: Bundestag passes the GKV Contribution Rate Stabilisation Act, 10 July 2026','https://www.bundesgesundheitsministerium.de/ministerium/meldungen/bundestag-beschliesst-gkv-beitragssatzstabilisierunggesetz-pm-10-07-2026'],
      ['2 · Veeva: Expand HCP Access with Connected Engagement (Veeva Pulse, Europe), 4 July 2024','https://www.veeva.com/eu/blog/expand-hcp-access-with-connected-engagement-veeva-pulse-data-europe/'],
      ['3 · Pharmazeutische Zeitung: number of pharmacies falls below 16,500, 14 September 2026','https://www.pharmazeutische-zeitung.de/zahl-der-apotheken-faellt-unter-16500-168310/'],
      ['4 · NCPE: first joint clinical assessment under the EU HTA Regulation complete, 4 May 2026','https://www.ncpe.ie/?p=17810'],
      ['5 · ARD/ZDF Media Study 2025: social media between growth and saturation (Media Perspektiven 31/2025)','https://www.media-perspektiven.de/fileadmin/user_upload/media-perspektiven/pdf/2025/MP_31_2025_ARD_ZDF-Medienstudie_Social_Media_zwischen_Wachstum_und_Saettigung_Nutzungsmuster_und_Plattformdynamiken_in_Deutschland.pdf'],
      ['6 · YouGov, February 2026, cited by skill-sprinters.de: Xing vs LinkedIn 2026','https://skill-sprinters.de/blog/social-media/xing-vs-linkedin-2026/'],
      ['7 · LinkedIn Marketing Solutions, cited by thunderbit.com: LinkedIn statistics 2026','https://thunderbit.com/de/blog/linkedin-stats'],
      ['8 · FSA: new rules on the gift ban in the FSA code for healthcare professionals','https://www.fsa-pharma.de/wp-content/uploads/2023/05/flyer_geschenkeverbot_web.pdf'],
      ['9 · Section 125 OWiG: use of the red cross','https://www.gesetze-im-internet.de/owig_1968/__125.html'],
      ['10 · IHK Gera: next stage of e-invoicing, as of 28 October 2026','https://www.ihk.de/gera/recht-und-steuern/aktuelles-rechtundsteuern/naechste-stufe-der-e-rechnung-7216566'],
      ['11 · Pharmazeutische Zeitung: extended location clause, four criteria, 1 October 2026','https://www.pharmazeutische-zeitung.de/vier-kriterien-fuer-erleichterungen-168838/'],
      ['12 · Bitkom: one year of mandatory electronic patient records, 1 October 2026','https://www.bitkom.org/index%2ephp/Presse/Presseinformation/1-Jahr-Pflicht-elektronische-Patientenakte-ePA']
    ]
  };

  return {
    lang:'en', locale:'en-GB', base:'../',
    mail:'martin.schweppe@grafitecture.de', apply:'martin.schweppe@grafitecture.de',
    alias:{},
    CHANNELS, JOBS, AGENTS, TOPICS, PAPERS, SCALE, COLORS, t, mk
  };
})();
