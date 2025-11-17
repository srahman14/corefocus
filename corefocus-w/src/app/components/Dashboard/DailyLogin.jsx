import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { format, startOfWeek, isSameDay } from "date-fns";

export default function DailyLoginComponent() {
  const { currentUser } = useAuth();
  const [loggedInDays, setLoggedInDays] = useState([]);
  const [weeklyStreak, setWeeklyStreak] = useState(0);

  // A list of weekdays to render the UI
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  /**
   * Correctly calculates the consecutive login streak from the most recent day.
   * The streak resets if a day is missed.
   * @param {string[]} loggedDays - Array of weekday strings (e.g., ["Monday", "Tuesday"]).
   * @returns {number} The current consecutive streak.
   */
  const calculateWeeklyStreak = (loggedDays) => {
    // If no days are logged, the streak is 0.
    if (!loggedDays || loggedDays.length === 0) {
      return 0;
    }

    let streak = 0;
    // Get today's weekday for comparison
    const today = format(new Date(), "EEEE");
    const todayIndex = weekdays.indexOf(today);
    
    // Streak is calculated backwards from today
    // This correctly identifies breaks in the streak
    for (let i = todayIndex; i >= 0; i--) {
      const day = weekdays[i];
      if (loggedDays.includes(day)) {
        streak++;
      } else {
        // Break the loop as soon as a non-consecutive day is found
        break;
      }
    }
    
    return streak;
  };

  /**
   * Gets the formatted date string for the start of the current week (Monday).
   * @returns {string} The start of the week in "yyyy-MM-dd" format.
   */
  const getStartOfWeek = (date = new Date()) => {
    return format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd");
  };

  /**
   * Gets the weekday string for the current day.
   * @returns {string} The weekday string (e.g., "Monday").
   */
  const getTodayWeekday = () => {
    return format(new Date(), "EEEE");
  };

  // This useEffect handles the initial login and Firestore write logic.
  // It runs only once on component mount.
  useEffect(() => {
    if (!currentUser) return;

    const uid = currentUser.uid;
    const today = getTodayWeekday();
    const thisWeekStart = getStartOfWeek();
    const docRef = doc(db, "users", uid, "tracking", "weeklyLogins");

    const updateStreakMeta = async (currentStreak) => {
    const streakMetaRef = doc(db, "users", currentUser.uid, "tracking", "streakMeta");
    const streakMetaSnap = await getDoc(streakMetaRef);
    
    if (!streakMetaSnap.exists()) {
      // Calculate the current streak using the same logic
      let initialStreak = calculateWeeklyStreak(loggedInDays);
      // Use whichever streak is higher (new login might have increased it)
      const highestStreak = Math.max(initialStreak, currentStreak);
      console.log("Highest streak: ", highestStreak)
      
      await setDoc(streakMetaRef, {
        longestStreak: highestStreak,
        updatedAt: new Date()
      });
    } else {
      const streakData = streakMetaSnap.data();
      if (currentStreak > (streakData.longestStreak || 0)) {
        await setDoc(streakMetaRef, {
          longestStreak: currentStreak,
          updatedAt: new Date()
        });
      }
    }
  };

  const checkAndLogDailyLogin = async () => {
      try {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        // Check if it's a new week or the first login ever
        if (!data || data.weekStart !== thisWeekStart) {
          // Reset data for the new week and add today's login
          await setDoc(docRef, {
            weekStart: thisWeekStart,
            daysLoggedIn: [today],
            lastLoginDate: new Date(), // Storing last login date to prevent duplicate logins today
          });
        } else {
          // It's the same week, check if today has already been logged
          const lastLogin = data.lastLoginDate?.toDate();
          if (lastLogin && isSameDay(lastLogin, new Date())) {
            console.log("Already logged in today.");
            return;
          }

          // Update the existing document with today's login
          const alreadyLogged = data.daysLoggedIn.includes(today);
          if (!alreadyLogged) {
            const newDaysLoggedIn = [...data.daysLoggedIn, today];
            await updateDoc(docRef, {
              daysLoggedIn: newDaysLoggedIn,
              lastLoginDate: new Date(),
            });
            
            // Calculate and update streak meta
            const currentStreak = calculateWeeklyStreak(newDaysLoggedIn);
            await updateStreakMeta(currentStreak);
          }
        }
      } catch (err) {
        console.error("Error logging daily login:", err);
      }
    };
    
    // Call the function to perform the login check and write
    checkAndLogDailyLogin();
  }, [currentUser]);

  // This useEffect sets up the real-time listener to sync the UI with Firestore.
  // It runs whenever currentUser changes.
  useEffect(() => {
    if (!currentUser) return;

    const docRef = doc(db, "users", currentUser.uid, "tracking", "weeklyLogins");
    
    // The onSnapshot listener only reads the data and updates the state.
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        setLoggedInDays(data.daysLoggedIn || []);
      } else {
        // If the document doesn't exist, reset the state
        setLoggedInDays([]);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [currentUser]);

  // Use another useEffect to calculate the streak whenever loggedInDays changes
  useEffect(() => {
    setWeeklyStreak(calculateWeeklyStreak(loggedInDays));
  }, [loggedInDays]);

  // Mobile: compute previous, current and next weekday for compact view
  const todayWeekday = getTodayWeekday();
  const todayIndex = weekdays.indexOf(todayWeekday);
  const prevDay = weekdays[(todayIndex - 1 + 7) % 7];
  const currentDay = weekdays[todayIndex];
  const nextDay = weekdays[(todayIndex + 1) % 7];
  const isPrevLoggedIn = loggedInDays.includes(prevDay);
  const isCurrentLoggedIn = loggedInDays.includes(currentDay);
  const isNextLoggedIn = loggedInDays.includes(nextDay);

  return (
    <div className="container bg-gradient-to-br from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#070C2F] dark:via-[#110E2D] dark:to-[#13153F] rounded-xl shadow-md text-white p-4 w-full lg:h-[280px]">
      <div className="flex justify-between items-center md:justify-end">
        <span className="md:hidden flex font-bold text-2xl tracking-tighter px-4 text-[#7E4E9E]">
          Daily Login
        </span>
        <span className={`flex items-center gap-3 p-6 ${
          weeklyStreak === 0 ? "hidden" : "text-[#7E4E9E] font-bold dark:text-yellow-400"
        }`}>
          <i className="fa-solid fa-fire"></i>
          <p>
            {weeklyStreak} {weeklyStreak === 1 ? "day" : "days"}
          </p>
        </span>
      </div>
      <ul className="hidden md:flex flex-row md:gap-10 justify-center items-center pb-18">
        {weekdays.map((weekday) => {
          const isLoggedIn = loggedInDays.includes(weekday);
          return (
            <li key={weekday} className="text-center text-xl font-semibold">
              <div className="flex flex-col items-center gap-1 text-xl">
                <span className="text-white-400 text-2xl">{weekday.slice(0, 3)}</span>
                <i
                  className={`fa-solid fa-circle-check text-5xl transition ${
                    isLoggedIn ? "text-[#7E4E9E] dark:text-violet-500" : "text-gray-200"
                  }`}
                ></i>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Mobile compact view: show previous, current and next day (small screens only) */}
      <div className="block md:hidden mt-4 md:gap-10 justify-center items-center pb-18">
        <div className="flex justify-center gap-6 items-end">
          {/* Previous day */}
          <div className="text-center">
            <span className="text-white-400 text-sm block">{prevDay.slice(0, 3)}</span>
            <i
              className={`fa-solid fa-circle-check text-5xl mt-2 transition ${
                isPrevLoggedIn ? "text-[#7E4E9E] dark:text-violet-500" : "text-gray-200"
              }`}
            ></i>
          </div>

          {/* Current day (center) */}
          <div className="text-center">
            <span className="text-white-400 text-sm block font-semibold">{currentDay.slice(0, 3)}</span>
            <i
              className={`fa-solid fa-circle-check text-6xl mt-2 transition ${
                isCurrentLoggedIn ? "text-[#7E4E9E] dark:text-violet-500" : "text-gray-200"
              }`}
            ></i>
          </div>

          {/* Next day */}
          <div className="text-center">
            <span className="text-white-400 text-sm block">{nextDay.slice(0, 3)}</span>
            <i
              className={`fa-solid fa-circle-check text-5xl mt-2 transition ${
                isNextLoggedIn ? "text-[#7E4E9E] dark:text-violet-500" : "text-gray-300/60"
              }`}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}