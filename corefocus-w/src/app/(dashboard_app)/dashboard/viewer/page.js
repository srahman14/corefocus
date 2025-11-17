"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { AnimatedThemeToggler } from "@/app/components/magicui/animated-theme-toggler";
import PlannerCard from "@/app/components/PlannerCard";
import GoalBoard from "@/app/components/Dashboard/GoalBoard";
import { format } from "date-fns"
import Topbar from "@/app/components/Topbar";

export default function Planner() {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("habits");
  const [habits, setHabits] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch habits & goals once user is authenticated
useEffect(() => {
  if (!currentUser) return;

  const habitsRef = collection(db, "users", currentUser.uid, "habits");
  const goalsRef = collection(db, "users", currentUser.uid, "goals");

  const habitsQuery = query(habitsRef, orderBy("createdAt", "desc"));
  const goalsQuery = query(goalsRef, orderBy("createdAt", "desc"));

  // Start loading
  setLoading(true);

  const unsubscribeHabits = onSnapshot(
    habitsQuery,
    (snapshot) => {
      setHabits(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false); // Stop loading once we have data
    },
    (error) => {
      console.error("Error fetching habits:", error);
      setLoading(false);
    }
  );

  const unsubscribeGoals = onSnapshot(
    goalsQuery,
    (snapshot) => {
      setGoals(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    },
    (error) => {
      console.error("Error fetching goals:", error);
      setLoading(false);
    }
  );

  return () => {
    unsubscribeHabits();
    unsubscribeGoals();
  };
}, [currentUser]);


  const handleDelete = (id, type) => {
    if (type === "habits") {
      setHabits((prev) => prev.filter((h) => h.id !== id));
    } else {
      setGoals((prev) => prev.filter((g) => g.id !== id));
    }
  };

  const handleEdit = (item) => {
    console.log("Edit clicked:", item);
    // TODO: updateDoc(...)
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">
          Please log in to view your planner.
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col h-full overflow-auto bg-gradient-to-br from-[#B19CD7] via-[#EBE8FC] to-[#C0AFE2] dark:from-[#0B091A] dark:via-[#110E2D] dark:to-[#0B091A]">
      {/* Topbar */}
      <Topbar />

      <div className="px-4 py-10 h-full">

      {/* Tabs */}
      <div className="flex justify-center px-6 mb-8 md:mb-4">
        <div className="bg-white dark:bg-[#1a1a1a] p-1 rounded-full shadow-lg flex space-x-2">
          <button
            onClick={() => setActiveTab("habits")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "habits"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            >
            Habits
          </button>
          <button
            onClick={() => setActiveTab("goals")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "goals"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            >
            Goals
          </button>
        </div>
      </div>

      {/* Content */}
      <section className="max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            Loading...
          </div>
        ) : activeTab === "habits" ? (
          habits.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit) => (
                <PlannerCard
                key={habit.id}
                item={habit}
                type="habits"
                onDelete={(id) => handleDelete(id, "habits")}
                onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No habits yet. Start tracking!
            </p>
          )
        ) : goals.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Goals List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
              {goals.map((goal) => (
                <PlannerCard
                key={goal.id}
                item={goal}
                type="goals"
                onDelete={(id) => handleDelete(id, "goals")}
                onEdit={handleEdit}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No goals yet. Set your first one!
          </p>
        )}
      </section>
        </div>
    </main>
  );
}
