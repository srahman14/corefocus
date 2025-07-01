"use client";
import { useEffect } from "react";
import useModalStore from "@/app/store/modalStore";

export default function CreateHabitModal() {
  const { isModalOpen, modalType, closeModal } = useModalStore();

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  if (!isModalOpen || modalType !== "habit") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-white min-h-[60rem] min-w-[40rem] p-6 rounded-xl shadow-xl relative">

        <h2 className="text-4xl tracking-tighter font-semibold">Create Habit</h2>
        <hr className="mb-4 bg-gray-300/90 min-h-1 border-none"></hr>
        

        {/* Your Habit Form will go here */}
        <form className="flex flex-col space-y-12">
          <label className="block mb-2 font-medium">Habit Name</label>
          <input
            type="text"
            className="w-1/2 px-3 py-2 mb-4 outline-none border-b-2 border-gray-300/90"
            placeholder="e.g. Morning Run"
          />

          <div className="flex flex-row gap-21 flex-wrap">
            <div>
              <label className="block mb-2 font-medium">Habit Difficulty</label>

              <ul className="flex flex-row gap-4 justify-start mb-2">
                  <li className="bg-green-300 min-w-20 min-h-20 rounded-full font-semibold tracking-tighter flex items-center justify-center">Easy</li>
                  <li className="bg-orange-300 min-w-20 min-h-20 rounded-full font-semibold tracking-tighter flex items-center justify-center">Medium</li>
                  <li className="bg-red-300 min-w-20 min-h-20 rounded-full font-semibold tracking-tighter flex items-center justify-center">Hard</li>
              </ul>
            </div>

            <div>
              <label className="block mb-2 font-medium">Habit Category</label>

              <ul className="flex flex-row gap-4 justify-start mb-2">
                  <li className="bg-green-300 min-w-20 min-h-20 rounded-full font-semibold tracking-tighter flex items-center justify-center">Positive</li>
                  <li className="bg-red-300 min-w-20 min-h-20 rounded-full font-semibold tracking-tighter flex items-center justify-center">Negative</li>
              </ul>
            </div>
          </div>


          <div className="flex flex-row gap-32">
            <div>
                          <label className="block mb-2 font-medium">Habit Frequency</label>
            <ul className="flex flex-row flex-wrap w-1 gap-3 mb-4 bg-gray-200 rounded-lg min-h-24">
              <li className="flex justify-center items-center m-1 p-3 font-semibold cursor-pointer hover:bg-gray-300/50 transition-all duration-200">Monday</li>
              <li className="flex justify-center items-center m-1 p-3 font-semibold cursor-pointer hover:bg-gray-300/50 transition-all duration-200">Tuesday</li>
              <li className="flex justify-center items-center m-1 p-3 font-semibold cursor-pointer hover:bg-gray-300/50 transition-all duration-200">Wednesday</li>
              <li className="flex justify-center items-center m-1 p-3 font-semibold cursor-pointer hover:bg-gray-300/50 transition-all duration-200">Thursday</li>
              <li className="flex justify-center items-center m-1 p-3 font-semibold cursor-pointer hover:bg-gray-300/50 transition-all duration-200">Friday</li>
              <li className="flex justify-center items-center m-1 p-3 font-semibold cursor-pointer hover:bg-gray-300/50 transition-all duration-200">Saturday</li>
              <li className="flex justify-center items-center m-1 p-3 font-semibold cursor-pointer hover:bg-gray-300/50 transition-all duration-200">Sunday</li>
            </ul>

            </div>
            <div className="flex flex-col">
              <div>
                <label className="block mb-2 font-medium">Habit Related Goal</label>
                <select name="goals" id="goals" className="outline-none">
                  <option value="Goal 1" className="outline-none hover:bg-black">Goal 1</option>
                  <option value="Goal 2">Goal 2</option>
                  <option value="Goal 3">Goal 3</option>
                  <option value="Goal 4">Goal 4</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Habit Tags</label>
              </div>
            </div>
          </div>


          <div className="flex flex-row justify-between items-center mt-12">
            <div>
              <button
              onClick={closeModal}
              className="text-gray-500 hover:text-black text-xl"
            >
              <p className="bg-gray-200 text-gray-400 p-2 tracking-tight font-semibold cursor-pointer hover:text-gray-400/50 duration-200 ease-in">ESC (Close)</p>
            </button>
            </div>
            <div>
              <button
              type="submit"
              className="w-46 bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition-all cursor-pointer "
            >
              Save Habit
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
