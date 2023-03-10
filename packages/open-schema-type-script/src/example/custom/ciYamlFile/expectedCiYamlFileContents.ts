import fs from 'fs';
import { posix } from 'path';
import {
  CiYamlFileContents,
  CiYamlFileContentsRunStep,
  CommentedSteps,
  CommentPlaceHolderKey,
} from './ciYamlFileContents';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import {
  ExpectedCiYamlFileConfigurationPlifal,
  EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_GEPPP,
} from './expectedCiYamlFileContentsConfiguration';
import { buildOnamaHamletive } from '../../../type-script-adapter/hamletive/onama';

export const EXPECTED_CI_YAML_FILE_CONTENTS_IDENTIFIER =
  'expected-ci-yaml-file-contents' as const;

export type ExpectedCiYamlFileIdentifier =
  typeof EXPECTED_CI_YAML_FILE_CONTENTS_IDENTIFIER;

export type ExpectedCiYamlFileContents = CiYamlFileContents<
  [...CommentedSteps]
>;

export type ExpectedCiYamlFileContentsGrition =
  Grition<ExpectedCiYamlFileContents>;

export type ExpectedCiYamlFileContentsOdeshin = Odeshin<
  ExpectedCiYamlFileIdentifier,
  ExpectedCiYamlFileContentsGrition
>;

export const EXPECTED_CI_YAML_FILE_CONTENTS_GEPPP = Symbol(
  EXPECTED_CI_YAML_FILE_CONTENTS_IDENTIFIER,
);

export type ExpectedCiYamlFileContentsGepp =
  typeof EXPECTED_CI_YAML_FILE_CONTENTS_GEPPP;

export type ExpectedCiYamlFileContentsPlifal = Plifal<
  [ExpectedCiYamlFileContentsGepp],
  ExpectedCiYamlFileContentsOdeshin
>;

export const expectedCiYamlFileContentsOnama = buildOnamaHamletive<
  ExpectedCiYamlFileConfigurationPlifal,
  ExpectedCiYamlFileContentsPlifal
>({
  inputGepp: EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_GEPPP,
  ankel: function buildExpectedCiYamlFileContents(
    input: ExpectedCiYamlFileConfigurationPlifal,
  ): ExpectedCiYamlFileContentsPlifal {
    const odeshin: ExpectedCiYamlFileContentsOdeshin = {
      identifier: EXPECTED_CI_YAML_FILE_CONTENTS_IDENTIFIER,
      grition: {
        ...input.hubblepup.grition,
        jobs: {
          'Continuous-Integration': {
            'runs-on': 'ubuntu-latest',
            steps: [
              ...input.hubblepup.grition.jobs['Continuous-Integration'].steps
                .beforePackageRunSteps,
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
              ...input.hubblepup.grition.jobs['Continuous-Integration'].steps
                .afterPackageRunSteps,
            ],
          },
        },
      },
    };

    const plifal: ExpectedCiYamlFileContentsPlifal = {
      geppTuple: [EXPECTED_CI_YAML_FILE_CONTENTS_GEPPP],
      hubblepup: odeshin,
    };

    return plifal;
  },
});
