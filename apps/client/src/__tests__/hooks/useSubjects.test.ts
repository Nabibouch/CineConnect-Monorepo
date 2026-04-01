import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as reactQuery from '@tanstack/react-query';
import { useSubjects, useCreateSubject } from '../../hook/useSubjects';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  useQueryClient: vi.fn().mockReturnValue({ invalidateQueries: vi.fn() }),
}));

describe('useSubjects Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('useSubjects should call useQuery', () => {
    useSubjects();
    expect(reactQuery.useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
            queryKey: ['subjects'],
        })
    );
  });

  it('useCreateSubject should call useMutation', () => {
    useCreateSubject();
    expect(reactQuery.useMutation).toHaveBeenCalled();
  });
});
