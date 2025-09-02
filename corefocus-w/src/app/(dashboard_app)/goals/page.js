"use client";
import GoalCard from "@/app/components/GoalCard";
import GoalBoard from "@/app/components/Dashboard/GoalBoard";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { format } from "date-fns";
import { useAuth } from "@/app/context/AuthContext";
export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    const fetchGoals = async () => {
      if (!currentUser) return;
      const snap = await getDocs(collection(db, "users", currentUser.uid, "goals"));
      setGoals(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchGoals();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#121212]">
      {/* Topbar */}
      <div className="w-full flex justify-between items-center p-6">
        <div>
          <h1 className="text-gray-400">
            <span className="text-black dark:text-gray-400 hover:underline">Pages</span> /{" "}
            <span className="font-bold hover:underline dark:text-white text-black">Goals</span>
          </h1>
          <h1 className="text-gray-400 dark:text-white">{format(new Date(), "dd MMM yyyy")}</h1>
        </div>
      </div>

      {/* Goals + GoalBoard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Goals List */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>

        {/* GoalBoard */}
        {/* <div className="w-full">
          <GoalBoard goals={goals} />
        </div> */}
      </div>
    </div>
  );
}
