import { format } from "date-fns";

export default function HabitCard({ habit }) {
  const {
    habitName,
    category,
    createdAt,
    difficulty,
    habitFreq,
    tags = [],
  } = habit;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-[#1f1a4a] dark:to-[#2a236b] p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full">
      {/* Top Section */}
      <div>
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {habitName || "Untitled Habit"}
        </h3>

        {/* Category & Difficulty */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              category === "Positive"
                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
            }`}
          >
            {category === "Positive" ? "Positive" : "Negative"}
          </span>
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              difficulty === "High"
                ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                : difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
            }`}
          >
            {difficulty || "Medium"}
          </span>
        </div>

        {/* Frequency */}
        {habitFreq && habitFreq.length > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            <span className="font-medium">Frequency:</span> {habitFreq.join(", ")}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
        Added on {createdAt ? format(createdAt.toDate(), "dd MMM yyyy") : "—"}
      </p>
    </div>
  );
}
