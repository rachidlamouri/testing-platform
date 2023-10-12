import { buildEstinant } from '../../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../../adapter/odeshin/identifiableItem';
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
export const getFileFact2 = buildEstinant({
  name: 'getFileFact2',
})
  .fromHubblepup2<PartitionedFileVoque>({
    gepp: PARTITIONED_FILE_GEPP,
  })
  .andFromHubblepupTuple2<BoundedDirectoryVoque, [OdeshinZorn]>({
    gepp: BOUNDED_DIRECTORY_GEPP,
    framate: (partitionedFile) => {
      return [partitionedFile.item.file.file.filePath.parentDirectoryPath];
    },
    croard: (boundedDirectory) => {
      return boundedDirectory.item.directory.directoryPath.serialized;
    },
  })
  .andFromHubblepupTuple2<
    FileCommentedProgramBodyDeclarationGroupVoque,
    [OdeshinZorn]
  >({
    gepp: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
    framate: (partitionedFile) => {
      return [partitionedFile.item.file.file.filePath.serialized];
    },
    croard: (declarationGroup) => {
      return declarationGroup.item.filePath;
    },
  })
  .andFromVoictent2<FileDependencyVoque>({
    gepp: FILE_DEPENDENCY_GEPP,
  })
  .toHubblepup2<FileFact2Voque>({
    gepp: FILE_FACT_2_GEPP,
  })
  .onPinbe(
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
