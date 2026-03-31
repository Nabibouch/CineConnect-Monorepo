import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiSubjects } from '../../services/apiSubjects';

global.fetch = vi.fn();

describe('apiSubjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get all subjects', async () => {
    const mockSubjects = [{ id: 1, title: 'Subject 1' }];
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSubjects,
    });

    const result = await apiSubjects.getAllSubjects();
    expect(global.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/posts`);
    expect(result).toEqual(mockSubjects);
  });

  it('should get subject by id', async () => {
    const mockSubject = { id: 1, title: 'Subject 1' };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSubject,
    });

    const result = await apiSubjects.getSubjectById('1');
    expect(global.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/posts/1`);
    expect(result).toEqual(mockSubject);
  });
  
  it('should create a subject', async () => {
    const mockSubject = { id: 1, title: 'Subject 1' };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSubject,
    });

    const payload = { title: 'Subject 1' };
    const result = await apiSubjects.createSubject(payload as any);

    expect(global.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    expect(result).toEqual(mockSubject);
  });
});
