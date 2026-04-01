import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as reactQuery from '@tanstack/react-query';
import { useSendComs } from '../../hook/useSendComs';

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn().mockReturnValue({ invalidateQueries: vi.fn() }),
}));

describe('useSendComs Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call useMutation to setup comment posting', () => {
    useSendComs();
    expect(reactQuery.useMutation).toHaveBeenCalled();
    expect(reactQuery.useQueryClient).toHaveBeenCalled();
  });
});
