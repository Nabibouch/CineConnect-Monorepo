import { describe, it, expect } from 'vitest';
import { normalizeId } from '../../utils/normalizeId.js';

describe('normalizeId Utility', () => {
  it('should successfully convert a valid string ID into a number', () => {
    const result = normalizeId('123');
    expect(result).toBe(123);
    expect(typeof result).toBe('number');
  });

  it('should throw the default error message if the ID is not a valid number', () => {
    expect(() => normalizeId('abc')).toThrow("L'id n'est pas valide");
  });

  it('should throw a custom error message if provided, when ID is invalid', () => {
    expect(() => normalizeId('xyz', "ID utilisateur incorrect")).toThrow('ID utilisateur incorrect');
  });

  it('should correctly handle numeric strings with spaces', () => {
    const result = normalizeId(' 42 ');
    expect(result).toBe(42);
  });
});
