import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import {
  ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  EngineFunctionConfigurationStreamMetatype,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorVoictent';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { defaultFileCollectionIdCombination } from '../../programmable-units/file/defaultFileCollectionIdCombination';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
  COLLECTIONS_AND_PROGRAMMED_TRANSFORMS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { OutputFileCollection } from '../../programmable-units/output-file/outputFileCollection';
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
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationStreamMetatype>(
      {
        collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
        initialItemEggTuple: [
          COLLECTIONS_AND_PROGRAMMED_TRANSFORMS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
        ],
      },
    ),
    new InMemoryCollection<EngineFunctionConfigurationStreamMetatype>({
      collectionId: ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
      initialItemEggTuple: [
        ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
        CORE_ENGINE_FUNCTION_CONFIGURATION,
      ],
    }),
  ] as const,
  fileSystemNodeCollectionIdCombination: defaultFileCollectionIdCombination,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new ProgramErrorCollection({
      programFileCache,
    }),
    new OutputFileCollection({
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
