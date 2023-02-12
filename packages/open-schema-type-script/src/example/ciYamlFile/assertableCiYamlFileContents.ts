import fs from 'fs';
import yaml from 'yaml';
import { Estinant2 } from '../../core/estinant';
import { Grition } from '../../type-script-adapter/grition';
import { Odeshin, ODESHIN_GEPP } from '../../type-script-adapter/odeshin';
import { Plifal } from '../../type-script-adapter/plifal';
import {
  ActualCiYamlFilePlifal,
  ACTUAL_CI_YAML_FILE_GEPPP,
} from './actualCiYamlFile';
import {
  ExpectedCiYamlFileContentsPlifal,
  EXPECTED_CI_YAML_FILE_CONTENTS_GEPPP,
} from './expectedCiYamlFileContents';

export const ASSERTABLE_CI_YAML_FILE_CONTENTS_IDENTIFIER =
  'assertable-ci-yaml-file-contents' as const;

export type AssertableCiYamlFileContentsIdentifier =
  typeof ASSERTABLE_CI_YAML_FILE_CONTENTS_IDENTIFIER;

export type AssertableCiYamlFileContents = {
  actualStringContents: string;
  expectedStringContents: string;
};

export type AssertableCiYamlFileContentsGrition =
  Grition<AssertableCiYamlFileContents>;

export type AssertableCiYamlFileContentsOdeshin = Odeshin<
  AssertableCiYamlFileContentsIdentifier,
  AssertableCiYamlFileContentsGrition
>;

export const ASSERTABLE_CI_YAML_FILE_CONTENTS_GEPPP = Symbol(
  ASSERTABLE_CI_YAML_FILE_CONTENTS_IDENTIFIER,
);

export type AssertableCiYamlFileContentsGepp =
  typeof ASSERTABLE_CI_YAML_FILE_CONTENTS_GEPPP;

export type AssertableCiYamlFileContentsPlifal = Plifal<
  [AssertableCiYamlFileContentsGepp],
  AssertableCiYamlFileContentsOdeshin
>;

// Each input collection only has one item, so any arbitrary Zorn will do
const CI_YAML_FILE_JOIN_ID = Symbol('ci-yaml-file');
export const assertableCiYamlFileCortmumEstinant: Estinant2<
  [ActualCiYamlFilePlifal, ExpectedCiYamlFileContentsPlifal],
  typeof CI_YAML_FILE_JOIN_ID
> = {
  inputGeppTuple: [
    ACTUAL_CI_YAML_FILE_GEPPP,
    EXPECTED_CI_YAML_FILE_CONTENTS_GEPPP,
  ],
  croard: function getZorn() {
    return CI_YAML_FILE_JOIN_ID;
  },
  tropoig: function merge(actual, expected) {
    const actualStringContents: string = fs.readFileSync(
      actual.hubblepup.grition.filePath,
      'utf8',
    );

    const expectedStringContentsWithPlaceholders = yaml.stringify(
      expected.hubblepup.grition,
    );

    // TODO: learn how to properly manage comments with the yaml library and remove this hack
    const expectedStringContents =
      expectedStringContentsWithPlaceholders.replaceAll(
        /( +)- COMMENT_PLACE_HOLDER:([^:]+): ""/g,
        '\n$1# $2',
      );

    const output: AssertableCiYamlFileContentsPlifal = {
      geppTuple: [ODESHIN_GEPP, ASSERTABLE_CI_YAML_FILE_CONTENTS_GEPPP],
      hubblepup: {
        identifier: ASSERTABLE_CI_YAML_FILE_CONTENTS_IDENTIFIER,
        grition: {
          actualStringContents,
          expectedStringContents,
        },
      },
    };

    return [output];
  },
};
