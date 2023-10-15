
import { digikikify, buildVoictentByGepp } from '../../../packages/mdd-engine/src/adapter/engine/digikikify'
import { InMemoryVoictent } from '../../../packages/mdd-engine/src/core/engine/inMemoryVoictent'
import { FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP, VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION, FileSystemObjectEnumeratorConfigurationVoque } from '../../../packages/mdd-engine/src/adapted-programs/programmable-units/file/fileSystemObjectEnumeratorConfiguration'
import { defaultFileGeppCombination } from '../../../packages/mdd-engine/src/adapted-programs/programmable-units/file/defaultFileGeppCombination'
import { PROGRAM_ERROR_GEPP } from '../../../packages/mdd-engine/src/adapted-programs/programmable-units/error/programError'
import { ProgramErrorVoictent } from '../../../packages/mdd-engine/src/adapted-programs/programmable-units/error/programErrorVoictent'
import { enumerateFileSystemObjects } from '../../../packages/mdd-engine/src/adapted-programs/programmable-units/file/enumerateFileSystemObjects'
import { categorizeFiles } from '../../../packages/mdd-engine/src/adapted-programs/programmable-units/file/categorizeFiles'
import { reportErrors } from '../../../packages/mdd-engine/src/adapted-programs/programmable-units/error/reportErrors'
import { reportErrorCount } from '../../../packages/mdd-engine/src/adapted-programs/programmable-units/error/reportErrorCount'
import { signalError } from '../../../packages/mdd-engine/src/adapted-programs/programmable-units/error/signalError'
import { ProgramFileCache } from '../../../packages/mdd-engine/src/layer-agnostic-utilities/program/programFileCache'
import { assertFileExtensionIsKnown } from '../../../packages/mdd-engine/src/adapted-programs/programs/categorize-files/assertFileExtensionIsKnown'

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

