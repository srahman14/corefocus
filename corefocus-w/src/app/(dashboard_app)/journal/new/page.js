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
import StatusDropdown from "@/app/components/StatusDropdown";
import TagInput from "@/app/components/TagInput";
  

export default function JournalEditor() {
  const editorInstance = useRef(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Draft");
  const [tags, setTags] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const { currentUser } = useAuth();
  const [createdAt] = useState(new Date());
  const [updatedAt, setUpdatedAt] = useState(new Date());

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
        
        {/* Journal Metadata */}
        <div className="flex flex-col flex-wrap">
          {/* Status */}
          <div className="flex gap-3 items-center">
            <p className="text-lg w-1/4 font-medium text-gray-600 bg-gray-300 p-3 rounded-md mb-1">Status</p>
            <div className="bg-gray-300 p-2 rounded-md w-2/3">
              <StatusDropdown status={status} setStatus={setStatus} />
            </div>
          </div>

          {/* Tags */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Tags</p>
            <TagInput tags={tags} setTags={setTags} />
          </div>

          {/* Created At */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Created</p>
            <p className="text-gray-800 text-sm">
              {createdAt.toLocaleDateString()}
            </p>
          </div>

          {/* Last Edited */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Last Edited</p>
            <p className="text-gray-800 text-sm">
              {updatedAt.toLocaleDateString()}
            </p>
          </div>
        </div>

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
