import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import { digikikify } from '../../../type-script-adapter/digikikify';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorVoque,
} from '../../programmable-units/error/programError';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';

/**
 * Example program to demonstrate associating AST nodes to top level comments
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

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,

    getCommentedProgramBodyDeclarationList,
  ] as const,
  programFileCache: new ProgramFileCache({
    namespace: 'commentsExample',
  }),
});
