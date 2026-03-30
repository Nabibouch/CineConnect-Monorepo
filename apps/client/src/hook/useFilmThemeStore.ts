import { create } from "zustand";

type FilmThemeState = {
  selectedTheme: string | null;
  selectTheme: (theme: string) => void;
  clearTheme: () => void;
};

export const useFilmThemeStore = create<FilmThemeState>((set) => ({
  selectedTheme: null,
  selectTheme: (theme) =>
    set((state) => ({
      selectedTheme: state.selectedTheme === theme ? null : theme,
    })),
  clearTheme: () => set({ selectedTheme: null }),
}));

