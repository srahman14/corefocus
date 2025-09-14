"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function JournalCard({
  journal,
  onDelete,
  onTogglePin,
  searchTerm,
  variant = "full",
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((o) => !o);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(journal);
    setMenuOpen(false);
  };

  const handlePinClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin?.(journal);
    setMenuOpen(false);
  };

  // Function to highlight search term
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span
          key={i}
          className="bg-yellow-200 dark:text-black rounded px-1"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

const getExcerpt = (content) => {
  if (!content || !content.blocks) return "";

  // Extract all text from blocks
  const allText = content.blocks
    .map((block) => block.data?.text || "")
    .join(" ")
    .replace(/&nbsp;/g, " ") // replace non-breaking spaces with regular spaces
    .trim();

  if (!allText) return "";

  const words = allText.split(/\s+/).slice(0, 12).join(" ");
  return words + (allText.split(/\s+/).length > 12 ? "..." : "");
};


  const excerpt = getExcerpt(journal.content || "");

  return (
    <Link
      href={`/journal/${journal.id}`}
      className={`block relative rounded-xl shadow transition ${
        variant === "preview"
          ? "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1f1a4a] dark:to-[#2a236b] p-4 mb-3 shadow-md hover:m-1 transition-all ease-in-out duration-200"
          : "bg-gradient-to-br from-[#B19CD7] to-[#C0AFE2] dark:from-[#1f1a4a] dark:to-[#2a236b] p-5 hover:shadow-lg hover:m-1 transition-all ease-in-out duration-200"
      }`}
    >
      {/* Title row */}
      <div className="flex justify-between items-start">
        <h2
          className={`font-bold text-black-600 dark:text-white ${
            variant === "preview" ? "font-semibold text-base mb-1" : "text-white text-2xl mb-2 line-clamp-2"
          }`}
        >
          {highlightText(journal.title || "Untitled Journal")}
        </h2>

        {variant === "full" && (
          <div ref={menuRef} className="relative shrink-0">
            <button
              aria-label="Open card menu"
              className="bg-gray-200 dark:bg-gray-100 px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-300 transition"
              onClick={handleToggleMenu}
            >
              <i className="fa-solid fa-ellipsis" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg z-10 overflow-hidden">
                <button
                  onClick={handleDeleteClick}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={handlePinClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {journal.pinned ? "Unpin" : "Pin / Favorite"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Excerpt */}
      {excerpt && (
        <p
          className={`text-[#ffffff] dark:text-gray-300 ${
            variant === "preview" ? "text-sm text-black mb-2 line-clamp-2" : "italic text-base mb-3 line-clamp-3"
          }`}
        >
          {highlightText(excerpt)}
        </p>
      )}

      {/* Tags */}
      {variant === "full" && (
        <div className="flex flex-wrap gap-2 mb-3">
          {journal.tags?.length > 0 ? (
            journal.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-pink-100 dark:bg-blue-100 text-blue-700 rounded-md"
              >
                {highlightText(tag)}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-600 bg-gray-200 p-1 rounded-md dark:text-black">No tags</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div
        className={`flex justify-between items-center text-sm ${
          variant === "preview"
            ? "text-gray-500 dark:text-gray-400"
            : "text-gray-600"
        }`}
      >
        {variant === "full" && (
          <span
            className={`px-2 py-1 rounded-md ${
              journal.status === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {journal.status || "Draft"}
          </span>
        )}
        <span>
          {journal.updatedAt?.toDate
            ? journal.updatedAt.toDate().toLocaleDateString()
            : "Just now"}
        </span>
      </div>
    </Link>
  );
}
