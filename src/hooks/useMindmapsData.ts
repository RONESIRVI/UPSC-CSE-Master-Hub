import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Mindmap } from "../types";

export function useMindmapsData() {
  const [mindmaps, setMindmaps] = useState<Mindmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      setError("Firebase not initialized");
      return;
    }

    const mindmapsRef = collection(db, "mindmaps");
    const q = query(mindmapsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Mindmap[];
        setMindmaps(data);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching mindmaps:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addMindmap = async (mindmap: Omit<Mindmap, "id" | "createdAt">) => {
    if (!db) throw new Error("Firebase not initialized");
    try {
      const id = `mm_${Date.now()}`;
      const docRef = doc(db, "mindmaps", id);
      await setDoc(docRef, {
        ...mindmap,
        id,
        createdAt: new Date().toISOString()
      });
      return id;
    } catch (err) {
      console.error("Error adding mindmap:", err);
      throw err;
    }
  };

  const deleteMindmap = async (id: string) => {
    if (!db) throw new Error("Firebase not initialized");
    try {
      await deleteDoc(doc(db, "mindmaps", id));
    } catch (err) {
      console.error("Error deleting mindmap:", err);
      throw err;
    }
  };

  return { mindmaps, loading, error, addMindmap, deleteMindmap };
}
