"use client";
import { useEffect } from "react";
import useModalStore from "@/app/store/modalStore";

export default function CreateGoalModal() {
  const { isModalOpen, modalType, closeModal } = useModalStore();

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  if (!isModalOpen || modalType !== "goal") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-white min-h-[40rem] min-w-[40rem] p-6 rounded-xl shadow-xl relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-4xl font-semibold tracking-tighter">Create Goal</h2>
        <hr className="mb-4 bg-gray-300/90 min-h-1 border-none"></hr>
        {/* Your Goal Form will go here */}
        <form>
          <label className="block mb-2 font-medium">Goal Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="e.g. Morning Run"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
          >
            Save Goal
          </button>
        </form>
      </div>
    </div>
  );
}
