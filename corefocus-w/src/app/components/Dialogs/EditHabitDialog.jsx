"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const HabitFrequency = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const difficulties = ["Easy", "Medium", "Hard"];
const categories = ["Positive", "Negative"];
const defaultTags = [
  "Educational",
  "Personal",
  "Physical",
  "Mental",
  "Spiritual",
  "Family-Related",
  "Developement",
  "Reading",
  "Career-Related",
  "Financial",
  "Competitive",
];

export default function EditHabitDialog({ open, onOpenChange, habit, onSave }) {
  const { currentUser } = useAuth();

  const [habitName, setHabitName] = useState("");
  const [habitFreq, setHabitFreq] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (open && habit) {
      setHabitName(habit.habitName || "");
      setHabitFreq(Array.isArray(habit.habitFreq) ? habit.habitFreq : []);
      setDifficulty(habit.difficulty || null);
      setCategory(habit.category || null);
      setTags(Array.isArray(habit.tags) ? habit.tags : []);
    }
  }, [open, habit]);

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
    if (!currentUser?.uid || !habit?.id) {
      toast.error("User or habit not available.");
      return;
    }

    const toastId = toast.loading("Updating habit...");

    try {
      const habitRef = doc(db, "users", currentUser.uid, "habits", habit.id);
      const payload = {
        habitName,
        habitFreq,
        difficulty,
        category,
        tags,
      };

      await updateDoc(habitRef, payload);
      toast.success("Habit updated successfully!", { id: toastId });
      onSave?.({ ...habit, ...payload });
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating habit:", error);
      toast.error("Failed to update habit", { id: toastId });
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[95%] sm:w-[90%] max-w-sm md:max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl sm:rounded-2xl bg-white dark:bg-[#1c1c1e] p-4 sm:p-6 md:p-8 shadow-xl z-50 focus:outline-none max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Edit Habit
          </Dialog.Title>
          <Dialog.Description className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
            Update your habit details below and save changes.
          </Dialog.Description>
          <hr className="mb-3 sm:mb-4 bg-gray-300/90 dark:bg-gray-700 min-h-1 border-none" />

          <form className="flex flex-col gap-4 sm:gap-5 md:gap-8" onSubmit={handleSubmit}>
            {/* Habit Name */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg mb-2 font-semibold text-gray-900 dark:text-white">
                Habit Name
              </label>
              <input
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="e.g. Morning run"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border dark:border-gray-600 dark:bg-[#2c2c2e] dark:text-white outline-none text-sm sm:text-base md:text-lg font-medium"
                required
              />
            </div>

            {/* Habit Frequency */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg mb-2 font-semibold text-gray-900 dark:text-white">
                Habit Frequency
              </label>
              <ul className="flex flex-wrap gap-1 sm:gap-2">
                {HabitFrequency.map((option) => {
                  const isSelected = habitFreq.includes(option);
                  return (
                    <li
                      key={option}
                      onClick={() => handleToggleItem(option, habitFreq, setHabitFreq)}
                      className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg cursor-pointer text-sm sm:text-base font-medium transition ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {option}
                    </li>
                  );
                })}
                <li
                  onClick={() => handleToggleAll(HabitFrequency, habitFreq, setHabitFreq)}
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg cursor-pointer text-sm sm:text-base font-medium transition ${
                    habitFreq.length === HabitFrequency.length
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {habitFreq.length === HabitFrequency.length ? "All" : "Select All"}
                </li>
              </ul>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg mb-2 font-semibold text-gray-900 dark:text-white">
                Difficulty
              </label>
              <ul className="flex gap-2 sm:gap-3 flex-wrap">
                {difficulties.map((level) => {
                  const isSelected = difficulty === level;
                  return (
                    <li
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg cursor-pointer text-sm sm:text-base font-medium transition ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {level}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg mb-2 font-semibold text-gray-900 dark:text-white">
                Category
              </label>
              <ul className="flex gap-2 sm:gap-3 flex-wrap">
                {categories.map((type) => {
                  const isSelected = category === type;
                  return (
                    <li
                      key={type}
                      onClick={() => setCategory(type)}
                      className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg cursor-pointer text-sm sm:text-base font-medium transition ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {type}
                    </li>
                  );
                })}
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
