import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../../adapter/odeshin2';
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
      return [partitionedFile.hubblepup.file.file.directoryPath];
    },
    croard: (boundedDirectory) => {
      return boundedDirectory.hubblepup.directory.directoryPath;
    },
  })
  .toHubblepup2<FileFact2Voque>({
    gepp: FILE_FACT_2_GEPP,
  })
  .onPinbe((partitionedFile, [parentBoundedDirectory]) => {
    return new FileFact2Instance({
      partitionFact: partitionedFile.partitionFact,
      parentBoundedDirectory,
      boundedFile: partitionedFile.file,
    });
  })
  .assemble();
