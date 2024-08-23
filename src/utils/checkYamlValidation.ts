// Typings
import { ParsedYaml } from '../types/utils';

/**
 * Yaml 파일에 필수 값이 포함되어있는지 유효성 검사를 수행합니다.
 * @param config
 * @returns
 */
export function checkYamlValidation(config: ParsedYaml) {
  if (!config?.components) {
    throw new Error('Invalid YAML file: "components" section is missing.');
  }
}
