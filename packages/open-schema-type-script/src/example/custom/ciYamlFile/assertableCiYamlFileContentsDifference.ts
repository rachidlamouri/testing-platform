import assert from 'assert';
import { OnamaEstinant } from '../../../core/estinant';
import { TropoignantTypeName } from '../../../core/tropoignant';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import {
  AssertableCiYamlFileContentsOdeshin,
  ASSERTABLE_CI_YAML_FILE_CONTENTS_GEPPP,
} from './assertableCiYamlFileContents';

export const ASSERTABLE_CI_YAML_FILE_CONTENTS_DIFFERENCE_IDENTIFIER =
  'assertable-ci-yaml-file-contents-difference' as const;

export type AssertableCiYamlFileContentsDifferenceIdentifier =
  typeof ASSERTABLE_CI_YAML_FILE_CONTENTS_DIFFERENCE_IDENTIFIER;

export type AssertableCiYamlFileContentsDifference =
  | { isSame: true; errorMessage: null }
  | { isSame: false; errorMessage: string };

export type AssertableCiYamlFileContentsDifferenceGrition =
  Grition<AssertableCiYamlFileContentsDifference>;

export type AssertableCiYamlFileContentsDifferenceOdeshin = Odeshin<
  AssertableCiYamlFileContentsDifferenceIdentifier,
  AssertableCiYamlFileContentsDifferenceGrition
>;

export const ASSERTABLE_CI_YAML_FILE_CONTENTS_DIFFERENCE_GEPPP = Symbol(
  ASSERTABLE_CI_YAML_FILE_CONTENTS_DIFFERENCE_IDENTIFIER,
);

export type AssertableCiYamlFileContentsDifferenceGepp =
  typeof ASSERTABLE_CI_YAML_FILE_CONTENTS_DIFFERENCE_GEPPP;

export type AssertableCiYamlFileContentsDifferencePlifal = Plifal<
  [AssertableCiYamlFileContentsDifferenceGepp],
  AssertableCiYamlFileContentsDifferenceOdeshin
>;

export const assertableCiYamlFileContentsDifferenceOnama: OnamaEstinant<
  AssertableCiYamlFileContentsOdeshin,
  [AssertableCiYamlFileContentsDifferencePlifal]
> = {
  inputGepp: ASSERTABLE_CI_YAML_FILE_CONTENTS_GEPPP,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function mapItem(input) {
      let outputGrition: AssertableCiYamlFileContentsDifferenceGrition;

      try {
        assert.strictEqual(
          input.grition.actualStringContents,
          input.grition.expectedStringContents,
        );

        outputGrition = {
          isSame: true,
          errorMessage: null,
        };
      } catch (unknownError) {
        const error = unknownError as Error;
        outputGrition = {
          isSame: false,
          errorMessage: error.message,
        };
      }

      const output: AssertableCiYamlFileContentsDifferencePlifal = {
        geppTuple: [ASSERTABLE_CI_YAML_FILE_CONTENTS_DIFFERENCE_GEPPP],
        hubblepup: {
          identifier: ASSERTABLE_CI_YAML_FILE_CONTENTS_DIFFERENCE_IDENTIFIER,
          grition: outputGrition,
        },
      };

      return [output];
    },
  },
};