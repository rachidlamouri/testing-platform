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
      files: ['./**/*.ts', './**/*.tsx'],
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
        'max-classes-per-file': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
        'func-names': 'off',
        'import/extensions': 'off',
        'class-methods-use-this': 'off',
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [
          ...fs
            .readdirSync('packages')
            .filter(
              (directoryName) => directoryName !== 'vscode-language-server',
            )
            .map((directoryName) =>
              posix.join(__dirname, 'packages', directoryName, 'tsconfig.json'),
            ),
          posix.join(
            __dirname,
            'packages/mdd-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/tsconfig.json',
          ),
          posix.join(
            __dirname,
            'packages/mdd-engine/src/adapted-programs/programs/model-programs/app/tsconfig.json',
          ),
          posix.join(
            __dirname,
            'packages',
            'vscode-language-server',
            'client',
            'tsconfig.json',
          ),
          posix.join(
            __dirname,
            'packages',
            'vscode-language-server',
            'server',
            'tsconfig.json',
          ),
        ],
      },
    },
    {
      files: './packages/open-schema-type-script/src/**/*.ts',
      plugins: ['jsdoc'],
      extends: ['plugin:jsdoc/recommended'],
      rules: {
        'jsdoc/check-indentation': 'warn',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-returns-type': 'off',
      },
    },
  ],
};
