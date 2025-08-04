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
    const { isDark, toggleTheme } = useThemeStore()
    const { currentUser, userData, loading, logout } = useAuth();
    

    // console.log("Current User: ", currentUser.uid)
    // console.log("Current data: ", userData)

    useEffect(() => {
        console.log("Current dark mode:", isDark); // SHOULD show on load + toggle
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    useEffect(() => {
        if (!loading && !currentUser) {
            console.log("User not logged in, redirecting")
            router.push("/");
        } 
    }, [loading, currentUser, router]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

   return (
        <main className="flex h-full min-h-screen flex-col dark:bg-gray-800 bg-gray-800  overflow-y-auto">
        {/* Topbar */}
        <div className="w-full bg-gray-900/80 p-4 flex justify-between items-center">
            <div className="flex md:flex-1 justify-center items-center">
                <input
                placeholder="Search"
                className="bg-gray-700 text-violet-400 p-3 text-lg font-semibold rounded-xl w-2/3 md:w-1/3 lg:w-1/3 outline-none"
                />
            </div>
            <div className="flex gap-4 text-violet-400 items-center mr-20">
                <img
                    src="/avatar-default.svg"
                    alt="avatar"
                    className="bg-white rounded-full w-10 h-10"
                />
                <button onClick={toggleTheme}>
                    <i className="fa-solid fa-moon text-2xl cursor-pointer"></i>
                </button>
                <button onClick={logout}>
                    <i className="fa-solid fa-right-from-bracket text-2xl cursor-pointer hover:text-gray-800"></i>
                </button>
            </div>
        </div>

        {/* Welcome Heading */}
        <div className="px-8 pt-6">
            <h1 className="text-4xl text-white font-bold mb-6">Welcome to your Dashboard</h1>
        </div>

        <div className="p-4 md:p-6 lg:p-8 space-y-6">
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

            <div>
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
