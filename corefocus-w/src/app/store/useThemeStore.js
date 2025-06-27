// app/store/useThemeStore.js
import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  isDark: false,
  toggleTheme: () =>
    set((state) => {
      console.log('Toggling theme...'); // <-- this should show in console
      return { isDark: !state.isDark };
    }),
}));
