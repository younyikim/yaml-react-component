import { yamlParser } from '../../utils/yamlParser';
import * as path from 'path';

describe('YAML Parser', () => {
  const sampleYamlPath = path.join(
    __dirname,
    '../../config/sample-config.yaml'
  );

  test('should parse YAML file to JSON object', () => {
    const result = yamlParser(sampleYamlPath);
    expect(result).toHaveProperty('components');
  });
});
