import { NonEmptyTuple } from '../../../../package-agnostic-utilities/type/tuple';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { OdeshinZorn } from '../../../../adapter/identifiable-item/identifiableItem';
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
export const getFileDependencies = buildProgrammedTransform({
  name: 'getFileDependencies',
})
  .fromItem2<TypeScriptFileImportListVoque>({
    collectionId: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  })
  .andFromItemTuple2<BoundedFileVoque, NonEmptyTuple<OdeshinZorn>>({
    collectionId: BOUNDED_FILE_GEPP,
    getRightKeyTuple: (importList) => {
      const importingFileZorn = importList.item.id;
      const importedFileZornList = importList.item.list
        .filter((importItem) => importItem.isInternal)
        .map((importItem) => importItem.sourcePath);

      return [importingFileZorn, ...importedFileZornList];
    },
    getRightKey: (partitionedFile) => {
      return partitionedFile.item.file.filePath.serialized;
    },
  })
  .toItemTuple2<FileDependencyVoque>({
    collectionId: FILE_DEPENDENCY_GEPP,
  })
  .onTransform((importList, [importingFile, ...importedFileList]) => {
    return importedFileList.map((importedFile) => {
      return new FileDependencyInstance({
        importingFile,
        importedFile,
      });
    });
  })
  .assemble();
