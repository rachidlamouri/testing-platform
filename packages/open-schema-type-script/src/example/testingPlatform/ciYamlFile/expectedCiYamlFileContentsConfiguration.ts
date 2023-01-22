import {
  DatumInstanceTypeScriptConfiguration,
  getDatumInstanceConfiguration,
  RootDatumInstanceTypeScriptConfiguration,
} from '../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifer';
import {
  CiYamlFileContents,
  CiYamlFileContentsStep,
} from './ciYamlFileContents';

export type ExpectedCiYamlFileContentsConfiguration = CiYamlFileContents<{
  beforePackageRunSteps: CiYamlFileContentsStep[];
  afterPackageRunSteps: CiYamlFileContentsStep[];
}>;

export type ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifier: TypeScriptSemanticsIdentifier.ExpectedCiYamlFileContentsConfiguration;
    datumInstanceIdentifier: 'expected-ci-yaml-file-contents-configuration';
    datumInstance: ExpectedCiYamlFileContentsConfiguration;
  }>;

export const CI_YAML_FILE_CONTENTS_CONFIGURATION_TYPE_SCRIPT_CONFIGURATION: ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration =
  {
    typeSemanticsIdentifier:
      TypeScriptSemanticsIdentifier.ExpectedCiYamlFileContentsConfiguration,
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
                run: 'npm clean-install',
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
                name: 'Lint Repository',
                run: 'npm run lint:repository',
              },
            ],
          },
        },
      },
    },
  };

export const buildExpectedCiYamlFileContentsConfiguration: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [RootDatumInstanceTypeScriptConfiguration];
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
