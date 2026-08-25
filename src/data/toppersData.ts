import { TopperProfile, BookItem, TopperRoutine, NoteItem, InterviewTranscript } from "../types";

export const TOPPERS_PROFILES: TopperProfile[] = [
  {
    id: "aditya-srivastava",
    name: "Aditya Srivastava",
    rank: 1,
    year: 2023,
    optional: "Electrical Engineering",
    attempt: 3,
    background: "B.Tech IIT Kanpur (Ex-Goldman Sachs & Ex-IPS)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote: "Mains is all about smart presentation, precise micro-diagrams, and time management. Every half mark accumulated across 20 questions makes the difference between AIR 1 and missing the list.",
    keyStrategy: "Treated UPSC preparation as a structured engineering optimization problem. Focused heavily on PYQ reverse-engineering, creating concise 1-page notes for every syllabus keyword, and rigorous timed full-length test simulations.",
    gsStrategy: {
      gs1: "History through timelines and maps; Geography with crisp schematic drawings; Society with recent Census data, NFHS-5 surveys, and committee reports.",
      gs2: "Directly mapped every constitutional article, Supreme Court 2nd & 3rd ARC recommendations, and punchy international relations 2x2 matrices.",
      gs3: "Focus on Economic Survey graphs, NITI Aayog Strategy for New India metrics, science & tech contemporary applications, and internal security maps.",
      gs4: "Prepared a personal repository of 50 real-life civil servant examples, philosophical quotes with applied meanings, and standard 7-step case study stakeholder resolution framework."
    },
    essayStrategy: "Wrote multi-dimensional essays exploring Historical, Social, Economic, Political, Psychological, and Ethical angles (PESTLE + philosophical lens). Used catchy quotes in intro and closed with inspirational vision.",
    optionalStrategy: "Mastered electrical engineering fundamentals through rigorous numerical problem-solving and clean circuit diagrams. Practiced 10 years PYQs thrice.",
    prelimsStrategy: "Solved 60+ full length mock tests. Analyzed every incorrect option thoroughly. Maintained 90+ attempts with a calculated intelligent elimination approach.",
    csatStrategy: "Practiced 30 minutes daily from January onwards. Prioritized high-accuracy reading comprehension and quant problem patterns.",
    interviewScore: 200,
    mainsScore: 899,
    goldenRules: [
      "Limit your resources: 1 book read 10 times is better than 10 books read once.",
      "Never write an answer without at least 1 diagram/flowchart or data point.",
      "Syllabus keywords are your holy grail: prepare 150-word notes for each keyword.",
      "Consistency over intensity: 7 focused hours daily beats erratic 14-hour burnout."
    ]
  },
  {
    id: "ishita-kishore",
    name: "Ishita Kishore",
    rank: 1,
    year: 2022,
    optional: "PSIR (Political Science & IR)",
    attempt: 3,
    background: "BA (Hons) Economics, SRCC Delhi (National Football Player)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    quote: "Failures are simply data points showing where to refine your technique. After two prelims failures, fixing my active recall and mock test feedback loop changed everything.",
    keyStrategy: "Strong focus on PSIR interlinkages with GS2. Used current affairs extensively to substantiate theoretical concepts. Dedicated last 75 days before Prelims exclusively to MCQ testing and revision cycles.",
    gsStrategy: {
      gs1: "Modern India revision through Spectrum summaries. Art & Culture through Nitin Singhania notes with visual flashcards.",
      gs2: "Heavy citation of landmark judgements (Puttaswamy, Kesavananda, Navtej Johar) and Law Commission reports.",
      gs3: "Crisp notes on Budget, Economic Survey, agriculture supply chains, and renewable energy targets.",
      gs4: "Values and ethical frameworks applied cleanly to administrative dilemmas. Authentic case study answers without pretense."
    },
    essayStrategy: "Brainstormed for 15-20 minutes before penning down the essay. Balanced flow between prose, philosophical depth, and contemporary governance initiatives.",
    optionalStrategy: "For PSIR, connected Western & Indian Political Thinkers directly with contemporary global geopolitical dynamics (e.g. Morgenthau with Indo-Pacific tensions).",
    prelimsStrategy: "Maintained a dedicated 'Mistake Notebook'. Reviewed every silly mistake 24 hours before subsequent tests.",
    csatStrategy: "Mastered reading comprehension tone analysis and quick arithmetic elimination.",
    interviewScore: 193,
    mainsScore: 901,
    goldenRules: [
      "Maintain a dedicated Mistake Logbook for both Prelims and Mains.",
      "Interlink static theory with dynamic current affairs in every GS answer.",
      "Physical fitness and sports keep mental resilience sharp during low phases.",
      "Do not give up after Prelims setbacks—analyze the root cause objectively."
    ]
  },
  {
    id: "shruti-sharma",
    name: "Shruti Sharma",
    rank: 1,
    year: 2021,
    optional: "History",
    attempt: 2,
    background: "St. Stephen's College & JNU (History)",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    quote: "Own your notes. Making your own consolidated handwritten notes provides an unmatched mental index during the intense 3-hour Mains papers.",
    keyStrategy: "Prepared self-made digital and handwritten notes directly aligned with UPSC syllabus headings. Extensive answer writing practice at Jamia RCA, focusing on clarity, structure, and subheadings.",
    gsStrategy: {
      gs1: "Deep historiographical perspectives for History; map-based geography; sociological case studies for Society.",
      gs2: "Structured answers into Constitutional provisions, Statutory backing, Institutional bottlenecks, and Way Forward.",
      gs3: "Point-wise presentation with data bullets, committee quotes, and clean schematic diagrams.",
      gs4: "Prepared definitions of all GS4 terms in 1-2 lines with 2 personal and 2 administrative examples."
    },
    essayStrategy: "Addressed philosophical topics through varied lenses: individual, societal, administrative, national, and global.",
    optionalStrategy: "History optional requires historiography, archaeological evidence, and high-quality historical site maps.",
    prelimsStrategy: "Solved previous 15 years UPSC Prelims papers multiple times to decode UPSC's question drafting mindset.",
    csatStrategy: "Regular practice of English comprehension and logical syllogisms.",
    interviewScore: 173,
    mainsScore: 932,
    goldenRules: [
      "Consolidate your own notes for every single line of the syllabus.",
      "PYQs are the best teacher: study the options that UPSC eliminated in previous years.",
      "Write answer copies in the actual UPSC format with margins.",
      "Keep answers balanced, objective, and constructive."
    ]
  },
  {
    id: "shubham-kumar",
    name: "Shubham Kumar",
    rank: 1,
    year: 2020,
    optional: "Anthropology",
    attempt: 3,
    background: "B.Tech IIT Bombay (Civil Engineering)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote: "Stick to the basics and optimize your optional. Anthropology diagrams and case studies gave me the decisive scoring edge.",
    keyStrategy: "High scoring in Optional (320+) and GS3/GS4. Mastered fast diagramming techniques in Mains, completing every single paper on time.",
    gsStrategy: {
      gs1: "Brief intro + 2 neat subheadings + map/diagram + 1 line balanced conclusion.",
      gs2: "Articles highlighted with boxes, ARC-2 recommendations, NITI Aayog indices.",
      gs3: "High-scoring graphs for inflation, GDP trends, and agriculture marketing.",
      gs4: "Practical ethical analysis with clear stakeholder matrices."
    },
    essayStrategy: "Structured essays with catchy thematic titles, real stories from rural India, and concrete policy recommendations.",
    optionalStrategy: "Prepared over 150 biological and socio-cultural anthropology diagrams that could be drawn in under 45 seconds.",
    prelimsStrategy: "Practiced 75+ mocks. Focused heavily on high-weightage pillars (Polity, Modern History, Economy, Environment).",
    csatStrategy: "Strong focus on quant speed techniques and data interpretation.",
    interviewScore: 176,
    mainsScore: 878,
    goldenRules: [
      "Draw diagrams in at least 12 out of 20 questions in every GS paper.",
      "Time management is supreme: 7 mins for 10-markers, 11 mins for 15-markers.",
      "Revise high-weightage static subjects before touching new current affairs.",
      "Maintain physical discipline through daily running and meditation."
    ]
  },
  {
    id: "kanishak-kataria",
    name: "Kanishak Kataria",
    rank: 1,
    year: 2018,
    optional: "Mathematics",
    attempt: 1,
    background: "B.Tech IIT Bombay (Computer Science & Engineering)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    quote: "Objectivity is the key to UPSC Mains. Write what is asked, not what you know. Keep sentences short, data-backed, and use flowcharts whenever possible to save time.",
    keyStrategy: "Scored massively in Mathematics Optional (361/500). Prepared digitally using Evernote and OneNote, categorizing notes strictly by the UPSC syllabus keywords. Focused completely on high return on investment subjects like Ethics, Essay, and Optional.",
    gsStrategy: {
      gs1: "Relied entirely on standard books. For Geography, practiced rapid map drawing for every location-based concept.",
      gs2: "Used sub-headings aggressively. Quoted specific Articles, Constitutional Amendments, and Supreme Court judgements in every answer.",
      gs3: "Treated GS3 like a technical paper. Filled answers with facts, figures, NITI Aayog data points, and block diagrams.",
      gs4: "Prepared a personal list of core values and associated them with real-life administrative examples. Kept case studies structured and purely logical."
    },
    essayStrategy: "Brainstormed for 25 minutes before starting. Focused on logical flow, transitions between paragraphs, and maintaining a balanced, optimistic tone throughout.",
    optionalStrategy: "Mathematics demands absolute rigor. Solved 15-20 years of PYQs. Made formula sheets for quick revision and practiced under strict time constraints to avoid calculation errors.",
    prelimsStrategy: "Did not over-read. Limited sources but revised them 5-6 times. Solved around 50 mock tests to develop the intuition for intelligent guessing and elimination.",
    csatStrategy: "Being from a math background, relied on natural aptitude but still practiced a few PYQs to stay in touch with the UPSC question phrasing.",
    interviewScore: 179,
    mainsScore: 942,
    goldenRules: [
      "Digital notes are easier to update, organize, and revise quickly.",
      "Mathematics optional requires solving problems with pen and paper, not just reading solutions.",
      "Focus intensely on your Optional, Essay, and Ethics—these create the rank difference.",
      "Do not try to read everything; stick to the syllabus boundaries strictly."
    ]
  }
];

export const TOPPER_BOOKS: BookItem[] = [
  // Prelims GS1 / Mains GS1
  {
    id: "polity-laxmikanth",
    title: "Indian Polity",
    authorOrPublication: "M. Laxmikanth (McGraw Hill)",
    subject: "Polity & Governance",
    paper: "Prelims GS1",
    priority: "Must Read / Core",
    recommendedBy: ["Aditya Srivastava (AIR 1)", "Ishita Kishore (AIR 1)", "Shruti Sharma (AIR 1)"],
    keyChapters: ["Fundamental Rights (Part III)", "Directive Principles (Part IV)", "Parliament & State Legislature", "Judiciary & Judicial Review", "Constitutional Bodies & Amendments"],
    tipsForReading: "Read at least 5-6 times. On first read, read like a novel. On second read, highlight articles and exceptions. Make tables for comparing President vs Governor, Lok Sabha vs Rajya Sabha.",
    status: "reading"
  },
  {
    id: "history-spectrum",
    title: "A Brief History of Modern India",
    authorOrPublication: "Rajiv Ahir (Spectrum Publications)",
    subject: "Modern Indian History",
    paper: "Prelims GS1",
    priority: "Must Read / Core",
    recommendedBy: ["Shruti Sharma (AIR 1)", "Shubham Kumar (AIR 1)", "Anudeep Durishetty (AIR 1)"],
    keyChapters: ["1857 Revolt & Socio-Religious Reforms", "National Movement (1905-1919)", "Gandhian Era (1919-1947)", "Governor Generals & Constitutional Acts", "Appendices & Personalities tables"],
    tipsForReading: "Pay special attention to the summary tables at the end of each chapter. Connect dates with socio-economic causes.",
    status: "not_started"
  },
  {
    id: "economy-mrunal-singhania",
    title: "Indian Economy / Mrunal Notes",
    authorOrPublication: "Nitin Singhania / Mrunal Patel",
    subject: "Indian Economy",
    paper: "Prelims GS1",
    priority: "Must Read / Core",
    recommendedBy: ["Aditya Srivastava (AIR 1)", "Ishita Kishore (AIR 1)"],
    keyChapters: ["Money, Banking & Monetary Policy (Pillar 1)", "Fiscal Policy, Budget & Taxation (Pillar 2)", "International Trade, BoP, Forex (Pillar 3)", "Sectors of Economy & Agriculture (Pillar 4)", "Human Development & Infrastructure"],
    tipsForReading: "Focus on conceptual clarity of inflation, repo rate, bond yields, and balance of payments. Supplement with latest Budget & Economic Survey summaries.",
    status: "not_started"
  },
  {
    id: "environment-shankar-pmf",
    title: "Environment & Ecology",
    authorOrPublication: "PMF IAS / Shankar IAS",
    subject: "Environment & Biodiversity",
    paper: "Prelims GS1",
    priority: "Must Read / Core",
    recommendedBy: ["All Toppers (High Yield ~20% of Prelims)"],
    keyChapters: ["Ecology Principles & Biogeochemical Cycles", "Biodiversity, IUCN Red List & Protected Areas", "Climate Change, UNFCCC COP summits & IPCC reports", "Environmental Laws (WPA 1972, EPA 1986, Biological Diversity Act)", "Pollution & Renewable Energy"],
    tipsForReading: "Prepare maps of National Parks, Biosphere Reserves, Ramsar Wetlands, and Tiger Reserves. Memorize IUCN status of critically endangered Indian species.",
    status: "not_started"
  },
  {
    id: "geography-ncert-gcleong",
    title: "NCERT Class 11-12 & Certificate Physical Geography",
    authorOrPublication: "NCERT (Fundamentals of Physical Geography) & G.C. Leong",
    subject: "Geography",
    paper: "Prelims GS1",
    priority: "Must Read / Core",
    recommendedBy: ["Shruti Sharma (AIR 1)", "Shubham Kumar (AIR 1)"],
    keyChapters: ["Geomorphology & Plate Tectonics", "Climatology (Monsoon, Cyclones, Jet Streams)", "Oceanography (Currents, Tides, Salinity)", "Indian Drainage System & River Basins", "Resources & Industrial Locations"],
    tipsForReading: "Geography is 100% conceptual. Draw diagrams for every landform and atmospheric phenomenon. Use Oxford Student Atlas daily.",
    status: "not_started"
  },
  {
    id: "art-culture-singhania",
    title: "Indian Art and Culture & Fine Arts NCERT Class 11",
    authorOrPublication: "Nitin Singhania & NCERT",
    subject: "Art & Culture",
    paper: "Mains GS1",
    priority: "High Yield Reference",
    recommendedBy: ["Shruti Sharma (AIR 1)", "Ishita Kishore (AIR 1)"],
    keyChapters: ["Temple Architecture (Nagara, Dravida, Vesara)", "Buddhism & Jainism Architecture & Philosophy", "Classical & Folk Dances, Music traditions", "Bhakti & Sufi Movements", "Puppetry, UNESCO Heritage Sites & Handlooms"],
    tipsForReading: "Focus on NCERT Class 11 Fine Arts first (covers 70% of questions). Use Singhania for selective tables and diagrams.",
    status: "not_started"
  },
  {
    id: "ethics-lexicon",
    title: "Lexicon for Ethics, Integrity & Aptitude",
    authorOrPublication: "Chronicle / Subba Rao & P.N. Roy",
    subject: "Ethics (GS4)",
    paper: "Mains GS4",
    priority: "Must Read / Core",
    recommendedBy: ["Aditya Srivastava (AIR 1)", "Shubham Kumar (AIR 1)"],
    keyChapters: ["Ethics & Human Interface, Essence & Determinants", "Human Values & Role of Family/Society", "Attitude, Moral & Political Attitudes", "Emotional Intelligence in Governance", "Probity in Governance & RTI Act", "Case Study Methodologies"],
    tipsForReading: "Prepare personal definitions for 30 key ethical terms. Build a template for solving case studies with 6 distinct steps.",
    status: "not_started"
  },
  {
    id: "csat-pyq-arihant",
    title: "CSAT Manual & 15-Year PYQ Compilation",
    authorOrPublication: "Arihant / Mudit Jain CSAT",
    subject: "CSAT Paper II",
    paper: "CSAT",
    priority: "Must Read / Core",
    recommendedBy: ["All Toppers"],
    keyChapters: ["Reading Comprehension (Assumptions, Inferences, Main Idea)", "Number System, Permutation & Combination, Probability", "Percentages, Profit & Loss, Ratio & Proportion", "Syllogisms, Blood Relations, Direction Sense", "Data Interpretation & Sufficiency"],
    tipsForReading: "CSAT has become the eliminator paper. Practice 30 questions weekly under strict 1-minute timer.",
    status: "not_started"
  }
];

export const TOPPER_ROUTINES: TopperRoutine[] = [
  {
    id: "routine-full-time",
    title: "The Rank 1 Ideal Full-Time Routine",
    type: "Full Time (10-12h)",
    topperRef: "Aditya Srivastava & Ishita Kishore",
    totalStudyHours: 10.5,
    wakeUpTime: "06:00 AM",
    sleepTime: "11:00 PM",
    schedule: [
      { time: "06:00 - 06:30 AM", activity: "Wake up, Hydration, Light Exercise / Yoga", category: "Break / Health", description: "Oxygenates the brain, prepares mental focus for high-load morning session." },
      { time: "06:30 - 09:00 AM", activity: "Slot 1: Heavy Static GS (Polity / Economy / History)", category: "GS", description: "2.5 hours of intense, uninterrupted conceptual reading when cognitive stamina is at peak." },
      { time: "09:00 - 09:45 AM", activity: "Nutritious Breakfast & Break", category: "Break / Health", description: "Healthy protein breakfast without screens." },
      { time: "09:45 - 11:45 AM", activity: "Slot 2: Newspaper (The Hindu / IE) + Editorial Notes", category: "Current Affairs", description: "2 hours analyzing editorials, issue-based mapping to syllabus topics." },
      { time: "11:45 - 01:45 PM", activity: "Slot 3: Optional Subject (Paper 1 / Paper 2)", category: "Optional", description: "2 hours dedicated to Optional theory, PYQ mapping and thinker integration." },
      { time: "01:45 - 02:45 PM", activity: "Lunch & 20-min Power Nap", category: "Break / Health", description: "Resets afternoon alertness." },
      { time: "02:45 - 04:30 PM", activity: "Slot 4: Optional Notes / Numerical / Diagrams", category: "Optional", description: "1.75 hours consolidations and micro-diagram practice." },
      { time: "04:30 - 05:00 PM", activity: "Tea break & Quick Walk", category: "Break / Health", description: "Physical break to prevent eye strain." },
      { time: "05:00 - 06:30 PM", activity: "Slot 5: CSAT / Prelims 30 MCQs Practice", category: "CSAT / Revision", description: "Active recall testing with negative marks calculation." },
      { time: "06:30 - 08:00 PM", activity: "Slot 6: Mains Answer Writing (2 GS + 1 Optional Question)", category: "Answer Writing", description: "Strict 7-min and 11-min timed answer writing with peer/mentor evaluation." },
      { time: "08:00 - 09:00 PM", activity: "Dinner & Family Time", category: "Break / Health", description: "Social connection and relaxation." },
      { time: "09:00 - 10:30 PM", activity: "Slot 7: Spaced Revision of Day's Topics + Plan Next Day", category: "CSAT / Revision", description: "1.5 hours reviewing day's notes so retention jumps to 80%." },
      { time: "10:30 - 11:00 PM", activity: "Wind Down & Sleep", category: "Break / Health", description: "7 hours of restorative sleep." }
    ],
    tips: [
      "Keep phone in another room during study slots.",
      "Use Pomodoro 50 min study + 10 min break technique.",
      "Never skip the night revision slot—it determines long-term memory."
    ]
  },
  {
    id: "routine-working-professional",
    title: "Working Professional Smart 6-Hour Routine",
    type: "Working Professional (5-6h)",
    topperRef: "Anudeep Durishetty (IRS to IAS Rank 1) & Aditya Srivastava (IPS to IAS)",
    totalStudyHours: 5.5,
    wakeUpTime: "05:15 AM",
    sleepTime: "11:15 PM",
    schedule: [
      { time: "05:30 - 08:00 AM", activity: "Slot 1 (Pre-Office): Deep Static GS / Optional", category: "GS", description: "2.5 hours of golden undisturbed morning study before workday begins." },
      { time: "08:00 - 09:00 AM", activity: "Commute / Breakfast: Audio Current Affairs / Podcasts", category: "Current Affairs", description: "Listen to Sansad TV / All India Radio discussions during travel." },
      { time: "01:00 - 01:45 PM", activity: "Office Lunch Break: Digital Newspaper Editorials", category: "Current Affairs", description: "45 mins reading The Hindu / Indian Express on tablet/laptop." },
      { time: "07:30 - 09:30 PM", activity: "Slot 2 (Post-Office): Optional Subject / Answer Writing", category: "Optional", description: "2 hours high-intensity study." },
      { time: "09:30 - 10:15 PM", activity: "Dinner & Refreshment", category: "Break / Health", description: "Relaxation with family." },
      { time: "10:15 - 11:15 PM", activity: "Slot 3: Daily MCQs / Spaced Revision", category: "CSAT / Revision", description: "1 hour quick-fire 25 MCQs and revision before bed." },
      { time: "Weekends (Sat & Sun)", activity: "10-Hour Supercharge Weekend Sprints", category: "GS", description: "Catch up on full-length mock tests, essay writing, and weekly revision." }
    ],
    tips: [
      "Weekend utilization is your secret weapon: log 20+ hours across Sat & Sun.",
      "Digitize notes on Evernote/Notion for seamless access during office breaks.",
      "Cut down low-value social media scrolling entirely."
    ]
  },
  {
    id: "routine-prelims-sprint",
    title: "Last 60 Days Prelims War-Footing Routine",
    type: "Prelims Sprint (Last 60 Days)",
    topperRef: "Ishita Kishore & Shubham Kumar",
    totalStudyHours: 11.0,
    wakeUpTime: "06:30 AM",
    sleepTime: "11:30 PM",
    schedule: [
      { time: "07:00 - 09:00 AM", activity: "Subject 1 Fast Revision (Polity / Economy / Env)", category: "GS", description: "High-speed notes flipping with active recall." },
      { time: "09:30 - 11:30 AM", activity: "Full Length Prelims Mock Test (GS Paper 1)", category: "CSAT / Revision", description: "Strictly simulated 2-hour exam under real conditions with OMR sheet." },
      { time: "11:45 - 01:45 PM", activity: "Mock Test In-Depth 360° Post-Mortem", category: "CSAT / Revision", description: "Analyze every incorrect question and identify knowledge gap vs silly mistake." },
      { time: "02:30 - 04:30 PM", activity: "CSAT Full Length Mock Test / Quant-Logic Sprint", category: "CSAT / Revision", description: "Simulating CSAT during actual 2:30 PM exam slot to train circadian rhythm." },
      { time: "05:00 - 07:30 PM", activity: "Yearly Current Affairs Compilation (PT 365 / Annual Digest)", category: "Current Affairs", description: "Mapped to environment, sci-tech, and government schemes." },
      { time: "08:30 - 10:30 PM", activity: "UPSC 10-Year PYQ Option Elimination Practice", category: "CSAT / Revision", description: "Mastering UPSC question patterns and intuition." },
      { time: "10:30 - 11:30 PM", activity: "Mistake Diary Review", category: "CSAT / Revision", description: "Reading only your personal mistake notebook." }
    ],
    tips: [
      "Shift sleep cycle to match 09:30 AM - 11:30 AM and 02:30 PM - 04:30 PM alertness.",
      "Do not read any new reference books in the last 60 days.",
      "Focus 70% time on testing & mistake correction."
    ]
  }
];

export const TOPPER_NOTES_VAULT: NoteItem[] = [
  {
    id: "note-pestle-framework",
    title: "Universal PESTLE & 360° Mains Framework",
    subject: "General Studies 1, 2, 3 & Essay",
    paper: "All GS Papers",
    topperSource: "Aditya Srivastava (AIR 1)",
    type: "Framework / Template",
    summary: "When stuck on any broad 15-marker UPSC question, use the PESTLE framework to instantly generate 6 distinct dimensions with 3 points each.",
    keyPoints: [
      "P - Political / Constitutional (Articles, Federal balance, Democratic institutions)",
      "E - Economic (GDP impact, fiscal burden, MSMEs, job creation, trade balance)",
      "S - Social / Cultural (Vulnerable sections, gender equity, tribal rights, demographic dividend)",
      "T - Technological (Digital public infra, AI, cybersecurity, R&D spend)",
      "L - Legal / Statutory (Enabling acts, judicial precedents, enforcement loopholes)",
      "E - Environmental / Ecological (Carbon emissions, biodiversity, disaster resilience)"
    ],
    diagramDescription: "A circular 6-spoke hub with Core Problem in center and 6 PESTLE nodes radiating outward.",
    svgDiagramType: "pestle"
  },
  {
    id: "note-sc-verdicts-gs2",
    title: "Top 25 Landmark Supreme Court Judgements Cheatsheet",
    subject: "Indian Polity & Constitution",
    paper: "Mains GS2",
    topperSource: "Ishita Kishore (AIR 1)",
    type: "Supreme Court Verdicts",
    summary: "High-yield ready-to-cite SC rulings to substantiate GS2 answers and fetch bonus marks.",
    keyPoints: [
      "Kesavananda Bharati (1973): Basic Structure Doctrine limitation on amending power.",
      "Minerva Mills (1980): Harmony and balance between Fundamental Rights & DPSPs.",
      "K.S. Puttaswamy (2017): Right to Privacy as a fundamental right under Article 21.",
      "Navtej Johar (2018): Decriminalization of Section 377; Constitutional Morality principle.",
      "Shayara Bano (2017): Triple Talaq struck down as arbitrary and violative of Article 14.",
      "S.R. Bommai (1994): Federalism as basic structure; checks on Article 356 misuse.",
      "Prakash Singh (2006): Police reforms guidelines and state security commission.",
      "Lily Thomas (2013): Immediate disqualification of convicted MPs/MLAs.",
      "Association for Democratic Reforms (2002): Citizens' right to know candidates' criminal antecedents."
    ],
    svgDiagramType: "constitution-flow"
  },
  {
    id: "note-ethics-matrix",
    title: "GS4 7-Step Case Study Resolution Matrix",
    subject: "Ethics, Integrity & Aptitude",
    paper: "Mains GS4",
    topperSource: "Shubham Kumar (AIR 1)",
    type: "Framework / Template",
    summary: "Standardized framework to score 120+ in GS4 Case Studies without getting lost in emotional tangents.",
    keyPoints: [
      "Step 1: Stakeholder Identification (Direct: DC, Victims, Accused; Indirect: Public trust, Rule of law).",
      "Step 2: Ethical Dilemmas at Stake (e.g. Public duty vs Personal loyalty; Short-term peace vs Long-term justice).",
      "Step 3: Applicable Constitutional & Ethical Principles (Nolan Principles, Utilitarianism, Deontology, Social Justice).",
      "Step 4: Evaluation of Options (Option 1: Inaction/Compromise; Option 2: Extreme strictness; Option 3: Balanced holistic action).",
      "Step 5: Justification of Chosen Course of Action (Merits over Demerits with legal backing).",
      "Step 6: Step-by-Step Implementation Roadmap (Immediate relief, administrative inquiry, institutional reform).",
      "Step 7: Long-Term Preventive Vision (Sensitization, SOP formulation, community engagement)."
    ],
    svgDiagramType: "ethics-matrix"
  },
  {
    id: "note-economy-growth-cycle",
    title: "Virtuous Cycle of Investment & Economic Growth",
    subject: "Indian Economy & Infrastructure",
    paper: "Mains GS3",
    topperSource: "Aditya Srivastava (AIR 1)",
    type: "Diagram / Mindmap",
    summary: "Economic Survey standard model diagram that should be drawn for questions on Capital Expenditure, Manufacturing, and Viksit Bharat 2047.",
    keyPoints: [
      "Public Capital Expenditure (Capex) in Infrastructure ->",
      "Crowding-in of Private Investment ->",
      "Job Creation & Increased Household Disposable Income ->",
      "Boost in Aggregate Demand ->",
      "Capacity Utilization Expansion -> Higher Corporate Revenues & Tax Collections ->",
      "Fiscal Consolidation and Sustained GDP Growth Cycle."
    ],
    svgDiagramType: "economy-cycle"
  }
];

export const TOPPER_INTERVIEWS: InterviewTranscript[] = [
  {
    id: "interview-aditya",
    candidateName: "Aditya Srivastava",
    year: 2023,
    rank: 1,
    boardChairperson: "Manoj Soni Board",
    score: 200,
    durationMinutes: 32,
    background: "B.Tech Electrical Engg IIT Kanpur, Ex-IPS Probationer",
    dafHighlights: ["IIT Kanpur Electrical Engg", "Goldman Sachs work experience", "IPS Training at SVPNPA Hyderabad", "Swimming & Reading non-fiction"],
    qaExcerpts: [
      {
        question: "You are already in the Indian Police Service (IPS). Why do you want to switch to the Indian Administrative Service (IAS)? Isn't IPS impactful enough?",
        askedBy: "Chairperson",
        answer: "Sir, IPS provides an unparalleled opportunity to enforce the rule of law, internal security, and direct citizen protection. However, IAS provides a broader multi-sectoral platform spanning policy formulation in health, education, infrastructure, and rural development. My technical background in engineering and administrative training in IPS will synergistically allow me to contribute across broader socio-economic domains.",
        analysis: "Balanced, highly respectful to IPS, highlighted synergy rather than downplaying the current service."
      },
      {
        question: "As an electrical engineer, how would you address India's DISCOM debt crisis without compromising green energy transition targets?",
        askedBy: "Member 1 (Technical)",
        answer: "Sir, the DISCOM crisis is structural (AT&C losses, delayed subsidy payouts, and under-cost tariffs). The solution requires: 1) 100% smart prepaid metering under RDSS scheme to plug billing leakages; 2) Enforcing Cost-Reflective Tariffs with direct benefit transfer (DBT) of power subsidies; 3) Grid-scale battery energy storage systems (BESS) to integrate intermittent renewables without grid collapse.",
        analysis: "Structured, technical yet administrative, directly cited schemes (RDSS) and actionable fixes."
      },
      {
        question: "What is your stance on the regulation of Generative AI in governance? Should India adopt an EU-style strict regulatory model or an innovation-first US model?",
        askedBy: "Member 3",
        answer: "India should adopt a hybrid 'Risk-Based Light-Touch' regulatory approach. For critical public services like healthcare diagnostics, biometric identity, and law enforcement, strict algorithmic auditing and data privacy (DPDP Act) are essential. For commercial innovation and MSMEs, regulatory sandboxes should allow fast prototyping without strangling growth.",
        analysis: "Nuanced, avoided extreme black-and-white positions, linked to Indian statutory context (DPDP Act)."
      }
    ],
    keyTakeaways: [
      "Never show arrogance about prior selection or elite college credentials.",
      "Acknowledge what you do not know with a polite 'Sir, I am unable to recall at this moment'.",
      "Always suggest practical, balanced, and constitutionally grounded solutions."
    ]
  },
  {
    id: "interview-ishita",
    candidateName: "Ishita Kishore",
    year: 2022,
    rank: 1,
    boardChairperson: "Preeti Sudan Board",
    score: 193,
    durationMinutes: 30,
    background: "SRCC Economics, National Level Football Player",
    dafHighlights: ["SRCC Economics Graduate", "Subroto Cup Football Player", "PSIR Optional", "Volunteering with CRY"],
    qaExcerpts: [
      {
        question: "You played national-level football. What leadership lessons from the football field apply directly to managing a district as a District Magistrate?",
        askedBy: "Chairperson",
        answer: "Ma'am, football taught me three foundational principles: 1) Role Clarity and Team Synergy—a striker cannot score without a dependable defense; in a district, the DM is only as good as the BDOs, Tehsildars, and field staff; 2) High-pressure tactical adaptability—when a strategy fails in the second half, you pivot instantly without panic; 3) Uncompromising sportsmanship and adherence to rules.",
        analysis: "Deeply authentic, linked physical sport to district administration hierarchy seamlessly."
      },
      {
        question: "India's female labor force participation rate (FLFPR) has seen challenges. As an economist and administrator, what single intervention would you prioritize?",
        askedBy: "Member 2 (Economic)",
        answer: "While skilling and maternity benefits are crucial, the single most transformative intervention is providing safe, reliable, and subsidized public transportation and care infrastructure (creches). Women's mobility directly determines their access to formal sector jobs and educational hubs.",
        analysis: "Identified a structural root enabler (mobility & care economy) rather than generic platitudes."
      }
    ],
    keyTakeaways: [
      "Connect personal hobbies and sports naturally to public governance values.",
      "Maintain a warm, pleasant, and confident smile throughout the interview.",
      "Show empathy for vulnerable sections in all policy answers."
    ]
  }
];
