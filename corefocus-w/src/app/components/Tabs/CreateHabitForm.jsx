// components/CreateHabitForm.tsx
export default function CreateHabitForm() {
  return (
    <div>
      <h2 className="text-4xl tracking-tighter font-semibold">Create Habit</h2>
      <hr className="mb-4 bg-gray-300/90 min-h-1 border-none" />

      {/* Form contents */}
      <form className="flex flex-col space-y-12">
        {/* ... all your input fields ... */}
        {/* NAME, RELATED GOAL (OVERALL GOAL TO ACHIEVE WITH THIS HABIT) FREQUENCY, DIFFICULTY, TAGS, HABIT CATEGORY (POSTIVIE OR NEGATIVE) */}
        <div className="flex flex-row justify-between items-center mt-12">
          <p className="text-sm text-gray-400">ESC to close</p>
          <button
            type="submit"
            className="w-46 bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition-all cursor-pointer "
          >
            Save Habit
          </button>
        </div>
      </form>
    </div>
  );
}
