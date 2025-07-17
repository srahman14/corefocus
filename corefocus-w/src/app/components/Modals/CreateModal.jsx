import React, { useState, useEffect } from "react";

import CreateHabitForm from "../Tabs/CreateHabitForm";
import CreateGoalForm from "../Tabs/CreateGoalForm";
import CreateJournalForm from "../Tabs/CreateJournalModal";
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
      <div className="bg-white min-h-[60rem] min-w-[40rem] p-6 rounded-xl shadow-xl relative">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-semibold text-xl"
        >
          &times;
        </button>

        {/* Tab switcher */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setActiveTab("habit")}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all ease-in-out duration-300 ${
              activeTab === "habit" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            <span>
              <i className="fa-sharp fa-solid fa-bell"></i>
              <p className="inline-block ml-2">Habit</p>
            </span>
          </button>
          <button
            onClick={() => setActiveTab("goal")}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all ease-in-out duration-300 ${
              activeTab === "goal" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            <span>
              <i className="fa-solid fa-chart-area"></i>
              <p className="inline-block ml-2">Goals</p>
            </span>
          </button>
          <button
            onClick={() => setActiveTab("journal")}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all ease-in-out duration-300 ${
              activeTab === "journal" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            Journal
          </button>
        </div>

        {/* Render active form */}
        {activeTab === "habit" && <CreateHabitForm />}
        {activeTab === "goal" && <CreateGoalForm />}
        {activeTab === "journal" && <CreateJournalForm />}
      </div>
    </div>
  );
}
