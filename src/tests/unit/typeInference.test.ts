import * as path from 'path';

// Utils
import { generateTypes } from '../../utils/typeInference';
import { yamlParser } from '../../utils/yamlParser';

describe('Type Inference System', () => {
  const sampleYamlPath = path.join(
    __dirname,
    '../../config/sample-config.yaml'
  );
  const sampleYaml = yamlParser(sampleYamlPath);

  test('should generate TypeScript interfaces from JSON object', () => {
    const types = generateTypes(sampleYaml);
    expect(types).toContain('interface DashboardProps');
    expect(types).toContain('interface DashboardDataState');
    expect(types).toContain('interface DashboardLoadingState');
    expect(types).toContain('interface HeaderProps');
    expect(types).toContain('interface UserMenuProps');
    expect(types).toContain('interface EventPayloads');
  });
});
