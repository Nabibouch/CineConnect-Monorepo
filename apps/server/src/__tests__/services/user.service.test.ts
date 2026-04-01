import { describe, it, expect, vi, beforeEach } from 'vitest';
import userService from '../../services/user.service.js';
import db from '../../db/index.js';
import argon2 from 'argon2';

// 1. Mock DB functions
vi.mock('../../db/index.js', () => ({
  default: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

// 2. Mock argon2
vi.mock('argon2', () => ({
  default: {
    hash: vi.fn(),
    verify: vi.fn(),
  },
}));

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createUser', () => {
    it('should throw an error if the email is already in use', async () => {
      // Setup the mock to return an array with an existing user (simulate email exists)
      const mockSelect = vi.fn().mockReturnThis();
      const mockFrom = vi.fn().mockReturnThis();
      const mockWhere = vi.fn().mockReturnThis();
      const mockLimit = vi.fn().mockResolvedValue([{ email: 'test@test.com' }]);

      db.select = mockSelect;
      mockSelect.prototype.from = mockFrom;

      // Simplification of mock chaining for Drizzle
      (db.select as any).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([{ email: 'test@test.com' }]),
          }),
        }),
      });

      const userInput = {
        username: 'testu',
        email: 'test@test.com',
        password: 'password123',
      };

      await expect(userService.createUser(userInput)).rejects.toThrow(
        'Email déjà utilisé par un autre utilisateur'
      );
    });

    it('should successfully create a new user and hash the password', async () => {
       // Mock the email check: return empty array (email not used)
       (db.select as any).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([]), // No existing user
          }),
        }),
      });

      // Mock argon2 hashing
      (argon2.hash as ReturnType<typeof vi.fn>).mockResolvedValue('hashed_password');

      // Mock insert chain
      const expectedUser = {
        id: 1,
        username: 'newuser',
        email: 'new@test.com',
        password: 'hashed_password',
      };

      (db.insert as any).mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([expectedUser]),
        }),
      });

      const userInput = {
        username: 'newuser',
        email: 'new@test.com',
        password: 'password123',
      };

      const result = await userService.createUser(userInput);

      expect(argon2.hash).toHaveBeenCalledWith('password123', expect.any(Object));
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findUserById', () => {
     it('should return the user without the password if found', async () => {
         const mockUser = {
             id: 1,
             username: 'testuser'
         };

         (db.select as any).mockReturnValue({
            from: vi.fn().mockReturnValue({
              where: vi.fn().mockResolvedValue([mockUser]),
            }),
         });

         const result = await userService.findUserById('1');
         expect(result).toEqual(mockUser);
     });

     it('should throw an error if the ID is invalid (NaN)', async () => {
         await expect(userService.findUserById('invalid_id')).rejects.toThrow("L'id est incorrect");
     });
  });
});
