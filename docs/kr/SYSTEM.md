# 시스템 아키텍처 및 주요 결정 사항

## 1. 전체 시스템 설계

YAML React Component Generator의 아키텍처는 모듈화, 확장성, 효율성을 염두에 두고 설계되었으며, YAML 구성 파일에서 완전히 타입이 지정된 React 컴포넌트를 생성합니다.

1. **시스템 아키텍처**
   - **입력:** CLI 명령어를 통해 YAML 파일 경로 및 컴포넌트 출력 디렉토리 입력
   - **출력:** TypeScript 타입이 포함된 React 컴포넌트
   - **주요 모듈:**
     - YAML 파서
     - 타입 추론 시스템
     - 코드 생성기
     - Pub/Sub 이벤트 시스템
     - 종속성 분석기
     - 동적 컴포넌트 로딩
     - 오류 처리
2. **모듈 간의 관계**
   - CLI에서 사용자로부터 YAML 파일 경로와 출력 디렉토리를 입력받아 처리
   - YAML 파서가 YAML 파일을 분석하여 JSON 객체로 변환
   - 타입 추론 시스템이 JSON 객체를 분석하여 TypeScript 인터페이스를 생성
   - 코드 생성기가 TypeScript 인터페이스를 바탕으로 React 컴포넌트를 생성
   - Pub/Sub 시스템이 컴포넌트 간의 이벤트 처리를 관리
   - 종속성 분석기가 컴포넌트 렌더링 순서를 결정
   - 동적 컴포넌트 로딩이 구성에 따라 지연 로딩을 처리
   - 오류 처리가 잘못된 구성에 대해 명확한 메시지를 제공하고, 컴포넌트 오류 경계를 설정

## 2. 기능 구현 체크리스트

- [x] **YAML 구성 파서 및 코드 생성**

  - [x] YAML 파일을 파싱하여 컴포넌트 구조, props, 상태 및 관계를 정의합니다.
  - [x] 중첩된 컴포넌트 정의를 지원하며, YAML 구조에 기반하여 함수형 React 컴포넌트를 생성합니다.
  - [x] 생성된 컴포넌트는 TypeScript 타입 주석을 포함하고, props와 상태에 대한 적절한 타입 정의를 생성합니다.

- [x] **타입 추론 및 동적 컴포넌트 로딩**

  - [x] YAML 구조를 분석하여 TypeScript 타입을 추론하고, 적절한 인터페이스 또는 타입 정의를 생성합니다.
  - [x] 구성에서 지정한 대로 컴포넌트를 지연 로딩(lazy-load)할 수 있도록 지원하며, React.lazy()와 Suspense를 활용하여 동적 임포트를 처리합니다.

- [x] **Pub/Sub 이벤트 시스템**

  - [x] 컴포넌트 간 통신을 위한 간단한 퍼블리시/구독(pub/sub) 시스템을 구현하고, YAML에서 정의된 대로 컴포넌트가 이벤트를 구독하고 발행할 수 있도록 합니다.

- [x] **의존성 분석 및 최적 렌더링**

  - [x] YAML 구조에 기반하여 컴포넌트 의존성을 분석하고, 컴포넌트의 최적 렌더링 순서를 결정합니다. 이를 위해 위상 정렬을 구현합니다.

- [x] **오류 처리 및 성능 최적화**

  - [x] 잘못된 구성에 대한 명확한 오류 메시지를 제공하고, 생성된 컴포넌트에서 적절한 오류 경계를 구현합니다.
  - [x] 대형 YAML 파일을 효율적으로 파싱하고, 속도와 메모리 사용량을 최적화하여 코드 생성 성능을 향상시킵니다.

- [ ] **확장성 및 테스트**
  - [x] 시스템을 쉽게 확장 가능하도록 설계하고, 새로운 기능을 추가할 수 있도록 적절한 디자인 패턴을 사용합니다.
  - [x] 생성기 함수에 대한 단위 테스트를 작성합니다.
  - [ ] \*(통합 테스트 미구현) 올바른 컴포넌트 생성 여부를 확인하기 위해 통합 테스트를 구현합니다.

## 3. 개별 모듈 설계

### 3.1 CLI

CLI 명령어를 실행하면 YAML 파일을 파싱하고, 지정된 경로에 TypeScript 타입이 포함된 React 컴포넌트를 생성하도록 시스템을 구성했습니다.

- **사용 기술**

  - **[Commander](https://www.npmjs.com/package/commander)**: CLI 명령어를 쉽게 작성할 수 있게 도와주는 라이브러리
  - **[Chalk](https://www.npmjs.com/package/chalk)**: 콘솔 출력을 색상으로 구분할 수 있도록 지원하는 라이브러리

- **명령어 정의 및 옵션 설정**
  - 명령어 정의 파일 위치 : [src/cli.ts](https://github.com/younyikim/yaml-react-component/blob/main/src/cli.ts)
  - 명령어 : `$ gcpt [options]`
  - 옵션 설정
    - `-f, --file <path>`: YAML 파일의 경로를 지정합니다. 기본값은 `./src/config/sample-config.yaml`입니다.
    - `-d, --outDir <path>`: 생성된 컴포넌트를 저장할 출력 디렉토리를 지정합니다. 기본값은 `./src/components`입니다.
  - 명령어 실행
    - 명령어를 실행하면 YAML 파일을 파싱하고, 지정된 경로에 TypeScript 타입이 포함된 React 컴포넌트를 생성합니다.
    - 명령어 실행 결과로 작업의 성공 또는 실패 여부를 색상으로 구분된 메시지로 콘솔에 출력합니다.

### 3.2 YAML Parser

YAML 파일 여부를 검사하고, YAML 구성 파일을 파싱하여 JSON 객체로 변환하는 YAML 파서 모듈을 구성했습니다.
이 모듈을 통해 YAML 파일을 안전하게 처리하고, 이후 단계에서의 오류를 방지하기 위한 검증을 수행합니다.

- **사용 기술**

  - [js-yaml](https://www.npmjs.com/package/js-yaml): YAML 파일을 JSON으로 변환하는 라이브러리
  - [fs-extra](https://www.npmjs.com/package/fs-extra): 파일 시스템 작업을 도와주는 유틸리티 라이브러리

- **모듈 설명**
  - [yamlParser.ts](https://github.com/younyikim/yaml-react-component/blob/main/src/utils/yamlParser.ts)
    - js-yaml 라이브러리를 사용하여 YAML 파일을 JSON 객체로 파싱합니다.
    - 예외 처리
      - YAML 파일이 존재하지 않거나, 파싱 중 오류가 발생하는 경우, 콘솔에 오류 메세지를 출력하고 프로그램을 종료합니다.
  - [checkYamlValidation.ts](https://github.com/younyikim/yaml-react-component/blob/main/src/utils/checkYamlValidation.ts)
    - YAML 파일 형식의 유효성 검사를 수행합니다.
    - 필수 섹션인 `components`가 존재하는 지 여부를 확인하고 존재하지 않으면 에러를 리턴합니다.

### 3.3 타입 추론 시스템

타입 추론 시스템은 YAML 파일로부터 읽어들인 컴포넌트의 구성 정보를 바탕으로 TypeScript에서 사용할 수 있는 TypeScript 인터페이스와 타입을 생성하는 역할을 합니다. 이 시스템은 컴포넌트의 Props, State, 이벤트 등을 적절한 TypeScript 타입으로 변환하여 생성된 컴포넌트 코드에 타입 안전성을 제공합니다.

- **모듈 설명**
  - TypeScript 타입 추론 : [utils.ts - convertToType()](https://github.com/younyikim/yaml-react-component/blob/main/src/utils/util.ts)
    - YAML 파일로부터 읽어들인 필드 이름과 타입을 TypeScript에서 사용할 수 있는 형식으로 변환합니다.
    - ex) input : `user: object` -> output : `user : Record<string, unknown>`
  - Props 타입 추론 : [typeInference.ts - generateComponentInterface()](https://github.com/younyikim/yaml-react-component/blob/main/src/utils/typeInference.ts)
    - YAML 파일로부터 읽어들인 컴포넌트의 Props에 대한 TypeScript 인터페이스를 생성합니다.
    - 생성된 Props 인터페이스는 해당 컴포넌트 파일에 작성됩니다.
    - ex) dashboard.tsx -> `interface DashboardProps { user: Record<string, unknown> }`
  - State 타입 추론 : [generateState.ts](https://github.com/younyikim/yaml-react-component/blob/main/src/generators/generateState.ts)
    - YAML 파일로부터 읽어들인 컴포넌트의 State에 대한 TypeScript 인터페이스를 생성합니다.
    - 생성된 State 타입은 해당 컴포넌트 파일에 작성됩니다.
    - ex) dashboard.tsx -> `const [data, setData] = useState<Record<string, unknown>>({});`
  - Event 타입 추론 : [typeInference.ts - generateEventInterfaces()](https://github.com/younyikim/yaml-react-component/blob/main/src/utils/typeInference.ts)
    - YAML 파일의 "events" 섹션의 정보를 기반으로 이벤트의 TypeScript 인터페이스를 생성합니다.

### 3.4 컴포넌트 코드 생성기

컴포넌트 코드 생성기는 YAML 파일에서 정의된 컴포넌트들을 읽어들여 각각의 React 컴포넌트 파일과 스타일 파일을 생성합니다.  
 이 시스템은 컴포넌트의 이름과 구성을 바탕으로 TypeScript로 작성된 컴포넌트와 관련 스타일 파일을 실제 디렉토리에 생성하여, 컴포넌트를 실제로 사용할 수 있게 합니다.

- **작동 과정**
  - YAML 구성 파일의 `components` 섹션을 순회하여 모든 컴포넌트에 대해 각각의 React 컴포넌트 파일과 스타일 파일을 생성하는 과정을 수행합니다.
  - 컴포넌트 템플릿 생성
    - 컴포넌트의 Props, State, Pub/Sub 시스템, 자식 컴포넌트, 스타일 등을 정보를 읽어 각 컴포넌트에 맞는 템플릿을 생성합니다.
    - 다양한 컴포넌트의 요구사항에 맞춰 템플릿을 적절히 조절하고, 새로운 기능 추가에도 유연하게 대응하기 위해 템플릿 구성 요소를 독립적으로 설계하였습니다.
      - Import 관리 : 컴포넌트에 필요한 모듈과 의존성을 가져오는 import문 정의
      - TyeScript Interface 관리 : 컴포넌트의 Props에 대한 TypeScript 인터페이스를 정의
      - Statement 관리 : `useState` 훅을 사용하여 컴포넌트의 상태를 관리하는 코드 정의
      - Event 관리 : 컴포넌트에서 발생할 이벤트와 관련된 타입 및 핸들러 정의
      - Children 관리 : 컴포넌트의 자식 요소를 정의하는 JSX 코드 정의
      - Lazy Load 관리 : 동적 로드해야하는 컴포넌트 관리 코드 정의
  - 개별 컴포넌트 생성
    - 생성된 템플릿을 기반으로 React 코드 파일과 스타일 파일을 작성합니다.
    - 생성된 파일들은 지정된 디렉토리에 저장됩니다.
    - 오류 처리 : 파일 경로에 이미 파일이 존재하는 경우 오류를 출력하고 종료합니다.

**예시**

```bash
components:
  Dashboard:
    props:
      user: object
    state:
      data: object
      loading: boolean
    subscriptions:
      - event: DATA_LOADED
        action: handleDataLoaded
    publications:
      - DASHBOARD_LOADED
    children:
      - Header
      - MainContent
      - Footer

styles:
  Dashboard:
    css: |
      .dashboard {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
```

위 내용을 기반으로 `src/components/dashBoard/index.tsx` 와 `src/components/dashBoard/styles.css` 파일이 자동으로 생성됩니다.

각 파일의 내용을 아래와 같이 정의됩니다 :

```jsx
# src/components/dashBoard/index.tsx

import { useState, useEffect } from 'react';
import { eventBus } from 'yaml-react-component';
import Header from '../header';
import MainContent from '../mainContent';
import Footer from '../footer';
import './style.css';

interface DashboardProps { user: Record<string, unknown> }

const Dashboard = ( ) => {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleDataLoaded = () => {
      console.log('handleDataLoaded');
    };

    eventBus.subscribe('DATA_LOADED', handleDataLoaded);
    eventBus.publish('DASHBOARD_LOADED', {});

    return () => {
      eventBus.unsubscribe('DATA_LOADED', handleDataLoaded);
    };
  }, []);

  return (
    <div data-testid="Dashboard" className="dashboard">
      <h1>Dashboard Component</h1>
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
};

export default Dashboard;
```

```js
# src/components/dashBoard/style.css

.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

```

### 3.5 Pub/Sub 이벤트 시스템

Pub/Sub(발행/구독) 이벤트 시스템을 통해 컴포넌트 간의 이벤트 처리를 효율적으로 관리합니다.  
이 시스템을 통해 컴포넌트 간의 이벤트 구독, 발행, 구독 취소 등의 작업을 쉽게 수행할 수 있습니다.

- **모듈 설명**

  - [eventBus.ts](https://github.com/younyikim/yaml-react-component/blob/main/src/utils/eventBus.ts) :

    - EventBus는 컴포넌트들이 특정 이벤트에 대해 구독(subscribe)하고, 해당 이벤트가 발생하면 발행(publish)할 수 있도록 돕는 객체입니다.
    - **주요 기능**
      - 이벤트 구독 (`subscribe`) : 특정 이벤트를 구독하여, 해당 이벤트가 발행될 때 실행될 핸들러를 등록합니다.
      - 이벤트 발행 (`publish`) : 특정 이벤트를 발행하고, 등록된 모든 핸들로를 호출합니다.
      - 구독 취소 (`unsubscribe`) : 특정 이벤트에 대한 구독을 취소합니다.
      - IIFE(즉시 실행 함수)로 구성 : 애플리케이션 전역에서 하나의 인스턴스만 존재하고, 이 인스턴스를 전역적으로 재사용 가능하도록 하기 위해 eventBus를 IIFE로 구성했습니다.
    - **컴포넌트 코드 생성기에서의 사용**

      - 주어진 YAML 설정 파일에서 컴포넌트 내에 `publications`, `subscriptions` 항목이 존재하는 경우, 발행 / 구독 이벤트를 관리하는 코드를 컴포넌트 템플릿에 추가합니다.

        ```yaml
        # sample-config.yaml
        subscriptions:
          - event: DATA_LOADED
            action: handleDataLoaded
        publications:
          - DASHBOARD_LOADED
        ```

        ```jsx
        // Yaml 파일을 기반으로 Pub, sub 코드 생성
        import { eventBus } from 'yaml-react-component';

        useEffect(() => {
          const handleDataLoaded = () => {
            console.log('handleDataLoaded');
          };

          eventBus.subscribe('DATA_LOADED', handleDataLoaded);
          eventBus.publish('DASHBOARD_LOADED', {});

          return () => {
            eventBus.unsubscribe('DATA_LOADED', handleDataLoaded);
          };
        }, []);
        ```

    - **클라이언트에서의 사용**

      - EventBus는 클라이언트 측에서 호출하여 사용할 수 있도록 설계되었습니다.

        ```jsx
        // Client 내의 컴포넌트에서 사용 예시
        import { eventBus } from 'yaml-react-component';

        // 이벤트 구독
        eventBus.subscribe('myEvent', (payload) => {
          console.log('Event received:', payload);
        });

        // 이벤트 발행
        eventBus.publish('myEvent', { data: 'example payload' });

        // 이벤트 구독 취소
        eventBus.unsubscribe('myEvent', myEventHandler);
        ```

### 3.6 종속성 분석기

종속성 분석기는 컴포넌트 간의 종속성을 파악하여, 어떤 순서로 컴포넌트가 렌더링되어야 하는 지 결정하는 역할을 합니다.
종속성 분석을 위해 위상 정렬 알고리즘을 통해 컴포넌트의 렌더 순서를 결정했습니다.

- **모듈 설명**

  - [topologicalSort.ts](https://github.com/younyikim/yaml-react-component/blob/main/src/utils/topologicalSort.ts)

    - 각 컴포넌트를 그래프의 노드로 간주하여 위상 정렬 알고리즘을 작성했습니다.
    - 컴포넌트 코드 생성기를 사용할 때, 위상 정렬 알고리즘을 통해 분석된 렌더링 순서에 따라 컴포넌트를 생성합니다.  
      이를 통해 자식 컴포넌트가 부모 컴포넌트보다 먼저 생성되도록 보장합니다.
    - **위상 정렬 알고리즘**

      - 시간 복잡도 : `O(V)` (V = 노드의 수)
      - 현재 노드에 종속된 자식 노드(component의 children 속성)가 있으면 재귀적으로 방문합니다.
      - 모든 자식 노드를 방문한 후에, 노드를 `visited` 집합에 추가하고, `sorted` 배열에 저장됩니다.
      - 모든 노드를 모두 검사한 후의 `sorted` 배열이 컴포넌트의 렌더링 순서를 나타냅니다.
      - 예시)

        ```bash
        # 컴포넌트 의존성
        - Dashboard
            - Header
            - MainContent
              - PostList
              - PostDetails
            - Footer

        # 위상 정렬 알고리즘 실행 결과
        [  'UserMenu',
            'Header',
            'PostList',
            'PostDetails',
            'MainContent',
            'Footer',
            'Dashboard'
          ]
        ```

### 3.7.동적 컴포넌트 로딩

컴포넌트 코드 생성 과정에서, 자식 컴포넌트가 존재하는 경우 해당 자식 컴포넌트를 부모 컴포넌트에 import합니다.  
이 때, 자식 컴포넌트가 지연 로딩이 필요한 경우, `React.lazy()`를 사용해 동적으로 import하고, 자식 컴포넌트를 `<Suspense>`로 감싸서 추가합니다.

- **관련 모듈**
  - [generateDynamicState.ts](generateDynamicState) : 지연 로딩이 필요한 경우, 컴포넌트를 `<Suspense>`로 감싸고, 로딩 중일 때 표시할 내용을 포함하는 JSX 구문을 반환합니다.

### 3.8 오류 처리 및 경계 설정

###### - 잘못된 YAML 구성 파일에 대한 오류 처리

YAML 구성 파일이 잘못된 경우, 사용자가 문제를 쉽게 식별하고 수정할 수 있도록 명확한 오류 메세지를 제공하고, 에러 발생 시 명령어 실행을 종료합니다. 시스템 내 에러가 발생하면 `throw new Error`를 통해 에러를 발생 시키고, CLI 라이브러리인 Commander의 try-catch 블록을 통해 일괄 처리합니다.

1. **YAML 파서에서의 오류 처리**

- 에러 처리
  - YAML 구성 파일이 존재하지 않는 경우
  - YAML 구성 파일을 파싱할 때 에러가 발생한 경우
  - YAML 구성 파일 읽기 중 에러가 발생한 경우

2. **YAML 구성 요소 유효성 검사**

- 유효성 검사
  - 필수 필드 (`components`) 확인
  - 컴포넌트 필드 유효성 검증
  - 이벤트 필드 유효성 검증
  - 스타일 필드 유효성 검증

###### - 컴포넌트 생성 시 오류 처리

1. **파일 시스템 오류 처리**

   컴포넌트 파일을 생성할 때, 해당 경로에 이미 파일이 존재하는 경우, 에러를 발생시켜 중복 파일 생성을 방지합니다.

### 3.9 테스트

- **사용 기술**

  - [Jest](https://www.npmjs.com/package/jest) : Test 프레임워크

- [Unit Test](https://www.npmjs.com/package/jest)
  개별 모듈이나 함수가 예상대로 작동하는지 확인하기 위해 일부 함수에 Unit Test를 진행했습니다.
  - Unit Test 진행 함수
    - checkYamlValidation.ts
    - eventBus.ts
    - topologicalSort.ts
    - typeInference.ts
    - util.ts
    - yamlParser.ts
- Integration Test
  현재까지 진행된 테스트는 개별 함수와 모듈의 유닛 테스트에 한정되어 있으며, 전체 시스템의 통합 동작을 검증하는 통합 테스트는 포함되어 있지 않습니다.
