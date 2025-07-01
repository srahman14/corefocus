import { create } from "zustand";

const useModalStore = create((set) => ({
  isModalOpen: false,
  modalType: null, // 'habit', 'goal', 'journal', etc.

  openModal: (type) => set({ isModalOpen: true, modalType: type }),
  closeModal: () => set({ isModalOpen: false, modalType: null }),
}));

export default useModalStore;
