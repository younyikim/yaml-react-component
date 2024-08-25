// Utils
import { capitalizeFirstLetter, transformedState } from './util';

// Typings
import { Component } from '../types/utils';

/**
 * 템플릿에 컴포넌트의 상태를 위한 `useState` 훅 코드를 생성합니다.
 *
 * 주어진 컴포넌트의 `state` 속성에 따라 `useState` 훅을 사용하여 상태 변수와 설정 함수를 선언하는 코드 문자열을 생성합니다.
 * 상태 변수는 `componentName`과 `state` 속성에 정의된 이름을 기반으로 타입을 지정합니다.
 * `transformedState` 함수를 사용하여 상태 변수의 초기값을 설정하며, 상태 변수 선언은 첫 번째와 이후 변수에 대해 포맷팅됩니다.
 *
 * @param componentName - 컴포넌트의 이름입니다. 상태 변수의 타입을 정의하는 데 사용됩니다.
 * @param component - 상태를 포함하는 컴포넌트 객체입니다. `state` 속성을 통해 상태 정보를 가져옵니다.
 * @returns 컴포넌트 상태를 위한 `useState` 훅 코드를 포함하는 문자열을 반환합니다.
 */
export function generateState(
  componentName: string,
  component: Component
): string {
  const { state } = component;

  const stateStatement = transformedState(state)
    .map((state, index) =>
      index === 0
        ? `const [${state.name}, set${capitalizeFirstLetter(state.name)}] = useState<${componentName}${capitalizeFirstLetter(state.name)}State>(${state.value});`
        : // 두 번째 요소 이후의 경우, 줄바꿈과 공백을 추가하여 변수 선언을 포맷팅합니다.
          `\n  const [${state.name}, set${capitalizeFirstLetter(state.name)}] = useState<${componentName}${capitalizeFirstLetter(state.name)}State>(${state.value});`
    )
    .join('');

  return stateStatement;
}
