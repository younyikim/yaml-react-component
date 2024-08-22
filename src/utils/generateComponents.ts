// Typings
import { ParsedYaml } from '../types/utils';

export function generateComponents(config: ParsedYaml, outDir: string) {
  const components = config.components;

  Object.entries(components).forEach(([name, configs]) => console.log(name));
}
