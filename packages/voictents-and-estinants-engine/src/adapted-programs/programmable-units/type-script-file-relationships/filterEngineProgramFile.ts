import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import {
  ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
  EngineFunctionConfigurationStreamMetatype,
} from '../engine-program/engineFunctionConfiguration';
import {
  TYPE_SCRIPT_FILE_COLLECTION_ID,
  TypeScriptFileStreamMetatype,
} from '../type-script-file/typeScriptFile';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
  TypeScriptFileImportListStreamMetatype,
} from '../type-script-file/typeScriptFileImportList';
import {
  ENGINE_PROGRAM_FILE_COLLECTION_ID,
  EngineProgramFileStreamMetatype,
} from './engineProgramFile';

/**
 * Filters the collection of TypeScript files to those that are an engine program.
 * A TypeScript file is considered an engine program if it imports the engine.
 */
export const filterEngineProgramFile = buildProgrammedTransform({
  name: 'filterEngineProgramFile',
})
  .fromItem2<TypeScriptFileStreamMetatype>({
    collectionId: TYPE_SCRIPT_FILE_COLLECTION_ID,
  })
  .andFromItemTuple2<
    TypeScriptFileImportListStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
    getRightKeyTuple: (leftInput) => [leftInput.item.id],
    getRightKey: (rightInput) => rightInput.item.id,
  })
  .andFromCollection2<EngineFunctionConfigurationStreamMetatype>({
    collectionId: ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
  })
  .toItemTuple2<EngineProgramFileStreamMetatype>({
    collectionId: ENGINE_PROGRAM_FILE_COLLECTION_ID,
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
        'packages/voictents-and-estinants-engine/src/adapter/engine/runEngine.ts'
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
          id: typeScriptFile.filePath.serialized,
          file: typeScriptFile,
          engineFunctionConfiguration:
            engineFunctionImportCombination.engineFunctionConfiguration,
        },
      ];
    },
  )
  .assemble();
