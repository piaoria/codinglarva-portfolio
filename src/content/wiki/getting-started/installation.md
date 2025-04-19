# 설치

이 섹션에서는 Next.js 프로젝트를 시작하기 위해 필요한 도구들을 설치하고 설정하는 방법을 알아보겠습니다.

## Node.js 설치

먼저 Node.js를 설치해야 합니다. Node.js는 JavaScript 런타임으로, Next.js 애플리케이션을 실행하는 데 필요합니다.

1. [Node.js 공식 웹사이트](https://nodejs.org/)에서 LTS 버전을 다운로드합니다.
2. 설치 프로그램을 실행하고 지시에 따라 설치를 완료합니다.
3. 설치가 완료되면 터미널에서 다음 명령어로 설치를 확인합니다:

```bash
node --version
npm --version
```

## 프로젝트 생성

Next.js 프로젝트를 생성하는 방법은 여러 가지입니다. 가장 간단한 방법은 `create-next-app`을 사용하는 것입니다:

```bash
npx create-next-app@latest my-app
```

프로젝트 생성 시 다음과 같은 옵션을 선택할 수 있습니다:

- TypeScript 사용 여부
- ESLint 설정
- Tailwind CSS 사용 여부
- `src/` 디렉토리 사용 여부
- App Router 사용 여부
- Import alias 설정

## 개발 서버 실행

프로젝트가 생성되면 개발 서버를 실행할 수 있습니다:

```bash
cd my-app
npm run dev
```

이제 `http://localhost:3000`에서 애플리케이션을 확인할 수 있습니다.

## 에디터 설정

추천하는 코드 에디터는 Visual Studio Code입니다. 다음 확장 프로그램을 설치하면 개발이 더 편리해집니다:

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense

## Git 설정

프로젝트를 Git으로 관리하려면 다음 명령어를 실행합니다:

```bash
git init
git add .
git commit -m "Initial commit"
```

## 추가 설정

### TypeScript 설정

TypeScript를 사용하는 경우, `tsconfig.json` 파일을 프로젝트 루트에 생성합니다:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
}
```

### ESLint 설정

ESLint를 사용하는 경우, `.eslintrc.json` 파일을 프로젝트 루트에 생성합니다:

```json
{
  "extends": "next/core-web-vitals"
}
```

## 다음 단계

이제 개발 환경이 준비되었습니다. 다음 섹션에서는 Next.js의 기본 개념을 알아보겠습니다. 