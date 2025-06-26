"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HabitTracker from "@/app/components/Dashboard/HabitTracker";
import GoalBoard from "@/app/components/Dashboard/GoalBoard";
import ReadRoute from "@/app/components/Dashboard/ReadRoute";
import FocusCamp from "@/app/components/Dashboard/FocusCamp";
import TaskSync from "@/app/components/Dashboard/TaskSync";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            } else {
                // router.push("/");
                console.log("User not logged in")
            } 
            setLoading(false)
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

   return (
        <main className="flex h-full min-h-screen flex-col bg-gray-50">
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
            <i className="fa-solid fa-moon text-2xl"></i>
            </div>
        </div>

        {/* Welcome Heading */}
        <div className="px-8 pt-6">
            <h1 className="text-4xl font-bold mb-6">Welcome to your Dashboard</h1>
        </div>

        <div className="p-6 overflow-y-auto">
            <div className="flex md:flex-row gap-3 p-1">
                <div className="flex flex-col md:flex-row gap-2 flex-1">
                    <div className="bg-white p-6 rounded-xl shadow min-h-[300px] w-full lg:col-span-4">Card A</div>
                    <div className="bg-white p-6 rounded-xl shadow min-h-[300px] w-full lg:col-span-4"><p>Card two</p></div>
                </div>
            </div>

            <div className="flex md:flex-row p-1">
                <div className="flex flex-1">
                    <div className="bg-white p-6 rounded-xl shadow min-h-[300px] w-full lg:col-span-4">Card A</div>
                </div>
            </div>
            
            <div className="flex md:flex-row gap-3 p-1">
                <div className="flex flex-col md:flex-row  gap-2 flex-1">
                    <div className="bg-white p-6 rounded-xl shadow h-[250px] w-full lg:col-span-4">Card A</div>
                    <div className="bg-white p-6 rounded-xl shadow min-h-[300px] w-full lg:col-span-4"><p>Card two</p></div>
                </div>
            </div>
        </div>

        </main>
    );
}

function DashboardCard({ children, span = 6, height = 400 }) {
  return (
    <div
      className={`col-span-12 md:col-span-${span} bg-white p-8 rounded-2xl shadow min-h-[${height}px]`}
    >
      {children}
    </div>
  );
}