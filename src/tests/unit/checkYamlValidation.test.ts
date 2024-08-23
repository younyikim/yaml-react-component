import { checkYamlValidation } from '../../utils/checkYamlValidation';
import { ParsedYaml } from '../../types/utils';

describe('checkYamlValidation', () => {
  it('should not throw an error when components section is present', () => {
    const validConfig: ParsedYaml = {
      components: {
        MyComponent: {
          props: {
            user: 'object',
          },
          state: {
            isLoggedIn: 'boolean',
          },
        },
      },
    };

    expect(() => checkYamlValidation(validConfig)).not.toThrow();
  });

  it('should throw an error when components section is missing', () => {
    const invalidConfig = {} as unknown as ParsedYaml;

    expect(() => checkYamlValidation(invalidConfig)).toThrow(
      'Invalid YAML file: "components" section is missing.'
    );
  });

  it('should throw an error when config is undefined', () => {
    expect(() =>
      checkYamlValidation(undefined as unknown as ParsedYaml)
    ).toThrow('Invalid YAML file: "components" section is missing.');
  });

  it('should throw an error when config is null', () => {
    expect(() => checkYamlValidation(null as unknown as ParsedYaml)).toThrow(
      'Invalid YAML file: "components" section is missing.'
    );
  });
});
