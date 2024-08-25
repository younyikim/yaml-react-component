import { Component } from '../types/utils';

/**
 * 문자열의 첫 글자를 대문자로 변환합니다.
 *
 * @param str - 변환할 문자열입니다.
 * @returns 첫 글자가 대문자로 변환된 문자열을 반환합니다.
 */
export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) return str; // 빈 문자열 처리
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 문자열의 첫 글자를 소문자로 변환합니다.
 *
 * @param str - 변환할 문자열입니다.
 * @returns 첫 글자가 소문자로 변환된 문자열을 반환합니다.
 */
export function uncapitalizeFirstLetter(str: string): string {
  if (str.length === 0) return str; // 빈 문자열 처리
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * YAML 타입 정의를 기본 값으로 변경합니다.
 *
 * @param type - YAML 타입 정의입니다.
 * @returns 해당 YAML 타입 정의에 대한 기본 값을 반환합니다.
 */
export function convertTypeToValue(type: string): string {
  switch (type) {
    case 'object':
      return '{}';
    case 'array':
      return '[]';
    case 'boolean':
      return 'false';
    case 'number':
      return '0';
    case 'string':
      return '';
    default:
      return '';
  }
}
/**
 * 주어진 상태 객체를 변환하여 TypeScript에서 사용 가능한 타입으로 변환하여 반환합니다.
 * @param state - 변환할 상태 객체입니다.
 * @returns 상태 객체를 변환하여 TypeScript에서 사용 가능한 타입으로 변환하여 반환합니다.
 */
export const transformedState = (state: Component['state']) => {
  return state
    ? Object.entries(state).map(([name, value]) => ({
        name,
        value: convertTypeToValue(value),
      }))
    : [];
};
