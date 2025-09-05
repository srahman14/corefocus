"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { AnimatedThemeToggler } from "@/app/components/magicui/animated-theme-toggler";
import PlannerCard from "@/app/components/PlannerCard";
import GoalBoard from "@/app/components/Dashboard/GoalBoard";

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
    <main className="flex flex-col min-h-screen px-4 py-10  bg-gradient-to-br from-[#B19CD7] via-[#EBE8FC] to-[#C0AFE2] dark:from-[#0B091A] dark:via-[#110E2D] dark:to-[#0B091A]">
      {/* Topbar */}
      <div className="w-full flex justify-between items-center p-6">
        <div>
          <h1 className="text-gray-400">
            <span className="text-black dark:text-gray-400 hover:underline">
              Pages
            </span>{" "}
            /{" "}
            <span className="font-bold hover:underline dark:text-white text-black">
              Planner
            </span>
          </h1>
          <h1 className="text-gray-400 dark:text-white">
            {new Date().toLocaleDateString()}
          </h1>
        </div>

        <div className="flex flex-row items-center gap-4 text-violet-400">
          <input
            placeholder="Type here"
            className="bg-[#F0EBFF] text-purple-700 dark:bg-[#1f1a4a] dark:text-violet-400 p-3 text-lg font-semibold rounded-xl outline-none"
          />
          <img
            src="/avatar-default.svg"
            alt="avatar"
            className="bg-white rounded-full w-10 h-10"
          />
          <button>
            <i className="fa-solid fa-gear text-2xl cursor-pointer bg-white p-2 rounded-xl"></i>
          </button>
          <AnimatedThemeToggler />
          <button onClick={logout}>
            <i className="fa-solid fa-right-from-bracket text-2xl cursor-pointer bg-white p-2 rounded-xl"></i>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center p-6 mb-2">
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
    </main>
  );
}
