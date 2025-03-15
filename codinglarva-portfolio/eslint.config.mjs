import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier"; // Prettier 플러그인 추가
import prettierConfig from "eslint-config-prettier"; // Prettier 설정 추가

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      prettier: prettierPlugin,
    },
    settings: {
      jest: {
        version: 29,
      },
    },
    rules: {
      ...prettierConfig.rules, // Prettier 설정 적용
      semi: ["error", "always"], // 세미콜론 강제 사용
      quotes: ["error", "double"], // 큰따옴표 강제 사용
      "prettier/prettier": ["error", { endOfLine: "lf" }], // Prettier 스타일 강제 적용
    },
    languageOptions: {
      globals: {
        jest: true, // Jest 전역 변수 허용
      },
    },
  },
];

export default eslintConfig;
