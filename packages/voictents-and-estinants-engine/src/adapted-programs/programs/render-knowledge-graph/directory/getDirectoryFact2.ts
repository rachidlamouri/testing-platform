import { buildProgrammedTransform } from '../../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../../adapter/identifiable-item/identifiableItem';
import {
  BOUNDED_DIRECTORY_GEPP,
  BoundedDirectoryVoque,
} from './boundedDirectory';
import {
  DIRECTORY_FACT_2_GEPP,
  DirectoryFact2Instance,
  DirectoryFact2Voque,
} from './directoryFact2';
import {
  PARTITIONED_DIRECTORY_GEPP,
  PartitionedDirectoryVoque,
} from './partitionedDirectory';

/**
 * Associates a partitioned directory to its bounded parent directory. Boundary
 * directories will not have a bounded parent directory.
 */
export const getDirectoryFact2 = buildProgrammedTransform({
  name: 'getDirectoryFact2',
})
  .fromItem2<PartitionedDirectoryVoque>({
    collectionId: PARTITIONED_DIRECTORY_GEPP,
  })
  .andFromHubblepupTuple2<BoundedDirectoryVoque, [] | [OdeshinZorn]>({
    gepp: BOUNDED_DIRECTORY_GEPP,
    framate: (childDirectory) => {
      if (childDirectory.item.directory.isBoundaryDirectory) {
        return [];
      }

      const { parentDirectoryPath } =
        childDirectory.item.directory.directory.nodePath;

      return [parentDirectoryPath];
    },
    croard: (potentialParentDirectory) => {
      return potentialParentDirectory.item.directory.directoryPath.serialized;
    },
  })
  .toItem2<DirectoryFact2Voque>({
    collectionId: DIRECTORY_FACT_2_GEPP,
  })
  .onTransform((childDirectory, [parentDirectory = null]) => {
    return new DirectoryFact2Instance({
      partitionFact: childDirectory.partitionFact,
      parentDirectory,
      directory: childDirectory.directory,
    });
  })
  .assemble();
