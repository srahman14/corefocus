"use client";
import { useState, useRef, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function PlannerCard({ item, type, onDelete, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { currentUser } = useAuth();
  const menuRef = useRef(null);
  const title = type === "habits" ? item.habitName : item.goalName;
  const description = type === "habits" ? "" : item.goalMotivation;
  const difficultyOrPriority =
    type === "habits" ? item.difficulty : item.goalPriority;
  const frequency = item.habitFreq || [];
  const createdDate = item.createdAt;
  const deadlineDate = item.deadline;
  const tags = item.tags || [];
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((o) => !o);
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) return;

    console.log("Deleting ", type);
    try {
      await deleteDoc(doc(db, "users", currentUser.uid, type, item.id));

      onDelete(item.id);
      setMenuOpen(false);
      setOpenDeleteDialog(false);
    } catch (err) {
      console.error("Error deleting item: ", err);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenEditDialog(true);
    setMenuOpen(false);
  };

  return (
    <div className="relative bg-gradient-to-br from-[#DFFF00] via-[#FCF55F] to-[#FCF55F] dark:from-[#070C2F] dark:via-[#110E2D] dark:to-[#13153F] rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col">
      {/* Title & Dropdown Menu */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
          {title || "Untitled"}
        </h2>
        <div ref={menuRef} className="relative shrink-0">
          <button
            aria-label="Open card menu"
            className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={handleToggleMenu}
          >
            <i className="fa-solid fa-ellipsis" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 overflow-hidden">
              <button
                onClick={() => setOpenEditDialog(true)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit
              </button>
              <button
                onClick={() => setOpenDeleteDialog(true)}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 dark:hover:bg-red-600/20"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

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

      {/* Description & Details */}
      <div className="flex flex-col gap-2 mb-3 text-sm text-gray-700 dark:text-gray-300">
        {type === "habits" && (
          <>
            <div className="flex items-center gap-1 mb-2">
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  item.category === "Positive"
                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {item.category || "Positive"}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  item.difficulty === "Hard"
                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                    : item.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                    : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                    
                }`}
              >
                {item.difficulty || ""}
              </span>
            </div>
            {frequency.length > 0 && (
              <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                <span className="font-medium">Frequency:</span>{" "}
                {frequency.join(", ")}
              </p>
            )}
          </>
        )}

        {type === "goals" && (
          <>
            <span
              className={`px-2 py-1 text-xs rounded-full font-medium w-min ${
                item.goalPriority === "High"
                  ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                  : item.goalPriority === "Medium"
                  ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                  : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
              }`}
            >
              {item.goalPriority || "Medium"}
            </span>
          </>
        )}

        {description && <p className="line-clamp-3">{description}</p>}

      </div>

      {/* Footer: Dates */}
      <div className="mt-auto flex justify-between items-center text-xs text-gray-400 dark:text-gray-500 pt-3 border-t border-gray-200 dark:border-gray-700">
        <span>
          Added:{" "}
          {createdDate ? format(createdDate.toDate(), "dd MMM yyyy") : "—"}
        </span>
        {type === "goals" && (
          <span>
            Deadline:{" "}
            {deadlineDate ? format(deadlineDate.toDate(), "dd MMM yyyy") : "—"}
          </span>
        )}
      </div>

      {/* DELETE DIALOG */}
      <Dialog.Root open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl z-50">
            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete {type === "habit" ? "Habit" : "Goal"}
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 dark:text-gray-300 mt-2">
              Are you sure you want to delete{" "}
              <span className="font-medium">
                {item.habitName || item.goalName || "Untitled"}
              </span>
              ? This action cannot be undone.
            </Dialog.Description>
            <div className="flex justify-end gap-3 mt-6">
              <Dialog.Close asChild>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                onClick={handleDeleteClick}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* EDIT DIALOG */}
      <Dialog.Root open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl z-50">
            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit {type === "habit" ? "Habit" : "Goal"}
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 dark:text-gray-300 mt-2">
              Update the details below and save changes.
            </Dialog.Description>

            <form className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                defaultValue={item.habitName || item.goalName}
                className="p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
                placeholder={`Enter ${
                  type === "habit" ? "habit" : "goal"
                } name`}
              />

              {type === "goal" && (
                <>
                  <input
                    type="date"
                    defaultValue={
                      item.deadline
                        ? new Date(
                            item.deadline?.toDate
                              ? item.deadline.toDate()
                              : item.deadline
                          )
                            .toISOString()
                            .split("T")[0]
                        : "No deadline"
                    }
                    className="p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
                  />
                  <textarea
                    defaultValue={item.goalMotivation}
                    className="p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
                    placeholder="Goal motivation..."
                  />
                </>
              )}

              {type === "habit" && (
                <>
                  <select
                    defaultValue={item.category}
                    className="p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
                  >
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                  </select>

                  <select
                    defaultValue={item.difficulty}
                    className="p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  onClick={() => {
                    onEdit(item);
                    setOpenEditDialog(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
