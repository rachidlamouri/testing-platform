import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import {
  buildVoictentByGepp,
  digikikify,
} from '../../../type-script-adapter/digikikify';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import { PROGRAM_ERROR_GEPP } from '../../programmable-units/error/programError';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import {
  categorizeFiles,
  categorizeFiles2,
} from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { File2Voque, FILE_2_GEPP } from '../../programmable-units/file/file2';
import { FileSystemNodeVoictent } from '../../programmable-units/file/fileSystemNodeVoictent';
import {
  FileSystemObjectEnumeratorConfigurationVoque,
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { getTypeScriptFileExportList } from '../../programmable-units/type-script-file/getTypeScriptFileExportList';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { markUnusedExports } from './markUnusedExports';

const programFileCache = new ProgramFileCache({
  namespace: 'findUnusedExports',
});

/**
 * Reports granular export statements that are not imported by anything
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
  uninferableVoictentByGepp: buildVoictentByGepp([
    new FileSystemNodeVoictent<File2Voque>({
      gepp: FILE_2_GEPP,
      initialHubblepupPelueTuple: [],
    }),
    new ProgramErrorVoictent({
      programFileCache,
    }),
  ] as const),
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,
    categorizeFiles2,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getCommentedProgramBodyDeclarationList,
    getTypeScriptFileImportList,
    getTypeScriptFileExportList,

    markUnusedExports,

    reportErrors,
    signalError,
  ] as const,
  errorGepp: PROGRAM_ERROR_GEPP,
  serializeeGeppList: [
    // note: keep this is a multiline list for easier debugging
  ],
  programFileCache,
});
