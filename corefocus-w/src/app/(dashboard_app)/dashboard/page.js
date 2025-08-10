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

export default function Dashboard() {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const { currentUser, userData, loading, logout } = useAuth();
  const today = new Date().toUTCString();
  // console.log("Current User: ", currentUser.uid)
  // console.log("Current data: ", userData)

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
    <main className="flex h-full min-h-screen flex-col overflow-y-auto bg-gradient-to-br from-[#1a1443] via-[#110E2D] to-[#0B091A]">
      {/* Topbar */}
      <div className="w-full flex justify-between items-center p-6">
        <div className="text-white ">
          <h1>
            <span className="text-gray-400 hover:underline">Pages</span> /{" "}
            <span className="font-bold hover:underline">Dashboard</span>
          </h1>
          <h1>
            {today}
          </h1>
        </div>
        <div className="flex flex-row items-center gap-4 text-violet-400">
          <input
            placeholder={`${(
              <i className="fa-solid fa-magnifying-glass"></i>
            )} Type here`}
            className="bg-gray-100/10 backdrop-blur text-white p-2 text-lg font-semibold rounded-xl outline-none"
          />
          <img
            src="/avatar-default.svg"
            alt="avatar"
            className="bg-white rounded-full w-10 h-10"
          />
          <button>
            <i className="fa-solid fa-gear text-2xl cursor-pointer"></i>
          </button>
          <button onClick={logout}>
            <i className="fa-solid fa-right-from-bracket text-2xl cursor-pointer hover:text-gray-800"></i>
          </button>
        </div>
      </div>

      {/* Welcome Heading
        <div className="px-8 pt-6">
            <h1 className="text-4xl text-white font-bold mb-6">Welcome to your Dashboard</h1>
        </div> */}

      <div className="p-4 md:p-6 lg:p-8 space-y-6">

        {/* Second row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Welcome Back card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#520dd0] to-[#500DCA] rounded-2xl p-6 shadow-lg flex flex-col h-[240px]">
            <h2 className="text-white text-2xl font-bold mb-2">
              Welcome back, {userData.username}!
            </h2>
            <p className="text-violet-200 text-sm">
              Let’s continue making progress on your goals today.
            </p>
          </div>

          {/* Two smaller cards */}
          <div className="bg-[#1f1a4a] rounded-2xl p-6 shadow-lg flex flex-col h-[240px]">
            <h3 className="text-white text-lg font-semibold">Quick summary for today (AI)</h3>
            <p className="text-violet-200 text-sm mt-2">
              Check your current streaks and completions.
            </p>
          </div>

          <div className="bg-[#1f1a4a] rounded-2xl p-6 shadow-lg flex flex-col h-[240px]">
            <h3 className="text-white text-lg font-semibold">Upcoming Tasks</h3>
            <p className="text-violet-200 text-sm mt-2">
              Don’t miss what’s next on your schedule.
            </p>
          </div>
        </div>

        {/* Main dashboard sections */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <HabitTracker />
          </div>
          <div className="w-full lg:w-1/2">
            <FocusCamp />
          </div>
        </div>

        <div>
          <GoalBoard />
        </div>

        <div className="w-full flex items-center justify-center">
          <DailyLoginComponent />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <TaskSync />
          </div>
          <div className="w-full lg:w-1/2">
            <ReadRoute />
          </div>
        </div>
      </div>
    </main>
  );
}
