import { Command } from 'commander';

// Utils
import { generateTemplate } from './generateTemplate';

// Typings
import { ParsedYaml } from '../types/utils';

export function generateComponent(
  componentName: string,
  config: ParsedYaml,
  cmd: Command
) {
  const { componentPath, fileName } = generateTemplate(
    componentName,
    config,
    cmd
  );

  console.log(componentPath, fileName);
}
