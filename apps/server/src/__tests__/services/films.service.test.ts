import { describe, it, expect, vi, beforeEach } from 'vitest';
import filmService from '../../services/films.service.js';
import db from '../../db/index.js';
import * as normalizeFilmInput from '../../utils/normalizeFilmInput.js';

vi.mock('../../db/index.js', () => ({
  default: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('../../utils/normalizeFilmInput.js', () => ({
  normalizeFilmInput: vi.fn((data) => data),
}));

describe('FilmService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createFilm', () => {
    it('should fail if fields are missing', async () => {
      await expect(filmService.createFilm({ title: 'Titanic' } as any)).rejects.toThrow('Tout les champs doivent être remplis');
    });

    it('should create film successfully', async () => {
      const mockFilm = { id: 1, title: 'Titanic', description: 'desc' };
      (db.insert as any).mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockFilm]),
        }),
      });

      const result = await filmService.createFilm({ title: 'Titanic', description: 'desc' } as any);
      expect(result).toEqual(mockFilm);
    });
  });

  describe('findFilmById', () => {
    it('should find a film by id and attach relations', async () => {
      const mockFilm = { id: 1, title: 'Titanic' };
      
      const selectMock = vi.fn()
        // film query
        .mockReturnValueOnce({ from: vi.fn().mockReturnValue({ where: vi.fn().mockReturnValue({ limit: vi.fn().mockResolvedValue([mockFilm]) }) }) })
        // posts query
        .mockReturnValueOnce({ from: vi.fn().mockReturnValue({ where: vi.fn().mockResolvedValue([]) }) })
        // comments query
        .mockReturnValueOnce({ from: vi.fn().mockReturnValue({ where: vi.fn().mockResolvedValue([]) }) })
        // ratings query
        .mockReturnValueOnce({ from: vi.fn().mockReturnValue({ where: vi.fn().mockResolvedValue([]) }) });
        
      (db.select as any) = selectMock;

      const result = await filmService.findFilmById('1');
      expect(result.id).toBe(1);
      expect(result.posts).toEqual([]);
      expect(result.comments).toEqual([]);
      expect(result.ratings).toEqual([]);
    });
  });
});
