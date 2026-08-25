import { PYQQuestion } from "../types";

export const PYQ_DATABASE: PYQQuestion[] = [
  // --- PRELIMS PYQs ---
  {
    id: "pyq-pre-2023-polity-1",
    type: "Prelims",
    year: 2023,
    paper: "Prelims GS1",
    subject: "Indian Polity & Governance",
    topic: "Due Process of Law & Article 21",
    questionText: "In India, what is the meaning of the concept 'Due Process of Law'?",
    options: [
      { label: "A", text: "The procedure established by law" },
      { label: "B", text: "Fair application of law" },
      { label: "C", text: "Equality before law" },
      { label: "D", text: "Principle of natural justice" }
    ],
    correctOption: "B",
    explanation: "'Due Process of Law' (derived from the US Constitution and established in India via the Maneka Gandhi case, 1978) requires that a law must not only be enacted following the proper procedure, but the law itself must be just, fair, and reasonable. Hence, 'Fair application of law' (or Principle of Natural Justice / substantive fairness) is the closest interpretation. In the official UPSC key, fair application / natural justice principles were the intended essence.",
    eliminationTechnique: "Eliminate (A) immediately because 'Procedure established by law' is the narrower British/original Indian concept before Maneka Gandhi 1978."
  },
  {
    id: "pyq-pre-2024-econ-1",
    type: "Prelims",
    year: 2024,
    paper: "Prelims GS1",
    subject: "Economic & Social Development",
    topic: "Central Bank Digital Currency (e-Rupee)",
    questionText: "Consider the following statements regarding Central Bank Digital Currency (CBDC / Digital Rupee) issued by RBI:\n1. It is a sovereign currency in digital form and appears as a liability on RBI's balance sheet.\n2. It can be held without a bank account in an individual digital token wallet.\n3. It pays a fixed interest rate to holders comparable to bank savings deposits.\nHow many of the above statements are correct?",
    options: [
      { label: "A", text: "Only one" },
      { label: "B", text: "Only two" },
      { label: "C", text: "All three" },
      { label: "D", text: "None" }
    ],
    correctOption: "B",
    explanation: "Statement 1 is correct: CBDC is legal tender and a direct liability of the Reserve Bank of India. Statement 2 is correct: Like physical cash tokens, CBDC can be held in self-custody digital wallets without needing an active commercial bank deposit account. Statement 3 is incorrect: CBDC is non-interest bearing to avoid disintermediation of commercial banks. Hence, only two statements are correct.",
    eliminationTechnique: "Remember the core monetary principle: If digital cash paid interest, citizens would withdraw all savings deposits from commercial banks to hold risk-free central bank cash, destabilizing credit creation. Thus statement 3 must be false."
  },
  {
    id: "pyq-pre-2023-env-1",
    type: "Prelims",
    year: 2023,
    paper: "Prelims GS1",
    subject: "Environment & Ecology",
    topic: "Protected Areas & Ecosystems",
    questionText: "Which one of the following National Parks has a climate that varies from tropical to subtropical, temperate and arctic?",
    options: [
      { label: "A", text: "Khangchendzonga National Park" },
      { label: "B", text: "Nanda Devi National Park" },
      { label: "C", text: "Neora Valley National Park" },
      { label: "D", text: "Namdapha National Park" }
    ],
    correctOption: "D",
    explanation: "Namdapha National Park in Arunachal Pradesh has an altitudinal variation from 200m to over 4,500m in the Eastern Himalayas. Because of this massive altitudinal range, its climate transitions smoothly from Tropical (low-lying valleys) to Subtropical, Temperate, and Alpine/Arctic (snowy peaks).",
    eliminationTechnique: "Khangchendzonga and Nanda Devi are high-altitude parks that lack low-elevation tropical evergreen forest belts at their base."
  },
  {
    id: "pyq-pre-2022-polity-2",
    type: "Prelims",
    year: 2022,
    paper: "Prelims GS1",
    subject: "Indian Polity & Governance",
    topic: "Anti-Defection Law (Tenth Schedule)",
    questionText: "With reference to the Anti-Defection Law in India, consider the following statements:\n1. The law specifies that a nominated legislator cannot join any political party within six months of being appointed to the House.\n2. The law does not provide any time-frame within which the presiding officer has to decide a defection case.\nWhich of the statements given above is/are correct?",
    options: [
      { label: "A", text: "1 only" },
      { label: "B", text: "2 only" },
      { label: "C", text: "Both 1 and 2" },
      { label: "D", text: "Neither 1 nor 2" }
    ],
    correctOption: "B",
    explanation: "Statement 1 is incorrect: A nominated member can join a political party within six months; they get disqualified ONLY IF they join a political party AFTER the expiry of six months. Statement 2 is correct: The Tenth Schedule does not prescribe any specific statutory time limit for the Speaker/Chairman to adjudicate defection petitions (frequently cited as a major reform requirement by Supreme Court in Keisham Meghachandra Singh case).",
    eliminationTechnique: "Familiarity with the exact 6-month rule for nominated vs independent members (independent members cannot join ANY party at any time without disqualification)."
  },
  {
    id: "pyq-pre-2023-csat-1",
    type: "Prelims",
    year: 2023,
    paper: "Prelims CSAT",
    subject: "CSAT Paper II",
    topic: "Number System & Divisibility",
    questionText: "What is the remainder when (85 × 87 × 89 × 91 × 95 × 96) is divided by 100?",
    options: [
      { label: "A", text: "0" },
      { label: "B", text: "1" },
      { label: "C", text: "2" },
      { label: "D", text: "4" }
    ],
    correctOption: "A",
    explanation: "100 = 4 × 25 = 2² × 5². In the numerator: 85 has a factor of 5 (5 × 17), 95 has a factor of 5 (5 × 19). Together they provide 5 × 5 = 25. Also, 96 = 4 × 24, which provides a factor of 4. Since the numerator contains 25 × 4 = 100 as a factor, the entire product is an exact multiple of 100. Thus, the remainder is 0.",
    eliminationTechnique: "Always check for prime factor pairs of 10 (2 and 5) in product remainder questions."
  },

  // --- MAINS PYQs ---
  {
    id: "pyq-mains-2023-gs2-1",
    type: "Mains",
    year: 2023,
    paper: "Mains GS2",
    subject: "Indian Polity & Governance",
    topic: "Judicial Accountability & Independence",
    questionText: "Constitutional Morality is rooted in the Constitution itself and is founded on its essential facets. Explain the doctrine of 'Constitutional Morality' with the help of relevant judicial precedents.",
    marks: 10,
    wordLimit: 150,
    modelAnswerStructure: {
      introduction: "Constitutional morality refers to adherence to the core constitutional values, rule of law, democratic norms, and fundamental liberties, prioritizing institutional spirit over majoritarian impulse or popular morality.",
      subheadingsAndPoints: [
        {
          heading: "Core Facets & Constitutional Foundations",
          points: [
            "Rooted in Preamble: Justice (Social, Economic, Political), Liberty, Equality, and Fraternity.",
            "Dr. B.R. Ambedkar's vision: Constitutional morality is not a natural sentiment; it has to be cultivated and protects minority rights from majoritarian dominance.",
            "Checks and balances: Separation of powers and institutional accountability under Articles 14, 19, 21."
          ]
        },
        {
          heading: "Key Judicial Precedents & Evolution",
          points: [
            "Navtej Singh Johar (2018): SC upheld that constitutional morality prevails over societal/popular morality, decriminalizing Sec 377.",
            "Joseph Shine Case (2018): Struck down adultery law, declaring gender dignity and individual autonomy paramount.",
            "Sabarimala Temple Case (2018): Justice D.Y. Chandrachud highlighted that freedom of religion (Art 25) must yield to equality and non-discrimination (Art 14 & 15).",
            "Govt. of NCT of Delhi v. UOI (2018): Emphasized cooperative federalism and mutual institutional respect between LG and elected government."
          ]
        }
      ],
      diagramSuggestion: "A balance scale diagram showing 'Constitutional Morality (Rule of Law, Dignity, Pluralism)' outweighing 'Popular Morality / Majoritarian Sentiments'.",
      conclusion: "Constitutional morality acts as a beacon guiding the judiciary and executive to uphold pluralism, individual dignity, and democratic resilience in an evolving socio-political landscape.",
      recommendedKeywords: ["Dr. B.R. Ambedkar", "Majoritarianism vs Pluralism", "Navtej Johar", "Individual Autonomy", "Dynamic Interpretation", "Rule of Law"]
    }
  },
  {
    id: "pyq-mains-2023-gs3-1",
    type: "Mains",
    year: 2023,
    paper: "Mains GS3",
    subject: "Indian Economy & Agriculture",
    topic: "Digital Public Infrastructure & Inclusive Growth",
    questionText: "What is Digital Public Infrastructure (DPI)? Discuss how India Stack (Aadhaar, UPI, DigiLocker, ONDC) has accelerated financial and social inclusion.",
    marks: 15,
    wordLimit: 250,
    modelAnswerStructure: {
      introduction: "Digital Public Infrastructure (DPI) refers to interoperable, open, and scalable digital networks (identity, payment, and data exchange rails) built as public goods to deliver essential services to citizens at zero or low cost.",
      subheadingsAndPoints: [
        {
          heading: "The Three Pillars of India Stack",
          points: [
            "Identity Rail (Aadhaar): Provided 1.4 billion citizens with verifiable digital ID, eradicating ghost beneficiaries in welfare schemes.",
            "Payments Rail (UPI & IMPS): Democratized instant low-cost digital transactions, processing over 14 billion monthly transactions.",
            "Data & Consent Rail (DigiLocker, Account Aggregator, DEPA): Empowered citizens with paperless, secure self-sovereign credential sharing."
          ]
        },
        {
          heading: "Acceleration of Financial & Social Inclusion",
          points: [
            "JAM Trinity & DBT: Direct Benefit Transfer of over ₹35 lakh crore directly to PMJDY bank accounts, saving ₹2.7 lakh crore in leakages.",
            "Micro-Credit to Street Vendors: PM SVANidhi leveraged UPI QR transaction history to disburse collateral-free working capital loans.",
            "Democratizing E-Commerce: Open Network for Digital Commerce (ONDC) breaking e-commerce monopolies for small local kiranas.",
            "Healthcare & Education Access: CoWIN vaccine platform and Ayushman Bharat Digital Mission (ABHA IDs)."
          ]
        },
        {
          heading: "Key Challenges & Way Forward",
          points: [
            "Digital Divide & Algorithmic Exclusion: Rural internet penetration and digital literacy disparities.",
            "Data Privacy & Security: Robust enforcement of the Digital Personal Data Protection (DPDP) Act 2023.",
            "Global DPI Leadership: Promoting India's DPI model across the Global South via G20 New Delhi Leaders' Declaration."
          ]
        }
      ],
      diagramSuggestion: "A 3-layer architecture diagram: Layer 1 (Identity - Aadhaar), Layer 2 (Payments - UPI), Layer 3 (Data Exchange - Account Aggregator / DigiLocker) leading to 'Inclusive Growth'.",
      conclusion: "India's DPI represents a revolutionary shift from Silicon Valley's walled gardens to open democratic digital rails, transforming citizen welfare and positioning India as a global digital lighthouse.",
      recommendedKeywords: ["JAM Trinity", "Direct Benefit Transfer", "Account Aggregator", "ONDC", "DPDP Act", "Zero Marginal Cost", "Global South Leadership"]
    }
  },
  {
    id: "pyq-mains-2022-gs4-1",
    type: "Mains",
    year: 2022,
    paper: "Mains GS4",
    subject: "Ethics, Integrity & Aptitude",
    topic: "Foundational Values for Civil Service",
    questionText: "What do you understand by the term 'Crisis of Conscience'? How does it manifest itself in the public domain and what are the ways to resolve it?",
    marks: 10,
    wordLimit: 150,
    modelAnswerStructure: {
      introduction: "'Crisis of Conscience' is an acute psychological and moral state of inner conflict when an individual's core ethical values, inner voice, and moral convictions are in sharp contradiction with external directives, official duties, or societal pressures.",
      subheadingsAndPoints: [
        {
          heading: "Manifestation in the Public Domain",
          points: [
            "Executive Pressure vs Rule of Law: A civil servant ordered by political superiors to favor a specific contractor against tender guidelines.",
            "Public Interest vs Official Secrecy: Discovering severe public health cover-ups (Whistleblowing dilemma).",
            "Strict Law vs Human Compassion: Evicting destitute slum dwellers in extreme winter under anti-encroachment orders without rehabilitation."
          ]
        },
        {
          heading: "Ethical Resolution Framework",
          points: [
            "Constitutional Morality: Let the fundamental values of the Constitution (Justice, Equity, Compassion) be the supreme guiding beacon.",
            "Gandhian Talisman: Recall the face of the poorest and the weakest person you have seen and ask if the step contemplated will be of any use to him.",
            "Nolan Committee Principles: Selflessness, Integrity, Objectivity, and Openness.",
            "Institutional Mechanisms: Formal dissent in written file notes, seeking higher administrative or judicial clarification."
          ]
        }
      ],
      diagramSuggestion: "A triangular decision nexus: 'Legal Directives' vs 'Inner Moral Compass' vs 'Public Interest', resolved through 'Constitutional Morality'.",
      conclusion: "A civil servant must cultivate moral courage and emotional intelligence so that when a crisis of conscience strikes, public interest and constitutional righteousness triumph over expediency.",
      recommendedKeywords: ["Inner Voice", "Gandhian Talisman", "Nolan Principles", "File Dissent", "Constitutional Morality", "Moral Courage"]
    }
  }
];
