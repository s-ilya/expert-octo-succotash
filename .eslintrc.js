module.exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'script',
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {},
};
