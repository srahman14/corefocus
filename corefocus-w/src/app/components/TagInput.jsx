"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TagInput({ tags, setTags }) {
  const [tagInput, setTagInput] = useState("");

  // Add tag when Enter or Comma is pressed
  const handleKeyDown = (e) => {
    const value = tagInput.trim();

    // Create tag on Enter or Comma
    if ((e.key === "Enter" || e.key === ",") && value !== "") {
      e.preventDefault();
      if (!tags.includes(value)) {
        setTags([...tags, value]);
        setTagInput("");
      }
    }

    // Remove last tag if Backspace pressed on empty input
    if (e.key === "Backspace" && value === "" && tags.length > 0) {
      e.preventDefault();
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  // Remove tag manually
  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex items-center flex-wrap gap-2 bg-transparent rounded-lg py-2 min-h-[44px] focus-within:border-blue-400 transition-colors">
      <AnimatePresence>
        {tags.map((tag) => (
          <motion.span
            key={tag}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1 hover:bg-blue-300/80 cursor-pointer bg-blue-200 text-gray-700 px-2 py-1 rounded-md text-sm duration-200 transition-all"
          >
            {tag}
            <Cross2Icon
              onClick={() => removeTag(tag)}
              className="w-4 h-4 cursor-pointer hover:text-red-500 transition"
            />
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Input field */}
      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? "Add tags..." : ""}
        className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
      />
    </div>
  );
}
