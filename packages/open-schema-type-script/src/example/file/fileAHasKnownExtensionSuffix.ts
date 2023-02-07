import { TropoignantTypeName } from '../../core/tropoignant';
import { FileExtensionSuffixIdentifier } from '../../utilities/file/fileExtensionSuffixIdentifier';
import { ODESHIN_GEPP } from '../core/odeshin';
import { Validation, ValidationEstinant } from '../validation/validation';
import {
  ValidationResultOdeshin,
  ValidationResultQuirm,
  VALIDATION_RESULT_GEPP,
} from '../validation/validationResult';
import { FileAOdeshin, FILE_A_GEPP } from './fileA';

export const fileAHasKnownExtensionSuffix: Validation<FileAOdeshin> = {
  typeName: TropoignantTypeName.Onama,
  process: function fileAHasKnownExtensionSuffix(inputOdeshin) {
    const hubblepup: ValidationResultOdeshin = {
      identifier: `validation-result:${fileAHasKnownExtensionSuffix.name}:${inputOdeshin.identifier}`,
      grition: {
        identifier: inputOdeshin.identifier,
        predicate: 'fileAHasKnownExtensionSuffix',
        isValid:
          inputOdeshin.grition.extension.suffixIdentifier !==
          FileExtensionSuffixIdentifier.Unknown,
      },
    };

    const outputQuirm: ValidationResultQuirm = {
      geppTuple: [ODESHIN_GEPP, VALIDATION_RESULT_GEPP],
      hubblepup,
    };

    return [outputQuirm];
  },
};

export const fileAHasKnownExtensionSuffixEstinant: ValidationEstinant<FileAOdeshin> =
  {
    inputGepp: FILE_A_GEPP,
    tropoignant: fileAHasKnownExtensionSuffix,
  };
