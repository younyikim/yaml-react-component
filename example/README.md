# Yaml React Component Generator - Example 프로젝트

이 프로젝트는 react-yaml-component-generator 라이브러리의 실제 동작을 테스트하기 위한 예제 프로젝트입니다.   

더 자세한 내용은 [메인 프로젝트의 README.md](https://github.com/younyikim/yaml-react-component)를 참조하세요.

## 설치 및 사용법

### 1. yaml-react-component 빌드

```bash
# Root 레벨에서 yaml-react-component/src 내 코드 빌드
pnpm build
```

### 2. 의존성 설치

```bash
cd example
pnpm i
```

### 3. YAML 파일 기반으로 컴포넌트 생성
```bash
gcpt [options]
```
###### 옵션

- `-f, --file <path>` : YAML 파일의 경로를 지정합니다. 기본값은 ./src/config/sample-config.yaml입니다.
- `-d, --outDir <path>` : 생성된 컴포넌트의 출력 디렉토리를 지정합니다. 기본값은 ./src/components입니다.


### 4. 프로젝트 실행

```bash
pnpm dev
```
