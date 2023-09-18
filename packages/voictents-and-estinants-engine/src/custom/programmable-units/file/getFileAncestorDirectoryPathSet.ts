import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
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
export const getFileAncestorDirectoryPathSet = buildEstinant({
  name: 'getFileAncestorDirectoryPathSet',
})
  .fromHubblepup2<TypeScriptFileVoque>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .toHubblepup2<FileAncestorDirectoryPathSetVoque>({
    gepp: FILE_ANCESTOR_DIRECTORY_PATH_SET_GEPP,
  })
  .onPinbe((file) => {
    return new FileAncestorDirectoryPathSetInstance({
      file,
    });
  })
  .assemble();
