import fs from 'fs';
import yaml from 'yaml';
import { Zorn } from '../../../core/zorn';
import {
  buildCortmumHamletive,
  Cortmum,
  CortmumCroader,
} from '../../../type-script-adapter/hamletive/cortmum';
import { QuirmOptionTupleTuple } from '../../../type-script-adapter/quirmOptionTuple';
import { Grition } from '../custom-constructs/grition';
import { Odeshin } from '../custom-constructs/odeshin';
import { Plifal } from '../custom-constructs/plifal';
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

type InputQuirmOptionTupleTuple = QuirmOptionTupleTuple<
  [[ActualCiYamlFilePlifal], [ExpectedCiYamlFileContentsPlifal]]
>;
type OutputQuirmOptionTupleTuple = QuirmOptionTupleTuple<
  [[AssertableCiYamlFileContentsPlifal]]
>;

type InputZorn = Zorn;

// Each input collection only has one item, so any arbitrary Zorn will do
const CI_YAML_FILE_ZORN = Symbol('ci-yaml-file');
const croard: CortmumCroader<InputQuirmOptionTupleTuple, InputZorn> = () => {
  return CI_YAML_FILE_ZORN;
};

const buildAssertableCiYamlFileContents: Cortmum<
  InputQuirmOptionTupleTuple,
  OutputQuirmOptionTupleTuple
> = (actual, expected) => {
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
    geppTuple: [ASSERTABLE_CI_YAML_FILE_CONTENTS_GEPPP],
    hubblepup: {
      identifier: ASSERTABLE_CI_YAML_FILE_CONTENTS_IDENTIFIER,
      grition: {
        actualStringContents,
        expectedStringContents,
      },
    },
  };

  return [output];
};

export const assertableCiYamlFileCortmumEstinant = buildCortmumHamletive<
  InputQuirmOptionTupleTuple,
  OutputQuirmOptionTupleTuple,
  InputZorn
>({
  inputGeppTuple: [
    ACTUAL_CI_YAML_FILE_GEPPP,
    EXPECTED_CI_YAML_FILE_CONTENTS_GEPPP,
  ],
  croard,
  tropoig: buildAssertableCiYamlFileContents,
});
