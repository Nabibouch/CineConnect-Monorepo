import { describe, it, expect, beforeEach } from 'vitest';
import { useFilmThemeStore } from '../../store/useFilmThemeStore';

describe('useFilmThemeStore (Zustand Hook)', () => {
  // Reset the store before each test
  beforeEach(() => {
    useFilmThemeStore.getState().clearTheme();
  });

  it('should initialize with an empty selectedThemes array', () => {
    const { selectedThemes } = useFilmThemeStore.getState();
    expect(selectedThemes).toEqual([]);
  });

  it('should add a theme when selectTheme is called with a new theme', () => {
    const store = useFilmThemeStore.getState();
    store.selectTheme('Action');

    expect(useFilmThemeStore.getState().selectedThemes).toEqual(['Action']);
  });

  it('should remove a theme when selectTheme is called with an already selected theme', () => {
    const store = useFilmThemeStore.getState();

    // Add theme
    store.selectTheme('Drame');
    expect(useFilmThemeStore.getState().selectedThemes).toEqual(['Drame']);

    // Remove theme (toggle off)
    useFilmThemeStore.getState().selectTheme('Drame');
    expect(useFilmThemeStore.getState().selectedThemes).toEqual([]);
  });

  it('should handle selecting multiple themes', () => {
    const store = useFilmThemeStore.getState();
    store.selectTheme('Action');
    store.selectTheme('Sci-Fi');

    expect(useFilmThemeStore.getState().selectedThemes).toEqual(['Action', 'Sci-Fi']);
  });

  it('should clear all themes when clearTheme is called', () => {
    const store = useFilmThemeStore.getState();
    store.selectTheme('Comedy');
    store.selectTheme('Horror');

    expect(useFilmThemeStore.getState().selectedThemes.length).toBe(2);

    useFilmThemeStore.getState().clearTheme();
    expect(useFilmThemeStore.getState().selectedThemes).toEqual([]);
  });
});
