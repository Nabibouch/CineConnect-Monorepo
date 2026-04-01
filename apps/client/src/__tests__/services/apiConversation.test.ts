import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiConversation } from '../../services/apiConversation';

global.fetch = vi.fn();

describe('apiConversation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createConversation should successfully create', async () => {
    const mockRes = { id: 1 };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRes,
    });

    const result = await apiConversation.createConversation([1, 2]);

    expect(global.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userIds: [1, 2] }),
    });
    expect(result).toEqual(mockRes);
  });

  it('getUserConversations should successfully fetch', async () => {
    const mockRes = [{ id: 1 }];
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRes,
    });

    const result = await apiConversation.getUserConversations(1);

    expect(global.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/conversations/user/1`);
    expect(result).toEqual(mockRes);
  });
});
