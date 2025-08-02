import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";
import Heatmap from "../Heatmap";

export default function HeatmapComponent() {
  const { currentUser } = useAuth();
  const [habitLogs, setHabitLogs] = useState({});

  useEffect(() => {
    if (!currentUser) return;

    const docRef = doc(db, "habitLogs", currentUser.uid);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setHabitLogs(snapshot.data());
      }
    });

    return () => unsubscribe(); // clean up listener on unmount
  }, [currentUser]);

  return (
    <div className="bg-gray-900/90 p-6 rounded-xl shadow text-white min-h-[200px]">
      <h2 className="text-xl font-semibold mb-2">Heatmap</h2>
      <Heatmap habitLogs={habitLogs} />
    </div>
  );
}
