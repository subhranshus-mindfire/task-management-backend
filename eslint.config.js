export const module = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier' 
  ],
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended', 
    'plugin:prettier/recommended' 
  ],
  env: {
    node: true,
    es2021: true 
  },
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript version
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json' // Path to your TypeScript configuration file
  },
  // Custom rules or overrides
  rules: {
    // Example: Disabling a specific rule
    // '@typescript-eslint/no-explicit-any': 'off',
    // Example: Enforcing a specific rule
    // 'indent': ['error', 2],
    // 'linebreak-style': ['error', 'unix'],
    // 'quotes': ['error', 'single'],
    // 'semi': ['error', 'always']
  }
};