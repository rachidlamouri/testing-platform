import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { Validation2, ValidationEstinant2 } from '../validation/validation';
import {
  ValidationResultOdeshin,
  ValidationResultQuirm,
  VALIDATION_RESULT_GEPP,
} from '../validation/validationResult';
import { FileAPlifal, FILE_A_GEPP } from './fileA';
import { kodatar } from '../../../type-script-adapter/kodataring';

export const fileAHasKnownExtensionSuffix: Validation2<FileAPlifal> = (
  input,
) => {
  const hubblepup: ValidationResultOdeshin = {
    identifier: `validation-result:${fileAHasKnownExtensionSuffix.name}:${input.hubblepup.identifier}`,
    grition: {
      identifier: input.hubblepup.identifier,
      predicate: 'fileAHasKnownExtensionSuffix',
      isValid:
        input.hubblepup.grition.extension.suffixIdentifier !==
        FileExtensionSuffixIdentifier.Unknown,
    },
  };

  const outputQuirm: ValidationResultQuirm = {
    geppTuple: [VALIDATION_RESULT_GEPP],
    hubblepup,
  };

  return [outputQuirm];
};

export const fileAHasKnownExtensionSuffixEstinant: ValidationEstinant2<FileAPlifal> =
  {
    inputGeppTuple: [FILE_A_GEPP],
    croard: kodatar,
    tropoig: fileAHasKnownExtensionSuffix,
  };
