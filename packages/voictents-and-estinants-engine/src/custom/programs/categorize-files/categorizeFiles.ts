import { digikikify } from '../../../type-script-adapter/digikikify';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { buildBasicQuirmDebugger } from '../../debugger/quirmDebugger';
import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import { signalError } from '../../programmable-units/error/signalError';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { assertFileExtensionIsKnown } from './assertFileExtensionIsKnown';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorVoque,
} from '../../programmable-units/error/programError';

/**
 * Example program to demonstrate traversing the file system to enumerate files
 * and categorize them by file type.
 *
 * @todo rename to testCategorizeFiles and add this to ci.sh
 */
digikikify({
  populatedVoictentTuple: [
    new InMemoryVoictent<FileSystemObjectEnumeratorConfigurationVoque>({
      gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialHubblepupTuple: [
        VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
      ],
    }),
  ] as const,
  uninferableVoictentTuple: [
    new InMemoryVoictent<ProgramErrorVoque>({
      gepp: PROGRAM_ERROR_GEPP,
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    assertFileExtensionIsKnown,

    reportErrors,
    signalError,
  ] as const,
  quirmDebugger: buildBasicQuirmDebugger('categorizeFiles'),
});
