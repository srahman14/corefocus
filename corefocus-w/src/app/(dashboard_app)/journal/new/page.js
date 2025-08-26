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


export default function JournalEditor({ journalId }) {
  const editorInstance = useRef(null);
  const journalRef = useRef(null);
  const [title, setTitle] = useState("Untitled Journal");
  const [status, setStatus] = useState("Draft");
  const [tags, setTags] = useState([]);
  const [createdAt, setCreatedAt] = useState(new Date());
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState("All changes saved");
  const saveTimeout = useRef(null);
  const lastSavedHash = useRef(null);

  const { currentUser } = useAuth();

  /** -------------------------------
   *  Initialize Journal Ref
   * ------------------------------- */
  useEffect(() => {
    if (!currentUser) return;

    if (journalId) {
      // Editing an existing journal
      journalRef.current = doc(
        db,
        "users",
        currentUser.uid,
        "journals",
        journalId
      );
    } else {
      // Creating a new journal
      const cachedJournalId = localStorage.getItem("latestJournalId");
      if (cachedJournalId) {
        journalRef.current = doc(
          db,
          "users",
          currentUser.uid,
          "journals",
          cachedJournalId
        );
      } else {
        journalRef.current = doc(
          collection(db, "users", currentUser.uid, "journals")
        );
        localStorage.setItem("latestJournalId", journalRef.current.id);
      }
    }
  }, [currentUser, journalId]);

  /** -------------------------------
   *  Fetch Journal Data
   * ------------------------------- */
  const fetchJournal = useCallback(async () => {
    if (!currentUser || !journalRef.current) return;

    const snap = await getDoc(journalRef.current);
    if (snap.exists()) {
      const data = snap.data();
      setTitle(data.title || "Untitled Journal");
      setStatus(data.status || "Draft");
      setTags(data.tags || []);
      setCreatedAt(data.createdAt?.toDate() || new Date());
      setUpdatedAt(data.updatedAt?.toDate() || new Date());

      if (data.content && editorInstance.current) {
        await editorInstance.current.render(data.content);
      }
    }
  }, [currentUser]);

  /** -------------------------------
   *  Initialize Editor.js
   * ------------------------------- */
  useEffect(() => {
    if (!editorInstance.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        placeholder: "Start writing your journal here...",
        tools: {
          header: { class: Header, inlineToolbar: true },
          list: { class: List, inlineToolbar: true },
          checklist: { class: Checklist, inlineToolbar: true },
        },
        data: { blocks: [] },
        onChange: triggerAutoSave, // Link autosave directly
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
   *  Save Journal (Create/Update)
   * ------------------------------- */
  const saveNow = useCallback(async () => {
    if (!currentUser || !editorInstance.current || !journalRef.current) return;

    try {
      const editorData = await editorInstance.current.save();
      const newHash = JSON.stringify({ editorData, title, tags, status });
      if (newHash === lastSavedHash.current) return;

      setIsSaving(true);
      setSaveState("Saving...");

      const journalData = {
        title,
        content: editorData,
        tags,
        status,
        createdAt: journalId ? createdAt : serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(journalRef.current, journalData, { merge: true });

      lastSavedHash.current = newHash;
      localStorage.setItem("latestJournalContent", JSON.stringify(journalData));

      setIsSaving(false);
      setSaveState("All changes saved");
    } catch (error) {
      console.error("Error saving journal:", error);
      setIsSaving(false);
      setSaveState("Error saving changes");
    }
  }, [currentUser, title, tags, status, journalId]);

  /** -------------------------------
   *  Debounced Auto-Save
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

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-gray-200 p-10 rounded-xl h-[90vh] overflow-y-auto relative">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500 text-sm">{saveState}</p>
          <button
            onClick={async () => {
              await saveNow();
              if (!journalId) {
                localStorage.removeItem("latestJournalId");
                localStorage.removeItem("latestJournalContent");
              }
              window.location.href = "/journal";
            }}
            className="p-2 rounded-lg hover:bg-gray-300 transition"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Title */}
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

        {/* Metadata */}
        <div className="flex flex-wrap gap-6 mb-8">
          <div>
            <p className="text-sm font-bold text-gray-600">Status</p>
            <div onChange={triggerAutoSave}>
              <StatusDropdown status={status} setStatus={setStatus} />
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <p className="text-sm font-bold text-gray-600">Tags</p>
            <TagInput
              tags={tags}
              setTags={(newTags) => {
                setTags(newTags);
                triggerAutoSave();
              }}
            />
          </div>

          <div>
            <p className="text-sm font-bold text-gray-600">Created</p>
            <p>{createdAt.toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-600">Last Edited</p>
            <p>{updatedAt.toLocaleDateString()}</p>
          </div>
        </div>

        <div
          id="editorjs"
          onKeyUp={triggerAutoSave}
          className="prose prose-invert max-w-none focus:outline-none"
        ></div>
      </div>
    </div>
  );
}
