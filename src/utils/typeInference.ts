// Utils
import { convertToType } from './util';

// Typings
import { Component } from '../types/utils';

/**
 * 컴포넌트의 이름과 구성을 기반으로 TypeScript 인터페이스를 생성합니다.
 *
 * @param name - 컴포넌트의 이름입니다.
 * @param component - 컴포넌트의 구성입니다.
 * @returns 컴포넌트에 대한 TypeScript 인터페이스 정의가 포함된 문자열을 반환합니다.
 */
export function generateComponentInterface(
  name: string,
  component: Component
): string {
  // 컴포넌트의 props와 state에 대한 TypeScript 타입 생성
  const propsType = component.props ? generateType(component.props) : '{}';

  return `interface ${name}Props ${propsType}`;
}

/**
 * 필드 이름과 타입의 딕셔너리에서 TypeScript 타입 정의를 생성합니다.
 *
 * @param fields - 필드 이름과 타입을 포함하는 딕셔너리입니다.
 * @returns TypeScript 타입 정의가 포함된 문자열을 반환합니다.
 */
export function generateType(fields: Record<string, string>): string {
  const types = Object.entries(fields)
    .map(([key, value]) => `${key}: ${convertToType(value)};`)
    .join(' ');

  return `{ ${types} }`;
}

/**
 * 이벤트의 이름과 페이로드 타입에 기반하여 TypeScript 인터페이스를 생성합니다.
 *
 * @param events - 이벤트의 이름과 페이로드 타입을 포함하는 딕셔너리입니다.
 * @returns 이벤트에 대한 TypeScript 인터페이스 정의가 포함된 문자열을 반환합니다.
 */
export function generateEventInterfaces(
  events: Record<string, { payload: string }>
): string {
  const eventTypes = Object.entries(events)
    .map(([event, { payload }]) => `${event}: ${convertToType(payload)};`)
    .join(' ');

  return `interface EventPayloads { ${eventTypes} }`;
}
