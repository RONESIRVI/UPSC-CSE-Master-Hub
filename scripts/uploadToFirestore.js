import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
  apiKey: "AIzaSyAApIPg2Fg_s4S1ZUKyKEx_XQA_xRvVgSg",
  authDomain: "upsc-conquest.firebaseapp.com",
  projectId: "upsc-conquest",
  storageBucket: "upsc-conquest.firebasestorage.app",
  messagingSenderId: "1089531561172",
  appId: "1:1089531561172:android:49dd52b7fb69cc128ce741"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadData = async () => {
  try {
    const dataPath = path.join(__dirname, "../src/data/generatedToppersData.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const data = JSON.parse(rawData);

    console.log("Uploading TOPPERS_PROFILES...");
    await setDoc(doc(db, "appData", "TOPPERS_PROFILES"), { data: data.TOPPERS_PROFILES || [] });

    console.log("Uploading STRATEGY_SETUP...");
    await setDoc(doc(db, "appData", "STRATEGY_SETUP"), { data: data.STRATEGY_SETUP || [] });

    console.log("Uploading TOPPER_ROUTINES...");
    await setDoc(doc(db, "appData", "TOPPER_ROUTINES"), { data: data.TOPPER_ROUTINES || [] });

    console.log("Uploading INTERVIEW_TRANSCRIPTS...");
    await setDoc(doc(db, "appData", "INTERVIEW_TRANSCRIPTS"), { data: data.INTERVIEW_TRANSCRIPTS || [] });

    console.log("✅ All data successfully uploaded to Firestore!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error uploading to Firestore:", error);
    process.exit(1);
  }
};

uploadData();
