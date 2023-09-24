
import { digikikify, buildVoictentByGepp } from '../../../packages/voictents-and-estinants-engine/src/adapter/engine/digikikify'
import { InMemoryVoictent } from '../../../packages/voictents-and-estinants-engine/src/core/engine/inMemoryVoictent'
import { FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP, VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION, FileSystemObjectEnumeratorConfigurationVoque } from '../../../packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/file/fileSystemObjectEnumeratorConfiguration'
import { defaultFileGeppCombination } from '../../../packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/file/defaultFileGeppCombination'
import { PROGRAM_ERROR_GEPP } from '../../../packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/error/programError'
import { ProgramErrorVoictent } from '../../../packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/error/programErrorVoictent'
import { enumerateFileSystemObjects } from '../../../packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/file/enumerateFileSystemObjects'
import { categorizeFiles } from '../../../packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/file/categorizeFiles'
import { reportErrors } from '../../../packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/error/reportErrors'
import { reportErrorCount } from '../../../packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/error/reportErrorCount'
import { signalError } from '../../../packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/error/signalError'
import { ProgramFileCache } from '../../../packages/voictents-and-estinants-engine/src/utilities/program/programFileCache'
import { assertFileExtensionIsKnown } from '../../../packages/voictents-and-estinants-engine/src/adapted-programs/programs/categorize-files/assertFileExtensionIsKnown'

const programFileCache = new ProgramFileCache({
  namespace: 'program-snapshot',
});

/**
 *
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
  errorGepp: PROGRAM_ERROR_GEPP,
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    assertFileExtensionIsKnown,

    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  serializeeGeppList: [
    // keep this as a multi-line list for easier debugging
  ],
  programFileCache,
});
