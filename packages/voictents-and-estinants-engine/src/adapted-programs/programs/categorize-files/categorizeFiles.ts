import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import { assertFileExtensionIsKnown } from './assertFileExtensionIsKnown';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { FILE_GEPP } from '../../programmable-units/file/file';
import { PROGRAM_ERROR_GEPP } from '../../programmable-units/error/programError';
import { defaultFileCollectionIdCombination } from '../../programmable-units/file/defaultFileGeppCombination';

const programFileCache = new ProgramFileCache({
  namespace: 'categorizeFiles',
});

/**
 * Example program to demonstrate traversing the file system to enumerate files
 * and categorize them by file type.
 *
 * @canonicalComment
 *
 * @todo rename to testCategorizeFiles and add this to ci.sh
 */
runEngine({
  explicitCollectionTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationStreamMetatype>(
      {
        collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
        initialItemEggTuple: [
          VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
        ],
      },
    ),
  ] as const,
  fileSystemNodeCollectionIdCombination: defaultFileCollectionIdCombination,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new ProgramErrorVoictent({
      programFileCache,
    }),
  ] as const),
  programmedTransformTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    assertFileExtensionIsKnown,

    reportErrors,
    signalError,
  ] as const,
  errorCollectionId: PROGRAM_ERROR_GEPP,
  serializeeCollectionIdList: [
    // keep this as a multi-line list for easier debugging
    FILE_GEPP,
  ],
  programFileCache,
});
