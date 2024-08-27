# Yaml React Component Generator

![Safari](https://github.com/user-attachments/assets/914be4b6-41fe-4e8c-9542-e86a083cb2c1)

## 개요

Yaml React Component Generator는 YAML 구성 파일을 통해 React 컴포넌트 생성 프로세스를 간소화하는 Command-line tool입니다. 이 도구는 복잡한 YAML 구조를 파싱하고, YAML 파일을 기반으로 TypeScript 타입을 추론하여 적절한 props와 상태를 가진 React 컴포넌트를 생성합니다. 또한 컴포넌트 간의 통신을 위한 구독 / 발행 이벤트 시스템을 구현하고, 동적 컴포넌트 로딩, 의존성 분석을 지원합니다.

## 코딩 챌린지 제출물

- 제공된 YAML 예제를 기반으로 생성된 React 컴포넌트 코드 : [src/components](https://github.com/younyikim/yaml-react-component/tree/main/src/components)

---

## 주요 기능

- **YAML Parser**
  - 컴포넌트 구조, props, 상태 및 관계를 정의하는 YAML 파일을 파싱하여 컴포넌트 구조를 정의합니다.
- **React 컴포넌트 생성기**
  - YAML 구성에 기반하여 TypeScript 타입이 포함된 함수형 React 컴포넌트를 생성합니다.
- **타입 추론 시스템**
  - YAML 구성 파일을 기반으로 TypeScript 타입을 자동으로 추론하여 인터페이스 및 타입 정의를 생성합니다.
- **Pub / Sub 이벤트 시스템**
  - 컴포넌트 간의 이벤트 기반 통신을 위해 이벤트 발행, 이벤트 구독 시스템을 구현했습니다.
- **의존성 분석기**
  - 위상 정렬을 구현하여 컴포넌트 간 의존성을 분석하고, 최적의 렌더링 순서를 결정합니다.
- **동적 컴포넌트 로딩**
  - YAML 구성 파일을 기반으로 지연 로딩이 필요한 컴포넌트를 `React.lazy()`와 `Suspense`를 사용하여 처리합니다.

## Demo

https://github.com/user-attachments/assets/cd05108a-c711-49f2-bd47-7a1392529f36

---

## 폴더 구조

```bash
📦 react-yaml-component-generator/
├── package.json             # 프로젝트 설정 파일 및 스크립트
├── src/                     # 주요 소스 코드 디렉토리
│   ├── cli.ts               # CLI 엔트리 포인트
│   ├── components/          # 생성된 React 컴포넌트 디렉토리
│   ├── config/              # YAML 구성 파일
│   ├── generators/          # 컴포넌트 및 상태 생성 관련 함수들
│   ├── tests/               # 테스트 파일 디렉토리
│   ├── types/               # 타입 정의 파일
│   └── utils/               # 유틸리티 함수
└── example/                 # 예제 프로젝트 디렉토리
    └── src/                 # 예제 소스 코드
        └── components/      # 예제 프로젝트에서 생성된 React 컴포넌트 디렉토리
```

---

## 설치 및 사용법

###### 1. 설치

```bash
git clone https://github.com/younyikim/yaml-react-component.git
cd yaml-react-component
pnpm i
```

###### 2. YAML 구성 파일 작성

프로젝트의 `src/config` 디렉토리를 생성하고, YAML 구성 파일을 작성합니다.

예시 YAML 파일 : [sample-config.yaml](https://github.com/younyikim/yaml-react-component/blob/main/src/config/sample-config.yaml)

---

## 프로젝트 실행

이 프로젝트는 2가지 방법으로 실행할 수 있습니다.

#### 1. Commnad Line으로 프로젝트 실행하기

이 프로젝트에서는 `gcpt`라는 CLI 명령어를 제공합니다. 이 명령어를 사용하여 YAML 파일을 기반으로 React 컴포넌트를 생성할 수 있습니다.

**사용 방법**

###### 1. 프로젝트 빌드

```bash
pnpm build
```

###### 2. 프로젝트 전역 설치

```bash
npm i -g
```

###### 3. `gcpt` 명령어 실행

```bash
gcpt [options]
```

###### 옵션

- `-f, --file <path>` : YAML 파일의 경로를 지정합니다. 기본값은 ./src/config/sample-config.yaml입니다.
- `-d, --outDir <path>` : 생성된 컴포넌트의 출력 디렉토리를 지정합니다. 기본값은 ./src/components입니다.
- `-t, --types <path>` : 생성된 컴포넌트의 TypeScript 타입 파일이 저장될 경로를 지정합니다. 기본값은 ./src/components/types입니다.

#### 2. 개발 환경에서 프로젝트 실행하기

전역 설치를 원하지 않는 경우, 프로젝트 디렉토리 내에서 직접 실행할 수 있습니다.

###### 1. 프로젝트 실행

```bash
pnpm dev
```

- `dev` 명령어는 TypeScript로 작성된 원본 파일(src/cli.ts)을 직접 실행하기 때문에, 빌드 과정이 필요하지 않습니다.

---

## 예제 프로젝트

Yaml React Component Generator의 동작을 직접 클라이언트에서 확인해볼 수 있도록 예제 프로젝트를 제공합니다.

예제 프로젝트 : [example 바로가기](https://github.com/younyikim/yaml-react-component/tree/main/example)

###### 1. 의존성 설치

```bash
cd example
pnpm i
```

###### 2. 명령어 실행

```bash
gcpt [options]
```

- 명령어를 실행하면 기본 YAML 파일에 기반한 컴포넌트를 `src/components` 위치에 생성합니다.

###### 3. 컴포넌트 사용하기

기본 YAML 파일을 사용해 생성된 `<Dashboard>` 컴포넌트를 App.tsx 파일에 import하여 컴포넌트의 동작을 확인합니다.

```js
// App.tsx
import Dashboard from "../components/dashboard";

...

return (
  <Dashboard />
);
```

###### 4. 예제 프로젝트 실행

```bash
pnpm dev
```

## 주요 의존성

이 프로젝트는 다음과 같은 주요 의존성에 의존하고 있습니다:

- **[typescript](https://www.npmjs.com/package/typescript)**
- **[commander](https://www.npmjs.com/package/commander)**: CLI 명령어를 쉽게 작성할 수 있게 도와주는 라이브러리.
- **[fs-extra](https://www.npmjs.com/package/fs-extra)**: Node.js 파일 시스템 작업을 위한 유틸리티 라이브러리.
- **[jest](https://www.npmjs.com/package/jest)**: JavaScript 테스트 프레임워크.
- **[js-yaml](https://www.npmjs.com/package/js-yaml)**: YAML 파일을 파싱하고 생성하는 라이브러리.
- **[tsc-alias](https://www.npmjs.com/package/tsc-alias)**: TypeScript 컴파일 시 경로 별칭을 처리하는 도구.
- **[tsx](https://www.npmjs.com/package/tsx)**: TypeScript 및 JSX/TSX 파일을 실행할 수 있는 도구.
