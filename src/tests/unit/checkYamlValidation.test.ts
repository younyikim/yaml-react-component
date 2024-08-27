// Import the function to test
import { checkYamlValidation } from '../../utils/checkYamlValidation';
import { ParsedYaml } from '../../types/utils';

// Test data for different scenarios
const validYaml: ParsedYaml = {
  components: {
    Dashboard: {
      props: { user: 'object' },
      state: { data: 'object', loading: 'boolean' },
      subscriptions: [{ event: 'DATA_LOADED', action: 'handleDataLoaded' }],
      publications: ['DASHBOARD_LOADED'],
      children: ['Header', 'MainContent', 'Footer'],
    },
    Header: {
      props: { title: 'string', user: 'object' },
      lazyLoad: false,
      publications: ['HEADER_CLICKED'],
      children: ['UserMenu'],
    },
    UserMenu: {
      props: { user: 'object', menuItems: 'array' },
      state: { isOpen: 'boolean' },
      subscriptions: [{ event: 'TOGGLE_MENU', action: 'toggleMenu' }],
      publications: ['MENU_TOGGLED'],
    },
    MainContent: {
      props: { user: 'object' },
      state: { posts: 'array', loading: 'boolean' },
      subscriptions: [{ event: 'LOAD_POSTS', action: 'loadPosts' }],
      children: ['PostList', 'PostDetails'],
    },
    PostList: {
      props: { posts: 'array' },
      lazyLoad: true,
      publications: ['POST_SELECTED'],
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
  events: {
    DATA_LOADED: { payload: 'object' },
    TOGGLE_MENU: { payload: 'none' },
    LOAD_POSTS: { payload: 'object' },
    POST_SELECTED: { payload: 'object' },
    DASHBOARD_LOADED: { payload: 'none' },
    HEADER_CLICKED: { payload: 'none' },
    MENU_TOGGLED: { payload: 'none' },
    USER_PROFILE_VIEWED: { payload: 'none' },
    USER_DETAILS_EDITED: { payload: 'object' },
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
  events: {},
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
  events: {},
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
  events: {},
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
  events: {
    DATA_LOADED: {},
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
  events: {},
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

  test('should throw an error if event payload is missing', () => {
    expect(() => checkYamlValidation(missingPayloadYaml)).toThrow(
      '[Invalid YAML config] Event "DATA_LOADED" is missing a "payload" section.'
    );
  });

  test('should throw an error if styles section is not an object', () => {
    expect(() => checkYamlValidation(invalidStylesYaml)).toThrow(
      '[Invalid YAML config] Style definition for component "Dashboard" is not a valid object.'
    );
  });
});
