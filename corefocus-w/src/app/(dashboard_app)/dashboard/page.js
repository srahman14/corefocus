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
    const [collapsed, setCollapsed] = useState(true);
    const toggleSidebar = () => setCollapsed(prev => !prev);
    const sidebarWidth = collapsed ? 64 : 256; 
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
    <main className="flex h-screen overflow-hidden relative">
        <section className="p-8">
            <h1 className="text-4xl font-bold">Welcome to your Dashboard</h1>
            <div className="flex flex-row mt-6 gap-8">
              <div className="flex flex-row gap-8 w-full">
                  <GoalBoard />
                  <FocusCamp />
              </div>

              <div className="flex w-full">
                  <GoalBoard />
              </div>

              <div className="flex gap-8">
                  <GoalBoard />
                  <GoalBoard />  
              </div>
            </div>
        </section>
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