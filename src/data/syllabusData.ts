import { SyllabusTopic, StudyPlanPhase } from "../types";

export const DEFAULT_SYLLABUS: SyllabusTopic[] = [
  // --- PRELIMS (प्रारंभिक परीक्षा) ---
  {
    id: "ras-pre-1",
    paper: "Prelims",
    subject: "राजस्थान का इतिहास, कला, संस्कृति, साहित्य, परंपरा एवं विरासत",
    module: "राजस्थान का इतिहास व कला",
    title: "राजस्थान का इतिहास, कला, संस्कृति, साहित्य, परंपरा एवं विरासत",
    yield: "🔥 High Yield",
    weightagePercentage: 15.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "राजस्थान के प्रागैतिहासिक स्थल",
      "राजस्थान इतिहास के स्रोत",
      "राजस्थान के मुख्य राजवंशों के प्रमुख शासक",
      "18वीं-19वीं शताब्दी में राजनीतिक और सामाजिक स्थिति",
      "राजस्थान की स्थापत्य परंपराएँ",
      "भाषा एवं साहित्य",
      "राजस्थान में सामाजिक जीवन",
      "राजस्थान के प्रमुख व्यक्तित्व"
    ],
  },
  {
    id: "ras-pre-2",
    paper: "Prelims",
    subject: "भारत का इतिहास",
    module: "प्राचीन, मध्यकालीन व आधुनिक भारत",
    title: "भारत का इतिहास",
    yield: "Medium Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "प्राचीनकाल एवं मध्यकाल",
      "आधुनिक काल (प्रारंभिक 19वीं शताब्दी से 2000 तक)",
      "स्वतंत्रता संग्राम और भारतीय राष्ट्रीय आंदोलन",
      "स्वातंत्र्योत्तर राष्ट्र निर्माण (2000 तक)"
    ],
  },
  {
    id: "ras-pre-3",
    paper: "Prelims",
    subject: "विश्व एवं भारत का भूगोल",
    module: "विश्व, भारत व राजस्थान का भूगोल",
    title: "विश्व एवं भारत का भूगोल",
    yield: "🔥 High Yield",
    weightagePercentage: 15.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "विश्व का भूगोल (भौतिक स्वरूप, कृषि, परिवहन, पर्यावरण)",
      "भारत का भूगोल (भौतिक विभाग, जलवायु, खनिज, कृषि)",
      "राजस्थान का भूगोल (भौतिक विभाग, नदियाँ, जलवायु, जनसंख्या)"
    ],
  },
  {
    id: "ras-pre-4",
    paper: "Prelims",
    subject: "भारतीय संविधान, राजनीतिक व्यवस्था और शासन",
    module: "राज व्यवस्था",
    title: "भारतीय संविधान एवं राजनीतिक व्यवस्था",
    yield: "🔥 High Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "संविधान का निर्माण, उद्देशिका, नागरिकता",
      "संघीय सरकार एवं आपातकालीन प्रावधान",
      "शहरी और ग्रामीण स्थानीय सरकार",
      "विभिन्न आयोग (चुनाव आयोग, UPSC, मानवाधिकार आयोग आदि)"
    ],
  },
  {
    id: "ras-pre-5",
    paper: "Prelims",
    subject: "राजस्थान की राजनीतिक एवं प्रशासनिक व्यवस्था",
    module: "राजस्थान प्रशासन",
    title: "राजस्थान की राजनीतिक एवं प्रशासनिक व्यवस्था",
    yield: "🔥 High Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "राज्यपाल, मुख्यमंत्री एवं मंत्रिपरिषद",
      "मुख्य सचिव, जिला कलेक्टर, पुलिस अधीक्षक",
      "राजस्थान लोक सेवा आयोग एवं अन्य आयोग",
      "पंचायती राज एवं नगर पालिका"
    ],
  },
  {
    id: "ras-pre-6",
    paper: "Prelims",
    subject: "आर्थिक अवधारणाएँ एवं अर्थव्यवस्था",
    module: "भारत एवं राजस्थान अर्थव्यवस्था",
    title: "आर्थिक अवधारणाएँ एवं भारतीय तथा राजस्थान अर्थव्यवस्था",
    yield: "🔥 High Yield",
    weightagePercentage: 15.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "आर्थिक संवृद्धि और विकास के मापक",
      "राजकोषीय संघवाद एवं बजट",
      "राजस्थान का वृहत् परिदृश्य और राज्य बजट",
      "राजस्थान सरकार की मुख्य कल्याणकारी योजनाएँ"
    ],
  },
  {
    id: "ras-pre-7",
    paper: "Prelims",
    subject: "विज्ञान एवं प्रौद्योगिकी",
    module: "सामान्य विज्ञान",
    title: "विज्ञान एवं प्रौद्योगिकी",
    yield: "Medium Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "कम्प्यूटर्स एवं सूचना प्रौद्योगिकी",
      "रक्षा एवं अंतरिक्ष प्रौद्योगिकी",
      "पर्यावरणीय तथा पारिस्थितिकी परिवर्तन",
      "मानव स्वास्थ्य देखभाल एवं पोषण"
    ],
  },
  {
    id: "ras-pre-8",
    paper: "Prelims",
    subject: "तार्किक विवेचन एवं मानसिक योग्यता",
    module: "रीज़निंग एवं गणित",
    title: "तार्किक विवेचन एवं मानसिक योग्यता",
    yield: "🔥 High Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "तार्किक दक्षता (कथन एवं निष्कर्ष आदि)",
      "मानसिक योग्यता (दिशा, कोडिंग, रैंकिंग)",
      "आधारभूत संख्यात्मक दक्षता (अनुपात, प्रतिशत, ब्याज)"
    ],
  },
  {
    id: "ras-pre-9",
    paper: "Prelims",
    subject: "समसामयिक घटनाएँ (Current Affairs)",
    module: "Current Affairs",
    title: "समसामयिक घटनाएँ एवं मुद्दे",
    yield: "🔥 High Yield",
    weightagePercentage: 5.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "महत्वपूर्ण व्यक्तित्व, स्थान और समसामयिक मुद्दे",
      "कल्याणकारी नई योजनाएँ",
      "खेल और क्रीड़ा घटनाएँ",
      "राजस्थान सार्वजनिक परीक्षा अधिनियम"
    ],
  },

  // --- MAINS (मुख्य परीक्षा) ---
  {
    id: "ras-mains-1",
    paper: "Mains Paper I",
    subject: "सामान्य अध्ययन- I",
    module: "इतिहास, अर्थव्यवस्था एवं समाजशास्त्र",
    title: "सामान्य अध्ययन- I: इतिहास, अर्थव्यवस्था, समाजशास्त्र, प्रबंधन, लेखांकन",
    yield: "🔥 High Yield",
    weightagePercentage: 25.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "राजस्थान का इतिहास, कला, संस्कृति",
      "भारतीय इतिहास एवं संस्कृति",
      "आधुनिक विश्व का इतिहास (1991 ईस्वी तक)",
      "भारत एवं वैश्विक अर्थव्यवस्था",
      "राजस्थान की अर्थव्यवस्था",
      "समाजशास्त्र",
      "प्रबंधन",
      "लेखांकन एवं अंकेक्षण"
    ],
  },
  {
    id: "ras-mains-2",
    paper: "Mains Paper II",
    subject: "सामान्य अध्ययन- II",
    module: "नीतिशास्त्र, विज्ञान एवं भूगोल",
    title: "सामान्य अध्ययन- II: प्रशासनिक नीतिशास्त्र, विज्ञान, पृथ्वी विज्ञान",
    yield: "🔥 High Yield",
    weightagePercentage: 25.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "प्रशासनिक नीतिशास्त्र (नीतिशास्त्र एवं मानवीय मूल्य)",
      "दैनिक जीवन में सामान्य विज्ञान एवं प्रौद्योगिकी",
      "पृथ्वी विज्ञान (विश्व, भारत एवं राजस्थान का भूगोल)"
    ],
  },
  {
    id: "ras-mains-3",
    paper: "Mains Paper III",
    subject: "सामान्य अध्ययन- III",
    module: "राज व्यवस्था, लोक प्रशासन एवं विधि",
    title: "सामान्य अध्ययन- III: राज व्यवस्था, शासन, लोक प्रशासन, व्यवहार एवं विधि",
    yield: "🔥 High Yield",
    weightagePercentage: 25.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "भारतीय राज व्यवस्था, भारत एवं अंतर्राष्ट्रीय मामले",
      "लोक प्रशासन की अवधारणाएँ",
      "व्यवहार एवं विधि",
      "राजस्थान में महत्वपूर्ण भूमि विधियाँ"
    ],
  },
  {
    id: "ras-mains-4",
    paper: "Mains Paper IV",
    subject: "सामान्य हिंदी एवं सामान्य अंग्रेजी",
    module: "भाषा",
    title: "सामान्य हिंदी एवं सामान्य अंग्रेजी",
    yield: "🔥 High Yield",
    weightagePercentage: 25.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      "सामान्य हिंदी (व्याकरण, संक्षिप्तीकरण, पत्र-लेखन)",
      "General English (Grammar, Comprehension, Letter Writing)",
      "निबंध लेखन (Essay Writing)"
    ],
  },
];

export const DEFAULT_STUDY_PLAN: StudyPlanPhase[] = [
  {
    id: "phase-1",
    name: "Foundation (Phase 1)",
    durationWeeks: 12,
    focus: "Build Core Concepts in Prelims & Mains Overlapping Subjects",
    status: "current",
    milestones: [
      "राजस्थान का इतिहास एवं भूगोल सम्पूर्ण",
      "भारत का इतिहास (प्राचीन व मध्यकालीन)",
      "भारतीय संविधान एवं राज व्यवस्था"
    ],
  },
  {
    id: "phase-2",
    name: "Mains Specific & Answer Writing (Phase 2)",
    durationWeeks: 16,
    focus: "Mains specific topics like Ethics, Public Administration, Law",
    status: "upcoming",
    milestones: [
      "प्रशासनिक नीतिशास्त्र, समाजशास्त्र व प्रबंधन",
      "लोक प्रशासन एवं विधि",
      "सामान्य हिंदी एवं सामान्य अंग्रेजी व्याकरण"
    ],
  },
  {
    id: "phase-3",
    name: "Prelims Sprint & Revision (Phase 3)",
    durationWeeks: 12,
    focus: "Current Affairs, Aptitude and Intense Mock Tests",
    status: "upcoming",
    milestones: [
      "तार्किक विवेचन एवं मानसिक योग्यता",
      "राजस्थान एवं भारत की अर्थव्यवस्था (बजट/समीक्षा)",
      "समसामयिक घटनाएँ एवं 50+ फुल लेंथ टेस्ट"
    ],
  },
];
