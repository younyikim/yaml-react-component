import { Command } from 'commander';
import chalk from 'chalk';

// Utils
import { generateComponent } from './generateComponent';
import { topologicalSort } from '../utils/topologicalSort';

// Typings
import { ParsedYaml } from '../types/utils';

/**
 * YAML에 정의된 모든 컴포넌트를 생성하는 함수
 *
 * 이 함수는 주어진 YAML 구성 객체에서 컴포넌트 목록을 가져와 각각의 컴포넌트를 생성합니다.
 *
 * @param config - JSON 형식으로 파싱된 YAML 객체로, 생성할 컴포넌트들의 설정을 포함합니다.
 * @param cmd - `commander` 라이브러리에서 제공하는 `Command` 인스턴스로, CLI 명령과 관련된 옵션 및 메타데이터를 포함합니다.
 */

export function generateComponentGroup(config: ParsedYaml, cmd: Command) {
  const sortedComponentNames = topologicalSort(config);

  sortedComponentNames.forEach((name) => {
    if (name) {
      generateComponent(name, config, cmd);
    } else {
      throw new Error(
        chalk.red(
          'Error: Missing component name in the components section of the YAML file.'
        )
      );
    }
  });
}
