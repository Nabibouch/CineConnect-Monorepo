import { describe, it, expect, vi, beforeEach } from 'vitest';
import postService from '../../services/posts.service.js';
import db from '../../db/index.js';

vi.mock('../../db/index.js', () => ({
  default: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('PostService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createPost', () => {
    it('should create a post successfully', async () => {
      const mockPost = { id: 1, title: 'Avis sur ce film' };
      (db.insert as any).mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockPost]),
        }),
      });

      const result = await postService.createPost({ title: 'Avis sur ce film' } as any);
      expect(result).toEqual(mockPost);
    });

    it('should fail if title is missing', async () => {
      await expect(postService.createPost({} as any)).rejects.toThrow('Le titre est requis');
    });
  });
});
