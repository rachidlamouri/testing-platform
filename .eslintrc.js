const fs = require('fs');
const { posix } = require('path');

module.exports = {
  overrides: [
    {
      files: './**/*.js',
      extends: [
        'airbnb-base',
        'plugin:prettier/recommended',
        'plugin:eslint-comments/recommended',
      ],
      plugins: ['prettier', 'unicorn'],
    },
    {
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'plugin:eslint-comments/recommended',
      ],
      plugins: ['@typescript-eslint', 'prettier', 'unicorn'],
      files: './**/*.ts',
      rules: {
        '@typescript-eslint/no-use-before-define': [
          'error',
          { enums: true, ignoreTypeReferences: false, typedefs: true },
        ],
        'import/prefer-default-export': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        'consistent-return': 'off',
        'default-case': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        'no-use-before-define': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: fs
          .readdirSync('packages')
          .map((directoryName) =>
            posix.join(__dirname, 'packages', directoryName, 'tsconfig.json'),
          ),
      },
    },
  ],
};
