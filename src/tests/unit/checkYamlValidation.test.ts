// Import the function to test
import { checkYamlValidation } from '../../utils/checkYamlValidation';
import { ParsedYaml } from '../../types/utils';

// Test data for different scenarios
const validYaml: ParsedYaml = {
  components: {
    Dashboard: {
      props: { user: 'object' },
      state: { data: 'object', loading: 'boolean' },
      children: ['Header', 'MainContent', 'Footer'],
    },
    Header: {
      props: { title: 'string', user: 'object' },
      lazyLoad: false,
      children: ['UserMenu'],
    },
    UserMenu: {
      props: { user: 'object', menuItems: 'array' },
      state: { isOpen: 'boolean' },
    },
    MainContent: {
      props: { user: 'object' },
      state: { posts: 'array', loading: 'boolean' },
      children: ['PostList', 'PostDetails'],
    },
    PostList: {
      props: { posts: 'array' },
      lazyLoad: true,
    },
    PostDetails: {
      props: { post: 'object' },
      lazyLoad: true,
    },
    Footer: {
      props: { year: 'number', links: 'array' },
      lazyLoad: false,
    },
  },
  styles: {
    Dashboard: {
      css: '.dashboard { display: flex; flex-direction: column; height: 100vh; }',
    },
    Header: {
      css: '.header { background-color: #333; color: white; padding: 1rem; }',
    },
    Footer: {
      css: '.footer { background-color: #f1f1f1; text-align: center; padding: 1rem; position: absolute; bottom: 0; width: 100%; }',
    },
  },
};

const missingComponentsYaml = {
  styles: {},
} as unknown as ParsedYaml;

const invalidPropsYaml = {
  components: {
    Dashboard: {
      props: 'not-an-object',
      state: { data: 'object', loading: 'boolean' },
      children: ['Header'],
    },
  },

  styles: {},
} as unknown as ParsedYaml;

const invalidChildrenYaml = {
  components: {
    Dashboard: {
      props: { user: 'object' },
      state: { data: 'object', loading: 'boolean' },
      children: 'not-an-array',
    },
  },
  styles: {},
} as unknown as ParsedYaml;

const missingPayloadYaml = {
  components: {
    Dashboard: {
      props: { user: 'object' },
      state: { data: 'object', loading: 'boolean' },
      children: ['Header'],
    },
  },
  styles: {},
} as unknown as ParsedYaml;

const invalidStylesYaml = {
  components: {
    Dashboard: {
      props: { user: 'object' },
      state: { data: 'object', loading: 'boolean' },
      children: ['Header'],
    },
  },
  styles: {
    Dashboard: 'not-an-object',
  },
} as unknown as ParsedYaml;

describe('checkYamlValidation', () => {
  test('should validate a correct YAML configuration', () => {
    expect(() => checkYamlValidation(validYaml)).not.toThrow();
  });

  test('should throw an error if components section is missing', () => {
    expect(() => checkYamlValidation(missingComponentsYaml)).toThrow(
      '[Invalid YAML config] "components" section is missing.'
    );
  });

  test('should throw an error if props is not an object', () => {
    expect(() => checkYamlValidation(invalidPropsYaml)).toThrow(
      '[Invalid YAML config] Component "Dashboard" has a "props" section that is not an object.'
    );
  });

  test('should throw an error if children is not an array', () => {
    expect(() => checkYamlValidation(invalidChildrenYaml)).toThrow(
      '[Invalid YAML config] Component "Dashboard" has a "children" section that is not an array.'
    );
  });

  test('should throw an error if styles section is not an object', () => {
    expect(() => checkYamlValidation(invalidStylesYaml)).toThrow(
      '[Invalid YAML config] Style definition for component "Dashboard" is not a valid object.'
    );
  });
});
