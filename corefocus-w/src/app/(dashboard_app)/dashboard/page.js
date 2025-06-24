"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

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
      {/* Sidebar */}
      <motion.div
        animate={{ width: sidebarWidth }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className="h-full bg-gray-50 text-white z-40 flex flex-col fixed top-0 left-0"
      >

        {/* Main Menu - flex-grow scrollable */}
        <div className="flex-1 overflow-y-none mt-4 px-1">
            <div
                onClick={toggleSidebar}
                className="cursor-pointer transition"
            >
                <SidebarItem href="#" icon="fa-lines-leaning" label="Dashboard" collapsed={collapsed} />
            </div>
            <SidebarItem href="/" icon="fa-bell" label="Habit Tracker" collapsed={collapsed} />
            <SidebarItem href="/" icon="fa-chart-area" label="Goal Board" collapsed={collapsed} />
            <SidebarItem href="/" icon="fa-list-check" label="Task Sync" collapsed={collapsed} />
            <SidebarItem href="/" icon="fa-pen-to-square" label="Read Route" collapsed={collapsed} />
            <SidebarItem href="/" icon="fa-stopwatch" label="Focus Camp" collapsed={collapsed} />
        </div>

        {/* Bottom Buttons */}
        <div className="border-t border-gray-700 border-t-8 mt-auto p-4 space-y-2 font-bold">
            <div className="cursor-pointer text-black hover:bg-gray-200 transition rounded flex items-center px-4 py-3">
                <i className="fa-solid fa-right-from-bracket" />
                {!collapsed && <span className="ml-3">Logout</span>}
            </div>

            <div className="cursor-pointer text-black hover:bg-gray-200 transition rounded flex items-center px-4 py-3">
                <i className="fa-solid fa-moon" />
                {!collapsed && <span className="ml-3">Dark Mode</span>}
            </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        animate={{ marginLeft: sidebarWidth }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex-1 p-6 ml-4"
      >
        {/* DASHBOARD */}
        <section className="ml-4">
            <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
            <p className="mt-4 text-gray-700">Your app content goes here.</p>
            <div className="w-full flex flex-row gap-20 flex-wrap">
                <div className="bg-gray-200 w-1/2 h-1/2">
                    <p>CONTENT</p>
                </div>
                <div className="bg-gray-200 w-1/3 h-1/2">
                    <p>CONTENT</p>
                </div>
                                <div className="bg-gray-200 w-1/3 h-1/2">
                    <p>CONTENT</p>
                </div>
            </div>
        </section>

      </motion.div>
    </main>
    );
}

// Reusable Sidebar Item
function SidebarItem({ href, icon, label, collapsed }) {
  return (
    <Link href={href}>
      <div className="w-full flex text-black items-center px-4 py-3 hover:bg-gray-200 transition rounded cursor-pointer group relative">
        <i className={`fa-solid ${icon} text-lg`} />
        {!collapsed && <span className="ml-3 font-bold">{label}</span>}
        {collapsed && (
          <span className="absolute left-full ml-2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
            {label}
          </span>
        )}
      </div>
    </Link>
  );
}