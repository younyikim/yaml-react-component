#! /usr/bin/env node

import { program, Command } from 'commander';
import chalk from 'chalk';

// Utils
import { initGenerateComponent } from './generators/initGenerateComponent';

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
    try {
      initGenerateComponent(options, cmd);
      console.log(chalk.green('Components generated successfully.'));
    } catch (error) {
      console.error(chalk.red(error));
      process.exit(1);
    }
  });

program.parse(process.argv);
