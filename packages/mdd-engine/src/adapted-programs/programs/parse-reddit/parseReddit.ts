import {
  runEngine,
  buildCollectionByCollectionId,
} from '../../../adapter/engine/runEngine';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorCollection';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import { signalError } from '../../programmable-units/error/signalError';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { buildDefaultFileCollectionTuple } from '../../programmable-units/file/buildDefaultFileCollectionTuple';
import { OutputFileCollection } from '../../programmable-units/output-file/outputFileCollection';
import { parseInput } from './parseInput';
import { assertFileExtensionIsKnown } from '../categorize-files/assertFileExtensionIsKnown';

const programFileCache = new ProgramFileCache({
  namespace: 'parse-reddit',
});

runEngine({
  explicitCollectionTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationStreamMetatype>(
      {
        collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
        initialItemEggTuple: [
          {
            directoryPath:
              'packages/mdd-engine/src/adapted-programs/programs/parse-reddit',
            ignoredNodePathConfigurationList: [],
          },
        ],
      },
    ),
    new OutputFileCollection({
      programFileCache,
    }),
  ] as const,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    ...buildDefaultFileCollectionTuple(),
    new ProgramErrorCollection({
      programFileCache,
    }),
  ] as const),
  errorCollectionId: PROGRAM_ERROR_COLLECTION_ID,
  programmedTransformTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    assertFileExtensionIsKnown,

    parseInput,

    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  serializeeCollectionIdList: [
    // keep this as a multi-line list for easier debugging
  ],
  programFileCache,
});
