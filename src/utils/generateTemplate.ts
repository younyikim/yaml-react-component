import { Command } from 'commander';
import chalk from 'chalk';

// Template
import componentTemplate from '../templates/componentTemplate';

// Utils
import { templateStatusConvertor } from './templateStatusConvertor';

// Typings
import { GeneratedTemplate, ParsedYaml } from '../types/utils';

export function generateTemplate(
  componentName: string,
  config: ParsedYaml,
  cmd: Command
): GeneratedTemplate {
  const { components } = config;
  const { outDir } = cmd.opts();

  const component = components[componentName];

  const componentPath = `${outDir}/${componentName}`;
  const fileName = `${componentName}.tsx`;

  let template = componentTemplate;

  // props, state 정보를 템플릿에 반영
  if (component?.props || component?.state) {
    template = templateStatusConvertor(componentName, component, template, cmd);
  }

  return {
    componentPath,
    fileName,
  };
}
