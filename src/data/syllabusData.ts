import { SyllabusTopic, StudyPlanPhase } from "../types";

export const DEFAULT_SYLLABUS: SyllabusTopic[] = [
  // --- PRELIMS GS1 ---
  {
    id: "p1-polity-const",
    paper: "Prelims GS1",
    subject: "Indian Polity & Governance",
    module: "Constitutional Framework & Fundamental Rights",
    title: "Preamble, Fundamental Rights, DPSPs & Fundamental Duties",
    yield: "🔥 High Yield",
    weightagePercentage: 17.5,
    pyqFrequencyLast5Years: 28,
    status: "in_progress",
    notes: "Revise Article 14-32 exceptions and Kesavananda basic structure test.",
    subtopics: [
      "Historical Background (Acts of 1773 to 1947)",
      "Preamble & Salient Features of the Constitution",
      "Union and its Territory (Articles 1-4)",
      "Citizenship & CAA Provisions (Articles 5-11)",
      "Fundamental Rights (Articles 12-35) & Writs",
      "Directive Principles of State Policy (Articles 36-51)",
      "Fundamental Duties (Article 51A)",
      "Amendment of the Constitution (Article 368) & Basic Structure"
    ]
  },
  {
    id: "p1-polity-system",
    paper: "Prelims GS1",
    subject: "Indian Polity & Governance",
    module: "Executive, Legislature & Judiciary",
    title: "Parliament, President, Governor, Supreme Court & High Courts",
    yield: "🔥 High Yield",
    weightagePercentage: 16.0,
    pyqFrequencyLast5Years: 24,
    status: "not_started",
    notes: "Comparison tables between President & Governor pardoning powers.",
    subtopics: [
      "President, Vice-President & Governor (Powers, Election, Discretion)",
      "Prime Minister, Chief Minister & Council of Ministers",
      "Parliament: Sessions, Bills, Motions, Committees, Budgetary Procedure",
      "State Legislatures & Legislative Councils",
      "Supreme Court & High Courts: Jurisdiction, Appointments, Collegium, NJAC",
      "Subordinate Courts & Tribunals (Articles 323A, 323B)",
      "Panchayati Raj (73rd Amendment) & Municipalities (74th Amendment)",
      "Constitutional & Non-Constitutional Bodies (ECI, CAG, UPSC, Finance Commission, CBI, ED)"
    ]
  },
  {
    id: "p1-hist-modern",
    paper: "Prelims GS1",
    subject: "History of India",
    module: "Modern Indian History & Freedom Struggle",
    title: "Socio-Religious Movements, National Struggle (1857-1947)",
    yield: "🔥 High Yield",
    weightagePercentage: 12.0,
    pyqFrequencyLast5Years: 19,
    status: "in_progress",
    notes: "Chronology of Gandhi's Satyagrahas and Governor Generals' acts.",
    subtopics: [
      "Decline of Mughals & Advent of European Powers",
      "British Expansion Policies: Subsidiary Alliance, Doctrine of Lapse",
      "1857 Revolt: Causes, Leaders, Nature, and Aftermath",
      "Socio-Religious Reform Movements (Brahmo Samaj, Arya Samaj, Aligarh Movement)",
      "Early Phase of INC, Moderates vs Extremists, Surat Split (1907)",
      "Swadeshi Movement, Home Rule League, Revolutionary Nationalism",
      "Gandhian Phase: Non-Cooperation, Civil Disobedience, Quit India",
      "Constitutional Developments (Morley-Minto, Montagu-Chelmsford, 1935 Act, Cabinet Mission)"
    ]
  },
  {
    id: "p1-hist-ancient-med",
    paper: "Prelims GS1",
    subject: "History of India",
    module: "Ancient & Medieval India",
    title: "Indus Valley, Vedic Age, Mauryan/Gupta Empires, Delhi Sultanate & Mughals",
    yield: "⭐ Medium Yield",
    weightagePercentage: 6.5,
    pyqFrequencyLast5Years: 11,
    status: "not_started",
    notes: "Terms used for land revenue, administrative posts, and foreign travelers.",
    subtopics: [
      "Stone Age & Indus Valley Civilization sites and urban planning",
      "Vedic Period: Early & Later Vedic society and literature",
      "Buddhism and Jainism: Doctrines, Councils, Sects, Literature",
      "Mauryan Empire, Ashokan Edicts and Administration",
      "Gupta Empire (Golden Age) & Post-Gupta Harsha/Southern Kingdoms (Cholas, Pallavas)",
      "Delhi Sultanate: Administration, Iqta system, Architecture",
      "Mughal Empire: Mansabdari system, Akbar's policies, Jagirdari crisis",
      "Vijayanagara & Bahmani Empires: Foreign accounts and Nayankara system"
    ]
  },
  {
    id: "p1-econ-core",
    paper: "Prelims GS1",
    subject: "Economic & Social Development",
    module: "Macroeconomics, Money & Banking",
    title: "Monetary Policy, Inflation, Banking System & Fiscal Policy",
    yield: "🔥 High Yield",
    weightagePercentage: 15.0,
    pyqFrequencyLast5Years: 25,
    status: "not_started",
    notes: "Bond yield relationships, Repo/Reverse Repo mechanics, and CAD dynamics.",
    subtopics: [
      "National Income Accounting: GDP, GNI, Real vs Nominal, Deflator",
      "Money Supply (M0 to M3), High-Powered Money, Money Multiplier",
      "RBI Monetary Policy Instruments (Repo, SDF, CRR, SLR, OMO)",
      "Inflation Types, CPI vs WPI, Cost-push vs Demand-pull, Deflation",
      "Banking System: Commercial Banks, NPA Resolution (IBC, Bad Bank), PCA Framework",
      "Government Budgeting: Revenue/Capital Accounts, Fiscal Deficit, FRBM Act",
      "Taxation: Direct vs Indirect Taxes, GST Council, Base Erosion and Profit Shifting (BEPS)",
      "External Sector: Balance of Payments (BoP), Current Account Deficit, NEER/REER, Forex Reserves"
    ]
  },
  {
    id: "p1-env-biodiv",
    paper: "Prelims GS1",
    subject: "Environment & Ecology",
    module: "Biodiversity, Conservation & Protected Areas",
    title: "Ecosystems, Protected Area Network, Wildlife Acts & IUCN Status",
    yield: "🔥 High Yield",
    weightagePercentage: 18.0,
    pyqFrequencyLast5Years: 31,
    status: "not_started",
    notes: "National Parks along river basins, Tiger corridors, and Biosphere zonation.",
    subtopics: [
      "Ecology Fundamentals: Food Webs, Trophic Levels, Ecological Pyramids, Succession",
      "Biomes & Ecosystems: Mangroves, Coral Reefs, Wetlands (Ramsar Convention)",
      "Biodiversity Hotspots in India & Protected Areas (National Parks, Sanctuaries, Biosphere Reserves)",
      "Key Endangered Indian Species & IUCN Red List status (Great Indian Bustard, Hangul, Snow Leopard)",
      "Wildlife Protection Act 1972 (Schedules), Forest Conservation Act, Biological Diversity Act",
      "Climate Change: Greenhouse Effect, Global Warming, UNFCCC COP 28/29 decisions",
      "Pollution: Air Quality Index (AQI), Particulate Matter, Photochemical Smog, Plastic Waste Rules",
      "Renewable Energy: Solar Alliance (ISA), Green Hydrogen Mission, Biofuels Policy"
    ]
  },
  {
    id: "p1-geo-physical",
    paper: "Prelims GS1",
    subject: "Geography",
    module: "Physical, Indian & World Geography",
    title: "Geomorphology, Climatology, Oceanography & Indian Physical Features",
    yield: "⭐ Medium Yield",
    weightagePercentage: 9.0,
    pyqFrequencyLast5Years: 16,
    status: "not_started",
    notes: "Map plotting of major straits, mountain passes, and river tributaries.",
    subtopics: [
      "Interior of the Earth, Plate Tectonics, Earthquakes, Volcanoes, Landforms",
      "Atmospheric Composition, Pressure Belts, Planetary Winds, Monsoons, Cyclones",
      "Ocean Relief, Ocean Currents, Salinity, Waves and Tides, Coral Bleaching",
      "Physiography of India: Himalayas, Northern Plains, Peninsular Plateau, Coastal Plains",
      "Indian Drainage System: Himalayan Rivers vs Peninsular Rivers and Tributaries",
      "Climatic Zones of India, Natural Vegetation and Soil Types",
      "World Geography: Important Seas, Straits, Deserts, Mining and Industrial Regions",
      "Mineral and Energy Resources distribution in India"
    ]
  },
  {
    id: "p1-csat-quant",
    paper: "Prelims CSAT",
    subject: "CSAT Paper II",
    module: "Quantitative Aptitude & Logical Reasoning",
    title: "Number System, Arithmetic, Combinatorics & Logic Syllogisms",
    yield: "🔥 High Yield",
    weightagePercentage: 60.0,
    pyqFrequencyLast5Years: 50,
    status: "not_started",
    notes: "CSAT requires 33% (66 marks out of 200). Practice high-yield topics first.",
    subtopics: [
      "Number System: Divisibility, Remainder Theorem, Unit Digit, Prime Numbers",
      "Permutation & Combination, Probability basics",
      "Percentages, Profit & Loss, Simple & Compound Interest",
      "Ratio, Proportion & Variation, Mixtures and Alligations",
      "Time, Speed and Distance, Trains, Boats & Streams",
      "Time and Work, Pipes and Cisterns",
      "Logical Syllogisms, Blood Relations, Direction Sense, Seating Arrangements",
      "Data Interpretation (Tables, Bar Charts, Pie Charts) & Data Sufficiency"
    ]
  },
  {
    id: "p1-csat-rc",
    paper: "Prelims CSAT",
    subject: "CSAT Paper II",
    module: "Reading Comprehension",
    title: "Critical Inferences, Crucial Assumptions, Main Idea & Tone",
    yield: "🔥 High Yield",
    weightagePercentage: 40.0,
    pyqFrequencyLast5Years: 30,
    status: "not_started",
    notes: "Beware of extreme words: 'only', 'never', 'solely', 'drastic reduction'.",
    subtopics: [
      "Identifying the Central Theme / Crux of the Passage",
      "Critical Inferences and Logical Corollaries",
      "Crucial Assumptions underlying Author's Arguments",
      "Identifying Tone and Purpose of the Author",
      "Eliminating Out-of-Scope and Extreme answer choices"
    ]
  },

  // --- MAINS GS PAPERS ---
  {
    id: "m-gs1-art-society",
    paper: "Mains GS1",
    subject: "GS Paper 1",
    module: "Art, Culture & Indian Society",
    title: "Salient Aspects of Art & Architecture, Diversity of India, Women's Issues & Urbanization",
    yield: "⭐ Medium Yield",
    weightagePercentage: 35.0,
    pyqFrequencyLast5Years: 12,
    status: "not_started",
    notes: "Link societal challenges with NFHS-5, Census and sociological perspectives.",
    subtopics: [
      "Indian Art Forms, Literature & Architecture from Ancient to Modern times",
      "Salient features of Indian Society, Diversity of India (Caste, Language, Religion)",
      "Role of Women and Women's Organizations, Population & Associated issues",
      "Poverty & Developmental issues, Urbanization: Problems and remedies",
      "Effects of Globalization on Indian Society & Culture",
      "Social Empowerment, Communalism, Regionalism & Secularism"
    ]
  },
  {
    id: "m-gs2-gov-ir",
    paper: "Mains GS2",
    subject: "GS Paper 2",
    module: "Governance, Constitution, Polity, Social Justice & IR",
    title: "Federalism, Separation of Powers, Welfare Schemes, Citizen Charters & International Relations",
    yield: "🔥 High Yield",
    weightagePercentage: 100.0,
    pyqFrequencyLast5Years: 20,
    status: "not_started",
    notes: "Always quote Supreme Court verdicts, 2nd ARC and Law Commission recommendations.",
    subtopics: [
      "Indian Constitution: Historical underpinnings, Evolution, Features, Amendments, Basic Structure",
      "Functions and responsibilities of the Union and the States: Issues pertaining to Federal structure",
      "Separation of powers between various organs, Dispute redressal mechanisms and institutions",
      "Comparison of the Indian constitutional scheme with that of other countries",
      "Parliament and State Legislatures: Structure, functioning, conduct of business, powers & privileges",
      "Structure, organization and functioning of the Executive and the Judiciary: PIL, Judicial Overreach",
      "Welfare schemes for vulnerable sections: Mechanism, laws, institutions & Bodies constituted",
      "Issues relating to development and management of Social Sector/Services: Health, Education, Human Resources",
      "Important aspects of Governance: Transparency, Accountability, e-governance, Citizen Charters",
      "India and its Neighborhood- Relations, Bilateral, Regional and Global groupings (Quad, BRICS, G20)"
    ]
  },
  {
    id: "m-gs3-econ-tech-sec",
    paper: "Mains GS3",
    subject: "GS Paper 3",
    module: "Economy, Science & Tech, Environment & Internal Security",
    title: "Inclusive Growth, Agriculture Subsidies, Cyber Security, Border Management & Disaster Response",
    yield: "🔥 High Yield",
    weightagePercentage: 100.0,
    pyqFrequencyLast5Years: 20,
    status: "not_started",
    notes: "Utilize NITI Aayog documents, economic diagrams, and disaster management flowcharts.",
    subtopics: [
      "Indian Economy and issues relating to planning, mobilization of resources, growth & employment",
      "Inclusive growth and issues arising from it: Financial Inclusion, PMJDY, UPI",
      "Government Budgeting and Fiscal consolidation",
      "Major crops cropping patterns, different types of irrigation, storage, transport and marketing of agricultural produce",
      "Direct and indirect farm subsidies and minimum support prices (MSP), PDS, buffer stocks, food security",
      "Science and Technology: Developments and their applications (AI, Quantum, Biotechnology, Space)",
      "Conservation, environmental pollution and degradation, environmental impact assessment (EIA)",
      "Disaster and disaster management (NDMA guidelines, Sendai Framework, Early Warning)",
      "Linkages between development and spread of extremism (LWE / Naxalism)",
      "Role of external state and non-state actors in creating challenges to internal security",
      "Challenges to internal security through communication networks, role of media & social networking, Cyber security",
      "Security challenges and their management in border areas; linkages of organized crime with terrorism"
    ]
  },
  {
    id: "m-gs4-ethics",
    paper: "Mains GS4",
    subject: "GS Paper 4",
    module: "Ethics, Integrity & Aptitude",
    title: "Ethics in Human Action, Emotional Intelligence, Moral Thinkers, Probity & Case Studies",
    yield: "🔥 High Yield",
    weightagePercentage: 100.0,
    pyqFrequencyLast5Years: 20,
    status: "not_started",
    notes: "Prepare 50 real civil service examples and standard 7-step case study approach.",
    subtopics: [
      "Ethics and Human Interface: Essence, determinants and consequences of Ethics in human actions",
      "Human Values: Lessons from the lives and teachings of great leaders, reformers and administrators",
      "Attitude: Content, structure, function; its influence and relation with thought and behaviour; moral and political attitudes",
      "Aptitude and foundational values for Civil Service: Integrity, impartiality, objectivity, dedication to public service, empathy",
      "Emotional intelligence: Concepts, and their utilities and application in administration and governance",
      "Contributions of moral thinkers and philosophers from India and world (Kautilya, Gandhi, Kant, Mill, Aristotle)",
      "Public/Civil service values and Ethics in Public administration: Status, dilemmas, laws, codes of conduct, citizen charters",
      "Probity in Governance: Concept of public service, philosophical basis of governance and probity, RTI, Code of Ethics, Citizen Charters, Work culture",
      "Case Studies on above issues covering administrative dilemmas, corruption, mob violence, disaster crisis"
    ]
  }
];

export const DEFAULT_STUDY_PLAN_PHASES: StudyPlanPhase[] = [
  {
    id: "phase-1-foundation",
    phaseName: "Phase 1: Foundation & NCERTs (Months 1-3)",
    durationMonths: "June - August",
    focusArea: "NCERT Class 6-12 basics + Core static conceptual reading + Newspaper habit",
    status: "completed",
    milestones: [
      { id: "m1", title: "Complete NCERT Class 9-12 for Geography & Polity", targetDate: "2026-06-30", completed: true },
      { id: "m2", title: "Finish Class 11 Fine Arts & Spectrum Modern History (1st Reading)", targetDate: "2026-07-25", completed: true },
      { id: "m3", title: "Establish daily 2-hour newspaper and editorial note-making habit", targetDate: "2026-08-15", completed: true }
    ]
  },
  {
    id: "phase-2-core-optional",
    phaseName: "Phase 2: Core GS Mastery & Optional Subject (Months 4-7)",
    durationMonths: "September - December",
    focusArea: "Polity (Laxmikanth), Economy (Mrunal/Singhania), Environment (PMF), and 100% Optional Paper 1 & 2",
    status: "in_progress",
    milestones: [
      { id: "m4", title: "Complete M. Laxmikanth with personal tables & article index", targetDate: "2026-09-30", completed: true },
      { id: "m5", title: "Finish Optional Subject Paper 1 syllabus & prepare short notes", targetDate: "2026-10-31", completed: true },
      { id: "m6", title: "Finish Indian Economy concepts + Environment core modules", targetDate: "2026-11-30", completed: false },
      { id: "m7", title: "Finish Optional Paper 2 and solve 5 years PYQs", targetDate: "2026-12-31", completed: false }
    ]
  },
  {
    id: "phase-3-mains-writing",
    phaseName: "Phase 3: Mains GS 1-4 Consolidation & Ethics (Months 8-9)",
    durationMonths: "January - February",
    focusArea: "Ethics Lexicon + 50 Case studies + GS2/GS3 value addition + Daily 2-answer writing",
    status: "upcoming",
    milestones: [
      { id: "m8", title: "Master GS4 Ethics definitions, thinkers, and write 30 case studies", targetDate: "2027-01-31", completed: false },
      { id: "m9", title: "Create 1-page cheatsheets for all GS2 & GS3 micro-topics", targetDate: "2027-02-15", completed: false },
      { id: "m10", title: "Write 6 full-length GS sectional tests with peer evaluation", targetDate: "2027-02-28", completed: false }
    ]
  },
  {
    id: "phase-4-prelims-sprint",
    phaseName: "Phase 4: Prelims Intensive Mock & PYQ Sprint (Months 10-12)",
    durationMonths: "March - May",
    focusArea: "45 Full Prelims Mocks + 20 CSAT Mocks + PT 365 Yearly Compilations + Spaced Revision",
    status: "upcoming",
    milestones: [
      { id: "m11", title: "Solve 10 years UPSC Prelims PYQs twice with option elimination notes", targetDate: "2027-03-31", completed: false },
      { id: "m12", title: "Achieve consistent 100+ score in GS1 and 80+ in CSAT full tests", targetDate: "2027-04-30", completed: false },
      { id: "m13", title: "3 rounds of static revision (Polity, Economy, Env, History, Geo)", targetDate: "2027-05-20", completed: false }
    ]
  }
];

export const DEFAULT_STUDY_PLAN = DEFAULT_STUDY_PLAN_PHASES;

