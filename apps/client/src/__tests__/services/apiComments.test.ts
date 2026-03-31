import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiComments } from '../../services/apiComments';

global.fetch = vi.fn();

describe('apiComments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully create a comment', async () => {
    const mockComment = { id: 1, content: 'Test comment' };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockComment,
    });

    const payload = { content: 'Test comment' };
    const result = await apiComments.createComment(payload as any);

    expect(global.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    expect(result).toEqual(mockComment);
  });

  it('should throw an error on failure', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: false });
    await expect(apiComments.createComment({} as any)).rejects.toThrow('Erreur lors de l\'envoi du commentaire');
  });
});
