"use client";
import { useEffect, useState, useRef } from "react";
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
import Link from "next/link";
import JournalCard from "@/app/components/JournalCard";
import { AnimatedThemeToggler } from "@/app/components/magicui/animated-theme-toggler";
import { format } from "date-fns"

export default function Journal() {
  const router = useRouter();
  const { currentUser, loading, logout } = useAuth();
  const [journals, setJournals] = useState([]);
  const [loadingJournals, setLoadingJournals] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJournals, setFilteredJournals] = useState([]);
  const searchInputRef = useRef(null);

  // Delete journal
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

  // Fetch user's journals
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
        setLoadingJournals(false);
      } catch (error) {
        console.error("Error fetching journals:", error);
        setLoadingJournals(false);
      }
    };

    fetchJournals();
  }, [currentUser]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
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
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, journals]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => setSearchTerm("");

  if (!currentUser) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">Please log in to view your journals.</p>
      </div>
    );
  }

  const tags = ["Favorites", "Work Goals", "Vacation", "Habit Building", "Family Time"];
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
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );
  }

  return (
    <main className="flex flex-col h-full px-4 py-10 bg-gradient-to-br from-[#B19CD7] via-[#EBE8FC] to-[#C0AFE2] dark:from-[#0B091A] dark:via-[#110E2D] dark:to-[#0B091A] overflow-y-auto">
      {/* Header */}
      <Topbar />

      <section className="max-w-6xl mx-auto">
        {/* Top Bar: Title + New Entry */}
        <div className="flex justify-between items-center md:mb-6">
          <h1 className="text-3xl font-bold dark:text-white hidden md:flex">Your Journal</h1>
          {/* Desktop: standard button */}
          <Link
            href={"/journal/new"}
            className="hidden md:flex items-center px-4 py-2 gap-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <i className="fa-solid fa-plus"></i>
            New Entry
          </Link>
        </div>

        {/* Mobile: floating action button (bottom-right) */}
        <Link
          href={"/journal/new"}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl z-50"
        >
          <i className="fa-solid fa-plus text-xl"></i>
        </Link>

        {/* Search Bar */}
        <div className="p-6 flex flex-col gap-6">
          <div className="relative md:w-1/2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="What are you looking for?"
              ref={searchInputRef}
              className="w-full p-4 rounded-3xl shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tags */}
          {/* <ul className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <li
                key={tag}
                className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition list-none cursor-pointer"
              >
                {tag}
              </li>
            ))}
          </ul> */}

          {/* Latest Entries */}
          <h2 className="text-2xl font-bold dark:text-white">Latest Entries</h2>
          {filteredJournals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJournals.map((journal) => (
                <JournalCard
                  key={journal.id}
                  journal={journal}
                  onDelete={handleDelete}
                  onTogglePin={() => {}}
                  searchTerm={searchTerm} // optional for highlight
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3" />
              No journals found. Try a different search or create a new entry!
            </div>
          )}

          {/* Topics Section */}
          {/* <h2 className="text-2xl font-bold mt-12 mb-4 dark:text-white">Topics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topics.map((topic) => (
              <button
                key={topic}
                className="bg-gradient-to-br from-[#B19CD7] to-[#C0AFE2] dark:from-[#1f1a4a] dark:to-[#2a236b] text-white font-semibold text-md p-3 rounded-lg shadow hover:shadow-md cursor-pointer transition text-left"
              >
                {topic}
              </button>
            ))}
          </div> */}
        </div>
      </section>
    </main>
  );
}
