"use client";
import { useState, useEffect } from "react";
import { differenceInDays, format } from "date-fns";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { CheckCircleIcon, CircleDashedIcon } from "lucide-react";

export default function GoalsAnalytics({ onCompletedGoalsChange }) {
  const { currentUser } = useAuth(); // ensure you have access to uid
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("incomplete");

  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchGoals = async () => {
      try {
        const goalsRef = collection(db, "users", currentUser.uid, "goals");
        const snapshot = await getDocs(goalsRef);

        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGoals(fetched);
      } catch (err) {
        console.error("[GoalsAnalytics] Error fetching goals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [currentUser]);

  const today = new Date();

  // Calculate completed and incomplete goals
  const [completedGoalsCount, setCompletedGoalsCount] = useState(0);

  useEffect(() => {
    const completed = goals.filter((goal) => goal.deadline.toDate() < today);
    setCompletedGoalsCount(completed.length);
    if (onCompletedGoalsChange) {
      onCompletedGoalsChange(completed.length);
    }
  }, [goals, today, onCompletedGoalsChange]);

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Loading goals...</p>;
  }

  const completedGoals = goals
    .filter((goal) => goal.deadline.toDate() < today)
    .sort((a, b) => b.deadline.toDate() - a.deadline.toDate());

  const incompleteGoals = goals
    .filter((goal) => goal.deadline.toDate() >= today)
    .sort((a, b) => a.deadline.toDate() - b.deadline.toDate());

  const displayGoals =
    activeTab === "completed" ? completedGoals : incompleteGoals;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("incomplete")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            activeTab === "incomplete"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          Incomplete
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            activeTab === "completed"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Goals list */}
      {displayGoals.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No {activeTab} goals yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {displayGoals.map((goal) => {
            const deadline = goal.deadline.toDate();
            const diff = differenceInDays(deadline, today);
            const isCompleted = deadline < today;

            return (
              <div
                key={goal.id}
                className="p-4 rounded-xl shadow bg-gradient-to-br from-[#B19CD7] to-[#C0AFE2] dark:from-[#0B091A] dark:to-[#0B091A]"
              >
                <span className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{goal.goalName}</h3>
                  {isCompleted ? (
                    <CheckCircleIcon className="text-green-500" />
                  ) : (
                    <CircleDashedIcon className="text-orange-400" />
                  )}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isCompleted
                    ? `${Math.abs(diff)} days past deadline`
                    : `${diff} days left`}
                </p>

                {/* Priority */}
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                    goal.goalPriority === "High"
                      ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200"
                      : goal.goalPriority === "Medium"
                      ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {goal.goalPriority}
                </span>

                {/* Tags */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {goal.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Motivation */}
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  {goal.goalMotivation}
                </p>

                {/* Deadline date */}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Deadline: {format(deadline, "dd MMM yyyy")}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
