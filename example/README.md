# Yaml React Component Generator - Example 프로젝트

이 프로젝트는 react-yaml-component-generator 라이브러리의 실제 동작을 테스트하기 위한 예제 프로젝트입니다.

## 설치 및 사용법

Yaml React Component Generator의 동작을 직접 클라이언트에서 확인해볼 수 있도록 예제 프로젝트를 제공합니다.

### 1. yaml-react-component 빌드

```bash
# Root 레벨에서 yaml-react-component/src 내 코드 빌드
pnpm build
```

### 2. 예제 프로젝트 이동 & 의존성 설치

```bash
cd example
pnpm i
```

### 3. 명령어 실행

```bash
gcpt [options]
```

- 명령어를 실행하면 기본 YAML 파일에 기반한 컴포넌트를 `src/components` 위치에 생성합니다.

### 4. 컴포넌트 사용하기

예제 프로젝트의 App.tsx 파일에 기본 YAML 파일을 사용하여 생성된 <Dashboard> 컴포넌트가 이미 import 되어 있습니다. 필요에 따라 수정하여 사용하면 됩니다.

### 5. 예제 프로젝트 실행

```bash
pnpm dev
```
