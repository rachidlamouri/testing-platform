// DatumInstanceTypeScriptConfiguration

import fs from 'fs';
import { posix } from 'path';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';
import { ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration } from './expectedCiYamlFileContentsConfiguration';
import {
  CiYamlFileContents,
  CiYamlFileContentsRunStep,
  CommentedSteps,
  CommentPlaceHolderKey,
} from './ciYamlFileContents';

export type ExpectedCiYamlFileContents = CiYamlFileContents<
  [...CommentedSteps]
>;

export type ExpectedCiYamlFileContentsDatumInstanceIdentifier =
  'expected-ci-yaml-file-contents';

// TODO: make the comment file configurable so that we don't need this placeholder
export type ExpectedCiYamlFileContentsDatumInstanceAlias = symbol;

export type ExpectedCiYamlFileContentsTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      TypeScriptSemanticsIdentifier.ExpectedCiYamlFileContents,
    ];
    datumInstanceIdentifier: ExpectedCiYamlFileContentsDatumInstanceIdentifier;
    datumInstance: ExpectedCiYamlFileContents;
    datumInstanceAliases: [];
  }>;

export const buildExpectedCiYamlFileContents: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [
    ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration,
  ];
  OutputCollection: [ExpectedCiYamlFileContentsTypeScriptConfiguration];
}> = (inputConfiguration) => {
  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<ExpectedCiYamlFileContentsTypeScriptConfiguration> =
    {
      predicateIdentifiers: [
        TypeScriptSemanticsIdentifier.ExpectedCiYamlFileContents,
      ],
      instanceIdentifier: 'expected-ci-yaml-file-contents',
      datumInstance: {
        ...inputConfiguration.datumInstance,
        jobs: {
          'Continuous-Integration': {
            'runs-on': 'ubuntu-latest',
            steps: [
              ...inputConfiguration.datumInstance.jobs['Continuous-Integration']
                .steps.beforePackageRunSteps,
              // TODO: separate concerns for this logic once we can aggregate multiple targets into one
              ...fs
                .readdirSync('packages')
                .map((directoryName) => ({
                  directoryName,
                  directoryPath: posix.join('packages', directoryName),
                }))
                .flatMap(
                  ({ directoryName, directoryPath }): [...CommentedSteps] => {
                    const runTestsScriptPath = posix.join(
                      directoryPath,
                      'scripts',
                      'runTests.sh',
                    );

                    const commentPlaceHolderKey: CommentPlaceHolderKey = `COMMENT_PLACE_HOLDER:${directoryName}`;

                    // TODO: either use the testing-platform configuration object in package.json to control this or check the file system to control this
                    const typeCheckStep: [CiYamlFileContentsRunStep] | [] =
                      directoryName !== 'base-tsconfig' &&
                      directoryName !== 'vscode-language-server'
                        ? [
                            {
                              name: `Lint ${directoryName} Types`,
                              run: `pwd && cd packages/${directoryName} && pwd && npx tsc`,
                            },
                          ]
                        : [];

                    return [
                      {
                        [commentPlaceHolderKey]: '',
                      },
                      ...typeCheckStep,
                      {
                        name: `Run ${directoryName} Tests`,
                        run: `pwd && bash ${runTestsScriptPath}`,
                      },
                    ];
                  },
                ),
              ...inputConfiguration.datumInstance.jobs['Continuous-Integration']
                .steps.afterPackageRunSteps,
            ],
          },
        },
      },
      aliases: [],
    };

  return [outputConfiguration];
};
