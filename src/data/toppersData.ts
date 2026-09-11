import {
  TopperProfile,
  StrategySetupItem,
  TopperRoutine,
  NoteItem,
  InterviewTranscript,
} from "../types";

import generatedData from "./generatedToppersData.json";

export const TOPPERS_PROFILES: TopperProfile[] = generatedData.TOPPERS_PROFILES as TopperProfile[];
export const STRATEGY_SETUP: StrategySetupItem[] = generatedData.STRATEGY_SETUP as StrategySetupItem[];
export const TOPPER_ROUTINES: TopperRoutine[] = generatedData.TOPPER_ROUTINES as TopperRoutine[];
export const TOPPER_INTERVIEWS: InterviewTranscript[] = generatedData.INTERVIEW_TRANSCRIPTS as InterviewTranscript[];

export const TOPPER_NOTES_VAULT: NoteItem[] = [
  {
    id: "note-pestle-framework",
    title: "Universal PESTLE & 360° Mains Framework",
    subject: "General Studies 1, 2, 3 & Essay",
    paper: "All GS Papers",
    topperSource: "Aditya Srivastava (AIR 1)",
    type: "Framework / Template",
    summary:
      "When stuck on any broad 15-marker UPSC question, use the PESTLE framework to instantly generate 6 distinct dimensions with 3 points each.",
    keyPoints: [
      "P - Political / Constitutional (Articles, Federal balance, Democratic institutions)",
      "E - Economic (GDP impact, fiscal burden, MSMEs, job creation, trade balance)",
      "S - Social / Cultural (Vulnerable sections, gender equity, tribal rights, demographic dividend)",
      "T - Technological (Digital public infra, AI, cybersecurity, R&D spend)",
      "L - Legal / Statutory (Enabling acts, judicial precedents, enforcement loopholes)",
      "E - Environmental / Ecological (Carbon emissions, biodiversity, disaster resilience)",
    ],
    diagramDescription:
      "A circular 6-spoke hub with Core Problem in center and 6 PESTLE nodes radiating outward.",
    svgDiagramType: "pestle",
  },
  {
    id: "note-sc-verdicts-gs2",
    title: "Top 25 Landmark Supreme Court Judgements Cheatsheet",
    subject: "Indian Polity & Constitution",
    paper: "Mains GS2",
    topperSource: "Ishita Kishore (AIR 1)",
    type: "Supreme Court Verdicts",
    summary:
      "High-yield ready-to-cite SC rulings to substantiate GS2 answers and fetch bonus marks.",
    keyPoints: [
      "Kesavananda Bharati (1973): Basic Structure Doctrine limitation on amending power.",
      "Minerva Mills (1980): Harmony and balance between Fundamental Rights & DPSPs.",
      "K.S. Puttaswamy (2017): Right to Privacy as a fundamental right under Article 21.",
      "Navtej Johar (2018): Decriminalization of Section 377; Constitutional Morality principle.",
      "Shayara Bano (2017): Triple Talaq struck down as arbitrary and violative of Article 14.",
      "S.R. Bommai (1994): Federalism as basic structure; checks on Article 356 misuse.",
      "Prakash Singh (2006): Police reforms guidelines and state security commission.",
      "Lily Thomas (2013): Immediate disqualification of convicted MPs/MLAs.",
      "Association for Democratic Reforms (2002): Citizens' right to know candidates' criminal antecedents.",
    ],
    svgDiagramType: "constitution-flow",
  },
  {
    id: "note-ethics-matrix",
    title: "GS4 7-Step Case Study Resolution Matrix",
    subject: "Ethics, Integrity & Aptitude",
    paper: "Mains GS4",
    topperSource: "Shubham Kumar (AIR 1)",
    type: "Framework / Template",
    summary:
      "Standardized framework to score 120+ in GS4 Case Studies without getting lost in emotional tangents.",
    keyPoints: [
      "Step 1: Stakeholder Identification (Direct: DC, Victims, Accused; Indirect: Public trust, Rule of law).",
      "Step 2: Ethical Dilemmas at Stake (e.g. Public duty vs Personal loyalty; Short-term peace vs Long-term justice).",
      "Step 3: Applicable Constitutional & Ethical Principles (Nolan Principles, Utilitarianism, Deontology, Social Justice).",
      "Step 4: Evaluation of Options (Option 1: Inaction/Compromise; Option 2: Extreme strictness; Option 3: Balanced holistic action).",
      "Step 5: Justification of Chosen Course of Action (Merits over Demerits with legal backing).",
      "Step 6: Step-by-Step Implementation Roadmap (Immediate relief, administrative inquiry, institutional reform).",
      "Step 7: Long-Term Preventive Vision (Sensitization, SOP formulation, community engagement).",
    ],
    svgDiagramType: "ethics-matrix",
  },
  {
    id: "note-economy-growth-cycle",
    title: "Virtuous Cycle of Investment & Economic Growth",
    subject: "Indian Economy & Infrastructure",
    paper: "Mains GS3",
    topperSource: "Aditya Srivastava (AIR 1)",
    type: "Diagram / Mindmap",
    summary:
      "Economic Survey standard model diagram that should be drawn for questions on Capital Expenditure, Manufacturing, and Viksit Bharat 2047.",
    keyPoints: [
      "Public Capital Expenditure (Capex) in Infrastructure ->",
      "Crowding-in of Private Investment ->",
      "Job Creation & Increased Household Disposable Income ->",
      "Boost in Aggregate Demand ->",
      "Capacity Utilization Expansion -> Higher Corporate Revenues & Tax Collections ->",
      "Fiscal Consolidation and Sustained GDP Growth Cycle.",
    ],
    svgDiagramType: "economy-cycle",
  },
];
