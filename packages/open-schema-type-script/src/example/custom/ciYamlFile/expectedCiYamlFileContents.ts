import fs from 'fs';
import { posix } from 'path';
import {
  CiYamlFileContents,
  CiYamlFileContentsRunStep,
  CommentedSteps,
  CommentPlaceHolderKey,
} from './ciYamlFileContents';
import { Grition } from '../custom-constructs/grition';
import { Odeshin, ODESHIN_GEPP } from '../custom-constructs/odeshin';
import { Plifal } from '../custom-constructs/plifal';
import { OnamaEstinant } from '../../../core/estinant';
import {
  ExpectedCiYamlFileContentsConfigurationOdeshin,
  EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_GEPPP,
} from './expectedCiYamlFileContentsConfiguration';
import { TropoignantTypeName } from '../../../core/tropoignant';

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

export const expectedCiYamlFileContentsOnama: OnamaEstinant<
  ExpectedCiYamlFileContentsConfigurationOdeshin,
  [ExpectedCiYamlFileContentsPlifal]
> = {
  inputGepp: EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_GEPPP,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function buildExpectedCiYamlFileContents(inputOdeshin) {
      const odeshin: ExpectedCiYamlFileContentsOdeshin = {
        identifier: EXPECTED_CI_YAML_FILE_CONTENTS_IDENTIFIER,
        grition: {
          ...inputOdeshin.grition,
          jobs: {
            'Continuous-Integration': {
              'runs-on': 'ubuntu-latest',
              steps: [
                ...inputOdeshin.grition.jobs['Continuous-Integration'].steps
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
                ...inputOdeshin.grition.jobs['Continuous-Integration'].steps
                  .afterPackageRunSteps,
              ],
            },
          },
        },
      };

      const plifal: ExpectedCiYamlFileContentsPlifal = {
        geppTuple: [ODESHIN_GEPP, EXPECTED_CI_YAML_FILE_CONTENTS_GEPPP],
        hubblepup: odeshin,
      };

      return [plifal];
    },
  },
};
