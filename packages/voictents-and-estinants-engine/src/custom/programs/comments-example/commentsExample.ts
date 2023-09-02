import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import {
  buildVoictentByGepp,
  digikikify,
} from '../../../type-script-adapter/digikikify';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { categorizeFiles2 } from '../../programmable-units/file/categorizeFiles';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';

const programFileCache = new ProgramFileCache({
  namespace: 'commentsExample',
});

/**
 * Example program to demonstrate associating AST nodes to top level comments
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
    categorizeFiles2,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,

    getCommentedProgramBodyDeclarationList,
  ] as const,
  programFileCache,
});
