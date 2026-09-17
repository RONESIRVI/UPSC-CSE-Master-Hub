import { useState, useEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { TopperProfile, StrategySetupItem, TopperRoutine, InterviewTranscript, SyllabusTopic } from "../types";
import { Capacitor } from "@capacitor/core";

// Import fallback data in case Firebase is offline or empty
import fallbackData from "../data/generatedToppersData.json";

export const useFirestoreData = () => {
  const [toppers, setToppers] = useState<TopperProfile[]>(fallbackData.TOPPERS_PROFILES as TopperProfile[]);
  const [strategies, setStrategies] = useState<StrategySetupItem[]>(fallbackData.STRATEGY_SETUP as StrategySetupItem[]);
  const [routines, setRoutines] = useState<TopperRoutine[]>(fallbackData.TOPPER_ROUTINES as TopperRoutine[]);
  const [interviews, setInterviews] = useState<InterviewTranscript[]>(fallbackData.INTERVIEW_TRANSCRIPTS as InterviewTranscript[]);
  const [notes, setNotes] = useState<any[]>(fallbackData.TOPPER_NOTES || []);
  const [syllabusTopics, setSyllabusTopics] = useState<SyllabusTopic[] | null>(null); // null = not yet loaded
  const [loading, setLoading] = useState(true);

  const initialLoad = useRef(true);

  useEffect(() => {
    let notifyTimeout: NodeJS.Timeout;
    const triggerUpdateNotification = () => {
      if (!initialLoad.current && Capacitor.isNativePlatform()) {
        clearTimeout(notifyTimeout);
        notifyTimeout = setTimeout(() => {
          import('@capacitor/local-notifications').then(({ LocalNotifications }) => {
            LocalNotifications.schedule({
              notifications: [{
                title: "✅ Data Sync Complete",
                body: "Excel Data has been updated successfully via Cloud.",
                id: 99,
                schedule: { at: new Date(Date.now() + 500) }
              }]
            });
          });
        }, 1500); // Debounce multiple collection updates
      }
    };

    const unsubToppers = onSnapshot(doc(db, "appData", "TOPPERS_PROFILES"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().data) {
        setToppers(docSnap.data().data);
        triggerUpdateNotification();
      }
    });

    const unsubStrategies = onSnapshot(doc(db, "appData", "STRATEGY_SETUP"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().data) {
        setStrategies(docSnap.data().data);
        triggerUpdateNotification();
      }
    });

    const unsubRoutines = onSnapshot(doc(db, "appData", "TOPPER_ROUTINES"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().data) {
        setRoutines(docSnap.data().data);
        triggerUpdateNotification();
      }
    });

    const unsubInterviews = onSnapshot(doc(db, "appData", "INTERVIEW_TRANSCRIPTS"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().data) {
        setInterviews(docSnap.data().data);
        triggerUpdateNotification();
      }
    });

    const unsubNotes = onSnapshot(doc(db, "appData", "TOPPER_NOTES"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().data) {
        setNotes(docSnap.data().data);
        triggerUpdateNotification();
      }
      setLoading(false);
    });

    // ─── Syllabus Topics from Firebase ─────────────────────────────────────
    const unsubSyllabus = onSnapshot(doc(db, "appData", "SYLLABUS_TOPICS"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().data && Array.isArray(docSnap.data().data)) {
        setSyllabusTopics(docSnap.data().data as SyllabusTopic[]);
        triggerUpdateNotification();
        console.log(`[Firebase] Syllabus loaded: ${docSnap.data().data.length} topics`);
      } else {
        setSyllabusTopics(null); // fallback to default
      }
    });

    const timer = setTimeout(() => {
      initialLoad.current = false;
    }, 5000);

    return () => {
      unsubToppers();
      unsubStrategies();
      unsubRoutines();
      unsubInterviews();
      unsubNotes();
      unsubSyllabus();
      clearTimeout(notifyTimeout);
      clearTimeout(timer);
    };
  }, []);

  return { toppers, strategies, routines, interviews, notes, syllabusTopics, loading };
};
