"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/app/store/useThemeStore";

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
        <main className="flex h-full min-h-screen flex-col dark:bg-gray-200 bg-gray-100">
        {/* Topbar */}
        <div className="w-full bg-gray-100/80 p-4 flex justify-between items-center">
            <input
            placeholder="Search"
            className="bg-white p-3 text-lg font-semibold rounded-xl w-1/2 md:w-1/3 lg:w-1/3 outline-none"
            />
            <div className="flex gap-4 items-center mr-4">
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
            <h1 className="text-4xl font-bold mb-6">Welcome to your Dashboard</h1>
        </div>

        <div className="p-6 overflow-y-auto">
            <div className="flex md:flex-row gap-3 p-1">
                <div className="flex flex-col md:flex-row gap-2 flex-1">
                    <div className="bg-white p-6 rounded-xl shadow min-h-[300px] w-full lg:col-span-4">Habit Tracker</div>
                    <div className="bg-white p-6 rounded-xl shadow min-h-[300px] w-full lg:col-span-4"><p>Focus Camp</p></div>
                </div>
            </div>

            <div className="flex md:flex-row p-1">
                <div className="flex flex-1">
                    <div className="bg-white p-6 rounded-xl shadow min-h-[300px] w-full lg:col-span-4">Goal Board</div>
                </div>
            </div>
            
            <div className="flex md:flex-row gap-3 p-1">
                <div className="flex flex-col md:flex-row  gap-2 flex-1">
                    <div className="bg-white p-6 rounded-xl shadow h-[250px] w-full lg:col-span-4">Task Sync</div>
                    <div className="bg-white p-6 rounded-xl shadow min-h-[400px] w-full lg:col-span-4"><p>Read Route</p></div>
                </div>
            </div>
        </div>

        </main>
    );
}
