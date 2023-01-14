import fs from 'fs';
import { posix } from 'path';
import { DerivedReferenceBuilder } from '../../../types/builders/deprecatedDerivedReferenceBuilder';
import { TargetTypeId } from '../targetTypeIds';
import {
  CiYamlFileContentsConfigurationTypedTarget,
  CiYamlFileContentsRunStep,
  CiYamlFileTargetPath,
} from './ciYamlFileContentsConfigurationTarget';
import {
  ExpectedCiYamlFileContentsTarget,
  ExpectedCiYamlFileContentsTypedTarget,
} from './expectedCiYamlFileContentsTarget';

export const buildExpectedCiYamlFileContentsReference: DerivedReferenceBuilder<
  CiYamlFileContentsConfigurationTypedTarget,
  CiYamlFileTargetPath,
  [ExpectedCiYamlFileContentsTypedTarget],
  [CiYamlFileTargetPath]
> = (inputReference) => {
  const { path } = inputReference;

  const outputInstance: ExpectedCiYamlFileContentsTarget = {
    ...inputReference.instance,
    jobs: {
      'Continuous-Integration': {
        'runs-on': 'ubuntu-latest',
        steps: [
          ...inputReference.instance.jobs['Continuous-Integration'].steps
            .beforePackageRunSteps,
          // TODO: separate concerns for this logic once we can aggregate multiple targets into one
          ...fs
            .readdirSync('packages')
            .map((directoryName) => ({
              directoryName,
              directoryPath: posix.join('packages', directoryName),
            }))
            .map(
              ({ directoryName, directoryPath }): CiYamlFileContentsRunStep => {
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
          ...inputReference.instance.jobs['Continuous-Integration'].steps
            .afterPackageRunSteps,
        ],
      },
    },
  };

  return [
    {
      typeId: TargetTypeId.ExpectedCiYamlFileContentsTarget,
      instance: outputInstance,
      path,
    },
  ];
};
