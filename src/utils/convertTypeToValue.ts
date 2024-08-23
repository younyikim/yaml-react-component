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
