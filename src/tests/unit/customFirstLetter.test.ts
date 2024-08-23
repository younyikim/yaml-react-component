import {
  capitalizeFirstLetter,
  uncapitalizeFirstLetter,
} from '../../utils/util';

describe('String Transformation Functions', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
      expect(capitalizeFirstLetter('world')).toBe('World');
    });

    it('should return the same string if the first letter is already capitalized', () => {
      expect(capitalizeFirstLetter('Hello')).toBe('Hello');
    });

    it('should return the same string if the input is a single character', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
      expect(capitalizeFirstLetter('A')).toBe('A');
    });

    it('should handle empty strings', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });
  });

  describe('uncapitalizeFirstLetter', () => {
    it('should uncapitalize the first letter of a string', () => {
      expect(uncapitalizeFirstLetter('Hello')).toBe('hello');
      expect(uncapitalizeFirstLetter('World')).toBe('world');
    });

    it('should return the same string if the first letter is already lowercase', () => {
      expect(uncapitalizeFirstLetter('hello')).toBe('hello');
    });

    it('should return the same string if the input is a single character', () => {
      expect(uncapitalizeFirstLetter('a')).toBe('a');
      expect(uncapitalizeFirstLetter('A')).toBe('a');
    });

    it('should handle empty strings', () => {
      expect(uncapitalizeFirstLetter('')).toBe('');
    });
  });
});
