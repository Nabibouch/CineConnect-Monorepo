import { describe, it, expect, vi, beforeEach } from 'vitest';
import commentService from '../../services/comments.service.js';
import db from '../../db/index.js';

vi.mock('../../db/index.js', () => ({
  default: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('CommentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createComment', () => {
    it('should create a comment successfully', async () => {
      const mockComment = { id: 1, title: 'Super', user_id: 1 };
      (db.insert as any).mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockComment]),
        }),
      });

      const result = await commentService.createComment({ title: 'Super', user_id: 1 } as any);
      expect(result).toEqual(mockComment);
    });

    it('should throw error if missing fields', async () => {
      await expect(commentService.createComment({ title: 'Super' } as any)).rejects.toThrow('title et user_id sont requis');
    });
  });
});
