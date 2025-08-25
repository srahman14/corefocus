"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import { db } from "@/app/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";
import StatusDropdown from "@/app/components/StatusDropdown";
import TagInput from "@/app/components/TagInput";
import { X } from "lucide-react";

export default function JournalEditor() {
  const editorInstance = useRef(null);
  const journalRef = useRef(null);
  const [title, setTitle] = useState("Untitled Journal");
  const [status, setStatus] = useState("Draft");
  const [tags, setTags] = useState([]);
  const [createdAt] = useState(new Date());
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState("All changes saved");
  const saveTimeout = useRef(null);
  const lastSavedHash = useRef(null);

  const { currentUser } = useAuth();

  /** -------------------------------
   *  Initialize Journal Reference
   * ------------------------------- */
  useEffect(() => {
    if (currentUser) {
      // Cache key for this user's "latest journal"
      const cachedJournalId = localStorage.getItem("latestJournalId");

      // If we already have a cached ID, reuse it
      if (cachedJournalId) {
        journalRef.current = doc(
          db,
          "users",
          currentUser.uid,
          "journals",
          cachedJournalId
        );
      } else {
        // Create a new journal ref with a random Firestore ID
        journalRef.current = doc(
          collection(db, "users", currentUser.uid, "journals")
        );
        localStorage.setItem("latestJournalId", journalRef.current.id);
      }
    }
  }, [currentUser]);

  /** -------------------------------
   *  Fetch Journal Data (with Cache)
   * ------------------------------- */
  const fetchJournal = useCallback(async () => {
    if (!currentUser || !journalRef.current) return;

    // First try localStorage for faster recovery
    const cachedData = localStorage.getItem("latestJournalContent");
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        setTitle(parsed.title || "Untitled Journal");
        setStatus(parsed.status || "Draft");
        setTags(parsed.tags || []);
        if (parsed.content && editorInstance.current) {
          await editorInstance.current.render(parsed.content);
        }
      } catch (err) {
        console.warn("Error parsing cached journal:", err);
      }
    }

    // Then fetch from Firestore in case we missed updates
    const snap = await getDoc(journalRef.current);
    if (snap.exists()) {
      const data = snap.data();
      setTitle(data.title || "Untitled Journal");
      setStatus(data.status || "Draft");
      setTags(data.tags || []);
      setUpdatedAt(data.updatedAt?.toDate() || new Date());
      if (data.content && editorInstance.current) {
        await editorInstance.current.render(data.content);
      }
    }
  }, [currentUser]);

  /** -------------------------------
   *  Initialize EditorJS
   * ------------------------------- */
  useEffect(() => {
    if (!editorInstance.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        placeholder: "Start writing your journal here...",
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Enter a heading",
              levels: [1, 2, 3],
              defaultLevel: 2,
            },
          },
          list: { class: List, inlineToolbar: true },
          checklist: { class: Checklist, inlineToolbar: true },
        },
        data: { blocks: [] },
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

  /** -------------------------------
   *  Save Journal (with Debounce)
   * ------------------------------- */
  const saveNow = useCallback(async () => {
    if (!currentUser || !editorInstance.current || !journalRef.current) return;

    try {
      const editorData = await editorInstance.current.save();
      const newHash = JSON.stringify({ editorData, title, tags, status });

      // Skip save if nothing changed
      if (newHash === lastSavedHash.current) return;

      setIsSaving(true);
      setSaveState("Saving...");

      const journalData = {
        title,
        content: editorData,
        tags,
        status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(journalRef.current, journalData, { merge: true });

      // Update caches
      lastSavedHash.current = newHash;
      localStorage.setItem("latestJournalContent", JSON.stringify(journalData));

      setIsSaving(false);
      setSaveState("All changes saved");
    } catch (error) {
      console.error("Error saving journal:", error);
      setIsSaving(false);
      setSaveState("Error saving changes");
    }
  }, [currentUser, title, tags, status]);

  /** -------------------------------
   *  Debounced Auto-Save on Change
   * ------------------------------- */
  const triggerAutoSave = useCallback(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(saveNow, 2500);
  }, [saveNow]);

  /** -------------------------------
   *  Load Journal on Mount
   * ------------------------------- */
  useEffect(() => {
    fetchJournal();
  }, [fetchJournal]);

  /** -------------------------------
   *  UI Rendering
   * ------------------------------- */
  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-gray-200 p-10 rounded-xl h-[90vh] overflow-y-auto relative">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500 text-sm">{saveState}</p>
          <button
            onClick={async () => {
              await saveNow();
              localStorage.removeItem("latestJournalId");
              localStorage.removeItem("latestJournalContent");
              window.location.href = "/journal";
            }}
            className="p-2 rounded-lg hover:bg-gray-300 transition"
            aria-label="Close and Save"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Title input */}
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            triggerAutoSave();
          }}
          placeholder="Untitled Journal"
          className="w-full text-4xl font-bold bg-transparent border-none focus:outline-none placeholder-gray-500 mb-8"
        />

        {/* Journal Metadata */}
        <div className="flex flex-wrap gap-6 mb-8">
          {/* Status */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-gray-600">Status</p>
            <div
              className="hover:bg-gray-300 rounded-md"
              onChange={triggerAutoSave}
            >
              <StatusDropdown status={status} setStatus={setStatus} />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2 flex-1 w-full">
            <p className="text-sm font-bold text-gray-600">Tags</p>
            <TagInput
              tags={tags}
              setTags={(newTags) => {
                setTags(newTags);
                triggerAutoSave();
              }}
            />
          </div>

          {/* Created At */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-gray-600">Created</p>
            <p className="text-gray-800 text-sm">
              {createdAt.toLocaleDateString()}
            </p>
          </div>

          {/* Last Edited */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-gray-600">Last Edited</p>
            <p className="text-gray-800 text-sm">
              {updatedAt.toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* EditorJS */}
        <div
          id="editorjs"
          onKeyUp={triggerAutoSave}
          className="prose prose-invert prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl max-w-none focus:outline-none"
        ></div>
      </div>
    </div>
  );
}
