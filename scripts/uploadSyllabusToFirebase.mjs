/**
 * Script: uploadSyllabusToFirebase.mjs
 * Purpose: Read ras_syllabus_data.xlsx and upload syllabus topics to Firebase Firestore
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
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ─── Parse Excel ───────────────────────────────────────────────────────────
const excelPath = path.join(__dirname, "../Update_App_Data/ras_syllabus_data.xlsx");
console.log("📂 Reading Excel:", excelPath);

const wb = XLSX.readFile(excelPath);
const ws = wb.Sheets["Syllabus"];
if (!ws) {
  console.error("❌ Sheet 'Syllabus' not found in excel file!");
  process.exit(1);
}
const rawData = XLSX.utils.sheet_to_json(ws);

console.log(`📊 Total rows found: ${rawData.length}`);

// ─── Convert rows to SyllabusTopic objects ─────────────────────────────────
const syllabusTopics = rawData.map((row) => {
  // Build subtopics array from Sub-Topic string
  let subtopicList = [];
  if (row.subtopics) {
    if (typeof row.subtopics === 'string') {
        subtopicList = row.subtopics.split(/[;,]/).map(s => s.trim()).filter(Boolean).map(t => ({
            title: t,
            status: "not_started"
        }));
    } else {
        subtopicList = [{ title: String(row.subtopics), status: "not_started" }];
    }
  }

  return {
    id: String(row.id || ""),
    paper: String(row.paper || ""),
    subject: String(row.subject || ""),
    module: String(row.module || "—"),
    title: String(row.title || ""),
    yield: String(row.yield || ""),
    weightagePercentage: Number(row.weightagePercentage) || 0,
    pyqFrequencyLast5Years: Number(row.pyqFrequencyLast5Years) || 0,
    status: String(row.status || "not_started"),
    notes: String(row.notes || ""),
    subtopics: subtopicList,
    // Extra RAS-specific fields
    priority: String(row.priority || ""),
    questionEstimate: String(row.questionEstimate || ""),
    questionType: String(row.questionType || "MCQ"),
    source: String(row.source || ""),
    commonPreMains: String(row.commonPreMains || "").toLowerCase() === "yes" || row.commonPreMains === true,
    examTips: String(row.examTips || ""),
    studyGuide: String(row.studyGuide || ""),
    paperFullName: String(row.paperFullName || ""),
  };
});

console.log(`✅ Converted ${syllabusTopics.length} topics`);

// Log paper breakdown
const paperCounts = {};
syllabusTopics.forEach(t => {
  if(t.paper) {
    paperCounts[t.paper] = (paperCounts[t.paper] || 0) + 1;
  }
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
