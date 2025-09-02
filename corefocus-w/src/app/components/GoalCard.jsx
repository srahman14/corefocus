import { format } from "date-fns";

export default function GoalCard({ goal }) {
  const {
    goalName,
    goalMotivation,
    createdAt,
    deadline,
    goalPriority,
    tags = [],
  } = goal;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-[#1f1a4a] dark:to-[#2a236b] p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full">
      {/* Top Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {goalName || "Untitled Goal"}
        </h3>

        {/* Priority */}
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            goalPriority === "High"
              ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
              : goalPriority === "Medium"
              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
          }`}
        >
          {goalPriority || "Medium"}
        </span>

        {/* Motivation */}
        {goalMotivation && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 mb-3">
            {goalMotivation}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-4">
        <span>
          Added: {createdAt ? format(createdAt.toDate(), "dd MMM yyyy") : "—"}
        </span>
        <span>
          Deadline: {deadline ? format(deadline.toDate(), "dd MMM yyyy") : "—"}
        </span>
      </div>
    </div>
  );
}
