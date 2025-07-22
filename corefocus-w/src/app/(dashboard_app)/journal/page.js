"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useThemeStore } from "@/app/store/useThemeStore";
import { useRouter } from "next/navigation";
import * as Checkbox from "@radix-ui/react-checkbox";
import Link from "next/link";

export default function Journal() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { isDark, toggleTheme } = useThemeStore();
  const tags = [
    "Favorites",
    "Work Goals",
    "Vacation",
    "Habit Building",
    "Family Time",
  ];
  const topics = [
    "Work & Career",
    "Gratitude & Happiness",
    "Relationships",
    "Creativity",
    "Health & Wellness",
    "Sleep & Wake Up",
    "Daily",
    "Memories & Milestones",
    "Stress & Anxiety",
    "Emotions",
    "Personal Development",
    "Travel",
  ];
  useEffect(() => {
    console.log("Current dark mode:", isDark); // SHOULD show on load + toggle
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // router.push("/");
        console.log("User not logged in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 px-4 py-10">
      <div className="flex justify-end"></div>

      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Journal</h1>

          <Link 
          href={"/journal/new"}
          className="flex items-center px-4 py-2 gap-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <i className="fa-solid fa-plus"></i>
            New Entry
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6 w-1/2">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full p-4 rounded-3xl shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tags.map((option) => {
            return (
              <li
                key={option}
                className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition list-none cursor-pointer"
              >
                {option}
              </li>
            );
          })}
        </div>

        {/* Entry Cards */}
        <div className="flex flex-col flex-wrap">
          <h2 className="text-2xl font-bold mb-4">Latest entries</h2>
          <div className="flex flex-col gap-6 mb-10">
            <div className="bg-white rounded-lg shadow p-5 hover:shadow-md transition">
              <h2 className="text-lg font-semibold mb-2">
                Overcome struggles and improve your mindset
              </h2>
              <p className="text-sm text-gray-600">Better Mental Health</p>
            </div>
            <div className="bg-white rounded-lg shadow p-5 hover:shadow-md transition">
              <h2 className="text-lg font-semibold mb-2">
                Discover our team’s guided journaling picks
              </h2>
              <p className="text-sm text-gray-600">Editor’s Picks</p>
            </div>
          </div>
        </div>

        {/* Topics Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Topics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topics.map((topic) => (
              <button
                key={topic}
                className="bg-white text-gray-800 font-semibold text-md p-3 rounded-lg shadow hover:shadow-md cursor-pointer transition text-left"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
