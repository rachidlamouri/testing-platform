import { NonEmptyTuple } from '../../../../utilities/semantic-types/tuple';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../../adapter/odeshin2';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoque,
} from '../../../programmable-units/type-script-file/typeScriptFileImportList';
import { BOUNDED_FILE_GEPP, BoundedFileVoque } from '../file/boundedFile';
import {
  FileDependencyInstance,
  FileDependencyVoque,
  FILE_DEPENDENCY_GEPP,
} from './fileDependency';

/**
 * Flattens a TypeScriptFileImportList into its individual file to file
 * dependency relationships
 */
export const getFileDependencies = buildEstinant({
  name: 'getFileDependencies',
})
  .fromHubblepup2<TypeScriptFileImportListVoque>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  })
  .andFromHubblepupTuple2<BoundedFileVoque, NonEmptyTuple<OdeshinZorn>>({
    gepp: BOUNDED_FILE_GEPP,
    framate: (importList) => {
      const importingFileZorn = importList.hubblepup.zorn;
      const importedFileZornList = importList.hubblepup.list
        .filter((importItem) => importItem.isInternal)
        .map((importItem) => importItem.sourcePath);

      return [importingFileZorn, ...importedFileZornList];
    },
    croard: (partitionedFile) => {
      return partitionedFile.hubblepup.file.filePath.serialized;
    },
  })
  .toHubblepupTuple2<FileDependencyVoque>({
    gepp: FILE_DEPENDENCY_GEPP,
  })
  .onPinbe((importList, [importingFile, ...importedFileList]) => {
    return importedFileList.map((importedFile) => {
      return new FileDependencyInstance({
        importingFile,
        importedFile,
      });
    });
  })
  .assemble();
