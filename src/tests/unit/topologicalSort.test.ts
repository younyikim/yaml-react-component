// Utils
import { topologicalSort } from '../../utils/topologicalSort';

// Typings
import { ParsedYaml } from '../../types/utils';

describe('topologicalSort', () => {
  it('should return the correct topological order for a valid graph', () => {
    const graph: ParsedYaml = {
      components: {
        A: { children: ['B', 'C'] },
        B: { children: ['D'] },
        C: { children: [] },
        D: { children: [] },
      },
    };

    const result = topologicalSort(graph);
    // 가능한 결과: ['D', 'B', 'C', 'A'] 또는 ['C', 'D', 'B', 'A']
    expect(result).toEqual(['D', 'B', 'C', 'A']);
  });

  it('should throw an error if the graph contains a cycle', () => {
    const graphWithCycle: ParsedYaml = {
      components: {
        A: { children: ['B'] },
        B: { children: ['C'] },
        C: { children: ['A'] }, // 사이클이 존재
      },
    };

    expect(() => topologicalSort(graphWithCycle)).toThrow(
      'Graph contains cycle.'
    );
  });

  it('should handle an empty graph', () => {
    const emptyGraph: ParsedYaml = { components: {} };

    const result = topologicalSort(emptyGraph);
    expect(result).toEqual([]);
  });

  it('should handle a graph with a single node', () => {
    const singleNodeGraph: ParsedYaml = {
      components: {
        A: { children: [] },
      },
    };

    const result = topologicalSort(singleNodeGraph);
    expect(result).toEqual(['A']);
  });

  it('should return the correct order when there are multiple independent nodes', () => {
    const independentNodesGraph: ParsedYaml = {
      components: {
        A: { children: [] },
        B: { children: [] },
        C: { children: [] },
      },
    };

    const result = topologicalSort(independentNodesGraph);
    expect(result.sort()).toEqual(['A', 'B', 'C'].sort()); // 순서 상관없이 노드만 있으면 됨
  });
});
