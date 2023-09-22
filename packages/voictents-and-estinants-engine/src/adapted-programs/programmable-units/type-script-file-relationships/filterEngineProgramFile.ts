import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../../adapter/odeshin2';
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
export const filterEngineProgramFile = buildEstinant({
  name: 'filterEngineProgramFile',
})
  .fromHubblepup2<TypeScriptFileVoque>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromHubblepupTuple2<TypeScriptFileImportListVoque, [OdeshinZorn]>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    framate: (leftInput) => [leftInput.indexByName.zorn],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromVoictent2<EngineFunctionConfigurationVoque>({
    gepp: ENGINE_FUNCTION_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple2<EngineProgramFileVoque>({
    gepp: ENGINE_PROGRAM_FILE_GEPP,
  })
  .onPinbe(
    (
      typeScriptFile,
      [{ list: importList }],
      engineFunctionConfigurationList,
    ) => {
      // Skip adapted engine file that imports the core engine
      // TODO: this code is brittle. Tie it back to the source file if possible
      if (
        typeScriptFile.filePath.serialized ===
        'packages/voictents-and-estinants-engine/src/adapter/digikikify.ts'
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
