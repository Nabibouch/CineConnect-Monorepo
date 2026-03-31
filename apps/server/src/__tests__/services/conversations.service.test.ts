import { describe, it, expect, vi, beforeEach } from 'vitest';
import conversationService from '../../services/conversations.service.js';
import db from '../../db/index.js';

vi.mock('../../db/index.js', () => ({
  default: {
    select: vi.fn(),
    insert: vi.fn(),
  },
}));

describe('ConversationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createConversation should successfully create a conversation and members', async () => {
    const mockConversation = { id: 1 };
    
    // Setup nested mocks for insert
    const insertMock = vi.fn();
    (db.insert as any) = insertMock;
    
    // first insert returns conversation
    insertMock.mockReturnValueOnce({
      values: vi.fn().mockReturnValue({ returning: vi.fn().mockResolvedValue([mockConversation]) })
    });
    // second insert returns nothing important
    insertMock.mockReturnValueOnce({
      values: vi.fn().mockResolvedValue([])
    });

    const result = await conversationService.createConversation([1, 2]);
    expect(result).toEqual(mockConversation);
  });

  it('createConversation should fail if less than 2 members', async () => {
    await expect(conversationService.createConversation([1])).rejects.toThrow('Une conversation nécessite au moins 2 membres');
  });
});
