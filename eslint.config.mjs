import antfu from '@antfu/eslint-config'; // 혹은 기존에 상단에 import되어 있는 패키지들을 그대로 유지하셔도 됩니다.
// 보통 NestJS 최신 버전에서는 아래 패키지들을 가져옵니다.
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended, // Prettier 충돌 방지 및 연동
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // 규칙(Rules)을 커스텀하는 공간입니다.
    rules: {
      // NestJS 인터페이스/DTO 구조상 리턴 타입을 추론하도록 허용 (Off)
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // 임시로 any 타입 허용 (필요에 따라 'warn' 또는 'error'로 변경 가능)
      '@typescript-eslint/no-explicit-any': 'off',

      // 사용하지 않는 변수는 경고를 주되, 밑줄(_)로 시작하면 예외 처리
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      // 의존성 주입(DI)을 위해 비어있는 생성자(Constructor) 몸체 허용
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  {
    // 검사에서 제외할 폴더나 파일들 지정
    ignores: ['eslint.config.mjs', 'dist/**'],
  },
);
