import { TropoignantTypeName } from '../../core/tropoignant';
import { ODESHIN_GEPP } from '../../type-script-adapter/odeshin';
import { ValidationEstinant } from '../validation/validation';
import {
  ValidationResultOdeshin,
  ValidationResultQuirm,
  VALIDATION_RESULT_GEPP,
} from '../validation/validationResult';
import {
  DeclarationReferenceTypeName,
  TypeScriptFileDOdeshin,
  TYPE_SCRIPT_FILE_D_GEPP,
} from './typeScriptFileD';

export const typeScriptFileDHasProperlyNamedExportValidation: ValidationEstinant<TypeScriptFileDOdeshin> =
  {
    inputGepp: TYPE_SCRIPT_FILE_D_GEPP,
    tropoignant: {
      typeName: TropoignantTypeName.Onama,
      process: function typeScriptFileDHasProperlyNamedExport(inputOdeshin) {
        const hubblepup: ValidationResultOdeshin = {
          identifier: `validation-result:${typeScriptFileDHasProperlyNamedExport.name}:${inputOdeshin.identifier}`,
          grition: {
            identifier: inputOdeshin.identifier,
            predicate: 'typeScriptFileDHasProperlyNamedExport',
            isValid:
              inputOdeshin.grition.additionalMetadata.declarations.length ===
                0 ||
              inputOdeshin.grition.additionalMetadata.declarations.some(
                (declaration): boolean => {
                  switch (declaration.referenceTypeName) {
                    case DeclarationReferenceTypeName.Code:
                      return (
                        declaration.identifier ===
                        inputOdeshin.grition.inMemoryFileName.camelCase
                      );
                    case DeclarationReferenceTypeName.Type:
                      return (
                        declaration.identifier ===
                        inputOdeshin.grition.inMemoryFileName.pascalCase
                      );
                    case DeclarationReferenceTypeName.Hybrid:
                      return (
                        declaration.identifier ===
                          inputOdeshin.grition.inMemoryFileName.camelCase ||
                        declaration.identifier ===
                          inputOdeshin.grition.inMemoryFileName.pascalCase
                      );
                  }

                  throw Error('Not Implemented');
                },
              ),
          },
        };

        const outputQuirm: ValidationResultQuirm = {
          geppTuple: [ODESHIN_GEPP, VALIDATION_RESULT_GEPP],
          hubblepup,
        };

        return [outputQuirm];
      },
    },
  };
