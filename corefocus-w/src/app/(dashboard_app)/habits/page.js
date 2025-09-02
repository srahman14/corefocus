"use client";

import HabitCard from "@/app/components/HabitCard";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { format } from "date-fns";
import { useAuth } from "@/app/context/AuthContext";
import { AnimatedThemeToggler } from "@/app/components/magicui/animated-theme-toggler";

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const { currentUser, loading, logout } = useAuth();

  useEffect(() => {
    const fetchHabits = async () => {
      if (!currentUser) return;
      const snap = await getDocs(collection(db, "users", currentUser.uid, "habits"));
      setHabits(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchHabits();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#121212]">
      {/* Topbar */}
      <div className="w-full flex justify-between items-center p-6">
        <div>
          <h1 className="text-gray-400">
            <span className="text-black dark:text-gray-400 hover:underline">Pages</span> /{" "}
            <span className="font-bold hover:underline dark:text-white text-black">Habits</span>
          </h1>
          <h1 className="text-gray-400 dark:text-white">{format(new Date(), "dd MMM yyyy")}</h1>
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

      {/* Habit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
}
