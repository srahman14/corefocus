import React, { useState, useEffect } from "react";

import CreateHabitForm from "../Tabs/CreateHabitForm";
import CreateGoalForm from "../Tabs/CreateGoalForm";
import EditHabits from "../Tabs/EditHabits";
import useModalStore from "@/app/store/modalStore";

export default function CreateModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("habit"); // "goal" or "journal"
  const closeModal = useModalStore((state) => state.closeModal);

  const tabClass = (tab) =>
    `px-4 py-2 font-medium rounded cursor-pointer transtion-all ease-out duration-400 ${
      activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
    }`;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-gradient-to-br from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#070C2F] dark:via-[#110E2D] dark:to-[#13153F] dark:text-white w-[95%] sm:w-[90%] max-w-sm md:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:min-h-[60rem] md:min-w-[40rem] rounded-xl sm:rounded-xl shadow-xl relative">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 hover:text-red-500 font-semibold text-lg sm:text-xl"
        >
          &times;
        </button>

        {/* Tab switcher */}
        <div className="mb-4 sm:mb-6 flex gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab("habit")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-semibold cursor-pointer transition-all ease-in-out duration-300 ${
              activeTab === "habit" ? "bg-[#520dd0] text-white" : "bg-gray-100 dark:text-black"
            }`}
          >
            <span>
              <i className="fa-sharp fa-solid fa-bell"></i>
              <p className="inline-block ml-1 sm:ml-2">Habit</p>
            </span>
          </button>
          <button
            onClick={() => setActiveTab("goal")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-semibold cursor-pointer transition-all ease-in-out duration-300 ${
              activeTab === "goal" ? "bg-[#520dd0] text-white" : "bg-gray-100 dark:text-black"
            }`}
          >
            <span>
              <i className="fa-solid fa-chart-area"></i>
              <p className="inline-block ml-1 sm:ml-2">Goals</p>
            </span>
          </button>
        </div>

        {/* Render active form */}
        {activeTab === "habit" && <CreateHabitForm />}
        {activeTab === "goal" && <CreateGoalForm />}
      </div>
    </div>
  );
}
