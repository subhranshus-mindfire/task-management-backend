
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import security from 'eslint-plugin-security';
import promise from 'eslint-plugin-promise';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      security,
      promise,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',
      'promise/no-nesting': 'warn',
      'promise/no-return-wrap': 'error',
      'security/detect-object-injection': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },
];
