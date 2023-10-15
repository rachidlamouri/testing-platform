import { NonEmptyTuple } from '../../../../package-agnostic-utilities/type/tuple';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../../adapter/identifiable-item/identifiableItem';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
  TypeScriptFileImportListStreamMetatype,
} from '../../../programmable-units/type-script-file/typeScriptFileImportList';
import {
  BOUNDED_FILE_COLLECTION_ID,
  BoundedFileStreamMetatype,
} from '../file/boundedFile';
import {
  FileDependencyInstance,
  FileDependencyStreamMetatype,
  FILE_DEPENDENCY_COLLECTION_ID,
} from './fileDependency';

/**
 * Flattens a TypeScriptFileImportList into its individual file to file
 * dependency relationships
 */
export const getFileDependencies = buildProgrammedTransform({
  name: 'getFileDependencies',
})
  .fromItem2<TypeScriptFileImportListStreamMetatype>({
    collectionId: TYPE_SCRIPT_FILE_IMPORT_LIST_COLLECTION_ID,
  })
  .andFromItemTuple2<
    BoundedFileStreamMetatype,
    NonEmptyTuple<IdentifiableItemId>
  >({
    collectionId: BOUNDED_FILE_COLLECTION_ID,
    getRightKeyTuple: (importList) => {
      const importingFileId = importList.item.id;
      const importedFileIdList = importList.item.list
        .filter((importItem) => importItem.isInternal)
        .map((importItem) => importItem.sourcePath);

      return [importingFileId, ...importedFileIdList];
    },
    getRightKey: (partitionedFile) => {
      return partitionedFile.item.file.filePath.serialized;
    },
  })
  .toItemTuple2<FileDependencyStreamMetatype>({
    collectionId: FILE_DEPENDENCY_COLLECTION_ID,
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
