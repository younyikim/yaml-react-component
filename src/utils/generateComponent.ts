import { Command } from 'commander';

// Typings
import { ParsedYaml } from '../types/utils';

export function generateComponent(
  componentName: string,
  config: ParsedYaml,
  cmd: Command
) {
  console.log(componentName);
}
