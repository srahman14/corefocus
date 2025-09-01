"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export default function JournalCard({ journal, onDelete, onTogglePin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const menuRef = useRef(null);

  // Close this card’s menu on outside click (but not while dialog is open)
  useEffect(() => {
    function handleDocMouseDown(e) {
      if (openDialog) return; // keep dialog interactive
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleDocMouseDown);
    return () => document.removeEventListener("mousedown", handleDocMouseDown);
  }, [openDialog]);

  const handleToggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((o) => !o);
  };

  const handleDeleteConfirm = (e) => {
    // extra-safe; not strictly needed inside the portal
    e.preventDefault?.();
    e.stopPropagation?.();
    onDelete(journal);         // parent deletes from Firestore + state
    setOpenDialog(false);      // close dialog
    setMenuOpen(false);        // close menu
  };

  const handlePinClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin?.(journal);
    setMenuOpen(false);
  };

  return (
    <div className="block relative bg-gradient-to-br from-[#DFFF00] via-[#FCF55F] to-[#FCF55F] dark:from-[#070C2F] dark:via-[#110E2D] dark:to-[#13153F] rounded-xl shadow hover:shadow-lg transition p-5">
      {/* Make only the main content clickable */}
      <Link href={`/journal/${journal.id}`} className="block">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {journal.title || "Untitled Journal"}
        </h2>
      </Link>

      {/* Kebab menu */}
      <div ref={menuRef} className="absolute top-5 right-5">
        <button
          type="button"
          aria-label="Open card menu"
          className="bg-gray-200 px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-300 transition"
          onClick={handleToggleMenu}
        >
          <i className="fa-solid fa-ellipsis" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg z-10 overflow-hidden">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenDialog(true); // open dialog (Dialog.Root lives below)
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer"
            >
              Delete
            </button>
{/* 
            <button
              type="button"
              onClick={handlePinClick}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {journal.pinned ? "Unpin" : "Pin / Favorite"}
            </button> */}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3 mt-2">
        {journal.tags?.length ? (
          journal.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400">No tags</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span
          className={`px-2 py-1 rounded-md ${
            journal.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {journal.status || "Draft"}
        </span>
        <span>
          {journal.updatedAt?.toDate
            ? journal.updatedAt.toDate().toLocaleDateString()
            : "Just now"}
        </span>
      </div>

     
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl z-[61]">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Delete Journal
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 mt-2">
              Are you sure you want to delete{" "}
              <span className="font-medium">
                {journal.title || "Untitled Journal"}
              </span>
              ? This action cannot be undone.
            </Dialog.Description>

            <div className="flex justify-end gap-3 mt-6">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
