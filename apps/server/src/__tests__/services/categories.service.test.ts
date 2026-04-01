import { describe, it, expect, vi, beforeEach } from 'vitest';
import categoryService from '../../services/categories.service.js';
import db from '../../db/index.js';

vi.mock('../../db/index.js', () => ({
  default: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('CategoryService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createCategory', () => {
    it('should create a category successfully', async () => {
      const mockCategory = { id: 1, name: 'Action' };
      (db.insert as any).mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockCategory]),
        }),
      });

      const result = await categoryService.createCategory({ name: 'Action' });
      expect(result).toEqual(mockCategory);
    });

    it('should throw an error if name is missing', async () => {
      await expect(categoryService.createCategory({} as any)).rejects.toThrow('Le nom est requis');
    });
  });

  describe('findCategoryById', () => {
    it('should return the category', async () => {
      const mockCategory = { id: 1, name: 'Action' };
      (db.select as any).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([mockCategory]),
          }),
        }),
      });

      const result = await categoryService.findCategoryById('1');
      expect(result).toEqual(mockCategory);
    });
  });
});
