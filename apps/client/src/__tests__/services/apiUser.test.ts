import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiUser } from '../../services/apiUser';

// Mock the global fetch
global.fetch = vi.fn();

describe('apiUser Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
// Vite injects environment variables correctly. We can just use the injected one.
    // vi.stubGlobal('import', ... ) is not needed and doesn't override statically replaced env vars.
  });

  describe('getUserById', () => {
    it('should successfully fetch user by id', async () => {
      const mockUserData = { id: 1, username: 'testuser' };
      
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: mockUserData }),
      });

      const result = await apiUser.getUserById('1');

      const expectedUrl = `${import.meta.env.VITE_API_URL}/users/1`;
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        credentials: 'include',
      });
      expect(result).toEqual(mockUserData);
    });

    it('should throw an error with the API error message', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Utilisateur non trouvé' }),
      });

      await expect(apiUser.getUserById('99')).rejects.toThrow('Utilisateur non trouvé');
    });

    it('should throw a default error if API fails without a specific error message', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        json: async () => ({}), // No error property
      });

      await expect(apiUser.getUserById('99')).rejects.toThrow(
        "Erreur lors de la récupération de l'utilisateur (99)"
      );
    });
  });

  describe('getMe', () => {
    it('should successfully fetch the current user', async () => {
      const mockMeData = { id: 1, email: 'user@example.com' };
      
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: mockMeData }),
      });

      const result = await apiUser.getMe();

      const expectedUrl = `${import.meta.env.VITE_API_URL}/users/me`;
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        credentials: 'include',
      });
      expect(result).toEqual(mockMeData);
    });

    it('should throw an error when fetch fails', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Non authentifié' }),
      });

      await expect(apiUser.getMe()).rejects.toThrow('Non authentifié');
    });
  });
});
