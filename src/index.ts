import { Command } from 'commander';
import fsExtra from 'fs-extra';

// Utils
import { generateComponents } from './utils/generateComponents';
import { generateTypes } from './utils/typeInference';
import { yamlParser } from './utils/yamlParser';

/**
 * YAML 파일을 바탕으로 TypeScript 타입 및 React 컴포넌트를 생성하는 함수입니다.
 *
 * 이 함수는 YAML 파일을 파싱하여 TypeScript 타입을 생성하고, 지정된 디렉토리에 컴포넌트와 타입 파일을 저장합니다.
 *
 * @param file - YAML 파일의 경로입니다. 이 파일은 컴포넌트와 타입 정보를 포함하고 있어야 합니다.
 * @param outDir - 생성된 React 컴포넌트를 저장할 디렉토리 경로입니다.
 * @param typeOutDir - 생성된 TypeScript 타입을 저장할 디렉토리 경로입니다.
 * @param program - CLI 도구의 `Command` 인스턴스입니다. CLI에서 제공하는 명령어 및 옵션을 정의하는 데 사용됩니다.
 *
 * @throws Error - 파일 경로가 잘못되었거나 YAML 파일의 파싱 또는 타입 생성 과정에서 오류가 발생할 경우 오류를 던집니다.
 */

export function initGenerateComponent(
  file: string,
  outDir: string,
  typeOutDir: string,
  program: Command
) {
  const { existsSync, mkdirSync, outputFileSync, readFileSync } = fsExtra;

  const parsedYaml = yamlParser(file);
  const generatedTypes = generateTypes(parsedYaml);

  // 컴포넌트 타입을 저장할 디렉토리가 존재하지 않는 경우 디렉토리 생성
  if (!existsSync(typeOutDir)) {
    mkdirSync(typeOutDir, { recursive: true });
  }

  // 컴포넌트 타입을 저장할 디렉토리 경로에 index.d.ts 파일을 생성하고 생성한 TypeScript 타입을 적는다.
  outputFileSync(`${typeOutDir}/index.d.ts`, generatedTypes);

  generateComponents(parsedYaml, outDir, program);
}
