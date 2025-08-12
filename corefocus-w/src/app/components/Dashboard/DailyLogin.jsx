import { useEffect, useState } from "react";
import { doc, onSnapshot, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { format, startOfWeek } from "date-fns";

export default function DailyLoginComponent() {
  const { currentUser } = useAuth();
  const [loggedInDays, setLoggedInDays] = useState([]);
  const [weeklyStreak, setWeeklyStreak] = useState(0);
  const [daysCount, setDaysCount] = useState(0);
  
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const calculateWeeklyStreak = (loggedDays) => {
    let streak = 0;

    for (const day of weekdays) {
        if (loggedDays.includes(day)) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
  } 

  const getStartOfWeek = (date = new Date()) => {
    return format(startOfWeek(date, { weekStartsOn: 1}), "yyyy-MM-dd");
  };
  const getTodayWeekday = () => {
    return format(new Date(), "EEEE");
  };

  useEffect(() => {
    if (!currentUser) return;

    const uid = currentUser.uid;
    const today = getTodayWeekday();
    const thisWeekStart = getStartOfWeek();

    const docRef = doc(db, "users", uid, "tracking", "weeklyLogins");

    const unsubscribe = onSnapshot(docRef, async (snapshot) => {
      const data = snapshot.data();

      if (!data || data.weekStart !== thisWeekStart) {
        // New week or first time — reset the data
        await setDoc(docRef, {
          weekStart: thisWeekStart,
          daysLoggedIn: [today],
        });
        setLoggedInDays([today]);
        return;
      }

      // Update if today not yet logged
      const alreadyLogged = data.daysLoggedIn.includes(today);
      if (!alreadyLogged) {
        await updateDoc(docRef, {
          daysLoggedIn: [...data.daysLoggedIn, today],
        });
      }

      setLoggedInDays(data.daysLoggedIn);
    });

    return () => unsubscribe();
  }, [currentUser]);
  
  const streak = calculateWeeklyStreak(loggedInDays);


  return (
    <div className="container bg-gradient-to-br from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#070C2F] dark:via-[#110E2D] dark:to-[#13153F] rounded-xl rounded-xl shadow-md text-white p-4">
        <div className="flex justify-end">
            <span className={`flex items-center gap-3 p-8 ${
                streak === 0 ? "display-none" : "text-[#7E4E9E] font-bold dark:text-yellow-400"
            }`}>
                <i className="fa-solid fa-fire"></i>
                <p>
                    {streak} {streak === 1 ? "day" : "days"}
                </p>
            </span>
        </div>
        <ul className="flex flex-row gap-25 justify-center items-center pb-18">
            {weekdays.map((weekday) => {
            const isLoggedIn = loggedInDays.includes(weekday);
            return (
                <li key={weekday} className="text-center text-xl font-semibold">
                <div className="flex flex-col items-center gap-2 text-xl">
                    <span className="text-white-400 text-2xl">{weekday.slice(0, 3)}</span>
                    <i
                    className={`fa-solid fa-circle-check text-6xl transition ${
                        isLoggedIn ? "text-[#7E4E9E] dark:text-violet-500" : "text-white"
                    }`}
                    ></i>
                </div>
                </li>
            );
            })}
        </ul>
    </div>
  );
}