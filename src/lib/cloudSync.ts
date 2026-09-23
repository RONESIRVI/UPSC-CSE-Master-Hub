import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// Define the shape of the data we want to sync
export interface UserBackupData {
  userProfile?: any;
  syllabus?: any;
  studyPlan?: any;
  sessionLogs?: any;
  mockLogs?: any;
  revisionQueue?: any;
  pyqs?: any;
  audioNotes?: any;
  dailyTasks?: any;
  studyStreak?: any;
  dDays?: any;
  lastSyncedAt?: number;
}

export const backupUserData = async (uid: string, data: Partial<UserBackupData>) => {
  try {
    const userDocRef = doc(db, "users", uid);
    
    const payload = {
      ...data,
      lastSyncedAt: Date.now(),
    };

    // Use merge to avoid overwriting fields not provided in this backup call
    await setDoc(userDocRef, payload, { merge: true });
    console.log("[CloudSync] Backup successful for user:", uid);
    return true;
  } catch (error) {
    console.error("[CloudSync] Backup failed:", error);
    return false;
  }
};

export const restoreUserData = async (uid: string): Promise<UserBackupData | null> => {
  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as UserBackupData;
      console.log("[CloudSync] Restore successful for user:", uid);
      return data;
    } else {
      console.log("[CloudSync] No cloud backup found for user:", uid);
      return null;
    }
  } catch (error) {
    console.error("[CloudSync] Restore failed:", error);
    throw error;
  }
};
