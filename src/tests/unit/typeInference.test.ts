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
    console.log(types);
    expect(types).toContain('interface DashboardProps');
    expect(types).toContain('interface DashboardState');
    expect(types).toContain('interface HeaderProps');
    expect(types).toContain('interface UserMenuProps');
    expect(types).toContain('interface UserMenuState');
    expect(types).toContain('interface DATA_LOADEDEvent');
    expect(types).toContain('interface TOGGLE_MENUEvent');
  });
});
