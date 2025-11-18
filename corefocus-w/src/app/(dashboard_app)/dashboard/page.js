"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/app/store/useThemeStore";
import FocusCamp from "@/app/components/Dashboard/FocusCamp";
import HabitTracker from "@/app/components/Dashboard/HabitTracker";
import GoalBoard from "@/app/components/Dashboard/GoalBoard";
import TaskSync from "@/app/components/Dashboard/TaskSync";
import ReadRoute from "@/app/components/Dashboard/ReadRoute";
import DailyLoginComponent from "@/app/components/Dashboard/DailyLogin";
import { AnimatedThemeToggler } from "@/app/components/magicui/animated-theme-toggler";
import { format } from "date-fns";
import Topbar from "@/app/components/Topbar";

export default function Dashboard() {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const { currentUser, userData, loading, logout } = useAuth();
  const [username, setUsername] = useState(null);
  // const today = new Date().toUTCString();
  // console.log("Current User: ", currentUser.uid)
  // console.log("  Current data: ", userData)

  // useEffect(() => {
  //   console.log("Current dark mode:", isDark); // SHOULD show on load + toggle
  //   document.documentElement.classList.toggle("dark", isDark);
  // }, [isDark]);

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
    // bg-gradient-to-br from-[#f5f3ff] via-[#ede9fe] to-[#e0e7ff]
    <main className="flex h-screen overflow-auto w-full flex-col bg-gradient-to-br from-[#B19CD7] via-[#EBE8FC] to-[#C0AFE2] dark:from-[#0B091A] dark:via-[#110E2D] dark:to-[#0B091A]">
      {/* Topbar */}
      <div className="flex-shrink-0">
        <Topbar />
      </div>

      <div className="flex-1 w-[85%] md:w-[100%]">
        <div className="p-2 md:p-4 lg:p-6 space-y-3 sm:space-y-4">
          {/* Second row */}
          <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-start md:justify-center gap-2 sm:gap-3 md:gap-4">
            {/* Welcome Back card */}
            <div className="w-full md:w-auto md:flex-1 bg-gradient-to-br from-[#CE9AD9] to-[#B19CD7] dark:from-[#520dd0] dark:to-[#500DCA] rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-lg min-h-[60px] sm:min-h-[75px] md:h-[200px] lg:h-[280px]">
              <h2 className="text-violet-100 dark:text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-1.5 md:mb-2">
                Welcome back!
              </h2>
              <p className="text-violet-200 text-xs sm:text-xs md:text-sm lg:text-base">
                Let&apos;s continue making progress on your goals today.
              </p>
            </div>
            <div className="w-full md:flex-1">
              <DailyLoginComponent />
            </div>
          </div>

          {/* Main dashboard sections */}
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 w-full">
            <div className="w-full lg:w-1/2">
              <HabitTracker />
            </div>
            <div className="w-full lg:w-1/2">
              <FocusCamp />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 w-full">
            <div className="w-full lg:w-1/2">
              <ReadRoute />
            </div>
            <div className="w-full lg:w-1/2">
              <GoalBoard />
            </div>
          </div>

          <div className="w-full flex items-center justify-center"></div>

          {/* <div className="flex flex-col lg:flex-row gap-6 w-[80%] md:w-[90%]">
          <div className="w-full lg:w-1/2">
            <TaskSync />
          </div>
        </div> */}
        </div>
      </div>
    </main>
  );
}
