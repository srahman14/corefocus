"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/app/store/useThemeStore";
import HeatmapComponent from "@/app/components/Dashboard/HeatmapComponent";
import Heatmap from "@/app/components/Heatmap";
import DailyLoginComponent from "@/app/components/Dashboard/DailyLogin";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  collectionGroup,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { AnimatedThemeToggler } from "@/app/components/magicui/animated-theme-toggler";
import MonthlyHabitsChart from "@/app/components/Dashboard/Analytics/MonthlyHabitsChart";

export default function AnalyticsPage() {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const { currentUser, userData, loading, logout } = useAuth();
  const [monthlyHabitTotal, setMonthlyHabitTotal] = useState(0);
  const [monthlyFocusHours, setMonthlyFocusHours] = useState(0);
  const [currentMonthLogs, setCurrentMonthLogs] = useState({});
  
  useEffect(() => {
    if (!currentUser) return;

    const fetchMonthlyHabitLogs = async () => {
      try {
        const today = new Date();
        const currentMonth = today.toISOString().slice(0, 7); // "yyyy-MM"

        // Reference to the subcollection for this month
        const monthRef = collection(db, "habitLogs", currentUser.uid, currentMonth);
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
        const monthMetaRef = doc(db, "habitLogs", currentUser.uid, currentMonth, "meta")
        const metaSnap = await getDoc(monthMetaRef)
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
      <div className="w-full flex justify-between items-center p-6">
        <div className="text-white ">
          <h1 className="text-gray-400">
            <span className="text-black dark:text-gray-400 hover:underline">
              Pages
            </span>{" "}
            /{" "}
            <span className="font-bold hover:underline dark:text-white text-black">
              Dashboard
            </span>
          </h1>
          <h1 className="text-gray-400 dark:text-white">
            {format(new Date(), "dd MMM yyyy")}
          </h1>
        </div>
        <div className="flex flex-row items-center gap-4 text-violet-400">
          <input
            placeholder="Type here"
            className="
              bg-[#F0EBFF] text-purple-700
              dark:bg-[#1f1a4a] dark:text-violet-400
              p-3 text-lg font-semibold rounded-xl outline-none
            "
          />
          <img
            src="/avatar-default.svg"
            alt="avatar"
            className="bg-white rounded-full w-10 h-10"
          />
          <button>
            <i className="fa-solid fa-gear text-2xl cursor-pointer bg-white p-2 rounded-xl"></i>
          </button>
          <div>
            {/* {isDark ? <i className="fa-jelly text-2xl cursor-pointer fa-regular fa-sun bg-white p-2 rounded-xl"></i> : <i className="fa-solid fa-regular fa-moon text-2xl cursor-pointer bg-white p-2 rounded-xl"></i>} */}
            <AnimatedThemeToggler />
          </div>
          <button onClick={logout}>
            <i className="fa-solid fa-right-from-bracket text-2xl cursor-pointer bg-white p-2 rounded-xl"></i>
          </button>
        </div>
      </div>

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
            {monthlyHabitTotal}
          </p>
        </div>
        <div className="bg-[#1f1a4a]/70 backdrop-blur-md border border-purple-900/40 p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm text-violet-200 font-medium">
            Focus Hours (this month)
          </h3>
          <p className="text-3xl font-bold text-white mt-2">
            {monthlyFocusHours}
          </p>
        </div>
        <div className="bg-[#1f1a4a]/70 backdrop-blur-md border border-purple-900/40 p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm text-violet-200 font-medium">
            Goals Completed
          </h3>
          <p className="text-3xl font-bold text-white mt-2">7</p>
        </div>
        <div className="bg-[#1f1a4a]/70 backdrop-blur-md border border-purple-900/40 p-6 rounded-2xl shadow-lg">
          <h3 className="text-sm text-violet-200 font-medium">
            Current Streak
          </h3>
          <p className="text-3xl font-bold text-white mt-2">15 days</p>
        </div>
      </div>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full h-full lg:w-2/3 mb-12">
          <MonthlyHabitsChart habitLogs={currentMonthLogs}/>

          </div>
          <div className="w-full lg:w-1/2">
            <p>
              You completed the most habits consistently on this day Name_of_Day
            </p>
          </div>
        </div>

        <div>
          <Heatmap habitLogs={currentMonthLogs}/>
        </div>

        <div>
          <DailyLoginComponent />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <p>CONTENT</p>
          </div>
          <div className="w-full lg:w-1/2">
            <p>CONTENT</p>
          </div>
        </div>
      </div>
    </main>
  );
}
