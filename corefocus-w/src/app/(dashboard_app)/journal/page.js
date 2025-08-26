"use client";
import { use, useEffect, useState } from "react";
import { useThemeStore } from "@/app/store/useThemeStore";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { Plus, FileText } from "lucide-react";
import { AnimatedThemeToggler } from "@/app/components/magicui/animated-theme-toggler";
import Link from "next/link";

export default function Journal() {
  const router = useRouter();
  const { currentUser, loading, logout } = useAuth();
  const [journals, setJournals] = useState([]);
  const [loadingJournals, setLoadingJournals] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = async () => {
    if (!currentUser) return;
    const confirm = window.confirm(
      `Are you sure you want to delete "${
        journal.title || "Untitled Journal"
      }"?`
    );
    if (!confirm) return;

    try {
      await deleteDoc(
        doc(db, "users", currentUser.uid, "journals", journal.id)
      );
      onDeleted(journal.id); // Remove from local state
    } catch (error) {
      console.error("Error deleting journal:", error);
      alert("Failed to delete journal.");
    }
  };

  // Fetch user's journals
  useEffect(() => {
    const fetchJournals = async () => {
      if (!currentUser) return;

      try {
        const journalsRef = collection(
          db,
          "users",
          currentUser.uid,
          "journals"
        );
        const q = query(journalsRef, orderBy("updatedAt", "desc"));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJournals(data);
        setLoadingJournals(false);
      } catch (error) {
        console.error("Error fetching journals:", error);
        setLoadingJournals(false);
      }
    };

    fetchJournals();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">
          Please log in to view your journals.
        </p>
      </div>
    );
  }

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen px-4 py-10 bg-gradient-to-br from-[#FFFF8F] via-[#FFFDD0] to-[#DFFF00] dark:from-[#0B091A] dark:via-[#110E2D] dark:to-[#0B091A]">
      <div className="w-full flex justify-between items-center px-4 mb-12">
        <div className="text-white ">
          <h1 className="text-gray-400">
            <span className="text-black dark:text-gray-400 hover:underline">
              Pages
            </span>{" "}
            /{" "}
            <span className="hover:underline dark:text-white text-black">
              Dashboard
            </span>{" "}
            /{" "}
            <span className="font-bold hover:underline dark:text-white text-black">
              Journal
            </span>
          </h1>
          <h1 className="text-gray-400 dark:text-white">Date goes here</h1>
        </div>
        <div className="flex flex-row items-center gap-4 text-violet-400">
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

      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Journal</h1>

          <Link
            href={"/journal/new"}
            className="flex items-center px-4 py-2 gap-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
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

        {/* Journal Cards */}
        <h2 className="text-2xl font-bold mb-4">Latest entries</h2>
        <div className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading ? (
            // Skeleton loaders
            [...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="h-48 bg-gray-200 animate-pulse rounded-xl"
              ></div>
            ))
          ) : journals.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">No journals yet. Start writing!</p>
            </div>
          ) : (
            journals.map((journal) => (
              <Link
                key={journal.id}
                href={`/journal/${journal.id}`}
                className="block bg-gradient-to-br from-[#DFFF00] via-[#FCF55F] to-[#FCF55F] dark:from-[#070C2F] dark:via-[#110E2D] dark:to-[#13153F] rounded-xl shadow hover:shadow-lg transition p-5"
              >
                {/* Title */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {journal.title || "Untitled Journal"}
                  </h2>

                  <div className="relative">
                    <button
                      className="bg-gray-200 px-2 rounded-sm cursor-pointer hover:bg-gray-300 duration-200 transition-all"
                      onClick={() => setShowOptions((prev) => !prev)}
                    >
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>

                    {showOptions && (
                      <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                        <button
                          onClick={handleDelete}
                          className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => alert("Pin feature coming soon!")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Pin / Favorite
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {journal.tags?.length > 0 ? (
                    journal.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">No tags</span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span
                    className={`px-2 py-1 rounded-md ${
                      journal.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {journal.status || "Draft"}
                  </span>
                  <span>
                    {journal.updatedAt?.toDate
                      ? journal.updatedAt.toDate().toLocaleDateString()
                      : "Just now"}
                  </span>
                </div>
              </Link>
            ))
          )}
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
