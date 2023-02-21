import { kodatar } from '../../../type-script-adapter/kodataring';
import { ValidationEstinant2 } from '../validation/validation';
import {
  ValidationResultQuirm,
  VALIDATION_RESULT_GEPP,
} from '../validation/validationResult';
import {
  AssertableCiYamlFileContentsDifferencePlifal,
  ASSERTABLE_CI_YAML_FILE_CONTENTS_DIFFERENCE_GEPPP,
} from './assertableCiYamlFileContentsDifference';

export const ciYamlFileValidationEstinant: ValidationEstinant2<AssertableCiYamlFileContentsDifferencePlifal> =
  {
    inputGeppTuple: [ASSERTABLE_CI_YAML_FILE_CONTENTS_DIFFERENCE_GEPPP],
    croard: kodatar,
    tropoig: function isCiYamlFileUpToDate(input) {
      const result: ValidationResultQuirm = {
        geppTuple: [VALIDATION_RESULT_GEPP],
        hubblepup: {
          identifier: `validation-result:${isCiYamlFileUpToDate.name}`,
          grition: {
            identifier: input.hubblepup.identifier,
            predicate: isCiYamlFileUpToDate.name,
            isValid: input.hubblepup.grition.isSame,
          },
        },
      };

      return [result];
    },
  };
