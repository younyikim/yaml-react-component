import fsExtra from 'fs-extra';

// Utils
import { generateTypes } from './typeInference';

// Typings
import { ParsedYaml } from '../types/utils';

/**
 * YAML 파일을 바탕으로 TypeScript 타입을 저장할 디렉토리와 파일을 생성하는 함수
 *
 * 이 함수는 YAML 파일을 파싱하여 TypeScript 타입을 생성하고, 지정된 디렉토리에 컴포넌트와 타입 파일을 저장합니다.
 *
 * @param config - JSON 형식으로 파싱된 YAML 객체입니다.
 * @param typeOutDir - 생성된 TypeScript 타입을 저장할 디렉토리 경로입니다.
 *
 * @throws Error - 파일 경로가 잘못되었거나 YAML 파일의 파싱 또는 타입 생성 과정에서 오류가 발생할 경우 오류를 던집니다.
 */

export function generateTypeDefinitionFile(
  config: ParsedYaml,
  typeOutDir: string
) {
  const { existsSync, mkdirSync, outputFileSync } = fsExtra;

  try {
    const generatedTypes = generateTypes(config);

    // 컴포넌트 타입을 저장할 디렉토리가 존재하지 않는 경우 디렉토리 생성
    if (!existsSync(typeOutDir)) {
      mkdirSync(typeOutDir, { recursive: true });
    }

    // 컴포넌트 타입을 저장할 디렉토리 경로에 index.d.ts 파일을 생성하고 생성한 TypeScript 타입을 적는다.
    outputFileSync(`${typeOutDir}/index.d.ts`, generatedTypes);
  } catch (error) {
    console.error(`Error: An unexpected error occurred: ${error}`);
    throw error;
  }
}
