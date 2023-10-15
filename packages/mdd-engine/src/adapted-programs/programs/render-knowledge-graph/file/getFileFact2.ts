import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../../adapter/identifiable-item/identifiableItem';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
  FileCommentedProgramBodyDeclarationGroupStreamMetatype,
} from '../../../programmable-units/type-script-file/fileCommentedProgramBodyDeclarationGroup';
import {
  FILE_DEPENDENCY_COLLECTION_ID,
  FileDependencyStreamMetatype,
} from '../dependency/fileDependency';
import {
  BOUNDED_DIRECTORY_COLLECTION_ID,
  BoundedDirectoryStreamMetatype,
} from '../directory/boundedDirectory';
import {
  FILE_FACT_2_COLLECTION_ID,
  FileFact2Instance,
  FileFact2StreamMetatype,
} from './fileFact2';
import {
  PARTITIONED_FILE_COLLECTION_ID,
  PartitionedFileStreamMetatype,
} from './partitionedFile';

/**
 * Associates a partitioned file to its parent bounded directory
 */
export const getFileFact2 = buildProgrammedTransform({
  name: 'getFileFact2',
})
  .fromItem2<PartitionedFileStreamMetatype>({
    collectionId: PARTITIONED_FILE_COLLECTION_ID,
  })
  .andFromItemTuple2<BoundedDirectoryStreamMetatype, [IdentifiableItemId]>({
    collectionId: BOUNDED_DIRECTORY_COLLECTION_ID,
    getRightKeyTuple: (partitionedFile) => {
      return [partitionedFile.item.file.file.filePath.parentDirectoryPath];
    },
    getRightKey: (boundedDirectory) => {
      return boundedDirectory.item.directory.directoryPath.serialized;
    },
  })
  .andFromItemTuple2<
    FileCommentedProgramBodyDeclarationGroupStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_COLLECTION_ID,
    getRightKeyTuple: (partitionedFile) => {
      return [partitionedFile.item.file.file.filePath.serialized];
    },
    getRightKey: (declarationGroup) => {
      return declarationGroup.item.filePath;
    },
  })
  .andFromCollection2<FileDependencyStreamMetatype>({
    collectionId: FILE_DEPENDENCY_COLLECTION_ID,
  })
  .toItem2<FileFact2StreamMetatype>({
    collectionId: FILE_FACT_2_COLLECTION_ID,
  })
  .onTransform(
    (
      partitionedFile,
      [parentBoundedDirectory],
      [declarationGroup],
      fileDependencyCollection,
    ) => {
      const importedFileList =
        fileDependencyCollection.importedFileListByImportingFilePath.get(
          partitionedFile.file.file.filePath.serialized,
        ) ?? [];
      const importingFileList =
        fileDependencyCollection.importingFileListByImportedFilePath.get(
          partitionedFile.file.file.filePath.serialized,
        ) ?? [];

      const importedNodeIdSet = new Set(
        importingFileList.map((importedFile) => {
          return importedFile.localGraphElementId.forMachine;
        }),
      );

      const importingNodeIdSet = new Set(
        importedFileList.map((importingFile) => {
          return importingFile.localGraphElementId.forMachine;
        }),
      );

      return new FileFact2Instance({
        partitionFact: partitionedFile.partitionFact,
        parentBoundedDirectory,
        boundedFile: partitionedFile.file,
        importedNodeIdSet,
        importingNodeIdSet,
        declarationGroup,
      });
    },
  )
  .assemble();
