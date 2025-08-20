"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import { db } from "@/app/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";
import * as Select from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const statuses = [
  { value: "draft", label: "Draft" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function JournalEditor() {
  const editorInstance = useRef(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Draft");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!editorInstance.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          heading: { 
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Enter a heading",
              levels: [1, 2, 3],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
        },
        data: {
          blocks: [],
        },
      });
      editorInstance.current = editor;
    }

    return () => {
      if (editorInstance.current?.destroy) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  const handleSaveJournal = async () => {
    if (!currentUser) {
      return;
    }

    try {
      if (!title.trim()) {
        toast.error("Please enter a journal title before saving.", { id: toastId})
        return;
      }

      setIsSaving(true);
      const toastId = toast.loading("Updating journal...")

      const editorData = await editorInstance.current.save();

      const journalData = {
        title,
        content: editorData,
        tags: tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
        status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "users", currentUser.uid, "journals"), journalData);

      toast.success("Journal saved successfully");
      setIsSaving(false);
    } catch (error) {
      toast.error("Error saving journal")
      console.error("Error saving journal:", error);
      setIsSaving(false);
    }
  };


  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-gray-200 p-24 rounded-xl h-[90vh]">
        {/* Title input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Journal"
          className="w-full text-4xl font-bold bg-transparent border-none focus:outline-none placeholder-gray-500 mb-8"
        />
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Status */}
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-semibold mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 rounded-lg bg-white border border-gray-300 focus:ring focus:ring-indigo-300"
            >
              <option value="Draft">Draft</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Tags */}
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-semibold mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. work, personal, ideas"
              className="p-2 rounded-lg bg-white border border-gray-300 focus:ring focus:ring-indigo-300"
            />
          </div>
        </div>

        {/* Dates */}

        {/* <div className="flex items-center gap-4 text-gray-500 text-sm">
          <span>Created: {createdAt}</span>
          <span>•</span>
          <span>Last edited: {updatedAt}</span>
        </div> */}

        {/* EditorJS */}
        <div
          id="editorjs"
          className="prose prose-invert prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl max-w-none focus:outline-none"
        ></div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveJournal}
            disabled={isSaving}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              isSaving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 transition"
            }`}
          >
            {isSaving ? "Saving..." : "Save Journal"}
          </button>
        </div>
      </div>
    </div>
  );
}
