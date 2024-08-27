import yaml from 'js-yaml';
import fsExtra from 'fs-extra';

// Typings
import { ParsedYaml } from '../types/utils';

/**
 * YAML 파일을 JSON 객체로 변환하는 함수입니다.
 * @param filePath - YAML 파일의 경로
 * @returns JSON 객체
 * @throws 오류 발생 시 Error를 던집니다.
 */

export function yamlParser(filePath: string): ParsedYaml {
  const { readFileSync, pathExistsSync } = fsExtra;

  try {
    // 파일 경로에 YAML 파일이 존재하는 지 확인
    if (!pathExistsSync(filePath)) {
      throw new Error(`Error: File does not exist at path "${filePath}"`);
    }

    try {
      // YAML 문자열을 파싱하여 JavaScript 객체로 변환합니다.
      return yaml.load(readFileSync(filePath, 'utf8')) as ParsedYaml;
    } catch (parseError) {
      // YAML 파싱 중 오류가 발생한 경우
      throw new Error(`Error parsing YAML file at path "${filePath}"`);
    }
  } catch (readError) {
    //YAML 구성 파일 읽기 중 에러가 발생한 경우
    throw new Error(`Error reading YAML file at path "${filePath}"`);
  }
}
