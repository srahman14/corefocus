"use client";
import { useAuth } from "@/app/context/AuthContext";
import useJournals from "@/app/hooks/useJournals";
import JournalCard from "../JournalCard";

export default function ReadRoute() {
  const { user } = useAuth();
  const { journals, loading, error } = useJournals(user?.uid);

  return (
    <div className="bg-gradient-to-br w-full from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#13153F] dark:via-[#110E2D] dark:to-[#070C2F] rounded-xl shadow-md transition p-2 sm:p-3 md:p-4 text-gray-800 dark:text-white h-full min-h-[180px] sm:min-h-[200px]">
      <h2 className="text-sm sm:text-base md:text-lg text-white font-semibold mb-1.5 sm:mb-2 md:mb-3">📚 Read Route</h2>
      <p className="text-xs sm:text-xs md:text-sm text-white mb-2 sm:mb-3">
        Track your latest journals here.
      </p>

      {loading && <p className="text-gray-400 text-sm">Loading journals...</p>}
      {error && <p className="text-red-400 text-sm">Error: {error}</p>}

      {!loading && journals.length === 0 && (
        <p className="text-gray-400 text-sm">No journals yet. Start writing one!</p>
      )}

      <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {journals.map((journal) => (
          <JournalCard
            key={journal.id}
            journal={journal}
            variant="preview" // ✅ show smaller preview style
          />
        ))}
      </div>
    </div>
  );
}
