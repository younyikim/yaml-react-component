// Utils
import { generateDynamicState } from './generateDynamicState';

// Typings
import { Component, ParsedYaml } from '../types/utils';

/**
 * 컴포넌트와 구성 파일을 기반으로 자식 컴포넌트의 상태를 생성합니다.
 *
 * @param component - 자식 컴포넌트를 포함하는 상위 컴포넌트의 정의입니다.
 * @param config - YAML 파일을 파싱한 후 생성된 구성 객체입니다.
 * @returns 자식 컴포넌트의 상태를 포함하는 문자열을 반환합니다. Lazy Load가 필요한 경우
 *          동적 상태 생성 함수를 호출하며, 그렇지 않은 경우 일반 JSX 형태로 반환됩니다.
 */
export function generateChildState(
  component: Component,
  config: ParsedYaml
): string {
  const { components } = config;
  const { children } = component;

  let childStatement = '';

  if (children && children.length) {
    childStatement = children
      .map((child) => {
        // 자식 컴포넌트가 동적으로 로드돼야 하는 경우, 동적 상태 생성 함수 호출
        if (components[child]?.lazyLoad) {
          return generateDynamicState(child);
        } else {
          return `      <${child} />`;
        }
      })
      .join('\n');
  }

  return childStatement;
}
