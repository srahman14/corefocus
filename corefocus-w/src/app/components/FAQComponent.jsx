'use client';
import { useState } from "react";

export default function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-3 border-gray-400/20 px-4 py-3 mb-4">
      <button
        className="flex justify-between items-center w-full cursor-pointer text-lg font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-100"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
}
