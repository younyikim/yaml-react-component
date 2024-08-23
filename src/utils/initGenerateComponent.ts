import { Command } from 'commander';
import chalk from 'chalk';

// Utils
import { yamlParser } from './yamlParser';
import { generateComponentGroup } from './generateComponentGroup';
import { generateTypeDefinitionFile } from './generateTypeDefinitionFile';
import { checkYamlValidation } from './checkYamlValidation';

/**
 * CLI 명령을 초기화하고 YAML 파일을 기반으로 React 컴포넌트와 TypeScript 타입 정의 파일을 생성하는 함수.
 *
 * @param program - `commander` 라이브러리에서 제공하는 `Command` 인스턴스
 *
 * @throws {Error} - 파일 경로가 잘못되었거나 YAML 파일의 파싱 또는 컴포넌트/타입 생성 과정에서 오류가 발생할 경우 오류를 던집니다.
 */

export function initGenerateComponent(program: Command) {
  program
    .version('1.0.0')
    .description('CLI tool for generating React components from YAML')
    .option(
      '-f, --file <path>',
      'YAML file path',
      './src/config/sample-config.yaml'
    )
    .option('-d, --outDir <path>', 'Output directory', './src/components')
    .option(
      '-t, --types <path>',
      'Path to generate component TypeScript types',
      './src/components/types'
    )
    .action(async (options, cmd: Command) => {
      const { file, outDir, types } = options;

      try {
        const parsedYaml = yamlParser(file);

        checkYamlValidation(parsedYaml);

        // YAML 파일을 바탕으로 TypeScript 타입을 저장할 디렉토리와 파일을 생성
        generateTypeDefinitionFile(parsedYaml, outDir, types);

        // YAML 파일을 바탕으로 컴포넌트를 생성
        generateComponentGroup(parsedYaml, cmd);

        console.log(chalk.green('Components generated successfully.'));
      } catch (error) {
        console.error(chalk.red(error));
        process.exit(1);
      }
    });
}
