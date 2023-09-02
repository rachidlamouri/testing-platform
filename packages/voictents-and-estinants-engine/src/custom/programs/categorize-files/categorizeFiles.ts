import {
  buildVoictentByGepp,
  digikikify,
} from '../../../type-script-adapter/digikikify';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import { assertFileExtensionIsKnown } from './assertFileExtensionIsKnown';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { FILE_GEPP } from '../../programmable-units/file/file';
import { PROGRAM_ERROR_GEPP } from '../../programmable-units/error/programError';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';

const programFileCache = new ProgramFileCache({
  namespace: 'categorizeFiles',
});

/**
 * Example program to demonstrate traversing the file system to enumerate files
 * and categorize them by file type.
 *
 * @todo rename to testCategorizeFiles and add this to ci.sh
 */
digikikify({
  explicitVoictentTuple: [
    new InMemoryVoictent<FileSystemObjectEnumeratorConfigurationVoque>({
      gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: [
        VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
      ],
    }),
  ] as const,
  fileSystemNodeGeppCombination: defaultFileGeppCombination,
  uninferableVoictentByGepp: buildVoictentByGepp([
    new ProgramErrorVoictent({
      programFileCache,
    }),
  ] as const),
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    assertFileExtensionIsKnown,

    reportErrors,
    signalError,
  ] as const,
  errorGepp: PROGRAM_ERROR_GEPP,
  serializeeGeppList: [
    // keep this as a multi-line list for easier debugging
    FILE_GEPP,
  ],
  programFileCache,
});
