import { CutoffBenchmark, MockTestLog, WeakAreaItem, TimeVsWeightageGap, RevisionItem, GapAnalysisMetric } from "../types";

export const HISTORICAL_CUTOFFS: CutoffBenchmark[] = [
  {
    year: 2024,
    examStage: "Prelims (GS1 /200)",
    generalCutoff: 75.41,
    obcCutoff: 74.75,
    ewsCutoff: 68.02,
    scCutoff: 59.25,
    stCutoff: 47.82,
    prelimsGeneral: 75.41,
    mainsGeneral: 745,
    finalGeneral: 960,
    rank1Marks: 1099
  },
  {
    year: 2023,
    examStage: "Prelims (GS1 /200)",
    generalCutoff: 75.41,
    obcCutoff: 74.75,
    ewsCutoff: 68.02,
    scCutoff: 59.25,
    stCutoff: 47.82,
    prelimsGeneral: 75.41,
    mainsGeneral: 741,
    finalGeneral: 953,
    rank1Marks: 1083
  },
  {
    year: 2022,
    examStage: "Prelims (GS1 /200)",
    generalCutoff: 88.22,
    obcCutoff: 87.54,
    ewsCutoff: 82.83,
    scCutoff: 74.08,
    stCutoff: 69.35,
    prelimsGeneral: 88.22,
    mainsGeneral: 748,
    finalGeneral: 960,
    rank1Marks: 1094
  },
  {
    year: 2021,
    examStage: "Prelims (GS1 /200)",
    generalCutoff: 87.54,
    obcCutoff: 84.85,
    ewsCutoff: 80.14,
    scCutoff: 75.41,
    stCutoff: 70.71,
    prelimsGeneral: 87.54,
    mainsGeneral: 745,
    finalGeneral: 953,
    rank1Marks: 1079
  },
  {
    year: 2020,
    examStage: "Prelims (GS1 /200)",
    generalCutoff: 92.51,
    obcCutoff: 89.12,
    ewsCutoff: 77.55,
    scCutoff: 74.84,
    stCutoff: 68.71,
    prelimsGeneral: 92.51,
    mainsGeneral: 736,
    finalGeneral: 944,
    rank1Marks: 1054
  }
];

export const DEFAULT_MOCKS: MockTestLog[] = [
  {
    id: "mock-1",
    testSeriesName: "Vision IAS All India FLT 1",
    date: "2026-08-10",
    type: "Prelims GS1",
    totalMarks: 200,
    marksObtained: 84.5,
    cutoffScore: 78.0,
    questionsAttempted: 88,
    correctCount: 52,
    incorrectCount: 36,
    accuracyRate: 59.1,
    analysisNotes: "Too many negative marks (-24 marks loss) due to wild guesses in Ancient History & Science Tech. Polity & Economy accuracy was 82%."
  },
  {
    id: "mock-2",
    testSeriesName: "ForumIAS SFG Comprehensive Test",
    date: "2026-08-15",
    type: "Prelims GS1",
    totalMarks: 200,
    marksObtained: 96.0,
    cutoffScore: 78.0,
    questionsAttempted: 82,
    correctCount: 56,
    incorrectCount: 26,
    accuracyRate: 68.3,
    analysisNotes: "Disciplined elimination technique improved score. Environment National Parks need map revision."
  },
  {
    id: "mock-3",
    testSeriesName: "Insights IAS CSAT Diagnostic Test",
    date: "2026-08-20",
    type: "Prelims CSAT",
    totalMarks: 200,
    marksObtained: 72.5,
    cutoffScore: 66.0,
    questionsAttempted: 45,
    correctCount: 33,
    incorrectCount: 12,
    accuracyRate: 73.3,
    analysisNotes: "Close to danger line for CSAT! Spent too much time on long Permutation questions. Reading Comprehension accuracy was good (85%)."
  }
];

export const DEFAULT_MOCK_LOGS = DEFAULT_MOCKS;

export const DEFAULT_WEAK_AREAS: WeakAreaItem[] = [
  {
    id: "weak-1",
    subject: "CSAT Paper II",
    topic: "Permutation, Combination & Number System",
    paper: "Prelims CSAT",
    severity: "Critical",
    rootCause: "Spending 4+ minutes per problem without quick formula application. Low accuracy (45%) on remainder theorem questions.",
    recommendedAction: "Practice 15 number system questions daily with timer. Focus on unit digits and divisibility shortcuts.",
    priorityBook: "CSAT Manual (Arihant) / Mudit Jain CSAT",
    pyqPracticeCountNeeded: 40,
    accuracyInMocks: 42,
    estimatedMarkLoss: 12.5,
    recommendedPYQCount: 35,
    failedQuestionsCount: 9,
    totalAttemptedInMocks: 16
  },
  {
    id: "weak-2",
    subject: "Environment & Ecology",
    topic: "National Parks, Biosphere Reserves & River Basins Mapping",
    paper: "Prelims GS1",
    severity: "Critical",
    rootCause: "Confusion between rivers flowing through Corbett vs Kaziranga vs Namdapha. UPSC asks exact spatial questions.",
    recommendedAction: "Plot all 106 National Parks on state blank maps with key flora/fauna and major river tributaries.",
    priorityBook: "PMF IAS Environment / Oxford Atlas",
    pyqPracticeCountNeeded: 30,
    accuracyInMocks: 48,
    estimatedMarkLoss: 10.0,
    recommendedPYQCount: 25,
    failedQuestionsCount: 7,
    totalAttemptedInMocks: 14
  },
  {
    id: "weak-3",
    subject: "Ethics (GS4)",
    topic: "Section B: Case Study Speed & Stakeholder Matrix",
    paper: "Mains GS4",
    severity: "Moderate",
    rootCause: "Taking 20+ minutes per case study instead of 14 minutes, leaving last 2 questions rushed.",
    recommendedAction: "Adopt the 7-step standardized template: Stakeholders -> Dilemmas -> 3 Options Evaluation -> Justification -> Prevention.",
    priorityBook: "Lexicon GS4 Ethics",
    pyqPracticeCountNeeded: 15,
    accuracyInMocks: 55,
    estimatedMarkLoss: 15.0,
    recommendedPYQCount: 15,
    failedQuestionsCount: 5,
    totalAttemptedInMocks: 12
  },
  {
    id: "weak-4",
    subject: "Indian Economy",
    topic: "External Sector: Balance of Payments, NEER/REER & Forex Swap",
    paper: "Prelims GS1",
    severity: "Moderate",
    rootCause: "Conceptual confusion when rupee depreciates vs real effective exchange rate (REER).",
    recommendedAction: "Revisit Mrunal Pillar 3 notes and draw currency flow diagrams.",
    priorityBook: "Mrunal Economy Notes Pillar 3",
    pyqPracticeCountNeeded: 25,
    accuracyInMocks: 60,
    estimatedMarkLoss: 6.6,
    recommendedPYQCount: 20,
    failedQuestionsCount: 4,
    totalAttemptedInMocks: 10
  },
  {
    id: "weak-5",
    subject: "Indian Polity & Governance",
    topic: "Pardoning Powers & Discretionary Jurisdictions (Governor vs President)",
    paper: "Prelims GS1",
    severity: "Moderate",
    rootCause: "Mixing up Article 72 and Article 161 nuances regarding court martial and death sentences.",
    recommendedAction: "Create a side-by-side comparative table and solve 15 targeted MCQs on constitutional heads.",
    priorityBook: "M. Laxmikanth (Chapter 17 & 30)",
    pyqPracticeCountNeeded: 20,
    accuracyInMocks: 62,
    estimatedMarkLoss: 5.3,
    recommendedPYQCount: 18,
    failedQuestionsCount: 4,
    totalAttemptedInMocks: 11
  },
  {
    id: "weak-6",
    subject: "Science & Technology",
    topic: "Biotechnology: CRISPR-Cas9, Gene Editing & Viral Vectors",
    paper: "Prelims GS1",
    severity: "Critical",
    rootCause: "Lack of clarity on recombinant DNA technology vs mitochondrial replacement therapy mechanisms.",
    recommendedAction: "Watch 3D animation breakdowns and summarize 5 recent Nobel discoveries in S&T.",
    priorityBook: "Science Reporter / Vision Monthly S&T",
    pyqPracticeCountNeeded: 25,
    accuracyInMocks: 40,
    estimatedMarkLoss: 8.0,
    recommendedPYQCount: 20,
    failedQuestionsCount: 6,
    totalAttemptedInMocks: 10
  },
  {
    id: "weak-7",
    subject: "History & Art & Culture",
    topic: "Temple Architecture Styles (Nagara vs Dravida vs Vesara)",
    paper: "Prelims GS1",
    severity: "Minor",
    rootCause: "Remembering specific sub-schools (Khajuraho, Solanki, Kalinga) shikhara differences.",
    recommendedAction: "Draw ground plans and elevation sketches of standard Nagara and Dravida temples.",
    priorityBook: "NCERT Class 11 An Introduction to Indian Art",
    pyqPracticeCountNeeded: 15,
    accuracyInMocks: 72,
    estimatedMarkLoss: 3.3,
    recommendedPYQCount: 12,
    failedQuestionsCount: 2,
    totalAttemptedInMocks: 8
  },
  {
    id: "weak-8",
    subject: "Physical & Indian Geography",
    topic: "Climatology: Jet Streams, Western Disturbances & Indian Monsoon",
    paper: "Prelims GS1",
    severity: "Moderate",
    rootCause: "Correlating Walker Circulation, ENSO and Indian Ocean Dipole (IOD) phases with monsoon troughs.",
    recommendedAction: "Draw schematic atmospheric cross-sections of positive vs negative IOD.",
    priorityBook: "GC Leong Chapter 14 / NCERT Class 11 Physical Geography",
    pyqPracticeCountNeeded: 20,
    accuracyInMocks: 58,
    estimatedMarkLoss: 6.6,
    recommendedPYQCount: 16,
    failedQuestionsCount: 5,
    totalAttemptedInMocks: 12
  }
];

export const DEFAULT_GAP_ANALYSIS: TimeVsWeightageGap[] = [
  {
    subject: "Indian Polity & Governance",
    paper: "Prelims GS1",
    upscMarksWeightagePct: 17.5,
    timeInvestedPct: 18.0,
    actualTimePercent: 18.0,
    idealWeightagePercent: 17.5,
    deltaPercent: 0.5,
    status: "Balanced",
    gapStatus: "Balanced",
    recommendation: "Optimal investment. Maintain weekly revision and article recall tests.",
    actionAdvice: "Optimal investment. Maintain weekly revision and article recall tests."
  },
  {
    subject: "Environment & Ecology",
    paper: "Prelims GS1",
    upscMarksWeightagePct: 18.0,
    timeInvestedPct: 8.5,
    actualTimePercent: 8.5,
    idealWeightagePercent: 18.0,
    deltaPercent: -9.5,
    status: "Under-Allocated",
    gapStatus: "Under-investing (High Risk)",
    recommendation: "DANGER: Environment accounts for 18% of UPSC marks (~35-40 marks) but only 8.5% of your study time. Increase daily allocation by +1 hour.",
    actionAdvice: "DANGER: Environment accounts for 18% of UPSC marks (~35-40 marks) but only 8.5% of your study time. Increase daily allocation by +1 hour."
  },
  {
    subject: "Art & Culture + Ancient/Medieval",
    paper: "Prelims GS1",
    upscMarksWeightagePct: 6.5,
    timeInvestedPct: 22.0,
    actualTimePercent: 22.0,
    idealWeightagePercent: 6.5,
    deltaPercent: 15.5,
    status: "Over-Allocated",
    gapStatus: "Over-investing (Low Yield)",
    recommendation: "CAUTION: Spending too much time memorizing low-yield dynasties. Cap reading to NCERT Class 11 Fine Arts and shift time to Economy & Environment.",
    actionAdvice: "CAUTION: Spending too much time memorizing low-yield dynasties. Cap reading to NCERT Class 11 Fine Arts and shift time to Economy & Environment."
  },
  {
    subject: "CSAT Paper II (Aptitude & English)",
    paper: "Prelims CSAT",
    upscMarksWeightagePct: 20.0,
    timeInvestedPct: 5.0,
    actualTimePercent: 5.0,
    idealWeightagePercent: 20.0,
    deltaPercent: -15.0,
    status: "Under-Allocated",
    gapStatus: "Under-investing (High Risk)",
    recommendation: "CRITICAL: Thousands of top GS scorers fail UPSC solely due to CSAT. Dedicate minimum 45 minutes daily to quant and reasoning.",
    actionAdvice: "CRITICAL: Thousands of top GS scorers fail UPSC solely due to CSAT. Dedicate minimum 45 minutes daily to quant and reasoning."
  },
  {
    subject: "Economic & Social Development",
    paper: "Prelims GS1",
    upscMarksWeightagePct: 15.0,
    timeInvestedPct: 14.5,
    actualTimePercent: 14.5,
    idealWeightagePercent: 15.0,
    deltaPercent: -0.5,
    status: "Balanced",
    gapStatus: "Balanced",
    recommendation: "Good pacing. Link static concepts with upcoming Economic Survey & Budget highlights.",
    actionAdvice: "Good pacing. Link static concepts with upcoming Economic Survey & Budget highlights."
  }
];

export const GAP_ANALYSIS_METRICS = DEFAULT_GAP_ANALYSIS;


export const DEFAULT_REVISION_QUEUE: RevisionItem[] = [
  {
    id: "rev-1",
    topicId: "p1-polity-const",
    topicTitle: "Fundamental Rights & Article 19 Exceptions",
    subject: "Indian Polity",
    paper: "Prelims GS1",
    lastStudiedDate: "2026-08-22",
    intervalStage: 2, // Day 3 revision
    nextDueDate: "2026-08-25",
    isOverdue: false,
    quickSummary: [
      "Article 19(1)(a) to (g) guarantees 6 democratic freedoms.",
      "Reasonable restrictions under 19(2): Sovereignty & integrity, security of state, friendly relations with foreign states, public order, decency/morality, contempt of court, defamation, incitement to an offence.",
      "Proportionality test (Puttaswamy 4-fold test): Legitimate aim, rational connection, necessity, and balancing."
    ],
    flashcardQuestions: [
      { q: "Can freedom of speech be restricted on grounds of 'public interest' under Article 19(2)?", a: "No! 'Public interest' is not a grounds under 19(2); only 'Public order' is specified (which has a higher threshold)." },
      { q: "Which constitutional amendment added 'friendly relations with foreign states' and 'incitement to an offence' to 19(2)?", a: "First Constitutional Amendment Act, 1951." }
    ]
  },
  {
    id: "rev-2",
    topicId: "p1-env-biodiv",
    topicTitle: "Wetlands & Ramsar Criteria",
    subject: "Environment & Ecology",
    paper: "Prelims GS1",
    lastStudiedDate: "2026-08-18",
    intervalStage: 3, // Day 7 revision
    nextDueDate: "2026-08-25",
    isOverdue: false,
    quickSummary: [
      "Ramsar Convention signed in 1971 in Ramsar, Iran (came into force 1975).",
      "Montreux Record: Register of wetland sites on the List of Ramsar wetlands where changes in ecological character have occurred or are likely to occur.",
      "Indian sites on Montreux Record: Keoladeo National Park (Rajasthan) and Loktak Lake (Manipur). Chilika Lake was removed after successful restoration."
    ],
    flashcardQuestions: [
      { q: "Which two Indian wetlands are currently in the Montreux Record?", a: "Keoladeo National Park (Rajasthan) and Loktak Lake (Manipur)." },
      { q: "What is the largest Ramsar site in India?", a: "Sundarbans Wetland in West Bengal." }
    ]
  },
  {
    id: "rev-3",
    topicId: "p1-econ-core",
    topicTitle: "Monetary Policy Transmission & Standing Deposit Facility (SDF)",
    subject: "Indian Economy",
    paper: "Prelims GS1",
    lastStudiedDate: "2026-08-10",
    intervalStage: 4, // Day 15 revision
    nextDueDate: "2026-08-25",
    isOverdue: false,
    quickSummary: [
      "SDF allows RBI to absorb surplus liquidity from commercial banks without providing government securities (G-Secs) as collateral.",
      "It acts as the floor of the LAF corridor (25 bps below Repo rate), replacing fixed Reverse Repo as the primary liquidity absorption tool.",
      "MSF (Marginal Standing Facility) acts as the ceiling (25 bps above Repo rate)."
    ],
    flashcardQuestions: [
      { q: "Does RBI provide collateral G-Secs under Standing Deposit Facility (SDF)?", a: "No! SDF is a collateral-free liquidity absorption tool under Section 17 of RBI Act." },
      { q: "What constitutes the upper ceiling and lower floor of the Monetary Policy LAF corridor?", a: "Upper Ceiling: MSF rate; Middle Anchor: Policy Repo rate; Lower Floor: SDF rate." }
    ]
  }
];
