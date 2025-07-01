"use client";
import { useEffect } from "react";
import useModalStore from "@/app/store/modalStore";

export default function CreateJournalModal() {
  const { isModalOpen, modalType, closeModal } = useModalStore();

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  if (!isModalOpen || modalType !== "journal") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-white min-h-[26rem] min-w-[26rem] p-6 rounded-xl shadow-xl relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Create Journal</h2>
        

        {/* Your Journal Form will go here */}
        <form>
          <label className="block mb-2 font-medium">Journal Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="e.g. Morning Run"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
          >
            Save Journal
          </button>
        </form>
      </div>
    </div>
  );
}
