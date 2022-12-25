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
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: posix.join(__dirname, 'tsconfig.json'),
      },
    },
  ],
};
