"use client";
import { useEffect, useState } from "react";
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
import JournalCard from "@/app/components/JournalCard";

export default function Journal() {
  const router = useRouter();
  const { currentUser, loading, logout } = useAuth();

  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [loadingJournals, setLoadingJournals] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Delete a journal
  const handleDelete = async (journal) => {
    if (!currentUser) return;

    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "journals", journal.id));
      setJournals((prev) => prev.filter((j) => j.id !== journal.id));
    } catch (error) {
      console.error("Error deleting journal:", error);
      alert("Failed to delete journal.");
    }
  };

  // ✅ Fetch journals from Firestore
  useEffect(() => {
    const fetchJournals = async () => {
      if (!currentUser) return;

      try {
        const journalsRef = collection(db, "users", currentUser.uid, "journals");
        const q = query(journalsRef, orderBy("updatedAt", "desc"));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJournals(data);
        setFilteredJournals(data);
        setLoadingJournals(false);
      } catch (error) {
        console.error("Error fetching journals:", error);
        setLoadingJournals(false);
      }
    };

    fetchJournals();
  }, [currentUser]);

  // ✅ Filter journals when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredJournals(journals);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = journals.filter((journal) => {
        const matchesTitle = journal.title?.toLowerCase().includes(lowerSearch);
        const matchesTags = journal.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerSearch)
        );
        return matchesTitle || matchesTags;
      });
      setFilteredJournals(filtered);
    }
  }, [searchTerm, journals]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
      {/* Header */}
      <div className="w-full flex justify-between items-center px-4 mb-12">
        <div className="text-white">
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
          <AnimatedThemeToggler />
          <button onClick={logout}>
            <i className="fa-solid fa-right-from-bracket text-2xl cursor-pointer bg-white p-2 rounded-xl"></i>
          </button>
        </div>
      </div>

      <section className="max-w-6xl mx-auto">
        {/* Title & Create Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">Your Journal</h1>
          <Link
            href={"/journal/new"}
            className="flex items-center px-4 py-2 gap-2 cursor-pointer dark:bg-blue-600 bg-[#DFFF00] hover:bg-[#DFFF00]/80 text-black dark:text-white rounded-lg font-semibold dark:hover:bg-blue-700 transition"
          >
            <Plus />
            New Entry
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8 w-full md:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="What are you looking for?"
            className="w-full p-4 rounded-3xl shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        {/* Filtered Journals */}
        {loadingJournals ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="h-48 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : filteredJournals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredJournals.map((journal) => (
              <JournalCard
                key={journal.id}
                journal={journal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No journals found.</div>
        )}

        {/* Filter Tags */}
        {/* <div className="flex flex-wrap gap-3 mb-8">
          {tags.map((option) => (
            <li
              key={option}
              className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition list-none cursor-pointer"
            >
              {option}
            </li>
          ))}
        </div> */}

        {/* Topics Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Topics</h2>
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
