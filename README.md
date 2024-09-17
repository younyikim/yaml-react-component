# Yaml React Component Generator

![Safari](https://github.com/user-attachments/assets/914be4b6-41fe-4e8c-9542-e86a083cb2c1)

## 개요

Yaml React Component Generator는 YAML 구성 파일을 통해 React 컴포넌트 생성 프로세스를 간소화하는 Command-line tool입니다. 이 도구는 복잡한 YAML 구조를 파싱하고, YAML 파일을 기반으로 TypeScript 타입을 추론하여 적절한 props와 상태를 가진 React 컴포넌트를 생성합니다. 또한 컴포넌트 동적 컴포넌트 로딩, 의존성 분석을 지원합니다.

---

## 주요 기능

- **YAML Parser**
  YAML 파일을 파싱하여 컴포넌트의 구조, props, 상태 및 관계를 정의합니다.

- **React 컴포넌트 생성기**
  YAML 파일에 기반한 TypeScript 타입을 포함한 함수형 React 컴포넌트를 자동으로 생성합니다.

- **타입 추론 시스템**
  YAML 파일로부터 TypeScript 타입을 추론하고 인터페이스 및 타입 정의를 생성합니다.

- **의존성 분석**
  위상 정렬을 통해 컴포넌트 간의 의존성을 분석하여 최적의 렌더링 순서를 결정합니다.

- **동적 컴포넌트 로딩**
  React.lazy() 및 Suspense를 사용하여 지연 로딩이 필요한 컴포넌트를 처리합니다.

- **오류 처리**
  잘못된 YAML 파일에 대해 명확한 오류 메시지를 제공하고, 컴포넌트 파일 생성 시 적절한 오류 처리를 수행합니다.

[📓 시스템 아키텍처 및 주요 결정 사항 Docs 바로가기 >>](https://github.com/younyikim/yaml-react-component/blob/main/docs/SYSTEM.md)

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

### 1. 설치

프로젝트에 라이브러리를 설치하려면 아래 명령어를 사용하세요.

```bash
# npm 사용
npm install yaml-react-component

# pnpm 사용
pnpm install yaml-react-component
```

### 2. YAML 구성 파일 작성

React 컴포넌트를 생성하려면 YAML 구성 파일을 작성해야 합니다. 기본적으로 gcpt 명령어는 `src/config/config.yaml` 위치의 YAML 파일을 읽습니다.

CLI 명령어 옵션을 사용하여 YAML 파일의 경로를 직접 지정할 수도 있습니다. `-f` 또는 `--file` 옵션을 사용하면 다른 위치의 YAML 파일을 지정할 수 있습니다.

예시 YAML 파일 : [config.yaml](https://github.com/younyikim/yaml-react-component/blob/main/src/config/config.yaml)

### 3. 프로젝트 실행

YAML 파일을 기반으로 컴포넌트를 생성하려면 CLI 명령어인 gcpt를 사용합니다.

```bash
npx gcpt [options]
```

###### 옵션

- `-f, --file <path>` : YAML 구성 파일의 경로를 지정합니다. 기본값은 `src/config/config.yaml`입니다.

  ```bash
  # 예시
  npx gcpt -f ./my-config/custom-config.yaml
  ```

- `-d, --outDir <path>` : 생성된 컴포넌트의 출력 디렉토리를 지정합니다. 기본값은 `src/components`입니다.
  ```bash
  # 예시
  npx gcpt -f ./src/config/sample-config.yaml -d ./src/generatedComponents
  ```

---

## 주요 의존성

이 프로젝트는 다음과 같은 주요 의존성에 의존하고 있습니다:

- **[typescript](https://www.npmjs.com/package/typescript)**
- **[commander](https://www.npmjs.com/package/commander)**: CLI 명령어를 쉽게 작성할 수 있게 도와주는 라이브러리.
- **[fs-extra](https://www.npmjs.com/package/fs-extra)**: Node.js 파일 시스템 작업을 위한 유틸리티 라이브러리.
- **[jest](https://www.npmjs.com/package/jest)**: JavaScript 테스트 프레임워크.
- **[js-yaml](https://www.npmjs.com/package/js-yaml)**: YAML 파일을 파싱하고 생성하는 라이브러리.
- **[tsc-alias](https://www.npmjs.com/package/tsc-alias)**: TypeScript 컴파일 시 경로 별칭을 처리하는 도구.
- **[tsx](https://www.npmjs.com/package/tsx)**: TypeScript 및 JSX/TSX 파일을 실행할 수 있는 도구.
