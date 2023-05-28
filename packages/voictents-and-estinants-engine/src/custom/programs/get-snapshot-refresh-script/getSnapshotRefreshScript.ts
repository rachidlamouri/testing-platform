import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import { digikikify } from '../../../type-script-adapter/digikikify';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import {
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  EngineFunctionConfigurationVoque,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorVoque,
} from '../../programmable-units/error/programError';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { OutputFileVoictent } from '../../programmable-units/output-file/outputFileVoictent';
import { constructSnapshotScript } from '../../programmable-units/snapshot-refresh/constructSnapshotScript';
import { filterEngineProgramFile } from '../../programmable-units/type-script-file-relationships/filterEngineProgramFile';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';

const programFileCache = new ProgramFileCache({
  namespace: 'getSnapshotRefreshScript',
});

/**
 * Creates a bash script to run all engine programs
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
        ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
        CORE_ENGINE_FUNCTION_CONFIGURATION,
      ],
    }),
  ] as const,
  uninferableVoictentTuple: [
    new InMemoryVoictent<ProgramErrorVoque>({
      gepp: PROGRAM_ERROR_GEPP,
      initialHubblepupTuple: [],
    }),
    new OutputFileVoictent({
      programFileCache,
    }),
  ],
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getTypeScriptFileImportList,

    filterEngineProgramFile,

    constructSnapshotScript,
  ] as const,
  programFileCache,
});
