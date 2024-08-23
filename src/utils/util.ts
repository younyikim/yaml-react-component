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
