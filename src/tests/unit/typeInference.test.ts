import { generateComponentInterface } from '../../utils/typeInference';

// Sample YAML 구조를 JSON 형태로 직접 정의합니다.
const sampleConfig = {
  components: {
    Dashboard: {
      props: {
        title: 'string',
        items: 'array',
      },
    },
    Header: {
      props: {
        logo: 'string',
      },
    },
    UserMenu: {
      props: {
        userName: 'string',
        onLogout: 'function',
      },
    },
  },
};

describe('Type Inference System', () => {
  test('should generate TypeScript interfaces from JSON object', () => {
    // 컴포넌트 이름과 구성에서 TypeScript 인터페이스 생성
    Object.entries(sampleConfig.components).forEach(([name, component]) => {
      const componentInterface = generateComponentInterface(name, component);

      // 각 컴포넌트 인터페이스가 포함되어 있는지 개별적으로 확인
      if (name === 'Dashboard') {
        expect(componentInterface).toContain(
          'interface DashboardProps { title: string; items: unknown[]; }'
        );
      } else if (name === 'Header') {
        expect(componentInterface).toContain(
          'interface HeaderProps { logo: string; }'
        );
      } else if (name === 'UserMenu') {
        expect(componentInterface).toContain(
          `interface UserMenuProps { userName: string; onLogout: () => void; }`
        );
      }
    });
  });
});
