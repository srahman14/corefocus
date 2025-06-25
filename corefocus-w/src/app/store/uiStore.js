import { create } from "zustand";

const useUIStore = create((set) => ({
  sidebarCollapsed: true,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));

export default useUIStore;
