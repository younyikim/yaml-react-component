import chalk from 'chalk';

import { Command } from 'commander';
import { runGenerator } from './index';

const program = new Command();

program
  .version('1.0.0')
  .description('CLI tool for generating React components from YAML')
  .option('-f, --file <path>', 'YAML file path')
  .option('-d, --directory <path>', 'Output directory')
  .action(async (options) => {
    const { file, directory } = options;

    if (!file || !directory) {
      console.error(
        chalk.red('Error: Both --file and --directory options are required.')
      );
      process.exit(1);
    }

    try {
      runGenerator();
      console.log(chalk.green('Components generated successfully.'));
    } catch (error) {
      console.error(chalk.red(`Error: ${error}`));
      process.exit(1);
    }
  });

program.parse(process.argv);
