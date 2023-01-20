import fs from 'fs';
import { posix } from 'path';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifer';
import {
  CiYamlFileContents,
  CiYamlFileContentsRunStep,
  CiYamlFileContentsStep,
  ExpectedCiYamlFileContentsConfigurationTypeScriptConfiguration,
} from './expectedCiYamlFileContentsConfiguration';

export type ExpectedCiYamlFileContents = CiYamlFileContents<
  CiYamlFileContentsStep[]
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
                .map(
                  ({
                    directoryName,
                    directoryPath,
                  }): CiYamlFileContentsRunStep => {
                    const runTestsScriptPath = posix.join(
                      directoryPath,
                      'scripts',
                      'runTests.sh',
                    );

                    return {
                      name: `Run ${directoryName} Tests`,
                      run: `bash ${runTestsScriptPath}`,
                    };
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
