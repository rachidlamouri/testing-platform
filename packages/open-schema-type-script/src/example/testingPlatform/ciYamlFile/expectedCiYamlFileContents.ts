import fs from 'fs';
import { posix } from 'path';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifer';
import { ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration } from './expectedCiYamlFileContentsConfiguration';
import {
  CiYamlFileContents,
  CiYamlFileContentsCommentPlaceHolder,
  CiYamlFileContentsStep,
  CommentedSteps,
  CommentPlaceHolderKey,
} from './ciYamlFileContents';

export type ExpectedCiYamlFileContents = CiYamlFileContents<
  [...CommentedSteps]
>;

export type ExpectedCiYamlFileContentsTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifier: TypeScriptSemanticsIdentifier.ExpectedCiYamlFileContents;
    datumInstanceIdentifier: 'expected-ci-yaml-file-contents';
    datumInstance: ExpectedCiYamlFileContents;
  }>;

export const buildExpectedCiYamlContents: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
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
                  ({
                    directoryName,
                    directoryPath,
                  }): [
                    CiYamlFileContentsCommentPlaceHolder,
                    CiYamlFileContentsStep,
                  ] => {
                    const runTestsScriptPath = posix.join(
                      directoryPath,
                      'scripts',
                      'runTests.sh',
                    );

                    const commentPlaceHolderKey: CommentPlaceHolderKey = `COMMENT_PLACE_HOLDER:${directoryName}`;

                    return [
                      {
                        [commentPlaceHolderKey]: '',
                      },
                      {
                        name: `Run ${directoryName} Tests`,
                        run: `bash ${runTestsScriptPath}`,
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
    };

  return [outputConfiguration];
};
