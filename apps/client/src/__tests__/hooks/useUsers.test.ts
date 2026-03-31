import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as reactQuery from '@tanstack/react-query';
import { useUsers } from '../../hook/useUsers';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

describe('useUsers Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('useUsers devrais appeler query pour la liste des utilisateurs', () => {
    useUsers();
    expect(reactQuery.useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
            queryKey: ['users'],
            typeof queryFn: 'function'
        })
    );
  });
});
