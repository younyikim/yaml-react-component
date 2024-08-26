import { Command } from 'commander';
import chalk from 'chalk';
import fsExtra from 'fs-extra';

// Utils
import { generateTemplate } from './generateTemplate';
import { topologicalSort } from './topologicalSort';

// Typings
import { ParsedYaml } from '../types/utils';

/**
 * @function generateComponent
 * @description 주어진 컴포넌트 이름과 구성 파일을 기반으로 React 컴포넌트와 스타일 파일을 생성합니다.
 *
 * @param {string} componentName - 생성할 컴포넌트의 이름입니다.
 * @param {ParsedYaml} config - YAML 파일을 파싱한 결과로 얻어진 구성 객체입니다.
 * @param {Command} cmd - 커맨드라인 명령어를 처리하는 Commander.js의 Command 객체입니다.
 *
 * @throws {Error} 파일 생성 중에 발생한 예외를 처리하며, 오류 메시지를 출력하고 프로세스를 종료합니다.
 */
export function generateComponent(
  componentName: string,
  config: ParsedYaml,
  cmd: Command
) {
  const { existsSync, outputFileSync } = fsExtra;

  const renderingOrder = topologicalSort(config);

  const {
    componentDirPath,
    componentFilePath,
    componentStylePath,
    template,
    componentStyle,
  } = generateTemplate(componentName, config, cmd, renderingOrder);

  // 컴포넌트 파일 경로에 이미 동일한 파일이 존재하는 경우
  if (existsSync(componentFilePath)) {
    console.error(
      chalk.red(`File already exists in this path "${componentFilePath}".`)
    );
    process.exit(1);
  }

  // 컴포넌트 스타일 파일 경로에 이미 동일한 파일이 존재하는 경우
  if (existsSync(componentStylePath) && componentStyle !== '') {
    console.error(
      chalk.red(`File already exists in this path "${componentStylePath}".`)
    );
    process.exit(1);
  }

  try {
    // 컴포넌트 파일 생성
    outputFileSync(componentFilePath, template);

    // 컴포넌트 스타일이 존재하는 경우, 스타일 파일 생성
    if (componentStyle !== '') {
      outputFileSync(componentStylePath, componentStyle);
    }

    console.log(
      chalk.green(
        `'${componentName}'component was successfully created at ${chalk.cyan(componentDirPath)}`
      )
    );
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
}
