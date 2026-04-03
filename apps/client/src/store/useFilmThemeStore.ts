import { create } from "zustand";

type FilmThemeState = {
  selectedThemes: string[];
  selectTheme: (theme: string) => void;
  clearTheme: () => void;
};

export const useFilmThemeStore = create<FilmThemeState>((set) => ({
  selectedThemes: [],
  selectTheme: (theme) =>
    set((state) => ({
      selectedThemes: state.selectedThemes.includes(theme)
        ? state.selectedThemes.filter((t) => t !== theme)
        : [...state.selectedThemes, theme],
    })),
  clearTheme: () => set({ selectedThemes: [] }),
}));
