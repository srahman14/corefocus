"use client";
import { useAuth } from "@/app/context/AuthContext";
import useJournals from "@/app/hooks/useJournals";
import JournalCard from "../JournalCard";

export default function ReadRoute() {
  const { user } = useAuth();
  const { journals, loading, error } = useJournals(user?.uid);

  return (
    <div className="bg-gradient-to-br from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#13153F] dark:via-[#110E2D] dark:to-[#070C2F] rounded-xl shadow-md transition p-6 text-gray-800 dark:text-white h-full">
      <h2 className="text-xl text-white font-semibold mb-2">📚 Read Route</h2>
      <p className="text-sm text-white mb-4">
        Track your latest journals here.
      </p>

      {loading && <p className="text-gray-400">Loading journals...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

      {!loading && journals.length === 0 && (
        <p className="text-gray-400">No journals yet. Start writing one!</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
