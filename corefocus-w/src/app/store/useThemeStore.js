// app/store/useThemeStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () =>
        set((state) => {
          console.log("Toggling theme...");
          return { isDark: !state.isDark };
        }),
    }),
    {
      name: "theme-storage", // key in localStorage
    }
  )
);
