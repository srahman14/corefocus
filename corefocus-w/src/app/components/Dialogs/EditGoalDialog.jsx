"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const priorities = ["High", "Medium", "Low"];
const defaultTags = [
  "Educational",
  "Personal",
  "Physical",
  "Mental",
  "Spiritual",
  "Family-Related",
  "Development",
  "Reading",
  "Career-Related",
  "Financial",
  "Competitive",
];

export default function EditGoalDialog({ open, onOpenChange, goal, onSave }) {
  const { currentUser } = useAuth();

  const [goalName, setGoalName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [goalMotivation, setGoalMotivation] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (open && goal) {
      setGoalName(goal.goalName || "");
      setDeadline(
        goal.deadline
          ? new Date(goal.deadline?.toDate ? goal.deadline.toDate() : goal.deadline)
              .toISOString()
              .split("T")[0]
          : ""
      );
      setGoalMotivation(goal.goalMotivation || "");
      setPriority(goal.goalPriority || "Medium");
      setTags(Array.isArray(goal.tags) ? goal.tags : []);
    }
  }, [open, goal]);

  const handleToggleItem = (item, stateArray, setStateFn) => {
    if (stateArray.includes(item)) {
      setStateFn(stateArray.filter((i) => i !== item));
    } else {
      setStateFn([...stateArray, item]);
    }
  };

  const handleToggleAll = (optionsArray, stateArray, setStateFn) => {
    const allSelected = optionsArray.every((o) => stateArray.includes(o));
    setStateFn(allSelected ? [] : optionsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.uid || !goal?.id) {
      toast.error("User or goal not available.");
      return;
    }

    const toastId = toast.loading("Updating goal...");

    try {
      const goalRef = doc(db, "users", currentUser.uid, "goals", goal.id);
      const payload = {
        goalName,
        deadline: deadline ? new Date(deadline) : null,
        goalMotivation,
        goalPriority: priority,
        tags,
      };

      await updateDoc(goalRef, payload);
      toast.success("Goal updated successfully!", { id: toastId });
      onSave?.({ ...goal, ...payload });
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating goal:", error);
      toast.error("Failed to update goal", { id: toastId });
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[95%] sm:w-[90%] max-w-sm md:max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl sm:rounded-2xl bg-white dark:bg-[#1c1c1e] p-4 sm:p-6 md:p-8 shadow-xl z-50 focus:outline-none max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Edit Goal
          </Dialog.Title>
          <Dialog.Description className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
            Update your goal details below and save changes.
          </Dialog.Description>
          <hr className="mb-3 sm:mb-4 bg-gray-300/90 dark:bg-gray-700 min-h-1 border-none" />

          <form className="flex flex-col gap-4 sm:gap-5 md:gap-6" onSubmit={handleSubmit}>
            {/* Goal Name */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg mb-2 font-semibold text-gray-900 dark:text-white">
                Goal Name
              </label>
              <input
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="e.g. Read 10 books this year"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border dark:border-gray-600 dark:bg-[#2c2c2e] dark:text-white outline-none text-sm sm:text-base md:text-lg font-medium"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg mb-2 font-semibold text-gray-900 dark:text-white">
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border dark:border-gray-600 dark:bg-[#2c2c2e] dark:text-white outline-none text-sm sm:text-base md:text-lg font-medium"
              />
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg mb-2 font-semibold text-gray-900 dark:text-white">
                Motivation
              </label>
              <textarea
                value={goalMotivation}
                onChange={(e) => setGoalMotivation(e.target.value)}
                placeholder="Why do you want to achieve this goal?"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border dark:border-gray-600 dark:bg-[#2c2c2e] dark:text-white outline-none text-sm sm:text-base md:text-lg font-medium resize-none"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg mb-2 font-semibold text-gray-900 dark:text-white">
                Priority
              </label>
              <ul className="flex gap-2 sm:gap-3 flex-wrap">
                {priorities.map((p) => (
                  <li
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg cursor-pointer text-sm sm:text-base font-medium transition ${
                      priority === p
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg mb-2 font-semibold text-gray-900 dark:text-white">
                Tags
              </label>
              <ul className="flex flex-wrap gap-1 sm:gap-2">
                {defaultTags.map((tagTypes) => {
                  const isSelected = tags.includes(tagTypes);
                  return (
                    <li
                      key={tagTypes}
                      onClick={() => handleToggleItem(tagTypes, tags, setTags)}
                      className={`px-2 sm:px-3 py-1 rounded-lg cursor-pointer text-xs sm:text-sm font-medium transition ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {tagTypes}
                    </li>
                  );
                })}
                <li
                  onClick={() => handleToggleAll(defaultTags, tags, setTags)}
                  className={`px-2 sm:px-3 py-1 rounded-lg cursor-pointer text-xs sm:text-sm font-medium transition ${
                    tags.length === defaultTags.length
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {tags.length === defaultTags.length ? "All" : "Select All"}
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base bg-gray-200 dark:bg-gray-700 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
