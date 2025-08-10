import { useEffect, useRef, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import debounce from "lodash.debounce";
import { format } from "date-fns";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import useModalStore from "@/app/store/modalStore";

export default function TodaysHabits() {
  const { currentUser, loading } = useAuth();
  const [todaysHabits, setTodaysHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [todayShort, setTodayShort] = useState(null);
  const notificationSound = useRef(null);

  const fullToShortDayMap = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tues",
    Wednesday: "Wed",
    Thursday: "Thurs",
    Friday: "Fri",
    Saturday: "Sat",
  };

  useEffect(() => {
    const todayFull = new Date().toLocaleDateString("en-US", { weekday: "long" });
    setTodayShort(fullToShortDayMap[todayFull]);
  }, []);

  if (!todayShort) {
    // Optionally render null or a loader while client date initializes
    return null;
  }
  // const todayFull = new Date().toLocaleDateString("en-US", { weekday: "long" });
  // const today = fullToShortDayMap[todayFull];
  const { openModal } = useModalStore();

useEffect(() => {
  if (!currentUser) return;

  const fetchHabitsAndListen = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "users", currentUser.uid, "habits")
      );

      const habits = [];
      const weekday = new Date().toLocaleDateString("en-US", {
        weekday: "long",
      });
      const shortDay = fullToShortDayMap[weekday];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.habitFreq?.includes(shortDay)) {
          habits.push({ id: doc.id, ...data });
        }
      });

      setTodaysHabits(habits);

      const todayFormatted = format(new Date(), "yyyy-MM-dd");
      const logRef = doc(db, "habitLogs", currentUser.uid);

      const unsubscribe = onSnapshot(logRef, (docSnap) => {
        if (docSnap.exists()) {
          const todayLog = docSnap.data()[todayFormatted];
          if (todayLog?.completedHabits) {
            setCompletedHabits(todayLog.completedHabits);
          } else {
            setCompletedHabits([]);
          }
        } else {
          setCompletedHabits([]);
        }
      });

      return unsubscribe;
    } catch (err) {
      console.error("Error fetching habits or logs:", err);
    }
  };

  const unsubscribePromise = fetchHabitsAndListen();

  return () => {
    // Make sure to clean up snapshot listener
    unsubscribePromise.then((unsubscribe) => {
      if (typeof unsubscribe === "function") unsubscribe();
    });
  };
}, [currentUser]);

  function toggleHabit(habitId) {
    setCompletedHabits((prev) => {
      const updated = prev.includes(habitId)
        ? prev.filter((h) => h !== habitId)
        : [...prev, habitId];

      debouncedUpdateHabits(updated);
      return updated;
    });
  }

  const debouncedUpdateHabits = useCallback(
    debounce(async (updatedList) => {
      if (!currentUser) return;
      const docRef = doc(db, "habitLogs", currentUser.uid);
      const todayFormatted = format(new Date(), "yyyy-MM-dd");
      
      const toastId = toast.loading("Updating habits...");
      // Debugging
      // console.log("Debounced save for:", todayFormatted, updatedList);

      try {
        await setDoc(
          docRef,
          {
            [todayFormatted]: {
              completedHabits: updatedList,
              count: updatedList.length,
            },
          },
          { merge: true }
        );
        
        notificationSound.current?.play();
        toast.success("Habits saved!", { id: toastId });
      } catch (error) {
        toast.error("Failed to save habits", { id: toastId });
      }
    }, 500),
    [currentUser]
  );

  // const debouncedUpdateHabits = useRef(
  //   debounce(async (updatedList) => {
  //     if (!currentUser) return;
  //     const docRef = doc(db, "habitLogs", currentUser.uid);

  //     try {
  //       const snapshot = await getDoc(docRef);
  //       const prevData = snapshot.exists() ? snapshot.data() : {};

  //       await setDoc(
  //         docRef,
  //         {
  //           [today]: {
  //             completedHabits: updatedList,
  //             count: updatedList.length,
  //           },
  //         },
  //         { merge: true }
  //       );
  //     } catch (error) {
  //       console.error("Error updating habit log:", error);
  //     }
  //   }, 300)
  // ).current;

  const progress = todaysHabits.length
    ? Math.round((completedHabits.length / todaysHabits.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-full p-4 bg-gradient-to-br from-[#070C2F] via-[#110E2D] to-[#13153F] rounded-xl shadow-md">
      <audio ref={notificationSound} src="/sounds/notification.mp3" preload="auto" />

      <div className="py-4 flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Habits for Today
        </h2>

        <button onClick={openModal} className="cursor-pointer">
            <i className="fa-solid fa-plus text-white text-xl bg-[#520dd0] p-2 rounded-lg hover:bg-[#520dd0]/80"></i>
        </button>
      </div>

      {todaysHabits.length === 0 ? (
        <p className="text-gray-500 italic">No habits scheduled for today.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {todaysHabits.map((habit) => (
              <li
                key={habit.id}
                className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <Checkbox.Root
                  className="flex size-[25px] min-w-[25px] appearance-none items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow focus:outline-none focus:ring-2 focus:ring-violet-500"
                  checked={completedHabits.includes(habit.id)}
                  onCheckedChange={() => toggleHabit(habit.id)}
                  id={`habit-${habit.id}`}
                >
                  <Checkbox.Indicator className="text-[#520dd0]">
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label
                  htmlFor={`habit-${habit.id}`}
                  className={`text-lg select-none cursor-pointer ${
                    completedHabits.includes(habit.id)
                      ? "line-through text-gray-400"
                      : "text-gray-800 dark:text-white"
                  }`}
                >
                  {habit.habitName}
                </label>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
              <span>
                {completedHabits.length} of {todaysHabits.length} complete
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-[#520dd0] h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
