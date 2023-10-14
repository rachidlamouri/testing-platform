import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { OdeshinZorn } from '../../../adapter/identifiable-item/identifiableItem';
import {
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  EngineFunctionConfigurationVoque,
} from '../engine-program/engineFunctionConfiguration';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoque,
} from '../type-script-file/typeScriptFile';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoque,
} from '../type-script-file/typeScriptFileImportList';
import {
  ENGINE_PROGRAM_FILE_GEPP,
  EngineProgramFileVoque,
} from './engineProgramFile';

/**
 * Filters the collection of TypeScript files to those that are an engine program.
 * A TypeScript file is considered an engine program if it imports the engine.
 */
export const filterEngineProgramFile = buildProgrammedTransform({
  name: 'filterEngineProgramFile',
})
  .fromItem2<TypeScriptFileVoque>({
    collectionId: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromItemTuple2<TypeScriptFileImportListVoque, [OdeshinZorn]>({
    collectionId: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    getRightKeyTuple: (leftInput) => [leftInput.item.zorn],
    getRightKey: (rightInput) => rightInput.item.zorn,
  })
  .andFromCollection2<EngineFunctionConfigurationVoque>({
    collectionId: ENGINE_FUNCTION_CONFIGURATION_GEPP,
  })
  .toItemTuple2<EngineProgramFileVoque>({
    collectionId: ENGINE_PROGRAM_FILE_GEPP,
  })
  .onTransform(
    (
      typeScriptFile,
      [{ list: importList }],
      engineFunctionConfigurationList,
    ) => {
      // Skip adapted engine file that imports the core engine
      // TODO: this code is brittle. Tie it back to the source file if possible
      if (
        typeScriptFile.filePath.serialized ===
        'packages/voictents-and-estinants-engine/src/adapter/engine/digikikify.ts'
      ) {
        return [];
      }

      const combinationList = importList.flatMap((fileImport) => {
        return engineFunctionConfigurationList.map(
          (engineFunctionConfiguration) => {
            return {
              fileImport,
              engineFunctionConfiguration,
            };
          },
        );
      });

      const engineFunctionImportCombination = combinationList.find(
        ({ fileImport, engineFunctionConfiguration }) => {
          return (
            fileImport.isInternal &&
            fileImport.sourcePath === engineFunctionConfiguration.filePath &&
            fileImport.specifierList.some(
              (specifier) =>
                specifier === engineFunctionConfiguration.exportedIdentifier,
            )
          );
        },
      );

      if (engineFunctionImportCombination === undefined) {
        return [];
      }

      return [
        {
          zorn: typeScriptFile.filePath.serialized,
          file: typeScriptFile,
          engineFunctionConfiguration:
            engineFunctionImportCombination.engineFunctionConfiguration,
        },
      ];
    },
  )
  .assemble();
