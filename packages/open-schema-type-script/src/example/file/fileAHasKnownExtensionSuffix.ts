import { FileExtensionSuffixIdentifier } from '../../utilities/file/fileExtensionSuffixIdentifier';
import { Validation, ValidationEstinant } from '../validation/validation';
import {
  ValidationResultOdeshin,
  ValidationResultQuirm,
  VALIDATION_RESULT_GIPP,
} from '../validation/validationResult';
import { FileAOdeshin, FILE_A_GIPP } from './fileA';

export const fileAHasKnownExtensionSuffix: Validation<FileAOdeshin> = (
  inputOdeshin,
) => {
  const hubblepup: ValidationResultOdeshin = {
    identifier: `validation-result:${inputOdeshin.identifier}`,
    grition: {
      identifier: inputOdeshin.identifier,
      predicate: fileAHasKnownExtensionSuffix.name,
      isValid:
        inputOdeshin.grition.extension.suffixIdentifier !==
        FileExtensionSuffixIdentifier.Unknown,
    },
  };

  const outputQuirm: ValidationResultQuirm = {
    gippTuple: [VALIDATION_RESULT_GIPP],
    hubblepup,
  };

  return [outputQuirm];
};

export const fileAHasKnownExtensionSuffixEstinant: ValidationEstinant<FileAOdeshin> =
  {
    inputGipp: FILE_A_GIPP,
    tropoignant: fileAHasKnownExtensionSuffix,
  };
