import fsExtra from 'fs-extra';
import chalk from 'chalk';

// Utils
import { generateTypes } from '../utils/typeInference';

// Typings
import { ParsedYaml } from '../types/utils';

/**
 * YAML 파일을 바탕으로 TypeScript 타입을 저장할 디렉토리와 파일을 생성하는 함수
 *
 * 이 함수는 YAML 파일을 파싱하여 TypeScript 타입을 생성하고, 지정된 디렉토리에 컴포넌트와 타입 파일을 저장합니다.
 *
 * @param config - JSON 형식으로 파싱된 YAML 객체입니다.
 * @param outDir - cli 옵션(-d, --outDir)으로 입력된 output directory 경로
 * @param typesDir - cli 옵션(-t, --types)으로 입력된 type directory 경로
 *
 * @throws Error - 파일 경로가 잘못되었거나 YAML 파일의 파싱 또는 타입 생성 과정에서 오류가 발생할 경우 오류를 던집니다.
 */

export function generateTypeDefinitionFile(
  config: ParsedYaml,
  outDir: string,
  typesDir: string
) {
  const { existsSync, mkdirSync, outputFileSync } = fsExtra;

  try {
    // 디렉토리 경로의 마지막에 '/'가 포함된 경우 에러 처리
    if (typesDir.endsWith('/') || outDir.endsWith('/')) {
      console.error(
        chalk.red(
          'Error: Directory path should not end with a trailing slash. ex) path/dir/ (X) -> path/dir (O)'
        )
      );
      process.exit(1);
    }

    const generatedTypes = generateTypes(config);

    // 컴포넌트 타입을 저장할 디렉토리가 존재하지 않는 경우 디렉토리 생성
    if (!existsSync(typesDir)) {
      mkdirSync(typesDir, { recursive: true });
    }

    // 컴포넌트 타입을 저장할 디렉토리 경로에 index.d.ts 파일을 생성하고 생성한 TypeScript 타입을 적는다.
    outputFileSync(`${typesDir}/index.d.ts`, generatedTypes);

    console.log(
      chalk.green(
        `Successfully generated TypeScript definitions at: ${chalk.cyan(typesDir)}`
      )
    );
  } catch (error) {
    console.error(`Error: An unexpected error occurred: ${error}`);
    throw error;
  }
}
