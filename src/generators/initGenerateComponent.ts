import { Command } from 'commander';

// Utils
import { yamlParser } from '../utils/yamlParser';
import { generateComponentGroup } from './generateComponentGroup';
import { checkYamlValidation } from '../utils/checkYamlValidation';

/**
 * CLI 명령을 초기화하고 YAML 파일을 기반으로 React 컴포넌트와 TypeScript 타입 정의 파일을 생성하는 함수.
 *
 * @param program - `commander` 라이브러리에서 제공하는 `Command` 인스턴스
 *
 * @throws {Error} - 파일 경로가 잘못되었거나 YAML 파일의 파싱 또는 컴포넌트/타입 생성 과정에서 오류가 발생할 경우 오류를 던집니다.
 */

export function initGenerateComponent(options: any, cmd: Command) {
  const { file } = options;

  const parsedYaml = yamlParser(file);

  // YAML 파일 유효성 검사
  checkYamlValidation(parsedYaml);

  // YAML 파일을 바탕으로 컴포넌트를 생성
  generateComponentGroup(parsedYaml, cmd);
}
