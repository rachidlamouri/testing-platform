import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  TYPE_SCRIPT_FILE_COLLECTION_ID,
  TypeScriptFileStreamMetatype,
} from '../type-script-file/typeScriptFile';
import {
  FILE_ANCESTOR_DIRECTORY_PATH_SET_COLLECTION_ID,
  FileAncestorDirectoryPathSetInstance,
  FileAncestorDirectoryPathSetStreamMetatype,
} from './fileAncestorDirectoryPathSet';

/**
 * Gets the list of full directory paths for each directory above a file.
 */
export const getFileAncestorDirectoryPathSet = buildProgrammedTransform({
  name: 'getFileAncestorDirectoryPathSet',
})
  .fromItem2<TypeScriptFileStreamMetatype>({
    collectionId: TYPE_SCRIPT_FILE_COLLECTION_ID,
  })
  .toItem2<FileAncestorDirectoryPathSetStreamMetatype>({
    collectionId: FILE_ANCESTOR_DIRECTORY_PATH_SET_COLLECTION_ID,
  })
  .onTransform((file) => {
    return new FileAncestorDirectoryPathSetInstance({
      file,
    });
  })
  .assemble();
