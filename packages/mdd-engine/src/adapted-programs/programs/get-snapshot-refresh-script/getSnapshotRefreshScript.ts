import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import {
  ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
  ENGINE_FUNCTION_CONFIGURATION_LIST,
  EngineFunctionConfigurationStreamMetatype,
} from '../../programmable-units/engine-program-model/engineFunctionConfiguration';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorCollection';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
  ENGINE_PACKAGE_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { OutputFileCollection } from '../../programmable-units/output-file/outputFileCollection';
import { constructSnapshotScript } from '../../programmable-units/snapshot-refresh/constructSnapshotScript';
import { filterEngineProgramFile } from '../../programmable-units/engine-program-model/filterEngineProgramFile';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { buildDefaultFileCollectionTuple } from '../../programmable-units/file/buildDefaultFileCollectionTuple';

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
          ENGINE_PACKAGE_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
        ],
      },
    ),
    new InMemoryCollection<EngineFunctionConfigurationStreamMetatype>({
      collectionId: ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
      initialItemEggTuple: ENGINE_FUNCTION_CONFIGURATION_LIST,
    }),
  ] as const,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    ...buildDefaultFileCollectionTuple(),
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
