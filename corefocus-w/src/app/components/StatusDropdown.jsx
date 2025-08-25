"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const STATUSES = ["Draft", "In Progress", "Completed", "Archived"];

export default function StatusDropdown({ status, setStatus }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-48">
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full bg-gray-100 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
      >
        {status || "Select Status"}
        <ChevronDownIcon
          className={`w-5 h-5 ml-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            {STATUSES.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setStatus(item);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-100 transition ${
                  status === item ? "bg-indigo-50 font-semibold" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
