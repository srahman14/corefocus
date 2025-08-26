// app/store/useJournalStore.js
import { create } from "zustand";

export const useJournalStore = create((set) => ({
  selectedJournal: null,
  setSelectedJournal: (journal) => set({ selectedJournal: journal }),
  clearSelectedJournal: () => set({ selectedJournal: null }),
}));
