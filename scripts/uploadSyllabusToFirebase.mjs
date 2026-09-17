/**
 * Script: uploadSyllabusToFirebase.mjs
 * Purpose: Read RAS_Master_Pre_Mains.xlsx and upload syllabus topics to Firebase Firestore
 * Run: node scripts/uploadSyllabusToFirebase.mjs
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Firebase Admin Init ───────────────────────────────────────────────────
const serviceAccountPath = path.join(__dirname, "../firebase-service-account.json");
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
} catch (e) {
  console.error("❌ firebase-service-account.json not found!");
  console.error("   Download it from: Firebase Console → Project Settings → Service Accounts → Generate new private key");
  console.error("   Save as: firebase-service-account.json in project root");
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ─── Paper Mapping ─────────────────────────────────────────────────────────
const PAPER_MAP = {
  "Pre Paper":      "Prelims GS1",
  "Mains Paper I":  "Mains GS1",
  "Mains Paper II": "Mains GS2",
  "Mains Paper III":"Mains GS3",
  "Mains Paper IV": "Mains GS4",
};

// ─── Priority → Yield mapping ──────────────────────────────────────────────
function mapYield(priority) {
  if (!priority) return "📘 Standard";
  const stars = (priority.match(/★/g) || []).length;
  if (stars >= 4) return "🔥 High Yield";
  if (stars >= 3) return "⭐ Medium Yield";
  return "📘 Standard";
}

// ─── Parse Excel ───────────────────────────────────────────────────────────
const excelPath = "C:/Users/jlpms/Downloads/Telegram Desktop/RAS_Master_Pre_Mains.xlsx";
console.log("📂 Reading Excel:", excelPath);

const wb = XLSX.readFile(excelPath);
const ws = wb.Sheets["📊 Master Table (App Import)"];
const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });

// Row index 1 = headers, rows from index 2 onwards = data
const headers = rawData[1];
const dataRows = rawData.slice(2).filter(row => row[0]); // filter empty rows

console.log(`📊 Total rows found: ${dataRows.length}`);

// ─── Convert rows to SyllabusTopic objects ─────────────────────────────────
const syllabusTopics = dataRows.map((row) => {
  const srNo    = row[0];   // A: Sr.No.
  const exam    = row[1];   // B: Exam (Pre/Mains)
  const paper   = row[2];   // C: Paper
  const paperFullName = row[3]; // D: Paper Full Name
  const subject = row[4];   // E: Subject/Section
  const unit    = row[5];   // F: Unit
  const topic   = row[6];   // G: Topic
  const subTopic = row[7];  // H: Sub-Topic
  const kyaTaiyar = row[8]; // I: Kya Taiyar Karen
  const priority = row[9];  // J: Priority (★★★★☆)
  const preQsEst = row[10]; // K: Pre Qs Est.
  const qType   = row[11];  // L: Type (MCQ/Desc)
  const source  = row[12];  // M: Source/Resource
  const commonPM = row[13]; // N: Common Pre+Mains
  const tips    = row[14];  // O: Notes / Exam Tips

  const mappedPaper = PAPER_MAP[paper] || paper || "Prelims GS1";
  const id = `ras-${exam === "Pre" ? "pre" : "mains"}-${String(srNo).padStart(3, "0")}`;

  // Build subtopics array from Sub-Topic string
  const subtopicList = subTopic
    ? String(subTopic).split(/[;,]/).map(s => s.trim()).filter(Boolean).map(t => ({
        title: t,
        status: "not_started"
      }))
    : [];

  return {
    id,
    paper: mappedPaper,
    subject: String(subject || ""),
    module: String(unit || "—"),
    title: String(topic || ""),
    yield: mapYield(String(priority || "")),
    weightagePercentage: 0,
    pyqFrequencyLast5Years: 0,
    status: "not_started",
    notes: "",
    subtopics: subtopicList,
    // Extra RAS-specific fields
    priority: String(priority || ""),
    questionEstimate: String(preQsEst || ""),
    questionType: String(qType || "MCQ"),
    source: String(source || ""),
    commonPreMains: String(commonPM || "").toLowerCase() === "yes",
    examTips: String(tips || ""),
    studyGuide: String(kyaTaiyar || ""),
    paperFullName: String(paperFullName || ""),
  };
});

console.log(`✅ Converted ${syllabusTopics.length} topics`);

// Log paper breakdown
const paperCounts = {};
syllabusTopics.forEach(t => {
  paperCounts[t.paper] = (paperCounts[t.paper] || 0) + 1;
});
console.log("📋 Paper breakdown:", paperCounts);

// ─── Upload to Firestore ───────────────────────────────────────────────────
async function uploadToFirestore() {
  console.log("\n🚀 Uploading to Firebase Firestore...");
  
  const docRef = db.collection("appData").doc("SYLLABUS_TOPICS");
  
  await docRef.set({
    updatedAt: new Date().toISOString(),
    uploadedBy: "Excel Script",
    totalTopics: syllabusTopics.length,
    data: syllabusTopics,
  });

  console.log(`✅ Successfully uploaded ${syllabusTopics.length} syllabus topics!`);
  console.log("📍 Firestore path: appData/SYLLABUS_TOPICS");
  console.log("\n📊 Summary:");
  Object.entries(paperCounts).forEach(([paper, count]) => {
    console.log(`   ${paper}: ${count} topics`);
  });
}

uploadToFirestore().catch(console.error);
