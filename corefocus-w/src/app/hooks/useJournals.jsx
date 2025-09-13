// hooks/useJournals.js
"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, limit as limitDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";

export default function useJournals({ limit } = {}) {
  const { currentUser } = useAuth();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser?.uid) {
      setJournals([]);
      setLoading(false);
      return;
    }

    try {
      let q = query(
        collection(db, "users", currentUser.uid, "journals"),
        orderBy("updatedAt", "desc")
      );

      if (limit) {
        q = query(
          collection(db, "users", currentUser.uid, "journals"),
          orderBy("updatedAt", "desc"),
          limitDocs(limit)
        );
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetched = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setJournals(fetched);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching journals:", err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  }, [currentUser?.uid, limit]);

  return { journals, loading, error };
}
