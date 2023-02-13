import { Grition } from '../custom-constructs/grition';
import { Odeshin, ODESHIN_GEPP } from '../custom-constructs/odeshin';
import { Plifal } from '../custom-constructs/plifal';
import {
  CiYamlFileContents,
  CommentedSteps,
  CommentPlaceHolderKey,
} from './ciYamlFileContents';

export const EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_IDENTIFIER =
  'expected-ci-yaml-file-contents-configuration' as const;

export type ExpectedCiYamlFileContentsConfigurationIdentifier =
  typeof EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_IDENTIFIER;

export type ExpectedCiYamlFileContentsConfiguration = CiYamlFileContents<{
  beforePackageRunSteps: CommentedSteps;
  afterPackageRunSteps: CommentedSteps;
}>;

export type ExpectedCiYamlFileContentsConfigurationGrition =
  Grition<ExpectedCiYamlFileContentsConfiguration>;

export type ExpectedCiYamlFileContentsConfigurationOdeshin = Odeshin<
  ExpectedCiYamlFileContentsConfigurationIdentifier,
  ExpectedCiYamlFileContentsConfigurationGrition
>;

export const EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_GEPPP = Symbol(
  EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_IDENTIFIER,
);

export type ExpectedCiYamlFileConfigurationGepp =
  typeof EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_GEPPP;

export type ExpectedCiYamlFileConfigurationQuirm = Plifal<
  [ExpectedCiYamlFileConfigurationGepp],
  ExpectedCiYamlFileContentsConfigurationOdeshin
>;

const beforeCommentKey: CommentPlaceHolderKey = `COMMENT_PLACE_HOLDER:${'Pre-Package Steps'}`;
const afterCommentKey: CommentPlaceHolderKey = `COMMENT_PLACE_HOLDER:${'Post-Package Steps'}`;

export const EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_QUIRM: ExpectedCiYamlFileConfigurationQuirm =
  {
    geppTuple: [
      ODESHIN_GEPP,
      EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_GEPPP,
    ],
    hubblepup: {
      identifier: EXPECTED_CI_YAML_FILE_CONTENTS_CONFIGURATION_IDENTIFIER,
      grition: {
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
    },
  };
