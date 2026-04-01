import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useChat } from '../../hook/useChat';

describe('useChat Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('verify function exists', () => {
    expect(typeof useChat).toBe('function');
  });
});
