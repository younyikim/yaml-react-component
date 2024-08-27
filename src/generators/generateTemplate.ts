import { Command } from 'commander';

// Utils
import { uncapitalizeFirstLetter } from '../utils/util';
import { generateImportState } from './generateImportState';
import { generateState } from './generateState';
import { generateEventState } from './generateEventState';
import { generateChildState } from './generateChildState';
import { generateComponentInterface } from '../utils/typeInference';

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
  cmd: Command,
  renderingOrder: string[]
): GeneratedTemplate {
  const { components, styles } = config;
  const { outDir } = cmd.opts();

  const component = components[componentName];
  const componentDirPath = `${outDir}/${uncapitalizeFirstLetter(componentName)}`;
  const componentFilePath = `${componentDirPath}/index.tsx`;
  const componentStylePath = `${componentDirPath}/style.css`;
  const componentStyle = styles ? styles[componentName] : null;

  const importStatement = generateImportState(
    componentName,
    component,
    config,
    cmd
  );
  const typeStatement = generateComponentInterface(componentName, component);
  const stateStatement = generateState(component);
  const eventStatement = generateEventState(component);
  const childrenStatement = generateChildState(component, config);

  let template = importStatement + '\n\n';

  template += typeStatement + '\n\n';

  template += `const ${componentName} = ( ) => {\n`;

  if (stateStatement) {
    template += '  ' + stateStatement + '\n  ';
  }

  if (eventStatement) {
    template += stateStatement
      ? '\n' + eventStatement + '\n'
      : eventStatement + '\n';
  }

  template += '  return (\n';

  if (componentStyle) {
    template += `    <div data-testid="${componentName}" className="${uncapitalizeFirstLetter(componentName)}">\n`;
  } else {
    template += `    <div data-testid="${componentName}">\n`;
  }
  template += `      <h1>${componentName} Component</h1>\n`;

  if (childrenStatement) {
    template += `${childrenStatement}\n`;
  }

  template += '    </div>\n';
  template += '  )\n';
  template += '};\n\n';

  template += `export default ${componentName};\n`;

  return {
    componentDirPath,
    componentFilePath,
    componentStylePath,
    template,
    componentStyle: componentStyle ? componentStyle.css : '',
  };
}
