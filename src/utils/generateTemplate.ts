import { Command } from 'commander';

// Template
import componentTemplate from '../templates/components/componentTemplate';

// Utils
import { templateStatusConvertor } from './templateStatusConvertor';
import { uncapitalizeFirstLetter } from './util';

// Typings
import { GeneratedTemplate, ParsedYaml } from '../types/utils';

/**
 * 주어진 YAML 구성 파일과 명령어 옵션을 기반으로 React 컴포넌트 템플릿을 생성합니다.
 * 컴포넌트의 props, state, children, 스타일 등의 정보를 반영하여 템플릿을 커스터마이징합니다.
 *
 * @param {string} componentName - 생성할 컴포넌트의 이름입니다.
 * @param {ParsedYaml} config - YAML 파일을 파싱한 결과로 얻어진 구성 객체입니다.
 * @param {Command} cmd - 커맨드라인 명령어를 처리하는 Commander.js의 Command 객체입니다.
 *
 * @returns {GeneratedTemplate} 생성된 템플릿, 컴포넌트의 디렉토리 경로, 파일 경로, 스타일 코드 등을 포함한 객체를 반환합니다.
 */
export function generateTemplate(
  componentName: string,
  config: ParsedYaml,
  cmd: Command
): GeneratedTemplate {
  const { components, styles } = config;
  const { outDir } = cmd.opts();

  const component = components[componentName];
  const componentDirPath = `${outDir}/${uncapitalizeFirstLetter(componentName)}`;
  const componentFilePath = `${componentDirPath}/index.tsx`;
  const componentStylePath = `${componentDirPath}/style.css`;

  let template = componentTemplate;
  let componentStyleCode = '';

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

  if (styles) {
    const componentStyle = styles[componentName];

    // 스타일이 있는 컴포넌트
    if (componentStyle) {
      componentStyleCode = componentStyle.css;

      template = template.replace(
        `className="templateclass"`,
        `className="${uncapitalizeFirstLetter(componentName)}"`
      );
    } else {
      template = template.replace(`import './style.css';`, '');
      template = template.replace(` className="templateclass"`, '');
    }
  }

  return {
    componentDirPath,
    componentFilePath,
    componentStylePath,
    template,
    componentStyle: componentStyleCode,
  };
}
