/**
 * 주어진 컴포넌트 이름을 기반으로 동적 상태를 생성합니다.
 *
 * @param componentName - 동적 상태를 생성할 컴포넌트의 이름입니다.
 * @returns 해당 컴포넌트를 `Suspense`로 감싸고, 로딩 중일 때 표시할 내용을 포함하는 JSX 문자열을 반환합니다.
 */
export function generateDynamicState(componentName: string): string {
  let dynamicStatement = '';

  dynamicStatement += `      <Suspense fallback={<div>Loading ${componentName}...</div>}>\n`;
  dynamicStatement += `         <${componentName} />\n`;
  dynamicStatement += `      </Suspense>`;

  return dynamicStatement;
}
