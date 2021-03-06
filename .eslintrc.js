module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'preact',
  ],
  rules: {
    'jest/valid-expect': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
