import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import {
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  EngineFunctionConfigurationVoque,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';
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
 *
 * @canonicalComment
 */
runEngine({
  explicitCollectionTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationVoque>({
      collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialItemEggTuple: [
        VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
      ],
    }),
    new InMemoryCollection<EngineFunctionConfigurationVoque>({
      collectionId: ENGINE_FUNCTION_CONFIGURATION_GEPP,
      initialItemEggTuple: [
        ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
        CORE_ENGINE_FUNCTION_CONFIGURATION,
      ],
    }),
  ] as const,
  fileSystemNodeCollectionIdCombination: defaultFileGeppCombination,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new OutputFileVoictent({
      programFileCache,
    }),
  ] as const),
  programmedTransformTuple: [
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
