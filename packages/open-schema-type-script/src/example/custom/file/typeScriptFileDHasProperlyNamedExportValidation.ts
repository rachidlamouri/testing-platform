import {} from '../../../custom-adapter/odeshin';
import { kodatar } from '../../../type-script-adapter/kodataring';
import { ValidationEstinant2 } from '../validation/validation';
import {
  ValidationResultOdeshin,
  ValidationResultQuirm,
  VALIDATION_RESULT_GEPP,
} from '../validation/validationResult';
import {
  DeclarationReferenceTypeName,
  TypeScriptFileDPlifal,
  TYPE_SCRIPT_FILE_D_GEPP,
} from './typeScriptFileD';

export const typeScriptFileDHasProperlyNamedExportValidation: ValidationEstinant2<TypeScriptFileDPlifal> =
  {
    inputGeppTuple: [TYPE_SCRIPT_FILE_D_GEPP],
    croard: kodatar,
    tropoig: function typeScriptFileDHasProperlyNamedExport(input) {
      const hubblepup: ValidationResultOdeshin = {
        identifier: `validation-result:${typeScriptFileDHasProperlyNamedExport.name}:${input.hubblepup.identifier}`,
        grition: {
          identifier: input.hubblepup.identifier,
          predicate: 'typeScriptFileDHasProperlyNamedExport',
          isValid:
            input.hubblepup.grition.additionalMetadata.declarations.length ===
              0 ||
            input.hubblepup.grition.additionalMetadata.declarations.some(
              (declaration): boolean => {
                switch (declaration.referenceTypeName) {
                  case DeclarationReferenceTypeName.Code:
                    return (
                      declaration.identifier ===
                      input.hubblepup.grition.inMemoryFileName.camelCase
                    );
                  case DeclarationReferenceTypeName.Type:
                    return (
                      declaration.identifier ===
                      input.hubblepup.grition.inMemoryFileName.pascalCase
                    );
                  case DeclarationReferenceTypeName.Hybrid:
                    return (
                      declaration.identifier ===
                        input.hubblepup.grition.inMemoryFileName.camelCase ||
                      declaration.identifier ===
                        input.hubblepup.grition.inMemoryFileName.pascalCase
                    );
                }

                throw Error('Not Implemented');
              },
            ),
        },
      };

      const outputQuirm: ValidationResultQuirm = {
        geppTuple: [VALIDATION_RESULT_GEPP],
        hubblepup,
      };

      return [outputQuirm];
    },
  };
