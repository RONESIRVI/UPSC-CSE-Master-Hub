import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAApIPg2Fg_s4S1ZUKyKEx_XQA_xRvVgSg",
  authDomain: "upsc-conquest.firebaseapp.com",
  projectId: "upsc-conquest",
  storageBucket: "upsc-conquest.firebasestorage.app",
  messagingSenderId: "1089531561172",
  appId: "1:1089531561172:android:49dd52b7fb69cc128ce741" // Using the provided Android appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a a time.
    console.warn("Firebase persistence failed-precondition");
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the features required to enable persistence
    console.warn("Firebase persistence unimplemented in this browser");
  }
});
