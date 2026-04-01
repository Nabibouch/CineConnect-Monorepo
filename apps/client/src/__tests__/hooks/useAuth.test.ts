import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as useAuthHook from '../../hook/useAuth';

// Mock du fetch global
global.fetch = vi.fn();

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('import', {
      meta: {
        env: { VITE_API_URL: 'http://localhost:3000' }
      }
    });
  });

  it('useAuth Hook doit être exporté et fonctionner comme une fonction', () => {
    expect(typeof useAuthHook.useAuth).toBe('function');
  });

});
