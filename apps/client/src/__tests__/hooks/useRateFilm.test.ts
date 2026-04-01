import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as reactQuery from '@tanstack/react-query';
import { useRateFilm } from '../../hook/useRateFilm';

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn().mockReturnValue({ invalidateQueries: vi.fn() }),
}));

describe('useRateFilm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should construct a mutation correctly via useMutation', () => {
    useRateFilm();
    expect(reactQuery.useMutation).toHaveBeenCalled();
  });
});
