// components/CreateHabitForm.tsx
export default function CreateHabitForm() {
  return (
    <div>
      <h2 className="text-4xl tracking-tighter font-semibold">Create Habit</h2>
      <p className="w-140 font-light text-gray-400 text-lg">Start achieving your goals with achievable habits in place. Note that you should relate your habits to your overall goals.</p>
      <hr className="mb-4 bg-gray-300/90 min-h-1 border-none" />

      {/* Form contents */}
      <form className="flex flex-col space-y-12">
        {/* ... all your input fields ... */}
        {/* TAGS, */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-start gap-8">
            <div>
              <label className="block text-lg mb-2 font-semibold tracking-tighter">Habit name</label>

              <div className="flex bg-blue-300 rounded-lg overflow-hidden h-16">
                  {/* Icon on the left */}
                  <div className="flex items-center justify-center px-6 bg-blue-500 text-white mr-2">
                    <i className="fa-solid fa-t text-2xl"></i>
                  </div>


                <div className="flex items-center justify-center bg-blue-300 rounded-lg h-full">
                  <input placeholder="e.g. Morning run" className="outline-none text-xl font-semibold"></input>
                </div>

               </div>
            </div>

            <div>
              <label className="block text-lg mb-2 font-semibold tracking-tighter">Habit Related Goal</label>
                <div className="flex bg-blue-300 rounded-lg overflow-hidden h-16">
                    {/* Icon on the left */}
                    <div className="flex items-center justify-center px-6 bg-blue-500 text-white mr-2">
                      <i className="fa-solid fa-t text-2xl"></i>
                    </div>

                    <div className="flex items-center bg-blue-300 rounded-lg w-full">
                      <select placeholder="e.g. Morning run" className="w-42 outline-none border-b-2 border-blue-300 text-xl font-semibold">
                        <option value="goal 1">Goal 1</option>
                        <option value="goal 1">Goal 1</option>
                        <option value="goal 1">Goal 1</option>
                        <option value="goal 1">Goal 1</option>
                      </select>
                    </div>

                </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold tracking-tighter mb-2">Habit Frequency</label>

            <div className="flex flex-wrap bg-blue-300 rounded-lg overflow-hidden h-16">
              {/* Icon on the left */}
              <div className="flex items-center justify-center px-6 bg-blue-500 text-white">
                <i className="fa-solid fa-calendar-week text-2xl"></i>
              </div>

              {/* Days on the right */}
              <ul className="flex items-center gap-2 justify-start h-full">
                <li className="h-full flex items-center px-4 hover:bg-blue-200 cursor-pointer font-semibold tracking-tighter text-md">Mon</li>
                <li className="h-full flex items-center px-4 hover:bg-blue-200 cursor-pointer font-semibold tracking-tighter text-md">Tue</li>
                <li className="h-full flex items-center px-4 hover:bg-blue-200 cursor-pointer font-semibold tracking-tighter text-md">Wed</li>
                <li className="h-full flex items-center px-4 hover:bg-blue-200 cursor-pointer font-semibold tracking-tighter text-md">Thurs</li>
                <li className="h-full flex items-center px-4 hover:bg-blue-200 cursor-pointer font-semibold tracking-tighter text-md">Fri</li>
                <li className="h-full flex items-center px-4 hover:bg-blue-200 cursor-pointer font-semibold tracking-tighter text-md">Sat</li>
                <li className="h-full flex items-center px-4 hover:bg-blue-200 cursor-pointer font-semibold tracking-tighter text-md">Sun</li>
                <li className="h-full flex items-center px-4 hover:bg-blue-200 cursor-pointer font-semibold tracking-tighter text-md">All</li>
              </ul>
            </div>
          </div>
        
          <div className="flex flex-row justify-start gap-8">
            <div>
                <label className="block text-lg font-semibold tracking-tighter mb-2">Habit Difficulty</label>

                <div className="flex bg-blue-300 rounded-lg overflow-hidden h-16">
                {/* Icon on the left */}
                <div className="flex items-center justify-center px-6 bg-blue-500 text-white">
                  <i className="fa-solid fa-cubes-stacked text-2xl"></i>
                </div>

                {/* Days on the right */}
                <ul className="flex items-center gap-0 justify-start h-full">
                  <li className="h-full flex items-center px-4 bg-green-200 hover:bg-green-300 cursor-pointer font-semibold tracking-tighter text-md">Easy</li>
                  <li className="h-full flex items-center px-4 bg-orange-200 hover:bg-orange-300 cursor-pointer font-semibold tracking-tighter text-md">Medium</li>
                  <li className="h-full flex items-center px-4 bg-red-200 hover:bg-red-300 cursor-pointer font-semibold tracking-tighter text-md">Hard</li>
                </ul>
              </div>
            </div>

            <div>
                <label className="block text-lg font-semibold tracking-tighter mb-2">Habit Category</label>

                <div className="flex bg-blue-300 rounded-lg overflow-hidden h-16">
                {/* Icon on the left */}
                {/* ICON CHANGES BASED ON INPUT */}
                <div className="flex items-center justify-center px-6 bg-blue-500 text-white">
                  <i className="fa-solid fa-face-grin text-2xl"></i>
                </div>

                {/* Days on the right */}
                <ul className="flex items-center gap-0 justify-start h-full">
                  <li className="h-full flex items-center px-4 bg-green-200 hover:bg-green-300 cursor-pointer font-semibold tracking-tighter text-md">Positive</li>
                  <li className="h-full flex items-center px-4 bg-red-200 hover:bg-red-300 cursor-pointer font-semibold tracking-tighter text-md">Negative</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold tracking-tighter mb-2">Habit Tags</label>

              <div className="flex bg-blue-300 rounded-lg overflow-hidden h-16">
              {/* Icon on the left */}
              {/* ICON CHANGES BASED ON INPUT */}
              <div className="flex items-center justify-center px-6 bg-blue-500 text-white">
                <i className="fa-solid fa-face-grin text-2xl"></i>
              </div>

              {/* Days on the right */}
              <ul className="flex items-center gap-0 justify-start h-full">
                <li className="h-full flex items-center px-4 bg-green-200 hover:bg-green-300 cursor-pointer font-semibold tracking-tighter text-md">Positive</li>
                <li className="h-full flex items-center px-4 bg-red-200 hover:bg-red-300 cursor-pointer font-semibold tracking-tighter text-md">Negative</li>
              </ul>
            </div>
          </div>

          
          
        </div>
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
