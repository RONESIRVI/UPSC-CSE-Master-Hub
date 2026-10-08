/**
 * Script: uploadToFirestore.js
 * Purpose: Upload generatedToppersData.json to Firebase Firestore
 * Run: node scripts/uploadToFirestore.js
 * Uses firebase-admin (server-side SDK)
 *
 * NOTE: TOPPERS_PROFILES is split into chunks of 10 because
 * Firestore has a 1MB per-document limit and the full array is ~3.4MB.
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Firebase Admin Init ────────────────────────────────────────────────────
const serviceAccountPath = path.join(__dirname, "../firebase-service-account.json");
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
} catch (e) {
  console.error("❌ firebase-service-account.json not found at:", serviceAccountPath);
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();
db.settings({ preferRest: true });

// ─── Helper: upload small collections as single doc ─────────────────────────
async function uploadSingleDoc(collectionId, docId, data) {
  await db.collection(collectionId).doc(docId).set({ data });
  console.log(`   ✅ ${docId} done`);
}

// ─── Helper: upload large arrays in chunks (max ~800KB each) ────────────────
async function uploadChunked(collectionId, baseDocId, items, chunkSize = 10) {
  const totalChunks = Math.ceil(items.length / chunkSize);
  console.log(`   📦 Splitting into ${totalChunks} chunks of ${chunkSize}...`);

  // Write a metadata/index doc so the app knows how many chunks there are
  await db.collection(collectionId).doc(baseDocId).set({
    chunked: true,
    totalChunks,
    totalItems: items.length,
    updatedAt: new Date().toISOString(),
  });

  for (let i = 0; i < totalChunks; i++) {
    const chunk = items.slice(i * chunkSize, (i + 1) * chunkSize);
    const chunkDocId = `${baseDocId}_chunk_${i}`;
    await db.collection(collectionId).doc(chunkDocId).set({ data: chunk, chunkIndex: i });
    console.log(`   ✅ Chunk ${i + 1}/${totalChunks} uploaded (${chunk.length} items)`);
  }
}

// ─── Main Upload ─────────────────────────────────────────────────────────────
const uploadData = async () => {
  try {
    const dataPath = path.join(__dirname, "../src/data/generatedToppersData.json");
    const rawData = readFileSync(dataPath, "utf-8");
    const data = JSON.parse(rawData);

    // TOPPERS_PROFILES is small enough now, no need for chunking
    console.log("🚀 Uploading TOPPERS_PROFILES...");
    await uploadSingleDoc("appData", "TOPPERS_PROFILES", data.TOPPERS_PROFILES || []);

    console.log("🚀 Uploading STRATEGY_SETUP...");
    await uploadSingleDoc("appData", "STRATEGY_SETUP", data.STRATEGY_SETUP || []);

    console.log("🚀 Uploading TOPPER_ROUTINES...");
    await uploadSingleDoc("appData", "TOPPER_ROUTINES", data.TOPPER_ROUTINES || []);

    console.log("🚀 Uploading INTERVIEW_TRANSCRIPTS...");
    await uploadSingleDoc("appData", "INTERVIEW_TRANSCRIPTS", data.INTERVIEW_TRANSCRIPTS || []);

    console.log("🚀 Uploading TOPPER_NOTES...");
    await uploadSingleDoc("appData", "TOPPER_NOTES", data.TOPPER_NOTES || []);

    console.log("\n✅ All data successfully uploaded to Firestore!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error uploading to Firestore:", error.message || error);
    process.exit(1);
  }
};

uploadData();
