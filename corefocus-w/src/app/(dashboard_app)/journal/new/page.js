"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";

export default function JournalEditor() {
  const editorInstance = useRef(null);
  const [title, setTitle] = useState("");

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
        

        {/* EditorJS */}
        <div
          id="editorjs"
          className="prose prose-invert prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl max-w-none focus:outline-none"
        ></div>
      </div>
    </div>
  );
}
