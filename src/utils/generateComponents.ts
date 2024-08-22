import { Command } from 'commander';

// Utils
import { ParsedYaml } from '../types/utils';

export function generateComponents(
  config: ParsedYaml,
  outDir: string,
  program: Command
) {
  console.log(outDir);
}
