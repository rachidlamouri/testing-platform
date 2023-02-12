import { TropoignantTypeName } from '../../core/tropoignant';
import { ODESHIN_GEPP } from '../../type-script-adapter/odeshin';
import { ValidationEstinant } from '../validation/validation';
import {
  ValidationResultQuirm,
  VALIDATION_RESULT_GEPP,
} from '../validation/validationResult';
import {
  AssertableCiYamlFileContentsDifferenceOdeshin,
  ASSERTABLE_CI_YAML_FILE_CONTENTS_DIFFERENCE_GEPPP,
} from './assertableCiYamlFileContentsDifference';

export const ciYamlFileValidationEstinant: ValidationEstinant<AssertableCiYamlFileContentsDifferenceOdeshin> =
  {
    inputGepp: ASSERTABLE_CI_YAML_FILE_CONTENTS_DIFFERENCE_GEPPP,
    tropoignant: {
      typeName: TropoignantTypeName.Onama,
      process: function isCiYamlFileUpToDate(input) {
        const result: ValidationResultQuirm = {
          geppTuple: [ODESHIN_GEPP, VALIDATION_RESULT_GEPP],
          hubblepup: {
            identifier: `validation-result:${isCiYamlFileUpToDate.name}`,
            grition: {
              identifier: input.identifier,
              predicate: isCiYamlFileUpToDate.name,
              isValid: input.grition.isSame,
            },
          },
        };

        return [result];
      },
    },
  };
