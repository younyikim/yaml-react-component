import { Command } from 'commander';

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
  const { components, styles } = config;
  const { outDir } = cmd.opts();

  const component = components[componentName];
  const componentPath = `${outDir}/${componentName}`;
  const fileName = `${componentName}.tsx`;

  let template = componentTemplate;

  // children 정보를 템플릿에 반영
  template = component?.children
    ? template.replace(
        `templatename Component`,
        // 코드 포멧팅을 목적으로 추가한 공백입니다.
        `templatename Component\n      {children}`
      )
    : template;

  // 컴포넌트의 이름을 템플릿에 반영
  template = template.replaceAll('templatename', componentName);

  // props, state 정보를 템플릿에 반영
  if (component?.props !== undefined || component?.state !== undefined) {
    template = templateStatusConvertor(componentName, component, template, cmd);
  }

  return {
    componentPath,
    fileName,
  };
}
