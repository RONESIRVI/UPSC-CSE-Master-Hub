import { SyllabusTopic, StudyPlanPhase } from "../types";

export const DEFAULT_SYLLABUS: SyllabusTopic[] = [
  // --- PRELIMS (प्रारंभिक परीक्षा) ---
  {
    id: "ras-pre-1",
    paper: "Prelims GS1",
    subject: "राजस्थान का इतिहास, कला, संस्कृति, साहित्य, परम्परा एवं विरासत",
    module: "इतिहास एवं संस्कृति",
    title: "राजस्थान का इतिहास, कला, संस्कृति, साहित्य, परम्परा एवं विरासत",
    yield: "🔥 High Yield",
    weightagePercentage: 15.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "राजस्थान के प्रागैतिहासिक स्थल (पुरापाषाण से कांस्य युग तक)", status: "not_started" },
      { title: "राजस्थान इतिहास के स्रोत (पुरातात्विक, अभिलेखीय, साहित्यिक)", status: "not_started" },
      { title: "प्रमुख राजवंशों की उपलब्धियाँ, मध्यकालीन प्रशासनिक एवं राजस्व व्यवस्था", status: "not_started" },
      { title: "18वीं–19वीं शताब्दी में राजनीतिक और सामाजिक स्थिति, किसान एवं आदिवासी आंदोलन, प्रजामंडल, जन जागृति, राजस्थान का एकीकरण", status: "not_started" },
      { title: "स्थापत्य परंपराएँ (मंदिर, किले, महल), चित्रकला, हस्तशिल्प, प्रदर्शन कलाएँ (लोक नृत्य, नाटक, संगीत, वाद्ययंत्र)", status: "not_started" },
      { title: "राजस्थानी भाषा, साहित्य एवं बोलियाँ", status: "not_started" },
      { title: "धार्मिक जीवन (संत, संप्रदाय, लोक देवता) एवं सामाजिक जीवन (मेले, त्यौहार, रीति–रिवाज, वेशभूषा, आभूषण), प्रमुख व्यक्तित्व", status: "not_started" }
    ],
  },
  {
    id: "ras-pre-2",
    paper: "Prelims GS1",
    subject: "भारत का इतिहास",
    module: "इतिहास एवं संस्कृति",
    title: "भारत का इतिहास",
    yield: "⭐ Medium Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "प्राचीनकाल एवं मध्यकाल: सिंधु और वैदिक युग, बौद्ध और जैन धर्म, मौर्य, कुषाण, सातवाहन, गुप्त, चालुक्य, पल्लव और चोल शासकों की उपलब्धियाँ, कला एवं स्थापत्य, वर्णाश्रम, सल्तनत काल, विजयनगर साम्राज्य, मुगल काल, मराठा, भक्ति एवं सूफी आंदोलन।", status: "not_started" },
      { title: "आधुनिक काल (19वीं शताब्दी से 2000 तक): ब्रिटिश साम्राज्यवाद (मराठा, मैसूर, सिख), 1857 का विद्रोह, ब्रिटिश नीतियाँ, राष्ट्रवाद का उदय, स्वतंत्रता संग्राम, स्वातंत्र्योत्तर राष्ट्र निर्माण (राज्य पुनर्गठन, योजना एवं आर्थिक सुधार)।", status: "not_started" }
    ],
  },
  {
    id: "ras-pre-3",
    paper: "Prelims GS1",
    subject: "विश्व एवं भारत का भूगोल",
    module: "भूगोल",
    title: "विश्व एवं भारत का भूगोल",
    yield: "🔥 High Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "विश्व का भूगोल: भौतिक स्वरूप (पर्वत, पठार, मैदान, मरुस्थल), प्रमुख नदियाँ एवं झीलें, प्राकृतिक वनस्पति, कृषि, औद्योगिक प्रदेश, परिवहन, पर्यावरणीय मुद्दे (मरुस्थलीकरण, ग्लोबल वार्मिंग, ओजोन अवक्षय)।", status: "not_started" },
      { title: "भारत का भूगोल: भौतिक विभाग, जलवायु, नदियाँ एवं झीलें, कृषि, सिंचाई, खनिज, औद्योगिक प्रदेश।", status: "not_started" }
    ],
  },
  {
    id: "ras-pre-4",
    paper: "Prelims GS1",
    subject: "राजस्थान का भूगोल",
    module: "भूगोल",
    title: "राजस्थान का भूगोल",
    yield: "🔥 High Yield",
    weightagePercentage: 15.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "अवस्थिति, विस्तार, भौतिक विभाग", status: "not_started" },
      { title: "नदियाँ एवं झीलें, जलवायु", status: "not_started" },
      { title: "प्राकृतिक वनस्पति, जैव विविधता, मृदा", status: "not_started" },
      { title: "कृषि, पशुधन, सिंचाई", status: "not_started" },
      { title: "जनसंख्या, नगरीकरण, जनजातियाँ", status: "not_started" },
      { title: "खनिज एवं पर्यटन", status: "not_started" }
    ],
  },
  {
    id: "ras-pre-5",
    paper: "Prelims GS1",
    subject: "भारतीय संविधान, राजनीतिक व्यवस्था और शासन",
    module: "राज व्यवस्था",
    title: "भारतीय संविधान, राजनीतिक व्यवस्था और शासन",
    yield: "🔥 High Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "संविधान का निर्माण, उद्देशिका, नागरिकता, मौलिक अधिकार, नीति निदेशक तत्व, मौलिक कर्तव्य।", status: "not_started" },
      { title: "संघीय सरकार, संघ राज्य संबंध, आपातकालीन प्रावधान।", status: "not_started" },
      { title: "शहरी और ग्रामीण स्थानीय सरकार।", status: "not_started" },
      { title: "निर्वाचन आयोग, UPSC, राष्ट्रीय मानवाधिकार/महिला/बाल अधिकार आयोग, नीति आयोग, लोकपाल, केंद्रीय सतर्कता आयोग, केंद्रीय सूचना आयोग।", status: "not_started" },
      { title: "लोक नीति, नागरिक चार्टर, शिकायत निवारण प्रणाली।", status: "not_started" }
    ],
  },
  {
    id: "ras-pre-6",
    paper: "Prelims GS1",
    subject: "राजस्थान की राजनीतिक एवं प्रशासनिक व्यवस्था",
    module: "राज व्यवस्था",
    title: "राजस्थान की राजनीतिक एवं प्रशासनिक व्यवस्था",
    yield: "🔥 High Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "राज्यपाल, मुख्यमंत्री, मंत्रिपरिषद, विधान सभा, उच्च न्यायालय।", status: "not_started" },
      { title: "मुख्य सचिव, राज्य सचिवालय, निदेशालय, जिला प्रशासन (कलेक्टर, पुलिस अधीक्षक, उप-खण्ड अधिकारी)।", status: "not_started" },
      { title: "RPSC, राज्य निर्वाचन आयोग, राज्य सूचना आयोग, मानवाधिकार आयोग, लोकायुक्त, पंचायती राज एवं नगर पालिका प्रशासन।", status: "not_started" }
    ],
  },
  {
    id: "ras-pre-7",
    paper: "Prelims GS1",
    subject: "आर्थिक अवधारणाएँ एवं भारतीय अर्थव्यवस्था",
    module: "अर्थव्यवस्था",
    title: "आर्थिक अवधारणाएँ एवं भारतीय अर्थव्यवस्था",
    yield: "⭐ Medium Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "आर्थिक संवृद्धि और विकास, मानव विकास सूचकांक।", status: "not_started" },
      { title: "राजकोषीय नीति, बजट, राजकोषीय संघवाद (वित्त आयोग)।", status: "not_started" },
      { title: "कृषिगत विकास, औद्योगिक वृद्धि (उदारीकरण, निजीकरण, वैश्वीकरण), सेवा क्षेत्र।", status: "not_started" },
      { title: "कौशल विकास, रोजगार, सामाजिक न्याय।", status: "not_started" }
    ],
  },
  {
    id: "ras-pre-8",
    paper: "Prelims GS1",
    subject: "राजस्थान की अर्थव्यवस्था",
    module: "अर्थव्यवस्था",
    title: "राजस्थान की अर्थव्यवस्था",
    yield: "🔥 High Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "राज्य बजट, कृषि, उद्योग एवं सेवा क्षेत्र", status: "not_started" },
      { title: "आधारभूत संरचना (ऊर्जा, परिवहन, संचार), ग्रामीण विकास", status: "not_started" },
      { title: "मूलभूत सामाजिक सेवाएं, कल्याणकारी योजनाएं।", status: "not_started" }
    ],
  },
  {
    id: "ras-pre-9",
    paper: "Prelims GS1",
    subject: "विज्ञान एवं प्रौद्योगिकी",
    module: "विज्ञान एवं प्रौद्योगिकी",
    title: "विज्ञान एवं प्रौद्योगिकी",
    yield: "⭐ Medium Yield",
    weightagePercentage: 5.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "दैनिक विज्ञान, कम्प्यूटर्स, सूचना एवं संचार प्रौद्योगिकी।", status: "not_started" },
      { title: "रक्षा एवं अंतरिक्ष प्रौद्योगिकी, नैनो-प्रौद्योगिकी, जैव-प्रौद्योगिकी, आनुवांशिक अभियांत्रिकी।", status: "not_started" },
      { title: "मानव स्वास्थ्य, आहार एवं पोषण, रोग एवं सार्वजनिक स्वास्थ्य कार्यक्रम।", status: "not_started" },
      { title: "पर्यावरण, जैव-विविधता, प्राकृतिक संसाधन संरक्षण।", status: "not_started" },
      { title: "राजस्थान के विशेष संदर्भ में कृषि, उद्यान, वानिकी एवं पशुपालन विज्ञान।", status: "not_started" }
    ],
  },
  {
    id: "ras-pre-10",
    paper: "Prelims GS1",
    subject: "तार्किक विवेचन एवं मानसिक योग्यता",
    module: "मानसिक योग्यता",
    title: "तार्किक विवेचन एवं मानसिक योग्यता",
    yield: "🔥 High Yield",
    weightagePercentage: 10.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "तार्किक दक्षता: कथन एवं मान्यताएं/तर्क/निष्कर्ष/कार्यवाही, विश्लेषणात्मक तर्कक्षमता।", status: "not_started" },
      { title: "मानसिक योग्यता: संख्या/अक्षर अनुक्रम, कोडिंग-डीकोडिंग, दिशा ज्ञान, वेन आरेख, रैंकिंग, बैठक व्यवस्था।", status: "not_started" },
      { title: "संख्यात्मक दक्षता: अनुपात, लाभ-हानि, प्रतिशत, ब्याज, परिमाप एवं क्षेत्र, डेटा विश्लेषण (सारणी, पाई-चार्ट), माध्य, बहुलक, क्रमचय-संचय, प्रायिकता।", status: "not_started" }
    ],
  },
  {
    id: "ras-pre-11",
    paper: "Prelims GS1",
    subject: "समसामयिक घटनाएँ एवं मुद्दे",
    module: "समसामयिक घटनाएँ",
    title: "समसामयिक घटनाएँ एवं मुद्दे",
    yield: "🔥 High Yield",
    weightagePercentage: 5.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "महत्वपूर्ण व्यक्तित्व, स्थान, कल्याणकारी योजनाएँ, प्रमुख आर्थिक/राजनीतिक घटनाक्रम, खेलकूद, पुरस्कार, लेखक।", status: "not_started" },
      { title: "राजस्थान सार्वजनिक परीक्षा (भर्ती अनुचित साधन रोकथाम) अधिनियम, 2022।", status: "not_started" }
    ],
  },

  // --- MAINS (मुख्य परीक्षा) ---
  {
    id: "ras-mains-1-1",
    paper: "Mains GS1",
    subject: "इकाई I: इतिहास (GS I)",
    module: "इतिहास",
    title: "इकाई I: इतिहास (GS I)",
    yield: "🔥 High Yield",
    weightagePercentage: 33.3,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "खण्ड अ (राजस्थान): प्रागैतिहासिक संस्कृति, प्रमुख शासक, 1857 का विद्रोह, किसान/जनजातीय आंदोलन, प्रजामंडल, एकीकरण, कला एवं संस्कृति (स्थापत्य, संगीत, नृत्य, त्यौहार, साहित्य)।", status: "not_started" },
      { title: "खण्ड ब (भारत): प्राचीन से आधुनिक काल तक कला एवं वास्तुकला, धार्मिक आन्दोलन, ब्रिटिश नीतियां, राष्ट्रीय आन्दोलन, सामाजिक-धार्मिक सुधार।", status: "not_started" },
      { title: "खण्ड स (विश्व 1991 तक): पुनर्जागरण, धर्म सुधार, अमेरिकी/फ्रांसीसी/रूसी क्रांति, औद्योगिक क्रांति, नाजीवाद, फासीवाद, विश्व युद्ध, शीत युद्ध।", status: "not_started" }
    ],
  },
  {
    id: "ras-mains-1-2",
    paper: "Mains GS1",
    subject: "इकाई II: अर्थव्यवस्था (GS I)",
    module: "अर्थव्यवस्था",
    title: "इकाई II: अर्थव्यवस्था (GS I)",
    yield: "🔥 High Yield",
    weightagePercentage: 33.3,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "खण्ड अ (भारत): कृषि, उद्योग, सेवा क्षेत्र, अंतर्राष्ट्रीय व्यापार, सार्वजनिक वित्त, RBI, सामाजिक क्षेत्र।", status: "not_started" },
      { title: "खण्ड ब (वैश्विक): WTO, विश्व बैंक, IMF की भूमिका।", status: "not_started" },
      { title: "खण्ड स (राजस्थान): राज्य घरेलू उत्पाद, कृषि, आधारभूत संरचना, पंचायती राज, सामाजिक कल्याण योजनाएं।", status: "not_started" }
    ],
  },
  {
    id: "ras-mains-1-3",
    paper: "Mains GS1",
    subject: "इकाई III: समाजशास्त्र, प्रबंधन, लेखांकन (GS I)",
    module: "समाजशास्त्र, प्रबंधन, लेखांकन",
    title: "इकाई III: समाजशास्त्र, प्रबंधन, लेखांकन (GS I)",
    yield: "⭐ Medium Yield",
    weightagePercentage: 33.3,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "खण्ड अ (समाजशास्त्र): जाति, वर्ग, धर्मनिरपेक्षीकरण, वैश्वीकरण, विवाह, परिवार, कमजोर वर्गों की समस्याएं।", status: "not_started" },
      { title: "खण्ड ब (प्रबंधन): प्रबंधकीय कौशल, संगठनात्मक व्यवहार, विपणन, मानव संसाधन, रणनीति प्रबंधन।", status: "not_started" },
      { title: "खण्ड स (लेखांकन): GAAPs, वित्तीय विवरण विश्लेषण, अंकेक्षण कार्यक्रम।", status: "not_started" }
    ],
  },

  {
    id: "ras-mains-2-1",
    paper: "Mains GS2",
    subject: "इकाई I: प्रशासकीय नीतिशास्त्र (GS II)",
    module: "नीतिशास्त्र",
    title: "इकाई I: प्रशासकीय नीतिशास्त्र (GS II)",
    yield: "🔥 High Yield",
    weightagePercentage: 33.3,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "मानवीय मूल्य, महापुरुषों की शिक्षा, ऋत एवं ऋण, कर्मवाद, भगवद् गीता का नीतिशास्त्र, गांधी का नीतिशास्त्र, नैतिक निर्णय-प्रक्रिया।", status: "not_started" }
    ],
  },
  {
    id: "ras-mains-2-2",
    paper: "Mains GS2",
    subject: "इकाई II: विज्ञान एवं प्रौद्योगिकी (GS II)",
    module: "विज्ञान एवं प्रौद्योगिकी",
    title: "इकाई II: विज्ञान एवं प्रौद्योगिकी (GS II)",
    yield: "🔥 High Yield",
    weightagePercentage: 33.3,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "रसायन विज्ञान (धातु, अम्ल, क्षार, pH, औषधियां, रेडियोधर्मिता)", status: "not_started" },
      { title: "भौतिकी (गति, कार्य, गुरुत्वाकर्षण, ध्वनि, विद्युत चुंबकीय तरंगें)", status: "not_started" },
      { title: "जीव विज्ञान (कोशिका, पादप, मानव शरीर, प्रतिरक्षा, बायोटेक्नोलॉजी, CRISPR)", status: "not_started" },
      { title: "कंप्यूटर विज्ञान एवं IT (AI, मशीन लर्निंग, बिग डेटा, साइबर सुरक्षा), अंतरिक्ष एवं रक्षा।", status: "not_started" }
    ],
  },
  {
    id: "ras-mains-2-3",
    paper: "Mains GS2",
    subject: "इकाई III: पृथ्वी विज्ञान / भूगोल (GS II)",
    module: "भूगोल",
    title: "इकाई III: पृथ्वी विज्ञान (GS II)",
    yield: "🔥 High Yield",
    weightagePercentage: 33.3,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "खण्ड अ (विश्व): पृथ्वी की संरचना, भूकंप, ज्वालामुखी, जलवायु, पर्यावरणीय मुद्दे।", status: "not_started" },
      { title: "खण्ड ब (भारत): अपवाह प्रतिरूप, जलवायु, प्राकृतिक संसाधन, जनसंख्या।", status: "not_started" },
      { title: "खण्ड स (राजस्थान): भौतिक विभाग, नदियाँ, जलवायु, खनिज, कृषि, यूनेस्को भू-पार्क।", status: "not_started" }
    ],
  },

  {
    id: "ras-mains-3-1",
    paper: "Mains GS3",
    subject: "इकाई I: राज व्यवस्था एवं शासन (GS III)",
    module: "राज व्यवस्था",
    title: "इकाई I: राज व्यवस्था एवं शासन (GS III)",
    yield: "🔥 High Yield",
    weightagePercentage: 33.3,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "संविधान के सिद्धांत, संस्थागत रूपरेखा (राष्ट्रपति, संसद, उच्चतम न्यायालय), दलीय प्रणाली, मतदान व्यवहार, राजस्थान की राजनीति, भारत की विदेश नीति, अंतर्राष्ट्रीय मामले।", status: "not_started" }
    ],
  },
  {
    id: "ras-mains-3-2",
    paper: "Mains GS3",
    subject: "इकाई II: लोक प्रशासन (GS III)",
    module: "लोक प्रशासन",
    title: "इकाई II: लोक प्रशासन (GS III)",
    yield: "🔥 High Yield",
    weightagePercentage: 33.3,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "अवधारणाएँ (नव लोक प्रशासन, वैज्ञानिक प्रबंध), संगठन के सिद्धांत, लोक सेवा आयोग, कार्मिक प्रशासन, जिला प्रशासन।", status: "not_started" }
    ],
  },
  {
    id: "ras-mains-3-3",
    paper: "Mains GS3",
    subject: "इकाई III: व्यवहार एवं विधि (GS III)",
    module: "व्यवहार एवं विधि",
    title: "इकाई III: व्यवहार एवं विधि (GS III)",
    yield: "⭐ Medium Yield",
    weightagePercentage: 33.3,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "खण्ड अ (व्यवहार): बुद्धि, नेतृत्व प्रोफ़ाइल, संचार, तनाव प्रबंधन।", status: "not_started" },
      { title: "खण्ड ब (विधि): सूचना का अधिकार (RTI 2005), IT एक्ट 2000, महिलाओं एवं बच्चों के विरुद्ध अपराध, राजस्थान काश्तकारी/भू-राजस्व अधिनियम, BNS (2023) एवं BNSS (2023) के प्रावधान।", status: "not_started" }
    ],
  },

  {
    id: "ras-mains-4-1",
    paper: "Mains GS4",
    subject: "सामान्य हिन्दी",
    module: "भाषा",
    title: "सामान्य हिन्दी (GS IV)",
    yield: "🔥 High Yield",
    weightagePercentage: 45.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "भाग अ (30 अंक): उपसर्ग, प्रत्यय, शब्द/वाक्य शुद्धि, मुहावरे, लोकोक्तियाँ, पारिभाषिक शब्दावली।", status: "not_started" },
      { title: "भाग ब (30 अंक): संक्षिप्तीकरण, पल्लवन, अनुवाद।", status: "not_started" },
      { title: "भाग स (30 अंक): पत्र-लेखन, प्रारूप-लेखन।", status: "not_started" }
    ],
  },
  {
    id: "ras-mains-4-2",
    paper: "Mains GS4",
    subject: "General English",
    module: "भाषा",
    title: "General English (GS IV)",
    yield: "⭐ Medium Yield",
    weightagePercentage: 35.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "Part A (20 Marks): Preposition, Phrasal Verbs, One Word Substitute, Words confused/misused.", status: "not_started" },
      { title: "Part B (30 Marks): Comprehension, Translation, Precis Writing.", status: "not_started" },
      { title: "Part C (20 Marks): Elaboration of theme, Official Letter/Report Writing.", status: "not_started" }
    ],
  },
  {
    id: "ras-mains-4-3",
    paper: "Mains GS4",
    subject: "निबंध / Essay",
    module: "भाषा",
    title: "निबंध / Essay (GS IV)",
    yield: "🔥 High Yield",
    weightagePercentage: 20.0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: [
      { title: "लगभग 600 शब्दों का एक निबंध (हिन्दी या अंग्रेजी में)। (विषय: साहित्य, संस्कृति, विज्ञान, अर्थव्यवस्था, समसामयिक घटनाएँ)।", status: "not_started" }
    ],
  },
];

export const DEFAULT_STUDY_PLAN: StudyPlanPhase[] = [];
