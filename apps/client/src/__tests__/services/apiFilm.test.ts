import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiFilm } from '../../services/apiFilm';

global.fetch = vi.fn();

describe('apiFilm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAllFilms should successfully return films', async () => {
    const mockFilms = [{ id: 1, title: 'Film 1' }];
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockFilms,
    });

    const result = await apiFilm.getAllFilms();

    expect(global.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/films`);
    expect(result).toEqual(mockFilms);
  });

  it('getFilmById should return a film', async () => {
    const mockFilm = { id: 1, title: 'Film 1' };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockFilm,
    });

    const result = await apiFilm.getFilmById('1');

    expect(global.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/films/1`);
    expect(result).toEqual(mockFilm);
  });
});
