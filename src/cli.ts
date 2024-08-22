import chalk from 'chalk';
import fs from 'fs';

import { Command } from 'commander';
import { initGenerateComponent } from './index';

const program = new Command();

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
      if (types === './src/components/types' && outDir !== './src/components') {
        typeOutDir = `${outDir}/types`;
      }

      initGenerateComponent(file, outDir, typeOutDir, program);
      console.log(chalk.green('Components generated successfully.'));
    } catch (error) {
      console.error(chalk.red(`Error: ${error}`));
      process.exit(1);
    }
  });

program.parse(process.argv);
