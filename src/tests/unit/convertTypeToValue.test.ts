import { convertTypeToValue } from '../../utils/util';

describe('convertTypeToValue', () => {
  it('should return "{}" for "object" type', () => {
    expect(convertTypeToValue('object')).toBe('{}');
  });

  it('should return "[]" for "array" type', () => {
    expect(convertTypeToValue('array')).toBe('[]');
  });

  it('should return "false" for "boolean" type', () => {
    expect(convertTypeToValue('boolean')).toBe('false');
  });

  it('should return "0" for "number" type', () => {
    expect(convertTypeToValue('number')).toBe('0');
  });

  it('should return "" (empty string) for "string" type', () => {
    expect(convertTypeToValue('string')).toBe('');
  });

  it('should return "" (empty string) for unknown types', () => {
    expect(convertTypeToValue('unknown')).toBe('');
  });

  it('should return "" (empty string) for an empty string input', () => {
    expect(convertTypeToValue('')).toBe('');
  });
});
