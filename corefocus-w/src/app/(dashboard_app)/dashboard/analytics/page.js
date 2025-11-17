"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/app/store/useThemeStore";
import HeatmapComponent from "@/app/components/Dashboard/HeatmapComponent";
import Heatmap from "@/app/components/Heatmap";
import DailyLoginComponent from "@/app/components/Dashboard/DailyLogin";
import GoalsAnalytics from "@/app/components/Dashboard/Analytics/GoalsAnalytics";

import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  collectionGroup,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { AnimatedThemeToggler } from "@/app/components/magicui/animated-theme-toggler";
import MonthlyHabitsChart from "@/app/components/Dashboard/Analytics/MonthlyHabitsChart";
import Link from "next/link";
import Topbar from "@/app/components/Topbar";

export default function AnalyticsPage() {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const { currentUser, userData, loading, logout } = useAuth();
  const [monthlyHabitTotal, setMonthlyHabitTotal] = useState(0);
  const [monthlyFocusHours, setMonthlyFocusHours] = useState(0);
  const [currentMonthLogs, setCurrentMonthLogs] = useState({});
  const [completedGoalsCount, setCompletedGoalsCount] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Fetch longest streak
  useEffect(() => {
    if (!currentUser) return;

    const fetchLongestStreak = async () => {
      try {
        // First get current week's streak
        const weeklyLoginsRef = doc(
          db,
          "users",
          currentUser.uid,
          "tracking",
          "weeklyLogins"
        );
        const weeklyLoginsSnap = await getDoc(weeklyLoginsRef);

        let currentStreak = 0;
        if (weeklyLoginsSnap.exists()) {
          const weeklyData = weeklyLoginsSnap.data();
          // Using the same streak calculation logic from DailyLogin component
          const weekdays = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ];
          const today = format(new Date(), "EEEE");
          const todayIndex = weekdays.indexOf(today);

          for (let i = todayIndex; i >= 0; i--) {
            const day = weekdays[i];
            if (weeklyData.daysLoggedIn?.includes(day)) {
              currentStreak++;
            } else {
              break;
            }
          }
        }
        console.log("Current week streak is: ", currentStreak);

        // Now check streakMeta
        const streakMetaRef = doc(
          db,
          "users",
          currentUser.uid,
          "tracking",
          "streakMeta"
        );
        const streakMetaSnap = await getDoc(streakMetaRef);

        if (!streakMetaSnap.exists()) {
          // Initialize streakMeta with current streak
          await setDoc(streakMetaRef, {
            longestStreak: currentStreak,
            updatedAt: new Date(),
          });
          setLongestStreak(currentStreak);
        } else {
          // Compare current streak with stored longest streak
          const storedStreak = streakMetaSnap.data().longestStreak || 0;
          const highestStreak = Math.max(currentStreak, storedStreak);

          // Update if current streak is higher
          if (currentStreak > storedStreak) {
            await setDoc(streakMetaRef, {
              longestStreak: currentStreak,
              updatedAt: new Date(),
            });
          }

          setLongestStreak(highestStreak);
        }
      } catch (err) {
        console.error("[Analytics] Error fetching streak meta:", err);
      }
    };

    fetchLongestStreak();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchMonthlyHabitLogs = async () => {
      try {
        const today = new Date();
        const currentMonth = today.toISOString().slice(0, 7); // "yyyy-MM"

        // Reference to the subcollection for this month
        const monthRef = collection(
          db,
          "habitLogs",
          currentUser.uid,
          currentMonth
        );
        const snapshot = await getDocs(monthRef);

        const logs = {};
        snapshot.forEach((doc) => {
          logs[doc.id] = doc.data();
        });

        console.log("[AnalyticsPage] fetched currentMonthLogs:", logs);
        setCurrentMonthLogs(logs);
      } catch (error) {
        console.error("Error fetching monthly habit logs:", error);
      }
    };

    fetchMonthlyHabitLogs();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchMonthlyFocus = async () => {
      try {
        if (!currentUser?.uid) return;

        const now = new Date();
        let totalMinutes = 0;

        // Use collectionGroup to fetch *all* "sessions" subcollections
        const sessionsSnapshot = await getDocs(collectionGroup(db, "sessions"));

        sessionsSnapshot.forEach((doc) => {
          const path = doc.ref.path;
          // Ensure this session belongs to the current user
          // path looks like: users/{uid}/pomodoroSessions/{date}/sessions/{autoId}
          if (!path.startsWith(`users/${currentUser.uid}/pomodoroSessions/`))
            return;

          const session = doc.data();
          if (!session?.endTime || typeof session?.duration !== "number")
            return;

          const endDate = session.endTime.toDate();
          if (
            endDate.getFullYear() === now.getFullYear() &&
            endDate.getMonth() === now.getMonth()
          ) {
            totalMinutes += session.duration;
          }
        });

        // Format as "xh ym"
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        let formatted = "";
        if (hours > 0) formatted += `${hours}h `;
        if (minutes > 0) formatted += `${minutes}m`;
        if (!formatted) formatted = "0m";

        console.log("[Analytics] total focus time this month:", formatted);
        setMonthlyFocusHours(formatted);
      } catch (err) {
        console.error("[Analytics] Error fetching focus sessions:", err);
        setMonthlyFocusHours(0);
      }
    };

    fetchMonthlyFocus();
  }, [currentUser]);
  useEffect(() => {
    if (!currentUser) return;

    const fetchMonthlyHabits = async () => {
      try {
        const currentMonth = format(new Date(), "yyyy-MM");
        const monthMetaRef = doc(
          db,
          "habitLogs",
          currentUser.uid,
          currentMonth,
          "meta"
        );
        const metaSnap = await getDoc(monthMetaRef);
        if (metaSnap.exists()) {
          setMonthlyHabitTotal(metaSnap.data().totalCount);
        } else {
          setMonthlyHabitTotal(0);
        }
      } catch (err) {
        console.error("Error fetching meta: ", err);
      }
    };

    fetchMonthlyHabits();
  }, [currentUser]);

  useEffect(() => {
    console.log("Current dark mode:", isDark); // SHOULD show on load + toggle
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    if (!loading && !currentUser) {
      console.log("User not logged in, redirecting");
      router.push("/");
    }
  }, [loading, currentUser, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex h-full min-h-screen flex-col overflow-y-auto bg-gradient-to-br from-[#B19CD7] via-[#EBE8FC] to-[#C0AFE2] dark:from-[#0B091A] dark:via-[#110E2D] dark:to-[#0B091A]">
      {/* Topbar */}
      {/* Header */}
      {/* <div className="p-6 w-full flex flex-row justify-start md:justify-between items-start pb-12 gap-12">
        <div className="text-white ">
          <p></p>
          <h1 className="text-black dark:text-white">{format(new Date(), "dd MMM yyyy")}</h1>
        </div>
        <div className="flex flex-row items-center gap-4 text-violet-400">
          <div>
            <AnimatedThemeToggler className={'bg-white hover:bg-white/90 ease-in-out duration-200 p-2 rounded-xl text-purple-900 cursor-pointer'} />
          </div>
          <button onClick={logout}>
            <i className="fa-solid fa-right-from-bracket text-2xl cursor-pointer bg-white hover:bg-white/90 ease-in-out duration-200 text-purple-900 p-2 rounded-xl"></i>
          </button>
        </div>
      </div> */}

      <Topbar />
      {/* Welcome Heading */}
      <div className="px-8">
        <h1 className="text-4xl text-white font-bold mb-6">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        <div className="bg-gradient-to-br from-[#520dd0] to-[#500DCA] p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm text-violet-200 font-medium">
            Total Habits (this month)
          </h3>
          <p className="text-3xl font-bold text-white mt-2">
            {/* {monthlyHabitTotal} */}
            76
          </p>
        </div>
        <div className="bg-[#1f1a4a]/70 backdrop-blur-md border border-purple-900/40 p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm text-violet-200 font-medium">
            Goals Completed (All time)
          </h3>
          <p className="text-3xl font-bold text-white mt-2">
            {/* {completedGoalsCount} */}6
          </p>
        </div>
        <div className="bg-[#1f1a4a]/70 backdrop-blur-md border border-purple-900/40 p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm text-violet-200 font-medium">
            Focus Hours (this month)
          </h3>
          <p className="text-3xl font-bold text-white mt-2">
            {/* {monthlyFocusHours} */}
            2hrs 48m
          </p>
        </div>
        <div className="bg-[#1f1a4a]/70 backdrop-blur-md border border-purple-900/40 p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm text-violet-200 font-medium">
            Longest Streak
          </h3>
          <p className="text-3xl font-bold text-white mt-2">
            {/* {longestStreak} days */}
            15 days
          </p>
        </div>
      </div>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex gap-6">
          <div className="w-full h-full mb-12">
            <MonthlyHabitsChart habitLogs={currentMonthLogs} />
          </div>
        </div>

        <div>
          <GoalsAnalytics onCompletedGoalsChange={setCompletedGoalsCount} />
        </div>

        <div>
          <Heatmap habitLogs={currentMonthLogs} />
        </div>
        <div className="flex flex-col md:flex-col lg:flex-row gap-6">
          <div className="flex-1 w-full"></div>

          <div className="flex-1 w-full"></div>
        </div>

        <div>
          <DailyLoginComponent />
        </div>
      </div>
    </main>
  );
}
