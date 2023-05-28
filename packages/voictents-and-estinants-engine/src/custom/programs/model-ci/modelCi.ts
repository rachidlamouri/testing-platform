import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import { digikikify } from '../../../type-script-adapter/digikikify';
import {
  EngineFunctionConfigurationVoque,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { getEngineProgramLocator } from '../../programmable-units/engine-program/getEngineProgramLocator';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FileSystemObjectEnumeratorConfigurationVoque,
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { filterEngineProgramFile } from '../../programmable-units/type-script-file-relationships/filterEngineProgramFile';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { getProgramBodyDeclarationsByIdentifier } from '../../programmable-units/type-script-file/programBodyDeclarationsByIdentifier';
import { assertCiModelHasAllPrograms } from './assertCiModelHasAllPrograms';
import { assertCiFileIsUpToDate } from './assertCiFileIsUpToDate';
import { CI_MODEL, CI_MODEL_GEPP, CiModelVoque } from './ciModel';
import { serializeCiModel } from './serializeCiModel';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import { ProgramError2Voictent } from '../../programmable-units/error/programErrorVoictent';

const programFileCache = new ProgramFileCache({
  namespace: 'modelCi',
})

/**
 * Uses a hard-coded data structure that represents the information in CI.sh and
 * then makes sure the data structure and bash file are sound
 */
digikikify({
  populatedVoictentTuple: [
    new InMemoryVoictent<FileSystemObjectEnumeratorConfigurationVoque>({
      gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialHubblepupTuple: [
        VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
      ],
    }),
    new InMemoryVoictent<EngineFunctionConfigurationVoque>({
      gepp: ENGINE_FUNCTION_CONFIGURATION_GEPP,
      initialHubblepupTuple: [
        CORE_ENGINE_FUNCTION_CONFIGURATION,
        CORE_ENGINE_FUNCTION_2_CONFIGURATION,
        ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
      ],
    }),
    new InMemoryVoictent<CiModelVoque>({
      gepp: CI_MODEL_GEPP,
      initialHubblepupTuple: [CI_MODEL],
    }),
  ] as const,
  uninferableVoictentTuple: [
    new ProgramError2Voictent({
      programFileCache,
    }),
  ],
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getTypeScriptFileImportList,
    getProgramBodyDeclarationsByIdentifier,
    getCommentedProgramBodyDeclarationList,

    filterEngineProgramFile,
    getEngineProgramLocator,

    serializeCiModel,

    assertCiFileIsUpToDate,
    assertCiModelHasAllPrograms,

    reportErrors,
    signalError,
  ] as const,
  programFileCache,
});
