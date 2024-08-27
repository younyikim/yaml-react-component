import { Command } from 'commander';
import path from 'path';

// Utils
import { uncapitalizeFirstLetter } from '../utils/util';

// Typings
import { Component, ParsedYaml } from '../types/utils';

/**
 * 템플릿에 컴포넌트에 필요한 import 문을 생성합니다.
 *
 * 주어진 컴포넌트의 `props`, `state`, `subscriptions`, 및 `publications` 속성에 따라 React와 관련된 import 문을 생성하고,
 * 타입 정의를 위한 import 문을 추가합니다. 또한, 컴포넌트 스타일이 필요한 경우 스타일 시트 import 문도 추가합니다.
 * `subscriptions` 또는 `publications` 속성이 존재하는 경우, `eventBus`를 import합니다.
 *
 * @param componentName - 컴포넌트의 이름입니다. 이 이름을 기반으로 props 및 state의 타입을 정의합니다.
 * @param component - 컴포넌트의 속성, 상태, 구독 및 발행 정보를 포함하는 컴포넌트 객체입니다.
 * @param config - YAML 구성 파일을 파싱하여 얻은 구성 객체입니다. 이 객체에서 스타일 정보를 가져옵니다.
 * @param cmd - 명령어를 처리하는 `commander` 명령어 객체입니다. 여기에서 타입 정의 파일 경로를 가져옵니다.
 * @returns 컴포넌트에서 사용할 import 문을 포함하는 문자열을 반환합니다. 필요한 import 문만 포함됩니다.
 */
export function generateImportState(
  componentName: string,
  component: Component,
  config: ParsedYaml,
  cmd: Command
): string {
  const { props, state, subscriptions, publications, children } = component;
  const { components, styles } = config;
  const { types: typePath, outDir } = cmd.opts();

  // 컴포넌트 디렉토리 절대 경로
  const absoluteComponentDir = path.resolve(outDir, componentName);

  // 현재 컴포넌트 위치에서 import할 컴포넌트의 상대 경로를 계산
  let relativeDirPath = path.relative(absoluteComponentDir, outDir);

  // 상대 경로에서 현재 디렉토리를 가리키는 '.'을 제거
  if (!relativeDirPath.startsWith('.')) {
    relativeDirPath = `./${relativeDirPath}`;
  }

  const reactImportState: string[] = [];
  const childImportState: string[] = [];
  const dynamicImportState: string[] = [];

  // state가 존재하는 경우
  if (state) {
    reactImportState.push('useState');
  }

  // subscriptions 또는 publications이 존재하는 경우
  if (subscriptions || publications) {
    reactImportState.push('useEffect');
  }

  if (children) {
    children.forEach((child) => {
      if (components[child]?.lazyLoad) {
        // lazy load 컴포넌트 import
        childImportState.push(
          `const ${child} = lazy(() => import('${relativeDirPath}/${uncapitalizeFirstLetter(child)}'));`
        );

        // lazy load 컴포넌트를 사용하는 경우,lazy, Suspense를 import한다.
        if (
          !reactImportState.includes('lazy') &&
          !reactImportState.includes('Suspense')
        ) {
          reactImportState.push('lazy');
          reactImportState.push('Suspense');
        }
      } else {
        // 일반 import
        childImportState.push(
          `import ${child} from '${relativeDirPath}/${uncapitalizeFirstLetter(child)}';`
        );
      }
    });
  }

  const reactStatement =
    reactImportState.length > 0
      ? `import { ${reactImportState.join(', ')} } from 'react';`
      : `import React from 'react';`;

  const eventBusStatement =
    subscriptions || publications
      ? `import { eventBus } from 'yaml-react-component';`
      : '';

  const styleStatement =
    styles && styles[componentName] ? `import './style.css';` : '';

  const childrenStatement =
    childImportState.length > 0 ? childImportState.join('\n') : '';

  const dynamicStatement =
    dynamicImportState.length > 0 ? dynamicImportState.join('\n') : '';

  // 모든 import 문을 조합하여 최종 import 문 문자열 생성
  const importStatement = [
    reactStatement,
    eventBusStatement,
    childrenStatement,
    styleStatement,
    dynamicStatement,
  ]
    .filter((statement) => statement !== '') // 빈 문자열 필터링
    .join('\n');

  return importStatement;
}
