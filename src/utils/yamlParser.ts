import yaml from 'js-yaml';
import fs from 'fs';

// Typings
import { ParsedYaml } from '../types/utils';

/**
 * YAML 파일을 JSON 객체로 변환하는 함수입니다.
 * @param filePath - YAML 파일의 경로
 * @returns JSON 객체
 * @throws 오류 발생 시 Error를 던집니다.
 */

export function yamlParser(filePath: string): ParsedYaml {
  try {
    return yaml.load(fs.readFileSync(filePath, 'utf8')) as ParsedYaml;
  } catch (e) {
    console.error(e);
    throw new Error('Error reading or parsing YAML file');
  }
}
