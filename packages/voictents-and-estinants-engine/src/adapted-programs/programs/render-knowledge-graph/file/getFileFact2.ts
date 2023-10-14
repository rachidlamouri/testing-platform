import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../../adapter/identifiable-item/identifiableItem';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  FileCommentedProgramBodyDeclarationGroupVoque,
} from '../../../programmable-units/type-script-file/fileCommentedProgramBodyDeclarationGroup';
import {
  FILE_DEPENDENCY_GEPP,
  FileDependencyVoque,
} from '../dependency/fileDependency';
import {
  BOUNDED_DIRECTORY_GEPP,
  BoundedDirectoryVoque,
} from '../directory/boundedDirectory';
import {
  FILE_FACT_2_GEPP,
  FileFact2Instance,
  FileFact2Voque,
} from './fileFact2';
import { PARTITIONED_FILE_GEPP, PartitionedFileVoque } from './partitionedFile';

/**
 * Associates a partitioned file to its parent bounded directory
 */
export const getFileFact2 = buildProgrammedTransform({
  name: 'getFileFact2',
})
  .fromItem2<PartitionedFileVoque>({
    collectionId: PARTITIONED_FILE_GEPP,
  })
  .andFromHubblepupTuple2<BoundedDirectoryVoque, [OdeshinZorn]>({
    collectionId: BOUNDED_DIRECTORY_GEPP,
    getRightKeyTuple: (partitionedFile) => {
      return [partitionedFile.item.file.file.filePath.parentDirectoryPath];
    },
    getRightKey: (boundedDirectory) => {
      return boundedDirectory.item.directory.directoryPath.serialized;
    },
  })
  .andFromHubblepupTuple2<
    FileCommentedProgramBodyDeclarationGroupVoque,
    [OdeshinZorn]
  >({
    collectionId: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
    getRightKeyTuple: (partitionedFile) => {
      return [partitionedFile.item.file.file.filePath.serialized];
    },
    getRightKey: (declarationGroup) => {
      return declarationGroup.item.filePath;
    },
  })
  .andFromVoictent2<FileDependencyVoque>({
    collectionId: FILE_DEPENDENCY_GEPP,
  })
  .toItem2<FileFact2Voque>({
    collectionId: FILE_FACT_2_GEPP,
  })
  .onTransform(
    (
      partitionedFile,
      [parentBoundedDirectory],
      [declarationGroup],
      fileDependencyVoictent,
    ) => {
      const importedFileList =
        fileDependencyVoictent.importedFileListByImportingFilePath.get(
          partitionedFile.file.file.filePath.serialized,
        ) ?? [];
      const importingFileList =
        fileDependencyVoictent.importingFileListByImportedFilePath.get(
          partitionedFile.file.file.filePath.serialized,
        ) ?? [];

      const importedNodeIdSet = new Set(
        importingFileList.map((importedFile) => {
          return importedFile.localGraphElementZorn.forMachine;
        }),
      );

      const importingNodeIdSet = new Set(
        importedFileList.map((importingFile) => {
          return importingFile.localGraphElementZorn.forMachine;
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
