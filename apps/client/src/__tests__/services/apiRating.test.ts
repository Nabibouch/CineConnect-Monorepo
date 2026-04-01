import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiRatings } from '../../services/apiRating';

global.fetch = vi.fn();

describe('apiRatings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully create a rating', async () => {
    const mockRating = { id: 1, rate: 5 };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRating,
    });

    const payload = { rate: 5 };
    const result = await apiRatings.createRating(payload as any);

    expect(global.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/ratings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    expect(result).toEqual(mockRating);
  });
});
