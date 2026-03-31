import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as reactQuery from '@tanstack/react-query';
import { useFilms, useOneFilm } from '../../hook/useFilms';
import { apiFilm } from '../../services/apiFilm';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('../../services/apiFilm', () => ({
  apiFilm: {
    getAllFilms: vi.fn(),
    getFilmById: vi.fn(),
  },
}));

// Mock react to mock useMemo
vi.mock('react', async () => {
  const actual = await importOriginal('react');
  return {
    ...actual,
    useMemo: (fn: any) => fn(),
  };
});

describe('useFilms Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useFilms', () => {
    it('should call useQuery with correct keys and fn', () => {
      useFilms();

      expect(reactQuery.useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ['films'],
          typeof queryFn: 'function',
          staleTime: 600000,
        })
      );
    });
  });

  describe('useOneFilm', () => {
    it('should call useQuery for single film', () => {
      useOneFilm('1');

      expect(reactQuery.useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ['film', '1'],
          staleTime: 600000,
        })
      );
    });
  });
});
