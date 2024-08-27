// Typings
import { ParsedYaml } from '../types/utils';

/**
 * Yaml 파일에 필수 값이 포함되어있는지 유효성 검사를 수행합니다.
 * @param config
 * @returns
 */
export function checkYamlValidation(config: ParsedYaml) {
  // 필수 필드 확인
  if (!config.components) {
    throw new Error('[Invalid YAML config] "components" section is missing.');
  }

  // components가 객체인지 확인
  if (
    typeof config.components !== 'object' ||
    Array.isArray(config.components) ||
    config.components === null
  ) {
    throw new Error(
      '[Invalid YAML config] "components" section must be a non-empty object.'
    );
  }

  // components가 비어 있는지 확인
  if (Object.keys(config.components).length === 0) {
    throw new Error(
      '[Invalid YAML config] "components" section must not be an empty object.'
    );
  }

  // 컴포넌트 검증
  for (const [name, component] of Object.entries(config.components)) {
    // props 필드가 객체 형식인지 검증
    if (component.props) {
      if (
        typeof component.props !== 'object' ||
        component.props === null ||
        Array.isArray(component.props)
      ) {
        throw new Error(
          `[Invalid YAML config] Component "${name}" has a "props" section that is not an object.`
        );
      }
    }

    // state 필드가 객체 형식인지 검증
    if (component.state) {
      if (
        typeof component.state !== 'object' ||
        component.state === null ||
        Array.isArray(component.state)
      ) {
        throw new Error(
          `[Invalid YAML config] Component "${name}" has a "state" section that is not an object.`
        );
      }
    }

    // children 필드 유효성 검사
    if (component.children) {
      // children 필드가 배열 형식이 아닌 경우
      if (!Array.isArray(component.children)) {
        throw new Error(
          `[Invalid YAML config] Component "${name}" has a "children" section that is not an array.`
        );
      } else {
        // children 필드 내의 값이 문자열이 아닌 경우
        for (const child of component.children) {
          if (typeof child !== 'string') {
            throw new Error(
              `[Invalid YAML config] Component "${name}" has a non-string element in its "children" array.`
            );
          }
        }
      }
    }
  }

  // event 필드 검증
  if (config?.events) {
    for (const event of Object.keys(config.events)) {
      // 이벤트가 객체인지 확인
      if (
        typeof config.events[event] !== 'object' ||
        config.events[event] === null ||
        Array.isArray(config.events[event])
      ) {
        throw new Error(
          `[Invalid YAML config] Event "${event}" definition is not a valid object.`
        );
      }

      // 이벤트의 payload 필드 검증
      if (config.events[event].payload === undefined) {
        throw new Error(
          `[Invalid YAML config] Event "${event}" is missing a "payload" section.`
        );
      }
    }
  }

  // styles 필드 검증
  if (config.styles) {
    // styles가 객체인지 확인
    if (typeof config.styles !== 'object' || Array.isArray(config.styles)) {
      throw new Error(
        '[Invalid YAML config] The "styles" section must be an object.'
      );
    } else {
      // 컴포넌트의 스타일 필드가 객체인지 확인
      for (const [componentName, style] of Object.entries(config.styles)) {
        if (
          typeof style !== 'object' ||
          style === null ||
          Array.isArray(style)
        ) {
          throw new Error(
            `[Invalid YAML config] Style definition for component "${componentName}" is not a valid object.`
          );
        }
        // css 속성이 문자열인지 확인
        else if (typeof style.css !== 'string') {
          throw new Error(
            `[Invalid YAML file] Component "${componentName}" style is missing a "css" string.`
          );
        }
      }
    }
  }
}
