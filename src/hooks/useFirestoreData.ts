import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { TopperProfile, StrategySetupItem, TopperRoutine, InterviewTranscript } from "../types";

// Import fallback data in case Firebase is offline or empty
import fallbackData from "../data/generatedToppersData.json";

export const useFirestoreData = () => {
  const [toppers, setToppers] = useState<TopperProfile[]>(fallbackData.TOPPERS_PROFILES as TopperProfile[]);
  const [strategies, setStrategies] = useState<StrategySetupItem[]>(fallbackData.STRATEGY_SETUP as StrategySetupItem[]);
  const [routines, setRoutines] = useState<TopperRoutine[]>(fallbackData.TOPPER_ROUTINES as TopperRoutine[]);
  const [interviews, setInterviews] = useState<InterviewTranscript[]>(fallbackData.INTERVIEW_TRANSCRIPTS as InterviewTranscript[]);
  const [notes, setNotes] = useState<any[]>(fallbackData.TOPPER_NOTES || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubToppers = onSnapshot(doc(db, "appData", "TOPPERS_PROFILES"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().data) {
        setToppers(docSnap.data().data);
      }
    });

    const unsubStrategies = onSnapshot(doc(db, "appData", "STRATEGY_SETUP"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().data) {
        setStrategies(docSnap.data().data);
      }
    });

    const unsubRoutines = onSnapshot(doc(db, "appData", "TOPPER_ROUTINES"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().data) {
        setRoutines(docSnap.data().data);
      }
    });

    const unsubInterviews = onSnapshot(doc(db, "appData", "INTERVIEW_TRANSCRIPTS"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().data) {
        setInterviews(docSnap.data().data);
      }
    });

    const unsubNotes = onSnapshot(doc(db, "appData", "TOPPER_NOTES"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().data) {
        setNotes(docSnap.data().data);
      }
      setLoading(false);
    });

    return () => {
      unsubToppers();
      unsubStrategies();
      unsubRoutines();
      unsubInterviews();
      unsubNotes();
    };
  }, []);

  return { toppers, strategies, routines, interviews, notes, loading };
};
