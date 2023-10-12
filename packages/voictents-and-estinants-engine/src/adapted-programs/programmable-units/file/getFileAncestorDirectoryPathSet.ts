import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoque,
} from '../type-script-file/typeScriptFile';
import {
  FILE_ANCESTOR_DIRECTORY_PATH_SET_GEPP,
  FileAncestorDirectoryPathSetInstance,
  FileAncestorDirectoryPathSetVoque,
} from './fileAncestorDirectoryPathSet';

/**
 * Gets the list of full directory paths for each directory above a file.
 */
export const getFileAncestorDirectoryPathSet = buildProgrammedTransform({
  name: 'getFileAncestorDirectoryPathSet',
})
  .fromItem2<TypeScriptFileVoque>({
    collectionId: TYPE_SCRIPT_FILE_GEPP,
  })
  .toItem2<FileAncestorDirectoryPathSetVoque>({
    collectionId: FILE_ANCESTOR_DIRECTORY_PATH_SET_GEPP,
  })
  .onTransform((file) => {
    return new FileAncestorDirectoryPathSetInstance({
      file,
    });
  })
  .assemble();
