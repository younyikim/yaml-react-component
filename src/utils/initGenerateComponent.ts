import { Command } from 'commander';
import chalk from 'chalk';

// Utils
import { yamlParser } from './yamlParser';
import { generateComponents } from './generateComponents';
import { generateTypeDefinitionFile } from './generateTypeDefinitionFile';

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
    .action(async (options) => {
      const { file, outDir, types } = options;

      let typeOutDir = types;

      try {
        // 디렉토리 경로의 마지막에 '/'가 포함된 경우 에러 처리
        if (types.endsWith('/') || outDir.endsWith('/')) {
          console.error(
            chalk.red(
              'Error: Directory path should not end with a trailing slash. ex) path/dir/ (X) -> path/dir (O)'
            )
          );
          process.exit(1);
        }

        // 사용자가 types 옵션을 기본값 그대로 두고, outDir 옵션만 변경했을 경우, typeOutDir을 outDir에 맞춰 업데이트
        if (
          types === './src/components/types' &&
          outDir !== './src/components'
        ) {
          typeOutDir = `${outDir}/types`;
        }

        const parsedYaml = yamlParser(file);

        // YAML 파일을 바탕으로 TypeScript 타입을 저장할 디렉토리와 파일을 생성
        generateTypeDefinitionFile(parsedYaml, typeOutDir);

        console.log(
          chalk.green(
            `Successfully generated TypeScript definitions at: ${chalk.cyan(typeOutDir)}`
          )
        );

        // YAML 파일을 바탕으로 컴포넌트를 생성
        generateComponents(parsedYaml, outDir);

        console.log(chalk.green('Components generated successfully.'));
      } catch (error) {
        console.error(chalk.red(`Error: ${error}`));
        process.exit(1);
      }
    });
}
