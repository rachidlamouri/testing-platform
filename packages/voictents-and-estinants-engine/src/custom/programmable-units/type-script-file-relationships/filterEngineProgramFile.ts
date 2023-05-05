import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  EngineFunctionConfigurationVoictent,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
} from '../engine-program/engineFunctionConfiguration';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoictent,
} from '../type-script-file/typeScriptFile';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoictent,
} from '../type-script-file/typeScriptFileImportList';
import {
  ENGINE_PROGRAM_FILE_GEPP,
  EngineProgramFileVoictent,
} from './engineProgramFile';

/**
 * Filters the collection of TypeScript files to those that are an engine program.
 * A TypeScript file is considered an engine program if it imports the engine.
 */
export const filterEngineProgramFile = buildEstinant({
  name: 'filterEngineProgramFile',
})
  .fromHubblepup<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .andFromGritionTuple<TypeScriptFileImportListVoictent, [string]>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    framate: (leftInput) => [leftInput.zorn],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromVoictent<EngineFunctionConfigurationVoictent>({
    gepp: ENGINE_FUNCTION_CONFIGURATION_GEPP,
  })
  .toHubblepupTuple<EngineProgramFileVoictent>({
    gepp: ENGINE_PROGRAM_FILE_GEPP,
  })
  .onPinbe(
    (parsedFileOdeshin, [importList], engineFunctionConfigurationList) => {
      const hasEngineFunctionImport = importList.some((fileImport) => {
        return engineFunctionConfigurationList.some(
          (engineFunctionConfiguration) => {
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
      });

      if (!hasEngineFunctionImport) {
        return [];
      }

      return [parsedFileOdeshin];
    },
  )
  .assemble();