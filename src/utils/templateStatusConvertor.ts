import { Command } from 'commander';

// Utils
import { convertTypeToValue } from './convertTypeToValue';
import { capitalizeFirstLetter } from './util';

// Typings
import { Component } from '../types/utils';

/**
 * 컴포넌트의 Props, State 정보를 템플릿에 반영합니다.
 *
 * @param componentName - 컴포넌트 이름
 * @param component - 컴포넌트 정보
 * @param template - 템플릿
 * @param cmd - `commander` 라이브러리에서 제공하는 `Command` 인스턴스
 *
 * @returns 업데이트된 템플릿 문자열
 */
export function templateStatusConvertor(
  componentName: string,
  component: Component,
  template: string,
  cmd: Command
): string {
  const { props, state } = component;
  const { types: typePath } = cmd.opts();

  const targetImportTemplate = `import React, { useState } from 'react'`;
  const targetTypeTemplate = `import { templateTypes } from './typedir';`;
  const targetPropTemplate = `(props : templatenameProps)`;

  // props와 state이 모두 존재하는 경우
  if (props && state) {
    template = template.replace(
      targetTypeTemplate,
      `import { ${componentName}Props, ${extractStateTypes(componentName, state)} } from '${typePath}';`
    );
    template = template.replace(
      targetPropTemplate,
      `(props : ${componentName}Props)`
    );
  }
  // props만 존재하는 경우
  else if (props && !state) {
    template = template.replace(
      targetTypeTemplate,
      `import { ${componentName}Props } from '${typePath}';`
    );
    template = template.replace(
      targetPropTemplate,
      `(props : ${componentName}Props)`
    );
    template = template.replace(
      targetImportTemplate,
      "import React from 'react'"
    );
  }
  // state만 존재하는 경우
  else if (!props && state) {
    template = template.replace(
      targetTypeTemplate,
      `import { ${extractStateTypes(componentName, state)} } from '${typePath}';`
    );
    template = template.replace(targetPropTemplate, `()`);
  }

  // state 관련 템플릿 수정
  template = updateStateTemplate(componentName, template, state);

  return template;
}

/**
 * state 관련 내용의 템플릿을 업데이트합니다.
 *
 * @param componentName - 컴포넌트 이름입니다.
 * @param template - 현재 템플릿 문자열입니다.
 * @param state - 정의된 상태입니다.
 * @returns 업데이트된 템플릿 문자열입니다.
 */
function updateStateTemplate(
  componentName: string,
  template: string,
  state: Component['state']
): string {
  const targetStateTemplate = `const [state, setState] = useState<templateState>();`;

  const transformedState = state
    ? Object.entries(state).map(([name, value]) => ({
        name,
        value: convertTypeToValue(value),
      }))
    : null;

  return transformedState && transformedState.length > 0
    ? template.replace(
        targetStateTemplate,
        transformedState
          .map((state, index) =>
            index === 0
              ? `const [${state.name}, set${capitalizeFirstLetter(state.name)}] = useState<${componentName}${capitalizeFirstLetter(state.name)}State>(${state.value});`
              : // 두 번째 요소 이후의 경우, 줄바꿈과 공백을 추가하여 변수 선언을 포맷팅합니다.
                `\n  const [${state.name}, set${capitalizeFirstLetter(state.name)}] = useState<${componentName}${capitalizeFirstLetter(state.name)}State>(${state.value});\n`
          )
          .join('')
      )
    : template.replace(targetStateTemplate, '');
}

/**
 * state 정보를 기반으로 TypeScript 타입 문자열을 생성합니다.
 *
 * @param componentName - 컴포넌트 이름입니다.
 * @param state - 정의된 상태입니다.
 * @returns state의 TypeScript 타입 문자열들을 리턴합니다.
 */
function extractStateTypes(
  componentName: string,
  state: Component['state']
): string {
  const transformedState = state
    ? Object.entries(state).map(([name]) => name)
    : null;

  return transformedState && transformedState.length > 0
    ? transformedState
        .map((state) => `${componentName}${capitalizeFirstLetter(state)}State`)
        .join(', ')
    : '';
}
