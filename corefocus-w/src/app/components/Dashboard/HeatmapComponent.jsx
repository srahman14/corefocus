import { useEffect, useState } from "react";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";
import Heatmap from "../Heatmap";
import { addDays, format } from "date-fns";

export default function HeatmapComponent() {
  const { currentUser } = useAuth();
  const [habitLogs, setHabitLogs] = useState({});

  useEffect(() => {
    if (!currentUser?.uid) return;
    const currentMonth = format(new Date(), "yyyy-MM"); // e.g. "2025-09"
    const colRef = collection(db, "habitLogs", currentUser.uid, currentMonth);

    console.log("[Analytics] subscribing to habitLogs collection:", {
      path: `habitLogs/${currentUser.uid}/${currentMonth}`,
    });

    const unsubscribe = onSnapshot(
      colRef,
      (querySnap) => {
        const monthData = {};
        querySnap.forEach((doc) => {
          // expecting doc.id === "yyyy-MM-dd" and doc.data() includes { completedHabits, count }
          monthData[doc.id] = doc.data();
        });

        console.log("[Analytics] monthData snapshot:", monthData);
        setHabitLogs(monthData);
      },
      (err) => {
        console.error("[Analytics] habitLogs onSnapshot error:", err);
        setHabitLogs({});
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="rounded-xl shadow text-white min-h-[200px]">
      <Heatmap habitLogs={habitLogs} />
    </div>
  );
}
