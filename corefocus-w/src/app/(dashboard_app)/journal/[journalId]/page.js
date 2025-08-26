"use client";
import { use } from "react";
import JournalEditor from "../new/page";

export default function JournalDetailPage({ params }) {
  const { journalId } = use(params);

  return <JournalEditor journalId={journalId} />;
}
