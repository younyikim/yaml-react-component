// Typings
import { ParsedYaml } from '../types/utils';

/**
 * 그래프 내 컴포넌트 간의 의존성을 분석하여 위상 정렬을 수행합니다. 이를 통해 컴포넌트들이 올바른 순서로 렌더링되도록 합니다.
 *
 * @param {ParsedYaml} graph - 위상 정렬을 수행할 그래프를 나타내는 YAML 파싱 결과 객체입니다.
 *                              컴포넌트와 그 관계(자식 노드들)가 정의되어 있습니다.
 *
 * @returns {string[]} - 컴포넌트들이 올바른 순서로 정렬된 배열을 반환합니다.
 *
 * @throws {Error} - 그래프 내에 사이클이 존재하는 경우, 예외를 발생시킵니다.
 */

export function topologicalSort(graph: ParsedYaml) {
  const { components } = graph;

  const sorted: string[] = [];
  // 이미 방문한 노드 저장
  const visited: Set<string> = new Set();
  // 현재 방문 중인 노드를 저장할 집합 (사이클 검사)
  const tempMark: Set<string> = new Set();

  function visitNode(node: string) {
    // 그래프에 사이클이 존재하는 경우
    if (tempMark.has(node)) {
      throw new Error('Graph contains cycle.');
    }

    // 아직 방문하지 않은 노드만 확인
    if (!visited.has(node)) {
      tempMark.add(node);

      // 현재 노드의 자식 노드 방문
      for (const child of components[node]?.children || []) {
        visitNode(child);
      }

      tempMark.delete(node);
      // 방문 완료
      visited.add(node);
      // 위상 정렬 결과 배열에 추가
      sorted.push(node);
    }
  }

  for (const node of Object.keys(components)) {
    visitNode(node);
  }

  return sorted;
}
