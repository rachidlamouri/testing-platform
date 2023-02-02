// DatumInstanceTypeScriptConfiguration

import {
  DatumInstanceTypeScriptConfiguration,
  getDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';
import {
  CiYamlFileContents,
  CommentedSteps,
  CommentPlaceHolderKey,
} from './ciYamlFileContents';

export type ExpectedCiYamlFileContentsConfiguration = CiYamlFileContents<{
  beforePackageRunSteps: CommentedSteps;
  afterPackageRunSteps: CommentedSteps;
}>;

export type ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      TypeScriptSemanticsIdentifier.ExpectedCiYamlFileContentsConfiguration,
    ];
    datumInstanceIdentifier: 'expected-ci-yaml-file-contents-configuration';
    datumInstance: ExpectedCiYamlFileContentsConfiguration;
    datumInstanceAliases: [];
  }>;

const beforeCommentKey: CommentPlaceHolderKey = `COMMENT_PLACE_HOLDER:${'Pre-Package Steps'}`;
const afterCommentKey: CommentPlaceHolderKey = `COMMENT_PLACE_HOLDER:${'Post-Package Steps'}`;

export const CI_YAML_FILE_CONTENTS_CONFIGURATION_TYPE_SCRIPT_CONFIGURATION: ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration =
  {
    typeSemanticsIdentifiers: [
      TypeScriptSemanticsIdentifier.ExpectedCiYamlFileContentsConfiguration,
    ],
    datumInstanceIdentifier: 'expected-ci-yaml-file-contents-configuration',
    datumInstance: {
      name: 'Continuous Integration',
      on: ['push'],
      jobs: {
        'Continuous-Integration': {
          'runs-on': 'ubuntu-latest',
          steps: {
            beforePackageRunSteps: [
              {
                [beforeCommentKey]: '',
              },
              {
                name: 'Check Out Code',
                uses: 'actions/checkout@v3',
              },
              {
                name: 'Install Node',
                uses: 'actions/setup-node@v3',
                with: {
                  'node-version-file': '.nvmrc',
                },
              },
              {
                name: 'Install Dependencies',
                run: 'npm clean-install && cd packages/vscode-language-server/client && npm install && cd ../server && npm install',
              },
              {
                name: 'Lint Markdown',
                run: 'npm run lint:md',
              },
              {
                name: 'Lint TypeScript',
                run: 'npm run lint:ts:all',
              },
            ],
            afterPackageRunSteps: [
              {
                [afterCommentKey]: '',
              },
              {
                name: 'Lint Repository',
                run: 'npm run lint:repository',
              },
            ],
          },
        },
      },
    },
    datumInstanceAliases: [],
  };

export const buildExpectedCiYamlFileContentsConfiguration: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [];
  OutputCollection: [
    ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration,
  ];
}> = () => {
  return [
    getDatumInstanceConfiguration(
      CI_YAML_FILE_CONTENTS_CONFIGURATION_TYPE_SCRIPT_CONFIGURATION,
    ),
  ];
};
