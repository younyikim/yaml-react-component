import { yamlParser } from '../../src/utils/yamlParser';
import * as path from 'path';

describe('YAML Parser', () => {
  const sampleYamlPath = path.join(
    __dirname,
    '../../src/config/sample-config.yaml'
  );

  test('should parse YAML file to JSON object', () => {
    const result = yamlParser(sampleYamlPath);
    console.log('Parsed YAML result:', JSON.stringify(result, null, 2)); // JSON 객체를 읽기 쉬운 형식으로 출력
    expect(result).toHaveProperty('components');
  });
});
